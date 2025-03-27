"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import "@fontsource/poppins";
import React from "react";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Navbar } from "@/components/ui/navbar";

const DATA = [
  {
    title: "Challenge1",
    link: "/challenges/challenge_1",
    description: "XOR Encryption-Decryption",
  },
  {
    title: "Challenge2",
    link: "/challenges/challenge_2",
    description: "React Downgrade Quest",
  },
  {
    title: "Challenge3",
    link: "/challenges/challenge_3",
    description: "Hidden Clues in the image",
  },
];

const Challenges: React.FC = () => (
  <div className="min-h-screen bg-black text-white font-[Poppins]">
    <Navbar />
    <main className="px-56 py-10 text-center font-[Poppins]">
      <h1 className="text-3xl font-bold mb-8 font-[Poppins] mt-24">
        Challenges
      </h1>
      <HoverEffect items={DATA} />
    </main>
    <BackgroundBeams />
  </div>
);

export default Challenges;
