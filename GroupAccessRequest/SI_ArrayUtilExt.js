//Script Include ArrayUtilExt
/* A custom extension on builtin various utility functions to assist with javascript Arrays

var aue = new ArrayUtilExt();
aue.<doSomething>
*/

var ArrayUtilExt = Class.create();
ArrayUtilExt.prototype = {
    initialize: function() {
    },
    sentence: function(arr){
		if (arr.length <= 1) {
		return arr;	
		}
		else if (arr.length > 1) {
	    var s = arr.slice(0, arr.length - 1).join(', ') + " and " + arr.slice(-1);
			return s;
		}
    },
    type: 'ArrayUtilExt'
};