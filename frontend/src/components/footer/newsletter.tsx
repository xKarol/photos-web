import React, { useState } from "react";
import { useMutation } from "react-query";
import Spinner from "../spinner";
import { newsletterSubscribe } from "../../services/newsletter";
import Submit from "../submit";

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
        <Submit>{isLoading ? <Spinner /> : "Submit"}</Submit>
        {isError ? (
          <span>
            {error instanceof Error ? error.message : "Unknown error"}
          </span>
        ) : null}
        {isSuccess ? (
          <span>Thanks for subscribe to our newsletter!</span>
        ) : null}
      </form>
    </section>
  );
};

export default Newsletter;
