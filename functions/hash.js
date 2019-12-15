const bcrypt = require('bcrypt');
const rounds = 13;
/*20*/

const hash = async function (password, passsalt) {
    var password = passsalt + password;
    const salt = await bcrypt.genSaltSync(rounds);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
};

const check = async function (password, db_passsalt, db_password) {
    var password = db_passsalt + password;
    const valid = await bcrypt.compare(password, db_password);
    return valid;
};

module.exports = {
    check: check,
    hash: hash,
};