const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const articles = require('../controllers/articles');

router.get('/', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().hex().length(24),
    }),
  }),
}), articles.getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(/^https?:\/\/[a-zA-Zа-яА-Я0-9_\-.]+\.[a-zA-Zа-яА-Я]{2,9}(\/|:|\?[!-~]*)?$/),
    image: Joi.string().required().pattern(/^https?:\/\/[a-zA-Zа-яА-Я0-9_\-.]+\.[a-zA-Zа-яА-Я]{2,9}(\/|:|\?[!-~]*)?$/),
  }).unknown(true),
}), articles.createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
}), articles.deleteArticle);

module.exports = router;
