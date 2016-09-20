var express = require('express');

var home = require('../app/routes/home');

module.exports = () => {
    var app = express();

    //configuração de ambiente
    app.set('port', 3000);

    //middleware
    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    home(app);

    return app;
};
