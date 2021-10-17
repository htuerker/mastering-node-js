/*
* Helpers for various tasks
*
*/

const crypto = require('crypto');

const config = require('../config');

const helpers = {};

// Create a SHA256 hash
helpers.hash = function(string) {
    if(typeof(string) == 'string' && string.length > 0) {
        const hash = crypto.createHash('sha256', config.hashingSecret);
        return hash.update(string).digest('hex');
    } else {
        return false;
    }
}

module.exports = helpers;