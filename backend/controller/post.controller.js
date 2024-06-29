import prisma from "../api/lib/prisma.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path: ".env"})

export const getPosts = async (req, res)=>{
    const query = req.query;

    console.log(query);
    const whereClause = {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 2000000000,
        },
      };
    
      if (query.bedroom) {
        whereClause.bedroom = parseInt(query.bedroom);
      }

    try {
        const posts = await prisma.post.findMany({
            where: whereClause,
        });
        // setTimeout(() => {


            res.status(200).json({posts});
            
        // }, 1000);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to get posts"});
    }
}
export const getPost = async (req, res)=>{
    // console.log(req.cookies.token)
    // const token = req.cookies.token
    
    try {
        const id = req.params.id;
        const post = await prisma.post.findUnique({
            where: {id},
        include: {
            postDetail: true,
            user: {
                select:{
                    username: true,
                    avatar: true
                }
            },
        }
        });


        let userId;
        const token = req.cookies.token;

        console.log(token)
        if(!token){
            userId = null;
        }else{
            jwt.verify(token, process.env.SECRET_KEY, async(err, payload)=> {
                if(err){
                userId = null;
                }else{
                    userId = payload.id;
                }
            })
        }

        const saved = await prisma.savedPost.findUnique({
            where: {
                userId_postId:{
                    postId: id,
                    userId
                }
            }
        })

        res.status(200).json({...post, isSaved: saved ? true : false});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to get posts"});
    }
}
export const addPost = async (req, res)=>{
    try {
        const body = req.body;
        const tokenUserId = req.userId;
        const newPost = await prisma.post.create({
            data: {
              ...body.postData,
              userId: tokenUserId,
              postDetail: {
                 create:body.postDetail,
              }
            }
        })
         res.status(200).json({newPost});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to add posts"});
    }
}
export const updatePost = async (req, res)=>{
    try {
         res.status(200).json({success});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to update posts"});
    }
}
export const deletePost = async (req, res)=>{
    try {
        const id = req.params.id;
        const tokenUserId = req.userId;

        // if(id !== tokenUserId){
        //     return res.status(402).json({
        //         messgae: "unAuthorized"
        //     })
        // }

        try {
            const post = await prisma.post.findUnique({
                where: {id}
            })

            if(post.userId !== tokenUserId){
                return res.status(403).json({
                            messgae: "unAuthorized"
                        })
            }

            await prisma.post.delete({
                where: {id}
            })

            res.status(200).json({ message: 'Post deleted'});
            
        } catch (error) {
            
        }



         res.status(200).json({success});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "failed to delete posts"});
    }
}