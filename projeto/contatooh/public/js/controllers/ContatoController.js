angular.module('contatooh').controller('ContatoController', function($scope, $routeParams, $resource) {

    var contato = {};
    var Contato = $resource('/contatos/:id');

    if ($routeParams.contatoId) {
        Contato.get({id: $routeParams.contatoId},
            function(contato) {
                $scope.contato = contato;
            },
            function(erro) {
                $scope.mensagem = {texto: 'Não foi possível obter o contato'};
                console.log(erro);
            })
    }
});
