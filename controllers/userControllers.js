const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {


  //===========================================================
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


  //===========================================================
  // GET ONE USER BY ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      };

      res.status(200).json(user);

    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    };
  },


  //===========================================================
  // CREATE NEW USER
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      res.status(200).json(user);

    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    }
  },


  //===========================================================
  // UPDATE USER EMAIL
  async updateUserEmail(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { email: req.body.email } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      };

      res.status(200).json({ user, message: 'User email updated' });

    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    }
  },


  //===========================================================
  // DELETE USER
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      };

      const thought = await Thought.deleteMany({ username: user.username });

      if (!thought) {
        res.status(404).json({ message: 'User deleted, no thoughts to delete' });
      };

      res.status(200).json({ message: 'User and associated thoughts deleted' });

    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    };
  },

};