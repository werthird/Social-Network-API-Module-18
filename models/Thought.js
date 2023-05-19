const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');



// Build schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      get: function(value) {
        return new Date(value).toLocaleDateString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  }
);



// Virtual
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})



// Build model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;