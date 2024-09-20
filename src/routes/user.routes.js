import { Router } from "express";
import userControllers from "../controllers/user.controllers.js";
import { upload } from "../utils/uploadFiles.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";


const router = Router();

router.post("/email/reset-password", userControllers.sendEmailResetPassword);
router.post("/reset-password", userControllers.resetPassword);
router.get("/premium/:uid", userControllers.changeUserRole);
router.post("/:uid/documents", passportCall("jwt"), authorization(["user", "premium"]), upload.fields([{ name: "profile", maxCount: 1 }, { name: "imgProduct", maxCount: 1 }, { name: "document", maxCount: 3 }]), userControllers.addDocuments);
;

export default router;
