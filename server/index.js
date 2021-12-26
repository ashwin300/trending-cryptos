import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import dataRoutes from './routes/data.js';
 
const app = express();
dotenv.config();
app.use(cors());
app.use('/data', dataRoutes)
const hostname = '127.0.0.1'
const port = process.env.PORT;


 
app.listen(port, () => {
    console.log(`Trending Crypto Project Server Online athttp://localhost:${port}`);
  })