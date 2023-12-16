import { apiUrls } from "@app/config";
import type { Newsletter } from "@app/types";

import axios from "../../../libs/axios";

export const subscribeToNewsletter: Newsletter.Api["subscribe"] = async (
  email
) => {
  return await axios.post(apiUrls.newsletter.subscribe, email);
};
