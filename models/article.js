const { Schema, model } = require('mongoose');
const { isWebUri } = require('valid-url');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) { return isWebUri(v); },
      message: 'Неверная ссылка',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) { return isWebUri(v); },
      message: 'Неверная ссылка',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
}, { versionKey: false });

module.exports = model('article', articleSchema);
