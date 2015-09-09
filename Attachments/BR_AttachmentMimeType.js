//Business Rule
//Attachment Mime Type
//Table sys_attachment
//When to run Before Insert Update
//Order 100
//Table name is not ecc_adent_mib or tablename is not ecc_queue or table name is not ecc_agent_jar

checkMime();
function checkMime() {  
    
var cType = current.content_type.getDisplayValue();
//xls,xlsx,ppt,pptx,doc,docx,txt,html,gif,png,pdf,jpeg,jpg,tiff,bmp,pub,mpp,rtf,csv,pkcs,zip,log
switch(true) {
    //JPEG
    case (cType == 'image/jpeg' || cType == 'image/jpg'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //PNG
    case (cType == 'image/png'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //TIFF
    case (cType == 'image/tiff'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //BMP
    case (cType == 'image/bmp'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //GIF
    case (cType == 'image/gif'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //MS Word doc
    case (cType == 'application/msword'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //MS Word docx
    case (cType == 'application/vnd.openxmlformats-officedoc' || cType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || cType == 'application/vnd.ms-word.document.macroenabled.12'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //MS Excel xls
    case (cType == 'application/excel' || cType == 'application/msexcel' || cType == 'application/x-msexcel' || cType == 'application/x-excel'|| cType == 'application/vnd.ms-excel' || cType == 'application/vnd.ms-excel.sheet.macroenabled.12'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //MS Excel xlsx
    case (cType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //MS Powerpoint ppt
    case (cType == 'application/powerpoint' || cType == 'application/mspowerpoint' || cType == 'application/vnd.ms-powerpoint' || cType == 'application/vnd.ms-powerpoint.presentation.macroenabled.12'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //MS Powerpoint pptx
    case (cType == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || cType == 'application/x-mspowerpoint'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //MS Publisher pub
    case (cType == 'application/x-mspublisher'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //MS Project mpp
    case (cType == 'application/vnd.ms-project'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //PDF
    case (cType == 'application/pdf'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //CSV
    case (cType == 'text/csv' || cType == 'application/csv'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //TXT
    case (cType == 'text/plain' || cType == 'application/txt'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //RTF
    case (cType == 'text/rtf' || cType == 'application/x-rtf' || cType == 'application/rtf' || cType == 'text/richtext'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //LOG
    case (cType == 'text/x-log'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //HTML
    case (cType == 'text/html'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //XML
    case (cType == 'application/xml' || cType == 'text/xml'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //Open Office odt odp ods odf odc
    case (cType == 'application/vnd.oasis.opendocument.text' || cType == 'application/vnd.oasis.opendocument.presentation' || cType == 'application/vnd.oasis.opendocument.spreadsheet' || cType == 'application/vnd.oasis.opendocument.formula' || cType == 'application/vnd.oasis.opendocument.chart'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //ICS calendar
    case (cType == 'application/ics' || cType == 'text/calendar'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //SWF
    case (cType == 'application/x-shockwave-flash'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //PKCS
    case (cType == 'application/pkcs7-signature'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //SH
    case (cType == 'text/x-script.sh' || cType == 'application/x-sh' || cType == 'application/x-bsh' || cType == 'application/x-csh' || cType == 'text/x-script.csh' || cType == 'application/x-bsh' || cType == 'application/x-shar' || cType == 'text/x-script.tcsh' ):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //Zip
    case (cType == 'application/x-compressed' || cType == 'application/x-zip-compressed' || cType == 'application/zip' || cType == 'multipart/x-zip'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //GZip
    case (cType == 'application/x-gzip' || cType == 'multipart/x-gzip' || cType =='application/x-gzip' || cType == 'application/x-tar' || cType == 'application/x-gtar'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //PL
    case (cType == 'text/x-perl' || cType == 'text/x-script.perl'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;      
    //PY
    case (cType == 'text/x-script.phyton'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //JS
    case (cType == 'application/x-javascript' || cType == 'application/javascript' || cType =='text/javascript'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //CRT
    case (cType == 'application/x-x509-ca-cert'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //DAT
    case (cType == 'application/ms-tnef'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //EML
    case (cType == 'message/rfc822'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //WAV
    case (cType == 'audio/wav' || cType == 'audio/x-wav'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //Message delivery status
    case (cType == 'message/delivery-status'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    //Misc binary
    case (cType == 'application/octet-stream'):
        gs.log(current.file_name + current.content_type + " Has Been Allowed ");
        break;
    default:
        var record = new GlideRecord('incident');
            record.addQuery('sys_id', current.table_sys_id);
            record.query();
        if (record.next()) {
            var grUser = new GlideRecord('sys_user');
            grUser.addQuery('user_name', record.sys_updated_by);
            grUser.query();
        while (grUser.next()) {
            gs.log(current.content_type + " Is Not Allowed " + current.file_name + " Username: " + grUser.user_name + " Incident: " + record.number);
            gs.eventQueueScheduled("attachment.alertmimetype", current, grUser.sys_id, record.number);
    }
    current.setAbortAction(true);
    return false;
    }   
}
}