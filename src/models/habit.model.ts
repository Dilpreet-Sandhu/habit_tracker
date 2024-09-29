import { Document, model, Model, models, Schema } from "mongoose";



export interface Habit extends Document {
    user : Schema.Types.ObjectId;
    title : string;
    description : string;
    frequency :  "daily" | "weekly";
    difficulty : "easy" | "medium" | "hard";
    reminder : Date;
    lastUpdated : Date;
    isCompleted : boolean
}


const habitSchema : Schema<Habit> = new Schema<Habit>({
    title : {
        type : String,
        required : true,
    },
    user : {
        type : Schema.Types.ObjectId,
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


export const HabitModel = (models.HabitModel as Model<Habit>) || model<Habit>("HabitModel",habitSchema);