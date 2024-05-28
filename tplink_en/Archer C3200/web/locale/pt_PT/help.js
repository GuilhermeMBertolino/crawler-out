(function($) {

    $.helpContent = {
        trafficCtrl: {
            TITLE: "Controlo de largura de banda",
            CONTENT: [{
                type: "paragraph",
                content: "O controlo de largura de banda permite-lhe configurar as Larguras de banda da rede de Transferência e Carregamento e a taxa de transferência combinada não deve exceder 1 000 000 Kbps. Para um controlo ideal da largura de banda, selecione o Tipo de Linha correto e consulte o seu ISP para obter a largura de banda total permitida para fluxo de transferência e carregamento."
            }, {
                type: "name",
                title: "Ativar",
                content: "Marque a caixa de seleção para ativar a funcionalidade de Controlo de Largura de banda."
            }, {
                type: "name",
                title: "Largura de banda total de Carregamento ",
                content: "Introduza velocidade total de carregamento através da porta WAN."
            }, {
                type: "name",
                title: "Largura de banda total de Transferência",
                content: "Introduza a velocidade de transferência através da porta WAN."
            }, {
                type: "title",
                content: "Controlo das Regras"
            }, {
                type: "name",
                title: "Descrição",
                content: "Exibe o intervalo IP controlado ou o intervalo de portas."
            }, {
                type: "name",
                title: "Prioridade",
                content: "Exibe o nível de prioridade da regra, onde 1 é o nível de prioridade mais alto e 8 é o nível de prioridade mais baixo. O total de largura de banda de carregamento e de transferência será alocado para garantir a taxa mínima de todas as regras de controlo de largura de banda."
            }, {
                type: "name",
                title: "Carregamento (mín/máx) ",
                content: "Exibe a mínima e a máxima largura de banda de carregamento em Kbps."
            }, {
                type: "name",
                title: "Transferência (mín/máx)",
                content: "Exibe a mínima e a máxima largura de banda para transferência em Kbps."
            }, {
                type: "name",
                title: "Ativar",
                content: "Indica o estado atual de uma regra Clique no ícone Lâmpada para ativar ou desativar a regra."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para Modificar ou Eliminar a regra correspondente."
            }, {
                type: "note",
                title: "Para adicionar uma nova regra",
                content: [
                    "Clique em Adicionar. ",
                    "Introduza um intervalo de endereços IP para ser controlado.",
                    "Introduza um intervalo de números de porta para ser controlado.",
                    "Selecione o tipo de protocolo para esta regra.",
                    "Selecione o nível de prioridade para esta regra. (1 é o nível de prioridade mais alto).",
                    "Introduza a largura de banda mínima e a máxima para carregamento (em Kbps) através da porta WAN.",
                    "Introduza a mínima e a máxima largura de banda para download (em Kbps) através da porta WAN.",
                    "Selecione Ativar esta entrada.",
                    "Clique em OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar várias regras</strong><br>Na lista Controlo de Regras, marque a caixa de seleção correspondente das regras a serem eliminadas e clique em Eliminar acima da tabela."
            }]
        },
        accessControl: {
            TITLE: "Controlo de Acesso",
            CONTENT: [{
                type: "paragraph",
                content: "O Controlo de Acesso é usado para bloquear o acesso a computadores e a outros específicos à sua rede. Quando um dispositivo é bloqueado, ele é capaz de obter um endereço IP do router, mas não consegue comunicar com outros dispositivos ou ligar à Internet. "
            }, {
                type: "paragraph",
                content: "<strong>Observação:</strong>Para usar o Controlo de Acesso, ative esta funcionalidade e siga os passos indicados no Guia de Aplicação. Se o Controle de Acesso estiver desativado (Off), todos os dispositivos podem aceder à sua rede, incluindo os da lista negra."
            }, {
                type: "name",
                title: "Controlo de Acesso",
                content: "Ativar para permitir a funcionalidade Controle de Acesso."
            }, {
                type: "title",
                content: "Modo de Acesso"
            }, {
                type: "name",
                title: "Lista negra",
                content: "Selecione para bloquear o acesso a partir de dispositivos na lista abaixo."
            }, {
                type: "name",
                title: "Lista branca",
                content: "Selecione para permitir o acesso apenas a partir de dispositivos na lista abaixo."
            }, {
                type: "title",
                content: "Dispositivos na lista Negra/Branca"
            }, {
                type: "note",
                title: "<strong>Para colocar na lista negra ou na lista branca um dispositivo</strong>",
                content: [
                    "Clique no ícone Adicionar .",
                    "Introduza o Nome do dispositivo.",
                    "Introduza o endereço MAC do dispositivo.",
                    "Clique em OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar ou eliminar um dispositivo na Lista negra/branca</strong><br>Na tabela Lista negra/branca, clique no ícone Editar ou no ícone de Reciclagem que corresponde ao dispositivo que pretende modificar ou eliminar."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar vários dispositivos na Lista negra/branca</strong><br>Na tabela Lista negra/branca, selecione todos os dispositivos que pretende eliminar, clique em Eliminar acima da tabela."
            }, {
                type: "title",
                content: "Dispositivos on-line"
            }, {
                type: "name",
                title: "Nome do dispositivo",
                content: "Exibe o nome do dispositivo ligado."
            }, {
                type: "name",
                title: "Endereço IP",
                content: "Exibe o endereço IP do dispositivo ligado."
            }, {
                type: "name",
                title: "Endereço MAC",
                content: "Exibe o endereço MAC do dispositivo ligado."
            }, {
                type: "name",
                title: "Tipo de ligação",
                content: "Exibe o tipo de ligação do dispositivo ligado com ou sem fios. "
            }, {
                type: "paragraph",
                content: "<strong>Para bloquear um ou vários dispositivos</strong><br>Na tabela Dispositivos on-line, selecione os dispositivos que pretende bloquear, clique em Bloquear acima da tabela. Os dispositivos selecionados serão automaticamente adicionados aos Dispositivos na Lista negra."
            }]
        },
        arpBind: {
            TITLE: "Definições",
            CONTENT: [{
                type: "paragraph",
                content: "Enlace IP & MAC (também conhecido como Enlace ARP) é útil para controlar o acesso de um computador específico na LAN enlaçando o endereço IP e o endereço MAC do dispositivo juntos. O enlace IP & MAC também evita que outros dispositivos usem um endereço IP específico."
            }, {
                type: "name",
                title: "Enlace IP & MAC",
                content: "Ligue para ativar a funcionalidade de Enlace IP & MAC."
            }, {
                type: "title",
                title: "Lista de Enlace"
            }, {
                type: "note",
                title: "<strong>Para configurar um dispositivo com enlace ARP</strong>",
                content: [
                    "Clique em Adicionar.",
                    "Introduza o endereço MAC do dispositivo.",
                    "Introduza um endereço IP que pretende enlaçar ao endereço MAC acima.",
                    "Selecione Ativar.",
                    "Clique em OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar ou eliminar uma entrada</strong><br>Na Lista de Enlace, clique no ícone Editar ou no ícone Reciclagem que corresponde à entrada que pretende modificar ou eliminar."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar as entradas múltiplas</strong><br>Na Lista de Enlace, selecione as entradas que pretende eliminar e clique em Eliminar acima da tabela."
            }, {
                type: "title",
                title: "Lista de ARP"
            }, {
                type: "paragraph",
                content: "Exibe os endereços MAC e IP dos dispositivos ligados atualmente."
            }, {
                type: "name",
                title: "Nome do dispositivo",
                content: "Exibe o nome do dispositivo ligado."
            }, {
                type: "name",
                title: "Endereço MAC",
                content: "Exibe o endereço MAC do dispositivo ligado."
            }, {
                type: "name",
                title: "Endereço IP",
                content: "Exibe o endereço IP atribuído ao dispositivo ligado."
            }, {
                type: "name",
                title: "Vinculado",
                content: "Indica se os endereços MAC e IP estão ou não vinculados."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para Eliminar a entrada correspondente a partir da lista."
            }, {
                type: "paragraph",
                content: "<strong>Observação: </strong>Não pode enlaçar o mesmo endereço IP para mais do que um endereço MAC."
            }, {
                type: "paragraph",
                content: "<strong>Para enlaçar vários dispositivos</strong><br>Na lista de ARP, selecione os dispositivos a que pretende enlaçar os seus endereços IP para aos seus endereços MAC, clique em Enlaçar acima da tabela."
            }]
        },
        alg: {
            TITLE: "Gateway de Camada de Aplicação (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "O ALG permite aos filtros transversais de Tradução de Endereços de Rede (NAT) ser ligados dentro do gateway para suportar a tradução do endereço e da porta para determinados protocolos de “controlo/dados da camada de aplicação: FTP, TFTP, H323 etc. É recomendada a ativação do ALG."
            }, {
                type: "name",
                title: "Passagem PPTP",
                content: "Marque a caixa de seleção para ativar a funcionalidade Passagem PPTP para permitir que as sessões Ponto a Ponto sejam encapsuladas através de uma rede IP e passadas através do router."
            }, {
                type: "name",
                title: "Passagem L2TP",
                content: "Marque a caixa de seleção para ativar a funcionalidade Passagem L2TP para permitir que as sessões Ponto a Ponto da Camada 2 sejam encapsuladas através de uma rede IP e passadas através do router."
            }, {
                type: "name",
                title: "Passagem IPSec",
                content: "Marque a caixa de seleção para ativar a funcionalidade Passagem IPSec para permitir que a Segurança do Protocolo (IPSec) seja encapsulada através de uma rede IP e passada através do router. A IPSec usa os serviços de segurança criptográfica para garantir comunicações privadas e seguras através de redes IP."
            }, {
                type: "name",
                title: "ALG FTP",
                content: "Marque a caixa de seleção para ativar a funcionalidade ALG FTP para permitir que os clientes e servidores FTP (File Transfer Protocol- Protocolo de Transferência de Ficheiros) transfiram dados através de NAT."
            }, {
                type: "name",
                title: "ALG TFTP",
                content: "Marque a caixa de seleção para ativar a funcionalidade ALG TFTP para permitir que os clientes e servidores FTP (Trivial File Transfer Protocol- Protocolo de Transferência de Ficheiros Trivial) transfiram dados através de NAT."
            }, {
                type: "name",
                title: "ALG RTSP",
                content: "Se selecionado, permite que os clientes de leitor de multimédia comuniquem com servidores de transmissão de multimédia em sequência através de NAT."
            }, {
                type: "name",
                title: "ALG H323",
                content: "Marque a caixa de seleção para ativar a funcionalidade ALG H323 para permitir que os clientes Microsoft NetMeeting comuniquem através de NAT."
            }, {
                type: "name",
                title: "ALG SIP",
                content: "Marque a caixa de seleção para ativar a funcionalidade ALG SIP para permitir que clientes e servidores SIP transfiram dados através de NAT."
            }, {
                type: "name",
                title: "Guardar",
                content: "Clique para guardar todas as suas definições."
            }]
        },
        virtualServer: {
            TITLE: "Servidores virtuais",
            CONTENT: [{
                type: "paragraph",
                content: "Os Servidores virtuais são usados para configurar serviços públicos na sua rede local. Um servidor virtual é definido como uma porta externa e todos os pedidos da Internet para esta porta externa serão redirecionados para um computador designado, que deve estar configurada com um endereço IP estático ou reservado."
            }, {
                type: "name",
                title: "Tipo de serviço",
                content: " Exibe o nome do seu servidor virtual."
            }, {
                type: "name",
                title: "Porta externa",
                content: "Exibe o número da porta ou um intervalo de portas usadas pelo servidor virtual. "
            }, {
                type: "name",
                title: "IP interno",
                content: "Exibe o endereço IP do computador que está a executar a aplicação do serviço."
            }, {
                type: "name",
                title: "Porta interna",
                content: "Exibe o número da porta do computador que está executar a aplicação de serviço."
            }, {
                type: "name",
                title: "Protocolo",
                content: "Exibe o protocolo usado para a aplicação do serviço: TCP, UDP, ou Todos (Todos os protocolos suportados pelo router)."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica o estado atual de um servidor virtual. Clique no ícone Lâmpada para ativar (ou desativar) a entrada do servidor virtual."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para Modificar ou Eliminar a regra correspondente."
            }, {
                type: "note",
                title: "<strong>Para adicionar uma entrada de servidor virtual</strong>",
                content: [
                    "Clique em Adicionar.",
                    "Selecione um nome de interface a partir da lista suspensa.",
                    "Clique em Ver Aplicações Existentes para selecionar um serviço a partir da lista para preencher automaticamente o número da porta apropriada nos campos de Porta externa e Porta interna. Se o serviço não estiver listado, introduza o número da porta externa (por ex., 21) ou um intervalo de portas (por ex., 21-25). Deixe a Porta interna em branco se for a mesma que a Porta externa ou introduza um número de porta específico (por ex., 21) se a Porta externa for uma porta única. ",
                    "Introduza o endereço IP do computador que está a executar a aplicação do serviço no formato de notação decimal pontuada no campo o IP interno.",
                    "Selecione um protocolo para a aplicação do serviço: TCP, UDP, ou Todos a partir da lista suspensa Protocolo.",
                    "Selecione Ativar esta entrada.",
                    "Clique em OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar ou eliminar uma entrada de servidor virtual</strong><br>Clique no ícone Editar ou Reciclagem da entrada correspondente."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar as entradas múltiplas</strong><br>Selecione todas as entradas do servidor virtual que que pretende eliminar, clique em Eliminar acima da tabela."
            }, {
                type: "paragraph",
                content: "<strong>Observação:</strong><br>Se o seu dispositivo anfitrião local estiver a alojar mais do que um tipo de serviços disponíveis, precisa de criar um servidor virtual para cada serviço."
            }]
        },
        portTrigger: {
            TITLE: "Acionamento de portas",
            CONTENT: [{
                type: "paragraph",
                content: "O Acionamento de portas é usado para reencaminhar o tráfego numa determinada porta para um servidor específico na rede.  "
            }, {
                type: "name",
                title: "Aplicação",
                content: "Exibe o nome da aplicação."
            }, {
                type: "name",
                title: "Porta de acionamento",
                content: "Exibe a porta do tráfego de saída porta usada para acionar uma regra de filtragem de uma ligação de saída."
            }, {
                type: "name",
                title: "Protocolo de acionamento",
                content: "Exibe o protocolo usado para a Porta de acionamento: TCP, UDP, ou Todos (Todos os protocolos suportados pelo router)."
            }, {
                type: "name",
                title: "Porta externa",
                content: "Exibe a porta ou o intervalo de portas usado pelo sistema remoto. Uma resposta que usa uma destas portas será reencaminhada para o PC que aciona esta regra. Pode introduzir no máximo 5 grupos de portas (ou secções de porta). Cada grupo de portas deve estar separado por uma vírgula, por exemplo, 2000-2038, 2050-2051, 2046, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Protocolo externo",
                content: "Exibe o protocolo usado para a Porta de entrada: TCP, UDP, ou Todos (todos os protocolos suportados pelo router)."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica o estado atual de uma entrada de acionamento de portas. Clique no ícone Lâmpada para ativar (ou desativar) a entrada."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para Modificar ou Eliminar a entrada correspondente."
            }, {
                type: "note",
                title: "<strong>Para configurar uma entrada de acionamento da porta</strong><br><strong>Obsevação: </strong> Cada entrada pode apenas ser usada por um anfitrião de cada vez.",
                content: [
                    "Clique em Adicionar.",
                    "Selecione um nome de interface a partir da lista suspensa.",
                    "Clique em Ver Aplicações Existentes para selecionar uma aplicação a partir da lista para preencher automaticamente os valores predefinidos nos campos apropriados. Se pretender adicionar uma aplicação não listada, introduza manualmente a Aplicação, a Porta de acionamento, o Protocolo de acionamento, a Porta externa e o Protocolo externo.<br><strong>Observação: </strong> As entradas de acionamento de portas não podem ter qualquer sobreposição de intervalos de portas de outras (por ex., a Entrada 1 tem o intervalo de portas 4200-4205, o que significa que a Entrada 2 não pode ter o intervalo de portas 4203-4206).",
                    "Selecione Ativar esta entrada.",
                    "Clique em OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar ou eliminar uma entrada de acionamento de portas</strong><br>Na tabela, clique no ícone Editar ou no ícone Reciclagem que corresponde à entrada que pretende modificar ou eliminar."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar múltiplas entradas de acionamento de portas</strong><br>Na tabela, selecione todas as entradas que pretende eliminar e clique em Eliminar acima da tabela."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "A funcionalidade do anfitrião DMZ (Demilitarized Zone - Zona Desmilitarizada) permite que um anfitrião local seja exposto à Internet para um serviço de finalidade especial, como jogos pela Internet ou videoconferência. Basicamente, a DMZ permite que um único computador na sua LAN para abrir todas as suas portas. Este computador precisa de ser configurado com um endereço IP estático e ter a sua funcionalidade de cliente DHCP desativada."
            }, {
                type: "note",
                title: "<strong>Para atribuir a um computador ou a um servidor seja um servidor DMZ</strong>",
                content: [
                    "Selecione Ativar DMZ.",
                    "Introduza o endereço IP do computador local para ser o anfitrião DMZ.",
                    "Clique em Guardar."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Por predefinição, a funcionalidade Universal Plug-and-Play (UPnP) é ativada para permitir que dispositivos, como computadores e aparelhos de Internet, para descobrir automaticamente e comuniquem uns com os outros na rede local."
            }, {
                type: "name",
                title: "UPnP",
                content: "Ativar para permitir a funcionalidade UPnP."
            }, {
                type: "title",
                content: "Lista de Serviço UPnP"
            }, {
                type: "paragraph",
                content: "A Lista de Serviço UPnP exibe as informações do dispositivo UPnP."
            }, {
                type: "name",
                title: "Clientes totais",
                content: "Exibe o número total dos dispositivos UPnP."
            }, {
                type: "name",
                title: "Descrição do serviço",
                content: "Exibe uma descrição breve do anfitrião local que inicia o pedido de UPnP."
            }, {
                type: "name",
                title: "Porta externa",
                content: "Exibe a porta externa que é aberta pelo anfitrião local."
            }, {
                type: "name",
                title: "Protocolo",
                content: "Exibe o tipo de protocolo de rede que é usado pelo anfitrião local."
            }, {
                type: "name",
                title: "Endereço IP interno",
                content: "Exibe o endereço IP do anfitrião local."
            }, {
                type: "name",
                title: "Porta interna",
                content: "Exibe a porta interna que é aberta pelo anfitrião local."
            }, {
                type: "paragraph",
                content: "Clique em <strong>Atualizar</strong> para atualizar a Lista do Servidor UPnP."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Rede de Convidados",
            CONTENT: [{
                type: "paragraph",
                content: "A Rede de Convidados permite-lhe configurar uma rede Wi-Fi separadas com um nome de rede separado (SSID) e a palavra-passe que os seus convidados podem usar para aceder à Internet."
            }, {
                type: "title",
                content: "Definições"
            }, {
                type: "name",
                title: "Permitir que os convidados para ver uns aos outros",
                content: "Marque esta caixa de verificação para permitir que os dispositivos sem fios na Rede de Convidados comuniquem uns com os outros."
            }, {
                type: "name",
                title: "Permitir que os convidados acedam à minha rede local",
                content: "Marque esta caixa de verificação para permitir que os dispositivos sem fios na Rede de Convidados para aceder à sua rede local."
            }, {
                type: "name",
                title: "Guardar",
                content: "Clique para guardar todas as suas definições."
            }, {
                type: "title",
                content: "Definições da rede Wi-Fi"
            }, {
                type: "name",
                title: "Rede de Convidados 2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Clique no botão correspondente para ativar a Rede de Convidados 2,4GHz | 5GHz-1 | 5GHz-2"
            }, {
                type: "name",
                title: "SSID da Rede de Convidados",
                content: "Use o SSID predefinido ou crie um novo nome usando de 1 a 32 caracteres. Este campo é sensível a maiúsculas e minúsculas."
            }, {
                type: "name",
                title: "Segurança",
                content: "Selecione uma opção de segurança para a Rede de Convidados:",
                children: [{
                    type: "name",
                    title: " Nenhuma",
                    content: "Por predefinição, a segurança da Rede de Convidados é definida como Nenhuma; ninguém pode aceder."
                }, {
                    type: "name",
                    title: "WPA/WPA2 - Personal",
                    content: "Selecione esta opção para ativar o método de autenticação predefinido com base numa Chave Pré-partilhada - Pre-shared Key (PSK), também chamada frase de acesso. Se selecionado, configure o seguinte.",
                    children: [{
                        type: "name",
                        title: "Versão",
                        content: "Selecione uma versão de segurança para a sua Rede de Convidados.",
                        children: [{
                            type: "name",
                            title: "Automática",
                            content: "Esta opção suporta a implementação múltipla do WPA (Wi-Fi Protected Access - Acesso Protegido Wi-Fi) predefinido, como WPA e WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esta opção suporta a encriptação AES que fornece um melhor nível de segurança do que a WPA-PSK e é recomendada."
                        }]
                    }, {
                        type: "name",
                        title: "Encriptação",
                        content: "Selecione um tipo de encriptação de segurança: Automático (tanto para o TKIP e para o AES), TKIP (Temporal Key Integrity Protocol - Protocolo de Integridade de Chave Temporal) ou AES (Advanced Encryption Standard - Padrão de Encriptação Avançado). NÃO é recomendado usar a encriptação TKIP se o router opera em modo 802.11n, porque o TKIP não é suportado pela especificação 802.11n. Se o TKIP for selecionado, a função WPS será desativada."
                    }]
                }]
            }, {
                type: "name",
                title: "Palavra-passe",
                content: "Crie uma palavra-passe entre 8 e 63 caracteres ASCII ou entre 8 e 64 caracteres hexadecimais (0-9, a-f, A-F)."
            }, {
                type: "paragraph",
                content: "As instruções para a Rede de Convidados 2,4GHz acima também se aplicam aos 5GHz-1 | 5GHz-2 Rede de Convidados."
            }, {
                type: "name",
                title: "Guardar",
                content: "Clique para guardar todas as suas definições."
            }]
        },
        wirelessStat: {
            TITLE: "Dispositivos on-line",
            CONTENT: [{
                type: "name",
                title: "Endereço MAC",
                content: "Exibe o endereço MAC do cliente sem fios associado."
            }, {
                type: "name",
                title: "Tipo de ligação",
                content: "Exibe a banda de frequência (2,4GHz ou 5GHz) a que o cliente sem fios está ligado."
            }, {
                type: "name",
                title: "Segurança",
                content: "Exibe o tipo de segurança (Nenhum, WEP, WPA/WPA2-Personal ou WPA/WPA2-Enterprise) do cliente sem fios associado."
            }, {
                type: "name",
                title: "Pacotes recebidos",
                content: "Exibe o número de pacotes recebidos pelo cliente sem fios associado."
            }, {
                type: "name",
                title: "Pacotes enviados",
                content: "Exibe o número de pacotes enviados pelo cliente sem fios associado."
            }, {
				type: "name",
				title: "Taxa de transmissão",
				content: "Exibe a taxa dos últimos pacotes recebidos pelo cliente Wi-Fi associado."
			}, {
                type: "paragraph",
                content: "Clique em <strong>Atualizar</strong> para atualizar as informações nesta página."
            }]
        },
        wirelessAdv: {
            TITLE: "Definições avançadas",
            CONTENT: [{
                type: "name",
                title: "2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Selecione 2,4GHz | 5GHz-1 | 5GHz-2 para ajustar as suas definições sem fios avançadas."
            }, {
                type: "name",
                title: "Intervalo de sinalização",
                content: "Introduza um valor entre 25 e 1000 em milissegundos para determinar a duração entre os quais pacotes de sinalização são difundidos pelo router para sincronizar a rede Wi-Fi. A predefinição é 100 milissegundos."
            }, {
                type: "name",
                title: "Limiar de RTS",
                content: "Introduza um valor entre 1 e 2346 para determinar o tamanho do pacote de transmissão de dados através do router. Por predefinição, o tamanho do Limiar de RTS (Request to Send - Pedido para Enviar) é 2346. Se o tamanho do pacote for maior do que o limiar predefinido, o router envia um Pedido para Enviar pacotes para uma estação recetora específica e negoceia o envio de um pacote de dados, ou então o pacote será enviado imediatamente."
            }, {
                type: "name",
                title: "Intervalo de DTIM",
                content: "Introduza um valor entre 1 e 255 para determinar o intervalo de Mensagem de indicação de tráfego de entrega (DTIM). 1 indica que o intervalo de DTIM é o mesmo que o Intervalo de Sinalização."
            }, {
                type: "name",
                title: "Período de Atualização da Chave de Grupo",
                content: " Introduza o número de segundos (mínimo 30) para controlar o intervalo de tempo para a renovação automática da chave de encriptação. A predefinição é 0, indicando que não há renovação da chave."
            }, {
                type: "name",
                title: "WMM",
                content: "Esta funcionalidade garante que os pacotes com mensagens de alta prioridade sejam preferencialmente transmitidos. O WMM é ativado compulsivamente sob o modo 802.11n ou 802.11ac. É fortemente recomendado ativar o WMM."
            }, {
                type: "name",
                title: "GI curto",
                content: "Esta funcionalidade está ativada por predefinição e é recomendada para aumentar a cPAacidade de dados reduzindo o tempo do Intervalo de Proteção - Guard Interval (GI)."
            }, {
                type: "name",
                title: "Isolamento de PA",
                content: " Marque esta caixa de seleção para ativar a funcionalidade de Isolamento do PA que permite limitar e restringir todos os dispositivos sem fios na sua rede de interagir um com o outro, mas mantém-se cPAaz de aceder a Internet. O isolamento de PA está desativado por predefinição."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "Bridging WDS",
                content: "Marque esta caixa de seleção para ativar o WDS (sem fios Distribution System - Sistema de Distribuição Sem fios) uma funcionalidade de bridging para permitir que o router faça bridge (ponte) com outro ponto de acesso (PA) numa rede de área local sem fios (WLAN). Se ativado, configure o seguinte."
            }, {
                type: "name",
                title: "SSID (para fazer bridge)",
                content: "Introduza o SSID do WPA (Wireless Access Point - Ponto de Acesso Sem fios) a que o seu router de irá ligar a como um cliente ou use a funcionalidade Pesquisa para analisar e exibir todas as redes disponíveis dentro do alcance."
            }, {
                type: "name",
                title: "Endereço MAC (para fazer bridge)",
                content: "Introduza o endereço MAC no formato de 12 caracteres hexadecimais (0-9, a-f, A-F) separados por hífens do WPA a que o router se irá ligar como um cliente. Se selecionar uma rede através da funcionalidade Pesquisa, o campo de endereço MAC é automaticamente preenchido."
            }, {
                type: "name",
                title: "Pesquisa",
                content: "Clique neste botão para analisar e exibir o endereço MAC, o SSID, a intensidade do sinal, o canal e as informações de segurança de todas as redes sem fios disponíveis dentro do alcance. Após ter selecionado uma rede, o SSID, o endereço MAC e Segurança serão automaticamente preenchidos.",
                children: [{
                    type: "name",
                    title: "Lista de PA",
                    content: "Exibe as informações de PA a que o seu router se pode ligar."
                }, {
                    type: "name",
                    title: "Endereço MAC",
                    content: "Exibe o endereço MAC do PA a que o seu router se vai ligar como um cliente."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Exibe o SSID do PA a que o seu router se vai ligar como um cliente."
                }, {
                    type: "name",
                    title: "Intensidade do sinal",
                    content: "Exibe a intensidade do sinal do PA a que o seu router se vai ligar como um cliente."
                }, {
                    type: "name",
                    title: "Canal",
                    content: "Exibe o Canal do PA a que o seu router se vai ligar como um cliente."
                }, {
                    type: "name",
                    title: "Encriptação",
                    content: "Exibe o tipo de Encriptação do PA a que o seu router se vai ligar como um cliente."
                }, {
                    type: "name",
                    title: "Ligar",
                    content: "Clique no ícone para ligar ou desligar do PA correspondente."
                }]
            }, {
                type: "name",
                title: "Segurança",
                content: "Selecione uma das seguintes opções de segurança:",
                children: [{
                    type: "name",
                    title: "Nenhuma",
                    content: "Selecione esta opção para desativar a segurança sem fios. É altamente recomendável que ative a segurança sem fios para proteger a sua rede Wi-Fi de acesso não autorizado."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Selecione esta opção para ativar o método de autenticação predefinido com base numa Chave Pré-partilhada - Pre-shared Key (PSK), também chamada frase de acesso. Esta opção é recomendada. Se selecionado, configure o seguinte.",
                    children: [{
                        type: "name",
                        title: "Versão",
                        content: "Selecione uma versão de segurança para a sua rede Wi-Fi.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Esta opção suporta a encriptação AES que fornece um nível de segurança mais baixo do que o WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esta opção suporta a encriptação AES que fornece um melhor nível de segurança do que a WPA-PSK e é recomendada."
                        }]
                    }, {
                        type: "name",
                        title: "Encriptação",
                        content: "Selecione um tipo de encriptação de segurança: TKIP (Temporal Key Integrity Protocol - Protocolo de Integridade de Chave Temporal) ou AES (Advanced Encryption Standard - Padrão de Encriptação Avançado). NÃO é recomendado usar a encriptação TKIP se o router opera em modo 802.11n, porque o TKIP não é suportado pela especificação 802.11n. Se o TKIP for selecionado, a função WPS será desativada."
                    }, {
                        type: "name",
                        title: "Palavra-passe",
                        content: "Introduza uma palavra-passe para a rede Wi-Fi entre 8 e 63 caracteres ASCII ou entre 8 e 64 caracteres hexadecimais neste campo."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Selecione esta opção para ativar o método de autenticação básica se qualquer das versões dos seus dispositivos cliente só puder aceder à rede Wi-Fi utilizando o WEP (Wired Equivalent Privacy - Privacidade Equivalente a Rede com fios).",
                    children: [{
                        type: "name",
                        title: "Tipo",
                        content: "Selecione um tipo de autenticação para a sua rede Wi-Fi. Selecione Sistema Aberto ou Chave Partilhada com base na cPAacidade e pedido de acesso do cliente da rede Wi-Fi."
                    }, {
                        type: "name",
                        title: "Formato da Chave WEP",
                        content: "Selecione o formato ASCII ou Hexadecimal. O formato ASCII é uma combinação de caracteres alfabéticos e numéricos. O formato hexadecimal é uma combinação de números (0-9) e letras (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Índice de chaves",
                        content: "Selecione qual das quatro chaves será usada e introduza a chave WEP correspondente que criar no campo Valor de chave. Certifique-se de que estes valores são idênticos em todas as estações sem fios na sua rede."
                    }, {
                        type: "name",
                        title: "Valor da Chave",
                        content: "Introduza a chave WEP correspondente que criar."
                    }]
                }]
            }, {
                type: "name",
                title: "Guardar",
                content: "Clique guardar as definições."
            }]
        },
        wirelessSchedule: {
            TITLE: "Agendamento Sem Fios",
            CONTENT: [{
                type: "paragraph",
                content: "O Horário Efetivo é baseado na hora do Router. A hora pode se definida em \"Avançado > Ferramentas do Sistema > Definições Horárias\""
            }, {
                type: "name",
                title: "2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Selecione 2,4GHz, 5GHz-1 or 5GHz-2 para definir o seu horário sem fios."
            }, {
                type: "name",
                title: "Agendamento Sem Fios",
                content: "Ativar para permitir a funcionalidade. Em seguida, clique e arraste através das células para definir o período de tempo para desligar a rede Wi-Fi."
            }, {
                type: "name",
                title: "Restaurar",
                content: "Clique para a seleção da hora."
            }, {
                type: "name",
                title: "Guardar",
                content: "Clique para guardar as definições."
            }]
        },
        macFilter: {
            TITLE: "Definições do Filtro MAC",
            CONTENT: [{
                type: "name",
                title: "Filtragem MAC",
                content: "Ativar para controlar o acesso sem fios utilizando o endereço MAC dos dispositivos individuais."
            }, {
                type: "title",
                title: "Regras de filtragem"
            }, {
                type: "name",
                title: "Bloqueie o acesso sem fios dos dispositivos na lista abaixo.",
                content: "Selecione para bloquear o acesso sem fios dos dispositivos na lista abaixo."
            }, {
                type: "name",
                title: "Permita o acesso sem fios apenas dos dispositivos indicados na lista abaixo.",
                content: "Selecione para permitir o acesso sem fios apenas a partir de dispositivos da lista abaixo."
            }, {
                type: "title",
                title: "Lista de dispositivos"
            }, {
                type: "name",
                title: "Endereço MAC/Descrição",
                content: "Exibe o endereço MAC e a descrição do dispositivo."
            }, {
                type: "name",
                title: "Ativar",
                content: "Clique no ícone de Lâmpada para ativar ou desativar a filtragem de MAC do dispositivo."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para Modificar ou Eliminar a entrada correspondente."
            }, {
                type: "note",
                title: "Para adicionar um novo dispositivo",
                content: [
                    "Clique em Adicionar.",
                    "Introduza o endereço MAC do dispositivo.",
                    "Introduza uma descrição do dispositivo.",
                    "Clique em Ativar esta entrada.",
                    "Clique em OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Definições da rede Wi-Fi",
            CONTENT: [/*{
                type: "name",
                title: "Região",
                content: "Selecione a sua região a partir da lista suspensa. Este campo especifica a região onde a função sem fios do router pode ser usada. Pode ser ilegal para usar a função sem fio do router numa região que não seja uma das especificados neste campo. Se o seu país ou região não estiver listado, contacte a sua delegação governamental local para assistência."
            }, */{
                type: "name",
                title: "Ligação Inteligente (Smart Connect)",
                content: "Marque esta caixa de seleção para ativar a Ligação Inteligente. Esta função ajuda os dispositivos a executarem mais rápido atribuindo-lhes as melhores bandas sem fios baseadas nas condições reais para equilibrar as solicitações de rede."
            }, {
                type: "name",
                title: "2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Selecione 2,4GHz | 5GHz-1 | 5GHz-2 para alterar as definições correspondentes."
            }, {
                type: "name",
                title: "Rádio sem fios",
                content: "Marque esta caixa de seleção para ativar a frequência de rádio sem fios 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nome da Rede Wi-Fi (SSID)",
                content: "Pode deixar o Nome de Rede predefinido (SSID) como está ou criar um novo nome (até 32 caracteres). Este campo é sensível a maiúsculas e minúsculas."
            }, {
                type: "name",
                title: "Ocultar SSID",
                content: "Marque esta caixa de seleção se pretender ocultar o nome da rede (SSID) 2,4GHZ | 5GHz-1 | 5GHz-2 a partir da lista de redes Wi-Fi."
            }, {
                type: "name",
                title: "Segurança",
                content: "Selecione uma das seguintes opções de segurança:",
                children: [{
                    type: "name",
                    title: "Sem segurança",
                    content: "Selecione esta opção para desativar a segurança sem fios. É altamente recomendável que ative a segurança sem fios para proteger a sua rede Wi-Fi de acesso não autorizado."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Selecione esta opção para ativar o método de autenticação predefinido com base numa Chave Pré-partilhada - Pre-shared Key (PSK), também chamada frase de acesso. Esta opção é recomendada. Se selecionado, configure o seguinte.",
                    children: [{
                        type: "name",
                        title: "Versão",
                        content: "Selecione uma versão de segurança para a sua rede Wi-Fi.",
                        children: [{
                            type: "name",
                            title: "Automática",
                            content: "Esta opção suporta a implementação múltipla do WPA (Wi-Fi Protected Access - Acesso Protegido Wi-Fi) predefinido, como WPA e WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esta opção suporta a encriptação AES que fornece um melhor nível de segurança do que a WPA-PSK e é recomendada."
                        }]
                    }, {
                        type: "name",
                        title: "Encriptação",
                        content: "Selecione um tipo de encriptação de segurança: Automático (tanto para o TKIP e para o AES), TKIP (Temporal Key Integrity Protocol - Protocolo de Integridade de Chave Temporal) ou AES (Advanced Encryption Standard - Padrão de Encriptação Avançado). NÃO é recomendado usar a encriptação TKIP se o router opera em modo 802.11n, porque o TKIP não é suportado pela especificação 802.11n. Se o TKIP for selecionado, a função WPS será desativada."
                    }, {
                        type: "name",
                        title: "Palavra-passe",
                        content: "Crie uma palavra-passe para a rede Wi-Fi entre 8 e 63 caracteres ASCII ou entre 8 e 64 caracteres hexadecimais neste campo."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Enterprise",
                    content: "Selecione esta opção para ativar o método de autenticação mais avançada usando um servidor RADIUS (Remote Authentication Dial In User Service - Serviço de Autenticação Remota de Utilizadores de Acesso Telefónico). Se selecionado, a funçã WPS será desativada.",
                    children: [{
                        type: "name",
                        title: "Versão",
                        content: "Selecione uma versão de segurança para a sua rede Wi-Fi.",
                        children: [{
                            type: "name",
                            title: "Automática",
                            content: "Esta opção suporta a implementação múltipla do WPA (Wi-Fi Protected Access - Acesso Protegido Wi-Fi) predefinido, como WPA e WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esta opção suporta a encriptação AES que fornece um melhor nível de segurança do que a WPA e é recomendada.."
                        }]
                    }, {
                        type: "name",
                        title: "Encriptação",
                        content: "Selecione um tipo de encriptação de segurança: Automático (tanto para o TKIP e para o AES), TKIP (Temporal Key Integrity Protocol - Protocolo de Integridade de Chave Temporal) ou AES (Advanced Encryption Standard - Padrão de Encriptação Avançado). NÃO é recomendado usar a encriptação TKIP se o router opera em modo 802.11n, porque o TKIP não é suportado pela especificação 802.11n. Se o TKIP for selecionado, a função WPS será desativada."
                    }, {
                        type: "name",
                        title: "IP do Servidor RADIUS",
                        content: "Introduza o endereço IP do servidor RADIUS."
                    }, {
                        type: "name",
                        title: "Porta do servidor RADIUS",
                        content: "Introduza o número da porta do servidor RADIUS."
                    }, {
                        type: "name",
                        title: "Palavra-passe do servidor RADIUS",
                        content: " Introduza a palavra-passe partilhada do servidor RADIUS."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Selecione esta opção para ativar o método de autenticação básica se qualquer versão dos seus dispositivos cliente só puder aceder à rede Wi-Fi utilizando WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Tipo",
                        content: "Selecione um tipo de autenticação para a sua rede Wi-Fi. A predefinição é Auto, que escolhe automaticamente Sistema Aberto ou de Chave Partilhada com base na capacidade e pedido de acesso do cliente da rede Wi-Fi."
                    }, {
                        type: "name",
                        title: "Chave selecionada",
                        content: "Selecione qual das quatro chaves será usada e crie uma chave WEP correspondente no campo Valor de chave. Os clientes de rede Wi-Fi precisam de introduzir a chave WEP correspondente para ligar à sua rede."
                    }, {
                        type: "name",
                        title: "Formato da Chave WEP",
                        content: "Utilize o formato ASCII ou Hexadecimal. O formato ASCII é uma combinação de caracteres alfabéticos e numéricos. O formato hexadecimal é uma combinação de números (0-9) e letras (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Tipo de chave",
                        content: "Selecione um tamanho de chave WEP.",
                        children: [{
                            type: "name",
                            title: "Encriptação de 64 bit",
                            content: "Permite-lhe introduzir 10 dígitos hexadecimais (0-9, A-F, a-f) ou 5 caracteres ASCII no campo de Valor WEP."
                        }, {
                            type: "name",
                            title: "Encriptação de 128 bit",
                            content: "Permite-lhe introduzir 26 dígitos hexadecimais (0-9, A-F, a-f) ou 13 caracteres ASCII no campo de Valor WEP."
                        }]
                    }, {
                        type: "name",
                        title: "Valor da Chave",
                        content: "Crie uma chave WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Modo",
                content: "Selecione um modo misto de transmissão."
            }, {
                type: "name",
                title: "Canal",
                content: "Selecione um canal de funcionamento para a sua rede Wi-Fi. O canal predefinido é Auto. Não o altere, exceto se estiver a experimentar o problema da ligação sem fios intermitente."
            }, {
                type: "name",
                title: "Largura do canal",
                content: "Selecione uma largura de canal (largura de banda) para a rede Wi-Fi."
            }, {
                type: "name",
                title: "Potência de transmissão",
                content: "Selecione Alta, Média ou Baixa para especificar os dados de potência de transmissão. A predefinição e a configuração recomendada é Alta."
            }, {
                type: "paragraph",
                content: "Clique em <strong>Guardar</strong> para guardar todas as suas definições."
            }]
        },
        wps: {
            TITLE: "PIN do router",
            CONTENT: [{
                type: "name",
                title: "PIN do router",
                content: "Ative para permitir que os dispositivos sem fios se liguem ao router usando o PIN do router (Número de Identificação Pessoal)."
            }, {
                type: "name",
                title: "PIN atual",
                content: "Exibe o PIN atual do router O PIN predefinido pode ser encontrado na etiqueta do router ou no Guia do Utilizador. Clique em Gerar para gerar aleatoriamente um novo PIN ou clique em Restaurar para restaurar novamente o PIN atual para o PIN predefinido."
            }, {
                type: "title",
                content: "Definições WPS"
            }, {
                type: "name",
                title: "Botão de pressão (Recomendado)",
                content: "Selecione esse método de configuração para ativar a funcionalidade WPS para ligar facilmente qualquer dispositivo ativado para WPS à sua rede Wi-Fi usando o botão WPS ou usando na prática o botão Ligar."
            }, {
                type: "name",
                title: "Código PIN",
                content: "Selecione este método de configuração para adicionar manualmente um dispositivo introduzindo o PIN do WPS do dispositivo sem fios no campo."
            }, {
                type: "name",
                title: "Ligar",
                content: "Clique neste botão para iniciar o WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Controlo Parental",
            CONTENT: [{
                type: "paragraph",
                content: "Com as Controlo Parental, pode bloquear Web sites inadequados, explícitos e maliciosos; restringir o acesso em determinados momentos do dia (por exemplo, Facebook ou YouTube durante o tempo trabalhos de casa)."
            }, {
                type: "name",
                title: "Estado",
                content: "Ativar para permitir a funcionalidade Controlo Parental. Por predefinição, esta funcionalidade está desativada"
            }, {
                type: "title",
                content: "Dispositivos sob as Controlo Parental"
            }, {
                type: "paragraph",
                content: "Os dispositivos sob as Controlo Parental exibem a lista de dispositivos que estão atualmente restringidos pelas Controlo Parental."
            }, {
                type: "name",
                title: "Nome do dispositivo",
                content: "Exibe o nome de todos os dispositivos cliente ligados que estão atualmente sob as Controlo Parental."
            }, {
                type: "name",
                title: "Endereço MAC",
                content: " Exibe o endereço MAC de todos os dispositivos cliente ligados que estão atualmente sob as Controlo Parental."
            }, {
                type: "name",
                title: "Tempo efetivo",
                content: "Exibe períodos de tempo de restrição de acesso."
            }, {
                type: "name",
                title: "Descrição",
                content: "Exibe uma breve descrição do dispositivo ligado. "
            }, {
                type: "name",
                title: "Estado",
                content: "Indica se as Controlo Parental estão ou não ativadas para o dispositivo correspondente. Clique no ícone de Lâmpada para o ativar ou (desativar)."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para Modificar ou Eliminar o dispositivo correspondente."
            }, {
                type: "note",
                title: "<strong>Para restringir um novo dispositivo cliente</strong>",
                content: [
                    "Clique em Adicionar.",
                    "Clique em Ver Dispositivos Existentes para escolher um dispositivo atualmente ligado a partir da Lista de Dispositivos de Acesso ou introduza manualmente o Nome do Dispositivo e o endereço MAC para adicionar um dispositivo que não está ligado.",
                    "Clique no ícone Tempo Efetivo para especificar um período de tempo durante o qual a restrição se aplica.",
                    "Introduza uma breve descrição no o campo de Descrição. Este campo é opcional.",
                    "Selecione Ativar.",
                    "Clique em OK para guardar esta introdução."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar ou eliminar um dispositivo</strong><br>Na Lista de Dispositivos sob Controlo Parental, basta clicar no ícone Editar ou no ícone Reciclagem que corresponde ao dispositivo que pretende modificar ou eliminar."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar vários dispositivos</strong><br>Na lista Dispositivos sob  Controlo Parental, marque a caixa de seleção correspondente dos dispositivos a serem eliminadas e clique em Eliminar acima da tabela."
            }, {
                type: "title",
                title: "Restrição de Conteúdo"
            }, {
                type: "paragraph",
                content: "A Restrição de Conteúdo permite-lhe restringir o acesso ao conteúdo usando palavras-chave e nomes de domínio para que os dispositivos cliente que estão a ser controlados pelas Controlo Parental possam ou não possam aceder dependendo do tipo de restrição."
            }, {
                type: "name",
                title: "Tipo de restrição",
                content: "Selecione o seguinte tipo de restrição:",
                children: [{
                    type: "name",
                    title: "Lista negra",
                    content: "Contém palavras-chave e nomes de domínio que serão usados para bloquear o acesso ao Web site a partir dos dispositivos cliente especificados na lista de Dispositivos sob Controlo Parental."
                }, {
                    type: "name",
                    title: "Lista branca",
                    content: "Contém palavras-chave e nomes de domínio que os dispositivos cliente especificados na lista Dispositivos sob Controlo Parental têm permissão para aceder."
                }]
            }, {
                type: "name",
                title: "Adicionar uma Nova palavra-chave",
                content: "Clique para adicionar uma nova palavra-chave ou nome de domínio à Lista Negra ou à Lista Banca. "
            }, {
                type: "paragraph",
                content: "Para eliminar uma palavra-chave ou nome de domínio, clique no ícone - (menos) ao lado do item que que pretende eliminar."
            }, {
                type: "name",
                title: "Guardar",
                content: "Clique para guardar a sua configuração."
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Rede de Convidados",
            CONTENT: [{
                type: "paragraph",
                content: "A Rede de Convidados permite-lhe configurar uma rede Wi-Fi separadas com um nome de rede separado (SSID) e a palavra-passe que os seus convidados podem usar para aceder à Internet."
            }, {
                type: "name",
                title: "Permitir que os convidados vejam uns aos outros",
                content: "Marque esta caixa de verificação para permitir que os dispositivos sem fios na Rede de Convidados comuniquem uns com os outros."
            }, {
                type: "name",
                title: "Permitir que os convidados acedam à minha rede local",
                content: "Marque esta caixa de verificação para permitir que os dispositivos sem fios na Rede de Convidados para aceder à sua rede local."
            }, {
                type: "name",
                title: "Rede Wi-Fi de  2,4Ghz | 5 GHz-1 | 5GHz-2",
                content: "Selecione o botão correspondente para ativar a Rede de Convidados 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "SSID da Rede de Convidados",
                content: "Use o SSID predefinido ou crie um novo nome usando de 1 a 32 caracteres. Este campo é sensível a maiúsculas e minúsculas."
            }, {
                type: "name",
                title: "Ocultar SSID",
                content: "Marque esta caixa de seleção se pretender ocultar o SSID da Rede de Convidados."
            }, {
                type: "name",
                title: "Segurança",
                content: "Selecione uma opção de segurança para a Rede de Convidados:",
                children: [{
                    type: "name",
                    title: "Nenhuma",
                    content: "Por predefinição, a segurança da Rede de Convidados é definida como Nenhuma; ninguém pode aceder."
                }, {
                    type: "name",
                    title: "Defina a Palavra-passe",
                    content: "Crie uma palavra-passe para Rede de Convidados entre 8 e 63 caracteres ASCII ou entre 8 e 64 caracteres hexadecimais (0-9, a-f, A-F) no campo Palavra-passe."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
                type: "name",
                title: "Estado da Internet",
                content: "Exibe o estado atual da ligação da Internet do router."
            }, {
                type: "name",
                title: "Tipo de ligação",
                content: "Exibe o tipo da sua ligação à Internet. "
            }, {
                type: "name",
                title: "Endereço IP",
                content: "Exibe o endereço IP de Internet atual atribuído ao router."
            }, {
                type: "name",
                title: "Servidor DNS",
                content: " Exibe os endereços IP dos servidores DNS principal e secundário."
            }, {
                type: "name",
                title: "Gateway",
                content: "Exibe o endereço IP do Gateway."
            }, {
                type: "title",
                title: "Router"
            }, {
                type: "title2",
                content: "Rede Wi-Fi 2,4GHz | 5GHz-1 | 5GHz-2"
            }, {/*
                type: "name",
                title: "Estado",
                content: "Exibe se a rede Wi-Fi 2,4GHz | 5GHz-1 | 5GHz-2 está ligado (ativado) ou desligado (desativado)."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Exibe o nome da rede Wi-Fi atual da frequência de banda  2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Canal",
                content: "Exibe o canal do qual a rede Wi-Fi 2,4GHz | 5GHz-1 | 5GHz-2 difunde."
            }, {
                type: "name",
                title: "MAC",
                content: "Exibe o endereço MAC atual da rede Wi-Fi 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "title2",
                content: "Rede de Convidados 2,4GHz | 5GHz-1 | 5GHz-2"
            }, {
                type: "name",
                title: "Estado",
                content: "Exibe se a Rede de Convidados 2,4GHz | 5GHz-1 | 5GHz-2 está ligada (ativada) ou desligada (desativada)."
            }, {
                type: "name",
                title: "SSID",
                content: "Exibe o nome da rede Wi-Fi da Rede de Convidados."
            }, {
                type: "title",
                title: "Clientes sem fios/com fios"
            }, {
                type: "name",
                title: "Nome",
                content: " Exibe o nome do cliente ligado ao router. "
            }, {
                type: "name",
                title: "Endereço IP",
                content: "Exibe o endereço IP atribuído do cliente."
            }, {
                type: "name",
                title: "Endereço MAC",
                content: "Exibe o endereço MAC do cliente."
            }, {
                type: "title",
                display: "INCLUDE_VOIP",
                title: "Telefone"
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Nome do telefone",
                content: "Exibe o nome do seu telefone."
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Números de chamadas recebidas",
                content: "Exibe os números usados pelos seus dispositivos de telefone para receber chamadas de entrada através do router. "
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Número interno",
                content: "Exibe os números de telefone que são utilizados para fazer chamadas entre dispositivos de telefone ligados ao mesmo router. Está predefinido e não pode ser alterado."
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Número de chamadas de saída",
                content: "Exibe os números usados pelos seus dispositivos de telefone para fazer chamadas de saída através do router. A predefinição é Auto, o que significa que o router irá selecionar um número disponível para ser o número de saída que pode ser alterado no página VoIP."
            }, {
                type: "title",
                display: "INCLUDE_USB",
                title: "Impressora"
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Nome",
                content: "Exibe o nome da impressora ligada ao router através da porta USB. "
            }, {
                type: "title",
                display: "INCLUDE_USB",
                title: "Disco USB"
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Marca",
                content: "Exibe a marca do disco USB ligado ao router."
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Total",
                content: "Exibe o volume total do disco USB."
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Disponível",
                content: "Exibe o espaço disponível do disco USB."
            }]
        },
        wirelessBasic: {
            TITLE: "Definições da rede Wi-Fi",
            CONTENT: [{
                type: "name",
                title: "Rede Wi-Fi 2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Marque esta caixa de seleção para ativar a frequência de rádio sem fios 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nome da Rede Wi-Fi (SSID)",
                content: "Pode deixar o Nome de Rede predefinido (SSID) como está ou criar um novo nome (até 32 caracteres). Este campo é sensível a maiúsculas e minúsculas."
            }, {
                type: "name",
                title: "Palavra-passe",
                content: "Crie uma palavra-passe para a rede Wi-Fi entre 8 e 63 caracteres ASCII ou entre 8 e 64 caracteres hexadecimais. Este campo é sensível a maiúsculas e minúsculas."
            }, {
                type: "name",
                title: "Ocultar SSID",
                content: "SMarque esta caixa de seleção se pretender ocultar o SSID 2,4GHz | 5GHz-1 | 5GHz-2 a partir da lista de redes Wi-Fi."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Exibe informações relevantes sobre a ligação à Internet."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
               /* type: "name",
                title: "Nome",
                content: "Exibe o nome da porta Internet do router."
            }, {*/
                type: "name",
                title: "Endereço MAC",
                content: "O endereço físico exclusivo atribuído à porta Internet (WAN) do router."
            }, {
                type: "name",
                title: "Endereço IP",
                content: "O endereço IP atribuído à porta Internet (WAN) do router. Se o endereço IP for mostrado como 0.0.0.0, que indica sem acesso à Internet."
            }, {
                type: "name",
                title: "Máscara de sub-rede",
                content: "Este parâmetro determina a porção de rede e a porção do anfitrião de um endereço IP. "
            }, {
                type: "name",
                title: "Gateway Predefinido",
                content: " O endereço IP usado para ligar o router à rede."
            }, {
                type: "name",
                title: "DNS primário/DNS secundário",
                content: "O Sistema de Nomes de Domínio (DNS) converte os nomes de anfitrião e domínios de Internet para endereços IP. A informação destes servidores DNS sé atribuída pelo Fornecedor de Serviços de Internet (ISP)."
            }, {
                type: "name",
                title: "Tipo de ligação",
                content: "O tipo de ligação atual da sua Internet."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Endereço MAC",
                content: "O endereço físico exclusivo atribuído à porta Internet (WAN) do router."
            }, {
                type: "name",
                title: "Endereço IP",
                content: " O endereço IPv6 atribuído à porta Internet (WAN) do router."
            }, {
                type: "name",
                title: "Gateway Predefinido",
                content: " O endereço IP usado para ligar o router à rede."
            }, {
                type: "name",
                title: "DNS primário/DNS secundário",
                content: "O Sistema de Nomes de Domínio (DNS) converte os nomes de anfitrião e domínios de Internet para endereços IP. A informação destes servidores DNS sé atribuída pelo Fornecedor de Serviços de Internet (ISP)."
            }, {
                type: "name",
                title: "Tipo de ligação",
                content: "O tipo de ligação atual da sua Internet."
            }, {
                type: "title",
                title: "Rede Wi-Fi"
            }, {
                type: "name",
                title: "2,4G | 5G-1 | 5G-2",
                content: "Selecione para exibir as definições e a informação da rede Wi-Fi 22,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nome da rede",
                content: "O nome da rede Wi-Fi, também conhecido como SSID (Service Set Identifier - Identificador de Conjunto de Serviço)."
            }, {
                type: "name",
                title: "Rádio sem fios",
                content: "O estado atual (Ligado ou Desligado) da rede Wi-Fi."
            }, {
                type: "name",
                title: "Modo",
                content: "O modo atual da rede Wi-Fi."
            }, {
                type: "name",
                title: "Largura do canal",
                content: "A largura de banda do canal da rede Wi-Fi."
            }, {
                type: "name",
                title: "Canal",
                content: "O canal sem fios atual e sua frequência correspondente (em GHz)."
            }, {
                type: "name",
                title: "Endereço MAC",
                content: "O endereço MAC do rádio de rede Wi-Fi."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Exibe informações sobre as portas Ethernet (LAN)."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "Endereço MAC",
                content: "O endereço físico exclusivo atribuído à porta Ethernet (LAN) do router."
            }, {
                type: "name",
                title: "Endereço IP",
                content: "O endereço IPv4 atribuído à porta Ethernet (LAN) do router."
            }, {
                type: "name",
                title: "Máscara de sub-rede",
                content: "Este parâmetro determina a porção de rede e a porção do anfitrião de um endereço IP."
            }, {
                type: "name",
                title: "DHCP",
                content: "Exibe se o servidor DHCP integrado do router está ativo para os dispositivos nas portas LAN ou não."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Endereço MAC",
                content: " O endereço físico exclusivo atribuído à porta Ethernet (LAN) do router."
            }, {
                type: "name",
                title: "Endereço IP",
                content: "O endereço IPv6 atribuído à porta Ethernet (LAN) do router."
            }, {
                type: "name",
                title: "Comprimento do prefixo",
                content: "O comprimento do prefixo do endereço IPv6."
            }, {
                type: "name",
                title: "Tipo atribuído",
                content: "O tipo de endereço IPv6 atribuído à interface LAN."
            }, {
                type: "title",
                title: "Rede de Convidados"
            }, {
                type: "name",
                title: "2,4G | 5G-1 | 5G-2",
                content: "Selecione para exibir as definições e a informação da Rede de Convidados 22,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "SSID da Rede de Convidados",
                content: " O nome da rede Wi-Fi (SSID) da sua Rede de Convidados."
            }, {
                type: "name",
                title: "Ocultar SSID",
                content: "Exibe se o nome da rede Wi-Fi (SSID) da Rede de Convidados está oculta (Ligado) ou não (Desligado)."
            }, {
                type: "name",
                title: "Rádio sem fios",
                content: "Indica o estado atual (Ligado ou Desligado) da Rede de Convidados."
            }, {
                type: "name",
                title: "Ver uns aos outros",
                content: "Indica se todos os dispositivos na Rede de Convidados são permitidos para comunicar uns com os outros ou não."
            }, {
                type: "title",
                display: "$.sysMode == 'DSL'",
                title: "DSL"
            }, {
                type: "paragraph",
                display: "$.sysMode == 'DSL'",
                content: "Exibe a informação sobre a ligação DSL."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Estado da linha",
                content: "Exibe se a ligação DSL está ligada ou desligada."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Tipo de Modulação de DSL",
                content: "Exibe o Tipo de Modulação de funcionamento DSL que a sua ligação DSL usa."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Tipo de anexo",
                content: "Exibe o tipo de Anexo de funcionamento DSL que a sua ligação DSL usa."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Taxa atual (kbps)",
                content: "Exibe a velocidade atual de carregamento e transferência através da ligação DSL."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Taxa máx (kbps)",
                content: "Exibe a velocidade máxima de carregamento e transferência através da ligação DSL."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Margem de SNR (dB)",
                content: "Exibe a Margem de SNR de carregamento e transferência da ligação DSL."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Atenuação de linha (dB)",
                content: "Exibe a atenuação de linha da ligação DSL."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Erros (pkts)",
                content: "Exibe o número de erros de carregamento e transferência da ligação DSL."
            }]
        },
        time: {
            TITLE: "Definições Horárias",
            CONTENT: [{
                type: "name",
                title: "Fuso horário",
                content: "Selecione o seu fuso horário local a partir da lista suspensa."
            }, {
                type: "name",
                title: "Data",
                content: "Introduza a sua data local em MM/DD/YY no campo."
            }, {
                type: "name",
                title: "Hora",
                content: "Escolha a sua hora local a partir da lista suspensa (em formato de relógio de 24 horas, por exemplo 16:00:00 é 04:00PM)."
            }, {
                type: "name",
                title: "Servidor NTP I/Servidor NTP II",
                content: "Introduza o endereço IP do servidor de NTP I ou servidor NTP II e o router irá obter automaticamente a hora a partir do servidor de NTP. Além disso, o router tem alguns Servidores NTP integrados comuns que irão sincronizar automaticamente quando é ligado à Internet."
            }, {
                type: "name",
                title: "Obtenha a partir do PC",
                content: "Clique para sincronizar com a hora do sistema do computador."
            }, {
                type: "name",
                title: "Obter GMT",
                content: "Clique para sincronizar com a hora do fuso horário de Greenwich (GMT) a partir da Internet."
            }, {
                type: "name",
                title: "Guardar",
                content: "Clique guardar as definições."
            }, {
                type: "title",
                content: "Horário de verão"
            }, {
                type: "note",
                title: "Para configurar a horário de verão",
                content: [
                    "Selecione <b>Ativar Horário de Verão</b>.",
                    "Selecione a data e a hora corretas <b>Início</b> quando o horário de verão começar no seu fuso horário local.",
                    "Selecione a data e a hora corretas <b>Fim</b> quando o horário de verão termina no seu fuso horário local.",
                    "Clique em <b>Guardar</b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Ferramentas de diagnóstico",
            CONTENT: [{
                type: "paragraph",
                content: "O router fornece duas ferramentas de diagnóstico, ping e trace."
            }, {
                type: "note",
                title: "Para diagnosticar usando a ferramenta Ping:",
                content: [
                    "Verifique o botão de rádio antes de fazer ping.",
                    "Introduza o endereço IP ou nome de domínio.",
                    "Clique no ícone suspenso antes de Avançar para exibir a Contagem Ping, o tamanho do Pacote de Ping e Tempo Limite de Ping. Mantenha estes parâmetros nos seus valores predefinidos ou configure-os de acordo com as suas necessidades.",
                    "Clique no botão Iniciar para começar o diagnóstico."
                ]
            }, {
                type: "paragraph",
                content: "OU"
            }, {
                type: "note",
                title: "Para diagnosticar usando a ferramenta Traceroute:",
                content: [
                    "Verifique o botão de rádio antes da traceroute.",
                    "Introduza o endereço IP ou nome de domínio.",
                    "Clique no ícone suspenso antes de Avançar para exibir Traceroute Max TTL. Mantenha-o no seu valor predefinido ou configure-o de acordo com as suas necessidades.",
                    "Clique no botão Iniciar para começar o diagnóstico."
                ]
            }]
        },
        softup: {
            TITLE: "Atualização de Firmware",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "As atualizações de Firmware permitem atualizar o sistema operativo com as mais recentes funcionalidades e correções de erros, garantindo assim a performance para o seu dispositivo. Sempre que uma nova versão de firmware estiver disponível, será notificado via Ícone de Atualização no canto superior direito. Clique no ícone para entrar na página de atualização de Firmware."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>IMPORTANTE: Por favor siga as instruções por forma a prevenir falhas durante o processo de atualização.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Antes de atualizar:",
                content: [
                    "Ligue o seu computador ao router via cabo de rede Ethernet. NÃO é recomendada a atualização de firmware via Wi-Fi. ",
                    "Remova todos os dispositivos de armazenamento USB do Router.",
                    "Faça uma cópia de segurança das definições do Router."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Durante o processo de atualização:<br>Mantenha o Router ligado e não o utilize."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Para atualizar o firmware online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Clique Atualizar e confirme quando for solicitado. O Router irá automaticamente efetuar o download, atualizar para a última versão de Firmware e reiniciar.<br><b>Nota</b>: Poderá ter de clicar primeiro em Procurar Atualizações por forma a validar se existem versões mais recentes. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Para atualizar o firmware manualmente"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Vá a www.tp-link.pt e descarregue a última versão de firmware a partir da página de suporte do produto para o seu computador. Certifique-se que a versão que descarrega coincide com a versão de Hardware do seu Router.",
                    "Clique em <b>Procurar</b> e selecione o ficheiro que descarregou.",
                    "Clique em <b>Atualizar</b>. A atualização de firmware demora alguns minutos até ficar completa. O Router irá reiniciar automaticamente assim que o processo de atualização terminar.",
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Antes de atualizar o firmware do router, precisará de fazer a transferência da atualização de firmware mais recente a partir de <a href='http://www.tp-link.com/en/download-center.html'>TP-LINK</a> para o seu computador."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<b>IMPORTANTE:</b> Para evitar falha na atualização, observe o seguinte:",
                content: [
                    "Certifique-se de que o ficheiro de firmware mais recente é compatível com a versão de hardware (como mostrado na página <b>Atualização do Firmware</b>). ",
                    "Certifique-se de que tem uma ligação estável entre o router e o computador. <b>NÃO</b> é recomendado atualizar o firmware  através da rede Wi-Fi.",
                    "Certifique-se de que removeu todos os dispositivos de armazenamento USB ligados ao router antes da atualização do firmware para evitar a perda de dados.",
                    "Faça uma cópia de segurança da configuração do seu router.",
                    "Não desligue o router durante a actualização do firmware."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Para atualizar o firmware do router",
                content: [
                    "Clique em <b>Procurar</b>.",
                    "Localize e selecione o ficheiro de firmware transferido.",
                    "Clique em <b>Atualizar</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Cópia de segurança",
            CONTENT: [{
                type: "paragraph",
                content: "É altamente recomendável fazer uma cópia de segurança das configurações atuais no caso de ser necessária uma recuperação para restaurar o sistema para um estado anterior ou a partir das predefinições de fábrica."
            }, {
                type: "paragraph",
                content: "Clique em <b>Cópia de Segurança (Backup)</b> para guardar as configurações atuais para o seu computador. Certifique-se de guardar o ficheiro da cópia de segurança no local seguro para recuperar e restaurar o router mais tarde, se necessário."
            }, {
                type: "title",
                content: "Restaurar"
            }, {
                type: "note",
                title: "Para restaurar a partir de uma cópia de segurança",
                content: [
                    "Clique em <b>Procurar</b>.",
                    "Localize e selecione o ficheiro da cópia de segurança.",
                    "Clique em <b>Restaurar</b>."
                ]
            }, {
                type: "title",
                content: "Reposição dos valores de Fábrica"
            }, {
                type: "paragraph",
                content: "Clique em <b>Repor (Factory Restore)</b> para repor o router nas suas predefinições de fábrica."
            }, {
                type: "note",
                title: "Observação:",
                content: [
                    "A Reposição dos valores de Fábrica reporá todas as definições que configurou para o router nas suas predfinições de fábrica. Quando o router estiver restaurado e reiniciado, crie uma nova palavra-passe para iniciar novamente sessão na página de gestão baseada na Web.",
                    "NÃO desligue o router durante o processo de cópia de segurança ou restauração."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Gestão da Conta",
            CONTENT: [{
                type: "paragraph",
                content: "Esta página permite-lhe alterar a sua palavra-passe de início de sessão."
            }, {
                type: "name",
                title: "Nome de utilizador antigo",
                content: "Escreva o seu nome de utilizador atual."
            }, {
                type: "name",
                title: "Palavra-passe antiga",
                content: "Escreva a sua palavra-passe atual."
            }, {
                type: "name",
                title: "Novo nome de utilizador",
                content: "Escreva o novo nome de utilizador."
            }, {
                type: "name",
                title: "Nova Palavra-passe",
                content: "Escreva sua nova palavra-passe."
            }, {
                type: "name",
                title: "Confirme a Nova Palavra-passe",
                content: "Escreva  novamente a sua nova palavra-passe."
            }, {
                type: "title",
                content: "Gestão de locais"
            }, {
                type: "paragraph",
                content: "A gestão de locais permite-lhe atribuir especificamente um dispositivo cliente na sua rede para aceder e gerir o router usando a autenticação baseada no endereço MAC."
            }, {
                type: "name",
                title: "Porta",
                content: "Introduza o número da porta a ser usada para aceder ao router entre 1024 e 65535. O número predefinido é 80."
            }, {
                type: "name",
                title: "Endereço IP/MAC",
                content: "Introduza um valor válido para o endereço IP local ou o endereço MAC do dispositivo a ser autorizado a aceder ao router."
            }, {
                type: "title",
                content: "Gestão Remota"
            }, {
                type: "paragraph",
                content: "A funcionalidade de Gestão Remota permite-lhe aceder e configurar remotamente o router a partir da Internet."
            }, {
                type: "name",
                title: "Gestão Remota",
                content: "Marque a caixa de seleção para ativar a funcionalidade de Gestão Remota."
            }, {
                type: "name",
                title: "Porta",
                content: "Introduza o número da porta a ser usada para aceder ao router com maior segurança entre 1024 e 65535. Normalmente, os navegadores da Web utilizam a porta de serviço HTTP padrão 80."
            }, {
                type: "name",
                title: "Endereço IP/MAC",
                content: "Introduza um endereço IP remoto válido ou endereço MAC para ser autorizado a aceder ao router."
            }]
        },
        log: {
            TITLE: "Registo do Sistema",
            CONTENT: [{
                type: "paragraph",
                content: "A página de Registo do Sistema exibe uma lista das atividades mais recentes (eventos) do router. Pode definir que tipos de registos e/ou o nível de registros que pretende exibir. Esta página também permite que ao router exportar o registo do sistema para um computador ou enviar automaticamente o registo do sistema para um servidor remoto específico."
            }, {
                type: "name",
                title: "Tipo",
                content: "Selecione o tipo de registo do sistema a exibir."
            }, {
                type: "name",
                title: "Nível",
                content: "Selecione o nível do registo do sistema a exibir."
            }, {
                type: "name",
                title: "Atualizar",
                content: "Clique neste ícone para atualizar o registo do sistema."
            }, {
                type: "name",
                title: "Eliminar Todos",
                content: "Clique neste ícone para eliminar todos os registos do sistema."
            }, {
                type: "name",
                title: "Definições do registo",
                content: "Clique para definir as definições do ficheiro de registo.",
                children: [{
                    type: "name",
                    title: "Guardar localmente",
                    content: "Selecione para armazenar em cache o registo do sistema na sua memória local do router. O registo será mostrado na tabela na página do Registo do Sistema.",
                    children: [{
                        type: "name",
                        title: "Nível mínimo",
                        content: "Selecione o nível mínimo do registo do sistema para ser guardado a partir da lista suspensa. A lista está em ordem decrescente, com o nível mais baixo nível listado em último."
                    }]
                }, {
                    type: "name",
                    title: "Guardar remotamente",
                    content: "Selecione para enviar o registo do sistema para um servidor remoto. Se o servidor remoto possuir um cliente visualizador do registo ou uma ferramenta sniffer implementados, pode visualizar e analisar remotamente o registo do sistema em tempo real.",
                    children: [{
                        type: "name",
                        title: "Nível mínimo",
                        content: "Selecione o nível mínimo do registo do sistema para ser guardado a partir da lista suspensa. A lista está em ordem decrescente, com o nível mais baixo nível listado em último."
                    }, {
                        type: "name",
                        title: "IP do Servidor",
                        content: "Especifique o endereço IP do servidor do registo do sistema remoto."
                    }, {
                        type: "name",
                        title: "Porta do servidor",
                        content: "Especifique o número da porta do servidor do registo do sistema remoto."
                    }, {
                        type: "name",
                        title: "Nome da Função Local",
                        content: "Selecione o nome da função local do servidor remoto a partir da lista suspensa."
                    }]
                }]
            }, {
                type: "name",
                title: "Guardar registo",
                content: "Clique neste botão para transferir todos os registos do sistema para seu computador local."
            }]
        },
        snmp: {
            TITLE: "Definições de SNMP",
            CONTENT: [{
                type: "name",
                title: "Agente SNMP",
                content: "Ative para permitir que o agente SNMP integrado que possibilita que o router funcione como a função operacional para receber e processar mensagens SNMP, enviar respostas para o gestor de SNMP e acionar traps SNMP quando ocorre um evento."
            }, {
                type: "name",
                title: "Comunidade só de leitura",
                content: "Exibe a cadeia da comunidade pública que protege o router contra acessos não autorizados."
            }, {
                type: "name",
                title: "Comunidade de Gravação",
                content: "Exibe a cadeia da comunidade de leitura e gravação predefinida que protege o router contra alterações não autorizadas."
            }, {
                type: "name",
                title: "Nome do Sistema",
                content: "Exibe o nome atribuído administrativamente a este dispositivo gerido."
            }, {
                type: "name",
                title: "Descrição do Sistema",
                content: "Exibe a descrição textual do dispositivo gerido.  Este valor deve incluir o nome completo e a identificação da versão do tipo de hardware do sistema, do software do sistema operativo e do software de rede."
            }, {
                type: "name",
                title: "Localização do sistema",
                content: "Exibe a localização física deste dispositivo (por exemplo, armário do telefone, 3º andar).  "
            }, {
                type: "name",
                title: "Contacto do sistema",
                content: "Exibe a identificação textual da pessoa de contacto para este dispositivo gerido, juntamente com informações sobre como entrar em contacto com esta pessoa."
            }, {
                type: "name",
                title: "IP do Gestor de Trap",
                content: "Exibe o endereço IP do anfitrião para receber os traps."
            }]
        },
        stat: {
            TITLE: "Estatísticas de Tráfego",
            CONTENT: [{
                type: "name",
                title: "Estatísticas de Tráfego",
                content: "Ative para permitir a funcionalidade Estatísticas de Tráfego."
            }, {
                type: "title",
                content: "Lista de Estatísticas de Tráfego"
            }, {
                type: "name",
                title: "Endereço IP/MAC",
                content: "Os endereços IP e MAC dos clientes ligados."
            }, {
                type: "name",
                title: "Pacotes totais",
                content: "O número total de pacotes recebidos e transmitidos pelo router."
            }, {
                type: "name",
                title: "Bytes totais",
                content: "O número total de bytes recebidos e transmitidos pelo router."
            }, {
                type: "name",
                title: "Pacotes atuais",
                content: "O número total de pacotes recebidos e transmitidos num intervalo específico de tempo em segundos."
            }, {
                type: "name",
                title: "Bytes atuais",
                content: "O número total de bytes recebidos e transmitidos num intervalo específico de tempo em segundos."
            }, {
                type: "name",
                title: "ICMP Tx atual",
                content: "Exibe a taxa de transmissão atual dos pacotes ICMP transmitidos através da porta WAN sobre a taxa máxima de transmissão por segundo."
            }, {
                type: "name",
                title: "UDP Tx atual",
                content: "Exibe a taxa de transmissão atual dos pacotes UDP transmitidos através da porta WAN sobre a taxa máxima de transmissão por segundo."
            }, {
                type: "name",
                title: "SYN Tx atual",
                content: "Exibe a taxa de transmissão dos pacotes TCP SYN transmitidos através da porta WAN sobre a taxa máxima de transmissão por segundo."
            }, {
                type: "name",
                title: "Modificar",
                content: "Clique no ícone <b>Reciclagem</b> para eliminar as estatísticas correspondentes."
            }, {
                type: "name",
                title: "Atualizar",
                content: "Clique para atualizar a informação estatística na página."
            }, {
                type: "name",
                title: "Repor",
                content: "Clique para repor todos os valores estatísticos na lista a zero."
            }, {
                type: "name",
                title: "Eliminar Todos",
                content: "Clique para eliminar toda a informação estatística na lista."
            }]
        },
        ethWan: {
            TITLE: "Interface WAN",
            CONTENT: [{
                type: "title2",
                content: "Tipo de ligação: IP dinâmico"
            }, {
                type: "name",
                title: "IP dinâmico",
                content: "Selecione esse tipo lhe for fornecida uma ligação de servidor DHCP pelo ISP (Fornecedor de Serviços de Internet)."
            }, {
                type: "name",
                title: "Endereço IP/Máscara de sub-rede/Gateway/Gateway Predefinido",
                content: "Estes parâmetros são automaticamente atribuídos pelo servidor DHCP do seu ISP."
            }, {
                type: "name",
                title: "Renovar/Libertar",
                content: "Clique neste botão para Renovar/Libertar os parâmetros IP do seu ISP."
            }, {
                type: "name",
                title: "Avançado",
                children: [{
                    type: "name",
                    title: "Tamanho da MTU (em bytes)",
                    content: "O tamanho da MTU (Unidade Máxima de Transmissão) predefinido e típico para a maior parte das redes Ethernet é <b>1500 Bytes</b>. Não é recomendado alterar o tamanho da MTU predefinido exceto se solicitado pelo seu ISP."
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "O IGMP (Internet Group Management Protocol - Protocolo de Gestão de Grupo de Internet) é usado para gerir o multicast em redes TCP/IP. Alguns ISPs utilizam o IGMP para executar a configuração remota num router. Ele está ativado por predefinição."
                }, {
                    type: "name",
                    title: "Obter IP usando Unicast DHCP:",
                    content: "Marque esta caixa de seleção se o seu servidor DHCP do ISP não suportar aplicações de difusão e não puder obter dinamicamente o endereço IP."
                }, {
                    type: "name",
                    title: "Use o seguinte Endereço de DNS",
                    content: "Marque esta caixa de seleção e introduza o(s) endereço(s) do servidor DNS em notação decimal com pontos fornecido(s) pelo seu ISP. Esta interface WAN utilizará o servidor DNS especificado para prioridade."
                }, {
                    type: "name",
                    title: "Nome de Anfitrião",
                    content: "Introduza o nome de anfitrião desta interface WAN."
                }]
            }, {
                type: "title2",
                content: "Tipo de ligação: IP estático"
            }, {
                type: "name",
                title: "IP estático",
                content: "Selecione esse tipo lhe forem fornecidos parâmetros específicos de Endereço IP (fixo) específico, Máscara de sub-rede, Gateway e DNS pelo ISP."
            }, {
                type: "name",
                title: "Endereço IP/Máscara de sub-rede/Gateway/Servidor DNS/Servidor DNS Secundário",
                content: "Introduza as informações de IP fornecidas pelo seu ISP em notação decimal com pontos."
            }, {
                type: "paragraph",
                content: "Clique em <b>Avançadas</b> para ver mais definições avançadas."
            }, {
                type: "name",
                title: "Avançado",
                children: [{
                    type: "name",
                    title: "Tamanho da MTU (em bytes)",
                    content: "O tamanho da MTU (Unidade Máxima de Transmissão) predefinido e típico para a maior parte das redes Ethernet é <b>1500 Bytes</b>. Não é recomendado alterar o tamanho da MTU predefinido exceto se solicitado pelo seu ISP."
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "O IGMP (Internet Group Management Protocol - Protocolo de Gestão de Grupo de Internet) é usado para gerir o multicast em redes TCP/IP. Alguns ISPs utilizam o IGMP para executar a configuração remota num router. Ele está ativado por predefinição."
                }]
            }, {
                type: "title2",
                content: "Tipo de ligação: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Selecione esse tipo se usar o serviço DSL (Digital Subscriber Line -  Linha Digital de Assinante) e lhe for fornecido um nome de utilizador e palavra-passe pelo ISP."
            }, {
                type: "name",
                title: "Nome de utilizador PPPoE/Palavra-passe PPPoE/Confirmar Palavra-passe",
                content: "Introduza o nome de utilizador e a palavra-passe fornecidos pelo seu ISP. Estes campos são sensíveis a maiúsculas e minúsculas."
            }, {
                type: "name",
                title: "Ligação Secundária",
                content: "Está disponível apenas para Ligação PPPoE. Se o seu ISP fornecer um tipo de ligação extra como um IP Dinâmico/Estático para se ligar a uma rede de área local, então pode selecionar o botão de IP Dinâmico/Estático para ativar esta ligação secundária.<br>A Ligação Secundária está desativada por predefinição, assim apenas existe ligação PPPoE. Não a ative, a não ser que seja necessário."
            }, {
                type: "name",
                title: "Modo de ligação",
                content: "Selecione um dos modos de ligação abaixo que determinam como ligar à Internet:",
                children: [{
                    type: "name",
                    title: "Sempre",
                    content: "Selecione este modo para religar automaticamente sempre que ligação seja desligada."
                }, {
                    type: "name",
                    title: "Ligar a pedido",
                    content: "Selecione este modo para ligar ou desligar a ligação à Internet com base no tempo de inatividade específico (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente à Internet."
                }, {
                    type: "name",
                    title: "Ligar manualmente",
                    content: "Selecione este modo para ligar ou desligar manualmente a ligação à Internet ou com base no tempo de inatividade específico (Tempo Máximo de Inatividade)."
                }, {
                    type: "name",
                    title: "Tempo Máximo de Inatividade",
                    content: "<b>15 minutos</b> - Introduza um número de minutos a ligação à Internet pode estar inativa antes que seja encerrada. O tempo de inatividade predefinido é 15 minutos."
                }]
            }, {
                type: "name",
                title: "Tipo de Autenticação",
                content: "Selecione um tipo de autenticação a partir da lista suspensa. O método predefinido é AUTO_AUTH."
            }, {
                type: "name",
                title: "Ligar/Desligar",
                content: "Clique para ligar/desligar imediatamente."
            }, {
                type: "paragraph",
                content: "Clique em <b>Avançadas</b> para ver mais definições avançadas."
            }, {
                type: "name",
                title: "Avançado",
                children: [{
                    type: "name",
                    title: "Nome do Serviço",
                    content: "Introduza o nome do serviço fornecido pelo seu ISP. Caso contrário, deixe em branco."
                }, {
                    type: "name",
                    title: "Nome do Servidor",
                    content: "Introduza o nome do servidor fornecido pelo seu ISP. Caso contrário, deixe em branco."
                }, {
                    type: "name",
                    title: "Tamanho da MTU (em bytes)",
                    content: "O tamanho da MTU (Unidade Máxima de Transmissão) típico para redes Ethernet é 1480 Bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Observação</b>: Raramente, o seu ISP poderá solicitar-lhe que ajuste o tamanho da MTU para um melhor desempenho da rede. Não deve alterar o valor, exceto se lhe for absolutamente necessário."
                    }]
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "O IGMP (Internet Group Management Protocol - Protocolo de Gestão de Grupo de Internet) é usado para gerir o multicast em redes TCP/IP. Alguns ISPs utilizam o IGMP para executar a configuração remota num router. Ele está ativado por predefinição."
                }, {
                    type: "name",
                    title: "Utilize o endereço de IP especificado pelo ISP",
                    content: "Seleccione esta opção e introduza o endereço IP fornecido pelo seu ISP."
                }, {
                    type: "name",
                    title: "Intervalo de Solicitação de Eco",
                    content: "Introduza um valor de intervalo de tempo entre 0 e 120 (em segundos) para que o router solicite ao Concentrador de Acesso para fazer eco a cada intervalo. O valor predefinido é 30. 0 significa sem deteção."
                }, {
                    type: "name",
                    title: "Use o seguinte Endereço de DNS",
                    content: "Marque esta caixa de seleção e introduza o(s) endereço(s) do servidor DNS em notação decimal com pontos fornecido(s) pelo seu ISP. Esta interface WAN utilizará o servidor DNS especificado para prioridade."
                }]
            }, {
                type: "title2",
                content: "Tipo de ligação: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Selecione este tipo se ligar a um Servidor VPN L2TP/PPTP e lhe for fornecido um nome de utilizador, palavra-passe e endereço IP/Nome de domínio do servidor pelo seu ISP."
            }, {
                type: "name",
                title: "Nome de utilizador/Palavra-passe",
                content: "Introduza o nome de utilizador e a palavra-passe fornecidos pelo seu ISP. Estes campos são sensíveis a maiúsculas e minúsculas."
            }, {
                type: "name",
                title: "Endereço IP/DNS Primário",
                content: "Estes parâmetros serão automaticamente atribuídos pelo servidor DHCP do seu ISP."
            }, {
                type: "name",
                title: "Ligação Secundária (IP Dinâmico ou IP Estático)",
                children: [{
                    type: "name",
                    title: "IP dinâmico",
                    content: "Selecione esta opção se o endereço IP e a Máscara de sub-rede lhe forem automaticamente atribuídos pelo seu ISP."
                }, {
                    type: "name",
                    title: "IP Estático",
                    content: "Selecione esta opção se o endereço IP, a Máscara de sub-rede, o Gateway e os endereços DNS lhe forem fornecidas pelo seu ISP e introduza esta informação nos campos correspondentes."
                }]
            }, {
                type: "name",
                title: "IP do Servidor VPN/Nome de Domínio",
                content: "Introduza o endereço IP do servidor VPN ou o nome do domínio fornecido pelo seu ISP."
            }, {
                type: "name",
                title: "Tamanho da MTU",
                content: "O tamanho da MTU (Unidade Máxima de Transmissão) predefinido e típico para a maior parte das redes Ethernet é 1460 Bytes (1420 para PPTP). Não altere o tamanho da MTU predefinido exceto se solicitado pelo seu ISP."
            }, {
                type: "name",
                title: "Modo de ligação",
                content: "Selecione um modo de ligação apropriado que determine a forma como liga à Internet.",
                children: [{
                    type: "name",
                    title: "Sempre ligado",
                    content: "Neste modo, a ligação à Internet religa-se automaticamente sempre que se desligar."
                }, {
                    type: "name",
                    title: "Ligar a pedido",
                    content: "Neste modo, a ligação à Internet será encerrada automaticamente após ter decorrido um determinado tempo de inatividade (Tempo Máximo de Inatividade). A ligação é restabelecida quando tentar aceder novamente à Internet."
                }, {
                    type: "name",
                    title: "Ligar manualmente",
                    content: "Neste modo, a ligação à Internet é controlada manualmente clicando no botão Ligar ou desligar. Este modo também suporta a função de Tempo Máximo de Inatividade. Introduza o Tempo Máximo de Inatividade (em minutos) para especificar o tempo máximo em que a ligação à Internet pode estar inativa antes de ser encerrada. O valor predefinido é 15 minutos. Se pretender que a ligação à Internet permaneça sempre ativa, introduza 0 (zero)."
                }]
            }, {
                type: "title",
                content: "Clone MAC"
            }, {
                type: "name",
                title: "Utilizar o Endereço MAC Predefinido",
                content: "Selecione esta opção para utilizar o endereço MAC predefinido no caso em que o ISP não lhe tenha atribuído um endereço IP para o endereço MAC do router."
            }, {
                type: "name",
                title: "Utilizar o Endereço MAC do Computador Atual",
                content: "Selecione esta opção para utilizar o endereço MAC do computador ligado atualmente no caso em que o ISP apenas permita o acesso à Internet através deste computador."
            }, {
                type: "name",
                title: "Utiliza o Endereço MAC Personalizado",
                content: "Selecione esta opção para introduzir manualmente o endereço MAC registado."
            }]
        },
        route: {
            TITLE: "Routing avançado",
            CONTENT: [{
                type: "paragraph",
                content: "O Routing avançado é usado para predeterminar uma rota fixa para os pacotes de informações da rede para alcançar um anfitrião ou rede específico."
            }, {
                type: "title",
                content: "Rotas Estáticas"
            }, {
                type: "name",
                title: "Endereço IP de Destino/Máscara de sub-rede/Gateway",
                content: "Exibe o Endereço IP de Destino, a Máscara de sub-rede e o Gateway da Rota Estática."
            }, {
                type: "name",
                title: "Ativar",
                content: "Indica o estado atual da rota estática Clique no ícone <b>Lâmpada</b> para ativar (ou desativar) a rota estática."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para <b>Modificar</b> ou <b>Eliminar</b> a entrada correspondente."
            }, {
                type: "note",
                title: "Para configurar um encaminhamento estático",
                content: [
                    "Clique em <b>Adicionar</b>.",
                    "Introduza um endereço IP de destino para atribuir a rota estática a esta entrada.",
                    "Introduza uma máscara de sub-rede no formato hexadecimal para determinar a porção de rede e a porção de anfitrião do endereço IP.",
                    "Introduza um formato de endereço IP de gateway para ligar o router à rede ou ao anfitrião.",
                    "Selecione <b>LAN</b> ou uma interface WAN para especificar o tipo do Endereço IP de Destino.",
                    "Selecione <b>Ativar esta entrada</b>.",
                    "Clique em <b>OK</b>."
                ]
            }, {
                type: "title",
                content: "Tabela de Encaminhamento do Sistema"
            }, {
                type: "paragraph",
                content: "A Tabela de Encaminhamento do Sistema exibe todas as entradas de rota válidas que estão atualmente em uso."
            }, {
                type: "paragraph",
                content: "Clique em Atualizar para atualizar a tabela de encaminhamento."
            }]
        },
        ddns: {
            TITLE: "Definições do DNS Dinâmico",
            CONTENT: [{
                type: "paragraph",
                content: "O DNS (Domain Name System - Sistema de Nomes de Domínio) permite atribuir um anfitrião fixo e um nome de domínio a um endereço IP de Internet dinâmico. É útil quando está a alojar o seu próprio Web site, servidor FTP ou outro servidor atrás do router. Em primeiro lugar, precisa de assinar com um fornecedor de serviço DDNS como  <a href='http://www.dyndns.com'>www.dyndns.com</a>."
            }, {
                type: "name",
                title: "Fornecedor de Serviço",
                content: "Selecione o seu fornecedor de serviço DDNS. Se não tiver registado uma conta de DDNS, clique em <b>Ir para registar</b>"
            }, {
                type: "name",
                title: "Nome de utilizador/Palavra-passe",
                content: "Introduza o nome de utilizador e a palavra-passe da sua conta DDNS."
            }, {
                type: "name",
                title: "Nome de Domínio",
                content: "Introduza o nome do domínio fornecido pelo fornecedor do serviço DDNS."
            }, {
                type: "name",
                title: "Iniciar Sessão/Encerrar Sessão",
                content: "Clique para iniciar sessão ou encerrar sessão do serviço DDNS."
            }, {
                type: "name",
                title: "Guardar",
                content: "Clique para guardar todas as definições."
            }, {
                type: "paragraph",
                content: "Para alternar entre as suas contas de DDNS, clique em Encerrar Sessão (Log Out) para fazer encerrar sessão da conta atual e depois inicie sessão novamente com uma conta diferente."
            }]
        },
        dhcp: {
            TITLE: "Servidor DHCP",
            CONTENT: [{
                type: "paragraph",
                content: "O servidor DHCP (Dynamic Host Configuration Protocol - Protocolo de Configuração Dinâmica de Anfitrião) atribui dinamicamente a configuração TCP/IP aos dispositivos de cliente a partir de um conjunto de endereços IP. NÃO desative o servidor DHCP predefinido a não ser que tenha outro servidor DHCP ou se pretender atribuir manualmente a configuração do TCP/IP a clientes individuais na sua rede."
            }, {
                type: "name",
                title: "Conjunto de Endereços IP",
                content: "Introduza o intervalo de endereços IP que podem ser concedidos aos clientes."
            }, {
                type: "name",
                title: "Tempo de Concessão de Endereço",
                content: "Introduza a duração de tempo que um endereço IP é concedido ao cliente entre 1 e 2880 minutos."
            }, {
                type: "name",
                title: "Gateway Predefinido",
                content: "Introduza o endereço IP da LAN. (Opcional)"
            }, {
                type: "name",
                title: "Servidor DNS/Servidor DNS Secundário",
                content: "Introduza os endereços de servidor DNS como fornecidos pelo seu ISP. (Opcional)"
            }, {
                type: "title",
                content: "Lista de Clientes"
            }, {
                type: "name",
                title: "Clientes Totais",
                content: "Exibe o número total de clientes DHCP associados."
            }, {
                type: "name",
                title: "Nome do Cliente",
                content: "Exibe o nome do cliente DHCP."
            }, {
                type: "name",
                title: "Endereço MAC",
                content: "Exibe o endereço MAC."
            }, {
                type: "name",
                title: "Endereço IP atribuído",
                content: "Exibe o endereço IP atribuído ao cliente pelo servidor DHCP."
            }, {
                type: "name",
                title: "Tempo concedido",
                content: "Exibe o tempo de duração do endereço IP que foi concedido ao cliente."
            }, {
                type: "name",
                title: "Atualizar",
                content: "Clique em para atualizar a lista de Clientes DHCP."
            }, {
                type: "title",
                content: "Reserva de Endereço"
            }, {
                type: "paragraph",
                content: "Pode reservar manualmente um endereço IP para um cliente que esteja ligado ao router. Uma vez reservado, o endereço IP só será atribuído ao mesmo cliente pelo servidor DHCP."
            }, {
                type: "name",
                title: "Endereço MAC",
                content: "Exibe o endereço MAC do cliente com endereço IP reservado do DHCP."
            }, {
                type: "name",
                title: "Endereço IP reservado",
                content: "Exibe o endereço IP reservado do cliente."
            }, {
                type: "name",
                title: "Descrição",
                content: "Exibe a descrição do dispositivo."
            }, {
                type: "name",
                title: "Ativar",
                content: "Clique para ativar ou desativar a entrada correspondente."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para <b>Modificar</b> ou <b>Eliminar</b> o cliente correspondente."
            }, {
                type: "note",
                title: "Para reservar um endereço IP para um cliente DHCP",
                content: [
                    "Clique em <b>Adicionar</b>.",
                    "Introduza o <b>Endereço MAC</b> do cliente.",
                    "Introduza o endereço IP que que pretende reservar para o cliente.",
                    "Introduza a descrição do dispositivo.",
                    "Selecione <b>Ativar esta entrada</b>.",
                    "Clique em <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "Para modificar ou eliminar um cliente existente",
                content: [
                    "Clique no ícone <b>Editar</b> ou <b>Reciclagem</b> na entrada correspondente."
                ]
            }, {
                type: "title",
                content: "Conjunto de Condições"
            }, {
                type: "name",
                title: "ID do Fornecedor/Endereço IP de Início/Endereço IP de Fim/Função",
                content: "Exibe a ID do Fornecedor, Endereço IP de Início, Endereço IP de Fim e a Função do conjunto de condições."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica o estado atual do conjunto condições Clique no ícone Lâmpada para ativar (ou desativar) o conjunto de condições."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para <b>Modificar</b> ou <b>Eliminar</b> o cliente correspondente."
            }, {
                type: "note",
                title: "Para adicionar um conjunto de condições",
                content: [
                    "Clique em <b>Adicionar</b>.",
                    "Introduza o nome do dispositivo de LAN.",
                    "Introduza um valor para identificar o fornecedor e a funcionalidade do cliente DHCP.",
                    "Introduza o endereço IP de início que o servidor DHCP atribui aos clientes.",
                    "Introduza o endereço IP de fim que o servidor DHCP atribui aos clientes.",
                    "Introduza o gateway predefinido do servidor DHCP.",
                    "Selecione um tipo de dispositivo a partir da lista suspensa.",
                    "Selecione uma opção a partir da lista suspensa.",
                    "Introduza o valor de opção.",
                    "Selecione <b>Ativar esta entrada</b>.",
                    "Clique em <b>OK</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "Definições de IPTV",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Selecione para ativar funcionalidade de IPTV."
            }, {
                type: "name",
                title: "Modo",
                content: "Selecione o modo adequado de acordo com o seu ISP. Existem seis modos de IPTV:",
                children: [{
                    type: "name",
                    title: "Bridge (Ponte)",
                    content: "Selecione esta opção se o seu ISP não estiver listado e nenhuns outros parâmetros estejam predeterminados.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Atribuir a sua porta LAN tanto para funcionar como o fornecedor da Internet ou como fornecedor de IPTV."
                    }]
                }, {
                    /*type: "name",
                    title: "Rússia",
                    content: "Selecione esta opção se o ISP for da Rússia e os parâmetros necessários são predeterminados, incluindo Internet/IP-Telefone/IPTV e Prioridade VLAN de ID e porta LAN (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "ID/Prioridade de VLAN de Multicast IPTV",
                        content: "Pode ativar a funcionalidade multicast IPTV conforme pretender e configurar o ID e a Prioridade de VLAN de acordo com o seu ISP."
                    }]
                }, {*/
                    type: "name",
                    title: "ExStream de Singapura",
                    content: "Selecione este se o seu ISP é a ExStream de Singapura e os parâmetros necessários estão predeterminados, incluindo os IDS e prioridade de VLAN de Internet/IPTV e porta LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Unifi da Malásia",
                    content: "Selecione este se o seu ISP é a Unifi da Malásia e os parâmetros necessários estão predeterminados, incluindo os IDS e prioridade de VLAN de Internet/IPTV e porta LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Maxis da Malásia",
                    content: "Selecione este se o seu ISP é a Maxis da Malásia e os parâmetros necessários estão predeterminados, incluindo os IDS e prioridade de VLAN de Internet/IPTV e porta LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Personalizar",
                    content: "Selecione esta opção se o seu ISP não estiver listado, mas fornece os parâmetros necessários, incluindo IDS e prioridade de VLAN de Internet/Telefone IP/IPTV e porta LAN (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "ID/Prioridade de VLAN de Internet/Telefone IP/IPTV",
                        content: "Configurar as IDs de VLAN como fornecidas pelo seu ISP."
                    }, {
                        type: "name",
                        title: "802.11Q Tag",
                        content: "Selecione se marcar os pacotes de Internet com 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Atribuir a sua porta LAN quer para funcionar como o fornecedor da Internet, quer como fornecedor de IPTV."
                    }, {
                        type: "name",
                        title: "ID/Prioridade de VLAN de Multicast IPTV",
                        content: "Pode ativar a funcionalidade multicast IPTV conforme pretender e configurar o ID e a Prioridade de VLAN de acordo com o seu ISP."
                    }]
                }]
            }, {
                type: "name",
                title: "Proxy IGMP",
                content: "Selecione a versão Proxy do IGMP (Internet Group Management Protocol - Protocolo de Gestão de Grupo de Internet), V2 ou V3, de acordo com o seu ISP."
            }]
        },
        usbManage: {
            TITLE: "Dispositivo de Armazenamento USB",
            CONTENT: [{
                type: "paragraph",
                content: "O ecrã <b>Dispositivo de Armazenamento USB</b> exibe as informações básicas do dispositivo de armazenamento USB ligado através da porta USB."
            }, {
                type: "name",
                title: "Analisar",
                content: "Geralmente, o router deteta automaticamente qualquer dispositivo recentemente conectado. Caso contrário, clique neste botão para analisar e atualizar o ecrã com a informação atualizada."
            }, {
                type: "name",
                title: "Nome do volume",
                content: "Exibe o nome do volume USB."
            }, {
                type: "name",
                title: "Capacidade",
                content: "Exibe a capacidade total de armazenamento do dispositivo USB."
            }, {
                type: "name",
                title: "Espaço livre",
                content: "Exibe o espaço livre de armazenamento disponível atualmente."
            }, {
                type: "name",
                title: "Ativo",
                content: "Esta caixa de seleção aparece apenas quando o dispositivo de armazenamento USB está ligado ao router. Selecione para ativar a partilha de ficheiros do dispositivo USB."
            }, {
                type: "name",
                title: "Remover com segurança",
                content: "Clique neste botão para desmontar com segurança o dispositivo de armazenamento USB antes de o extrair fisicamente do router. Observe que o botão Remover com segurança só aparece quando existe um dispositivo de armazenamento USB ligado ao router. Além disso, tenha em mente que não é capaz de desmontar o dispositivo USB enquanto estiver em uso."
            }, {
                type: "title",
                content: "Definições de Partilha"
            }, {
                type: "name",
                title: "Suportes de Rede/Nome do Servidor",
                content: "Exibe o nome usado para aceder ao dispositivo de armazenamento USB ligado."
            }, {
                type: "title",
                content: "Partilha de Pastas"
            }, {
                type: "name",
                title: "Partilhar Todos",
                content: "Ative para partilhar todos os ficheiros e pastas ou desative para partilhar apenas as pastas selecionadas."
            }, {
                type: "name",
                title: "Ativar a Autenticação",
                content: "Ative para permitir a autenticação que exige que os utilizadores introduzam um nome de utilizador e palavra-passe válidos para aceder todas as pastas partilhadas."
            }, {
                type: "name",
                title: "Nome da Pasta",
                content: "Exibe o nome da pasta partilhada. "
            }, {
                type: "name",
                title: "Caminho da Pasta",
                content: "Exibe o caminho para a pasta partilhada. "
            }, {
                type: "name",
                title: "Nome do Volume",
                content: "Exibe o nome do volume partilhado."
            }]
        },
        printSrv: {
            TITLE: "Servidor de Impressão",
            CONTENT: [{
                type: "name",
                title: "Ativar Servidor de Impressão",
                content: "Ative para permitir a função do servidor de impressão."
            }, {
                type: "name",
                title: "Nome da Impressora",
                content: "Exibe o nome da sua impressora ligada ao router."
            }]
        },
        diskSettings: {
            TITLE: "Dispositivo de Armazenamento USB",
            CONTENT: [{
                type: "paragraph",
                content: "O ecrã <b>Dispositivo de Armazenamento USB</b> exibe as informações básicas do dispositivo de armazenamento USB ligado através da porta USB."
            }, {
                type: "name",
                title: "Analisar",
                content: "Geralmente, o router deteta automaticamente qualquer dispositivo recentemente conectado. Caso contrário, clique neste botão para analisar e atualizar o ecrã com a informação atualizada."
            }, {
                type: "name",
                title: "Nome do volume",
                content: "Exibe o nome do volume USB."
            }, {
                type: "name",
                title: "Capacidade",
                content: "Exibe a capacidade total de armazenamento do dispositivo USB."
            }, {
                type: "name",
                title: "Espaço livre",
                content: "Exibe o espaço livre de armazenamento disponível atualmente."
            }, {
                type: "name",
                title: "Ativo",
                content: "Esta caixa de seleção aparece apenas quando o dispositivo de armazenamento USB está ligado ao router. Selecione para ativar a partilha de ficheiros do dispositivo USB."
            }, {
                type: "name",
                title: "Remover com segurança",
                content: "Clique neste botão para desmontar com segurança o dispositivo de armazenamento USB antes de o extrair fisicamente do router. Observe que o botão Remover com segurança só aparece quando existe um dispositivo de armazenamento USB ligado ao router. Tenha também em mente que não é capaz de desmontar o dispositivo USB enquanto o volume atual estiver ocupado."
            }, {
                type: "note",
                title: "Para configurar um servidor de ficheiros",
                content: [
                    "Conecte o dispositivo de armazenamento USB à porta USB do router utilizando um cabo USB.",
                    "O dispositivo USB recém-conectado deve ser detetado automaticamente pelo router e exibida as informações na secção <b>Definições do Dispositivo</b>. Caso contrário, clique em <b>Analisar</b>.",
                    "Clique no ícone <b>Ativar</b> para ativar a partilha de ficheiros."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Partilha de Conta",
            CONTENT: [{
                type: "name",
                title: "Conta",
                content: "Pode selecionar <b>Utilizar Conta Predefinida</b> para iniciar sessão nos ficheiros e pastas partilhados ou <b>Utilizar Nova Conta</b> e introduzir o seguinte para criar uma nova conta de utilizador."
            }, {
                type: "name",
                title: "Nome de utilizador/Palavra-passe",
                content: "Introduza até 15 caracteres contendo letras, números e/ou cadeias sublinhadas. O nome de usuário deve começar com um caractere do alfabeto. Estes campos são sensíveis a maiúsculas e minúsculas. "
            }, {
                type: "paragraph",
                content: "Clique em <b>Guardar</b> para guardar as definições da conta."
            }, {
                type: "title",
                content: "Definições de Partilha"
            }, {
                type: "name",
                title: "Nome da Rede/Servidor de Multimédia",
                content: "Exibe o nome usado para aceder ao dispositivo de armazenamento USB ligado."
            }, {
                type: "name",
                title: "Ativar",
                content: "Marque a(s) caixa(s) de seleção para ativar o(s) método(s) de acesso correspondente(s)."
            }, {
                type: "name",
                title: "Método de Acesso",
                content: "Existem quatro métodos para aceder ao dispositivo de armazenamento USB.",
                children: [{
                    type: "name",
                    title: "Servidor de Multimédia",
                    content: "Selecione esta opção para permitir que os utilizadores na sua rede vejam fotografias, reproduzam música e vejam filmes no seu dispositivo de armazenamento USB partilhado a partir dos dispositivos suportados por DLNA como computadores, dispositivos móveis e consolas de jogos (PS2/3)."
                }, {
                    type: "name",
                    title: "Vizinhança de Rede",
                    content: "Selecione esta opção para permitir que os utilizadores na sua rede acedam ao conteúdo partilhado através do endereço mostrado sob a coluna de Endereço."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Selecione esta opção para ativar a funcionalidade do servidor de FTP que permite que os clientes de FTP e utilizadores na sua rede acedam ao dispositivo de armazenamento USB através do endereço FTP mostrado sob a coluna de Endereço. Para alterar a porta do servidor de FTP, introduza um novo número de porta e clique em <b>Guardar</b> para aplicar as alterações."
                }, {
                    type: "name",
                    title: "FTP (Via Internet)",
                    content: "Selecione esta opção para permitir que os clientes de FTP e utilizadores acedam remotamente, transfiram e carreguem ficheiros para o dispositivo de armazenamento USB partilhado via FTP através da Internet."
                }]
            }, {
                type: "name",
                title: "Acesso",
                content: "Exibe o endereço usado para aceder ao dispositivo de armazenamento USB."
            }, {
                type: "name",
                title: "Porta",
                content: "Exibe o número da porta do servidor de FTP."
            }, {
                type: "title",
                content: "Partilha de Pastas"
            }, {
                type: "name",
                title: "Partilhar Todos",
                content: "Ative para partilhar todos os ficheiros e pastas ou desative para partilhar apenas as pastas selecionadas."
            }, {
                type: "name",
                title: "Ativar a Autenticação",
                content: "Ative para permitir a autenticação que exige que os utilizadores introduzam um nome de utilizador e palavra-passe válidos para aceder todas as pastas partilhadas."
            }, {
                type: "name",
                title: "Nome da Pasta",
                content: "Exibe o nome da pasta partilhada. "
            }, {
                type: "name",
                title: "Caminho da Pasta",
                content: "Exibe o caminho para a pasta partilhada. "
            }, {
                type: "name",
                title: "Partilha de Multimédia",
                content: "Exibe se a funcionalidade de partilha de multimédia está ativada (On) ou desativada (Off)."
            }, {
                type: "name",
                title: "Nome do Volume",
                content: "Exibe o nome do volume partilhado."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica o estado atual de uma pasta partilhada. Clique no ícone Lâmpada para ativar (ou desativar) a partilha de pastas."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para <b>Modificar</b> ou <b>Eliminar</b> a pasta partilhada correspondente."
            }, {
                type: "note",
                title: "Para adicionar uma entrada de partilha de pastas:",
                content: [
                    "Desative <b>Selecionar Tudo</b>.",
                    "Clique em <b>Adicionar</b>.",
                    "Selecione o <b>Nome do Volume</b> e <b>Caminho de Pasta</b>.",
                    "Crie um nome de pasta.",
                    "Decida o modo como partilha a pasta:<br /><b>Ativar a Autenticação</b> - Selecione para solicitar aos utilizadores que autentiquem com um nome de utilizador e palavra-passe válidos para aceder às pastas partilhadas.<br /><b>Ativar Acesso de Gravação</b> - Selecione para permitir que os utilizadores façam alterações ao conteúdo da pasta.<br /><b>Ativar Partilha de Multimédia</b> - Selecione para ativar a partilha de multimédia.<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "Definições de IPSec",
            CONTENT: [{
                type: "name",
                title: "Dead Peer Detection (Deteção de Ponto Inativo)",
                content: "A Dead Peer Detection (DPD) é uma funcionalidade de deteção de um Peer (ponto de ligação) de Internet Key Exchange (IKE) morto. O DPD é utilizado para verificação e obtenção de recursos caso um Peer seja considerado como morto ou em caso de redundância na ocorrência de falha com um Peer IKE. Mude para Ligado para ativar a funcionalidade de Dead Peer Detection."
            }, {
                type: "name",
                title: "Nome da Ligação/Gateway Remoto/Endereço Local/Endereço Remoto",
                content: "Exibe o Nome da Ligação, o Gateway Remoto, o Endereço Local e o Endereço Remoto da entrada IPSec."
            }, {
                type: "name",
                title: "Estado",
                content: "Exibe o estado da entrada IPSec. O estado inclui:",
                children: [{
                    type: "name",
                    title: "Desativada",
                    content: "A entrada está desativada."
                }, {
                    type: "name",
                    title: "Em baixo",
                    content: "A entrada está ativa, mas sem ligação."
                }, {
                    type: "name",
                    title: "Em cima",
                    content: "A entrada está ativa e a ligação está estabelecida. "
                }]
            }, {
                type: "name",
                title: "Ativar",
                content: "Clique no ícone <b>Lâmpada</b> para ativar ou desativar a entrada."
            }, {
                type: "name",
                title: "Modificar",
                content: "Exibe opções para <b>Modificar</b> ou <b>Eliminar</b> a entrada correspondente."
            }, {
                type: "name",
                title: "Adicionar",
                content: "Clique para adicionar uma nova ligação VPN IPSec."
            }, {
                type: "name",
                title: "Nome da Ligação IPSec",
                content: "Introduza um nome para a ligação VPN IPSec."
            }, {
                type: "name",
                title: "Endereço do Gateway IPSec Remoto (URL)",
                content: "Introduza o endereço IP do gateway de destino que é o IP WAN público ou Nome de Domínio do ponto final do servidor de VPN remoto."
            }, {
                type: "name",
                title: "Acesso por túnel a partir de endereços IP locais",
                content: "Selecione Endereço de Sub-rede se pretender que toda a LAN se junte à rede VPN ou selecione Endereço Único se pretender um IP único para se juntar à rede VPN."
            }, {
                type: "name",
                title: "Endereço IP para VPN",
                content: "Introduza o endereço IP da sua LAN. "
            }, {
                type: "name",
                title: "Máscara de sub-rede do IP",
                content: "Introduza a máscara de sub-rede da sua LAN."
            }, {
                type: "name",
                title: "Acesso por túnel a partir de endereços IP remotos",
                content: "Selecione Endereço de Sub-rede se pretender que toda a LAN remota se junte à rede VPN ou selecione Endereço Único se pretender um IP único para se juntar à rede VPN."
            }, {
                type: "name",
                title: "Endereço IP para VPN",
                content: "Introduza o endereço IP da LAN remota. "
            }, {
                type: "name",
                title: "Máscara de sub-rede do IP",
                content: "Introduza a máscara de sub-rede da LAN remota."
            }, {
                type: "name",
                title: "Método de Troca de Chave",
                content: "Selecione Auto (IKE) ou Manual para ser usado para autenticar os pontos IPSec."
            }, {
                type: "name",
                title: "Método de Autenticação",
                content: "Selecione Chave Pré-partilhada (recomendado)."
            }, {
                type: "name",
                title: "Chave Pré-partilhada",
                content: "Crie uma chave pré-partilhada para ser usada para autenticação."
            }, {
                type: "name",
                title: "Perfect Forward Secrecy ( Sigilo Perfeito de Encaminhamento)",
                content: "Selecione Ativar (ou Desativar) o Perfect Forward Secrecy (PFS) como um protocolo de segurança adicional para a chave pré-partilhada."
            }, {
                type: "name",
                title: "Avançado",
                content: "Clique para configurar as definições avançadas Recomendamos que mantenha as predefinições. Se pretender alterar estas definições, certifique-se de que ambos os pontos finais do servidor VPN usam o mesmo Algoritmo de Encriptação, Algoritmo de Integridade, Grupo Diffie-Hellman e Key Lifetime (Vida útil da chave) tanto na fase1 como na fase2.",
                children: [{
                    type: "title2",
                    content: "Fase 1"
                }, {
                    type: "name",
                    title: "Modo",
                    content: "Selecione <b>Principal</b> para configurar os parâmetros de negociação padrão para a fase 1 de IKE. Selecione <b>Agressivo</b> para configurar a Fase 1 de IKE do Túnel VPN para efetuar a negociação numa quantidade de tempo menor. (Não recomendado uma vez que é menos seguro)."
                }, {
                    type: "name",
                    title: "Tipo de Identificador Local",
                    content: "Selecione o tipo de Identificador local para a negociação de IKE. O IP WAN Local usa um endereço IP como o identificador na negociação IKE. O FQDN (Fully Qualified Domain Name - Nome de Domínio Totalmente Qualificado) usa um nome de utilizador como identificador."
                }, {
                    type: "name",
                    title: "Identificador Local",
                    content: "O identificador local será auto-preenchido se o <b>IP WAN Local</b> for selecionado. Se <b>FQDN</b> for selecionado, introduza um nome de utilizador do dispositivo local para ser usado como o identificador para a negociação IKE."
                }, {
                    type: "name",
                    title: "Tipo de Identificador Remoto",
                    content: "Selecione o tipo de Identificador remoto para a negociação de IKE. O IP WAN Remoto usa um endereço IP como o identificador na negociação IKE. O FQDN usa um nome de utilizador como o identificador."
                }, {
                    type: "name",
                    title: "Identificador Remoto",
                    content: "O endereço IP do gateway remoto será auto-preenchido se o <b>IP WAN Remoto</b> for selecionado. Se <b>FQDN</b> for selecionado, introduza um nome de utilizador do ponto remoto para ser usado como o identificador para a negociação IKE."
                }, {
                    type: "name",
                    title: "Algoritmo de Encriptação",
                    content: "Selecione um dos seguintes algoritmos de encriptação para a negociação IKE.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "O DES (Data Encryption Standard - Padrão de Encriptação de Dados) encripta  um bloco de 64 bits de texto simples com uma chave de 56 bit."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "O triplo DES, encripta um texto simples com chave de 168 bit."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Usa o algoritmo AES e chave de 128 bit para encriptação."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Usa o algoritmo AES e chave de 192 bit para encriptação."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Usa o algoritmo AES e chave de 256 bit para encriptação."
                    }]
                }, {
                    type: "name",
                    title: "Algoritmo de integridade",
                    content: "Selecione um dos seguintes algoritmos de integridade para a negociação IKE.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "O MD5 (Message Digest Algorithm - Algoritmo de Resumo de Mensagens) recebe uma mensagem de comprimento arbitrário e gera um resumo de mensagem de 128 bits."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "O SHA1 (Secure Hash Algorithm - Algoritmo de Hash Seguro) recebe uma mensagem menor do que 2^64 (2 à potência de 64) em bits e gera um resumo de mensagem de 160 bits."
                    }]
                }, {
                    type: "name",
                    title: "Grupo Diffie-Hellman para Troca de Chave",
                    content: "Selecione o grupo Diffie-Hellman para ser usado na Fase 1 de negociação de chave. O Grupo Diffie-Hellman define a força do algoritmo em bits."
                }, {
                    type: "name",
                    title: "Key Lifetime (Vida útil da Chave)",
                    content: "Introduza o período de tempo (em segundos) para passar antes de estabelecer uma nova associação de segurança (SA) com o ponto final remoto. O valor predefinido é 3600."
                }, {
                    type: "title2",
                    content: "Fase 2"
                }, {
                    type: "name",
                    title: "Algoritmo de Encriptação",
                    content: "Selecione um dos seguintes algoritmos de encriptação para a negociação IKE.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "O DES (Data Encryption Standard - Padrão de Encriptação de Dados) encripta  um bloco de 64 bits de texto simples com uma chave de 56 bit."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "O triplo DES, encripta um texto simples com chave de 168 bit."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Usa o algoritmo AES e chave de 128 bit para encriptação."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Usa o algoritmo AES e chave de 192 bit para encriptação."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Usa o algoritmo AES e chave de 256 bit para encriptação."
                    }]
                }, {
                    type: "name",
                    title: "Algoritmo de integridade",
                    content: "Selecione um dos seguintes algoritmos de integridade para a negociação IKE.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "O MD5 (Message Digest Algorithm - Algoritmo de Resumo de Mensagens) recebe uma mensagem de comprimento arbitrário e gera um resumo de mensagem de 128 bits."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "O SHA1 (Secure Hash Algorithm - Algoritmo de Hash Seguro) recebe uma mensagem menor do que 2^64 (2 à potência de 64) em bits e gera um resumo de mensagem de 160 bits."
                    }]
                }, {
                    type: "name",
                    title: "Grupo Diffie-Hellman para Troca de Chave",
                    content: "Selecione o grupo Diffie-Hellman para ser usado na Fase 2 de negociação de chave. O Grupo Diffie-Hellman define a força do algoritmo em bits."
                }, {
                    type: "name",
                    title: "Key Life Time (Tempo de Vida Útil da Chave)",
                    content: "Introduza o período de tempo (em segundos) para passar antes de estabelecer uma nova associação de segurança (SA) com o ponto final remoto. O valor predefinido é 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Configuração da Ligação à Internet",
            CONTENT: [{
                type: "name",
                title: "Deteção automática",
                content: "Clique neste botão para que o router detete automaticamente o seu tipo atual de ligação à Internet."
            }, {
                type: "paragraph",
                title: "Observação",
                content: "Se não tiver certeza sobre qual o tipo de ligação à Internet que possui, utilize a função de deteção automática ou entre em contacto com seu ISP para obter ajuda."
            }, {
                type: "title",
                title: "Tipo de Ligação à Internet: IP estático"
            }, {
                type: "name",
                title: "Endereço IP/Máscara de sub-rede/Gateway Predefinido/DNS Primário/DNS Secundário",
                content: "Introduza a informação fornecida pelo seu ISP."
            }, {
                type: "title",
                title: "Tipo de Ligação à Internet: IP dinâmico"
            }, {
                type: "name",
                title: "NÃO Clonar o Endereço MAC/Clonar o Endereço MAC do Computador Atual",
                content: "Selecione se pretende clonar o seu endereço MAC ou não, de acordo com o seu ISP."
            }, {
                type: "title",
                title: "Tipo de Ligação à Internet: PPPoE"
            }, {
                type: "name",
                title: "Nome de utilizador/Palavra-passe",
                content: "Introduza o nome de utilizador e a palavra-passe fornecidos pelo seu ISP. Estes campos são sensíveis a maiúsculas e minúsculas."
            }, {
                type: "title",
                title: "Tipo de Ligação à Internet: L2TP/PPTP"
            }, {
                type: "name",
                title: "Nome de utilizador/Palavra-passe",
                content: "Introduza o nome de utilizador e a palavra-passe fornecidos pelo seu ISP. Estes campos são sensíveis a maiúsculas e minúsculas."
            }, {
                type: "name",
                title: "Ligação Secundária (IP Dinâmico ou IP Estático)",
                children: [{
                    type: "name",
                    title: "IP dinâmico",
                    content: "Selecione esta opção se o endereço IP e a Máscara de sub-rede lhe forem automaticamente atribuídos pelo seu ISP."
                }, {
                    type: "name",
                    title: "IP Estático",
                    content: " Selecione esta opção se o endereço IP, a Máscara de sub-rede, o Gateway e os endereços DNS lhe forem fornecidas pelo seu ISP e introduza esta informação nos campos correspondentes."
                }]
            }, {
                type: "name",
                title: "IP do Servidor VPN/Nome de Domínio",
                content: "Introduza o endereço IP do servidor VPN ou o Nome do Domínio fornecido pelo seu ISP."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Servidor de Impressão",
            CONTENT: [{
                type: "paragraph",
                content: "Pode configurar o servidor de impressão nesta página."
            }, {
                type: "name",
                title: "Servidor de Impressão",
                content: "Indica Ativar/desativar o estado atual do servidor de impressão."
            }, {
                type: "name",
                title: "Nome da impressora",
                content: "Nome da impressora ligada ao router."
            }, {
                type: "note",
                title: "Siga as instruções abaixo para configurar o servidor de impressão:",
                content: [
                    "Passo 1 Ligue a impressora USB à porta USB do router com um cabo de impressora USB.",
                    "Passo 2:  Instale o controlador da impressora no seu computador.",
                    "Passo 3:  Instale o controlador da impressora USB do TP-LINK no computador. Execute o CD da funcionalidade o descarregue o utilitário do controlador da impressora USB TP-LINK enm nosso site da WEB: www.tp-link.com."
                ]
            }]
        },
        sysconf: {
            TITLE: "Definições avançadas da rede Wi-Fi 2,4GHz | 5GHz-1 | 5GHz-2",
            CONTENT: [{
                type: "name",
                title: "Intervalo de sinalização",
                content: "Introduza um valor entre 25 e 1000 em milissegundos para determinar a duração entre os quais pacotes de sinalização são difundidos pelo router para sincronizar a rede Wi-Fi. O valor predefinido é 100 milésimos de segundos."
            }, {
                type: "name",
                title: "Limiar de RTS",
                content: "Introduza um valor entre 1 e 2346 em bytes para determinar o tamanho do pacote de transmissão de dados através do router. Por predefinição, o tamanho do Limiar de RTS (Request to Send - Pedido para Enviar) é 2346. Se o tamanho do pacote for maior do que o limiar predefinido, o router envia um Pedido para Enviar pacotes para uma estação recetora específica e negoceia o envio de um pacote de dados, ou então o pacote será enviado imediatamente."
            }, {
                type: "name",
                title: "Intervalo de DTIM",
                content: "Introduza um valor entre 1 e 255 para determinar o intervalo de Mensagem de indicação de tráfego de entrega (DTIM). 1 indica que o intervalo de DTIM é o mesmo que o Intervalo de Sinalização."
            }, {
                type: "name",
                title: "Período de Atualização da Chave de Grupo",
                content: "Introduza o número de segundos (mínimo 30) para controlar o intervalo de tempo para a renovação automática da chave de encriptação. O valor predefinido é 0, indicando que não há renovação da chave."
            }, {
                type: "name",
                title: "Funcionalidade de WMM",
                content: "A função WMM (Wi-Fi multi-media) garante que os pacotes com mensagens de alta prioridade sejam transmitidos preferencialmente. É altamente recomendado e está ativado por predefinição."
            }, {
                type: "name",
                title: "Funcionalidade de GI curto",
                content: "Esta função aumenta a capacidade dos dados ao reduzir o tempo de Guard Interval (GI) (Intervalo de proteção) É altamente recomendado e está ativado por predefinição."
            }, {
                type: "name",
                title: "Funcionalidade de isolamento do PA",
                content: "Marque esta caixa de seleção para ativar a funcionalidade de Isolamento do PA que permite limitar e restringir todos os dispositivos sem fios na sua rede de interagir um com o outro, mas mantém-se capaz de aceder a Internet. O isolamento de AP está desativado por predefinição."
            }, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Ativar WPS",
                content: "Alternar para ativar a funcionalidade WPS."
            }, {
                type: "paragraph",
                content: "Clique em Guardar para guardar as suas configurações."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Modo Noite",
                content: "Quando esta função está ativada, os LEDs do router serão desligados automaticamente durante o período de tempo especificado."
            }, {
                type: "name",
                title: "Período Noturno",
                content: "Introduza o período noturno durante o qual os LEDs do router serão desligados."
            }, {
                type: "paragraph",
                content: "Clique em Guardar para guardar as suas configurações."
            }, {
                type: "title",
                title: "Definições de proteção DoS"
            }, {
                type: "paragraph",
                content: "O nível de proteção DoS protege o router de ataques TCP-SYN-Flood, UDP-Flood e ICMP-Flood ."
            }, {
                type: "name",
                title: "Nível dos pacotes ICMP-FLOOD",
                content: "Introduza um valor entre 5 e 3600 para acionar imediatamente a proteção ICMP-FLOOD quando o número de pacotes ICMP exceder o valor limite predefinido."
            }, {
                type: "name",
                title: "Nível de pacotes UDP-FLOOD",
                content: "Introduza um valor entre 5 e 3600 para acionar imediatamente a proteção UDP-FLOOD quando o número de pacotes UDP exceder o valor limite predefinido."
            }, {
                type: "name",
                title: "Nível de pacotes TCP-FLOOD",
                content: "Introduza um valor entre 5 e 3600 para acionar imediatamente a proteção TCP-SYN-FLOOD quando o número de pacotes TCP-SYN exceder o valor limite predefinido."
            }, {
                type: "paragraph",
                content: "Clique em Guardar para guardar as suas configurações."
            }]
        },
        logConf: {
            TITLE: "Definições do Registo",
            CONTENT: [{
                type: "name",
                title: "Guardar localmente",
                content: "Selecione para guardar os registos em sua memória local.",
                children: [{
                    type: "name",
                    title: "Nível mínimo",
                    content: "Selecione o nível mínimo na lista suspensa e depois todos os eventos registados acima ou igual ao nível selecionado a ser guardado."
                }]
            }, {
                type: "name",
                title: "Guardar remotamente",
                content: "Selecione para enviar registos ao endereço de IP especificado e à porta UDP do servidor de registo do sistema remoto.",
                children: [{
                    type: "name",
                    title: "Nível mínimo",
                    content: "Selecione o nível mínimo na lista suspensa e depois todos os eventos registados acima ou igual ao nível selecionado a ser guardado."
                }, {
                    type: "name",
                    title: "IP do Servidor",
                    content: "Especifique o endereço IP do servidor de registo do sistema remoto para quais os eventos serão enviados."
                }, {
                    type: "name",
                    title: "Porta do servidor",
                    content: "Especifique o número da porta do servidor de registo do sistema remoto para quais os eventos serão enviados."
                }, {
                    type: "name",
                    title: "Nome da função local",
                    content: "Selecione o nome da função local de acordo com o nome da função do seu servidor remoto."
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Rede Wi-Fi",
            CONTENT: [{
                type: "name",
                title: "Segurança",
                content: "Pode selecionar uma das seguintes opções de segurança. ",
                children: [{
                    type: "name",
                    title: "Sem segurança",
                    content: "As estações sem fios ligarão ao router sem qualquer encriptação. É fortemente recomendado escolher um dos seguintes modos para ativar a segurança."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Personal",
                    content: "Selecione o WPA baseado na frase de acesso pré-partilhada.",
                    children: [{
                        type: "name",
                        title: "Versão",
                        content: "Pode selecionar uma das seguintes versões",
                        children: [{
                            type: "name",
                            title: "Automática",
                            content: "Selecione WPA-PSK ou WPA2-PSK automaticamente com base na capacidade da estação sem fios e na solicitação."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Chave Pré-partilhada de WPA2."
                        }]
                    }, {
                        type: "name",
                        title: "Encriptação",
                        content: "Pode selecionar Automático, TKIP ou AES."
                    }, {
                        type: "name",
                        title: "Palavra-passe do sem fios",
                        content: "Pode inserir caracteres ASCII ou hexadecimais. Para hexadecimais, o comprimento deve ser entre 8 e 64 caracteres; para ASCII, o comprimento deve ser entre 8 e 63 caracteres."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Empresarial",
                    content: "Selecione WPA com base no servidor Radius.",
                    children: [{
                        type: "name",
                        title: "Versão",
                        content: "Pode selecionar uma das seguintes versões",
                        children: [{
                            type: "name",
                            title: "Automática",
                            content: "Selecione WPA ou WPA2 automaticamente com base na capacidade da estação sem fios e na solicitação."
                        }, {
                            type: "name",
                            title: "WPA-PSK",
                            content: "Acesso protegido do Wi-Fi. "
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "Versão 2 do WPA. "
                        }]
                    }, {
                        type: "name",
                        title: "Encriptação",
                        content: "Pode selecionar Automático, TKIP ou AES."
                    }, {
                        type: "name",
                        title: "IP do servidor Radius",
                        content: "Introduza o endereço IP do servidor Radius."
                    }, {
                        type: "name",
                        title: "Porta do Radius",
                        content: "Introduza a porta que o serviço Radius utilizou."
                    }, {
                        type: "name",
                        title: "Palavra-passe do Radius",
                        content: "Introduza a palavra-passe para o servidor Radius."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Selecione segurança WEP 802.11.",
                    children: [{
                        type: "name",
                        title: "Tipo",
                        content: "Pode selecionar um dos seguintes tipos",
                        children: [{
                            type: "name",
                            title: "Automática",
                            content: "Selecione o tipo de autenticação Chave partilhada ou Sistema aberto automaticamente com base na capacidade da estação sem fios e na solicitação."
                        }, {
                            type: "name",
                            title: "Chave partilhada",
                            content: "Selecione Autenticação de chave partilhada 802.11."
                        }, {
                            type: "name",
                            title: "Sistema aberto",
                            content: "Selecione a autenticação de Sistema aberto 802.11. "
                        }]
                    }, {
                        type: "name",
                        title: "Chave selecionada",
                        content: "Selecione qual das quatro chaves será utilizada."
                    }, {
                        type: "name",
                        title: "Formato da Chave WEP",
                        content: "Pode selecionar o formato ASCII ou hexadecimal. O formato ASCII significa qualquer combinação de caracteres do teclado no comprimento especificado. O formato hexadecimal significa qualquer combinação dos dígitos hexadecimais (0-9, a-f, A-F) no comprimento especificado."
                    }, {
                        type: "name",
                        title: "Tipo de chave",
                        content: "Pode selecionar o comprimento da chave WEP (64 bits ou 128 bits ou 152 bits.) para a encriptação. \"Desativado\" significa que esta introdução da chave WEP é inválida.",
                        children: [{
                            type: "name",
                            title: "Para a encriptação de 64 bits",
                            content: "Pode inserir 10 dígitos hexadecimais (qualquer combinação de 0-9, a-f, A-F e a tecla nulo não é permitida) ou 5 caracteres ASCII."
                        }, {
                            type: "name",
                            title: "Para a encriptação de 128 bits",
                            content: "Pode inserir 26 dígitos hexadecimais (qualquer combinação de 0-9, a-f, A-F e a tecla nulo não é permitida) ou 13 caracteres ASCII."
                        }, {
                            type: "name",
                            title: "Para a encriptação de 152 bits",
                            content: "Pode inserir 32 dígitos hexadecimais (qualquer combinação de 0-9, a-f, A-F e a tecla nulo não é permitida) ou 16 caracteres ASCII. "
                        }]
                    }, {
                        type: "name",
                        title: "Valor da Chave",
                        content: "Introduza a palavra-passe para WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Modo",
                content: "Este campo determina o modo sem fios em que o router funciona."
            }, {
                type: "name",
                title: "Largura do canal",
                content: "A largura de banda do canal sem fios."
            }, {
                type: "name",
                title: "Canal",
                content: "Este campo determina que frequência de funcionamento será utilizada. Não é necessário alterar o canal sem fios, a menos que note problemas de interferência com outro ponto de acesso nas proximidades. Se selecionar automático, o PA escolherá o melhor canal automaticamente."
            }, {
                type: "name",
                title: "Potência de transmissão",
                content: "Aqui pode especificar a potência de transmissão do router. Pode selecionar Alta, Média ou Baixa que pretende. A alta está predefinida e é a recomendada. "
            }, {
                type: "paragraph",
                content: "Clique em Guardar para <strong>guardar</strong> e aplicar a config."
            }]
        },
        diagnostic: {
            TITLE: "Ferramentas de diagnóstico",
            CONTENT: [{
                type: "paragraph",
                content: "O router oferece as ferramentas Ping e Traceroute para o ajudar a resolver os problemas de conetividade da rede. A ferramenta Ping envia pacotes para um endereço de IP ou nome de domínio de destino e regista os resultados, tais como o número de pacotes enviados/recebidos e o tempo de ida e volta. A ferramenta Traceroute envia os pacotes para um endereço de IP ou nome de domínio de destino e exibe o número de hops e tempo para alcançar o destino."
            }, {
                type: "paragraph",
                content: "Pode efetuar o ping e traceroute num dispositivo de rede pelo endereço IP ou um nome de domínio, como google.com, yahoo.com, etc."
            }, {
                type: "note",
                title: "Para diagnosticar a utilização de Ping",
                content: [
                    "Introduza o endereço IP ou nome de domínio do destino.",
                    "Clique no ícone de seta para abrir o menu Advanced (Avançado) e especifique a Contagem de ping e o Tamanho do pacote de Ping. (Opcional)",
                    "Clique em Iniciar."
                ]
            }, {
                type: "note",
                title: "Para diagnosticar utilizando o Traceroute",
                content: [
                    "Introduza o endereço IP ou nome de domínio do destino.",
                    "Clique no ícone de seta para abrir o menu Advanced (Avançado) e especifique o número de hops (a ser alcançado) no campo do TTL (Time do Live) máx. do Traceroute. O valor predefinido é 20. (Opcional) ",
                    "Clique em Iniciar."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "Endereço MAC",
                content: "O endereço físico exclusivo do router."
            }, {
                type: "name",
                title: "IPv4 da LAN",
                content: "Mantenha o endereço de IP predefinido do router (192.168.0.1) ou Introduza um novo. Este endereço de IP pode ser utilizado para iniciar sessão na página de gestão web do router."
            }, {
                type: "name",
                title: "Máscara de sub-rede",
                content: "Selecione um identificador atribuído utilizado pela porta LAN para rotear o tráfego interno e externo a partir da lista suspensa ou Introduza um novo formato de máscara de sub-rede. O valor predefinido é 255.255.255.0."
            }, {
                type: "name",
                title: "Monitorização de IGMP:",
                content: "O IGMP (Internet Group Management Protocol - Protocolo de Gestão de Grupo de Internet) é usado para gerir o multicast em redes TCP/IP. Alguns ISPs utilizam o IGMP para realizar a configuração remota para dispositivos de clientes, tais como o router. Ele está ativado por predefinição."
            }, {
                type: "paragraph",
                title: "Nota",
                content: "Se o novo endereço IP da LAN não estiver na mesma sub-rede que o antigo, o conjunto de endereços IP no servidor DHCP será automaticamente alterado; no entanto, o Servidor Virtual e o host DMZ não terão efeito até que sejam reconfiguradas."
            }]
        },
        ddos: {
            TITLE: "Firewall",
            CONTENT: [{
                type: "name",
                title: "Firewall do SPI",
                content: "A Firewall do SPI (Stateful Packet Inspection) impede ataques cibernéticos e valida o tráfego que está a passar através do router. A Firewall do SPI está ativada por defeito. "
            }, {
                type: "title",
                title: "Proteção DOS"
            }, {
                type: "name",
                title: "Proteção DoS",
                content: "A proteção DoS (Denial of Service) protege a sua LAN contra ataques DoS (recusa de serviço) que inundam a sua rede com pedidos do servidor. Por predefinição, a proteção DoS está desativada (desligada)."
            }, {
                type: "name",
                title: "Filtragem contra ataques pelo ICMP-FLOOD",
                content: "Ativar para impedir o ICMP (Internet Control Message Protocol - Protocolo de Mensagens de Controlo da Internet) de sofrer ataques."
            }, {
                type: "name",
                title: "Filtragem de ataques do UDP-FLOOD",
                content: "Ativar para impedir o UDP (User Datagram Protocol) de sofrer ataques."
            }, {
                type: "name",
                title: "Filtragem de ataque do TCP-FLOOD",
                content: "Ativar para impedir o Protocolo de Controlo de Transmissão-Sincronizar (TCP-SYN) de sofrer ataques.",
                children: [{
                    type: "name",
                    title: "Desligado",
                    content: "Nenhuma proteção."
                }, {
                    type: "name",
                    title: "Baixa",
                    content: "Baixo nível de proteção e baixo impacto no desempenho do router."
                }, {
                    type: "name",
                    title: "Média",
                    content: "Nível de proteção moderada e semi-impacto visível no desempenho do router."
                }, {
                    type: "name",
                    title: "Alta",
                    content: "Alto nível de proteção mas um impacto visível no desempenho do router."
                }]
            }, {
                type: "name",
                title: "Não permitir Ping da LAN",
                content: "Ativar para não permitir os pings de portas LAN."
            }, {
                type: "name",
                title: "Não permitir Ping da WAN",
                content: "Ativar para não permitir os pings de portas WAN."
            }, {
                type: "title",
                title: "Lista de Host DoS bloqueados"
            }, {
                type: "name",
                title: "Lista de Host DoS bloqueados",
                content: "Lista o endereço IP e o endereço MAC a partir de qualquer fonte de ataque DoS bloqueada."
            }, {
                type: "name",
                title: "Para eliminar uma ou mais entradas",
                content: "Na lista de Host, selecione a entrada ou as entradas que pretende eliminar e clique em Eliminar acima da tabela."
            }]
        },
        ipv6: {
            TITLE: "Internet IPv6",
            CONTENT: [{
                type: "name",
                title: "Ativar IPv6",
                content: "Selecione para ativar (ON) ou desativar (OFF) a funcionalidade IPv6 do router."
            }, {
                type: "title",
                title: "Tipo de Ligação à Internet: IP estático"
            }, {
                type: "name",
                title: "IP estático",
                content: "Selecione esse tipo se o ISP utilizar Atribuição de endereço IPv6 estático."
            }, {
                type: "name",
                title: "Endereço IPv6/Gateway predefinido do IPv6/Servidor DNS do IPv6/Servidor DNS do IPv6 secundário",
                content: "Introduza estes parâmetros como fornecido pelo seu ISP."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "O tamanho da MTU (Unidade Máxima de Transmissão) predefinido e típico para a maior parte das redes Ethernet é 1500 Bytes. Não altere o tamanho da MTU predefinido exceto se solicitado pelo seu ISP."
            }, {
                type: "title",
                title: "Tipo de Ligação à Internet: IP dinâmico"
            }, {
                type: "name",
                title: "IP dinâmico",
                content: "Selecione este tipo se o seu ISP utilizar atribuição de endereço IPv6 dinâmico."
            }, {
                type: "name",
                title: "Endereço IPv6/Gateway do IPv6",
                content: "Estes parâmetros são atribuídos automaticamente pelo servidor DHCPv6 a partir do seu ISP."
            }, {
                type: "name",
                title: "Tipo de endereçamento",
                content: "Selecione o tipo de ligação IPv6."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "O tamanho da MTU (Unidade Máxima de Transmissão) predefinido e típico para a maior parte das redes Ethernet é 1500 Bytes. Não altere o tamanho da MTU predefinido exceto se solicitado pelo seu ISP."
            }, {
                type: "name",
                title: "Utilize o seguinte endereço DNS IPv6",
                content: "Selecione esta caixa de verificação e Introduza o(s) endereço(s) do servidor DNS fornecido pelo seu ISP na notação decimal com pontos. Esta interface WAN utilizará o servidor DNS especificado para prioridade."
            }, {
                type: "name",
                title: "Nome de Anfitrião",
                content: "Introduza um valor para este campo para especificar o nome do anfitrião do router."
            }, {
                type: "title",
                title: "Tipo de Ligação à Internet: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Selecione esse tipo se o ISP utiliza PPPoEv6, e obtenha o nome de utilizador e a palavra-passe."
            }, {
                type: "name",
                title: "Nome de utilizador/Palavra-passe/Confirmar palavra-passe",
                content: "Introduza estes parâmetros como fornecido pelo seu ISP."
            }, {
                type: "name",
                title: "Tipo de endereçamento",
                content: "Selecione o tipo de ligação IPv6."
            }, {
                type: "name",
                title: "Nome do Serviço",
                content: "Introduza o nome do serviço fornecido pelo seu ISP. Se não fornecido, deixe em branco."
            }, {
                type: "name",
                title: "Nome do servidor",
                content: "Introduza o nome do servidor fornecido pelo seu ISP. Se não fornecido, deixe em branco."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "O tamanho da MTU (Unidade Máxima de Transmissão) típico para redes Ethernet é 1480 Bytes.",
                children: [{
                    type: "paragraph",
                    content: "<b>Observação</b>: Raramente, o seu ISP poderá solicitar-lhe que ajuste o tamanho da MTU para um melhor desempenho da rede. Não deve alterar o valor, exceto se lhe for absolutamente necessário."
                }]
            }, {
                type: "name",
                title: "Utilize as informações especificadas pelo ISP do IPv6.",
                content: "Selecione esta caixa de verificação e Introduza o endereço de IP e o gateway fornecido pelo seu ISP."
            }, {
                type: "name",
                title: "Utilize o seguinte endereço DNS IPv6",
                content: "Selecione este se quiser inserir manualmente o endereço DNS fornecido pelo seu ISP. Se não selecionado, o router obterá o endereço DNS automaticamente a partir do seu ISP."
            }, {
                type: "title",
                title: "Tipo de Ligação à Internet: 6a4 Túnel"
            }, {
                type: "name",
                title: "6a4 Túnel",
                content: "Selecione este tipo se o seu ISP utiliza implementação 6 A4 para a atribuição de endereço."
            }, {
                type: "title",
                title: "LAN IPv6"
            }, {
                type: "name",
                title: "Tipo de endereçamento",
                content: "Selecione o tipo adequado de acordo com o ISP.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Selecione esta opção para atribuir endereços IPv6 aos computadores em sua rede local via RADVD.",
                    children: [{
                        type: "name",
                        title: "Ativar RDNSS",
                        content: "Selecione a caixa de verificação para ativar a funcionalidade RDNSS."
                    }, {
                        type: "name",
                        title: "Ativar Prefixo ULA",
                        content: "Selecione a caixa de verificação para ativar a funcionalidade Prefixo ULA.",
                        children: [{
                            type: "name",
                            title: "Prefixo ULA",
                            content: "Introduza o Prefixo ULA."
                        }, {
                            type: "name",
                            title: "Comprimento do prefixo ULA",
                            content: "Introduza o comprimento do prefixo ULA. O valor predefinido é 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Servidor DHCPv6",
                    content: "Para atribuir automaticamente endereços IP aos clientes na LAN.",
                    children: [{
                        type: "name",
                        title: "Endereço IPv6 de início",
                        content: "Introduza o endereço IPv6 de início."
                    }, {
                        type: "name",
                        title: "Endereço IPv6 de fim",
                        content: "Introduza o endereço IPv6 de fim."
                    }, {
                        type: "name",
                        title: "Tempo concedido",
                        content: "Introduza a duração na qual um cliente DHCO pode desfrutar do endereço IPv6 dinâmico atual atribuído pelo router. Após o endereço IPv6 dinâmico ter expirado, o utilizador será automaticamente atribuído a um novo endereço IPv6 dinâmico. O valor predefinido é 86400 segundos."
                    }]
                }]
            }, {
                type: "name",
                title: "Tipo de prefixo local",
                content: "Selecione um tipo para atribuir prefixo ao endereço IPv6. O Delegado e o Estático são fornecidos."
            }, {
                type: "name",
                title: "Delegado",
                children: [{
                    type: "name",
                    title: "Prefixo de ligação WAN delegada",
                    content: "Selecione uma ligação WAN a partir da lista suspensa para atribuir um prefixo."
                }]
            }, {
                type: "name",
                title: "Estático",
                children: [{
                    type: "name",
                    title: "Prefixo local",
                    content: "Introduza um valor para o prefixo local."
                }, {
                    type: "name",
                    title: "Comprimento do prefixo local",
                    content: "Introduza um valor para o comprimento do prefixo local."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Ativar Servidor VPN",
				content: "Selecione esta opção para ativar o servidor OpenVPN"
			},{
				type: "name",
				title: "Tipo de Serviço",
				content: "Selecione o protocolo de comunicação para o servidor OpenVPN: UDP ou TCP."
			},{
				type: "name",
				title: "Porta de Serviço",
				content: "Introduza uma porta de comunicação entre 1024 a 65535. A porta por defeito e comum do serviço é a 1194."
			},{
				type: "name",
				title: "Sub-rede/Máscara de rede VPN",
				content: "Introduza o intervalo de endereços IP que podem ser alugados a clientes pelo servidor OpenVPN."
			},{
				type: "name",
				title: "Acesso de Cliente",
				content: "Selecione o tipo de acesso para o seu cliente OpenVPN."
			},{
				type: "name",
				title: "Apenas Rede Doméstica",
				content: "Os clientes apenas podem aceder ao Router e à LAN. A rota por defeito dos clientes não será alterada."
			},{
				type: "name",
				title: "Rede Doméstica e Internet",
				content: "Os clientes podem aceder ao Router, LAN e Internet. A rota por defeito dos clientes será alterada."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
            },{
                type: "title",
                content: "Certificado"
            },{
                type: "paragraph",
                content: "Utilize o certificado para a informação e identificação da ligação VPN do computador remoto."
            },{
                type: "name",
                title: "Gerar",
                content: "Clique para gerar um novo certificado."
            },{
                type: "title",
                content: "Ficheiro de Configuração"
            },{
                type: "name",
                title: "Exportar",
                content: "Clique neste botão para guardar o ficheiro de configuração OpenVPN que pode ser utilizado para adicionar uma nova ligação VPN."
			},{
                type: "title",
                content: "Guia de instalação de cliente VPN"
			},{
				type: "step",
				title: "Para ativar e conectar os seus dispositivos clientes ao servidor OpenVPN:",
			},{
				type: "paragraph",
				content: "Antes de configurar o servidor OpenVPN, por favor configure um serviço de DNS Dinâmico (recomendado) ou atribua um endereço IP estático na porta WAN. Certifique-se, por favor, que a porta externa das configurações de NAT não é uma porta de serviço e que as definições horárias estão sincronizadas com a Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Selecionar Ativar Servidor VPN.",
					"Configure os parâmetros do servidor OpenVPN (tipo de serviço, porta de serviço e Acesso para Cliente) e clique em Guardar.",
					"Clique em Exportar para guardar o ficheiro de configuração.",
					"Nos seus dispositivos clientes, descarregue e instale o utilitário cliente OpenVPN a partir do endereço <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> As plataformas suportadas incluem  os sistemas Windows, MAC OSX e Linux.",
					"Inicie o utilitário de cliente OpenVPN e adicione uma nova ligação VPN, utilizando o ficheiro de configuração gravado para ligar o seu cliente ao servidor VPN."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Para saber mais sobre clientes OpenVPN, visite o endereço <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "name",
				title: "Ativar Servidor VPN",
				content: "Clique nesta opção para ativar o servidor VPN PPTP."
			},{
				type: "name",
				title: "Endereço IP de Cliente",
				content: "Introduza o intervalo de endereços IP (até 10 clientes) que podem ser atribuídos a clientes pelo servidor PPTP VPN."
			},{
				type: "name",
				title: "Nome de Utilizador e Senha",
				content: "Introduza o Username e Password para autenticar clientes no servidor PPTP VPN."
			},{
				type: "paragraph",
				content: "Clique em Gravar para guardar todas as suas configurações."
			},{
                type: "title",
                content: "Guia de instalação de cliente VPN"
			},{
				type: "step",
				title: "Para ativar e ligar os seus dispositivos cliente ao servidor VPN PPTP:",
			},{
				type: "paragraph",
				content: "Antes de configurar o servidor VPN PPTP, por favor configure um serviço de DNS Dinâmico (recomendado) ou atribua um endereço IP estático na porta WAN. Certifique-se por favor que a porta externa das configurações de NAT não é a porta 1723 e que as definições horárias estão sincronizadas com a Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Selecionar Ativar Servidor VPN.",
					"Configure os parâmetros do servidor VPN PPTP e clique em Gravar.",
					"Nos seus dispositivos cliente crie a ligação VPN PPTP. As plataformas oficialmente suportadas incluem Windows, MAC OSX, Linux, IOS e Android.",
					"Inicie o programa de VPN PPTP, adicione uma nova ligação e digite o nome de domínio do serviço DDNS registado ou o endereço IP estático atribuído à porta WAN, para ligar o dispositivo cliente ao servidor PPTP VPN.",
				]				
			}]
		},

		vpnServerStatus: {
			TITLE: "Ligações VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Esta página apresenta os clientes que estão atualmente conectados ao servidor OpenVPN e PPTP ligados ao Router"
			},{
				type: "paragraph",
				content: "Clique no ícone com o sinal de 'Menos' para desconectar o cliente correspondente."
			}]
		},
    };
})(jQuery);
