import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    vendor_Id: {type:String,unique:true,trim:true},
    user_Id: {type: String, trim: true},
    order_Id: {type: String, unique: true, trim: true},
    total_price: {type: String, trim: true},
    product_details:{type: Array, trim: true},
    total_quantity:{type: String, trim: true},
    total_discount:{type:String, trim: true},
    status:{type:String, trim: true},
    invoice_number:{type:String,trim:true}

}, { timestamps: true })

export const orderModel = mongoose.model('lalit_order_check', orderSchema);