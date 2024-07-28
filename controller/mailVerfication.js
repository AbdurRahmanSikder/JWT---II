const User = require('../model/user.model')
const mailVarification = async (req, res) => {
    try {
        console.log(req.query.id);
        if(req.query.id == undefined) {
            return res.render('404');
        }
        const user = await User.findOne({_id : req.query.id})

        if(user.is_verified){
            return res.render('mail-verification', {message : "Mail already verified"});
        }
        if(user) {
            await User.findByIdAndUpdate({_id : req.query.id}, {
                $set: {
                    is_verified: 1
                }
            });
            res.render('mail-verification', {message: 'user mail verified !'})
        }
        else{
            return res.render('mail-verification',{message: 'User not found !'})
        }

    }
    catch(err) {
        console.log(err);
        res.render('404');
    }
}

module.exports = mailVarification;