// HEADER

// Primeira linha do Menu:

const botao_instructions = document.getElementById( 'botao_instructions' );
function mostrar_instrucoes () {
    alert(
        `
        1. Para usar o programa, primeiro deve-se Selecionar um tipo de Cartão.
        2. Após isso, há a opção de ver cada cartão existente selecionando o seu respectivo número, ou adicionar um novo cartão.
        3. Para adiconar um cartão, escolha o tipo, e após isso selecione as bolas que deseja colocar. Para Concursos, são 20 bolas obrigatórias, e para os Cartões Extras são 50 bolas obrigatórias. Preste atenção qual o número do cartão que será selecionado. O programa mostra quantos cartões daquele tipo existem ao lado da Seleção de Tipo, então o próximo será a quantidade existente +1.
        4. Para saber o valor exato dos Ganhos e do Total de cada tipo de cartão, coloque os Valores Das Premiações nas respectivas caixas (sem contar os centavos) sempre antes de adicionar um novo Concurso.
        5. O botão 'Aleatório' sorteia 50 bolas para um novo Cartão Extra, mas para adicionar ainda deve-se apertar no botão 'Adicionar Novo Cartão'.
        6. No Custo do Cartão, separe os centavos por ponto e não por vírgula, assim: 2.50.`
    );
}
botao_instructions.addEventListener( 'click', mostrar_instrucoes );


const selecionador_tipo_cartao = document.getElementById( 'selecionador_tipo_cartao' );
let tipo_cartao_selecionado; // Será o value do <select> dos tipos de Cartão.
/**
 * Função para escolher entre os Concursos e os Cartões Extras.
 * 
 * @param { select } selecionador_tipo_cartao
 */
function seleciona_tipo_cartao ( selecionador_tipo_cartao ) {

    tipo_cartao_selecionado = selecionador_tipo_cartao.options[ selecionador_tipo_cartao.selectedIndex ].value;

    // Tipos: 0. Nenhum; 1. Concursos; 2. Cartões Extras.--
    tipoDCE = []; // Zera as informações da lista.
    bolas = []; // Zera a lista de bolas selecionadas para não dar bugs.
    apagaTodasAsBolas();
    let quant;
    switch ( tipo_cartao_selecionado ) {

        case "N":
            cartoes_selecionados = [];
            tipoDCE.push( "Nenhum", 0 );
            botao_CCEA.disabled = true;

            labelQuant.innerHTML = `<b>Quant. = 0</b>`;
            break;

        case "C":
            cartoes_selecionados = concursos;
            tipoDCE.push( "Concursos", 1 );
            botao_CCEA.disabled = true;
            
            tamanho_maximo = 20;

            quant = ( concursos.length === 0 ) ? 0 : concursos.length - 1;
            // O primeiro índice contém strings p/ frases.
            labelQuant.innerHTML = `<b>Quant. = ${ quant }</b>`;
            
            break;

        case "CE":
            cartoes_selecionados = cartoes_extras;
            tipoDCE.push( "Cartões Extras", 4 );
            botao_CCEA.disabled = false;

            tamanho_maximo = 50;

            quant = ( cartoes_extras.length === 0 ) ? 0 : cartoes_extras.length - 1;
            // O primeiro índice contém strings p/ frases.
            labelQuant.innerHTML = `<b>Quant. = ${ quant }</b>`;

            enumera_cartoes_no_select( cartoes_selecionados.length - 1 );
            break;
    }
    
    reinicia_select_numeros_cartoes();
    enumera_cartoes_no_select( cartoes_selecionados.length - 1 );
}
selecionador_tipo_cartao.addEventListener( 'change', event => {
    seleciona_tipo_cartao( event.target );
});


// Label para mostrar a quantidade de cartões selecionados.
const labelQuant = document.querySelector( 'label#labelQuant' );


const botao_CCEA = document.getElementById("botao_CCEA"); // Botão para Criar Cartão Extra Aleatório.
/**
 * Função para criar um Cartão Extra Aleatório.
 */
