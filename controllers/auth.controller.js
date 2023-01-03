import bcrypt from 'bcryptjs';
import { uploadImage } from '../config/cloudynary.config.js';
import { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } from '../config/constant.js';
import { generateToken, verifyToken } from '../helper/index.js';
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
          });
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
              accessToken,
              refreshToken
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
  },
  changePassword: async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          code: 400,
          message: 'Bad request',
        });
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          code: 404,
          message: `User is not exists!`
        });
      } else {
        const match = await bcrypt.compareSync(req.body.password, user.password);
        if (match) {
          user.password = bcrypt.hashSync(req.body.newPassword, 10);
          user.save((err) => {
            if (err) {
              return res.status(403).json({
                code: 403,
                message: 'Something went wrong',
              });
            }
            return res.status(200).json({
              message: 'Update password success',
            });
          })
        } else {
          return res.status(403).send({
            code: 403,
            message: 'Password is wrong'
          });
        }
      }
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
  getInfoUser: async (req, res) => {
    const id = req.params.id;
    try {
      const token = req?.headers?.authorization;
      const decoded = await verifyToken(token, SECRET_ACCESS_TOKEN);
      const userId = id === 'me' ? decoded._id : id;

      const user = await User.findById(userId).select('-password -accessToken -refreshToken');
      if (!user) {
        return res.status(404).send({
          code: 404,
          message: `User is not exists!`
        });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  },
  updateInfo: async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        code: 400,
        message: 'Bad Request',
      });
    }
    const imgUrl = await uploadImage(req.body.image);

    const token = req?.headers?.authorization;
    const decoded = await verifyToken(token, SECRET_ACCESS_TOKEN);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).send({
        code: 404,
        message: `User is not exists!`
      });
    } else {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.gender = req.body.gender;
      user.dob = req.body.dob;
      user.displayName = req.body.displayName;
      user.picture = imgUrl;
      user.save((err) => {
        if (err) {
          return res.status(403).json({
            code: 403,
            message: 'Something went wrong',
          });
        }
        res.status(200).send({
          message: 'Update info success',
        });
      })
    }
  }
};
