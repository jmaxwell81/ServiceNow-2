#!/usr/bin/env perl
############################################
#
# Aspera code for generating accounts.
############################################

use Getopt::Std;
use POSIX qw/strftime/;
use DBI;
use DBD::mysql;
use Sys::Hostname;
use Scalar::Util qw(looks_like_number);
use JSON;
use Crypt::CBC;
use HTTP::Request;
use LWP::UserAgent;
use YAML::XS 'LoadFile';

if($ARGV[0] eq "--quota"){
 if(!$ARGV[1]){print "./create_aspget_account.pl --quota <MANIFEST>\n";exit 1;}
 $quota_needed = `cat $ARGV[1] | awk '{print \$1}' | xargs -I{} du -b {} | awk '{ sum+= \$1} END {print sum}'| awk '{ sz = sprintf("%4.2f",\$1/1024/1024/1024/1024); print sz "TB"}'`;
 print "$quota_needed\n";
 exit 0;

}

$aspconfigpath = "/var/tmp";
$SSHARGS = "-o 'StrictHostKeyChecking no' -o 'UserKnownHostsFile /dev/null'";
#
# Use the APPPATH variable when testing
if ( ! $ENV{'APPPATH'} ) {
    $ENV{'APPPATH'} = "/broad/software/scripts/shares";
}

$APPPATH = $ENV{'APPPATH'};

$host = hostname;
$loginuser = getpwuid($>);

if($host !~ "mage" && $host !~ "glados"){ print "Error you are not on the right host mage or glados!\n";exit;}
if($loginuser !~ "root"){print "Error you must be root to run this script\n";exit;}

# MYSQL CONFIG VARIABLES
my $config = LoadFile('database.yml');
$dbhost = $config->{hostname};
$database = $config->{database};
$tablename = $config->{table};
$user = $config->{username};
$pw = $config->{password};


## Username should be RT ticket number
$username = $ARGV[0];
$gid = $username;
$gid =~ s/^SN//;
$email= "none";
$projectmanager="none";

$shares = 1;
$apiuser = "broadxfer";
%storage = (
            GCS => 'gozone',
	    AWS => '',
	    ECS => 'becs',
           );

$shares_api = "http://devops-prod01.broadinstitute.org:8000";


if($#ARGV != 6){
        my %usageh = ('USAGE1' => 'create_aspget_account.pl <TICKET NUMBER> <EMAIL> <Project Manager> <quota for upload> <MANIFEST FULL PATH> <LOCATION ECS| GCS DEFAULT> <ENCRYPTED NO|YES DEFAULT>', 'USAGE2' => 'create_aspget_account.pl --quota <MANIFEST>');
        print encode_json \%usageh;
	exit;
}

if($ARGV[3]){
	$quota = $ARGV[3];
	if($quota !~ m/\d+(M|G|T)/i){print "ERROR number must numeric and end with T,G or M\n";exit;}
}
if($ARGV[1]){
        $email = $ARGV[1];
}
if($ARGV[2]){
        $projectmanager =$ARGV[2];
}
if($ARGV[4]){
       $manifest = $ARGV[4];
}
if($ARGV[5]){
      $cloud = $ARGV[5];
}
if($ARGV[6]){
      $enc = $ARGV[6];
}

if("$manifest" ne "UPLOAD"){
 &verify_manifest;
}else{
 #Location is Forced to OZONE for upload and set write to 1 for API
 $cloud = "ECS";
 $write = 1;
}



$file_passwd = &generate_pwd_string(15);

if($enc eq "NO"){
     $passwd_string = "unencrypted";
     $passurl = "N/A";
}elsif($manifest eq "UPLOAD"){
     &encrypt_passwd;
     $message = "Your site is being created and should be usable in 5 minutes";
     $importantnotes = "'** The FILE PASSWD URL expires after you click on it 1 time ** Please take note of the password upon clicking the URL'";
     $enc = "YES";
}else{
     &encrypt_passwd;
     $message = "Your data is currently being staged. You will get an email notifying you when it is ready. The site is only valid for 30 days";
     $importantnotes = "'** The FILE PASSWD URL expires after you click on it 1 time ** Please take note of the password upon clicking the URL'";
     $enc = "YES";
}

### Are we going to Isilon Internal Storage or the Cloud Vender (TBD)###
if($cloud eq "GCS"){
 $location = $storage{'GCS'};
}elsif($cloud eq "AWS"){

}elsif($cloud eq "ECS"){
 $location = $storage{'ECS'};
}else{
 $location = $storage{'GCS'};
}

# DATA SOURCE NAME
$dsn = "dbi:mysql:$database:$dbhost:3306";

# PERL DBI CONNECT
$connect = DBI->connect($dsn, $user, $pw);

