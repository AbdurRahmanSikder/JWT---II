const resetSuccess = async(req, res) => {
    try {
        return res.render('reset-success');
    }
    catch(err){
        return res.render('404');
    }
}

module.exports = resetSuccess;