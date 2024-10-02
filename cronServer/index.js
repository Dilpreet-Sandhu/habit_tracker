import express from 'express'
import cron from 'node-cron'
import mongoose from 'mongoose'



const app = express();

mongoose.connect('mongodb+srv://habitTracker:HrtoZu6Mte03qtpY@habittracker.zc50g.mongodb.net/habitTracker').then(() => {
    console.log("database connected for cron jobs")
})

const habitSchema  = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserModel",
        required : true
    },
    description : {
        type : String,
    },
    frequency : {
        type : String,
        enum : ["daily","weekly"],
    },
    difficulty : {
        type : String,
        enum : ["easy","medium","hard"]
    },
    reminder : {
        type : Date
    },
    lastUpdated : {
        type : Date
    },
    isCompleted : {
        type : Boolean,
        default : false
    }
});

const HabitModel = mongoose.models.HabitModel;





cron.schedule("* * * * *",async () => {
    console.log("updating habits");

    const habit = await HabitModel.updateMany({},{
        isCompleted : false,
        lastUpdated : new Date()
    });

    console.log("habits updated sucessfully")
})


app.get("/",(req,res) => {
    res.send("cron server is running")
})
app.listen(4000,() => {
    console.log("server is listening on port 4000")
})