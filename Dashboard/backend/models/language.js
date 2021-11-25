const {
  Schema,
  model
} = require("mongoose");

const schema = new Schema({
  label: {
    type: Object
  },
  value: {
    type: Number
  },
}, {
  collection: "language"
});

module.exports = model("Language", schema);