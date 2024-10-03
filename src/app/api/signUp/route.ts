import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return Response.json(
        new ApiHandler(false, "a user already exists with that username"),
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
        return Response.json(new ApiHandler(true, "user created successfully"), {
          status: 200,
        });
    }

    return Response.json(new ApiHandler(false,"couldn't create a user in database"),{status : 500})

  } catch (error) {
    console.log("error while signing up user ", error);
    return Response.json(new ApiHandler(false, "couldn't create new account"), {
      status: 500,
    });
  }
}
