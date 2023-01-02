import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { connectDb } from './config/db.config.js';
import { routes } from './routes/index.route.js';
import configCloudynary from './config/cloudynary.config.js';

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDb();
configCloudynary();

// setup routes
routes(app);

app.listen(process.env.PORT || 4000, () => {
  console.log('App started');
});
