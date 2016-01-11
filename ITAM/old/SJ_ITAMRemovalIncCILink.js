//Remove Computer Information relationships from the Incident table so we can remove ci records
var Incci = new GlideRecord('incident');
Incci.addNotNullQuery('cmdb_ci'); 
Incci.setLimit(800);
Incci.query();
while (Incci.next()) {
	  gs.log("Incident CI link removed " + Incci.number)
	  Incci.cmdb_ci = '';
      Incci.update();
   }