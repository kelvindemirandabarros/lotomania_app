var texto_comparacao = ""; // É o texto que vai aparecer na divisão mostrando os cartões com 45 bolas iguais ou mais.
var texto_comparacao2 = ""; // É o texto que vai aparecer na divisão mostrando os cartões com o máx. de bolas iguais menor que 45.

var lista_bolas; // É a lista que conterá as bolas iguais para cada comparação.
var quant_max_bolas_iguais = 0;


// Esta função serve para comparar a lista um tipo de cartão com a lista de outro tipo para saber se há cartões parecidos.
function comparar_um_tipo_cartao_com_outro ( 
    cartao_tipo1,
    indice_cartao1,
    cartao_tipo2,
    indice_cartao2
) {
    // "cartao_tipo1" e "cartao_tipo2" podem ser as Cartões Extras.
    // "indice_cartao1" e "indice_cartao2" serão os índices dos cartões a serem comparados.
    
    lista_bolas = [];
    
    for ( var cont02 = 0; cont02 < cartao_tipo2[indice_cartao2][1].length; cont02++ ) { // Contador de bolas dos Cartões Escolhidos.

        if ( cartao_tipo1[indice_cartao1][1].includes( cartao_tipo2[indice_cartao2][1][cont02] ) ) {
            lista_bolas.push( cartao_tipo2[indice_cartao2][1][cont02] )
        }
    }

    if ( lista_bolas.length >= 45 ) { // Se o cartão_tipo2 tiver 45 bolas iguais a outro, então:

        // Nome do Cartão e seu índice.
        if ( cartao_tipo2[0].length === 4 ) { // Se o primeiro índice tiver 4 strings, então:
            texto_comparacao += `${ cartao_tipo2[0][0] } ${ cartao_tipo2[0][1] }`;
        } else if ( cartao_tipo2[0].length === 6 ) {
            texto_comparacao += `${ cartao_tipo2[0][0] } ${ cartao_tipo2[0][1] } ${ cartao_tipo2[0][2] }`;
        }

        texto_comparacao += ` ${ indice_cartao2 } tem ${ lista_bolas.length } bolas iguais a `;

        // Nome do Cartão e seu índice.
        if ( cartao_tipo1[0].length === 4 ) {
            texto_comparacao += `${ cartao_tipo1[0][1] }`;
        } else if ( cartao_tipo1[0].length === 6 ) {
            texto_comparacao += `${ cartao_tipo1[0][1] } ${ cartao_tipo1[0][2] }`;
        }

        texto_comparacao += ` ${ indice_cartao1 }.<br><br>`;

    } else if ( lista_bolas.length > quant_max_bolas_iguais ) { // Se a quantidade de bolas iguais for superior a anterior, então:
        quant_max_bolas_iguais = lista_bolas.length;
        texto_comparacao2 = `A quantidade máxima de bolas repetidas é ${ quant_max_bolas_iguais } e está em:<br><br>`
        
        // Nome do Cartão e seu índice.
        if ( cartao_tipo2[0].length === 4 ) {
            texto_comparacao2 += `${ cartao_tipo2[0][1] }`;
        } else if ( cartao_tipo2[0].length === 6 ) {
            texto_comparacao2 += `${ cartao_tipo2[0][1] } ${ cartao_tipo2[0][2] }`;
        }

        texto_comparacao2 += ` ${ indice_cartao2 } com ${ lista_bolas.length } bolas iguais a `;
        
        // Nome do Cartão e seu índice.
        if ( cartao_tipo1[0].length === 4 ) {
            texto_comparacao2 += `${ cartao_tipo1[0][1] }`;
        } else if ( cartao_tipo1[0].length === 6 ) {
            texto_comparacao2 += `${ cartao_tipo1[0][1] } ${ cartao_tipo1[0][2] }`;
        }
        
        texto_comparacao2 += ` ${ indice_cartao1 }.<br><br>`;

    } else if ( lista_bolas.length === quant_max_bolas_iguais ) {

        // Nome do Cartão e seu índice.
        if ( cartao_tipo2[0].length === 4 ) {
            texto_comparacao2 += `${ cartao_tipo2[0][1] }`;
        } else if ( cartao_tipo2[0].length === 6 ) {
            texto_comparacao2 += `${ cartao_tipo2[0][1] } ${ cartao_tipo2[0][2] }`;
        }

        texto_comparacao2 += ` ${ indice_cartao2 } com ${ lista_bolas.length } bolas iguais a `;
        
        // Nome do Cartão e seu índice.
        if ( cartao_tipo1[0].length === 4 ) {
            texto_comparacao2 += `${ cartao_tipo1[0][1] }`;
        } else if ( cartao_tipo1[0].length === 6 ) {
            texto_comparacao2 += `${ cartao_tipo1[0][1] } ${ cartao_tipo1[0][2] }`;
        }
        
        texto_comparacao2 += ` ${ indice_cartao1 }.<br><br>`;
    }
}

