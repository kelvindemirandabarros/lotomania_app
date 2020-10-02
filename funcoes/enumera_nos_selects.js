/**
 * Função para retirar todos os options do "selecionador_cartao".
 */
function reinicia_select_numeros_cartoes () {
    // Remove o elemento 1 até sobrar apenas o elemento 0 que não contém texto.
    while ( select_numero_cartao.length > 1 ) {
        select_numero_cartao.remove( 1 ); 
    }
}


function adiciona_um_cartao_no_select ( numero_cartao ) {
    return `<option class='opcao'>${ numero_cartao }</option>`;
}


/**
 * 
 * @param { number } quant_cartoes 
 */
function enumera_cartoes_no_select ( quant_cartoes ) {
    let options = '';
    
    for ( let numero_cartao = 1; numero_cartao <= quant_cartoes; numero_cartao++ ) {
        options += adiciona_um_cartao_no_select( numero_cartao );
    }

    selecionador_cartao.innerHTML += options;
}
