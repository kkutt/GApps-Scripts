/* publishSpreadsheet.gs
   Copyright 2017, Krzysztof Kutt

   Script for updating public spreadsheet (e.g. anonymous list of grades for students) using the data from private one (where there are also private data you are not going to share, e.g. names and surnames).
   
   Problem: you have a spreadsheet you want to publish (e.g. a list of points from student reports) but google spreadsheets does not give a possibility to select the region to publish (if you want to hide e.g. the names of students). You have to publish the whole sheet or not.
   Solution: copy the whole document, hide the columns with private data and publish the document.
   New problem: the need to update the second document.
   Solution: use this simple script. It copies all sheets from given source spreadsheet (private) to the published one. You can specify which sheets won't be copied. You can also specify which columns and rows will be hidden.
   
   Usage:
   1. Simply adjust settings and run the script.
   2. You can also set time triggers for your script to automatically run it every hour/day/...
*/ 


function updatePublishedSpreadsheet(e) {
  /***** SETTINGS *****/
  var sourceID = '13N4kqohbZbvyTxldoxnLh9wQizTQNDQQ6EYkDJRACRE'
  var publishedID = '13N4kqohbZbvyTxldoxnLh9wQizTQNDQQ6EYkDJRACRE'
  //cols and rows have to be identified by valid ranges, e.g. to specify col B you have to write down 'B1'/'B2'/etc
  //and to specify row 27 you have to write down 'A27'/'B27'/etc
  var colsToHide = ['B1', 'X1', 'AD1']
  var rowsToHide = ['A27:A40']
  //names of sheets that won't be copied to the published spreadsheet
  var doNotPublish = ['tmp', 'prv']
  
  
  //open the published
  var published = SpreadsheetApp.openById(publishedID)
  var allPublishedSheets = published.getSheets()
  
  //remove all existing sheets (except the first one, because at least one has to be in the spreadsheet)
  for(sheet = 1; sheet < allPublishedSheets.length; sheet++){
    var tempName = allPublishedSheets[sheet].getName()
    published.deleteSheet(allPublishedSheets[sheet])
    Logger.log("Sheet \"" + tempName + "\" removed")
  }
  //rename the first one sheet temporarily (because the names have to be unique)
  var toRemoveName = "123-123-123-123"
  published.getSheets()[0].setName(toRemoveName)
  
  //open the source
  var source = SpreadsheetApp.openById(sourceID)
  var sourceSheets = source.getSheets()
  for(sheet in sourceSheets){
    //we will work only on sheets which names were not specified in doNotPublish
    if(doNotPublish.indexOf(sourceSheets[sheet].getName()) < 0){
      //copy to published spreadsheet
      sourceSheets[sheet].copyTo(published)
      
      //get the copy and rename (because it has "Copy of " prefix by default)
      var newPubSheet = published.getSheets().pop()
      newPubSheet.setName(sourceSheets[sheet].getName())
      
      //hide cols and rows
      for(col in colsToHide) newPubSheet.hideColumn(newPubSheet.getRange(colsToHide[col]))
      for(row in rowsToHide) newPubSheet.hideRow(newPubSheet.getRange(rowsToHide[row]))
      
      Logger.log("\"" + newPubSheet.getName() + "\" properly copied!")
    }
  }
  
  //remove the obsolete sheet
  published.deleteSheet(published.getSheetByName(toRemoveName))
  
  Logger.log("Done!");
}


