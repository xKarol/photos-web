import type { contact as Schema } from "@app/schemas";
import type { API } from "@app/types";
import axios from "../../../libs/axios";

export const createContact = async (
  data: Schema.CreateSchema
): Promise<API["Contact"]["Create"]> => {
  return await axios.post(`/contact`, data);
};
