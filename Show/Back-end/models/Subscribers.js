const { Schema, model } = require('mongoose');

const schema = Schema(
  {
    email: { type: String, required: true },
    language: { type: String },
  },
  {
    collection: 'subscribers',
  }
);

module.exports = model('Subscribers', schema);
