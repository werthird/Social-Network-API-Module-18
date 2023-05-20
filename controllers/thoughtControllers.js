const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

  //===========================================================
  // GET ALL THOUGHTS
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});

      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    };
  },


  //===========================================================
  // GET ONE THOUGHT BY ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      };

      res.status(200).json(thought);

    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    };
  },


  //===========================================================
  // CREATE NEW THOUGHT
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
         { _id: req.body.userId },
         { $addToSet: { thoughts: thought._id } },
         { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'Thought created, but no user with that ID' });
      };

      res.status(200).json('Created Post');
      
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    }
  },
};