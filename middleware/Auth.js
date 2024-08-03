const { config } = require("dotenv");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try{
        const token = req.body.token || req.query.token || req.headers["authorization"];

        if(!token)
            return res.status(401).json("Token null");

       const bearer = token.split(' ');
       const bearerToken = bearer[1];

      const decodedData =  jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);

      req.user = decodedData;
    }
    catch(err){
        console.log(err);
    }

    return next();
}

module.exports = verifyToken;