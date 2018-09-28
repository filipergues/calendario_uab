var ano = "2018-2019";

var info_button1={nome:"Portal", url:"https://portal.uab.pt/"};
var info_button2={nome:"Moodle", url:"https://elearning.uab.pt/"};
var info_button3={nome:"Wiki", url:"https://wiki.dcet.uab.pt/"};

var ucs_1_semestre = [
  ['21002','Álgebra Linear I','18-02-2019','M','26-07-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/%C3%81lgebra_Linear_I'],
  ['21010','Arquitectura de Computadores','06-02-2019','M','15-07-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/Arquitectura de Computadores'],
  ['21173','Introdução à Programação','30-01-2019','M','29-07-2019','T','1ºano','https://wiki.dcet.uab.pt/files/index.php/Introdução à Programação'],
  ['21174','Sistemas Computacionais','25-02-2019','M','24-07-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/Sistemas Computacionais'],
  ['21175','Análise Infinitesimal','12-02-2019','M','11-07-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/Análise Infinitesimal'],
  ['21176','Ética e Práticas de Engenharia','21-02-2019','T','30-07-2019','T','1ºano','https://wiki.dcet.uab.pt/files/index.php/Ética e Práticas de Engenharia'],
  ['21048','Física Geral','01-02-2019','T','16-07-2019','M','2ºano','https://wiki.dcet.uab.pt/files/index.php/Física Geral'],
  ['21053','Fundamentos de Bases de Dados','28-01-2019','T','12-07-2019','M','2ºano','https://wiki.dcet.uab.pt/files/index.php/Fundamentos de Bases de Dados'],
  ['21078','Linguagens e Computação','08-02-2019','T','31-07-2019','M','2ºano','https://wiki.dcet.uab.pt/files/index.php/Linguagens e Computação'],
  ['21093','Programação por Objetos (LEI)','14-02-2019','T','29-07-2019','M','2ºano','https://wiki.dcet.uab.pt/files/index.php/Programa%C3%A7%C3%A3o_por_Objetos'],
  ['21106','Sistemas em Rede','19-02-2019','M','24-07-2019','T','2ºano','https://wiki.dcet.uab.pt/files/index.php/Sistemas em Rede'],
  ['21020','Computação Gráfica','05-02-2019','T','10-07-2019','M','3ºano','https://wiki.dcet.uab.pt/files/index.php/Computação Gráfica'],
  ['21062','Gestão de Projetos Informáticos','11-02-2019','M','19-07-2019','M','3ºano','https://wiki.dcet.uab.pt/files/index.php/Gestão de Projetos Informáticos'],
  ['21103','Sistemas de Gestão de Bases de Dados','31-01-2019','T','12-07-2019','T','3ºano','https://wiki.dcet.uab.pt/files/index.php/Sistemas de Gestão de Bases de Dados'],
  ['21110','Sistemas Multimédia','22-02-2019','T','23-07-2019','M','3ºano','https://wiki.dcet.uab.pt/files/index.php/Sistemas Multimédia'],
  ['21021','Computação Numérica','26-02-2019','T','16-07-2019','T','3ºano','https://wiki.dcet.uab.pt/files/index.php/Computação Numérica'],
  ['21181','Segurança em Rede e Computadores','15-02-2019','T','31-07-2019','T','3ºano','https://wiki.dcet.uab.pt/files/index.php/Seguran%C3%A7a_em_Redes_e_Computadores']
];

var ucs_2_semestre = [
	['21037','Elementos de Probabilidades e Estatística','07-06-2019','T','12-09-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/Elementos de Probabilidades e Estatística'],
	['21082','Matemática Finita','19-06-2019','T','23-09-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/Matemática Finita'],
	['21111','Sistemas Operativos','02-07-2019','T','30-09-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/Sistemas Operativos'],
	['21177','Modelação de Sistemas de Informação','27-06-2019','M','26-09-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/Modelação de Sistemas de Informação'],
	['21178','Laboratório de Programação','12-06-2019','M','18-09-2019','M','1ºano','https://wiki.dcet.uab.pt/files/index.php/Laboratório de Programação'],
	['21046','Estruturas de Dados e Algoritmos Fundamentais','08-07-2019','M','06-09-2019','M','2ºano','https://wiki.dcet.uab.pt/files/index.php/Estruturas de Dados e Algoritmos Fundamentais'],
	['21071','Introdução à Inteligência Artificial','03-06-2019','T','13-09-2019','M','2ºano','https://wiki.dcet.uab.pt/files/index.php/Introdução à Inteligência Artificial'],
	['21076','Investigação Operacional','11-06-2019','T','16-09-2019','M','2ºano','https://wiki.dcet.uab.pt/files/index.php/Investigação Operacional'],
	['21077','Linguagens de Programação','28-06-2019','T','27-09-2019','T','2ºano','https://wiki.dcet.uab.pt/files/index.php/Linguagens de Programação'],
	['21179','Laboratório de Desenvolvimento de Software','17-06-2019','T','19-09-2019','T','2ºano','https://wiki.dcet.uab.pt/files/index.php/Laborat%C3%B3rio_de_Desenvolvimento_de_Software'],
	['21018','Compilação','06-06-2019','M','11-09-2019','T','3ºano','https://wiki.dcet.uab.pt/files/index.php/Compilação'],
	['21097','Raciocínio e Representação do Conhecimento','03-07-2019','T','26-09-2019','T','3ºano','https://wiki.dcet.uab.pt/files/index.php/Raciocínio e Representação do Conhecimento'],
	['21108','Sistemas Distribuídos','26-06-2019','T','30-09-2019','T','3ºano','https://wiki.dcet.uab.pt/files/index.php/Sistemas Distribuídos'],
	['21182','Laboratório de Sistemas e Serviços Web','09-07-2019','T','18-09-2019','T','3ºano','https://wiki.dcet.uab.pt/files/index.php/Laboratório de Sistemas e Serviços Web'],
	['21184','Projeto de Engenharia Informática','***','*','***','*','3ºano','https://wiki.dcet.uab.pt/files/index.php/Projeto de Engenharia Informática']
];
