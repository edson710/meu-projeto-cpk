var localCarrinho = localStorage.getItem('carrinho');

if (localCarrinho) {
    var carrinho = JSON.parse(localCarrinho);
    if (carrinho.length > 0) {
        // TEM ITENS NO CARRINHO
        // RENDERIZAR O CARRINHO
        // SOMAR TOTAIS DOS PRODUTOS
    } else {
        // MOSTRAR CARRINHO VAZIO
        carrinhoVazio();
    }
} else {
    // MOSTRAR CARRINHO VAZIO
    carrinhoVazio();
}

function renderizarCarrinho(){

    //ESVAZIAR A ÁREA DOS ITENS
    $("#listaCarrinho").empty();

//PERCORRER O NOSSO CARRINHO E ALIMENTAR A ÁREA
$.each(carrinho, function(index, itemCarrinho){
    var itemDiv = `


    
    `;
})
}

function carrinhoVazio() {
    console.log('Carrinho está vazio');
    //ESVAZIAR LISTA DO CARRINHO
    $("#listaCarrinho").empty();

//SUMIR OS ITENS DE BAIXO BOTÃO E TOTAIS
$("#toolbarTotais").addClass('display-none');
$("#toolbarCheckout").addClass('display-none');

$(document).ready(function() {
    //MOSTRAR SACOLINHA VAZIA
    $("#listaCarrinho").html(`
        <div class="text-align-center">
            <img src="img/empty.gif" alt="Sacola vazia">
            <br><span class="color-gray">Nada por enquanto...</span>
        </div>
    `);

    $("#esvaziar").on('click', function(){
    app.dialog.confirm('tem certeza que quer esvaziar o carrinho', '<strong>ESVAZIAR</strong>', function(){
        //APAGAR O LOCALSTORAGE DO CARRINHO
        localStorage('carrinho');
        app.views.main.router.refreshPage();
    })

});

})

}
