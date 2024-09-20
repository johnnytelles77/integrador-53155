import ProductModel from "../models/product.model.js";

class ProductRepository {
    static async getAll(query, options) {
        const products = await ProductModel.paginate(query, options);
        return products;
    }

    static async getById(id) {
        const product = await ProductModel.findById(id);
        return product;
    }

    static async create(data) {
        const product = await ProductModel.create(data);
        return product;
    }

    static async update(id, data) {
        const updatedProduct = await ProductModel.findById(id, data, { new: true });
        return updatedProduct;
    }

    static async deleteOne(id) {
        const product = await ProductModel.deleteOne({ _id: id });
        if (product.deletedCount === 0) return false;
        return true;
    }
}

export default ProductRepository;