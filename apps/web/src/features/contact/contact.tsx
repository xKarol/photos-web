import React from "react";
import Image from "next/image";
import LoadingButton from "../../components/loading-button";
import { getErrorMessage } from "../../utils/get-error-message";
import constactFieldsData from "./constants/contact-fields";
import ContactFields from "./components/contact-fields";
import Alert from "../../components/alert";
import useContactForm from "./hooks/use-contact-form";
import aboutImg from "../../../public/assets/about.jpg";
import Heading from "../../components/heading/heading";

const Contact = () => {
  const {
    isSuccess,
    isLoading,
    isError,
    error,
    handleSubmit,
    errors,
    register,
  } = useContactForm();

  return (
    <>
      <div className="flex columns-2 flex-col space-y-20 md:flex-row md:space-y-0 md:space-x-10 lg:space-x-20">
        <div className="flex-1">
          <Image
            src={aboutImg}
            alt="contact image"
            width={500}
            height={600}
            style={{ objectFit: "cover" }}
            className="max-h-[600px] w-full md:max-w-[500px]"
          />
        </div>
        <div className="flex-1">
          <form
            className="relative flex flex-col space-y-[25px]"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <Heading className="mb-2 text-2xl">Contact</Heading>
              <p className="text-sm">
                Send us a message for general inquiries.
              </p>
            </div>
            <ContactFields
              fields={constactFieldsData}
              errors={errors}
              register={register}
            />
            <LoadingButton
              isLoading={isLoading}
              className="btn-3d ml-auto py-2 text-sm"
            >
              Submit
            </LoadingButton>

            {isError ? (
              <Alert variant="error" className="absolute bottom-0 left-0">
                {getErrorMessage(error)}
              </Alert>
            ) : null}
            {isSuccess ? (
              <Alert className="absolute bottom-0 left-0">
                Message has been sent.
              </Alert>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
