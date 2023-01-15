import axios from "axios";
import type { contact as Schema } from "schemas";
import type { API } from "types";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createContact = async (
  data: Schema.CreateSchema
): Promise<API["Contact"]["Create"]> => {
  return await axios.post(`${SERVER_URL}/contact`, data);
};
