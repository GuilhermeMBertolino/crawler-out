var AccessCtrlAccessRulesAdvHelpRpm =
{
	"header": "Ajuda com Controle de Acesso - Adicionar ou Modificar Regras",
	"brief": "Você pode criar uma nova regra nesta página.",
	"description": "<b>Descrição</b> - Defina um nome para a regra. Note que este nome deve ser exclusivo para cada regra criada.",
	"lan_host": "<B>LAN Host</B> - selecione um host da lista abaixo.",
	"target": "<B>Alvo</B> - Selecione aqui um alvo na lista abaixo. <b>Qualquer Alvo</b> é a escolha padrão.",
	"schedule": "<B>Horário</B> - Selecione um horário da lista suspensa para adicionar à regra. O valor padrão é Qualquer horário.",
	"rule": "<B>Horário</B> - Selecione um horário da lista suspensa para adicionar à regra. O valor padrão é Qualquer horário.",
	"direction": "<B>Direcão</B> - Selecione <B>Interna</B> ou <B>Externa</B> na lista abaixo.",
	"protocol": "<B>Protocolo</B> - Existem 4 opções de protocolo: Todos, TCP, UDP, e ICMP. Selecione um deles na lista que aparecerá abaixo.",
	"save": "Clique em <B>Salvar</B> para completar as configurações.",
	"back": "Clique em <B>Voltar</B> para retornar à página de Gerenciamento de Regras para Controle de Acesso."
};
var AccessCtrlAccessRulesHelpRpm =
{
	"header": "Ajuda com Controle de Acesso - Gerenciamento de Regras",
	"brief": "O Roteador fornece uma função de controle de acesso à internet robusta e adequada, que pode controlar as atividades na internet dos computadores conectados na rede local. Ainda, é possível combinar flexivelmente informações de Estações, Alvos e Horários para restringir a navegação destes computadores à Internet.",
	"internet": "<B>Habilitar Controle de Acesso</B> - Selecione esta opção para ativar a função de Controle do Acesso à Internet. Desta forma, as regras a serem criadas terão efeito nas configurações do roteador.",
	"description": "<B>Descrição</B> -  Exibe o nome da regra criada. Este nome deve ser diferente dos demais.",
	"lan_host": "<B>LAN Host</B> - Aqui é mostrado o host selecionado na regra correspondente.",
	"target": "<B>Alvo</B> - Exibe aqui o alvo selecionado na regra correspondente.",
	"schedule": "<B>Horário</B> - Exibe aqui o período selecionado na regra correspondente.",
	"rule": "<B>Regra</B> - Permite ou proibe pacotes não específicos de acordo com a mesma.",
	"status": "<B>Status</B> - O status da regra.",
	"edit": "<B>Editar</B> - Aqui você pode editar uma regra existente.",
	"for_exam": "<B>Por exemplo</B>: Se deseja restringir a atividade na Internet do host de endereço MAC <font color=\"#C11C66\">00:11:22:33:44:AA</font> para acessar <b>www.google.com</b> somente  <b>das 18:00 às 20:00</b> aos <b>Sábados e Domingos</b>, e <b>Proibir</b> outros hosts da LAN de acessar a Internet, você deve primeiramente seguir as configuração abaixo:",
	"rule_0": "Clique no submenu <b>Regras</b> em <b>Controle de Acesso</b> na esquerda para voltar à pagina de regra. Selecione <b>Habilitar Controle de Acesso</b> e escolha <b>Proibir pacotes não especificados para acessar este dispositivo</b>.",
	"setup_wiza": "Recomendamos que você clique no botão \"Assistente de Configuração\" para finalizar todas as configurações.",
	"host": "Clique no submenu <b>Host</b> em <b>Controle de Acesso</b> na esquerda para inserir a Lista Host. Adicione uma nova entrada com a descrição host, sendo Host_1 e o endereço MAC sendo: 00:11:22:33:44:AA. Host_1 o endereço MAC é 00:11:22:33:44:AA.",
	"target_0": "Clique no  submenu <b>Alvo</b> do <b>Controle de Acesso</b> na esquerda para inserir a lista de alvo. Adicione uma nova entrada com sua descrição correspondente..",
	"schedule_0": "Clique no submenu <b>Horário</b> em <b>Controle de Acesso</b> na esquerda para inserir a Lista de Horário. Adicione uma nova entrada com a descrição do horário, sendo Horário_1, dia Sáb e Dom, período inicial 1800 e período final 2000.",
	"rule_1": "Clique no submenu <b>Regras</b> em <b>Controle de Acesso</b> na esquerda, clique em <b>Adicionar Novo</b> para adicionar nova regra seguindo os passos:",
	"s_0": "No campo <B>Nome da Regra</B>, defina um nome para a nova regra criada, como Regra_1.",
	"s_1": "No campo <b>Host</b>, selecione Host_1.",
	"s_2": "No campo <b>Alvo</b>, selecione Alvo_1.",
	"s_3": "No campo <b>Horário</b> selecione Horário_1.",
	"s_4": "No campo <b>Status</B> selecione <b>Habilitar</b>.",
	"s_5": "Clique em <b>Salvar</b> para completar as alterações.",
	"s_6": "Ao finalizar as configurações, você retornará a página de Gerenciamento de Controle de Acesso e visualizará a seguinte tabela:",
	"add_new": "Clique no botão <b>Adicionar Novo</b> para adicionar nova regra.",
	"enable_sele": "Clique em <b>Habilitar Selecionado</b> para habilitar as regras selecionadas.",
	"disable_sele": "Clique em <b>Desabilitar Selecionado</b> para desabilitar uma regra selecionada na lista.",
	"delete_sele": "Clique em  <b>Apagar Selecionado</b> para eliminar as entradas selecionadas na tabela.",
	"note": "<b>Nota:</b> O roteador irá primeiro tentar combinar o pacote com as regras de filtragem uma por uma na lista e aplicar a primeira combinação. Se o pacote não é especificado por alguma regra, a regra de filtragem padrão terá efeito.",
	td_description: "Descrição",
	td_lan: "Host LAN",
	td_target: "Alvo",
	td_sched: "Horário",
	td_rule: "Regra",
	td_status: "Status.",
	td_edit: "Editar",
	td_allow: "Permitir",
	td_enable: "Habilitar"
};
var AccessCtrlAccessTargetsAdvHelpRpm =
{
	"header": "Ajuda com Controle de Acesso - Adicionar ou Modificar Alvos",
	"brief": "Você pode regras para a lista de alvos nesta página.",
	"mode": "<b>Modo</b> - Selecione entre as opções Endereço IP, Endereço MAC ou Nome de Domínio.",
	"description": "<b>Descrição do Alvo</B> - Digite um nome específico para cada alvo a ser criado. Esta descrição não pode ser igual as outras.",
	"ip_addr": "Se o <B>Endereço IP</B> está selecionado, você visualizará os items a seguir:",
	"ip_addr_0": "<B>Endereço IP</B> - insira o endereço IP (ou a classe de endereço) para o(s) alvo(s) na linha decimal pontilhada, por exemplo 192.168.0.23.",
	"port": "<b>Porta(s)</B> - Especifique a porta ou a série de portas para o alvo em questão. Protocolo - Selecione entre as opções Todos, TCP, UDP, e ICMP.",
	"url_addr": "Se a opção <b>Nome de Domínio</b> for selecionada, você verá os seguintes itens:",
	"url_addr_0": "<B>Endereço URL</B> -Aqui você pode entrar com até 4 nomes de domínio, podendo ser a URL completa (www.google.com.br) ou palavras chave (google) - neste segundo exemplo, qualquer endereço de internet que contenha a palavra 'google' (www.google.com.br, www.google.cn) será bloqueado ou permitido.",
	"save": "Clique em <B>Salvar</B> para completar as configurações.",
	"back": "Clique em <B>Voltar</B> para retornar à página de configurações de alvo."
};
var AccessCtrlAccessTargetsHelpRpm =
{
	"header": "Ajuda com Configurações de Alvo",
	"brief": "Nesta página, é possível criar uma lista de alvos para serem adicionados às regras de Controle de Acesso. Alvos são computadores de destinos aos quais você pode permitir ou negar o acesso.",
	"description": "<B>Descrição</B> - exibe a descrição do alvo, devendo ser  <B>única</B>.",
	"details": "<B>Detalhes</B> - o alvo pode ser o endereço IP, uma porta ou domínio.",
	"edit": "<B>Editar</B> - Para editar uma entrada existente.",
	"for_exam": "<B>Por exemplo</B>: Se deseja restringir a atividade na Internet do host de endereço MAC 00:11:22:33:44:AA para acessar <b>www.google.com</b> somente  <b>das 18:00 às 20:00</b> aos <b>Sábados e Domingos</b>, você deve primeiramente seguir as configuração abaixo:",
	"s_0": "Clique em <b>Adicionar Novo</B> para inserir um alvo na página da lista de configurações.",
	"s_1": "No campo <b>Modo</b>, selecione o <b>Domínio</b> na lista que aparecerá abaixo.",
	"unique": "No campo de descrição do alvo, crie uma descrição <B>única</B> para o alvo (ex.: Alvo_1)",
	"google": "No campo <b>Domínio</b>, digite <B>www.google.com</B>.",
	"save": "Clique em <B>Salvar</B> para completar as configurações.",
	"s_2": "Ao retornar a página principal, você verá a seguinte lista:",
	"add_new": "Clique em <b> Adicionar Novo</b> para adicionar um novo alvo.",
	"delete_sele": "Clique em  <b>Apagar Selecionado</b> para eliminar as entradas selecionadas na tabela.",
	td_description: "Descrição",
	td_details: "Detalhes",
	td_edit: "Editar"
};
var AccessCtrlHostsListsAdvHelpRpm =
{
	"header": "Ajuda sobre Controle de Acesso - Adicionar ou Modificar Estações",
	"brief": "Você pode criar uma entrada para a lista host nesta página.",
	"mode": "<B>Modo</B> - aqui há duas opções, endereço IP ou MAC. Você pode selecionar através da lista que aparecerá abaixo.",
	"description": "<b>Descrição </b> - Neste campo, criar uma descrição única para a estação a ser adicionada.",
	"ip_addr": "Se o <B>Endereço IP Address</B> está selecionado, você poderá visualizar o seguinte item:",
	"address": "<B>Endereço LAN IP</B> - insira o endereço IP ou classe IP do host na linha decimal pontilhada, exemplo: 192.168.0.23.",
	"mac_addr": "Se o <b>Endereço MAC </b> está selecionado, você poderá visualizar o seguinte item:",
	"mac_addr_0": "<B>Endereço MAC</B> - insira o endereço MAC do host no formato XX:XX:XX:XX:XX:XX, por exemplo: 00:11:22:33:44:AA.",
	"save": "Clique em <B>Salvar</B> para completar as configurações.",
	"back": "Clique em <b>Voltar</b> para retornar à página das Configurações das Estações."
};
var AccessCtrlHostsListsHelpRpm =
{
	"header": "Ajuda com Configurações de Host",
	"brief": "O Roteador fornece uma função de controle de acesso à internet robusta e adequada, que pode controlar as atividades na internet dos computadores conectados na rede local. Nesta página, você pode configurar uma lista host adequada com as Regras de Controle de Acesso.",
	"description": "<B>Descrição</B> - Aqui é mostrado a descrição do host e ela deve ser diferente de todas as outras.",
	"addr_info": "<B>Info de Endereço </B> - Mostra a informação do host, podendo ser IP ou MAC.",
	"edit": "<B>Editar </B> - Para editar uma entrada existente.",
	"for_exam": "<B>Por exemplo</B>: Se deseja restringir a atividade na Internet do host de endereço MAC <font color=\"#C11C66\">00:11:22:33:44:AA</font> você deve primeiramente seguir as configuração abaixo:",
	"add_new": "Clique em <B>Adicionar Novo</B> para inserir a lista host.",
	"s_0": "No campo <b>Modo</b>, selecione o endereço MAC da lista que aparecerá abaixo.",
	"unique": "No campo <b>Nome Host</B>, crie uma descrição <B>única</B> para o host, (ex.: Host_1)",
	"aa": "No campo endereço MAC, insira <B>00:11:22:33:44:AA</B>.",
	"save": "Clique em <B>Salvar</B> para completar as configurações.",
	"s_1": "Ao retornar a página principal, você verá a seguinte lista:",
	"add_new_0": "Clique em <b>Adicionar Novo</b> para adicionar uma entrada de novo host .",
	"delete_sele": "Clique em  <b>Apagar Selecionado</b> para eliminar as entradas selecionadas na tabela.",
	td_description: "Descrição",
	td_addr: "Info sobre Endereço",
	td_edit: "Editar"
};
var AccessCtrlTimeSchedAdvHelpRpm =
{
	"header": "Ajuda sobre Controle de Acesso - Adicionar ou Modificar Horários",
	"brief": "Nesta página é possível criar uma entrada para um período de tempo que envolve dias e horas, que poderá ser aplicada em uma regra de controle de acesso à internet.",
	"description": "<B>Descrição</B> - Defina uma descrição específica para cada entrada criada. Esta descrição deve ser <b>única.",
	"apply": "<b>Dias</b> - Selecione entre as opções Todos os dias e Selecionar dias.",
	"time": "<B>Hora Inicial/Final</B> - Defina neste campo o horário inicial e final para cada dia correspondente.",
	"save": "Clique em <B>Salvar</B> para completar as configurações.",
	"back": "Clique em <B>Voltar</B> para voltar à página de Configurações de Horário."
};
var AccessCtrlTimeSchedHelpRpm =
{
	"header": "Ajuda com Configurações de Horário",
	"brief": "O roteador, que fornece acesso à Internet conveniente e com funções de alto poder de controle, pode controlar atividades de hosts na LAN. Você pode alterar a lista de horários a fim de controlar atividades indesejadas dos hosts.",
	"descript": "<B>Descriçãon</B> - Aqui é indicado a descrição do horário e esta descrição é <b>única</b>.",
	"edit": "<B>Editar</B> - Aqui você pode editar um agendamento existente.",
	"for_exam": "<B>Por exemplo</B>: Se deseja restringir a atividade na Internet do host de endereço MAC 00:11:22:33:44:AA para acessar <b>www.google.com</b> somente  <b>das 18:00 às 20:00</b> aos <b>Sábados e Domingos</b>, você deve primeiramente seguir as configuração abaixo:",
	"add_new": "Clique em <B>Adicionar Nova</B> para entra na página de lista de horários.",
	"unique": "No campo <b>Descrição</b>,  crie uma descrição <b>única</b> para o horário, por exemplo, Horário_1.",
	"s_0": "No campo <b>Aplicar Para</b>, selecione o dia ou os dias que deseja.",
	"s_1": "No campo <b>Hora</b> você pode selecionar o horário de 24h ou escolher um horário de ínicio e fim específico. no campo correspondente.",
	"save": "Clique em <B>Salvar</B> para completar as configurações.",
	"s_2": "Então você voltará para a página de <b>Horário</b> e verá a lista a seguir",
	"add_new_0": "Clique em <b>Adicionar Novo</b> para adicionar uma entrada de novo host .",
	"delete_sele": "Clique em  <b>Apagar Selecionado</b> para eliminar as entradas selecionadas na tabela.",
	tb_descript: "Descrição",
	tb_edit: "Editar"
};
var AssignedIpAddrListHelpRpm =
{
	"header": "Ajuda com Lista de Clientes DHCP",
	"brief": "Esta página mostra <B>Nome do Cliente </B>, <B>Endereço MAC</B>, <B>IP Atribuído</B> e <B>Período de Concessão</B> de cada cliente DHCP ligado ao dispositivo.",
	"clie_name": "<B>Nome de Cliente</B> - O nome do cliente DHCP.",
	"mac_addr": "<B>Endereço MAC</B> - O endereço MAC do cliente DHCP.",
	"assi_ip": "<B>IP Atribuído</B> - O endereço IP que o dispositivo atribuiu ao cliente DHCP.",
	"leas_time": "<B>Tempo Conectado</B> - O período que resta para que o endereço de IP seja renovado.",
	"refresh": "Você não pode alterar nenhum valor nesta página. Para atualizar esta página e mostrar  os aparelhos conectados no momento, clique em <B>Atualizar</B>."
};
var BackNRestoreHelpRpm =
{
	"header": "Ajuda sobre Salvar Configurações",
	"brief": "Clique no botão Salvar para armazenar todas configurações do roteador para o seu computador, gerando um arquivo automático que pode ser recuperado posteriormente.",
	"s_0": "Para restaurar as configurações deste dispositivo, siga estas instruções:",
	"browse": "Clique no botão <b>Carregar Arquivo</b> arquivo para encontrar o arquivo salvo (backup) que você deseja restaurar.",
	"restore": "Clique no botão <b>Restaurar</b> para atualizar a configuração com o arquivo cujo caminho é aquele que você entrou ou selecionou no espaço vazio.",
	"note": "<B>Aviso:</B> A configuração atual será sobreposta com o arquivo de configuração carregado. Um processo incorreto deixará o dispositivo sem gerenciamento. O processo de restauração dura 20 segundos e este dispositivo irá reiniciar automaticamente. Mantenha este dispositivo ligado durante o processo, em caso de qualquer dano."
};
var BasicSecurityHelpRpm =
{
	"header": "Ajuda com Segurança Básica",
	"brief": "Você pode ajustar as Configurações de Segurança Básica nesta página.",
	"firewall": "<B>Firewall</B> - Aqui você pode habilitar ou desabilitar o firewall do roteador.",
	"spi_fire": "<B>Firewall SPI</B> - O SPI (Stateful Packet Inspection) ajuda a prevenir ataques à rede rastreando o sistema por etapas. Ele certifica que o tráfego da etapa específica está de acordo com o protocolo. O Firewall SPI é habilitado pelo padrão de fábrica, caso queira a exposição da sua rede, desabilite-o.",
	"vpn": "<B>VPN</B> - A passagem VPN deve ser habilitada se você quiser permitir conexões que utilizem protocolos VPN para acessar o roteador.",
	"pptp_pass": "<B>Passagem PPTP</B> -  O Protocolo de Acesso Ponto-a-ponto  (PPTP) permite dispositivos que utilizam esse protocolo acessar o seu roteador através de uma rede IP. Para permitir esse acesso, clique em <b>Habilitar</B>.",
	"l2tp_pass": "<B>Passagem L2TP</B> - O protocolo de tunelamento de segunda camada (L2TP) é o método usado para habilitar sessões Ponto-a-ponto via Internet na camada de nível 2. Para utilizar este, clique em <b>Habilitar</B>.",
	"ipsec_pass": "<B>Passagem IPSec</B> - A passagem IPSec é uma suíte de protocolos que garante comunicação privada e segura sobre a rede IP, através do uso de serviços de segurança criptografados. Para permitir túneis IPSec conectados ao roteador, clique em habilitar.",
	"alg": "<B>ALG</B> - É recomendado que se habilite a tarefa ALG (Application Layer Gateway) porque ela permite filtros transversais NAT serem plugados ao gateway para serem compatíveis com a tradução de endereço e porta para determinadas tarefas que utilizam protocolos de camada de controle, como por exemplo:  FTP, TFTP, H323 e etc.",
	"ftp_alg": "<B>FTP ALG</B> - Para permitir clientes e servidores FTP  transmitirem dados através da rede NAT, clique em <b>Habilitar</B>.",
	"tftp_alg": "<B>TFTP ALG</B> - Para permitir clientes e servidores TFTP  transmitirem dados através da rede NAT, clique em <b>Habilitar</B>.",
	"h323_alg": "<B>H323 ALG</B> - Para permitir a comunicação de clientes Microsoft NetMeeting através da rede NAT, clique em <b>Habilitar</B>.",
	"sip_alg": "<B>SIP ALG</B> - Para permitir clientes SIP e servidores transferirem dados através da rede NAT, clique em <b>Habilitar</B>.",
	"rtsp_alg": "<B>RTSP ALG</B> - Para permitir a comunicação de clientes media player com alguns servidores de transmissão de mídia através da rede NAT, clique em <b>Habilitar</B>.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var BpaCfgHelpRpm =
{
	"header": "Ajuda com Wan",
	"brief": "<B>Tipo de Conexão WAN:</B>",
	"dyna_ip": "Se o seu provedor estiver utilizando um servidor DHCP selecione a opção <B>IP Dinâmico</B>.",
	"stat_ip": "Se o seu provedor disponibiliza configurações de endereço IP fixo ou estático, máscara sub-rede, gateway e DNS selecione a opção <B>IP estático</B>.",
	"pppoe": "Se fornecer conexão PPPoE, selecione <B>PPPoE</B>.",
	"bigp_cable": "Caso seu provedor forneça cabo BigPond (ou sinal HeartBeat) selecione <B>BigPond Cable</B>.",
	"l2tp": "Para conexão L2TP, utilize a opção <B>L2TP</B>.",
	"pptp": "Para conexão PPTP, selecione <B>PPTP</B>.",
	"password": "<B>Nome e Senha de Usuário</B> - Insira o nome de usuário e senha fornecidos pelo seu provedor. Estes campos diferenciam caracteres maiúsculos e minúsculos.",
	"auth_serv": "<B>Servidor de Autenticação</B> - Insira o endereço do servidor de autenticação ou nome de host.",
	"auth_doma": "<B>Autenticação de Domínio</B> - Digite o sufixo de domínio do servidor baseado em sua localização, exemplo:<br>",
	"mtu_size": "<B>Tamanho MTU(em bytes)</B> - O valor MTU (Unidade de Transmissão Máxima) para a maioria das redes Ethernet é de 1500 Bytes. Dependendo do seu provedor você precisa modificar esse valor, embora seja rara essa necessidade. Portanto, evite modificá-lo a menos que seja necessário.",
	"alwa_on": "<b>Sempre Online</b> - Conecte-se automaticamente depois do roteador se desconectar. Para essa opção, clique no botão do rádio.",
	"connect": "<B>Conexão Sob Demanda</B> - Você pode configurar o roteador para desconectar da Internet depois de um período específico (<B>Tempo Máximo Ocioso</B>). Se sua conexão de Internet for desconectada por inatividade, a função <B>Conexão Sob Demanda</B> habilita o roteador a  restabelecer conexão automaticamente. Se deseja ativar a <B>Conexão Sob Demanda</B>, marque este campo. Caso queira que sua conexão permaneça sempre online, digite <B>0</B> no campo <B>Tempo Máximo Ocioso</B>.",
	"caution": "<b>Cuidado:</b> algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B> porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"connect_manu": "<b>Conectar Manualmente</b> - Você pode configurar o roteador para conectá-lo ou desconectá-lo manualmente. Depois de um período de inatividade <B>Tempo Máximo Ocioso</B>, o roteador irá desconectar e não poderá restabelecer a conexão automaticamente assim que você tentar se conectar à Internet novamente. Para usar esta opção, clique no botão do rádio. Se quiser que a conexão permaneça sempre online, insira <B>0</B> no campo <B>Tempo Máximo Ocioso</B>. Caso contrário, insira o número em minutos equivalente ao tempo que deseja como limite.",
	"caution_0": "<b>Cuidado:</b> algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B> porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"connect_0": "Clique em <B>Conectar</B> para conexão imediata.",
	"disconnect": "Clique em <B>Desconectar</B> para desconexão imediata.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var ChangeLoginPwdHelpRpm =
{
	"header": "Ajuda sobre  Usuário e Senha",
	"brief": "É altamente recomendável que você altere seu nome de usuário e senha padrões de fábrica deste dispositivo. Todos os usuários que tentarem acessar este utilitário web do dispositivo serão solicitados a inserirem nome de usuário e senha pelo dispositivo.",
	"note": "Nota: O novo <B>Nome de Usuário</B> e a nova<B> Senha</B> não devem exceder 32 caracteres de extensão, e não devem incluir espaços. Digite a nova Senha duas vezes para confirmá-la.",
	"save": "Clique no botão <B>Salvar</B> para armazenar as alterações.",
	"clea_all": "Clique no botão <b>Limpar</b> para apagar as informações."
};
var DateTimeCfgHelpRpm =
{
	"header": "Ajuda com Configurações de Hora",
	"brief": "This page allows you to set the time manually or to configure automatic time synchronization. The device can automatically update the time from an NTP server via the Internet.",
	"time_zone": "<B>Fuso Horário</B> - Selecione seu fuso horário local desta lista suspensa.",
	"manually": "<B>Para definir a hora manualmente:</B>",
	"s_0": "Selecione seu fuso horário local.",
	"date": "Insira a <B>Data</B>.",
	"time": "Insira a <B>Hora</B>.",
	"save": "Clique em <B>Salvar</B>.",
	"synchronization": "<b>Para a sincronização automática</b>:",
	"ntp_serv": "Digite o endereço ou o domínio do <B>Servidor NTP 1</B> ou <B>Servidor NTP 2</B>.",
	"get_gmt": "Clique em <B>Obter GMT</B> para obter o horário pela Internet.",
	"daylight": "<B>Para configurar o Horário de Verão:</B>",
	"daylight_0": "Selecione <B>Ativar Horário de Verão</B> caixa de verificação para habilitar a função do horário de verão.",
	"start": "Selecione a data de <b>Início</b> e <b>Fim</b> para horário de verão.",
	"save_0": "Clique em <B>Salvar</B>.",
	"note": "<B>Nota:</B>",
	"s_1": "This setting will be used for some time-based functions such as firewall functions. These time dependant functions will not work if time is not set. Therefore, it is important to specify time settings as soon as you successfully login to the device.",
	"s_2": "The time will be lost if the device is turned off.",
	"s_3": "The device will automatically obtain GMT from the Internet if it is configured accordingly.",
	"s_4": "Na configuração de horário de verão, caso o período final seja menor que o inicial, significa que ele está no ano seguinte.",
	"s_5": "Depois de habilitar a função do horário de verão, será acionado em um minuto."
};
var DdnsAddComexeHelpRpm =
{
	"header": "Ajuda com DDNS",
	"brief": "O Roteador possibilita ao usuário utilizar o recurso de Nome de Domínio Dinâmico (DDNS). Este recurso permite atribuir a um computador fixo um nome de domínio para um endereço de IP de Internet dinâmico. É útil quando você deseja hospedar seu próprio website, servidor FTP, ou outro servidor que esteja conectado \"atrás\" do Roteador. Antes de usar esta ferramenta, será necessário criar uma conta com provedores de serviço DDNS, tal como o <a href=\"#\" onClick=\"openWindow2();\" class=L1>www.comexe.cn</a>.",
	"s_0": "Para configurar o protocolo DDNS do roteador, siga as orientações abaixo:",
	"service_prov": "Se seu Provedor <b>DNS selecionado</b> é o <b>Comexe</b>, clique em (<a href=\"#\" onClick=\"openWindow2();\" class=L1>www.comexe.cn</a>).",
	"doma_names": "Digite o nome de domínio no campo <b>Endereço de Domínio</b>. ",
	"user_name": "Digite o <b>Nome de Usuário</b> da sua conta DDNS.",
	"password": "Insira a <B>Senha</B> da sua conta DDNS.",
	"login": "Clique em <B>Conectar</B> para entrar no serviço DDNS.",
	"conn_status": "<B>Status de Conexão</B> - O status do serviço de conexão DDNS service é mostrado aqui.",
	"logout": "Clique em <B>Desconectar</B> para sair do serviço DDNS.",
	"notice": "<B>Nota:</B>&nbsp;&nbsp;Se você quiser se conectar com outra conta depois de ter estabelecido uma conexão com sucesso, clique no botão <B>Desconectar</B>, e depois entre com o seu novo nome de usuário e senha, para então clicar no botão <B>Conectar</B> ."
};
var DiagHelp =
{
	"header": "Ajuda com Diagnóstico",
	"brief": "Nesta página você pode visualizar resultados de testes para a conectividade da camada física e camada de protocolo para ambos lados na tela de LAN e WAN. Selecione o tipo desejado e clique no botão inicial."
};
var DMZHelpRpm =
{
	"header": "Ajuda com DMZ",
	"brief": "A função host DMZ permite que um host local não seja exposto à Internet por razões importantes como jogos online ou vídeo conferência. O roteador encaminha pacotes de todos os serviços para o host DMZ. Quando um PC está configurado para host DMZ, recomenda-se desabilitar sua função cliente DHCP e atribuir um novo endereço IP estático a ele, porque seu endereço IP pode ser  alterado quando ele utiliza a função DHCP.",
	"computer": "<B>Para atribuir um computador ou servidor tornando-o um servidor DMZ</B>:",
	"enable": "Clique no botão <B>Habilitar</B>.",
	"address": "Insira o endereço IP do PC local que é configurado para ser o host DMZ no campo <B>Endereço IP Host DMZ</B> .",
	"save": "Clique no botão <B>Salvar</B>."
};
var DualBandSelectionHelpRpm =
{
	"header": "Ajuda com Seleção Dual Band",
	"brief": "A configuração de Internet foi finalizada, por favor, escolha a banda wireless do roteador.",
	"advantages": "<B>Vantagens da frequência de 5GHz:</B>",
	"s_0": "A banda de 5GHz costuma ser  menos congestionada. Já a de 2.4GHz é mais suscetível a interferências, uma vez que seu uso é comum pela maioria dos dispositivos wireless, como telefones sem fio, controles de portões automáticos, antenas de rádio em geral entre outros.",
	"disadvantages": "<B>Desvantagens da frequência 5GHz:</B>",
	"s_1": "Em geral, quanto mais alta a frequência  do sinal wireless, mais curto o seu alcance. Sendo assim, redes de 2.4GHz cobrem uma área consideravelmente maior que as de 5GHz. Em particular, redes de 5GHz não atravessam objetos sólidos com a mesma eficiência do sinal de 2.4GHz, o que limita seu alcance dentro de ambientes com muitos obstáculos."
};
var DynDdnsHelpRpm =
{
	"header": "Ajuda com DDNS",
	"brief": "O Roteador possibilita ao usuário utilizar o recurso de Nome de Domínio Dinâmico (DDNS). Este recurso permite atribuir a um computador fixo um nome de domínio para um endereço de IP de Internet dinâmico. É útil quando você deseja hospedar seu próprio website, servidor FTP, ou outro servidor que esteja conectado \"atrás\" do Roteador. Antes de usar esta ferramenta, será necessário criar uma conta com provedores de serviço DDNS, tal como o <a href=\"#\" onClick=\"openWindow1();\" class=L1>dyn.com</a>.",
	"s_0": "Para configurar o protocolo DDNS do roteador, siga as orientações abaixo:",
	"service_prov": "Se seu Provedor <b>DNS selecionado</b> é o <b>DYN</b>, acesse (<a href=\"#\" onClick=\"openWindow1();\" class=L1>dyn.com</a>) ",
	"user_name": "Digite o <b>Nome de Usuário</b> da sua conta DDNS.",
	"password": "Insira a <B>Senha</B> da sua conta DDNS.",
	"doma_name": "Digite o nome de domínio no campo <b>Endereço de Domínio</b>. ",
	"login": "Clique em <B>Conectar</B> para entrar no serviço DDNS.",
	"conn_status": "<B>Status de Conexão</B> - O status do serviço de conexão DDNS service é mostrado aqui.",
	"logout": "Clique em <B>Desconectar</B> para sair do serviço DDNS.",
	"notice": "<B>Nota:</B>&nbsp;&nbsp;Se você quiser se conectar com outra conta depois de ter estabelecido uma conexão com sucesso, clique no botão <B>Desconectar</B>, e depois entre com o seu novo nome de usuário e senha, para então clicar no botão <B>Conectar</B> ."
};
var FixMapCfgHelpRpm =
{
	"header": "Ajuda com Reserva de Endereço",
	"brief": "Quando você especifica um endereço IP para um PC da LAN, este sempre receberá o mesmo IP toda vez que ele acessar o servidor DHCP. Endereços IPs reservados podem ser atribuídos  para servidores que exigem configurações permanentes de IP.",
	"mac_addr": "<B>Endereço MAC</B> - O endereço MAC do PC de onde você quer reservar um endereço IP.",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP em que o dispositivo está reservado.",
	"status": "<b>Status</b> - Mostra se a entrada está habilitada ou não.",
	"edit": "<b>Editar</b> - Para editar ou deletar uma entrada existente.",
	"addresses": "<b>Para reservar endereços IPs, você pode acompanhar os seguintes passos</B>:",
	"s_0": "Insira o endereço MAC e o endereço IP na linha pontilhada decimal. O formato de endereço MAC é XX:XX:XX:XX:XX:XX (X é qualquer digito hexadecimal).",
	"save": "Clique no botão <B>Salvar</B>.",
	"address": "<B>Para editar um endereço IP, você pode seguir os próximos passos</B>:",
	"delete_sele": "Selecione o endereço reservado que desejar e edite-o. Se quiser deletar esta entrada, selecione-a e clique em <b>Deletar Selecionado</b>.",
	"delete_sele_0": "Se deseja apagar a entrada, selecione<b>Apagar Selecionado</b>.",
	"save_0": "Clique no botão <B>Salvar</B>.",
	"add_new": "Clique em <b> Adicionar Novo</b> para inserir uma nova reserva de endereço.",
	"enable_sele": "Clique em <b>Selecionar Habilitado</b> para habilitar as entradas selecionadas na tabela.",
	"disable_sele": "Clique no botão <b>Desabilitar Selecionado</b> para desabilitar as entradas selecionadas na tabela.",
	"delete_sele_1": "Clique em <b>Deletar Selecionado</b> para eliminar as entradas feitas na tabela."
};
var YandexDnsHelpRpm =
{
	"header": "Yandex.DNS",
	"brief": "Nesta página você pode configurar filtro Yandex.DNS que irá assegurar seus dispositivos de websites maliciosos e irá restringir os dispositivos das crianças de website adultos. Você pode configurar um filtro geral para todos os dispositivos ou um filtro separado para cada dispositivo.",
	"brief2": "Por favor, visite dns.yandex.ru para saber mais sobre o serviço Yandex.DNS.",
	"dev_all": "<B>Ativar DNS Yandex para todos os dispositivos</b> - Este filtro Yandex.DNS será ativado em todos os dispositivos que não estiverem na lista de regras Yandex.DNS.",
	"disabled": "<b>Desabilitado</b> - Significa que, nenhum filtro Yandex.DNS irá operar em todos os dispositivos.",
	"basic": "<b>Básico</b> - Significa que, o filtro  Yandex.DNS Básico irá operar em todos os dispositivos.",
	"safe": "<b>Seguro</b> - Significa que, nenhum filtro SafeYandex.DNS irá operar em todos os dispositivos.",
	"child": "<b>Criança</b> - Significa que, o filtro Criança Yandex.DNS irá operar em todos os dispositivos.",
	"mac_addr": "<B>Endereço MAC</B> - Exibe o endereço MAC do dispositivo no qual o filtro Yandex.DNS irá operar.",
	"description": "<B>Nome do Cliente</B> - Exibe a descrição do dispositivo para melhor indentificação do mesmo.",
	"mode": "<b>Modo de Controle</b> - Exibe o filtro Yandex.DNS escolhido para  dispositivo especial.",
	"edit": "<b>Editar</b> - Para editar ou deletar uma entrada existente.",
	"steps": "Para configurar filtros Yandex.DNS específicos para dispositivos especiais, clique em adicionar (\"add\"). Você pode escolher o dispositivo da lista de digitalização ou inserir o endereço MAC manualmente. Selecione o modo de controle especial, (básico, seguro e criança) e dê uma pequena descrição para regra."
};
var GuestNetUsbCfgHelpRpm =
{
	"header": "Ajuda com Armazenamento de Compartilhamento em Rede para Convidados.",
	"brief": "Você pode configurar o Armazenamento de Compartilhamento em Rede para Convidados nesta página.",
	"s_0": "Siga as instruções abaixo para configurar seu Armazenamento de Compartilhamento em Rede para Convidados:",
	"s_1": "Plugue um HD USB ou pendrive neste roteador.",
	"s_2": "Certifique-se de que o Status de Serviço na página de configurações USB->Armazenamento de Compartilhamento está <SPAN style=\"color:#C11C66\">Iniciado</SPAN>.",
	"s_3": "Certifique-se de que o acesso aos compartilhamento com senha na página de configurações USB->Armazenamento de Compartilhamento está <SPAN style=\"color:#C11C66\">Habilitado</SPAN>.",
	"start": "Clique em <B>Iniciar</B> para começar o preocesso de compartilhamento na rede para convidado.",
	"folder": "Clique em <B>Adicionar Nova Pasta a Ser Compartilhada</B> para especificar uma pasta para compartilhar com os convidados.",
	"s_4": "Há uma conta de usuário padrão  que pode acessar o armazenamento de compartilhamento para rede convidada e você pode alterar a senha desta conta. ",
	"user_name": "<B>Nome de Usuárioe</B> - O nome de usuário é <B>convidado</B> para rede convidada, isto não pode ser alterado.",
	"password": "<B>Senha</B> - Insira a senha no campo correspondente. Ela deve ser composta de símbolos alfanuméricos e não pode exceder 15 caracteres.",
	"confirm_pass": "<B>Confirmar Senha</B> - Insira novamente a senha aqui.",
	"storage_auth": "<B>Autorização de Armazenamento</B> - Autorização de Usuário: <B>Somente Leitura</B> ou <B>Leitura e Edição</B>.",
	"delete": "Nesta página, quando um uma pasta de compartilhamento é adicionada, você pode visualizar seu nome de exibição, partição de volume, caminho da pasta e também apagá-lo clicando no botão <B>apagar</B>.",
	"name": "<B>Nome</B> - o nome de exibição desta pasta.",
	"partition": "<B>Partição</B> - o volume que a pasta guarda. <SPAN style=\"color:#C11C66\">Os Volumes 1-8</SPAN> estão mapeando para porta USB 1, <SPAN style=\"color:#C11C66\">Os Volume 9-16</SPAN> estão mapeando para porta USB 2.",
	"folder_0": "<B>Pasta</B> - o caminho completo da pasta especificada.",
	"edit": "<B>Editar</B> - você pode editar a pasta de compartilhamento clicando neste botão.",
	"delete_0": "<B>Apagar</B> - você pode apagar a pasta de compartilhamento clicando no botão <B>apagar</B>.",
	"note": "<B>Nota</B>:",
	"s_5": "Se você quer permitir que os convidados visitem o armazenamento de compartilhamento para rede convidada como uma conta convidada, você deve <SPAN style=\"color:#C11C66\">habilitar</SPAN> o acesso com senha na página de configurações USB->Compatilhamento de Armazenamento, ou os convida dos não podem acessar o compartilhamento para rede convidada.",
	"s_6": "O número máximo de pastas de compartilhamento é 6. Caso queira compartilhar uma nova pasta quando o limite for atingido, você deve apagar uma antes de adicionar outra."
};
var GuestNetWirelessCfgHelpRpm =
{
	"header": "Configurações da Rede Wi-Fi para Convidados",
	"brief": "Você pode configurar a Rede para Convidados nesta página.",
	"network": "<B>Permitir acesso para convidados à minha rede local</B> - Caso habilitado, convidados poderão se comunicar com o host da rede.",
	"storage": "<B>Permitir acesso para convidados à minha rede de compartilhamento</B> - Se habilitado, convidados poderão acessar a porta USB de compartilhamento.",
	"isolation": "<B>Isolamento de Rede para Convidado</B> - Se habilitado, um convidado pode não se comunicar com o outro.",
	"bandwidth": "<B>Habilitar controle de largura de banda de rede para convidados</B> - Quando habilitado, as regras de controle de largura de banda de rede para convidados surtirão efeito.",
	"bandwidth_0": "<B>Acesso à Banda Larga para Rede de Convidado</B> - O a velocidade de upload através da porta WAN da rede de convidado.",
	"bandwidth_1": "<B>Controle de Banda da Rede para Convidados</B> - A velocidade de transferência através da porta WAN da rede para convidados.",
	"network_0": "<B>Rede para Convidados</B> - Habilite ou desabilite esta função aqui.",
	"netw_name": "<B>Nome de Rede</B> - Insira um valor de até 32 caracteres. O mesmo nome (SSID) deve ser atribuído para todos os dispositivos wireless da sua rede convidada.",
	"guests": "<B>Número Máximo de Convidados</B> - Máximo de Convidados (1-32).",
	"security": "<B>Segurança</B> - Você pode configurar  a segurança da rede de convidado aqui.",
	"access":"<B>Tempo de Acesso</B>",
	"acce_time": "<B>Agenda</B> - Durante este período, as estações wireless não poderão acessa a rede para convidados.",
	"timeout": "<B>Tempo Esgotado</B> - Se o contador chegar a zero, a rede para convidados será fechada.",
	"note": "<B>Nota</B>:",
	"s_0": "O alcance da largura de banda da rede para convidados é calculada de acordo com a configuração da página 'Controle de Largura de Banda', siga Controle de Largura de Banda->Configurações de Controle."
};
var IPv6LanHelp =
{
	"header": "Ajuda com IPv6 LAN",
	"brief": "Aqui você pode configurar a interface IPv6 LAN para o seu roteador. ",
	"configuration": "<B>Tipo de Autoconfiguração de Endereço:</B> Selecione o tipo para atribuir endereços IPv6 aos computadores na LAN. Servidores RADVD and DHCPv6 são fornecidos.",
	"s_0": "1) Se RADVD for selecionado, não é necessário ser configurado.",
	"s_1": "2) Se o servidor DHCPv6  é selecionado, por favor complete os parâmetros a seguir:",
	"address": "<B>Iniciar Endereço IPv6</B> Insira um valor para o servidor DHCPv6 para iniciar o envio de endereços IPv6.",
	"address_0": "<B>Finalizar Endereço IPv6</B> Insira um valor para o servidor DHCPv6 para finalizar o envio de endereços IPv6.",
	"leas_time": "<B>Tempo de Locação</B> Quantidade de tempo em que o usuário terá para conectar ao roteador através de seu endereço IPv6 dinâmico. Insira uma quantidade de tempo em horas para o usuário utilizar esse endereço IPv6. Quando o tempo expirar, um novo endereço IPv6 será atribuído ao usuário automaticamente. O padrão é 86400 segundos.  ",
	"configuration_0": "<B>Tipo de Configuração de Prefixo de Site</B> Selecione um tipo de atribuição de endereço de prefixo IPv6 para os computadores da sua LAN. São fornecidos endereços direcionados e estáticos.",
	"note": "<B>Nota:</B> Se sua conexão IPv6 WAN for <b>Túnel 6 para 4</b>, o tipo de configuração de prefixo de site deve ser <b>Estático</b> para garantir que este tipo funcione corretamente.",
	"s_2": "1) Se <b>Direcionado</b> for selecionado:",
	"connection": "<B>Prefixo Direcionado da Conexão WAN</B> Mostra a conexão WAN selecionada para atribuir um prefixo.",
	"s_3": "2) Se <b>Estático</b> é selecionado:",
	"site_pref": "<B>Prefixo de Site</B> Insira um valor para o prefixo de site.",
	"prefix": "<B>Tamanho do Prefixo do Site</B> Insira um valor para o tamanho do prefixo do site."
};
var IPv6StatusHelpRpm =
{
	"header": "Ajuda com Status IPv6",
	"brief": "O <B>Status IPv6</B> mostra o status IPv6 atual do roteador e sua configuração. Toda Informação é somente leitura.",
	"conn_type": "<B>Tipo de Conexão</B> - - A forma de conexão IPv6 na WAN.",
	"conn_status": "<B>Status de Conexão</B> - - O stauts de conexão IPv6.",
	"ipv6_addr": "<B>Endereço IPv6</B> - - O endereço IPv6 da WAN.",
	"default": "<B>Gateway Padrão IPv6</B> - - O gateway padrão do roteador.",
	"primary": "<B>DNS IPv6 Primário</B> - - O endereço DNS IPv6 primário.",
	"secondary": "<B>DNS IPv6 Secundário</B> - - O endereço DNS IPv6 secundário.",
	"lan": "<B>LAN</B>",
	"address": "<B>Tipo de Endereço IPv6</B> - - A forma que o roteador atribui endereços para o PC na LAN, SLAAC e Servidor DHCPv6.",
	"prefix_leng": "<B>Tamanho do Prefixo</B> - - O prefixo do site.",
	"ipv6_addr_0": "<B>Endereço IPv6</B> - -O endereço IPv6 global do roteador."
};
var IPv6TunnelHelp =
{
	"header": "Ajuda com Túnel IPv6 ",
	"brief": "O túnel IPv6 é o tipo de mecanismo de transição que habilita somente hosts IPv6 a alcançarem serviços IPv4. Também permite hosts IPv6 e redes isoladas  a alcançarem infraestrutura IPv4 antes de suplantarem IPv4 completamente. Esta é uma solução temporária para redes que não suportam ambos tipos de túnel de forma independente. ",
	"enable": "<b>Habilite</b> a função IPv6. Ela é desabilitada por padrão.",
	"mechanism": "<B>Mecanismo</B> - Selecione um tipo para túnel IPv6 da lista que aparecerá abaixo. DS-Lite, 6RDa type for IPv6 tunnel from the drop-down list. DS-Lite, 6RD e 6to4 são.",
	"ds_lite": "<B>DS-Lite</B>",
	"s_0": "Este tipo é utilizado no momento em que sua conexão WAN for IPv6 enquanto sua conexão LAN for IPv4.",
	"wan_conn": "<B>Conexão WAN</B> Selecione uma conexão WAN connection da lista. Somente conexões WAN conectadas podem ser mostradas na lista.",
	"conf_type": "<B>Tipo de Configuração</B> Selecione um tipo de ocnfiguração para este túnel. Auto significa o endereço IPv6 remoto automaticamente enquanto Manual, significa manualmente.",
	"address": "<B>Endereço Remoto IPv6</B> Insira o endereço IPv6 do nó remoto.",
	"note": "<B>Nota:</B> Neste tipo, não deve haver nenhuma conexão WAN IPv4, a página irá solicitar que todas as conexões WAN IPv4 devem ser apagadas.",
	"rd": "<B>6RD</B>",
	"s_1": "Este tipo é usado na situação em que sua conexão WAN utiliza IPv4 enquanto sua conexão LAN utiliza IPv6.",
	"wan_conn_0": "<B>Conexão WAN</B> Selecione uma conexão WAN connection da lista. Somente conexões WAN conectadas podem ser mostradas na lista.",
	"conf_type_0": "<B>Tipo de Configuração</B> Selecione um tipo de configuração para este túnel. \"Auto\" significa obter os parâmetros automaticamente enquanto em \"Manual\" você deverá ajustá-los. Caso selecione \"Auto\", somente conexões de IP dinâmico podem ser selecionadas na lista que aparecerá abaixo.",
	"length": "<B>Cumprimento de Máscara IPv4</B> O tamanho da máscara IPv4 da conexão WAN selecionada.",
	"rd_pref": "<B>Prefixo 6RD</B> O prefixo do túnel 6RD.",
	"prefix": "<B>6RD Prefix Length</B> O tamanho do prefixo 6RD.",
	"address_0": "<B>Endereço IPv4 de Relê de Entrada</B> O endereço IPv4 de relê de entrada do túnel 6RD.",
	"note_0": "<B>Nota:</B> Neste tipo, não deve haver nenhuma conexão WAN IPv6.Se houverem conexões IPv6, a página ira solicitar que você apague todas as conexões WAN.",
	"to": "<B>6 para 4</B>",
	"s_2": "Este tipo é usado na situação em que sua conexão WAN utiliza IPv4 enquanto sua conexão LAN utiliza IPv6.",
	"wan_conn_1": "<B>Conexão WAN</B> Selecione uma conexão WAN connection da lista. Somente conexões WAN conectadas podem ser mostradas na lista."
};
var L2tpCfgHelpRpm =
{
	"header": "Ajuda com Wan",
	"brief": "<B>Tipo de Conexão WAN:</B>",
	"dyna_ip": "Se o seu provedor estiver utilizando um servidor DHCP selecione a opção <B>IP Dinâmico</B>.",
	"stat_ip": "Se o seu provedor disponibiliza configurações de endereço IP fixo ou estático, máscara sub-rede, gateway e DNS selecione a opção <B>IP estático</B>.",
	"pppoe": "Se fornecer conexão PPPoE, selecione <B>PPPoE</B>.",
	"bigp_cable": "Caso seu provedor forneça cabo BigPond (ou sinal HeartBeat) selecione <B>BigPond Cable</B>.",
	"l2tp": "Para conexão L2TP, utilize a opção <B>L2TP</B>.",
	"pptp": "Para conexão PPTP, selecione <B>PPTP</B>.",
	"password": "<B>Nome e Senha de Usuário</B> - Insira o nome de usuário e senha fornecidos pelo seu provedor. Estes campos diferenciam caracteres maiúsculos e minúsculos.",
	"dynamic": "<B>IP Dinâmico/Estático</B> - Selecione <B>IP Estático</B> se o endereço IP, máscara sub-rede, gateway e o servidor DNS forem fornecidos pelo seu provedor. Caso contrário, utilize a opção <B>IP Dinâmico</B>.",
	"address": "<B>Endereço de Servidor IP/Nome</B> - Insira o endereço de servidor IP ou nome do domínio fornecido pelo seu provedor.",
	"ip_addr": "<B>Endereço IP</B> - Insira o endereço IP usado para discagem. (Configurado somente quando o IP Estático estiver selecionado).",
	"subn_mask": "<B>Máscara de Sub-rede</B> - A máscara sub-rede atribuída pelo seu ISP dinamicamente.",
	"gateway": "<B>Gateway</B> - Insira um gateway fornecido pelo seu ISP. (Configurado somente quando o IP Estático estiver selecionado).",
	"dns_serv": "<B>Servidor DNS</B> - Insira um servidor DNS fornecido pelo seu ISP. (Configurado somente quando o IP Estático estiver selecionado).",
	"internet": "<B>Endereço IP de Internet</B> o endereço atribuído pelo servidor L2TP.",
	"inte_dns": "<B>Internet DNS</B> O servidor DNS atribuído pelo servidor L2TP.",
	"alwa_on": "<b>Sempre Online</b> - Conecte-se automaticamente depois do roteador se desconectar. Para essa opção, clique no botão do rádio.",
	"connect": "<B>Conexão Sob Demanda</B> - Você pode configurar o roteador para desconectar da Internet depois de um período específico (<B>Tempo Máximo Ocioso</B>). Se sua conexão de Internet for desconectada por inatividade, a função <B>Conexão Sob Demanda</B> habilita o roteador a  restabelecer conexão automaticamente. Se deseja ativar a <B>Conexão Sob Demanda</B>, marque este campo. Caso queira que sua conexão permaneça sempre online, digite <B>0</B> no campo <B>Tempo Máximo Ocioso</B>.",
	"caution": "<b>Cuidado:</b> algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B> porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"connect_manu": "<b>Conectar Manualmente</b> - Você pode configurar o roteador para conectá-lo ou desconectá-lo manualmente. Depois de um período de inatividade <B>Tempo Máximo Ocioso</B>, o roteador irá desconectar e não poderá restabelecer a conexão automaticamente assim que você tentar se conectar à Internet novamente. Para usar esta opção, clique no botão do rádio. Se quiser que a conexão permaneça sempre online, insira <B>0</B> no campo <B>Tempo Máximo Ocioso</B>. Caso contrário, insira o número em minutos equivalente ao tempo que deseja como limite.",
	"caution_0": "<b>Cuidado:</b> algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B> porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"connect_0": "Clique em <B>Conectar</B> para conexão imediata.",
	"disconnect": "Clique em <B>Desconectar</B> para desconexão imediata.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var LanArpBindingHelpRpm =
{
	"header": "Ajuda com Vínculo IP & MAC - Configurações",
	"brief": "A funcionalidade Vincular ARP é útil para controlar o acesso de computadores específicos na rede local.",
	"mac_addr": "<B>Endereço MAC</B> - O endereço MAC do computador controlado na LAN.",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP Atribuído ao computador controlado na LAN.",
	"bind": "<B>Vincular</B> - Selecionar essa opção para habilitar a funcionalidade Vincular ARP para um dispositivo específico.",
	"edit": "<b>Editar</b> Para modificar uma entrada específica.",
	"add_new": "Clique em <b>Adicionar Novo</b> Clique para adicionar uma nova entrada à esta tabela.",
	"enable_sele": "<b>Habilitar Selecionadas</b> - Clique para habilitar as entradas selecionadas.",
	"disable_sele": "<b>Desabilitar Selecionadas</b> Clique para desabilitar todas as entradas selecionadas.",
	"delete_sele": "<b>Apagar Selecionadas</b> - Clique para eliminar as entradas selecionadas.",
	"example": "<B>Exemplo:</B> Se você deseja vincular o endereço IP 192.168.0.4 para o computador com endereço MAC 00-E0-4C-00-07-BE e manter outros computadores impossibilitados de usar este endereço, marque a opção Vincular, clique no botão Adicionar, e insira uma nova entrada na tabela, para que ela se pareça com a tabela abaixo.",
	td_mac: "Endereço MAC",
	td_ip: "Endereço IP",
	td_bind: "Vínculo",
	td_edit: "Editar"
};
var LanArpBindingListHelpRpm =
{
	"header": "Ajuda com Lista ARP",
	"brief": "É possível verificar os endereços IP na rede e seus endereços MAC associados pela lista ARP. Também é possível Carregar ou Apagar entradas diretamente na lista.",
	"mac_addr": "<B>Endereço MAC</B> - O endereço MAC do computador controlado na LAN.",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP Atribuído ao computador controlado na LAN.",
	"status": "<B>Status</B> - Indica se o MAC e o endereço IP estão vinculados ou não.",
	"load_sele": "<B>Carregar Selecionado</B> - Carregar o item na lista de vinculação IP & MAC.",
	"delete_sele": "<B>Deletar Selecionado</B> - Apagar o item da lista.",
	"note": "<B>Nota:</B> Um item não pode ser atribuído à lista de vinculação IP & MAC se o endereço IP do item for atribuído anteriormente."
};
var LanDhcpServerHelpRpm =
{
	"header": "Ajuda com DHCP - Configurações",
	"brief": "Este dispositivo está configurado por padrão como um servidor DHCP (Dynamic Host Configuration Protocol), que fornece a configuração TCP/IP para todos os PCs que estão conectados a este dispositivo na LAN.",
	"server": "<b>Servidor DHCP - Desabilitado ou Habilitado</b>. Como padrão, o servidor DHCP está habilitado para configurar automaticamente o endereço IP de cada computador conectado à interface LAN do roteador. Se o servidor DHCP for desabilitado, será necessário ter um outro servidor DHCP conectado na rede local, caso contrário as configurações do protocolo TCP/IP deverão ser feitas manualmente.",
	"address": "<b>Endereço IP Inicial - </b> Este campo especifica o primeiro endereço a ser atribuído automaticamente. O IP inicial padrão é 192.168.0.100..",
	"address_0": "<B>End IP Address</B> - Este campo especifica o último endereço a ser atribuído automaticamente. 192.168.0.199 é o endereço de IP final padrão.",
	"leas_time": "<B>Período de Concessão</B> - O <B>Período de Concessão de Endereço</B> é o período de tempo em que um usuário de rede será permitido para manter a conexão com o roteador com o atual endereço DHCP. Insira a quantidade de tempo, em minutos, que será \"concedido\" para o endereço DHCP. O período varia entre 1~2880 minutos. O valor padrão é de 120 min.",
	"default_gate": "<B>Gateway Padrão - </B>(Opcional) Sugere-se inserir o endereço IP da porta LAN do dispositivo, o valor padrão é 192.168.0.1.",
	"defa_domain": "<B>Domínio Padrão</B> - (Opcional) - insira seu nome de domínio da sua rede.",
	"dns_serv": "<B>Servidor DNS- </B>(Opcional) digite o endereço IP DNS fornecido pelo seu provedor ou consulte-o.",
	"secondary": "<B>DNS Secundário</B> - (Opcional) você pode inserir o endereço IP de outro servidores DNS caso provedor forneça dois servidores DNS.",
	"note": "<B>Aviso</B>: Para utilizar a função de servidor DHCP deste dispositivo, você deve configurar todos os computadores na LAN como modo \"Obter um endereço IP automaticamente\". Esta função terá efeito até que este dispositivo seja reiniciado.",
	"save": "Clique em <B>Salvar</B> para salvar as alterações."
};
var LanDhcpServerHelpRpm_AP = {
	"header": LanDhcpServerHelpRpm.header,
	"brief": LanDhcpServerHelpRpm.brief,
	"server": LanDhcpServerHelpRpm.server,
	"address": LanDhcpServerHelpRpm.address,
	"address_0": LanDhcpServerHelpRpm.address_0,
	"leas_time": "<B>Período de Concessão</B> - O <B>Período de Concessão</B> é o período de tempo em que um usuário de rede será permitido para manter a conexão com o roteador com o atual endereço DHCP. Insira a quantidade de tempo, em minutos que será \"concedido\" para o endereço DHCP. O período varia entre 1~2880 minutos. O valor padrão é de 1 min.",
	"default_gate": "<B>Gateway Padrão - </B>(Opcional) Sugere-se inserir o endereço IP da porta LAN do dispositivo, o valor padrão é 192.168.0.1.",
	"defa_domain": LanDhcpServerHelpRpm.defa_domain,
	"dns_serv": LanDhcpServerHelpRpm.dns_serv,
	"secondary": LanDhcpServerHelpRpm.secondary,
	"note": LanDhcpServerHelpRpm.note,
	"save": LanDhcpServerHelpRpm.save
};
var LocalManageControlHelpRpm =
{
	"header": "Ajuda com Gerenciamento Local",
	"brief": "Esta página permite-lhe negar acesso de computadores LAN ao roteador.",
	"allowed": "Por padrão, o botão  <B>Todos os PCs da LAN estão autorizados a acessar o utilitário web de gerenciamento do Roteador.</B> é selecionado. Caso queira autorizar PCs com um um endereço MAC específico a acessar a página de configuração do roteador, de dentro da rede, clique no botão<b> Somente o PCs listados podem acessar a página web e desempenhar funções de administrador.</b> e então inssira o endereço MAC no campo <b>Endereço MAC do seu PC</b>. O formato do endereço MAC é  XX:XX:XX:XX:XX:XX (X é qualquer dígito hexadecimal). Somente o PC com endereço MAC listado pode usar a senha para acessar a página web e desempenhar tarefas de administrador e todos os outros serão bloqueados.",
	"set": "Após clicar no botão <B>Configurar</B>, o endereço MAC do seu PC será substituído na lista de controle acima.",
	"save": "Clique em <B>Salvar</B> para manter as alterações.",
	"note": "<B>Nota</B>: Se o seu PC está bloqueado e deseja acessar o roteador novamente, utilize um objeto pontiagudo para pressionar por 5 segundos e soltar o <B>Botão Reset</B> no painel traseiro e então resetar o padrão de fábrica do roteador no utilitário web do mesmo."
};
var MacCloneCfgHelpRpm =
{
	"header": "Ajuda com Clone de MAC ",
	"brief": "A maioria dos cabos fornecidos pelos provedores de Internet registram um único endereço MAC de conexão cabeada no seu <span id = \"t_main_computer\" style=\"color:#C11C66\">COMPUTADOR PRINCIPAL - o último computador utilizado com o cabo de modem a ser conectado à Internet.</span>.",
	"s_0": "Se você adicionar um roteador à rede, seu provedor pode não reconhecer um endereço MAC do roteador e não permitir sua conexão.",
	"s_1": "De qualquer forma, o roteador TP-Link pode \"clonar\" ou duplicar o endereço de registro MAC do COMPUTADOR PRINCIPAL. Sendo assim, seu provedor pode liberar conexão para o roteador e todos os computaodres.",
	"address": "<B>Endereço MAC WAN</B> - Este campo mostra o endereço MAC atual. Se seu provedor exige que você registre o endereço MAC, favor inserir o endereço MAC corretamente neste campo. O formato de endereço MAC é XX:XX:XX:XX:XX:XX (X é qualquer digito hexadecimal).",
	"address_0": "<B>Endereço MAC do seu Computador</B> - Este campo mostra o endereço MAC do PC que está gerenciando o roteador. Se o endereço MAC do seu adaptador está registrado, você pode clicar no botão <B>Clonar MAC</B>, que este será preenchido no campo <B>Endereço WAN MAC</B>. ",
	"restore": "Clique em <B>Restaurar Padrão</B> para resgatar o valor padrão do endereço MAC da porta WAN.",
	"save": "Clique em <B>Salvar</B> para manter as alterações.",
	"note": "<B>Nota</B>:",
	"s_2": "Por favor, garanta que esteja fazendo o Clone de MAC com a conexão cabeada do seu <span style=\"color:#C11C66\">Computador Principal</span>",
	"address_1": "Somente PCs da sua rede LAN pode utilizar  a função <B>Clonar Endereço MAC</B> .",
	"address_2": "Se você alterar <B>Endereço MAC WAN</B> quando o tipo de conexão for PPPoE, as alterações não terão efeito até que a conexão é reestabelecida."
};
var ManageControlHelpRpm =
{
	"header": "Ajuda com Gerenciamento Remoto",
	"brief": "Esta função permite-lhe gerenciar seu roteador de uma localização remota via Internet.",
	"management": "<B>Porta de Gerenciamento Web</B> - O navegador de acesso web normalmente utiliza como padrão o serviço HTTP de porta 80. O padrão da porta do roteador para gerenciamento remoto via web é 80. Para uma segurança melhor, você pode alterar este valor inserindo um número que preferir na caixa fornecida. Escolha um valor entre 1024 e 65535 mas não utilize nenhum número de uma porta de serviço comum.",
	"management_0": "<B>Endereço IP de Gerenciamento Remoto</B> - Este é o endereço atual que você irá utilizar quando acessar o roteador através da Internet.  ",
	"s_0": "Para acessar o roteador, você deve inserir o endereço IP WAN do roteador na caixa de endereço do seu navegador, seguido de dois pontos e um número usual da porta que você configurou na caixa da página de Gerenciamento. Por exemplo, se o endereço WAN do roteador for 202.96.12.8 e você utiliza a porta 8080, insira http://202.96.12.8:8080 no seu navegador. Você será solicitado a inserir a senha do roteador e, após esse passo, você poderá acessar o utilitário web do roteador.",
	"note": "<B>Nota:</B>",
	"s_1": "Certifique-se de alterar a senha padrão do roteador para uma senha segura.",
	"virt_server": "Se a porta da página de gerenciamento conflitar com a utilizada para a entrada do <b>Servidor Virtual</b>, ela será automaticamente desabilitada após a configuração ser salva."
};
var MediaServerCfgHelpRpm =
{
	"header": "Ajuda com Servidor de Mídia",
	"brief": "Você pode configurar um servidor de mídia nesta página.",
	"s_0": "Siga as instruções abaixo para configurar seu servidor de mídia.",
	"s_1": "Plugue um HD USB ou pendrive neste roteador.",
	"start": "Clique em <B>Iniciar</B> para iniciar o servidor de mídia.",
	"folder": "Clique em <B>Adicionar Pasta de Compartilhamento </B> para especificar o caminho do servidor de mídia.",
	"scan_all": "Clique em <B>Buscar Todos</B> para buscar todas as pastas imediatamente. Você pode também selecionar <B>Busca Automática</B>,e ao mesmo tempo selecionar um intervalo de busca na lista. Neste caso, o servidor de mídia irá buscar automaticamente as pastas de compartilhamento.",
	"delete": "Nesta página, quando uma pasta de compartilhamento é adicionada, você pode visualizar o nome de exibição, tipo de sistema do arquivo, caminho da pasta e também apagar a pasta clicando em  <B>apagar</b>.",
	"name": "<B>Nome</B> - o nome de exibição desta pasta.",
	"file_syst": "<B>Sistema de Arquivo</B> - o tipo sistema de arquivo na partição pode ser FAT32 ou NFTS.",
	"folder_0": "<B>Pasta</B> - o caminho completo da pasta especificada.",
	"delete_0": "<B>Apagar</B> - você pode apagar a pasta de compartilhamento clicando em <B>Apagar</B>.",
	"note": "<B>Nota</B>:",
	"s_2": "O número máximo de pastas é 6. Caso queira compartilhar uma nova pasta quando o número atingir o máximo, você deve apagar uma pasta para adcionar outra.",
	"start_0": "Clique em <B>Iniciar</B> para iniciar o servidor de mídia.",
	"stop": "Clique <B>Parar</B> para parar o servidor de mídia.",
	"scan_all_0": "Clique em <B>Buscar Todas</B> para buscar todas as pastas de compartilhamento imediatamente.",
	"delete_1": "Clique em <B>Apagar</B> para apagar a pasta de compartilhamento especificada."
};
var MiscHelpRpm =
{
	"header": "Ajuda com Segurança Avançada",
	"brief": "Utilizando a página de <B>Configurações Avançadas</B> você protege o roteador  de ataques TCP-SYN Flood, UDP Flood e ICMP-Flood.",
	"statistics": "<font color=\"#C11C66\">Aviso: A Filtragem de FLOOD terá efeito somente quando as <b>Estatísticas</b> em <b>Ferramentas de Sistemas</b> estiverem habilitadas.</font>",
	"note_2":"<font color=\"#C11C66\">Nota 2: Se o hardware NAT estiver habilitado, o filtro de ataque NÃO terá efeito, porque estes dois módulos não podem trabalhar ao mesmo tempo.</font>",
	"dos_prot": "<B>Proteção DoS</B> - Habilita ou desabilita esta função. Os filtros de ataque são habilitados somente quando a função <B>Proteção DoS</B> estiver habilitada.",
	"filtering": "<B>Habilitar filtro de ataque ICMP-FLOOD</B> - Habilitar ou desabilitar o filtro de ataque ICMP-FLOOD.",
	"threshold": "<B>Pacote Inicial ICMP-FLOOD (5~3600)</B> - O valor padrão é 50. Insira um valor entre 5 <B>~</B> 3600. Quando o número do pacote ICMP-FLOOD é maior que o número estabelecido, o roteador iniciará o bloqueio.",
	"filtering_0": "<B>Habilitar filtro de ataque UDP-FLOOD</B> - Habilitar ou Desabilitar filtro de ataque UDP-FLOOD.",
	"threshold_0": "<B>Pacote Inicial UDP-FLOOD (5~3600)</B> - O valor padrão 500. Insira um valor entre 5 <B>~</B> 3600. Quando o número do pacote UPD-FLOOD é maior que o valor estabelecido, o roteador iniciará o bloqueio.",
	"filtering_1": "<B>Habilitar filtro de ataque TCP-SYN-FLOOD</B> - Habilitar ou desabilitar o filtro de ataque TCP-SYN-FLOOD.",
	"threshold_1": "<B>Pacote Inicial TCP-SYN-FLOOD (5~3600)</B> - O valor padrão é 50. Insira um valor entre 5 <B>~</B> 3600. Quando o número do pacote TCP-SYN-FLOOD  é maior que o valor estabelecido, o roteador iniciará o bloqueio imediatamente.",
	"forbidwan": "<B>Pacote de Ping Desconhecido da Porta WAN</B> - Habilitar ou Desabilitar Pacote de Ping Desconhecido da Porta WAN. A configuração padrão está habilitada. O pacote de ping da WAN não pode acessar o Roteador. (Defende contra alguns vírus).",
	"forbidlan": "<B>Pacote de Ping Desconhecido da Porta LAN</B> - Habilitar ou Desabilitar Pacote de Ping Desconhecido da Porta LAN. A configuração padrão está desabilitada. Caso seja habilitada, o pacote ping da LAN não pode acessar o Roteador. (Defende contra alguns vírus).",
	"save": "Clique em <B>Salvar</B> para guardar as configurações.",
	"blocked": "Clique em <B> Lista de Host DoS Bloqueados</B> para mostrar a tabela de host DoS bloqueados."
};
var NasCfgHelpRpm =
{
	"header": "Ajuda com Compartilhamente de Armazenamento",
	"brief": "Você pode configurar um HD USB conectado ao roteador nesta página.",
	"s_0": "Siga as instruções abaixo para configurar seu roteador como um servidor de mídia.",
	"s_1": "Plugue um HD USB ou pendrive neste roteador.",
	"rescan": "Clique me <B>Buscar Novamente</B> para saber se o drive USB foi conectado ao roteador.",
	"start": "Clique em <B>Iniciar</B> para começar o serviço de compartilhamento de armazenamento.",
	"enable": "Clique em <B>Habilitar</B> na linha compartilhada para habilitar o disco a ser compartilhado.",
	"disable": "Clique em <B>Desabilitar</B> na linha compartilhada para desabilitar o disco a ser compartilhado.",
	"s_2": "Nesta página, você pode visualizar o volume e propriedades de compartilhamento como nome de compartilhamento, capacidade, espaço utilizado, espaço livre e etc.",
	"serv_status": "<B>Serviço de Status</B> - Indica o status atual do serviço de compartilhamento de armazenamento.",
	"volume": "<B>Volume</B> - o nome de volume que o drive USB tem acesso. <SPAN style=\"color:#C11C66\">Volumes 1-8</SPAN> está mapeando para a porta USB 1, <SPAN style=\"color:#C11C66\">Volumes 9-16</SPAN> está mapeando para a porta USB 2.",
	"capacity": "<B>Capacidade</B> -a capacidade de armazenamento do driver USB.",
	"used": "<B>Utilizado</B> - o espaço utilizado do driver USB.",
	"free": "<B>Livre</B> - o espaço livre do driver USB.",
	"use": "<B>Uso em %</B> - a porcentagem do espaço utilizado.",
	"shared": "<B>Compartilhada</B> - Indica o status do volume compartilhado ou não compartilhado. Clique em <B>Desabilitar</B> ou <B>Habilitar</B> para decidir sobre seu compartilhamento.",
	"following": "<B>Você pode acessar o compartilhamente USB seguindo os passos</B>:",
	"windows": "<B>Para Windows XP</B>:",
	"s_3": "Vá para Iniciar > Executar",
	"s_4": "Insira \"\\tplinklogin.net\" na caixa de diálogo",
	"s_5": "Clique em OK",
	"windows_0": "<B>Para Windows Vista/7</B>:",
	"s_6": "Vá para Iniciar",
	"s_7": "Digite \"Executar\" na caixa de busca",
	"s_8": "Abra a aplicação para executar",
	"s_9": "Insira \"\\tplinklogin.net\" na caixa de diálogo",
	"s_10": "Clique em OK",
	"note": "<B>Nota</B>:",
	"s_11": "O roteador pode automaticamente localizar um novo drive USB.",
	"s_12": "As novas configurações não terão efeito até que você reinicie o serviço.",
	"ejec_disk": "Para retirar o drive USB, clique em <B>Ejetar Disco</B> primeiramente. Retirá-lo sem este procedimento antes pode causar danos ao dispositivo e perda de dados.",
	"s_13": "Volumes montados em cada porta USB estão sujeitas ao limite de até 8, portanto você não pode acessar um número maior que 8 de volumes no dispositivo de armazenamento USB.",
	"s_14": "Caso altere as configurações durante o processo de conexão de armazenamento, as alterações não terão efeito até que o roteador ou o cliente seja reiniciado.",
	"start_0": "Clique em <B>Iniciar</B> para começar o serviço de compartilhamento de armazenamento.",
	"stop": "Clique em <B>parar</B> para interromper o serviço de compartilhamento de armazenamento.",
	"ejec_disk_0": "Clique em <B>Ejetar Disco</B> para remover o dispositivo com segurança. Esta função deixa o dispositivo USB offline. Uma mensagem aparecerá informando que o arquivo está seguro para ser removido.",
	"rescan_0": "Clique em <B>Buscar Novamente</B> para fazer uma nova busca."
};
var NasFtpCfgHelpRpm =
{
	"header": "Ajuda com Servidor FTP",
	"brief": "Você pode configurar o servidor FTP nesta página.",
	"s_0": "Siga as instruções abaixo para configurar seu servidor FTP:",
	"s_1": "Plugue um HD USB ou pendrive neste roteador.",
	"enable_disa": "Clique em <B>Habilitar/Desabilitar</B> na caixa \"rádio\" para habilitar ou desabilitar acesso à Internet para FTP da porta WAN.",
	"serv_port": "Altere a <B>Porta de Serviço</B> para especificar uma porta para servidor FTP a ser utilizada (o padrão é 21).",
	"inte_address": "O <B>Endereço de Internet</B> exibe o endereço IP WAN deste roteador, portanto outros podem acessar FTP através deste endereço.",
	"public_addr": "Se o tipo de WAN é PPPoE/PPTP/L2TP, devem haver duas conexões. Portanto, os usuários podem acessar o servidor FTP de duas formas. Usuários em uma LAN privada podem fazê-la via <B>Endereço Público</B> enquanto usuários da Internet podem acessar via <B>Endereço de Internet</B>.",
	"start": "Clique no botão <B>Iniciar</B> para iniciar o servidor FTP.",
	"delete": "Nesta página, quando um uma pasta de compartilhamento é adicionada, você pode visualizar seu nome de exibição, partição de volume, caminho da pasta e também apagá-lo clicando no botão <B>apagar</B>.",
	"name": "<B>Nome</B> - o nome de exibição desta pasta.",
	"partition": "<B>Partição</B> - o volume que a pasta guarda. <SPAN style=\"color:#C11C66\">Os Volumes 1-8</SPAN> estão mapeando para porta USB 1, <SPAN style=\"color:#C11C66\">Os Volume 9-16</SPAN> estão mapeando para porta USB 2.",
	"folder": "<B>Pasta</B> - o caminho completo da pasta especificada.",
	"edit": "<B>Editar</B> - você pode editar a pasta de compartilhamento clicando neste botão.",
	"delete_0": "<B>Apagar</B> - você pode apagar a pasta de compartilhamento clicando no botão <B>apagar</B>.",
	"note": "<B>Nota</B>:",
	"s_2": "O máximo de pastas de compartilhamento é 10. Caso tenha atingido o número máximo e deseja adicionar uma nova pasta, apague uma da lista primeiramente.",
	"s_3": "Caso queira alterar as configurações FTP, você precisa reiniciar o servidor FTP para habilitar as mudanças."
};
var NasUserCfgHelpRpm =
{
	"header": "Ajuda com Contas de Usuários",
	"brief": "Você pode especificar o nome de usuário e senha para compartilhamento de armazenamento e usuários de servidor FTP nesta página. Usuários de compartilhamento de armazenamento podem utilizar Internet Explorer para acessar arquivos no drive USB. Usuários de servidor FTP pode acessar o servidor FTP via cliente FTP.",
	"s_0": "Há uma conta de usuário padrão que pode acessar o compartilhamento de armazenamento e o servidor FTP, a conta de administrador. Esta conta possui acesso completo de leitura e edição, como também pode acessar o servidor FTP.",
	"s_1": "Somente o administrador pode utilizar um navegador web para transferir arquivos de um PC para o volume compartilhado editável no drive USB.",
	"user_name": "<B>Nome de Usuário</B> - o tipo do nome do usuário de acesso ao drive USB. O nome de usuário deve ser composto de símbolos alfanuméricos sem exceder 15 caracteres em extensão.",
	"password": "<B>Senha</B> - insira a senha no campo relacionado. A senha deve ser composta de símbolos alfanuméricos. Por motivo de segurança, a senha para cada conta de usuário não é exibida.",
	"confirm_pass": "<B>Confirmar Senha</B> - Insira novamente a senha aqui.",
	"note": "<B>Nota</B>:",
	"windows": "Caso não consiga utilizar o novo nome de usuário e senha para acessar o compartilhamento, pressione <B>Windows logo (iniciar) + R</B> para abrir a caixa de diálogo <B>Executar</B> e digite <B>net use \\192.168.0.1 /delete /yes</B> e pressione Enter. (192.168.0.1 é o número IP LAN do seu roteador.)",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var NatStatusCfgHelpRpm =
{
	"header": "Ajuda com Configuração de Controle NAT",
	"brief": "Nesta página você pode desabilitar ou habilitar a função NAT ou Hardware de Controle NAT. As regras NAT e Hardware NAT funcionarão corretamente somente quando a função Controle NAT estiver habilitada.",
	"control": "<B>Habilitar Controle NAT</B> - Se habilitada, a função NAT the NAT function and the Forwarding configuration will take effect.",
	"disable": "<B>Desabilitar Controle NAT</B> - Se desabilitada, a função NAT e a configuração de encaminhamento terá efeito.",
	"hardware": "<B>Habilitar Hardware NAT</B> - Se habilitada, a função hardware NAT terá efeito.",
	"hardware_0": "<B>Desabilitar Hardware NAT</B> - Se desabilitada, a função hardware NAT terá efeito."
};
var NetworkCfgHelpRpm =
{
	"header": "Ajuda com LAN",
	"brief": "Você pode configurar os parâmetros IP nesta página.",
	"type": "<B>Tipo</B> - Escolha IP smart (DHCP) para obter o endereço IP do servidor DHCP, ou escolha IP estático para a configuração de endereço IP manualmente.",
	"mac_addr": "<B>Endereço MAC</B> - O endereço físico do roteador, como visto da rede LAN. Este valor não pode ser alterado.",
	"ip_addr": "<B>Endereço IP</B> - Digite o endereço IP na linha pontilhada decimal fornecido pelo seu provedor. (padrão de fábrica - 192.168.0.254).",
	"subn_mask": "<B>Máscara Sub-rede</B> - Um endereço que determina o tamanho da rede. Geralmente seu valor é de 255.255.255.0. ",
	"igmp_snoo": "<B>IGMP Snooping</B> - O IGMP snooping é designado a fim de prevenir hosts em rede local de receber tráfego de um grupo multicast cuja sua entrada não tenha sido claramente identificada. Esta função é útil em tarefas de  multicast que exigem intensa largura de banda, como por exemplo, IPTV.",
	"note": "<B>Nota: </B>",
	"s_0": "Caso altere o endereço IP, você deve utilizar o novo endereço IP para fazer login no Dispositivo.",
	"s_1":  "Caso o novo IP LAN não seja atribuído à mesma sub-rede que a última, o endereço IP no servidor DHCP será configurado automaticamente, mas o servidor virtual e o host DMZ não surtirão efeito até que eles sejam reconfigurados.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var NetworkCfgHelpRpm_AP =
{
	"header": NetworkCfgHelpRpm.header,
	"brief": NetworkCfgHelpRpm.brief,
	"type": NetworkCfgHelpRpm.type,
	"mac_addr": NetworkCfgHelpRpm.mac_addr,
	"ip_addr_HasRouter": "<B>Endereço IP</B> - Digite o endereço IP na linha pontilhada decimal fornecido pelo seu provedor. (padrão de fábrica - 192.168.0.254).",
	"ip_addr": "<B>Endereço IP</B> - Digite o endereço IP na linha pontilhada decimal fornecido pelo seu provedor (padrão de fábrica - 192.168.0.254).",
	"subn_mask": NetworkCfgHelpRpm.subn_mask,
	"igmp_snoo": NetworkCfgHelpRpm.igmp_snoo,
	"note": NetworkCfgHelpRpm.note,
	"s_0": NetworkCfgHelpRpm.s_0,
	"s_1": "Se você selecionar o tipo de IP smart(DHCP), o servidor DHCP nesse dispositivo não irá iniciar",
	"s_2": "Se o novo endereço de IP que você definir não estiver na mesma sub-rede que a anterior, o pool de endereços IP no servidor DHCP será configurado automaticamente.",
	"save": NetworkCfgHelpRpm.save
};
var NoipDdnsHelpRpm =
{
	"header": "Ajuda com DDNS",
	"brief": "O Roteador possibilita ao usuário utilizar o recurso de Nome de Domínio Dinâmico (DDNS). Este recurso permite atribuir a um computador fixo um nome de domínio para um endereço de IP de Internet dinâmico. É útil quando você deseja hospedar seu próprio website, servidor FTP, ou outro servidor que esteja conectado \"atrás\" do Roteador. Antes de usar esta ferramenta, será necessário criar uma conta com provedores de serviço DDNS, tal como o No-IP (<a href=\"#\" onClick=\"openWindow1();\" class=L1>www.noip.com</a>).",
	"s_0": "Para configurar o protocolo DDNS do roteador, siga as orientações abaixo:",
	"service_prov": "Se seu Provedor <b>DNS selecionado</b> é o <b>No-IP</b>, clique em (<a href=\"#\" onClick=\"openWindow1();\" class=L1>www.noip.com</a>).",
	"user_name": "Digite o <b>Nome de Usuário</b> da sua conta DDNS.",
	"password": "Insira a <B>Senha</B> da sua conta DDNS.",
	"doma_name": "Digite o nome de domínio no campo <b>Endereço de Domínio</b>. ",
	"login": "Clique em <B>Conectar</B> para entrar no serviço DDNS.",
	"conn_status": "<B>Status de Conexão</B> - O status do serviço de conexão DDNS service é mostrado aqui.",
	"logout": "Clique em <B>Desconectar</B> para sair do serviço DDNS.",
	"notice": "<B>Nota:</B>&nbsp;&nbsp;Se você quiser se conectar com outra conta depois de ter estabelecido uma conexão com sucesso, clique no botão <B>Desconectar</B>, e depois entre com o seu novo nome de usuário e senha, para então clicar no botão <B>Conectar</B> ."
};
var ParentCtrlAdvHelpRpm =
{
	"header": "Ajuda ao Adicionar ou Modificar Entrada de Controle dos Pais ",
	"brief": "O roteador, provendo a função de controle dos pais, que controla as atividades dos filhos na Internet, pode limitar acesso a determinados websites e restringir horários para a navegação. Nesta página você pode criar essas regras.",
	"address": "<B>Endereço MAC do PC do Filho(a)</B> - Insira o endereço MAC do PC que deseja controlar, ou você pode usar a lista de endereços MAC conectados na rede LAN atual abaixo. Caso deixe em branco, as regras serão aplicadas à todos os PCs exceto o PC do administrador/pai. ",
	"address_0": "<B>Todos os endereços MAC da LAN atual</B> - você pode visualizar os endereços MAC de todos os PCs da LAN atual clicando no botão que aparecerá abaixo. Escolha um deles, então este endereço MAC será preenchido no campo de endereço MAC do PC do filho(a). ",
	"website_desc": "<B>Descrição de Website</B> - neste campo,crie uma descrição para o(s) website(s). Esta descrição deve ser <b>única</b>.",
	"allowed": "<B>Nome de Website Permitido</B> - neste campo você pode inserir 8 nomes de domínios permitidos para que as crianças possam acessar, podendo ser o nome completo ou palavras-chave (\"google\" por exemplo).Qualquer domínio contendo as palavras-chave serão permitido(ex.:www.google.com, news.google.com).",
	"effe_time": "<B>Tempo Efetivo</B> - neste campo escolha o tempo efetivo para a regra ou você pode fazer uso do <b>Controle de Acesso > Agenda</b> para criar o período que desejar. O valor padrão é sempre \"Qualquer Hora\".",
	"status": "<B>Status</B> - neste campo, há duas opções para a regra: habilitada ou desabilitada. ",
	"save": "Clique em <B>Salvar</B> para completar as configurações.",
	"back": "Clique em <B>Voltar</B> para retornar à página de configurações de controle."
};
var ParentCtrlHelpRpm =
{
	"header": "Ajuda com Controle dos Pais",
	"brief": "Você poderá configurar o controle dos pais nesta página. Esta função pode ser útil para controlar a atividade dos filhos ou funcionários na Internet, bem como restringir acesso à determinados websites e período de navegação.",
	"parental": "<B>Habilitar Controle dos Pais</B> Marque esta função caso queira que seja habilitada, ela é desabilitada por padrão.",
	"parental_0": "<B>Endereço MAC do PC dos Pais</B> Neste campo, insira o endereço MAC do PC que irá controlaresta função, ou você pode usar o botão <B>Copiar Para o Campo Acima</B>.",
	"address": "<B>Endereço MAC do seu PC Atual</B> Este campo mostra o endereço MAC do PC que está gerenciando este roteador. Se o endereço MAC do seu adaptador está registrado, você pode clicar no botão <B>Copiar Para Campo Acima</B> para inserir este endereço no campo de controle dos pais.",
	"sche": "Selecione o período de tempo autorizado do PC controlado para acessar a Internet.",
	"for_exam": "<B>Por exemplo</B>: Se deseja restringir a atividade na Internet do host de endereço MAC 00:11:22:33:44:AA para acessar <b>www.google.com</b> somente  <b>das 18:00 às 20:00</b> aos <b>Sábados e Domingos</b>, você deve primeiramente seguir as configuração abaixo:",
	"add_new": "Clique em <B>Adicionar Nova</B> para entra na página de lista de horários.",
	"unique": "No campo <b>Descrição</b>,  crie uma descrição <b>única</b> para o horário, por exemplo, Horário_1.",
	"s_0": "No campo <b>Aplicar Para</b>, selecione o dia ou os dias que deseja.",
	"s_1": "No campo <b>Hora</b> você pode selecionar o horário de 24h ou escolher um horário de ínicio e fim específico. no campo correspondente.",
	"controlClient": "Selecione o PC que deseja controlar",
	"control_exam": "<B>Por exemplo</B>: Insira o endereço MAC (ex.: 00:11:22:33:44:AA) se preferir controlar nos campos de endereço MAC de 1 a 4 ou você pode selecionar um endereço MAC da LAN atual na lista abaixo.",
	"add_url": "<B>Adicionar URL</B> Aqui você pode inserir o endereço dos websites <b>Autorizados</B> para as crianças. "
};
var PingHelpRpm =
{
	"header": "Ajuda com Ferramentas do Sistema - Diagnóstico",
	"brief": "As ferramentas de diagnóstico (Ping e Traceroute) permitem verificar as conexões físicas dos computadores conectados em sua rede local. São testes que permitem averiguar se um link está ativo ou não.",
	"diag_tool": "<b>Ferramenta de Diagnóstico</b> - Selecione entre as opções:",
	"ping": "<B>Ping</B> -  Esta ferramenta de diagnóstico resolve o problema de conectividade, analisa o alcance, e a resolução do nome para um dado computador ou gateway usando um pacote de \"pedido de eco obrigatório\" do Protocolo de Controle de Mensagem da Internet (ICMP) para extrair uma Resposta de eco ICMP de um computador ou gateway de destino. Você pode usar o ping para testar ambos o endereço IP numérico ou o nome do domínio. Se é possível obter respostas do endereço IP, mas não do domínio, provavelmente há algum problema nas configurações de DNS do roteador.",
	"traceroute": "<B>Traceroute</B> - Esta ferramenta de diagnóstico determina o caminho levado para um host dado ao enviar mensagens Echo Requests e protocolo ICMP com tempo variável de valores Live (TTL) para seu destino. Cada gateway ao longo do caminho é solicitado a diminunir o TTL e um pacote IP ao menos 1 vez antes de encaminhá-lo. O TTL é um eficaz contador de tempo de vida do pacote. Quando o TTL em um pacote alcança 0, é esperado que o gateway retorne uma resposta de Tempo Excedido para seu dispositivo. O Traceroute determina o caminho ao enviar a primeira mensagem Echo Request com um TTL de 1 e aumentando o TTL em 1 em cada transmissão subsequente até que o alvo responda ou o número de saltos seja alcançado. O número máximo de saltos é de 20 por padrões e podem ser especificados no campo \"TTL Máx de Traceroute\". O caminho é determinado ao examinar as mensagens de Tempo Excedido ICMP retornadas por roteadores intermediários e a mensagem Echo Reply retornada pelo destino. De qualquer forma, alguns roteadores não retornam mensagens de Tempo Excedido para pacotes com os valores TTL expirados e são invisíveis à ferramenta de traceroute. Neste caso, uma sequência de asteriscos (*) é exibida para este salto.",
	"address": "<B>Endereço IP/Domínio</B> - Digite o Endereço IP ou Nome do Domínio do computador cuja conexão você deseja diagnosticar",
	"ping_coun": "<B>Número de Ping</B>  - Digite a quantidade de mensagens do pedido Echo a ser enviado. O valor padrão é 4.",
	"packet": "<B>Tamanho do Pacote</B> - Digite o número de dados em Bytes a ser enviado. O padrão valor é 64.",
	"ping_time": "<B>Tempo limite</B> - Tempo para aguardar uma resposta, em segundos. O padrão 1.",
	"traceroute_0": "<B>Traceroute Máximo (TTL)</B> - Estabelece o número máximo de saltos (TTL máximo a ser alcançado) no caminho para buscar o alvo (destino). O valor padrão é 20.",
	"start": "Clique no botão <B>Iniciar</B> para começar o procedimento de diagnóstico.",
	"note": "<B>Nota:</B>",
	"s_0": "Apenas um usuário pode usar ferramentas de diagnósticos por vez.",
	"s_1": "\"Número de Ping\", \"Tamanho do Pacote\" e \"Tempo Limite\" são parâmetros ping, e \"Traceroute Máximo\" é parâmetro de traceroute."
};
var PPPoECfgHelpRpm =
{
	"header": "Ajuda com Wan",
	"brief": "<B>Tipo de Conexão WAN:</B>",
	"dyna_ip": "Se o seu provedor estiver utilizando um servidor DHCP selecione a opção <B>IP Dinâmico</B>.",
	"stat_ip": "Se o seu provedor disponibiliza configurações de endereço IP fixo ou estático, máscara sub-rede, gateway e DNS selecione a opção <B>IP estático</B>.",
	"pppoe": "Se fornecer conexão PPPoE, selecione <B>PPPoE</B>.",
	"bigp_cable": "Caso seu provedor forneça cabo BigPond (ou sinal HeartBeat) selecione <B>BigPond Cable</B>.",
	"l2tp": "Para conexão L2TP, utilize a opção <B>L2TP</B>.",
	"pptp": "Para conexão PPTP, selecione <B>PPTP</B>.",
	"note": "Caso tenha dúvida sobre a conexão apropriada, clique no botão <B>Detectar</B> para permitir que o roteador procure automaticamente na sua conexão de Internet por servidores e protocolos. O tipo de conexão será reportada assim que um serviço de Internet ativo seja detectado. Essa reportagem é somente uma referência, para ter certeza do tipo de conexão que seu provedor fornece, entre em contato com o mesmo. Os diferentes tipos que seu roteador pode detectar são:",
	"pppoe_0": "<B>PPPoE</B> - Conexões que utilizam PPPoE que requerem nome e senha de usuário.",
	"dyna_ip_0": "<B>IP Dinâmico</B> - Conexões que utilizam endereço de IP Dinâmico.",
	"stat_ip_0": "<B>IP Estático</B> - Conexões que utilizam endereço de IP Estático.",
	"password": "<B>Nome e Senha de Usuário</B> - Insira o nome de usuário e senha fornecidos pelo seu provedor. Estes campos diferenciam caracteres maiúsculos e minúsculos.",
	"secondary_conn": "<B>Conexão Secundária</B> - É disponível somente para conexão PPPoE. Se seu provedor fornece tipos de conexão extra como IP Dinâmico/Estático para uma rede local, você pode observar a opção IP Dinâmico/Estático para ativar uma conexão secundária. (A conexão secundária não deve estar na mesma sub-rede com conexão PPPoE). ",
	"disabled": "<B>Desabilitado</B> - A conexão secundária é desabilitada por padrão, portanto a conexão PPoE é recomendada.",
	"dyna_ip_1": "<B>IP Dinâmico</B> - Use o endereço de IP dinâmico para conectar a rede local fornecida pelo seu provedor.",
	"stat_ip_1": "<B>IP Estático</B> - Utilize endereço IP estático para conectar a rede local fornecida pelo provedor. <B>Endereço IP</B> -  Insira um endereço IP fornecido pelo provedor. Este endereço é usado somente para acessar a rede local da conexão secundária. <B>Máscara de Sub-rede</B> -  Insira a máscara de sub-rede fornecida pelo provedor para a conexão secundária.",
	"alwa_on": "<b>Sempre Online</b> - Conecte-se automaticamente depois do roteador se desconectar. Para essa opção, clique no botão do rádio.",
	"connect": "<B>Conexão Sob Demanda</B> - você pode configurar o roteador para se desconectar da Internet depois de um período específico de inatividade (<b>Tempo Máximo Ocioso</b>). Se sua conexão de Internet for finalizada por inatividade, a <b>Conexão Sob Demanda</b> habilita o roteador a reestabelecer conexão automaticamente assim que tentar utilizar a Internet novamente. Caso deseja desativar esta função, coloque uma marcação no círculo indicado. Caso deseja que sua Internet permaneça sempre conectada digite <B>0</B> no campo <B>Tempo Máximo Ocioso</B>.",
	"note_0": "<b>Nota:</b> Algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B>(0~99 mins) porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"connect_manu": "<b>Conectar Manualmente</b> - Você pode configurar o roteador para conectá-lo ou desconectá-lo manualmente. Depois de um período de inatividade <B>Tempo Máximo Ocioso</B>, o roteador irá desconectar e não poderá restabelecer a conexão automaticamente assim que você tentar se conectar à Internet novamente. Para usar esta opção, clique no botão do rádio. Se quiser que a conexão permaneça sempre online, insira <B>0</B> no campo <B>Tempo Máximo Ocioso</B>. Caso contrário, insira o número em minutos equivalente ao tempo que deseja como limite.",
	"note_1": "<b>Nota:</b> Algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B>(0~99 mins) porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"note_2": "<B>Nota:</B> Somente quando é configurado a hora e data do sistema (<B>Ferramentas de Sistema</B> -> <B>Configurações de Data e Hora</B> a função <B>Conexão com Data e Hora</B> terá efeito.",
	"connect_0": "Clique em <B>Conectar</B> para conexão imediata.",
	"disconnect": "Clique em <B>Desconectar</B> para desconexão imediata.",
	"advanced": "Clique no botão <B>Avançado</B> para opções avançadas.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var PPPoEv6CfgHelpRpm =
{
	"header": "Ajuda com WAN IPv6",
	"brief": "<B>Tipo de Conexão WAN:</B>",
	"s_0": "Escolha o tipo de conexão WAN correta de acordo com a tipologia do seu provedor.",
	"dhcpv": "<B>DHCPv6</B> - Conexões que utilizam atribuição de endereço IPv6 dinâmico.",
	"stat_ipv": "<B>IPv6 Estático</B> - Conexões que utilizam atribuição de endereço IPv6 estático.",
	"pppoev": "<B>PPPoEv6</B> - Conexões que utilizam PPPoEv6nque requerem um nome de usuário e senha.",
	"tunn_6to": "<B>Túnel 6 para 4</B> - Conexões que utilizam atribuições de endereço 6 para 4.",
	"password": "<B>Nome e Senha de Usuário</B> - Insira o nome de usuário e senha fornecidos pelo seu provedor. Estes campos diferenciam caracteres maiúsculos e minúsculos.",
	"advance": "Se o seu provedor fornece dois endereços DNS IPv6 clique em <b>Avançado</b> e selecione <B>Configurar Servidor DNS Manualmente</B> e insira <B>DNS IPv6 Primário</B> e <B>DNS IPv6 Secundário</B> nos campos corretos. Caso contrário, os servidores DNS serão atribuídos dinamicamente.",
	"primary": "<B>DNS IPv6 Primário</B> - Insira o endereço DNS IPv6 no espaço separado por \":\" com dígitos hexadecimais fornecido pelo seu provedor.",
	"secondary": "<B>DNS IPv6 Secundário</B> - Insira outro endereço DNS IPv6 no espaço separado por \":\" com dígitos hexadecimais fornecido pelo seu provedor.",
	"connect": "<B>Conexão Sob Demanda</B> - você pode configurar o roteador para se desconectar da Internet depois de um período específico de inatividade (<b>Tempo Máximo Ocioso</b>). Se sua conexão de Internet for finalizada por inatividade, a <b>Conexão Sob Demanda</b> habilita o roteador a reestabelecer conexão automaticamente assim que tentar utilizar a Internet novamente. Caso deseja desativar esta função, coloque uma marcação no círculo indicado. Caso deseja que sua Internet permaneça sempre conectada digite <B>0</B> no campo <B>Tempo Máximo Ocioso</B>.",
	"note": "<b>Nota:</b> Algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B>(0~99 mins) porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"connect_auto": "<b>Conectar Automaticamente</b> - conecte-se automaticamente após o roteador depois do roteador ser desconectado. Para usar esta opção, clique no botão do rádio.",
	"connecting": "<B>Conexão por Período de Tempo</B> - você pode configurar o roteador para fazê-lo conectar ou desconectar  em períodos determinados. Insira o tempo inicial em HH-MM para conectar e um horário final para se desconectar nos campos <B>Período de Tempo</B>.",
	"connect_manu": "<b>Conectar Manualmente</b> - Você pode configurar o roteador para conectá-lo ou desconectá-lo manualmente. Depois de um período de inatividade <B>Tempo Máximo Ocioso</B>, o roteador irá desconectar e não poderá restabelecer a conexão automaticamente assim que você tentar se conectar à Internet novamente. Para usar esta opção, clique no botão do rádio. Se quiser que a conexão permaneça sempre online, insira <B>0</B> no campo <B>Tempo Máximo Ocioso</B>. Caso contrário, insira o número em minutos equivalente ao tempo que deseja como limite.",
	"note_0": "<b>Nota:</b> Algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B>(0~99 mins) porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"note_1": "<B>Nota:</B> Somente quando é configurado a hora e data do sistema (<B>Ferramentas de Sistema</B> -> <B>Configurações de Data e Hora</B> a função <B>Conexão com Data e Hora</B> terá efeito."
};
var PptpCfgHelpRpm =
{
	"header": "Ajuda com Wan",
	"brief": "<B>Tipo de Conexão WAN:</B>",
	"dyna_ip": "Se o seu provedor estiver utilizando um servidor DHCP selecione a opção <B>IP Dinâmico</B>.",
	"stat_ip": "Se o seu provedor disponibiliza configurações de endereço IP fixo ou estático, máscara sub-rede, gateway e DNS selecione a opção <B>IP estático</B>.",
	"pppoe": "Se fornecer conexão PPPoE, selecione <B>PPPoE</B>.",
	"bigp_cable": "Caso seu provedor forneça cabo BigPond (ou sinal HeartBeat) selecione <B>BigPond Cable</B>.",
	"l2tp": "Para conexão L2TP, utilize a opção <B>L2TP</B>.",
	"pptp": "Para conexão PPTP, selecione <B>PPTP</B>.",
	"password": "<B>Nome e Senha de Usuário</B> - Insira o nome de usuário e senha fornecidos pelo seu provedor. Estes campos diferenciam caracteres maiúsculos e minúsculos.",
	"dynamic": "<B>IP Dinâmico/Estático</B> - Selecione <B>IP Estático</B> se o endereço IP, máscara sub-rede, gateway e o servidor DNS forem fornecidos pelo seu provedor. Caso contrário, utilize a opção <B>IP Dinâmico</B>.",
	"address": "<B>Endereço de Servidor IP/Nome</B> - Insira o endereço de servidor IP ou nome do domínio fornecido pelo seu provedor.",
	"ip_addr": "<B>Endereço IP</B> - Insira o endereço IP usado para discagem. (Configurado somente quando o IP Estático estiver selecionado).",
	"subn_mask": "<B>Máscara de Sub-rede</B> - A máscara sub-rede atribuída pelo seu ISP dinamicamente.",
	"gateway": "<B>Gateway</B> - Insira um gateway fornecido pelo seu ISP. (Configurado somente quando o IP Estático estiver selecionado).",
	"dns_serv": "<B>Servidor DNS</B> - Insira um servidor DNS fornecido pelo seu ISP. (Configurado somente quando o IP Estático estiver selecionado).",
	"internet": "<B>Endereço IP de Internet</B> o endereço atribuído pelo servidor PPTP.",
	"inte_dns": "<B>Internet DNS</B> O servidor DNS atribuído pelo servidor PPTP.",
	"alwa_on": "<b>Sempre Online</b> - Conecte-se automaticamente depois do roteador se desconectar. Para essa opção, clique no botão do rádio.",
	"connect": "<B>Conexão Sob Demanda</B> - Você pode configurar o roteador para desconectar da Internet depois de um período específico (<B>Tempo Máximo Ocioso</B>). Se sua conexão de Internet for desconectada por inatividade, a função <B>Conexão Sob Demanda</B> habilita o roteador a  restabelecer conexão automaticamente. Se deseja ativar a <B>Conexão Sob Demanda</B>, marque este campo. Caso queira que sua conexão permaneça sempre online, digite <B>0</B> no campo <B>Tempo Máximo Ocioso</B>.",
	"caution": "<b>Cuidado:</b> algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B> porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"connect_manu": "<b>Conectar Manualmente</b> - Você pode configurar o roteador para conectá-lo ou desconectá-lo manualmente. Depois de um período de inatividade <B>Tempo Máximo Ocioso</B>, o roteador irá desconectar e não poderá restabelecer a conexão automaticamente assim que você tentar se conectar à Internet novamente. Para usar esta opção, clique no botão do rádio. Se quiser que a conexão permaneça sempre online, insira <B>0</B> no campo <B>Tempo Máximo Ocioso</B>. Caso contrário, insira o número em minutos equivalente ao tempo que deseja como limite.",
	"caution_0": "<b>Cuidado:</b> algumas vezes a desconexão não pode ser feita a menos que você determine um tempo limite para <B>Tempo Máximo Ocioso</B> porque algumas tarefas, talvez ocultas, necessitam de conexão contínua.",
	"connect_0": "Clique em <B>Conectar</B> para conexão imediata.",
	"disconnect": "Clique em <B>Desconectar</B> para desconexão imediata.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var PrintServerCfgHelpRpm =
{
	"header": "Ajuda com Servidor de Impressão",
	"brief": "Você pode configurar o servidor de impressão nesta página.",
	"s_0": "Há dois modos de servidor de impressão, conforme descritos a seguir:",
	"online": "<B>Online</B>- Indica quando o servidor estiver ligado, clique em <B>\"Parar\"</B> se quiser pará-lo.",
	"offline": "<B>Offline</B>- Indica que o servidor de impressão estão desabilitado, clique em <B>\"Iniciar\"</B> se quiser habilitá-lo."
};
var QoSCfgHelpRpm =
{
	"header": "Ajuda com Configuração de Controle de Banda",
	"brief": "Nesta página você pode desabilitar ou habilitar a função de Controle de Banda. As regras de controle funcionarão apropriadamente somente quando a função está habilitada. ",
	"bandwidth": "<B>Habilitar Controle de Banda</B>  Marque esta opção caso queira ativar as configurações de controle de banda.",
	"egress_band": "<B>Velocidade de Saída</B> - Velocidade de transmissão disponível na porta WAN do roteador. Corresponde à velocidade de upload do seu link de internet.",
	"ingress_band": "<B>Velocidade de Entrada</B> - A velocidade do download através da porta WAN.",
	"s_0": "Lista de Regras de Controle de Banda",
	"description": "<b>Descrição</b> - a informação da descrição inclui classe de endereço, de porta e protocolo de camada de transporte.",
	"priority": "<b>Prioridade</b> - Regra de Prioridade para o Controle de Banda. 1 significa a mais alta e 8 é a prioridade mínima. Casa haja alguma largura de banda restante, essa será prontamente atribuída para a primeira prioridade conforme a regra, caso para essa não haja necessidade, a prioridade vai para a seguinte da lista, e assim por diante.",
	"egress_band_0": "<B>Velocidade de Saída</B> - velocidade máxima de upload através d aporta WAN, o valor padrão é 0.",
	"ingress_band_0": "<B>Velocidade de Entrada</B> - velocidade máxima de download através d aporta WAN, o valor padrão é 0..",
	"status": "<b>Status</b> - Status da regra, mostra se a regra está surtindo efeito.",
	"edit": "<b>Editar</b> - Escolha para editar uma entrada existente."
};
var QoSRuleCfgHelpRpm =
{
	"header": "Ajuda com Configurações de Regras de Controle de Banda",
	"brief": "Esta página configura  as regras de controle de banda.",
	"status": "<b>Status</b> Habilitar ou desabilitar as regras.",
	"ip_rang": "<b>Classe de IP</b> - Classe de endereço IP interno. Se os dois estiverem em branco (ou 0.0.0.0), o domínio não terá efeito.",
	"port_rang": "<b>Classe de Porta</b> - A classe de porta pela qual o PC interior acessa o PC externo. Se eles estiver em branco (ou 0), o domínio não terá efeito.",
	"priority": "<b>Prioridade</b> - Regra de Prioridade para o Controle de Banda. 1 significa a mais alta e 8 é a prioridade mínima. Casa haja alguma largura de banda restante, essa será prontamente atribuída para a primeira prioridade conforme a regra, caso para essa não haja necessidade, a prioridade vai para a seguinte da lista, e assim por diante.",
	"egress_band": "<b>Velocidade de Saída</b> - O valor máximo e o mínimo de velocidade de banda através da porta WAN para uploads.",
	"ingress_band": "<b>Velocidade de Entrada</b> - O valor máximo e o mínimo de velocidade de banda através da porta WAN para downloads.loads.",
	proto: "<b>Protocolo(s) </b> Escolha um protocolo da camada de transporte - Todos, TCP ou UDP."
};
var QoSRuleListHelpRpm =
{
	"header": "Ajuda com Configurações de Regras de Controle de Banda",
	"brief": "Esta página configura  as regras de controle de banda.",
	"id": "<b>ID</b> - a sequência da entrada.",
	"description": "<b>Descrição</b> - a informação da descrição inclui classe de endereço, de porta e protocolo de camada de transporte.",
	"egress_band": "<B>Velocidade de Saída</B> - velocidade máxima de upload através d aporta WAN, o valor padrão é 0.",
	"ingress_band": "<B>Velocidade de Entrada</B> - velocidade máxima de download através d aporta WAN, o valor padrão é 0..",
	"status": "<b>Status</b> - Status da regra, mostra se a regra está surtindo efeito.",
	"modify": "<b>Modificar</b> - escolha para modificar uma entrada existente."
};
var RestoreDefaultCfgHelpRpm =
{
	"header": "Ajuda com Restaurar Padrões de Fábrica",
	"brief": "Clique no botão Restaurar para restabelecer todas as configurações de fábrica do roteador. Esta opção torna-se útil quando as configurações realizadas estão em desacordo com os requerimentos mínimos para o bom funcionamento do sistema.",
	"admin": "Nome de Usuário Padrão",
	"admin_0": "Senha Padrão",
	"s_0": "Endereço Padrão",
	"s_1": "Máscara de Sub-rede Padrão",
	"note": "<B>Nota: Todas as configurações serão perdidas quando o padrão for restaurado.</B>"
};

var SiteSurveyHelpRpm =
{
	"header": "Ajuda com Pesquisa WLAN",
	"brief": "<B>Nota</B>:a informação sobre os APs que você pode conectar é mostrada nesta página. Siga desta maneira:",
	"s_0": "Primeiro, escolha a rede que deseja se conectar.",
	"s_1": "Depois, clique em \"Conectar\"no fim desta linha.",
	"s_2": "Agora, o SSID da rede alvo está preenchida corretamente na página de configuração WLAN de forma automática.",
	"note": "<B>Nota</B>: clique no botão <B>Atualizar</B> para obter novas informações da lista AP.",
	"back": "Clique no botão <B>Voltar</B> para retornar à pagina de configuração WLAN."
};
var SoftwareUpgradeHelpRpm =
{
	"header": "Ajuda com Firmware",
	"brief": "Para atualizar o firmware deste dispositivo, siga estas instruções:",
	"s_0": "Faça o download do arquivo para atualização de firmware mais recente no site ",
	"file_name": "Insira ou selecione o caminho para onde você baixou o arquivo no computador em <b>Nome do Arquivo</b>.",
	"upgrade": "Clique no botão <B>Atualizar</B>.",
	"s_1": "Este dispositivo irá reiniciar quando a atualização for finalizada.",
	"firm_version": "<b>Versão Atual de Firmware</b> - Exibe a versão atual do software do sistema.",
	"hard_version": "<b>Versão de Hardware</b> - Exibe a versão atual do hardware. Esta informação é importante para verificar qual versão de firmware copiar do site, visto que há diferentes arquivos disponíveis para download.",
	"note": "<B>Aviso: </b> A versão de firmware deve corresponder ao hardware. O processo de atualização leva alguns minutos e este dispositivo reinicia automaticamente quando a atualização é completa. É importante manter o dispositivo ligado durante o processo todo. Perda de energia durante a atualização pode danificar o dispositivo."
};
var SpecialAppHelpRpm =
{
	"header": "Ajuda com Porta de Disparo",
	"brief": "Algumas tarefas demandam conexões múltiplas como jogos online, vídeo conferência e etc. A porta de disparo é usada por algumas destas tarefas que não podem trabalhar simplesmente com a função NAT do roteador.",
	"configured": "<B>Uma vez configurado, a operação segue da seguinte forma</B>:",
	"trig_port": "Um host local  faz uma conexão de saída para um host externo usando um número de porta de destino definido no campo <B>Porta de Disparo</B>.",
	"port_trig": "O roteador registra esta conexão, abre a porta de entrada ou portas associadas à essa entrada na tabela <B>Porta de Disparo</B> e as associa com o host local.",
	"open_port": "Quando necessário, o host externo poderá conectar-se ao host local usando uma das portas definidas no campo <B>Porta de Entrada</B>.",
	"rules": "<B>Regras</B>:",
	"trig_port_0": "<B>Porta de Disparo</B> - A porta para tráfego externo. Uma conexão externa usando esta porta, irá disparar esta regra.",
	"trigger_prot": "<B>Protocolo de Disparo</B> - O protocolo usado para portas de disparo, podendo ser <B>TCP, </B><B>UDP</B> ou <B>Todos</B> (todos os protocoloas compatíveis com o roteador).",
	"open_port_0": "<B>Porta de Entrada</B> - A porta utilizada pelo sistema remoto quando esta responde ao pedido externo. Uma resposta utilizando uma destas portas será encaminhada ao PC que dispara esta regra. Você pode inserir no máximo 5 grupos de portas (ou seções de portas). Cada grupo deve ser separado por vírgulas, exemplo: 2000-2038, 2046, 2050-2051, 2085, 3010-3030. as portas serão encaminhadas para o PC que disparou esta regra. Você pode inserir no máximo 5 grupos (ou seções de portas). Todo grupo de portas deve ser separados por \",\", por exemplo 2000-2038, 2046, 2050-2051, 2085, 3010-3030.",
	"open_prot": "<B>Protocolo de Entrada</B> - o protocolo utilizado pela porta de entrada, podendo ser <B>TCP, </B><B>UDP</B> ou <B>Todos </B>(todos protocolos compatíveis com o roteador).",
	"status": "<B>Status</B> - O status desta entrada, habilitado significa que a porta de disparo está habilitada.",
	"edit": "<b>Editar</b> - Para editar uma entrada existente.",
	"following": "<B>Para adicionar uma nova regra siga os passos na tela da Porta de Disparo</B>:",
	"add_new": "Clique no botão <B>Adicionar Novo</B>.",
	"s_0": "Insira o número de porta utilizado para enviar um pedido externo à Porta de Disparo no campo <b>Porta de Disparo<b/>",
	"trig_port_1": "Selecione o protocolo utilizado para a <B>Porta de Disparo</B> na lista abaixo, podendo ser <B>TCP</B>, <B>UDP</B> ou <B>Todos</B>.",
	"s_1": "Insira a faixa de IP das portas usadas pelo sistema remoto quando este responde à solicitação do PC na Porta de Entrada.",
	"open_port_1": "Selecione o protocolo usado para a faixa de <B>Porta de Entrada</B> na lista abaixo, podendo ser <B>TCP</B>, <B>UDP</B> ou <B>Todos</B>.",
	"enabled": "Selecione a opção <B>Habilitado</B> em <B>Status</B> na lista que aparecerá abaixo.",
	"save": "Clique no botão <B>Salvar</B> para manter a nova regra.",
	"service": "Existem várias tarefas populares listadas em <B>Porta de Serviço Comum</B>. Você pode selecionar uma tarefa e então os campos da Porta de Disparo e Porta de Entrada serão automaticamente preenchidas. Esta operação possui o mesmo efeito que adicionar uma nova regra.",
	"enable_sele": "Clique em <B>Habilitar Selecionado</B> para habilitar as entradas selecionadas.",
	"disable_sele": "Clique em <B>Desabilitar Selecionado</B> para desabilitar as entradas selecionadas.",
	"delete_sele": "Clique em <B>Apagar Selecionado</B> para apagar as entradas selecionadas.",
	"note": "<B>Nota:</B>",
	"s_2": "Quando a conexão de disparo é liberada, as portas de entrada correspondentes são fechadas.",
	"s_3": "Cada regra pode ser usada somente por um host na LAN por vez. A conexão de disparo de outros hosts na LAN serão recusados.",
	"open_port_2": "<B>Porta de Entrada</B> as faixas não podem se sobrepor umas sobre as outras."
};
var StaticRouteTableHelpRpm =
{
	"header": "Ajuda sobre Roteamento - Rotas Estáticas",
	"brief": "Uma rota estática é um caminho manualmente determinado nas configurações do roteador para que o mesmo possa se comunicar com uma rede IP diferente da que está determinada em sua interface de rede local. Esta função pode ser útil caso outros roteadores estejam conectados na rede local deste roteador.",
	"routing": "<B>Para adicionar entradas de rotas estáticas, siga os procedimentos abaixo:</B>:",
	"add_new": "Clique no botão <B>Adicionar Novo</B>.",
	"s_0": "Na página de configuração de rotas, preencha os seguintes campos:",
	"enabled": "Selecione <B>Habilitado</B> em <B>Status</B> na lista que aparecerá abaixo.",
	"save": "Clique em <B>Salvar</B> para finalizar as configurações.</ol>",
	"existing": "<B>Para modificar ou deletar uma entrada existente</B>:",
	"s_1": "Encontre a entrada deseja na tabela.",
	"edit": "Clique em <B>Editar</B>.",
	"enable_sele": "Clique em <B>Habilitar Selecionado</B> para habilitar as entradas selecionadas.",
	"disable_sele": "Clique em <B>Desabilitar Selecionado</B> para desabilitar as entradas selecionadas.",
	"delete_sele": "Clique em <B>Apagar Selecionado</B> para apagar as entradas selecionadas.",
	dest: "<B>Endereço e IP de Destino</B> - O endereço IP de destino é o endereço da rede  ou host que você quer atribuir para a rota estática.",
	mask: "<B>Máscara de Sub-rede</B> - determina qual porcentagem de um endereço IP é a porcentagem da rede e qual parte é a do host.",
	gw: "<B>Gateway</B> - Este é o endereço IP do dispositivo gateway padrão que permite contato entre roteador e rede ou host.",
	intf: "<B>Interface</B> - É vazio por padrão. Por favor selecione uma conexão no menu/lista, se o Gateway permanecer vazio ou não estiver na mesma rede altere o padrão LAN/WAN."
};
var StatusHelpRpm =
{
	"header": "Ajuda com Status",
	"brief": "A página <B>Status</B> mostra o status e a configuração atual do roteador. Toda informação é somente leitura.  ",
	"lan": "<B>LAN</B> -  Os parâmetros a seguir aplicam-se à porta LAN do roteador. Você pode configurá-los na página <B>Rede-> LAN</B>.",
	"mac_addr": "<B>Endereço MAC</B> - O endereço físico do roteador, como visto da rede LAN.",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP da LAN do roteador.",
	"subn_mask": "<B>Máscara Sub-rede</B> - A máscara sub-rede vinculada ao endereço IP de LAN.",
	"wireless 2.4GHz/5GHz": "<B>Rede Wireless 2.4GHz/5GHz</B> - Estas são as definições ou informações atuais para Wireless. Você pode configurá-los em <B>Rede Wireless 2.4GHz/5GHz -&gt; Configurações básicas</B>.",
	"operation_mode": "<B>Modo de Operação</B> - Indica o modo em que o AP está operando.",	
	"wireless": "<B>Wireless</B> - Estes são as configurações ou informações atuais do wireless. Você pode configurá-las na página <B>Wireless -&gt; Configurações Básicas</B>",
	"wire_radio": "<B>Rádio Wireless</B> - Indica se o rádio Wi-Fi está ligado ou não.",
	"name_ssid": "<B>Nome(SSID)</B> - O nome SSID do roteador.",
	"mode": "<B>Modo</B> - O modo wireless atual em que o roteador opera.",
	"channel": "<B>Canal</B> - O canal wireless atual em uso.",
	"chan_width": "<B>Largura de Canal</B> - A largura de banda do canal wireless.",
	"mac_addr_0": "<B>Endereço MAC</B> - O endereço físico do roteador. como visto da rede WLAN. ",
	"wds_stat": "<B>Status WDS</B> - O status da conexão WDS é exibida.",
	"wan": "<B>WAN</B> -  Os parâmetros a seguir aplicam-se às portas WAN do roteador. Você pode configurá-los na página <b><B>Rede -> WAN</B></b>.",
	"mac_addr_1": "<B>Endereço MAC</B> - O endereço físico da porta WAN, como visto da Internet.",
	"ip_addr_0": "<B>Endereço IP</B> - O endereço IP da WAN (Internet) atual. Este campo ficará em branco ou 0.0.0.0 caso o endereço IP for atribuído dinamicamente e não haja conexão de Internet.",
	"subn_mask_0": "<B>Máscara Sub-rede</B> - A máscara sub-rede vinculada com o endereço IP da WAN.",
	"default_gate": "<B>Gateway Padrão</B> - O gateway atualmente utilizado pelo roteador é mostrado aqui.",
	"dns_serv": "<B>Servidor DNS</B> - O endereço de servidor IP DNS (Sistema de Nome de Domínio) atualmente utilizado pelo roteador. Múltiplos IPs DNS são comuns. Nomralmente, o primeiroservidor DNS disponível é utilizado.",
	"onli_time": "<B>Tempo Online</B> - O tempo total que você está online. Quando você utiliza <b>PPPoE</b> como tipo de conexão WAN, o tempo online é mostrado aqui.",
	"secondary_conn": "<B>Conexão Secundária</B> - A conexão secundária é mostrada neste campo.",
	"sent_byte": "<B>Pacotes Enviados</B> - Tráfego de bytes registrados que foram enviados da porta WAN.",
	"sent_pack": "<B>Pacotes Enviados</B> - Tráfego de pacotes registrados que foram enviados da porta WAN.",
	"rece_bytes": "<B>Bytes Recebidos</B> - Tráfego de bytes registrados que foram recebidos pela porta WAN.",
	"rece_packets": "<B>Pacotes Recebidos</B> - Tráfego de pacotes registrados que foram recebidos pela porta WAN.",
	"system": "<B>Tempo de Atividade do Sistema</B> - A quantidade de tempo desde que o roteador foi ligado pela última vez ou reiniciado.",
	"refresh": "Clique em <B>Atualizar</B> para obter ao último status e as configurações do roteador. "
};
var StatusHelpRpm_AP =
{
	"header": StatusHelpRpm.header,
	"brief": "A página de <B>Status</B> exibe o status do sistema e sua configuração. Toda informação é somente leitura.",
	"lan": "<B>LAN</B> - Os parâmetros a seguir aplicam-se à porta LAN do AP. Você pode configurá-las em <B>Rede -> LAN</B>",
	"mac_addr": "<B>Endereço MAC</B> - O endereço físico do AP, como vistas da LAN.",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP do AP.",
	"subn_mask": StatusHelpRpm.subn_mask,
	"operation_mode": StatusHelpRpm.operation_mode,	
	"wireless": StatusHelpRpm.wireless,
	"wire_radio": "<B>Rádio Wireless</B> - Indica se o recurso de rádio wireless do AP está ativado ou desativado.",
	"name_ssid_root": "<B>Nome(SSID) do Root AP</B> - O SSID do Root AP.",	
	"name_ssid": "<B>Nome(SSID)</B> - O SSID do AP.",
	"mode": "<B>Modo</B> - O modo wireless atual em que o AP opera.",
	"channel": StatusHelpRpm.channel,
	"chan_width": StatusHelpRpm.chan_width,
	"mac_addr_0": "<B>Endereço MAC</B> - O endereço físico do AP, como vistas da WLAN.",
	"wds_stat": StatusHelpRpm.wds_stat,	
	"system": "<B>Tempo de Sistema</B> - Período de tempo desde que o AP foi ligado ou reiniciado.",
	"refresh": "Clique em <B>Atualizar</B> para obter o  status e configurações do AP."
};
var SysRebootHelpRpm =
{
	"header": "Ajuda com Reiniciar Sistema",
	"brief": "Clique em <B>Reiniciar</B> para reiniciar este dispositivo.",
	"reboot_title": "<b>Reiniciar</b>",
	"reboot_brief": "Clique em <B>Reiniciar</B> para reiniciar este dispositivo.",
    "auto_reboot_title": "<b>Horário de Reinício</b>",
    "r_0": "Há duas opções:",
    "r_1": "Desabilitar: Desabilite a função de auto reiniciar.",
    "r_2": "Horário",
    "r_3": "Dia: Escolha Todos os dias, ou escolha dias específicos e selecione o dia certo (dias) para reiniciar o roteador.",
    "r_4": "Horário Especifique o horário no formato HHMM para auto reiniciar.",
	"s_0": "Algumas configurações deste dispositivo só terão efeito após a reinicialização, que incluem:",
	"s_1": "Alterar o endereço IP de LAN.",
	"s_2": "Atualize o firmware deste dispositivo (o sistema reiniciará automaticamente).",
	"s_3": "Restaurar as configurações deste dispositivo para os padrões de fábrica (o sistema irá reiniciar automaticamente).",
	"s_4": "Atualize a configuração com o arquivo."
};
var SysRouteTableHelpRpm =
{
	"header": "Ajuda com Tabela de Roteamento do Sistema",
	"brief": "A tabela de roteamento do sistema exibe todas as entradas das rotas válidas em uso. O destino do endereço IP, Máscara de Sub-rede, Gateway e Interface serão mostrados a cada entrada. Clique em <B>Atualizar</B> para atualizar os dados mostrados.",
	dest: "<B>Rede de Destino</B> - O endereço IP de destino é o endereço da rede  ou host que você quer atribuir para a rota estática.",
	mask: "<B>Máscara de Sub-rede</B> - determina qual porcentagem de um endereço IP é a porcentagem da rede e qual parte é a do host.",
	gw: "<B>Gateway</B> -  endereço IP do equipamento de gateway que permite o contato entre o roteador e a rede ou o computador de destino.",
	intf: "<B>Interface</B> - Esta interface mostra se o IP de destino está na <B>LAN ou WLAN</B>."
};
var SystemLogHelpRpm =
{
	"header": "Ajuda com Log de Sistema",
	"brief": "<B>Tipo de Log</B> - Selecionando um tipo de log, serão exibidos somente os logs do tipo selecionado.",
	"log_leve": "<B>Nível de Log</B> - Selecionando o nível de log, somente os logs deste nível serão mostrados.",
	"refresh": "<B>Atualizar</B> - Atualize a página para mostrar a última lista de logs.",
	"clea_log": "<B>Limpar Log</B> - Todos os logs serão apagados do dispositivo permanentemente, não somente da página.",
	"save_log": "<B>Salvar Log</B> - Clique em salvar todos os logs em arquivo txt.",
	"log_sett": "<B>Configurações de Log</B> -Clique para alterar os logs na tela.",
	"save_loca": "<B>Salvamento Local</B> - Caso o salvamento local seja selecionado, as informações serão guardadas em memória local.",
	"mini_level": "<B>Nível Mínimo</B> - Selecione o nível mínimo na lista abaixo, para exibir eventos menores ou iguais ao nível selecionado.",
	"save_remo": "<B>Salvamento Remoto</B> - Se o salvamento remoto é selecionado, as informações serão enviadas para um endereço IP designado e uma porta UDP do servidor do sistema de log remoto."
};
var SystemStatisticHelpRpm =
{
	"header": "Ajuda com Estatísticas",
	"brief": "Esta página exibe o tráfego da rede de cada PC conectado à LAN, incluindo o tráfego total e o valor do último <B>Intervalo de Estatística de Pacote</B>",
	"note": "<font color=\"#C11C66\">Nota: Se o hardware NAT estiver habilitado, as estatísticas NÃO terão efeito, porque estes dois módulos não podem funcionar ao mesmo tempo.</font></p>",
	"statistics": "<B>Status de Estatísticas Atual</B> - Habilitado ou desabilitado. O valor padrão está desabilitado. Para habilitá-lo, clique no botão <B>Habilitar</B>. Se está desabilitado, a função de proteção DoS nas configurações de segurança ficará desabilitada.",
	"statistics_0": "<B>Intervalo de Estatística de Pacote</B> - O valor padrão é 10. Selecione um valor entre 5 e 60 segundos na lista abaixo. O valor do intervalo de estatísticas de pacote indica o tempo do mesmo.",
	"sort_rules": "<B>Exibição de Regulamentos</B>- Escolha como serão exibidas as estatísticas.",
	"auto_refr": "Clique em <B>Atualizar Automaticamente</B> para obter atualizações automaticamente.",
	"refresh": "Clique no botão <B>Atualizar</B> para redefinir a página.",
	"rese_all": "Clique em <b>Reinicar Tudo</b> para redefinir todas as entradas a zero.",
	"dele_all": "Clique no botão <b>Apagar Tudo</b> para eliminar todas as entradas.",
	"stat_table": "Tabela de Estatísticas:",
	"address": "<B>Endereço IP/Endereço MAC</B> - O endereço IP e MAC são exibidos com suas respectivas estatísticas.",
	"total": "<B>Total.</B>",
	"current": "<B>Atual</B>",
	"operation": "<b>Operação</b>",
	t_packets: "<B>Pacotes</B> - O número total de pacotes recebidos e transmitidos pelo roteador.",
	t_bytes: "<B>Bytes</B> - Número total de bytes recebidos e transmitidos pelo roteador.",
	c_packets: "<B>Pacotes</B> - O número total de pacotes recebidos e transmitidos por segundo no intervalo de estatísticas de pacote.",
	c_bytes: "<B>Bytes</B> - O número total de bytes recebidos e transmitidos no último intervalo definido em segundos.",
	icmpTx: "<B>ICMP Tx</B> - O número de pacotes ICMP transmitidos para a WAN por segundo no intervalo de estatísticas de pacote especificado. É exibido como \"taxa de transmissão atual/taxa de transmissão máxima\".",
	udpTx: "<B>UDP Tx</B> - O número de pacotes UDP transmitidos para a internet, por segundo, no intervalo especificado. É exibido como \"taxa de transmissão atual/taxa de transmissão máxima\".",
	tcpTx: "<B>TCP SYN Tx</B> - O número de pacotes TCP SYN transmitidos para a internet, por segundo, no intervalo especificado. É exibido como \"taxa de transmissão atual/taxa de transmissão máxima\".",
	t_reset: "<b>Reinciar</b> - renova os valores de entrada a zero.",
	t_delete: "<b>Apagar</b> - Apaga a entrada existente."
};
var UpnpCfgHelpRpm =
{
	"header": "Ajuda com UPnP",
	"brief": "A função UPnP (Universal Plug and Play) permite que dispositivos conectem-se ao host local ou aparelhos conforme necessário. Dispositivos podem ser automaticamente descobertos pelo serviço UPnP na LAN.",
	"current": "<B>Status UPnP Atual</B> - A função UPnP pode ser habilitada ou desabilitada clicando em <B>Habilitar</B> ou <B>Desabilitar</B>. Esta função é habilitada por padrão.",
	"settings": "<B>Lista de Configurações UPnP Atuais</B>:",
	"s_0": "Esta tabela mostra a informação atual sobre UPnP.",
	"app_desc": "<B>Descrição App</B> - A descrição sobre a tarefa que inicia a requisição UPnP.",
	"exte_port": "<B>Porta Externa</B> - A porta cujo roteador abre a tarefa.",
	"protocol": "<B>Protocolo</B> - O tipo de protocolo que é aberto.",
	"inte_port": "<B>Porta Interna</B> - A porta cujo roteador abril para host local.",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP do host local que inicia a requisição UPnP.",
	"status": "<B>Status</B> - Podendo ser <B>Habilitado</B> ou <B>Desabilitado</B>.",
	"enable": "Clique em <B>Habilitar</B> para habilitar a função UPnP.",
	"disable": "Click em <B>Desabilitar</B> para desabilitar o UPnP.",
	"refresh": "Clique em <B>Atualizar</B> para atualizar a lista de configurações UPnP atuais."
};
var UsbAccountHelp =
{
	"header": "Ajuda com Contas de Usuários",
	"brief": "Nesta página você pode especificar o nome e a senha para os usuários de servidor FTP e compartilhamento de dados. Usuários de compartilhamento de dados poderão acessar pastas apenas inserindo o URL seguinte na barra de endereços do seu navegador:  \\\\192.168.0.1. - usuários de servidores FTP podem logar-se via Cliente FTP. Existem cinco usuários que proporcionam meios de controle para acessar o dispositivo de compartilhamento USB ou compartilhamento FTP. O Usuário Administrador tem acesso completo ao armazenamento e o servidor FTP.",
	"s_0": "Para adicionar uma nova conta de usuário, favor seguir os passos abaixo:",
	"choo_index": "1. Escolha o índice da lista <B>Escolher Índice</B>.",
	"new_user": "2. Defina um <B>Novo Nome de Usuário</B>.",
	"new_pass": "3. Insira uma senha no campo <B>Nova Senha</B>.",
	"password": "4. Insira novamente a senha no campo <B>Confirmar Senha</B>.",
	"set": "5. Clique no botão <B>Configurar</B>, e então uma nova entrada será adicionada à tabela.",
	"delete": "Para deletaruma conta de usuário existente, favor clicar em <B>Apagar</B> na coluna <B>Coluna</B>."
};
var UsbDlnaHelp =
{
	"header": "Ajuda com Servidor de Mídia",
	"brief": "Nesta página você poderá criar servidores de mídia que lhe permitem compartilhar conteúdo armazenado com outros computadores e dispositivos em sua rede residencial e na Internet.",
	"server_enab": "<B>Habilitar Servidor</B> Marque esta opção para habilitar esta função.",
	"serv_name": "<B>Nome do Servidor</B> O nome do servidor de mídia.",
	"s_0": "Para adicionar uma nova pasta de compartilhamento ao seu servidor de mídia, favor seguir as instruções abaixo.",
	"folder": "a) Clique no botão <B>Adicionar Nova Pasta</B> e você visualizará a tela.",
	"shar_name": "b) Insira o nome da pasta de compartilhamento em <B>Nome de Compartilhamento</B>.",
	"apply": "c) Clique em <B>Aplicar</B> para fixar as configurações.",
	"scan_now": "d) Clique em <B>Buscar Agora</B> para fazer a busca em todas as pastas de compartilhamento imediatamente. Você também pode selecionar <B>Busca Automática</B> e, ao mesmo tempo, selecionar um intervalo de tempo de busca automática na lista abaixo. Neste caso, o servidor de mídia irá buscar nas pastas automaticamente."
};
var UsbFtpHelp =
{
	"header": "Ajuda com Servidor FTP USB",
	"brief": "Você pode criar um servidor FTP que pode ser acessado da Internet da sua rede local.",
	"server_stat": "<B>Status do Servidor</B> Indica a situação atual do Servidor FTP.",
	"inte_access": "<B>Acesso à Internet</B> Se o acesso estiver habilitado, usuários em redes públicas podem acessar o servidor FTP via <B>Endereço de Internet</B>.",
	"inte_address": "<B>Endereço de Internet</B> se o <B>Acesso à Internet</B> estiver habilitado, o IP WAN será mostrado aqui.",
	"serv_port": "<B>Porta de Serviço</B>Insira o número da porta FTP para utilizar. O número padrão é 21.",
	"shar_name": "<B>Nome de Compartilhamento</B> O nome mostrado da pasta.",
	"directory": "<B>Diretório</B> O caminho para a pasta especificada.",
	"user_inde": "<B>Índice de Usuário</B> A autorização do usuário é mostrada.",
	"status": "<B>Status</B> O status habilitado ou desabilitado da entrada.",
	"edit": "<B>Editar</B> Clique em <B>Editar</B> na tabela, e então você poderá modificar a entrada.",
	"s_0": "Para adicionar uma nova pasta, siga as instruções abaixo.",
	"folder": "1.  Clique em <B>Adicionar Nova Pasta</B>",
	"browse": "2. Clique em <B>Procurar</B> e selecione através do botão <B>Selecionar Volume</B> da lista abaixo.",
	"shar_name_0": "3. Insira o nome da pasta a ser mostrada em <B>Nome de Compartilhamento</B>.",
	"apply": "4. Clique no botão <B>Aplicar</B> para aplicar as configurações.",
	"upper": "Você pode clicar no botão superior para acessar a <B>Pasta Superior</B>, clique no botão <B>Habilitar/Desabilitar Selecionado</B> para habilitar ou desabilitar as entradas ou clique em <B>Apagar Selecionado</B> para removê-las.",
	"s_1": "Você poderá acessar as pastas inserindo o URL seguinte no Windows Explorer ou outro programa FTP:",
	"s_2": "ftp://(<span class=\"T T_ipaddr\">Endereço IP</span>)</span>",
	"s_3": "exemplo: ftp://192.168.0.1",
	"s_4": "O servidor FTP reiniciará e todas as conexões FTP atuais serão encerradas antes que você clique no botão <b>Aplicar</b>.",
	"note": "<B>Nota:</B>",
	"s_5": "1. O número máximo de pastas de compartilhamento é 10, depois desse número é necessário apagar uma pasta existente para adicionar uma nova.",
	"s_6": "2. Caso queira alterar as configurações de compartilhamento de dados, você pode clicar no botão <B>Aplicar</B> para que os ajustes tenham efeito."
};
var UsbMassHelp =
{
	"header": "Ajuda com USB de Armazenamento em Massa",
	"brief": "Nesta página você poderá configurar um drive USB atrelado ao roteador e visualizar o volume e propriedades de compartilhamento, como nome, capacidade, status e função habilitar e desabilitar.",
	"volume": "<B>Volume</B> O nome do volume do dispositivo USB que os usuários têm acesso.",
	"file_syst": "<B>Sistema de Arquivo</B> O sistema do drive USB.",
	"capacity": "<B>Capacidade</B> A capacidade de armazenamento do drive USB.",
	"status": "<B>Status</B> Indica o status do volume compartilhado ou não compartilhado. <B>Online</B> significa que o volume pode ser compartilhado, enquanto <B>Offline</B> não. Se o campo <B>Função Habilitar/Desabilitar</B> estiver marcado como \"Inativo\", ",
	"action": "<B>Função Habilitar/Desabilitar</B> quando o volume é compartilhado, você pode clicar em <B>Desativar</B> para parar o volume de compartilhamento, quando não for compartilhado, o botão <B>Habilitar</B> serve para compartilhar o volume. ",
	"note": "<B>Nota:</B> Antes de remover o dispositivo USB de Armazenamento, você deve clicar em <B>Desconectar</B> para certificar que toda informação foi salva completamente. Remover o dispositivo diretamente pode causar grandes danos no seu dispositivo USB.",
	"note_0": "<B>Nota</B>:",
	"s_0": "1. Clique no botão <B>Atualizar</B> para detectar seu dispositivo USB. O roteador irá ativar os dois primeiros dois dispositivos USB de Armazenamento até oito volumes.",
	"deactivate": "2. Se quiser utilizar outros volumes em seu(s) dispositivo(s) de armazenamento, favor  <B>desativar</B> alguns volumes não utilizados e  <B>ative</B> os volumes desejados.",
	"disconnect": "3. Clique em <B>Desconectar</B> antes de desplugar seu dispositivo USB para evitar a perda de informação o dano do dispositivo.",
	"supported": "<B>USB de Armazenamento em Massa:</B> disco rígido, pendrive ou leitor de cartãp;",
	"supported_0": "<B>Tipo de Arquivo Supoertado</B> FAT32 e NTFS;",
	"supp_volumes": "<B>Volumes Suportados: </B> Apenas dois dispositivos de armzenamento USB com até 8 volumes podem ser ativados simultâneamente, com até 4 dispositivos de armzenamento USB com aproximadamente 18 volumes podem ser reconhecidos"
};
var UsbSharingHelp =
{
	"header": "Ajuda com Compartilhamento de Dados USB",
	"brief": "Nesta página você poderá configurar um drive USB atrelado ao roteador e ver suas propriedades de volume e compartilhamento.",
	"server_stat": "<B>Status do Servidor</B> Indica o status atual do compartilhamento de dados.",
	"anonymous": "<B>Acesso anônimo para todos os volumes</B> Esta função é habilitada por padrão, portanto, os usuários podem acessar todos os volumes ativados do compartilhamento de dados sem contas. Se quiser adicionar uma pasta que não permite login, desabilite esta função e a <B>Tabela de Pastas</B> será mostrada abaixo.",
	"shar_name": "<B>Nome de Compartilhamento</B> O nome mostrado da pasta.",
	"directory": "<B>Diretório</B> O caminho para a pasta especificada.",
	"user_acce": "<B>Acesso do Usuário</B> A autorização do usuário é mostrada. Usuário Administrador é o usuário com privilégios completos de acesso e alteração de todos os volumes e pastas de compartilhamento. Usuário Intermediário são aqueles que podem ler os arquivos somente. Já o usuário comum tem acesso restrito à essas pastas.",
	"status": "<B>Status</B> O status habilitado ou desabilitado da entrada.",
	"edit": "<B>Editar</B> Clique em <B>Editar</B> na tabela, e então você poderá modificar a entrada.",
	"s_0": "Para adicionar uma nova pasta, siga as instruções abaixo.",
	"folder": "1.  Clique em <B>Adicionar Nova Pasta</B>",
	"browse": "2. Clique em <B>Procurar</B> e selecione através do botão <B>Selecionar Volume</B> da lista abaixo.",
	"shar_name_0": "3. Insira o nome da pasta a ser mostrada em <B>Nome de Compartilhamento</B>.",
	"apply": "4. Clique no botão <B>Aplicar</B> para aplicar as configurações.",
	"upper": "Você pode clicar no botão superior para acessar a <B>Pasta Superior</B>, clique no botão <B>Habilitar/Desabilitar Selecionado</B> para habilitar ou desabilitar as entradas ou clique em <B>Apagar Selecionado</B> para removê-las.",
	"note": "<B>Nota:</B>",
	"s_1": "1. O número máximo de pastas de compartilhamento é 10, depois desse número é necessário apagar uma pasta existente para adicionar uma nova.",
	"s_2": "2. Caso queira alterar as configurações de compartilhamento de dados, você pode clicar no botão <B>Aplicar</B> para que os ajustes tenham efeito.",
	"s_3": "3. A função de compartilhamento de dados é baseada no protocolo NetBIOS/SMB em que a maioria dos sistemas operacionais são compatíveis para tal desempenho.",
	"s_4": "4. Anônimo: todos os volumes ativos serão compartilhados e a autenticação não é necessária.",
	"s_5": "5. Você poderá acessar as pastas com os seguintes métodos:",
	"windows": "<B>Para Windows:</B> Abra a janela \"Iniciar\" no menu inicial  e digite  \\\\(Endereço IP) ou \\\\(Endereço IP)\\(Nome de Compartilhamento) <br /> exemplo \\\\192.168.0.1\\photo; ",
	"for": "<B>Para MAC OS:</B>Abrir a janela \"Conectar ao Servidor\" no menu <B>Ir</B> e inserir smb://(Endereço IP) ou smb://(Endereço IP)/(Nome de Compartilhamento) <br /> exemplo smb://192.168.0.1/photo.</span> "
};
var Usb3gHelpRpm=
{
	"header": "Configurações 3G/4G",
	"backup": "<B>Enable 3G as a backup solution for Internet access</B> - Select the checkbox to enable 3G/4G as the backup solution for Internet access.",
	"modem": "<B>3G/4G USB Modem</B> - Displays whether or not a 3G/4G USB modem is plugged into the router.",
	"pinStatus": "<B>Status do PIN</B> - Exibe o status do PIN do cartão SIM, incluindo Não é possível desbloquear o cartão SIM, Pronto, SIM bloqueado, PIN bloqueado e Erro desconhecido.",
	"local": "<B>Localização</B> - Exibe a localização do cartão SIM.",
	"misp": "<B>Mobile ISP</B> - Displays the ISP (Internet Service Provider) of the 3G or 4G network. You can select your mobile ISP after you enable 3G/4G as the backup solution for Internet access.",
	"setaup": "<B>Definir Número de Discagem, APN, Nome de Usuário e Senha manualmente</B> - Selecione para definir manualmente o Número de Discagem, APN, Nome de Usuário e a Senha.",
	"number": "<B>Número de Discagem/APN/Nome de Usuário/Senha</B> - Insira o Número de Discagem, APN, Nome de Usuário e Senha fornecidos pelo seu provedor.",
	"auth": "<B>Tipo de Autenticação</B> - Selecione um tipo de autenticação da lista flutuante. O método padrão é AUTO_AUTH. Alguns provedores requerem uma autenticação específica, favor confirmar junto ao seu provedor ou mantenha as configurações atuais.",
	"mtu": "<B>MTU Size (in bytes)</B> - The typical MTU (Maximum Transmission Unit) size for 3G or 4G network is 1480 Bytes.",
	"echo": "<B>Intervalo de Solicitação Echo</B> - Insira um valor de intervalo entre 0 e 120 (em segundos) pelo qual o roteador solicita o Concentrador de Acesso ao echo a cada intervalo. O valor padrão é de 30. 0 significa nenhuma detecção.",
	"fip": "<B>Utilizar o Endereço IP Seguinte</B> - Selecione esta opção e insira o endereço IP fornecido pelo seu provedor.</li>",
	"fdns": "<B>Use The Following DNS Servers</B> - Select this checkbox and enter the DNS server address(es) in dotted decimal notation provided by your ISP. This 3G/4G connection will only use the specified DNS server(s).",
	"modemSet": "<B>Modem Settings</B> - Click to configure the advanced settings of the 3G/4G USB modem by uploading the downloaded .bin file(s)."
};
var Usb3gModemListHelpRpm=
{
	"header": "Configurações 3G/4G",
	"brief": "In this page you can configure a USB 3G/4G modem settings.",
	"vendor": "<B>Vendor</B> - Displays the vendor of the connected USB modem.",
	"model": "<B>Model</B> - Displays the model of the connected USB modem.",
	"delete": "<B>Apagar</B> - Exibe as opções a fim de apagar o arquivo .bin correspondente."
};
var VirtualServerHelpRpm =
{
	"header": "Ajuda com Servidor Virtual.",
	"brief": "O servidor virtual pode ser usado para configuração de serviços públicos na sua rede LAN. Um servidor virtual é definido como uma porta de serviço, e todas as solicitações da Internet para esta porta serão redirecionadas ao computador especificado pelo servidor IP. Qualquer PC que for usado por um servidor virtual deve ter um IP estático ou reservado porque seu endereço IP deve se alterar quando estiver usando a função DHCP.  ",
	"serv_port": "<B>Porta de Serviço</B> - Os números da Porta de Serviço Externa. (o formato é  XXX - YYY, XXX é a porta inicial, YYY é a porta final).",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP do PC utilizando o serviço.",
	"inte_port": "<B>Porta Interna</B> - O número da porta de serviço externa do PC utilizando o serviço. <B>Porta Interna</B>  é o mesmo que <B>Porta de Serviço</B>, ou insira um número de porta específico quando a <B>Porta de Serviço</B> for única.",
	"protocol": "<B>Protocolo</B> - O protocolo utilizado para esta tarefa é tanto <B>TCP, </B><B>UDP</B>, como <B>Todos</B> (todos os protocolos compatíveis com o roteador).",
	"status": "<B>Status</B> - O status desta entrada, \"Habilitado\" significa que a entrada do servidor virtual está habilitada.",
	"edit": "<b>Editar</b> - Para editar uma entrada existente.",
	"virtual": "<B>Para configurar uma entrada de servidor virtual</B>:",
	"add_new": "Clique no botão <B>Adicionar Novo</B>.",
	"service": "Selecione o serviço que quiser  <B>Porta de Serviço Comum</B>. Se o menu <B>Porta de Serviço Comum</B> não listar o serviço que deseja, insira o número da porta de serviço em <B>Porta de Serviço</B>.",
	"ip_addr_0": "Insira o endereço IP do computador que utiliza o serviço em <B>Endereço IP</B> .",
	"tcp": "Selecione o protocolo usado para esta tarefa na lista que aparecerá abaixo, podendo ser <B>TCP, </B><B>UDP</B> ou <B>Todos</B>.",
	"enabled": "Selecione a opção <B>Habilitado</B> em <B>Status</B> na lista que aparecerá abaixo.",
	"save": "Clique no botão <B>Salvar</B>.",
	"note": "<B>Nota</B>:É possível que você tenha um computador ou servidor com mais de um tipo de serviço disponível. Caso tenha, selecione outro serviço e digite o mesmo enderçeo IP para este computador ou servidor.",
	"enable_sele": "Clique em <B>Habilitar Selecionado</B> para habilitar as entradas marcadas.",
	"disable_sele": "Clique em  <B>Desabilitar Selecionado</B> para desabilitar as entradas marcadas.",
	"delete_sele": "Clique em <B>Apagar Selecionado</B> para apagar as entradas selecionadas."
};
var Wan6to4TunnelCfgHelpRpm =
{
	"header": "Ajuda com WAN IPv6",
	"brief": "<B>Tipo de Conexão WAN:</B>",
	"s_0": "Escolha o tipo de conexão WAN correta de acordo com a tipologia do seu provedor.",
	"dhcpv": "<B>DHCPv6</B> - Conexões que utilizam atribuição de endereço IPv6 dinâmico.",
	"stat_ipv": "<B>IPv6 Estático</B> - Conexões que utilizam atribuição de endereço IPv6 estático.",
	"pppoev": "<B>PPPoEv6</B> - Conexões que utilizam PPPoEv6nque requerem um nome de usuário e senha.",
	"tunn_6to": "<B>Túnel 6 para 4</B> - Conexões que utilizam atribuições de endereço 6 para 4.",
	"s_1": "Este tipo é usado na situação em que sua conexão WAN utiliza IPv4 enquanto sua conexão LAN utiliza IPv6.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var WanDynamicIpCfgHelpRpm =
{
	"header": "Ajuda com Wan",
	"brief": "<B>Tipo de Conexão WAN:</B>",
	"dyna_ip": "Se o seu provedor estiver utilizando um servidor DHCP selecione a opção <B>IP Dinâmico</B>.",
	"stat_ip": "Se o seu provedor disponibiliza configurações de endereço IP fixo ou estático, máscara sub-rede, gateway e DNS selecione a opção <B>IP estático</B>.",
	"pppoe": "Se fornecer conexão PPPoE, selecione <B>PPPoE</B>.",
	"bigp_cable": "Caso seu provedor forneça cabo BigPond (ou sinal HeartBeat) selecione <B>BigPond Cable</B>.",
	"l2tp": "Para conexão L2TP, utilize a opção <B>L2TP</B>.",
	"pptp": "Para conexão PPTP, selecione <B>PPTP</B>.",
	"detect": "Caso tenha dúvida sobre a conexão apropriada, clique no botão <B>Detectar</B> para permitir que o roteador procure automaticamente na sua conexão de Internet por servidores e protocolos. O tipo de conexão será reportada assim que um serviço de Internet ativo seja detectado. Essa reportagem é somente uma referência, para ter certeza do tipo de conexão que seu provedor fornece, entre em contato com o mesmo. Os diferentes tipos que seu roteador pode detectar são:",
	"pppoe_0": "<B>PPPoE</B> - Conexões que utilizam PPPoE que requerem nome e senha de usuário.",
	"dyna_ip_0": "<B>IP Dinâmico</B> - Conexões que utilizam endereço de IP Dinâmico.",
	"stat_ip_0": "<B>IP Estático</B> - Conexões que utilizam endereço de IP Estático.",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP atribuído pelo seu provedor dinamicamente.",
	"subn_mask": "<B>Máscara de Sub-rede</B> - A máscara sub-rede atribuída pelo seu ISP dinamicamente.",
	"default_gate": "<B>Gateway Padrão</B> - O gateway padrão atribuído dinamicamente pelo seu provedor.",
	"renew": "Clique em <B>Renovar</B> para renovar os parâmetros do seu provedor.",
	"release": "Clique em <B>Liberar</B> para liberar os parâmetros de IP do ISP.",
	"bytes": "<B>Tamanho MTU(em bytes)</B> - O valor MTU (Unidade de Transmissão Máxima) para a maioria das redes Ethernet é de 1500 Bytes. Dependendo do seu provedor você precisa modificar esse valor, embora seja rara essa necessidade. Portanto, evite modificá-lo a menos que seja necessário.",
	"manually": "Se o provedor oferece um ou dois endereços IP DNS, selecione <B>Configurar servidor DNS manualmente</B> e insira o <B>Servidor DNS</B> e <B>Servidor DNS Secundário</B> no campo correto. Caso contrário, os servidores DNS serão atribuídos pelo servidor dinamicamente.",
	"prim_dns": "<B>DNS Primário</B> - Entre com o endereço IP do DNS em notação decimal com separador de pontos fornecido pelo seu provedor de Internet.",
	"seco_dns": "<B>DNS Secundário</B> - Insira outro endereço IP DNS na linha pontilhada fornecido pelo seu provedor.",
	"note": "<B>Nota:</B> Caso obtenha um erro de endereço não encontrado quando tentar acessar um website, provavelmente seus servidores DNS não estão configurados corretamente. Você deve contatar seu provedor para obter endereços de servidores DNS.",
	"host_name": "<B>Nome Host</B> - Especifica o nome do host do roteador.",
	"unicast": "<B>Obter IP via Unicast</B> - Alguns servidores DHCP não suportam aplicações broadcast. Se não conseguir obter endereço IP normalmente, você pode escolher Unicast. (Você normalmente não precisa escolher esta opção)",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var WanDynamicIpV6CfgHelpRpm =
{
	"header": "Ajuda com WAN IPv6",
	"brief": "<B>Tipo de Conexão:</B>",
	"s_0": "Escolha o tipo de conexão WAN correta de acordo com a tipologia do seu provedor.",
	"dyna_ipv": "<B>IPv6 Dinâmico</B> - Conexões  que utilizam atribuição de endereço IPv6.",
	"stat_ipv": "<B>IPv6 Estático</B> - Conexões que utilizam atribuição de endereço IPv6 estático.",
	"pppoev": "<B>PPPoEv6</B> - Conexões que utilizam PPPoEv6nque requerem um nome de usuário e senha.",
	"tunn_6to": "<B>Túnel 6 para 4</B> - Conexões que utilizam atribuições de endereço 6 para 4.",
	"ipv6_addr": "<B>Endereço IPv6</B> - O endereço IPv6 atribuído pelo seu provedor ISP dinamicamente.",
	"advance": "Se o seu provedor fornece dois endereços DNS IPv6 clique em <b>Avançado</b> e selecione <B>Configurar Servidor DNS Manualmente</B> e insira <B>DNS IPv6 Primário</B> e <B>DNS IPv6 Secundário</B> nos campos corretos. Caso contrário, os servidores DNS serão atribuídos dinamicamente.",
	"primary": "<B>DNS IPv6 Primário</B> - Insira o endereço DNS IPv6 no espaço separado por \":\" com dígitos hexadecimais fornecido pelo seu provedor.",
	"secondary": "<B>DNS IPv6 Secundário</B> - Insira outro endereço DNS IPv6 no espaço separado por \":\" com dígitos hexadecimais fornecido pelo seu provedor.",
	"note": "<B>Nota:</B> Caso obtenha um erro de endereço não encontrado quando tentar acessar um website, provavelmente seus servidores DNS não estão configurados corretamente. Você deve contatar seu provedor para obter endereços de servidores DNS."
};
var WanStaticIpCfgHelpRpm =
{
	"header": "Ajuda com Wan",
	"brief": "<B>Tipo de Conexão WAN:</B>",
	"dyna_ip": "Se o seu provedor estiver utilizando um servidor DHCP selecione a opção <B>IP Dinâmico</B>.",
	"stat_ip": "Se o seu provedor disponibiliza configurações de endereço IP fixo ou estático, máscara sub-rede, gateway e DNS selecione a opção <B>IP estático</B>.",
	"russia": "Se fornecer conexão PPPoE, selecione <B>PPPoE</B>.",
	"bigp_cable": "Caso seu provedor forneça cabo BigPond (ou sinal HeartBeat) selecione <B>BigPond Cable</B>.",
	"russia_0": "Para conexão L2TP, utilize a opção <B>L2TP</B>.",
	"russia_1": "Para conexão PPTP, selecione <B>PPTP/Russian PPTP</B>.",
	"detect": "Caso tenha dúvida sobre a conexão apropriada, clique no botão <B>Detectar</B> para permitir que o roteador procure automaticamente na sua conexão de Internet por servidores e protocolos. O tipo de conexão será reportada assim que um serviço de Internet ativo seja detectado. Essa reportagem é somente uma referência, para ter certeza do tipo de conexão que seu provedor fornece, entre em contato com o mesmo. Os diferentes tipos que seu roteador pode detectar são:",
	"russia_2": "<B>PPPoE/Russian PPPoE</B> - Conexões que utilizam PPPoE que requerem nome e senha de usuário.",
	"dyna_ip_0": "<B>IP Dinâmico</B> - Conexões que utilizam endereço de IP Dinâmico.",
	"stat_ip_0": "<B>IP Estático</B> - Conexões que utilizam endereço de IP Estático.",
	"ip_addr": "<B>Endereço IP</B> - O endereço IP atribuído pelo seu provedor dinamicamente.",
	"subn_mask": "<B>Máscara de Sub-rede</B> - A máscara sub-rede atribuída pelo seu ISP dinamicamente.",
	"default_gate": "<B>Gateway Padrão</B> - O gateway padrão atribuído dinamicamente pelo seu provedor.",
	"mtu_size": "<B>Tamanho MTU</B> - O valor MTU (Maximum Transmission Unit - Unidade Máxima de Transmissão) para maioria das redes Ethernet é de 1500 Bytes. Para alguns provedores, você deve modificar esse valor, embora isso seja raramente solicitado. Não altere caso não seja necessário.",
	"prim_dns": "<B>DNS Primário</B> - Entre com o endereço IP do DNS em notação decimal com separador de pontos fornecido pelo seu provedor de Internet.",
	"seco_dns": "<B>DNS Secundário</B> - Insira outro endereço IP DNS na linha pontilhada fornecido pelo seu provedor.",
	"save": "Clique em <B>Salvar</B> para guardar as alterações."
};
var WanStaticIpV6CfgHelpRpm =
{
	"header": "Ajuda com WAN IPv6",
	"brief": "<B>Habilitar IPv6:</B>Habilitar ou desabilitar a função IPv6",
	"connection": "<B>Tipo de Conexão WAN:</B>",
	"s_0": "Escolha o tipo de conexão WAN correta de acordo com a tipologia do seu provedor.",
	"dhcpv": "<B>DHCPv6</B> - Conexões que utilizam atribuição de endereço IPv6 dinâmico.",
	"stat_ipv": "<B>IPv6 Estático</B> - Conexões que utilizam atribuição de endereço IPv6 estático.",
	"pppoev": "<B>PPPoEv6</B> - Conexões que utilizam PPPoEv6nque requerem um nome de usuário e senha.",
	"tunn_6to": "<B>Túnel 6 para 4</B> - Conexões que utilizam atribuições de endereço 6 para 4.",
	"ipv6_addr": "<B>Endereço IPv6</B> - O endereço IPv6 atribuído pelo seu provedor ISP dinamicamente.",
	"prefix_leng": "<B>Tamanho do Prefixo</B> - - Insira o tamanho do prefixo na linha decimal pontilhada fornecido pelo sue provedor.",
	"ipv6_gate": "<B>IPv6 Gateway</B> - Insira o gateway padrão na linha hexadecimal separada por \":\" fornecido pelo seu provedor.",
	"server": "<B>Servidor DNS IPv6</B> - Insira o endereço do servidor DNS IPv6 na linha hexadecimal separada por \":\" fornecido pelo seu provedor.",
	"secondary": "<B>Servidor DNS IPv6 Secundário</B> -  Insira outro endereço do servidor DNS IPv6 na linha hexadecimal separada por \":\" fornecido pelo seu provedor.",
	"mtu_size": "<B>Tamanho MTU</B> - O valor MTU (Maximum Transmission Unit - Unidade Máxima de Transmissão) para maioria das redes Ethernet é de 1500 Bytes. Para alguns provedores, você deve modificar esse valor, embora isso seja raramente solicitado. Não altere caso não seja necessário.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
};
var WlanAdvHelpRpm =
{
	"header": "Ajuda com Wireless Avançada",
	"brief": "<B>Poder de Transmissão</B> - Aqui você pode especificar a potência de transmissão do AP. Você pode selecionar 100%, 75% ou 50%  como desejar.",
	"brief_AP": "<B>Poder de Transmissão</B> - Aqui você pode especificar a potência de transmissão do AP. Você pode selecionar 100%, 75% ou 50%  como desejar.",	
	"beacon_inte": "<B>Intervalo de Beacon</B> - Os beacons são os pacotes enviados pelo roteador  para sincronizar uma rede wireless. Intervalo de Beacon determina o tempo deste intervalo, Você pode especificar um valor entre 40-1000 milisegundos. O valor padrão é 100.",
	"beacon_inte_AP": "<B>Intervalo Beacon</B> - Os beacons são os pacotes enviados pelo AP para sincronizar uma rede wireless. O valor de Intervalo Beacon determina o tempo de intervalo de beacon. Você pode especificar um valor entre 40-1000 milisegundos. O valor padrão é de 100.",	
	"rts_thre": "<B>RTS Inicial</B> - Aqui você especifica o RTS Threshold (Solicitação de Envio). Se o pacote for maior que o tamanho do RTS Threshold especificado, o roteador irá enviar frames RTS para um receptor e negociar o envio de data frame. O valor padrão é 2346.",
	"rts_thre_AP": "<B>RTS Threshold</B> - Aqui você pode especificar o RTS (Request to Send) Threshold. Se o pacote for maior do que o tamanho do RTS Threshold especificado, o AP enviará quadros RTS para uma determinada estação receptora e negociará o envio de uma estrutura de dados. O valor padrão é de 2346.",	
	"frag_threshold": "<B>Fragmentação Inicial</B> - Este valor é o tamanho máximo que determina se os pacotes serão fragmentados. Configurar a fragmentação threshold com um valor muito baixo pode resultar em baixo desempenho de rede. 2346 é o valor padrão e é também o recomendado.",
	"dtim_inte": "<B>Intervalo DTIM</B> - O valor  do intervalo DTIM (mensagem indicativa do tráfego de entrega). Você pode especificar o valor de 1 a 15 intervalos de beacon. O valor padrão é 1, o que indica o que o  intervalo DTIM é o mesmo valor que o intervalo beacon.",
	"enable": "<B>Habilitar Short GI</B> - Esta função é recomendada para aumentar sua capacidade de dados reduzindo a guarda de salvamento de intervalos.",
	"isolation": "<B>Habilitar Isolamento de Estação</B> - Isolar todas as estações wireless para que não possam se acessarem atrvés da WLAN. Esta função é desabilitada caso a função WDS/Bridge for habilitada.",
	"enab_wmm": "<B>Enable WMM</B> - WMM function can guarantee the packets with high-priority messages being transmitted preferentially. It is strongly recommended enabled.",
	"note": "<B>Nota: </B>Caso não esteja familiarizado com as configurações desta página, é recomendável manter os valores de padrão fornecidos, caso contrário, isto poderá afetar o desempenho da sua rede Wi-Fi."
};
var WlanAdvHelpRpm_AP =
{
	"header": WlanAdvHelpRpm.header,
	"brief": WlanAdvHelpRpm.brief,
	"brief_AP": WlanAdvHelpRpm.brief_AP,
	"beacon_inte": "<B>Intervalo Beacon</B> - Os beacons são os pacotes enviados pelo AP para sincronizar uma rede wireless. O valor de Intervalo Beacon determina o tempo de intervalo de beacon. Você pode especificar um valor entre 40-1000 milisegundos. O valor padrão é de 100.",	
	"beacon_inte_AP": "<B>Intervalo Beacon</B> - Os beacons são os pacotes enviados pelo AP para sincronizar uma rede wireless. O valor de Intervalo Beacon determina o tempo de intervalo de beacon. Você pode especificar um valor entre 40-1000 milisegundos. O valor padrão é de 100.",	
	"rts_thre": "<B>RTS Threshold</B> - Aqui você pode especificar o RTS (Request to Send) Threshold. Se o pacote for maior do que o tamanho do RTS Threshold especificado, o AP enviará quadros RTS para uma determinada estação receptora e negociará o envio de uma estrutura de dados. O valor padrão é de 2346.",	
	"rts_thre_AP": "<B>RTS Threshold</B> - Aqui você pode especificar o RTS (Request to Send) Threshold. Se o pacote for maior do que o tamanho do RTS Threshold especificado, o AP enviará quadros RTS para uma determinada estação receptora e negociará o envio de uma estrutura de dados. O valor padrão é de 2346.",	
	"frag_threshold": WlanAdvHelpRpm.frag_threshold,
	"dtim_inte": WlanAdvHelpRpm.dtim_inte,
	"enable": WlanAdvHelpRpm.enable,
	"isolation": WlanAdvHelpRpm.isolation,
	"enab_wmm": WlanAdvHelpRpm.enab_wmm,
	"note": WlanAdvHelpRpm.note
};
var WlanMacFilterHelpRpm =
{
	"header": "Ajuda com Filtro de MAC Wireless",
	"brief": "A função de filtro de MAC wireless permite-lhe controlar as estações conectadas ao Access Point.",
	"mac_addr": "<B>Endereço MAC</B> - A  endereço da estação MAC wireless que você deseja acessar",
	"description": "<B>Descrição</B> - Uma breve descrição da sua estação Wi-Fi.",
	"status": "<B>Status</B> - O status desta entrada, podendo ser <B>Habilitado</B> ou <B>Desabilitado</B>.",
	"host": "<B>Host</B> - O nome da rede wireless.",
	"disable": "Para desabilitar a função de filtro de  MAC, mantenha a configuração padrão clicando em  <B>Desabilitar</B>.",
	"enable": "Para configurar uma entrada, clique em <B>Habilitar</B>, e siga os seguintes passos: <BR> Primeiramente, você deve decidir se as estações wireless podem ou não acessar o Access Point. Caso sim, favor selecionar <B>Permitir as estações listadas por qualquer entrada habilitada a ter acesso</B>, caso contrário, selecione <B>Negar as estações listadas por qualquer entrada habilitada a ter acesso.</B>. ",
	"add_new": "Para adicionar a entrada de filtro MAC wireless, clique no botão <B>Adicionar Novo</B> e siga as seguintes instruções.",
	"mac_addr_0": "Insira o endereço MAC apropriado  no campom <B>Endereço MAC</B>.O formato do endereço MAC é XX:XX:XX:XX:XX:XX (X  é qualquer dígito hexadecimal). Por exemplo, 00:0A:EB:B0:00:0B.",
	"description_0": "Insira uma simples descrição da estação wireless no campo <B>Descrição</B>. Por exemplo, \"Estação Wireless A\".",
	"status_0": "<B>Status</B> - Selecione <B>Habilitar</B> ou <B>Desabilitar</B>  na lista abaixo.",
	"save": "Clique no botão <B>Salvar</B> para salvar esta entrada.",
	"s_0": "Para adicionar outras entradas, repita os passos 1~4.",
	"existing": "<B>Para editar uma entrada existente</B>:",
	"edit": "Clique em <B>Editar</B> na coluna <B>Editar</B> no menu de Filtro de  MAC Wireless.",
	"filtering": "Insira um valor atribuído em <B> Adicione ou modifique a entrada de Filtro de MAC Wireless</B> e clique em <B>Salvar</B>.",
	"enable_sele": "Você pode clicar no botão <B>Habilitar Selecionado</B> para habilitar as entradas selecionadas, clique em <B>Desabilitar Selecionado</B> para desabilitar as entradas selecionadas e clique em  <B>Deletar Selecionado</B> para apagar as que estiverem selecionadas.",
	"note": "<B>Nota</B>: Caso habilite a função <B>Permitir as estações listadas por qualquer entrada habilitada a ter acesso.</B> para <B>Regras de Filtragem</B>, não há nenhuma entrada habilitada na lista, portanto, nenhuma estação wireless pode acessar o AP."
};
var WlanNetworkHelpRpm =
{
	"header": "Ajuda com Configurações Wireless",
	"brief": "<B>Nota</B>: A distância ou alcance operacional da sua conexão wireless varia consideravelmente de acordo com seu posicionamento físico no ambiente de uso. Portanto, para o melhor resultado, posicione seu roteador :",
	"s_0": "Próximo ao centro da área em que sua estação wireless irá operar.",
	"s_1": "Em local elevado, como por exemplo, sobre uma prateleira,",
	"s_2": "Longe de potenciais fontes de interferência como PCs, microondas e telefones sem fio.",
	"s_3": "Com a posição da antena apontada para cima.",
	"s_4": "Longe de superfícies de metal.",
	"note": "<B>Nota</B>: O não cumprimento desses preceitos pode resultar em perda significativa de desempenho ou falha total de conexão Wi-Fi.",
	"wireless": "<B>Nome de Rede Wireless</B> - Insira um valor de até 32 caracteres. O mesmo nome (SSID) deve ser atribuído para todos os dispositivos wireless em sua rede.",
	"region": "<b>Região</b> - Selecione sua região na lista abaixo. Este campo especifica a região onde a função Wi-Fi será utilizada, o que pode ser ilegal caso sua região não esteja listada. Caso aconteça, favor contatar a agência governamental local para a devida assistência.",
	"mode": "<B>Modo</B> - Você pode escolher o modo \"Misto\" apropriado.",
	"chan_width": "<B>Largura de Canal</B> - A largura de banda do canal wireless.",
	"channel": "<B>Canal</B> - Esse campo determina qual frequência operacional será utilizada. Não é necessário alterar o canal wireless a menos que perceba problemas com interferência próximos ao Access Point. Caso selecione o modo automático, então o AP selecionará o melhor canal automaticamente.",
	"broadcast": "<B>Exibir Nome da Rede</B> - Caso tenha marcado a caixa <B>Exibir Nome da Rede</B> o roteador wireless irá exibir seu respectivo nome SSID.",
	"enab_wds": "<B>Habilitar WDS</B> - Você pode selecionar esta função para habilitar a ponte WDS, com esta função, o roteador pode conectar duas ou mais WLANS. Nota: caso esta caixa de checagem estiver assinalada, certifique-se de que as configurações seguintes estejam corretas.ect.",
	"bridged": "<B>SSID(a ter a bridge estabelecida)</B> - O SSID do roteador existente irá conectar-se como cliente. Você pode também usar a função pesquisar para encontrar o SSID e conectar-se. ",
	"address": "<B>Endereço MAC(a ter a bridge estabelecida)</B> - O endereço MAC do roteado irá conectar-se como cliente. Você pode também usar a função pesquisar para encontrar o endereço MAC e conectar-se. ",
	"scan": "<B>Pesquisar</B> - Clique neste butão e poderá pesquisar o AP utilizado no canal atual.",
	"key_type": "<B>Tipo de Chave</B> - Esta opção deve ser escolhida de acordo com a configuração de segurança AP. É recomendável que o tipo de segurança seja o mesmo que o tipo de segurança AP.",
	"wep_inde": "<B>Índice WEP</B> - Esta opção deve ser escolhida caso o tipo de chave seja WEP(ASCII) ou WEP(HEX). Ele indica o índice da chave WEP.",
	"auth_type": "<B>Tipo de Autentificação</B> - Esta opção deve ser escolhida caso o tipo de chave seja WEP(ASCII) ou WEP(HEX). Ela indica o tipo de autorização do AP Raíz.",
	"encryption": "<B>Criptografia</B> - Favor selecionar o tipo de criptografia baseada no roteador primário (AP).",
	"password": "<B>Senha</B> - Se o seu roteador a ser conectao necessita de senha, você precisa inserir uma senha no espaço em branco."
};
var WlanNetworkHelpRpm_AP =
{
	"header": WlanNetworkHelpRpm.header,
	"brief": "<B>Aviso</B>: A distância operacional ou alcance da sua conexão wireless varia de forma significativa de acordo com o posicionamento do AP. Para melhores resultados, posicione seu AP:",	
	"s_0": WlanNetworkHelpRpm.s_0,
	"s_1": WlanNetworkHelpRpm.s_1,
	"s_2": WlanNetworkHelpRpm.s_2,
	"s_3": WlanNetworkHelpRpm.s_3,
	"s_4": WlanNetworkHelpRpm.s_4,
	"note": "<B>Aviso</B>: O não cumprimento destas orientações pode resultar na degradação significativa do desempenho ou incapacidade de se conectar ao AP.",	
	"wireless": WlanNetworkHelpRpm.wireless,
	"region": WlanNetworkHelpRpm.region,
	"mode": WlanNetworkHelpRpm.mode,
	"chan_width": WlanNetworkHelpRpm.chan_width,
	"channel": WlanNetworkHelpRpm.channel,
	"broadcast": "<B>Habilitar Transmissão SSID</B> - Se você selecionar a opção <B>Habilitar SSID Broadcast</B>, o AP wireless transmitirá seu nome (SSID)."	
};
var WlanNetworkHelpRpm_MSSID =
{
	"header": WlanNetworkHelpRpm.header,
	"brief": WlanNetworkHelpRpm_AP.brief,	
	"s_0": WlanNetworkHelpRpm.s_0,
	"s_1": WlanNetworkHelpRpm.s_1,
	"s_2": WlanNetworkHelpRpm.s_2,
	"s_3": WlanNetworkHelpRpm.s_3,
	"s_4": WlanNetworkHelpRpm.s_4,
	"note": WlanNetworkHelpRpm_AP.note,	
	"wireless": "<B>SSID</B> - Insira um valor de até 32 caracteres. O mesmo Nome (SSID) deve ser atribuído a todos os dispositivos wireless na sua rede. No modo operacional Multi-SSID, insira o SSID para cada BSS no campo \"SSID1\" ~ \"SSID4\".",
	"region": WlanNetworkHelpRpm.region,
	"mode": WlanNetworkHelpRpm.mode,
	"chan_width": WlanNetworkHelpRpm.chan_width,
	"channel": WlanNetworkHelpRpm.channel,
	"broadcast": WlanNetworkHelpRpm_AP.broadcast,
	"vlan":"<B>ID VLAN</B> - O ID de uma VLAN. Somente na mesma VLAN, um PC wireless e um PC cabeado podem se comunicar entre si. O valor pode estar entre 1 e 4094. Se a função VLAN estiver ativada, quando o AP encaminha pacotes, os pacotes saindo da porta LAN serão adicionados com uma Tag VLAN IEEE 802.1Q, cuja ID VLAN é apenas a ID da VLAN onde o remetente pertence.",
	"en_vlan":"<B>Habilitar VLAN</B> - Selecione esta opção para habilitar a função VLAN. O AP suporta até 4 VLANs. Todos os PCs wireless nas VLANs são aptos para acessar este AP. O AP também pode operar com um Switch que suporta VLAN Tag IEEE 802.1Q."
};
var WlanSecurityHelpRpm =
{
	"header": "Ajuda com Segurança Wireless",
	"brief": "Você pode selecionar uma das seguintes opções:",
	"wireless": "<b>Desabilitar Segurança Wireless</b>- A função de segurança wireless pode ficar habilitada ou desabilitada. Caso desabilitada, as estações wireless serão aptas para conectar a este dispositivo sem criptografia. É recomendável que você escolha uma das opções a seguir para habilitar a segurança.",
	"personal": "<B>WPA/WPA2 - Pessoal</B> - Selecione a criptografia WPA baseada na senha pré-compartilhada. ",
	"enterprise": "<B>WPA/WPA2 - Empresarial</B> - Selecione  WPA de acordo com o servidor Radius.",
	"wep": "<B>WEP</B> - Selecione 802.11 para segurança WEP.",
	"s_0": "Cada opção de segurança tem sua própria configuração como descrevemos a seguir:",
	"personal_0": "<B>WPA/WPA2 - Pessoal</B> <b>Versão</b> -&nbsp; Você pode selecionar uma das seguintes versões.",
	"auto": "<B>Automática</B> - Selecione <B>WPA-PSK</B> ou <B>WPA2-PSK</B> automaticamente de acordo com a capacidade da estação wireless.",
	"wpa_psk": "<B>WPA-PSK</B> - Senha WPA pré-compartilhada.",
	"wpa2_psk": "<B>WPA2-PSK</B> -Senha WPA2 pré-compartilhada.",
	"encryption": "<B>Criptografia</B> - Você pode selecionar <B>Automática</B>,  <B>TKIP</B> ou <B>AES</B>.",
	"psk_pass": "<B>Senha Wireless</B> - Você pode inserir caracteres <B>ASCII</B> ou <B>Hexadecimais</B>. Para <B>Hexadecimais</B>, o tamanho deve ser entre 8 e 64 caracteres; para <B>ASCII</B> o tamanho deve ser entre 8 e 63 caracteres.",
	"update": "<B>Período de Atualização de Chave de Grupo</B> - Especifique o intervalo de atualização de chave de grupo. O valor pode ser 0 ou pelo menos 30. Insira 0 para desabilitar a atualização.",
	"enterprise_0": "<B>Empresarial</B> <b>Versão</b> -&nbsp; Você pode selecionar uma das versões a seguir.",
	"auto_0": "<B>Automático</B> - Selecione <B>WPA</B> ou <B>WPA2</B> automaticamente baseando-se na capacidade da estação cliente.",
	"wpa": "<B>WPA</B> - Acesso Wi-Fi Protegido.",
	"wpa_0": "<B>WPA2</B> - WPA versão 2",
	"encryption_0": "<B>Criptografia</B> - Você pode selecionar <B>Automática</B>,  <B>TKIP</B> ou <B>AES</B>.",
	"radius": "<B>Server IP Radius</B> - Insira o endereço IP do servidor Radius.",
	"radius_0": "<B>Porta do Servidor Radius</B> - Insira a o número da porta utilizada pelo serviço Radius. (de 1 a 65535, 0 para porta padrão 1812)",
	"password": "<B>Senha de Servidor Radius</B> - Insira a senha para o servidor Radius.",
	"update_0": "<B>Período de Atualização de Chave de Grupo</B> - Especifique o intervalo de atualização de chave de grupo. O valor pode ser 0 ou pelo menos 30. Insira 0 para desabilitar a atualização.",
	"wep_0": "<B>WEP</B>",
	"auth_type": "<B>Tipo de Autenticação</B> - Você pode selecionar um dos tipos a seguir",
	"auto_1": "<B>Automático</B> - Selecione automaticamente o tipo de autenticação: <b>Chave Compartilhada</b> ou <b>Sistema Aberto</b>  conforme a capacidade da rede cliente.",
	"shar_key": "<B>Chave Compartilhada</B> - Selecione 802.11 para autenticação de chave compartilhada.",
	"open_syst": "<B>Sistema Aberto</B> - Selecione 802.11 para autenticação de servidor aberto.",
	"format": "<B>Formato chave WEP</B> - Você pode selecionar os formatos <B>ASCII</B> ou <B>Hexadecimal</B>. O formato ASCII suporta qualquer combinação de caracteres do teclado no tamanho especificado. Já o formato hexadecimal permite qualquer combinação de dígitos (0-9, a-f ou A-F) no tamanho especificado.",
	"settings": "<B>Configurações de Chave WEP</B> - Selecione um das 4 chaves a ser utilizada e insira a chave WEP correspondente para sua rede selecionada no botão de seleção de rádio. Esses valores devem ser idênticos em todas as estações wireless.",
	"key_type": "<B>Tipo de Chave</B> - Você pode selecionar o tamanho da chave WEP (<B>64-bit</B>, our <B>128-bit</B>.) para criptografia. &quot;Desabilitado&quot; significa que a entrada de chave WEP é inválida.",
	"bit": "Para criptografia de <B>64-bit</B> - Você pode inserir 10 dígitos hexadecimais (qualquer combinação entre 0-9, a-f e A-F, pontuação não é permitido)  ou caracteres 5 ASCII.",
	"bit_0": "Para criptografia de <B>128-bit</B> - Você pode inserir 26 dígitos hexadecimais (qualquer combinação de 0-9, a-f, A-F, não é permitido pontuações) ou 13 caracteres ASCII.",
	"note": "<B>Nota</B>: Se você não configurar a chave, a função de segurança wireless permanece desabilitada mesmo que tenha selecionado <B>Chave Compartilhada</B> como um <B>Tipo de Autenticação</B>.",
	"save": "Certifique-se de clicar no botão <B>Salvar</B> para salvar suas configurações nesra página.",
	"version": "<b>Versão</b> -&nbsp; Você pode selecionar uma das seguintes versões:"
};
var WlanStationHelpRpm =
{
	"header": "Ajuda com Estatísticas de Wireless",
	"brief": "Esta página mostra o <b>Endereço MAC</b>, <b>Status Atual</b>, <b>Pacotes Recebidos</b>, <b>Pacotes Enviados</b> e <b>Nome SSID</b> para cada estação wireless conectada.",
	"mac_addr": "<b>Endereço MAC</b> - O endereço MAC da estação wireless conectado.",
	"curr_status": "<b>Status Atual</b> - O status atual da estação wireless conectada.",
	"rece_packets": "<b>Pacotes Recebidos</b> - Pacotes recebidos pela estação.",
	"sent_pack": "<b>Pacotes Enviados</b> - Pacotes enviados pela estação.",
	"ssid": "<b>Nome SSID</b> - O nome SSID da estação atribuída.",
	"refresh": "Você não pode mudar nenhum valor nesta página. Para atualizar esta página e mostrar as estações conectadas atuais, clique no botão <b>Atualizar</b>.",
	"note": "<b>Nota:</b> Esta página irá se atualizar automaticamente a cada 5 segundos."
};
var WlanThroughputHelpRpm =
{
	"header": "Ajuda sobre Monitoria de Throughput",
	"brief": "Esta página oferece ajuda sobre observação de informação sobre throughput wireless. ",
	"rate": "<B>Taxa</b> - A unidade de Throughput.",
	"run_time": "<b>Tempo de Execução</b> - Quantidade de tempo em que esta função está operando. ",
	"transmit": "<b>Transmissão</b> - Informações sobre taxa de transmissão wireless. ",
	"receive": "<b>Recepção</b> - Informações sobre taxa de recepção wireless.",
	"start": "Clique no botão <B>Iniciar</B> para iniciar o monitoramento de taxa de transferência wireless. ",
	"stop": "Clique no botão <B>Parar</B> para parar o monitoramento de taxa de transferência wireless. "
};
var WlanWpsChkModeHelpRpm =
{
	"header": "Ajuda ao Adicionar Novo Dispositivo",
	"brief": "Esta seção te ajuda a adicionar um novo dipositivo Wi-Fi a uma rede manualmente. Caso o novo dispositivo seja compatível com WPS e equipado com um botão de configuração, você pode adicioná-lo à rede clicando no botão de configuração do aparelho e então escolher <B>\"Pressione o botão do novo dispositivo em até 2 minutos\"</B> e clique em no botão \"Conectar\" nesta página de configuração em até 2 minutos. Além disso, você pode também adicionar um novo dispositivo inserindo o PIN deste dispositivo e clicar no botão \"Conectar\"",
	"device": "<B>Inserir PIN do novo dispositivo</B> - escolha esta configuração caso o novo dispositivo suporta tipos de conexão inserindo seu número PIN.",
	"pin": "<B>PIN</B> - Insira o valor PIN do novo dispositivo aqui.",
	"minutes": "<B>\"Pressione o botão do novo dispositivo em até 2 minutos\"</B> - escolha esta configuração se o novo dispositivo é compatível com o tipo de conexão apertando o botão.",
	"back": "<B>Voltar</B> - retorne à página de configuração.",
	"connect": "<B>Conectar</B> - Conectar ao novo dispositivo e adicioná-lo à rede existente."
};
var WlanWpsHelpRpm =
{
	"header": "Ajuda com Wi-Fi protegido",
	"brief": "A função WPS irá ajudá-lo a adicionar um novo dispositivo à rede rapidamente. Se o novo dispositivo suporta Configuração Wi-Fi Protegida e é equipado com um botão de configuração, você pode adicioná-lo à rede, pressionando o botão de configuração neste dispositivo, e em seguida, pressionando o botão no Roteador em dois minutos. O LED de status do Roteador ficará ligado por cinco minutos se o dispositivo tiver sido adicionado com êxito à rede. Se o novo dispositivo suporta WPS e a forma de conexão é utilizando PIN, você pode adicioná-lo à rede, inserindo o PIN do Roteador.",
	"wps_stat": "<B>Status WPS</B> - Habilite ou desabilite a função WPS aqui.",
	"curr_pin": "<B>PIN Atual</B> - O valor atual do PIN do roteador é mostrado neste espaço. O PIN padrão do roteador pode ser encontrado na etiqueta do aparelho ou no guia do usuário.",
	"rest_pin": "<B>Restaurar PIN</B> - Restaure o valor PIN para o padrão do roteador.",
	"generate": "<B>Gerar novo PIN</B> - Clique neste botão e então poderá obter um novo valor randômico para o número PIN do roteador. Você pode garantir a segurança da rede criando um novo número PIN.",
	"add_devi": "<B>Adicionar Dispositivo</B> - Você pode adicionar um novo dispositivo à rede existente manualmente clicando neste botão",
	"note": "<B>Nota: </B> A função WPS não pode ser configurada se o Wi-Fi do roteador estiver desabilitado. Por favor, certifique-se desta informação antes de configurar o WPS."
};
var WlanWpsHelpRpm_AP =
{
	"header": WlanWpsHelpRpm.header,
	"brief": "A função WPS irá ajudá-lo a adicionar um novo dispositivo à rede rapidamente. Se o novo dispositivo suporta Configuração Wi-Fi Protegida (WPS) e é equipado com um botão de configuração, você pode adicioná-lo à rede, pressionando o botão de configuração neste dispositivo, e em seguida, pressionando o botão neste dispositivo em dois minutos. O LED status no AP ficará aceso por 5 minutos se o novo dispositivo for adicionado com sucesso à rede. Se o novo dispositivo suporta WPS e a forma de conexão é utilizando PIN, você pode adicioná-lo à rede, inserindo o PIN deste AP.",
	"wps_stat": WlanWpsHelpRpm.wps_stat,
	"curr_pin": "<B>PIN Atual</B> - O valor atual do PIN do AP é exibido aqui. O PIN padrão do AP pode ser encontrado no rótulo ou no Guia do Usuário .",
	"rest_pin": "<B>Restaurar PIN</B> - Restaure o PIN do AP para o padrão.",
	"generate": "<B>Gerar Novo PIN</B> - Clique neste botão e então poderá obter um novo valor aleatório para o PIN do AP. Você pode garantir a segurança da rede, gerando um novo PIN.",
	"add_devi": WlanWpsHelpRpm.add_devi,
	"note": "<B>Aviso: </B> A função WPS não pode ser configurada se a Função Wireless do AP estiver desativada. Por favor, certifique-se que a função wireless está habilitada antes de configurar o WPS."
};
var WlanNetworkHelpRpm_RE =
{
	"header": WlanNetworkHelpRpm.header,
	"brief": "In Repeater mode, the device will relay data to an associated root AP. AP function is enabled meanwhile. The wireless repeater relays signal between its stations and the root AP for greater wireless range.",
	"region": WlanNetworkHelpRpm.region,
	"connect24g": "<B>Conectar à rede de 2.4GHz</B> - Ativar ou desativar para conectar o repetidor a uma rede existente de 2.4GHz.",
	"lock_to_ap": "<B>Travar em AP</B> - Caso Selecionado, a conexão do dispositivo sera restrita somente para a rede com endereço MAC especificado.",
	"scanner": "<B>Scanner Wireless</B>Clique neste botão para buscar e exibir todas as redes Wi-Fi disponíveis no alcance que você deseja que o repetidor se conecte. Uma vez que uma rede é selecionada, as definições de SSID e de segurança dessa rede serão preenchidos automaticamente.",
	"host_ssid24g": "<B>SSID(a ser ponteado)</B> - Digite o SSID da rede principal que o repetidor se conectará, ou clique em <b>Scanner Wireless</b> e selecione uma rede Wi-Fi.",
	"host_bssid24g": "<B>Endereço MAC (a ser ponteado)</B> - Digite o endereço MAC da rede principal em que o repetidor se conectará, ou clique em <b>Scanner Wireless</b> e selecione uma rede Wi-Fi.",
	"host_sec": "<B>Segurança</B> - Selecione uma das opções de segurança para corresponder com a rede principal.",
	"sec_none": "<B>Sem Segurança</B> - Selecione esta opção para desabilitar a segurança wireless.",
	"sec_wpa": "<B>WPA-PSK</B> - Sua opção suporta a implementação do padrão WPA (Wi-Fi Protected Access). É recomendável.",
	"sec_wpa2": "<B>WPA2-PSK</B> - Esta opção suporta a implementação do padrão WPA2 (Wi-Fi Protected Access). É também recomendável.",
	"sec_wep": "<B>WEP</B> - Essa opção é a forma mais básica de segurança wireless que pode ser usada se os dispositivos cliente só puderem acessar wireless usando WEP (Wired Equivalent Privacy).",
	"ext24g": "<B>Rede de 2.4GHz Estendida</B> - Ativar ou desativar a função wireless de 2.4GHz do repetidor.",
	"ext_ssid24g": "<B>Extended SSID</B> - Either use the <b>Copy Host SSID</b> button to automatically copy the main router/AP's SSID or enter a new name (up to 32 characters long). This field is case-sensitive.",
	"ext_cpssid": "<B>Copiar SSID Principal</B> - Clique para copiar o SSID Principal. Quando selecionado, a rede estendida irá compartilhar o SSID da sua rede principal.",
	"ext_sec": "<B>Extended Security</B> - Select one of the security options to set local extended wireless network.",
	"sec_none": "<B>Sem Segurança</B> - Selecione esta opção para desabilitar a segurança wireless.",
	"sec_wpa": "<B>WPA-PSK/WPA2-PSK</B> - Esta opção suporta múltiplas implementações de padrões WPA (Wi-Fi Protected Access), como WPA e WPA2.",
	"sec_wep": "<B>WEP</B> - Essa opção é a forma mais básica de segurança wireless que pode ser usada se os dispositivos cliente só puderem acessar wireless usando WEP (Wired Equivalent Privacy).",
	"settings":"<B>Índicex</B> - Selecione qual das quatro chaves será utilizada.",
	"psk_pass": WlanSecurityHelpRpm.psk_pass,
	"auth_type":WlanSecurityHelpRpm.auth_type,
	"open_syst":WlanSecurityHelpRpm.open_syst,
	"shar_key":WlanSecurityHelpRpm.shar_key,
	"format":WlanSecurityHelpRpm.format,
	"wep_password":"<B>Senha</B> - Insira a informação de chave WEP correspondente da sua rede."

};
var WlanConnectHelpRpm =
{
	"header": "Ajuda para Conectar à Rede Principal",
	"brief": "In Repeater mode, the device will relay data to an associated root AP. AP function is enabled meanwhile. The wireless repeater relays signal between its stations and the root AP for greater wireless range.",
	"connect24g": "<B>Conectar à rede de 2.4GHz</B> - Ativar ou desativar para conectar o repetidor a uma rede existente de 2.4GHz.",
	"scanner": "<B>Scanner Wireless</B>Clique neste botão para buscar e exibir todas as redes Wi-Fi disponíveis no alcance que você deseja que o repetidor se conecte. Uma vez que uma rede é selecionada, as definições de SSID e de segurança dessa rede serão preenchidos automaticamente.",
	"host_ssid24g": "<B>SSID(a ser ponteado)</B> - Digite o SSID da rede principal que o repetidor se conectará, ou clique em <b>Scanner Wireless</b> e selecione uma rede Wi-Fi.",
	"host_bssid24g": "<B>Endereço MAC (a ser ponteado)</B> - Digite o endereço MAC da rede principal em que o repetidor se conectará, ou clique em <b>Scanner Wireless</b> e selecione uma rede Wi-Fi.",
	"host_sec": "<B>Segurança</B> - Selecione uma das opções de segurança para corresponder com a rede principal.",
	"sec_none": "<B>Sem Segurança</B> - Selecione esta opção para desabilitar a segurança wireless.",
	"sec_wpa": "<B>WPA-PSK</B> - Sua opção suporta a implementação do padrão WPA (Wi-Fi Protected Access). É recomendável.",
	"sec_wpa2": "<B>WPA2-PSK</B> - Esta opção suporta a implementação do padrão WPA2 (Wi-Fi Protected Access). É também recomendável.",
	"sec_wep": "<B>WEP</B> - Essa opção é a forma mais básica de segurança wireless que pode ser usada se os dispositivos cliente só puderem acessar wireless usando WEP (Wired Equivalent Privacy).",
	"settings":"<B>Índicex</B> - Selecione qual das quatro chaves será utilizada.",
	"psk_pass": WlanSecurityHelpRpm.psk_pass,
	/* modify the WlanSecurityHelpRpm.auth_type */
	"auth_type":WlanSecurityHelpRpm.auth_type,
	"open_syst":WlanSecurityHelpRpm.open_syst,
	"shar_key":WlanSecurityHelpRpm.shar_key,
	"format":WlanSecurityHelpRpm.format,
	"wep_password":"<B>Senha</B> - Insira a informação de chave WEP correspondente da sua rede."
};
var WlanExtenderHelpRpm =
{
	"header": "Ajuda com Configurações da Rede Estendida",
	"brief": "In Repeater mode, the device will relay data to an associated root AP. AP function is enabled meanwhile. The wireless repeater relays signal between its stations and the root AP for greater wireless range.",
	"ext24g": "<B>Rede de 2.4GHz Estendida</B> - Ativar ou desativar a função wireless de 2.4GHz do repetidor.",
	"ext_ssid24g": "<B>Extended SSID</B> - Either use the <b>Copy Host SSID</b> button to automatically copy the main router/AP's SSID or enter a new name (up to 32 characters long). This field is case-sensitive.",
	"ext_cpssid": "<B>Copiar SSID Principal</B> - Clique para copiar o SSID Principal. Quando selecionado, a rede estendida irá compartilhar o SSID da sua rede principal.",
	"ext_sec": "<B>Extended Security</B> - Select one of the security options to set local extended wireless network.",
	"sec_none": "<B>Sem Segurança</B> - Selecione esta opção para desabilitar a segurança wireless.",
	"sec_wpa": "<B>WPA-PSK/WPA2-PSK</B> - Esta opção suporta múltiplas implementações de padrões WPA (Wi-Fi Protected Access), como WPA e WPA2.",
	"sec_wep": "<B>WEP</B> - Essa opção é a forma mais básica de segurança wireless que pode ser usada se os dispositivos cliente só puderem acessar wireless usando WEP (Wired Equivalent Privacy)."
};	
var QsChangeLoginPwdHelpRpm =
{
	"header": "Ajuda sobre  Usuário e Senha",
	"brief": "É altamente recomendável que você altere seu nome de usuário e senha padrões de fábrica deste dispositivo. Todos os usuários que tentarem acessar este utilitário web do dispositivo serão solicitados a inserirem nome de usuário e senha pelo dispositivo.",
	"note": "Nota: O novo <B>Nome de Usuário</B> e a nova<B> Senha</B> não devem exceder 32 caracteres de extensão, e não devem incluir espaços. Digite a nova Senha duas vezes para confirmá-la."
};
var QsLanApHelpRpm =
{
	"header": "Ajuda com Configurações de Rede",
	"brief": "Você pode configurar os parâmetros IP nesta página.",
	"type": "<B>Tipo</B> - Escolha IP smart para obter o endereço IP do servidor DHCP, ou escolha IP estático para a configuração de endereço IP manualmente.",	
	"ipaddr": "<B>IP Address</B> - Enter the IP address of your system in dotted-decimal notation (factory default:<SCRIPT language=\"JavaScript\">document.write(\'192.168.0.1\');</SCRIPT>).",
	"mask": "<B>Máscara de Sub-rede</B> - Um código de endereço que determina o tamanho da rede. Normalmente 255.255.255.0 é utilizado como máscara de sub-rede.",
	"dhcps": "<B>Servidor DHCP</B> - Habilitar ou Desabilitar o servidor. Caso escolha tipo IP Smart, a seleção será desabilitada. Caso desabilite o Servidor, você deve possuir outro servidor DHCP dentro da sua rede ou deverá configurar o endereço IP do computador manualmente.",
	"note": "<B>Aviso:</B> Caso altere o endereço IP, você deve utilizar o novo endereço IP para fazer login no sistema."
};
var QsModeHelpRpm =
{
	"header": "Ajuda com Modo Operacional",
	"mode_router": "<B>Roteador Wireless (Padrão)</B>: Este modo permite múltiplos usuários a compartilharem a conexão de Internet via modem ADSL/Cabo. Os dispositivos LAN compartilham o mesmo IP do provedor através da porta wireless. Durante a conexão à Internet, a porta Ethernet LAN/WAN funciona como uma porta WAN no modo Roteador Wireless.",
	"mode_ap": "<B>Access Point</B>: Neste modo, este dispositivo pode ser conectado à uma rede cabeada e transformá-la em wireless onde vários dipositivos móveis podem compartilhar, especialmente em uma residência, escritório ou hotel onde somente há disponível rede cabeada.",
	"mode_re": "<B>Repeater/Bridge</B>: In this mode, this device can copy and reinforce the existing wireless signal to extend the coverage of the signal, especially for a large space to eliminate signal-blind corners.",
	"mode_client": "<B>Cliente</B>: Neste modo, este dispositivo pode ser ligado a outro dispositivo via porta Ethernet e agir como um adaptador para conceder o acesso de dispositivos com fio à uma rede wireless, especialmente para uma Smart TV, Media Player, ou videogames apenas com uma porta Ethernet.",	
	"mode_mssid": "<B>Multi-SSID</B>: Neste modo, este dispositivo pode criar até 4 redes wireless marcadas com diferentes SSIDs e atribuir a cada SSID diferentes tipos de seguranças ou VLAN, especialmente para a situação em que as várias políticas e funções de acesso são necessárias.",
    "mode_hotspot": "<B>WISP</B>: Neste modo, o dispositivo permite que vários usuários compartilhem a conexão de Internet do WISP. Os dispositivos da porta LAN compartilham o mesmo IP do WISP através da porta wireless. Durante a conexão ao WISP, a porta wireless funciona como uma porta WAN no modo Roteador Cliente WISP. A porta Ethernet funciona como uma porta LAN."
};
var QsMultissidHelpRpm =
{
	"header": "Ajuda Wireless",
	"brief": "<B>Multi-SSID</B> - O AP suporta até 4 SSIDs.",
	"en_vlan": "<B>Habilitar VLAN</B> - Selecione esta para habilitar a função VLAN. O AP suporta até 4 VLANs. Todos os PCs wireless nas VLANs são aptos para acessar este AP. O AP também pode operar com um Switch que suporta VLAN Tag IEEE 802.1Q.",	
	"ssid": "<B>SSID</B> - Insira um valor de até 32 caracteres. O mesmo Nome (SSID) deve ser atribuído a todos os dispositivos wireless na sua rede. No modo operacional Multi-SSID, insira o SSID para cada BSS no campo \"SSID1\" ~ \"SSID4\".",	
	"vlan": "<B>ID VLAN</B> - O ID de uma VLAN. Somente na mesma VLAN, um PC wireless e um PC cabeado podem se comunicar entre si. O valor pode estar entre 1 e 4094. Se a função VLAN estiver ativada, quando o AP encaminha pacotes, os pacotes saindo da porta LAN serão adicionados com uma Tag VLAN IEEE 802.1Q, cuja ID VLAN é apenas a ID da VLAN onde o remetente pertence.",
	"mode": "<B>Modo</B> - Você pode escolher o modo \"misto\". ",
	"chan_width": "<B>Largura de Canal</B> - A largura de banda do canal wireless.",	
	"chan": "<B>Canal</B> - Este campo determina qual frequência de operação será utilizada. Não é necessário mudar o canal sem fio a menos que você observe problemas de interferência com outro ponto de acesso nas proximidades.",
	"security": "<b>Você pode selecionar uma das seguintes opções de segurança:  ",
	"no_sec": "<b>Desabilitar Segurança</b> - A função de segurança wireless pode ficar habilitada ou desabilitada. Caso desabilitada, as estações wireless ficarão aptas para conectar este dispositivo sem criptografia. É recomendável que você escolha uma das opções a seguir para habilitar a segurança.",	
	"wpa2-psk": "<B>WPA2-PSK</B>",	
	"password": "<B>Senha</B> - Você pode inserir caracteres <B>ASCII</B>. O tamanho deve ser entre 8 e 63 caracteres."
};
var QsReviewHelpRpm =
{
	"header": "Ajuda de Finalização",
	"finish": "Clique em <strong>Finalizar</strong> para encerrar a <B>Configuração Rápida</B>.",
	"back": "Clique em <strong>Voltar</strong> para voltar a página."		
};
var QsWlScanClientHelpRpm =
{
	"header": "Ajuda com Pesquisa WLAN",
	"note": "<B>Aviso</B>: As informações de APs às quais você pode se conectar são mostradas nesta página. Configure da seguinte forma:",
	"n_0": "Primeiro, escolha a rede que deseja se conectar.",	
	"n_1": "Então, verifique \"conectar\" no fim desta linha.",	
	"n_2": "Agora, o SSID da rede alvo será preenchido no lugar correto na página de configuração WLAN automaticamente.",	
	"refresh": "<B>Aviso</B>: Clique em <B>Atualizar</B> para atualizar a lista AP.",
	"back": "Clique em <B>Voltar</B> para retornar à página de seleção do Modo Operacional."
};
var WzdAccessCtrlHostAddHelpRpm =
{
	"header": "Ajuda ao Criar Entrada Host",
	"brief": "Você pode criar uma entrada para a lista host nesta página.",
	"host_desc": "<B>Descrição do Host</B> - neste campo, crie uma descrição <B>única</B> para o host.",
	"mode": "<B>Modo</B> - aqui há duas opções, endereço IP ou MAC. Você pode selecionar através da lista que aparecerá abaixo.",
	"ip_addr": "Se o <B>Endereço IP Address</B> está selecionado, você poderá visualizar o seguinte item:",
	"address": "<B>Endereço LAN IP</B> - insira o endereço IP ou classe IP do host na linha decimal pontilhada, exemplo: 192.168.0.23.",
	"mac_addr": "Se o <b>Endereço MAC </b> está selecionado, você poderá visualizar o seguinte item:",
	"mac_addr_0": "<B>Endereço MAC</B> - insira o endereço MAC do host no formato XX:XX:XX:XX:XX:XX, por exemplo: 00:11:22:33:44:AA.",
	"next": "Clique no botão <B>Próximo</B> para continuar, ou em <B>Voltar</B> para retornar à pagina anterior."
};
var WzdAccessCtrlRuleAddHelpRpm =
{
	"header": "Ajuda ao Criar Entrada de Controle de Acesso",
	"brief": "Você pode criar uma nova regra nesta página.",
	"rule": "<B>Regra</B> - neste campo, crie um nome para a regra. Esta regra deve ser <b>única</b>.",
	"host": "<B>LAN Host</B> - selecione um host da lista abaixo.",
	"target": "<B>Alvo</B> - Selecione aqui um alvo na lista abaixo. <b>Qualquer Alvo</b> é a escolha padrão.",
	"schedule": "<B>Horário</B> - Selecione um horário da lista suspensa para adicionar à regra. O valor padrão é Qualquer horário.",
	"status": "<B>Status</B> - neste campo, há duas opções, habilitar ou desabilitar a regra.",
	"finish": "Clique em <B>Finalizar</B> para aplicar a nova Política de Controle de Acesso, ou clique em <B>Voltar</B> para retornar à pagina anterior."
};
var WzdAccessCtrlSchedAddHelpRpm =
{
	"header": "Ajuda ao Criar uma Entrada de Agenda Avançada ",
	"brief": "Você pode criar uma entrada para a lista host nesta página.",
	"schedule_desc": "<b>Descrição</b> - Defina um nome para a regra. Note que este nome deve ser exclusivo para cada regra criada por exemplo: Schedule_1.",
	"day": "<B>Dia </B> - defina os dias específicos ou escolha \"Todos os dias\".",
	"time": "<B>Hora</B> - Selecione \"24 horas\", ou especifique um horário inicial e final.",
	"star_time": "<B>Horário Inicial </B> - Insira um horário inicial no formato HHMM (HHMM são 4 números). Por exemplo: 0800 seria 8:00.",
	"stop_time": "<B>Horário Final </B> - Insira um horário final no formato HHMM (HHMM são 4 números). Por exemplo: 2000 seria 20:00.",
	"next": "Clique no botão <B>Próximo</B> para continuar, ou em <B>Voltar</B> para retornar à pagina anterior."
};
var WzdAccessCtrlTargetAddHelpRpm =
{
	"header": "Ajuda ao Gerenciar Regra de Alvo de Acesso",
	"brief": "Você pode regras para a lista de alvos nesta página.",
	"target_desc": "<B>Descrição do Alvo</B> -  Neste campo, crie uma descrição para o alvo. Esta descrição deve ser diferente das demais.",
	"mode": "<B>Modo</B> - há aqui duas opções, endereço IP e nome de domínio. Escolha o que desejar no menu.",
	"ip_addr": "Se o <B>Endereço IP</B> está selecionado, você visualizará os items a seguir:",
	"ip_addr_0": "<B>Endereço IP</B> - insira o endereço IP (ou a classe de endereço) para o(s) alvo(s) na linha decimal pontilhada, por exemplo 192.168.0.23.",
	"targ_port": "<B>Porta Alvo</B> - Especifique a porta ou classe de porta para o alvo. Para alguns serviços d eporta comuns, você pode utilizar o item de Porta de Serviço Comum abaixo.",
	"protocol": "<B>Protocolo</B> - Aqui há 4 opções: Todas, TCP, UDP e ICMP. Selecione um deles da lista abaixo para o alvo.",
	"service": "<B>Porta de Serviço Comum</B> - aqui é listada algumas portas de serviço comuns. Selecione uma da lista abaixo e o número correspondente da porta será preenchido no campo \"Porta de Alvo\" automaticamente. Por exemplo, se vocÊ selecionar \"FTP\", \"21\" será preenchido automaticamente.",
	"doma_name": "Se o <B>Nome de Domínio</B> está selecionado, você visualizará os seguintes items:",
	"doma_name_0": "<B>Nome de Domínio</B> - aqui você pode inserir 4 nomes de domínio, tanto nome completo como palavras-chave (por exemplo: google). Qualquer domínio contendo essa palavra-chave (www.google.com, www.google.cn) será bloqueada ou permitida.",
	"next": "Clique no botão <B>Próximo</B> para continuar, ou em <B>Voltar</B> para retornar à pagina anterior."
};
var WzdConfirmHelpRpm =
{
	"header": "Ajuda de Confirmação",
	"brief": "Por favor confirme todos os parâmetros",
	"save": "Clique no botão <B>Salvar</B> para guardar todos os parâmetros <B>Voltar</B> para retornar a tela anterior"
};
var WzdFinishHelpRpm =
{
	"header": "Ajuda de Finalização",
	"brief": "Clique em <b>FINALIZAR</b> para encerrar a Configuração Rápida"
};
var WzdL2TPHelpRpm =
{
	"header": "Ajuda com L2TP",
	"brief": "<B>Nome de Usuário e Senha</B> - insira o nome de usuário e senha fornecidos pelo seu provedor. Este compo reocnhece letras maiúsculas e minúsculas.",
	"stat_ip": "Selecione <B>IP Estático</B> se o endereço IP, máscara de sub-rede, gateway e endereço de servidor DNS forem fornecidos pelo seu provedor. Caso contrário, favor selecionar <B>IP Dinâmico</B>",
	"s_0": "Insira o endereço IP do servidor ou nome de domínio fornecidos pelo seu provedor.",
	"next": "Clique no botão <B>Próximo</B> para continuar, ou em <B>Voltar</B> para retornar à pagina anterior."
};
var WzdPPPoEHelpRpm =
{
	"header": "Ajuda com PPPoE",
	"brief": "<B>Nome de Usuário e Senha</B> - insira o nome de usuário e senha fornecidos pelo seu provedor. Este compo reocnhece letras maiúsculas e minúsculas.",
	"next": "Clique no botão <B>Próximo</B> para continuar, ou em <B>Voltar</B> para retornar à pagina anterior."
};
var WzdPPTPHelpRpm =
{
	"header": "Ajuda PPTP",
	"brief": "<B>Nome de Usuário e Senha</B> - insira o nome de usuário e senha fornecidos pelo seu provedor. Este compo reocnhece letras maiúsculas e minúsculas.",
	"stat_ip": "Selecione <B>IP Estático</B> se o endereço IP, máscara de sub-rede, gateway e endereço de servidor DNS forem fornecidos pelo seu provedor. Caso contrário, favor selecionar <B>IP Dinâmico</B>",
	"s_0": "Insira o endereço IP do servidor ou nome de domínio fornecidos pelo seu provedor.",
	"next": "Clique no botão <B>Próximo</B> para continuar, ou em <B>Voltar</B> para retornar à pagina anterior."
};
var WzdStartHelpRpm =
{
	"header": "Ajuda Sobre Configuração Rápida",
	"brief": "Com este guia, você pode alterar os parâmetros básicos para conseguir conexão à Internet. Mesmo que não seja familiarizado com este produto, você pode ainda finalizar as configurações facilmente. Caso seja experiente, você ainda poderá escolher configurar o que quiser no menu, ao invés               de utilizar este.",
	"next": "Clique no botão <B>Próximo</B> para continuar."
};
var WzdStaticIpHelpRpm =
{
	"header": "Ajuda com IP estático ",
	"brief": "Os parâmetros IP devem ser fornecidos pelo seu provedor.",
	"ip_addr": "<B>Endereço IP</B> - este é o endereço IP WAN visto pelos usuários externos na Internet (incluindo seu provedor). Insira o endereço IP neste campo.",
	"subn_mask": "<B>Máscara de Sub-rede</B> - A máscara de sub-rede é utilizada pelo endereço IP WAN é normalmente 255.255.255.0.",
	"default_gate": "<B>Gateway Padrão</B> - Insira o gateway padrão no espaço em branco.",
	"prim_dns": "<B>DNS Primário</B> - insira o endereço IP DNS no espaço em branco.",
	"seco_dns": "<B>DNS Secundário</B> - se o seu provedor fornece outro endereço IP DNS, insira-o neste campo.",
	"next": "Clique em <B>Próximo</B> para continuar, ou em <B>Voltar</B> para retornar à página anterior."
};
var WzdWanMACHelpRpm =
{
	"header": "Ajuda com Clone de MAC ",
	"brief": "A maioria dos cabos fornecidos pelos provedores de Internet registram um único endereço MAC de conexão cabeada no seu <span id = \"t_main_computer\" style=\"color:#C11C66\">COMPUTADOR PRINCIPAL - o último computador utilizado com o cabo de modem a ser conectado à Internet.</span>.",
	"s_0": "Se você adicionar um roteador à rede, seu provedor pode não reconhecer um endereço MAC do roteador e não permitir sua conexão.",
	"s_1": "De qualquer forma, o roteador TP-Link pode \"clonar\" ou duplicar o endereço de registro MAC do COMPUTADOR PRINCIPAL. Sendo assim, seu provedor pode liberar conexão para o roteador e todos os computaodres.",
	"next": "Clique em <B>Próximo</B> para continuar, ou em <B>Voltar</B> para retornar à página anterior."
};
var WzdWanTypeHelpRpm =
{
	"header": "Tipo de Conexão WAN",
	"brief": "A <b>Configuração Rápida</b> suporta cinco tipos populares de conexão. Para garantir que o seu tipo seja compatível com a do provedor, favor contatar seu provedor.",
	"auto_dete": "<b>Detecção Automática</b> - caso não saiba o tipo de conexão que seu provedor fornece, utilize esta opção para permitir que a configuração rápida busque por servidores e protocolos e determine sua configuração de provedor. Tenha certeza de que o cabo está seguramente plugado à porta WAN antes da detecção. A página para configuração apropriada será exibida quando um serviço da Internet ativo é detectado com sucesso pelo roteador.",
	"dyna_ip": "<b>IP Dinâmico</b> - quando o roteador conecta ao servidor DHCP, ou o provedor fornece conexão DHCP, favor escolher este tipo. O roteador irá obter o endereço IP automaticamente do servidor DHCP ou do provedor caso escolha o tipo de IP dinâmico.",
	"stat_ip": "<b>IP Estático</b> - seu provedor fornece parâmetros específico de endereço IP.",
	"russia": "<b>PPPoE/Russian PPPoE</b> - se você aplicou ADSL para efetuar o serviço Dial-up, você pode escolher este tipo. Sob esta condição, você deve preencher o nome de usuário e senha que o provedor forneceu.",
	"russia_0": "<b>L2TP/Russian L2TP</b> - neste tipo, você deve preencher o nome de usuário, senha e endereço IP/nome de domínio do servidor VPN.",
	"russia_1": "<b>PPTP/Russian PPTP</b> - neste tipo, você deve preencher com nome de usuário, senha e endereço IP/nome de domínio e servidor VPN.",
	"next": "Clique no botão <b>Próximo</b> para continuar ou em <b>Voltar</b> para retornar à página anterior."
};
var WzdWlanHelpRpm =
{
	"header": "Ajuda Wireless",
	"brief": "<b>Nome da Rede Wireless</b> - Insira um nome de até 32 caracteres. O mesmo nome (SSID) deve ser atribuído a todos os dispositivos wireless de sua rede. O SSID padrão é <B> TP-Link_xxxx</B>(xxxx indica os últimos 4 caracteres de cada endereço MAC do roteador), o que pode garantir a segurança da sua rede Wi-Fi, embora seja recomendável que você altere seu nome de rede (SSID) para um valor diferente. Este nome é sensitivo a letras maiúsculas e minúsculas, exemplo: <b>MEUNOME</b> é diferente de <b>mEuNoMe</b>.",
	"region": "<b>Região</b> - Selecione sua região na lista abaixo. Este campo especifica a região onde a função Wi-Fi será utilizada, o que pode ser ilegal caso sua região não esteja listada. Caso aconteça, favor contatar a agência governamental local para a devida assistência.",
	"power": WlanAdvHelpRpm.brief,
	"band": "<b>Banda</b> - Este campo determina a frequência de banda que seu rádio Wi-Fi irá trabalhar, são duas opções: 2.4GHz ou 5GHz. Favor escolher a frequência de acordo com a política governamental local e seus requisitos.",
	"mode": "<b>Modo</b> - Este campo determina o modo wireless em que o roteador trabalha.",
	"chan_width": "<b>Largura de Canal</b> - A largura de banda do canal wireless.",
	"channel": "<b>Canal</b> - Este campo determina qual frequência operacional será utilizada. Não é necessário alterar a menos que perceba problemas de interferência próximos ao ponto de acesso. Se selecionar <B>Automático</B>, então o ponto de acesso selecionará a melhor frequência automaticamente.",
	"s_0": "Você pode selecionar uma das seguintes opções:",
	"disable_secu": "<b>Desabilitar Segurança</b> - A função de segurança Wi-Fi pode ser habilitada ou desabilitada. Se desabilitada, as estações wireless poderão conectar ao roteador sem criptografia. É recomendável que você escolha uma das opções para habilitar a segurança.",
	"s_1": "",
	"wpa2": "<B>WPA2-PSK</B> - Selecione a WPA de acordo com a senha pré-compartilhada.",
	"psk_pass": "<B>Senha Wireless</B> - Você pode inserir caracteres <B>ASCII</B>. O tamanho deve ser entre 8 e 63 caracteres. Favor notar que a chave é sensível a letras maiúsculas e minúsculas.",
	"s_2": ""
};
var WzdWlanHelpRpm_AP =
{
	"header": WzdWlanHelpRpm.header,
	"brief": "<b>Wireless Network Name</b> - Enter a string of up to 32 characters. The same Name (SSID) must be assigned to all wireless devices in your network. The default SSID is set to be <B> TP-Link_xxxx</B>(xxxx indicates the last unique four characters of each AP\'s MAC address), which can ensure your wireless network security. But it is recommended strongly that you change your networks name (SSID) to a different value. This value is case-sensitive. For example, <b>MYSSID</b> is NOT the same as <b>MySsid</b>.",
	"region": WzdWlanHelpRpm.region,
	"power": WlanAdvHelpRpm.brief,
	"band": WzdWlanHelpRpm.band,
	"mode": "<b>Modo</b> - Este campo determina o modo wireless cujo o AP opera.",
	"chan_width": WzdWlanHelpRpm.chan_width,
	"channel": WzdWlanHelpRpm.channel,
	"s_0": WzdWlanHelpRpm.s_0,
	"disable_secu": "<b>Desabilitar Segurança</b> - A função de segurança wireless pode ficar habilitada ou desabilitada. Caso desabilitada, as estações wireless serão aptas para conectar o AP sem criptografia. É recomendável que você escolha uma das opções a seguir para habilitar a segurança.",
	"s_1": WzdWlanHelpRpm.s_1,
	"wpa2": WzdWlanHelpRpm.wpa2,
	"psk_pass": WzdWlanHelpRpm.psk_pass
};
/*
var QsWlClientHelpRpm =
{
	"header": "Ajuda com Configurações de Rede",
	"brief": "Você pode configurar os parâmetros IP nesta página.",
	"type": "<B>Tipo</B> - Escolha IP smart para obter o endereço IP do servidor DHCP, ou escolha IP estático para a configuração de endereço IP manualmente.",	
	"n_0": "Primeiro, escolha a rede que deseja se conectar.",	
	"n_1": "Então, verifique \"conectar\" no fim desta linha.",	
	"n_2": "Agora, o SSID da rede alvo será preenchido no lugar correto na página de configuração WLAN automaticamente.",
	"refresh": "<B>Aviso</B>: Clique em <B>Atualizar</B> para atualizar a lista AP.",
	"back": "Clique em <B>Voltar</B> para retornar à página de seleção do Modo Operacional."		
};
*/
var QsWlClientHelpRpm =
{
	"header": WzdWlanHelpRpm.header,
	"brief_re":"<B>RE</B> - No modo Repetidor, o repetidor wireless reproduz o sinal entre as estações e o AP raíz para melhor alcance wireless.",
	"region": WlanNetworkHelpRpm.region,
	"power": WlanAdvHelpRpm.brief,
	"re_wirelessAP":"<B> Nome Wireless do AP Raíz</B>  - Insira o nome do AP remoto (também chamado de SSID) que deseja acessar. Clique em <B>Voltar</B> na página da lista AP, então você pode escolher outro dos resultados da pesquisa para preencher este campo.",
	"re_wirelessAP2":"<B>endereço MAC do AP Raíz</B> - Insira o endereço MAC do AP que deseja acessar. Quando utilizar a função de pesquisa na página anterior para preencher o <B>NomeWireless do AP Raíz</B>, este campo será preenchido automaticamente.",
	"re_wds":"<B>Modo WDS</B> - Este campo determina qual modo WDS será utilizado. Não é necessário alterar o Modo WDS a menos que você perceba problemas de comunicação com o AP Raíz. Se selecionar Auto, o Roteador irá escolher o Modo WDS apropriado automaticamente.",
	"re_wirelessname":"<B>Nome Wireless do Repetidor</B> - Este campo determina o Local AP SSID. Você pode definir o mesmo SSID com que o AP Raíz, ou customizar como quiser.",
	"brief_hotspot":"<B>WISP</B>Neste modo, o dispositivo permite que vários usuários compartilhem a conexão de Internet do WISP. ",
	"hotspot_ssid":"<B>SSID(a ser ponteado)</B> - Digite o nome de um AP remoto (também chamado de SSID) que você deseja acessar. Clique no botão <B>Voltar</B> na página da lista AP, então você pode escolher outro dos resultados da pesquisa para preencher este campo.",
	"hostpot_mac":"<B>Endereço MAC (a ser ponteado):</B> - Insira o endereço MAC do AP que você deseja acessar. Quando utilizar a função de pesquisa na página anterior para preencher o <B>Nome Wireless do AP Raíz</B>, este campo será preenchido automaticamente.",
	"hotspot_localssid":"<B>SSID da Rede Local:</B> -Insira o nome da rede Wi-Fi local.",
	"brief_client":"<B>Cliente</B> - Este dispositivo funcionará como uma estação wireless para permitir que o(s) host(es) wireless cabeados acessem o AP.",
	"client_wirelessAP1":"<b>Nome Wireless do AP Raíz</b> - Insira um valor em até 32 caracteres. Para obter mais informações, você pode ler o mesmo glossário na parte do Access Point.",
	"client_wirelessAP2":"<B>endereço MAC do AP Raíz</B> - Insira o endereço MAC do AP que deseja acessar. Quando utilizar a função de pesquisa na página anterior para preencher o <B>NomeWireless do AP Raíz</B>, este campo será preenchido automaticamente.",
	"security": WzdWlanHelpRpm.s_0,
	"no_sec": QsMultissidHelpRpm.no_sec,
	/*"wep_0":WlanSecurityHelpRpm.wep_0,*/
	"wep_0":"<B>Segurança(WEP)</B>",
	"auth_type":WlanSecurityHelpRpm.auth_type,
	"auto_1":WlanSecurityHelpRpm.auto_1,
	"open_syst":WlanSecurityHelpRpm.open_syst,
	"shar_key":WlanSecurityHelpRpm.shar_key,
	"format":WlanSecurityHelpRpm.format,
	"settings":WlanSecurityHelpRpm.settings,
	"key_type":WlanSecurityHelpRpm.key_type,
	"bit":WlanSecurityHelpRpm.bit,
	"bit_0":WlanSecurityHelpRpm.bit_0,
	/*bit1 modify the WlanSecurityHelpRpm.bit_0 152 and 32*/
	"bit_1":"Para criptografia <B>152-bit</B> - Você pode inserir 32 dígitos hexadecimais (qualquer combinação de 0-9, a- f , A- F, e a chave nula não é permitida) ou 13 caracteres ASCII.",
	"wpa_0":"Mais Seguro((WPA/WPA2-PSK)",
	"version":WlanSecurityHelpRpm.version,
	"auto":WlanSecurityHelpRpm.auto,
	"wpa_psk":WlanSecurityHelpRpm.wpa_psk,
	"wpa2_psk":WlanSecurityHelpRpm.wpa2_psk,
	"encryption":WlanSecurityHelpRpm.encryption,
	"psk_pass":WlanSecurityHelpRpm.psk_pass,
	"update":WlanSecurityHelpRpm.update_0,
	"not_change":"<B>Não Alterar</B> - Caso escolha esta opção, sua configuração de segurança wireless não será alterada.</P>"
};
var IPTVHelp = 
{
	"header": "Ajuda com Configurações IPTV",
	"brief": "Nesta página você pode configurar recursos relacionados com IPTV.",
	"igmp_snoop": "<B>IGMP Snooping</b> - O IGMP snooping foi projetado para impedir que os hosts em uma rede local recebam tráfego de um grupo de multicast que não tenham se associado explicitamente. O IGMP snooping é especialmente útil para aplicações multicast IP intensivas em largura de banda, como a IPTV.",
	"igmp_proxy": "<b>IGMP Proxy</b> - Selecione para habilitar IGMP Proxy.",
	"igmp_version": "<b>Versão IGMP</b> - Selecione a versão IGMP Proxy (Internet Group Management Protocol), sendo V2 ou V3, de acordo com seu provedor.",
	"iptv_enable": "<B>IPTV</B> - Selecione para habilitar a função IPTV.",
	"iptv_mode": "<B>Modo</B> - Selecione o modo apropriado de acordo com o seu provedor.",
	"lan": "<B>LAN 1/2/3/4</B> - Atribua a sua porta LAN para funcionar como fornecedor de Internet ou como fornecedor de IPTV."
};
var Wan6DisabledCfgHelpRpm = 
{
   "header": "Ajuda com WAN IPv6",
   "brief": "<B>Tipo de Conexão WAN:</B>",
   "s_0": "Escolha o tipo de conexão WAN correta de acordo com a tipologia do seu provedor.",
   "dhcpv": "<B>DHCPv6</B> - Conexões que utilizam atribuição de endereço IPv6 dinâmico.",
   "stat_ipv": "<B>IPv6 Estático</B> - Conexões que utilizam atribuição de endereço IPv6 estático.",
   "pppoev": "<B>PPPoEv6</B> - Conexões que utilizam PPPoEv6nque requerem um nome de usuário e senha.",
   "tunn_6to": "<B>Túnel 6 para 4</B> - Conexões que utilizam atribuições de endereço 6 para 4.",
   "save": "Clique em <B>Salvar</B> para manter as alterações.",
   "wan_disabled": "<B>Desabilitado</B> - Desativar todas as conexões IPv6."
};
var PingWatchDogHelpRpm =
{
    "header": "Ajuda sobre Ping Watch Dog",
    "brief": "O <B>Ping Watch Dog</B> é dedicado ao monitoramento contínuo de uma conexão específica para host remoto utilizando a ferramenta Ping. Ele permite o dispositivo fazer pings continuamente de endereço IP definido pelo usuário (podendo ser o gateway de Internet, por exemplo). Caso seja impossível de fazer ping sobre as restrições definidas pelo usuário, o dispositivo irá automaticamente reiniciar.",
    "switch": "<B>Switch</B> - Habilitar/Desabilitar Ping Watch Dog.",
    "ip": "<B>Endereço IP</B> - O endereço IP do host de destino onde o utilitário Ping Watch Dog  está enviando pacotes de ping.",
    "interval": "<B>Intervalo</B>- Tempo de intervalo entre dois pacotes ping que são enviados continuamente.",
    "delay": "<B>Atraso</B> - Tempo de atraso antes do primeiro pacote de ping ser enviado quando o dispositivo é reiniciado.",
    "failcount": "<B>Falha na Contagem</B> - O limite superior do pacote de ping deste dispositivo pode cair continuamente. Caso este valor for excedido, este dispositivo será reiniciado automaticamente.",
	"save": "Não esqueça de clicar no botão <B>Salvar</B> para fazer com que as configurações fiquem ativas."		
};
var SnmpHelpRpm = 
{
    "header": "Ajuda com Configurações SNMP",
    "brief": "SNMP (Simple Network Management Protocol) é um protocolo popular de monitoramento e gerenciamento de rede. ", 		
	"agent": "<B>Agente SNMP</B> - Escolha <B>Habilitar</B> para abrir esta função caso queira controle remoto através do agente SNMPv1/v2 com MIB-II. Escolha <B>Desabilitar</B> para fechar esta função.",
	"contact": "<B>SysContact</B> - A identificação textual do contato pessoal para este nó gerenciável.",
	"name": "<B>SysName</B> - Um nome administrativamente atribuído para este nó gerenciado.",
	"desc": "<B>SysDescription</B> - As informações de versão do software para este nó gerenciado.",
	"location": "<B>SysLocation</B> - A localização física deste nó.",
	"note1": "<B>Aviso:</B> Especificando um destes valores através do Utilitário Via Web do Dispositivo  torna o objeto correspondente somente leitura. Se não houver tal opção de configuração, em seguida, o pedido terá sucesso (supondo que as configurações de controle de acesso estão adequadas), mas o novo valor seria esquecido da próxima vez que o agente foi reiniciado.",	
	"getcomm": "<B>Obter Comunidade<B> - Digite o nome da comunidade que permite o acesso somente leitura à informação SNMP deste dispositivo. O nome de comunidade pode ser considerado uma senha de grupo. A configuração padrão é <B>Pública</B>.",
	"getsour": "<b>Obter</b> - Define o endereço IP ou sub-rede para sistemas de gerenciamento que podem ler informações deste dispositivo da comunidade 'get'.",
	"setcomm": "<B>Configurar Comunidade</B> - Digite o nome da comunidade que permite  leitura/gravação de acesso à informação SNMP deste dispositivo.  O nome de comunidade pode ser considerado uma senha de grupo. A configuração padrão é <B>privada</B>.",
	"setsour": "<B>Ajustar Fonte</B> - Define o endereço IP ou sub-rede para sistemas de gerenciamento que podem controlar esta comunidade de dispositivos.",
	"note2": "<B>Aviso:</B> Uma fonte restrita pode ser um endereço IP específico (por exemplo, 10.10.10.1), ou uma sub-rede - representada como IP/BITS (por exemplo 10.10.10.0/24). Caso um endereço IP de valor 0.0.0.0 seja inserido, o agente irá aceitar todas as solicitações sob o nome correspondente.",
	"save": "Clique em <B>Salvar</B> para manter as alterações."
}; 
var ledControlHelp = {
    header: "Controle do LED",
    brief: "O Controle de LED permite ligar ou desligar os LEDs de acordo com um agendamento específico.",
	night_mode: "<b>Modo Noturno</b> - Indica se o modo noturno está ligado (ativado) ou desativado (desativado).",
    off_time: "<b>Horário de Desligamento de LED</b> - Selecione o horário para desligar os LEDs."
};
var languageHelp = {
    header: "Ajuda com Idioma",
    brief: "Selecione o idioma que preferir da lista flutuante.",
};
var ManageCtrl_h = 
{
   "header": "Ajuda com Controle de Gerenciamento",
   "userstatus": "<B>Status do Usuário</B>",
   "routerinfo": "Informação do Roteador: Tipo de Usuário, Nome de Usuário, Endereço IP Host, e Endereço MAC Host",
   "manageAccount": "<b>Gerenciamento de Conta</b>",
   "password_brief": "É altamente recomendável que você altere seu nome de usuário e senha padrões de fábrica do Roteador. Todos os usuários que tentarem acessar o utilitário web do Roteador serão solicitados a fornecer o nome de usuário e senha do Roteador.",
   "password_note": "<strong>Aviso</strong>: O novo nome de usuário e senha não pode exceder 32 caracteres em tamanho e não podem incluir espaços. Insira a nova Senha duas vezes e confirme.",
   "serviceConfig": "<B>Configuração de Serviço</B>",
   "locale_manage": "Gerenciamento Local",
   "remote_manage": "Gerenciamento Remoto",
   "l_brief": "Esta página permite-lhe negar acesso de computadores LAN ao roteador.",
   "r_brief": "Esta função permite-lhe gerenciar seu roteador de uma localização remota via Internet.",
   "management": "<B>Porta</B> - O navegador de acesso web normalmente utiliza como padrão o serviço HTTP(HTTPS) de porta 80(443). O padrão da porta do roteador para gerenciamento remoto via web é 80. Para uma segurança melhor, você pode alterar este valor inserindo um número que preferir na caixa fornecida. Escolha um valor entre 1024 e 65535 mas não utilize nenhum número de uma porta de serviço comum.",
   "management_0": "<B>Host Disponível (IP/MAC)</B> - Este é o endereço atual que você utilizará quando acessar seu Roteador pela Internet. ",
   "s_0": "Para acessar o roteador, você deve digitar o endereço IP da WAN do Roteador no navegador (no IE) ou local (no Netscape), seguido por dois pontos e pelo número da porta personalizada definida na caixa Web Management Port. Por exemplo, caso o endereço WAN do Roteador seja 202.96.12.8 e você utiliza a porta de número 8080, insira http://202.96.12.8:8080 no seu navegador. Você será solicitado a inserir a senha do Roteador. Depois de inserir a senha com sucesso, você poderá acessar o utilitário web do Roteador.",
   "note1": "<B>Nota:</B>",
   "s_1": "Certifique-se de alterar a senha padrão do roteador para uma senha segura.",
   "virt_server": "Se a porta da página de gerenciamento conflitar com a utilizada para a entrada do <b>Servidor Virtual</b>, ela será automaticamente desabilitada após a configuração ser salva.",
   "certnote": "<B>Certificado</B>",
   "cert_brief": "Um arquivo que fornece informações de autenticação. Baixe e instale o certificado para Gerenciamento Local/Remoto via HTTPS se você precisar. Uma vez que o certificado está instalado, os avisos não aparecerão quando você acessar o roteador via HTTPS.",
   "note": "<B>Nota:</B>",
   "Cert_note": "Para o guia completo, consulte o Guia do Usuário na página de suporte do produto.",
   "save": "Clique no botão <strong>Salvar</strong>  ao finalizar."
};
var cwmp_h = 
{
	"header": "Configurações CWMP",
	"brief": "CWMP (CPE WAN Management Protocol, também chamado TR-069) permite ao Servidor de Autoconfiguração (ACS) realizar autoconfiguração, fornecimento, conexão e diagnóstico para este dispositivo.Você pode configurar esta função sob as instruções do seu ISP.",
	"cwmp": "<B>CWMP</B> - Ativar ou desativar o recurso CWMP (CPE WAN Management Protocol).",
	"inform": "<B>Informação</B> - Active esta funcionalidade para enviar uma mensagem Inform ao ACS (Servidor de Configuração Automática) periodicamente.",
	"inform_interval": "<B>Intervalo de informação</B> - Indique o tempo em segundos em que a mensagem Inform será enviada ao ACS.",
	"acs_url": "<B>ACS URL</B> - Introduza o endereço web do ACS que é fornecido pelo seu ISP.",
	"acs_name_pwd": "<B>Nome de usuário/senha do ACS</B> - Indique o nome de usuário e a senha para se conectar ao servidor ACS.",
	"interface": "<B>Interface utilizada pelo cliente TR-069</B> - Seleccione qual interface ser usada pelo cliente TR-069.",
	"soap_msg": "<B>Exibir mensagens SOAP no console serial</B> - Conmuta para habilitar ou desactivar esta funcionalidade.",
	"conn_req_auth": "<B>Autenticação de Solicitação de Conexão</B> - Seleccione esta caixa para permitir a autenticação do pedido de conexão.",
	"conn_name_pwd": "<B>Usuário senha</B> - Indique o nome de usuário e a senha para o servidor ACS se registar no router.",
	"path_port_url": "<B>Caminho/Porta/URL</B> - Introduza o caminho, o porto e o URL do servidor ACS para se conectar ao roteiro.",
	"rpc_method": "<B>Obter Métodos RPC</B> - Clique para obter os métodos de suporte do CWMP."	
};
var name_str =
{
	"AccessCtrlAccessRulesAdvHelpRpm": AccessCtrlAccessRulesAdvHelpRpm,
	"AccessCtrlAccessRulesHelpRpm": AccessCtrlAccessRulesHelpRpm,
	"AccessCtrlAccessTargetsAdvHelpRpm": AccessCtrlAccessTargetsAdvHelpRpm,
	"AccessCtrlAccessTargetsHelpRpm": AccessCtrlAccessTargetsHelpRpm,
	"AccessCtrlHostsListsAdvHelpRpm": AccessCtrlHostsListsAdvHelpRpm,
	"AccessCtrlHostsListsHelpRpm": AccessCtrlHostsListsHelpRpm,
	"AccessCtrlTimeSchedAdvHelpRpm": AccessCtrlTimeSchedAdvHelpRpm,
	"AccessCtrlTimeSchedHelpRpm": AccessCtrlTimeSchedHelpRpm,
	"AssignedIpAddrListHelpRpm": AssignedIpAddrListHelpRpm,
	"BackNRestoreHelpRpm": BackNRestoreHelpRpm,
	"BasicSecurityHelpRpm": BasicSecurityHelpRpm,
	"BpaCfgHelpRpm": BpaCfgHelpRpm,
	"ChangeLoginPwdHelpRpm": ChangeLoginPwdHelpRpm,
	"DateTimeCfgHelpRpm": DateTimeCfgHelpRpm,
	"DdnsAddComexeHelpRpm": DdnsAddComexeHelpRpm,
	"DiagHelp": DiagHelp,
	"DMZHelpRpm": DMZHelpRpm,
	"DualBandSelectionHelpRpm": DualBandSelectionHelpRpm,
	"DynDdnsHelpRpm": DynDdnsHelpRpm,
	"FixMapCfgHelpRpm": FixMapCfgHelpRpm,
	"YandexDnsHelpRpm": YandexDnsHelpRpm,
	"GuestNetUsbCfgHelpRpm": GuestNetUsbCfgHelpRpm,
	"GuestNetWirelessCfgHelpRpm": GuestNetWirelessCfgHelpRpm,
	"IPv6LanHelp": IPv6LanHelp,
	"IPv6StatusHelpRpm": IPv6StatusHelpRpm,
	"IPv6TunnelHelp": IPv6TunnelHelp,
	"L2tpCfgHelpRpm": L2tpCfgHelpRpm,
	"LanArpBindingHelpRpm": LanArpBindingHelpRpm,
	"LanArpBindingListHelpRpm": LanArpBindingListHelpRpm,
	"LanDhcpServerHelpRpm": LanDhcpServerHelpRpm,
	"LanDhcpServerHelpRpm_AP": LanDhcpServerHelpRpm_AP,
	"LocalManageControlHelpRpm": LocalManageControlHelpRpm,
	"MacCloneCfgHelpRpm": MacCloneCfgHelpRpm,
	"ManageControlHelpRpm": ManageControlHelpRpm,
	"MediaServerCfgHelpRpm": MediaServerCfgHelpRpm,
	"MiscHelpRpm": MiscHelpRpm,
	"NasCfgHelpRpm": NasCfgHelpRpm,
	"NasFtpCfgHelpRpm": NasFtpCfgHelpRpm,
	"NasUserCfgHelpRpm": NasUserCfgHelpRpm,
	"NatStatusCfgHelpRpm": NatStatusCfgHelpRpm,
	"NetworkCfgHelpRpm": NetworkCfgHelpRpm,
	"NetworkCfgHelpRpm_AP": NetworkCfgHelpRpm_AP,
	"NoipDdnsHelpRpm": NoipDdnsHelpRpm,
	"ParentCtrlAdvHelpRpm": ParentCtrlAdvHelpRpm,
	"ParentCtrlHelpRpm": ParentCtrlHelpRpm,
	"PingHelpRpm": PingHelpRpm,
	"PingWatchDogHelpRpm": PingWatchDogHelpRpm,
	"PPPoECfgHelpRpm": PPPoECfgHelpRpm,
	"PPPoEv6CfgHelpRpm": PPPoEv6CfgHelpRpm,
	"PptpCfgHelpRpm": PptpCfgHelpRpm,
	"PrintServerCfgHelpRpm": PrintServerCfgHelpRpm,
	"QoSCfgHelpRpm": QoSCfgHelpRpm,
	"QoSRuleCfgHelpRpm": QoSRuleCfgHelpRpm,
	"QoSRuleListHelpRpm": QoSRuleListHelpRpm,
	"RestoreDefaultCfgHelpRpm": RestoreDefaultCfgHelpRpm,
	"SiteSurveyHelpRpm": SiteSurveyHelpRpm,
	"SnmpHelpRpm": SnmpHelpRpm,
	"SoftwareUpgradeHelpRpm": SoftwareUpgradeHelpRpm,
	"SpecialAppHelpRpm": SpecialAppHelpRpm,
	"StaticRouteTableHelpRpm": StaticRouteTableHelpRpm,
	"StatusHelpRpm": StatusHelpRpm,
	"StatusHelpRpm_AP": StatusHelpRpm_AP,
	"StatusHelpRpm_Client": StatusHelpRpm_AP,
	"StatusHelpRpm_Repeater": StatusHelpRpm_AP,	
	"SysRebootHelpRpm": SysRebootHelpRpm,
	"SysRouteTableHelpRpm": SysRouteTableHelpRpm,
	"SystemLogHelpRpm": SystemLogHelpRpm,
	"SystemStatisticHelpRpm": SystemStatisticHelpRpm,
	"UpnpCfgHelpRpm": UpnpCfgHelpRpm,
	"UsbAccountHelp": UsbAccountHelp,
	"UsbDlnaHelp": UsbDlnaHelp,
	"UsbFtpHelp": UsbFtpHelp,
	"UsbMassHelp": UsbMassHelp,
	"UsbSharingHelp": UsbSharingHelp,
	"Usb3gHelpRpm": Usb3gHelpRpm,
	"Usb3gModemListHelpRpm": Usb3gModemListHelpRpm,
	"VirtualServerHelpRpm": VirtualServerHelpRpm,
	"Wan6to4TunnelCfgHelpRpm": Wan6to4TunnelCfgHelpRpm,
	"WanDynamicIpCfgHelpRpm": WanDynamicIpCfgHelpRpm,
	"WanDynamicIpV6CfgHelpRpm": WanDynamicIpV6CfgHelpRpm,
	"WanStaticIpCfgHelpRpm": WanStaticIpCfgHelpRpm,
	"WanStaticIpV6CfgHelpRpm": WanStaticIpV6CfgHelpRpm,
	"WlanAdvHelpRpm": WlanAdvHelpRpm,
	"WlanAdvHelpRpm_AP": WlanAdvHelpRpm_AP,
	"WlanMacFilterHelpRpm": WlanMacFilterHelpRpm,
	"WlanNetworkHelpRpm": WlanNetworkHelpRpm,
	"WlanNetworkHelpRpm_AP": WlanNetworkHelpRpm_AP,
	"WlanNetworkHelpRpm_MSSID": WlanNetworkHelpRpm_MSSID,	
	"WlanNetworkHelpRpm_RE": WlanNetworkHelpRpm_RE,
	"WlanConnectHelpRpm": WlanConnectHelpRpm,
	"WlanExtenderHelpRpm": WlanExtenderHelpRpm,
	"WlanSecurityHelpRpm": WlanSecurityHelpRpm,
	"WlanStationHelpRpm": WlanStationHelpRpm,
	"WlanThroughputHelpRpm": WlanThroughputHelpRpm,	
	"WlanWpsChkModeHelpRpm": WlanWpsChkModeHelpRpm,
	"WlanWpsHelpRpm": WlanWpsHelpRpm,
	"WlanWpsHelpRpm_AP": WlanWpsHelpRpm_AP,	
	"WzdAccessCtrlHostAddHelpRpm": WzdAccessCtrlHostAddHelpRpm,
	"WzdAccessCtrlRuleAddHelpRpm": WzdAccessCtrlRuleAddHelpRpm,
	"WzdAccessCtrlSchedAddHelpRpm": WzdAccessCtrlSchedAddHelpRpm,
	"WzdAccessCtrlTargetAddHelpRpm": WzdAccessCtrlTargetAddHelpRpm,
	"WzdConfirmHelpRpm": WzdConfirmHelpRpm,
	"WzdFinishHelpRpm": WzdFinishHelpRpm,
	"WzdL2TPHelpRpm": WzdL2TPHelpRpm,
	"WzdPPPoEHelpRpm": WzdPPPoEHelpRpm,
	"WzdPPTPHelpRpm": WzdPPTPHelpRpm,
	"WzdStartHelpRpm": WzdStartHelpRpm,
	"WzdStaticIpHelpRpm": WzdStaticIpHelpRpm,
	"WzdWanMACHelpRpm": WzdWanMACHelpRpm,
	"WzdWanTypeHelpRpm": WzdWanTypeHelpRpm,
	"WzdWlanHelpRpm": WzdWlanHelpRpm,
	"WzdWlanHelpRpm_AP": WzdWlanHelpRpm_AP,
	"QsChangeLoginPwdHelpRpm": QsChangeLoginPwdHelpRpm,
	"QsLanApHelpRpm": QsLanApHelpRpm,
	"QsModeHelpRpm": QsModeHelpRpm,
	"QsMultissidHelpRpm": QsMultissidHelpRpm,
	"QsReviewHelpRpm": QsReviewHelpRpm,
	"QsWlClientHelpRpm": QsWlClientHelpRpm,
	"QsWlScanClientHelpRpm": QsWlScanClientHelpRpm,
	"IPTVHelp": IPTVHelp,
	"Wan6DisabledCfgHelpRpm" : Wan6DisabledCfgHelpRpm,
	"ledControlHelp": ledControlHelp,
	"ManageCtrl_h": ManageCtrl_h,
	"languageHelp": languageHelp,
	"cwmp_h": cwmp_h
};

