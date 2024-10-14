import Header from "@/components/dashboard/Header";
import { ReactNode } from "react";




export default function RootLayout({children}  :{children : ReactNode}) {
    return <div className="w-full min-h-screen">
        <Header/>
        {children}
    </div>
       
}