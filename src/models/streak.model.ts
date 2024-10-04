import mongoose, { Document, model, Model, models, Schema } from "mongoose";


export interface Streak extends Document {
    habit : mongoose.Schema.Types.ObjectId;
    user : mongoose.Schema.Types.ObjectId;
    streak : boolean;
    counter : number;
}

const streakSchema : Schema<Streak> = new Schema<Streak>({
    habit : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "HabitModel",
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserModel",
        required : true
    },
    streak : {
        type : Boolean,
        required : true
    },
    counter : {
        type : Number,
        required : true
    }
},{timestamps : true});


export const StreakModel = (models.StreakModel  as Model<Streak>) || model<Streak>("StreakModel",streakSchema);