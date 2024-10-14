import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from 'next-auth/middleware';



export async function middleware(request : NextRequest) {

    const token = await getToken({req : request});

    const url = request.nextUrl;

    if (token && (
        url.pathname.startsWith("/login") ||
        url.pathname.startsWith("/sign-up") || 
        url.pathname.startsWith("/")
    ) && !url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard",request.nextUrl))
    }
    if (!token && (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/")) && !url.pathname.startsWith("/login") && !url.pathname.startsWith("/sign-up")) {
        return NextResponse.redirect(new URL("/login",request.nextUrl));
    }

   

   
}

export const config = {
    matcher : ["/login","/sign-up","/","/dashboard"]
}