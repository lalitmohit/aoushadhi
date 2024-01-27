import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    item_id:{type:String,required:true,unique:true},
    user_id: {type: String, required: true, unique: true},
    item_name: {type: String, required: true, unique: true},
    Brand: {type: String, required: true, unique: true},
    manufacturing_date:{type: Date, required: false,unique:true},
    expiry_date: {type: Date, required: false, unique: true},
    price:{type: String,required:false,unique:true},
    discount:{type: String,required:false,unique:true},
    type:{type:String,required:false,unique:true},
    item_dimension:{type:String,required:false,unique:true},
    asin:{type:String,required:false,unique:true},
    item_part_no:{type: String,required:false,unique:true},
    item_weight:{type: String,required:false,unique:true},
    quantity:{type:String,required:false,unique:true},
    item_description:{type:String,required:false,unique:true},
    images:{type:Array,required:false,unique:true},
    document_required:{type:String,required:false,unique:true},
    country:{type:String,required:false,unique:true}

}, { timestamps: true })

export const productModel = mongoose.model('product_data', productSchema);