angular.module('contatooh').controller("ContatosController", function($scope, Contato) {

    $scope.contatos = [];
    $scope.filtro = '';
    $scope.mensagem = {texto: ''};

    function buscaContatos() {
        Contato.query(function(contatos) {
            $scope.contatos = contatos;
        }, 
        function(erro) {
            console.log(erro);
            $scope.mensagem = {texto: 'Não foi possível obter a lista'};
        });
    }

    $scope.remove = function(contato) {
        console.log('contato a ser removido ', contato);
        Contato.delete({id: contato._id},
            buscaContatos,
            function(erro) {
                console.log(erro);
                $scope.mensagem = {texto: 'Não foi possível remover o contato'};
            });
    };
    
    $scope.init = function() {
        buscaContatos();
    };

    $scope.init();
});
