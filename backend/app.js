require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { defaultErrorHandler } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ALLOWED_ORIGINS, DB_HOST, PORT } = require('./constants/constants');

const app = express();
app.use(cors({
  credentials: true,
  origin: ALLOWED_ORIGINS,
}));

mongoose.connect(DB_HOST);

app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(defaultErrorHandler);

app.listen(PORT);
