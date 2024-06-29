import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

export const shouldbeloggedin = async(req, res) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "Not authenticated"});

    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, payload)=>{
        if(!err){
            
            return res.status(403).json({message: "Not Valid"});
        }
        res.status(200).json({message: "You are authenticated"});
    })
}


export const shouldbeadmin = async(req, res) =>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "Not authenticated"});

    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, payload)=>{
        if(!err){
            
            return res.status(403).json({message: "Not Valid"});
        }

        if(!payload.isAdmin){
            return res.status(403).json({message: "You are not an admin"});
        }
        res.status(200).json({message: "You are authenticated"});
    })
}

