//Remove all CIs with NO query conditions or any checks
removeCI();
function removeCI(){
   var ciremove = new GlideRecord('cmdb_ci');
   ciremove.query();
   while(ciremove.next()){
	   gs.log("CI Removed: " + ciremove.name);
      rec.deleteRecord();
   }
}