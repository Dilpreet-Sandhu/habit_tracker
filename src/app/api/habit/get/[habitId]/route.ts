import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { HabitModel } from "@/models/habit.model";


export async function GET(request : Request,{params} : {params : {habitId : string}}) {
    await dbConnect();
    try {

        const habitId = params.habitId;

        if (!habitId) {
            return Response.json(new ApiHandler(false,"please provide habit "),{status:400})
        }

        const habit = await HabitModel.findById(habitId);

        if (!habit) {
            return Response.json(new ApiHandler(false,"couldn't fetch habit"),{status:400})
        }

        return Response.json(new ApiHandler(true,"habit fetched successfully",habit),{status:200});

        
    } catch (error) {
        console.log("couldn't fetch specific habit ", error);
        return Response.json(new ApiHandler(false,"couldn't fetch specific habit"),{status:400});
    }
}