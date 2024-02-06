import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {type: String, unique: true, trim: true},
    order_id: {type: String, unique: true, trim: true},
    seller_id: {type: String, unique: true, trim: true},
    shipper_id:{type: String, unique:true, trim: true},
    total_price: {type: String, trim: true},
    product_details:{type: Array, trim: true},
    total_quantity:{type: String, trim: true},
    total_discount:{type:String, trim: true},
    Status:{type:String, trim: true},

}, { timestamps: true })

export const orderModel = mongoose.model('user_order', orderSchema);