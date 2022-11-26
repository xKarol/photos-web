import nodemailer, { type SendMailOptions } from "nodemailer";

import { nodemailerConfig } from "../config/nodemailer";

import logger from "./logger";

export const transporter = nodemailer.createTransport(nodemailerConfig);

export const transporterVerify = async () => {
  const isSuccess = await transporter.verify();
  if (!isSuccess) {
    logger.error("Nodemailer could not connect to the server");
    return;
  }
  logger.info("Nodemailer is ready to take messages");
};

export const sendEmail = async (options: SendMailOptions) => {
  return await transporter.sendMail({
    from: process.env.MAIL_LOGIN,
    ...options,
  });
};
