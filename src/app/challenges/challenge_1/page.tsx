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
import { useAuth } from "@/context/AuthContext";

export default function challenge1() {
  const {refreshUserData} = useAuth();
  const questionId = "q1";
  const [encryptedText, setEncryptedText] = React.useState("");
  const [flag, setFlag] = React.useState("");

  async function getEncryptedText() {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("No userId found in localStorage");
        return;
      }
      const response = await axios.post("/api/challenge1", {userId});
      setEncryptedText(response.data.encryptedFlag);
    }
    catch (error) {
      console.error("Error: Something went wrong");
    }
  }
  React.useEffect(() => {
    getEncryptedText();
  }, []);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId){
      console.error("user not logged in, userId not found");
      return;
    }

    try {
      const response = await axios.post("/api/ch1Submission", {flag, userId, questionId});
      
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { y: 0.6 },
        });
        refreshUserData();
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
            Challenge 1
          </h1>
          <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 text-xl text-center relative z-10 font-[Poppins] font-semibold">
            Solve the challenge below to capture a flag!
          </h3>

          <ul className="flex flex-col gap-4 w-full pt-6 px-4 md:p-20 lg:px-48">
            <GridItem
              title="XOR Decryption Challenge"
              description={
                <div>
                  This challenge involves decrypting a hidden message encrypted
                  using an XOR cipher. XOR encryption is a simple yet powerful
                  method often used in computer security. This guide will walk
                  you through the decryption process step by step, even if you
                  have no prior knowledge of cryptography.
                  <br />
                  <br />{" "}
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-[Poppins] text-balance text-black dark:text-white">
                    <code>What is XOR Encryption?</code>
                  </h3>
                  <br />
                  XOR (Exclusive OR) is a logical operation that outputs true
                  (1) when the inputs are different and false (0) when they are
                  the same. In encryption, XOR is commonly used to combine data
                  with a key, making it hard to decipher without the correct
                  key.
                </div>
              }
            />
            <GridItem
              title="Description:"
              description={
                <div>
                  You have intercepted an encrypted message
                  <br />
                  <div className="font-bold text-green-800 select-text">
                    {encryptedText || "Loading..."}
                  </div>
                  <br />
                  This message has been encrypted using an XOR cipher. Your task
                  is to decrypt it and retrieve the hidden flag.
                </div>
              }
            />
            <GridItem
              title="Instructions:"
              description={
                <div>
                  <ol className="list-decimal list-inside">
                    <li>
                      Figure out the correct decryption key—it’s something
                      unique to you.
                    </li>
                    <li>
                      Use an XOR decryption tool, such as{" "}
                      <Link
                        href="https://md5decrypt.net/en/Xor/"
                        target="_blank"
                        className="text-blue-400"
                      >
                        this one
                      </Link>
                      .
                    </li>
                    <li>Set Input type to Hex.</li>
                    <li>Enter the correct Key.</li>
                    <li>Set Output type to Text and decrypt the message.</li>
                    <li>The decrypted text is the flag.</li>
                  </ol>
                  💡 Hint: The key is something you use to identify yourself.
                </div>
              }
            />
          </ul>

          <input
            type="text"
            placeholder="Answer here!"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            className="rounded-lg border-1 border-teal-500 focus:ring-2 focus:ring-teal-400 mx-auto max-w-md w-full relative z-10  bg-neutral-950 placeholder:text-neutral-500 text-white p-3 outline-none transition-all duration-200"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="px-8 py-2 text-black font-bold font-[Poppins] text-lg rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-400 hover:to-green-400 hover:text-black cursor-pointer mb-5">
          Submit
        </button>
        <br />
        <br />
        <Link href="/challenges/challenge_2">
          <button className="px-8 py-2 text-black font-bold font-[Poppins] text-lg rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-400 hover:to-green-400 hover:text-black cursor-pointer mb-10 ">
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
