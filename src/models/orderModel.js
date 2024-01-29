import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true},
    order_id: {type: String, required: true, unique: true},
    seller_id: {type: String, required: true, unique: true},
    shipper_id:{type: String, required: true,unique:true},
    total_price: {type: String, required: false, unique: false},
    product_details:{type: Array,required:false,unique:false},
    total_quantity:{type: String,required:false,unique:false},
    total_discount:{type:String,required:false,unique:false},
    Status:{type:String,required:false,unique:false},

}, { timestamps: true })

export const orderModel = mongoose.model('user_order', orderSchema);