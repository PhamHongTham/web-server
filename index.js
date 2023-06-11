import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { connectDb } from './config/db.config.js';
import { routes } from './routes/index.route.js';
import configCloudynary from './config/cloudynary.config.js';
import * as passpostSetup from './helper/passport.js';

const app = express();
dotenv.config();

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET_APP_KEY || 'hongtham'
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

connectDb();
configCloudynary();

// setup routes
routes(app);

app.listen(process.env.PORT || 4000, () => {
  console.log('App started');
});
