"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold py-4">
          Unlock Access with SQL!
        </h1>
        <p></p>
        <p className="text-neutral-400 max-w-lg mx-auto my-2 text-base text-center relative z-10">
        To access the login/signup page, write a valid SQL query that retrieves <code>usernames</code> and <code>emails</code> from the <code>users</code> table.
        </p>
        <input
          type="text"
          placeholder="query goes here!"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700 p-3"
        />
      </div>
      <button className="px-3 py-2 rounded-lg font-sans border-2 border-neutral-800 cursor-pointer relative z-10">
        Submit
        </button>
      <BackgroundBeams />
    </div>
  );
}