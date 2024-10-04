import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { HabitModel } from "@/models/habit";
import { StreakModel } from "@/models/streak.model";
import { revalidatePath } from "next/cache";





export async function POST(request : Request) {
    await dbConnect();
    try {
 
        const {title,description,frequency,difficulty,reminder} = await request.json();
        const session = await getServerSession(authOptions);

    

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you are not logged in"),{status:400});
        }
        const user = session?.user;


        if ([title,description,frequency,difficulty].some(item => item == "")) {
            return Response.json(new ApiHandler(false,"all fields are required"),{status:400});
        }

        const newHabit = await HabitModel.create({
            title,
            description,
            user : user?._id,
            frequency,
            difficulty,
            reminder,
            lastUpdated : new Date(),
            isCompleted : false,
        }) ;

        const newStreak = await StreakModel.create({
            habit : newHabit._id,
            user : user?._id,
            streak : true,
            counter : 0,
        })

        if (!newHabit || !newStreak) {
            return Response.json(new ApiHandler(false,"couldn't create new Habit"),{status:400})
        }
        
        revalidatePath("/api/habit/get");
        revalidatePath("/api/streak/get");

        return Response.json(new ApiHandler(true,"succesfully created new Habit"),{status:200});

    } catch (error) {
        console.log("error while creating habit", error);
        return Response.json(new ApiHandler(false,"error while creating habit"),{status:500});
    }
}




