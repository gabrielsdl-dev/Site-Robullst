function atualizarContadorCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let contador = document.getElementById("contadorCarrinho");

    if (!contador) return;

    let totalItens = 0;

    carrinho.forEach(item => {
        totalItens += item.quantidade;
    });

    contador.innerText = totalItens;
}

atualizarContadorCarrinho();