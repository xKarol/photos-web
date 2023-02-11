import type { contact as Schema } from "schemas";
import type { API } from "types";
import axios from "../libs/axios";

export const createContact = async (
  data: Schema.CreateSchema
): Promise<API["Contact"]["Create"]> => {
  return await axios.post(`/contact`, data);
};
