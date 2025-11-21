function abrirFormulario() {
    document.getElementById("formEndereco").style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
}

function buscarCEP() {
    let cep = document.getElementById("cep").value;

    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP inválido!");
                return;
            }

            document.getElementById("rua").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
        });
}

function finalizarPedido() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let itensTexto = carrinho.map(item => {
        return `${item.nome} (${item.quantidade}x) - R$ ${item.preco.toFixed(2)}`;
    }).join("%0A");

    let total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    // Pegar endereço
    let endereco = `
        CEP: ${document.getElementById("cep").value}
        Rua: ${document.getElementById("rua").value}
        Número: ${document.getElementById("numero").value}
        Bairro: ${document.getElementById("bairro").value}
        Cidade: ${document.getElementById("cidade").value}
        Estado: ${document.getElementById("estado").value}
        Complemento: ${document.getElementById("complemento").value}
        `.replace(/\n/g, "%0A");

    let mensagem =
        `*NOVO PEDIDO ROBULLST* %0A%0A` +
        `*Produtos:* %0A${itensTexto}%0A%0A` +
        `*Total:* R$ ${total.toFixed(2)}%0A%0A` +
        `*Endereço de entrega:* %0A${endereco}`;


    let numeroWpp = "5511975364351";
    window.open(`https://wa.me/${numeroWpp}?text=${mensagem}`, "_blank");
}