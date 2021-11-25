const {
  Schema,
  model
} = require("mongoose");

const schema = Schema({
  _id: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
}, {
  collection: 'innoview'
});

module.exports = model("Innoview", schema);