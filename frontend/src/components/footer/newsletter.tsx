import React, { useState } from "react";
import { useMutation } from "react-query";
import { newsletterSubscribe } from "../../services/newsletter";
import Submit from "../submit";
import LoadingButton from "../loading-button";
import { getErrorMessage } from "../../utils/get-error-message";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { mutateAsync, isLoading, error, isError, isSuccess } =
    useMutation(newsletterSubscribe);

  const isDisabled = !email.length || isLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    await mutateAsync(email).catch(() => null);
    setEmail("");
  };

  return (
    <section className="flex flex-col">
      <h1 className="text-font text-lg uppercase tracking-widest mb-2">
        Newsletter
      </h1>
      <form className="relative h-[40px] flex text-sm" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 placeholder:text-black border border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoadingButton isLoading={isLoading}>
          <Submit disabled={isDisabled}>Submit</Submit>
        </LoadingButton>
        <div className="absolute left-0 -bottom-6 text-xs">
          {isError ? (
            <span className="text-red-500">{getErrorMessage(error)}</span>
          ) : null}
          {isSuccess ? (
            <span className="text-font">
              Thanks for subscribe to our newsletter!
            </span>
          ) : null}
        </div>
      </form>
    </section>
  );
};

export default Newsletter;
