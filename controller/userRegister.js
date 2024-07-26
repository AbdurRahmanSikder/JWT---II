const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const userRegister = async (req, res) => {

    try {
        const { name, email, password, is_verified, image } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const person = new User({
            name,
            email,
            password: hashPassword,
            is_verified,
            image : 'images/' + req.file.filename
        })
        const userData = await person.save();

        return res.status(200).json({
            success: true,
            userData: userData
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.msg
        })
    }

}

module.exports = userRegister;