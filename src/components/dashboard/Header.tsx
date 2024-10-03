"use client";
import React from "react";
import { navLinks } from "@/lib/helper";
import { BellIcon, Calendar, LogIn, ToggleRightIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Header() {

  const {data : session} = useSession();

  return (
    <div className="w-full h-16 border-b-[2px] flex items-center justify-between px-5 border-black">
      <h1 className="text-2xl text-zinc-800 font-bold">Habit Flow</h1>
      <div className="px-3 flex gap-4">
        <div
          aria-label="theme toggle"
          aria-description="theme toggle"
          className="ml-2 cursor-pointer"
        >
          <ToggleRightIcon />
        </div>
        <div
          aria-label="notificaiton"
          aria-description="notificaiton"
          className="ml-2 cursor-pointer"
        >
          <BellIcon />
        </div>
        <div
          aria-label="calender"
          aria-description="calender"
          className="ml-2 cursor-pointer"
        >
          <Calendar />
        </div>
        <div
          aria-label="user"
          aria-description="user"
          className="ml-2 cursor-pointer"
        >
        {session?.user ? <User/> : <LogIn/>}
        </div>
      </div>
    </div>
  );
}
