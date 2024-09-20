import nodemailer from "nodemailer"
import envs from "../config/env.config.js"
import __dirname from "../../dirname.js"

class Mails {
    static async sendMail(email, subject, message, template) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: "johnnytelles77@gmail.com",
                pass: envs.GMAIL_PASS
            }
        })
        await transporter.sendMail({
            from: "johnnytelles77@gemail.com",
            to: email,
            subject,
            text: message,
            html: template,
            attachments: [{
                filename: "lipstick.jpg",
                path: __dirname + "/public/images/lipstick.jpg",
                cid: "lipstick",
            }]
        })
    }
}

export default Mails;