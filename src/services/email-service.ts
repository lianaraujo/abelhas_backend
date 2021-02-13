import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import User from '../models/User';
import TemplateService from './template-service';

export interface SendMailData {
  user: User,
  options: {
    type: 'forgot' | 'recover' | 'register';
    token?: string;
  }
}

class EmailService {
  // transporter: Mail;

  // constructor() {
  //   nodemailer.createTestAccount().then(testAccount => {
  //     this.transporter = nodemailer.createTransport({
  //       host: "smtp.ethereal.email",
  //       port: 587,
  //       secure: false,
  //       auth: {
  //         user: testAccount.user,
  //         pass: testAccount.pass,
  //       },
  //     });
  //   });
  // }

  public static async sendMail({ user, options }: SendMailData): Promise<void> {
    nodemailer.createTestAccount().then(testAccount => {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      TemplateService.getMailData({ 
        user, 
        options
      }).then(mailData => {
        transporter.sendMail(mailData).then(info => {
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
      });

    });

    
  }  
}

export default EmailService;
