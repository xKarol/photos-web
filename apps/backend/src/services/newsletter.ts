import { prisma } from "database";

import logger from "../utils/logger";
import { sendEmail } from "../utils/mailer";

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
