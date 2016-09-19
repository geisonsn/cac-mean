var express = require('express');

module.exports = () => {
    var app = express();

    //configuração de ambiente
    app.set('port', 3000);

    //middleware
    app.use(express.static('./public'));

    return app;
};
