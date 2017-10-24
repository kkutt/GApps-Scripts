/* chartsInForms.gs
   Copyright 2017, Krzysztof Kutt

   Script for creating a new Google Drawing for each subject that fills our Google Form.
   
   If you need a drawing 'question' (e.g. Draw a plot of a function), there is no possibility to do this with simple Google Form.
   This script does a workaround:
   - Creates a copy of a template drawing (e.g. with X and Y axes but without a plot)
   - Updates a link in the Form, so each user will see only the link to the new copy of drawing
   - Sets the validation for field with drawing name (timestamp) to ensure that user will paste it properly (I do not know how to add a invisible field with the drawing name) to make a link between the form and the drawing of a specified user
   
   File Permissions: if script is run as an author, only new drawing needs a write permission for anonymous users
   
   Usage:
   1. Deploy this script as a Web App: https://developers.google.com/apps-script/guides/web
   2. Give the subjects the URL of a script instead of the Form URL!
*/ 

function doGet(e) {

  /***** SETTINGS *****/
  
  //Google Form ID (take it from Form URL)
  var formID = '13N4kqohbZbvyTxldoxnLh9wQizTQNDQQ6EYkDJRACRE'
  //ID of the field where URL will be updated (you can find it in HTML code of the Form)
  var fieldWithUrlID = 123456789
  //ID of the field where user will put the drawing name (you can find it in HTML code of the Form)
  var fieldWithSubjectID = 123456789
  //Charts Directory (here new charts will be placed) on Google Drive ID (takie it from Directory URL)
  var chartsDirectoryID = '13N4kqohbZbvyTxldoxnLh9wQizT'
  //Template Google Drawings file ID (takie it from Drawing URL)
  var templateFileID = '13N4kqohbZbvyTxldoxnLh9wQizTQNDQQ6EYkDJRACRE'
  
  
  /***** SCRIPT *****/
  
  //open the form and get the selected fields
  var form = FormApp.openById(formID);
  var fieldWithUrl = form.getItemById(fieldWithUrlID);
  var fieldWithSubject = form.getItemById(fieldWithSubjectID);
  
  //subjectID is unix time (in ms) to ensure no collisions
  var subjectID = "" + new Date().getTime();
  
  //validation: user has to insert subjectID into the specified field!
  var subjectFieldValidation = FormApp.createTextValidation()
   .setHelpText("Enter the proper name!")
   .requireTextMatchesPattern(subjectID)
   .build();
  fieldWithSubject.asTextItem().setValidation(subjectFieldValidation);
  
  //open directory with charts:
  var chartsDirectory = DriveApp.getFolderById(chartsDirectoryID);
  //add copy of the template:
  var urlOfNewCopy = DriveApp.getFileById(templateFileID)
    .makeCopy(subjectID, chartsDirectory)
    .setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT)
    .getUrl();
  
  //update the URL in the form
  fieldWithUrl.setHelpText('Draw a plot here: ' + urlOfNewCopy);
  
  //return the page that will redirect user to the (updated) form
  return HtmlService.createHtmlOutput('<meta http-equiv="refresh" content="0; url=' + form.getPublishedUrl() + '" />');
}

