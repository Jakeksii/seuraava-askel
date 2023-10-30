import dotenv from "dotenv";
import mongoose from "mongoose";
import EventStatistics from "../schemas/STATS/EventStatistics";

dotenv.config();
// const url:string = process.env.MONGO_URL_STATS ?? ""
const url:string = process.env.MONGO_URL_STATS ?? ""
const StatsConn = mongoose.createConnection(url)

StatsConn.model("eventstats", EventStatistics)

export const EventStats = StatsConn.models.EventStats

export default StatsConn