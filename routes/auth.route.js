const express = require('express');
const mailVarification = require('../controller/mailVerfication');

const route = express.Router();

route.get('/auth', mailVarification);

module.exports = route;
