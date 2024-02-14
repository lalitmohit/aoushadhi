// import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { userModel } from '../../models/userModel.js';
import { orderModel } from '../../models/orderModel.js';
import { cartModel } from '../../models/cartModel.js';

// ############# PHONE PE #################
const MERCHANT_ID="PGTESTPAYUAT"
const SALT_KEY="099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"

export const pay = async function (req, res) {
    try {
        const reqData = req.body;
        const getUser = await userModel.findOne({ user_id: reqData.userId }).select({ phone: 1 });
        console.log(getUser);
        const data = {
            "merchantId": MERCHANT_ID || "PGTESTPAYUAT",
            "merchantTransactionId": reqData.transactionId,
            "merchantUserId": reqData.merchantUserId,
            "amount": reqData.amount*100,
            "redirectUrl": `http://localhost:4000/status/${reqData.transactionId}`,
            "redirectMode": "POST",
            "mobileNumber": getUser.phone,
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }

        /**
         *  
            "merchantOrderId": uuidv4(),
            "message": reqData.remark,
            "email": reqData.email,
            "shortName": reqData.name
         */

        const payload = Buffer.from(JSON.stringify(data)).toString('base64');
        const saltKey = SALT_KEY || "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"
        const saltIndex = 1;
        const sha256 = CryptoJS.SHA256(payload + "/pg/v1/pay" + saltKey)
        const checksum = sha256 + '###' + saltIndex

        const uat_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

        console.log(data);
        console.log(checksum);
        console.log(payload)
        const options = {
            method: 'POST',
            url: uat_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payload
            }
        }

        const response = await axios.request(options)
            .then(function (response) {
                console.log( {pay:response.data});
                console.log(response.data.data.instrumentResponse.redirectInfo.url);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });

        return res.status(200).send(response);

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

export const getPaymentStatus = async (req, res) => {
    const userId = "1234568";
    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId
    const saltKey = SALT_KEY || "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey;
    const sha256 = CryptoJS.SHA256(string)
    const checksum = sha256 + "###" + keyIndex;
    const uat_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/";
    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/";
    console.log(merchantTransactionId, merchantId);
    const options = {
        method: 'GET',
        url: uat_URL + `status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };
  
    const response = await axios.request(options);
    console.log(response.data);
    if (response.data.success) {
        console.log({userId: userId});
        const getCartItems = await cartModel.find({ user_id: userId }).select({ _id: 0, cart_id: 0, _v:0 });
        console.log({ getCartItems: getCartItems });
        const createOrder = await orderModel.insertMany(getCartItems);
        console.log({createOrder: createOrder});
        if (createOrder) {
            const emptyCart = await cartModel.updateMany({ user_id: userId }, { isDeleted: true, deletedAt: new Date() });
            console.log({emptyCart: emptyCart});
            if (emptyCart) {
                const url = `http://localhost:3000/success`
                return res.redirect(url);
            } else {
                console.log("Delete items in cart is not success");
            }
        } else {
            console.log("Order does not created");
        }
    } else {
        const url = `http://localhost:3000/failure`
        return res.redirect(url);
    }
}