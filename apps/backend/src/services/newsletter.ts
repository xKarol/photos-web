import logger from "../utils/logger";
import type * as Schema from "../schemas/newsletter";
import mailchimp from "../lib/mailchimp";

const newsletterListId = process.env.MAILCHIMP_NEWSLETTER_LIST_ID as string;

export const subscribeToNewsletter = async ({
  email,
}: Schema.SubscribeNewsletter["body"]) => {
  try {
    const response = await mailchimp.lists.addListMember(newsletterListId, {
      email_address: email,
      status: "subscribed",
    });
    logger.info("User subscribed to the newsletter.");
    return response;
  } catch (e) {
    logger.error("User could not subscribe to the newsletter.", e);
  }
};
