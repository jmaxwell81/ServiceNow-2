//UI Action
//Edit Members
//Client onClick displayMembers()

function displayMembers() {
     var dialog = new GlideDialogForm('Edit Members', 'u_group_access_request'); //Provide dialog title and table name
     dialog.setSysID(g_form.getValue('sysapproval')); //Pass in sys_id to edit existing record
     dialog.addParm('sysparm_view', 'edit_members'); //Load edit members view to show those relevant fields required to be edited
     dialog.addParm('sysparm_form_only', 'true'); //To ignore related lists
     dialog.render(); //Open the dialog
}