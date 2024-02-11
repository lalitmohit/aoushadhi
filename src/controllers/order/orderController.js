import "dotenv/config";
import {orderModel } from '../../models/orderModel.js';
import { v4 as uuidv4 } from 'uuid';

// const userId= "12140970"

export const order_data_get = async (req,res)=>{
    try{
        const vendor_Id = req.query.vendor_Id;
        console.log(vendor_Id)
        const get_Order_data =  await orderModel.find({vendor_Id: vendor_Id});
        return res.json(get_Order_data)
    }catch(err){
        return res.status(500).send({status:false,error:err.message})
    }
}

export const order_data_post = async (req, res) => {
    try {
      const { user_Id, vendor_Id, total_price, product_details, total_quantity, total_discount, status ,invoice_number } = req.body;
      const order_Id= uuidv4();

      const data = {
        // write all the above declared variables in dictionary format
        user_Id:user_Id,
        order_Id:order_Id,
        vendor_Id:vendor_Id,
        total_price:total_price,
        product_details:product_details,
        total_quantity:total_quantity,
        total_discount:total_discount,
        status:status,
        invoice_number:invoice_number
      }
      console.log(data);
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

export const order_data_del = async (req, res) => {
  try {
    const order_id = "wker2434vc";
    const result = await orderModel.deleteOne({ order_id: order_id });
    if (result.deletedCount > 0) {
      console.log("Order info deleted successfully");
      return res.status(200).send("Order info Deleted Successfully")
    } else {
      console.log('No documents found to delete');
      return res.status(401).send("Couldn't delete order info")
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}

