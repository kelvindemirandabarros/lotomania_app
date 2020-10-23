// Esta função serve para deixar visível o botão de carregar os arquivos .txt.
function mostra_botao_de_carregamento () {
    carregador_arquivos.disabled = false;
}


/**
 * Carrega os Concursos a partir do arquivo da Caixa Econômica Federal.
 */
function carrega_concursos_do_arquivo_da_cef () {
    // OBSs.:
    // Colocar a variável para entrar como parâmetro.
    // Fazer com que todas as 4 estatísticas sejam criadas DURANTE o carregamento dos concursos, e não depois do carregamento.

    const concurso_atual = parseInt( prompt ( "Digite o Concurso atual ou o Concurso a ser alcançado, e espere alguns minutos:" ) );

    if ( concurso_atual === null )
        cancela_carregamento();

    // console.time( 'Carregamento de Concursos' );

    // Objeto 'new Date' usado para calcular o tempo de duração da função inteira.
    // initial_date é o início do tempo, em milisegundos desde 1970 até o momento da invocação dessa função. Horário de começo da função.
    let i_date = new Date().getTime();

    // Horário de término da função:
    let e_date; 
    // Objeto com os cálculos definidos:
    let ob_date = {}; 

    frase = frase.toString();

    frase = frase.replace( /"[0-9]{1,3}">/g, "\"1\">" );

    concursos = [ [ "O", "Concurso", "Os", "Concursos" ] ];

    let numero_concurso = 0;
    let bolas = [];
    
    // Para a quantidade total desejada de Concursos.
    for ( let z = 1; z <= concurso_atual; z++ ) {

        numero_concurso = parseInt( frase.slice( ( frase.search(`"1">`) + 4 ),  ( frase.indexOf( `</`, ( frase.search(`"1">`) + 4 ) ) ) ) );
        // Aqui pegará o número do Concurso. É a transformação em inteiro da parte "cortada" que começa no índice de pesquisa de  "1">  e termina no índice anterior à pesquisa do próximo  </  logo após o primeiro  "1">  , o que indica que o número ali contido dentro da tabela será o concurso.

        frase = frase.slice( frase.indexOf( `</`, ( frase.search(`"1">`) + 4 ) ) );
        // Retira o começo da string até o número do Concurso.

        frase = frase.slice( frase.indexOf( `</`, ( frase.search(`"1">`) + 4 ) ) );
        // Retira o começo da string até a data de realização do Concurso.

        bolas = []; // Reinicia a lista das bolas para não bugar.

        for ( var zz = 1; zz <= 20; zz++ ) { // Para a quantidade de bolas.

            bolas.push( parseInt( frase.slice( ( frase.search(`"1">`) + 4 ),  ( frase.indexOf( `</`, ( frase.search(`"1">`) + 4 ) ) ) )));
            // Pega a bola.

            frase = frase.slice( frase.indexOf( `</`, ( frase.search(`"1">`) + 4 ) ) );
            // Retira o começo da string até a bola já adicionada.
        }

        for ( var zz = 1; zz < 24; zz++ ) { // FOR para retirar valores que não importam.
            // Retira valores não importantes.
            frase = frase.slice( frase.indexOf( `</`, ( frase.search(`"1">`) + 4 ) ) );
        }

        concursos.push( [ [ numero_concurso ], bolas ] );

        adiciona_frequencia_das_bolas_novo_concurso( bolas );
    }

    // Objeto 'new Date()' com o método '.getTime()' usados para calcular o tempo de duração da função inteira.
    e_date = new Date().getTime();
    ob_date.total = parseInt ( ( e_date - i_date ) / 1000 );
    // console.log( 'Tempo total: ' + ob_date.total + ' segundos!');
    ob_date.hours = parseInt( ob_date.total / 3600 );
    ob_date.total %= 3600;
    ob_date.minutes = parseInt( ob_date.total / 60 );
    ob_date.total %= 60;
    ob_date.seconds = parseInt ( ob_date.total );

    console.log( `O programa demorou ${ ob_date.hours }h:${ ob_date.minutes }m:${ ob_date.seconds }s para carregar.` );
    
    console.log( "Carregamento terminado!" );

    salva_no_localstorage( "concursos", concursos );
}