function cria_cartao_extra_aleatorio () {

    let texto_novo_cartao_extra_aleatorio = ""; // Zera o texto.
    var nova_bola = 0; // Bola que será entre 00 e 99.
    zera_tudo_apos_adicionar_cartao ();

    for ( var cont = 0; cont < 50; cont++ ) {
        nova_bola = Math.floor( Math.random() * 99 ); // Reduz para o inteiro mais baixo, o sorteio de 0.0 a 1.0 vezes 99, o que fará um sorteio de 00 a 99.
        while ( bolas.includes( nova_bola ) ) {
            nova_bola = Math.floor( Math.random() * 99 );
        }
        bolas.push( nova_bola );
    }

    for ( var indice = 0; indice < 100; indice++ ) {
        if ( bolas.includes( parseInt( botoes_bolas[ indice ].textContent ) ) ) {
            botoes_bolas[ indice ].style.backgroundColor = "green";
        }
    }

    freq_bolas_selecionadas ();

    // GAMBIARRA A SEGUIR:

    // Compara o novo Cartão Aleatório com os Cartões Extras.
    compara_cartoes(
        cartoes_extras,
        1,
        [ ["O", "Novo", "Cartão Extra", "Os", "Novos", "Cartões Extras"], [ [1], bolas ] ],
        1
    );

    texto_novo_cartao_extra_aleatorio += subdivCompararCartoesDoMesmoTipo.innerHTML;
    texto_novo_cartao_extra_aleatorio += "--------------------------------------------------------------<br><br>";
    
    subdivCompararCartoesDoMesmoTipo.innerHTML = texto_novo_cartao_extra_aleatorio;
}
botao_CCEA.addEventListener( 'click', cria_cartao_extra_aleatorio );

const selecionador_cartao = document.getElementById( 'selecionador_cartao' );
/**
 * Seleciona o número do respectivo tipo de cartão escolhido.
 * 
 * @param { array } cartoes é a lista dos cartões selecionados.
 */
function seleciona_numero_cartao ( cartoes ) {

    const index = selecionador_cartao.selectedIndex;
    const numero_cartao = parseInt( selecionador_cartao.options[ index ].textContent );

    if ( isNaN( numero_cartao ) ) {
        // Se o número do cartão for um "NaN", apaga todas as bolas da tela.
        bolas = []; // Zera a lista de bolas selecionadas para não dar bugs.
        apagaTodasAsBolas ();

    } else {
        // Tipos: 'C' = Concursos; 'CE' = Cartões Extras.
        switch ( tipo_cartao_selecionado ) {
            // "tipo_cartao_selecionado" é o value do <select> dos tipos de Cartão.

            case "C":
                // Chama a função para acender de verde apenas os botões das bolas do cartão selecionado.
                acendeOuApaga ( cartoes[numero_cartao][1] ); // cartoes=concursos[indice do cartao][indice onde as bolas estão guardadas].
                break;

            case "CE":
                // Chama a função para acender de verde apenas os botões das bolas do cartão selecionado.
                acendeOuApaga ( cartoes[numero_cartao][1] ); // cartoes=concursos[indice do cartao][indice onde as bolas estão guardadas].
                break;
        }
    }
}
selecionador_cartao.addEventListener( 'change', () => {
    seleciona_numero_cartao( cartoes_selecionados );
});

// Botão para editar os cartões.
const botao_edita_cartao = document.getElementById( 'botao_edita_cartao' );
botao_edita_cartao.addEventListener( 'click', function () {
    editar_cartao ();
});


// Segunda linha do Menu:

// Custo de cada jogo.
let custo_cartao = parseFloat( document.getElementById( "input_custo_cartao" ).value );
let p15 = parseInt( document.getElementById( "p15" ).value ); // Premiação com 15 acertos.
let p16 = parseInt( document.getElementById( "p16" ).value ); // Premiação com 16 acertos.
let p17 = parseInt( document.getElementById( "p17" ).value ); // Premiação com 17 acertos.
let p18 = parseInt( document.getElementById( "p18" ).value ); // Premiação com 18 acertos.
let p19 = parseInt( document.getElementById( "p19" ).value ); // Premiação com 19 acertos.
let p20 = parseInt( document.getElementById( "p20" ).value ); // Premiação com 20 acertos.


// Terceira linha do Menu:

// Botão de carregar no arquivo de carregamentos.

