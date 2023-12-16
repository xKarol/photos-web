import { apiUrls } from "@app/config";
import type { Contact } from "@app/types";

import axios from "../../../libs/axios";

export const createContact: Contact.Api["create"] = async (payload) => {
  const { data } = await axios.post(apiUrls.contact.create, payload);
  return data;
};