// Esta função serve para 
/**
 * Compara dois conjuntos de cartões.
 * 
 * @param {*} cartao_tipo1
 * @param {*} indice_inicial_cartao1 
 * @param {*} cartao_tipo2 
 * @param {*} indice_inicial_cartao2 
 */
function compara_cartoes ( cartao_tipo1, indice_inicial_cartao1, cartao_tipo2, indice_inicial_cartao2 ) {
    // "cartao_tipo1" e "cartao_tipo2" podem ser os Cartões Extras.
    // "indice_inicial_cartao1" e "indice_inicial_cartao2" serão os índices dos cartões a serem comparados.

    texto_comparacao = ""; // String texto para os cartões parecidos com 45 bolas ou mais.
    texto_comparacao2 = ""; // String texto para os cartões que mais se parecerem abaixo de 45 bolas.
    

    //if ( cartao_tipo1[0][2] === cartao_tipo2[0][2] ) { // Colocar o tamanho máximo para comparar cartões diferentes do mesmo tipo.   
    //}


    quant_max_bolas_iguais = 0;

    for ( let numero_cartao_tipo1 = indice_inicial_cartao1; numero_cartao_tipo1 < cartao_tipo1.length; numero_cartao_tipo1++ ) { // Contador do Cartão Tipo 1. O primeiro índice (0) contém strings, por isso utilizar a partir do segundo índice (1).
        
        for ( let numero_cartao_tipo2 = indice_inicial_cartao2; numero_cartao_tipo2 < cartao_tipo2.length; numero_cartao_tipo2++ ) { // Contador do Cartão Tipo 2. O primeiro índice (0) contém strings, por isso utilizar a partir do segundo índice (1).
            comparar_um_tipo_cartao_com_outro ( cartao_tipo1, numero_cartao_tipo1, cartao_tipo2, numero_cartao_tipo2 );
        }
    }

    subdivCompararCartoesDoMesmoTipo.innerHTML = texto_comparacao;

    if ( texto_comparacao === "" ) {
        subdivCompararCartoesDoMesmoTipo.innerHTML += `Não há ${ cartao_tipo2[0][4] } ${ cartao_tipo2[0][5] } parecidos a ${ cartao_tipo1[0][4] } ${ cartao_tipo1[0][5] } com 45 bolas iguais ou mais!<br><br>` + texto_comparacao2;
    }
}

