$(document).ready(function () {
    
    // Substitui o ano no titulo html pela variavel ano do ucs.js
    document.getElementById("ano").innerHTML = ano; 
    
    // Cria as linhas referentes às uc's utilizando os dados do ucs.js
        // Primeiro Semestre
    for (i = 0; i < ucs_1_semestre.length; i++) {
        document.getElementById("primeiroSemestre").innerHTML += 
        "<tr class='linhas' id='" + ucs_1_semestre[i][0] + "'>" +
        "<td><input type='checkbox' class='favoritos' id='checkbox" + ucs_1_semestre[i][0] + "'></td>" +
        "<td class='codigo'>" + ucs_1_semestre[i][0] + "</td>" +
        "<td><a href='http://wiki.dcet.uab.pt/files/index.php/" + ucs_1_semestre[i][1] + "' target='_blank'>" + ucs_1_semestre[i][1] + "</a></td>" +
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
        "<td><a href='http://wiki.dcet.uab.pt/files/index.php/" + ucs_2_semestre[i][1] + "' target='_blank'>" + ucs_2_semestre[i][1] + "</a></td>" +
        "<td class='normal'>" + ucs_2_semestre[i][2] + "<span class='mono'>" + " " + ucs_2_semestre[i][3] + "</span></td>" +
        "<td class='recurso'>" + ucs_2_semestre[i][4] + "<span class='mono'>" + " " + ucs_2_semestre[i][5] + "</span></td>" +
	"<td class='ano'>" + ucs_2_semestre[i][6] + "</td>" +
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
    var $rows = $('tbody tr');
    $('#search').keyup(function () {
        document.getElementById('select').checked = false;
        
        var val = $.trim($(this).val()).replace(/ +/g, ' ').latinise().toLowerCase();
            $rows.show().filter(function () {
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
