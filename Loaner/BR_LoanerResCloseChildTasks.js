//Business Rule Loaner Res Close Child Tasks
//When onBefore Insert Update
//Condition state changes to Closed Skipped or Closed Complete

function onBefore(current, previous) {
closeChildTasks(current.sys_id);
  function closeChildTasks(sys_id) {
	  
    var childTasks = new GlideRecord('x_broi2_loaner_res_loaner_res_task');
    childTasks.addQuery('parent', sys_id);
    childTasks.query();
    while(childTasks.next()) {
      childTasks.state = 7;
      childTasks.update();
    }
  }
}