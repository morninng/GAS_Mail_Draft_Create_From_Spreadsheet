import { Hoge } from "./src/hoge";
import { Mail } from "./src/mail";

export function handler() {
    let hoge = new Hoge();
    hoge.readSheet();
    hoge.createForm()

}


export function create_email_format() {
  let mail = new Mail();
  mail.createMailDraftTest();

}


export function readSheet() {
  let mail = new Mail();
  mail.readSheet();

}


export function readSheetAndSendMail() {
  let mail = new Mail();
  mail.readSheetAndSendMail();

}



