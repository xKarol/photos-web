import SMTPTransport from "nodemailer/lib/smtp-transport";

export const nodemailerConfig: SMTPTransport.Options = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
};
