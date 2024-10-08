import mongoose, {Document, model, Model, models, Schema} from 'mongoose';


export interface User extends Document {
    username : string;
    email : string;
    password : string;
    fcmToken : string;
}

const userSchema : Schema<User> = new Schema<User>({
    username : {
        type : String,
        required : [true,"username is required"],
        unique : true
    },
    email : {
        type : String,
        required : [true,"user email is required"]
    },
    password : {
        type : String,
        required : [true,"password is required"]
    },
    fcmToken : {
        type : String,
    }

},{timestamps : true});



export const UserModel = (models.UserModel as Model<User>) || model<User>("UserModel",userSchema);