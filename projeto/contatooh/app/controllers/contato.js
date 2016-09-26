module.exports = () => {
    var contatos = [
        {_id: 1, nome: 'Contato exemplo 1', email: 'cont1@empresa.com.br'},
        {_id: 2, nome: 'Contato exemplo 2', email: 'cont2@empresa.com.br'},
        {_id: 3, nome: 'Contato exemplo 3', email: 'cont3@empresa.com.br'}
    ];
    
    var controller = {};
    var ID_CONTATO_INC = 3;

    controller.listaContatos = (request, response) => {
        response.json(contatos);
    };

    controller.salvaContato = (request, response) => {
        var contato = request.body; 
        var contato = contato._id ? atualiza(contato) : adiciona(contato);

        response.json(contato); 

        function adiciona(contatoNovo) {
            contatoNovo._id = ++ID_CONTATO_INC;
            contatos.push(contatoNovo);
            return contatoNovo;
        }

        function atualiza(contatoAlterar) {
            contatos = contatos.map((contato) => {
                if (contato._id == contatoAlterar._id) {
                    contato = contatoAlterar;
                }
                return contato;
            })
            return contatoAlterar;
        }
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

    controller.removeContato = (request, response) => {
        var idContato = request.params.id;
        console.log('remover contato', idContato);
        contatos = contatos.filter((contato) => {
            return contato._id != idContato;
        });
        response.status(204).end();
    };

    return controller;
};
