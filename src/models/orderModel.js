import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true},
    order_id: {type: String, required: true, unique: true},
    seller_id: {type: String, required: true, unique: true},
    shipper_id:{type: String, required: true,unique:true},
    total_price: {type: String, required: false, unique: true},
    product_details:{type: Array,required:false,unique:true},
    total_quantity:{type: String,required:false,unique:true},
    total_discount:{type:String,required:false,unique:true},
    Status:{type:String,required:false,unique:true},

}, { timestamps: true })

export const orderModel = mongoose.model('user_order', orderSchema);