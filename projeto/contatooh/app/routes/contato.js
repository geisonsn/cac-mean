
function verificaAutenticacao(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.status('401').json('Não autorizado');
    }
}

module.exports = function(app) {
    var controller = app.controllers.contato;

    app.route('/contatos')
        .get(verificaAutenticacao, controller.listaContatos)
        .post(verificaAutenticacao, controller.salvaContato);

    app.route('/contatos/:id')
        .get(verificaAutenticacao, controller.obtemContato)
        .delete(verificaAutenticacao, controller.removeContato);
};
