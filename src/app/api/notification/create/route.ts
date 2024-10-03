import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { HabitModel } from "@/models/habit";
import { NotificationModel } from "@/models/notification.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function POST(request : Request) {
    await dbConnect();
    try {

        const {habitId} = await request.json();

        const session = await getServerSession(authOptions);

        const habit = await HabitModel.findById(habitId);

        if (!habit){
            return Response.json(new ApiHandler(false,"no habit found"),{status:400})
        }

        const title = `hey it's ${habit?.title} time`;

        const notification = await NotificationModel.create({
            title,
            user : session?.user._id,
            habit : habit._id,
            isSent : false,
            sendTime : habit.reminder,
        });


        if (!notification) {
            return Response.json(new ApiHandler(false,"couldn't create notifcaiton"),{status:500})
        }

        return Response.json(new ApiHandler(true,"notifcaiton created succesfully"),{status:200});


        
    } catch (error) {
        console.log("error while creating notification: ",error);
        return Response.json(new ApiHandler(false,"error while creating habits"),{status:500})
    }
}