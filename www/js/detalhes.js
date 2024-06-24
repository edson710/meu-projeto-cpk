// RECUPERAR O ID DETALHE DO LOCALSTORAGE
var id = parseInt(localStorage.getItem('detalhe'));

// PEGAR OS PRODUTOS DO LOCALSTORAGE
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produto => produto.id === id);

if (item) {
    // TEM O ITEM
    console.log('Produto encontrado: ', item);

    // ALIMENTAR COM OS VALORES DO ITEM
    $("#imagem-detalhe").attr('src', item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews + ' reviews');
    $("#descricao-detalhe").html(item.descricao);
    $("#preco-detalhe").html(item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    
    if (item.preco_promocional !== null) {
        $("#precopromo-detalhe").html(item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    } else {
        $("#precopromo-detalhe").html(''); // ou uma mensagem alternativa, como "Sem promoção"
    }

    // Preencher tabela de características e detalhes
    let tableContent = `
        <tr>
            <th>Característica</th>
            <th>Detalhes</th>
        </tr>
    `;

    item.detalhes.forEach(detalhe => {
        tableContent += `
            <tr>
                <td>${detalhe.caracteristica}</td>
                <td>${detalhe.detalhes}</td>
            </tr>
        `;
    });
    $("#tabdetalhes").html(tableContent);
} else {
    // NÃO TEM O ITEM
    console.log('Produto não encontrado');
}

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || []


//FUNÇÃO PARA ADICIONAR AO CARRINHO
function adicionarAoCarrinho(item, quantidade){
    var itemNoCarrinho = carrinho.find(c=> c.item.id === item.id);

    if(itemNoCarrinho){
        //JA TEM ITEM NO CARRINHO
        //ADICIONAR QUANTIDADE
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;

} else {
    carrinho.push({
        item: item,
        quantidade: quantidade,
        total_item: quantidade * item.preco_promocional
})

}

//ATUALIZAR O LOCALSTORAGE DE CARRINHO
localStorage.setItem('carrinho', JSON.stringify(carrinho));

}

//CLICOU NO ADICIONAR CARRINHO
$(".add-cart").on('click', function () {
    //ADICIONAR AO CARRINHO
    adicionarAoCarrinho(item, 1);

    var toastCenter = app.toast.create({
        text: '${item.nome} adicionado ao carrinho',
        position: 'center',
        closeTimeout: 2000,
    });

toastCenter.open();

});





    