const carregador_arquivos = document.getElementById( 'carregador_arquivos' );

// Botão de cancelar carregamento no arquivo de carregamentos.

const botao_salva_cartoes_em_arquivos_txt = document.getElementById( 'botao_salva_cartoes_em_arquivos_txt' );
botao_salva_cartoes_em_arquivos_txt.addEventListener( 'click', () => {
    if ( concursos.length > 1 ) salvar_em_txt ( concursos, "concursos" );
    if ( cartoes_extras.length > 1 ) salvar_em_txt ( cartoes_extras, "cartoes_extras" );
});

// SECTION

// "botoes_bolas" ou "lista Dos Botões Dos Números" é a lista de todos os 100 botões pegos pela classe.
const botoes_bolas = document.getElementsByClassName( "botao_bola" );

const subdivFB = document.querySelector( "div#subdivFB" ); // Divisão que conterá a frequência das bolas nos Concursos.
const subdivFBS = document.querySelector( "div#subdivFBS" ); // Divisão que conterá a frequência das bolas selecionadas.

const subdivCE = document.querySelector( "div#subdivCE" ); // Div que conterá as premiações do último Conc. nos Cartões E.
const subdivCEvalores = document.getElementById( "subdivCEvalores" ); // Div que conterá os custos e ganhos dos Cartões E.

const subdivCnCE = document.getElementById( "subdivCnCE" ); // Divisão Concurso nos Cartões Extras.
const botao_mostrar_c_ce = document.getElementById( 'botao_mostrar_c_ce' );
// Esta função serve para verificar se haveria premiações dos Concursos nos Cartões Extras.
function mostra_concursos_nos_cartoes_extras () {

    alert ( "Espere uns instantes!" );

    subdivCnCE.innerHTML = "";
    var bolas_acertadas = [];
    texto_premiacoes = "";
    
    for ( var concurso = 1 ; concurso < concursos.length ; concurso++ ) { // Contador de Concursos.

        zero = [];
        quinze = [];
        dezesseis = [];
        dezesete = [];
        dezoito = [];
        dezenove = [];
        vinte = [];

        texto_premiacoes += `Concurso número ${ concurso }<br><br>`;

        for ( var cartao_extra = 1; cartao_extra < cartoes_extras.length; cartao_extra++ ) { // Contador de Cartões Extras.
            
            bolas_acertadas = []; // Reseta as bolas_acertadas.

            for ( var bola = 0; bola < concursos[ concurso ][1].length; bola++ ) {
                if ( cartoes_extras[cartao_extra][1].includes( concursos[concurso][1][bola]) ) {
                    bolas_acertadas.push( concursos[concurso][1][bola] );
                }
            }

            if ( bolas_acertadas.length === 0 ) {
                zero.push( [ cartoes_extras[cartao_extra][0], bolas_acertadas ] );
                
            } else if ( bolas_acertadas.length === 18 ) {
                dezoito.push( [ cartoes_extras[cartao_extra][0], bolas_acertadas ] );                            
                
            } else if ( bolas_acertadas.length === 19 ) {
                dezenove.push( [ cartoes_extras[cartao_extra][0], bolas_acertadas ] );                            
                
            } else if ( bolas_acertadas.length === 20 ) {
                vinte.push( [ cartoes_extras[cartao_extra][0], bolas_acertadas ] );                            
            }
        }

        if (
            zero.length === 0 &&
            dezoito.length === 0 &&
            dezenove.length === 0 &&
            vinte.length === 0
        ) {
            texto_premiacoes += `Nenhuma premiação do Concurso ${ concurso } com 0 e nem 18 ou mais nos ${ cartoes_extras.length - 1 } Cartões Extras.<br>`;
        
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
botao_mostrar_c_ce.addEventListener( 'click', mostra_concursos_nos_cartoes_extras );

// Divisão Comparar cartões do mesmo tipo.
const subdivCompararCartoesDoMesmoTipo = document.getElementById( "subdivCompararCartoesDoMesmoTipo" );

const botao_comparar_extras = document.getElementById( 'botao_comparar_extras' );
botao_comparar_extras.addEventListener( 'click', () => {
    compara_cartoes_do_mesmo_tipo( cartoes_extras );
});
