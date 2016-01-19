//Date Utility to convert import set dates

var ImportSetDateUtil = Class.create();

ImportSetDateUtil.setDateTime = function(dateTimeSrc) {
	var dt = new Date();
	dt = dateTimeSrc.toString();
	return dt;
	},
	
	ImportSetDateUtil.setDate = function(dateSrc) {
	var d = new Date();
	d = dateSrc.toString();
	return d;
	},

ImportSetDateUtil.prototype = {  

    initialize: function() {
    },

    type: "ImportSetDateUtil"
};