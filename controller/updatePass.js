const User = require('../model/resetPassword.model');
const User2 = require('../model/user.model');
const bcrypt = require('bcrypt');
const updatePass = async (req, res) => {
    try {
        const { userId, password, c_password } = req.body;

        const resetData = await User.findOne({ userId });
        console.log(userId,resetData);
        if (password != c_password)
            return res.render('reset-password',{resetData,error: 'Confirm Password is not match' });

        const hashPassword = await bcrypt.hash(c_password,10);

         await User2.findByIdAndUpdate({_id: userId} , {
            $set: {
                password: hashPassword
            }
        });
        await User.deleteMany({userId});

        return res.redirect('/api/reset-success');
    }
    catch (err) {
        // console.log(err);
        return res.render('404');
    }
}


module.exports = updatePass;