// Esta função serve para comparar os cartões do mesmo tipo para saber se há cartões parecidos.
function comparar_dois_cartoes_do_mesmo_tipo ( cartao_tipo1, indice_cartao1, cartao_tipo2, indice_cartao2 ) {
    // "cartao_tipo1" e "cartao_tipo2" podem ser os Cartões Extras.
    // "indice_cartao1" e "indice_cartao2" serão os índices dos cartões a serem comparados.
    
    lista_bolas = [];
    
    for ( var cont02 = 0; cont02 < cartao_tipo2[indice_cartao2][1].length; cont02++ ) { // Contador de bolas dos Cartões Escolhidos.

        if ( cartao_tipo1[indice_cartao1][1].includes( cartao_tipo2[indice_cartao2][1][cont02] ) ) {
            lista_bolas.push( cartao_tipo2[indice_cartao2][1][cont02] )
        }
    }

    if ( lista_bolas.length >= 45 ) { // Se o cartão_tipo2 tiver 45 bolas iguais a outro, então:

        // Nome do Cartão e seu índice.
        if ( cartao_tipo2[0].length === 4 ) { // Se o primeiro índice tiver 4 strings, então:
            texto_comparacao += `${ cartao_tipo2[0][0] } ${ cartao_tipo2[0][1] }`;
        } else if ( cartao_tipo2[0].length === 6 ) {
            texto_comparacao += `${ cartao_tipo2[0][0] } ${ cartao_tipo2[0][1] } ${ cartao_tipo2[0][2] }`;
        }

        texto_comparacao += ` ${ indice_cartao2 } tem ${ lista_bolas.length } bolas iguais a `;

        // Nome do Cartão e seu índice.
        if ( cartao_tipo1[0].length === 4 ) {
            texto_comparacao += `${ cartao_tipo1[0][1] }`;
        } else if ( cartao_tipo1[0].length === 6 ) {
            texto_comparacao += `${ cartao_tipo1[0][1] } ${ cartao_tipo1[0][2] }`;
        }

        texto_comparacao += ` ${ indice_cartao1 }.<br><br>`;

    } else if ( lista_bolas.length > quant_max_bolas_iguais ) { // Se a quantidade de bolas iguais for superior a anterior, então:
        quant_max_bolas_iguais = lista_bolas.length;
        texto_comparacao2 = `A quantidade máxima de bolas repetidas é ${ quant_max_bolas_iguais } e está em:<br><br>`
        
        // Nome do Cartão e seu índice.
        if ( cartao_tipo2[0].length === 4 ) {
            texto_comparacao2 += `${ cartao_tipo2[0][1] }`;
        } else if ( cartao_tipo2[0].length === 6 ) {
            texto_comparacao2 += `${ cartao_tipo2[0][1] } ${ cartao_tipo2[0][2] }`;
        }

        texto_comparacao2 += ` ${ indice_cartao2 } com ${ lista_bolas.length } bolas iguais a `;
        
        // Nome do Cartão e seu índice.
        if ( cartao_tipo1[0].length === 4 ) {
            texto_comparacao2 += `${ cartao_tipo1[0][1] }`;
        } else if ( cartao_tipo1[0].length === 6 ) {
            texto_comparacao2 += `${ cartao_tipo1[0][1] } ${ cartao_tipo1[0][2] }`;
        }
        
        texto_comparacao2 += ` ${ indice_cartao1 }.<br><br>`;

    } else if ( lista_bolas.length === quant_max_bolas_iguais ) {

        // Nome do Cartão e seu índice.
        if ( cartao_tipo2[0].length === 4 ) {
            texto_comparacao2 += `${ cartao_tipo2[0][1] }`;
        } else if ( cartao_tipo2[0].length === 6 ) {
            texto_comparacao2 += `${ cartao_tipo2[0][1] } ${ cartao_tipo2[0][2] }`;
        }

        texto_comparacao2 += ` ${ indice_cartao2 } com ${ lista_bolas.length } bolas iguais a `;
        
        // Nome do Cartão e seu índice.
        if ( cartao_tipo1[0].length === 4 ) {
            texto_comparacao2 += `${ cartao_tipo1[0][1] }`;
        } else if ( cartao_tipo1[0].length === 6 ) {
            texto_comparacao2 += `${ cartao_tipo1[0][1] } ${ cartao_tipo1[0][2] }`;
        }
        
        texto_comparacao2 += ` ${ indice_cartao1 }.<br><br>`;
    }
}

// Esta função serve para comparar cartões do mesmo tipo.
function compara_cartoes_do_mesmo_tipo ( cartoes ) {
    // "cartoes" pode ser os Cartões Extras.

    alert ( "Espere uns instantes!" );

    texto_comparacao = ""; // String texto para os cartões parecidos com 45 bolas ou mais.
    texto_comparacao2 = ""; // String texto para os cartões que mais se parecerem abaixo de 45 bolas.
    

    //if ( cartoes[0][2] === cartoes[0][2] ) { // Colocar o tamanho máximo para comparar cartões diferentes do mesmo tipo.   
    //}


    quant_max_bolas_iguais = 0;

    for ( var cont00 = 2; cont00 < cartoes.length; cont00++ ) { // Contador dos cartões a serem comparados apenas com os anteriores. O primeiro índice (0) contém strings, por isso utilizar a partir do segundo índice (1).
        
        for ( var cont01 = 1; cont01 < cont00 ; cont01++ ) { // Contador do Cartão Tipo 2. O primeiro índice (0) contém strings, por isso utilizar a partir do segundo índice (1).
            comparar_dois_cartoes_do_mesmo_tipo ( cartoes, cont01, cartoes, cont00 );
        }
    }
    subdivCompararCartoesDoMesmoTipo.innerHTML = texto_comparacao;
    if ( texto_comparacao === "" ) {
        subdivCompararCartoesDoMesmoTipo.innerHTML += `Não há ${ cartoes[0][4] } ${ cartoes[0][5] } parecidos a ${ cartoes[0][4] } ${ cartoes[0][5] } com 45 bolas iguais ou mais!<br><br>` + texto_comparacao2;
    }
}
