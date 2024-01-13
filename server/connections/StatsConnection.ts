import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = (process.env.USING_PUBLIC_DB ? process.env.MONGO_URL_STATS : process.env.MONGO_URL_STATS_LOCAL)!
const StatsConn = mongoose.createConnection(url)

export default StatsConn