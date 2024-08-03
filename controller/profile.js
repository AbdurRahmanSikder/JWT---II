const userProfile = async(req, res) => {
    try {
       return res.status(200).json({
        success: true,
        Data: req.user
       })
    }
    catch(err){
        return res.status(400).json({
            success: false,
            msg: err.message
        })
    }
}

module.exports = userProfile;