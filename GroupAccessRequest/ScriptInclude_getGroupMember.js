//Group Access Request
//Currently the Broad Institute group membership is not accurate although we can do a simple Active is true and User.Source is not empty (ldap source) ie if the user was pulled from ldap they have credentials
// reference qualifier call javascript: new x_broi2_group_acce.getBroadGroupMember().getMember();
var getBroadGroupMember = Class.create();
getBroadGroupMember.prototype = {
    initialize: function() {
    },
    getMember : function() {
        var user_array = [];  
        var getMembers = new GlideRecord('sys_user_grmember');
        getMembers.addQuery('user.active', 'true');  
        getMembers.addQuery('group.name', 'Broad Institute');  
        getMembers.query();  
        while(getMembers.next()) {  
            user_array.push(getMembers.user + '');  
        }  
        return 'sys_idIN' + user_array.toString();  

    },
    type: 'getBroadGroupMember'

};