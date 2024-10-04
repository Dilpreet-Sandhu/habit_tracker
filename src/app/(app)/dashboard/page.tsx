'use client'
import { useApi } from '@/hooks/useApi';
import axios from 'axios';
import { UploadIcon } from 'lucide-react';
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {ArrowUpRight} from 'lucide-react';
import { CreateHabit } from '@/components/models/AnimatedModel';

export default  function Page() {

  const [streaks,setStreaks] = useState<any[]>([]);

  
  
  
  useEffect(() => {
    async function fetchStreaks() {
        try {

          const res = await axios.get("/api/streak/get");

          if (res.data) {
            setStreaks(res.data?.data);
          }
          
        } catch (error) {
          console.error("error while fetching streaks: ",error);
          toast("error whle fetching streaks ",{type : "error"});
        }
    }
    fetchStreaks();
  },[]);


  async function handleCreateHabit() {
      try {

        await useApi({url : "/api/habit/methods",method : "POST"});
        
      } catch (error) {
        console.log("error while creating habit :",error);
      }
  }

  return (
    <main className='w-full relative flex h-[91vh] bg-green-500'>
      <div className='w-full h-20 py-2'>

      </div>
      <div className='absolute bottom-5 left-0 right-0 flex  justify-center'>
        <CreateHabit/>
      </div>
    </main>
  )
}
