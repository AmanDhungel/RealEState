import express from 'express';
import { shouldbeadmin, shouldbeloggedin } from '../controller/test.controller.js';
import { verifyToken } from '../api/middleware/verifyToken.js';


const router = express.Router()

router.get('/should-be-logged-in', verifyToken, shouldbeloggedin )
router.get('/should-be-admin',  shouldbeadmin)

 export default router;   