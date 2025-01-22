// Import the HTTP module
const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
    res.statusCode = 200; // HTTP status for OK
    res.setHeader('Content-Type', 'text/plain'); // Content type
    res.end('Hello, World!\n'); // Response
});

// Specify the port and host
const PORT = 3000;
const HOST = '127.0.0.1';

// Start the server
server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
