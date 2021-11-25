const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
    },
    value: {
      type: String,
    },
    label: {
      type: Object,
    },
    sortID: {
      type: Number,
    },
  },
  {
    collection: "inputs",
  }
);

module.exports = model("Inputs", schema);