// Esta função serve para carregar os Concursos.
function carrega_concursos ( frase ) {

    alert ( "Espere uns instantes!" );

    concursos = [ [ "O", "Concurso", "Os", "Concursos" ] ];

    while ( frase[0] === "" ) {
        // Remove um elemento, no índice 0.
        frase.splice( 0, 1 );
    }

    var quantidade_de_cartoes_no_arquivo = parseInt( frase.shift() );

    // Repete para 1960 Concursos da Lotomania.
    for ( var x = 1; x < (quantidade_de_cartoes_no_arquivo + 1) ; x++ ) { // ADICIONAR UMA FORMA DE ALTERAR A QUANTIDADE DE CARTÕES QUE SERÃO CARREGADOS.

        concursos.push ( [ [], [] ] ); // Adiciona um array com dois arrays dentro, o primeiro para o número do concurso e o segundo para as respectivas bolas.
        // Repete para 20 Bolas de cada Resultado.
        for ( var y = 1; y <= 21; y++ ) {

            // Enquanto o primeiro elemento do array Frase for igual a "", então:
            while ( frase[0] === "" ) {
                // Remove um elemento, no índice 0.
                frase.splice(0, 1);
            }

            if ( y === 1 ) {
                concursos[ concursos.length - 1 ][0].push( parseInt( frase[0] ) ); // Adiciona o número do cartão no primeiro índice (índice 0), e depois as 20 Bolas.
                frase.splice( 0, 1 );

            } else {
                concursos[ concursos.length - 1 ][1].push( parseInt( frase[0] ) ); // Adiciona o número do cartão no primeiro índice (índice 0), e depois as 20 Bolas.
                frase.splice( 0, 1 );
            }
        }
    }
    salva_no_localstorage( "concursos", concursos );
    
    alert ( "Concursos salvos!" );
}


// Esta função serve para carregar os Cartões Extras.
function carrega_cartoes_extras ( frase ) {

    alert ( "Espere uns instantes!" );

    cartoes_extras = [ [ "O", "Cartão", "Extra", "Os", "Cartões", "Extras" ] ];

    // Enquanto o primeiro elemento do array Frase for igual a "", então:
    while ( frase[0] === "" ) {
        // Remove um elemento, no índice 0.
        frase.splice( 0, 1 ); // Remove os espaços vazios no array Frase.
    }
    
    var quantidade_de_cartoes_no_arquivo = parseInt( frase.shift() );
    
    for ( var x = 1; x < ( quantidade_de_cartoes_no_arquivo + 1 ); x++ ) { // Repete pela quant. de Cartões Extras que o arquivo contém.

        cartoes_extras.push ( [ [], [] ] ); // Adiciona um array com dois arrays dentro, o primeiro para o número do concurso e o segundo para as respectivas bolas.
        
        for ( var y = 1; y < 52; y++ ) { // Repete para o número do Cartão Extra e suas 50 Bolas.

            // Enquanto o primeiro elemento do array Frase for igual a "", então:
            while ( frase[0] === "" ) {
                // Remove um elemento, no índice 0.
                frase.splice(0, 1);
            }

            if ( y === 1 ) {
                cartoes_extras[ cartoes_extras.length - 1 ][0].push( parseInt( frase[0] ) ); // Adiciona o número do Cartão Extra no primeiro índice (índice 0).
                frase.splice( 0, 1 );

            } else {
                cartoes_extras[ cartoes_extras.length - 1 ][1].push( parseInt( frase[0] ) ); // Adiciona as bolas do Cartão Extra no segundo índice (índice 1).
                frase.splice( 0, 1 );
            }
        }
    }

    salva_no_localstorage( "cartoes_extras", cartoes_extras ); // Salva os Cartões Extras no localStorage.

    alert ( "Cartões Extras salvos!" );
}


const botao_escolhe_arquivo = document.getElementById( 'botao_escolhe_arquivo' );
// Esta função serve para escolher o tipo de arquivo que será carregado.
function escolhe_arquivo_para_carregar () {

    botao_escolhe_arquivo.disabled = true;
    carregador_arquivos.disabled = false;
    botao_cancela_carregamento.disabled = false;

    var escolhe;
    while ( ![ "1", "2", '3' ].includes( escolhe ) ) {
                        
        escolhe = prompt ( `Digite:
            1 - para carregar os Concursos do arquivo da Caixa Econômica;
            2 - para carregar os Concursos do arquivo salvo pelo app;
            3 - para carregar os Cartões Extras do arquivo salvo pelo app.`
        ); //, e 4 para esconder o botão de carregamento." );

        if ( escolhe === "1" ) {
            funcao = carrega_concursos_do_arquivo_da_cef;
            
        } else if ( escolhe === "2" ) {
            funcao = carrega_concursos;
            
        } else if ( escolhe === "3" ) {
            funcao = carrega_cartoes_extras;
            
        } else if ( escolhe === null ) {
            botao_escolhe_arquivo.disabled = false;
            carregador_arquivos.disabled = true;
            botao_cancela_carregamento.disabled = true;
            break;
            
        } else {
            alert ( "Escolha inválida." );
        }
    }
}
botao_escolhe_arquivo.addEventListener( 'click', escolhe_arquivo_para_carregar );


const botao_cancela_carregamento = document.getElementById( 'botao_cancela_carregamento' );
function cancela_carregamento () {
    botao_escolhe_arquivo.disabled = false;
    carregador_arquivos.disabled = true;
    botao_cancela_carregamento.disabled = true;
}
botao_cancela_carregamento.addEventListener( 'click', cancela_carregamento );
