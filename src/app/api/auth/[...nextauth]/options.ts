import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id : "credentials",
            name : "credentails",
            credentials : {
                identifier : {type : "text",label : "email or username"},
                password : {type : "password",label : "password" }
            },
            async authorize(credentials : any) : Promise<any> {
                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or : [
                            {username : credentials.identifier},
                            {email : credentials.identifier}
                        ]
                    });

                    if (!user) {
                        throw new Error("no user found")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
                    
                    if (!isPasswordCorrect) {
                        throw new Error("password is wrong")
                    }

                    return user;




                } catch (error : any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks : {
        async jwt({user,token}) {
            if (user) {
                token._id = user?._id.toString();
                token.username = user?.username;
                token.tags = user?.tags;
                token.habits = user?.habits;
                token.fcmToken = user?.fcmToken;
            }
            return token;
        },
        async session({session,token}) {
            if (token) {
                session.user._id = token._id as string;
                session.user.username = token.username as string;
                session.user.tags = token.tags as string[];
                session.user.habits = token.habits as any[];
                session.user.fcmToken = token.fcmToken as string;
                
            }
            return session;
        }
        
    },
    session : {
        strategy : "jwt"
    },
    pages : {
        signIn : "/login"
    },
    secret : process.env.NEXTAUTH_SECRET
}