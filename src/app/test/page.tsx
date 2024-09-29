'use client'
import axios from 'axios'
import React from 'react'

export default function page() {

    async function sendApiRequst() : Promise<void> {
        axios.get("/api/habit/methods").then((data) => console.log(data));
    }
  return (
    <div>
      <button onClick={sendApiRequst}>send request</button>
    </div>
  )
}
