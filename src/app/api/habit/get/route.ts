import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ApiHandler } from "@/lib/apiHandler";
import { HabitModel } from "@/models/habit";

export async function GET(request : Request) {
    await dbConnect();
    try {

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you are not logged in"),{status:400});
        }

        const habits = await HabitModel.find({user : session.user._id});

        if (!habits) {
            return Response.json(new ApiHandler(false,"please create some habits"),{status:400});
        }
     

        return Response.json(new ApiHandler(true,"fetched habits successfully",habits),{status:200});

    } catch (error) {
        console.log("error while fetching habits",error);
        return Response.json(new ApiHandler(false,"couldn't fetch habits"),{status:500});
    }
}