const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default() {
        return new mongoose.Types.ObjectId();
      },
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleString(),
    },
  },
  {
    toJSON: { getters: true },
  }
);

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { getters: true, virtuals: true },
    virtuals: {
      reactionCount: {
        get() {
          return this.reactions.length;
        },
      },
    },
  }
);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
