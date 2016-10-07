describe('ContatoController', function() {

    it('Deve criar um contato vazio quando nenhum parâmetro de rota for passado', function() {

        expect($scope.contato._id).toBeUndefined();
    });
});
