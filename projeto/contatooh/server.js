var http = require("http");
var app = require('./config/express')();
require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), () => { 
    console.log('Express server escutando na port ' + app.get('port'));
});
