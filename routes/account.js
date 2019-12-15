const router = require('express').Router();
const mongoose = require('mongoose');
const token = require('./token');
const passwordsschema = require('../model/password');
const userschema = require('../model/user');
const validate = require('../functions/validate');

router.get('/passwords', token.authenticate, async (req, res) => {

    var userid = req._id;

    /*var user = await userschema.findOne({email: req.body.email});
    if (!user) return res.status(500).send('Ah shit, somit went wrong.');*/

    var passwords = await passwordsschema.find({ _id: userid});
    if (!passwords) return res.status(400).send('User has no passwords.');
    //test log
    console.log(passwords);

});

router.post('/edit/makepassword', token.authenticate, async (req, res) => {

    var userid = req._id;

    var { error } = await validate.passwordvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var passexists = await passwordsschema.findOne({name: req.body.passname});
    if (passexists) return res.status(400).send('This password name is already in use.');

    /*
    var user = await userschema.findOne({_id: userid});
    if (!user) return res.status(500).send('Ah shit, somit went wrong.');
    */

    const password = new passwordsschema({
        _id: userid,
        name: req.body.passname,
        type: req.body.passtype,
        salt: req.body.passsalt,
        pass: req.body.password,
    });

    try {
        var savepass = await password.save();
        res.send(`Password ${password.name} has been saved.`);
    } catch (err) {
        res.status(400).send(err);
    };

});

router.delete('/edit/deletepassword', token.authenticate, async (req, res) => {

    var userid = req._id;

    var passexists = await passwordsschema.findOne({name: req.body.passname, _id: req._id});
    if (!passexists) return res.status(400).send('This password name is not in use.');

    var { error } = await passwordsschema.deleteOne({name: req.body.passname, _id: req._id});
    if (error) return res.status(500).send('The server was unsuccessful removing the password.');

    res.send(`Password ${req.body.passname} has been removed.`);

});

router.put('/edit/editpassword', token.authenticate, async (req, res) => {
//test
    var userid = req._id;

    var passexists = await passwordsschema.findOneAndUpdate({name: req.body.passname});
    if (!passexists) return res.status(400).send('This password name is not in use.');

    if(req.body.passname) {
        passexists.name = req.body.passname;
    };
    if(req.body.passtype) {
        passexists.type = req.body.passtype;
    };
    if(req.body.passsalt) {
        passexists.salt = req.body.passsalt;
    };
    if(req.body.password) {
        passexists.pass = req.body.password;
    };

    try {
        var savepass = await passexists.save();
        res.send(`Password ${passexists.name} has been updated.`);
    } catch (err) {
        res.status(400).send(err);
    };

    /*var { error } = await passwordsschema.up*/

});

router.get('/vaultsalt', token.authenticate, async (req, res) => {

    /*var userid = req._id;*/

    var user = await userschema.findOne({_id: req._id});
    if (!user) return res.status(500).send('Acciunt does not exist.');

    res.send({vkstart: user.vksaltstart, vkend: user.vksaltend});

});


/*router.post('/edit/makepassword')*/

module.exports = router;