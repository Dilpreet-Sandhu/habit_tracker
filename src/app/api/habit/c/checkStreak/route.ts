import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { HabitModel } from "@/models/habit";
import { StreakModel } from "@/models/streak.model";
import { getServerSession } from "next-auth";


export async function POST() {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you are not logged in"),{status:400})
        }


        const habits = await HabitModel.find({});

      const today = new Date();

      const yesterday = new Date(today);

      yesterday.setDate(today.getDate() - 1);

      yesterday.setHours(0, 0, 0, 0);

      habits.forEach(async (habit) => {
        if (habit.lastUpdated < yesterday) {
           await StreakModel.deleteOne({
            habit: habit._id,
            user: session.user._id,
          });
        }
      });

    } catch (error) {
        console.log("error while checking streak: ",error);
        return Response.json(new ApiHandler(false,"errro while checking streak"),{status:500})
    }
}