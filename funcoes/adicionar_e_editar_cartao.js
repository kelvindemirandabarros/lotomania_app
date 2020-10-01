/**
 * Função para adicionar um novo cartão do tipo escolhido.
 */
function adiciona_cartao () {

    if ( tipoDCE[0] === "Nenhum" ) {
        alert( "Selecione um tipo de cartão e depois o Cartão em Branco!" );

    } else if ( selecionador_cartao.options[ selecionador_cartao.selectedIndex ].textContent !== "" ) {
        alert( "Selecione o número do cartão em branco para poder adicionar um cartão novo!" );

    } else if ( bolas.length < tamanho_maximo ) {
        alert ( `O cartão tem menos de ${ tamanho_maximo } bolas!` );

    } else {
        if ( tipoDCE[0] === "Concursos" ) {  // Adiciona Concursos.

            concursos.push( [ [concursos.length], bolas.slice(0) ] );
            selecionador_cartao.innerHTML += adiciona_um_cartao_no_select( concursos.length - 1 );

            salva_no_localstorage( "concursos", concursos ); // Salva os Concursos no LocalStorage.
            salvar_em_txt ( concursos, "concursos" ); // Salva os Concursos em arquivo .txt.

            adiciona_frequencia_na_ordenada ( bolas ); // Ordena decrescentemente a quantidade de frequência das bolas.
            mostra_frequencia (); // Atualiza a subdivFB com as novas bolas.

            confere_premiacoes ( cartoes_extras, bolas, subdivCE, subdivCEvalores, concursos[concursos.length - 1][0][0] );

            labelQuant.innerHTML = `<b>Quant. = ${ concursos[ concursos.length - 1 ][0][0] }</b>`; // O primeiro índice (0) contém strings, por isso utilizar o (-1).
            alert ( `Concurso ${ concursos[ concursos.length - 1 ][0][0] } adicionado!` ); // O primeiro índice (0) contém strings, por isso utilizar o (-1).
            
        } else if ( tipoDCE[0] === "Cartões Extras" ) { // Adiciona Cartões Extras.
    
            cartoes_extras.push( [ [ cartoes_extras.length ], bolas.slice(0) ] );
            selecionador_cartao.innerHTML += adiciona_um_cartao_no_select( cartoes_extras.length - 1 );

            salva_no_localstorage( "cartoes_extras", cartoes_extras );
            salvar_em_txt ( cartoes_extras, "cartoes_extras" );

            labelQuant.innerHTML = `<b>Quant. = ${ cartoes_extras[ cartoes_extras.length - 1 ][0][0] }</b>`;
            alert ( `Cartão Extra ${ cartoes_extras[ cartoes_extras.length - 1 ][0][0] } adicionado!` );
        }

        zera_tudo_apos_adicionar_cartao ();
    }
}

// Esta função serve para alterar propriedades do botão "Editar Cartão", deixar visível todos os botões dos números, e para desabilitar alguns botões para que não haja bugs na edição de um cartão.
function editar_cartao_botoes () {
    botaoEditaCartao.textContent = "Concluir Edição";
    botaoEditaCartao.onclick = function () { concluir_edicao_do_cartao () };
    for ( var cont02 = 0; cont02 < botoes_bolas.length; cont02++ ) {
        botoes_bolas[cont02].style.visibility = "visible";
    }
    selecionador_tipo_cartao.disabled = true;
    if ( tipoDCE[0] !== "Cartões Extras" ) {
        document.getElementById( "botao_CCEA" ).disabled = true;
    }
    document.getElementById( "botao_AC" ).disabled = true;
    selecionador_cartao.disabled = true;
}

// Esta função serve para pegar as bolas que estão no cartão escolhido para ser editado.
function editar_cartao_pega_bolas () {
    bolas = [];
    for ( var cont02 = 0; cont02 < botoes_bolas.length; cont02++ ) {
        if ( botoes_bolas[cont02].style.backgroundColor === "green" ) {
            bolas.push( parseInt( botoes_bolas[cont02].textContent ) );
        }
    }
}


// Esta função serve para começar a editar o cartão escolhido depois de ter passado nos testes.
function editar_cartao_passou_testes () {
    editar_cartao_botoes ();
    editar_cartao_pega_bolas ();
    alert( `Editando o Cartão ${select_numero_tipo_cartao.options[select_numero_tipo_cartao.selectedIndex].textContent}. Após editar o cartão, aperte no botão de Concluir Edição.` );
}


