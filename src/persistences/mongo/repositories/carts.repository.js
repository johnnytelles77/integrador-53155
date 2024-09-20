import CartModel from "../models/cart.model.js";

class CartsRepository {

    static async getById(id) {
        const cart = await CartModel.findById(id);
        return cart;
    }

    static async create(data) {
        const cart = await CartModel.create(data);
        return cart;
    }

    static async addProductToCart(cid, pid) {
        const productInCart = await CartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } }, { new: true });
        if (!productInCart) {
            return await CartModel.findOneAndUpdate({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } }, { new: true });
        }
        const cartUpdate = await CartModel.findById(cid);
        return productInCart;
    }

    static async deleteProductInCart(cid, pid) {
        const cart = await CartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } }, { new: true });
        return cart;
    }

    static async updateQuantityProductInCart(cid, pid, quantity) {
        const cart = await CartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } }, { new: true });
        return cart;
    }

    static async deleteAllProductsInCart(cid) {
        const cart = await CartModel.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });
        return cart;
    }

    static async updateCart(cid, products) {
        const cart = await CartModel.findByIdAndUpdate(cid, {$set: {products}}, {new: true})
        return cart;
    }
}

export default CartsRepository;