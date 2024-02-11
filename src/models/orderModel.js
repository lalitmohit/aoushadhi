import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {type: String, trim: true},
    order_id: {type: String, unique: true, trim: true},
    items: [{
        product_id: {type:String, ref:"Product", required:true},
        quantity: {type:Number, default: 1},
        price: {type: Number, required: true},
        _id:0
      }],
    seller_id: {type: String, unique: true, trim: true},
    shipper_id:{type: String, unique:true, trim: true},
    product_details:{type: Array, trim: true},
    total_quantity:{type: String, trim: true},
    total_price: {type: String, trim: true},
    total_discount:{type:String, trim: true},
    cancellable: {type:Boolean, default: true},
    status: {type:String, default: 'pending', enum:["pending", "placed", "in-transit", "completed", "cancelled"]},
    isDeleted: {type:Boolean, default: false},
    deletedAt: {type:Date, trim:true, default:null},
}, { timestamps: true })

export const orderModel = mongoose.model('user_order', orderSchema);