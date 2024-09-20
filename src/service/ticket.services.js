import TicketCreate from "../persistences/mongo/repositories/ticket.repository.js";

class TicketService {
    static async createTicket(userEmail, totalCart) {
        const newTicket = {
            amount: totalCart,
            purchaser: userEmail,
            code: Math.random().toString(36).substr(2, 9),
        };
        return await TicketCreate.create(newTicket);
    };

}

export default TicketService;
