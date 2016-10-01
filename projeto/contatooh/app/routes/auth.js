var passport = require('passport');

module.exports = function(app) {
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', {successRedirect: '/'}));
    app.get('/logout', function(request, response) {
        request.logOut(); //método adicionado ao objeto request pelo Passport
        response.redirect('/');
    });
};
