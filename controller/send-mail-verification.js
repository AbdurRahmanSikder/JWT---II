const user = require('../model/user.model');
const mailer = require('../helpers/mailer');
const sendMailVerification = async (req,res) => {
    const {email,is_verified} = req.body;
    let person;
    try{
        person = await user.findOne({email});
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json(err);
    }

    if(!person)
    {
       return res.status(400).json({Fail : "user not found"});
    }
    if(person.is_verified)
    {
        return res.status(400).json({Fail : "Already verified"});
    }

    const msg = '<p> Hii , '+person.name+' , Please <a href = "http://127.0.0.1:3000/api/auth?id='+person.id+'">Verify</a>  your mail</p>';
    mailer.sendMail(email,"Mail verification", msg);

    return res.status(200).json({
        success: true,
        msg: "resgister Successfully",
        user: person
    })
    
    
}

module.exports  = sendMailVerification;