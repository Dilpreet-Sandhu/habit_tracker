"use client";
import { useApi } from "@/hooks/useApi";
import axios from "axios";
import { UploadIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ArrowUpRight } from "lucide-react";
import { CreateHabit } from "@/components/models/AnimatedModel";
import { motion } from "framer-motion";
import Habits from "@/components/specific/Habits";
import { useGetStreaksQuery } from "@/redux/slices/apiSlice";
import { Streak } from "@/models/streak.model";
import { Skeleton } from "@/components/ui/skeleton";
import EditDialog from "@/components/dashboard/EditDialog";
import { useAppSelector } from "@/redux/store";


export default function Page() {

  const {data,isLoading} = useGetStreaksQuery();
  const streakData = data?.data as any[];


  const {editDialog} = useAppSelector(state => state.misc);

  console.log(editDialog);
  
  return (
    <main className="w-full px-20  min-h-[91vh] max-h-fit ">
      <div className="w-full h-20 py-2">
        <h1 className="bold-text">Your streaks</h1>

      {/* streaks section */}
        <div className="w-full flex overflow-x-scroll overflow-y-visible scrollbar-hidden  gap-4  h-fit px-2  " id="streaks">
          {!isLoading ? streakData.map((streak, idx) => (
            <motion.div
              initial={{opacity :0,x : "-40%"}}
              whileInView={{opacity : 1,x : "0"}}
              transition={{delay : idx * 0.1}}
              key={idx}
              className="bg-zinc-500 border-black border-[2px] w-[14vw] h-[10vh] flex flex-shrink-0 items-center mt-4 rounded-md justify-start px-2"
            >
              <div className="flex flex-1 flex-col">

              <p className="text-white text-[1.3vw] text-nowrap font-semibold mb-1 ">
                {streak?.habit?.title}
              </p>
              <div className="flex">
                <span>difficulty :</span>
                {streak?.habit?.difficulty == "hard"
                  ? "😣"
                  : streak?.habit?.difficulty == "medium"
                  ? "😩"
                  : "😊"}
              </div>
              </div>
              <div className="w-9 h-full justify-center items-center flex flex-col gap-2">
                <span>🔥</span>
                  <p>{streak?.counter}</p>
              </div>
            </motion.div>
          )) : <Skeleton/>}
        </div>
      </div>

       <Habits/>

      <div id="bottomBtn" className="fixed bottom-5 h-[5vh] left-0 right-0 flex  justify-center">
        <CreateHabit />
      </div>

      {
        editDialog ? <EditDialog/> : null
      }
    </main>
  );
}
