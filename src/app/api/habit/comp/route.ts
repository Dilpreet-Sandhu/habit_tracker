
import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { HabitModel } from "@/models/habit";
import { StreakModel } from "@/models/streak.model";


export async function POST(request : Request) {
    await dbConnect();

    try {

        const {habitId} = await request.json();

        const session = await getServerSession(authOptions);
        console.log(habitId);

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you should be logged in to perform this action"),{status:400});
        }

        const habit = await HabitModel.findById(habitId);

        if (!habit) {
            return Response.json(new ApiHandler(false,"not habit found for the given id"),{status:400});
        }

        habit.isCompleted = true;
        habit.lastUpdated = new Date();
        const streak = await StreakModel.updateOne({habit : habitId,user : session.user._id},{
            $inc : {counter : 1}
        });

        if (!streak) {
            console.log("no streak ");
        }

        return Response.json(new ApiHandler(true,"habit updated succesfully"),{status:200});

        
    } catch (error) {
        console.log("error while send post request of completion: " , error);
        return Response.json(new ApiHandler(false,"couldn't send request",),{status:500})
    }
}