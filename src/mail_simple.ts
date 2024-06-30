

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
    const SHEET_NAME = "送信時調節２";
    var spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
    // (2)Sheetを開く
    var sheet = spreadSheet.getSheetByName(SHEET_NAME);
    // (3)セルの範囲を指定・(4)値の取得
    var table = sheet.getRange('H1:J1380').getValues();
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
    const title = "英語ディベート大会 @Tokyo  7月14日(日)初心者 7月15日(祝) のアナウンス"

    this.createMailDraftExecute(userEmail, title, content )
  }


  createMailContent(shoolName, userName ){
    return `${shoolName} ${userName}様

    英語ディベート大会に参加頂きたくご連絡させていただきました。
    
    
    7月14日 (日曜) 小学生中学生のディベート初心者大会
    https://docs.google.com/document/d/1V_drc29vaWnDFE6krmlmRiuNkRpvZ5afjBhZF-X5LKU/edit
    
    7月14日 (日曜) ：小学生英語ディスカッション
    https://docs.google.com/document/d/1CkKpQ9ybFXZe7NqFCvwtz90q38hQbMSXRt9e2DPw8TA/edit
    
    7月15日  (月曜・祝日)：中高生のディベート経験者向け大会
    https://docs.google.com/document/d/1sucGOvXZZ_1NnbIwW-Dty1RBrn_pRmPOBFgk6-chx7Y/edit
    

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

