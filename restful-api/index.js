/*  
* Primay file for the API
*/

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function(req, res) {
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
});

server.listen(3000, function() {
    console.log('Server is listening on port 3000 now');
});

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