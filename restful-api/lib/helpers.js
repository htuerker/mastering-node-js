/*
* Helpers for various tasks
*
*/

const crypto = require('crypto');

const config = require('./config');

const helpers = {};

// Create a SHA256 hash
helpers.hash = function(str) {
    if(typeof(str) == 'string' && str.length > 0) {
        const hash = crypto.createHash('sha256', config.hashingSecret);
        return hash.update(str).digest('hex');
    } else {
        return false;
    }
}

helpers.createRandomString = function(length) {
    length = typeof(length) == 'number' && length > 0 ? length : false;
    
    if(length) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let str = '';
        for(let i = 0; i < length; i++) {
            const randomChar = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            str += randomChar;
        }
        return str;
    } else {
        return false;
    }
};

helpers.parseJsonToObject = function(str) {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch(e) {
        return {};
    }
}

module.exports = helpers;