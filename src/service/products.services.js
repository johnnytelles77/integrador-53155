import { productResponseDto } from "../dto/product-response.dto.js";
import ProductRepository from "../persistences/mongo/repositories/products.repository.js";
import ErrorHandler from "../errors/customErrors.js";

class ProductService {
    static async getAll(query, options) {
        const products = await ProductRepository.getAll(query, options);
        return products;
    }

    static async getById(id) {
        const productData = await ProductRepository.getById(id);
        if(!productData) throw ErrorHandler.notFoundError(`Product id ${id} not found`);
        const product = productResponseDto(productData)
        return product;
    }

    static async create(data) {
        let productData = data;
        if (user.role === "premium") {
            productData = { ...data, owner: user.email };
        }
    
        const product = await ProductRepository.create(productData);
        return product;
    }

    static async update(id, data) {
        const product = await ProductRepository.update(id, data);
        return product;
    }


    static async deleteOne(id) {
        const productData = await ProductRepository.getById(id);
        if (user.role === "premium" && productData.owner !== user.email) {
            throw error.unauthorizedError("User not authorized");
        }

        if(user.role === "admin" && productData.owner !== "admin") {
            await Mails.sendMail(productData.owner, "Producto Eliminado", 'El producto ${productData.title} ha sido eliminado por el usuario administrador');
        }

        const product = await ProductRepository.deleteOne(id);
        return product;
    }
}

export default ProductService;
