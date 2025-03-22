"use client";
import "@fontsource/poppins";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";

export default function SignupFormDemo() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user.username || !user.email || !user.password){
      toast.error("Please enter all fields correctly");
      return;
    }
    try {
      setLoading(true);
      
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
      toast.success("Signup successful");
      const {userId} = response.data;
      if (userId) {
        localStorage.setItem("userId", userId);
      }
    }
    catch (error:any) {
      toast.error("Signup Failed");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
    <div className="absolute inset-0 -z-10">
      <BackgroundBeams />
    </div>
      <h2 className="text-xl font-[Poppins] font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to CodeSprint 3.0
      </h2>
      <p className="mt-2 max-w-sm font-[Poppins] text-sm text-neutral-600 dark:text-neutral-300">
      Please register to move forward with the challenges!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">User name</Label>
            <Input id="username" placeholder="johndoe" type="text" value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="example@email.com" type="email" value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="password" type="password" value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})} />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer mb-4"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="login">Once Account is set up</Label>
          <Link href="/login">
          <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
        >
          Login Here &rarr;
          <BottomGradient />
        </button>   
        </Link>       
        </LabelInputContainer>
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};