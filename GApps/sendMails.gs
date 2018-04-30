/* sendMails.gs
   Copyright 2018, Krzysztof Kutt
   Script for sending mails using the data from spreadsheet.
   
   Problem: you have a spreadsheet with emails and some other data; each row represent one person; you want to send this data to this person (e.g. with a request to check the data).
   Solution: this script goes through all rows in your spreadsheet, gets an email from given column and prepares a mail body based on other columns.
   
   Usage: simply adjust settings and mail body and run the script.
*/ 

function getValueFromSheet(sheet, row, column) {
  var val = sheet.getRange(column + row).getValue()
  if (val == '')
    return 'EMPTY!'
  return val
}

function sendMails() {
  //settings
  var spreadsheetID = '123456789abcdefghijklmnopqrstuvwxyz123456789'
  var sheetName = 'Sheet name'
  
  //column with recipient mail
  var mailColumn = 'A'
  
  //other important columns
  var someInfoColumn = 'B'
  var otherInfoColumn = 'C'
  var veryImportantColumn = 'D'
  
  //open sheet
  var spreadsheet = SpreadsheetApp.openById(spreadsheetID)
  var dataSheet = spreadsheet.getSheetByName(sheetName)
  if (dataSheet == null){
    Logger.log('Sheet not found: verify spreadsheetID and sheetName!')
    return
  }
  
  //count rows
  var allRowsNum = dataSheet.getRange('A:B').getLastRow()
  Logger.log('There are ' + allRowsNum + ' rows')
  
  //row 1 has column names, so we start from the second row
  for (var row = 2; row <= allRowsNum; row++){
    Logger.log("--- Current row: " + row)
    var recipientMail = getValueFromSheet(dataSheet, row, mailColumn)
    if (recipientMail == ''){
      Logger.log('MAIL NOT FOUND!')
      //continue
    }
    Logger.log('Mail: ' + recipientMail)
    
    //getData
    var someInfo = getValueFromSheet(dataSheet, row, someInfoColumn)
    var otherInfo = getValueFromSheet(dataSheet, row, otherInfoColumn)
    var veryImportant = getValueFromSheet(dataSheet, row, veryImportantColumn)
    
    //prepare mail body
    var body = "Dear Sir/Madame,\n\n'
      + 'Lorem ipsum.\n'
      + 'Here is someInfo: ' + someInfo + '.\n'
      + 'And here is something very important! ' + veryImportant + '!\n'
      + 'Yours Faithfully,\n'
      + 'XYZ'

    //mail settings (permanent)
    var subject = 'Some subject'
    var senderMail = 'my-mail@mail.org'  //this mail should be one of aliases you are using in GMail!
    var senderName = 'My Name'
    
    GmailApp.sendEmail(recipientMail, subject, body, {
      from: senderMail,
      name: senderName
      //you can use other options here, as bcc, attachments and so on, see: https://developers.google.com/apps-script/reference/gmail/gmail-app#sendEmail(String,String,String,Object)
    })
  }
}

