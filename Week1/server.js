var http = require('http');
var port = process.env.PORT || 8080;
var server = http.createServer(function (req, res) {
        if (req.url == '/') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<html><body><p>Dart Vader</p></body></html>');
                res.end();
        }
});

server.listen(port);

console.log(`Node.js web server at port ${port} is running..`)