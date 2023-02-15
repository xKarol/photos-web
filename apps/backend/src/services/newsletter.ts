import createError from "http-errors";
import { prisma } from "../lib/prisma";
import logger from "../utils/logger";
import { sendEmail } from "../utils/mailer";
import type * as Schema from "../schemas/newsletter";

export const subscribeToNewsletter = async (
  data: Schema.SubscribeNewsletter["body"]
) => {
  try {
    const response = await prisma.newsletterSubscriber.create({ data });
    return response;
  } catch {
    throw createError(400, "Could not subscribe to newsletter.");
  }
};

export const createTemplate = async (
  data: Schema.CreateNewsletterTemplate["body"]
) => {
  try {
    const response = await prisma.newsletterTemplate.create({ data });
    return response;
  } catch {
    throw createError(400, "Could not create newsletter template.");
  }
};

export const sendNewsletters = async () => {
  const {
    subject,
    content,
    id: templateId,
  } = (await prisma.newsletterTemplate.findFirst({
    where: {
      sendAt: {
        lte: new Date(Date.now()),
      },
      delivered: {
        equals: false,
      },
    },
  })) || {};

  if (!subject && !content) return;

  const subscribers = await prisma.newsletterSubscriber.findMany({
    select: { email: true },
  });

  await prisma.newsletterTemplate.update({
    data: { delivered: true },
    where: { id: templateId },
  });

  for (const property in subscribers) {
    await sendEmail({
      to: subscribers[property].email,
      subject,
      html: content,
    });
  }

  logger.info(
    `Send mail (${templateId}) to ${subscribers.length} subscribers.`
  );
};
