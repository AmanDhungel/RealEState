import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from "../routes/auth.route.js"
import postRoute from '../routes/post.route.js';
import testRoute from '../routes/test.route.js';
import userRoute from '../routes/user.route.js'
import chatRoute from '../routes/chat.route.js'
import messageRoute from '../routes/message.route.js'


const app = express();
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))
app.use(cookieParser());
app.use(express.json());

app.use('/api/posts', postRoute);
app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);
app.use('/api/user', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/message', messageRoute);



const PORT = 8080;
app.use('/api/posts', postRoute);


 app.listen(PORT, ()=> 
    { console.log(`http://localhost:${PORT}`)})
