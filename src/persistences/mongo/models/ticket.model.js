import mongoose from "mongoose";


class Ticket {
    constructor() {
        this.TicketCollection = "Tickets";

        this.TicketSchema = new mongoose.Schema({
            code: {
                type: String,
                required: true,
                unique: true
            },
            purchase_datatime: {
                type: Date,
                deafault: Date.now
            },
            amount: {
                type: Number,
                required: true
            },
            purchaser: {
                type: String,
                required: true,
            }
        });

        this.TicketSchema.pre("find", function () {
            this.populate("products.product")
        });

        this.TicketModel = mongoose.model(this.TicketCollection, this.TicketSchema);
    }
}

const TicketInstance = new Ticket(); // Creamos una instancia de la clase Ticket
export default TicketInstance.TicketModel;