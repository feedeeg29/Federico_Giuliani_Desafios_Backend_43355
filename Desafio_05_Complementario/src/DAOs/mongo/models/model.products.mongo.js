import mongoose from "mongoose";


const productsCollection = "products";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

const productModel = mongoose.model(productsCollection, productSchema);
export default productModel;