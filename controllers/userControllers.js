const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {

  // GET ALL USERS
  async getUsers(req, res) {
    try {
      const users = await User.find({});

      res.status(200).json(users);

    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    };
  },

  // GET ONE USER BY ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      };

      res.status(200).json(user);

    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    };
  }

};