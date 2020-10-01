// Esta função serve para deixar visível o botão de carregar os arquivos .txt.
function mostra_botao_de_carregamento () {
    carregador_arquivos.disabled = false;
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


// Esta função serve para escolher o tipo de arquivo que será carregado.
function escolhe_arquivo_para_carregar () {

    document.getElementById( 'botao_escolhe_arquivo' ).style.disabled = true;
    carregador_arquivos.disabled = false;
    document.getElementById( 'botao_cancela_carregamento' ).style.disabled = false;

    var escolhe;
    while ( ![ "1", "2" ].includes( escolhe ) ) {
                        
        escolhe = prompt ( "Digite 1 para carregar os Concursos, 2 para os Cartões Extras" ); //, e 4 para esconder o botão de carregamento." );
        if ( escolhe === "1" ) {
            funcao = carrega_concursos;
        
        } else if ( escolhe === "2" ) {
            funcao = carrega_cartoes_extras;

        } else if ( escolhe === null ) {
            document.getElementById( 'botao_escolhe_arquivo' ).style.disabled = true;
            carregador_arquivos.disabled = true;
            document.getElementById( 'botao_cancela_carregamento' ).style.disabled = true;
            break;
            
        } else {
            alert ( "Escolha inválida." );
        }
    }
}


function cancela_carregamento () {
    document.getElementById( 'botao_escolhe_arquivo' ).style.disabled = false;
    carregador_arquivos.disabled = true;
    document.getElementById( 'botao_cancela_carregamento' ).style.disabled = true;
}
