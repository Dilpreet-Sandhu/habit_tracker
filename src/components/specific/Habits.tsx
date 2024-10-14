"use client";

import type { Habit } from "@/models/habit";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";

import { useDeleteHabitMutation, useGetHabitsQuery, useUpdateHabitMutation } from "@/redux/slices/apiSlice";

export default function Habits() {
  
  const {data : unCompletedHabits,isLoading} = useGetHabitsQuery();
  const {data : completedHabits,isLoading : newLoading} = useGetHabitsQuery(true);

  const habitData = unCompletedHabits?.data as Habit[];
  const newHabitData = completedHabits?.data as Habit[];


  return (
    <div className="w-full  h-full mt-16 pt-5">
      <h1 className="bold-text">Uncompleted Habits</h1>

      {/* habits */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-wrap gap-5 mt-5">
          {habitData ? habitData?.map((habit,idx) => (
            <Habit key={idx}  habit={habit} />
          )) : <h1 className="text-xl font-semibold text-black my-3">No Uncompleted habits</h1>}
        </div>
      )}

      <h1 className="bold-text mt-5">Complited Habits</h1>

      {/* habits */}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-wrap gap-5 mt-5">
          {newHabitData?.map((habit,idx) => (
            <Habit key={idx} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
}

const Habit = ({ habit }: { habit: Habit }) => {

  const [deleteHabit] = useDeleteHabitMutation();
  const [updateHabit]  = useUpdateHabitMutation();


  async function handleDeleteHabit() {
    try {

      const res = await deleteHabit(habit._id);

      if (res.data.success) {
        toast(res.data.message,{type : "success"});
      }else {
        toast(res.data.message,{type : "error"});
      }
      
    } catch (error) {
      console.log("error while delete habit: ",error);
      toast("error while deleting habit",{type : "error"});
    }
  }


  async function handleHabitComplete() {
    try {

      const res = await updateHabit(habit._id);

      if (res.data.success) {
        toast(res.data.message,{type : "success"})
      }else {
        toast(res.data.message,{type : "error"})
      }
      
    } catch (error) {
      console.log("error while clicking complete habit: ",error);
      toast("error while completing habit",{type : "error"})
    }
  }

  const date = new Date(habit.reminder);
  const ISTOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
  const nowInIst = new Date(date.getTime() + ISTOffset);
  const habitHours = nowInIst.getHours();
  const habitMinutes = nowInIst.getMinutes();
  const amOrpm = habitHours > 12 ? 'PM' : 'AM';
  const habitTime =`${habitHours > 12 ? habitHours -12 : habitHours }:${habitMinutes < 10 ? `0${habitMinutes}` : habitMinutes} ${amOrpm}`;
    
  return (
    <motion.div
        initial={{opacity :0,scale : 0}}
        whileInView={{opacity : 1,scale : 1 }}
        transition={{delay : 0.4}}
      className={`border-dark ${
        habit.isCompleted == true ? "bg-green-200" : "background"
      } border-[2px]  px-2 flex rounded-md w-[420px] h-[153px]`}
    >
      <div className="flex-1">
        <h1 className={`${habit.isCompleted == true ? "text-zinc-600 " : "dark-text"} font-bold text-2xl mt-2`}>{habit?.title}</h1>
        <p className="dark-p-text mt-1">{habit?.description}</p>
        <p className="dark-p-text">starts at : {habitTime}</p>
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
