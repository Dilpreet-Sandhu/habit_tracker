//@ts-nocheck

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { HabitModel } from "@/models/habit";
import { getServerSession } from "next-auth";

export async function POST(request : Request) {

    await dbConnect();

    try {

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you are not logged in"),{status:400})
        }

        const upcomingHabits = await HabitModel.find({user : session.user._id}).populate("user","fcmToken username");

        const UsNow = new Date();
        const ISTOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
        const now = new Date(UsNow.getTime() + ISTOffset);
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const time = `${hours}:${minutes}`; 

        upcomingHabits.forEach((habit) => {
            const hours = habit.reminder.getHours();
            const minutes = habit.reminder.getMinutes();
            const habitTime = `${hours}:${minutes}`;

            if (time == habitTime) {
                const message = {
                    notificaiton : {
                        title : "Habit Reminder",
                        body : `Time for ${habit.title}`
                    },
                    token : habit.user.fcmtoken,
                };

                messaging


            }

        })
        
        
    } catch (error) {
        console.log("error:",error);
    }

}