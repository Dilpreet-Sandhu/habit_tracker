import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { HabitModel } from "@/models/habit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";


export async function POST() {
  dbConnect();
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(new ApiHandler(false, "you are not logged in"), {
        status: 400,
      });
    }

   
      const habit = await HabitModel.updateMany(
        {
          user: session.user._id,
        },
        {
          isCompleted: false,
          lastUpdated: new Date(),
        }
      );

      
      if (!habit) {
        return Response.json(
          new ApiHandler(false, "not habits found for specific id"),
          { status: 400 }
        );
      }

      return Response.json(new ApiHandler(true, "habits updated succesfully"), {
        status: 200,
      });
    
  
  } catch (error) {
    console.log("error while updating the habit: ", error);
    return Response.json(new ApiHandler(false, "error while updating"), {
      status: 400,
    });
  }
}
