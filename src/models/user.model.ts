import mongoose, {Document, model, Model, models, Schema} from 'mongoose';


export interface User extends Document {
    username : string;
    email : string;
    password : string;
    habits : any[];
    tags : string[];
}

const userSchema : Schema<User> = new Schema<User>({
    username : {
        type : String,
        required : [true,"username is required"]
    },
    email : {
        type : String,
        required : [true,"user email is required"]
    },
    password : {
        type : String,
        required : [true,"password is required"]
    },
    habits : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Habit"
    }],

},{timestamps : true});



export const UserModel = (models.UserModel as Model<User>) || model<User>("UserModel",userSchema);