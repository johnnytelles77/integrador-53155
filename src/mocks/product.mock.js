import { fakerES as faker } from "@faker-js/faker";
import ProductModel from "../persistences/mongo/models/product.model.js";

class ProductMock {
    static generateProductMock(amount) {
        const products = [];

        for (let i = 0; i < amount; i++) {
            const product = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                thumbnail: [faker.image.imageUrl()],
                code: faker.string.uuid(),
                stock: faker.number.int({ min: 0, max: 100 }),
                status: faker.datatype.boolean(),  
                price: parseFloat(faker.commerce.price()),  
                category: faker.commerce.department(),
            };
            products.push(product);
        }
        return ProductModel.insertMany(products); 
    }
}

export default ProductMock;


