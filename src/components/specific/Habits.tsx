"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";
import { Check } from "lucide-react";
import type { Habit } from "@/models/habit";
import { motion } from "framer-motion";

import { useGetHabitsQuery, useLazyGetHabitsQuery } from "@/redux/slices/apiSlice";

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabits,setNewHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const {data,error,isLoading} = useGetHabitsQuery();

  const habitData = data?.data as Habit[];

 

  useEffect(() => {
    async function fetchHabits() {
      try {

        const res = await axios.get("/api/habit/get");
        if (res?.data) {
          setHabits(res?.data?.data);
        }
        const response = await axios.get("/api/habit/get?completed=true");

        if (response.data) {
          setNewHabits(response?.data?.data);
        }

      } catch (error) {
        console.log("error while fetching habits: ", error);
        toast("error while fetching habits", { type: "error" });
      } 
    }
    fetchHabits();
  }, []);

 

  return (
    <div className="w-full h-full mt-16 pt-5">
      <h1 className="bold-text">Uncompleted Habits</h1>

      {/* habits */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-wrap gap-5 mt-5">
          {habits?.map((habit,idx) => (
            <Habit key={idx}  habit={habit} />
          ))}
        </div>
      )}

      <h1 className="bold-text mt-5">Complited Habits</h1>

      {/* habits */}
      {loading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-wrap gap-5 mt-5">
          {newHabits?.map((habit,idx) => (
            <Habit key={idx} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
}

const Habit = ({ habit }: { habit: Habit }) => {


  async function handleDeleteHabit() {
    try {

      const res = await axios.delete(`/api/habit/delete/${habit?._id}`);

      if (res.status == 200) {
        toast(res.data.message,{type : "success"});
      }else {
        toast(res.data.message,{type : "error"});
      }
      
    } catch (error) {
      console.log("error while delete habit: ",error);
      toast("error while deleting habit",{type : "error"});
    }
  }
  console.log(habit);

  async function handleHabitComplete() {
    try {

      const res = await axios.post("/api/habit/comp",{habitId : habit._id});

      if (res.status == 200) {
        toast(res.data.message,{type : "success"})
      }else {
        toast(res.data.message,{type : "error"})
      }
      
    } catch (error) {
      console.log("error while clicking complete habit: ",error);
      toast("error while completing habit",{type : "error"})
    }
  }
    
  return (
    <motion.div
        initial={{opacity :0,scale : 0}}
        whileInView={{opacity : 1,scale : 1 }}
        transition={{delay : 0.4}}
      className={`border-dark ${
        habit.isCompleted == true ? "bg-green-200" : "background"
      } border-[2px]  px-2 flex rounded-md w-[420px] h-[130px]`}
    >
      <div className="flex-1">
        <h1 className={`${habit.isCompleted == true ? "text-zinc-600 " : "dark-text"} font-bold text-2xl mt-2`}>{habit?.title}</h1>
        <p className="dark-p-text mt-1">{habit?.description}</p>
        <div className="flex mt-4 gap-3">
          <span className="badge">{habit?.frequency}</span>
          <span className="badge">{habit?.difficulty}</span>
        </div>
      </div>
      <div className="w-[100px] flex flex-col justify-center gap-4 items-center h-full ">
        <button onClick={handleHabitComplete} disabled={habit.isCompleted} className={`bg-white rounded-md disabled:opacity-50  ${habit.isCompleted == true ? "border-black text-black" : "border-[#DCA47C] dark-text"} flex items-center justify-center  border-[2px] w-full h-10`}>
         {habit.isCompleted ? "Completed" : <span className="flex items-center gap-2 justify-center"> Done <Check /></span>}
        </button>
        <button onClick={handleDeleteHabit}  className={` rounded-md  text-red-400 font-bold border-red-600  flex items-center justify-center  border-[2px] w-full h-10`}>
          delete
        </button>
      </div>
    </motion.div>
  );
};