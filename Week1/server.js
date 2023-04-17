var routes = require('./routes')
var http = require('http');

var port = process.env.PORT || 8080;
var server = http.createServer(function (req, res) {
        routes.setRoutes(req,res)
});

server.listen(port);

console.log(`Node.js web server at port ${port} is running..`)