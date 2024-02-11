import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: true, trim: true},
    cart_id: {type: String, unique: true, trim: true},
    items: [{
        product_id: { type: String, ref: "product_data", required: true },
        quantity: {type:Number, default: 1},
        price: {type: Number, required: true},
        _id:0
      }],
    total_quantity:{type: String, trim: true},
    total_price: {type: String, trim: true},
    total_discount:{type:String, trim: true},
    isDeleted: {type:Boolean, default: false},
    deletedAt: {type:Date, trim:true, default:null}
}, { timestamps: true })

export const cartModel = mongoose.model('user_cart', cartSchema);

