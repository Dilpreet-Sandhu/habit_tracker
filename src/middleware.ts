
import { NextRequest, NextResponse } from "next/server";
import {parse} from 'cookie'
export { default } from 'next-auth/middleware';



export async function middleware(request : NextRequest) {

;
   const cookies = request.headers.get("cookie");
   const parsedCookies = parse(cookies || "");

   const authToken = parsedCookies['next-auth.session-token'] || parsedCookies['__Secure-next-auth.session-token'];
   console.log("authToken" + authToken);
    const url = request.nextUrl;

    if (authToken && (
        url.pathname.startsWith("/login") ||
        url.pathname.startsWith("/sign-up") || 
        url.pathname.startsWith("/")
    ) && !url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard",request.nextUrl))
    }
    if (!authToken && (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/")) && !url.pathname.startsWith("/login") && !url.pathname.startsWith("/sign-up")) {
        return NextResponse.redirect(new URL("/login",request.nextUrl));
    }

   

   
}

export const config = {
    matcher : ["/login","/sign-up","/","/dashboard"]
}