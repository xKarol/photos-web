import { apiUrls } from "@app/config";
import type { newsletter as Schema } from "@app/schemas";
import type { API } from "@app/types";

import axios from "../../../libs/axios";

export const newsletterSubscribe = async (
  email: Schema.SubscribeNewsletter
): Promise<API["Newsletter"]["Subscribe"]> => {
  return await axios.post(apiUrls.newsletter.subscribe, email);
};
