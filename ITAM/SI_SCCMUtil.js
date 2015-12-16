//SI SCCMUtil
//Transform map script
//scoure script target cmdb_ci
var SCCMUtil = Class.create();

SCCMUtil.findComputer = function(id) {
    // Find the SCCM ID in the correlation_id field
    var gr = new GlideRecord("cmdb_ci_computer");
    gr.addQuery("u_sccm_id", id);
    gr.query();
    if (gr.next()) {
		gs.log("SCCMUtil sccm id: " + gr.sys_id);
        return gr.sys_id + '';
	}
   // Find the SCCM ID in the source table
    var gr = new GlideRecord("sys_object_source");
    gr.addQuery("name", "SCCM");
    gr.addQuery("id", id);
    gr.query();
    if (gr.next()) {
        var grr = new GlideRecord(gr.target_table + '');
        if (grr.get(gr.target_sys_id + ''))
			gs.log("SCCMUtil target table: " + gr.sys_id);
            return grr.sys_id + '';
    }

    else return null;    
};



SCCMUtil.prototype = {  

    initialize: function() {
    },

    type: "SCCMUtil"
};