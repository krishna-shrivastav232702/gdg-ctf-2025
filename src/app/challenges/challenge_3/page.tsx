"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Navbar } from "@/components/ui/navbar";
import "@fontsource/poppins";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { confetti } from "tsparticles-confetti";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function challenge3() {
  const { user, refreshUserData } = useAuth();
  const [answer, setAnswer] = React.useState("");
  const maxAttempts = 1;

  const isSubmitDisabled = (user?.challenge3Attempts ?? 0) >= maxAttempts;

  useEffect(() => {
    refreshUserData();
  }, []);

  const onSubmit = () => {
    if (!answer.length) {
      toast.error("Please enter a valid answer!");
      return;
    }
    const userId = localStorage.getItem("userId");

    axios
      .post("/api/challenge3", {
        flag: answer,
        userId,
        questionId: "q3",
      })
      .then(({ data }) => {
        if (data.success) {
          toast.success(data.message);
          confetti({
            particleCount: 100,
            spread: 160,
            origin: { y: 0.6 },
          });
          refreshUserData();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ?? "Something went wrong! Try again!"
        );
      })
      .finally(() => {
        refreshUserData();
      });
  };

  return (
    <div>
      <Navbar />
      <div className=" w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased mt-24 mb-20">
        <div className="w-full p-4 flex flex-col items-center">
          <h1 className="relative z-10 text-lg md:text-3xl  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 text-center font-[Poppins] font-bold py-4 pt-0">
            Challenge 3
          </h1>
          <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 text-xl text-center relative z-10 font-[Poppins] font-semibold">
            Solve the challenge below to capture a flag!
          </h3>

          <ul className="flex flex-col gap-4 w-full pt-6 px-4 md:p-20 lg:px-48">
            <GridItem
              title="Hidden Clue Quest"
              description={
                <div>
                  In this challenge, your task is to closely examine an image to
                  uncover a hidden flag. Pay attention to subtle details—what
                  you’re looking for might not be visible at first glance.{" "}The
                  answer lies where you least expect it!
                </div>
              }
            />
            {/* <GridItem
              title="Description:"
              description={
                <div>
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-[Poppins] text-balance   dark:text-white">
                    <code>What is Steganography?</code>
                  </h3>
                  <br />
                  Steganography is the practice of hiding information within
                  other files, such as images, audio, or video.
                </div>
              }
            /> */}
            <GridItem
              title="Instructions:"
              description={
                <div>
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-[Poppins] text-balance text-white">
                    <code>Find the hidden flag in the image</code>
                  </h3>
                  <br />
                  <Image
                    src={require("../../img.png")}
                    width={500}
                    height={150}
                    alt="A description of the image"
                    unoptimized={true}
                  />
                  Analyze the image to find the hidden flag.
                </div>
              }
            />
          </ul>

          <input
            type="text"
            placeholder="Answer here!"
            className="rounded-lg border-2 border-teal-500 focus:ring-4 focus:ring-teal-400 mx-auto max-w-md w-full relative z-10  bg-neutral-950 placeholder:text-neutral-500 text-white p-3 outline-none transition-all duration-200"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            disabled={isSubmitDisabled}
          />
        </div>
        <button
          className={`px-8 py-2 text-black font-bold text-lg rounded-2xl ${
            isSubmitDisabled
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-400 hover:to-green-400 hover:text-black cursor-pointer"
          } mb-5 z-10`}
          onClick={onSubmit}
          disabled={isSubmitDisabled}
        >
          {isSubmitDisabled ? "No Attempts Left" : "Submit"}
        </button>
        <div className="relative z-10  text-xl dark:text-white text-black text-xl">
          Number of Attempts: {maxAttempts - (user?.challenge3Attempts || 0)}
        </div>
        <br />
        <br />

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
