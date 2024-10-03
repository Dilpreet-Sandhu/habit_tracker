import Header from "@/components/dashboard/Header";
import { Metadata } from "next";
import { ReactNode } from "react";


export const metaData : Metadata = {
    title : "dasbhoard",
    description : "dashboard of the app"
}


export default function RootLayout({children}  :{children : ReactNode}) {
    return <div className="w-full min-h-screen">
        <Header/>
        {children}
    </div>
       
}