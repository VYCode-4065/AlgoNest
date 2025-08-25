import mongoose from "mongoose";


const dbConnect = async() => {
    try {
        const dbVal = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected successfully !')
        console.log(dbVal.connection.host)
    } catch (error) {
        console.log('Database is crashed ',error)
    }
}

export default dbConnect;
