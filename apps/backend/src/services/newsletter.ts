import type { Newsletter } from "@app/types";

import mailchimp from "../lib/mailchimp";
import type * as Schema from "../schemas/newsletter";
import logger from "../utils/logger";

const newsletterListId = process.env.MAILCHIMP_NEWSLETTER_LIST_ID as string;

export const subscribeToNewsletter: Newsletter.Services["subscribe"] = async ({
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
