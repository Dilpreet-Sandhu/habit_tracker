import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { usernameValidation } from "@/schema/authSchemas";
import {z} from 'zod';


const usernameQuery = z.object({
    username : usernameValidation
})


export async function GET(request : Request) {
    await dbConnect();
    try {

        const {searchParams} = new URL(request.url);

        const queryParams = {
            username : searchParams.get("username")
        }

        const result = usernameQuery.safeParse(queryParams);

        if (!result.success) {

            const userNameErrors = result.error.format().username?._errors || [];

            console.log(userNameErrors);

            return Response.json(new ApiHandler(false,userNameErrors[0]),{status:200})
        }


        const {username} = result.data;

        const existingUser = await UserModel.findOne({username});

        if (existingUser) {
            console.log(existingUser);
            return Response.json(new ApiHandler(true,"username is already taken"),{status:200})
        }

        return Response.json(new ApiHandler(true,"username is available"),{status:200})

        
        
    } catch (err) {
        console.log("error while checking username: ",err);
        return Response.json(new ApiHandler(false,"couldn't check username"),{status:500})
    }
}