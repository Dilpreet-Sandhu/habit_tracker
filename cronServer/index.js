import express from 'express'
import cron from 'node-cron'
import mongoose from 'mongoose'



const app = express();

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
},{timestamps : true});

const HabitModel = mongoose.model("HabitModel",habitSchema);

mongoose.connect('mongodb+srv://habitTracker:HrtoZu6Mte03qtpY@habittracker.zc50g.mongodb.net/habitTracker').then(async () => {
    console.log("database connected for cron jobs")

    
})

cron.schedule("46 3 * * *",async () => {
    console.log("starting the job");

    const habit = await HabitModel.updateMany({},{
        isCompleted : true,
        lastUpdated : new Date()
    });

    console.log("job completed")

})





app.get("/",(req,res) => {
    res.send("cron server is running")
})
app.listen(4000,() => {
    console.log("server is listening on port 4000")
})