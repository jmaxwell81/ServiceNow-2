initImageDialog();

function initImageDialog() {
  var gdw = GlideDialogWindow.get();
  var param = gdw.getPreference("outparam");
  var refForm = null;
  if (param && param["textArea"])
    refForm = param["textArea"].form;
  var hasDbImage = gel("ni.has_db_image").value;

  var isAttachmentImage = false;
  var isDbImage = false;
  var isURL = false;
  if (param) {
     var showAdvancedDespitePref = false;
     if (param["f_alt"])
        gel("f_alt").value = param["f_alt"];
     if (param["f_title"])
        gel("f_title").value = param["f_title"];
     if (param["f_border"]) {
        gel("f_border").value = param["f_border"];
        if (param["f_border"] != 0)
           showAdvancedDespitePref = true;
     }
     if (param["f_align"]) {
        gel("f_align").value = param["f_align"];
        if (param["f_align"] != "baseline")
           showAdvancedDespitePref = true;
     }
     if (param["f_vert"]) {
        gel("f_vert").value = param["f_vert"];
        showAdvancedDespitePref = true;
     }
     if (param["f_horiz"]) {
        gel("f_horiz").value = param["f_horiz"];
        showAdvancedDespitePref = true;
     }
     if (param["f_width"]) {
        gel("f_width").value = param["f_width"];
        showAdvancedDespitePref = true;
     }
     if (param["f_height"]) {
        gel("f_height").value = param["f_height"];
        showAdvancedDespitePref = true;
     }
     if (param["f_url"]) {
        var url = param["f_url"];

        if (showAdvancedDespitePref)
           show("advanced_options");
     
        if (url.substring(0, 15) == "/sys_attachment" || url.substring(0, 14) == "sys_attachment") {
           var defaultImage = url.substring(url.lastIndexOf("=") + 1);
           var select = gel("attachment_list");
           if (select) {
              for (var i = 0; select.options.length > i; i++) {
                 if (select.options[i].value == defaultImage) {
                    select.options.selectedIndex = i;
                    isAttachmentImage = true;
                    break;
                  }
               }
               if (isAttachmentImage)
                  setLinkType('attachment');
           }
        }

        if (hasDbImage == "true") {
           if (!isAttachmentImage) {
              if (url.endsWith("x")) { // db images always end in "x"
                 var picker = gel("dbimage_list");
                 if (picker) {
                    var dbImage = url.substring(0, url.length-1); // remove the "x" as the ref completer doesn't show these
                    gel("sys_display.dbimage_list").value = dbImage;
                    picker.value = dbImage;
                    isDbImage = true;
                 }
                 if (isDbImage)
                    setLinkType('dbimage');
              }
           }
       }

       if (!isDbImage) {
             if (!isAttachmentImage) {
                gel("f_url").value = url;
                gel("f_url").focus();
                isURL = true;
                setLinkType('url');
         }
       }
    }
  }

  if (!isAttachmentImage) {
        if (!isDbImage) {
           if (!isURL) {
                  if (hasDbImage == "true")
                     setLinkType("dbimage");
                  else
                     setLinkType("attachment");
               }
        }
  }

  if (gdw.getPreference("auto_new_image")) {
        showNewDbImage();

        var name = gdw.getPreference("auto_new_image_name");
        if (name) {
            var imageNameElement = gel("db_image_name");
            imageNameElement.value = name;
        }
  }

  // if the db_image ref picker is displayed, focus in it
  var dbImagePicker = $("sys_display.dbimage_list");
  if (dbImagePicker) {
     if (dbImagePicker.style.display != "none")
        dbImagePicker.focus();
  }
}

