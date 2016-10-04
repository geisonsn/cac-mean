var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

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

    //app.use(helmet()); //habilita todos os middlewares de segurança do Helmet
    //app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'})); //oculta o valor de X-Powered-By e o substitui
    app.use(helmet.frameguard());//restringe a inclusão de páginas em frames
    app.use(helmet.xssFilter());//adiciona proteção contra XSS na aplicação
    app.use(helmet.noSniff());//adiciona proteção para bloquear o load de arquivos com Mime type diferente
    app.disable('x-powered-by'); //desabitando X-Powered-By para não exibir versão do servidor

    consign({cwd: 'app'})
        .include('models')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};
