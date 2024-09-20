import CartsRepository from "../persistences/mongo/repositories/carts.repository.js";
import ProductRepository from "../persistences/mongo/repositories/products.repository.js";

class CartService {
    static async createCart() {
        return await CartsRepository.create();
    }

    static async addProductToCart(cid, pid) {
        return await CartsRepository.addProductToCart(cid, pid);
    }

    static async getCartById(id) {
        return await CartsRepository.getById(id)
    }

    static async deleteProductInCart(cid, pid) {
        return await CartsRepository.deleteProductInCart(cid, pid);
    }

    static async updateQuantityProductInCart(cid, pid, quantity) {
        return await CartsRepository.updateQuantityProductInCart(cid, pid, quantity)
    }

    static async deleteAllProductsInCart(cid) {
        return await CartsRepository.deleteAllProductsInCart(cid);
    }

    static async purchaseCart(cid) {
        const cart = await CartsRepository.getById(cid);
        let total = 0;
        const products = [];

        for( const product of cart.products) {
            const prod = await ProductRepository.getById(product.product);
            if(prod.stock >= product.quantity){
                total += prod.price * product.quantity;
            } else {
                products.push(product)
            }
            await CartsRepository.updateCart(cid, products);
        }
        return total;
    }

}

export default CartService;
