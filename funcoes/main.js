// Função que chama a si mesma para criar os botões das bolas.
(function () {
    var criaBotao; // Variável que servirá para criar todas as bolas de 01 a 99 e depois 00.
    var divBotoesNumeros = document.getElementById( "divBotoesNumeros" );
    for ( var bola = 1; bola < 101; bola++ ) {
        criaBotao = document.createElement( "button" );
        criaBotao.setAttribute( "type", "button" );
        criaBotao.setAttribute( "class", "botao_bola" );
        if ( bola < 10 ) {
            criaBotao.appendChild( document.createTextNode( "0" + bola ) );
        } else if ( bola < 100 ) {
            criaBotao.appendChild( document.createTextNode( bola ) );
        } else {
            criaBotao.appendChild( document.createTextNode( "00" ) );
        }
        criaBotao.onclick = function () { selecionado ( this ) };
        divBotoesNumeros.appendChild( criaBotao );
    }
})();


// Função que transforma o background dos botões das bolas em verde ou vermelho, significando que o botão está selecionado ou não, respectivamente.
function selecionado ( botao ) {
    var bola = parseInt( botao.textContent ); // Coloca o texto contido no botão (.textContent), que no caso é uma string entre 00 e 99, transformado em um inteiro pelo método parseInt().
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
    }

    freq_bolas_selecionadas ();
}

// Função para tirar o "bug" de todos os botões com relação ao background, e que serve também para "apagar" (transformar a cor para vermelho) todas as bolas quando necessário, e torná-las visíveis para que sejam selecionadas para um novo cartão.
function apagaTodasAsBolas () {

    for ( var zeroANoveNove = 0; zeroANoveNove < 100; zeroANoveNove++ ) {

        if ( botoes_bolas[zeroANoveNove].style.backgroundColor === "red" || botoes_bolas[zeroANoveNove].style.backgroundColor === "green" || !botoes_bolas[zeroANoveNove].style.backgroundColor ) {
        // A propriedade .style.backgroundColor inicialmente é vazia, significando que é red, por isso a necessidade de verificar se é vazio com o "!botao.style.backgroundColor".
            botoes_bolas[zeroANoveNove].style.backgroundColor = "red";
            botoes_bolas[zeroANoveNove].style.visibility = "visible";
        }
    }
};
apagaTodasAsBolas();

let tamanho_maximo; // Tamanho Máximo significa a quantidade máxima de bolas do tipo de cartão escolhido.
let tipoDCE = []; // "tipo De Cartão Escolhido" -> Guardará informações como nome e índice. == ["NOME", indice]


// Esta função serve para acender ou apagar (neste caso, também esconder com a propriedade "visibility") os botões, de acordo com o cartão selecionado e suas bolas.
function acendeOuApaga ( bolasDoCartao ) {
    for (var zeroANoveNove = 0; zeroANoveNove < 100; zeroANoveNove++) {
        if ( bolasDoCartao.includes( parseInt(botoes_bolas[zeroANoveNove].textContent) ) ) {
            botoes_bolas[zeroANoveNove].style.backgroundColor = "green";
            botoes_bolas[zeroANoveNove].style.visibility = "visible";
        } else {
            botoes_bolas[zeroANoveNove].style.backgroundColor = "red";
            botoes_bolas[zeroANoveNove].style.visibility = "hidden";
        }
    }
}


// Esta função serve para zerar tudo na tela.
function zera_tudo_apos_adicionar_cartao () {
    apagaTodasAsBolas();
    bolas = [];
}


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
// Esta função serve para verificar se haveria premiações dos Concursos nos Cartões Extras.
function mostra_concursos_nos_cartoes_extras () {

    alert ( "Espere uns instantes!" );

    subdivCnCE.innerHTML = "";
    var bolas_acertadas = [];
    texto_premiacoes = "";
    
    for ( var cont00 = 1 ; cont00 < concursos.length ; cont00++ ) { // Contador de Concursos.

        zero = [];
        quinze = [];
        dezesseis = [];
        dezesete = [];
        dezoito = [];
        dezenove = [];
        vinte = [];

        texto_premiacoes += `Concurso número ${ cont00 }<br><br>`;

        for ( var cont01 = 1; cont01 < cartoes_extras.length; cont01++ ) { // Contador de Cartões Extras.
            
            bolas_acertadas = []; // Reseta as bolas_acertadas.

            for (var cont9 = 0; cont9 < concursos[cont00][1].length; cont9++) { // Contador de bolas de cada Concurso.
                if ( cartoes_extras[cont01][1].includes( concursos[cont00][1][cont9]) ) {
                    bolas_acertadas.push( concursos[cont00][1][cont9] );
                }  
            }

            if ( bolas_acertadas.length === 0 ) {
                zero.push( [ cartoes_extras[cont01][0], bolas_acertadas ] );
                
            } else if ( bolas_acertadas.length === 18 ) {
                dezoito.push( [ cartoes_extras[cont01][0], bolas_acertadas ] );                            
                
            } else if ( bolas_acertadas.length === 19 ) {
                dezenove.push( [ cartoes_extras[cont01][0], bolas_acertadas ] );                            
                
            } else if ( bolas_acertadas.length === 20 ) {
                vinte.push( [ cartoes_extras[cont01][0], bolas_acertadas ] );                            
            }
        }

        if ( zero.length === 0 && dezoito.length === 0 && dezenove.length === 0 && vinte.length === 0 ) {
            texto_premiacoes += `Nenhuma premiação do Concurso ${ cont00 } com 0 e nem 18 ou mais nos ${ cartoes_extras.length - 1 } Cartões Extras.<br>`;
        
        } else { // Não está conferindo corretamente!
            if ( zero.length > 0 ) {
                imprime_conferencia_concursos_nos_cartoes_extras ( zero, 0 );
            }
            if ( dezoito.length > 0 ) {
                imprime_conferencia_concursos_nos_cartoes_extras ( dezoito, 18 );
            }
            if ( dezenove.length > 0 ) {
                imprime_conferencia_concursos_nos_cartoes_extras ( dezenove, 19 );
            }
            if ( vinte.length > 0 ) {
                imprime_conferencia_concursos_nos_cartoes_extras ( vinte, 20 );
            }
        }
        texto_premiacoes += `<br><br>`;
    }
    subdivCnCE.innerHTML = texto_premiacoes;
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
