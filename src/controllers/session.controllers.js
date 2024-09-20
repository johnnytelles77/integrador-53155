import { userResponseDto } from "../dto/user-response.dto.js";
import { createToken } from "../utils/jwt.js"
import { logger } from "../utils/logger.js";




class SessionController {
    static async register(req, res) {
        try {
            res.status(201).json({ status: "success", msg: "Usuario Creado" });

        } catch (error) {
           /*  logger.log(error); */
            return res.status(500).json({ error: "Error interno del servidor" });

        }
    }

    static async login(req, res) {
        try {
            const user = req.user;
            const token = createToken(user);
            // Guardamos el token en una cookie
            res.cookie("token", token, { httpOnly: true });
            const userDto = userResponseDto(user);
            return res.status(200).json({ status: "success", payload: userDto, token });
        } catch (error) {
           /*  logger.log(error); */
            res.status(500).json({ status: "Error", msg: "Internal Server Error" });
        }
    }

    static async current(req, res) {
        try {
            const user = userResponseDto(req.user);
            return res.status(200).json({ status: 'success', payload: user });
        } catch (error) {
           /*  logger.log(error); */
            res.status(500).json({ status: 'Error', msg: 'Internal Server Error' });
        }
    }

    static async loginGoogle(req, res) {
        try {
            return res.status(200).json({ status: "success", payload: req.user });
        } catch (error) {
           /*  logger.log(error); */
            res.status(500).json({ status: "Error", msg: "Internal Server Error" });
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy();

            res.status(200).json({ status: "success", msg: "Sesión cerrada con éxito" });
        } catch (error) {
           /*  logger.log(error); */
            res.status(500).json({ status: "Error", msg: "Internal Server Error" });
        }
    }
}

export default SessionController;