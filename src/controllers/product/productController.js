import "dotenv/config";
import {productModel } from '../../models/productModel.js';


export const get_all_products = async(req,res)=>{
  try{
    const get_all_products = await productModel.find({});
    return res.json(get_all_products)
  }catch(err){
    return res.status(500).send({status:false,error:err.message})
  }
}

export const product_data_get = async (req,res)=>{
    try{
        // const productId= "123crf";
        // const {productId} = req.body;
        const productId = req.query.productId;
        // console.log(productId);
        const get_product_data =  await productModel.find({productId: productId});
        return res.json(get_product_data)
    }catch(err){
        return res.status(500).send({status:false,error:err.message})
    }
}

export const product_data_post = async (req, res) => {
    try {
      const { productId,userId,product_name,brand,manufacturing_date,expiry_date,price,item_dimension} = req.body;

      const data = {
        productId:productId,
        userId:userId,
        product_name:product_name,
        brand:brand,
        manufacturing_date:manufacturing_date,
        expiry_date:expiry_date,
        price:price,
        item_dimension:item_dimension
      }
      console.log(data);
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
        const product_id = "123crf";
        const filter = { item_id: product_id };
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
