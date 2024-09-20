import fs from "fs";
import { logger } from "../utils/logger.js"


class CartManager {
  constructor(path) {
    this.path = path
    this.carts = []; /// array vacio para el carrito
  }


  async getCarts() {
    try {
      const cartsJson = await fs.promises.readFile(this.path);
      this.carts = JSON.parse(cartsJson) || [];
      return this.carts;
    } catch (error) {
      logger.error('Error al obtener los carritos:', error);
      return []; // o manejar el error de otra manera según sea apropiado para tu aplicación
    }
  }
  

  async createCart(products) {
    try {
        await this.getCarts(); // Cargar los carritos existentes

        const newCart = {
            id: this.carts.length + 1,
            products: products || [],
        };

        this.carts.push(newCart); // Agregar el nuevo carrito a la lista de carritos

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts)); // Guardar la lista actualizada de carritos

        logger.log("Tu nuevo carrito ha sido creado con éxito.");
        
        return newCart; // Devolver el nuevo carrito creado
    } catch (error) {
        logger.error("Error al crear el carrito:", error);
        throw error; // Re-lanzar el error para que pueda ser manejado externamente si es necesario
    }
}









  async getCartById(cid) { /// Metodo para obtener carrito por ID
    await this.getCarts(); /// Obtiene los carrito existentes

    const cart = this.carts.find((c) => c.id == cid); /// Busca carrito por ID 

    if (!cart) return `No se encuentra el carrito con el id ${cid}`; /// si no encuentra el carrito manda un mensaje

    return cart.products;  /// Devuelve los productos del carrito
  }

  /// agregar producto al carrito
  async addProductToCart(cid, pid) {
    await this.getCarts();

    const index = this.carts.findIndex((c) => c.id === cid);
    if (index === -1) return `No se encontró el carrito con el id ${cid}`;

    this.carts[index].products.push({
      product: pid,  /// Id del producto
      quantity: 1,
    });

    return this.carts[index];  /// Devuelve el carrtio actualizado
  }
}

export default CartManager;
