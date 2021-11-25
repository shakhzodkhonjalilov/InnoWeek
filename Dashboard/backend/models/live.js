const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  {
    collection: "live",
  }
);

module.exports = model("Live", schema);
