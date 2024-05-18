(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra informações relevantes sobre a ligação WAN Wide Área Network (Internet)."
			},{
				type: "title",
				title: "IPv4",
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Endereço físico exclusivo atribuído à porta de Internet (WAN) do router."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Endereço IP atribuído à porta Internet (WAN) do router. Se o endereço IP é 0.0.0.0, isso indica que não há acesso à Internet."
			},{
				type: "name",
				title: "Máscara de Rede",
				content: "Este parâmetro determina a parte da rede e a parte do anfitrião de um endereço IP."
			},{
				type: "name",
				title: "Gateway Predefinido",
				content: "Endereço IP utilizado para conectar e encaminhar o tráfego externo à rede local do Router para a Internet."
			},{
				type: "name",
				title: "DNS Primário/DNS Secundário",
				content: "O Domain Name System (DNS) traduz nomes de dispositivos e domínios de internet em endereços IP. As informações desses servidores DNS são atribuídas pelo fornecedor de serviços de Internet (ISP)."
			},{
				type: "name",
				title: "Tipo de Ligação",
				content: "Tipo de ligação atual da porta Internet (WAN)."
			},{
				type: "title",
				title: "IPv6",
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Endereço físico exclusivo atribuído à porta de Internet (WAN) do router."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Endereço IP atribuído à porta Internet (WAN) do router. Se o endereço IP é 0.0.0.0, isso indica que não há acesso à Internet."
			},{
				type: "name",
				title: "Gateway Predefinido",
				content: "Endereço IP utilizado para conectar e encaminhar o tráfego externo à rede local do Router para a Internet."
			},{
				type: "name",
				title: "DNS Primário/DNS Secundário",
				content: "O Domain Name System (DNS) traduz nomes de dispositivos e domínios de internet em endereços IP. As informações desses servidores DNS são atribuídas pelo fornecedor de serviços de Internet (ISP)."
			},{
				type: "name",
				title: "Tipo de Ligação",
				content: "Tipo de ligação atual da porta Internet (WAN)."
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "Sem fios de 2.4GHz/5GHz/60GHz",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra informações relevantes sobre a  Rede Wi-Fi."
			},{
				type: "name",
				title: "Nome da Rede (SSID)",
				content: "Nome da rede Wi-Fi, também conhecido como SSID (Service Set Identifier)."
			},{
				type: "name",
				title: "Rádio Wi-Fi",
				content: "Estado atual da rede Wi-Fi (Ligado ou Desligado)"
			},{
				type: "name",
				title: "Modo",
				content: "O modo Wi-Fi atual."
			},{
				type: "name",
				title: "Largura de Canal",
				content: "A largura do canal da rede Wi-Fi."
			},{
				type: "name",
				title: "Canal",
				content: "O canal sem fios atual"
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Endereço MAC do rádio de rede Wi-Fi do router."
			},{
				type: "name",
				title: "Estado WDS",
				content: "O status atual (ativado ou desativado) do modo WDS."
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Apresenta informações sobre as portas Ethernet (LAN)."
			},{
				type: "title",
				title: "IPv4"
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Endereço físico exclusivo atribuído à porta Ethernet (LAN) do router."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Endereço IPv4 assignado à porta Ethernet (LAN) do router."
			},{
				type: "name",
				title: "Máscara de Rede",
				content: "Este parâmetro determina a parte da rede e a parte do anfitrião de um endereço IP."
			},{
				type: "name",
				title: "DHCP",
				content: "Mostra se o servidor DHCP embutido no router está ou não está ativo para atribuir endereços IP a dispositivos."
			},{
				type: "title",
				title: "IPv6"
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Endereço físico exclusivo atribuído à porta Ethernet (LAN) do router."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Endereço IPv6 assignado à porta Ethernet (LAN) do router."
			},{
				type: "name",
				title: "Endereço Local de Ligação",
				content: "O endereço da ligação IPv6 para o interface LAN."
			},{
				type: "name",
				title: "Tipo Assignado",
				content: "Tipo de endereço IPv6 para o interface LAN."
			}]
		},
		STATUS_GUEST: {
			TITLE: "Rede de Convidados 2.4GHz/5GHz",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra informações sobre a Rede Wi-Fi para Convidados."
			},{
				type: "name",
				title: "Nome da Rede (SSID)",
				content: "O nome da rede Wi-Fi (SSID) da sua Rede de Convidados."
			},{
				type: "name",
				title: "Ocultar SSID",
				content: "Mostra se o nome da rede Wi-Fi (SSID) da Rede de Convidados está escondido ou não."
			},{
				type: "name",
				title: "Rádio Wi-Fi",
				content: "Estado atual da Rede de Convidados (Ligado ou Desligado)."
			},{
				type: "name",
				title: "Permitir que os convidados se vejam entre si",
				content: "Mostra se os dispositivos na Rede de Convidados podem ou não comunicar entre si."
			}]
		},
		STATUS_USB: {
			TITLE: "Dispositivos USB",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra informações dos dispositivos de armazenamento e / ou impressoras USB atualmente ligados ao router através das portas USB."
			},{
				type: "name",
				title: "Impressora",
				content: "Nome da impressora conectada."
			},{
				type: "name",
				title: "Disco USB",
				content: "Nome do disco USB conectado ao router."
			},{
				type: "name",
				title: "Total",
				content: "A capacidade de armazenamento total do dispositivo de armazenamento USB conectado."
			},{
				type: "name",
				title: "Disponível",
				content: "A capacidade de armazenamento disponível no dispositivo de armazenamento USB conectado."
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "Performance",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra o atual desempenho do router."
			},{
				type: "name",
				title: "Carga no CPU",
				content: "Atual uso do CPU."
			},{
				type: "name",
				title: "Utilização de Memória",
				content: "Memória atualmente em uso."
			}]
		},
		STATUS_WIRED: {
			TITLE: "Clientes Cabo",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra informações de todos os dispositivos ligados por cabo que estão conectados à rede."
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "Clientes Wi-Fi",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra informações de todos os dispositivos Wi-Fi que estão conectados à rede."
			}]
		},
		
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "title",
				title: "Tipo de Ligação à Internet: IP Estático"
			},{
				type: "paragraph",
				content: "Selecione este tipo de ligação se o seu ISP lhe forneceu Endereço IP, Máscara de Rede, Gateway Predefinido, DNS Primário e DNS Secundário específicos (fixos)."
			},{
				type: "name",
				title: "Endereço IP/Máscara de Rede/Gateway Predefinido/DNS Primário/DNS Secundário",
				content: "Digite as informações fornecidas pelo seu ISP."
			},{
				type: "name",
				title: "Tamanho MTU",
				content: "O valor MTU  (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1500 Bytes. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: IP Dinâmico"
			},{
				type: "paragraph",
				content: "Selecione este tipo se o seu ISP lhe fornecer uma ligação com servidor de DHCP."
			},{
				type: "name",
				title: "Endereço IP/Máscara de Rede/Gateway Predefinido/DNS Primário/DNS Secundário",
				content: "Estes parâmetros são fornecidos automaticamente pelo servidor DHCP do seu ISP."
			},{
				type: "name",
				title: "Renovar",
				content: "Clique neste botão para obter novos parâmetros IP do servidor DHCP do seu ISP."
			},{
				type: "name",
				title: "Libertar",
				content: "Clique neste botão para liberar todos os endereços IP atribuídos pelo servidor DHCP."
			},{
				type: "name",
				title: "Use os seguintes Endereços DNS",
				content: "Se o ISP fornece um ou dois endereços DNS, selecione essa opção e digite os endereços DNS Primário e Secundário nos campos correspondentes, caso contrário, os endereços DNS serão atribuídos dinamicamente pelo ISP."
			},{
				type: "name",
				title: "Tamanho MTU",
				content: "O valor MTU  (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1500 Bytes. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
			},{
				type: "name",
				title: "Nome de Dispositivo",
				content: "Digite um valor para este campo para especificar o nome do Router."
			},{
				type: "name",
				title: "Obter IP utilizando DHCP Unicast",
				content: "Selecione esta opção se o servidor DHCP do seu ISP não suporta aplicações de transmissão (broadcast) e não consegue obter o endereço IP dinamicamente."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: PPPoE"
			},{
				type: "paragraph",
				content: "Selecione este tipo de ligação se usar o serviço DSL (Digital Subscriber Line) e o seu ISP fornece nome de utilizador e senha."
			},{
				type: "name",
				title: "Utilizador/Senha",
				content: "Digite o nome de utilizador e senha fornecidos pelo seu ISP. Estes campos são sensíveis a caracteres em maiúsculas e minúsculas."
			},{
				type: "name",
				title: "Endereço IP/DNS Primário/DNS Secundário",
				content: "Estes parâmetros são fornecidos automaticamente pelo servidor DHCP do seu ISP."
			},{
				type: "name",
				title: "Ligação Secundária  (Nenhuma, IP Dinâmico, IP Estático)",
				children: [{
					type: "name",
					title: "Nenhuma",
					content: "Selecione se não existir ligação secundária"
				},{
					type: "name",
					title: "IP Dinâmico",
					content: "Selecione se o endereço IP e Máscara de Rede são atribuídos automaticamente pelo ISP.",
					children: [{
						type: "name",
						title: "Renovar",
						content: "Clique neste botão para obter novos parâmetros IP do servidor DHCP do seu ISP."
					},{
						type: "name",
						title: "Libertar",
						content: "Clique neste botão para liberar todos os endereços IP atribuídos pelo servidor DHCP."
					}]
				},{
					type: "name",
					title: "IP Estático",
					content: "Selecione se o seu ISP lhe forneceu Endereço IP e Máscara de Rede e insira essa informação nos campos correspondentes."
				}]
			},{
				type: "name",
				title: "Tamanho MTU",
				content: "O valor MTU  (Maximum Transmission Unit) típico para redes Ethernet é 1480 Bytes.",
				children: [{
					type: "note",
					title: "Nota",
					content: "Nota: Em casos raros, o seu ISP pode exigir que ajuste o valor de  MTU para um melhor desempenho da rede. Não deve alterar o valor, a menos que seja absolutamente necessário."
				}]
			},{
				type: "name",
				title: "Nome de Serviço/Nome de Concentrador de Acesso",
				content: "Por defeito, o Nome de Serviço  e Nome de Concentrador de Acesso (AC) são deixados em branco. Estes campos não devem ser configurados exceto se exigido por seu ISP."
			},{
				type: "name",
				title: "Detetar Intervalo Online",
				content: "Insira um valor de intervalo de tempo entre 0 e 120 (em segundos). O Router utilizará esse intervalo para testar a conectividade com o Concentrador de Acesso. O valor predefinido é 10."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Se o seu ISP fornece um endereço IP específico (fixo), selecione Usar o Seguinte Endereço IP e digite o endereço IP no campo; caso contrário, selecione Obter Dinamicamente do ISP para obter automaticamente um endereço IP atribuído pelo servidor DHCP."
			},{
				type: "name",
				title: "Endereço DNS/DNS Primário/DNS Secundário",
				content: "Se o seu ISP lhe fornece um endereço IP de DNS especifico (fixo), selecione \"Use the following DNS Address\" e introduza o(s) endereço(s) nos campos Primary DNS e Secondary DNS respetivamente. Caso contrário selecione \"Get Dynamically from ISP\" para obter automaticamente o endereço IP de DNS."
			},{
				type: "name",
				title: "Modo de Ligação",
				content: "Selecione modo de ligação apropriado que determina como se conectar à Internet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "Neste modo, a ligação à Internet é restabelecida automaticamente assim que é desconectada."
				},{
					type: "name",
					title: "A Pedido",
					content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente a Internet."
				},{
					type: "name",
					title: "Agendado",
					content: "Neste modo, a ligação à Internet é estabelecida apenas num período de tempo específico. Se essa opção for selecionada, digite o tempo de início e fim, ambos no formato HH: MM."
				},{
					type: "name",
					title: "Manual",
					content: "Neste modo, a ligação à Internet é controlada manualmente, clicando no botão Desligar ou Ligar. Este modo também suporta a função Tempo Máximo de Inatividade. Digite o tempo máximo (em minutos) que ligação à Internet pode ficar inativa antes de ser desligada no campo Tempo Máximo de Inatividade. O valor predefinido é 15 minutos. Se desejar que a ligação à internet permanece sempre ativa, digite 0 (zero)."
				},{
					type: "note",
					title: "Nota",
					content: "Nota: O modo de ligação Agendado só terá efeito se for configurar o relógio de sistema em Ferramentas de Sistema → Sistema → Definições de Tempo."
				}]
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: BigPond Cable",
				id: "BigPond"
			},{
				type: "paragraph",
				content: "Selecione este tipo se o seu ISP fornece ligação Bigpond Cable.",
				id: "BigPond_desc"
			},{
				type: "name",
				title: "Utilizador/Senha",
				content: "Digite o nome de utilizador e senha fornecidos pelo seu ISP. Estes campos são sensíveis a caracteres em maiúsculas e minúsculas.",
				id: "BigPond_name"
			},{
				type: "name",
				title: "Servidor Auth.",
				content: "Digite o endereço IP ou nome de domínio do servidor de autenticação.",
				id: "BigPond_server"
			},{
				type: "name",
				title: "Domínio Auth.",
				content: "Digite o sufixo do nome de domínio do servidor (baseado na sua localização). Por exemplo, nsw.bigpond.net.au para NSW/ACT, vic.bigpond.net.au para VIC/TAS/WA/SA/NT, ou qld.bigpond.net.au para QLD.",
				id: "BigPond_domain"
			},{
				type: "name",
				title: "Tamanho MTU",
				content: "O valor MTU  (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1500 Bytes. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP.",
				id: "BigPond_mtu"
			},{
				type: "name",
				title: "Modo de Ligação",
				content: "Selecione modo de ligação apropriado que determina como se conectar à Internet.",
				id: "BigPond_mode",
				children: [{
					type: "name",
					title: "Auto",
					content: "Neste modo, a ligação à Internet é restabelecida automaticamente assim que é desconectada."
				},{
					type: "name",
					title: "A Pedido",
					content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente a Internet."
				},{
					type: "name",
					title: "Manual",
					content: "Neste modo, a ligação à Internet é controlada manualmente, clicando no botão Desligar ou Ligar. Este modo também suporta a função Tempo Máximo de Inatividade. Digite o tempo máximo (em minutos) que ligação à Internet pode ficar inativa antes de ser desligada no campo Tempo Máximo de Inatividade. O valor predefinido é 15 minutos. Se desejar que a ligação à internet permanece sempre ativa, digite 0 (zero)."
				}]
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: L2TP/PPTP"
			},{
				type: "paragraph",
				content: "Selecione este tipo se ligar a um servidor VPN L2TP/ PPTP e são fornecidos pelo ISP o nome de utilizador, senha e endereço de IP / Nome de Domínio do servidor."
			},{
				type: "name",
				title: "Utilizador/Senha",
				content: "Digite o nome de utilizador e senha fornecidos pelo seu ISP. Estes campos são sensíveis a caracteres em maiúsculas e minúsculas."
			},{
				type: "name",
				title: "Endereço IP/DNS Primário/DNS Secundário",
				content: "Estes parâmetros são fornecidos automaticamente pelo servidor DHCP do seu ISP."
			},{
				type: "name",
				title: "Ligação Secundária (IP Dinâmico ou IP Estático)",
				children: [{
					type: "name",
					title: "IP Dinâmico",
					content: "Selecione se o endereço IP e Máscara de Rede são atribuídos automaticamente pelo ISP."
				},{
					type: "name",
					title: "IP Estático",
					content: "Selecione se os endereços IP, Máscara de Rede, Gateway e DNS  são fornecidos pelo ISP e insira essas informações nos campos correspondentes."
				}]
			},{
				type: "name",
				title: "IP do Servidor VPN/Nome de Domínio",
				content: "Digite o endereço IP ou Nome de Domínio do Servidor VPN fornecido pelo seu ISP."
			},{
				type: "name",
				title: "Tamanho MTU",
				content: "O valor MTU  (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1460 Bytes para L2TP ou 1420 Bytes para PPTP. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
			},{
				type: "name",
				title: "Modo de Ligação",
				content: "Selecione modo de ligação apropriado que determina como se conectar à Internet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "Neste modo, a ligação à Internet é restabelecida automaticamente assim que é desconectada."
				},{
					type: "name",
					title: "A Pedido",
					content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente a Internet."
				},{
					type: "name",
				title: "Manual",
				content: "Neste modo, a ligação à Internet é controlada manualmente, clicando no botão Desligar ou Ligar. Este modo também suporta a função Tempo Máximo de Inatividade. Digite o tempo máximo (em minutos) que ligação à Internet pode ficar inativa antes de ser desligada no campo Tempo Máximo de Inatividade. O valor predefinido é 15 minutos. Se desejar que a ligação à internet permanece sempre ativa, digite 0 (zero)."
				}]
			},{
				type:"paragraph",
				content:"Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "Clonar MAC",
			CONTENT: [{
				type: "name",
				title: "Usar Endereço MAC Predefinido",
				content: "Não altera o endereço MAC predefinido do router, caso o ISP não assigne o endereço IP vinculado a endereço MAC especifico."
			},{
				type: "name",
				title: "Usar Endereço MAC deste Computador",
				content: "Selecione para copiar o endereço MAC do computador que é ligado ao router, caso o ISP vincule o endereço IP atribuído ao endereço MAC deste computador."
			},{
				type: "name",
				title: "Endereço MAC Personalizado",
				content: "Digite o endereço MAC manualmente, caso o ISP vincule o endereço IP atribuído a um endereço MAC específico."
			},{
				type:"paragraph",
				content:"Clique em Gravar para guardar todas as suas configurações."
			}]
		},

		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type: "name",
				title: "Endereço MAC",
				content: "Endereço físico exclusivo atribuído à porta Ethernet (LAN) do router."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Exibe o endereço IP predefinido do router, que é usado para aceder à página web de gestão do router. Este endereço pode ser alterado."
			},{
				type: "name",
				title: "Máscara de Rede",
				content: "Selecione um identificador atribuído usado pela porta LAN para encaminhar tráfego interno e externo a partir da lista drop-down ou introduza uma nova máscara de sub-rede em formato decimal separado por pontos."
			},{
				type: "note",
				title: "Nota",
				content: "Nota: Se o novo endereço IP LAN não estiver na mesma sub-rede do antigo, o lote de endereços IP no servidor DHCP será configurado automaticamente; no entanto, o Virtual Server e DMZ host não funcionarão até que sejam reconfigurados."
			},{
				type:"paragraph",
				content:"Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		IPTV:{
			TITLE: "Definições",
			CONTENT: [{
					type: "name",
					title: "IGMP Proxy",
					content: "Selecione a versão de Proxy IGMP (Internet Group Management Protocol) , V2 ou V3, de acordo com o seu ISP."
				},{
					type: "name",
					title: "Versão IGMP",
					content: "Selecione a versão V2 ou V3 de IGMP Proxy, de acordo com o seu ISP."
				},
				{
					type: "name",
					title: "IPTV",
					content: "Selecione para ativar a função de IPTV."
				},
				{
					type: "name",
					title: "Modo",
					content: "Selecione o modo adequado de acordo com o seu ISP. Existem seis modos de IPTV suportados:",
					children: [
						{
							type: "name",
							title: "Bridge",
							content:"Se o seu ISP não está listado e não são necessários outros parâmetro, pode selecionar este modo e configurar as funções de porta LAN do router.",
							children:[{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Configurar a porta LAN para acesso à Internet ou como fornecedor IPTV."
							}]
						},
						{
							type: "name",
							title: "Rússia",
							content: "Selecione se o seu ISP é da Rússia. Os valores predefinidos serão carregados automaticamente, incluindo  Internet/IP-Phone/IPTV VLAN IDs e Prioridades bem como as funcionalidades das portas LAN (1/2/3/4).",
							children: [{
								type: "name",
								title: "ID de VLAN Multicast de IPTV/Prioridade",
								content: "Pode ativar a função de IPTV multicast como desejado e configurar o ID VLAN e Prioridade de acordo com o seu ISP."
							}]
						},
						{
							type: "name",
							title: "Singapura-Exstream",
							content: "Selecione se o seu ISP é a Exstream de Singapura e os parâmetros necessários são pré-determinados, incluindo Prioridade e ID de VLAN de Internet / Telefone IP/IPTV as e funções das portas LAN (1/2/3/4)."
						},
						{
							type: "name",
							title: "Malásia-Unifi",
							content: "Selecione se o seu ISP é a Unifi da Malásia e os parâmetros necessários são pré-determinados, incluindo Prioridade e ID de VLAN de Internet / Telefone IP/IPTV as e funções das portas LAN (1/2/3/4)."
						},
						{
							type: "name",
							title: "Malásia-Maxis",
							content: "Selecione se o seu ISP é a Maxis da Malásia e os parâmetros necessários são pré-determinados, incluindo Prioridade e ID de VLAN de Internet / Telefone IP/IPTV as e funções das portas LAN (1/2/3/4) ."
						},
						{
							type: "name",
							title: "Personalizado",
							content: "Selecione se o seu ISP não estiver na lista, mas fornece os parâmetros necessários, incluindo Prioridade e ID de VLAN de Internet / Telefone IP/IPTV as e funções das portas LAN (1/2/3/4).",
							children: [{
								type: "name",
								title: "Internet/Telefone IP/ID de VLAN de IPTV/Prioridade",
								content: "Configure os ID de VLAN e prioridades conforme indicado pelo seu ISP."
							},{
								type: "name",
								title: "802.11Q Tag",
								content: "Selecione para marcar os pacotes de Internet com 802.11Q."
							},{
								type: "name",
								title: "ID de VLAN Multicast de IPTV/Prioridade",
								content: "Pode ativar a função de IPTV multicast como desejado e configurar o ID VLAN e Prioridade de acordo com o seu ISP."
							},{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Configurar a porta LAN para  fornecer acesso à Internet, fornecer  telefonia IP ou acesso a serviço de IPTV."
							}]
						}
					]
				},{
					type:"paragraph",
					content:"Clique em Gravar para guardar todas as suas configurações."
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "Definições",
			CONTENT: [{
				type: "name",
				title: "Servidor DHCP",
				content: "Por padrão, o servidor DHCP (Dynamic Host Configuration Protocol) está habilitado; ele atribui dinamicamente os parâmetros TCP / IP para dispositivos clientes do pool de endereços IP. Não desative o servidor DHCP, a menos que você tem um outro servidor DHCP ou se você quiser atribuir manualmente os parâmetros de TCP / IP para cada dispositivo cliente em sua rede."
			},{
				type: "name",
				title: "Lote de Endereços IP",
				content: "Inserir o intervalo de endereços IP que podem ser atribuídos a clientes."
			},{
				type: "name",
				title: "Tempo de Atribuição de Endereço",
				content: "Introduza a duração de tempo entre 2 e 2880 minutos em que um endereço IP é atribuído a um cliente. Por defeito o valor é de 120 minutos."
			},{
				type: "name",
				title: "Gateway Predefinido",
				content: "Digite o endereço IP LAN. (Opcional)"
			},{
				type: "name",
				title: "DNS Primário/DNS Secundário",
				content: "Entre esses parâmetros fornecidos pelo seu provedor. (Opcional)"
			},{
				type:"paragraph",
				content:"Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "Reserva de Endereço",
			CONTENT: [{
				type: "paragraph",
				content: "Pode reservar um endereço IP manualmente para um cliente que está conectado ao router Uma vez reservado, o endereço IP será atribuído sempre ao mesmo cliente pelo servidor DHCP."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Mostra o endereço MAC do cliente com endereço IP reservado no servidor DHCP ."
			},{
				type: "name",
				title: "Endereço IP Reservado",
				content: "Mostra o endereço IP reservado do cliente."
			},{
				type: "name",
				title: "Descrição",
				content: "Mostra uma descrição do dispositivo cliente."
			},{
				type: "name",
				title: "Estado",
				content: "Mostra o status atual (ativado ou desativado) do dispositivo cliente."
			},{
				type: "name",
				title: "Modificar",
				content: "Mostra opções para Modificar ou Apagar o cliente correspondente."
			},{
				type: "step",
				title: "Para reservar um endereço IP",
				content:[
					"1. Clique em Adicionar.",
					"2. Digite o endereço MAC do dispositivo.",
					"3. Insira o endereço IP que deseja reservar para o dispositivo.",
					"4. Digite uma descrição para o dispositivo.",
					"5. Selecione Ativar.",
					"6. Clique em OK."
				]
			},{
				type: "step",
				title: "Para modificar ou apagar um cliente existente",
				content: "Na tabela, clique no ícone Editar ou no ícone Apagar que corresponde ao cliente que deseja modificar ou apagar."
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "Lista de Clientes DHCP",
			CONTENT: [{
				type: "name",
				title: "Número de Clientes",
				content: "Exibe o número de clientes DHCP associados."
			},{
				type: "name",
				title: "Nome de Cliente",
				content: "Mostra o nome do cliente DHCP."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Mostra o endereço MAC."
			},{
				type: "name",
				title: "Endereço IP Assignado",
				content: "Exibe o endereço IP atribuído ao cliente pelo servidor DHCP."
			},{
				type: "name",
				title: "Tempo de Atribuição",
				content: "Exibe o tempo que resta da atribuição de endereço IP a cliente"
			},{
				type: "name",
				title: "Atualizar",
				content: "Clique para atualizar a lista de clientes DHCP."
			}]
		},

		DDNS: {
			TITLE: "DNS Dinâmico",
			CONTENT: [{
				type: "paragraph",
				content: "Um DNS dinâmico permite-lhe atribuir um nome de domínio fixo a um endereço IP de internet dinâmico. É útil caso pretenda alojar o seu próprio Website, Servidor FTP ou outro tipo servidor na rede local do seu router. Para o efeito, terá de inicialmente criar uma conta num serviço de DNS Dinâmico tal como o dyn.com."
			},{
				type: "step",
				title: "Para configurar um DNS Dinâmico",
				content: [
					"1. Escolha o fornecedor de serviços DDNS.",
					"2. Digite o nome de utilizador e senha de conta DDNS.",
					"3. Insira o Nome de Domínio que recebeu do fornecedor do serviço DDNS.",
					"4. Selecione o intervalo de atualização a partir da lista.",
					"5. Clique em Entrar e Grave"
				]
			},{
				type: "paragraph",
				content: "Para alternar entre contas, deve primeiro Sair da conta atual e depois Entre na outra conta com o novo nome de utilizador e senha."
			}]
		},


		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "Routing Estático",
			CONTENT: [{
				type: "paragraph",
				content: "O routing estático é usado para pré-determinar uma rota fixa para que pacotes de informação de rede chegarem a um dispositivo ou rede específica."
			},{
				type: "step",
				title: "Para configurar uma rota estática",
				content: [
					"1. Clique em Adicionar.",
					"2. Rede de Destino - Insira um endereço IP em formato decimal separado por pontos para atribuir a rota estática para esta entrada.",
					"3. Máscara de Rede - Digite uma máscara de rede em formato decimal separado por pontos  para determinar a parte da rede e parte de dispositivo do endereço IP.",
					"4. Gateway Predefinido - Introduza um endereço IP da gateway em formato decimal separado por pontos para conectar o router à rede ou anfitrião.",
					"5. Interface - Selecione LAN ou WAN para especificar o tipo de rede de destino.",
					"6. Descrição - Insira uma breve descrição para esta entrada.",
					"7. Selecionar Ativar.",
					"8. Clique em OK."
				]
			},{
				type: "step",
				title: "Para modificar ou excluir uma entrada existente",
				content: "Na tabela, clique no ícone Editar ou no ícone Lixo que corresponde à entrada que deseja modificar ou apagar."
			}]
		},
		
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "Tabela de routing do Sistema",
			CONTENT: [{
				type: "paragraph",
				content: "A tabela de routing mostra todas as entradas de rotas válidas que estão atualmente em uso."
			},{
				type: "paragraph",
				content: "Clique em Atualizar para atualizar a tabela de routing."
			}]
		},
		
		WIRELESS_REGION: {
			TITLE: "Definições",
			CONTENT: [{
				type: "name",
				title: "Região",
				content: "Selecione a sua região a partir do menu. Se o seu país ou região não estiver na lista, a utilização deste rádio pode estar restringida na sua localização."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		WIRELESS_24G: {	
			TITLE: "Wi-Fi 2.4GHz",
			CONTENT: [{
				type: "name",
				title: "Ativar o Rádio Wi-Fi",
				content: "Selecione esta caixa de seleção para ativar o rádio Wi-Fi na frequência de 2,4 GHz. Quando descativado, a função WPS será desativada nesta banda."
			},{
				type: "name",
				title: "Nome da Rede Wi-Fi (SSID)",
				content: "Pode deixar o nome da rede Wi-Fi (SSID) predefinido ou introduzir um novo nome (até 32 caracteres). Este campo é sensível a caracteres em maiúsculas e minúsculas."
			},{
				type: "name",
				title: "Ocultar SSID",
				content: "Selecione esta opção para ocultar o nome da rede 2.4GHz (SSID) da lista de redes Wi-Fi. Quando selecionado, a função WPS será desativada nesta banda."
			},{
				type: "name",
				title: "Segurança",
				content: "Escolha uma das seguintes opções de segurança:",
				children: [{
					type: "name",
					title: "Sem segurança",
					content: "Selecione esta opção para desativar a segurança da rede Wi-Fi. É altamente recomendado que ative a segurança Wi-Fi para proteger a sua rede sem fios de acessos não autorizados."
				},{
					type: "name",
					title: "WPA/WPA2-Pessoal",
					content: "Selecione esta opção para ativar o método de autenticação standard, com base numa chave pré-partilhada (PSK). Esta é a opção mais comum e recomendada. Se selecionado, configure os passos seguintes.",
					children: [{
						type: "name",
						title: "Versão",
						content: "Selecione uma versão de segurança para a sua rede sem fio.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Esta opção oferece suporte a múltiplas implementações standard do WPA (Wi-Fi Protected Access) , como o WPA e WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Esta opção garante um bom nível de segurança. Se selecionada, a função WPS não ficará disponível nesta banda."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Esta opção oferece um melhor nível de segurança do que o WPA-PSK e é recomendado."
						}]
					},{
						type: "name",
						title: "Encriptação",
						content: "Selecione um tipo de encriptação de segurança: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), ou Auto (tanto para TKIP ou AES). Não é recomendado usar a encriptação TKIP se o Router operar em modo 802.11n, porque o TKIP não é suportado pela norma 802.11n. Se o TKIP for selecionado, a função WPS será desativada."
					},{
						type: "name",
						title: "Senha",
						content: "Digite neste campo a senha da rede Wi-Fi. Pode inserir 8 a 63 caracteres ASCII ou 8 a 64 caracteres hexadecimais. Este campo é sensível a caracteres em maiúsculas e minúsculas."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Empresarial",
					content: "Selecione esta opção para ativar o método de autenticação mais avançado usando um servidor RADIUS (Remote Authentication Dial In User Service). Se selecionada, a função WPS será desativada nesta banda.",
					children: [{
						type: "name",
						title: "Versão",
						content: "Selecione uma versão de segurança para a sua rede sem fio.",
						children:[{
							type: "name",
							title: "Auto",
							content: "Esta opção oferece suporte a múltiplas implementações standard do WPA (Wi-Fi Protected Access) , como o WPA e WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Esta opção oferece um bom nível de segurança."
						},{
							type: "name",
							title: "WPA2",
							content: "Esta opção oferece um melhor nível de segurança do que o WPA-PSK e é recomendado."
						}]
					},{
						type: "name",
						title: "Encriptação",
						content: "Selecione um tipo de codificação: TKIP (Temporal Key Integrity Protocol/Protocolo de Integridade da Chave Temporal ), AES (Advanced Encryption Standard/Padrão de Codificação Avançada), ou Automático (tanto para TKIP como para AES). NÃO se recomenda utilizar a codificação TKIP se o roteador funciona no modo 802.11N , porque o TKIP não é suportado pela especificação 802.11n."
					},{
						type: "name",
						title: "IP Servidor RADIUS",
						content: "Insira o endereço IP do servidor RADIUS."
					},{
						type: "name",
						title: "Porta RADIUS",
						content: "Insira o número da porta do servidor RADIUS."
					},{
						type: "name",
						title: "Senha RADIUS",
						content: "insira a senha partilhada do servidor RADIUS."
					}]
				},{
				type: "name",
				title: "WEP",
				content: "Selecione esta opção para ativar método básico de autenticação se existirem dispositivos na sua  rede que só possam aceder à sua rede Wi-Fi utilizando WEP (Wired Equivalent Privacy). Se selecionado, a função WPS será desativada nesta banda.",
				children: [{
					type: "name",
					title: "Tipo",
					content: "Selecione um tipo de autenticação para a sua rede sem fio. Por defeito é Auto, que escolhe automaticamente Sistema Aberto ou Chave Partilhada com base na capacidade e pedido de acesso do cliente Wi-Fi."
				},{
					type: "name",
					title: "Formato de Chave WEP",
					content: "Utilize o formato ASCII ou selecione Hexadecimal. O formato ASCII é uma combinação de caracteres ASCII. O formato hexadecimal é uma combinação de números (0-9) e letras (A-F, a-f)."
				},{
					type: "name",
					title: "Tipo de Chave",
					content: "Selecione o tamanho da chave WEP.",
					children: [{
						type: "name",
						title: "64 bits",
						content: "Permite inserir 10 dígitos hexadecimais (0-9, A-F, a-f) ou 5 caracteres ASCII no campo Valor WEP."
					},{
						type: "name",
						title: "128-bit",
						content: "Permite inserir 26 dígitos hexadecimais (0-9, A-F, a-f) ou 13 caracteres ASCII no campo Valor WEP."
					}]
				},{
					type: "name",
					title: "Valor Chave",
					content: "Insira a chave WEP no respetivo campo."
				}]
			}]
			},{
				type: "name",
				title: "Modo",
				content: "Selecione um modo de transmissão."
			},{
				type: "name",
				title: "Largura de Canal",
				content: "Selecione a largura de canal (largura de banda) para a rede Wi-Fi 2.4GHz."
			},{
				type: "name",
				title: "Canal",
				content: "Selecione um canal de funcionamento para a rede Wi-Fi 2.4 GHz. Auto é a opção predefinida e recomendada. Recomendamos deixar o canal em Auto se não tiver problemas intermitentes de ligação Wi-Fi."
			},{
				type: "name",
				title: "Potência de Transmissão",
				content: "Selecione Alta, Média ou Baixa para especificar a potência de transmissão. A configuração predefinida e recomendada é Alta."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "Wi-Fi 5GHz",
			CONTENT: [{
				type: "name",
				title: "Ativar o Rádio Wi-Fi",
				content: "Selecione esta caixa de seleção para ativar o rádio Wi-Fi na frequência de 5 GHz. Quando descativado, a função WPS será desativada nesta banda."
			},{
				type: "name",
				title: "Nome da Rede Wi-Fi (SSID)",
				content: "Pode deixar o nome da rede Wi-Fi (SSID) predefinido ou introduzir um novo nome (até 32 caracteres). Este campo é sensível a caracteres em maiúsculas e minúsculas."
			},{
				type: "name",
				title: "Ocultar SSID",
				content: "Selecione esta opção para ocultar o nome da rede 5GHz (SSID) da lista de redes Wi-Fi. Quando selecionado, a função WPS será desativada nesta banda."
			},{
				type: "name",
				title: "Segurança",
				content: "Escolha uma das seguintes opções de segurança:",
				children: [{
					type: "name",
					title: "Sem segurança",
					content: "Selecione esta opção para desativar a segurança da rede Wi-Fi. É altamente recomendado que ative a segurança Wi-Fi para proteger a sua rede sem fios de acessos não autorizados."
				},{
					type: "name",
					title: "WPA/WPA2-Pessoal",
					content: "Selecione esta opção para ativar o método de autenticação standard, com base numa chave pré-partilhada (PSK). Esta é a opção mais comum e recomendada. Se selecionado, configure os passos seguintes.",
					children: [{
						type: "name",
						title: "Versão",
						content: "Selecione uma versão de segurança para a sua rede sem fio.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Esta opção oferece suporte a múltiplas implementações standard do WPA (Wi-Fi Protected Access) , como o WPA e WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Esta opção garante um bom nível de segurança. Se selecionada, a função WPS não ficará disponível nesta banda."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Esta opção oferece um melhor nível de segurança do que o WPA-PSK e é recomendado."
						}]
					},{
						type: "name",
						title: "Encriptação",
						content: "Selecione um tipo de encriptação de segurança: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), ou Auto (tanto para TKIP ou AES). Não é recomendado usar a encriptação TKIP se o Router operar em modo 802.11n, porque o TKIP não é suportado pela norma 802.11n. Se o TKIP for selecionado, a função WPS será desativada."
					},{
						type: "name",
						title: "Senha",
						content: "Digite neste campo a senha da rede Wi-Fi. Pode inserir 8 a 63 caracteres ASCII ou 8 a 64 caracteres hexadecimais. Este campo é sensível a caracteres em maiúsculas e minúsculas."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Empresarial",
					content: "Selecione esta opção para ativar o método de autenticação mais avançado usando um servidor RADIUS (Remote Authentication Dial In User Service). Se selecionada, a função WPS será desativada nesta banda.",
					children: [{
						type: "name",
						title: "Versão",
						content: "Selecione uma versão de segurança para a sua rede sem fio.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Esta opção oferece suporte a múltiplas implementações standard do WPA (Wi-Fi Protected Access) , como o WPA e WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Esta opção oferece um bom nível de segurança."
						},{
							type: "name",
							title: "WPA2",
							content: "Esta opção oferece um melhor nível de segurança do que o WPA-PSK e é recomendado."
						}]
					},{
						type: "name",
						title: "Encriptação",
						content: "Selecione um tipo de codificação: TKIP (Temporal Key Integrity Protocol/Protocolo de Integridade da Chave Temporal ), AES (Advanced Encryption Standard/Padrão de Codificação Avançada), ou Automático (tanto para TKIP como para AES). NÃO se recomenda utilizar a codificação TKIP se o roteador funciona no modo 802.11N , porque o TKIP não é suportado pela especificação 802.11n."
					},{
						type: "name",
						title: "IP Servidor RADIUS",
						content: "Insira o endereço IP do servidor RADIUS."
					},{
						type: "name",
						title: "Porta RADIUS",
						content: "Insira o número de porta do servidor RADIUS."
					},{
						type: "name",
						title: "Senha RADIUS",
						content: "insira a senha partilhada do servidor RADIUS."
					}]
				},{
					type: "name",
					title: "WEP",
					content: "Selecione esta opção para ativar método básico de autenticação se existirem dispositivos na sua  rede que só possam aceder à sua rede Wi-Fi utilizando WEP (Wired Equivalent Privacy). Se selecionado, a função WPS será desativada nesta banda.",
					children: [{
						type: "name",
						title: "Tipo",
						content: "Selecione um tipo de autenticação para a sua rede sem fio. Por defeito é Auto, que escolhe automaticamente Sistema Aberto ou Chave Partilhada com base na capacidade e pedido de acesso do cliente Wi-Fi."
					},{
						type: "name",
						title: "Formato de Chave WEP",
						content: "Selecione formato ASCII ou Hexadecimal. O formato ASCII é uma combinação de caracteres alfabéticos e numéricos. O formato hexadecimal é uma combinação de números (0-9) e letras (a-f, A-F)."
					},{
						type: "name",
						title: "Tipo de Chave",
						content: "Selecione o tamanho da chave WEP.",
						children:[{
							type: "name",
							title: "64 bits",
							content: "Permite inserir 10 dígitos hexadecimais (0-9, A-F, a-f) ou 5 caracteres ASCII no campo Valor WEP."
						},{
							type: "name",
							title: "128-bit",
							content: "Permite inserir 26 dígitos hexadecimais (0-9, A-F, a-f) ou 13 caracteres ASCII no campo Valor WEP."
						}]
					},{
						type: "name",
						title: "Valor Chave",
						content: "Insira a chave WEP no respetivo campo."
					}]
				}]
			},{
				type: "name",
				title: "Modo",
				content: "Selecione um modo de transmissão misto."
			},{
				type: "name",
				title: "Largura de Canal",
				content: "Selecione a largura de canal (largura de banda) para a rede Wi-Fi 5GHz."
			},{
				type: "name",
				title: "Canal",
				content: "Selecione um canal de funcionamento para a rede Wi-Fi 5GHz. Auto é a opção predefinida e recomendada. Recomendamos deixar o canal em Auto se não tiver problemas intermitentes de ligação Wi-Fi."
			},{
				type: "name",
				title: "Potência de Transmissão",
				content: "Selecione Alta, Média ou Baixa para especificar a potência de transmissão. A configuração predefinida e recomendada é Alta."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		WIRELESS_60G: {	
			TITLE: "60GHz sem fios",
			CONTENT: [{
				type: "name",
				title: "Ativar Rádio Wi-Fi",
				content: "Selecione essa caixa de verificação para ativar a frequência de rádio sem fios de  60GHz. Se desativada, a função WPS não é suportada nesta banda."
			},{
				type: "name",
				title: "Nome de Rede Wi-Fi (SSID)",
				content: "Pode deixar o nome da rede Wi-Fi (SSID) predefinido ou introduzir um novo nome (até 32 caracteres). Este campo é sensível a caracteres em maiúsculas e minúsculas."
			},{
				type: "name",
				title: "Ocultar SSID",
				content: "Selecione esta caixa de verificação se quiser ocultar o nome da rede 60GHz (SSID) da lista de redes Wi-Fi. Se selecionada, a função WPS não é suportada nesta banda."
			},{
				type: "name",
				title: "Segurança",
				content: "Escolha uma das seguintes opções de segurança:",
				children: [{
					type: "name",
					title: "Sem Segurança",
					content: "Selecione esta opção para desativar a segurança da rede Wi-Fi. É altamente recomendado que ative a segurança Wi-Fi para proteger a sua rede sem fios de acessos não autorizados."
				},{
					type: "name",
					title: "WPA2-Personal",
					content: "Selecione esta opção para ativar o método de autenticação padrão com base numa chave pré-partilhada (PSK), também chamada de frase de acesso. O tipo de codificação é GCMP. Esta opção é recomendada. Se selecionada, configure o seguinte.",
					children: [{
						type: "name",
						title: "Senha",
						content: "Digite neste campo a senha da rede Wi-Fi. Pode inserir 8 a 63 caracteres ASCII ou 8 a 64 caracteres hexadecimais. Este campo é sensível a caracteres em maiúsculas e minúsculas."
					}]
				},{
					type: "name",
					title: "WPA2-Enterprise",
					content: "Selecione esta opção para ativar o método de autenticação mais avançado através de um servidor RADIUS (Remote Authentication Dial In User Service/Serviço de utilizador de ligação telefónica por autenticação remota). O tipo de codificação é GCMP. Se selecionada, a função WPS não é suportada nesta banda.",
					children: [{
						type: "name",
						title: "IP Servidor RADIUS",
						content: "Insira o endereço IP do servidor RADIUS."
					},{
						type: "name",
						title: "Porta RADIUS",
						content: "Insira o número da porta do servidor RADIUS."
					},{
						type: "name",
						title: "Senha RADIUS",
						content: "insira a senha partilhada do servidor RADIUS."
					}]
				}]
			},{
				type: "name",
				title: "Canal",
				content: "Selecione um canal de funcionamento para a rede sem fios de 60GHz. É recomendável deixar o canal em Automático, se não estiver a experimentar problemas de ligação sem fios intermitente."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		WPS: {	
			TITLE: "PIN do Router",
			CONTENT: [{
				type: "paragraph",
				content: "Outros dispositivos podem ligar-se ao router via WPS utilizando o PIN do router."
			},{
				type: "name",
				title: "PIN do Router",
				content: "Mude para Ligado para permitir que dispositivos Wi-Fi se possam conectar usando o PIN do router (Personal Identification Number)."
			},{
				type: "name",
				title: "PIN",
				content: "Mostra o código PIN do Router. O PIN predefinido pode ser encontrado na etiqueta do router. Clique em Gerar para gerar um novo PIN de forma aleatória ou clique em Predefinido para restaurar o PIN para o valor predefinido de fábrica."
			}]
		},

		WPS_WIZARD: {
			TITLE: "Guia de Configuração Rápida do WPS",
			CONTENT:[{
				type: "paragraph",
				content: "WPS apenas suporta a seguinte configuração: Ativar <Enable Wireless Radio>, Desativar <Hide SSID> e segurança é <No Security> ou <WPA/WPA2-Personal>(WPA2-PSK ou auto + AES ou auto) na condição em que a função WPS está ativa."
			},{
				type: "name",
				title: "Botão (Recomendado)",
				content: "Selecione este método de configuração para ativar a função WPS no router, que permite que qualquer dispositivo com WPS se possa conectar facilmente à sua rede Wi-Fi usando o botão WPS ou virtualmente usando o botão Conectar."
			},{
				type: "name",
				title: "PIN",
				content: "Selecione este método de configuração para adicionar um dispositivo manualmente, digitando o PIN WPS do dispositivo Wi-Fi no campo e clicando em Conectar."
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "Estações Wi-Fi Ligadas",
			CONTENT: [{
				type: "name",
				title: "Número de Clientes",
				content: "Exibe o número de clientes Wi-Fi associados."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Mostra o endereço MAC do cliente Wi-Fi associado."
			},{
				type: "name",
				title: "Tipo de Ligação",
				content: "Exibe a banda de frequência sem fios (de 2.4GHz, 5GHz e 60GHz) do clientes sem fios associado."
			},{
				type: "name",
				title: "Segurança",
				content: "Mostra o tipo de segurança do cliente Wi-Fi associado."
			},{
				type: "name",
				title: "Pacotes Recebidos",
				content: "Mostra o número de pacotes recebidos pelo cliente Wi-Fi associado."
			},{
				type: "name",
				title: "Pacotes Enviados",
				content: "Mostra o número de pacotes enviados pelo cliente Wi-Fi associado."
			},{
				type: "paragraph",
				content: "Clique em Atualizar para atualizar as informações nesta página."
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "Definições",
			CONTENT: [{
				type: "paragraph",
				content: "A Rede de Convidados permite criar uma rede Wi-Fi isolada, com um nome de rede (SSID) e senha diferentes, possibilitando aos seus convidados e amigos acesso à Internet sem terem acesso à sua rede local e logo sem comprometer a segurança da sua informação privada."
			},{
				type: "name",
				title: "Permitir que os convidados se vejam entre si",
				content: "Selecione esta opção para permitir que os dispositivos Wi-Fi da Rede de Convidados possam comunicar entre si."
			},{
				type: "name",
				title: "Permitir que os convidados acedam à minha rede local",
				content: "Selecione esta opção para permitir que os dispositivos Wi-Fi da rede de Convidados acedam a pastas, ficheiros e impressoras partilhadas na rede local."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "Wi-Fi 2.4GHz/5GHz",
			CONTENT: [{
				type: "name",
				title: "Ativar Rede de Convidados",
				content: "Selecione esta opção para ativar a função Rede de Convidados."
			},{
				type: "name",
				title: "Nome da Rede Wi-Fi (SSID)",
				content: "Utilize o SSID predefinido ou crie um novo nome  de rede Wi-Fi (até 32 caracteres)."
			},{
				type: "name",
				title: "Ocultar SSID",
				content: "Selecione esta opção se desejar esconder o SSID da Rede de Convidados das listas de redes Wi-Fi."
			}/*,{
				type:"name",
				id:"pwd_mode",
				title:"Intervalo de Atualização da Senha",
				content:"Selecione o intervalo de atualização da Senha da Rede de Convidados"
			}*/,{
				type: "name",
				title: "Segurança",
				content: "Quando opta por nunca atualizar  a senha, selecione uma das seguintes opções de segurança:",
				children: [{
					type: "name",
					title: "Sem segurança",
					content: "Selecione esta opção para desativar a segurança da rede Wi-Fi. É altamente recomendado que ative a segurança Wi-Fi para proteger a sua rede sem fios de acessos não autorizados."
				},{
					type: "name",
					title: "WPA/WPA2-Pessoal",
					content: "Selecione esta opção para ativar o método de autenticação predefinido com base numa chave pré-partilhada (PSK). Esta é a opção mais comum e recomendada. Se selecionado, configure os passos seguintes.",
					children: [{
						type: "name",
						title: "Versão",
						content: "Selecione uma versão de segurança para a sua rede sem fio.",
						children: [{
							type: "name",
							title: "Auto",
							content: "Esta opção oferece suporte a múltiplas implementações standard do WPA (Wi-Fi Protected Access) , como o WPA e WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Esta opção oferece um bom nível de segurança."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Esta opção oferece um melhor nível de segurança do que o WPA-PSK e é recomendado."
						}]
					},{
						type: "name",
						title: "Encriptação",
						content: "Selecione um tipo de codificação: TKIP (Temporal Key Integrity Protocol/Protocolo de Integridade da Chave Temporal ), AES (Advanced Encryption Standard/Padrão de Codificação Avançada), ou Automático (tanto para TKIP como para AES). NÃO se recomenda utilizar a codificação TKIP se o roteador funciona no modo 802.11N , porque o TKIP não é suportado pela especificação 802.11n."
					}]
			}]},{
				type: "name",
				title: "Senha",
				content: "Utilize ou a senha gerada aleatoriamente ou crie uma senha entre 8 a 63 caracteres ASCII ou entre 8 e 64 caracteres hexadecimais (0-9, a-f, A-F)."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},

		NAT: {
			TITLE: "Application Layer Gateway/Gateway da Camada de Proteção(ALG)",
			CONTENT: [{
				type: "paragraph",
				content: "O ALG permite personalizar filtros transversais sobre NAT (Network Address Translation) para facilitar a transposição de endereços e portas de protocolos utilizados por determinado tipo de aplicações como FTP, TFTP, H323, etc. É recomendado ativar o ALG."
			},{
				type: "name",
				title: "Ativar FTP ALG",
				content: "Se selecionada, permite aos clientes e servidores do FTP(File Transfer Protocol/Protocolo de Transferência de Ficheiro) transferir dados via NAT."
			},{
				type: "name",
				title: "Ativar TFTP ALG",
				content: "Se selecionada, permite aos clientes e servidores do TFTP (Trivial File Transfer Protocol/Protocolo de Transferência de Ficheiro Trivial) transferir dados via NAT."
			},{
				type: "name",
				title: "Ativar H323 ALG",
				content: "Se selecionado, permite que clientes Microsoft NetMeeting comuniquem via NAT."
			},{
				type: "name",
				title: "Ativar RTSP ALG",
				content: "Se selecionado, permite aos clientes do media player comunicar com servidores de streaming multimédia via NAT."
			},{
				type: "name",
				title: "Ativar Passagem de Tráfego PPTP",
				content: "Se selecionado, permite que sessões Ponto-a-Ponto sejam encapsuladas através de uma rede IP e passem pelo Router."
			},{
				type: "name",
				title: "Ativar Passagem de Tráfego L2TP",
				content: "Se selecionado, permite que sessões L2 Ponto-a-Ponto sejam encapsuladas através de uma rede IP e passem pelo Router."
			},{
				type: "name",
				title: "Ativar Passagem de Tráfego IPSec",
				content: "Se selecionado, permite que o tráfego IPSec (Internet Protocol Security) possa ser encapsulado através de uma rede IP e passe pelo Router. O IPSec utiliza serviços de segurança criptográfica para garantir comunicações privadas e seguras através de redes IP."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "Servidores Virtuais",
			CONTENT: [{
				type: "paragraph",
				content: "Servidores virtuais são usados para configurar serviços públicos em sua rede local. Um servidor virtual é definido como uma porta externa, e todas as solicitações da Internet para esta porta externa serão redirecionadas para um computador designado, que deve ser configurado com um endereço IP estático ou reservado."
			},{
				type: "name",
				title: "Tipo de Serviço",
				content: "Exibe o nome do seu servidor virtual."
			},{
				type: "name",
				title: "Porta Externa",
				content: "Exibe o número da porta ou um intervalo de portas usadas pelo servidor virtual."
			},{
				type: "name",
				title: "IP Interno",
				content: "Mostra o endereço IP do computador que executa o aplicativo de serviço."
			},{
				type: "name",
				title: "Porta Interna",
				content: "Mostra o número da porta do computador que executa o aplicativo de serviço."
			},{
				type: "name",
				title: "Protocolo",
				content: "Mostra o protocolo usado para o aplicativo de serviço: TCP, UDP, ou ALL (todos os protocolos suportados pelo router)."
			},{
				type: "name",
				title: "Estado",
				content: "Mostra o status atual (ativado ou desativado) da regra especifica de filtragem."
			},{
				type: "name",
				title: "Modificar",
				content: "Mostra opções para Modificar ou Apagar a regra correspondente."
			},{
				type: "step",
				title: "Definir Regra de Servidor Virtual",
				content: [
					"1. Clique em Adicionar.",
					"2. Clique em Ver Serviços Existentes para selecionar um serviço da lista e para preencher automaticamente com o número de porta adequado os campos de Porta Externa e Porta Interna. Se o serviço não estiver na lista, digite o número da porta externa (por exemplo, 21) ou um intervalo de portas (por exemplo, 21-25). Deixe a porta interna em branco se é o mesmo que o da porta externa ou digite um número de porta específico (por exemplo, 21) se a porta externa é uma única porta. Digite o endereço IP do computador que executa o aplicativo de serviço no formato decimal com pontos no campo IP Interno.",
					"3. Selecione um protocolo para o aplicativo de serviço: TCP, UDP, ou Tudo a partir da lista Protocolo.",
					"4. Selecione Ativar.",
					"5. Clique em OK."
				]
			},{
				type: "step",
				title: "Para modificar ou apagar uma regra de Servidor Virtual",
				content: "Na tabela clique no ícone Editar ou no ícone Lixo que corresponde à regra que deseja modificar ou apagar."
			},{
				type: "step",
				title: "Para apagar várias regras",
				content: "Selecione todas as regras que deseja excluir, clique em Apagar acima da tabela."
			},{
				type: "note",
				title: "Nota",
				content: "Se o dispositivo local está a alojar mais de um tipo de serviços, terá de criar uma regra para cada serviço."
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "Port Triggering",
			CONTENT: [{
				type: "paragraph",
				content: "Port Triggering é usado para encaminhar tráfego de uma determinada porta para um servidor específico na rede."
			},{
				type: "name",
				title: "Aplicação",
				content: "Exibe o nome da aplicação"
			},{
				type: "name",
				title: "Triggering Port",
				content: "Exibe a porta de saída de tráfego usado para acionar uma regra de filtragem de uma ligação de saída."
			},{
				type: "name",
				title: "Trigger Protocol",
				content: "Exibe o protocolo usado para o Triggering Port. TCP, UDP, ou Todos (todos os protocolos suportados pelo Router)."
			},{
				type: "name",
				title: "Porta Externa",
				content: "Exibe o intervalo de portas ou porta usada pelo sistema remoto. Uma resposta usando uma destas portas será encaminhada para o PC que acionou esta regra. Pode introduzir no máximo 5 grupos de portas (ou seções portas). Cada grupo de portas devem ser separados por \",\" (vírgula), por exemplo, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
			},{
				type: "name",
				title: "Protocolo Externo",
				content: "Exibe o protocolo utilizado para a Porta de Entrada: TCP, UDP, ou Todos (todos os protocolos suportados pelo Router)."
			},{
				type: "name",
				title: "Estado",
				content: "Mostra o status atual (ativado ou desativado) da regra especifica de filtragem."
			},{
				type: "name",
				title: "Modificar",
				content: "Mostra opções para Modificar ou Apagar a regra correspondente."
			},{
				type: "step",
				title: "Para configurar uma regra de Port Triggering",
				content: [{
					type: "note",
					title: "Nota",
					content: "Nota: Cada regra só pode ser usada por um dispositivo de cada vez."
				},
					"1. Clique em Adicionar.",
					"2. Clique em Ver Aplicações Existentes para selecionar um aplicativo da lista para preencher automaticamente os valores predefinidos nos campos apropriados. Se quiser adicionar um aplicativo não listado, digite manualmente Aplicação, Triggering Port, Triggering Protocol, Porta Externa e Protocolo Externo.",
					"3. Selecione Ativar.",
					"4. Clique em OK."
				]
			},{
				type: "step",
				title: "Para modificar ou excluir uma regra de Port Triggering",
				content: "Na tabela clique no ícone Editar ou no ícone Lixo que corresponde à regra que deseja modificar ou apagar."
			},{
				type: "step",
				title: "Para apagar várias regras de Port Triggering",
				content: "Na tabela, selecione todas as regras que você deseja excluir, clique em Apagar acima da tabela."
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "A funcionalidade DMZ (zona desmilitarizada) permite que um dispositivo local seja exposto à Internet para uma finalidade especial, como jogar pela Internet ou videoconferência. Basicamente, a DMZ permite que um único computador na LAN possa abrir todas as suas portas. Este computador tem de ser configurado com um endereço IP estático e ter sua função de cliente DHCP desativado."
			},{
				type: "step",
				title: "Para assignar um computador ou servidor para ser um servidor DMZ",
				content: [
					"1. Clique em Ativar DMZ.",
					"2. No campo Endereço IP de Dispositivo DMZ, digite o endereço IP do computador local que será configurado como o host DMZ.",
					"3. Clique em Gravar."
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "Por defeito, o função Universal Plug-and-Play (UPnP) está ativada, para permitir que dispositivos como computadores e appliences de Internet possam descobrir e comunicar uns com os outros automaticamente na rede local."
			},{
				type: "paragraph",
				content: "A Lista de Serviços UPnP exibe as informações de dispositivos UPnP."
			},{
				type: "name",
				title: "Descrição do Serviço",
				content: "Exibe uma breve descrição do dispositivo local que inicia a solicitação UPnP."
			},{
				type: "name",
				title: "Porta Externa",
				content: "Exibe a porta externa que é aberta pelo dispositivo local."
			},{
				type: "name",
				title: "Protocolo",
				content: "Exibe o tipo de protocolo de rede que é usado pelo dispositivo local."
			},{
				type: "name",
				title: "Endereço IP Interno",
				content: "Exibe o endereço IP do dispositivo local."
			},{
				type: "name",
				title: "Porta Interna",
				content: "Exibe a porta interna que é aberta pelo dispositivo local."
			},{
				type: "paragraph",
				content: "Clique em Atualizar para atualizar a lista de Servidores UPnP."
			}]
		},
		
		DISK_SETTING: {	
			TITLE: "Definições de Dispositivo",
			CONTENT: [{
				type: "paragraph",
				content: "A página de Definições de Dispositivo mostra a informação relativa a qualquer dispositivo de armazenamento USB conectado via porta USB."
			},{
				type: "name",
				title: "Examinar",
				content: "Normalmente, o Router deteta automaticamente qualquer dispositivo recentemente conectado. Se tal não suceder, clique no botão Examinar para procura qualquer novo dispositivo conectado e refrescar a página com informações atualizadas."
			},{
				type: "name",
				title: "Volume",
				content: "Mostra o nome do volume USB."
			},{
				type: "name",
				title: "Capacidade",
				content: "Mostra a capacidade de armazenamento total do dispositivo USB."
			},{
				type: "name",
				title: "Espaço Livre",
				content: "Mostra o espaço de armazenamento atualmente disponível."
			},{
				type: "name",
				title: "Remover em Segurança",
				content: "Clique nesse botão para desmontar de forma segura o dispositivo de armazenamento USB antes de desconectá-lo fisicamente da porta USB do router."
			},{
				type: "paragraph",
				content: "Por favor, note que o botão Remover em Segurança só aparece quando há um dispositivo de armazenamento USB conectado ao router. Além disso, tenha em atenção que não é possível desmontar o dispositivo USB enquanto este estiver ocupado."
			},{
				type: "name",
				title: "Status",
				content: "Esta opção só aparece quando há um dispositivo de armazenamento USB conectado ao router. Selecione para ativar a partilha do conteúdo do dispositivo USB."
			},{
				type: "step",
				title: "Configurar o Servidor de Ficheiros",
				content: [
				"1. Conecte o dispositivo de armazenamento USB à porta USB do router usando um cabo USB.",
				"2. O dispositivo USB conectado deve ser automaticamente detetado pelo Router e exibidas as informações respetivas na seção Definições de Dispositivo. Se não, clique em Examinar.",
				"3. Selecione Ativar para ativar a partilha de ficheiros."
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "Conta de Partilha",
			CONTENT: [{
				type: "name",
				title: "Conta",
				content: "Pode selecionar o uso de conta predefinida para aceder aos arquivos e pastas partilhadas ou Criar Nova Conta,  seguindo os próximos passos para criar uma nova conta de utilizador."
			},{
				type: "name",
				title: "Utilizador/Senha",
				content: "Introduza um nome de utilizador entre 1 e 15 caracteres alfanuméricos e uma senha entre 1 e 15 caracteres ASCII. Estes campos são sensíveis a letra minúscula/maiúscula."
			},{
				type: "name",
				title: "Confirmar Senha",
				content: "Digite novamente a senha para confirmar que não há erro de digitação. Este campo também é sensível a caracteres em maiúsculas e minúsculas."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "Definições de Partilha",
			CONTENT: [{
				type: "name",
				title: "Nome de Servidor de Rede/Media",
				content: "Apresenta o nome usado para aceder ao dispositivo de armazenamento USB. O nome deverá ser composto por caracteres alfanuméricos, sob traços ou hifenes, com um comprimento entre 4 e 15 caracteres."
			},{
				type: "name",
				title: "Ativar",
				content: "Selecione para ativar o método de acesso."
			},{
				type: "name",
				title: "Método de Acesso",
				content: "Existem três métodos para permitir o acesso aos dispositivos de armazenamento USB conectados. Pode escolher um ou mais métodos de acesso, selecionando a caixa de seleção correspondente.",
				children: [{
					type: "name",
					title: "Vizinhança de Rede",
					content: "Se ativado, os utilizadores da sua rede podem aceder ao dispositivo de armazenamento USB utilizando um endereço IP atribuído (por exemplo, \\\\192.168.0.1). "
				},{
					type: "name",
					title: "FTP",
					content: "Se ativado, os clientes FTP na sua rede local podem aceder ao dispositivo de armazenamento USB, usando o endereço IP atribuído, seguido do número da porta do servidor FTP (por exemplo ftp://192.168.0.1:21)."
				},{
					type: "name",
					title: "FTP (Via Internet)",
					content: "Se ativado, os utilizadores podem aceder remotamente à unidade de armazenamento USB por FTP a partir da Internet. Esta opção permite tanto o download como o upload de ficheiros. Para alterar o número da porta do servidor de FTP, digite um número de porta e clique em Gravar para guardar e ativar as alterações."
				}]
			},{
				type: "name",
				title: "Ligação",
				content: "Mostra o endereço usado para aceder ao dispositivo de armazenamento USB partilhado."
			},{
				type: "name",
				title: "Porta",
				content: "Exibe o número da porta do servidor FTP. Utilize o valor 21 por defeito ou um valor entre 1024 e 65535."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "Partilha de Pastas",
			CONTENT: [{
				type: "name",
				title: "Partilhar Tudo",
				content: "Mude para Ligado para partilhar todas as pastas e ficheiros ou mantenha Desligado para partilhar somente pastas especificas."
			},{
				type: "name",
				title: "Ativar Autenticação",
				content: "É altamente recomendável ativar a autenticação, para exigir que os utilizadores insiram um nome de utilizador e senha válidos para acederem às pastas partilhadas."
			},{
				type: "name",
				title: "Nome da Pasta",
				content: "Mostra o nome da pasta partilhada."
			},{
				type: "name",
				title: "Caminho para Pasta",
				content: "Mostra o caminho para a pasta partilhada."
			},{
				type: "name",
				title: "Partilha de Média",
				content: "Indica se a pasta partilhada permite ou não a partilha de conteúdos multimédia."
			},{
				type: "name",
				title: "Nome de Volume",
				content: "Exibe o nome do volume partilhado."
			},{
				type: "name",
				title: "Estado",
				content: "Mostra o estado da pasta partilhada pelo indicador tipo lâmpada. "
			},{
				type: "name",
				title: "Modificar",
				content: "Mostra opções para Modificar ou Apagar a pasta partilhada correspondente."
			},{
				type: "name",
				title: "Procurar",
				content: "Clique para procurar uma pasta partilhada."
			},{
				type: "name",
				title: "Permitir Acesso da Rede de Convidados",
				content: "Selecione para permitir que clientes da Rede de Convidados possam aceder às pastas partilhadas."
			},{
				type: "name",
				title: "Ativar Autenticação",
				content: "Selecionar para obrigar os utilizadores a terem um nome de utilizador e senha válidos para acederem às pastas partilhadas."
			},{
				type: "name",
				title: "Ativar Acesso de Escrita",
				content: "Selecione para permitir que os utilizadores façam alterações no conteúdo da pasta."
			},{
				type: "name",
				title: "Ativar a Partilha de Média",
				content: "Selecione para ativar a partilha de Média."
			},{
				type: "name",
				title:"Atualizar",
				content: "Clique para atualizar a lista de pastas partilhadas."
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "Servidor de Impressão",
			CONTENT: [{
				type: "name",
				title:"Servidor de Impressão",
				content: "Mude para Ligado para ativar a função de servidor de impressão"
			},{
				type: "name",
				title:"Nome da Impressora",
				content: "Mostra o nome da impressora conectada ao router."
			}]
		},
		
		OFFLINE_DOWNLOAD: {	
			TITLE: "Download Offline",
			CONTENT: [{
				type: "name",
				title:"Status",
				content: "Alternar para ativar o recurso de transferência offline."
			},{
				type: "name",
				title:"Caminho para Pasta",
				content: "Diretório de trabalho da função de transferência offline. Terá de escolher um caminho de diretório após o botão de estado estar ligado, ou a tabela de operação do item permanecerá invisível, o que significa que não poderá fazer mais nada. Uma vez que o diretório de trabalho é definido, todos os ficheiros criados pelas operações seguintes são guardadas ou armazenadas em cache no diretório. Se houver itens ativos, o diretório de trabalho não pode ser alterado, e se recomenda não extrair o armazenamento USB, já que isso pode causar erros fatais não passíveis de recuperação."
			},{
				type: "name",
				title:"Agendar",
				content: "Se selecionado, pode definir o tempo de transferência. O horário entrará em vigor com base na hora do sistema do router, que pode ser definida em \"Ferramentas do Sistema -> Definições da hora\"."
			},{
				type: "name",
				title:"Continue a semear após a tarefa estar concluída",
				content: "Se selecionado, a tarefa concluída continuará a propagar-se"
			},{
				type: "name",
				title: "Número máximo de tarefas ativas",
				content: "Exibe o número máximo de tarefas ativas."
			},{
				type: "name",
				title:"Velocidade máxima de download",
				content: "Exibe a velocidade máxima de transferência."
			},{
				type: "name",
				title:"Velocidade máxima de upload",
				content: "Exibe a velocidade mínima de carregamento."
			},{
				type: "name",
				title: "Número de ligações",
				content: "Exibe as definições da ligação."
			},{
				type: "name",
				title: "Número máximo global de ligações",
				content: "Modifique para limitar o número máximo de ligações de todas as tarefas."
			},{
				type: "name",
				title: "Número máximo de pares ligados pelo Torrent",
				content: "Modificar para limitar o número máximo de pares ligados por tarefa."
			},{
				type: "name",
				title: "Ative a rede DHT",
				content: "Se selecionado, o DHT é ativado."
			},{
				type: "name",
				title: "Ative a troca de pares",
				content: "Se selecionado, a troca de informações entre pares é ativada."
			},{
				type: "name",
				title: "Ative a codificação do protocolo BitTorrent",
				content: "Se selecionado, a codificação do protocolo BitTorrent é ativada."
			},{
				type: "name",
				title:"Servidor aMule",
				content: "Digite o endereço IP e a porta do servidor aMule para ligar."
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "Itens",
			CONTENT: [{
				type: "paragraph",
				content: "Exibe os itens da transferência."
			},{
				type: "name",
				title: "Ficheiro",
				content: "Exibe o nome do ficheiro da transferência."
			},{
				type: "name",
				title:"Velocidade",
				content: "Exibe a velocidade de carregamento e transferência."
			},{
				type: "name",
				title: "Concluído",
				content: "Exibe o tamanho completo e o tamanho total."
			},{
				type: "name",
				title:"Tempo restante",
				content: "Exibe o tempo restante antes da conclusão da transferência."
			},{
				type: "name",
				title:"Pares ligados",
				content: "Exibe a informação dos pares ligados."
			},{
				type: "name",
				title: "Status",
				content: "Exibe o estado da tarefa."
			},{
				type: "name",
				title: "Fonte",
				content: "Exibe o tipo de transferência."
			},{
				type: "step",
				title: "Para adicionar um item da transferência",
				content: [
					"1. Clique em Adicionar.",
					"2. Selecione o tipo de letra da transferência:",
					"1) Torrente do PC: Clique em Procurar para selecionar um ficheiro torrent no PC.",
					"2) Torrent a partir do USB: Selecione um volume e clique em Procurar para selecionar um ficheiro torrent a partir de um dispositivo USB.",
					"3) URL: Digite a URL(HTTP, HTTPS, FTP, ed2k).",
					"3. Clique em OK."
				]
			}]
		},
		
		PARENTAL_CONTROL: {	
			TITLE: "Controlo Parental",
			CONTENT: [{
				type: "paragraph",
				content: "Com Controlo Parental pode bloquear sites inapropriados, com conteúdos explícitos e maliciosos; restringir o acesso por determinadas horas do dia (por exemplo, facebook ou youtube durante o tempo dos trabalhos de casa) e, ao mesmo tempo, proteger todos os dispositivos da sua rede contra malware e phishing, através um ponto de controlo central."
			},{
				type: "name",
				title: "Controlo Parental",
				content: "Mude para Ligado para ativar a função de controlo parental. Por defeito, este recurso está desativado."
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "Dispositivos sob Controlo Parental",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra a lista de dispositivos sob Controlo Parental."
			},{
				type: "name",
				title: "Nome do Dispositivo",
				content: "Mostra o nome de todos os dispositivos ligados que estão atualmente sob controlo parental."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Mostra o endereço MAC de todos os dispositivos ligados que estão atualmente sob controlo parental."
			},{
				type: "name",
				title: "Tempo de Acesso à Internet",
				content: "Exibe os períodos de restrição de acesso. A programação de tempo tem efeito com base na hora do sistema do Router, que pode ser configurado em \"Ferramentas do Sistema -> Configurações de hora\"."
			},{
				type: "name",
				title: "Descrição",
				content: "Mostra uma breve descrição do dispositivo ligado. É uma configuração opcional."
			},{
				type: "name",
				title: "Estado",
				content: "Mostra o status atual (ativado ou desativado) do controlo parental do dispositivo correspondente."
			},{
				type: "name",
				title: "Modificar",
				content: "Mostra opções para Modificar ou Apagar o dispositivo correspondente."
			},{
				type: "step",
				title: "Para restringir um novo dispositivo cliente",
				content: [
					"1. Clique em Adicionar.",
					"2. Clique em Ver Dispositivos Existentes e escolher um dispositivo ligado atualmente na Lista de Acesso de Dispositivos, ou digite o nome do dispositivo e Endereço MAC manualmente para adicionar um dispositivo que não esteja ligado.",
					"3. Clique no ícone Tempo de Acesso à Internet para especificar um período de tempo durante o qual a restrição se aplica.",
					"4. Insira uma breve descrição no campo Descrição. (Opcional)",
					"5. Selecione Ativar.",
					"6. Clique em OK para gravar esta entrada."
				]
			},{
				type: "paragraph",
				content: "Para modificar ou excluir uma entrada de Controlo Parental basta clicar no ícone Editar para editar as informações ou no ícone Lixo para remover a entrada correspondente."
			},{
				type: "paragraph",
				content: "Para apagar várias entradas, selecione todas as entradas e clique em Apagar acima da tabela."
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "Restrição de Conteúdos",
			CONTENT: [{
				type: "name",
				title: "Lista Negra",
				content: "Contém as palavras-chave que serão utilizadas para bloquear acesso a qualquer site a partir de dispositivos especificados na lista de Controlo Parental.",
				children: [{
					type: "paragraph",
					content: "Clique em Adicionar Nova Palavra para adicionar uma palavra-chave à lista negra. Para excluir uma palavra-chave, clique no ícone (-) da palavra-chave que deseja eliminar."
				}]
			},{
				type: "name",
				title: "Lista Branca",
				content: "Contém os endereços dos sites aos quais os dispositivos especificados na lista de Controlo Parental têm acesso.",
				children: [{
					type: "paragraph",
					content: "Clique em Adicionar Novo Nome de Domínio para adicionar um site à lista de permissões. Para excluir um site, clique no ícone (-) do site que deseja eliminar."
				}]
			},{
				type: "note",
				title: "Nota",
				content: "As palavras-chave podem ser nomes de domínios, como por exemplo, mail.google.com ou www.facebook.com."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "A Qualidade de Serviço (QoS) ajuda a priorizar o tráfego de Internet baseado nas suas necessidades. Pode especificar o nível de prioridade para um dispositivo ou uma aplicação na lista de regras de QoS."
			},{
				type: "name",
				title: "Ativar QoS",
				content: "Clique nesta caixa de verificação para ativar a função de QoS."				
			},{
				type: "name",
				title: "Largura de Banda de Upload",
				content: "Indique a largura de banda máxima de upload fornecida pelo seu ISP (Internet Service Provider)."				
			},{
				type: "name",
				title: "Largura de banda de Download",
				content: "Digite a largura de banda de download máxima fornecida pelo seu ISP."
			},{
				type: "name",
				title: "Prioridade Alta",
				content: "Especifique a percentagem para o tráfego de alta prioridade."
			},{
				type: "name",
				title: "Prioridade Média",
				content: "Especifique a percentagem para o tráfego de prioridade média."
			},{
				type: "name",
				title: "Prioridade Baixa",
				content: "Especifique a percentagem para o tráfego de baixa prioridade."
			},{
				type: "note",
				title: "Nota",
				content: "O acumulado máximo (percentagem) de todas as prioridades é 1"
			},{
				type: "paragraph",
				content: "Clique em Gravar para gravar todas as suas configurações."
			}]
		},
		
		QOS_RULE: {
			TITLE: "Lista de Regras QoS",
			CONTENT: [{
				type: "name",
				title: "Tipo",
				content: "Selecione um tipo para adicionar regra de QoS à lista."
			},{
				type: "step",
				title: "Para configurar uma regra de alta/média/baixa prioridade por Dispositivo",
				content: [
					"1. Clique em Adicionar.",
					"2. Selecione Por Dispositivo.",
					"3. Clique em Ver Dispositivos Existentes para selecionar o dispositivo desejado na Lista de Dispositivos de Acesso, ou pode digitar um nome de dispositivo e respetivo endereço MAC manualmente nos campos Nome do Dispositivo e Endereço MAC.",
					"4. Clique em OK."
				]
			},{
				type: "step",
				title: "Para configurar uma regra de alta/média/baixa prioridade por Aplicação",
				content: [
					"1. Clique em Adicionar.",
					"2. Selecione Por Aplicação.",
					"3. Selecione a aplicação desejada a partir da lista de Aplicações, ou pode personalizar uma aplicação configurando para isso um nome, protocolo e porto de destino (1-65535) nos campos correspondentes. Pode introduzir um único porto, múltiplos portos ou um intervalo de portos, usando virgulas para separar (p. ex. 21,36-105,111).",
					"4. Clique em OK."
				]
			},{
				type: "step",
				title: "Para configurar uma regra de alta/média /baixa prioridade por Porta Física",
				content: [
					"1. Clique em Adicionar.",
					"2. Selecione Por Porta Física.",
					"3. Selecione a porta desejada.",
					"4. Clique em OK."
				]
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "Atualização da Base de Dados",
			CONTENT: [{
				type: "name",
				title: "Novo Ficheiro de Base de Dados",
				content: "Clique em Procurar para localizar o novo ficheiro de base de dados. Selecione e clique em Atualizar para atualizar a base de dados para a nova versão."
			},{
				type: "name",
				title: "Versão de Base de Dados",
				content: "Mostra a versão de base de dados atual."
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "Firewall",
			CONTENT: [{
				type: "name",
				title: "SPI Firewall",
				content: "O SPI (Stateful Packet Inspection) impede ataques cibernéticos e valida o tráfego que passa através do Router com base no protocolo. "
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "Proteção DoS",
			CONTENT: [{
				type: "name",
				title: "Proteção DoS",
				content: "A Proteção DoS (Denial of Service) protege a sua rede local contra ataques DoS que a inundariam com pedidos direcionados ao servidor."
			},{
				type: "name",
				title: "Filtro de Ataque ICMP-FLOOD",
				content: "Ative para impedir ataques por ICMP (Internet Control Message Protocol) inundem a sua rede local.",
				children: [{
					type: "name",
					title: "Desligado",
					content: "Sem proteção."
				},{
					type: "name",
					title: "Baixo",
					content: "Baixo nível de proteção e baixo impacto sobre o desempenho do router."
				},{
					type: "name",
					title: "Médio",
					content: "Nível moderado de proteção e impacto semi-perceptível no desempenho do router."
				},{
					type: "name",
					title: "Elevado",
					content: "Alto nível de proteção mas impacto significativo no desempenho do router."
				}]
			},{
				type: "name",
				title: "Filtro de Ataque UDP-FLOOD",
				content: "Ative para impedir ataques por UDP (User Datagram Protocol) inundem a sua rede local."
			},{
				type: "name",
				title: "Filtro de Ataque TCP-SYN-FLOOD",
				content: "Ative para impedir ataques por TCP-SYN (Transmission Control Protocol-Sincronize) inundem a sua rede local."
			},{
				type: "name",
				title: "Ignorar Ping na Porta WAN",
				content: "Ativar para ignorar pacotes ping da porta WAN"
			},{
				type: "name",
				title: "Proibir Ping na Porta LAN",
				content: "Ativar para proibir pacotes ping na porta LAN"
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "Lista de Dispositivos Bloqueados por DoS",
			CONTENT: [{
				type: "name",
				title: "Lista de Dispositivos Bloqueados por DoS",
				content: "lista os endereço IP e MAC de qualquer fonte bloqueada por ataque DoS."
			},{
				type: "step",
				title: "Para Apagar uma entrada",
				content: "Na Lista de Dispositivos selecione a entrada que deseja excluir e clique em Apagar acima da tabela."
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "Controlo de Acesso",
			CONTENT: [{
				type: "paragraph",
				content: "Controlo de Acessos é utilizado para permitir ou bloquear determinados computadores ou outro tipo de dispositivos de acederem à sua rede. Quando um dispositivo é bloqueado, não irá conseguir comunicar com outros dispositivos ou aceder à internet."
			},{
				type: "paragraph",
				content: "Para usar o controlo de acesso, ative este função e configure uma Lista Branca ou Negra. Se o controlo de acesso for desativado (Desligado), todos os dispositivos, incluindo os da lista negra, passarão a poder ligar-se."
			}]
		},
		
		ACCESS_MODE: {
			TITLE: "Modo de Acesso",
			CONTENT: [{
				type: "name",
				title: "Lista Negra",
				content: "Apenas aos dispositivos na Lista Negra será negado o acesso à rede."
			},{
				type: "name",
				title: "Lista Branca",
				content: "Apenas aos dispositivos na Lista Branca será permitido aceder à rede."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "Dispositivos Online",
			CONTENT: [{
				type: "name",
				title: "Nome do Dispositivo",
				content: "Exibe o nome do dispositivo conectado."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Exibe o endereço IP do dispositivo conectado."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Exibe o endereço MAC do dispositivo conectado."
			},{
				type: "name",
				title: "Tipo de Ligação",
				content: "Exibe o tipo de ligação do dispositivo conectado."
			},{
				type: "step",
				title: "Para bloquear um dispositivo",
				content: "Na tabela de Dispositivos Online, clique no ícone Bloquear na coluna Modificar que corresponde ao dispositivo que deseja bloquear."
			},{
				type: "step",
				title: "Para bloquear vários dispositivos",
				content: "Na tabela de dispositivos online, selecione todos os dispositivos que pretende bloquear e clique em Bloquear acima da tabela. O dispositivo será automaticamente adicionado aos dispositivos na lista negra."
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "Dispositivos nas Blacklist/Whitelist",
			CONTENT: [{
				type: "step",
				title: "Para colocar um dispositivo na Lista Branca ou Negra",
				content: [
					"1. Clique no ícone Adicionar.",
					"2. Insira o Nome do Dispositivo.",
					"3. Insira o Endereço MAC do Dispositivo.",
					"4. Clique em OK."
				]
			},{
				type: "step",
				title: "Para modificar ou apagar um dispositivo na Lista Negra/Branca",
				content: "Na tabela Lista Negra/Branca, clique no ícone Editar ou no ícone Lixo que corresponde ao dispositivo que deseja modificar ou apagar."
			},{
				type: "step",
				title: "Para apagar múltiplos dispositivos da Lista Negra/Branca",
				content: "Na tabela da Lista Negra/Branca, selecione todos os dispositivos que deseja excluir e clique em Apagar, acima da lista."
			}]
		},
		
		
		IPMAC_BIND_SETTING: {	
			TITLE: "Definições",
			CONTENT: [{
				type: "paragraph",
				content: "O vinculo ARP (Address Resolution Protocol) é útil para controlar o acesso de um computador específico na LAN, ligando entre si o endereço IP e o endereço MAC do dispositivo. O vinculo ARP também impede outros dispositivos de usar um endereço IP específico."
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "Lista ARP",
			CONTENT: [{
				type: "paragraph",
				content: "Exibe os endereços IP e MAC dos dispositivos ligados no momento."
			},{
				type: "name",
				title: "Número de Entrada ARP",
				content: "Exibe o número total de dispositivos que estão ligados ao router."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Exibe o endereço MAC do dispositivo conectado."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Exibe o endereço IP atribuído ao dispositivo conectado."
			},{
				type: "name",
				title: "Unir",
				content: "Indica se os endereços MAC e IP estão vinculados ou não."
			},{
				type: "name",
				title: "Modificar",
				content: "Exibe opções para Vincular ou Apagar a entrada correspondente da lista."
			},{
				type: "note",
				title: "Nota",
				content: "Nota: Não pode vincular o mesmo endereço IP a mais de um endereço MAC."
			}]
		},
		
		IPMAC_BIND_LIST: {	
			TITLE: "Lista de Vínculos",
			CONTENT: [{
				type: "step",
				title: "Para configurar um dispositivo com vinculo ARP",
				content: [
					"1. Clique em Adicionar.",
					"2. Digite o Endereço MAC do dispositivo.",
					"3. Insira o Endereço IP que deseja vincular ao endereço MAC acima.",
					"4. Insira uma Descrição para este dispositivo. (Opcional)",
					"5. Selecione Ativar.",
					"6. Clique em OK."
				]
			},{
				type: "step",
				title: "Para modificar ou excluir uma entrada",
				content: "Na Lista de Vínculos, clique no ícone Modificar ou no ícone Apagar que corresponde à entrada que deseja modificar ou apagar."
			},{
				type: "step",
				title: "Para apagar várias entradas",
				content: "Na Lista de Vínculos, selecione todas as entradas que deseja excluir e clique em Apagar, acima da lista l."
			}]
		},
		
		IPV6: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "Selecione para ativar (Ligar) ou desativar (Desligar) a função IPv6 do router"
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: IP Estático",
			},{
				type: "name",
				title: "IP Estático",
				content: "Selecione este tipo de ligação se o seu ISP assigna endereços Estáticos IPv6"
			},{
				type: "name",
				title: "Endereço IPv6/Gateway Predefinido/DNS Primário/DNS Secundário",
				content: "Digite as informações fornecidas pelo seu ISP."
			},{
				type: "name",
				title: "Tamanho MTU",
				content: "O valor MTU  (Maximum Transmission Unit) típico e predefinido para a maioria das redes Ethernet é 1500 Bytes. Não é recomendado alterar o tamanho MTU predefinido, a menos que exigido pelo ISP."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: IP Dinâmico",
			},{
				type: "name",
				title: "IP Dinâmico",
				content: "Selecione este tipo se o seu ISP utiliza a atribuição de endereços Dinâmicos IPv6."
			},{
				type: "name",
				title: "Endereço IPv6/DNS Primário/DNS Secundário",
				content: "Estes parâmetros são atribuídos automaticamente pelo servidor DHCPv6 do seu ISP."
			},{
				type: "name",
				title: "Renovar",
				content: "Clique neste botão para obter novos parâmetros IPv6 do servidor DHCPv6 do ISP."
			},{
				type: "name",
				title: "Libertar",
				content: "Clique neste botão para liberar todos os endereços IPv6 atribuídos pelo servidor DHCPv6 do ISP."
			},{
				type: "name",
				title: "Obter Endereço IPv6",
				content: "Selecione DHCPv6 para obter um endereço IPv6 não-temporário ou SLAAC para obter um endereço IPv6 gerado a partir dos pacotes \"Advertisement\" do router, de acordo com o seu ISP."
			},{
				type: "name",
				title: "Atribuição de Prefixo",
				content: "Selecione Ativar para obter um prefixo a partir do servidor DHCPv6 do ISP, ou Desativar para atribuir manualmente um endereço de prefixo. Os clientes na LAN irão gerar um endereço IPv6 a partir do prefixo."
			},{
				type: "name",
				title: "Endereço DNS",
				content: "Selecione \"Obter dinamicamente do ISP\" ou \"Usar o seguinte endereço DNS\". Se a opção \"Usar o seguinte endereço DNS\" for selecionada, por favor, inserir manualmente o endereço DNS fornecido pelo seu ISP."
			},{
				type: "name",
				title: "DNS Primário/DNS Secundário",
				content: "Insira parâmetros manualmente ou obtenha-os dinamicamente a partir do ISP."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "Selecione este tipo de ligação se o seu ISP usa PPPoEv6 e se lhe forneceu um nome de utilizador e senha."
			},{
				type: "name",
				title: "Utilizador/Senha",
				content: "Digite os dados tal como fornecidos pelo seu ISP."
			},{
				type: "name",
				title: "Endereço IPv6",
				content: "Ele será atribuído automaticamente pelo servidor DHCPv6 do ISP, após inserir o nome de utilizador e senha e clique em Ligar."
			},{
				type: "name",
				title: "Endereço DNS",
				content: "Selecione \"Obter dinamicamente do ISP\" ou \"Usar o seguinte endereço DNS\". Se a opção \"Usar o seguinte endereço DNS\" for selecionada, por favor, inserir manualmente o endereço DNS fornecido pelo seu ISP."
			},{
				type: "name",
				title: "Obter Endereço IPv6",
				content: "Selecione DHCPv6 para obter um endereço IPv6 não-temporário, SLAAC para obter um endereço IPv6 gerado a partir dos pacotes \"Advertisement\" do router, ou Atribuído pelo ISP para introduzir manualmente o endereço IPv6, de acordo com o seu ISP."
			},{
				type: "name",
				title: "Atribuição de Prefixo",
				content: "Selecione Ativar para obter um prefixo a partir do servidor DHCPv6 do ISP, ou Desativar para atribuir manualmente um endereço de prefixo. Os clientes na LAN irão gerar um endereço IPv6 a partir do prefixo."
			},{
				type: "name",
				title: "Ligar",
				content: "Clique neste botão para obter acesso à Internet."
			},{
				type: "name",
				title: "Desligar",
				content: "Clique neste botão para desligar acesso à Internet."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: Túnel 6to4"
			},{
				type: "name",
				title: "Túnel 6to4",
				content: "Selecione este tipo de ligação se o seu ISP usa implementação 6to4 para a atribuição de endereços."
			},{
				type: "name",
				title: "Endereço IPv4/Máscara de Rede IPv4/Gateway Predefinido IPv4/Endereço de Túnel",
				content: "Estes parâmetros serão gerados dinamicamente pela informação IPv4 de porta WAN depois de clicar em Ligar."
			},{
				type: "name",
				title: "Use o seguinte servidor DNS",
				content: "Selecione caixa de verificação para ativar esta opção. E, em seguida, inserir o DNS Primário / DNS Secundário conforme fornecido pelo seu ISP."
			},{
				type: "name",
				title: "Ligar",
				content: "Clique neste botão para obter acesso à Internet."
			},{
				type: "name",
				title: "Desligar",
				content: "Clique neste botão para desligar acesso à Internet."
			}/*,{
				type: "title",
				title: "Tipo de Ligação à Internet: 6RD"
			},{
				type: "name",
				title: "6RD",
				content: "Selecione este tipo de ligação se o seu ISP usar a implementação 6RD e lhe forneceu um endereço IPv4 e prefixo de endereço IPv6."
			},{
				type: "name",
				title: "Tipo de Configuração",
				content: "Selecione Auto ou Manual para configurar os parâmetros do canal 6RD de acordo com o seu ISP. Se os parâmetros predefinidos abaixo coincidem com os fornecidas pelo seu ISP, pode selecionar Auto; caso contrário, selecione Manual e insira os parâmetros fornecidos pelo seu ISP."
			},{
				type: "name",
				title: "Tamanho de Máscara IPv4/Prefixo 6RD/Tamanho de Prefixo 6RD/Endereço Fronteira IPv4 de Resposta",
				content: "Verifique se os parâmetros predefinidos coincidem com os fornecidos pelo seu ISP. Sendo, mantenha os valores predefinidos, se não insira-os manualmente conforme fornecido pelo seu ISP."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "Selecione este tipo de ligação se o seu ISP usa implementação DS-lite e lhe entregou um nome de domínio AFTR ou endereço IPv6, para a criação de um túnel IPv4-in-IPv6 na rede IPv6 para que tráfegos IPv4 e IPv6 fluam nas redes respetivas."
			},{
				type: "name",
				title: "Nome AFTR",
				content: "AFTR é acrónimo para Address Family Transition Router. Neste campo, digite o nome do domínio ou o endereço IPv6 AFTR conforme fornecido pelo seu ISP."
			},{
				type: "name",
				title: "Ligação Secundária",
				content: "Selecione o tipo de conexão secundária conforme fornecido pelo seu ISP.",
				children :[ 
				{
					type: "name",
					title: "IP Dinâmico",
					content: "Selecione se o seu ISP fornece IP Dinâmico como tipo de ligação secundária e se os  Endereço IPv6 / DNS Primário / DNS secundário forem atribuído automaticamente pelo servidor DHCPv6 do ISP."
				},
				{
					type: "name",
					title: "IP Estático",
					content: "Selecione se o seu ISP lhe fornece uma ligação secundária do tipo IP Estático e insira o Endereço IPv6/Gateway Predefinido/DNS Primário e/ou DNS Secundário conforme indicado pelo seu ISP. Configure também o tamanho do MTU (deve mantê-lo com o valor predefinido, a não ser por exigência do ISP)."
				},{
					type: "name",
					title: "PPPoE",
					content: "Selecione se o seu ISP lhe fornecer uma ligação PPPoE como tipo de conexão secundária e digite nome de utilizador/senha entregues pelo seu ISP. O endereço IPv6 será atribuído automaticamente depois de clicar em Ligar."
				}]
			}*/,{
				type: "title",
				title: "Tipo de Ligação à Internet: Pass Through (Bridge)"
			},{
				type: "paragraph",
				content: "Selecione este tipo se o seu ISP usa Pass Through (Bridge) na implementação da rede. Para este tipo, não são fornecidos parâmetros e não são necessárias configurações."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "À exceção do tipo  Pass-Through (Bridge), os restantes 6 tipos de  ligação à Internet requerem configuração IPv6."
			},{
				type: "name",
				title: "Tipo Assignado",
				content: "Escolha o mais adequado de acordo com o seu ISP.",
				children: [{
					type: "name",
					title: "DHCPv6",
					content: "Para atribuir endereços IP automaticamente aos clientes na LAN.",
					children: [{
						type: "name",
						title: "Prefixo de Endereço",
						content: "Digite o prefixo de endereço conforme fornecido pelo seu ISP."
					},{
						type: "name",
						title: "Tempo para Libertar",
						content: "Período de tempo durante o qual o endereço IP atribuído é válido. Mantenha a predefinição de 86.400 segundos ou altere, se exigido pelo seu ISP."
					},{
						type: "name",
						title: "Endereço",
						content: "Endereço IP atribuído automaticamente pelo servidor DHCPv6 do ISP."
					}]
				},{
					type: "name",
					title: "SLAAC + Stateless DHCP",
					connector:" ",
					children: [{
						type: "name",
						title: "Prefixo de Endereço",
						content: "Digite o prefixo de endereço conforme fornecido pelo seu ISP."
					},{
						type: "name",
						title: "Endereço",
						content: "É o endereço IP atribuído automaticamente pelo ISP."
					}]
				},{
					type: "name",
					title: "SLAAC + RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "Prefixo de Endereço",
						content: "Digite o prefixo de endereço conforme fornecido pelo seu ISP."
					},{
						type: "name",
						title: "Endereço",
						content: "É o endereço IP atribuído automaticamente pelo ISP."
					}]
				}]
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "Clonar MAC",
			CONTENT: [{
				type: "name",
				title: "Usar Endereço MAC Predefinido",
				content: "Não altera o endereço MAC predefinido do router, caso o ISP não assigne o endereço IP vinculado a endereço MAC especifico."
			},{
				type: "name",
				title: "Usar Endereço MAC deste Computador",
				content: "Selecione para copiar o endereço MAC do computador que é ligado ao router, caso o ISP vincule o endereço IP atribuído ao endereço MAC deste computador."
			},{
				type: "name",
				title: "Endereço MAC Personalizado",
				content: "Digite o endereço MAC manualmente, caso o ISP vincule o endereço IP atribuído a um endereço MAC específico."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "Definições de Tempo",
			CONTENT: [{
				type: "step",
				title: "Para sincronizar automaticamente o tempo",
				content: [
					"1. No campo Configurar Tempo, selecione Obter automaticamente a partir da Internet.",
					"2. Selecione o seu Fuso Horário local a partir do menu.",
					"3. No campo Servidor NTP I, digite o endereço IP ou nome de domínio do Servidor NTP desejado.",
					"4. No campo Servidor NTP II, digite o endereço IP ou nome de domínio do segundo Servidor NTP. (Opcional)",
					"5. Clique em Obter.",
					"6. Clique em Gravar."
				]
			},{
				type: "step",
				title: "Para definir manualmente a data e a hora",
				content: [
					"1. No campo Configurar Tempo, selecione Manualmente.",
					"2. Insira a Data atual.",
					"3. Insira a Hora atual (no formato de relógio de 24 horas, por exemplo, 16:00:00 = 04:00PM).",
					"4. Clique em Gravar."
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			TITLE: "Horário de Verão",
			CONTENT: [{
				type: "step",
				title: "Para configurar o Horário de Verão",
				content: [
					"1. Selecione Ativar Horário de Verão.",
					"2. Selecione a data e hora de Início correta, a partir da qual o horário de verão começa no fuso horário local.",
					"3. Selecione a data e hora de Fim correta, a partir da qual o horário de verão termina no fuso horário local.",
					"4. Clique em Gravar."
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "Diagnósticos",
			CONTENT: [{
				type: "paragraph",
				content: "O router fornece ferramentas de Ping e Traceroute para ajudar a solucionar problemas de conectividade de rede. A ferramenta Ping envia pacotes para um endereço IP de destino ou nome de domínio e registra os resultados, tais como o número de pacotes enviados/recebidos e o tempo de ida e volta. A ferramenta Traceroute envia pacotes para um endereço IP de destino ou nome de domínio e exibe o número de saltos e tempo para chegar ao destino."
			},{
				type: "paragraph",
				content: "Pode utilizar o ping e o traceroute para testar a conetividade com dispositivo na rede local, por endereço IP ou nome de domínio."
			},{
				type: "step",
				title: "Para diagnosticar usando Ping",
				content: [
					"1. Digite o Endereço IP de destino ou Nome de Domínio.",
					"2. Clique na seta do ícone para abrir o menu Avançado e especificar a Contagem Ping e Tamanho Pacote Ping. (Opcional)",
					"3. Clique em Iniciar."
				]
			},{
				type: "step",
				title: "Para diagnosticar usando Traceroute",
				content: [
					"1. Digite o Endereço IP de destino ou Nome de Domínio.",
					"2. Clique na seta do ícone para abrir o menu Avançado e especifique o número de saltos (a atingir) no campo Max TTL para Traceroute (Time to Live). O valor predefinido é 20. (Opcional)",
					"3. Clique em Iniciar."
				]
			}]
		},
		FIRMWARE: {	
			TITLE: "Atualização de Firmware",
			CONTENT: [{
				type: "paragraph",
				content: "Antes de atualizar o firmware do router, terá de descarregar o ultimo firmware a partir do website em <a class=\"link\" href=\"javascript:void(0);\" id=\"update_url\" target=\"_blank\"> Suporte TP-LINK</a> para o seu computador."
			},{
				type: "step",
				title: "IMPORTANTE: Para evitar a falha de atualização, por favor, observe o seguinte:",
				content: [
					"Verifique se o ficheiro de firmware mais recente é para a versão de harware do seu dispositivo (como mostrado na página de atualização de firmware).",
					"Certifique-se de que tem uma conexão estável entre o router e seu computador. Não é recomendado atualizar o firmware via rede Wi-Fi.",
					"Certifique-se de remover todos os dispositivos de armazenamento USB conectado ao router antes da atualização de firmware, para evitar a perda de dados.",
					"Deve efetuar cópia de segurança a configuração atual do router.",
					"Não desligue o router durante a atualização de firmware."
				]
			},{
				type: "step",
				title: "Para atualizar o firmware do router",
				content: [
					"1. Clique em Procurar.",
					"2. Localize e selecione o ficheiro de firmware descarregado.",
					"3. Clique em Atualizar."
				]
			},{
				type: "paragraph",
				content: "O processo de atualização demora alguns minutos para ser concluído. Por favor, não desligue o router enquanto a atualização estiver a decorrer."
			}]
		},
		
		BACKUP: {	
			TITLE: "Cópia de Segurança",
			CONTENT: [{
				type: "paragraph",
				content: "É altamente recomendável fazer cópia de segurança das suas configurações atuais. Será muito útil caso seja necessária uma recuperação para restaurar o sistema para um estado anterior ou a partir da configuração de fábrica."
			},{
				type: "paragraph",
				content: "Clique em Cópia de Segurança para gravar as configurações atuais para o seu computador. Certifique-se de guardar o ficheiro de cópia de segurança para um local seguro, de onde o possa recuperar e restaurar o Router mais tarde, se necessário."
			}]
		},
		
		RESTORE: {
			TITLE: "Reposição",
			CONTENT: [{
				type: "step",
				title: "Para restaurar uma Cópia de Segurança",
				content: [
					"1. Clique em Procurar.",
					"2. Localize e selecione o ficheiro de Cópia de Segurança.",
					"3. Clique em Repor."
				]
			}]
		},
		
		FACTORY: {
			TITLE: "Repor Configurações de Fábrica",
			CONTENT: [{
				type: "paragraph",
				content: "Clique Repor Configuração de Fábrica para restaurar seu router às configurações de fábrica."
			},{
				type: "step",
				title: "Nota",
				content: [
					"1. A Reposição para os Valores de Fábrica irá apagar todas as configurações no router. Para entrar novamente na página de configuração do router, utilize \"admin\" no campo Utilizador e Senha.",
					"2. Por favor NÃO desligue o router durante o processo de Backup ou reposição de configurações."
				]
			}]
		},
		
		
		ADMIN_ACCOUNT: {	
			TITLE: "Gestão de Conta",
			CONTENT: [{
				type: "paragraph",
				content: "Esta página permite que mude nome de utilizador / ou senha de entrada e também para definir um endereço de e-mail para recuperação de senha."
			},{
				type: "name",
				title: "Utilizador Antigo",
				content: "Digite seu nome de utilizador atual."
			},{
				type: "name",
				title: "Chave Antiga",
				content: "Digite sua senha atual."
			},{
				type: "name",
				title: "Novo utilizador",
				content: "Digite o seu novo nome de utilizador."
			},{
				type: "name",
				title: "Nova Senha",
				content: "Digite a nova senha."
			},{
				type: "name",
				title: "Confirmar Nova Senha",
				content: "Digite a nova senha novamente."
			},{
				type: "note",
				title: "Nota",
				content: "Nota: Se decidir mudar o nome de utilizador e senha atualmente utilizados para aceder ao Router, certifique-se de anotar as novas informações de acesso num local seguro."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "Recuperar a Senha",
			CONTENT: [{
				type: "name",
				title: "Ativar Recuperação de Senha",
				content: "É altamente recomendado que ative a funcionalidade de Recuperação da Senha, que lhe permitirá repor o nome de Utilizador e Senha através de email."
			},{
				type: "name",
				title: "De",
				content: "Insira endereço e-mail válido para ser usado para enviar e-mails."
			},{
				type: "name",
				title: "Para",
				content: "Insira endereço e-mail válido para ser usado para receber e-mail."
			},{
				type: "name",
				title: "Servidor SMTP",
				content: "Insira o endereço do servidor SMTP que o Router irá utilizar para enviar o código de verificação via email."
			},{
				type: "name",
				title: "Ativar Autenticação",
				content: "Selecione Ativar Autenticação se o servidor de e-mail de saída requer autenticação para o envio de e-mail e preencher o utilizador e senha nos campos correspondentes. Estes campos são sensíveis a caracteres em maiúsculas e minúsculas."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "Gestão Local",
			CONTENT: [{
				type: "paragraph",
				content: "Esta seção permite-lhe limitar o número de dispositivos da rede local que podem aceder ao router, usando autenticação baseada em endereço MAC."
			},{
				type: "name",
				title: "Acesso para Todos Dispositivos Conectados à LAN",
				content: "Mude para Ligado para ativar a gestão a todos os dispositivos de LAN conectados ou Desligado para permitir a gestão para um dispositivo específico."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Exibe o endereço MAC do dispositivo de acesso limitado."
			},{
				type: "name",
				title: "Descrição",
				content: "Exibe a descrição do dispositivo de acesso limitado."
			},{
				type: "name",
				title: "Estado",
				content: "Exibe o status atual do dispositivo de acesso limitado (ativado ou desativado)."
			},{
				type: "name",
				title: "Modificar",
				content: "Exibe opções para Modificar e Apagar um dispositivo correspondente da lista."
			},{
				type: "step",
				title: "Para adicionar um dispositivo à lista",
				content: [
					"1. Clique em Adicionar.",
					"2. Clique em Ver Dispositivos Existentes para escolher um dispositivo existente ou digite o endereço MAC de um dispositivo no campo Endereço MAC.",
					"3. Digite uma Descrição para o dispositivo.",
					"4. Selecione Ativar.",
					"5. Clique em OK."
				]
			},{
				type: "step",
				title: "Para modificar ou excluir um dispositivo na lista",
				content: "Na tabela clique no ícone Editar ou no ícone Lixo que corresponde ao dispositivo que deseja modificar ou apagar."
			},{
				type: "step",
				title: "Para excluir vários dispositivos",
				content: "Selecione todos os dispositivos que deseja excluir e clique em Apagar."
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "Gestão Remota",
			CONTENT: [{
				type: "paragraph",
				content: "A função de Gestão Remota permite aceder e configurar o router remotamente a partir da Internet."
			},{
				type: "name",
				title: "Desativar Gestão Remota",
				content: "Selecione esta opção para desativar a gestão remota."
			},{
				type: "name",
				title: "Ativar a Gestão Remota para Todos os Dispositivos",
				content: "Selecione esta opção para ativar a gestão remota para todos os endereços IP. Se selecionado, configurar o campo Porta de Gestão WEB."
			},{
				type: "name",
				title: "Ativar Gestão Remota para Dispositivos Específicos",
				content: "Selecione esta opção para ativar a gestão remota a partir de um endereço IP específico. Se selecionado, configure os campos de Porta de Gestão WEB e Endereço IP de Gestão Remota."
			},{
				type: "name",
				title: "Porta de Gestão WEB",
				content: "Digite o número da porta, entre 1024 e 65535, que será utilizada para aceder ao interface WEB de gestão Router com maior segurança. Normalmente, os navegadores web usam a porta de serviço HTTP 80. A porta predefinida e também mais comum é a porta de serviço 8080, que é uma porta alternativa do serviço HTTP."
			},{
				type: "name",
				title: "Endereço IP de Gestão Remota",
				content: "Introduza um endereço IP válido que seja permitido aceder ao router."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		
		SYSTEM_LOG: {	
			TITLE: "Registo de Eventos do Sistema",
			CONTENT: [{
				type: "paragraph",
				content: "A página de Registo de Eventos do Sistema mostra uma lista das atividades mais recentes (eventos) do router. É possível definir quais os tipos de registros e / ou o nível de registros que deseja visualizar. Esta página também função de email que permite configurar o envio automático do ficheiro de registo de eventos para um endereço de e-mail específico, ou exportar os ficheiros para um computador."
			},{
				type: "name",
				title: "Tipo",
				content: "Selecione o tipo de registo de eventos do sistema a exibir."
			},{
				type: "name",
				title: "Nível",
				content: "Selecione o nível de log do sistema para exibir."
			},{
				type: "name",
				title: "Atualizar",
				content: "Clique neste ícone para atualizar o registro do sistema."
			},{
				type: "name",
				title: "Apagar Tudo",
				content: "Clique neste ícone para apagar todos os registros do sistema."
			},{
				type: "name",
				title: "Gravar Registo",
				content: "Clique neste botão para gravar todos os ficheiros de registo de eventos do Sistema para o seu computador local."
			},{
				type: "name",
				title: "Definições de Mail",
				content: "Clique neste botão para definir as configurações de e-mail para o registo de eventos do sistema."
			},{
				type: "step",
				title: "Para definir as configurações de e-mail para o registo de eventos do sistema",
				content: [
					"1. Clique em Definições de Mail.",
					"2. De - Digite endereço e-mail válido para ser usado para enviar e-mails.",
					"3. Para - Digite endereço e-mail válido para ser usado para receber e-mails.",
					"4. Servidor SMTP - Digite endereço do servidor SMTP que o Router usa para enviar o registo de eventos do sistema via e-mail.",
					{
						content: "5. Ativar autenticação - Selecione esta opção se o servidor SMTP requer autenticação para o envio de e-mails.",
						children: [{
							type: "name",
							title: "Utilizador",
							content: "Digite nome de utilizador para o servidor SMTP. Este campo é sensível a maiúsculas."
						},{
							type: "name",
							title: "Senha",
							content: "Digite a senha para o servidor SMTP. Este campo também é sensível a maiúsculas."
						}]
					},{
						content: "6. Ativar Auto Mail - Selecione esta opção para especificar a que hora do dia registo de eventos do sistema deve ser enviado automaticamente.",
						children: [{
							type: "paragraph",
							content: "Para enviar o log do sistema todos os dias num momento específico, indique as Horas (HH) e Minutos (MM) em formato de relógio de 24 horas, por exemplo, 16:00 = 04:00PM."
						},{
							type: "paragraph",
							content: "Para enviar o registo de eventos de sistema a cada hora ou num intervalo de tempo específico, digite o número de horas."
						}]
					},
					"7. Clique em Gravar."
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "Estatísticas de Tráfego",
			CONTENT: [{
				type: "paragraph",
				content: "A página de Estatísticas de Tráfego exibe o tráfego de rede LAN, WAN e WLAN pacotes enviados e recebidos."
			},{
				type: "name",
				title: "Estatísticas de Tráfego",
				content: "Mude para Ligado para exibir a informação estatística."
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "Lista de Estatísticas de Tráfego",
			CONTENT: [{
				type: "name",
				title: "Endereço IP/Endereço MAC",
				content: "Exibe o endereço IP e endereço MAC do dispositivo cliente associado."
			},{
				type: "name",
				title: "Total de Pacotes",
				content: "Exibe o número total de pacotes transmitidos e recebidos pelo dispositivo cliente desde o início da sessão ou da última reposição do contador."
			},{
				type: "name",
				title: "Total de Bytes",
				content: "Exibe o número total de bytes transmitidos e recebidos pelo dispositivo cliente desde o início da sessão ou da última reposição do contador."
			},{
				type: "name",
				title: "Pacotes Atuais",
				content: "Exibe o número atual de pacotes transmitidos e recebidos num intervalo de tempo específico."
			},{
				type: "name",
				title: "Bytes Atuais",
				content: "Exibe o número atual de bytes transmitidos e recebidos em um intervalo de tempo específico."
			},{
				type: "name",
				title: "Modificar",  
				content: "Exibe opções para Repor (a zero) e Apagar a estatística correspondente da lista."
			},{
				type: "name",
				title: "Atualizar",
				content: "Clique para atualizar a informação estatística sobre a página."
			},{
				type: "name",
				title: "Repor Tudo",
				content: "Clique para repor todos os valores estatísticos na lista para zero."
			},{
				type: "name",
				title: "Apagar Tudo",
				content: "Clique para apagar todas as informações estatísticas na lista."
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "Sem fios de 2.4GHz/5GHz/60GHz",
			CONTENT: [{
				type: "name",
				title: "Intervalo de Beacon",
				content: "Insira um valor entre 40 e 1000, em milissegundos, para determinar a duração entre pacotes de beacon que são transmitidos pelo Router para sincronizar a rede sem fio. O valor predefinido é 100 milissegundos."
			},{
				type: "name",
				title: "RTS Threshold",
				content: "Insira um valor entre 1 e 2346 para determinar o tamanho do pacote de transmissão de dados através do router. Por defeito, o tamanho do RTS (Request to Send) Threshold é 2346. Se o tamanho do pacote é maior do que o limite pré-definido, o router envia um pedido de enviar pacotes a uma estação recetora e negocia o envio de um pacote de dados, ou então o pacote será enviado imediatamente."
			},{
				type: "name",
				title: "Intervalo DTIM",
				content: "Esse valor determina o intervalo da Delivery Traffic Indication Message (DTIM). Insira um valor entre 1 e 15 em milissegundos. O valor predefinido é 1, que indica que o intervalo DTIM é igual ao Intervalo Beacon."
			},{
				type: "name",
				title: "Group Key Update Period",
				content: "Digite o número de segundos (mínimo de 30) para controlar o intervalo de tempo para renovação automática da chave de encriptação. Por defeito é 0, indicando que não há renovação de chave."
			},{
				type: "name",
				title: "Multiuser-MIMO",
				content: "A tecnologia permite ao router estabelecer uma ligação ponto-a-ponto com até 3 dispositivos ao mesmo tempo. Esta tecnologia aumenta significativamente as velocidades e reduz o tempo de resposta em comparação com a arquitetura tradicional Wi-Fi, permitindo ao router servir maior numero de clientes Wi-Fi em simultâneo, minimizando os problemas de largura de banda da rede."
			},{
				type: "name",
				title: "Função WMM",
				content: "A função WMM garante que os pacotes com mensagens de alta prioridade serão  transmitidos preferencialmente. Está ativo por defeito e é altamente recomendado."
			},{
				type: "name",
				title: "Função Short GI",
				content: "Esta função está ativada por defeito e é recomendada para aumentar a capacidade de transferência de dados, reduzindo o tempo de Guard Interval (GI)."
			},{
				type: "name",
				title: "Função Isolamento AP",
				content: "Se deseja configurar e restringir todos os dispositivos Wi-Fi ligados à sua rede de comunicarem entre si, mas mantendo o acesso à Internet, selecione a caixa de verificação Ativar Isolamento AP."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		SYSTEM_PARA_WDS: {	
			TITLE: "WDS de 2.4GHz/5GHz",
			CONTENT: [{
				type: "name",
				title: "Ativar Bridging WDS",
				content: "Ative a funcionalidade Bridging WDS (Wireless Distribution System) para permitir que o Router se ligue com outro ponto de acesso (AP) numa rede local sem fio (WLAN). Se esta função for ativada, configure o seguinte:",
			},{
				type: "name",
				title: "SSID (a ser bridged)",
				content: "Insira o SSID do WAP ( Ponto de Acesso Wi-Fi) a que o router se irá ligar como cliente ou utilize a função Pesquisa para procurar todas as redes disponíveis."
			},{
				type: "name",
				title: "Pesquisa",
				content: "Clique neste botão para pesquisar e exibir o SSID, BSSID, potência do sinal, canal e informações de segurança de todas as redes Wi-Fi disponíveis dentro do alcance. Quando selecionar uma rede, os campos SSID, MAC Address e Segurança serão populados automaticamente."
			},{
				type: "name",
				title: "Endereço MAC (a ser bridged)",
				content: "Digite o endereço MAC (BSSID) em 12 formatos com caracteres hexadecimais (0-9, a-f, A-F) separados por hifens do ponto de acesso sem fios no qual o router irá se ligar como um cliente. Se escolher o PA pretendido por meio da funcionalidade Pesquisar, o campo de endereço MAC é preenchido automaticamente."
			},{
				type: "name",
				title: "Modo WDS",
				content: "Selecione o modo WDS, Auto, WDS1 ou WDS2."
			},{
				type: "name",
				title: "Segurança",
				content: "Selecione o tipo segurança correto, de acordo com a segurança do ponto de acesso selecionado, Nenhuma, WPA-PSK / WPA2-PSK ou WEP. Se você escolher o AP desejado através do recurso de Pesquisa, o campo de segurança é automaticamente preenchido.",
				children: [{
					type: "name",
					title: "Senha",
					content: "Esta opção está disponível quando o tipo de segurança é WPA-PSK / WPA2-PSK ou WEP. Digite a senha de segurança do AP selecionado."
				},{
					type: "name",
					title: "Tipo de Auth.",
					content: "Esta opção só está disponível quando o tipo de segurança é WEP (Wired Equivalent Privacy). Selecione o tipo de autenticação adequado (Auto, Sistema Aberto ou Chave Partilhada) utilizada no AP selecionado."
				},{
					type: "name",
					title: "Formato de Chave WEP",
					content: "Esta opção só está disponível quando o tipo de segurança é WEP. Selecione o formato de chave (ASCII ou Hexadecimal) usado no AP selecionado."
				}]
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		SYSTEM_PARA_WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "Selecione a caixa de validação Ativar WPS e clique em Gravar para ativar a função WPS (Wi-Fi Protected Setup), que permite de forma fácil configurar e conectar à rede Wi-Fi os dispositivos com capacidade WPS, bastando carregar num botão."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		SYSTEM_PARA_NAT: {
			TITLE: "NAT",
			CONTENT: [{
				type: "name",
				title: "NAT",
				content: "Selecione a opção Ativar NAT e clique em Gravar para ativar a função NAT (Network Address Translation)."
			},{
				type: "note",
				title: "Nota",
				content: "Quando o NAT está desativado as configurações de Reencaminhamento NAT não terão efeito. "
			}/*,{
				type: "name",
				title: "NAT Boost",
				content: "Selecione a opção Ativar NAT Boost e clique em Gravar para garantir que o seu router tem o melhor desempenho."
			},{
				type: "note",
				title: "Nota",
				content: "Nota: Quando o NAT Boost é ativado, as funções QoS e Estatísticas de Tráfego são desativados automaticamente."
			}*/,{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		SYSTEM_PARA_DOS: {
			TITLE: "Definições de Nível de Proteção DoS",
			CONTENT: [{
				type: "paragraph",
				content: "O Nível de Proteção DoS protege o seu router de ataques ICMP-FLOOD, UDP-FLOOD e TCP-FLOOD."
			},{
				type: "name",
				title: "ICMP-FLOOD Packets Level",
				content: "Insira um valor entre 5 e 7.200 pacotes ICMP para acionar a proteção ICMP-FLOOD imediatamente quando o número de pacotes exceder o valor limite pré-definido."
			},{
				type: "name",
				title: "UDP-FLOOD Packets Level",
				content: "Insira um valor entre 5 e 7.200 pacotes UDP para acionar a proteção UDP-FLOOD imediatamente quando o número de pacotes exceder o valor limite pré-definido."
			},{
				type: "name",
				title: "TCP-INUNDAÇÃO Packets Level",
				content: "Insira um valor entre 5 e 7.200 pacotes TCP-SYN para acionar a proteção TCP-SYN-FLOOD imediatamente quando o número de pacotes exceder o valor limite pré-definido."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			TITLE: "Duplex",
			CONTENT: [{
				type: "name",
				title: "Duplex",
				content: "Selecione o tipo duplex a partir da lista."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "LED",
			CONTENT: [{
				type: "name",
				title: "Ativar Modo Noturno",
				content: "Selecione esta caixa de verificação para desligar os LED durante o Período de Modo Noturno sem afetar a performance do router."
			},{
				type: "name",
				title: "Período do Modo Noturno",
				content: "Especifique o período de tempo em que se aplica o modo noturno."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		OPEN_VPN:{
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "paragraph",
				content: "Com OpenVPN, pode usar a Internet para aceder de forma segura a sua rede quando estiver fora de casa. Para usar o serviço VPN, precisa configurar o serviço DNS dinâmico (recomendado) ou atribuir um endereço de IP estático à porta WAN do router. E a hora do sistema deve estar sincronizada com a Internet."
			},{
				type: "name",
				title: "Ativar Servidor VPN",
				content: "Selecione esta opção para ativar o servidor OpenVPN."
			},{
				type: "name",
				title: "Tipo de Serviço",
				content: "Selecione o protocolo de comunicações para o servidor OpenVPN: UDP ou TCP."
			},{
				type: "name",
				title: "Porta de Serviço",
				content: "Digite um número de porta de comunicação entre 1024 e 65535. O porta de serviço comum e padronizada é a 1194."
			},{
 				type: "name",
				title: " Sub-rede/Sub-máscara VPN",
				content: "Digite a faixa de endereços IP que podem ser cedidos aos clientes do servidor OpenVPN."
			},{
				type: "name",
				title: "Acesso de Cliente",
				content: "Selecione o tipo de acesso para o seu cliente OpenVPN",
				children: [{
				type: "name",
				title: "Apenas Rede Doméstica",
					content: "Os clientes só podem aceder à rede doméstica. A rota predefinida do cliente não será alterada."
			},{
				type: "name",
				title: "Rede Doméstica e Internet",
					content: "Os clientes podem aceder à rede doméstica, e sites da Internet ou serviços com uma limitação geográfica quando estiverem fora do país. A rota predefinida do cliente será alterada."
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "Certificado",
			CONTENT: [{
				type: "paragraph",
				content: "Utilize o certificado para a informação e identidade da ligação VPN para clientes remotos."
			},{
				type: "name",
				title: "Gerar",
				content: "Clique aqui para gerar um novo certificado."
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "Ficheiro de Configuração",
			CONTENT: [{
				type: "paragraph",
				content: "Os clientes remotos utilizarão o ficheiro de configuração para aceder o seu router."
			},{
				type: "name",
				title: "Exportar",
				content: "Clique para guardar o ficheiro de configuração OpenVPN."
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "Guia de Instalação de Cliente VPN",
			CONTENT: [{
				type: "step",
				title: "Para ligar os dispositivos do seu cliente ao servidor OpenVPN:",
				content:[{
					type: "paragraph",
					content: "Antes de configurar o servidor OpenVPN, configure o serviço DNS dinâmico (recomendado) ou atribua um endereço de IP estático à porta WAN. E certifique-se que a sua porta externa de definições NAT não é a porta de serviço, e que a hora do sistema está sincronizada com a Internet."
				},
					"1. Selecione Ativar o servidor VPN.",
					"2. Configure os parâmetros do servidor OpenVPN (Tipo de serviço, porta de serviço, acesso do cliente e sub-rede/máscara de rede VPN) e clique em Guardar.",
					"3. Clique em Exportar para guardar o ficheiro de configuração.",
					"4. Nos dispositivos do seu cliente, transfira e instale o utilitário do cliente OpenVPN no <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> A plataforma oficial suportada inclui Windows, Mac OSX, Linux.",
					"5. Inicie o utilitário do cliente OpenVPN e adicione uma nova ligação VPN utilizando o ficheiro de configuração guardado para ligar o seu dispositivo cliente ao servidor VPN."
				]},{
					type: "note",
					title: "Nota",
					content: "Para mais informações sobre o cliente OpenVPN, por favor aceda a  <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
				}]
		},
		PPTP_VPN:{
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "paragraph",
				content: "Com o PPTP VPN, pode utilizar a Internet para aceder fácil e rapidamente à sua rede quando estiver fora de casa. Isso pode ser evitado por alguns ISP. Para usar o serviço VPN, precisa configurar o serviço DNS dinâmico (recomendado) ou atribuir um endereço de IP estático à porta WAN do router. E a hora do sistema deve estar sincronizada com a Internet."
			},{
				type: "name",
				title: "Ativar Servidor VPN",
				content: "Selecione para ativar o servidor PPTP VPN."
			},{
				type: "name",
				title: "Endereço IP de Cliente",
				content: "Insira o intervalo de endereços IP (até 10 clientes) que podem ser atribuídos aos clientes pelo servidor VPN PPTP."
			},{
 				type: "name",
				title: "Permite o acesso ao Samba (Sítio da rede local)",
				content: "Selecione esta opção para permitir que o seu cliente VPN aceda ao seu servidor Samba local."
			},{
				type: "name",
				title: "Permitir passagem de NetBIOS",
				content: "Selecione esta opção para permitir que o seu cliente VPN aceda ao seu servidor Samba com o nome NetBIOS."
			},{
				type: "name",
				title: "Permite ligações não codificadas.",
				content: "Selecione esta opção para permitir ligações não codificadas ao seu servidor VPN."
			}]
		},
		PPTP_ACCOUNT_LIST:{
			TITLE: "Lista de contas",
			CONTENT: [{
				type: "paragraph",
				content: "Esta tabela exibe as contas que podem ser utilizadas para os clientes remotos se ligarem ao servidor PPTP VPN."
			},{
				type: "step",
				title: "Para adicionar uma conta VPN PPTP",
				content: [
					"1. Clique em Adicionar.",
					"2. Digite o nome de utilizador e a palavra-passe para autenticar os clientes para o servidor PPTP VPN.",
					"3. Clique em OK."
				]
			},/*{
				type: "name",
				title: "Nome de Utilizador e Senha",
				content: "Insira o nome de utilizador e senha para autenticar clientes no servidor VPN PPTP."
			},{
				type: "name",
				title: "modificar",
				content: "Exibe as opções para modificar ou eliminar a conta correspondente."
			}*/
			{
				type: "step",
				title: "Para modificar ou eliminar uma conta existente",
				content: "Na tabela, clique no ícone Editar ou no ícone da lixeira que corresponda à conta que pretende modificar ou eliminar."
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "Guia de Instalação de Cliente VPN",
			CONTENT: [{
				type: "step",
				title: "Para ligar os dispositivos do seu cliente ao servidor PPTP VPN:",
				content:[{
					type: "paragraph",
					content: "Antes de configurar o servidor PPTP VPN, configure o serviço DNS dinâmico (recomendado) ou atribua um endereço de IP estático à porta WAN. Certifique-se que a sua porta externa de definições NAT não é a 1723, e que a hora do sistema está sincronizada com a Internet."
				},
					"1. Selecione Ativar o servidor VPN.",
					"2. Configure os parâmetros do servidor PPTP VPN e clique em Guardar.",
					"3. Nos dispositivos do seu cliente, crie uma ligação PPTP VPN. As plataformas suportadas oficiais incluem Windows, Mac OSX, Linux, iOS e Android.",
					"4. Inicie o programa PPTP VPN, adicione uma nova ligação e digite o nome do domínio do serviço DDNS registado ou o endereço IP estático atribuído à porta WAN, para ligar o dispositivo do seu cliente ao servidor PPTP VPN.",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "Ligações VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Esta página exibe os clientes que estão atualmente ligados os servidores Open VPN e VPN PPTP hospedados no router."
			},{
				type: "paragraph",
				content: "Clique no ícone Menos para desconectar o cliente correspondente."
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Status de Internet",
				content: "Mostra o Status atual da ligação à Internet do Router"
			},{
				type: "name",
				title: "Tipo de Ligação",
				content: "Mostra o tipo de ligação à Internet."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Mostra o atual endereço IP de Internet atribuído ao router."
			},{
				type: "name",
				title: "Ligação Secundária/Endereço IP",
				content: "Mostra o tipo de ligação secundária e endereço IP."
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "Router",
			CONTENT: [{
				type: "title",
				title: "Sem fios de 2.4GHz/5GHz/60GHz"
			},{
				type: "name",
				title: "SSID",
				content: "Exibe o atual nome da rede sem fios com frequência de banda de 2.4GHz/5GHz/60GHz."
			},{
				type: "name",
				title: "Canal",
				content: "Apresenta o canal no qual a rede sem fios de 2.4GHz/5GHz/60GHz transmite."
			},{
				type: "name",
				title: "MAC",
				content: "Exibe o endereço MAC atual do 2.4GHz/5GHz/60GHz sem fios."
			},{
				type: "title",
				title: "Rede de Convidados 2.4GHz/5GHz"
			},{
				type: "name",
				title: "Estado",
				content: "Mostra se a rede s Wi-Fi de Convidados 2.4GHz/5GHz está Ligada (ativada) ou Desligada (desativada)."
			},{
				type: "name",
				title: "SSID",
				content: "Mostra o nome da rede Wi-Fi  de Convidados."
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "Clientes Cabo/Wi-Fi",
			CONTENT: [{
				type: "name",
				title: "Nome",
				content: "Mostra o nome do cliente conectado ao router."
			},{
				type: "name",
				title: "Endereço IP",
				content: "Mostra o endereço IP atribuído ao cliente."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Mostra o endereço MAC do cliente."
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "Impressora",
			CONTENT: [{
				type: "name",
				title: "Nome",
				content: "Mostra o nome da impressora ligada ao router através da porta USB."
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "Disco USB",
			CONTENT: [{
				type: "name",
				title: "Disco USB",
				content: "Apresenta o nome do disco USB ligado ao Router."
			},{
				type: "name",
				title: "Total",
				content: "Apresenta a capacidade total de armazenamento  do dispositivo USB ligado."
			},{
				type: "name",
				title: "Disponível",
				content: "Apresenta a capacidade disponível de armazenamento  do dispositivo USB ligado."
			}]
		},
		BASIC_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Deteção Automática",
				content: "Clique neste botão para o router detetar automaticamente o atual tipo de ligação à Internet."
			},{
				type: "note",
				title: "Nota",
				content: "Nota: Se não tiver certeza de qual o tipo de ligação à Internet, use a função de Deteção Automática ou contacte o seu ISP para obter assistência."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: IP Estático",
			},{
				type: "name",
				title: "Endereço IP/Máscara de Rede/Gateway Predefinido/DNS Primário/DNS Secundário",
				content: "Digite as informações fornecidas pelo seu ISP."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: IP Dinâmico",
			},{
				type: "name",
				title: "NÃO Clonar Endereço MAC/Clonar Endereço MAC deste Computador",
				content: "Selecione se deseja clonar o endereço MAC ou não, de acordo com as instruções do seu ISP."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: PPPoE",
			},{
				type: "name",
				title: "Utilizador/Senha",
				content: "Digite o nome de utilizador e senha fornecidos pelo seu ISP. Estes campos são sensíveis a caracteres em maiúsculas e minúsculas."
			},{
				type: "title",
				title: "Tipo de Ligação à Internet: L2TP/PPTP",
			},{
				type: "name",
				title: "Utilizador/Senha",
				content: "Digite o nome de utilizador e senha fornecidos pelo seu ISP. Estes campos são sensíveis a caracteres em maiúsculas e minúsculas."
			},{
				type: "name",
				title: "Ligação Secundária (IP Dinâmico ou IP Estático)",
				children: [{
					type: "name",
					title: "IP Dinâmico",
					content: "Selecione se o endereço IP e Máscara de Rede são atribuídos automaticamente pelo ISP."
				},{
					type: "name",
					title: "IP Estático",
					content: "Selecione se os endereços IP, Máscara de Rede, Gateway e DNS  são fornecidos pelo ISP e insira essas informações nos campos correspondentes."
				}]
			},{
				type: "name",
				title: "IP do Servidor VPN/Nome de Domínio",
				content: "Digite o endereço IP ou Nome de Domínio do Servidor VPN fornecido pelo seu ISP."
			},{
				type:"paragraph",
				content:"Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		BASIC_WIRELESS: {
			TITLE: "Definições Wi-Fi",
			CONTENT: [{
				type: "name",
				title: "Ativar o Rádio Wi-Fi",
				content: "Selecione essa caixa de verificação para ativar a frequência de rádio sem fios de 2.4GHz/5GHz/60GHz."
			},{
				type: "name",
				title: "Nome da Rede Wi-Fi (SSID)",
				content: "Pode deixar o nome da rede Wi-Fi (SSID) predefinido ou introduzir um novo nome (até 32 caracteres). Este campo é sensível a caracteres em maiúsculas e minúsculas."
			},{
				type: "name",
				title: "Ocultar SSID",
				content: "Selecione esta caixa de verificação se quiser ocultar o nome da rede 2.4GHz/5GHz/60GHz (SSID) da lista de redes Wi-Fi."
			},{
				type: "name",
				title: "Senha",
				content: "Introduza uma senha de segurança (sensível a letras maiúsculas/minúsculas) que corresponda ao tipo de segurança neste campo."
			},{
				type:"paragraph",
				content:"Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "Definições de Dispositivo",
			CONTENT: [{
				type: "paragraph",
				content: "A página de Definições de Dispositivo mostra a informação relativa a qualquer dispositivo de armazenamento USB conectado via porta USB."
			},{
				type: "name",
				title: "Examinar",
				content: "Normalmente, o Router deteta automaticamente qualquer dispositivo recentemente conectado. Se tal não suceder, clique no botão Examinar para procura qualquer novo dispositivo conectado e refrescar a página com informações atualizadas."
			},{
				type: "name",
				title: "Volume",
				content: "Mostra o nome do volume USB."
			},{
				type: "name",
				title: "Capacidade",
				content: "Mostra a capacidade de armazenamento total do dispositivo USB."
			},{
				type: "name",
				title: "Espaço Livre",
				content: "Mostra o espaço de armazenamento atualmente disponível."
			},{
				type: "name",
				title: "Remover em Segurança",
				content: "Clique nesse botão para desmontar de forma segura o dispositivo de armazenamento USB antes de desconectá-lo fisicamente da porta USB do router.",
				children: [{
					type: "paragraph",
					content: "Por favor, note que o botão Remover em Segurança só aparece quando há um dispositivo de armazenamento USB conectado ao router. Além disso, tenha em atenção que não é possível desmontar o dispositivo USB enquanto este estiver ocupado."
				}]
			},{
				type: "name",
				title: "Status",
				content: "Esta opção só aparece quando há um dispositivo de armazenamento USB conectado ao router. Selecione para ativar a partilha do conteúdo do dispositivo USB."
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "Definições de Partilha",
			CONTENT: [{
				type: "name",
				title: "Nome de Servidor de Rede/Media",
				content: "Apresenta o nome usado para aceder ao dispositivo de armazenamento USB. O nome deverá ser composto por caracteres alfanuméricos, sob traços ou hifenes, com um comprimento entre 4 e 15 caracteres."
			},{
				type:"paragraph",
				content:"Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "Partilha de Pastas",
			CONTENT: [{
				type: "name",
				title: "Partilhar Tudo",
				content: "Mude para Ligado para partilhar todas as pastas e ficheiros ou mantenha Desligado para partilhar somente pastas especificas."
			},{
				type: "name",
				title: "Ativar Autenticação",
				content: "É altamente recomendável ativar a autenticação, para exigir que os utilizadores insiram um nome de utilizador e senha válidos para acederem às pastas partilhadas."
			},{
				type: "name",
				title: "Nome da Pasta",
				content: "Mostra o nome da pasta partilhada."
			},{
				type: "name",
				title: "Caminho para Pasta",
				content: "Mostra o caminho para a pasta partilhada."
			},{
				type: "name",
				title: "Partilha de Média",
				content: "Indica se a pasta partilhada permite ou não a partilha de conteúdos multimédia."
			},{
				type: "name",
				title: "Nome de Volume",
				content: "Exibe o nome do volume partilhado."
			},{
				type: "name",
				title: "Estado",
				content: "Mostra o estado da pasta partilhada pelo indicador tipo lâmpada. "
			},{
				type: "name",
				title: "Modificar",
				content: "Mostra opções para Modificar e Apagar a pasta partilhada correspondente."
			},{
				type: "name",
				title: "Adicionar",
				content: "Clique neste botão para criar uma nova entrada."
			},{
				type: "name",
				title: "Apagar",
				content: "Clique neste botão para remover da tabela a entrada selecionada."
			},{
				type: "name",
				title: "Procurar",
				content: "Clique para procurar uma pasta partilhada."
			},{
				type: "name",
				title: "Permitir Acesso da Rede de Convidados",
				content: "Selecione para permitir que clientes da Rede de Convidados possam aceder às pastas partilhadas."
			},{
				type: "name",
				title: "Ativar Autenticação",
				content: "Selecionar para obrigar os utilizadores a terem um nome de utilizador e senha válidos para acederem às pastas partilhadas."
			},{
				type: "name",
				title: "Ativar Acesso de Escrita",
				content: "Selecione para permitir que os utilizadores façam alterações no conteúdo da pasta."
			},{
				type: "name",
				title: "Ativar a Partilha de Média",
				content: "Selecione para ativar a partilha de Média."
			},{
				type: "name",
				title:"Atualizar",
				content: "Clique para atualizar a lista de pastas partilhadas."
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "Servidor de Impressão",
			CONTENT: [{
				type: "name",
				title: "Servidor de Impressão",
				content: "Mude para Ligado para ativar a função de servidor de impressão"
			},{
				type: "name",
				title: "Nome da Impressora",
				content: "Mostra o nome da impressora conectada ao router."
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "Controlo Parental",
			CONTENT: [{
				type: "paragraph",
				content: "Com Controlo Parental pode bloquear sites inapropriados, com conteúdos explícitos e maliciosos; restringir o acesso por determinadas horas do dia (por exemplo, facebook ou youtube durante o tempo dos trabalhos de casa) e, ao mesmo tempo, proteger todos os dispositivos da sua rede contra malware e phishing, através um ponto de controlo central."
			},{
				type: "name",
				title: "Controlo Parental",
				content: "Mude para Ligado para ativar a função de controlo parental. Por defeito, este recurso está desativado."
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "Dispositivos sob Controlo Parental",
			CONTENT: [{
				type: "paragraph",
				content: "Mostra a lista de dispositivos sob Controlo Parental."
			},{
				type: "name",
				title: "Nome do Dispositivo",
				content: "Mostra o nome de todos os dispositivos ligados que estão atualmente sob controlo parental."
			},{
				type: "name",
				title: "Endereço MAC",
				content: "Mostra o endereço MAC de todos os dispositivos ligados que estão atualmente sob controlo parental."
			},{
				type: "name",
				title: "Tempo de Acesso à Internet",
				content: "Exibe os períodos de restrição de acesso. A programação de tempo tem efeito com base na hora do sistema do Router, que pode ser configurado em \"Ferramentas do Sistema -> Configurações de hora\"."
			},{
				type: "name",
				title: "Descrição",
				content: "Mostra uma breve descrição do dispositivo ligado. É uma configuração opcional."
			},{
				type: "name",
				title: "Estado",
				content: "Mostra o status atual (ativado ou desativado) do controlo parental do dispositivo correspondente."
			},{
				type: "name",
				title: "Modificar",
				content: "Mostra opções para Modificar ou Apagar o dispositivo correspondente."
			},{
				type: "step",
				title: "Para restringir um novo dispositivo cliente",
				content:[
					"1. Clique em Adicionar.",
					"2. Clique em Ver Dispositivos Existentes e escolher um dispositivo ligado atualmente na Lista de Acesso de Dispositivos, ou digite o nome do dispositivo e Endereço MAC manualmente para adicionar um dispositivo que não esteja ligado.",
					"3. Clique no ícone Tempo de Acesso à Internet para especificar um período de tempo durante o qual a restrição se aplica.",
					"4. Insira uma breve descrição no campo Descrição. (Opcional)",
					"5. Selecione Ativar.",
					"6. Clique em OK para gravar esta entrada."
				]
			},{
				type: "paragraph",
				content: "Para modificar ou alterar uma entrada de Controlo Parental, clique no ícone Editar para editar a informação ou no ícone Lixo para remover a entrada correspondente."
			},{
				type: "paragraph",
				content: "Para apagar várias entradas, selecione todas as entradas e clique em Apagar acima da tabela."
			}]
		},
		BASIC_PARENTAL_RESTRICTION: {
			TITLE: "Restrição de Conteúdos",
			CONTENT: [{
				type: "name",
				title: "Lista Negra",
				content: "Contém as palavras-chave que serão utilizadas para bloquear acesso a qualquer site a partir de dispositivos especificados na lista de Controlo Parental.",
				children: [{
					type: "paragraph",
					content: "Clique em Adicionar Nova Palavra para adicionar uma palavra-chave à lista negra. Para excluir uma palavra-chave, clique no ícone (-) da palavra-chave que deseja eliminar."
				}]
			},{
				type: "name",
				title: "Lista Branca",
				content: "Contém os endereços dos sites aos quais os dispositivos especificados na lista de Controlo Parental têm acesso.",
				children: [{
					type: "paragraph",
					content: "Clique em Adicionar Novo Nome de Domínio para adicionar um site à lista de permissões. Para excluir um site, clique no ícone (-) do site que deseja eliminar."
				}]
			},{
				type: "note",
				title: "Nota",
				content: "As palavras-chave podem ser nomes de domínios, como por exemplo, mail.google.com ou www.facebook.com."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "Rede de Convidados",
			CONTENT: [{
				type: "paragraph",
				content: "A Rede de Convidados permite criar uma rede Wi-Fi isolada, com um nome de rede (SSID) e senha diferentes, possibilitando aos seus convidados e amigos acesso à Internet sem terem acesso à sua rede local e logo sem comprometer a segurança da sua informação privada."
			},{
				type: "name",
				title: "Permitir que os convidados se vejam entre si",
				content: "Selecione esta opção para permitir que os dispositivos Wi-Fi da Rede de Convidados possam comunicar entre si."
			},{
				type: "name",
				title: "Permitir que os convidados acedam à minha rede local",
				content: "Selecione esta opção para permitir que os dispositivos Wi-Fi da rede de Convidados acedam a pastas, ficheiros e impressoras partilhadas na rede local."
			},{
				type: "name",
				title: "Ativar Rede de Convidados",
				content: "Selecione esta opção para ativar a função Rede de Convidados."
			},{
				type: "name",
				title: "Nome da Rede Wi-Fi (SSID)",
				content: "Utilize o SSID predefinido ou crie um novo nome  de rede Wi-Fi (até 32 caracteres)."
			},{
				type: "name",
				title: "Ocultar SSID",
				content: "Selecione esta opção se desejar esconder o SSID da Rede de Convidados das listas de redes Wi-Fi."
			},{
				type: "name",
				title: "Senha",
				content: "Crie uma senha com 8 a 63 caracteres ASCII ou entre 8 a 64 caracteres hexadecimais (0-9, a-f, A-F), por forma a proteger a Rede de Convidados."
			},{
				type:"paragraph",
				content:"Clique em Gravar para guardar todas as suas configurações."
			}]
		}

	};
})(jQuery);
