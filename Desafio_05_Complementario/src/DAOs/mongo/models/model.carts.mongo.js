import mongoose from "mongoose";


const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});


const cartModel = mongoose.model(cartsCollection, cartSchema);
export default cartModel;