function abrirFormulario() {
    /*Mostra o Formulario que estava oculto*/
    document.getElementById("formEndereco").style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
}

/*API do CEP*/
function buscarCEP() {
    let cep = document.getElementById("cep").value;

    /*Se o cep digitado não tiver 8 digitos ele não busca nada */
    if (cep.length !== 8) return;

    /*Link da API */
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            /*Se o CEP digitado não existir, retornará CEP inválido */
            if (data.erro) {
                alert("CEP inválido!");
                return;
            }

            /*Preenche automaticamente o formulario de acordo com o CEP digitado*/
            document.getElementById("rua").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
        });
}

function finalizarPedido() {
    /*Carrega os produtos salvos no carrinho */
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    /*Monta o texto dos produtos */
    /*.map coloca cada produto em uma linha */
    /*%0A - é uma quebra de linha */
    let itensTexto = carrinho.map(item => {
        return `${item.nome} (${item.quantidade}x) - R$ ${item.preco.toFixed(2)}`;
    }).join("%0A");

    /*Calcla o total da compra */
    let total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    /* Pega os dados do formulário */  
    let endereco = `
        CEP: ${document.getElementById("cep").value}
        Rua: ${document.getElementById("rua").value}
        Número: ${document.getElementById("numero").value}
        Bairro: ${document.getElementById("bairro").value}
        Cidade: ${document.getElementById("cidade").value}
        Estado: ${document.getElementById("estado").value}
        Complemento: ${document.getElementById("complemento").value}
        `.replace(/\n/g, "%0A");


    /*Mensagem Final */
    let mensagem =
        `*NOVO PEDIDO ROBULLST* %0A%0A` + 
        `*Produtos:* %0A${itensTexto}%0A%0A` +
        `*Total:* R$ ${total.toFixed(2)}%0A%0A` +
        `*Endereço de entrega:* %0A${endereco}`;

    /*Variavel do numero do wpp */
    let Wpp = "5511975364351";

    /*Abre o wpp com a mensagem já preenchida */
    window.open(`https://wa.me/${Wpp}?text=${mensagem}`, "_blank");
}