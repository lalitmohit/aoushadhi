import "dotenv/config";
import {productModel } from '../../models/productModel.js';

const itemId= "123crf";
export const product_data_get = async (req,res)=>{
    try{
        const get_product_data =  await productModel.find({item_id: itemId});
        return res.json(get_product_data)
    }catch(err){
        return res.status(500).send({status:false,error:err.message})
    }
}

export const product_data_post = async (req, res) => {
    try {
    //   const { custid, email, mobile, password } = req.body;
      const data = {
        item_id:"123crf",
        user_id: "12140970",
        item_name: "Capeline",
        Brand: "Cappllel",
        manufacturing_date:12/11/2023,
        expiry_date: 12/11/2025,
        price:"5000",
        discount:"25",
        type:"Ayurveda",
        
      }
    //   console.log(data);
      await productModel.create(data);
      return res.status(200).json({
        status: true,
        message: 'product info added successfully',
        data: data,
      });
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  }

export const product_data_del = async(req,res)=>{
    try{
        const item_id = "wker2434vc";
        const result= await productModel.deleteOne({ item_id: item_id });
        if (result.deletedCount > 0) {
            console.log("Product info deleted successfully");
            return res.status(200).send("Product info Deleted Successfully")
        } else {
            console.log('No documents found to delete');
            return res.status(401).send("Couldn't delete Product info")
        }
    } catch(err){
        return res.status(500).send({status:false,error:err.message});
    }
}

export const product_data_update = async(req,res)=>{
    try{
        const item_id = "123crf";
        const filter = { item_id: item_id };
        const update = { $set: {Brand:"Paracetamol"} };
        const result= await productModel.updateOne(filter, update);
        if (result.modifiedCount === 1) {
            console.log('product updated successfully');
            return res.status(200).send("Updated Successfully")
          } else {
            console.log('product not found or no changes made');
            return res.status(401).send("Error in updating ")
          }
    }catch(err){
        return res.status(500).send({status:"false",error:err.message})
    }
}
