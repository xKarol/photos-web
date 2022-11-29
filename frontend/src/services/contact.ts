import axios from "axios";
import type { ContactSchema } from "../schemas/contact";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const createContact = async (data: ContactSchema): Promise<void> => {
  return axios.post(`${SERVER_URL}/contact`, data);
};
