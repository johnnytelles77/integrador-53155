import CartService from "../service/carts.services.js";
import TicketService from "../service/ticket.services.js";
import { logger } from "../utils/logger.js"


class CartController {
    static async createCart(req, res) {
        try {
            const cart = await CartService.createCart();
            res.status(201).json({ status: "success", payload: cart });
        } catch (error) {
            logger.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await CartService.addProductToCart(cid, pid);


            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async getCartById(req, res) {
        try {
            const { cid } = req.params;
            const cart = await CartService.getCartById(cid);
            if (!cart) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            }

            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async deleteProductInCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const cart = await CartService.deleteProductInCart(cid, pid);
            if (cart.product === false) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            }
            if (cart.cart === false) {
                return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            }
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async updateQuantityProductInCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await CartService.updateQuantityProductInCart(cid, pid, quantity);
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async deleteAllProductsInCart(req, res) {
        try {
            const { cid } = req.params;

            const cart = await CartService.deleteAllProductsInCart(cid);
            res.status(200).json({ status: "success", payload: cart });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async purchaseCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await CartService.getCartById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
            /// obtener el total del carrito
            const total = await CartService.purchaseCart(cid);
            /// crear el ticket
            const ticket = await TicketService.createTicket(req.user.email, total);

            res.status(200).json({ status: "success", payload: ticket});
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default CartController;

