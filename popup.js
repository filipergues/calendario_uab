$(document).ready(function () {

    //define handlers dos botoes
    $("#botao1").click(function(){
        window.open(info_button1.url,'_blank');
    });

    $("#botao2").click(function(){
        window.open(info_button2.url,'_blank');
    });

    $("#botao3").click(function(){
        window.open(info_button3.url,'_blank');
    });

    $("#botao4").click(function(){
        window.open(info_button4.url,'_blank');
    });

    $("#botao5").click(function(){
        window.open(info_button5.url,'_blank');
    });
    
    //botao que redefine os nomes e url dos botões
    $("#botao_redefinir").click(function(){
        set_buttons_information();
    });

    load_buttons_information();

    // Substitui o ano no titulo html pela variavel ano do ucs.js
    document.getElementById("ano").innerHTML = ano;

    // Cria as linhas referentes às uc's utilizando os dados do ucs.js
        // Primeiro Semestre
    for (i = 0; i < ucs_1_semestre.length; i++) {
        document.getElementById("primeiroSemestre").innerHTML +=
        "<tr class='linhas' id='" + ucs_1_semestre[i][0] + "'>" +
        "<td><input type='checkbox' class='favoritos' id='checkbox" + ucs_1_semestre[i][0] + "'></td>" +
        "<td class='codigo'>" + ucs_1_semestre[i][0] + "</td>" +
        "<td><a href='" + ucs_1_semestre[i][7] + "' target='_blank'>" + ucs_1_semestre[i][1] + "</a></td>" +
        "<td class='normal'>" + ucs_1_semestre[i][2] + "<span class='mono'>" + " " + ucs_1_semestre[i][3] + "</span></td>" +
        "<td class='recurso'>" + ucs_1_semestre[i][4] + "<span class='mono'>" + " " + ucs_1_semestre[i][5] + "</span></td>" +
		    "<td class='ano'>" + ucs_1_semestre[i][6] + "</td>" +
        "</tr>";
    }

        // Segundo Semestre
    for (i = 0; i < ucs_2_semestre.length; i++) {
        document.getElementById("segundoSemestre").innerHTML +=
        "<tr class='linhas' id='" + ucs_2_semestre[i][0] + "'>" +
        "<td><input type='checkbox' class='favoritos' id='checkbox" + ucs_2_semestre[i][0] + "'></td>" +
        "<td class='codigo'>" + ucs_2_semestre[i][0] + "</td>" +
        "<td><a href='" + ucs_2_semestre[i][7] + "' target='_blank'>" + ucs_2_semestre[i][1] + "</a></td>" +
        "<td class='normal'>" + ucs_2_semestre[i][2] + "<span class='mono'>" + " " + ucs_2_semestre[i][3] + "</span></td>" +
        "<td class='recurso'>" + ucs_2_semestre[i][4] + "<span class='mono'>" + " " + ucs_2_semestre[i][5] + "</span></td>" +
		    "<td class='ano'>" + ucs_2_semestre[i][6] + "</td>" +
        "</tr>";
    }

        // Calendario escolar
    for (i = 0; i < academic_calendar.length; i++) {
        document.getElementById("calendario_tbody").innerHTML +=
        "<tr class='linhas' id='" + academic_calendar[i][0] + "'>" +
        "<td class='codigo'>" + academic_calendar[i][0] + "</td>" +
        "<td class='normal'>" + academic_calendar[i][1] +
        "<td class='recurso'>" + academic_calendar[i][2] +
        "</tr>";
    }

    // Checkbox "Ver apenas UC's seleccionada"
    // Esconde uc's não seleccionada
    // Esconde titulo e headers da tabela caso nenhuma uc's desse semestre esteja seleccionado
    // Reorganiza cor das linhas depois de escondidas as uc's não seleccionadas
    $('#select').click(function () {
        seleccionar();
        desactivarTitulo();
        corLinhas();
    });

    // Guarda as opções selecionadas mesmo que o chrome seja encerrado
    // uso da API do chrome storage
    $('#select').change(function () {
            chrome.storage.sync.set({[this.id] : document.getElementById(this.id).checked});
    });
    for (i = 0; i < ucs_1_semestre.length; i++) {
        $('#checkbox' + ucs_1_semestre[i][0] + '').change(function () {
            chrome.storage.sync.set({[this.id] : document.getElementById(this.id).checked});
        });
    }
    for (i = 0; i < ucs_2_semestre.length; i++) {
        $('#checkbox' + ucs_2_semestre[i][0] + '').change(function () {
            chrome.storage.sync.set({[this.id] : document.getElementById(this.id).checked});
        });
    }

    // Carrega as opções guardadas no chrome storage
        // Primeiro Semestre
    var cbox1 = [];
    for (i = 0; i < ucs_1_semestre.length; i++) {
        cbox1.push('checkbox' + ucs_1_semestre[i][0]);
    }
    chrome.storage.sync.get(cbox1, function(val) {
        for (i = 0; i < ucs_1_semestre.length; i++) {
            document.getElementById(cbox1[i]).checked = val[cbox1[i]];
        }
    });
        // Segundo Semestre
    var cbox2 = [];
    for (i = 0; i < ucs_2_semestre.length; i++) {
        cbox2.push('checkbox' + ucs_2_semestre[i][0]);
    }
    chrome.storage.sync.get(cbox2, function(val) {
        for (i = 0; i < ucs_2_semestre.length; i++) {
            document.getElementById(cbox2[i]).checked = val[cbox2[i]];
        }
    });
         // Opção de Ver apenas UC's seleccionadas
    chrome.storage.sync.get('select', function(val) {
        document.getElementById('select').checked = val['select'];
        if (val['select']) {
            seleccionar();
            desactivarTitulo();
            corLinhas();
        }
    });

    // Filtra em tempo real as UC's à medida que se vai escrevendo na caixa de pesquisa
    // Converte letras acentuadas em não acentuadas para facilitar pesquisa
    // cp - filtra apenas as tabelas dos exames
    var $rows1 = $('#primeiroSemestre tr');
    var $rows2= $('#segundoSemestre tr');
    $('#search').keyup(function () {
        document.getElementById('select').checked = false;

        var val = $.trim($(this).val()).replace(/ +/g, ' ').latinise().toLowerCase();

        $rows1.show().filter(function () {
            var text = $(this).text().replace(/\s+/g, ' ').latinise().toLowerCase();
            return !~text.indexOf(val);
        }).hide();

        $rows2.show().filter(function () {
            var text = $(this).text().replace(/\s+/g, ' ').latinise().toLowerCase();
            return !~text.indexOf(val);
        }).hide();

        desactivarTitulo();
        corLinhas();
    });
});

