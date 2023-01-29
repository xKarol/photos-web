import axios from "../libs/axios";
import type { newsletter as Schema } from "schemas";
import type { API } from "types";

export const newsletterSubscribe = async (
  email: Schema.SubscribeNewsletter
): Promise<API["Newsletter"]["Subscribe"]> => {
  return await axios.post(`/newsletter/subscribe`, email);
};