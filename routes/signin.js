const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('../controllers/users');
const BadRequestError = require('../errors/BadRequestError');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), users.login);

router.use('/', (req, res, next) => next(new BadRequestError()));

module.exports = router;
