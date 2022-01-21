

interface MailFormat {
  shoolName: string,
  userName: string,
  userEmail: string

}

export class Mail {
  constructor() {}

  public message(value: string) {
    console.log(`hogehoge:${value}`);
  }

  public readSheetAndSendMail(){
    const table = this.readSheet();
    table.forEach((userdata)=>{
      this.createMailDraft(userdata[0], userdata[1], userdata[2]);
    })
  }


  public readSheet() {
    // (1)Spreadsheetファイルを開く
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/1kkc4lrEVd-WPXryMKVvG1mxz83PG3fwACPKGHSqvrAA/edit#gid=0";
    const SHEET_NAME = "シート1";
    var spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
    // (2)Sheetを開く
    var sheet = spreadSheet.getSheetByName(SHEET_NAME);
    // (3)セルの範囲を指定・(4)値の取得
    var table = sheet.getDataRange().getValues();
    // 結果を表示
    Logger.log(table);
    table.forEach((userdata)=>{
      Logger.log(userdata)
    })
    return table;
  }

  createMailDraftTest(){

    this.createMailDraft("yuta.moriyama@gmail.com", "鷹取中", "森山雄太")

  }



  createMailDraft(userEmail,first_name, last_name) {

    const content = this.createMailContent(first_name, last_name)
    const title = "Route H debate tournament invitation February 19th"

    this.createMailDraftExecute(userEmail, title, content )
  }


  createMailContent( first_name, last_name ){
    return ` ${first_name} ${last_name}

We are sending emails to people who participated in the Korea Japan Online School Debate Championship.

I am now hosting a Japanese online debate tournament for junior and high school students, and I want to invite Korean debaters for this tournament.
    
Date: February 19th 
    
Tournament Detail
https://docs.google.com/document/d/1Ue0Vfd4Dlszq9SBxUapiQfXed0nwXNtchLrZJIuGyaY/edit
    
Registration
https://docs.google.com/forms/d/e/1FAIpQLScnhMJzPFbVGR2TBd4orCfr8JfkIv5eH0udpSd4puG8rkWANg/viewform
    
Best Regards Yuuta Moriyama

`

  }
  

  public createMailDraftExecute(userEmail, title, content ) {

    const objArgs = { };
    GmailApp.createDraft( userEmail, title, content, objArgs );
 
  }
}


