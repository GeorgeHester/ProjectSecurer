const make = function () {
    var uid = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charslen = chars.length;
    for (var i = 0; i < 10; i++) {
        uid += chars.charAt(Math.floor(Math.random() * charslen));  
    };
    return uid;
};

module.exports = {
    make: make
};