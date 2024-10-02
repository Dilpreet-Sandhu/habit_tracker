import express from 'express'
import cron from 'node-cron'
import mongoose from 'mongoose'



const app = express();

mongoose.connect('mongodb+srv://habitTracker:HrtoZu6Mte03qtpY@habittracker.zc50g.mongodb.net/habitTracker').then(() => {
    console.log("database connected for cron jobs")
})



const HabitModel = mongoose.models.HabitModel;
app.get("/",(req,res) => {
    res.send("cron server is running")
})
app.listen(4000,() => {
    console.log("server is listening on port 4000")
})