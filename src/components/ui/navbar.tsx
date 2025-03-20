import { BackgroundBeams } from "@/components/ui/background-beams";
import "@fontsource/poppins";
import React from "react";

import { HoverEffect } from "@/components/ui/card-hover-effect";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export const Navbar: React.FC = () => (
  <nav className="bg-black text-white p-4 flex items-center justify-between fixed z-40 font-[Poppins] top-0 left-0 w-full">
    <div className="flex items-center space-x-2">
      <Image
        alt="logo"
        src={require("@/app/gdgnmit_logo.webp")}
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
      <Link
        href="/flags"
        className="hover:text-gray-400 cursor-pointer font-[Poppins]"
      >
        Flags Captured
      </Link>
      <div className="flex items-center space-x-2 font-[Poppins]">
        <FaUserCircle className="text-2xl" />
        <span>John Doe</span>
      </div>
    </div>
  </nav>
);
