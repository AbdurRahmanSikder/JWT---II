const resetPassword = require('../model/resetPassword.model');

const resetPass = async (req, res) => {
    try {
        console.log('Received token:', req.query.token);
        if (req.query.token == undefined)
            return res.render('404');
    } catch (err) {
        console.error('Error occurred:', err);
        return res.render('404');
    }

    try {
        const resetData = await resetPassword.findOne({ token: req.query.token });
        console.log('Reset Data:', resetData);

        if (!resetData)
            return res.render('404');

        return res.render('reset-password', { resetData });
    } catch (err) {
        console.error('Database query error:', err);
        return res.render('404');
    }
}

module.exports = resetPass;
