const express = require('express');
const mailVarification = require('../controller/mailVerfication');
const route = express.Router();
const updatePass = require("../controller/updatePass");

route.get('/auth', mailVarification);

const userRegister = require('../controller/userRegister');
const upload = require('../controller/multer');
const { registerValidator } = require('../helpers/validation')
route.post('/register', upload.single('image'), registerValidator, userRegister);

const forgetPass = require('../controller/forgetPassword');
const { isMailValid } = require('../helpers/validation');
const resetPass = require('../controller/resetPass.js');
route.post('/reset', isMailValid, forgetPass);
route.get('/resetPass', isMailValid, resetPass);
route.post('/resetPass', updatePass);

const sendMailVerification = require("../controller/send-mail-verification");

route.post('/sendmail', isMailValid, sendMailVerification);
const resetSuccess = require("../controller/resetSuccess");
route.get('/reset-success', resetSuccess)
const auth = require('../middleware/Auth.js');
const JWT = require("../controller/JWT");
const { loginVaildator } = require("../helpers/validation.js");
const userProfile = require('../controller/profile');
route.post('/login', loginVaildator, JWT);
route.post('/profile', auth, userProfile);
module.exports = route;