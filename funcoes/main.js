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


// "funcao" serve para guardar a função do arquivo a ser carregado.
let funcao;
/**
 * Função para carregar um arquivo .txt
 * @param {*} event é o evento que ativou a função.
 */
function carrega_txt ( event ) {

    // Check the support for the File API support:
    if ( window.File && window.FileReader && window.FileList && window.Blob ) {

        //Set the extension for the file
        var fileExtension = /text.*/;

        //Get the file object // Arquivo a ler lido. Seleciona o primeiro arquivo da lista.
        var fileTobeRead = event.target.files[0];
        
        //Check of the extension match
        if ( fileTobeRead.type.match( fileExtension ) ) {
            
            //Initialize the FileReader object to read the 2file
            var fileReader = new FileReader();

            fileReader.onload = function ( e ) {

                frase = fileReader.result.replace(/\n/g, " ").split(" ");
                
                funcao ();

                // Não cancela, apenas troca a disponibilidade dos botões de carregamento.
                cancela_carregamento();
            }
            
            // Ainda não sei o que isso daqui faz.
            fileReader.readAsText( fileTobeRead );

        } else {
            alert ( "Por favor, selecione arquivo texto!" );
        }
    
    } else {
        alert ( "Arquivo(s) não suportado(s)!" );
    }
}

carregador_arquivos.addEventListener( 'change', event => carrega_txt ( event ), false );
