"use client";
import { useApi } from "@/hooks/useApi";
import axios from "axios";
import { UploadIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowUpRight } from "lucide-react";
import { CreateHabit } from "@/components/models/AnimatedModel";
import { motion } from "framer-motion";
import Habits from "@/components/specific/Habits";

export default function Page() {
  const [streaks, setStreaks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStreaks() {
      try {
        const res = await axios.get("/api/streak/get");

        if (res.data) {
          setStreaks(res.data?.data);
        }
      } catch (error) {
        console.error("error while fetching streaks: ", error);
        toast("error whle fetching streaks ", { type: "error" });
      }
    }
    fetchStreaks();
  }, []);

 

  return (
    <main className="w-full px-20  h-[91vh] ">
      <div className="w-full h-20 py-2">
        <h1 className="bold-text">Your streaks</h1>


      {/* streaks section */}
        <div className="w-full flex gap-4  h-[15vh] px-2  " id="streaks">
          {streaks.map((streak, idx) => (
            <motion.div
              initial={{opacity :"0",x : "-40%"}}
              whileInView={{opacity : '1',x : "0"}}
              transition={{delay : idx * 0.1}}
              key={idx}
              className="bg-zinc-500 border-black border-[2px] w-[14vw] h-[10vh] flex flex-col items-start mt-4 rounded-md justify-center px-2"
            >
              <p className="text-white text-xl font-semibold mb-1 ">
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
            </motion.div>
          ))}
        </div>



      </div>

       <Habits/>

      <div className="absolute bottom-5 left-0 right-0 flex  justify-center">
        <CreateHabit />
      </div>
    </main>
  );
}
