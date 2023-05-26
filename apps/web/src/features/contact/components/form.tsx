import React from "react";
import LoadingButton from "../../../components/loading-button";
import { getErrorMessage } from "../../../utils/get-error-message";
import constactFieldsData from "../constants/contact-fields";
import ContactFields from "./../components/contact-fields";
import Alert from "../../../components/alert";
import useContactForm from "../hooks/use-contact-form";
import Heading from "../../../components/heading";

type Props = React.ComponentPropsWithoutRef<"form">;

const ContactForm = (props: Props) => {
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    handleSubmit,
    errors,
    register,
  } = useContactForm();
  const showAlert = isError || isSuccess;

  return (
    <form
      className="relative flex flex-col space-y-[25px]"
      onSubmit={handleSubmit}
      aria-label="contact us form"
      {...props}
    >
      <div className="mb-3">
        <Heading className="mb-2 text-2xl">Contact</Heading>
        <p className="text-sm">Send us a message for general inquiries.</p>
      </div>
      <ContactFields
        fields={constactFieldsData}
        errors={errors}
        register={register}
      />
      <LoadingButton
        variant="3d"
        isLoading={isLoading}
        className="ml-auto py-2 text-sm"
        loadingComponentProps={{ color: "white" }}
      >
        Submit
      </LoadingButton>

      {showAlert ? (
        <Alert
          variant={isError ? "error" : "info"}
          className="absolute bottom-0 left-0"
        >
          {isError ? getErrorMessage(error) : null}
          {isSuccess ? "Message has been sent." : null}
        </Alert>
      ) : null}
    </form>
  );
};

export default ContactForm;
