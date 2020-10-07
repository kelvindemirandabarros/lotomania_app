/**
 * Função que transforma o background dos botões das bolas em verde ou vermelho, significando que o botão está selecionado ou não, respectivamente.
 * 
 * @param { html_button } botao
 */
function seleciona_bola ( botao ) {
    var bola = parseInt( botao.textContent );

    if ( tipoDCE[0] === "Nenhum" || !tipoDCE[0] ) {
        alert("Primeiro escolha um tipo de cartão!");

    } else {
        if ( botao.style.backgroundColor === "red" || !botao.style.backgroundColor ) {
            // A propriedade .style.backgroundColor inicialmente é vazia, significando que é red, por isso a necessidade de verificar se é vazio com o "!botao.style.backgroundColor".
            var bolas_aux = bolas.slice(0);
            bolas_aux.push( bola );
            if ( bolas_aux.length > tamanho_maximo ) {
                alert(`NÃO SE PODE ADICIONAR MAIS DO QUE ${ tamanho_maximo } BOLAS EM ${ tipoDCE[0].toLocaleUpperCase () }!!`);

            } else {
                botao.style.backgroundColor = "green"; // Define o background do botão pra verde.
                bolas.push( bola ); // Insere a bola na lista de bolas.
            }

        } else { // Caso tenha vindo pro else, significa que está retirando a bola.
            botao.style.backgroundColor = "red"; 
            bolas.splice( bolas.indexOf( bola ), 1 ); // Retira a bola.
        }

        freq_bolas_selecionadas ();
    }
}


// Função autoexecutável para criar os botões das bolas.
(function () {
    var divBotoesNumeros = document.getElementById( "divBotoesNumeros" );
    for ( var bola = 1; bola < 101; bola++ ) {
        const novo_botao = document.createElement( "button" );
        novo_botao.setAttribute( "type", "button" );
        novo_botao.setAttribute( "class", "botao_bola" );
        if ( bola < 10 ) {
            novo_botao.appendChild( document.createTextNode( "0" + bola ) );
        } else if ( bola < 100 ) {
            novo_botao.appendChild( document.createTextNode( bola ) );
        } else {
            novo_botao.appendChild( document.createTextNode( "00" ) );
        }
        novo_botao.addEventListener( 'click', function () { 
            seleciona_bola ( this );
        });
        divBotoesNumeros.appendChild( novo_botao );
    }
})();


// Função para tirar o "bug" de todos os botões com relação ao background, e que serve também para "apagar" (transformar a cor para vermelho) todas as bolas quando necessário, e torná-las visíveis para que sejam selecionadas para um novo cartão.
function apagaTodasAsBolas () {

    for ( var indice = 0; indice < 100; indice++ ) {

        if ( 
            botoes_bolas[ indice ].style.backgroundColor ||
            !botoes_bolas[ indice ].style.backgroundColor
        ) {
        // A propriedade .style.backgroundColor inicialmente é vazia, significando que é red, por isso a necessidade de verificar se é vazio com o "!botao.style.backgroundColor".
            botoes_bolas[indice].style.backgroundColor = "red";
            botoes_bolas[indice].style.visibility = "visible";
        }
    }
};
apagaTodasAsBolas();


let tamanho_maximo; // Tamanho Máximo significa a quantidade máxima de bolas do tipo de cartão escolhido.
let tipoDCE = []; // "tipo De Cartão Escolhido" -> Guardará informações como nome e índice. == ["NOME", indice]


// Esta função serve para acender ou apagar (neste caso, também esconder com a propriedade "visibility") os botões, de acordo com o cartão selecionado e suas bolas.
function acendeOuApaga ( bolas_cartao ) {
    for (var indice = 0; indice < 100; indice++) {
        if ( bolas_cartao.includes( parseInt(botoes_bolas[indice].textContent) ) ) {
            botoes_bolas[indice].style.backgroundColor = "green";
            botoes_bolas[indice].style.visibility = "visible";
        } else {
            botoes_bolas[indice].style.backgroundColor = "red";
            botoes_bolas[indice].style.visibility = "hidden";
        }
    }
}


// Esta função serve para zerar tudo na tela.
function zera_tudo_apos_adicionar_cartao () {
    apagaTodasAsBolas();
    bolas = [];
}
