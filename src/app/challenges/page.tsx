"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import "@fontsource/poppins";
import React from "react";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const Navbar: React.FC = () => (
  <nav className="bg-transparent text-white p-4 flex items-center justify-between relative z-10 font-[Poppins]">
    <div className="flex items-center space-x-2">
      <Image
        alt="logo"
        src={require("../gdgnmit_logo.webp")}
        width={50}
        height={50}
      />
    </div>
    <div className="flex items-center space-x-6">
      <Link
        href="/challenge1"
        className="hover:text-gray-400 cursor-pointer font-[Poppins]"
      >
        Challenge 1
      </Link>
      <Link
        href="/challenge2"
        className="hover:text-gray-400 cursor-pointer font-[Poppins]"
      >
        Challenge 2
      </Link>
      <Link
        href="/challenge3"
        className="hover:text-gray-400 cursor-pointer font-[Poppins]"
      >
        Challenge 3
      </Link>
      <div className="flex items-center space-x-2 font-[Poppins]">
        <FaUserCircle className="text-2xl" />
        <span>John Doe</span>
      </div>
    </div>
  </nav>
);

const DATA = [
  {
    title: "Challenge1",
    link: "/challenge1",
    description: "XOR Encryption-Decryption",
  },
  {
    title: "Challenge2",
    link: "/challenge2",
    description: "React Downgrade Quest",
  },
  {
    title: "Challenge3",
    link: "/challenge3",
    description: "Hidden Clues in the image",
  },
];

const Challenges: React.FC = () => (
  <BackgroundBeams>
    <div className="min-h-screen bg-black text-white font-[Poppins]">
      <Navbar />
      <main className="px-56 py-10 text-center font-[Poppins]">
        <h1 className="text-3xl font-bold mb-8 font-[Poppins]">Challenges</h1>
        <HoverEffect items={DATA} />
      </main>
    </div>
  </BackgroundBeams>
);

export default Challenges;
