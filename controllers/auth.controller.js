import bcrypt from 'bcryptjs';
import { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } from '../config/constant.js';
import { generateToken } from '../helper/index.js';
import { User } from "../models/user.model.js";

export const authController = {
  register: async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }
  
      const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName: req.body.displayName,
        gender: req.body.gender,
        dob: req.body.dob,
        password: bcrypt.hashSync(req.body.password, 10),
      });
  
      await user.save((err, doc) => {
        if (err) {
          res.status(400).send({
            code: 400,
            message: err.message,
          })
        }
      });
      res.status(200).send({
        message: 'Register successfully',
      });
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
  login: async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send({
          code: 400,
          message: 'Bad request',
        });
      }
  
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          code: 404,
          message: `Email or password is invalid!`
        });
      } else {
        const match = await bcrypt.compareSync(req.body.password, user.password);
        if (match) {
          const accessToken = await generateToken(user, SECRET_ACCESS_TOKEN);
          const refreshToken = await generateToken(user, SECRET_REFRESH_TOKEN, '3650d');
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.save((err) => {
            if (err) {
              return res.status(403).json({
                code: 403,
                message: 'Something went wrong',
              });
            }
            return res.status(200).json({
              code: 200,
              message: 'Login success'
            });
          })
        } else {
          return res.status(403).send({
            code: 403,
            message: 'Email or password is invalid!'
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  }
};
