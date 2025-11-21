function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let tabela = document.querySelector("#tabelaCarrinho tbody");
    /*Evita de duplicar linhas */
    tabela.innerHTML = "";

    let totalGeral = 0;

    /*Percorre o carrinho até achar o item desejado*/
    carrinho.forEach((item, index) => {
        let total = item.preco * item.quantidade;
        totalGeral += total;

        /*Add uma nova linha na tabela */
        /*O input colocado, faz com que o usuario possa alterar a quantidade desejada do produto*/
        tabela.innerHTML += `
            <tr>
                <td>${item.nome}</td>

                <td>
                    <input 
                        type="number" 
                        min="1" 
                        value="${item.quantidade}" 
                        class="inputQtd" 
                        data-index="${index}">
                </td>

                <td>R$ ${item.preco.toFixed(2)}</td>
                <td class="totalItem">R$ ${total.toFixed(2)}</td>

                <td>
                    <button class="btn-remover" data-index="${index}">
                        Remover
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalGeral").innerHTML =
        "TOTAL GERAL: R$ " + totalGeral.toFixed(2);

    ativarEdicao();
    ativarRemocao();
}

/*Função para editar a quantidade */
function ativarEdicao() {
    const inputs = document.querySelectorAll(".inputQtd");

    /*Adiciona um novo evento nos inputs */
    inputs.forEach(input => {
        input.addEventListener("change", function () {
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            let index = this.dataset.index;
            let novaQtd = parseInt(this.value);


            /*Impede que o usuario coloque uma quantidade menor que 1*/
            if (novaQtd < 1) {
                this.value = carrinho[index].quantidade;
                return;
            }

            /*Atualiza e Salva a nova quantidade */
            carrinho[index].quantidade = novaQtd;
            localStorage.setItem("carrinho", JSON.stringify(carrinho));


            /*Recarrega o carrinho com os novos valores */
            carregarCarrinho();
        });
    });
}

/*Função para remover um produto do carrinho */
function ativarRemocao() {
    /*Seleciona todos os botões de remover */
    const botoes = document.querySelectorAll(".btn-remover");

    botoes.forEach(botao => {
        botao.addEventListener("click", function () {
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            let index = this.dataset.index;

            /*Remove o item pelo índice*/
            carrinho.splice(index, 1);

            /*Atualiza o localStorage*/
            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            carregarCarrinho();
        });
    });
}

carregarCarrinho();