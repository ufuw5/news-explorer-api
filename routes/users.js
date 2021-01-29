const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('../controllers/users');

router.get('/me', celebrate({
  body: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().hex().length(24),
    }),
  }),
}), users.aboutMe);

module.exports = router;
