const valid = require('@hapi/joi');

const emailvalidation = async function (data) {
    const validschema = valid.object({
        email: valid.string()
            .required()
            .email(),
        pass: valid.string(),
        vkstart: valid.string(),
        vkend: valid.string(),
        fname: valid.string(),
        lname: valid.string(),
    });
    return validschema.validate(data);
};

const loginvalidation = async function (data) {
    const validschema = valid.object({
        email: valid.string()
            .required()
            .email(),
        pass: valid.string(),
    });
    return validschema.validate(data);
};

const passwordvalidation = async function (data) {
    const validschema = valid.object({
        passname: valid.string(),
        passtype: valid.string(),
        passsalt: valid.string(),
        password: valid.string(),
    });
    return validschema.validate(data);
};

module.exports = {
    emailvalidation: emailvalidation,
    loginvalidation: loginvalidation,
    passwordvalidation: passwordvalidation
};