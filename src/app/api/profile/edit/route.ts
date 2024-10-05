import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import bcrypt from 'bcryptjs';


export async function PUT(request :Request) {
    await dbConnect();

    try {

        const {searchParams} = new URL(request.url);
        const {newUsername,newPassword} = await request.json();
        const session = await getServerSession(authOptions);
        const usernameEdit = searchParams.get("usernameEdit");
        const passwordEdit = searchParams.get("passwordEdit");

       
        
        if (usernameEdit) {
            const user = await UserModel.findOne({username : newUsername});
    
            if (user) {
                return Response.json(new ApiHandler(false,"user already exists with this username"),{status : 400});
            }

            const updatedUser = await UserModel.updateOne({username :session?.user.username},{
                username : newUsername
            });

            if (!updatedUser) {
                return Response.json(new ApiHandler(false,"couldn't update user"),{status:400})
            }
            return Response.json(new ApiHandler(true,"updated user successfully"),{status:200})

        }
        else if (passwordEdit) {

            const user = await UserModel.findById(session?.user._id);

            if (!user) {
                return Response.json(new ApiHandler(false,"no user found"),{status:400})
            }

            const hashedPassowrd = await bcrypt.hash(newPassword,10);
            user.password = hashedPassowrd;
            await user.save({validateBeforeSave : false});

            return Response.json(new ApiHandler(true,"updated password sucessfully"),{status:200})
        }else if (usernameEdit && passwordEdit) {

            const user = await UserModel.findOne({username : newUsername});

            if (!user) {
                return Response.json(new ApiHandler(false,"user already exists with this username"),{status:400})
            }
            

            const updatedPassword = await bcrypt.hash(newPassword,10);

            user.username = newUsername;
            user.password = updatedPassword;
            await user.save({validateBeforeSave: false});

            return Response.json(new ApiHandler(true,"user updated successfully"),{status:200})

        }
        
    } catch (err) {
        console.log("error while editing profile: ",err);
        return Response.json(new ApiHandler(false,"error while editing profile"),{status :500})
    }
}