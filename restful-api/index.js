/*  
* Primay file for the API
*/

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;

const config = require('./config');

// Instantiate the HTTP server
const httpServer = http.createServer(function(req, res) {
    unifiedServer(req, res);
});

// Start the HTTP server
httpServer.listen(config.httpPort, function() {
    console.log('The HTTP server is listening on port: ', config.httpPort, ' in ', config.envName, ' mode.');
});

// Instantiate the HTTPS server
const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem'),
};
const httpsServer = https.createServer(httpsServerOptions, function(req, res) {
    unifiedServer(req, res);
})
// Start the HTTPS server
httpsServer.listen(config.httpsPort, function() {
    console.log('The HTTPS server is listening on port: ', config.httpsPort, ' in ', config.envName, ' mode.');
})

const unifiedServer = function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/$/g, '');
    
    const method = req.method.toLocaleLowerCase();
    const queryStringObject = parsedUrl.query;

    const headers = req.headers;

    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', function(data) {
        buffer += decoder.write(data);
    });

    req.on('end', function() {
        buffer += decoder.end();

        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' 
            ? router[trimmedPath] : handlers.notFound;

        const data = { trimmedPath, method, queryStringObject, headers, payload: buffer };

        chosenHandler(data, function(statusCode, payload) {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('Returning this response', statusCode, payloadString);
        });
    });
}

const handlers = {};

handlers.sample = function(data, callback) {
    callback(406, { 'name': 'sample handler', data });
};

handlers.notFound = function(data, callback) {
    callback(404);
};

const router = {
    'sample': handlers.sample,
};