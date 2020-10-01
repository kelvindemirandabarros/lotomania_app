// Será um referenciador para os Concursos ou os Cartões Extras.
let cartoes_selecionados = [];

// "concursos" receberá todos os Concursos do LocalStorage, se existirem, senão receberá um novo array e depois, do Arquivo TXT.
let concursos = 
    JSON.parse( localStorage.getItem( "concursos" ) ) 
    ||
    [ [ "O", "Concurso", "Os", "Concursos" ] ];

// "cartoes_extras" receberá todos os Cartões Extras.
let cartoes_extras = 
    JSON.parse( localStorage.getItem( "cartoes_extras" ) )
    || 
    [ [ "O", "Cartão", "Extra", "Os", "Cartões", "Extras" ] ];

// "concursos_nos_cartoes_extras" será a variável que conterá todas as informações se haveria premiações dos Concursos nos Cartões Extras.
var concursos_nos_cartoes_extras = JSON.parse( localStorage.getItem( "concursos_nos_cartoes_extras" ) ) || [];


var ganhos = 0; // Ganhos totais com os Cartões de cada tipo.
var custos = 0; // Custos totais com os Cartões de cada tipo.

// Variável que guardará as bolas selecionadas.
var bolas = [];

// Arrays para as Premiações com zero acertos, e entre 15 e 20 acertos.
var zero = [];
var quinze = [];
var dezesseis = [];
var dezesete = [];
var dezoito = [];
var dezenove = [];
var vinte = [];

// Esta variável receberá todo o texto das premiações para depois ser colocado na divisão.
var texto_premiacoes;
