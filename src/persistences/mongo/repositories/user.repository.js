import UserModel from "../models/user.model.js";

const userModel = UserModel.getModel();

class UserRepository {
    static async getAll(query, options) {
        const products = await userModel.find(query, options);
        return products;
    }

    static async getById(id) {
        const product = await userModel.findById(id);
        return product;
    }

    static async getByEmail(email) {
        const user = await userModel.findOne({email});
        return user;
    }

    static async create(data) {
        const product = await userModel.create(data);
        return product;
    }

    static async update(id, data) {
        const updatedProduct = await userModel.findByIdAndUpdate(id, data, { new: true });
        return updatedProduct;
    }

    static async deleteOne(id) {
        const product = await userModel.deleteOne({ _id: id });
        if (product.deletedCount === 0) return false;
        return true;
    }
}

export default UserRepository; 


