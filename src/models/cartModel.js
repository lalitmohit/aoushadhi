import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true},
    cart_id: {type: String, required: false, unique: true},
    total_quantity: {type: String, required: false, unique: true},
    total_price: {type: String, required: false, unique: true},
    
}, { timestamps: true })

export const cartModel = mongoose.model('user_cart', cartSchema);

