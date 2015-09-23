function groupResourceApprovers(){
//Get all approvers in each group access resource and store in an array
  //Empty array
  var grpResApprovers = [];
  //Query Group Access Resources table
  var grResApp = new GlideRecord('u_group_access_resource');
  grResApp.addQuery('active', 'true');
//  gr.addQuery('number', 'GRS0001377');
  grResApp.query();
  while(grResApp.next()){
    //Grab the Approver List from the List Collector for each Group Access Resource
    //Approval List contains either a sysid or an email address for each user
    approverList = grResApp.u_approver_list.toString().split(',');
    //Iterate the comma separate list and push each approver to array
    for(i=0; i < approverList.length; i++) {
    grpResApprovers.push(approverList[i] + '');
  }
  }
//  gs.info(">>>approver state inactive " + grpResApprovers);
  return grpResApprovers;
}

//Grab a list of all Group Resource Approvers containing sysids or email addresses
var groupResAppListAll = groupResourceApprovers();

//Run the list of all Group Resource Approvers to deduplication
function deduplicateResApprovers(grpResApprovers) {
//Run deduplication
    var arrUtil = new ArrayUtil();
    var grpResAppList = arrUtil.unique(grpResApprovers).join();
 gs.info(">>>approver state inactive dup list " + grpResAppList);
    return grpResAppList;
 }

//Grab a list of all Group Resource Approvers without any duplicate items
var grpApproverList = deduplicateResApprovers(groupResAppListAll);

//Take the list of Group Resource Approvers and query active state
function groupResourceApproverState(approverList) {
  //Empty array inactive approvers
  inactiveApprovers = [];
  //Take the comma separate list of all group approvers and convert to an array
  var grpApprover = approverList.toString().split(',');
  //Iterate elements in the array
  for(var i=0; i<grpApprover.length; i++){
  //For each individual element in the array query the user table check if the sys id or email matches
  var inaUsr = new GlideRecord('sys_user');
  //Query SysID OR Email Address to check if user is a Group Resource Approver
  inaUsr.addQuery('sys_id', grpApprover[i]).addOrCondition('email', grpApprover[i]);
  //Query inactive users to check if user is inactive
  inaUsr.addQuery('active', 'false');
//  gr.addQuery('number', 'GRS0001377');
  inaUsr.query();
  //Iterate users in Group Resource Approver List where active is false
  while(inaUsr.next()){
    //Push each of these users to an array
    inactiveApprovers.push(inaUsr.sys_id + ''); 
    gs.info("Group Resource Approver State user query " + inaUsr.sys_id + inaUsr.name);
  }
}
  return inactiveApprovers;
}
//Grab the list of inactive approvers
var inactiveApprovers = groupResourceApproverState(grpApproverList);

gs.info(">>>approver users inactive " + inactiveApprovers);

//Remove approvers from Group Resources Approver List if they are inactive
function removeApprovers(inactiveApprovers) {
  //Grab the inactive approvers list created previously
  inactiveApproverList = inactiveApprovers;
  //Query the Group Access Resource table
  var grResApp = new GlideRecord('u_group_access_resource');
  grResApp.addQuery('active', 'true');
  grResApp.addQuery('number', 'GRS0001377');
  grResApp.query();
  //Iterate each active Group Access Resource record
  while(grResApp.next()){
    //Empty array updated approver list
    updatedApproverList = [];
    //Grab current Approver List from the List Collector for each Group Access Resource
    approverList = grResApp.u_approver_list.toString().split(',');

    gs.info("approverList: " + approverList + "inactive Approver List: " + inactiveApproverList);
    //Take difference (subtract) between current approver list and list of inactive approvers
    var arrayUtil = new ArrayUtil();
    //Create the updated approver list with the return value
    var updatedApproverList = arrayUtil.diff(approverList, inactiveApproverList).join();

    gs.info("Updated Approver List " + updatedApproverList);
    //Update approver list on Group Access Resource record
    grResApp.u_approver_list = updatedApproverList;
    grResApp.update();
}
    //return updated approverlist
  return updatedApproverList;
}
//Create a report log with the list of inactive approvers that were removed from each Group Access Resource
var updatedApproverList = removeApprovers(inactiveApprovers);



