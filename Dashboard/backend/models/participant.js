const {
  Schema,
  model
} = require("mongoose");

const schema = new Schema({
  name: {
    type: String
  },
  nameUz: {
    type: String
  },
  nameEn: {
    type: String
  },
  value: {
    type: Number
  },
}, {
  collection: "participant"
});

module.exports = model("Participant", schema);