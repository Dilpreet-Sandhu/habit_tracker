import { ApiHandler } from "@/lib/apiHandler";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NotificationModel } from "@/models/notification.model";

export async function GET() {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(new ApiHandler(false, "you are not logged in "), {
        status: 400,
      });
    }

    const notifications = await NotificationModel.find({
      user: session.user._id,
    }).select("-user -isSent -sendTime").populate("habit","title");

    if (!notifications) {
      return Response.json(
        new ApiHandler(false, "notificaitons couldn't be fetched "),
        { status: 400 }
      );
    }

    return Response.json(
      new ApiHandler(true, "notificaions fetched successfully", notifications),
      { status: 200 }
    );
  } catch (error) {
    console.log("error while fetching notifications: ", error);
    return Response.json(
      new ApiHandler(false, "error while fetching notificaitons"),
      { status: 500 }
    );
  }
}
