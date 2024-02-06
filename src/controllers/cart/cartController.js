// import axios from 'axios';
import "dotenv/config";
// import jwt from 'jsonwebtoken';
// import { userModel } from '../../models/userModel.js';
import {cartModel } from '../../models/cartModel.js';
// import { authenticateToken } from "../../middlewares/auth.js";

// import bcrypt from 'bcrypt';
// const userId= "12140970"
export const cart_data_get = async (req,res)=>{
  const userId = req.query.userId;
    try{
        const getUser =  await cartModel.find({user_id: userId});
        return res.json(getUser)
    }catch(err){
        return res.status(500).send({status:false,error:err.message})
    }
}

export const cart_data_post = async (req, res) => {
    try {
      const { user_id, cart_id, total_quantity, total_price } = req.body;
      // const data = req.body;
      const data = {
        user_id: user_id,
        cart_id:cart_id,
        total_quantity: total_quantity,
        total_price: total_price,
        
      }
      console.log(data);
      await cartModel.create(data);
      return res.status(200).json({
        status: true,
        message: 'Cart item created successfully',
        data: data,
      });
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  }

export const cart_data_del = async(req,res)=>{
    try{
      const cart_id = req.query.cart_id;
      const user_id = req.query.user_id
        console.log(cart_id);
        console.log(user_id);
        const result= await cartModel.deleteOne({ cart_id: cart_id ,user_id:user_id});
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} documents deleted successfully`);
            return res.status(200).send("Cart Deleted Successfully")
        } else {
            console.log('No documents found to delete');
            return res.status(401).send("Couldn't delete cart")
        }
    } catch(err){
        return res.status(500).send({status:false,error:err.message});
    }
}

export const cart_data_update = async(req,res)=>{
    try{
        const cart_id = "kej2323";
        const filter = { cart_id: cart_id };
        const update = { $set: {total_quantity:"90"} };
        const result= await cartModel.updateOne(filter, update);
        if (result.modifiedCount === 1) {
            console.log('Document updated successfully');
            return res.status(200).send("Updated Successfully")
          } else {
            console.log('Document not found or no changes made');
            return res.status(401).send("Error in updating ")
          }
    }catch(err){
        return res.status(500).send({status:"false",error:err.message})
    }
}

