"use client";
import { BottomGradient } from "@/components/BottomGradient";
import { LabelInputContainer } from "@/components/InputContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/schema/authSchemas";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function SignupFormDemo() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //form data
    const form = new FormData(e.currentTarget);
    const identifier = form.get("identifier");
    const password = form.get("password");


    //zod validation
    const signInForm = {
      identifier,
      password,
    };

    const result = signInSchema.safeParse(signInForm);

   

    if (!result.success) {
      toast("please enter both fields correctly",{type : "error"});
      return 
    }


    const res = await signIn("credentials",{
      identifier : result.data.identifier,
      password : result.data.password,
      redirect : true
    });

    if (res?.error) {
      if (res?.error == "CredentialsSignIn") {
        toast("Incorrect email or password",{type : "error"})
      }
    }else {
      toast("you are logged in",{type : "success"});
    }

    



  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full mx-auto  rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Habit Flow
        </h2>
        <p className="text-neutral-800 text-md max-w-sm mt-2 dark:text-neutral-300">
          Dont't have an account ? <Link href="/sign-up" className="underline">Sign up</Link>
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email or username">Email or Username</Label>
            <Input
            autoComplete="identifier"
              name="identifier"
              className="border-[2px] border-black"
              id="email"
              placeholder="usename or email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="password"
              name="password"
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
          

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign In &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
    
  );
}




