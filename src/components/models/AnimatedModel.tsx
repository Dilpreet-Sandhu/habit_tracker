"use client";
import { useCreatHabitMutation } from "@/redux/slices/apiSlice";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { LabelInputContainer } from "../InputContainer";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface habitdata {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  frequency: "daily" | "weekly";
  reminder: Date;
}

export function CreateHabit() {
  const [createHabit] = useCreatHabitMutation();
  const [habitData, setHabitData] = useState<habitdata>({
    title: "",
    description: "",
    difficulty: "easy",
    frequency: "daily",
    reminder: new Date(),
  });
  const [time, setTime] = useState<string>("12:00");

  const combineDateAndTime = (time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number);

    const today = new Date();

    // Set hours and minutes from the input time
    today.setHours(hours, minutes, 0, 0); // seconds and milliseconds set to 0
    return today;
  };

  async function handleCreateHabit() {
    habitData.reminder = combineDateAndTime(time);
    console.log(habitData);
    
    try {
      const res = await createHabit(habitData);
      
      if (res.data.success) {
        toast(res.data.message,{type : "success"})
      }else{
        toast(res.data.message,{type : "error"})
      }
      
    } catch (error) {
      console.log("error while creating habit: ", error);
      toast("error while creating habit", { type: "error" });
    }
    setHabitData( {title: "",
    description: "",
    difficulty: "easy",
    frequency: "daily",
    reminder: new Date()});
  }

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-white border-black border-[2px] text-xl font-bold px-20 py-4 text-black flex justify-center group/modal-btn">
          <motion.span
           className="flex item-center justify-center gap-2  text-center transition duration-500">
            Create a Habit <ArrowUpRight className="mt-1" />
          </motion.span>
        </ModalTrigger>
        <ModalBody className="p-2 h-[80vh]">
          <ModalContent>
            <form className="flex flex-col gap-5">
              <LabelInputContainer>
                <Label>Title</Label>
                <Input
                  value={habitData.title}
                  onChange={(e) =>
                    setHabitData({ ...habitData, title: e.target.value })
                  }
                  name="title"
                  placeholder="title"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label>description</Label>
                <Input
                  value={habitData.description}
                  onChange={(e) =>
                    setHabitData({ ...habitData, description: e.target.value })
                  }
                  name="description"
                  placeholder="description"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label>reminder</Label>
                <Input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  name="reminder"
                  placeholder="reminder"
                  type="time"
                />
              </LabelInputContainer>
            </form>
            <section className="mt-5 w-full">
              <div className="w-full h-10 flex gap-2 mt-4 flex-col">
                <Label>Select the difficulty</Label>
                <div className="flex mt-3 text-base font-bold gap-4">
                  <button
                    onClick={() =>
                      setHabitData({ ...habitData, difficulty: "easy" })
                    }
                    className={` px-7 hover:bg-green-300 ${
                      habitData.difficulty === "easy" && "bg-green-500"
                    } transition-all duration-500 py-2 rounded-md border-black outline-0 border-[2px] `}
                  >
                    easy
                  </button>
                  <button
                    onClick={() =>
                      setHabitData({ ...habitData, difficulty: "medium" })
                    }
                    className={` px-7 hover:hover:bg-blue-300 ${
                      habitData.difficulty == "medium" && "bg-blue-500"
                    } py-2 rounded-md border-black outline-0 border-[2px] `}
                  >
                    medium
                  </button>
                  <button
                    onClick={() =>
                      setHabitData({ ...habitData, difficulty: "hard" })
                    }
                    className={` px-7 hover:bg-red-300 py-2 ${
                      habitData.difficulty == "hard" && "bg-red-500"
                    } rounded-md border-black outline-0 border-[2px] `}
                  >
                    difficult
                  </button>
                </div>
              </div>
            </section>
            <section className="mt-5 w-full">
              <div className="w-full h-10 flex gap-2 mt-7 flex-col">
                <Label>Reset reminder </Label>
                <div className="flex  text-base font-bold gap-4">
                  <button
                    onClick={() =>
                      setHabitData({ ...habitData, frequency: "daily" })
                    }
                    className={` px-7 hover:bg-blue-300 ${
                      habitData.frequency === "daily" && "bg-blue-500"
                    } transition-all duration-500 py-2 rounded-md border-black outline-0 border-[2px]`}
                  >
                    daily
                  </button>
                  <button
                    onClick={() =>
                      setHabitData({ ...habitData, frequency: "weekly" })
                    }
                    className={` px-7 hover:hover:bg-green-300 ${
                      habitData.frequency === "weekly" && "bg-green-500"
                    } py-2 rounded-md border-black outline-0 border-[2px] `}
                  >
                    weeky
                  </button>
                </div>
              </div>
            </section>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button
              onClick={handleCreateHabit}
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
            >
              Create
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
