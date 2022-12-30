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
        password: req.body.password,
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
  }
};
