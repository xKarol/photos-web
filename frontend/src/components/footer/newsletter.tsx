import React, { useState } from "react";
import { useMutation } from "react-query";
import Spinner from "../spinner";
import { newsletterSubscribe } from "../../services/newsletter";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { mutate, isLoading, error, isError } =
    useMutation(newsletterSubscribe);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    mutate(email);
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
        <button
          type="submit"
          className="relative px-5 w-[100px] bg-black text-white h-[calc(100%-1px)] mt-[-3px] ml-[3px] 
         before:absolute before:left-[-4px] before:top-[2px] before:h-full
         before:w-[4px] before:border before:border-black before:skew-y-[-45deg]
         after:absolute after:left-[-2px] after:top-[100%] after:h-[4px]
         after:w-full after:border after:border-black after:skew-x-[-45deg]"
        >
          {isLoading ? <Spinner /> : "Submit"}
        </button>
        {isError ? (
          <span>
            {error instanceof Error ? error.message : "Unknown error"}
          </span>
        ) : null}
      </form>
    </section>
  );
};

export default Newsletter;
