const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
mongoose.connect("mongodb://127.0.0.1:27017/PraJwt")
.then(app.listen(3000))
.then(console.log("App listening on port 3000"));

app.set('view engine', 'ejs');
app.set("views",'./view');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
// const userRegister = require('./routes/register.route');
app.use(express.json());
// const auth = require('./routes/auth.route');
// const sendMail = require('./routes/send-mail-verification');
const userRoute = require('./routes/user.route');

app.use('/api' , userRoute);
