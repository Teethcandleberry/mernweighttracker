const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Track = new Schema(
  {
    track_user: {
      type: String,
    },
    track_weight: {
      type: Number,
    },
    track_fat: {
      type: Number,
    },
    track_completed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", Track);
