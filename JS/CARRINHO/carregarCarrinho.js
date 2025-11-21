function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let tabela = document.querySelector("#tabelaCarrinho tbody");
    tabela.innerHTML = "";

    let totalGeral = 0;

    carrinho.forEach((item, index) => {
        let total = item.preco * item.quantidade;
        totalGeral += total;

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
        "Total Geral: R$ " + totalGeral.toFixed(2);

    ativarEdicao();
    ativarRemocao();
}

function ativarEdicao() {
    const inputs = document.querySelectorAll(".inputQtd");

    inputs.forEach(input => {
        input.addEventListener("change", function () {
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            let index = this.dataset.index;
            let novaQtd = parseInt(this.value);

            if (novaQtd < 1) {
                this.value = carrinho[index].quantidade;
                return;
            }

            carrinho[index].quantidade = novaQtd;
            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            carregarCarrinho();
        });
    });
}

function ativarRemocao() {
    const botoes = document.querySelectorAll(".btn-remover");

    botoes.forEach(botao => {
        botao.addEventListener("click", function () {
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            let index = this.dataset.index;

            // Remove o item pelo índice
            carrinho.splice(index, 1);

            // Atualiza o localStorage
            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            // Recarrega a tabela
            carregarCarrinho();
        });
    });
}

carregarCarrinho();