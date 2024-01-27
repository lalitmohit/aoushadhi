// import axios from 'axios';
import "dotenv/config";
import jwt from 'jsonwebtoken';
import { userModel } from '../../models/userModel.js';
// import { authenticateToken } from "../../middlewares/auth.js";

import bcrypt from 'bcrypt';

/** Test demo function **/
export function add(a, b) {
  return a + b;
}

const saltRound = 10;

export const registerUser = async (req, res) => {
  try {
  
    const { custid, email, mobile, password } = req.body;
    
    const isUserExist =  await userModel.findOne({ $or: [{email: email}, {mobile: mobile}, {user_id: custid}]});
    if(isUserExist) {
      return res.status(200).send({ status: true, message: "User already exist!"});
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const data = {
      user_id: custid,
      email: email,
      phone: mobile,
      password: hashedPassword
    }
    console.log(data);
    await userModel.create(data);
    return res.status(201).send({ status: true, message: "User Registered Successfully"});
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}


let refreshTokens = [];
const ACCESS_TOKEN_SECRET="4226f78d74d85a4c7596be9025ab403b53ddfa77fd2076f2d8ab83d701e6082f00f4c67f0922ddc94602aa70650cb749a606fbaa6a97609d34e6a97435f7a715"
const REFRESH_TOKEN_SECRET="5b16a4901825d723af457ebeef3c82ace3426ca720b7eee6a0513cc0943f2ad8b4e4a962f8693acd3c4c5a5259f2b411e562c0cfa708fefd8e24843d97c99025"

export const loginUser = async (req, res) => {
  try {
    const { userId, email, mobile, password } = req.body;
    const getUser =  await userModel.findOne({ $or: [{email: email}, {mobile: mobile}, {user_id: userId}]});
    if(!getUser) {
      return res.status(404).send({ status: true, message: "User does not exist!"});
    }
    const isPasswordMatch = await bcrypt.compare(password, getUser.password);
    if(!isPasswordMatch) {
      console.log("Wrong Message")
      return res.status(404).send({ status: true, message: "Wrong password!"});
    }
    // const secretKey = "XYZTWWWKJHDKJHDFKJHFKJBHFJFBJWSBJHGBCSJHGBJHDSGFBCJHSCGVBJHGBCSJ"
    // const refresh_secret_key = "5b16a4901825d723af457ebeef3c82ace3426ca720b7eee6a0513cc0943f2ad8b4e4a962f8693acd3c4c5a5259f2b411e562c0cfa708fefd8e24843d97c99025"
    
    const payload = {
      type: "user" || "admin",
      userid: userId,
      email: email,
      phone: mobile
    }
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload,REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    console.log("Login Done")
    return res.status(200).send({accessToken,refreshToken})
    // return res.status(200).header("set-cookie",accessToken,refreshToken);
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}

export const token = async (req,res)=>{
  const refreshToken = req.body.refreshToken
    if (refreshToken== null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken,REFRESH_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403)
    const accessToken = generateAccessToken({user:user.name})
    res.json({accessToken})
    })
}

function generateAccessToken(user){
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
