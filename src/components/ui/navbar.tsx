import "@fontsource/poppins";
import React from "react";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  return (
    <nav className="bg-black text-white p-4 flex items-center justify-between fixed z-40 font-[Poppins] top-0 left-0 w-full">
      <Link href="/challenges" className="flex items-center space-x-2">
        <Image
          alt="logo"
          src={require("@/app/gdgnmit_logo.webp")}
          width={50}
          height={50}
        />
      </Link>
      <div className="flex items-center space-x-6">
        <Link
          href="/challenges/challenge_1"
          className="hover:text-gray-400 cursor-pointer font-[Poppins]"
        >
          Challenge 1
        </Link>
        <Link
          href="/challenges/challenge_2"
          className="hover:text-gray-400 cursor-pointer font-[Poppins]"
        >
          Challenge 2
        </Link>
        <Link
          href="/challenges/challenge_3"
          className="hover:text-gray-400 cursor-pointer font-[Poppins]"
        >
          Challenge 3
        </Link>
        <div
          
          className="hover:text-gray-400 cursor-pointer font-[Poppins]"
        >
          Flags Captured : {user?.capturedFlags}
        </div>
        <div className="flex items-center space-x-2 font-[Poppins]">
          <FaUserCircle className="text-2xl" />
          <span>{user?.username}</span>
        </div>
      </div>
    </nav>
  );
};
