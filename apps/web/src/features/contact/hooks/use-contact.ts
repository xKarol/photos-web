import { useMutation } from "@tanstack/react-query";

import { createContact } from "../services/contact";

const useContact = () =>
  useMutation({
    mutationFn: createContact,
  });

export default useContact;
