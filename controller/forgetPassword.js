const User = require('../model/user.model');
const Reset = require('../model/resetPassword.model');
let rendomString = require('randomstring');
const mailer = require('../helpers/mailer');

const resetPassword = async (req, res) => {
    const { email } = req.body;
    let userData;
    try {
        userData = await User.findOne({ email });
        let rendomstring = rendomString.generate();
        const msg = '<p> Hii , ' + userData.name + ' , Please <a href = "http://127.0.0.1:3000/api/resetPass?token=' + rendomstring + '">Verify</a>  your mail</p>';
        await Reset.deleteMany({ userId: userData._id });

        const update = new Reset({
            userId: userData._id,
            token: rendomstring
        });//check
        await update.save();
        mailer.sendMail(email, 'Reset your Passowrd', msg);

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

module.exports = resetPassword;