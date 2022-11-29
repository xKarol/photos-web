import { prisma } from "../db";
import logger from "../utils/logger";
import { sendEmail } from "../utils/mailer";

export const sendNewsletters = async () => {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    select: { email: true },
  });
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
