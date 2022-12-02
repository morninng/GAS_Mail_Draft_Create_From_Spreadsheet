

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
    Logger.log("readSheetAndSendMail");
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/1nq_J2XQmQMOtgx4pKxGj6RuWd5MBQdY-XUbLjIJ8b8w/edit#gid=359900617";
    const SHEET_NAME = "import debater";

    const participant_table_debater = this.readSheet(SHEET_URL, SHEET_NAME);
    Logger.log( participant_table_debater);

    const SHEET_URL2 =
    "https://docs.google.com/spreadsheets/d/1nq_J2XQmQMOtgx4pKxGj6RuWd5MBQdY-XUbLjIJ8b8w/edit#gid=359900617";
  const SHEET_NAME2 = "import judge";

  const participant_table_judge = this.readSheet(SHEET_URL2, SHEET_NAME2);

  Logger.log(participant_table_judge);


    for(let i = 1; i < participant_table_debater.length; i++){
      const row = participant_table_debater[i];

      const teikyou_name = row[0];
      const teikyou_num = row[1]
      const multipleApplicationSchool = row[4];
      const basePrice = row[5]
      const email = row[7];
      const applicationType = row[8]
      const userName = row[10]
      const telNumber = row[11]
      const teamName = row[20]
      const schoolName = row[21]
      const beginner_school_num = row[22] ? Number(row[22]) : 0;
      const beginner_team_num = row[23] ? Number(row[23]) : 0;
      const beginner_num = beginner_school_num + beginner_team_num;
      const experience_school_num = row[24] ? Number(row[24]) : 0;
      const experience_team_num = row[25] ? Number(row[25]) : 0;
      const experienced_num = experience_school_num + experience_team_num;
      const all_team_num = beginner_num + experienced_num;

      // Logger.log(`teikyou_name ${teikyou_name}`)
      // Logger.log(`teikyou_num ${teikyou_num}`)
      // Logger.log(`multipleApplicationSchool ${multipleApplicationSchool} `)
      // Logger.log(`basePrice ${basePrice}`)
      // Logger.log(`email ${email}`)
      // Logger.log(`applicationType ${applicationType}`)
      // Logger.log(`userName ${userName}`)
      // Logger.log(`telNumber ${telNumber}`)
      // Logger.log(`teamName ${teamName}`)
      // Logger.log(`beginner_school_num ${beginner_school_num}`)
      // Logger.log(`beginner_team_num ${beginner_team_num}`)
      // Logger.log(`beginner_num ${beginner_num}`)
      // Logger.log(`experience_school_num ${experience_school_num}`)
      // Logger.log(`experience_team_num ${experience_team_num}`)
      // Logger.log(`experienced_num ${experienced_num}`)
      // Logger.log(`all_team_num ${all_team_num}`)
      Logger.log(`-----------------------------`)

      // 学校　チーム
      if(!multipleApplicationSchool && email && applicationType.indexOf("個人申し込み") !== 0){

        const final_price = basePrice * all_team_num - teikyou_num * 1500;

        const title = this.createMailTitle(schoolName, teamName);
        // Logger.log(title);
        const message1 = this.createBegininng(schoolName, teamName, userName);
        const message2 = this.createMessageConfirmation(schoolName, teamName, userName, telNumber, beginner_num, experienced_num, teikyou_num, teikyou_name);
        const message3 = this.createMessageParticipantsREgistration()
        const message4 = this.createMessagePrice(basePrice, all_team_num, teikyou_num, final_price, teikyou_name );
        const message5 = this.createMessageEnd();
        const mailcontent = message1 + message2 + message3 + message4 + message5;
        // Logger.log(mailcontent);
        // Logger.log(email);

        this.createMailDraftExecute(email, title, mailcontent)


      }
      // 個人
      if(!multipleApplicationSchool && email && applicationType.indexOf("個人申し込み") === 0){




      }
    }
  }

  createMailTitle(schoolName, teamName){

    return `2022年 route h 英語ディベート大会 申し込み - ${schoolName} ${teamName}`

  }

  createBegininng(schoolName, teamName, userName){
    return ` ${schoolName} ${teamName} ${userName} 様

    この度は RouteH 即興ディベート大会へのご参加ありがとうございます。

    `
  }

  createMessageConfirmation(schoolName, teamName, userName, telNumber, beginner_num, experienced_num, teikyou_num, teikyou_name){
    let message =  `
    【1】申し込み内容確認

    団体: ${schoolName} ${teamName}
    代表者名: ${userName}
    代表者電話番号: ${telNumber}
    経験者大会(2月19日)参加数：${experienced_num}
    初心者大会(2月20日)参加数：${beginner_num}
    `
    if(teikyou_num){
      message = message + `
      提供ジャッジ: ${teikyou_num}
      提供ジャッジ：　${teikyou_name}
      `
    }
    return message;


  }


  createMessageParticipantsREgistration(){
    return `
    【2】参加するディベーターの登録

    https://forms.gle/2bmQWD82qEroDGYA9
    こちらから、チームのディベーターの名前を登録お願いします。(1 チームずつお願いします。)

    `
  }



  createMessagePrice(basePrice, all_team_num, teikyou_num, final_price, teikyou_name){
    let message =  `
    【3】参加費について
    合計: ${final_price} 円
    `
    if(all_team_num > 1){
      message = message + `内訳: ${basePrice}円  x ${all_team_num} チーム `
    }
    if(teikyou_num > 0){
      message = message + `
      提供ジャッジディスカウント 1500円 x ${teikyou_num}
      提供ジャッジ名： ${teikyou_name }
      `
    }
    message = message + `
    2 月 17 日 23:59 までにお支払いく ださい
    `;
    return message;
  }
  createMessageEnd(){
   return `
    【4】振込み金融機関情報
    銀行名:セブン銀行
    支店名:フリージア 支店
    店番号:102
    口座種類:普通
    口座番号:2783769
    口座名:メガ ツバサ

   【５】振込み時の注意
   振込みの際は、振込み者名を「ルートエイチ+学校名(チーム名)＋代表者名」にしてください。
   (例: ルートエイチ ○○コウコウ　山田太郎)

   お支払い完了メールをこのメールアドレスまで送信してください。
   件名:Route H大会支払いの完了1 - {学校名/チーム名/個人名}
   メッセージ:{学校またはチーム名}、{代表者名}が 22 RouteH の参加料を支払いました。


   【6】今後の連絡について
   　　今後は大会の参加者のみの入る Line open chatで連絡をさせていいただきます。
   　　代表者のみではなく、参加者全員がこちらのLineに入るようお願いいたします。

https://line.me/ti/g2/juJkrgXMMKTq0i4B90UoXqEt28SdnyRe6syP1A?utm_source=invitation&utm_medium=link_copy&utm_campaign=default
　　　事前の練習会にもできるだけ参加いただきたいので、生徒も含め、早めの参加をお願いいたします。


   お会いできるのを楽しみにしています!
    
    
    `

  }



  public readSheet(SHEET_URL: string, SHEET_NAME: string) {
    // (1)Spreadsheetファイルを開く
    var spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
    // (2)Sheetを開く
    var sheet = spreadSheet.getSheetByName(SHEET_NAME);
    // (3)セルの範囲を指定・(4)値の取得
    var table = sheet.getDataRange().getValues();
    // 結果を表示
    // Logger.log(table);
    // table.forEach((userdata)=>{
    //   Logger.log(userdata)
    // })
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