// Função que esconde as linhas das UC's que não estiverem seleccionadas
function seleccionar () {
    if (document.getElementById('select').checked) {
        for (i = 0; i < ucs_1_semestre.length; i++) {
            var cb = "checkbox" + ucs_1_semestre[i][0];
            if (!document.getElementById(cb).checked) {
                $('#' + ucs_1_semestre[i][0] + '').hide();
            }
        }
        for (i = 0; i < ucs_2_semestre.length; i++) {
            var cb = "checkbox" + ucs_2_semestre[i][0];
            if (!document.getElementById(cb).checked) {
                $('#' + ucs_2_semestre[i][0] + '').hide();
            }
        }
    } else {
        $('.linhas').show();
    }
}

// Função que alterna a cor do fundo das linhas
// Função é chamada ao carregar a pagina ou depois de uma filtragem para actualizar
function corLinhas () {
    var linhas1 = $('#primeiro tbody tr:visible');
        for (i = 0; i < linhas1.length; i++) {
            var linha1 = linhas1[i];
            if (i%2 != 0) {
                linha1.style.background = '#dde1e9';
            } else {
                linha1.style.background = '#ffffff';
            }
        }

        var linhas2 = $('#segundo tbody tr:visible');
        for (i = 0; i < linhas2.length; i++) {
            var linha2 = linhas2[i];
            if (i%2 != 0) {
                linha2.style.background = '#dde1e9';
            } else {
                linha2.style.background = '#ffffff';
            }
        }
}

