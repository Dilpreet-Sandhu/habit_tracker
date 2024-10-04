"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { Skeleton } from "../ui/skeleton";


export default function Habits() {

    const [habits,setHabits] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        async function fetchHabits() {
            try {
                setLoading(true);
                const res = await axios("/api/habit/get");

                if (res.data) {
                    setHabits(res?.data?.data);
                    
                }
                
            } catch (error) {
                console.log("error while fetching habits: ",error);
                toast("error while fetching habits",{type :"error"});
            } finally {
                setLoading(false);
            }
        }
        fetchHabits();
    },[])

    console.log(habits);

  return (
    <div className="w-full h-[60vh] mt-16 pt-5">
       <h1 className="bold-text">Your Habits</h1>

       {/* habits */}
       {
        loading ? <Skeleton/> : (
            <div className="flex flex-wrap gap-5 mt-5">
                {habits.map((habit) => (
                    <div className="background w-[100px] h-[50px]">

                    </div>
                ))}
            </div>
        )
       }
    </div>
  )
}
