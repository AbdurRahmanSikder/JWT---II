const express = require('express');
const route = express.Router();
const userRegister = require('../controller/userRegister');
const upload = require('../controller/multer');

route.post('/register',upload.single('image'),userRegister);


module.exports = route;