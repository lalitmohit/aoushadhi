import "dotenv/config";
import {orderModel } from '../../models/orderModel.js';

const userId= "12140970"
export const order_data_get = async (req,res)=>{
    try{
        const get_Order_data =  await orderModel.find({user_id: userId});
        return res.json(get_Order_data)
    }catch(err){
        return res.status(500).send({status:false,error:err.message})
    }
}

export const order_data_post = async (req, res) => {
    try {
    //   const { custid, email, mobile, password } = req.body;
      const data = {
        user_id: "12140970",
        order_id: "wker2434vc",
        seller_id: "kjdsnf923u8",
        shipper_id:"rhisip2939"
      }
    //   console.log(data);
      await orderModel.create(data);
      return res.status(200).json({
        status: true,
        message: 'Order info added successfully',
        data: data,
      });
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
  }

export const order_data_del = async(req,res)=>{
    try{
        const order_id = "wker2434vc";
        const result= await orderModel.deleteOne({ order_id: order_id });
        if (result.deletedCount > 0) {
            console.log("Order info deleted successfully");
            return res.status(200).send("Order info Deleted Successfully")
        } else {
            console.log('No documents found to delete');
            return res.status(401).send("Couldn't delete order info")
        }
    } catch(err){
        return res.status(500).send({status:false,error:err.message});
    }
}
