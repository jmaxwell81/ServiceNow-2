//Catalog Client Script
//Group Access Resource filter
function onLoad() {
 
setTimeout(setMyFilter, 1000);
 
}
function setMyFilter() {
//g_form.setDisplay(x_broi2_group_acce_resource_requested, false);
x_broi2_group_acce_resource_requestedg_filter.reset();//Replace"usr"  here with the list collector name on catalog item
var answer = '';
answer += 'active=true^x_broi2_group_acce_read_only=false'; //sets the default filter as "Active is true"
x_broi2_group_acce_resource_requestedg_filter.setQuery(answer);//Replace"usr" here with the list collector name on catalog item
x_broi2_group_acce_resource_requestedacRequest(null);//Replace"usr" here with the list collector name on catalog item

//g_form.setDisplay(x_broi2_group_acce_resource_requested, true);
}