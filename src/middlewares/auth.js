import "dotenv/config";
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET="4226f78d74d85a4c7596be9025ab403b53ddfa77fd2076f2d8ab83d701e6082f00f4c67f0922ddc94602aa70650cb749a606fbaa6a97609d34e6a97435f7a715"
// const REFRESH_TOKEN_SECRET="5b16a4901825d723af457ebeef3c82ace3426ca720b7eee6a0513cc0943f2ad8b4e4a962f8693acd3c4c5a5259f2b411e562c0cfa708fefd8e24843d97c99025"

export const  authenticateToken= async (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token==null) return res.sendStatus(401)
    
    jwt.verify(token,ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user= user
        next()
    })
  }



