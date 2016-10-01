angular.module('contatooh').controller('ContatoController', function($scope, $routeParams, Contato) {

    function init() {

        Contato.query(function(contatos) {
            $scope.contatos = contatos;
        });
    
        if ($routeParams.contatoId) {
            Contato.get({id: $routeParams.contatoId},
                function(contato) {
                    $scope.contato = contato;
                    console.log(contato);
                    console.log(contato.$promise);
                },
                function(erro) {
                    $scope.mensagem = {texto: 'Não foi possível obter o contato'};
                    console.log(erro);
                });
        } else {
            $scope.contato = new Contato();
        } 
    }

    $scope.salva = () => {
        $scope.contato.$save()
            .then(() => {
                $scope.mensagem = {texto: 'Salvo com sucesso'};
                $scope.contato = new Contato();
            })
            .catch((erro) => {
                $scope.mensagem = {texto: 'Não foi possível salvar'};
            });
    };

    init();
});
