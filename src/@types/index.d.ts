import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        _id : string;
        username : string;
        tags : string[];
        habits : any[];
    }

    interface Session {
        user : {
            _id : string;
            username : string;
            tags : string[];
            habits : any[];
        } & DefaultSession["user"]
    }
}