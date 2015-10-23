printApproversEmpty();

function printApproversEmpty(){
var graResource = new GlideRecord('u_group_access_resource');
//Active is true approver is required and approver list is empty
  graResource.addEncodedQuery('active=true^u_approver_not_required=false^u_approver_listISEMPTY');
//  grResApp.addQuery('number', 'GRS0001377');
  graResource.query();
  //Iterate each active Group Access Resource record
  while(graResource.next()){
  	template.print("<b>"+graResource.number + " "+ graResource.u_resource_name + "<br/></b>");
  }
}