const { Schema, model } = require('mongoose');

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
      validator(v) { return /^https?:\/\/(www\.)?[\w\W\S\d/]#?/gi.test(v); },
      message: 'Неверная ссылка',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) { return /^https?:\/\/(www\.)?[\w\W\S\d/]#?/gi.test(v); },
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
