import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { HabitModel } from "@/models/habit.model";


export async function POST(request : Request) {
    await dbConnect();

    try {

        const {habitId} = await request.json();

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you should be logged in to perform this action"),{status:400});
        }

        const habit = await HabitModel.findById(habitId);

        if (!habit) {
            return Response.json(new ApiHandler(false,"not habit found for the given id"),{status:400});
        }

        habit.isCompleted = true;
        habit.lastUpdated = new Date(Date.now());
        await habit.save({validateBeforeSave: false});

        return Response.json(new ApiHandler(true,"habit updated succesfully"),{status:200});

        
    } catch (error) {
        console.log("error while send post request of completion: " , error);
        return Response.json(new ApiHandler(false,"couldn't send request",),{status:500})
    }
}