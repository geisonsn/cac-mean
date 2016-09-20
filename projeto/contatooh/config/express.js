var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

module.exports = () => {
    var app = express();

    //configuração de ambiente
    app.set('port', 3000);

    //middleware
    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.use(bodyParser.json());
    app.use(require('method-override')());

    consign({cwd: 'app'})
        .include('controllers')
        .then('routes')
        .into(app);

    return app;
};
