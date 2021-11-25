const { Schema, model } = require("mongoose");

const user = new Schema({
  userId: { type: String, required: true },
});

const schema = new Schema(
  {
    name: { type: String, required: true },
    viewers: [user],
    likes: [user],
  },
  { collection: "stand" }
);

module.exports = model("Stand", schema);
