import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    productId:{type:String,required:true,unique:true, trim: true},
    userId: {type: String, required: true, unique: true, trim: true},
    product_name: {type: String, required: true, trim: true},
    brand: {type: String, required: true, trim: true},
    manufacturing_date:{type: Date, trim: true},
    expiry_date: {type: Date, trim: true},
    price:{type: String,required:true, trim: true},
    discount:{type: String, trim: true},
    type:{type:String, trim: true},
    item_dimension:{type:String, trim: true},
    asin:{type:String, trim: true},
    item_part_no:{type: String, trim: true},
    item_weight:{type: String, trim: true},
    quantity:{type:String, trim: true},
    item_description:{type:String, trim: true},
    images:{type:Array, trim: true},
    document_required:{type:String, trim: true},
    country:{type:String, trim: true}

}, { timestamps: true })

export const productModel = mongoose.model('product_data', productSchema);