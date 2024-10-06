import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { UserModel } from "@/models/user.model";


export async function PUT(request : Request) {
    await dbConnect();
    try {

        const {token } = await request.json();
        const session = await getServerSession(authOptions);

        if (!token) {
            return Response.json(new ApiHandler(false,"no fcm token found"),{status:400})
        }

        if (!session || !session.user) {
            return Response.json(new ApiHandler(false,"you should be logged in to perform this action"),{status:400})
        }

        const user = await UserModel.findByIdAndUpdate(session.user._id,{
            fcmToken : token
        },{new :true});

        if (!user) {
            return Response.json(new ApiHandler(false,"no user found"),{status:400})
        }
        
        return Response.json(new ApiHandler(true,"successfully added notification token"),{status:200});

        
    } catch (error) {
        console.log("error while send updating token in user: ",error);
        return Response.json(new ApiHandler(false,"error while sending token to user "),{status:500})
    }
}