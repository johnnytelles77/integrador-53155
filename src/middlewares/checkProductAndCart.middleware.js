import { request, response } from "express"
import ProductService from "../service/products.services.js";
import CartService from "../service/carts.services.js";

class ProductAndCart {
    static async checkProductAndCart(req = request, res = response, next) {
        const { cid, pid} = req.params;
        const product = await ProductService.getById(pid);
        const cart = await CartService.getCartById(cid);

        if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

        next();
    }
}

export default ProductAndCart;



