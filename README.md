# various scripts
Repo for my various small scripts

### [signPDF.sh](signPDF.sh)

Script for pasting signature.png into a PDF file. Reused from: https://github.com/szapp/pdfUtils/


### [GApps/chartsInForms.gs](GApps/chartsInForms.gs)

Script for creating a new Google Drawing for each subject that fills our Google Form.
If you need a drawing 'question' (e.g. Draw a plot of a function), there is no possibility to do this with simple Google Form. 
This script does a workaround:
   1. Creates a copy of a template drawing (e.g. with X and Y axes but without a plot)
   2. Updates a link in the Form, so each user will see only the link to the new copy of drawing
   3. Sets the validation for field with drawing name (timestamp) to ensure that user will paste it properly (I do not know how to add a invisible field with the drawing name) to make a link between the form and the drawing of a specified user

File permissions: if script is run as an author, only new drawing needs a write permission for anonymous users
   
Usage:
   1. Set required 5 ID's in SETTINGS section of a script.
   2. Deploy the script as a Web App: https://developers.google.com/apps-script/guides/web
   3. Give the users the URL of a script instead of the form URL! (new drawing WILL NOT be created when you are using form URL!)


