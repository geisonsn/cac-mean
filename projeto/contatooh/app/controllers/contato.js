var sanitize = require('mongo-sanitize');

module.exports = (app) => {
    
    var Contato = app.models.contato;
    var controller = {};

    controller.listaContatos = (request, response) => {
        Contato.find().populate('emergencia').exec()
        .then(
            function(contatos) {
                response.json(contatos);
            },
            function(erro) {
                console.error(erro);
                reponse.status(500).json(erro);
            }
        );
    };

    controller.salvaContato = (request, response) => {
        var contato = request.body; 

        if (contato._id) {
            Contato.findByIdAndUpdate(contato._id, contato).exec()
                .then(
                    function(contato) {
                        response.json(contato);
                    },
                    function(erro) {
                        console.error(erro);
                        response.status(500).json(erro);
                    });
        } else {
            Contato.create(contato)
                .then(
                    function(contato) {
                        response.status(201).json(contato);
                    },
                    function(erro) {
                        console.log(erro);
                        response.status(500).json(erro);
                    })
        }
    };

    controller.obtemContato = (request, response) => {
        var idContato = request.params.id;

        Contato.findById(idContato).exec()
            .then(
                function(contato) {
                    if (!contato) throw new Error('Contato não encontrado');
                    response.json(contato);
                },
                function(erro) {
                    console.error(erro);
                    response.status(404).json(erro);
                }
            );
    };

    controller.removeContato = (request, response) => {
        var idContato = sanitize(request.params.id);

        Contato.remove({_id: idContato}).exec()
            .then(
                function() {
                    response.status(204).end();
                },
                function(erro) {
                    return console.error(erro);
                }
            );
    };

    return controller;
};
