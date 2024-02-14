import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user_id: {type: String, required: true, trim: true},
    items: [{
        product_id: { type: String, ref: "product_data", required: true },
        quantity: {type:Number, default: 1},
        price: {type: Number, required: true},
        _id:0
      }],
    total_quantity:{type: String, trim: true},
    product_name:{type: String, trim: true},
    total_price: {type: String, trim: true},
    total_discount:{type:String, trim: true},
    isDeleted: {type:Boolean, default: false},
    deletedAt: {type:Date, trim:true, default:null}
}, { timestamps: true })

export const cartModel = mongoose.model('lalit_cart_check_11', cartSchema);

