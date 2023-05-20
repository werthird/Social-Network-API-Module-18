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

      // Update the users thoughts to reference this new thought
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


  //===========================================================
  // UPDATE THOUGHT
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: { thoughtText: req.body.thoughtText } },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      };

      res.status(200).json({ thought, message: 'Thought updated' });

    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    };
  },

  //===========================================================
  // DELETE THOUGHT
  async deleteThought(req, res) {
    try {

      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought by that ID' });
      };

      // Delete the thought from the associated user as well
      const user = await User.findOneAndUpdate(
        {thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.status(200).json({ message: 'Thought Deleted' });
      
    } catch (err) {
      console.log(err.message);
      return res.status(500).json(err);
    }
  },


}; 