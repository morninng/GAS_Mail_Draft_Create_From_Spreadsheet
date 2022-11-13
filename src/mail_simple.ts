

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
    const title = "対面英語ディベート大会@渋谷のご案内 (2023/1/21：経験者 1/22: 初心者）"

    this.createMailDraftExecute(userEmail, title, content )
  }


  createMailContent(shoolName, userName ){
    return `${shoolName} ${userName}様

    英語ディベートの大会などで以前お世話になったかたがたに
    メールさせていただいております。
    久しぶりに対面での英語ディベート大会を開催させていただこうと思っております。
    
    ＜場所＞
    　青山学院　(東京都 渋谷駅 徒歩１０分)
    
    ＜日時＞
    1月21日 (土曜): 経験者大会(中高対象)
    1月22日 (日曜): 初心者大会(小中対象)
    1月22日 (日曜): 哲学対話(小学生低学年から対象)
    
    
    
    ＜詳細＞
    https://docs.google.com/document/d/1XAYwbkQDweU16oHW3LlvrEitobZA8I_DtVkmVNLm3nU/edit?usp=sharing
    
    <コンセプト>.
     - 経験者大会と初心者大会と分けることで、レベルにあわせた参加ができる
     - 学校などからの参加は何チームでも大丈夫。はじめての大会の人にも安心できる。
     - 対面で楽しむことができ、事前の練習会などでも交流を深める機会を増やす。
    
    
    実施内容が問題で参加ができない方などがいらっしゃいましたら調節させていただく予定ですので、
    メッセージをいただけると幸いです。
    
    
    大会の他に、誰でも参加できるオンライン練習会も無料で開催しています。
    https://line.me/ti/g2/s7hPzfvcT8QQFHWQ9wm4J5SmOtLbSGmU5d-aYg
    こちらもご参加いただけると嬉しいです。
    
    また、別件ですが、2023年02月18日(土)        2023年02月19日(日)　にオンラインの大会も企画しております。
    詳細が決まりしだいまたご連絡させていただきます
    
    
    何卒よろしくお願いいたします。
    
    大会運営者一同`

  }
  

  public createMailDraftExecute(userEmail, title, content ) {

    const objArgs = { };
    if(userEmail){
      GmailApp.createDraft( userEmail, title, content, objArgs );
    }
 
  }
}

