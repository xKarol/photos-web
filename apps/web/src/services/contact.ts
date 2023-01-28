import axios from "../libs/axios";
import type { contact as Schema } from "schemas";
import type { API } from "types";

export const createContact = async (
  data: Schema.CreateSchema
): Promise<API["Contact"]["Create"]> => {
  return await axios.post(`/contact`, data);
};
