'use client'
import axios from 'axios'
import React from 'react'

export default function page() {

    async function sendApiRequst() : Promise<void> {
        axios.post("/api/habit/create",{
            "title" : "excercise",
            "description" : "i will excercise daily",
            "frequency": "daily",
            "difficulty" : "easy",
            "lastUpdated" : "Sun Sep 29 2024 10:02:46 GMT+0530",
            "reminder" : "Sun Sep 29 2024 10:02:46 GMT+0530 ",
            "isCompleted" : false
          }).then((data) => console.log(data));
    }
  return (
    <div>
      <button onClick={sendApiRequst}>send request</button>
    </div>
  )
}
