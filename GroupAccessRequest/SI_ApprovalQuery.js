//Script Include Approval Query

var ApprovalQuery = Class.create();
ApprovalQuery.prototype = {
    initialize: function() {
    },
	approvingTask: function(record, curUser){
	var appTsk = new GlideRecord('sysapproval_approver');
 	//Query sysid of approval_for record
	appTsk.addQuery('sysapproval.sys_id', record);
	//Query if user is approver
	appTsk.addQuery('approver', curUser);
	appTsk.query();
	//If any results are returned user is an approver
	return appTsk.hasNext();
	},
    type: 'ApprovalQuery'
};