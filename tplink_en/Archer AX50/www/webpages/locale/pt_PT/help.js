(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mostra informações relevantes sobre a ligação WAN Wide Área Network (Internet)."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Wi-Fi 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mostra informações relevantes sobre a Rede Wi-Fi."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Apresenta informações sobre as portas Ethernet (LAN)."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Rede de Convidados 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mostra informações relevantes sobre a Rede de Convidados."
                       }]
},
       STATUS_USB :{ 
               TITLE:"Dispositivos USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mostra informações sobre os dispositivos USB de armazenamento e/ou impressoras ligadas ao Router via USB."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Performance",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mostra o atual desempenho do router."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Clientes Cabo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Apresenta informações de dispositivos ligados com fios à rede."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Clientes Wi-Fi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Apresenta informações de dispositivos ligados por Wi-Fi à rede."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configure os parâmetros IPv4 e selecione o método apropriado para Clonar o endereço MAC, se necessário."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecione o Tipo de Ligação à Internet e introduza os parâmetros correspondentes."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: IP Dinâmico"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecione este tipo caso exista uma servidor DHCP do seu ISP."
                       } ,{                      
                           type: "name",
                           title: "Endereço IP/Máscara de Rede/Gateway Predefinido/DNS Primário/DNS Secundário",
                           content: "Estes parâmetros são automaticamente atribuídos pelo servidor DHCP do seu ISP."
                       } ,{                      
                           type: "name",
                           title: "Renovar",
                           content: "Clique para obter novos parâmetros IP a partir do servidor DHCP."
                       } ,{                      
                           type: "name",
                           title: "Libertar",
                           content: "Clique para liberar todos os endereços IP atribuídos pelo servidor DHCP."
                       } ,{                      
                           type: "name",
                           title: "Endereço DNS",
                           content: "Se o ISP fornece um ou dois endereços DNS, selecione essa opção e digite os endereços DNS Primário e Secundário nos campos correspondentes, caso contrário, os endereços DNS serão atribuídos dinamicamente pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamanho MTU",
                           content: "O valor MTU (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1500 Bytes. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Nome de Dispositivo",
                           content: "Digite um valor para este campo para especificar o nome do Router."
                       } ,{                      
                           type: "name",
                           title: "Obter IP utilizando Unicast DHCP",
                           content: "Selecione esta opção se o servidor DHCP do ISP não suporta aplicações de broadcast e em caso de não poder obter o endereço IP dinamicamente."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: IP Estático"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecione este tipo de ligação se o seu ISP lhe forneceu Endereço IP, Máscara de Rede, Gateway Predefinido, DNS Primário e DNS Secundário específicos (fixos)."
                       } ,{                      
                           type: "name",
                           title: "Endereço IP/Máscara de Rede/Gateway Predefinido/DNS Primário/DNS Secundário",
                           content: "Digite as informações fornecidas pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamanho MTU",
                           content: "O valor MTU (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1500 Bytes. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: BigPond Cable"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecione este tipo se o ISP fornece uma ligação BigPond Cable."
                       } ,{                      
                           type: "name",
                           title: "Utilizador/Senha",
                           content: "Digite o nome de utilizador e senha fornecidos pelo ISP. Estes campos são sensíveis a maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Servidor Auth.",
                           content: "Digite o endereço IP ou nome de domínio do servidor de autenticação."
                       } ,{                      
                           type: "name",
                           title: "Domínio Auth.",
                           content: "Introduza o sufixo do nome de domínio do servidor (com base na localização). Por exemplo, nsw.bigpond.net.au para NSW / ACT, vic.bigpond.net.au para VIC / TAS / WA / SA / NT, ou qld.bigpond.net.au para QLD."
                       } ,{                      
                           type: "name",
                           title: "Tamanho MTU",
                           content: "O valor MTU (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1500 Bytes. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Modo de Ligação",
                           content: "Selecione modo de ligação apropriado que determina como se conectar à Internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "Neste modo, a ligação à Internet é restabelecida automaticamente assim que é desconectada."
                       } ,{                      
                           type: "name",
                           title: "A Pedido",
                           content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente a Internet."
                       } ,{                      
                           type: "name",
                           title: "Manual",
                           content: "Neste modo, a ligação à Internet é controlada manualmente, clicando no botão Desligar ou Ligar. Este modo também suporta a função Tempo Máximo de Inatividade. Digite o tempo máximo (em minutos) que ligação à Internet pode ficar inativa antes de ser desligada no campo Tempo Máximo de Inatividade. O valor predefinido é 15 minutos. Se desejar que a ligação à internet permanece sempre ativa, digite 0 (zero)."
                       }]
} ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecione este tipo de ligação se usar o serviço DSL (Digital Subscriber Line) e o seu ISP fornece nome de utilizador e senha."
                       } ,{                      
                           type: "name",
                           title: "Utilizador/Senha",
                           content: "Digite o nome de utilizador e senha fornecidos pelo ISP. Estes campos são sensíveis a maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Endereço IP/DNS Primário/DNS Secundário",
                           content: "Estes parâmetros são atribuídos automaticamente pelo servidor DHCP do ISP."
                       } ,{                      
                           type: "name",
                           title: "Ligação Secundária (Nenhuma, IP Dinâmico, IP Estático)",
       children: [{                      
                           type: "name",
                           title: "Nenhuma",
                           content: "Selecione se não existir ligação secundária"
                       } ,{                      
                           type: "name",
                           title: "IP Dinâmico",
                           content: "Selecione se o endereço IP e Máscara de Rede são atribuídos automaticamente pelo ISP.",
       children: [{                      
                           type: "name",
                           title: "Renovar",
                           content: "Clique para renovar os parâmetros IP a partir do ISP."
                       } ,{                      
                           type: "name",
                           title: "Libertar",
                           content: "Clique para liberar os parâmetros IP atribuídos."
                       }]
} ,{                      
                           type: "name",
                           title: "IP Estático",
                           content: "Selecione em caso de o endereço IP e a máscara de sub-rede sejam fornecidos pelo ISP, e insira as informações nos campos correspondentes."
                       }]
} ,{                      
                           type: "name",
                           title: "Tamanho MTU",
                           content: "O valor MTU (Maximum Transmission Unit) típico para redes Ethernet é 1480 Bytes.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "Raramente, o ISP poderá exigir que seja ajustado o tamanho da MTU para um melhor desempenho da rede. Não deverá por isso alterar o valor, a menos que seja absolutamente necessário."
                       }]
} ,{                      
                           type: "name",
                           title: "Nome de Serviço/Nome de Concentrador de Acesso",
                           content: "Por defeito, o Nome do Serviço e o nome do Concentrador de Acesso (AC) devem ser deixados em branco. Estes campos não devem ser configurados a menos que seja exigido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Detetar Intervalo Online",
                           content: "Insira um valor de intervalo de tempo entre 0 e 120 (em segundos). O Router utilizará esse intervalo para testar a conectividade com o Concentrador de Acesso. O valor predefinido é 10."
                       } ,{                      
                           type: "name",
                           title: "Endereço IP",
                           content: "Se o ISP atribui um endereço IP específico (fixo), selecione Utilizar o seguinte endereço IP e digite o endereço IP no campo correspondente. Caso contrário, selecione Obter Dinamicamente a partir do ISP para obter automaticamente um endereço IP atribuído pelo servidor."
                       } ,{                      
                           type: "name",
                           title: "Endereço DNS",
                           content: "Se o ISP lhe atribuir um endereço IP de DNS (fixo) específico, selecione Utilizar os seguintes endereços de DNS e digite o(s) endereço(s) de DNS primário e DNS secundários nos respetivos campos. Caso contrário, selecione Obter dinamicamente a partir do ISP para obter automaticamente o endereço IP de DNS atribuído pelo(s) servidor(es)."
                       } ,{                      
                           type: "name",
                           title: "Modo de Ligação",
                           content: "Selecione modo de ligação apropriado que determina como se conectar à Internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "Neste modo, a ligação à Internet é restabelecida automaticamente assim que é desconectada."
                       } ,{                      
                           type: "name",
                           title: "A Pedido",
                           content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente a Internet."
                       } ,{                      
                           type: "name",
                           title: "Agendado",
                           content: "Neste modo, a ligação à Internet é estabelecida apenas num período de tempo específico. Se essa opção for selecionada, digite o tempo de início e fim, ambos no formato HH: MM."
                       } ,{                      
                           type: "name",
                           title: "Manual",
                           content: "Neste modo, a ligação à Internet é controlada manualmente, clicando no botão Desligar ou Ligar. Este modo também suporta a função Tempo Máximo de Inatividade. Digite o tempo máximo (em minutos) que ligação à Internet pode ficar inativa antes de ser desligada no campo Tempo Máximo de Inatividade. O valor predefinido é 15 minutos. Se desejar que a ligação à internet permanece sempre ativa, digite 0 (zero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "O modo de ligação Agendado só terá efeito se for configurar o relógio de sistema em Ferramentas de Sistema → Sistema → Definições de Tempo."
                       }]
} ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecione este tipo se ligar a um servidor VPN L2TP/ PPTP e são fornecidos pelo ISP o nome de utilizador, senha e endereço de IP / Nome de Domínio do servidor."
                       } ,{                      
                           type: "name",
                           title: "Utilizador/Senha",
                           content: "Digite o nome de utilizador e senha fornecidos pelo ISP. Estes campos são sensíveis a maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Endereço IP/DNS Primário/DNS Secundário",
                           content: "Estes parâmetros serão atribuídos automaticamente pelo servidor DHCP do ISP."
                       } ,{                      
                           type: "name",
                           title: "Ligação Secundária (IP Dinâmico ou IP Estático)",
       children: [{                      
                           type: "name",
                           title: "IP Dinâmico",
                           content: "Selecione se o endereço IP e Máscara de Rede são atribuídos automaticamente pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "IP Estático",
                           content: "Selecione se o endereço IP, máscara de sub-rede, gateway e endereços DNS são fornecidos pelo ISP, e insira as informações nos campos correspondentes."
                       }]
} ,{                      
                           type: "name",
                           title: "IP do Servidor VPN/Nome de Domínio",
                           content: "Introduza o endereço IP do servidor VPN ou nome de domínio fornecidos pelo seu ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamanho MTU",
                           content: "O valor MTU (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1460 Bytes para L2TP ou 1420 Bytes para PPTP. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Modo de Ligação",
                           content: "Selecione modo de ligação apropriado que determina como se conectar à Internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "Neste modo, a ligação à Internet é restabelecida automaticamente assim que é desconectada."
                       } ,{                      
                           type: "name",
                           title: "A Pedido",
                           content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente a Internet."
                       } ,{                      
                           type: "name",
                           title: "Manual",
                           content: "Neste modo, a ligação à Internet é controlada manualmente, clicando no botão Desligar ou Ligar. Este modo também suporta a função Tempo Máximo de Inatividade. Digite o tempo máximo (em minutos) que ligação à Internet pode ficar inativa antes de ser desligada no campo Tempo Máximo de Inatividade. O valor predefinido é 15 minutos. Se desejar que a ligação à internet permanece sempre ativa, digite 0 (zero)."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"Clonar MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecione o método de Clonagem MAC Clone conforme seja necessário."
                       } ,{                      
                           type: "name",
                           title: "Não Clonar Endereço MAC",
                           content: "Não altera o endereço MAC predefinido do router, caso o ISP não assigne o endereço IP vinculado a endereço MAC especifico."
                       } ,{                      
                           type: "name",
                           title: "Clonar Endereço MAC deste Computador",
                           content: "Selecione para copiar o endereço MAC do computador que é ligado ao router, caso o ISP vincule o endereço IP atribuído ao endereço MAC deste computador."
                       } ,{                      
                           type: "name",
                           title: "Endereço MAC Personalizado",
                           content: "Digite o endereço MAC manualmente, caso o ISP vincule o endereço IP atribuído a um endereço MAC específico."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"Agregação WAN",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "A agregação de ligações WAN, permite transformar a porta LAN1 numa porta WAN adicional. Criando uma ligação única de dados com uma alta largura de banda. Liberte a Internet mais rápida dos seus ISPs (provedores de serviço de Internet) fornecendo taxas da largura acima de 1Gbps. Não sendo limitado pela barreira física dos equipamentos de rede."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Nota",
                           content: "Antes de ativar esta funcionalidade, por favor verifique se o seu ISP suporta a Agregação WAN e se o seu modem tem duas portas WAN."
                       } ,{                      
                           type: "step",
                           title: "Para aplicar a agregação WAN",
       content: [ 
                "1. Clique em Agregação WAN para ativar a função.",
                "2. Clique em Guardar.",
                "3. Conecte a porta WAN e LAN1 do seu router às duas portas WAN do seu modem com dois cabos de rede Ethernet."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe o endereço MAC, endereço IP e máscara de sub-rede do router."
                       } ,{                      
                           type: "name",
                           title: "Endereço MAC",
                           content: "Endereço físico exclusivo atribuído à porta Ethernet (LAN) do router."
                       } ,{                      
                           type: "name",
                           title: "Endereço IP",
                           content: "Exibe o endereço IP predefinido do router que é usado para efetuar o início de sessão na Interface Web de gestão. Caso pretenda, poderá alterá-lo."
                       } ,{                      
                           type: "name",
                           title: "Máscara de Rede",
                           content: "Escolha um identificador usado pela porta LAN para encaminhar tráfego interno e externo, ou introduza uma nova máscara de sub-rede."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Se o novo endereço IP LAN não estiver na mesma sub-rede do antigo, o lote de endereços IP no servidor DHCP será configurado automaticamente; no entanto, o Virtual Server e DMZ host não funcionarão até que sejam reconfigurados."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Agregação de Ligações",
               CONTENT: [{
                           type: "paragraph",
                           content: "A agregação de ligações permite agregar em simultâneo a largura de banda de duas portas por forma a criar uma única ligação de elevada largura de banda, sustentado assim maior velocidade e disponibilidade da rede."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Para ativar a agregação de ligações",
       content: [ 
                "1. Altere o estado do botão para ativar a funcionalidade de Agregação de Ligações.",
                "2. Especifique duas portas para agregação de ligações.",
                "3. Clique em Guardar."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) é um sistema através do qual os serviços de televisão são entregues através do protocolo de Internet (IP) numa rede de comutação de pacotes, como uma rede local ou pela Internet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "O IGMP Snooping (Internet Group Management Protocol) permite que o router apenas encaminhe o tráfego Multicast para as portas que o tenham solicitado."
                       } ,{                      
                           type: "name",
                           title: "IGMP Proxy",
                           content: "Selecione para ativar o recurso IGMP Proxy se o serviço de IPTV fornecido pelo ISP necessita da tecnologia IGMP ."
                       } ,{                      
                           type: "name",
                           title: "Versão IGMP",
                           content: "Selecione a versão de IGMP de acordo com o seu ISP (provedor de Internet). Por defeito a versão de IGMP é a V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Encaminhamento Multicast Wireless",
                           content: "Selecione para ativar o recurso Wi-Fi Multicast Forwarding que permite que os pacotes multicast sejam encaminhados através da rede Wi-Fi."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Selecione para ativar o recurso de IPTV se o serviço de IPTV fornecido pelo ISP não utiliza a tecnologia IGMP."
                       } ,{                      
                           type: "name",
                           title: "Perfil de ISP",
                           content: "Selecione o perfil ISP (provedor de serviço de Internet) apropriado para concluir a configuração. Existem três tipos de perfis:",
       children: [{                      
                           type: "name",
                           title: "Pais-Nome do ISP",
                           content: "Os perfis de ISP com as configurações genéricas, estão no formato \"Country-ISP Name\". Basta localizar e selecionar o seu ISP da seguinte lista."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bridge",
                           content: "Se o ISP não estiver disponível na lista e se não for necessários outros parâmetros para configurar o serviço de a IPTV, basta selecionar este perfil e indicar a porta LAN dedicada ao IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Indique o tipo de dados que a porta LAN irá transmitir. Por exemplo, se for selecionado a porta LAN1 para o serviço de IPTV, a mesma só irá transmiti dados de IPTV, do qual deverá ligar a set-top box."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bridge",
                           content: "Se o ISP não estiver disponível na lista e se não for necessários outros parâmetros para configurar o serviço de a IPTV, basta selecionar este perfil e indicar a porta LAN dedicada ao IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Indique o tipo de dados que a porta LAN irá transmitir. Por exemplo, se selecionar a porta LAN2 para transmitir dados de IPTV, deverá ligar a STB (Set Up Box) do operador na porta LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bridge",
                           content: "Se o ISP não estiver disponível na lista e se não for necessários outros parâmetros para configurar o serviço de a IPTV, basta selecionar este perfil e indicar a porta LAN dedicada ao IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Indique o tipo de dados que a porta LAN irá transmitir. Por exemplo, se selecionar a porta LAN5 para transmitir dados de IPTV, deverá ligar a STB (Set Up Box) do operador na porta LAN5."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Personalizado",
                           content: "Se o seu ISP não estiver disponível na lista, mas fornece alguns parâmetros necessários, como por exemplo Internet/VoIP/IPTV VLAN IDs e Prioridade, selecione este perfil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioridade",
                           content: "Configurar os IDs de VLAN e prioridades fornecidos pelo seu ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selecione para marcar os pacotes de Internet com 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "ID de VLAN Multicast de IPTV/Prioridade",
                           content: "Pode ativar o recurso de multicast IPTV caso deseje e configure o ID de VLAN e Prioridade de acordo com o ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Indique o tipo de dados que a porta LAN irá transmitir. Por exemplo, se for selecionado a porta LAN1 para o serviço de IPTV, a mesma só irá transmiti dados de IPTV, do qual deverá ligar a set-top box."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Personalizado",
                           content: "Se o seu ISP não estiver disponível na lista, mas fornece alguns parâmetros necessários, como por exemplo Internet/VoIP/IPTV VLAN IDs e Prioridade, selecione este perfil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioridade",
                           content: "Configurar os IDs de VLAN e prioridades fornecidos pelo seu ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selecione para marcar os pacotes de Internet com 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "ID de VLAN Multicast de IPTV/Prioridade",
                           content: "Pode ativar o recurso de multicast IPTV caso deseje e configure o ID de VLAN e Prioridade de acordo com o ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Indique o tipo de dados que a porta LAN irá transmitir. Por exemplo, se selecionar a porta LAN2 para transmitir dados de IPTV, deverá ligar a STB (Set Up Box) do operador na porta LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Personalizado",
                           content: "Se o seu ISP não estiver disponível na lista, mas fornece alguns parâmetros necessários, como por exemplo Internet/VoIP/IPTV VLAN IDs e Prioridade, selecione este perfil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioridade",
                           content: "Configurar os IDs de VLAN e prioridades fornecidos pelo seu ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selecione para marcar os pacotes de Internet com 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "ID de VLAN Multicast de IPTV/Prioridade",
                           content: "Pode ativar o recurso de multicast IPTV caso deseje e configure o ID de VLAN e Prioridade de acordo com o ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Indique o tipo de dados que a porta LAN irá transmitir. Por exemplo, se selecionar a porta LAN5 para transmitir dados de IPTV, deverá ligar a STB (Set Up Box) do operador na porta LAN5."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"Servidor DHCP",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Por padrão, o servidor DHCP (Dynamic Host Configuration Protocol) está habilitado; ele atribui dinamicamente os parâmetros TCP / IP para dispositivos clientes do pool de endereços IP.",
                "Não desative o servidor DHCP, a menos que você tem um outro servidor DHCP ou se você quiser atribuir manualmente os parâmetros de TCP / IP para cada dispositivo cliente em sua rede."]
} ,{                      
                           type: "name",
                           title: "Lote de Endereços IP",
                           content: "Inserir o intervalo de endereços IP que podem ser atribuídos a clientes."
                       } ,{                      
                           type: "name",
                           title: "Tempo de Atribuição de Endereço",
                           content: "Digite o tempo de duração (entre 1 e 2880 minutos) em que um endereço IP é concedido a um cliente. O valor padrão é 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Reserva de Endereço",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe os parâmetros correspondentes de dispositivos IP reservados."
                       } ,{                      
                           type: "step",
                           title: "Para reservar um endereço IP",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Clique em Procurar para escolher um dispositivo conectado atualmente na Lista de cliente DHCP; ou digite o endereço MAC do cliente desejado no campo Endereço MAC e o endereço IP que deseja reservar para o cliente no campo Endereço IP.",
                "3. Introduza uma descrição para o cliente no campo Descrição.",
                "4. Selecione Ativar.",
                "5. Clique em Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Caso pretenda desativar esta entrada, clique no ícone Lâmpada."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"Lista de Clientes DHCP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe as informações de dispositivos conectados no momento."
                       }]
},
       DDNS :{ 
               TITLE:"DNS Dinâmico",
               CONTENT: [{
                           type: "paragraph",
                           content: "Um serviço de DNS Dinâmico (Dynamic Domain Name System) permite atribuir um endereço IP Público dinâmico, um nome de domínio fixo. Esta funcionalidade é útil nas situações em que esteja a hospedar o seu próprio site, servidor FTP ou outro servidor na rede LAN do Router. Para começar, precisa de se registar num site de DNS Dinâmico, como por exemplo em www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Para configurar um DNS Dinâmico",
       content: [ 
                "1. Selecione o fornecedor de serviços de DNS Dinâmico.",
                "2. Digite o nome de utilizador e senha da conta de DNS dinâmico.",
                "3. Insira o Nome de Domínio que recebeu do fornecedor do serviço DDNS.",
                "4. Selecione o intervalo de atualização da lista de opções.",
                "5. Se o seu fornecedor de serviços de DDNS é NO-IP, O Vínculo IP WAN pode assegurar que o nome de domínio fique associado ao IP WAN deste router.",
                "6. Clique em Iniciar a Sessão e Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Se deseja usar uma nova conta de DDNS, faça inicie primeiro a sessão, e depois faça login com a nova conta."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"DNS Dinâmico",
               CONTENT: [{
                           type: "paragraph",
                           content: "Um serviço de DNS Dinâmico (Dynamic Domain Name System) permite atribuir um endereço IP Público dinâmico, um nome de domínio fixo. Esta funcionalidade é útil nas situações em que esteja a hospedar o seu próprio site, servidor FTP ou outro servidor na rede LAN do Router. Para começar, precisa de se registar num site de DNS Dinâmico, como por exemplo em www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Lista de Nome de Domínio",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabela exibe as informações de todos os nomes de domínio que estão registrados com a sua conta Cloud."
                       } ,{                      
                           type: "step",
                           title: "Para registar um novo nome de domínio",
       content: [ 
                "1. Clique Registar.",
                "2. Digite o nome de domínio que deseja registrar.",
                "3. Clique em Guardar."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Routing Estático",
               CONTENT: [{
                           type: "paragraph",
                           content: "O routing estático é usado para pré-determinar uma rota fixa para que pacotes de informação de rede chegarem a um dispositivo ou rede específica."
                       } ,{                      
                           type: "step",
                           title: "Para configurar uma rota estática",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Insira um endereço IP no campo de Rede de Destino para atribuir uma rota estática para esta entrada.",
                "3. Insira uma máscara de sub-rede no campo Máscara de sub-rede para determinar a parte de rede e a parte do host do endereço IP.",
                "4. Insira um endereço IP de Gateway no campo Gateway Predefinido para conectar o router à rede ou host.",
                "5. Selecione LAN ou WAN no campo Interface para específicar o tipo de rede de destino.",
                "6. Introduza uma breve descrição para esta entrada.",
                "7. Selecionar Ativar.",
                "8. Clique em Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Caso pretenda desativar esta entrada, clique no ícone Lâmpada."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Tabela de routing do Sistema",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe todas as entradas de rotas válidas que estão atualmente em uso."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Definições Wi-Fi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Personalize as definições Wi-Fi."
                       }]
},
       OFDMA :{ 
               TITLE:"OFDMA",
               CONTENT: [{
                           type: "paragraph",
                           content: "A tecnologia OFDMA permite que múltiplos utilizadores transmitam dados em simultâneo, aumentando a velocidade e eficiência. De notar que para desfrutar desta tecnologia os clientes terão de suportar esta tecnologia."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Ligação Smart",
               CONTENT: [{
                           type: "paragraph",
                           content: "Marque esta caixa de seleção para ativar a ligação smart. Esta função ajuda a dispositivos a executarem mais rápido, atribuindo-lhes as melhores bandas sem fios baseadas nas condições reais para equilibrar exigências de rede."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Wi-Fi 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nome da Rede (SSID)",
                           content: "Recomenda-se a mudança do nome da rede (SSID). Este campo é sensível a letras maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Escolha esta opção se deseja ocultar o nome da rede (SSID) 2.4 GHz da lista de redes Wi-Fi. Após selecionar, o SSID não será exibido e para se ligar precisa de configurar a rede manualmente."
                       } ,{                      
                           type: "name",
                           title: "Segurança",
                           content: "Escolha uma das seguintes opções de segurança:",
       children: [{                      
                           type: "name",
                           title: "Sem segurança",
                           content: "Selecione esta opção para desativar a segurança da rede Wi-Fi. Esta opção não é recomendada."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Pessoal",
                           content: "Selecione esta opção para ativar a segurança da rede Wi-Fi. Esta opção é altamente recomendada por forma a proteger a rede Wi-Fi contra acessos não autorizados. Após selecionado, configure o seguinte.",
       children: [{                      
                           type: "name",
                           title: "Versão",
                           content: "Selecione uma versão de segurança. Selecione uma versão de segurança. WPA2-PSK é mais seguro. Se você não tiver certeza, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptação",
                           content: "Selecione um tipo de encriptação de segurança. AES é o modo mais seguro. Não é recomendada a utilização de encriptação TKIP se o router opera no modo 802.11n. Além disso, usando TKIP irá desativar a função WPS. Se não tiver seguro sobre o modo a utilizar, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Senha",
                           content: "Digite neste campo a senha da rede Wi-Fi. Pode inserir 8 a 63 caracteres ASCII ou 8 a 64 caracteres hexadecimais. Este campo é sensível a caracteres em maiúsculas e minúsculas."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Empresarial",
                           content: "Selecione esta opção para ativar o método de autenticação mais avançado usando um servidor RADIUS (Remote Authentication Dial In User Service). Se selecionada, a função WPS será desativada.",
       children: [{                      
                           type: "name",
                           title: "Versão",
                           content: "Selecione uma versão de segurança. WPA2 é mais seguro. Se você não tiver certeza, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptação",
                           content: "Selecione um tipo de encriptação de segurança. AES é o modo mais seguro. Não é recomendada a utilização de encriptação TKIP se o router opera no modo 802.11n. Além disso, usando TKIP irá desativar a função WPS. Se não tiver seguro sobre o modo a utilizar, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "IP Servidor RADIUS",
                           content: "Insira o endereço IP do servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Porta RADIUS",
                           content: "Insira o número da porta do servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Senha RADIUS",
                           content: "insira a senha partilhada do servidor RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Selecione esta opção para ativar o método autenticação básico se um dos seus dispositivos clientes apenas for compatível com a autenticação WEP (Wired Equivalent Privacy). Quando selecionado, a função WPS será desativada.",
       children: [{                      
                           type: "name",
                           title: "Tipo",
                           content: "Selecione um tipo de autenticação para a rede Wi-Fi. Se não tiver certeza, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Formato de Chave WEP",
                           content: "Selecione formato ASCII ou Hexadecimal. O formato ASCII é uma combinação de caracteres alfabéticos e numéricos. O formato hexadecimal é uma combinação de números (0-9) e letras (a-f, A-F)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Chave",
                           content: "Selecione o tamanho da chave WEP.",
       children: [{                      
                           type: "name",
                           title: "64 bits",
                           content: "Permite inserir 10 dígitos hexadecimais (0-9, A-F, a-f) ou 5 caracteres ASCII no campo Valor WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Permite inserir 26 dígitos hexadecimais (0-9, A-F, a-f) ou 13 caracteres ASCII no campo Valor WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Valor Chave",
                           content: "Insira a chave WEP no respetivo campo."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Selecione um canal de funcionamento para a rede Wi-Fi 2.4 GHz. Auto é a opção predefinida e recomendada. Recomendamos deixar o canal em Auto se não tiver problemas intermitentes de ligação Wi-Fi."
                       } ,{                      
                           type: "name",
                           title: "Potência de Transmissão",
                           content: "Selecione Alta, Média ou Baixa para especificar a potência de transmissão. A configuração predefinida e recomendada é Alta."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Funcionalidade de Airtime Fairness",
                           content: "Selecione esta caixa de opção para ativar a funcionalidade de Airtime Fairness (ATF) que permite otimizar a largura de banda de cada fluxo de dados. O gestor de tráfego ATF utiliza os destinatários de Airtime para balancear os fluxos de dados."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Multi-Utilizador MIMO",
                           content: "Clique em Ativar para utilizar o Multi-Utilizador MIMO."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Wi-Fi 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nome da Rede (SSID)",
                           content: "Recomenda-se a mudança do nome da rede (SSID). Este campo é sensível a letras maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Selecione caso pretenda ocultar o nome da rede 5GHz (SSID) da lista de redes Wi-Fi. Se selecionado, o SSID não será transmitido e irá necessitar de configurar a rede manualmente."
                       } ,{                      
                           type: "name",
                           title: "Segurança",
                           content: "Escolha uma das seguintes opções de segurança:",
       children: [{                      
                           type: "name",
                           title: "Sem segurança",
                           content: "Selecione esta opção para desativar a segurança da rede Wi-Fi. Esta opção não é recomendada."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Pessoal",
                           content: "Selecione esta opção para ativar a segurança Wi-Fi. É altamente recomendado por forma a proteger a rede Wi-Fi de acessos não autorizados. Se selecionado, configure o seguinte.",
       children: [{                      
                           type: "name",
                           title: "Versão",
                           content: "Selecione uma versão de segurança. WPA2-PSK é o mais seguro. Se não tiver certeza, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptação",
                           content: "Selecione um tipo de encriptação de segurança. AES é o modo mais seguro. Não é recomendada a utilização de encriptação TKIP se o router opera no modo 802.11n. Além disso, usando TKIP irá desativar a função WPS. Se não tiver seguro sobre o modo a utilizar, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Senha",
                           content: "Digite neste campo a senha da rede Wi-Fi. Pode inserir 8 a 63 caracteres ASCII ou 8 a 64 caracteres hexadecimais. Este campo é sensível a caracteres em maiúsculas e minúsculas."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Empresarial",
                           content: "Selecione esta opção para ativar o método de autenticação mais avançado usando um servidor RADIUS (Remote Authentication Dial In User Service). Se selecionada, a função WPS será desativada.",
       children: [{                      
                           type: "name",
                           title: "Versão",
                           content: "Selecione uma versão de segurança. WPA2 é mais seguro. Se você não tiver certeza, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptação",
                           content: "Selecione um tipo de encriptação de segurança. AES é o modo mais seguro. Não é recomendada a utilização de encriptação TKIP se o router opera no modo 802.11n. Além disso, usando TKIP irá desativar a função WPS. Se não tiver seguro sobre o modo a utilizar, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "IP Servidor RADIUS",
                           content: "Insira o endereço IP do servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Porta RADIUS",
                           content: "Insira o número da porta do servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Senha RADIUS",
                           content: "insira a senha partilhada do servidor RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Selecione esta opção para ativar o método autenticação básico se um dos seus dispositivos clientes apenas for compatível com a autenticação WEP (Wired Equivalent Privacy). Quando selecionado, a função WPS será desativada.",
       children: [{                      
                           type: "name",
                           title: "Tipo",
                           content: "Selecione um tipo de autenticação para a rede Wi-Fi. Se não tiver certeza, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Formato de Chave WEP",
                           content: "Selecione formato ASCII ou Hexadecimal. O formato ASCII é uma combinação de caracteres alfabéticos e numéricos. O formato hexadecimal é uma combinação de números (0-9) e letras (a-f, A-F)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Chave",
                           content: "Selecione o tamanho da chave WEP.",
       children: [{                      
                           type: "name",
                           title: "64 bits",
                           content: "Permite inserir 10 dígitos hexadecimais (0-9, A-F, a-f) ou 5 caracteres ASCII no campo Valor WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Permite inserir 26 dígitos hexadecimais (0-9, A-F, a-f) ou 13 caracteres ASCII no campo Valor WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Valor Chave",
                           content: "Insira a chave WEP no respetivo campo."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Selecione um canal de funcionamento para a rede Wi-Fi 5GHz. Auto é a opção predefinida e recomendada. Recomendamos deixar o canal em Auto se não tiver problemas intermitentes de ligação Wi-Fi."
                       } ,{                      
                           type: "name",
                           title: "Potência de Transmissão",
                           content: "Selecione Alta, Média ou Baixa para especificar a potência de transmissão. A configuração predefinida e recomendada é Alta."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Funcionalidade de Airtime Fairness",
                           content: "Selecione esta caixa de opção para ativar a funcionalidade de Airtime Fairness (ATF) que permite otimizar a largura de banda de cada fluxo de dados. O gestor de tráfego ATF utiliza os destinatários de Airtime para balancear os fluxos de dados."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Multi-Utilizador MIMO",
                           content: "Clique em Ativar para utilizar o Multi-Utilizador MIMO."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A função WPS (Wi-Fi Protected Setup) fornece um modo mais fácil de configurar uma ligação segura de Wi-Fi."
                       } ,{                      
                           type: "name",
                           title: "Premir Botão (recomendado)",
       content: [ 
                "Este método permite-lhe ligar facilmente um dispositivo WPS à sua rede Wi-Fi.",
                "Clique no botão Iniciar WPS no ecrã. No período de 2 minutos, pressione o botão WPS no dispositivo cliente."]
} ,{                      
                           type: "name",
                           title: "PIN do Router",
       content: [ 
                "O PIN padrão pode ser encontrado na etiqueta do Router.",
                "Clique em Gerar para obter um novo PIN ou clique Padrão para repor o PIN para o valor padrão."]
} ,{                      
                           type: "name",
                           title: "Insira o PIN do cliente",
       content: [ 
                "Este método permite-lhe adicionar um dispositivo Wi-Fi manualmente.",
                "Introduza o PIN do dispositivo no campo correspondente e clique em Conectar."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Estações Wi-Fi Ligadas",
               CONTENT: [{
                           type: "name",
                           title: "Número de Clientes",
                           content: "Exibe o número de clientes Wi-Fi associados."
                       } ,{                      
                           type: "name",
                           title: "Endereço MAC",
                           content: "Mostra o endereço MAC do cliente Wi-Fi associado."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Ligação",
                           content: "Mostra a frequência Wi-Fi (2,4 GHz ou 5GHz) do cliente Wi-Fi associado."
                       } ,{                      
                           type: "name",
                           title: "Segurança",
                           content: "Mostra o tipo de segurança do cliente Wi-Fi associado."
                       } ,{                      
                           type: "name",
                           title: "Pacotes Recebidos",
                           content: "Mostra o número de pacotes recebidos pelo cliente Wi-Fi associado."
                       } ,{                      
                           type: "name",
                           title: "Pacotes Enviados",
                           content: "Mostra o número de pacotes enviados pelo cliente Wi-Fi associado."
                       } ,{                      
                           type: "paragraph",
                           content: "Clique em Atualizar para atualizar as informações nesta página."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Agenda sem fios",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com o Agendamento Wi-Fi, poderá desativar o sinal Wi-Fi durante um período específico. Por exemplo, pode desligar o sinal Wi-Fi entre as 00:00-07:00."
                       } ,{                      
                           type: "name",
                           title: "Horário para Desligar Wi-Fi",
                           content: "Exibe o(s) período (s) durante o qual o sinal Wi-Fi está desligado.",
       children: [{                      
                           type: "step",
                           title: "Para Configurar Agendamento Wi-Fi",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Introduza o período de tempo em que pretende que o Wi-Fi fique desativado.",
                "3. Selecione os dias de repetição. Pode selecionar \"Todos os dias\" ou especificar determinados dias.",
                "4. Clique em Gravar."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Definições",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta função permite-lhe fornecer acesso Wi-Fi gratuito para os hóspedes sem revelar a rede principal."
                       } ,{                      
                           type: "name",
                           title: "Permitir que Convidados se vejam entre si",
                           content: "Selecione esta opção para permitir que os dispositivos Wi-Fi da rede de convidados possam comunicar uns com os outros através de métodos tais como partilha de rede, Samba, Ping e FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Permitir que Convidados acedam à minha Rede Local",
                           content: "Selecione esta opção para permitir que os dispositivos Wi-Fi da rede de convidados possam comunicar com os dispositivos conectados nas portas LAN do Router ou da rede principal através de métodos tais como Partilha de Rede, Samba, Ping e FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Wi-Fi 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Ativar Rede de Convidados",
                           content: "Selecione esta opção para ativar a função Rede de Convidados."
                       } ,{                      
                           type: "name",
                           title: "Nome da Rede (SSID)",
                           content: "Utilize o SSID predefinido ou crie um novo nome de rede Wi-Fi (até 32 caracteres)."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Selecione esta opção se desejar esconder o SSID da Rede de Convidados das listas de redes Wi-Fi."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Intervalo de Atualização da Senha",
                           content: "Selecione o intervalo de atualização da senha da Rede de Convidados."
                       } ,{                      
                           type: "name",
                           title: "Segurança",
                           content: "Quando opta por nunca atualizar a senha, selecione uma das seguintes opções de segurança:",
       children: [{                      
                           type: "name",
                           title: "Sem segurança",
                           content: "Selecione esta opção para desativar a segurança da rede Wi-Fi. Esta opção não é recomendada."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Pessoal",
                           content: "Selecione esta opção para ativar a segurança Wi-Fi. É altamente recomendado para proteger a rede de Convidados de acessos não autorizados. Se selecionado, configure o seguinte.",
       children: [{                      
                           type: "name",
                           title: "Versão",
                           content: "Selecione uma versão de segurança. WPA2-PSK é o mais seguro. Se não tiver certeza, selecione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptação",
                           content: "Selecione um tipo de encriptação de segurança. AES é o modo mais seguro. Não é recomendada a utilização de encriptação TKIP se o router opera no modo 802.11n. Além disso, usando TKIP irá desativar a função WPS. Se não tiver seguro sobre o modo a utilizar, selecione Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "A Autenticação via Portal permite aumentar a segurança da sua rede ao requisitar autenticação a clientes que temporariamente pretendem aceder à sua rede."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Para configurar a Autenticação via Portal:",
       content: [ 
                "1. Selecione Portal como método de Segurança.",
                "2. Selecione Password Simples ou Sem Autenticação.",
                "A. Password Simples - Indique a Senha para Autenticação (8-16 caracteres alfabéticos, números e _).",
                "B. Sem Autenticação - Os clientes podem aceder à rede sem qualquer Autenticação.",
                "3. Selecione 1 Hora, 2 Horas, 4 Horas, 8 Horas ou Sempre para especificar o período de utilização.",
                "4. (Opcional) Ative o Redireccionamento e introduza o URL de redireccionamento. Desta forma, qualquer Cliente autenticado será redirecionado para o URL especificado.",
                "5. (Opcional) Poderá ainda personalizar a página de Login.",
                "A. Titulo do Portal - Até 31 caracteres.",
                "B. Termos de Utilização - Até 1023 caracteres.",
                "C. Imagem logotipo - Carregue uma imagem JPG ou PNG (inferior a 100KB) ou personalize o logotipo.",
                "D. Imagem de fundo - Carregue uma imagem JPG ou PNG (inferior a 2MB) para personalizar a imagem de fundo do Portal.",
                "6. Clique em Guardar."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Senha",
                           content: "Crie uma palavra-passe entre 8 e 63 caracteres ASCII, ou entre 8 e 64 caracteres hexadecimais (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Senha",
                           content: "Utilize ou a senha gerada aleatoriamente ou crie uma senha entre 8 a 63 caracteres ASCII ou entre 8 e 64 caracteres hexadecimais (0-9, a-f, A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Application Layer Gateway) permite a personalização de filtros de passagem NAT (Network Address Translation) para serem associados à porta de Gateway, suportando assim a tradução de endereços e portas de certas camadas de aplicações e protocolos de \"controlo / dados\": FTP, TFTP, H323 etc. É recomendada a ativação de ALG ."
                       } ,{                      
                           type: "name",
                           title: "Ativar FTP ALG",
                           content: "Se selecionado, permite a clientes e servidores FTP (File Transfer Protocol) a transferência de dados via NAT."
                       } ,{                      
                           type: "name",
                           title: "Ativar TFTP ALG",
                           content: "Se selecionado, permite a clientes e servidores TFTP (Trivial File Transfer Protocol) a transferência de dados via NAT."
                       } ,{                      
                           type: "name",
                           title: "Ativar H323 ALG",
                           content: "Se selecionado, permite que clientes Microsoft NetMeeting comuniquem via NAT."
                       } ,{                      
                           type: "name",
                           title: "Ativar RTSP ALG",
                           content: "Se selecionado, permite aos clientes do media player comunicar com servidores de streaming multimédia via NAT."
                       } ,{                      
                           type: "name",
                           title: "Ativar o SIP ALG",
                           content: "Se selecionado, permite que os clientes comuniquem com servidores SIP (Session Initiation Protocol) via NAT."
                       } ,{                      
                           type: "name",
                           title: "Ativar Passagem de Tráfego PPTP",
                           content: "Se selecionado, permite que sessões Ponto-a-Ponto sejam encapsuladas através de uma rede IP e passem pelo Router."
                       } ,{                      
                           type: "name",
                           title: "Ativar Passagem de Tráfego L2TP",
                           content: "Se selecionado, permite que sessões L2 Ponto-a-Ponto sejam encapsuladas através de uma rede IP e passem pelo Router."
                       } ,{                      
                           type: "name",
                           title: "Ativar Passagem de Tráfego IPSec",
                           content: "Se selecionada, permite que pacotes IPSec (Internet Protocol security) possam ser encapsulados através de uma rede IP e passem pelo Router. IPSec usa serviços de segurança encriptados para garantir comunicações privadas e seguras através de redes IP."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Servidores Virtuais",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Servidores virtuais são usados para configurar serviços públicos em sua rede local. Um servidor virtual é definido como uma porta externa, e todas as solicitações da Internet para esta porta externa serão redirecionadas para um computador designado, que deve ser configurado com um endereço IP estático ou reservado.",
                "Quando configura um servidor na sua rede local e pretende partilhar o mesmo na Internet, a funcionalidade de Servidor Virtual pode-o a ajudar a tornar o serviço disponível a partir da Internet."]
} ,{                      
                           type: "paragraph",
                           content: "A tabela apresenta os parâmetros relevantes do servidor virtual."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Serviço",
                           content: "Exibe o nome do servidor virtual."
                       } ,{                      
                           type: "name",
                           title: "Porta Externa",
                           content: "Exibe o número da porta ou um intervalo de portas usadas pelo servidor virtual."
                       } ,{                      
                           type: "name",
                           title: "IP Interno",
                           content: "Mostra o endereço IP do computador que executa o aplicativo de serviço."
                       } ,{                      
                           type: "name",
                           title: "Porta Interna",
                           content: "Mostra o número da porta do computador que executa o aplicativo de serviço."
                       } ,{                      
                           type: "name",
                           title: "Protocolo",
                           content: "Mostra o protocolo usado para o aplicativo de serviço: TCP, UDP, ou ALL (todos os protocolos suportados pelo router)."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Mostra o status atual (ativado ou desativado) da regra especifica de filtragem."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Mostra opções para Modificar ou Apagar a regra correspondente."
                       } ,{                      
                           type: "step",
                           title: "Definir Regra de Servidor Virtual",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Clique em Ver Serviços Existentes para selecionar um serviço da lista e para preencher automaticamente com o número de porta adequado os campos de Porta Externa e Porta Interna. Se o serviço não estiver na lista, digite o número da porta externa (por exemplo, 21) ou um intervalo de portas (por exemplo, 21-25). Deixe a porta interna em branco se é o mesmo que o da porta externa ou digite um número de porta específico (por exemplo, 21) se a porta externa é uma única porta. Digite o endereço IP do computador que executa o aplicativo de serviço no formato decimal com pontos no campo IP Interno.",
                "3. Selecione um protocolo para o aplicativo de serviço: TCP, UDP, ou Tudo a partir da lista Protocolo.",
                "4. Selecione Ativar.",
                "5. Clique em Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
       content: [ 
                "1. Caso pretenda desativar esta entrada, clique no ícone Lâmpada.",
                "2. É recomendado manter as definições padrão da Porta Internet e Protocolo caso não tenha a certeza de qual porta e protocolo deve utilizar.",
                "3. Se o anfitrião local está a alojar mais do que um serviço disponível, terá de criar uma regra para cada serviço. Por favor, não sobreponha o valor da porta Externa."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port Triggering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Port Triggering é usado para encaminhar tráfego de uma determinada porta para um servidor específico na rede."
                       } ,{                      
                           type: "paragraph",
                           content: "A tabela apresenta os parâmetros relevantes do porto triggering."
                       } ,{                      
                           type: "name",
                           title: "Aplicação",
                           content: "Exibe o nome da aplicação"
                       } ,{                      
                           type: "name",
                           title: "Triggering Port",
                           content: "Exibe a porta de saída de tráfego usado para acionar uma regra de filtragem de uma ligação de saída."
                       } ,{                      
                           type: "name",
                           title: "Trigger Protocol",
                           content: "Exibe o protocolo usado para o Triggering Port. TCP, UDP, ou Todos (todos os protocolos suportados pelo Router)."
                       } ,{                      
                           type: "name",
                           title: "Porta Externa",
                           content: "Exibe o intervalo de portas ou porta usada pelo sistema remoto. Uma resposta usando uma destas portas será encaminhada para o PC que acionou esta regra. Pode introduzir no máximo 5 grupos de portas (ou seções portas). Cada grupo de portas devem ser separados por \",\" (vírgula), por exemplo, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Protocolo Externo",
                           content: "Exibe o protocolo utilizado para a Porta de Entrada: TCP, UDP, ou Todos (todos os protocolos suportados pelo Router)."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Mostra o status atual (ativado ou desativado) da regra especifica de filtragem."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Mostra opções para Modificar ou Apagar a regra correspondente."
                       } ,{                      
                           type: "step",
                           title: "Para configurar uma regra de Port Triggering",
       content: [{                      
                           type: "note",
                           title: "Nota",
                           content: "Cada regra só pode ser usada por um dispositivo de cada vez."
                       },
                "1. Clique em Adicionar.",
                "2. Clique em Ver Aplicações Existentes para selecionar um aplicativo da lista para preencher automaticamente os valores predefinidos nos campos apropriados. Se quiser adicionar um aplicativo não listado, digite manualmente Aplicação, Triggering Port, Triggering Protocol, Porta Externa e Protocolo Externo.",
                "3. Selecione Ativar.",
                "4. Clique em Gravar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Caso pretenda desativar esta regra, clique no ícone Lâmpada."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "A função host DMZ (zona desmilitarizada) permite que um host local seja exposto à Internet para um serviço especial, como jogos via Internet ou videoconferências. Basicamente, o DMZ permite que um único computador na LAN possa abrir todos os seus portos. Este computador tem de ser configurado com um endereço IP estático e possuir a função de cliente DHCP desativado."
                       } ,{                      
                           type: "paragraph",
                           content: "Quando a DMZ está ativada, o host DMZ está totalmente exposto à Internet, o que pode trazer alguns riscos de segurança para o computador. Se a DMZ não estiver em uso, por favor desative esta função."
                       } ,{                      
                           type: "step",
                           title: "Para assignar um computador ou servidor para ser um servidor DMZ",
       content: [ 
                "1. Clique em Ativar DMZ.",
                "2. No campo Endereço IP de Dispositivo DMZ, digite o endereço IP do computador local que será configurado como o host DMZ.",
                "3. Clique em Guardar."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Por defeito, a função UPnP (Universal Plug-and-Play) está ativa para permitir que dispositivos, como computadores e aplicações que utilizam a Internet, possam-se descobrir e comunicar entre si automaticamente."
                       } ,{                      
                           type: "paragraph",
                           content: "Pode necessitar de ativar o UPnP, caso pretenda usar aplicações como jogos multiplayer, ligações peer-to-peer, comunicação em tempo real (tal como VoIP ou teleVoIP) ou assistência remota, etc."
                       } ,{                      
                           type: "name",
                           title: "Lista de Serviços UPnP",
                           content: "A Lista de Serviços UPnP exibe as informações UPnP do(s) anfitrião(ões) local."
                       }]
},
       MODEM :{ 
               TITLE:"Ajuda 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Modem USB 3G/4G",
                           content: "Exibe o estado do modem USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Utilizar os parâmetros de Auto-identificação",
                           content: "Esta funcionalidade está ativa por defeito. Quando ativa, o Router pode identificar o ISP conforme o cartão SIM/UIM e preenche os parâmetros automaticamente. Se a identificação falhar, por favor selecione a região e o ISP móvel manualmente."
                       } ,{                      
                           type: "name",
                           title: "Região",
                           content: "Automaticamente seleciona e exibe a região quando o modem USB e cartão SIM são identificados com sucesso. Caso contrário, selecione a região a partir da lista."
                       } ,{                      
                           type: "name",
                           title: "ISP Móvel",
                           content: "Exibe o ISP (Internet Service Provider - Fornecedor de serviços de Internet) da rede 3G/4G. Se não for detetado automaticamente, selecione o ISP a partir do menu suspenso. O Número de Marcação e o APN predefinidos serão preenchidos automaticamente em conformidade."
                       } ,{                      
                           type: "name",
                           title: "PIN SIM/UIM",
                           content: "Se a proteção SIM/UIM estiver ativa, digite o código PIN. A proteção SIM / UIM está desativada por defeito. Por favor, tenha em atenção que caso digite o código PIN incorretamente 3 vezes, o cartão SIM / UIM será bloqueado automaticamente. Só pode desbloqueá-lo novamente digitando o código PUK no seu PC / Portátil."
                       } ,{                      
                           type: "name",
                           title: "Mensagem",
                           content: "Exibe a informação do PIN do cartão SIM / UIM se a proteção de PIN estiver ativada."
                       } ,{                      
                           type: "name",
                           title: "Definições Número a Marcar,APN,Nome de Utilizador/Palavra-passe",
                           content: "Se o ISP não estiver listado na lista de <strong> ISP Móveis </strong>, selecione esta opção e digite o Dial Number, APN (Access Point Name), Nome de utilizador e senha fornecidos pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Número a Marcar",
                           content: "Digite o Dial Number fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Digite o APN (Access Point Name) fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Utilizador/Senha",
                           content: "Digite o nome de utilizador e senha fornecidos pelo ISP. Estes campos são sensíveis a letras maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ligar a Pedido",
                           content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente a Internet."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Ocasionalmente, a ligação não pode ser interrompida, apesare de especificar o Tempo máximo de inatividade, porque algumas aplicações continua, a aceder à Internet no back-end."
                       } ,{                      
                           type: "name",
                           title: "Ligar Automaticamente",
                           content: "Neste modo, a ligação à Internet religa-se automaticamente sempre que ela fica desligada."
                       } ,{                      
                           type: "name",
                           title: "Ligar Manualmente",
                           content: "Neste modo, pode clicar no botão Ligar ou Desligar para controlar manualmente a ligação à Internet. Este modo também suporta a função Tempo máximo de inatividade. Introduza um tempo máximo (em minutos), a ligação à Internet pode estar inativa antes de ser encerrada no campo Tempo máximo de inatividade. O valor predefinido é de 15 minutos. Se quiser que a ligação à Internet permaneça ativa durante todo o tempo, introduza o valor 0 (zero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Ocasionalmente, a ligação não pode ser interrompida, apesare de especificar o Tempo máximo de inatividade, porque algumas aplicações continua, a aceder à Internet no back-end."
                       } ,{                      
                           type: "paragraph",
                           content: "Clique no botão Guardar para guardar as configurações."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Ajuda das Definições Avançadas 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Modem USB 3G/4G",
                           content: "Exibe o estado do modem USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Utilizar os parâmetros de Auto-identificação",
                           content: "Esta funcionalidade está ativa por defeito. Quando ativa, o Router pode identificar o ISP conforme o cartão SIM/UIM e preenche os parâmetros automaticamente. Se a identificação falhar, por favor selecione a região e o ISP móvel manualmente."
                       } ,{                      
                           type: "name",
                           title: "Região",
                           content: "Seleciona automaticamente e exibe a região quando o modem USB e cartão SIM são identificados com sucesso. Caso contrário, selecione a região a partir da lista."
                       } ,{                      
                           type: "name",
                           title: "ISP Móvel",
                           content: "Exibe o ISP (Internet Service Provider - Fornecedor de serviços de Internet) da rede 3G/4G. Se não for detetado automaticamente, selecione o ISP a partir do menu suspenso. O Número de Marcação e o APN predefinidos serão preenchidos automaticamente em conformidade."
                       } ,{                      
                           type: "name",
                           title: "PIN SIM/UIM",
                           content: "Se a proteção SIM/UIM estiver ativa, digite o código PIN. A proteção SIM / UIM está desativada por defeito. Por favor, tenha em atenção que caso digite o código PIN incorretamente 3 vezes, o cartão SIM / UIM será bloqueado automaticamente. Só pode desbloqueá-lo novamente digitando o código PUK no seu PC / Portátil."
                       } ,{                      
                           type: "name",
                           title: "Mensagem",
                           content: "Exibe a informação do PIN do cartão SIM / UIM se a proteção de PIN estiver ativada."
                       } ,{                      
                           type: "name",
                           title: "Definições Número a Marcar,APN,Nome de Utilizador/Palavra-passe",
                           content: "Se o ISP não estiver listado na lista de <strong> ISP Móveis </strong>, selecione esta opção e digite o Dial Number, APN (Access Point Name), Nome de utilizador e senha fornecidos pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Número a Marcar",
                           content: "Digite o Dial Number fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Digite o APN (Access Point Name) fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Utilizador/Senha",
                           content: "Digite o nome de utilizador e senha fornecidos pelo ISP. Estes campos são sensíveis a letras maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ligar a Pedido",
                           content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente a Internet."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Ocasionalmente, a ligação não pode ser interrompida, apesare de especificar o Tempo máximo de inatividade, porque algumas aplicações continua, a aceder à Internet no back-end."
                       } ,{                      
                           type: "name",
                           title: "Ligar Automaticamente",
                           content: "Neste modo, a ligação à Internet religa-se automaticamente sempre que ela fica desligada."
                       } ,{                      
                           type: "name",
                           title: "Ligar Manualmente",
                           content: "Neste modo, pode clicar no botão Ligar ou Desligar para controlar manualmente a ligação à Internet. Este modo também suporta a função Tempo máximo de inatividade. Introduza um tempo máximo (em minutos), a ligação à Internet pode estar inativa antes de ser encerrada no campo Tempo máximo de inatividade. O valor predefinido é de 15 minutos. Se quiser que a ligação à Internet permaneça ativa durante todo o tempo, introduza o valor 0 (zero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Ocasionalmente, a ligação não pode ser interrompida, apesare de especificar o Tempo máximo de inatividade, porque algumas aplicações continua, a aceder à Internet no back-end."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Autenticação",
                           content: "Selecione um tipo de autenticação. Por defeito é Auto. Alguns ISPs requerem um tipo específico de autenticação, por favor confirme com o ISP ou mantenha as configurações predefinidas."
                       } ,{                      
                           type: "name",
                           title: "Auto",
                           content: "Se selecionado o modo Auto (por defeito), o router determina automaticamente o tipo de autenticação usada pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Se PAP (Password Authentication Protocol - Protocolo de Autenticação da Palavra-passe), o router autentica com o ponto usando dois handshake. Selecione esta opção se o ISP exigir este tipo de autenticação."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Se CHAP (Challenge Handshake Authentication Protocolo de autenticação Challenge Handshake), o router autentica com o com o elemento de rede usando três handshake e valida periodicamente a identidade do ponto. Selecione esta opção se o ISP exigir este tipo de autenticação."
                       } ,{                      
                           type: "name",
                           title: "Tamanho MTU",
                           content: "O tamanho da MTU predefinida (Unidade Máxima de Transmissão) é de 1480 bytes. Não altere, a menos que exigido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Usar os Seguintes Endereços DNS",
                           content: "Se o seu ISP fornece-lhe os endereços IP do servidor de DNS, selecione esta opção e insira os endereços IP do <strong> DNS primário </strong> e DNS secundário (opcional). Caso contrário, os servidores DNS serão atribuídos automaticamente pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "DNS Primário",
                           content: "Digite o endereço IP de DNS em formato decimal separado por pontos, fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "DSN Secundário",
                           content: "(Opcional) Introduza outro endereço IP de DNS em notação decimal separado por pontos, fornecido pelo ISP."
                       } ,{                      
                           type: "paragraph",
                           content: "Clique no botão <strong> Guardar </strong> para guardar as configurações."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Definições de Dispositivo",
               CONTENT: [{
                           type: "paragraph",
                           content: "A página de Definições de Dispositivo mostra a informação relativa a qualquer dispositivo de armazenamento USB conectado via porta USB."
                       } ,{                      
                           type: "name",
                           title: "Examinar",
                           content: "Normalmente, o Router deteta automaticamente qualquer dispositivo recentemente conectado. Se tal não suceder, clique no botão Examinar para procura qualquer novo dispositivo conectado e refrescar a página com informações atualizadas."
                       } ,{                      
                           type: "name",
                           title: "Volume",
                           content: "Mostra o nome do volume USB."
                       } ,{                      
                           type: "name",
                           title: "Capacidade",
                           content: "Mostra a capacidade de armazenamento total do dispositivo USB."
                       } ,{                      
                           type: "name",
                           title: "Espaço Livre",
                           content: "Mostra o espaço de armazenamento atualmente disponível."
                       } ,{                      
                           type: "name",
                           title: "Remover em Segurança",
                           content: "Clique nesse botão para desmontar de forma segura o dispositivo de armazenamento USB antes de desconectá-lo fisicamente da porta USB do router."
                       } ,{                      
                           type: "paragraph",
                           content: "O botão para Remover em Segurança só aparece quando o dispositivo de armazenamento USB é conectado ao Router. Quando o volume atual estiver ocupado, não será possível remove-lo."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Esta opção só aparece quando há um dispositivo de armazenamento USB conectado ao router. Selecione para ativar a partilha do conteúdo do dispositivo USB."
                       } ,{                      
                           type: "step",
                           title: "Configurar o Servidor de Ficheiros",
       content: [ 
                "1. Conecte o dispositivo de armazenamento USB à porta USB do router usando um cabo USB.",
                "2. O dispositivo USB conectado deve ser automaticamente detetado pelo Router e exibidas as informações respetivas na seção Definições de Dispositivo. Se não, clique em Examinar.",
                "3. Selecione Ativar para ativar a partilha de ficheiros."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Conta de Partilha",
               CONTENT: [{
                           type: "name",
                           title: "Conta",
                           content: "Pode selecionar o uso de conta predefinida para aceder aos arquivos e pastas partilhadas ou Criar Nova Conta, seguindo os próximos passos para criar uma nova conta de utilizador."
                       } ,{                      
                           type: "name",
                           title: "Utilizador/Senha",
                           content: "Introduza um nome de utilizador entre 1 e 15 caracteres alfanuméricos ou uma sub cadeia de linha de caracteres e uma palavra-passe entre 1 e 15 caracteres ASCII. Esses campos são sensíveis a maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Confirmar Senha",
                           content: "Digite novamente a senha para confirmar que não há erro de digitação. Este campo também é sensível a caracteres em maiúsculas e minúsculas."
                       } ,{                      
                           type: "paragraph",
                           content: "Clique em Guardar para salvar todas as configurações."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Definições de Partilha",
               CONTENT: [{
                           type: "name",
                           title: "Nome de Servidor de Rede/Media",
                           content: "Mostra o nome usado para aceder ao dispositivo de armazenamento USB conectado."
                       } ,{                      
                           type: "name",
                           title: "Ativar",
                           content: "Selecione para ativar o método de acesso."
                       } ,{                      
                           type: "name",
                           title: "Método de Acesso",
                           content: "Existem três métodos para permitir o acesso aos dispositivos de armazenamento USB conectados. Pode escolher um ou mais métodos de acesso, selecionando a caixa de seleção correspondente.",
       children: [{                      
                           type: "name",
                           title: "Vizinhança de Rede",
                           content: "Quando ativo, os utilizadores da rede podem aceder ao dispositivo de armazenamento USB utilizando um endereço IP para o efeito (por exemplo, \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Quando ativo, os clientes FTP na rede local podem aceder ao dispositivo de armazenamento USB utilizando o endereço IP atribuído, seguido pelo número da porta do servidor FTP (por exemplo ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (Via Internet)",
                           content: "Se ativado, os utilizadores podem aceder remotamente à unidade de armazenamento USB por FTP a partir da Internet. Esta opção permite tanto o download como o upload de ficheiros. Para alterar o número da porta do servidor de FTP, digite um número de porta e clique em Gravar para guardar e ativar as alterações."
                       }]
} ,{                      
                           type: "name",
                           title: "Ligação",
                           content: "Mostra o endereço usado para aceder ao dispositivo de armazenamento USB partilhado."
                       } ,{                      
                           type: "name",
                           title: "Porta",
                           content: "Exibe o número da porta do servidor de FTP. Use o valor predefinido 21 ou um valor entre 1024 e 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Clique em Guardar para salvar todas as configurações."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Partilha de Pastas",
               CONTENT: [{
                           type: "name",
                           title: "Partilhar tudo",
                           content: "Mude para Ligado para partilhar todas as pastas e ficheiros ou mantenha Desligado para partilhar somente pastas especificas."
                       } ,{                      
                           type: "name",
                           title: "Ativar Autenticação",
                           content: "É altamente recomendável ativar a autenticação, para exigir que os utilizadores insiram um nome de utilizador e senha válidos para acederem às pastas partilhadas."
                       } ,{                      
                           type: "name",
                           title: "Nome da Pasta",
                           content: "Mostra o nome da pasta partilhada."
                       } ,{                      
                           type: "name",
                           title: "Caminho para Pasta",
                           content: "Mostra o caminho para a pasta partilhada."
                       } ,{                      
                           type: "name",
                           title: "Partilha de Média",
                           content: "Indica se a pasta partilhada permite ou não a partilha de conteúdos multimédia."
                       } ,{                      
                           type: "name",
                           title: "Nome de Volume",
                           content: "Exibe o nome do volume partilhado."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Mostra o estado da pasta partilhada pelo indicador tipo lâmpada. "
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Mostra opções para Modificar ou Apagar a pasta partilhada correspondente."
                       } ,{                      
                           type: "name",
                           title: "Procurar",
                           content: "Clique para procurar uma pasta partilhada."
                       } ,{                      
                           type: "name",
                           title: "Permitir Acesso da Rede de Convidados",
                           content: "Selecione para permitir que clientes da Rede de Convidados possam aceder às pastas partilhadas."
                       } ,{                      
                           type: "name",
                           title: "Ativar Autenticação",
                           content: "Selecionar para obrigar os utilizadores a terem um nome de utilizador e senha válidos para acederem às pastas partilhadas."
                       } ,{                      
                           type: "name",
                           title: "Ativar Acesso de Escrita",
                           content: "Selecione para permitir que os utilizadores façam alterações no conteúdo da pasta."
                       } ,{                      
                           type: "name",
                           title: "Ativar a Partilha de Média",
                           content: "Selecione para ativar a partilha de Média."
                       } ,{                      
                           type: "name",
                           title: "Atualizar",
                           content: "Clique para atualizar a lista de pastas partilhadas."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Servidor de Impressão",
               CONTENT: [{
                           type: "name",
                           title: "Servidor de Impressão",
                           content: "Ativar a função de Servidor de Impressão."
                       } ,{                      
                           type: "name",
                           title: "Nome da Impressora",
                           content: "Exibe o nome da impressora ligada ao router."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "A funcionalidade de Time Machine efectua uma cópia de segurança de todos os seus ficheiros do seu computador MAC para um dispositivo de armazenamento USB ligado ao seu Router."
                       } ,{                      
                           type: "name",
                           title: "Ativo",
                           content: "Selecione esta caixa de seleção para ativar a funcionalidade de Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Cópia de Segurança do Disco",
                           content: "Selecione uma localização para as cópias de segurança de Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Limite de tamanho para Cópias de Segurança",
                           content: "Defina a quantidade de espaço em disco que pode ser utilizado para as cópias de segurança de Time Machine. 0 significa espaço ilimitado."
                       } ,{                      
                           type: "name",
                           title: "Gravar",
                           content: "Clique para guardar as configurações."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Download Offline",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com a opção de Download-Offline ativado, o router pode descarregar ficheiros sem que necessite de manter o computador ligado durante o processo."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Ativar a função de Download Offline."
                       } ,{                      
                           type: "name",
                           title: "Caminho para Pasta",
                           content: "Selecione uma diretoria para armazenar os Downloads.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "Não altere a diretoria ou remova o dispositivo de armazenamento USB durante o processo de upload e download de ficheiros; caso contrário, poderão ocorrer erros fatais."
                       }]
} ,{                      
                           type: "name",
                           title: "Agendamento",
                           content: "Selecione a caixa de seleção para habilitar o Agendamento que lhe permite específicar o(s) período(s) de tempo para download / upload de ficheiros."
                       } ,{                      
                           type: "name",
                           title: "Manter o Upload após a tarefa terminar",
                           content: "Selecione a opção para manter o upload de ficheiros de Downloads completos para outros pares."
                       } ,{                      
                           type: "name",
                           title: "Número máximo de downloads ativos",
                           content: "Introduzir um valor entre 1 e 10 para definir o número máximo de transferências activas. O valor padrão é 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Descargas",
               CONTENT: [{
                           type: "note",
                           title: "Ficheiro",
                           content: "Exibe o nome e o tipo do arquivo de download."
                       } ,{                      
                           type: "note",
                           title: "Velocidade",
                           content: "Exibe a velocidade atual de Download (ou upload)."
                       } ,{                      
                           type: "note",
                           title: "Completos",
                           content: "Exibe o progresso do download."
                       } ,{                      
                           type: "note",
                           title: "Tempo restante",
                           content: "Exibe o tempo restante do download."
                       } ,{                      
                           type: "note",
                           title: "Pares conectados",
                           content: "Exibe o número de pares conectados no download."
                       } ,{                      
                           type: "note",
                           title: "Estado",
                           content: "Exibe o status atual do download (download, a aguardar, a semear, em pausa, concluído ou erro)."
                       } ,{                      
                           type: "name",
                           title: "Para adicionar novo download",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Selecione o Download de origem, Torrent a partir do PC, Torrente de USB ou URL.",
                "3. Selecione a localização do Torrent BT, ou introduza o URL do FTP, HTTP e aMule.",
                "4. Clique em Gravar.",
                "5. Para o serviço aMule, especifique o endereço IP do servidor aMule e porta em Avançado > Servidor aMule."]
}]
} ,{                      
                           type: "name",
                           title: "Para eliminar downloads",
                           content: "Selecione a opção correspondente do(s) download (s) que deseja eliminar e clique em Eliminar na parte superior da tabela."
                       } ,{                      
                           type: "name",
                           title: "Para suspender downloads",
                           content: "Clique na caixa correspondente do(s) download(s) que quiser suspender, e clique em Pausa na parte superior da tabela."
                       } ,{                      
                           type: "name",
                           title: "Para continuar um download",
                           content: "Clique na caixa correspondente do download(s) que deseja retomar e clique em Retomar na parte superior da tabela."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Avançado",
               CONTENT: [{
                           type: "name",
                           title: "Limites de Velocidade",
                           content: "Especifique a velocidade máxima de Download e Upload para a ligação à Internet."
                       } ,{                      
                           type: "name",
                           title: "Velocidade máxima de Download",
                           content: "Insira um valor entre 1 e 100000 Kb / s para definir a velocidade máxima de download. O valor padrão é 1024."
                       } ,{                      
                           type: "name",
                           title: "Velocidade máxima de Upload",
                           content: "Insira um valor entre 1 e 100000 Kb/s para definir a velocidade máxima de upload. O valor padrão é 512."
                       } ,{                      
                           type: "name",
                           title: "Numero de Ligações",
                           content: "Especifique o número máximo de ligações."
                       } ,{                      
                           type: "name",
                           title: "Número Global Máximo de Ligações",
                           content: "Insira um valor entre 1 e 200 para definir o número máximo global de ligações. O valor padrão é 100."
                       } ,{                      
                           type: "name",
                           title: "Número Máximo de Pares conectados por Torrent",
                           content: "Insira um valor entre 1 e 100 para definir o número máximo de peers conectados por torrent. O valor padrão é 50."
                       } ,{                      
                           type: "name",
                           title: "Ativar Rede DHT",
                           content: "Ative esse recurso para melhorar a eficiência de procura de pares, melhorando assim a sua velocidade de download."
                       } ,{                      
                           type: "name",
                           title: "Ativar Troca de Pares",
                           content: "Ativar esta funcionalidade para melhorar a eficiência de comunicação"
                       } ,{                      
                           type: "name",
                           title: "Ativar Protocolo de Encriptação BitTorrent",
                           content: "Ative esta funcionalidade para aumentar a privacidade e confidencialidade durante o processo de transmissão de dados."
                       } ,{                      
                           type: "name",
                           title: "Servidor aMule",
                           content: "Digite o endereço IP e a porta do servidor aMule. O download aMule funciona apenas quando o Router está ligado ao servidor."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Controlo Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com o Controlo Parental, poderá bloquear Websites inapropriados, explícitos ou com conteúdos maliciosos. Poderá restringir o acesso a determinados períodos do dia (por exemplo Facebook ou Youtube durante o período de trabalho)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Dispositivos sob Controlo Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabela exibe as informações e configurações dos dispositivos que estão atualmente restritos pelo Controlo Parental."
                       } ,{                      
                           type: "step",
                           title: "Para restringir um novo dispositivo cliente",
       content: [ 
                "1. Ative o Controlo Parental.",
                "2. Clique em Adicionar.",
                "3. Clique em Procurar para escolher um dispositivo conectado atualmente na Lista de Dispositivos de Acesso; ou introduza o nome do dispositivo e o endereço MAC manualmente para adicionar um dispositivo que não esteja ligado.",
                "4. Clique no ícone de Tempo Efetivo para específicar um período de tempo durante o qual a restrição se aplica.",
                "5. Digite uma breve descrição no campo Descrição. Este campo é opcional.",
                "6. Selecione Ativar esta Entrada.",
                "7. Clique em Gravar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Caso pretenda desativar esta entrada, clique no ícone Lâmpada."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Restrição de Conteúdos",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Restrição de Conteúdos permite-lhe restringir o acesso a sites específicos usando palavras-chave e nomes de domínio. Os dispositivos de clientes sob controlo Parental podem ou não aceder a determinados sites, dependendo da política de restrição que selecionar."
                       } ,{                      
                           type: "step",
                           title: "Especificar o conteúdo a aceder",
       content: [ 
                "1. Ative a Restrição de conteúdos.",
                "2. Selecione a Politica de restrições de acordo com as necessidades:",
                "A. Se quiser que os dispositivos controlados tenham acesso a todos os sites, exceto a determinados utilizadores, selecione a Lista Negra.",
                "B. Caso pretenda que os dispositivos controlados só tenham acesso a determinados sites, selecione Lista Branca.",
                "3. Clique em Adicionar uma nova palavra-chave para adicionar um endereço da Web (por exemplo, wikipedia) ou nome de domínio para a lista negra ou lista branca.",
                "4. Clique em Gravar."]
}]
},
       PARENTAL_CONTROL_V2 :{ 
               TITLE:"Controlo Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com perfis de usuário, filtro de conteúdos e limites de acesso, o Controle Parental fornece a cada membro da sua família acesso personalizado e apropriado à Internet."
                       } ,{                      
                           type: "step",
                           title: "Para aplicar o Controlo Parental a um novo dispositivo",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Introduza o nome para o perfil e clique em \"+\" para adicionar dispositivos ao perfil.",
                "3. Personalize o conteúdo bloqueado de acordo com suas necessidades. Todos os sites que contenham as palavras-chave serão bloqueados.",
                "4. Se pretende restringir o tempo total deste perfil pode despender online, ative e especifique o limite de tempo. Pode também usar o filtro Hora de dormir para definir um período de tempo diário, durante o qual os dispositivos desse perfil não podem usar a Internet.",
                "5. Clique em Guardar."]
} ,{                      
                           type: "step",
                           title: "Para visualizar o histórico detalhado dos acessos à Internet de um determinado perfil",
       content: [ 
                "1. Na coluna de Critérios, clique no botão correspondente.",
                "2. Se pretender visualizar mais registros, clique no botão de Histórico <span class=\"ptl-ctr-help-icon history\"></span> .",
                "3. Se pretender bloquear ou desbloquear websites clique nos botões <span class=\"ptl-ctr-help-icon block\"></span> ou <span class=\"ptl-ctr-help-icon unblock\"></span> ."]
} ,{                      
                           type: "step",
                           title: "Para desativar ou ativar o acesso à Internet instantaneamente.",
       content: [ 
                "Na coluna de Acesso à Internet, clique em <span class=\"ptl-ctr-help-icon stop\"></span> para impedir que os dispositivos do perfil correspondente acedam à Internet e em <span class=\"ptl-ctr-help-icon enable\"></span> para permitir o acesso novamente."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A funcionalidade de QoS (Quality of Service) ajuda a prioritizar o tráfego da Internet com base nas necessidades de qualidade de serviço. Poderá específicar o nível de prioridade para um dispositivo, uma porta física, ou uma aplicação na lista de regras de QoS."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Nota",
                           content: "Se NAT Boost está ativado, a QoS deve estar desativada."
                       } ,{                      
                           type: "name",
                           title: "Largura de Banda de Upload",
                           content: "Digite a largura de banda máxima de upload fornecida pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Largura de banda de Download",
                           content: "Digite a largura de banda máxima de download fornecida pelo ISP."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Avançado",
               CONTENT: [{
                           type: "name",
                           title: "Prioridade Alta/Média/Baixa",
                           content: "Especifique a percentagem para o tráfego Alto/Médio/Baixo.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "O acumulado máximo (percentagem) de todas as prioridades é 1"
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"Lista de Regras QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Aqui poderá adicionar regras de QoS detalhadas para proritizar o tráfego da Internet."
                       } ,{                      
                           type: "step",
                           title: "Configurar uma regra de QoS",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Selecione um tipo de prioridade para adicionar a regra QoS.",
                "Por Dispositivo - Clique em Procurar para selecionar o dispositivo desejado, ou inserir manualmente um nome de dispositivo e o seu endereço MAC.",
                "Por aplicação - Selecione o aplicativo desejado ou personalize um aplicativo configurando o nome, protocolo e porta de destino (1-65535). Pode inserir uma única porta ou várias portas ou intervalo de portas, separados por vírgulas (por exemplo 21,36-105,111).",
                "Por porta física - Seleccione a porta desejada.",
                "3. Clique em Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Pode arrastar uma regra entre as diferentes listas de prioridade para alterar a sua prioridade."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Atualização da Base de Dados",
               CONTENT: [{
                           type: "paragraph",
                           content: "Será lançada a versão mais recente da Base de Dados em www.tp-link.com. Poderá descarregar e atualizar a base de dados do router para estender as aplicações suportadas."
                       } ,{                      
                           type: "name",
                           title: "Novo Ficheiro de Base de Dados",
                           content: "Clique em Procurar para localizar o arquivo de base de dados mais recente. Selecione-o e clique em Atualizar para atualizar a base de dados para a versão mais recente."
                       }]
},
       QOS_V2 :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Qualidade de Serviço) permite-lhe priorizar o tráfego de internet de dispositivos específicos para garantir uma ligação mais rápida quando mais precisa."
                       }]
},
       QOS_GLOBAL_SETTINGS :{ 
               TITLE:"Definições Globais",
               CONTENT: [{
                           type: "paragraph",
                           content: "Largura de Banda de Upload - Digite a largura de banda máxima de upload fornecida pelo seu ISP."
                       } ,{                      
                           type: "paragraph",
                           content: "Largura de Bande de Download - Digite a largura de banda de download máxima fornecida pelo seu ISP."
                       }]
},
       QOS_DEVICE_PRIORITY :{ 
               TITLE:"Prioridade de Dispositivos",
               CONTENT: [{
                           type: "paragraph",
                           content: "Escolha o(s) dispositivo(s) que deseja definir a prioridade e o período tempo em que a mesma será aplicada."
                       } ,{                      
                           type: "step",
                           title: "Definir a prioridade do dispositivo",
       content: [ 
                "1. Localize o dispositivo que pretende definiir a prioridade na lista e ative em Prioridade.",
                "2. Selecione o período tempo em que a prioridade será aplicada na coluna Temporização."]
}]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "name",
                           title: "SPI Firewall",
                           content: "SPI (Stateful Packet Inspection) Firewall impede ciberataques e valida o tráfego que o router está a transmitir em função do protocolo de rede. Esta funcionalidade está ativa por defeito."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"Proteção DoS",
               CONTENT: [{
                           type: "name",
                           title: "Proteção DoS",
                           content: "A Proteção DoS (Denial of Service) protege a LAN contra ataques de negação de serviço ao evitar que a rede fique saturada com pedidos do servidor. Poderá filtrar os três seguintes tipos de ataques de acordo com as necessidades. Existem quatro níveis para cada filtragem:",
       children: [{                      
                           type: "name",
                           title: "Desligado",
                           content: "Sem proteção."
                       } ,{                      
                           type: "name",
                           title: "Baixo",
                           content: "Baixo nível de proteção e baixo impacto sobre o desempenho do router."
                       } ,{                      
                           type: "name",
                           title: "Médio",
                           content: "Nível moderado de proteção e impacto semi-perceptível no desempenho do router."
                       } ,{                      
                           type: "name",
                           title: "Elevado",
                           content: "Alto nível de proteção mas impacto significativo no desempenho do router."
                       }]
} ,{                      
                           type: "name",
                           title: "Filtro de Ataque ICMP-FLOOD",
                           content: "Ative para impedir o ataque de saturação ICMP (Internet Control Message Protocol)."
                       } ,{                      
                           type: "name",
                           title: "Filtro de Ataque UDP-FLOOD",
                           content: "Ative para impedir o ataque de saturação UDP (User Datagram Protocol)."
                       } ,{                      
                           type: "name",
                           title: "Filtro de Ataque TCP-SYN-FLOOD",
                           content: "Ative para impedir ataques de saturação TCP-SYN (Transmission Control Protocol-Sincronizar)."
                       } ,{                      
                           type: "name",
                           title: "Ignorar Pacotes Ping na porta WAN",
                           content: "Ativar para ignorar pacotes ping da porta WAN"
                       } ,{                      
                           type: "name",
                           title: "Proibir pacotes Ping na porta LAN",
                           content: "Ativar para proibir pacotes ping na porta LAN"
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Lista de Dispositivos Bloqueados por DoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabela mostra o endereço IP e o endereço MAC do(s) host(s) DoS bloqueado(s)."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Controlo de Acesso",
               CONTENT: [{
                           type: "paragraph",
                           content: "O Controlo de Acesso é utilizado para permitir ou bloquear dispositivos clientes específicos de aceder à rede. Quando um dispositivo é bloqueado, é incapaz de comunicar com outros dispositivos ou de se conectar à Internet."
                       } ,{                      
                           type: "step",
                           title: "Controlar acessos",
       content: [ 
                "1. Ative o Controlo de Acesso.",
                "2. Caso também pretenda controlar o acesso dos dispositivos ligados na Rede Local, ative a opção de Controlo de dispositivos na rede de Convidados.",
                "3. Selecione um modo de acesso de acordo caso necessite e clique em Guardar:",
                "A. Caso pretenda bloquear o acesso a partir de dispositivos na lista abaixo, selecione a Lista Negra.",
                "B. Caso pretenda permitir o acesso apenas a dispositivos na lista abaixo, selecione Lista Branca.",
                "4. Na secção de Dispositivos na lista Negra ou lista Branca, clique em Adicionar. Insira o Nome do dispositivo e o respetivo endereço MAC. Clique em Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Caso pretenda desativar esta entrada, clique no ícone Lâmpada."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Dispositivos Online",
               CONTENT: [{
                           type: "paragraph",
                           content: "Essa tabela exibe as informações de todos os dispositivos conectados (incluindo os dispositivos conectados à rede de convidados se a opção de controlo da rede de Convidados estiver ativada)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"Vinculo IP&MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vínculo de IP & MAC (também conhecido como ARP Binding) é útil para controlar o acesso de um dispositivo específico na rede LAN por vinculação o conjunto de endereço IP e endereço MAC do dispositivo. O Vínculo de IP e MAC também impede que outros dispositivos possam usasr um endereço IP específico."
                       } ,{                      
                           type: "step",
                           title: "Configurar um dispositivo com vinculo IP & MAC",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Digite o Endereço MAC do dispositivo.",
                "3. Insira um endereço IP que deseja vincular ao endereço MAC acima.",
                "4. Selecione Ativar.",
                "5. Clique em Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
       content: [ 
                "1. Não pode vincular o mesmo endereço IP a mais de um endereço MAC.",
                "2. Caso pretenda desativar esta entrada, clique no ícone Lâmpada."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"Lista ARP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabela mostra o endereço IP e endereço MAC do(s) dispositivo(s) conectado(s) atualmente."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protocol versão 6) é a versão mais recente do protocolo IP (Internet Protocol) e vem eliminar o problema da disponibilidade de endereços IPv4 (Internet Protocol versão 4) livres."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: IP Dinâmico"
                       } ,{                      
                           type: "name",
                           title: "IP Dinâmico",
                           content: "Selecione este tipo se o ISP utiliza a atribuição dinâmica de endereços IPv6."
                       } ,{                      
                           type: "name",
                           title: "Endereço IPv6/DNS Primário/DNS Secundário",
                           content: "Estes parâmetros são fornecidos automaticamente pelo servidor DHCPv6 do seu ISP."
                       } ,{                      
                           type: "name",
                           title: "Renovar",
                           content: "Clique neste botão para obter novos parâmetros IPv6 do servidor DHCPv6 do ISP."
                       } ,{                      
                           type: "name",
                           title: "Libertar",
                           content: "Clique neste botão para liberar todos os endereços IPv6 atribuídos pelo servidor DHCPv6 do ISP."
                       } ,{                      
                           type: "name",
                           title: "Obter Endereço IPv6",
                           content: "Selecione DHCPv6 para obter um endereço IPv6 não-temporário ou SLAAC para obter um endereço IPv6 gerado a partir do pacote de dados de advertisement do Router, de acordo com o ISP."
                       } ,{                      
                           type: "name",
                           title: "Atribuição de Prefixo",
                           content: "Selecione Ativar para obter um prefixo a partir do servidor DHCPv6 do ISP, ou Desativar para atribuir manualmente um endereço de prefixo. Os clientes na LAN irão gerar um endereço IPv6 a partir do prefixo."
                       } ,{                      
                           type: "name",
                           title: "Endereço DNS",
                           content: "Selecione \"Obter dinamicamente a partir do ISP\" ou \"Utilizar o seguinte endereço DNS\". Se a opção \"Utilizar o seguinte endereço DNS\" for selecionada, por favor, inserir manualmente o endereço DNS fornecido pelo seu ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: IP Estático"
                       } ,{                      
                           type: "name",
                           title: "IP Estático",
                           content: "Selecione este tipo se o ISP atribui um endereço estático IPv6."
                       } ,{                      
                           type: "name",
                           title: "Endereço IPv6/Gateway Predefinido/DNS Primário/DNS Secundário",
                           content: "Digite as informações fornecidas pelo seu ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamanho MTU",
                           content: "O valor MTU (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1500 Bytes. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: Túnel 6to4"
                       } ,{                      
                           type: "name",
                           title: "Túnel 6to4",
                           content: "Selecione este tipo no caso de o ISP utilizar uma implantação 6to4 para a atribuição de endereços."
                       } ,{                      
                           type: "name",
                           title: "Endereço IPv4/Máscara de Rede IPv4/Gateway Predefinido IPv4/Endereço de Túnel",
                           content: "Estes parâmetros serão gerados dinamicamente pela informação IPv4 de porta WAN depois de clicar em Ligar."
                       } ,{                      
                           type: "name",
                           title: "Utilizar o seguinte Servidor DNS",
                           content: "Selecione para inserir manualmente o DNS primário e / ou secundário de DNS fornecidos pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Ligar",
                           content: "Clique para conectar-se à Internet."
                       } ,{                      
                           type: "name",
                           title: "Desligar",
                           content: "Clique para desconectar-se da Internet."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Selecione este tipo se o ISP utiliza PPPoEv6, e fornece um nome de utilizador e senha."
                       } ,{                      
                           type: "name",
                           title: "Utilizador/Senha",
                           content: "Digite as informações fornecidas pelo seu ISP."
                       } ,{                      
                           type: "name",
                           title: "Endereço IPv6",
                           content: "Este endereço será atribuído automaticamente pelo servidor DHCPv6 do ISP, após inserir o nome de utilizador e senha e clique em Ligar."
                       } ,{                      
                           type: "name",
                           title: "Obter Endereço IPv6",
                           content: "Selecione DHCPv6 para obter um endereço IPv6 não-temporário ou SLAAC para obter um endereço IPv6 gerado a partir do pacote de dados de advertisement do Router, de acordo com o ISP."
                       } ,{                      
                           type: "name",
                           title: "Atribuição de Prefixo",
                           content: "Selecione Ativar para obter um prefixo a partir do servidor DHCPv6 do ISP, ou Desativar para atribuir manualmente um endereço de prefixo. Os clientes na LAN irão gerar um endereço IPv6 a partir do prefixo."
                       } ,{                      
                           type: "name",
                           title: "Endereço DNS",
                           content: "Selecione Obter dinamicamente a partir de ISP ou Utilize os seguintes endereços de DNS. Se escolher Utilizar os seguintes endereços de DNS, digite manualmente o endereço DNS fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Ligar",
                           content: "Clique para conectar-se à Internet."
                       } ,{                      
                           type: "name",
                           title: "Desligar",
                           content: "Clique para desconectar-se da Internet."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Ligação à Internet: Pass Through (Bridge)"
                       } ,{                      
                           type: "paragraph",
                           content: "Selecione este tipo se o ISP utiliza o modo de rede Pass-Through (Bridge). Nenhuma configuração é necessária para este tipo de ligação."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com exceção para o Tipo de Ligação à Internet via Pass-Through (Bridge), os outros tipos de Ligação à Internet requerem a configuração de IPv6."
                       } ,{                      
                           type: "name",
                           title: "Tipo Assignado",
                           content: "Escolha o mais adequado de acordo com o ISP.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Para atribuir endereços IP automaticamente aos clientes na LAN.",
       children: [{                      
                           type: "name",
                           title: "Prefixo de Endereço",
                           content: "Introduza o prefixo do endereço fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Tempo para Libertar",
                           content: "É o tempo de validade do endereço IP atribuído. Mantenha o valor por defeito de 86400 segundos ou altere-o, se exigido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Endereço",
                           content: "É o endereço IP atribuído automaticamente pelo servidor DHCPv6 do ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC + Stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "Prefixo de Endereço",
                           content: "Introduza o prefixo do endereço fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Endereço",
                           content: "É o endereço IP atribuído automaticamente pelo ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC + RDNSS",
       children: [{                      
                           type: "name",
                           title: "Prefixo de Endereço",
                           content: "Introduza o prefixo do endereço fornecido pelo ISP."
                       } ,{                      
                           type: "name",
                           title: "Endereço",
                           content: "É o endereço IP atribuído automaticamente pelo ISP."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"Clonar MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecione o método de Clonagem MAC Clone conforme seja necessário."
                       } ,{                      
                           type: "name",
                           title: "Não Clonar Endereço MAC",
                           content: "Não altera o endereço MAC predefinido do router, caso o ISP não assigne o endereço IP vinculado a endereço MAC especifico."
                       } ,{                      
                           type: "name",
                           title: "Clonar Endereço MAC deste Computador",
                           content: "Selecione para copiar o endereço MAC do computador que é ligado ao router, caso o ISP vincule o endereço IP atribuído ao endereço MAC deste computador."
                       } ,{                      
                           type: "name",
                           title: "Endereço MAC Personalizado",
                           content: "Digite o endereço MAC manualmente, caso o ISP vincule o endereço IP atribuído a um endereço MAC específico."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Definições de Tempo",
               CONTENT: [{
                           type: "paragraph",
                           content: "As Definições Horárias permitem a configuração da hora do sistema do Router. Uma vez modificada, a hora do sistema será aplicada às funções e configurações baseadas nas definições horárias de sistema, como por exemplo o Controlo Parental."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Poderá ativar a funcionalidade de visualização da Hora do Sistema no formato de 24 horas antes da configuração, que será aplicada às funções e configurações baseadas na Hora do Sistema."
                       } ,{                      
                           type: "title",
                            title: "Hora de Sistema"
                       } ,{                      
                           type: "step",
                           title: "Obter as definições horárias a partir da Internet",
       content: [ 
                "Selecionado por defeito, a opção Obter a partir da Internet, permite-lhe obter a hora do sistema a partir da Internet.",
                "1. Selecione Obter a partir da Internet.",
                "2. Selecione o fuso horário local a partir da lista.",
                "3. No campo Servidor NTP I, digite o endereço IP ou nome de domínio do servidor NTP desejado.",
                "4. No campo Servidor NTP II, digite o endereço IP ou nome de domínio do segundo Servidor NTP. (Opcional)",
                "5. Clique em Obter.",
                "6. Clique em Guardar."]
} ,{                      
                           type: "step",
                           title: "Obter a Hora a partir do PC",
       content: [ 
                "Esta funcionalidade permite-lhe obter a hora do sistema do PC. Por favor, confirme as definições horárias do PC antes da configuração.",
                "Selecione Obter a partir do PC e clique em Guardar."]
} ,{                      
                           type: "step",
                           title: "Configurar as definições horárias manualmente",
       content: [ 
                "Se o dispositivo não pode obter automaticamente as definições horárias a partir da Internet ou PC, poderá configurar manualmente a hora do sistema.",
                "1. Selecione manualmente.",
                "2. Introduza a Data e hora atual.",
                "3. Clique em Guardar."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Horário de Verão",
                           content: "Esta funcionalidade pode sincronizar automaticamente a hora do sistema com o Hora de Verão."
                       } ,{                      
                           type: "step",
                           title: "Para configurar o Horário de Verão",
       content: [ 
                "1. Selecione Ativar Horário de Verão.",
                "2. Especifique um período de tempo do horário de verão no fuso horário local.",
                "3. Clique em Guardar."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnósticos",
               CONTENT: [{
                           type: "paragraph",
                           content: "O router oferece ferramentas de ping e traceroute para ajudar a solucionar problemas de rede."
                       } ,{                      
                           type: "title",
                            title: "Ping & Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "A ferramenta Ping envia pacotes para um endereço IP de destino ou nome de domínio e registra os resultados, tais como o número de pacotes enviados e recebidos, e o tempo de ida e volta."
                       } ,{                      
                           type: "paragraph",
                           content: "A ferramenta Traceroute envia pacotes para um endereço IP de destino ou nome de domínio e exibe o número de saltos e tempo para chegar ao destino."
                       } ,{                      
                           type: "paragraph",
                           content: "Poderá executar o camando ping ou traceroute para um dispositivo local pelo endereço IP ou nome de domínio, como tp-link.com, yahoo.com, etc."
                       } ,{                      
                           type: "step",
                           title: "Para diagnosticar usando Ping",
       content: [ 
                "1. Selecione Ping como a ferramenta de diagnóstico.",
                "2. Digite o endereço IP de destino ou nome de domínio.",
                "3. Clique na seta do ícone para abrir o menu Avançado e específicar a contagem de Ping e tamanho dos pacotes Ping. (Opcional)",
                "4. Clique em Iniciar."]
} ,{                      
                           type: "step",
                           title: "Para diagnosticar usando Traceroute",
       content: [ 
                "1. Selecione Traceroute como a ferramenta de diagnóstico.",
                "2. Digite o endereço IP de destino ou nome de domínio.",
                "3. Clique na seta do ícone para abrir o menu Avançado e especifique o número de saltos (a ser atingido) no campo Traceroute Max TTL (Time to Live). O valor por defeito é de 20. (Opcional)",
                "4. Clique em Iniciar."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Mirroring de Porta"
                       } ,{                      
                           type: "paragraph",
                           content: "Espelhamento de Porta é a funcionalidade que permite o encaminhamento de cópias de pacotes a partir de uma porta específica para uma porta de espelhada. Normalmente, o espelhamento da porta está associado a um dispositivo de diagnóstico de dados, que é usado para analisar os pacotes espelhados para monitorização e resolução de problemas da rede."
                       } ,{                      
                           type: "step",
                           title: "Encaminhar cópias de pacotes para uma designada porta",
       content: [ 
                "1. Ative o Espelhamento de Porta.",
                "2. Selecione as portas desejadas como as portas espelhadas.",
                "3. Selecione uma porta desejada como porta a espelhar.",
                "4. Clique em Gravar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Uma porta não pode ser definida como a porta espelhada e como porta espelho em simultâneo."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Atualização de Firmware",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Atualização de firmware atualiza o firmware do router com novas funcionalidades e correções de bugs. É recomendado atualizar o router com o firmware mais recente para ter o melhor desempenho."
                       } ,{                      
                           type: "step",
                           title: "As indicações seguintes irão ajudá-lo a evitar falhas no processo de atualização:",
       content: [ 
                "Antes de atualizar",
                "1. Certifique-se que possui uma ligação estável entre o Router e o computador. NÃO é recomendada a atualização de firmware via Wi-Fi.",
                "2. Certifique-se que removeu todos os dispositivos USB ligados ao Router.",
                "3. É recomendado efetuar uma cópia de segurança do ficheiro de configuração do Router.",
                "Enquanto estiver a atualizar",
                "Mantenha o Router LIGADO até o processo de configuração ficar completo."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Para atualizar o firmware Online",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Cliquem em Atualizar e confirme quando for solicitado. O Router irá descarregar e atualizar automaticamente para a última versão de firmware. Poderá ainda clicar em Verificar para verificar se existem novas versões de firmware."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Para atualizar o firmware manualmente",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Clique em Suporte na parte inferior da página e descarregue o firmware mais recente para uma pasta do seu computador. Certifique-se de que o ficheiro de firmware que está a descarregar coincide com a versão de hardware do router, como apresentado na página.",
                "2. Clique Procurar e selecione o firmware descarregado.",
                "3. Clique Atualizar."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "A atualização de firmware demora apenas alguns minutos a ficar completa. O Router irá reiniciar automaticamente assim que o processo de atualização terminar."]
}]
},
       BACKUP :{ 
               TITLE:"Cópia de Segurança e Reposição",
               CONTENT: [{
                           type: "paragraph",
                           content: "A funcionalidade de Cópia de Segurança & Reposição permite-lhe fazer uma cópia da configuração atual do Router para recuperação, ou simplesmente repor as configurações de fábrica."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Por favor, não desligue o Router durante o processo de Cópia de Segurança ou Reposição."
                       } ,{                      
                           type: "title",
                           title: "Cópia de Segurança",
                           content: "É altamente recomendado que efetue uma cópia de segurança da configuração atual em caso de necessidade de reposição das configurações."
                       } ,{                      
                           type: "step",
                           title: "Para fazer uma cópia do ficheiro de configuração",
       content: [ 
                "1. Clique em Cópia de Segurança",
                "2. Aguarde até que o Router faça a cópia de segurança das configurações."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Reposição",
                           content: "Poderá repor o Router para um estado anterior a partir de um ficheiro de Cópia de Segurança."
                       } ,{                      
                           type: "step",
                           title: "Para restaurar uma Cópia de Segurança",
       content: [ 
                "1. Clique em Procurar.",
                "2. Localize e selecione o ficheiro de Cópia de Segurança.",
                "3. Clique em Repor."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Repor Configurações de Fábrica",
       content: [ 
                "A reposição dos valores de fábrica irá remover todas as configurações e repor os valores de fábrica. Por exemplo, as configurações de Wi-Fi, Controlo Parental, Informação de rede serão eliminadas.",
                "Após reposição para os valores de fábrica, será necessário definir uma nova palavra-passe para aceder à página de gestão do seu router."]
}]
},
       REBOOT :{ 
               TITLE:"Programação de Reinicialização",
               CONTENT: [{
                           type: "paragraph",
                           content: "A função Programação de Reinicialização, irá limpar a cache e irá melhorar o desempenho do router. Pode reiniciar o roteador manualmente ou configurá-lo para reiniciar regularmente."
                       } ,{                      
                           type: "step",
                           title: "Reiniciar manualmente",
       content: [ 
                "Clique em Reiniciar e aguarde alguns minutos para que o router seja reiniciado."]
} ,{                      
                           type: "step",
                           title: "Para programar o período de reinicialização",
       content: [ 
                "1. Para ativar a Programação de Reinicialização.",
                "2. Defina quando e com que frequência o router irá reiniciar. Especificando os parâmetros nos campos Reboot Time e Repeat.",
                "3. Clique em Guardar."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administração",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Administração permite que gira a palavra-passe de autenticação e as permissões de acesso dos clientes conectados ao router."
                       } ,{                      
                           type: "name",
                           title: "Gestão de Conta",
                           content: "Esta funcionalidade permite-lhe alterar a senha.",
       children: [{                      
                           type: "step",
                           title: "Alterar a senha",
       content: [ 
                "1. Introduza a Senha antiga.",
                "2. Introduza a nova senha.",
                "3. Confirme a nova senha.",
                "4. Clique em Gravar."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Recuperar a Senha",
               CONTENT: [{
                           type: "name",
                           title: "Recuperar a senha predefinida",
                           content: "A Recuperação da Palavra-passe padrão, permite recuperar a palavra-passe de autenticação inicial, sem restaurar o router para suas configurações por defeito de fábrica.",
       children: [{                      
                           type: "step",
                           title: "Alterar a senha",
       content: [ 
                "1. Ativar a funcionalidade de recuperação da senha padrão.",
                "2. No campo de remetente, introduza um endereço de email válido utilizado para enviar o código de verificação para recuperação dos dados de inicio de sessão.",
                "3. No campo de destinatário, introduza um endereço de email válido para receber o código de verificação.",
                "4. Introduza o servidor SMTP da os emails de saída (Remetente).",
                "5. Se o email no campo de remetente requer autenticação, terá de ativar a opção de Autenticação e introduzir o nome de Utilizador (endereço de email) e Senha.",
                "6. Clique em Guardar."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Gestão Local",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta funcionalidade permite que dispositivos locais acedam e façam a gestão do router."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Gestão Local via HTTPS",
                           content: "Ative a Gestão Local via HTTPS se pretender aceder ao router por HTTPS e por HTTP. Mantenha desativado se pretender que o acesso seja feito apenas por HTTP."
                       } ,{                      
                           type: "name",
                           title: "Acesso para Todos Dispositivos Conectados à LAN",
                           content: "Mude para Ligado para ativar a gestão a todos os dispositivos de LAN conectados ou Desligado para permitir a gestão para um dispositivo específico."
                       } ,{                      
                           type: "name",
                           title: "Endereço MAC",
                           content: "Exibe o endereço MAC do dispositivo de acesso limitado."
                       } ,{                      
                           type: "name",
                           title: "Descrição",
                           content: "Exibe a descrição do dispositivo de acesso limitado."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Exibe o status atual do dispositivo de acesso limitado (ativado ou desativado)."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Exibe opções para Modificar e Apagar um dispositivo correspondente da lista."
                       } ,{                      
                           type: "step",
                           title: "Para adicionar um dispositivo à lista",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Clique em Ver Dispositivos Existentes para escolher um dispositivo existente ou digite o endereço MAC de um dispositivo no campo Endereço MAC.",
                "3. Digite uma Descrição para o dispositivo.",
                "4. Selecione Ativar.",
                "5. Clique em OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar ou excluir um dispositivo na lista",
                           content: "Na tabela clique no ícone Editar ou no ícone Lixo que corresponde ao dispositivo que deseja modificar ou apagar."
                       } ,{                      
                           type: "step",
                           title: "Para excluir vários dispositivos",
                           content: "Selecione todos os dispositivos que deseja excluir e clique em Apagar."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Gestão Remota",
               CONTENT: [{
                           type: "name",
                           title: "Gestão Remota",
                           content: "O acesso remoto permite-lhe que os dispositivos remotos possam aceder e gerir o Router.",
       children: [{                      
                           type: "step",
                           title: "Impedir todos os dispositivos remotos de gerir o Router",
                           content: "Selecione Desativar Gestão Remota e clique em Guardar."
                       } ,{                      
                           type: "step",
                           title: "Permitir que todos os dispositivos remotos possam gerir o Router",
       content: [ 
                "1. Selecione Ativar Gestão Remota para TODOS os dispositivos.",
                "2. Introduza o porto de gestão Web (1024-65535 ou 80) através do qual os dispositivos remotos poderão aceder ao Router.",
                "3. Clique em Guardar."]
} ,{                      
                           type: "step",
                           title: "Permitir que um dispositivo remoto em especifico possa gerir o Router",
       content: [ 
                "1. Selecionar Ativar Gestão Remota para um dispositivo especifico.",
                "2. Introduza o porto de gestão Web (1024-65535 ou 80) através do qual o dispositivo remoto poderá aceder ao Router.",
                "3. Introduza o endereço IP para Gestão Remota do dispositivo remoto que irá gerir o Router.",
                "4. Clique em Gravar."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Gestão Remota",
               CONTENT: [{
                           type: "paragraph",
                           content: "A função de Gestão Remota permite aceder e configurar o router remotamente a partir da Internet."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Para configurar a Gestão Remota"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Selecione a checkbox para ativar a função de Gestão Remota."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Mantenha as portas HTTP e HTTPS como default."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Selecione para escolher que dispositivo remoto pode aceder ao router remotamente:",
       children: [{                      
                           type: "name",
                           title: "Todos os Dispositivos",
                           content: "Todos os dispositivos remotos podem aceder ao router."
                       } ,{                      
                           type: "name",
                           title: "Dispositivo Específico",
                           content: "Introduza o endereço IP do dispositivo remoto para aceder ao router."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Clique em Gravar."
                       } ,{                      
                           type: "paragraph",
                           content: "Já pode gerir remotamente o router através do endereço disponível em Endereço Web para Gestão."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Se aparecer um aviso quando visitar remotamente o endereço acima, clique em Confiar (ou opção similar) para continuar."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Quando o modo noturno estiver ativado, os LEDs serão desligados todos os dias durante o período definido, sem afetar o desempenho do Router."
                       } ,{                      
                           type: "step",
                           title: "Ativar o modo Noturno",
       content: [ 
                "1. Selecione Ativar modo noturno.",
                "2. Especifique um intervalo de tempo em que os LEDs serão desligados.",
                "3. Clique em Guardar."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Registo de Eventos do Sistema",
               CONTENT: [{
                           type: "paragraph",
                           content: "O Registo do Sistema mostra as mais recentes atividades do router. A tabela consiste no tipo de conteúdo, o nível e registo dos logs de sistema que podem ser filtrados para facilitar a visualização. Poderá também guardar os Registos do sistema para o computador local ou enviá-los para o e-mail."
                       } ,{                      
                           type: "step",
                           title: "Guardar o Registo de Sistema no computador",
       content: [ 
                "1. Configure o tipo e nível mínimo para filtrar os registros do sistema desejados. A lista Nível está por ordem descendente, com o nível mais baixo listado no fim.",
                "2. Clique em Guardar Log para guardar o ficheiro de Registo de sistema para o computador local."]
} ,{                      
                           type: "step",
                           title: "Receber o registo de sistema via email",
       content: [ 
                "1. Configure o tipo e o nível para filtrar os registos do sistema desejados. A lista de Nível está em ordem descendente, com o nível mais baixo apresentado no fim.",
                "2. Clique em Configurações de e-mail.",
                "3. No campo de Origem, digite um endereço de email válido para ser usado como o e-mail de saída.",
                "4. No campo Destino, introduza um endereço de email válido para ser utilizado como recetor de e-mail.",
                "5. Digite o endereço do servidor SMTP do e-mail de saída (Destino).",
                "Nota: Se o e-mail de saída requerer autenticação, selecione a caixa de Ativar Autenticação e insira o seu nome de utilizador (endereço de e-mail) e senha.",
                "6. Se deseja receber regularmente os Registos de sistema via e-mail, marque a caixa de seleção Email Auto e defina um horário específico (no formato de 24 horas) ou num intervalo de tempo.",
                "Se deseja receber imediatamente os Registos de sistema atual, clique em Enviar Reg Agora.",
                "7. Clique em Gravar."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Monitorização de Tráfego",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe a utilização de tráfego de um dispositivo nos últimos 10 minutos ou de todos os dispositivos nos últimos 10 minutos / 24 horas / 7 dias."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Lista de monitorização de tráfego",
               CONTENT: [{
                           type: "paragraph",
                           content: "A lista é agrupada pelo tipo de ligação dos dispositivos: com ou sem fios."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Parâmetros de Sistema",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Wi-Fi 2.4GHz/5GHz",
                           content: "Esta seção permite configurar os parâmetros de regras de transmissão de tráfego na rede Wi-Fi. É recomendado manter as configurações por defeito não tenha a certeza do tipo de configurações que necessita."
                       } ,{                      
                           type: "name",
                           title: "Intervalo de Beacon",
                           content: "Insira um valor entre 40 e 1000, em milissegundos, para determinar a duração entre pacotes de beacon que são transmitidos pelo Router para sincronizar a rede sem fio. O valor predefinido é 100 milissegundos."
                       } ,{                      
                           type: "name",
                           title: "RTS Threshold",
                           content: "Insira um valor entre 1 e 2346 para determinar o tamanho do pacote de transmissão de dados através do router. Por defeito, o tamanho do RTS (Request to Send) Threshold é 2346. Se o tamanho do pacote é maior do que o limite pré-definido, o router envia um pedido de enviar pacotes a uma estação recetora e negocia o envio de um pacote de dados, ou então o pacote será enviado imediatamente."
                       } ,{                      
                           type: "name",
                           title: "Intervalo DTIM",
                           content: "Este valor determina o intervalo de DTIM (Delivery Traffic Indication Message). Insira um valor entre 1 e 15. O intervalo por defeito é 1, indicando que o intervalo DTIM é o mesmo que o Intervalo de Beacon."
                       } ,{                      
                           type: "name",
                           title: "Group Key Update Period",
                           content: "Digite o número de segundos (mínimo de 30) para controlar o intervalo de tempo para renovação automática da chave de encriptação. Por defeito é 0, indicando que não há renovação de chave."
                       } ,{                      
                           type: "name",
                           title: "Função WMM",
                           content: "A função WMM garante que os pacotes com mensagens de alta prioridade serão transmitidos preferencialmente. Está ativo por defeito e é altamente recomendado."
                       } ,{                      
                           type: "name",
                           title: "Função Short GI",
                           content: "Esta função está ativa por defeito e é recomendada para aumentar a capacidade de pacotes pelo tempo de GI (Guard Interval)."
                       } ,{                      
                           type: "name",
                           title: "Função Isolamento AP",
                           content: "Caso pretenda limitar e restringir todos os dispositivos Wi-Fi conectados à rede de comunicar uns com os outros, mas ainda assim com permissão de aceder à Internet, selecione a opção Ativar Isolamento AP."
                       },{
                           type: "name",
                           title: "Redução da Interferência USB 3.0",
                           content: "Clique Ativar para reduzir a Interferência USB 3.0."
                        }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "WDS 2.4GHz/5GHz"
                       } ,{                      
                           type: "step",
                           title: "Ativar WDS",
                           content: "Bridging WDS (Wireless Distribution System) é uma funcionalidade que permite estender a cobertura da rede Wi-Fi através de um AP (ponto de acesso) e ligado por wireless a uma rede WLAN (rede local)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Selecione para ativar o Bridging WDS.",
                "2. Para ampliar uma rede através do modo de pesquisa: clique em Procurar para procurar e apresentar todas as redes disponíveis e selecionar a rede que pretende estender. O SSID (nome da rede), MAC Address, e tipo de Segurança será preenchido automaticamente.",
                "Para estender uma rede manualmente: Introduza o SSID (nome da rede), MAC Address e Modo WDS da rede para ser estendida. Selecione um tipo de Segurança e insira os parâmetros relacionados, que deve ser os mesmos da rede que pretende estender.",
                "3. Clique em Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Se não tem certeza do modo WDS, mantenha a opção predefinida - Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi Protected Setup) permite-lhe ligar facilmente os dispositivos WPS ao Router pressionando simplesmente o botão WPS. Ative a função WPS e clique em Guardar."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Esta função está ativa por defeito. É recomendado que mantenha a configuração predefinida. Se desativar, poderá não ter acesso à Internet."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Quando o NAT está desativado as configurações de Reencaminhamento NAT não terão efeito. "
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Selecione a opção Ativar NAT Boost e clique em Guardar para garantir que o Router tem a melhor o melhor desempenho nas transferências."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Nota",
                           content: "Quando o NAT Boost é ativado, as funções QoS e Estatísticas de Tráfego são desativados automaticamente."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Definições de proteção DOS",
                           content: "A Proteção DOS protege o Router de ataques ICMP-FLOOD, UDP-FLOOD e TCP-FLOOD."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD Packets Level",
                           content: "Insira um valor entre 5 e 7200 para acionar a proteção ICMP-FLOOD imediatamente quando o número de pacotes ICMP excede o valor limite predefinido."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD Packets Level",
                           content: "Insira um valor entre 5 e 7200 pacotes UDP para acionar a proteção UDP-FLOOD imediatamente quando o número de pacotes UDP exceder o valor actual limite."
                       } ,{                      
                           type: "name",
                           title: "TCP-INUNDAÇÃO Packets Level",
                           content: "Insira um valor entre 5 e 7200 pacotes TCP-SYN para ativar a proteção TCP-SYN-FLOOD imediatamente quando o número de pacotes TCP exceder o valor limite."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Duplex",
                           content: "Selecione o tipo duplex a partir da lista e clique em Guardar."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Ativar",
                           content: "Marque esta caixa de seleção para desligar os LEDs durante o Período do Modo Noturno sem afetar o desempenho do router."
                       } ,{                      
                           type: "name",
                           title: "Período do Modo Noturno",
                           content: "Especifique um período de tempo durante o qual o modo noturno se aplica."
                       } ,{                      
                           type: "paragraph",
                           content: "Clique em Gravar para guardar todas as suas configurações."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Através do serviço OpenVPN, poderá utilizar a Internet para aceder com segurança à sua rede quando estiver fora de casa. Para usar o serviço VPN, precisa de configurar o Serviço de DNS dinâmico (recomendado) ou atribuir um endereço IP estático na porta WAN do Router. O horário de sistema deve ser sincronizado com a Internet."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Serviço",
                           content: "Selecione o protocolo de comunicação para o servidor OpenVPN: UDP ou TCP."
                       } ,{                      
                           type: "name",
                           title: "Porta de serviço",
                           content: "Introduza um número de porta de comunicação entre 1024 e 65535. O valor predefinido da porta de serviço comum é 1194."
                       } ,{                      
                           type: "name",
                           title: "Sub-rede/Máscara",
                           content: "Introduza o intervalo de endereços IP que podem ser alocados para os clientes do servidor OpenVPN."
                       } ,{                      
                           type: "name",
                           title: "Acesso de Cliente",
                           content: "Selecione o tipo de acesso para o cliente OpenVPN.",
       children: [{                      
                           type: "name",
                           title: "Apenas rede doméstica",
                           content: "O Cliente só pode aceder à rede doméstica. A Rota predefinida do cliente não será alterada."
                       } ,{                      
                           type: "name",
                           title: "Internet e Rede doméstica",
                           content: "O Cliente pode aceder à rede doméstica, e sites da Internet ou de serviços com uma limitação geográfica quando estiver fora do país. A Rota Predefinida do cliente será alterada."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certificado",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Utilize o certificado para a informação e identidade da ligação VPN para o computador remoto.",
                "Clique aqui para gerar um novo certificado."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Ficheiro de Configuração",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Os clientes remotos irão utilizar o ficheiro de configuração para aceder ao Router.",
                "Clique neste botão para guardar o ficheiro de configuração do OpenVPN a ser utilizado para adicionar uma nova ligação VPN."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Guia de instalação do cliente VPN",
               CONTENT: [{
                           type: "step",
                           title: "Ligar dispositivos clientes ao servidor OpenVPN:",
       content: [{                      
                           type: "paragraph",
                           content: "Antes de configurar o servidor OpenVPN, configure Serviço DNS dinâmico (recomendado) ou atribua um endereço IP estático para a porta WAN. Certifique-se ainda que a porta externa de definições de NAT não é a porta de serviço, e o horário de sistema está sincronizado com a Internet."
                       },
                "1. Selecione Ativar Servidor VPN.",
                "2. Configure os parâmetros do servidor OpenVPN (Tipo de Serviço, porta de serviço, Acesso para Cliente e Sub-rede VPN/máscara de rede) e clique em Guardar.",
                "3. Clique em Exportar para Guardar o ficheiro de configuração.",
                "4. Nos dispositivos clientes, faça o Download e instale o utilitário de cliente OpenVPN a partir de <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "As plataformas oficiais suportados incluem os sistemas Windows, Mac OSX e Linux.",
                "5. Inicie o utilitário cliente OpenVPN e adicione uma nova ligação VPN utilizando o ficheiro de configuração salvo, por forma a ligar o dispositivo cliente ao servidor VPN."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Para saber mais sobre clientes OpenVPN, visite <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"VPN PPTP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com o serviço VPN PPTP, poderá utilizar a Internet para, de forma fácil e rápida, aceder à sua rede doméstica quando estiver fora de casa. Esta funcionalidade poderá estar bloqueada por alguns ISPs. Para usar o serviço VPN, necessita de configurar o Serviço DNS dinâmico (recomendado) ou atribuir um endereço IP estático na porta WAN do router. A Hora do Sistema deve estar sincronizada com a Internet."
                       } ,{                      
                           type: "name",
                           title: "Endereço IP do Cliente",
                           content: "Introduza o intervalo de endereços IP (até 10 clientes) que podem ser alocados aos clientes do servidor PPTP VPN."
                       } ,{                      
                           type: "name",
                           title: "Nome de Utilizador e Palavra-passe",
                           content: "Introduza o nome do utilizador e palavra-passe para autenticar os clientes no servidor PPTP VPN."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Guia de instalação do cliente VPN",
               CONTENT: [{
                           type: "step",
                           title: "Ligar dispositivos clientes ao servidor VPN PPTP:",
       content: [{                      
                           type: "paragraph",
                           content: "Antes de configurar o servidor PPTP VPN, configure o Serviço de DNS dinâmico (recomendado) ou atribua um endereço IP estático na porta WAN. Por favor verifique se a porta externa de definições de NAT não é a 1723 e a hora de sistema está sincronizada com a Internet."
                       },
                "1. Selecione Ativar Servidor VPN.",
                "2. Configure os parâmetros do servidor PPTP VPN e clique em Guardar.",
                "3. Nos dispositivos Cliente, crie uma ligação PPTP VPN. As plataformas suportadas incluem os sistemas Windows, Mac OS X, Linux, iOS e Android.",
                "4. Inicie o programa PPTP VPN, adicione uma nova ligação e introduza o nome de domínio do serviço DDNS registado ou o endereço IP estático que está atribuído na porta WAN, por forma a conectar o dispositivo cliente ao servidor PPTP VPN."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"Ligações VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta página exibe os clientes que estão atualmente ligados aos servidores OpenVPN e PPTP VPN alojados no router."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Mapa de Rede",
               CONTENT: [{
                           type: "paragraph",
                           content: "No mapa de rede, pode consultar o estado da rede atual, informações da rede Wi-Fi do Router e informações de dispositivos conectados."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe as informações de Internet."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe as informações atualizadas das redes Wi-Fi e das portas LAN."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Clientes Cabo/Wi-Fi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe o nome da rede (editável), IP atribuído e endereço MAC dos clientes conectados do Router."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Impressora",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mostra o nome da impressora ligada ao router através da porta USB."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"Disco USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe informações relevantes de disco USB ligado ao Router através da porta USB."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Teste de Velocidade",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta funcionalidade permite-lhe verificar as velocidades de Download e Upload que obtém através do seu provedor de serviço de Internet. Disponibilizando informações úteis sobre a capacidade de ligação à Internet do seu provedor."
                       } ,{                      
                           type: "paragraph",
                           content: "Dica: Para um resultado mais preciso, tente fechar todas aplicações em execução em segundo plano."
                       } ,{                      
                           type: "paragraph",
                           content: "Histórico - Registo de testes de velocidades efetuadas anteriormente."
                       } ,{                      
                           type: "paragraph",
                           content: "Teste novamente - Clique aqui para efetuar um novo teste de velocidade."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Clique em Detetar Automaticamente ou selecione o tipo de ligação manual à Internet. De seguida, digite os parâmetros fornecidos pelo ISP, respetivamente."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Ligação Smart",
               CONTENT: [{
                           type: "paragraph",
                           content: "Marque esta caixa de seleção para ativar a ligação smart. Esta função ajuda a dispositivos a executarem mais rápido, atribuindo-lhes as melhores bandas sem fios baseadas nas condições reais para equilibrar exigências de rede."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Definições Wi-Fi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Pode configurar as definições Wi-Fi (SSID, senha, etc.)"
                       } ,{                      
                           type: "name",
                           title: "Nome da Rede (SSID)",
                           content: "Recomenda-se a mudança do nome da rede (SSID). Este campo é sensível a letras maiúsculas e minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Selecione caso pretenda ocultar o nome da rede 2.4GHz / 5GHz (SSID) da lista de redes Wi-Fi. Uma vez selecionado, o SSID não será transmitido e irá necessitar de configurar a rede manualmente."
                       } ,{                      
                           type: "name",
                           title: "Senha",
                           content: "Insira uma senha Wi-Fi entre 8 a 63 carateres ASCII ou entre 8 e 64 carateres hexadecimais. Este campo é sensível a caracteres em maiúsculas e minúsculas."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"Dispositivo de Armazenamento USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta funcionalidade permite compartilhar dispositivos de armazenamento USB entre diferentes clientes na rede de área local ou através da Internet."
                       } ,{                      
                           type: "title",
                           title: "Definições de Dispositivo",
                           content: "A secção de Definições do dispositivo exibe as informações básicas do dispositivo de armazenamento USB ligado através da porta USB. Um disco flash USB tem normalmente um único volume."
                       } ,{                      
                           type: "name",
                           title: "Examinar",
                           content: "Tipicamente, o Router deteta automaticamente qualquer dispositivo recentemente ligado. Caso contrário, clique neste botão para Procurar e atualizar o ecrã com as informações atualizadas.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "A área cinzenta representa um volume que está desativado. Pode clicar na área para partilhar o volume."
                       }]
} ,{                      
                           type: "name",
                           title: "Remover",
                           content: "Clique neste botão para Remover de forma segura o dispositivo de armazenamento USB antes de retirá-lo fisicamente da porta USB.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "O botão para Remover em Segurança só aparece quando o dispositivo de armazenamento USB é conectado ao Router. Quando o volume atual estiver ocupado, não será possível remove-lo."
                       }]
} ,{                      
                           type: "step",
                           title: "Configurar o Servidor de Ficheiros",
       content: [ 
                "1. Conecte o dispositivo de armazenamento USB na porta USB diretamente ou através de um cabo USB. Se o dispositivo requerer alimentação externa, certifique-se que a fonte de energia externa está ligada ao produto.",
                "2. O dispositivo USB recém ligado deve ser detetado automaticamente pelo Router e ser exibido na secção de Definições do dispositivo. Caso contrário, clique em Procurar.",
                "Nota: O ícone de Partilha fica visível. Poderá premir o ícone para desativar volumes que não pretenda partilhar."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Endereço de Acesso",
               CONTENT: [{
                           type: "name",
                           title: "Nome de Servidor de Rede/Media",
                           content: "Exibe o nome usado para aceder ao dispositivo de armazenamento USB através do método de partilha de rede ou partilha de dispositivo multimédia. Por defeito, o nome é TP-Share."
                       } ,{                      
                           type: "name",
                           title: "Método de Acesso",
                           content: "Há 3 métodos para aceder ao dispositivo de armazenamento USB partilhado.",
       children: [{                      
                           type: "name",
                           title: "Vizinhança de Rede",
                           content: "Selecione esta opção para permitir que os utilizadores de rede possam aceder ao conteúdo partilhado através do endereço indicado na Coluna \"Endereço\"."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Selecione esta opção para ativar a opção de servidor FTP que permite que os clientes FTP e utilizadores na rede possam aceder ao dispositivo de armazenamento USB, através do endereço FTP mostrado na coluna de \"Endereço\"."
                       } ,{                      
                           type: "name",
                           title: "FTP (via Internet)",
                           content: "Selecione esta opção para permitir que os clientes FTP e utilizadores possam aceder remotamente, fazer download e upload de ficheiros para o dispositivo de armazenamento USB partilhado via FTP através da Internet. Para personalizar o endereço de acesso, clique em Editar e configure o endereço de DNS dinâmico do Router. Para alterar a porta do servidor FTP, digite um novo número de porta e clique em Guardar para aplicar as alterações."
                       }]
} ,{                      
                           type: "name",
                           title: "Endereço",
                           content: "Mostra o endereço usado para aceder ao dispositivo de armazenamento USB partilhado."
                       } ,{                      
                           type: "name",
                           title: "Porta",
                           content: "Exibe o número da porta utilizada para aceder ao servidor FTP."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Partilha de conteúdos",
               CONTENT: [{
                           type: "paragraph",
                           content: "Exibe as pastas partilhadas. Por defeito, todas as pastas serão partilhadas. Pode clicar no ícone Editar para personalizar as pastas partilhadas."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "O ícone de Partilha encontra-se na secção de Definições de Dispositivo. Pode premir o ícone de Partilha para desativar os volumes que não pretenda partilhar."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Partilha de conteúdos e Segurança",
               CONTENT: [{
                           type: "name",
                           title: "Partilha de conteúdos",
                           content: "Exibe as pastas partilhadas. Por defeito, todas as pastas serão partilhadas. Pode clicar no ícone Editar para personalizar as pastas partilhadas.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "O ícone de Partilha encontra-se na secção de Definições de Dispositivo. Pode premir o ícone de Partilha para desativar os volumes que não pretenda partilhar."
                       }]
} ,{                      
                           type: "name",
                           title: "Autenticação de Acesso",
       content: [ 
                "Ative por forma a ativar a Autenticação que irá solicitar aos utilizadores para introduzirem um nome de utilizador e senha para aceder às pastas partilhadas. Aceder como administrador permite ler e modificar ficheiros enquanto o Utilizador pode apenas ler os ficheiros.",
                "O nome de utilizador deve começar com uma letra ou símbolo de traço sublinhado e deve conter 1 a 15 caracteres letras e dígitos.",
                "A senha deve conter de 1 a 15 caracteres incluindo letras, dígitos e traço sublinhado."]
} ,{                      
                           type: "name",
                           title: "Ativar a Partilha de Média",
                           content: "Uma vez ativo, todos os dispositivos com suporte para DLNA na rede local podem aceder a ficheiros multimédia em todas as pastas partilhadas. Os utilizadores não terão de introduzir o nome de utilizador ou senha, mesmo se a Autenticação de Acesso estiver ativa."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Servidor de Impressão",
               CONTENT: [{
                           type: "name",
                           title: "Servidor de Impressão",
                           content: "Ativar a função de Servidor de Impressão."
                       } ,{                      
                           type: "name",
                           title: "Nome da Impressora",
                           content: "Exibe o nome da impressora ligada ao router."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Controlo Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com as configurações básicas de Controlo Parental, poderá bloquear o acesso a Internet durante determinadas horas do dia (por exemplo, sem acesso à Internet ao PC de uma criança durante as horas de trabalhos de casa)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Dispositivos sob Controlo Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabela exibe as informações e configurações dos dispositivos que estão atualmente restritos pelo Controlo Parental."
                       } ,{                      
                           type: "step",
                           title: "Para restringir um novo dispositivo cliente",
       content: [ 
                "1. Ative o Controlo Parental.",
                "2. Clique em Adicionar.",
                "3. Clique em Procurar para escolher um dispositivo conectado atualmente na Lista de Dispositivos de Acesso; ou introduza o nome do dispositivo e o endereço MAC manualmente para adicionar um dispositivo que não esteja ligado.",
                "4. Clique no ícone de Tempo Efetivo para específicar um período de tempo durante o qual a restrição se aplica.",
                "5. Digite uma breve descrição no campo Descrição. Este campo é opcional.",
                "6. Selecione Ativar esta Entrada.",
                "7. Clique em Gravar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Caso pretenda desativar esta entrada, clique no ícone Lâmpada."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Rede de Convidados",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta função permite-lhe fornecer acesso Wi-Fi gratuito para os hóspedes sem revelar a rede principal."
                       } ,{                      
                           type: "name",
                           title: "Permitir que Convidados se vejam entre si",
                           content: "Selecione esta opção para permitir que os dispositivos Wi-Fi da rede de convidados possam comunicar uns com os outros através de métodos tais como partilha de rede, Samba, Ping e FTP."
                       } ,{                      
                           type: "name",
                           title: "Permitir que Convidados acedam à minha Rede Local",
                           content: "Selecione esta opção para permitir que os dispositivos Wi-Fi da rede de convidados possam comunicar com os dispositivos conectados nas portas LAN do Router ou da rede principal através de métodos tais como Partilha de Rede, Samba, Ping e FTP."
                       } ,{                      
                           type: "name",
                           title: "Ativar Rede de Convidados",
                           content: "Selecione esta opção para ativar a função Rede de Convidados."
                       } ,{                      
                           type: "name",
                           title: "Nome da Rede (SSID)",
                           content: "Utilize o SSID predefinido ou crie um novo nome de rede Wi-Fi (até 32 caracteres)."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Selecione esta opção se desejar esconder o SSID da Rede de Convidados das listas de redes Wi-Fi."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Intervalo de Atualização da Senha",
                           content: "Selecione o intervalo de atualização da senha da Rede de Convidados."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Senha",
                           content: "Crie uma palavra-passe entre 8 e 63 caracteres ASCII, ou entre 8 e 64 caracteres hexadecimais (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Senha",
                           content: "Utilize ou a senha gerada aleatoriamente ou crie uma senha entre 8 a 63 caracteres ASCII ou entre 8 e 64 caracteres hexadecimais (0-9, a-f, A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "O serviço TP-Link Cloud permite-lhe monitorizar remotamente a sua rede em tempo real, aceder e gerir os seus dispositivos TP-Link a partir da Internet, em qualquer altura e em qualquer lugar."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Informação de conta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Apresenta a informação do seu TP-Link ID. Poderá editar a sua informação de conta clicando no ícone Editar."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Informação do Dispositivo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Apresenta a informação do seu dispositivo, incluindo a conta Cloud que está a gerir o dispositivo."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Contas vinculadas",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabela apresenta todas as contas Cloud que estão atualmente vinculadas ao dispositivo."
                       } ,{                      
                           type: "step",
                           title: "Para vincular uma conta de utilizador",
       content: [ 
                "1. Clique em Vincular",
                "2. Introduza o endereço registado que pretende vincular.",
                "3. Clique em Guardar."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Controlo Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com filtros de idades por niveis, limites de acesso e perfis de utilizadores, o Controlo Parental fornece a sua família o acesso à Internet personalizado e apropriado."
                       } ,{                      
                           type: "step",
                           title: "Para aplicar o Controlo Parental a um novo dispositivo",
       content: [ 
                "1. Clique em Adicionar.",
                "2. Introduza o nome para o perfil e clique em \"+\" para adicionar dispositivos ao perfil.",
                "3. Selecione o nível do filtro e personalize o conteúdo do mesmo de acordo com as suas necessidades. Pode inserir palavras-chave para pesquisar sobre websites que pretenda filtrar na base de dados. Outros endereços <br/>de websites podem ser inseridos manualmente. Consulte as explicações a seguir para as diferentes categorias de filtros:<p>Conteúdo Adultos - Websites que sobre conteúdo sexual, ofensivo ou ilícito, incluindo pornografia, consumo de substâncias, violência e descriminações</p><p>Apostas - Websites que promovam ou indiquem informações sobre jogos de apostas, incluindo casas e ou jogos online de apostas</p><p>Educação sexual - Websites que refiram temas sobre a sexualidade de forma informativa, métodos de reprodução, sexualidade, métodos de sexo seguro e controle de natalidade, doenças sexualmente transmissíveis e lidar com o trauma sexual</p><p>Comunicação online - Websites que permitam formas de comunicação com outros utilizadores através de texto, áudio ou vídeos, incluído emails, blogs, fóruns online, serviços VoIP, videoconferência ou serviços de chat</p>Redes Sociais - Websites que divulguem expressões pessoais e ou comunicações, expondo as pessoas e as suas atividades pessoais com base em interesses semelhantes, carreiras profissionais, origens ou relacionamentos</p><p>Pagar para navegar - Websites que compensem os utilizadores para visualizarem determinados websites, mensagens de email ou anúncios, clicar em endereços web ou responder a inquéritos</p><p>Multimédia - Websites que promovam conteúdo de áudio (músicas) e ou vídeos (filmes ou séries de TV) gratuitamente, pago ou de serviços de subscrição, incluindo serviços de streaming, Download de conteúdo de TV ou música</p><p>Downloads - Websites que permitam ou informem como aceder a conteúdo de partilha e distribuição de ficheiros, inclui as ligações P2P (peer-to-peer), serviços online de armazenamento de ficheiros e conteúdos para dispositivos móveis (músicas, aplicações e jogos)</p><p>Jogos - Websites que permitam ou garantam acesso a websites com endereços para obter jogos (jogos online, para consolas e ou para o seu browser)</p>",
                "4. Se pretende restringir o tempo total deste perfil pode despender online, ative e especifique o limite de tempo. Pode também usar o filtro Hora de dormir para definir um período de tempo diário, durante o qual os dispositivos desse perfil não podem usar a Internet.",
                "5. Clique em Guardar."]
} ,{                      
                           type: "step",
                           title: "Para visualizar o histórico detalhado dos acessos à Internet de um determinado perfil",
       content: [ 
                "1. Na coluna de Critérios, clique no botão correspondente.",
                "2. Se pretender visualizar mais registros, clique no botão de Histórico <span class=\"ptl-ctr-help-icon history\"></span> .",
                "3. Se pretender bloquear ou desbloquear websites clique nos botões <span class=\"ptl-ctr-help-icon block\"></span> ou <span class=\"ptl-ctr-help-icon unblock\"></span> ."]
} ,{                      
                           type: "step",
                           title: "Para desativar ou ativar o acesso à Internet instantaneamente.",
       content: [ 
                "Na coluna de Acesso à Internet, clique em <span class=\"ptl-ctr-help-icon stop\"></span> para impedir que os dispositivos do perfil correspondente acedam à Internet e em <span class=\"ptl-ctr-help-icon enable\"></span> para permitir o acesso novamente."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A funcionalidade de QoS (Qualidade de Serviço) definide priodidades das atividades e os dispositivos online para garantir uma ligação de rede mais rápida quando mais precisa."
                       } ,{                      
                           type: "paragraph",
                           content: "Selecione Prioridade de Aplicações para definir a priodidade da velocidade de rede para atividades online e selecione Prioridade de Dispositivos para definir a priodidade da velocidade de rede para dispositivos."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Prioridade de Aplicações",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selecione a atividade online que pretende definir a prioridade ou clique em Personalizar para definir o nível de prioridades de cada atividade online."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Prioridade de Dispositivos",
               CONTENT: [{
                           type: "paragraph",
                           content: "Escolha o(s) dispositivo(s) que deseja definir a prioridade e o período tempo em que a mesma será aplicada."
                       } ,{                      
                           type: "step",
                           title: "Definir a prioridade do dispositivo",
       content: [ 
                "1. Localize o dispositivo que pretende definiir a prioridade na lista e ative em Prioridade.",
                "2. Selecione o período tempo em que a prioridade será aplicada na coluna Temporização."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivírus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Com analises frequentes à rede, deteção de websites maliciosos, isolamento de dispositivos infetados, a funcionalidade de Antivírus mantem os seus dados seguros. Pode adicionalmente verificar como a sua rede está protegida e se houve algum ataque."
                       } ,{                      
                           type: "paragraph",
                           content: "Histórico - Registra os dispositivos que foram protegidos pelo Antivírus, a origem e a classificação dos ataques."
                       } ,{                      
                           type: "paragraph",
                           content: "Ativar todos - Permite ativar todos os Tipos de Proteção se um ou vários não estiverem ativos."
                       } ,{                      
                           type: "paragraph",
                           content: "Tipos de Proteção - Ative os Tipos de Proteção consultando as explicações. É recomendado ativar todos os Tipos de Proteção."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Prioridade de Aplicações",
               CONTENT: [{
                           type: "paragraph",
                           content: "A funcionalidade Prioridade de Aplicações priotirizar as atividades online para garantir uma ligação de rede mais rápida quando mais precisa. Escolha a atividade online que pretende priotirizar ou clique em Personalizado para definir o nível de prioridade de cada uma das atividades online."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Prioridade de Dispositivos",
               CONTENT: [{
                           type: "paragraph",
                           content: "A funcionalidade Prioridade de Dispositivo definide a prioridade dos dispositivos para garantir uma ligação de rede mais rápida quando mais precisa. Escolha o(s) dispositivo(s) que deseja definir a prioridade e o período tempo em que a mesma será aplicada."
                       } ,{                      
                           type: "step",
                           title: "Definir a prioridade do dispositivo",
       content: [ 
                "1. Localize o dispositivo que pretende definiir a prioridade na lista e ative em Prioridade.",
                "2. Selecione o período tempo em que a prioridade será aplicada na coluna Temporização."]
}]
},
       FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) Firewall impede ciberataques e valida o tráfego que o router está a transmitir em função do protocolo de rede. Esta funcionalidade está ativa por defeito."
                       } ,{                      
                           type: "name",
                           title: "Ative o SPI Firewall",
                           content: "Não desative o SPI Firewall exceto quando for necessário."
                       } ,{                      
                           type: "name",
                           title: "Permitir Pings a partir da Porta WAN/Permitir Pings a partir da Porta LAN",
                           content: "Ativar para permissão de pacotes Ping a partir da porta WAN/LAN. É recomendado manter as configurações de fábrica."
                       }]
},
       "" :     ""
    };
})(jQuery);
