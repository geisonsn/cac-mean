module.exports = (app) => {
    var controller = app.controllers.contato;

    //app.get('/contatos', controller.listaContatos);
    //app.get('/contatos/:id', controller.obtemContato);
    //app.delete('/contatos/:id', controller.removeContato);

    app.route('/contatos')
        .get(controller.listaContatos);

    app.route('/contatos/:id')
        .get(controller.obtemContato)
        .delete(controller.removeContato);
};
