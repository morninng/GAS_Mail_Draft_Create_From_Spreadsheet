import { Hoge } from "./src/hoge";
import { MailSimple } from "./src/mail_simple";

export function handler() {
    let hoge = new Hoge();
    hoge.readSheet();
    hoge.createForm()

}


export function create_email_format() {
  let mail = new MailSimple();
  mail.createMailDraftTest();

}


export function readSheet() {
  let mail = new MailSimple();
  mail.readSheet();

}


export function readSheetAndSendMail() {
  let mail = new MailSimple();
  mail.readSheetAndSendMail();

}



