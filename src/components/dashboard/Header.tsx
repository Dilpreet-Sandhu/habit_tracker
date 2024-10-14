"use client";
import { setEditDialogOpen } from "@/redux/slices/slice";
import { BellIcon, Calendar, LogOut, MessageCircle, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Header() {

  const {data : session} = useSession();
  const dispath = useDispatch();

  return (
    <div className="w-full h-16 border-b-[2px] flex items-center justify-between px-5 border-black">
      <h1 className="text-2xl text-zinc-800 font-bold">Habit Flow</h1>
      <div className="px-3 flex gap-4">
        <Link
        href="/ai"

          className="ml-2 cursor-pointer"
        >

          <MessageCircle/>

        </Link>
        {/* <div
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
        </div> */}
        <div
          aria-label="user"
          aria-description="user"
          className="ml-2 cursor-pointer"
          onClick={() => dispath(setEditDialogOpen())}
        >
       <User/> 
        </div>
        <div
          aria-label="user"
          aria-description="user"
          className="ml-2 cursor-pointer"
          onClick={() => signOut()}
        >
       <LogOut/> 
        </div>
      </div>
    </div>
  );
}
