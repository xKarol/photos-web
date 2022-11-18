import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { mutate } = useMutation((data: { email: string }) =>
    axios.post("http://localhost:4000/newsletter/subscribe", data)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email });
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
          className="relative px-5 bg-black text-white borderborder-black h-[calc(100%-1px)] mt-[-3px] ml-[3px] 
         before:absolute before:left-[-4px] before:top-[2px] before:h-full
         before:w-[4px] before:border before:border-black before:skew-y-[-45deg]
         after:absolute after:left-[-2px] after:top-[100%] after:h-[4px]
         after:w-full after:border after:border-black after:skew-x-[-45deg]"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
