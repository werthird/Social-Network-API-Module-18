const { Schema, model } = require('mongoose');



// Build Schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      get: function(value) {
        return new Date(value).toLocaleDateString();
      },
    },
  },
);



module.exports = reactionSchema;