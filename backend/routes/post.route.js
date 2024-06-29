import express from 'express';
import {verifyToken} from '../api/middleware/verifyToken.js'
import { getPost, getPosts, addPost, updatePost, deletePost } from '../controller/post.controller.js';


const router = express.Router()
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', verifyToken, addPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);
// router.post('/api/posts/:id', (req ,res)=> {
//     res.send('Hello test');
//  })
// router.put('/api/posts/:id', (req ,res)=> {
//     res.send('Hello test');
//  })
// router.delete('/api/posts/:id', (req ,res)=> {
//     res.send('Hello test');
//  })

 export default router;