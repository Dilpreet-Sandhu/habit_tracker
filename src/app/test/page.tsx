'use client'
import axios from 'axios'
import React from 'react'

export default function page() {

    async function sendApiRequst() : Promise<void> {
      const res = await axios.get("/api/habit/methods");
      console.log(res.data);
    }
  return (
    <div>
      <button onClick={sendApiRequst}>send request</button>
    </div>
  )
}
