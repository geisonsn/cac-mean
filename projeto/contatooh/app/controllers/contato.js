module.exports = () => {
    var contatos = [
        {_id: 1, nome: 'Contato exemplo 1', email: 'cont1@empresa.com.br'},
        {_id: 2, nome: 'Contato exemplo 2', email: 'cont2@empresa.com.br'},
        {_id: 3, nome: 'Contato exemplo 3', email: 'cont3@empresa.com.br'}
    ];
    
    var controller = {};

    controller.listaContatos = (request, response) => {
        response.json(contatos);
    };
    controller.obtemContato = (request, response) => {
        var idContato = request.params.id;
        var contato = contatos.filter((contato) => contato._id == idContato)[0];
        if (contato) {
            response.json(contato);
        } else {
            response.status(404).send('Contato não encontrado');
        }
    };
    return controller;
}
