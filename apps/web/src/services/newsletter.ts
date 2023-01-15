import axios from "axios";
import type { newsletter as Schema } from "schemas";
import type { API } from "types";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const newsletterSubscribe = async (
  email: Schema.SubscribeNewsletter
): Promise<API["Newsletter"]["Subscribe"]> => {
  return await axios.post(`${SERVER_URL}/newsletter/subscribe`, email);
};
