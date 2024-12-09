

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
    const SHEET_NAME = "送信調節３";
    var spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
    // (2)Sheetを開く
    var sheet = spreadSheet.getSheetByName(SHEET_NAME);
    // (3)セルの範囲を指定・(4)値の取得
    var table = sheet.getRange('H1:J1730').getValues();
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
    const title = "英語ディベート大会 @Tokyo  1月19日(日)経験者 3月2日(日)初心者 のアナウンス"

    this.createMailDraftExecute(userEmail, title, content )
  }


  createMailContent(shoolName, userName ){
    return `${shoolName} ${userName}様

    英語ディベート大会に参加頂きたくご連絡させていただきました。


  経験者大会：　2025年 1月19日  (日曜)
  https://docs.google.com/document/d/1Ap_Z7R_ZjDKE94uBFWvO-spX4Yat1N5bu-6eQX3lOfA/edit?tab=t.0

  初心者大会： 2025年3月2日 (日曜)
  https://docs.google.com/document/d/1WNz2aEPeP-NrQVLl8UEDt_vCypFbqWzcWhUCfCGUYXc/edit?tab=t.0

  哲学対話：  2025年3月2日  (日曜)
  https://docs.google.com/document/d/1ZKoQ_uOmkNZNUeklyYaf0fwUldAoZxmJZ-2GwNMmIz4/edit?tab=t.0


    [特徴]
    - 提供ジャッジ不要で何チームでも参加できるので、普段大会に出場できる機会が無い方でも参加できます
    - 初心者大会は順位よりも楽しむのを重要視して運営いたします
    - レベル分けを厳密に行うので、実力差がありすぎる相手と対戦することはありません
    - 個人での申し込みが可能です


    質問はこちらのメールか
    Line:  https://line.me/ti/p/8m97k13AO6
    に質問いただけると嬉しいです


    何卒よろしくお願いいたします

    運営一同`

  }


  public createMailDraftExecute(userEmail, title, content ) {

    const objArgs = { };
    if(userEmail){
      GmailApp.createDraft( userEmail, title, content, objArgs );
    }

  }
}
