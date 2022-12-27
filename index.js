import express from 'express';
import * as dotenv from 'dotenv';
import { connectDb } from './config/db.config.js';

const app = express()
dotenv.config()

connectDb();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT || 4000, () => {
  console.log('App started');
});
