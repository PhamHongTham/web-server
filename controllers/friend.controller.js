import { INFO_USER } from "../constants/index.js";
import { User } from "../models/user.model.js";

export const friendController = {
  followUser: async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }

      if (req.body.followingId === req.user._id) {
        return res.status(400).send({
          code: 400,
          message: 'You can not follow your self',
        });
      }

      const userFollow = await User.findById(req.body.followingId);
      const userWantFollow = await User.findById(req.user._id);

      let index = userFollow.followers.indexOf(userWantFollow._id);
      let indexFollowing = userWantFollow.followings.indexOf(userFollow._id);

      if (index > -1) {
        userFollow.followers.splice(index, 1);
      } else {
        userFollow.followers.push(userWantFollow._id);
      }

      if (indexFollowing > -1) {
        userWantFollow.followings.splice(indexFollowing, 1);
      } else {
        userWantFollow.followings.push(userFollow._id);
      }

      await userFollow.save();
      await userWantFollow.save();

      res.status(200).send({isFollowed: index > -1 ? false : true})
    } catch (error) {
      res.status(500).send({
        message: error?.message || 'Server Error',
      });
    }
  },
  getFollowers: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }

      User.findById(req.params.id)
      .populate('followers', INFO_USER)
      .exec((err, user) => {
        if (err) {
          return res.status(403).send({
            code: 403,
            message: 'Something went wrong',
          });
        }
        const followers = user.followers.map((follower) => {
          return {
            ...follower._doc,
            isFollowed: user.followings.includes(follower._id),
          };
        });
        res.status(200).send(followers);
      });
    } catch (error) {
      res.status(500).send({
        message: error?.message || 'Server Error',
      });
    }
  },
  getFollowings: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).send({
          code: 400,
          message: 'Bad Request',
        });
      }
      User.findById(req.params.id)
      .populate('followings', INFO_USER)
      .exec((err, user) => {
        if (err) {
          return res.status(403).send({
            code: 403,
            message: 'Something went wrong',
          });
        }
        const followings = user.followings.map((following) => {
          return {
            ...following._doc,
            isFollowed: user.followers.includes(following._id),
          };
        });
        res.status(200).send(followings);
      });
    } catch (error) {
      res.status(500).send({
        message: error?.message || 'Server Error',
      });
    }
  },
};
