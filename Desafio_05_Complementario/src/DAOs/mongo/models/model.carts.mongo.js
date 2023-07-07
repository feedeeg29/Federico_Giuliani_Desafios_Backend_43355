import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    products: [{
        name: { type: String, required: true, max: 100 },
        timestamp: { type: Date, required: true },
        description: { type: String, required: true, max: 100 },
        code: { type: String, required: true, max: 100 },
        photo: { type: String, required: true, max: 100 },
        price: { type: Number, required: true }
    }]
});
const cartModel = mongoose.model(cartsCollection, cartSchema);
export default cartModel;