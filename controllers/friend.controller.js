import { User } from "../models/user.model";

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

      let index = userFollow.follower.indexOf(userWantFollow._id);
      let indexFollowing = userWantFollow.following.indexOf(userFollow._id);

      if (index > -1) {
        userFollow.follower.splice(index, 1);
      } else {
        userFollow.follower.push(userWantFollow._id);
      }

      if (indexFollowing > -1) {
        userWantFollow.following.splice(indexFollowing, 1);
      } else {
        userWantFollow.following.push(userFollow._id);
      }

      await userFollow.save();
      await userWantFollow.save();

      res.status(200).send({isFollowed: index > -1 ? false : true})
    } catch (error) {
      res.status(500).send({
        message: 'Server Error',
      });
    }
  }
};
