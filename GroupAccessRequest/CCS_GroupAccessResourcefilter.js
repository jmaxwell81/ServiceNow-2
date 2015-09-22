//Catalog Client Script
//Group Access Resource filter
function onLoad() {
 
setTimeout(setResourceFilter, 1000);
 
}
function setResourceFilter() {
//g_form.setDisplay(x_broi2_group_acce_resource_requested, false);
u_resource_requestedg_filter.reset();//Replace"usr"  here with the list collector name on catalog item
var answer = '';
answer += 'active=true^u_read_only=false'; //sets the default filter as "Active is true"
u_resource_requestedg_filter.setQuery(answer);//Replace"usr" here with the list collector name on catalog item
u_resource_requestedacRequest(null);//Replace"usr" here with the list collector name on catalog item

//g_form.setDisplay(x_broi2_group_acce_resource_requested, true);
}