printApproversInactive();
function printApproversInactive(){
if (event.parm1 != '') {
	var ina = event.parm1.split(',');
    var aru = new ArrayUtil();
    var inaApp = aru.unique(ina).join();
    var inaApprovers = inaApp.toString().split(',');

for (var i=0; i<inaApprovers.length; i++){
	template.print("<b>"+inaApprovers[i]+"<br/></b>");
}
}
else if (event.parm1 == '') {
	template.print("<b>No-one<br/></b>");
}
}