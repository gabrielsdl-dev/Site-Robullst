function adicionarCarrinho(nome, preco) {
    /*Local Storage é tipo um banco de dados que salvga os dados no navegador*/
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já existe
    let itemExistente = carrinho.find(item => item.nome === nome);

    /*Se o item já estiver no carrinho, vai adicioar apenas a quantidade. Caso o contrario add o item por interio. Assim evita a duplicidade*/
    if (itemExistente) {
        itemExistente.quantidade += 1;
    }else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    /*Salva o item no carrinho para ficar salvo, evitando de sumir quando recarregar a página*/
    /*JSON.stringify() - transforma o array em texto pois o LocalStorage só aceita strings*/
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    /* Atualiza contador na página dos produtos */
    if (typeof atualizarContadorCarrinho === "function") {
        atualizarContadorCarrinho();
    }

    /*Atualiza a pagina para aumentar o contador do carrinho assim que add um produto*/
    location.reload();  
}