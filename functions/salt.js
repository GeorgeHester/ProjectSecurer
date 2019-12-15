const make = async function () {
    var salt = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charslen = chars.length;
    for (var i = 0; i < 10; i++) {
        salt += chars.charAt(Math.floor(Math.random() * charslen));  
    };
    return salt;
};

module.exports = {
    make: make
};