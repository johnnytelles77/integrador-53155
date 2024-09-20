import ticketModel from "../models/ticket.model.js";

class TicketCreate {
    static async create(data) {
        return await ticketModel.create(data);
    }

}

export default TicketCreate;