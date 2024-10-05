import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ApiHandler } from "@/lib/apiHandler";
import { HabitModel } from "@/models/habit";

export async function GET(request : Request) {
    await dbConnect();
    try {

        const {searchParams} = new URL(request.url);

        const completed = searchParams.get("completed");

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you are not logged in"),{status:400});
        }

        const unCompletedHabits = await HabitModel.find({user : session.user._id,isCompleted : false});
        const completedHabits = await HabitModel.find({user : session.user._id,isCompleted : true});

        if (!unCompletedHabits || !completedHabits) {
            return Response.json(new ApiHandler(false,"please create some habits"),{status:400});
        }
     
        if (completed) {
            return Response.json(new ApiHandler(true,"fetchedCompleted Habits",completedHabits),{status:200});
        }

            return Response.json(new ApiHandler(true,"fetched habits successfully",unCompletedHabits),{status:200});
        


    } catch (error) {
        console.log("error while fetching habits",error);
        return Response.json(new ApiHandler(false,"couldn't fetch habits"),{status:500});
    }
}