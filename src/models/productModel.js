import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId:{type:String,required:true,unique:true},
    userId: {type: String, required: true, unique: true},
    product_name: {type: String, required: true},
    brand: {type: String, required: true},
    // manufacturing_date:{type: Date, required: true},
    // expiry_date: {type: Date, required: true},
    price:{type: String,required:true},
    // discount:{type: String,required:false},
    // type:{type:String,required:false},
    // item_dimension:{type:String,required:false},
    // asin:{type:String,required:false},
    // item_part_no:{type: String,required:false},
    // item_weight:{type: String,required:false},
    // quantity:{type:String,required:false},
    // item_description:{type:String,required:false},
    // images:{type:Array,required:false},
    // document_required:{type:String,required:false},
    // country:{type:String,required:false}

}, { timestamps: true })

export const productModel = mongoose.model('product_data', productSchema);