// Esta função serve para testar se o cartão pode ser editado.
function editar_cartao_testar_se_pode () {

    if ( select_numero_tipo_cartao.options[ select_numero_tipo_cartao.selectedIndex ].textContent === "") {
        alert ( "Selecione o número do cartão para poder editá-lo!" );

    } else {
        editar_cartao_passou_testes ();
    }
}


// Esta função serve para editar o cartão escolhido.
function editar_cartao () {
    if ( tipoDCE[0] === "Nenhum" ) {
        alert ( "Selecione um tipo de cartão e depois o seu número!" );
    
    } else {
        editar_cartao_testar_se_pode ();
    }
}


// Esta função serve para concluir a edição e habilitar de volta os botões que foram desabilitados para poder fazer a edição.
function concluir_edicao_do_cartao_botoes ( numero_cartao ) {
    botaoEditaCartao.textContent = "Editar Cartão";
    botaoEditaCartao.onclick = function () { editar_cartao () };
    selecionador_tipo_cartao.disabled = false;
    document.getElementById( "botao_CCEA" ).disabled = false;
    document.getElementById( "botao_AC" ).disabled = false;
    selecionador_cartao.disabled = false;
    alert( `A edição do Cartão ${ numero_cartao } foi concluída.` );
    zera_tudo_apos_adicionar_cartao (); // Limpa tudo após editar o cartão.
}


// Esta função serve para concluir a edição do cartão escolhido.
function concluir_edicao_do_cartao () {
    
    // if ( tipoDCE[0] === "Concursos" ) {  // Edita o Concurso selecionado.
    //     select_numero_tipo_cartao = document.querySelector( "select#selConc" );

    //     if ( bolas.length < tamanho_maximo ) {
    //         alert ( `O cartão tem menos de ${ tamanho_maximo } bolas!` );

    //     } else {
    //         concursos[ parseInt( select_numero_tipo_cartao.options[ select_numero_tipo_cartao.selectedIndex ].textContent ) ][1] = bolas.slice(0);
    //         salva_no_localstorage ( "concursos", concursos ); // Salva no localStorage.
    //         salvar_em_txt ( concursos, "concursos" ); // Salva os Concursos em arquivo .txt.
    //         concluir_edicao_do_cartao_botoes ();
    //     }

    // } else if ( tipoDCE[0] === "Cartões Extras" ) { // Adiciona Cartões Extras.
    //     select_numero_tipo_cartao = document.querySelector( "select#selCE" );

    //     if ( bolas.length < tamanho_maximo ) {
    //         alert ( `O cartão tem menos de ${ tamanho_maximo } bolas!` );

    //     } else {
    //         cartoes_extras[ parseInt( select_numero_tipo_cartao.options[ select_numero_tipo_cartao.selectedIndex ].textContent ) ][1] = bolas.slice(0);
    //         salva_no_localstorage( "cartoes_extras", cartoes_extras ); // Salva os Cartões Extras no localStorage.
    //         salvar_em_txt ( cartoes_extras, "cartoes_extras" ); // Salva os Cartões Extras em arquivo .txt.
    //         concluir_edicao_do_cartao_botoes ();
    //     }
    // }

    if ( bolas.length < tamanho_maximo ) {
        alert ( `O cartão tem menos de ${ tamanho_maximo } bolas!` );

    } else {

        const index = selecionador_cartao.selectedIndex;
        const numero_cartao = parseInt( selecionador_cartao.option[ index ].textContent );

        if ( tipoDCE[0] === "Concursos" ) {  // Edita o Concurso selecionado.

            concursos[ numero_cartao ][1] = bolas.slice(0);
            salva_no_localstorage ( "concursos", concursos );
            salvar_em_txt ( concursos, "concursos" );
            

        } else if ( tipoDCE[0] === "Cartões Extras" ) { // Edit Cartões Extras.

            cartoes_extras[ numero_cartao ][1] = bolas.slice(0);
            salva_no_localstorage( "cartoes_extras", cartoes_extras );
            salvar_em_txt ( cartoes_extras, "cartoes_extras" );

        }

        concluir_edicao_do_cartao_botoes( numero_cartao );
    }
}
