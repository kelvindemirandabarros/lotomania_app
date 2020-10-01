// Esta função serve para mostrar os cartões premiados do último Concurso.
function imprime_cartoes_premiados ( cartoes, cartoes_premiados, numero_premiacao ) {
    // "cartoes" pode ser os Cartões Extras.
    // "cartoes_premiados" será uma das variáveis das premiações, entre quinze e vinte ou zero.
    // "numero_premiacoes" será uma string com o valor dos "cartoes_premiados".
    
    if ( cartoes_premiados.length === 0 ) {
        texto_premiacoes += `Premiações com ${ numero_premiacao } acertos: Nenhum.<br><br><br>`;

    } else {
        texto_premiacoes += `Premiações com ${ numero_premiacao } acertos: ${ cartoes_premiados.length }<br><br>`;
        for ( var cont10 = 0; cont10 < cartoes_premiados.length; cont10++ ) { // Contador de cartões premiados.
            texto_premiacoes += `${ cartoes[0][1] } ${ cartoes[0][2] }: ${ cartoes_premiados[cont10][0] }<br>`;
            texto_premiacoes += `Bolas acertadas:<br>`;
            texto_premiacoes += `${ cartoes_premiados[cont10][1].join(", ") }<br><br>`; // As bolas estão no 2o array.
        }
        texto_premiacoes += `<br>`;
    }
}

/**
 * Função para conferir se haveria premiações caso os cartões fossem jogados.
 * 
 * @param { array } cartoes será os 'Cartões Extras'.
 * @param { array } novo_c é a lista de bolas do Concurso novo.
 * @param {*} divisao_tela será a div que conterá as informações finais, dependendo do tipo de cartões que serão verificados.
 * @param {*} div_custos_ganhos será a div que conterá os custos e ganhos de jogar os cartões a serem verificados.
 * @param {*} numero_concurso é o número do Concurso que acabou de ser adicionado.
 */
function confere_premiacoes ( cartoes, novo_c, divisao_tela, div_custos_ganhos, numero_concurso ) {

    divisao_tela.innerHTML = ``;
    texto_premiacoes = `Concurso número ${ numero_concurso }.<br><br><br>`;

    var bolas_acertadas = []
    custos = 0;
    ganhos = 0;

    zero = [];
    quinze = [];
    dezesseis = [];
    dezesete = [];
    dezoito = [];
    dezenove = [];
    vinte = [];

    for ( var cont8 = 1; cont8 < cartoes.length; cont8++ ) { // Contador de Cartões Extras para verificar se há premiações. O primeiro índice (0) contém strings, por isso utilizar a partir do segundo índice (1).
        
        bolas_acertadas = []; // Reseta as bolas_acertadas.

        for ( var cont9 = 0; cont9 < novo_c.length; cont9++ ) { // Contador de bolas do novo Concurso.
            if ( cartoes[cont8][1].includes( novo_c[cont9] ) ) {
                bolas_acertadas.push( novo_c[cont9] );
            }
        }

        if ( bolas_acertadas.length === 0 ) {
        zero.push( [ cartoes[cont8][0], bolas_acertadas ] );
        //ganhos += ?? // Não tem como saber as premiações de 0 acertos pelo site.

        } else if ( bolas_acertadas.length === 15 ) {
            quinze.push( [ cartoes[cont8][0], bolas_acertadas ] );
            ganhos += p15;

        } else if ( bolas_acertadas.length === 16 ) {
            dezesseis.push( [ cartoes[cont8][0], bolas_acertadas ] );
            ganhos += p16;

        } else if ( bolas_acertadas.length === 17 ) {
            dezesete.push( [ cartoes[cont8][0], bolas_acertadas ] );
            ganhos += p17;

        } else if ( bolas_acertadas.length === 18 ) {
            dezoito.push( [ cartoes[cont8][0], bolas_acertadas ] );
            ganhos += p18;

        } else if ( bolas_acertadas.length === 19 ) {
            dezenove.push( [ cartoes[cont8][0], bolas_acertadas ] );
            ganhos += p19;

        } else if ( bolas_acertadas.length === 20 ) {
            vinte.push( [ cartoes[cont8][0], bolas_acertadas ] );
            ganhos += p20;
        }
    }

    imprime_cartoes_premiados ( cartoes, zero, 0 );
    imprime_cartoes_premiados ( cartoes, quinze, 15 );
    imprime_cartoes_premiados ( cartoes, dezesseis, 16 );
    imprime_cartoes_premiados ( cartoes, dezesete, 17 );
    imprime_cartoes_premiados ( cartoes, dezoito, 18 );
    imprime_cartoes_premiados ( cartoes, dezenove, 19 );
    imprime_cartoes_premiados ( cartoes, vinte, 20 );

    div_custos_ganhos.textContent = `Custos: R$${ cartoes.length * custo_cartao } // Ganhos: R$${ ganhos } // Total: R$${ ganhos - (cartoes.length * custo_cartao) }`;

    divisao_tela.innerHTML = texto_premiacoes;
}




