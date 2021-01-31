const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }, (err, data) => {
      if (err && err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return res.send({ data: { email: data.email, name: data.name } });
    })).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((data) => {
      if (!data) throw new AuthError('Неверные email или пароль');
      bcrypt.compare(password, data.password)
        .then((matched) => {
          if (!matched) throw new AuthError('Неверные email или пароль');
          const { NODE_ENV, JWT_SECRET } = process.env;
          const token = jwt.sign({ _id: data._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
          res.send({ token });
        }).catch(next);
    }).catch(next);
};

module.exports.aboutMe = (req, res, next) => {
  User.findById(req.body.user._id)
    .then((data) => res.send({ data }))
    .catch(next);
};
