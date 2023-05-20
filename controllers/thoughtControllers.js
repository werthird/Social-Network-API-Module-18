const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

module.exports = {

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
  }
};