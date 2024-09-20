import fs from "fs"
import { logger } from "../utils/logger.js"

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true
        };

        if (Object.values(newProduct).includes(undefined)) {
            logger.log("Todos los campos son obligatorios");
            return;
        }

        const productExist = this.products.find(existingProduct => existingProduct.code === code);
        if (productExist) {
            logger.log(`El producto ${title} con el código ${code} ya está en existencia`);
            return;
        }

        // Cargar la lista de productos existente desde el archivo
        const existingProductsJson = await fs.promises.readFile(this.path, "utf8");
        const existingProducts = JSON.parse(existingProductsJson) || [];

        // Agregar el nuevo producto a la lista existente de productos
        existingProducts.push(newProduct);

        // Escribir la lista actualizada de productos en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(existingProducts));
    }


    async getProducts(limit) {  // Muestra los productos del array

        const productsJson = await fs.promises.readFile(this.path, "utf8")
        const products = JSON.parse(productsJson) || [];

        if (!limit) return products;


        logger.log(products);

        return products.slice(0, limit);
    }



    async getProductById(id) {  /// buscar los productos por id
        const products = await this.getProducts(); // Obtener los productos utilizando getProducts()
        const product = products.find(product => product.id === id); // Buscar el producto en los productos obtenidos
        if (!product) {
            logger.log(`No se ha encontrado el producto con el ID: ${id}`);
            return;
        }
        logger.log("Producto encontrado:", product);
        return product;
    }



    async updateProduct(id, dataProduct) {  /// actualizar los productos
        const products = await this.getProducts(); // Obtener la lista actualizada de productos
        const index = products.findIndex(product => product.id === id); // Encontrar el índice del producto con el ID proporcionado
        if (index === -1) {
            logger.log(`No se encontró ningún producto con el ID: ${id}`);
            return;
        }
        products[index] = {
            ...products[index],
            ...dataProduct // Actualizar los datos del producto con los nuevos datos 
        };
        await fs.promises.writeFile(this.path, JSON.stringify(products)); // Escribir los productos actualizados de nuevo en el archivo
    }

    async deleteProduct(id) {
        const products = await this.getProducts(); // Obtener la lista actualizada de productos
        const updatedProducts = products.filter(product => product.id !== id); // Filtrar los productos para eliminar el producto con el ID proporcionado
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts)); // Escribir la lista con los cambios actualizados
    }

}

export default ProductManager