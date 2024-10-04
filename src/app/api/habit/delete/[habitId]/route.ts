import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { HabitModel } from "@/models/habit";
import { StreakModel } from "@/models/streak.model";

export async function DELETE(request : Request,{params} : {params : {habitId : string}}) {
    await dbConnect();
    try {
        const {habitId} = params;

        if (!habitId) {
            return Response.json(new ApiHandler(false,"please provide habit id to delte it"),{status : 400});
        }

        const deletedHabit = await HabitModel.deleteOne({_id : habitId});
        const deleteStreak = await StreakModel.deleteOne({habit : habitId});

        if (!deletedHabit || !deleteStreak) {
            return Response.json(new ApiHandler(false,"couldn't delte habit"),{status : 400});
        }

        return Response.json(new ApiHandler(true,"delted habit successfully"),{status:200});


    } catch (error) {
        console.log(error);
        return Response.json(new ApiHandler(false,"couldn't delete the habit"),{status:500});
    }
}
