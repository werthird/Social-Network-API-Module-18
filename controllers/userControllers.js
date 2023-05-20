const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {

  // GET ALL USERS
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.status(200).json(userObj);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    }
  },

}