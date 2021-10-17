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

helpers.parseJsonToObject = function(str) {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch(e) {
        return {};
    }
}

module.exports = helpers;