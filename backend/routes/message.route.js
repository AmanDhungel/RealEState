import express from 'express';
import { addMessage} from '../controller/message.controller.js';
import { verifyToken } from '../api/middleware/verifyToken.js';

const router = express.Router()


router.post('/:chatId', verifyToken, addMessage);

 export default router;