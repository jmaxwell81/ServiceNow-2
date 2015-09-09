//Business Rule
//Change Request Watch List Escalation
//Before Update Insert
//Order 100
function onBefore(current, previous) {
	var review = current.u_review_required.getDisplayValue();
	if (review == 'Change Board') {
	//Add Manager		
	addManager();
	}
	if (review == 'CIO') {
	//Add Change Board
	addChangeBoard();
	return false;
}
}

function addManager() {
	var wList = current.watch_list;
	var manager = current.assigned_to.manager;
	wList += (',' + manager + '');
	var removeDupsWatchList = removeDups(wList);
	current.watch_list = removeDupsWatchList.toString();
	}

function addChangeBoard() {
	var wList = current.watch_list;
	var grp = new GlideRecord('sys_user_grmember');
    grp.addQuery('group.name', 'Change Advisory Board');
	grp.query();
	while(grp.next()) {
	if(wList != "") {
        wList = (wList + "," + grp.user.sys_id+"");
		}
	else {
		wList = grp.user.sys_id;
		}
	}
	var manager = current.assigned_to.manager;
	wList += (',' + manager + '');
	var removeDupsWatchList = removeDups(wList);
	current.watch_list = removeDupsWatchList.toString();
	}
	
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