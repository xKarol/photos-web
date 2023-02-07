import nodemailer, { type SendMailOptions } from "nodemailer";

import { nodemailerConfig } from "../config/nodemailer";

import logger from "./logger";

export const transporter = nodemailer.createTransport(nodemailerConfig);

export const transporterVerify = async () => {
  try {
    const isSuccess = await transporter.verify();
    logger.info("Nodemailer is ready to take messages");
    return isSuccess;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown";
    logger.error(`Nodemailer could not connect to the server: ${message}`);
    throw e;
  }
};

export const sendEmail = async (options: SendMailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        ...options,
      },
      (error, info) => {
        if (error) return reject(error);
        resolve(info);

        if (process.env.NODE_ENV === "dev") {
          console.log(
            `Send Mail -> [${
              info.messageId
            }] Preview URL: ${nodemailer.getTestMessageUrl(info)}`
          );
        }
      }
    );
  });
};
