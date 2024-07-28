const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/PraJwt")
.then(app.listen(3000))
.then(console.log("App listening on port 3000"));

app.set('view engine', 'ejs');
app.set("views",'./view');

const userRegister = require('./routes/register.route');
app.use(express.json());
const auth = require('./routes/auth.route');
// app.use('/' , (req,res) => {res.send("hello world")});
app.use('/api' , userRegister);
app.use('/api' , auth);