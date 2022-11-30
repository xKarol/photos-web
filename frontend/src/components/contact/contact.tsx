import React from "react";
import InputField from "../input-field";
import Submit from "../submit";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../schemas/contact";
import { useMutation } from "react-query";
import { createContact } from "../../services/contact";
import LoadingButton from "../../components/loading-button";
import { getErrorMessage } from "../../utils/get-error-message";
import { fields } from "./fields";
import ContactFields from "./contact-fields";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
  });
  const { mutateAsync, isLoading, error, isError, isSuccess } =
    useMutation(createContact);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isLoading) return;
    await mutateAsync(data);
    reset();
  };

  return (
    <form
      className="flex flex-col space-y-[25px] max-w-[500px] relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl">Contact</h1>
      <ContactFields fields={fields} errors={errors} register={register} />

      <LoadingButton isLoading={isLoading}>
        <Submit className="ml-auto text-sm py-2">Submit</Submit>
      </LoadingButton>
      {isError ? (
        <span className="text-red-400 absolute text-sm bottom-0 left-0">
          {getErrorMessage(error)}
        </span>
      ) : null}
      {isSuccess ? (
        <span className="absolute text-sm bottom-0 left-0">
          Message has been sent.
        </span>
      ) : null}
    </form>
  );
};

export default Contact;
