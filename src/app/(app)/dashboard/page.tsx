/*eslint-disable no-console*/
"use client";
import EditDialog from "@/components/dashboard/EditDialog";
import { CreateHabit } from "@/components/models/AnimatedModel";
import Habits from "@/components/specific/Habits";
import { Skeleton } from "@/components/ui/skeleton";
import { messaging } from "@/lib/firebase";
import {
  useGetStreaksQuery,
  useSendFcmTokenMutation
} from "@/redux/slices/apiSlice";
import { useAppSelector } from "@/redux/store";
import { getToken } from "firebase/messaging";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { data, isLoading } = useGetStreaksQuery();
  const streakData = data?.data as any[];
  const [sendToken] = useSendFcmTokenMutation();

  const { editDialog } = useAppSelector((state) => state.misc);
  const { data: session } = useSession();
 
  async function requestPermission() {
    try {
      const status = await Notification.requestPermission();
      if (!messaging) return;

      if (status == "granted") {
        console.log("permission granted");

        if (!session?.user.fcmToken) {
          const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_VAPI_KEY,
          });

          if (token) {
            console.log("your fcm token: ", token);
            //send the token to backend
            const res = await sendToken(token);

            if (res.data.success) {
              toast(res.data.message, { type: "success" });
            } else {
              toast(res.data.message, { type: "error" });
            }
          } else {
            console.log("no registeration token available");
          }
        } else {
          return;
        }
      } else if (status == "denied") {
        toast(
          "if you deny permision we won't be able to send you notification for your habits",
          { type: "warning" }
        );
      }
    } catch (error) {
      console.log("error while requesting permission", error);
    }
  }
  useEffect(() => {
    requestPermission();

  });



  

  return (
    <main className="w-full px-20  min-h-[91vh] max-h-fit ">
      <div className="w-full h-20 py-2">
        <h1 className="bold-text">Your streaks</h1>

        {/* streaks section */}
        <div
          className="w-full flex overflow-x-scroll overflow-y-visible scrollbar-hidden  gap-4  h-fit px-2  "
          id="streaks"
        >
          {!isLoading ? (
            streakData.map((streak, idx) => (
              <motion.div
                initial={{ opacity: 0, x: "-40%" }}
                whileInView={{ opacity: 1, x: "0" }}
                transition={{ delay: idx * 0.1 }}
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
            ))
          ) : (
            <Skeleton />
          )}
        </div>
      </div>

      <Habits />

      <div
        id="bottomBtn"
        className="fixed bottom-5 h-[5vh] left-0 right-0 flex  justify-center"
      >
        <CreateHabit/>
      </div>


      {editDialog ? <EditDialog /> : null}
    </main>
  );
}