function onOK() {
  var linkType = getLinkType();
  
  if (linkType == "attachment") {
    if (!getAttachmentId()) {
        return false;
    }
  } else if (linkType == "url") {
      var required = {
        "f_url": "You must enter the URL"
      };
      for (var i in required) {
        var el = document.getElementById(i);
        if (!el.value) {
          alert(required[i]);
          el.focus();
          return false;
        }
      }
  } else {
        if (!getDbImageName())
                return false;
  }
  
  // pass data back to the calling window
  var fields = {"f_url": true, "f_title": true, "f_alt": true, "f_align": true, "f_border": true, "f_horiz": true, "f_vert": true, "f_width": true, "f_height": true};
  var param = new Object();
  for (var id in fields) {
    var el = gel(id);
    if (el)
        param[id] = el.value;
  }

  if (linkType == "attachment") 
    param['f_url'] = buildAttachmentLink(getAttachmentId());
  if (linkType == "dbimage")
        param['f_url'] = getDbImageName() + "x";

  
  var gdw = GlideDialogWindow.get();
  var action = gdw.getPreference("action"); // we set the action to do as a dialog preference
  action(param);
}

function onPreview(defaultAttachment) {
  var url;
  
  var linkType = getLinkType();
  if (linkType == "attachment") {
     if (defaultAttachment) // used to preview the image when the dialog first loads if editing existing img
        url = buildAttachmentLink(defaultAttachment);
     else
    url = buildAttachmentLink(getAttachmentId());
  } else if (linkType == "url") {
    var f_url = gel("f_url");
    url = f_url.value;
  } else if (linkType == "dbimage") {
    url = getDbImageName();
        if (url)
           url += "x";
  }
  
  if (!url)
    url = "images/blank.gifx";

  if (getLinkType() == "attachment") 
      url = getBaseURL() + '/' + url;
  else
      url = generateRelativeURL(url);

  var previewImg = gel('preview_img');
  hide(previewImg);
  var loadImage = new Image();
  loadImage.name = "preview_img_load";
  loadImage.id = "preview_img_load"
  // we do this as an onload as we won't reliably be able to access the image size until it is actually loaded
  loadImage.onload = scalePreviewImage; 
  loadImage.onerror = previewLoadFailure;
  jslog("going to load preview: " + url);
  setTimeout(function() {loadImage.src = url;}, 0);
  
  return false;
}

function previewLoadFailure() {
  jslog("HTML Field: insert image previewLoadFailure");
  var previewImg = gel('preview_img');
  gel('ipreview').innerHTML = "<img id='preview_img' src='images/error.gif' alt='Preview Failure'/>";
  show(previewImg);
}

function scalePreviewImage() {
  var ipreview = gel('ipreview');
  ipreview.innerHTML = "<img id='preview_img' src='" + this.src + "' alt='Preview Image'/>";
  var previewImg = gel('preview_img');
  if (previewImg) {
     var width = this.width;
     var height = this.height;
     var maxWidth = 300;
     var maxHeight = 200;
     if (width > maxWidth || height > maxHeight) { // need to scale back?
        var widthRatio = (width - maxWidth) / width;
        var heightRatio = (height - maxHeight) / height;
        var ratio = 1 - Math.max(widthRatio, heightRatio);
        var scaledWidth = parseInt(width * ratio);
        var scaledHeight = parseInt(height * ratio);
        previewImg.width = scaledWidth;
        previewImg.height = scaledHeight;
        height = scaledHeight;
     }
     ipreview.style.height = height + 20;
     show(previewImg);
  }
}

function showNewDbImage() {
   hide("ipreview");
   invis("tooltip_tr");
   invis("alt_tr");
   show("new_dbimage");
   hideObject(gel("dbimage_picker"));
   hideObject(gel("new_db_image_button"));
   showObjectInline(gel("new_dbimage_cancel"));
}

function checkDbImageSubmitOK(changeType) {
   var imageNameElement = gel("db_image_name");
   var imageName = trim(imageNameElement.value);
   var fileName = gel("attachFile").value;
   var i = fileName.lastIndexOf("\\");
   if (i > -1)
      fileName = fileName.substring(i+1);
  
   if (changeType == "file" && fileName && !imageName) {
      imageName = fileName;
      imageNameElement.value = fileName;
   }
   if (imageName && fileName)
      toggleButton("new_dbimage_ok", true);
   else
      toggleButton("new_dbimage_ok", false);
}

