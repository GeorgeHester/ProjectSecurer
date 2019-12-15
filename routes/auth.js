const router = require('express').Router();
const mongoose = require('mongoose');
const userschema = require('../model/user');
const encrypt = require('../functions/hash');
const saltgen = require('../functions/salt');
/*const uidgen = require('../functions/uid');*/
const validate = require('../functions/validate');
const jwt = require('jsonwebtoken');
/*const dotenv = require('dotenv');*/

router.post('/register', async (req, res) => {

    var { error } = await validate.emailvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var emailexists = await userschema.findOne({email: req.body.email});
    if (emailexists) return res.status(400).send('Email is in use.')

    var salt = await saltgen.make();
    var hash = await encrypt.hash(req.body.pass, salt);

    const user = new userschema({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        pass: hash,
        passsalt: salt,
        vksaltstart: req.body.vkstart,
        vksaltend: req.body.vkend,
        fname: req.body.fname,
        lname: req.body.lname,
    });

    try {
        var saveuser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    };

});

router.post('/login', async (req, res) => {

    var { error } = await validate.loginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var user = await userschema.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email does not exist.');

    var validpassword = await encrypt.check(req.body.pass, user.passsalt, user.pass);
    if(!validpassword) return res.status(400).send('Password is incorrect.');

    var token = jwt.sign({ user: user._id }, process.env.token_key);
    res.header('auth', token).send(token);

});

module.exports = router;