angular.module('contatooh').controller("ContatosController", function($scope, Contato) {

    $scope.contatos = [];
    $scope.filtro = '';
    $scope.mensagem = {texto: ''};

    function buscaContatos() {
        Contato.query((contatos) => {
            $scope.contatos = contatos;
        }, 
        (erro) => {
            console.log(erro);
            $scope.mensagem = {texto: 'Não foi possível obter a lista'};
        });
    }

    $scope.remove = (contato) => {
        console.log('contato a ser removido ', contato);
        Contato.delete({id: contato._id},
            buscaContatos,
            function(erro) {
                console.log(erro);
                $scope.mensagem = {texto: 'Não foi possível remover o contato'};
            });
    };
    
    $scope.init = () => {
        buscaContatos();
    };

    $scope.init();
});
