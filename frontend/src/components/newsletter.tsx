import React from "react";

const Newsletter = () => {
  return (
    <section>
      <div className="relative h-[40px] flex text-sm">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-5 placeholder:text-black border border-black"
        />
        <button
          className="relative px-5 bg-black text-white borderborder-black h-[calc(100%-1px)] mt-[-3px] ml-[3px] 
         before:absolute before:left-[-4px] before:top-[2px] before:h-full
         before:w-[4px] before:border before:border-black before:skew-y-[-45deg]
         after:absolute after:left-[-2px] after:top-[100%] after:h-[4px]
         after:w-full after:border after:border-black after:skew-x-[-45deg]"
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
