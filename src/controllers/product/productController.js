import "dotenv/config";
import {productModel } from '../../models/productModel.js';
import { v4 as uuidv4 } from 'uuid';

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
      // const userId = req.query.userId;
      // console.log(productId);
      const get_product_data =  await productModel.find({productId: productId});
      return res.json(get_product_data)
  } catch(err){
      return res.status(500).send({status:false,error:err.message})
  }
}

export const get_products_by_vendor_Id = async(req,res)=>{
  try{
    const vendorId = req.query.vendorId;
    console.log(vendorId);
    const get_products_by_vendor_Id = await productModel.find({vendorId: vendorId});
    return res.json(get_products_by_vendor_Id)
  }catch(err){
    return res.status(500).send({status:false,error:err.message})
  }

}

export const product_data_post = async (req, res) => {
    try {
      const { vendorId,product_name,brand,description,manufacturing_date,expiry_date,discount,type,price} = req.body;
    
      const productId = uuidv4();
      const data = {
        productId:productId,
        vendorId:vendorId,
        product_name:product_name,
        brand:brand,
        price:price,
        discount:discount,
        type:type,
        manufacturing_date:manufacturing_date,
        expiry_date:expiry_date,
        description:description,
        images:[],
        isDeleted:"false",
        deletedAt:null,
        published:false
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
        // const item_id = "wker2434vc";
        const {productId} = req.body
        const result= await productModel.deleteOne({ productId: productId });
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
        const productId = req.body.productId;
        const product_name = req.body.product_name;
        const brand = req.body.brand;
        const price = req.body.price;
        const discount = req.body.discount;
        const type = req.body.type;
        const manufacturing_date = req.body.manufacturing_date;
        const expiry_date = req.body.expiry_date;
        const description = req.body.description;              
        const filter = { productId: productId };
        const update = { $set: {product_name:product_name,brand:brand,price:price,discount:discount,type:type,manufacturing_date:manufacturing_date,expiry_date:expiry_date,description:description} };

        // const filter = { item_id: product_id };
        // const update = { $set: {Brand:"Paracetamol"} };
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
