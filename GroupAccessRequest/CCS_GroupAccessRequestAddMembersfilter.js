//Catalog Client Script
//Group Access Add Members filter
function onLoad() {
 
setTimeout(setMembersFilter, 1000);
 
}
function setMembersFilter() {
//g_form.setDisplay(x_broi2_group_acce_resource_requested, false);
u_additional_membersg_filter.reset();//Replace"usr"  here with the list collector name on catalog item
var answer = '';
answer += 'active=true^sourceISNOTEMPTY'; //sets the default filter as "Active is true"
u_additional_membersg_filter.setQuery(answer);//Replace"usr" here with the list collector name on catalog item
u_additional_membersacRequest(null);//Replace"usr" here with the list collector name on catalog item

//g_form.setDisplay(x_broi2_group_acce_resource_requested, true);
}