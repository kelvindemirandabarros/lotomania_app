// Função para salvar as listas de Concurso e Cartões Extras.
/**
 * 
 * @param { string } nome é a string com o mesmo nome da variável a ser salva.
 * @param { array } lista contém as informações a serem salvas. Pode ser os cartões ou as estatísticas.
 */
function salva_no_localstorage ( nome, lista ) {
    localStorage.setItem( nome, JSON.stringify( lista ) );
}


/**
 * Função de salvar os diferentes tipos de Cartões em arquivos .txt. (Concursos, Cartões Extras)
 * 
 * @param { array } cartoes é a lista com os cartões a serem salvos.
 * @param { string } nome_cartao é o nome dos cartões a serem salvos que ficará no arquivo .txt.
 */
function salvar_em_txt ( cartoes, nome_cartao ) {

    var texto = ""; /// "texto" conterá todo o conteúdo dos Cartões em forma de String.

    // ???
    // for ( var cont = 0; cont < cartoes[0].length; cont++ ) {
    //     texto += cartoes[0][cont] + " ";
    // }
    // texto += "\n";
    // ???

    // Salva a quantidade de cartões do tipo para o programa já carregar a quantidade que o arquivo tiver.
    texto = ( cartoes.length - 1 ) + " \n";
    
    for ( var cont99 = 1; cont99 < cartoes.length; cont99++ ) { // Contador de Cartões.

        texto += cartoes[cont99][0][0] + " "; // Adiciona o número do Cartão e um espaço.

        if ( cartoes[1].length === 2 ) { // Para Concursos e para Cartões Extras que só têm o número dos cartões e os números das bolas.

            for ( var cont98 = 0; cont98 < cartoes[cont99][1].length; cont98++ ) { // Contador de Bolas.
                texto += cartoes[cont99][1][cont98] + " "; // Adiciona o número das bolas.
            }

        }

        texto += "\n";
    }

    // Cria um novo Blob ( [<texto>], { <define o tipo de blob, no caso, texto } ).
    var blob = new Blob ( [texto], { type: "text/plain;charset=utf-8" } );

    saveAs (blob, nome_cartao + (cartoes.length - 1) + ".txt");
}
