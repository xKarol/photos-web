import React from "react";
import LoadingButton from "../../../components/loading-button";
import { getErrorMessage } from "../../../utils/get-error-message";
import Alert from "../../../components/alert";
import useNewsletter from "../hooks/use-newsletter";

const Newsletter = () => {
  const {
    handleSubmit,
    email,
    setEmail,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useNewsletter();

  return (
    <section className="flex flex-col">
      <h1 className="mb-2 text-lg uppercase tracking-widest text-font">
        Newsletter
      </h1>
      <form
        className="relative flex h-[40px] text-sm"
        onSubmit={handleSubmit}
        aria-label="form"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-black px-5 placeholder:text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <LoadingButton
          variant="3d"
          isLoading={isLoading}
          disabled={email.length <= 0}
          loadingComponentProps={{ color: "white" }}
        >
          Submit
        </LoadingButton>
        <div className="absolute -bottom-6 left-0 text-xs">
          {isError ? (
            <Alert variant="error">{getErrorMessage(error)}</Alert>
          ) : null}
          {isSuccess ? (
            <Alert>Thanks for subscribe to our newsletter!</Alert>
          ) : null}
        </div>
      </form>
    </section>
  );
};

export default Newsletter;
