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
  collection: 'views'
});

module.exports = model("Views", schema);