'use client'
import { LabelInputContainer } from "@/components/InputContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {useDebounceCallback} from 'usehooks-ts';
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {ArrowBigLeft, ArrowDownRight, ArrowUpNarrowWide, ArrowUpRight, Loader, Loader2, LoaderCircle} from 'lucide-react';
import { ResponseHandler } from "@/lib/ApiResponseHandler";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BottomGradient } from "@/components/BottomGradient";


export default function Page() {

    const [username,setUsername] = useState("");
    const [usernameToBeChecked,setUsernameToBeChecked] = useState("");
    const [usernameMessage,setUsernameMessage] = useState("");
    const [isUsernameChecking,setIsUsernameChecking] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);


    const debouncedValue = useDebounceCallback(setUsernameToBeChecked,500);
    const router = useRouter();




    useEffect(() => {
        async function checkUsername() {
            if (usernameToBeChecked) {
                setIsUsernameChecking(true);
                setUsernameMessage("");
                try {

                    const res = await axios.get(`/api/checkUsername?username=${usernameToBeChecked}`);

                    if (res.data) {
                        setUsernameMessage(res.data.message);
                    }
                    
                } catch (error) {
                    console.log("error while checking username: ",error);
                    setUsernameMessage("couldn't check username");
                }finally {
                    setIsUsernameChecking(false);
                }
            }
        }
        checkUsername();

    },[usernameToBeChecked])



    async function onSubmit(e : React.FormEvent<HTMLFormElement>) {

      e.preventDefault();

      const form = new FormData(e.currentTarget);

      const username = form.get("username");
      const email = form.get("email");
      const password = form.get("password");

      const data = {
        username,
        email,
        password
      }
      
      try {
        setIsSubmitting(true);

        const res = await axios.post("/api/signUp",data);

        ResponseHandler(res);

        router.push("/login");


      } catch (error) {
        console.log("error while signing up user: ",error);
        toast("error while signing up user",{type : "error"});
      }finally {
        setIsSubmitting(false);
      }


    }



  return (
    <div className="bg-black w-full flex items-center justify-center h-screen">
      <Card className="m-auto w-[450px]">
        <CardHeader className="mx-auto">
          <CardTitle className="text-2xl mx-auto font-extrabold">Sign up</CardTitle>
          <CardDescription className="text-lg mx-auto font-medium">Already have an account ?
            <Link className="underline" href="/login">
                Login
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="my-8 flex flex-col">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">username</Label>
              <Input
                autoComplete="username"
                name="username"
                className="border-[2px] border-black"
                id="username"
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    debouncedValue(e.target.value)
                }}
              />
              {
                isUsernameChecking && <Loader/>
              }
            <Label htmlFor="username" className={usernameMessage == "username is available" ? "text-green-500" : "text-red-500"}>{usernameMessage ?? usernameMessage }</Label>


            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">email</Label>
              <Input
                autoComplete="email"
                name="email"
                className="border-[2px] border-black"
                id="email"
                placeholder="email"
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">password</Label>
              <Input
                autoComplete="password"
                name="password"
                className="border-[2px] border-black"
                id="password"
                placeholder="* * * * *"
                type="password"
              />
            </LabelInputContainer>

            <button disabled={isSubmitting} type="submit" className="bg-black py-3 flex items-center justify-center gap-3 rounded-md mt-3 px-10 text-white">
              Sign Up <ArrowUpRight/>
                <BottomGradient/>
              </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
  
}
