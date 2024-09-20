import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

class Product {
  constructor() {
    this.productCollection = "products";

    this.productSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true, 
      },
      description: {
        type: String,
        required: true, 
      },
      thumbnail: {
        type: Array,
        default: [],
      },
      code: {
        type: String,
        required: true, 
      },
      stock: {
        type: Number,
        required: true, 
      },
      status: {
        type: Boolean,
        default: true,
      },
      price: {
        type: Number,
        required: true, 
      },
      category: {
        type: String,
        required: true 
      }
    });

    this.productSchema.plugin(mongoosePaginate);

    this.productModel = mongoose.model(this.productCollection, this.productSchema);
  }
}

const productInstance = new Product(); // Creamos una instancia de la clase Product
export default productInstance.productModel; 

