'use client'
import axios from 'axios'
import React from 'react'

export default function page() {

    async function sendApiRequst() : Promise<void> {
      const res = await axios.post("/api/notification/create",{
          habitId : "66fcd7687a616545effdaa8c"
      });
      console.log(res.data);
    }
  return (
    <div>
      <button onClick={sendApiRequst}>send request</button>
    </div>
  )
}
