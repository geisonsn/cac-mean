var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = () => {
    const app = express();

    //configuração de ambiente
    app.set('port', 3000);

    //middleware
    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(cookieParser());
    app.use(session({
        secret: 'homem avestruz',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    consign({cwd: 'app'})
        .include('models')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};
