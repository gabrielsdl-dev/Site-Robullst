var botaoAdicionar = document.querySelector("#adiciona-encomenda");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    
    //Captura o formulário de encomendas
    var form = document.querySelector("#form-adiciona");

    //Captura os dados da nova encomenda
    var encomendaNova = obtemEncomenda(form);


    //insere encomenda na tabela
    addEncomendaTabela(encomendaNova);

    //Limpa o formulário
    form.reset();
});

//Função para inserir uma nova encomenda na tabela
function addEncomendaTabela(encomendaNova){
     //Captura a tabela de encomendas
     var tabela = document.querySelector(".tabela-clientes");

     //Cria a nova linha na tabela
     tabela.appendChild(montaTR(encomendaNova));
}


function obtemEncomenda(formulario){

    var encomenda = {
        nome: formulario.nome.value,
        produto: formulario.produto.value,
        qntd: formulario.qntd.value,
        unitario: formulario.unitario.value
    }
    return encomenda;
}
function montaTR(dadosEncomenda){
    var tr = document.createElement("tr");

    tr.appendChild(montaTD(dadosEncomenda.nome));
    tr.appendChild(montaTD(dadosEncomenda.produto));
    tr.appendChild(montaTD(dadosEncomenda.qntd));
    tr.appendChild(montaTD(formataValor(parseFloat(dadosEncomenda.unitario))));
    tr.appendChild(montaTD(calculaTotal(dadosEncomenda.qntd,dadosEncomenda.unitario)));

    return tr;
}

function montaTD(dado){
    var td = document.createElement("td");
    td.textContent = dado;

    return td;
}