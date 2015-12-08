//Aggregate run count number of incidents with a ci and check that it matches the list view
var counter = new GlideAggregate('incident');
counter.addNotNullQuery('cmdb_ci');
counter.addAggregate('COUNT', 'cmdb_ci');
counter.query();   
while (counter.next()) {
   var cmdbci = counter.cmdb_ci;
   var cmdbciCount = counter.getAggregate('COUNT', 'cmdb_ci');
//   gs.log("ITAM Removal CI Count " + cmdbciCount + " incidents with a cmdb_ci of " + cmdbci.getDisplayValue());
}
	var cmdbciTotal = counter.getTotal('COUNT');
	gs.log("ITAM Removal CI Total " + cmdbciTotal);