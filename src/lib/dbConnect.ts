import {connect} from 'mongoose';


type connectionObject = {
    isConnected ?: number
}

const connection : connectionObject = {};   

export default async function dbConnect() : Promise<void> {

    if (connection.isConnected) {
        console.log("databse is already connected");
        return 
    }

    try {
        const dbConnection = await connect(`${process.env.MONGO_URI}`);


        connection.isConnected = dbConnection.connections[0].readyState;

        console.log("database is succcessfully connected");


    } catch (error) {
        console.log("errro while connecting to the database: ", error);
        process.exit(1);
    }


}