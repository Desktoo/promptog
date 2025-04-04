import mongoose from "mongoose";

let isConnected = false; //to track the connection

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB is already connected");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "Promptog_db",
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('MongoDB Connected')

    }catch(error){
        console.log(error)
    }
}

