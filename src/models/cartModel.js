import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true, trim: true},
    cart_id: {type: String, unique: true, trim: true},
    total_quantity: {type: String, trim: true},
    total_price: {type: String, trim: true},
    
}, { timestamps: true })

export const cartModel = mongoose.model('user_cart', cartSchema);

