'use client'
import { mutationHookType } from "@/redux/slices/apiSlice";
import { useState } from "react";
import { toast } from "react-toastify";



export default function useAsyncMutation(mutationHook : any) {

    const [loading,setLoading] = useState(false);
    const [data,setData] = useState(null);

    const [mutation] = mutationHook;


    const executeMutation = async (args : any) => {
            setLoading(true);
            try {

                const res = await mutation(args);

                
                if (res.error) {
                    toast("error",{type :"error"});
                }else {
                    toast(res.data.data.message,{type :"success"})
                }
                
            } catch (error) {
                console.log("error while sending api request: ",error);
                toast("error while making api request",{type : "error"});
            }finally {
                setLoading(false)
            }
    }

    return [loading,executeMutation]

}