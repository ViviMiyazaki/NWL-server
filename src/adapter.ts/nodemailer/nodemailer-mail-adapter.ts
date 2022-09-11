import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port:2525,
  auth: {
    user: '68446666646df6',
    pass: '8903ef8fedf03d'
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body}: SendMailData) {

    await transport.sendMail({
    from: 'Equipe Feedget <oi@vivi.com>',
    to: 'Maria <vivimiyazaki@gmail.com>',
    subject: subject,
    html: body,
    })
  }
}