require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const logger = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const rateLimit = require('./middlewares/rateLimit');
const routes = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');

const {
  PORT = 3000,
  NODE_ENV,
  DB_LINK,
  DB_NAME,
} = process.env;

const app = express();

mongoose.connect('mongodb://'
  .concat(NODE_ENV === 'production' ? DB_LINK : 'localhost:27017')
  .concat('/')
  .concat(NODE_ENV === 'production' ? DB_NAME : 'diplomdb'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(rateLimit);
app.use(helmet());
app.use(bodyParser.json());
app.use(logger.requestLogger);
app.use(cors);

app.use('/api', routes);
app.use('/*', (req, res, next) => next(new NotFoundError()));

app.use(logger.errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
