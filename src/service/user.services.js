import customErrors from "../errors/customErrors.js";
import userRepository from "../persistences/mongo/repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/hasPassword.js"
import Mails from "../utils/sendMails.js";

class UserService {
    async sendEmailResetPassword(email) {
        const message = "Debe restablecer su password en el siguiente link https://www.google.com";
        await Mails.sendMail(email, "Restablecer password", message);

        return "Email enviado";
    }

    async resetPassword(email, password) {
        const user = await userRepository.getByEmail(email);
        if (!user) throw customErrors.notFoundError("User not found");

        const passwordIsEqual = isValidPassword(user, password);
        console.log(passwordIsEqual);
        if (passwordIsEqual) throw customErrors.badRequestError("Password already exists");

        return await userRepository.update(user._id, { password: createHash(password) });
    }

    async changeUserRole(uid) {
        const user = await userRepository.getById(uid);
        if (!user) throw customErrors.notFoundError("User not found");

        if (user.role === "user" && user.documents.length < 3) throw customErrors.badRequestError("User must have at least 3 documents");

        const userRole = user.role === "premium" ? "user" : "premium";

        return await userRepository.update(uid, { role: userRole });
    }

    async addDocuments(uid, reqFiles) {
        const files = reqFiles.document;
        const userDocuments = files.map(file => {
            return {
                name: file.filename,
                reference: file.path
            }
        })
        const user = await userRepository.update(uid, { documents: userDocuments });
        return user;
    }

}

export default new UserService();
