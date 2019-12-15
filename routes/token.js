const jwt = require('jsonwebtoken');
/*const dotenv = require('dotenv');*/

const authenticate = async function (req, res, next) {
    var token = req.header('auth');
    if (!token) return res.status(401).send('Access Denied.');

    /*
    try { 
        var verified = jwt.verify(token, process.env.token_key);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token.');
    };
    */

    jwt.verify(token, process.env.token_key, function (err, decodedtoken) {
        if (err) {
            res.status(401).send('Invalid Token.');
        } else {
            req._id = decodedtoken.user;
            req.user = decodedtoken;
            next();
        };
    });
};

module.exports = {
    authenticate: authenticate
};