const jwt = require('jsonwebtoken');
const {Validator} = require('../helpers/validation');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const generateAccessToken = async(user) => {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : "24h" })
    return token;
}

const generateJwtToken = async(req, res) => {
    try{
        const error = validationResult(req);

        if(!error.isEmpty())
        {
            console.log(error.array());
            return res.status(400).json("Validation Error");       
        }
        const {email, password} = req.body;

        let person = await User.findOne({email});

        if(!person)
        {
            return res.status(400).json("Email not valid");     
        }
        const flag = bcrypt.compare(person.password, password);
        if(!flag)
        {
            return res.status(400).json("Password not valid");
        }

        
        if(person.is_verified === 0)
        {
            return res.status(400).json("Please varified your account");
        }

        const accessToken = await generateAccessToken({ user: person});



        return res.status(200).json({
            success: true,
            msg: "Login Successfully",
            user: person,
            accessToken: accessToken,
            tokenType: 'Bearer'
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({Error : err.msg});
    }
}

module.exports = generateJwtToken;