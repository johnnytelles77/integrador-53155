import { Router } from "express";
import passport from "passport";
import SessionController from "../controllers/session.controllers.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import Mails from "../utils/sendMails.js";
import SMS from "../utils/sendSMS.js";
import User from "../mocks/user.mock.js";


const router = Router();

router.post("/register", passport.authenticate("register"), SessionController.register )

router.post("/login", passportCall("login"), SessionController.login );

router.get('/current', passportCall('jwt'), authorization('user'), SessionController.current );

router.get("/login", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
  session: false
}), SessionController.loginGoogle);

router.get("/logout", SessionController.logout );

router.get("/email", async (req, res) => {
  const { name } = req.body;
  const template = `<div>
  <h1> Bienvenidos ${name} a nuestra App </h1>
  <img src="cid:lipstick" />
</div>`
  await Mails.sendMail("danielparamo777@gmail.com", "Test nodemiler", "Este es un mensaje de prueba", template);
  return res.status(200).json({status: "Ok", msg: "Email Mandado"})
});


router.get("/sms", async (req, res) => {

  await SMS.sendSMS("9199855702", "Hola a todos");

  return res.status(200).json({status: "Ok", msg: "Mensaje enviado"})

})


router.get("/usersmock", async (req, res) => {
  const users = await User.generateUsersMocks(18)

  return res.status(200).json({status: "Ok", users })
})


export default router; 