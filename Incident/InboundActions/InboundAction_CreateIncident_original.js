//Inbound Actions Create Incident
//Condition email.subject.match(/\*\*\s+\w+\s+Host\s+Alert:\s+[a-zA-Z0-9\-]+\s+is\s+\w+\s+\*\*/) == null && gs.getUserName() != 'help-rt@broadinstitute.org' && gs.getUserName() != 'quotesupport@broad.mit.edu' && gs.getUserName() != 'quote-support@broadinstitute.org' && email.subject.indexOf("Deploy Computer") == -1 && email.headers.indexOf("X-Spam-Level:") == -1 && gs.getUserName() !='mailer-daemon@googlemail.com' && gs.getUserName() != 'dsde-ops+noreply@broadinstitute.org'
function removeDups(thisList) {
  var n = {},r=[];
  var new_list = thisList.split(",");
  for(var i = 0; i < new_list.length; i++) 
  {
    if (!n[new_list[i]]) 
    {
      n[new_list[i]] = true; 
      r.push(new_list[i]); 
    }
  }
  return r; 
}

// Begin Default Values
var email_direct = email.to.toLowerCase();
var email_subject = email.subject.toString().toLowerCase();
var wList = current.watch_list;
var rarray = email.recipients_array;
var instanceEmail = gs.getProperty('glide.email.user');

current.caller_id = gs.getUserID();
current.comments = "received from: " + email.origemail + "\n\n" + email.body_text;
current.short_description = email.subject;
current.category = "Support";
current.subcategory = "Report an Issue";
current.incident_state = 1;
current.notify = 2;
current.contact_type = "email";
current.assignment_group.setDisplayValue("Service Desk");
current.description = email.body_text;

if (email.body.assign != undefined) {
  current.assigned_to = email.body.assign;
}
if(email.importance != undefined){
  if (email.importance == "High") {
    current.priority = 1;
  }
}
if (email.body.priority != undefined) {
   current.priority = email.body.priority;
} else {
   current.priority = 4;
}

var usr = new GlideRecord('sys_user');
usr.addQuery('sys_id', current.caller_id);
usr.query();
if (usr.getRowCount() > 0) {
  while (usr.next()) { 
    current.location = usr.location;
  }
  if (current.location.nil()) {
    current.location.setDisplayValue('Remote'); 
  }
} else {
  current.location.setDisplayValue('Remote');
}
// End Default Values

// Begin Assignemnt Group based on email address
if (email_direct.indexOf('broad+') > -1 || email_direct.indexOf('@broadinstitute.org') > -1) {
  var emails_array = email_direct.split(", ");
  var group_email_find = email_direct.indexOf('broad+');
  var group_email_find_broad = email_direct.indexOf('@broadinstitute.org');
  var group_email = emails_array[group_email_find];
  if (group_email == null) {
    group_email = emails_array[group_email_find_broad]; 
  }
    if (email_direct.indexOf('bussys@') > -1) {
    group_email = "bussys@broadinstitute.org";  
  }
    if (email_direct.indexOf('sapdropbox@') > -1) {
    group_email = "bussys@broadinstitute.org";  
  }
    if (email_direct.indexOf('webmaster@') > -1) {
    group_email = "webmaster@broadinstitute.org"; 
  }
  if (group_email == null) {
  }
  gs.log("Group Email: " + group_email);
  var group_email_broad = emails_array[0];  
  var usg = new GlideRecord('sys_user_group');
  usg.addQuery('u_rt_email', 'CONTAINS', group_email).addOrCondition('u_rt_email', 'CONTAINS', group_email_broad);
  usg.query();
  while (usg.next()) {
    current.assignment_group.setDisplayValue(usg.name);
  }
} else {
  var emails_array = email_direct.split(", ");
  var group_email_find = email_direct.indexOf('broad');
  var group_email = emails_array[group_email_find];
  var usg = new GlideRecord('sys_user_group');
  usg.addQuery('name', 'Service Desk');
  usg.query();
  while (usg.next()) {
    current.assignment_group.setDisplayValue(usg.name);
   }
}

// Begin Adjust Assignments and Category based on email values
if (email_direct.indexOf('av@broadinstitute.org') > -1 || email.subject.indexOf('[AV]') > -1 ) {
  current.category = "Conferences & Meetings";
  current.subcategory = "Technical Setup";
}

if (email_direct.indexOf('broad+DHCP@broadinstitute.org') > -1 || email.subject.indexOf('DHCP Request') > -1 ) {
  if (email.subject.indexOf('Modification') > -1) {
    current.subcategory = "DHCP Modification"; 
  }
  if (email.subject.indexOf('New Entry') > -1) {
    current.subcategory = "DHCP Addition"; 
  }
  if (email.subject.indexOf('Removal') > -1) {
    current.subcategory = "DHCP Removal";
  }
  current.assignment_group.setDisplayValue("DHCP");
  current.category = "DHCP";
}

if (email.subject.indexOf('VM Request') > -1 ) {
  current.category = "Computation";
  current.subcategory = "Virtual Machines";
}
if (email_subject.search(/github/i) > -1) {
  current.subcategory = "Cloud Applications"; 
  current.assignment_group.setDisplayValue("Core Services");
  current.category = "Software & Applications";
}
if (email_subject.search(/dotkit/i) > -1) {
  current.subcategory = "Dotkit"; 
  current.assignment_group.setDisplayValue("SCS");
  current.category = "Software & Applications";
}
// End Adjust Assignments and Category based on email values

// Begin Add to Watch List (User and Group)
//wList = wList + "," + email.from; // Add From User

for (var i = 0; i < rarray.length; i++) {
  var recipient = rarray[i];
  if (
    recipient.indexOf('broad+') == -1 &&
    recipient.indexOf('broadtest+') == -1 &&
    recipient.indexOf('service-now.com') == -1 &&
    recipient != 'help@broadinstitute.org' &&
    recipient != 'help@broad.mit.edu' &&
    recipient != 'bussys@broadinstitute.org' &&
    recipient != 'quote-support@broadinstitute.org' &&
    recipient != 'quotesupport@broad.mit.edu' &&
    recipient != 'webmaster@broadinstitute.org' &&
    recipient != 'newhire@broadinstitute.org' &&
    recipient != 'orientation-attendance@broadinstitute.org'
  ) {
      var gr = new GlideRecord('sys_user');
      gr.addQuery('email', recipient);
      gr.query();
      if (gr.next()) {
        if(wList != "") {
          wList = (wList + "," + gr.sys_id);
        } else {
          wList = gr.sys_id;
        }
      } else {
        if(wList != "") {
          wList = (wList + "," + recipient);
        } else {
          wList = recipient;
        }
      }
    }
}

var removeDupsWatchList = removeDups(wList);
current.watch_list = removeDupsWatchList.toString();

// End Add to Watch List

current.insert();
event.state="stop_processing";