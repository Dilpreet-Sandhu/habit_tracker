'use client'
import { useApi } from '@/hooks/useApi';
import axios from 'axios';
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default  function Page() {

  const [streaks,setStreaks] = useState<any[]>([]);

  
  console.log(streaks);
  
  useEffect(() => {
    async function fetchStreaks() {
        try {

          const res = await axios.get("/api/streak/get");

          if (res.data) {
            setStreaks(res.data?.data);
          }
          
        } catch (error) {
          console.error("error while fetching streaks: ",error);
          toast("error whle fetching streaks: ",{type : "error"});
        }
    }
    fetchStreaks();
  },[])

  return (
    <main className='w-full h-[91vh] bg-green-500'>
      <div className='w-full h-20 py-2'>

      </div>
    </main>
  )
}
