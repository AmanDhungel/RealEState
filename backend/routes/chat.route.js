import express from 'express';
import { getChats, addChat, readChat, getChat } from '../controller/chat.controller.js';
import { verifyToken } from '../api/middleware/verifyToken.js';

const router = express.Router()

router.get('/', verifyToken, getChats);
router.get('/:id', verifyToken, getChat);
router.post('/save', verifyToken, addChat);
router.post('/read/:id', verifyToken, readChat);

 export default router;