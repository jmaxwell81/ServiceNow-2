var nowDay = new Date();
var todayDay = nowDay.getDay();
//Run on weekdays only
if (todayDay != 0 && todayDay != 6) { 

function groupResourceApprovers(){
//Get all approvers in each group access resource and store in an array
  //Empty array
  var grpResApprovers = [];
  //Query Group Access Resources table
  var grResApp = new GlideRecord('u_group_access_resource');
  grResApp.addQuery('active', 'true');
  grResApp.query();
  while(grResApp.next()){
    //Grab the Approver List from the List Collector for each Group Access Resource
    //Approval List contains a sysid for each user
    approverList = grResApp.u_approver_list.toString().split(',');
    //Iterate the comma separate list and push each approver to array
    for(i=0; i < approverList.length; i++) {
    grpResApprovers.push(approverList[i] + '');
  }
  }
  return grpResApprovers;
}

//Grab a list of all Group Resource Approvers containing sysids
var groupResAppListAll = groupResourceApprovers();
  
//Run the list of all Group Resource Approvers to deduplication
function deduplicateResApprovers(grpResApprovers) {
//Run deduplication
    var arrUtil = new ArrayUtil();
    var grpResAppList = arrUtil.unique(grpResApprovers).join();
    return grpResAppList;
 }

//Grab a list of all Group Resource Approvers without any duplicate items
var grpApproverList = deduplicateResApprovers(groupResAppListAll);

//Take the list of Group Resource Approvers and query active state
function groupResourceApproverState(approverList) {
  //Empty array inactive approvers
  inactiveApprovers = [];
  inactiveApproverNames = [];
  //Take the comma separate list of all group approvers and convert to an array
  var grpApprover = approverList.toString().split(',');
  //Iterate elements in the array
  for(var i=0; i<grpApprover.length; i++){
  //For each individual element in the array query the user table
  var inaUsr = new GlideRecord('sys_user');
  //Query SysID to check if user is a Group Resource Approver
  inaUsr.addQuery('sys_id', grpApprover[i]);
  //Query inactive users to check if user is inactive
  inaUsr.addQuery('active', 'false');
  inaUsr.query();
  //Iterate users in Group Resource Approver List where active is false
  while(inaUsr.next()){
    //Push each user sysids to an array
    inactiveApprovers.push(inaUsr.sys_id + '');
    inactiveApproverNames.push(inaUsr.name + '');
    gs.info("Group Resource Approver State user query " + inaUsr.sys_id + inaUsr.name);

  }
}
  //Send email notification
  gs.eventQueue("groupaccess.approversinactive", current, inactiveApproverNames, '1');
  return inactiveApprovers;
}
//Grab the list of inactive approvers
var inactiveApprovers = groupResourceApproverState(grpApproverList);

//Remove approvers from Group Resources Approver List if they are inactive
function removeApprovers(inactiveApprovers) {
  //Grab the inactive approvers list created previously
  inactiveApproverList = inactiveApprovers;
  //Query the Group Access Resource table
  var grResApp = new GlideRecord('u_group_access_resource');
  grResApp.addQuery('active', 'true');
  grResApp.query();
  //Iterate each active Group Access Resource record
  while(grResApp.next()){
    //Empty array updated approver list
    updatedApproverList = [];
    //Grab current Approver List from the List Collector for each Group Access Resource
    approverList = grResApp.u_approver_list.toString().split(',');
    //Take difference (subtract) between current approver list and list of inactive approvers
    var arrayUtil = new ArrayUtil();
    //Create the updated approver list with the return value
    var updatedApproverList = arrayUtil.diff(approverList, inactiveApproverList).join();
    //Update approver list on Group Access Resource record
    grResApp.u_approver_list = updatedApproverList;
    grResApp.update();
}
  return updatedApproverList;
}
//Create a report log with the list of inactive approvers that were removed from each Group Access Resource
var updatedApproverList = removeApprovers(inactiveApprovers);
}