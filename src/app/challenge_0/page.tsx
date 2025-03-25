"use client";
import "@fontsource/poppins";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Challenge0() {
  const [input, setInput] = React.useState("");
  const router = useRouter();

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

  const correctAnswer = "nohtyp";

  if (input.trim() === correctAnswer) {
    toast.success("Correct! Redirecting...");
    setTimeout(() => router.push("/signup")); 
  } else {
    toast.error("Incorrect answer! Try again.");
  }

  }
  return (
    <div className="w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased mb-20">
      <Toaster/>
      <div className="w-full p-4 flex flex-col items-center">
        <h1 className="relative z-10 text-lg md:text-3xl  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 text-center font-[Poppins] font-bold py-4 pb-2">
          You think getting started is easy?
        </h1>
        <h1 className="relative z-10 text-lg md:text-3xl  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 text-center font-[Poppins] font-bold py-4 pt-0">
          No way Pal!
        </h1>
        <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 text-xl text-center relative z-10 font-[Poppins] font-semibold">
          Solve the challenge below to proceed to the signup page!
        </h3>

        <ul className="grid grid-cols-12 grid-rows-4 gap-4 xl:max-h-[45rem] w-full pt-6 px-8 z-30 select-none">
          <GridItem
            area="col-span-10 col-start-2 row-span-2"
            title="Read the passage carefully:"
            description="In the world of software development, there's always a debate about efficiency versus flexibility. Some argue that strongly typed languages provide better security and performance, while others favor dynamically typed languages for their rapid prototyping capabilities. A key player in this ongoing discussion is a language known for its white-space sensitivity, making code both elegant and strict. Many developers appreciate its ability to handle everything from automation to machine learning, yet some feel constrained by its interpreted nature. Despite these debates, what truly matters is how efficiently a language allows a developer to express ideas and solve problems. If you look closely, you might already know which language fits this description, but sometimes the best insights require a second glance—perhaps in a different direction."
          />
          <GridItem
            area="col-span-10 col-start-2 row-span-1"
            title="Answer this question:"
            description="Which programming language is known for its white-space sensitivity and versatility in automation and AI?"
          />
          <GridItem
            area="col-span-10 col-start-2 row-span-1"
            title="Hint:"
            description={<div>In crunch situations, sometimes all you gotta do is to <u>inspect</u> the situation!
            <br/> <span style={{ display: "none" }}>Write your answer backwards!</span>
            </div>}
          />
        </ul>
        <input
          type="text"
          placeholder="answer here!"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="rounded-lg border-1 border-teal-500 focus:ring-2 focus:ring-teal-400 mx-auto max-w-md w-full relative z-10  bg-neutral-950 placeholder:text-neutral-500 text-white p-3 outline-none transition-all duration-200 mt-9"
        />
      </div>
      <button onClick={handleSubmit} className="relative z-10 px-8 py-2 text-black font-bold font-[Poppins] text-lg rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-400 hover:to-green-400 hover:text-black cursor-pointer">
        Submit
      </button>
      <BackgroundBeams />
    </div>
  );
}

interface GridItemProps {
  area: string;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[9rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl p-2 md:rounded-3xl md:p-3 z-30 bg-black">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-[Poppins] -tracking-4 md:text-xl/[1.875rem] text-balance text-white">
                <code>{title}</code>
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem]
              md:text-base/[1.375rem] text-neutral-400"
              >
                <code>{description}</code>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
