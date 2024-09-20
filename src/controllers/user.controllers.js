import customErrors from "../errors/customErrors.js";
import userServices from "../service/user.services.js";

class UserController {
    async sendEmailResetPassword(req, res, next) {
        try {
            const { email } = req.body;

            res.cookie("resetPassword", email, { httpOnly: true, maxAge: 10000 });

            const response = await userServices.sendEmailResetPassword(email);
            res.status(200).json({ status: "ok", response });
        } catch (error) {
            error.path = "[POST] /api/user/email/reset-password";
            next(error);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email, password } = req.body;

            const emailCookie = req.cookies.resetPassword;
            if (!emailCookie) throw customErrors.badRequestError("Email link expired");

            await userServices.resetPassword(email, password);

            res.status(200).json({ status: "ok", message: "Password updated" });
        } catch (error) {
            error.path = "[POST] /api/user/reset-password";
            next(error);
        }
    }

    async changeUserRole(req, res, next) {
        try {
            const { uid } = req.params;
            const response = await userServices.changeUserRole(uid);
            res.status(200).json({ status: "ok", response });
        } catch (error) {
            error.path = "[GET] /api/user/premium/:uid";
            next(error);
        }
    }
    async addDocuments(req, res, next) {
        try {
            const { uid } = req.params;
            const files = req.files;
            const response = await userServices.addDocuments(uid, files);
            res.status(200).json({ status: "ok", response });
        } catch (error) {
            error.path = "[GET] /api/user/:uid/documents";
            next(error);
        }
    }
}

export default new UserController();
