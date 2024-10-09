import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        _id : string;
        username : string;
        tags : string[];
        habits : any[];
        fcmToken : string;
    }

    interface Session {
        user : {
            _id : string;
            username : string;
            tags : string[];
            habits : any[];
            fcmToken : string;
        } & DefaultSession["user"]
    }
}