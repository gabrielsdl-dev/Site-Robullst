//codigo para calcular o total de 1 --linha--
//document.querySelector(".total").textContent=document.querySelector(".qntd").textContent * document.querySelector(".unitario").textContent

// captura todas as encomendas para calcular o total


// Rotina de Calculo do Total

var cliente = document.querySelectorAll(".cliente");
for (var count = 0; count < cliente.length; count++) {

    // captura a quantidade da encomenda
    var tab_qntd = cliente[count].querySelector(".qntd").textContent;

    // captura o valor da encomenda
    var tab_unitario = cliente[count].querySelector(".unitario").textContent;

    //valida a quantidade
    if (tab_qntd <= 1 && !isNaN(tab_qntd)) {
        //Quantidade inválida
        cliente[count].querySelector(".qntd").textContent = "Quantidade Inválida";
        clientes[count].classList.add("info-invalida");


    } else {
        //Verifica se o valor unitário é inválido
        if (tab_unitario < 0 || isNaN(tab_unitario)) {
            //Unitário é inválido
            clientes[count].querySelector(".unitario").textContent = "R$ Unitário inválido";
            clientes[count].classList.add("info-invalida2");


        } else {
            //faz a conta para exibir o valor total nas tabelas
            cliente[count].querySelector(".total").textContent = calculaTotal(tab_qntd, tab_unitario);

            cliente[count].querySelector(".unitario").textContent = parseFloat
                (tab_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }

    }
}


//Função de cálculo do valor total
function calculaTotal(qntd,unitario){
    var total=0;

    total = qntd * unitario;
    
    return formataValor(total);
}

//Função que formata os valores em R$
function formataValor(valor){
    var valor_formatado = valor.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});

    return valor_formatado;
}