'use client'
import { useSendToAiMutation } from '@/redux/slices/apiSlice';
import { IconLoader } from '@tabler/icons-react';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface message {
    sender : "me" | "ai";
    message : string
}

const Page = () => {

    const [textInput,setTextInput] = useState<string>("");
    const [messages,setMessages] = useState<message[]>([]);
    const [loading,setLoading] = useState(false);
    const [sendToAi] = useSendToAiMutation();


    async function handleSend() {
        const myMessage : message = {
            sender : "me",
            message : textInput
        };

        setMessages([...messages,myMessage]);
        try {

            setLoading(true);
            const res = await sendToAi(textInput);

            if (res.data) {
                const obj : message = {
                    sender : "ai",
                    message : res.data.data,
                };

                setMessages(prev => [...prev,obj]);
            }

            setTextInput("");
            
        } catch (error) {
            console.log("error while sending to ai:", error);
        }finally {
            setLoading(false);
        }
    }


  return (
    <div className='w-full h-screen flex flex-col px-52'>
        <Link href={"/dashboard"}  className='absolute left-20 w-10 h-10 rounded-full border-black border-[2px] flex items-center justify-center cursor-pointer top-10'>
            <ArrowLeft className='w-7  h-7'/>
        </Link>
      <h1 className=" text-5xl head-text self-center pt-10 ">Ask Ai how to Improve habits</h1>
      <div className='flex-1 mt-10 flex flex-col'>
        <div className='w-full h-[536px] overflow-y-scroll scrollbar-hidden flex flex-col'>

            {/* //message div */}
            {
                messages.map((message,idx) => (
            <div key={idx} className={`w-fit h-fit py-5  max-w-[700px] px-4 rounded-md text-wrap bg-slate-200 mb-2 ${message.sender == "ai" ? "self-start" : "self-end"}`}>
                   <p className='dark-p-text'>{message.message}</p>
            </div>
                ))
            }

            {
                loading ? <IconLoader/> : null
            }
           
        </div>
        <div className='w-full h-20 fixed bottom-0 left-0 right-0 bg-zinc-50 flex items-center py-4 justify-center '>
            <div className='w-2/3 h-full flex bg-zinc-200 items-center justify-center rounded-full'>
                <input value={textInput} onChange={(e) => setTextInput(e.target.value)} className='flex-1 bg-transparent outline-none border-none pl-4' placeholder='type here ...'/>
                <button onClick={handleSend} className='w-10 h-10 '>
                    <Send/>
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page;
