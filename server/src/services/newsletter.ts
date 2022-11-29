import { prisma } from "../db";
import { sendEmail } from "../utils/mailer";

export const sendNewsletters = async () => {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    select: { email: true },
  });
  const { subject, content } =
    (await prisma.newsletterTemplate.findFirst({
      where: {
        sendAt: {
          lte: new Date(Date.now()),
        },
      },
    })) || {};

  if (!subject && !content) return;

  for (const property in subscribers) {
    await sendEmail({
      to: subscribers[property].email,
      subject,
      html: content,
    });
  }
};
