import twilio from "twilio";
import envs from "../config/env.config.js"

const {TWILIO_ACCOUNT_SID, TWILIO_SMS_NUMBER, TWILIO_AUTH_TOKEN} = envs;

class SMS {
    static async sendSMS(phone, message) {
        try {

            const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

            await client.messages.create({
                body: message,
                from: TWILIO_SMS_NUMBER,
                to: phone
            })
            
        } catch (error) {
            logger.log(error)
            
        }
    }
}
export default SMS;