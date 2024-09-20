import mongoose from "mongoose"
import envs from "./env.config.js"
import { logger } from "../utils/logger.js"


export const connectMongoDB = async () =>{
    try {
        ///conexion con la base de datos direecion de la api
        mongoose.connect(envs.MONGO_URL);
        logger.info("Mongo DB Conectado")
    } catch (error) {
        logger.log(error)
    }
}