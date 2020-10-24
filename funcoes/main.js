// Esta função serve para imprimir todas as premiações na tela.
function imprime_conferencia_concursos_nos_cartoes_extras ( cartoes_premiados, numero_premiacao ) {

    if ( cartoes_premiados.length === 0 ) {
        texto_premiacoes += `Premiações com ${numero_premiacao} acertos: Nenhuma.<br><br><br>`;

    } else {
        texto_premiacoes += `Premiações com ${numero_premiacao} acertos: ${cartoes_premiados.length}.<br><br>`;

        for (var cont10 = 0; cont10 < cartoes_premiados.length; cont10++) {

            texto_premiacoes += `Cartão Extra: ${cartoes_premiados[cont10][0]}<br>`;
            texto_premiacoes += `Bolas acertadas:<br>`;
            texto_premiacoes += `${cartoes_premiados[cont10][1].join(", ")}<br><br>`;
        }
        texto_premiacoes += `<br>`;
    }
}


var texto_comparacao = ""; // É o texto que vai aparecer na divisão mostrando os cartões com 45 bolas iguais ou mais.
var texto_comparacao2 = ""; // É o texto que vai aparecer na divisão mostrando os cartões com o máx. de bolas iguais menor que 45.
var lista_bolas; // É a lista que conterá as bolas iguuais para cada comparação.
var quant_max_bolas_iguais = 0;
