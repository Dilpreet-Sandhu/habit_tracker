import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from 'next-auth/middleware';



export async function middleware(request : NextRequest) {

    const token = await getToken({req : request});



   

   
}

export const config = {
    matcher : ["/sign-in","/sign-up","/","/dashboard/:path*","/verify/:path*"]
}