function submitDbImage() {
   var imageNameElement = gel("db_image_name");
   var imageName = imageNameElement.value;
   if (!endsWithImageExtension(imageName)) {
      imageNameElement.focus();
      toggleButton("new_dbimage_ok", false);
      alert("Name is not a recognized image file format");
      return false;
   }

   var fileName = gel("attachFile").value;
   if (!endsWithImageExtension(fileName)) {
      alert("File is not a recognized image file format");
      toggleButton("new_dbimage_ok", false);
      return false;
   }

   var exists = imageAlreadyExists(imageName);
   if (exists == "false") {
      hide("new_dbimage_ok");
      hide("new_dbimage_cancel");
      show("dbimage_please_wait");
      return true;
   } else {
      toggleButton("new_dbimage_ok", false);
      alert("There is already an image by this name, choose a different name");
      return false;
   }
}

function imageAlreadyExists(imageName) {
   var gdw = GlideDialogWindow.get();
   var forceReplace = gdw.getPreference("force_replace");
   if (forceReplace == 'true')
       return "false";

   var aj = new GlideAjax("DbImageNameCheck");
   aj.addParam("sysparm_name", imageName);
   var responseXML = aj.getXMLWait();
   if (responseXML && responseXML.documentElement) {
      var items = responseXML.getElementsByTagName("match");
      var item = items[0];
      var exists = item.getAttribute("exists");
      return exists;
   }

   return "false";
}

function cancelDbImage() {
   hide("new_dbimage");
   show("ipreview");
   vis("tooltip_tr");
   vis("alt_tr");
   showObjectInline(gel("dbimage_picker"));
   showObjectInline(gel("new_db_image_button"));
}

function addNewDbImage(name) {
   hide("dbimage_please_wait");
   show("ipreview");
   vis("tooltip_tr");
   vis("alt_tr");
   var select = gel("dbimage_list");
   select.value = name;
   gel("sys_display.dbimage_list").value = name;
   onPreview(name + "x");
   gel("new_dbimage_form").reset();
   toggleButton("new_dbimage_ok", false);
   showObjectInline(gel("new_dbimage_ok"));
   showObjectInline(gel("new_dbimage_cancel"));
}

function addNewDbImageFailed() {
   hide("dbimage_please_wait");
   showObjectInline(gel("new_dbimage_ok"));
   showObjectInline(gel("new_dbimage_cancel"));
   alert("Failed to add the new image to the database.");
}

function showNewAttachmentImage() {
   hide("ipreview");
   invis("tooltip_tr");
   invis("alt_tr");
   show("new_attachmentimage");
   hide("attachment_list");
   hide("new_attachment_image_button");
   var select = gel("attachment_list");
   if (select.options && select.options.length > 0)
      showObjectInline(gel("new_attachmentimage_cancel"));
}

function checkAttachmentSubmitOK() {
   var fileName = gel("attachmentFile").value;
   if (fileName)
      toggleButton("new_attachmentimage_ok", true);
   else
      toggleButton("new_attachmentimage_ok", false);
}

function submitAttachmentImage() {
   var imageNameElement = gel("attachmentFile");
   var imageName = imageNameElement.value;
   if (!endsWithImageExtension(imageName)) {
      imageNameElement.focus();
      alert("Attachment is not a recognized image file format");
      return false;
   }
   show("attachment_please_wait");
   hide("new_attachmentimage_ok");
   hide("new_attachmentimage_cancel");
   return true;
}

function addNewAttachmentImage(sysid,contentType,name) {
   hide("attachment_please_wait");
   show("ipreview");
   vis("tooltip_tr");
   vis("alt_tr");
   var select = gel("attachment_list");
   addOption(select, sysid, name, true);
   onPreview(sysid);

   var showView = gel("ni.show_attachment_view").value;
   var showPopup = gel("ni.show_attachment_popup").value;
   addAttachmentNameToForm(sysid, name, "New", "images/attachment.gifx", showView, showPopup);
   gel("new_attachmentimage").reset();
   toggleButton("new_attachmentimage_ok", false);
   showObjectInline(gel("new_attachmentimage_ok"));
   showObjectInline(gel("new_attachmentimage_cancel"));
}

