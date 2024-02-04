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

    const { userId, email, mobile, password } = req.body;

    const isUserExist = await userModel.findOne({ $or: [{ email: email }, { mobile: mobile }, { user_id: userId }] });
    console.log({ isUserExist: isUserExist });
    if (isUserExist) {
      return res.status(200).send({ status: true, message: "User already exist!" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const data = {
      user_id: userId,
      email: email,
      phone: mobile,
      password: hashedPassword
    }
    console.log(data);
    const x = await userModel.create(data);
    console.log({ x: x });
    return res.status(201).send({ status: true, message: "User Registered Successfully", data: { userId: userId } });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}


let refreshTokens = [];
const ACCESS_TOKEN_SECRET = "4226f78d74d85a4c7596be9025ab403b53ddfa77fd2076f2d8ab83d701e6082f00f4c67f0922ddc94602aa70650cb749a606fbaa6a97609d34e6a97435f7a715"
const REFRESH_TOKEN_SECRET = "5b16a4901825d723af457ebeef3c82ace3426ca720b7eee6a0513cc0943f2ad8b4e4a962f8693acd3c4c5a5259f2b411e562c0cfa708fefd8e24843d97c99025"

export const loginUser = async (req, res) => {
  try {
    const { userId, email, mobile, password } = req.body;
    console.log(userId)
    console.log(email)
    console.log(password)
    const getUser = await userModel.findOne({ $or: [{ email: email }, { mobile: mobile }, { user_id: userId }] });
    console.log(getUser);
    if (!getUser) {
      return res.status(404).send({ status: true, message: "User does not exist!" });
    }
    const isPasswordMatch = await bcrypt.compare(password, getUser.password);
    console.log({ isPasswordMatch: isPasswordMatch })
    if (!isPasswordMatch) {
      console.log("Wrong Message");
      return res.status(404).send({ status: true, message: "Wrong password!" });
    }
    // const secretKey = "XYZTWWWKJHDKJHDFKJHFKJBHFJFBJWSBJHGBCSJHGBJHDSGFBCJHSCGVBJHGBCSJ"
    // const refresh_secret_key = "5b16a4901825d723af457ebeef3c82ace3426ca720b7eee6a0513cc0943f2ad8b4e4a962f8693acd3c4c5a5259f2b411e562c0cfa708fefd8e24843d97c99025"

    const payload = {
      type: "user" || "admin",
      user_id: userId,
      email: email,
      phone: mobile
    }
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    refreshTokens.push(refreshToken);
    console.log({ accessToken: accessToken, refreshToken: refreshToken });
    //res.json({ accessToken, refreshToken });

    // Set the access token in a cookie named 'accessToken'
    if (req.cookies.accessToken === undefined) {
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 3600000, // Set the expiration time in milliseconds (e.g., one hour)
      });
      console.log("access token created successfullty");
    }

    // Set the refresh token in a cookie named 'refreshToken'
    if (req.cookies.refreshToken === undefined) {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 86400000, // Set the expiration time in milliseconds (e.g., one day)
      });
      console.log("refresh token created successfully");
    }
    
    return res.status(200).send({ status: true, message: "OK"});

  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}

export const user_update = async(req,res)=>{
  try{
    
    const userId=req.body.userId;
    const mobile = req.body.mobile;
    const email = req.body.email;

      console.log(userId);
      console.log(mobile);
      console.log(email);
      const filter = { user_id: userId };
      const update = { $set: {email:email,phone:mobile} };
      const result= await userModel.updateOne(filter, update);
      if (result.modifiedCount === 1) {
          console.log('details updated successfully');
          return res.status(200).send("details updated Successfully")
        } else {
          console.log('user not found or no changes made');
          return res.status(401).send("Error in updating ")
        }
  }catch(err){
      return res.status(500).send({status:"false",error:err.message})
  }
}


export const password_update = async(req,res)=>{
  try{
    
    const userId=req.body.userId;
    const new_password = req.body.new_password;
      console.log(userId);
      console.log(new_password)

      const filter = { user_id: userId };
      const new_hashedpassword = await bcrypt.hash(new_password, saltRound);
      const update = { $set: {password:new_hashedpassword} };
      const result= await userModel.updateOne(filter, update);
      if (result.modifiedCount === 1) {
          console.log('password updated successfully');
          return res.status(200).send("password updated Successfully")
        } else {
          console.log('user not found or no changes made');
          return res.status(401).send("Error in updating ")
        }
  }catch(err){
      return res.status(500).send({status:"false",error:err.message})
  }
}


export const token = async (req,res)=>{
  const refreshToken = req.body.refreshToken
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ user: user.name })
    res.json({ accessToken })
  })
}

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

function generateRefreshToken(user) {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '30m' })
}

// // Route to set a token in cookies
// app.get('/set-token', (req, res) => {
//   // Replace 'your_token_value' with the actual token value
//   const tokenValue = 'your_token_value';

//   // Set the token in a cookie named 'authToken'
//   res.cookie('authToken', tokenValue, {
//     httpOnly: true,
//     maxAge: 3600000, // Set the expiration time in milliseconds (e.g., one hour)
//   });

//   res.send('Token set in cookies');
// });

// // Route to get a token from cookies
// app.get('/get-token', (req, res) => {
//   // Retrieve the token from the 'authToken' cookie
//   const authToken = req.cookies.authToken;

//   if (authToken) {
//     res.send(`Token retrieved from cookies: ${authToken}`);
//   } else {
//     res.status(404).send('Token not found in cookies');
//   }
// });

