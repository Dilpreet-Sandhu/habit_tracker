import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";




export async function GET() {
    await dbConnect();

    try {
        const { StreakModel } = await import('@/models/streak.model');

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you are not logged in"),{status:400});

        }

        const streaks = await StreakModel.find({user :session.user._id}).populate("habit","title difficulty frequency");

        if (!streaks) {
            return Response.json(new ApiHandler(true,"you haven't started any habit yet"),{status:400});
        }
        

        return Response.json(new ApiHandler(true,"fetched streaks succesfully",streaks),{status:200});

        
    } catch (error) {
        console.log("error while fetching streaks: ",error);
        return Response.json(new ApiHandler(false,"error while fetching streaks"),{status:500})
    }

}