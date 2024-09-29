import mongoose,{Schema} from "mongoose";


export interface Notification {
    title : string;
    user : mongoose.Schema.Types.ObjectId;
    habit : string;
    isSent : boolean;
    sendTime : Date;

}


const notificationSchema : Schema<Notification> = new mongoose.Schema<Notification>({
    title : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "UserModel"
    },
    habit : {
        type : String,
        required : true
    },
    isSent : {
        type : Boolean,
        default : false
    },
    sendTime  : {
        type : Date
    }

})