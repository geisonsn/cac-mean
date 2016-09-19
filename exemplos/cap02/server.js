var http = require("http");

var server = http.createServer((request, response) => { 
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.end('Sou em servidor criado pelo Node.js!');
});

server.listen(3000, () => {
    console.log("Servidor online!");
});
