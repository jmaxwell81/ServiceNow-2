//UI Action Withdraw Request
//Action name loaner_withdraw
//Show update Client
//onclick withdraw();
//condition (current.requested_for == gs.getUserID() || gs.hasRole('loaner_admin')) && !(current.state == 3 || current.state == 4 || current.state == 7)

//Client-side 'onclick' function
function withdraw(){
   if(confirm('Are you sure you want to withdraw this request?')){
     //Call the UI Action and skip the 'onclick' function
     gsftSubmit(null, g_form.getFormElement(), 'loaner_withdraw'); //MUST call the 'Action name' set in this UI Action
     return true;  //Abort submission
   }
   return false;
}

// Server side code
if(typeof window == 'undefined')
   serverLoanerWithdraw();

function serverLoanerWithdraw(){
  current.active=false;
  current.state=7;
  current.update();
  gs.addInfoMessage(gs.getMessage('loaner_withdraw'));
}


/* script include
  withdrawRequest : function(lr) {

    var wf = new Workflow();

    wf.cancel(lr);
    lr.active=false;
    lr.state=7;
    lr.update();

    gs.addInfoMessage(gs.getMessage('loaner_withdraw'));
  },
*/