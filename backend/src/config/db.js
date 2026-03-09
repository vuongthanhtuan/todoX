import mongoose from "mongoose";
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Lien ket csdl thanh cong.");
    } catch (error) {
        console.error("Loi ket noi csdl: ", error);
        process.exit(1);// exit with error
    }
}