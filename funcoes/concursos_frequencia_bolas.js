// Frequência das bolas sorteadas.
let frequencia_bolas = JSON.parse( localStorage.getItem( "frequencia_bolas" ) ) || [];

let frequencia_ordenada_bolas;


/**
 * Cria a lista de frequência das bolas.
 */
function cria_lista_frequencia () {
    let frequencia_bolas = [];
    for ( let bola = 0; bola < 100; bola++ ) {
        frequencia_bolas.push( [ bola, 0 ] ); // Bola e sua frequência.
    }
    return frequencia_bolas;
}


/**
 * Esta função serve para criar a frequência de sorteio das bolas. Entra apenas um Concurso de cada vez.
 * 
 * @param { array } novo_concurso 
 */
function adiciona_frequencia_das_bolas_novo_concurso ( novo_concurso ) {
    for ( let bola = 0; bola < 20; bola++ ) {
        frequencia_bolas[ novo_concurso[ bola ] ][1] += 1; //
    }
}


/**
 * Faz com que a função adiciona_frequencia_das_bolas_novo_concurso seja repetida pela quantidade de vezes necessária.
 * 
 * @param { number } quant_concursos 
 */
function quant_testes_frequencia ( quant_concursos ) {

    for ( var concurso = 1; concurso < quant_concursos; concurso++ ) { // O primeiro índice (0) contém strings, por isso utilizar a partir do segundo (1).
        adiciona_frequencia_das_bolas_novo_concurso ( concursos[ concurso ][1] );
    }
}


/**
 * Cria uma lista ordenada das bolas em ordem decrescente, da mais sorteada para a menos sorteada.
 * 
 * @param { array } frequencia_bolas 
 */
function cria_frequencia_ordenada ( frequencia_bolas ) {

    let frequencia_ordenada_bolas = frequencia_bolas.sort( ( a, b ) => b[1] - a[1] );
    return frequencia_ordenada_bolas;
}


// Esta função serve para adicionar uma frequência na respectiva bola na lista de frequência das bolas.
function adiciona_frequencia_na_ordenada ( novo_concurso ) {
    for  ( var cont11 = 0; cont11 < 100; cont11++ ) {
        if ( novo_concurso.includes( frequencia_ordenada_bolas[cont11][0] ) ) {
            frequencia_ordenada_bolas[cont11][1] += 1;
        }
    }
}


// Função para mostrar a frequência das bolas nos Concursos.
function mostra_frequencia () {
    const freq = ( concursos.length === 0 ) ? 0 : concursos.length - 1;
    subdivFB.innerHTML = `<b>Em ${ freq } concursos:<b><br><br>`; // O primeiro índice (0) contém strings, por isso utilizar o (-1).
    for ( var cont = 0; cont < 100; cont++ ) { // Contador de bolas e suas respectivas frequências.
        subdivFB.innerHTML += `${ cont + 1 }ª: A bola ${ frequencia_ordenada_bolas[cont][0] } foi sorteada ${ frequencia_ordenada_bolas[cont][1] } vezes.<br><br>`;
    }
}


// Esta função serve para mostrar a frequência das bolas selecionadas.
function freq_bolas_selecionadas () {
    subdivFBS.textContent = ""; // Limpa tudo para depois refazer a seguir.
    var posicao = 0;
    var vezes = 0;
    for ( var cont14 = 0; cont14 < bolas.length; cont14++ ) { // Repete pela quant. de Bolas Selecionadas.
        for ( var cont15 = 0; cont15 < 100; cont15++ ) { // Repete pela quant. de bolas (100).
            if ( bolas[cont14] === frequencia_ordenada_bolas[cont15][0] ) {
                posicao = cont15 + 1;
                vezes = frequencia_ordenada_bolas[cont15][1];
            }
        }
        subdivFBS.innerHTML += `A bola ${ bolas[cont14] } está na posição ${ posicao } (${ vezes } vezes).<br><br>`
    }
}


// Se a lista de frequências estiver vazia, criará-se uma.
if ( frequencia_bolas.length === 0 ) {
    frequencia_bolas = cria_lista_frequencia ();
    salva_no_localstorage( 'frequencia_bolas', frequencia_bolas );
}

frequencia_ordenada_bolas = cria_frequencia_ordenada( frequencia_bolas );

mostra_frequencia ();
