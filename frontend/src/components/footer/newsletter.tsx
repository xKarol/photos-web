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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    await mutateAsync(email);
    setEmail("");
  };

  return (
    <section>
      <form className="relative h-[40px] flex text-sm" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 placeholder:text-black border border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoadingButton isLoading={isLoading}>
          <Submit>Submit</Submit>
        </LoadingButton>
        {isError ? <span>{getErrorMessage(error)}</span> : null}
        {isSuccess ? (
          <span>Thanks for subscribe to our newsletter!</span>
        ) : null}
      </form>
    </section>
  );
};

export default Newsletter;
