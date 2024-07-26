const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/PraJwt")
.then(app.listen(3000))
.then(console.log("App listening on port 3000"));
const userRegister = require('./routes/register.route');
app.use(express.json());

// app.use('/' , (req,res) => {res.send("hello world")});
app.use('/api' , userRegister);