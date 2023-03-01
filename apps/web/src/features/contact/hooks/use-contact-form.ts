import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contact as Schema } from "schemas";
import type { FormValues } from "../types";
import useContact from "./use-contact";

const useContactForm = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit: handleFormSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema.createContact),
  });
  const { mutateAsync, isLoading, error, isError, isSuccess } = useContact();

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

export default useContactForm;
