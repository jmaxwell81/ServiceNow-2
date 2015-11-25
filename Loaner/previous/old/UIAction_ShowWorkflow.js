//UI Action Show Workflow
//Show insert update client form link onclick showWorkflowContext()
//condition !current.isNewRecord() && (new Workflow().hasWorkflow(current))

// Show the workflow context in a new window
function showWorkflowContext() {
   var id = $F('sys_uniqueValue');
   var url = new GlideURL('context_workflow.do');
   url.addParam('sysparm_stack', 'no');
   url.addParam('sysparm_table', g_form.getTableName());
   url.addParam('sysparm_document', id);
   var w = getTopWindow();
   w.popupOpenFocus(url.getURL(), 'show_workflow_context', 950, 700, '', false, false);
}