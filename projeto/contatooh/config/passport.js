var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '815b97a9680bdd4e02ed',
        clientSecret: 'b336b9abdc032d916c346ce24db4696c16878e6d',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done) {

        console.log('Passport ', profile);
        Usuario.findOrCreate(
            {login: profile.username},
            {nome: profile.username},
            function(erro, usuario) {
                if (erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));

    /*
        Chamado apenas uma vez e recebe o usuário do nosso
        banco disponibilizado pelo callback da estratégia de
        autenticação. Realizará a serialização apenas do
        ObjectId do usuário na sessão.
    */
    passport.serializeUser(function(usuario, done) {
        console.log('Passport serialization: ', usuario);
        done(null, usuario._id);
    });

    //Recebe o ObjectId do usuário armazenado na sessão
    //Chamado a CADA requisição
    passport.deserializeUser(function(id, done) {
        console.log('Passport deserialization: idUsuario ', id);
        Usuario.findById(id).exec()
        .then(function(usuario) {
            done(null, usuario);
        });
    });
};
