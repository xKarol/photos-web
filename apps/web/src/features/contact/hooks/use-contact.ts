import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../../schemas/contact";
import { useMutation } from "react-query";
import { createContact } from "../../../services/contact";
import type { FormValues } from "../types";

const useContact = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit: handleFormSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
  });
  const { mutateAsync, isLoading, error, isError, isSuccess } =
    useMutation(createContact);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isLoading) return;
    await mutateAsync(data).catch(() => null);
    reset();
  };

  return {
    error,
    isLoading,
    isError,
    isSuccess,
    errors,
    register,
    handleSubmit: handleFormSubmit(onSubmit),
  };
};

export default useContact;
