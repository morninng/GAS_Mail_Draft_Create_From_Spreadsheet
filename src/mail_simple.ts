

interface MailFormat {
  shoolName: string,
  userName: string,
  userEmail: string

}

export class MailSimple {
  constructor() {}

  public message(value: string) {
    console.log(`hogehoge:${value}`);
  }

  public readSheetAndSendMail(){
    const table = this.readSheet();
    table.forEach((userdata)=>{
      this.createMailDraft(userdata[0], userdata[2], userdata[1]);
    })
  }


  public readSheet() {
    // (1)Spreadsheetファイルを開く
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/1kkc4lrEVd-WPXryMKVvG1mxz83PG3fwACPKGHSqvrAA/edit#gid=0";
    const SHEET_NAME = "シート3";
    var spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
    // (2)Sheetを開く
    var sheet = spreadSheet.getSheetByName(SHEET_NAME);
    // (3)セルの範囲を指定・(4)値の取得
    var table = sheet.getDataRange().getValues();
    // 結果を表示
    Logger.log(table);
    let length = 0;
    table.forEach((userdata)=>{
      if(userdata[0]){
        length++;
        Logger.log(userdata)
      }
    })
    Logger.log(length)
    return table;
  }

  createMailDraftTest(){

    this.createMailDraft("yuta.moriyama@gmail.com", "鷹取中", "森山雄太")

  }



  createMailDraft(userEmail, shoolName, userName) {

    const content = this.createMailContent(shoolName, userName)
    const title = "2023年前半の英語ディベートイベントについて"

    this.createMailDraftExecute(userEmail, title, content )
  }


  createMailContent(shoolName, userName ){
    return `${shoolName} ${userName}様

英語ディベートのイベントについて三つ連絡させてください

■ 対面英語ディベート大会 ■
2023年 1月21日　1月22日 
東京
https://docs.google.com/document/d/1XAYwbkQDweU16oHW3LlvrEitobZA8I_DtVkmVNLm3nU/edit
前回お伝えしたのから三点変更があります
 - 開始時間を１０時に変更(遠方のかたが間に合わないため)
 - 締切の延長: なるべく早く申し込みいただきたいですが、ぎりぎりまで受付はする予定です。
 - 哲学対話の参加を中学生も参加可能にしました


 ■ 事前研修会について ■
 - 三ヶ月にわたり毎週オンラインで英語ディベートを一緒に練習を行う研修会を開催します。
 - 基礎的なことから、プレゼンと練習があります
 https://docs.google.com/document/d/1igGm5Sy9WmkZiPkDTDdLYe9ZitnuzJ8CwHKTt58wdKM/edit

 ■ オンライン route hディベート大会 ■
 2/18, 2/19  
- 三回目となるroute h ディベート大会です。
https://docs.google.com/document/d/1KOLqvLZR18Z7vvLKGU3IDcGoRDTMZvw3Q5TLqNKfYIY/edit?usp=sharing


いずれかに興味がありましたら、申し込みいただけますと幸いです。

運営者一同`

  }
  

  public createMailDraftExecute(userEmail, title, content ) {

    const objArgs = { };
    if(userEmail){
      GmailApp.createDraft( userEmail, title, content, objArgs );
    }
 
  }
}

