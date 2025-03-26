"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Navbar } from "@/components/ui/navbar";
import "@fontsource/poppins";
import React from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { confetti } from "tsparticles-confetti";

export default function challenge2() {
  const [flag1, setFlag1] = React.useState("");
  const [flag, setFlag2] = React.useState("");
  const questionId = "q2";

  function handleSubmit1(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (flag1 !== "First part of Challenge 2 solved") {
      toast.error("Incorrect flag. Try again!");
      return;
    }
  
    toast.success("First flag correct!");
    setTimeout(() => {
      toast("Keep an eye on the console...", { icon: "👀" });
    }, 2000);

    setInterval(() => {
      console.log("🔗 Secret repo: https://github.com/krishna-shrivastav232702/ctf-flag-2");
  
      setTimeout(() => {
        console.clear();
      }, 1000);
    }, 30000);
  }

  async function handleSubmit2(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");
      if (!userId){
        console.error("user not logged in, userId not found");
        return;
      }
      const response = await axios.post("/api/challenge2", {flag, userId, questionId});
      
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { y: 0.6 },
        });
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error){
      console.log(error);
    }
    
  }

    return (
        <div>
          <Navbar />
          <Toaster />
          <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased mt-24">
            <div className="w-full p-4 flex flex-col items-center">
              <h1 className="relative z-10 text-lg md:text-3xl  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 text-center font-[Poppins] font-bold py-4 pt-0">
                Challenge 2
              </h1>
              <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 text-xl text-center relative z-10 font-[Poppins] font-semibold">
                Solve the challenge below to capture a flag!
              </h3>
    
              <ul className="flex flex-col gap-4 w-full pt-6 px-4 md:p-20 lg:px-48">
                <GridItem
                  title="Description:"
                  description={
                    <div>
                       In software development, deprecated dependencies are outdated packages that are no longer maintained, may have security vulnerabilities, or have been replaced by better alternatives. Running an application with deprecated dependencies can cause issues, including compatibility errors and broken functionality.
                    </div>
                  }
                />
                <GridItem
                  title="Task:"
                  description={
                    <div>
                      You have been given a React application, but it doesn’t run as expected. Something in its setup is holding it back. Explore its configuration, experiment with changes, and uncover what needs to be adjusted to make it work. 
                      Prerequisite: Ensure you have Node.js (version 16.x recommended) installed before you begin.
                    </div>
                  }
                />
                <GridItem
                  title="Instructions:"
                  description={
                    <div>
                      <ol className="list-decimal list-inside">
                        <li>
                        Clone this {" "}
                        <Link
                            href="https://github.com/krishna-shrivastav232702/Ctf-c-2"
                            target="_blank"
                            className="text-blue-400"
                          >
                            repository
                          </Link>
                          .
                        </li>
                        <li>Fix and run the React app to obtain the first flag.</li>
                        <li>Enter the first flag in the first input field.</li>
                        <li>If the flag is correct, something interesting might happen...</li>
                      </ol>
                    </div>
                  }
                />
              </ul>
    
              <input
                type="text"
                placeholder="Answer here!"
                value={flag1}
                onChange={(e) => setFlag1(e.target.value)}
                className="rounded-lg border-1 border-teal-500 focus:ring-2 focus:ring-teal-400 mx-auto max-w-md w-full relative z-10  bg-neutral-950 placeholder:text-neutral-500 text-white p-3 outline-none transition-all duration-200 mb-4"
              />
            </div>
            <button type="submit" onClick={handleSubmit1} className="px-8 py-2 text-black font-bold font-[Poppins] text-lg rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-400 hover:to-green-400 hover:text-black cursor-pointer mb-5">
              Submit
            </button>
            <br />
            <ul className="flex flex-col gap-4 w-full !pt-0 px-2 md:p-20 lg:px-48">
                <GridItem
                  title="A second step"
                  description={
                    <div>
                       Something appears for a brief moment... but only for those who are watching closely. If you miss it, you might have to wait. The second input isn’t just there for decoration—perhaps it’s waiting for something only you can find.
                       <br/>
                       Good luck! 🚀
                    </div>
                  }
                />
            </ul>
            <input
                type="text"
                placeholder="Answer here!"
                value={flag}
                onChange={(e) => setFlag2(e.target.value)}
                className="rounded-lg border-1 border-teal-500 focus:ring-2 focus:ring-teal-400 mx-auto max-w-md w-full relative z-10  bg-neutral-950 placeholder:text-neutral-500 text-white p-3 outline-none transition-all duration-200 mb-6"
              />
            <button type="submit" onClick={handleSubmit2} className="px-8 py-2 text-black font-bold font-[Poppins] text-lg rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-400 hover:to-green-400 hover:text-black cursor-pointer mb-5">
              Submit
            </button>
            <Link href="/challenge2">
              <button className="px-8 py-2 text-black font-bold font-[Poppins] text-lg rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-400 hover:to-green-400 hover:text-black cursor-pointer mt-5 mb-10 ">
                Go to challenge 2 <span className="font-bold">→</span>
              </button>
            </Link>
            <BackgroundBeams />
          </div>
        </div>
      );
    }
    
    interface GridItemProps {
      title: string;
      description: React.ReactNode;
    }
    
    const GridItem = ({ title, description }: GridItemProps) => {
      return (
        <li>
          <div className="relative h-full rounded-2.5xl p-2 md:rounded-3xl md:p-3 bg-black z-30 select-none">
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
     