// Função que esconde o nome e o cabeçalho da tabela dos semestres quando
// nenhuma linha da tabela está visivel
function desactivarTitulo () {
    if ($('#primeiro tbody tr:visible').length == 0) {
            $('.primeiro').hide();
        } else {
            $('.primeiro').show();
        }

        if ($('#segundo tbody tr:visible').length == 0) {
            $('.segundo').hide();
        } else {
            $('.segundo').show();
        }
}

// Função que carrega a informação dos botões
// caso não exista, mantem a informação por defeito
function load_buttons_information() {

    chrome.storage.sync.get(['info_button1_nome'], function(val) {
        if (!val.info_button1_nome) {
        } else {
            info_button1.nome=val.info_button1_nome;
        }
        $('#botao1').html(val.info_button1_nome);
    });
    chrome.storage.sync.get(['info_button1_url'], function(val) {
        if(!val.info_button1_url) {
        } else {
            info_button1.url=val.info_button1_url;
        }
    });

    chrome.storage.sync.get(['info_button2_nome'], function(val) {
        if (!val.info_button2_nome) {
        } else {
            info_button2.nome=val.info_button2_nome;
        }
        $('#botao2').html(val.info_button2_nome);
    });
    chrome.storage.sync.get(['info_button2_url'], function(val) {
        if(!val.info_button2_url) {
        } else {
            info_button2.url=val.info_button2_url;
        }
    });

    chrome.storage.sync.get(['info_button3_nome'], function(val) {
        if (!val.info_button3_nome) {
        } else {
            info_button3.nome=val.info_button3_nome;
        }
        $('#botao3').html(val.info_button3_nome);
    });
    chrome.storage.sync.get(['info_button3_url'], function(val) {
        if(!val.info_button3_url) {
        } else {
            info_button3.url=val.info_button3_url;
        }
    });

    chrome.storage.sync.get(['info_button4_nome'], function(val) {
        if (!val.info_button4_nome) {
        } else {
            info_button4.nome=val.info_button4_nome;
        }
        $('#botao4').html(val.info_button4_nome);
    });
    chrome.storage.sync.get(['info_button4_url'], function(val) {
        if(!val.info_button4_url) {
        } else {
            info_button4.url=val.info_button4_url;
        }
    });

    chrome.storage.sync.get(['info_button5_nome'], function(val) {
        if (!val.info_button5_nome) {
        } else {
            info_button5.nome=val.info_button5_nome;
        }
        $('#botao5').html(val.info_button5_nome);
    });
    chrome.storage.sync.get(['info_button5_url'], function(val) {
        if(!val.info_button5_url) {
        } else {
            info_button5.url=val.info_button5_url;
        }
    });


}

// Funcao que define a informação dos botões
function set_buttons_information() {


    var info = window.prompt("Insira nome para o botao1","Portal");
    chrome.storage.sync.set({'info_button1_nome':info}, function() {
    });

    info = window.prompt("Insira URL para o botao1","https://portal.uab.pt/");
    chrome.storage.sync.set({'info_button1_url':info}, function() {
    });

    info = window.prompt("Insira nome para o botao2","Moodle");
    chrome.storage.sync.set({'info_button2_nome':info}, function() {
    });

    info = window.prompt("Insira URL para o botao2","https://elearning.uab.pt/");
    chrome.storage.sync.set({'info_button2_url':info}, function() {
    });

    info = window.prompt("Insira nome para o botao3","Wiki");
    chrome.storage.sync.set({'info_button3_nome':info}, function() {
    });

    info = window.prompt("Insira URL para o botao3","https://wiki.dcet.uab.pt/");
    chrome.storage.sync.set({'info_button3_url':info}, function() {
    });

    info = window.prompt("Insira nome para o botao4","Rocket Chat");
    chrome.storage.sync.set({'info_button4_nome':info}, function() {
    });

    info = window.prompt("Insira URL para o botao4","https://chat.estudarnauab.pt/home");
    chrome.storage.sync.set({'info_button4_url':info}, function() {
    });

    info = window.prompt("Insira nome para o botao5","Office 365 UAB");
    chrome.storage.sync.set({'info_button5_nome':info}, function() {
    });

    info = window.prompt("Insira URL para o botao5","https://login.microsoftonline.com/");
    chrome.storage.sync.set({'info_button5_url':info}, function() {
    });
    load_buttons_information();

}