#INSERT USERNAME AND DATES INTO DB
$insert = "INSERT INTO datasets (Username, StartDate, EndDate,Email,PM,info,Location,Shares) VALUES (\"$username\", CURDATE(), CURDATE() + INTERVAL 60 day,\"$email\",\"$projectmanager\",\"$passwd_string\",\"$location\",\"$shares\");";
$query_handle = $connect->prepare($insert);
$query_handle->execute();

# PREPARE THE QUERY
$query = "SELECT * FROM $tablename";
$query_handle = $connect->prepare($query);

# EXECUTE THE QUERY
$query_handle->execute();

# Always assume encrypted 
if ($enc ne "NO"){
   $passurl = `$APPPATH/./create_uuid_url.pl $username`;
}

### USERNAME AND PASSWD INFO ####
#print "********************************************\n";
#print "Aspera access info\n";
#print "\n";
#print "URL: https://ozone.broadinstitute.org/aspera/user\n";
#print "USERNAME: $username\n";
#print "PASSWD  : $passwd\n";
#print "FILE PASSWD : $file_passwd\n";
#print "********************************************\n";

## Upload only allowed to ECS now

if($manifest eq "UPLOAD" && $cloud ne "ECS"){
print "{'Error': 'Upload only Allowed to ECS! $cloud'}";
exit 1;
}

&create_shares_user;

my %account_info = ('MESSAGE' => "$message", 'URL' => 'https://shares.broadinstitute.org', 'USERNAME' => "$username", 'PASSWD' => "$passwd", 'FILE PASSWD URL' => "$passurl", 'IMPORTANT NOTES' => "$importantnotes");
print encode_json \%account_info;


if($manifest eq "UPLOAD"){ 

 ## Yuck
 if($cloud eq "ECS"){
       $s3cmd="s3cmd --no-progress --config=/sysman/scratch/apsg/aspget/.s3cfg";
       $cmd = "source /broad/software/scripts/useuse; use Python-2.7; $s3cmd put /sysman/scratch/apsg/aspget/README s3://aspera/$username/README > /dev/null 2>&1";
       system("$cmd");
 }
exit 0;
}

### mlaunch_crypt call ##
##EXAMPLE:   ./mlaunch_crypt.sh /tmp/filelist 333333 'sdfwefsdfsad' 'asdfwdSDDWDfasd' 'gozone' 'UNENCRYPTED' 

$return = `source /broad/software/scripts/useuse && use GridEngine8-Broad && qsub -v APPPATH=$APPPATH -p 1024 -v 'FILEPASSURL=\"$passurl\"' -q xfer -j y -o /sysman/scratch/apsg/gefiles/$username.log ${APPPATH}/./mlaunch_crypt_sn.sh \"$manifest\" $username \"$passwd\" \"$file_passwd\" \"$location\" \"$enc\"`;

#print $return;


sub is_success {

	if($result !~ m/Success/i){
              #print "Warning: Result no success..\n";
	      exit;
	}

}


sub generate_pwd_string
{
        $size = shift;
	@chars=('a'..'z','A'..'Z','0'..'9');
	$random_string = "";
	foreach (1..$size) 
	{
		$random_string.=$chars[rand @chars];
	}
	return $random_string;
}


sub verify_manifest {
       open(MAN,"$manifest") or die "$!\n";
       while(<MAN>) {
	@line = split(' ',$_);
        if(@line != 3){
          print "ERROR: The Manifest requires 3 columns {LocalFile RemoteFile MD5sum} - THIS MANIFEST IS NOT VALID\n";
          exit 1;
        }
       } 	

}

sub create_shares_user {

  $url = $shares_api . "/api/v1/create/";
  ## write permissions requires the below permissions for command line usage ##
  if($write){
   $permissions{'write'} = 'True';
   $permissions{'mkdir'} = 'True'; 
   $permissions{'rename'} = 'True';
   $permissions{'delete'} = 'True';
  }
  $permissions{'read'} = 'True';
  %request = ("username" => "$username", "manifest" => "$manifest", "node" => "$location", "permissions" => \%permissions);
  $json = encode_json \%request;
  my $req = HTTP::Request->new(POST => $url);
  $req->content_type('application/json');
  $req->content($json);
  my $ua = LWP::UserAgent->new; 
  my $res = $ua->request($req);
  if ($res->is_success()){
   $response = $res->content();
   %hash = %{decode_json($response)};
  }else{
   print "{'ERROR': 'Error Creating User'}";
   exit;
  }

  $passwd=$hash{"password"};
  $username=$hash{"username"};
}

sub encrypt_passwd {

 $key = "dwsWsdrEWSEDtrtGFDEyoPIU76753213";

 $cipher = Crypt::CBC->new( 
                -key    => "$key",
                -cipher => "Crypt::OpenSSL::AES",
                -iv => "1234321234454524",
                -literal_key => '1',
                -header  => 'none',
                -keysize => 32
        );

        $hpasswd = unpack "H*", $cipher->encrypt($passwd);
        $hfile_passwd = unpack "H*", $cipher->encrypt($file_passwd);
        $passwd_string = "$hfile_passwd";

}

