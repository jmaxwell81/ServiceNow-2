//Additional Comments Style onLoad
//Table Incident
//Type onLoad
//Global

function onLoad() {
//	gs_form.getControl('u_additonal_comments_html').style.backgroundColor = '#FEC7C8';
	var comLabel = g_form.getLabel('u_additional_comments_html');
		comLabel.style.backgroundColor = '#FEC7C8';
		comLabel.style.fontWeight = 'bold';
	var noteLabel = g_form.getLabel('u_work_notes_html');
		noteLabel.style.backgroundColor = 'LightGoldenRodYellow';
		noteLabel.style.fontWeight = 'bold';
}