

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



  createMailDraft(userEmail, shoolName, userName) {

    const content = this.createMailContent(shoolName, userName)
    const title = "route H　英語ディベート大会のご案内（2/19：経験者 2/20: 初心者）"

    this.createMailDraftExecute(userEmail, title, content )
  }


  createMailContent(shoolName, userName ){
    return `${shoolName} ${userName}様

２０２２年２月にも再度、英語ディベート大会を開催させていただくので
ご連絡させていただきました。

＜概要＞
  ２月１９日（土）：経験者向けの大会
  ２月２０日（日）：初心者向けの大会


＜要綱＞
https://docs.google.com/document/d/1oVPxgseEbCy2j9FvliXoAQCiuojARgXgJ78vUP9RvGI/edit?usp=sharing


＜特徴＞
  できるだけたくさんの人が参加できるように工夫しました。
  - 提供ジャッジ不要
  - 部員が少ない中高一貫校の場合：中学生と高校生で組んでの参加も可能です。
  - 部員が多い学校の場合：何チームでも参加可能です。全員でご参加ください。ビギナーは初心者大会、連盟杯に出場する人は、経験者ラウンドにご参加ください
  - 部員が本当に少ない場合：個人での参加でも大丈夫です。こちらで他の個人参加のひとと組み合わせます。
  - ルールがわかっていない人の場合：事前練習会を週に二回開いているので、学んでからの参加が可能です。

たくさんのご参加をお待ちしております。

何卒よろしくお願いいたします

Route H 英語ディベート大会運営者一同`

  }
  

  public createMailDraftExecute(userEmail, title, content ) {

    const objArgs = { };
    GmailApp.createDraft( userEmail, title, content, objArgs );
 
  }
}


