import express from "express";
import router from "./routes/index.js"
import { connectMongoDB } from "./config/mongoDb.config.js";
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport";
import initializePassport from "./config/passport.config.js"
import cookieParser from "cookie-parser";
import envs from "./config/env.config.js"
import cors from "cors"
import Errors from "./errors/errorHandle.js";
import { logger } from "./utils/logger.js";
import swaggerUi from 'swagger-ui-express';
import { specs } from "./config/swagger.config.js";




connectMongoDB();


const app = express();

/// Middlewares



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envs.CODE_SECRET));
app.use(session({
  store: MongoStore.create({
    mongoUrl: envs.MONGO_URL,
    ttl: 15
  }),
  secret: envs.CODE_SECRET,
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
initializePassport();
app.use(cors());



app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", router);

app.get("/operacionsensilla", (req, res) => {
  let sum = 0;
  for(let i = 0; i <100000; i++) {
    sum += i;
  }

  res.send({sum})
})

app.get("/operacioncompleja", (req, res) => {
  let sum = 0;
  for(let i = 0; i < 5e8; i++) {
    sum += i;
  }

  res.send({sum})
})



app.use(Errors.errorHandle);




app.listen(envs.PORT, () => {
  logger.log("info", `Servidor listo en puerto ${envs.PORT}`)
  logger.info
  logger.warn
  logger.error
  logger.http
});