function cancelAttachmentImage() {
   hide("new_attachmentimage");
   show("ipreview");
   vis("tooltip_tr");
   vis("alt_tr");
   showObjectInline(gel("attachment_list"));
   showObjectInline(gel("new_attachment_image_button"));
}

function generateRelativeURL(url) {
      if (url.indexOf('http') != 0)
         url = getBaseURL() + '/' + url;
      return url;
}

function getLinkType() {
    var select = gel("link_type");
    return select.options[select.options.selectedIndex].value;
}

function setLinkType(t) {
    var select = document.getElementById("link_type");
    for(var i = 0; select.options.length > i; i++) {
        if (select.options[i].value == t) {
            select.options.selectedIndex = i;
            if (select['onchange'])
                select.onchange();
        }
    }
}

function changedLinkType() {
   var type = getLinkType();
    
   if (type == "attachment") {
      showURL(false);
      showAttachment(true);
      showDbImage(false);
   } else if (type == "url") {
      showURL(true);
      showAttachment(false);
      showDbImage(false);
   } else if (type == "dbimage") {
      showURL(false);
      showAttachment(false);
      showDbImage(true);
   }
   show("ipreview");
   vis("tooltip_tr");
   vis("alt_tr");
   onPreview();
}

function showURL(showIt) {
   var typeURL = gel("type_url");

   if (showIt == true)
      show(typeURL);
   else
      hide(typeURL);
}

function showAttachment(showIt) {
    var typeAttachment = gel("type_attachment");
    if (showIt == true) {
        show(typeAttachment);
        show("ipreview");
        vis("tooltip_tr");
        vis("alt_tr");
        var select = gel("attachment_list");
        if (!select.options || select.options.length==0) { // no options so show the new panel
            hide("attachment_list");
            showNewAttachmentImage();
        } else {
            hide("new_attachmentimage");
            showObjectInline(gel("attachment_list"));
            showObjectInline(gel("new_attachment_image_button"));
        }
    } else 
        hide(typeAttachment);
}

function showDbImage(showIt) {
    var typeDbImage = gel("type_dbimage");
    if (showIt == true) {
        show(typeDbImage);
        hide("new_dbimage");
        showObjectInline(gel("dbimage_picker"));
        showObjectInline(gel("new_db_image_button"));
    } else
        hide(typeDbImage);
}

function buildAttachmentLink(id) {
   if (id)
      return "sys_attachment.do?sys_id=" + id;
        
   return;
}

function getAttachmentId() {
   var select = gel("attachment_list");
   if (select.options.selectedIndex > -1)
      return select.options[select.options.selectedIndex].value;
    
   return;
}

function getDbImageName() {
   var selected = $("sys_display.dbimage_list").value;
   if (selected) // if we have a sys_id in here, then we can trust the display value
      return $("sys_display.dbimage_list").value;
    
   return;
}

function getBaseURL() {
    var url = location.href;
    var queryIndex = url.indexOf("?");
    if (queryIndex > -1)
       url = url.substring(0,queryIndex);
    var slashIndex = url.lastIndexOf("/");
    if (slashIndex > -1)
       url = url.substring(0,slashIndex);
    return url;
}

function toggleButton(buttonID, active) {
       var cn = 'disabled';
       var db = true;
       if (active) {
          cn = 'web';
          db = false;
       }
 
       var b = gel(buttonID);
       b.disabled = db;
       b.setAttribute('class', cn);
       b.setAttribute('className', cn);
}

function toggleAdvanced() {
  var e = document.getElementById("advanced_options");
  if (e) {
    if (e.style.display == "block") {
      e.style.display = "none";
      deletePreference("image_select.advanced.options");
    } else {
      e.style.display = "block";
      setPreference("image_select.advanced.options","true");
    }
  }
}

function invis(id) {
  var e = gel(id);
  if (e) 
    e.style.visibility = "hidden";
}

function vis(id) {
  var e = gel(id);
  if (e) 
    e.style.visibility = "visible";
}