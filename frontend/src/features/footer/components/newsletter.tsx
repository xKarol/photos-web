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
      <h1 className="text-font text-lg uppercase tracking-widest mb-2">
        Newsletter
      </h1>
      <form
        className="relative h-[40px] flex text-sm"
        onSubmit={handleSubmit}
        aria-label="form"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 placeholder:text-black border border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <LoadingButton isLoading={isLoading} className="btn">
          Submit
        </LoadingButton>
        <div className="absolute left-0 -bottom-6 text-xs">
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
