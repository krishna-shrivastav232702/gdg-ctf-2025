import { BackgroundLines } from "@/components/ui/background-lines";
import "@fontsource/poppins";
import Link from "next/link";

export default function Home() {
  return (
    <BackgroundLines>
      <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white text-center p-4 font-[Poppins]">
        <div>
          <h1 className="text-6xl font-extrabold mb-8 p-4 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
            CodeSprint 3.0 <br /> Capture The Flag
          </h1>
          <p className="text-lg leading-relaxed max-w-lg mx-auto">
            CTF - Capture the Flag is an exciting website that serves as the
            second round of the highly anticipated event,{" "}
            <strong>GDSC Code Sprint</strong>. This engaging platform challenges
            participants to showcase their skills by cracking a password in
            order to progress to the next track of the competition.
          </p>

          <div className="mt-8">
            <p className="text-lg mb-4">
              Join us in this exciting challenge and showcase your skills!
            </p>
            <Link href="/sql-form">
              <button className="px-8 py-4 text-black font-bold text-lg rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-400 hover:to-green-400 hover:text-black cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}
