const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const mailer = require('../helpers/mailer');

const userRegister = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, is_verified, image } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const person = new User({
            name,
            email,
            password: hashPassword,
            is_verified,
            image: 'images/' + req.file.filename
        })
        const userData = await person.save();

        const msg = '<p> Hii , '+name+' , Please <a href = "http://127.0.0.1:3000/api/auth?id='+userData.id+'">Verify</a>  your mail</p>';

        mailer.sendMail(email, 'Mail Verification' , msg);

        return res.status(200).json({
            success: true,
            userData: userData
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.msg
        })
    }

}

module.exports = userRegister;