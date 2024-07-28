const express = require('express');
const route = express.Router();
const userRegister = require('../controller/userRegister');
const upload = require('../controller/multer');
const {registerValidator} = require('../helpers/validation')
route.post('/register',upload.single('image'),registerValidator,userRegister);


module.exports = route;