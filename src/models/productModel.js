import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
<<<<<<< HEAD
    item_id:{type:String,required:true,unique:true},
    user_id: {type: String, required: true, unique: true},
    item_name: {type: String, required: true, unique: true},
    Brand: {type: String, required: true},
    manufacturing_date:{type: Date, required: false},
    expiry_date: {type: Date, required: false},
    price:{type: String,required:false},
    discount:{type: String,required:false},
    type:{type:String,required:false},
    item_dimension:{type:String,required:false},
    asin:{type:String,required:false,unique:true},
    item_part_no:{type: String,required:false,unique:true},
    item_weight:{type: String,required:false},
    quantity:{type:String,required:false},
    item_description:{type:String,required:false},
    images:{type:Array,required:false},
    document_required:{type:String,required:false},
    country:{type:String,required:false}
=======
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
>>>>>>> 8b20b3b (product API updated)

}, { timestamps: true })

export const productModel = mongoose.model('product_data', productSchema);