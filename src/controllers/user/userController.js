import axios from 'axios';
import jwt from 'jsonwebtoken';
import { userModel } from '../../models/userModel.js';
import bcrypt from 'bcrypt';

/** Test demo function **/
export function add(a, b) {
  return a + b;
}

const saltRound = 10;

export const registerUser = async (req, res) => {
  try {
  
    const { userId, email, mobile, password } = req.body;
    
    const isUserExist =  await userModel.findOne({ $or: [{email: email}, {mobile: mobile}, {user_id: userId}]});
    if(isUserExist) {
      return res.status(200).send({ status: true, message: "User already exist!"});
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const data = {
      user_id: userId,
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


export const loginUser = async (req, res) => {
  try {
    const { userId, email, mobile, password } = req.body;
    const getUser =  await userModel.findOne({ $or: [{email: email}, {mobile: mobile}, {user_id: userId}]});
    if(!getUser) {
      return res.status(404).send({ status: true, message: "User does not exist!"});
    }
    const isPasswordMatch = await bcrypt.compare(password, getUser.password);
    if(!isPasswordMatch) {
      return res.status(404).send({ status: true, message: "Wrong password!"});
    }
    const secretKey = "XYZTWWWKJHDKJHDFKJHFKJBHFJFBJWSBJHGBCSJHGBJHDSGFBCJHSCGVBJHGBCSJ"
    const payload = {
      type: "user" || "admin",
      userid: userId,
      email: email,
      phone: mobile
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return res.status(200).header("set-cookie",token);
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}