(function($) {
    $.helpContent = {
        trafficCtrl: {
            TITLE: "Control de ancho de banda",
            CONTENT: [{
                type: "paragraph",
                content: "Control de ancho de banda permite configurar el ancho de banda de subida y el ancho de banda de bajada de la red (el total combinado no debe superar los 1000000 kbps). Para un control óptimo del ancho de banda, seleccione el tipo de línea correcto y pregunte a su ISP cuál es el total de ancho de banda permitido de subida y bajada."
            }, {
                type: "name",
                title: "Habilitar",
                content: "Seleccione la casilla de verificación para habilitar la función Control de ancho de banda."
            }, {
                type: "name",
                title: "Total de ancho de banda de subida",
                content: "Introduzca la velocidad total de subida a través del puerto WLAN."
            }, {
                type: "name",
                title: "Todal de ancho de banda de bajada",
                content: "Introduzca la velocidad total de bajada a través del puerto WLAN."
            }, {
                type: "title",
                content: "Reglas de Control"
            }, {
                type: "name",
                title: "Descripción",
                content: "Muestra el intervalo de puertos o el intervalo de IP controlados."
            }, {
                type: "name",
                title: "Prioridad",
                content: "Muestra el nivel de prioridad de la regla, donde 1 es el nivel de prioridad más alto y 2 es el nivel de prioridad más bajo. Se asignará el total de ancho de banda de subida y bajada para garantizar la velocidad mínima de todas las reglas de control de ancho de banda."
            }, {
                type: "name",
                title: "Subida (mín./máx.)",
                content: "Muestra el ancho de banda de subida mínimo y máximo en kbps."
            }, {
                type: "name",
                title: "Bajada (mín./máx.)",
                content: "Muestra el ancho de banda de bajada mínimo y máximo en kbps."
            }, {
                type: "name",
                title: "Habilitar",
                content: "Indica el estado actual de una regla. Haga clic en el icono de la bombilla para habilitar o deshabilitar la regla."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para modificar o eliminar la regla correspondiente."
            }, {
                type: "note",
                title: "Para añadir una nueva regla",
                content: [
                    "Haga clic en Añadir.",
                    "Introduzca el intervalo de direcciones IP que desea controlar.",
                    "Introduzca el intervalo de números de puerto que desea controlar.",
                    "Seleccione el tipo de protocolo para esta regla.",
                    "Seleccione un nivel de prioridad para esta regla (1 es el nivel de prioridad más alto).",
                    "Introduzca el ancho de banda de subida mínimo y máximo (en Kbps) a través del puerto WAN.",
                    "Introduzca el ancho de banda de bajada mínimo y máximo (en Kbps) a través del puerto WAN.",
                    "Seleccione Habilitar esta Entrada.",
                    "Haga clic en Aceptar."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar varias reglas</strong><br>En la lista Reglas de Control, seleccione la casilla de verificación correspondiente de las reglas que desee eliminar y haga clic en Eliminar encima de la tabla."
            }]
        },
        accessControl: {
            TITLE: "Control de Acceso",
            CONTENT: [{
                type: "paragraph",
                content: "Control de acceso se utiliza para permitir o bloquear el acceso de equipos específicos y otros dispositivos a su red. Cuando se bloquea un dispositivo, este puede obtener una dirección IP del router, pero no puede comunicarse con otros dispositivos ni conectarse a Internet."
            }, {
                type: "paragraph",
                content: "<strong>Nota:</strong>Para utilizar Control de acceso, habilite esta función y siga los pasos que se describen en la Guía de la aplicación. Si se deshabilita (No) Control de acceso, todos los dispositivos pueden acceder a la red, incluidos los dispositivos en la lista negra."
            }, {
                type: "name",
                title: "Control de Acceso",
                content: "Seleccione Sí para habilitar la función Control de acceso"
            }, {
                type: "title",
                content: "Modo de Acceso"
            }, {
                type: "name",
                title: "Lista Negra",
                content: "Seleccione esta opción para bloquear el acceso de los dispositivos en la lista a continuación."
            }, {
                type: "name",
                title: "Lista Blanca",
                content: "Seleccione esta opción para permitir el acceso únicamente de los dispositivos en la lista a continuación."
            }, {
                type: "title",
                content: "Dispositivos en la lista Negra/Nlanca"
            }, {
                type: "note",
                title: "<strong>Para añadir un dispositivo a la lista negra o blanca</strong>",
                content: [
                    "Haga clic en el icono Añadir.",
                    "Introduzca el nombre del dispositivo.",
                    "Introduzca la dirección MAC del dispositivo.",
                    "Haga clic en Aceptar."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar o eliminar un dispositivo de la lista negra/blanca</strong><br>En la tabla Lista negra/blanca, haga clic en el icono Editar o en el icono Papelera correspondiente al dispositivo que desee modificar o eliminar."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar varios dispositivos de la lista negra/blanca</strong><br>En la tabla Lista negra/blanca, seleccione todos los dispositivos que desee eliminar y haga clic en Eliminar encima de la tabla."
            }, {
                type: "title",
                content: "Dispositivos Conectados"
            }, {
                type: "name",
                title: "Nombre del Dispositivo",
                content: "Muestra el nombre del dispositivo conectado."
            }, {
                type: "name",
                title: "Dirección IP",
                content: "Muestra la dirección IP del dispositivo conectado."
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "Muestra la dirección MAC del dispositivo conectado."
            }, {
                type: "name",
                title: "Tipo de Conexión",
                content: "Muestra el tipo de conexión del dispositivo conectado, ya sea cableado o inalámbrico."
            }, {
                type: "paragraph",
                content: "<strong>Para bloquear uno o varios dispositivos</strong><br>En la tabla Dispositivos conectados, seleccione los dispositivos que desee bloquear y haga clic en Bloquear encima de la tabla. Los dispositivos seleccionados se añadirán automáticamente a los dispositivos en la lista negra."
            }]
        },
        arpBind: {
            TITLE: "Configuración",
            CONTENT: [{
                type: "paragraph",
                content: "La vinculación IP & MAC (también conocida como vinculación ARP) es práctica para controlar el acceso de un equipo específico en la LAN mediante la vinculación de las direcciones IP y MAC del dispositivo. La vinculación IP & MAC también evita que otros dispositivos utilicen una dirección IP específica."
            }, {
                type: "name",
                title: "Vinculación IP & MAC",
                content: "Seleccione Sí para habilitar la función Vinculación IP & MAC."
            }, {
                type: "title",
                title: "Lista de Vinculaciones"
            }, {
                type: "note",
                title: "<strong>Para configurar un dispositivo con vinculación ARP</strong>",
                content: [
                    "Haga clic en Añadir.",
                    "Introduzca la dirección MAC del dispositivo.",
                    "Introduzca la dirección IP que desee vincular a la dirección MAC superior.",
                    "Seleccione Habilitar.",
                    "Haga clic en Aceptar."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar o eliminar una entrada</strong><br>En la Lista de vinculaciones, haga clic en el icono Editar o en el icono Papelera correspondiente a la entrada que desee modificar o eliminar."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar varias entradas</strong><br>En la Lista de vinculaciones, seleccione las entradas que desee eliminar y haga clic en Eliminar encima de la tabla."
            }, {
                type: "title",
                title: "Lista de ARP"
            }, {
                type: "paragraph",
                content: "Muestra las direcciones MAC e IP de los dispositivos conectados actualmente."
            }, {
                type: "name",
                title: "Nombre del Dispositivo",
                content: "Muestra el nombre del dispositivo conectado."
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "Muestra la dirección MAC del dispositivo conectado."
            }, {
                type: "name",
                title: "Dirección IP",
                content: "Muestra la dirección IP asignada al dispositivo conectado."
            }, {
                type: "name",
                title: "Vinculadas",
                content: "Indica si las direcciones MAC e IP están o no vinculadas."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para eliminar la entrada correspondiente de la lista."
            }, {
                type: "paragraph",
                content: "<strong>Nota:</strong>No puede vincular la misma dirección IP a más de una dirección MAC."
            }, {
                type: "paragraph",
                content: "<strong>Para vincular varios dispositivos</strong><br>En la Lista de ARP, seleccione los dispositivos cuyas direcciones IP desee vincular a sus direcciones MAC y haga clic en Vincular encima de la tabla."
            }]
        },
        alg: {
            TITLE: "Puerta de Enlace de Nivel de Aplicación (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "ALG permite conectar filtros transversales NAT (Network Address Translation) personalizados en la puerta de enlace con el fin de permitir la traducción de direcciones y puertos para ciertos protocolos de \"control/datos\" de nivel de aplicación: FTP, TFTP, H323, etc. Se recomienda habilitar ALG."
            }, {
                type: "name",
                title: "PPTP Pass-through",
                content: "Seleccione la casilla de verificación para habilitar la función PPTP Pass-through con el fin de permitir que las sesiones punto a punto se envíen a una red IP a través de un túnel y pasen a través del router. "
            }, {
                type: "name",
                title: "L2TP Pass-through",
                content: "Seleccione la casilla de verificación para habilitar la función L2TP Pass-through con el fin de permitir que las sesiones punto a punto Layer 2 se envíen a una red IP a través de un túnel y pasen a través del router. "
            }, {
                type: "name",
                title: "IPSec Pass-through",
                content: "Seleccione la casilla de verificación para habilitar la función IPSec Pass-through con el fin del permitir que IPSec (Internet Protocol Security) se envíe a una red IP a través de un túnel y pase a través del router. IPSec utiliza servicios de seguridad criptográficos para garantizar comunicaciones privadas y seguras en redes IP."
            }, {
                type: "name",
                title: "ALG FTP",
                content: "Seleccione esta casilla verificación para habilitar la función ALG FTP con el fin de permitir que clientes y servidores FTP (File Transfer Protocol) transfieran datos a través de NAT."
            }, {
                type: "name",
                title: "ALG TFTP",
                content: "Seleccione esta casilla verificación para habilitar la función ALG TFTP con el fin de permitir que clientes y servidores TFTP (Trivial File Transfer Protocol) transfieran datos a través de NAT."
            }, {
                type: "name",
                title: "ALG RTSP",
                content: "Si se selecciona, permite a clientes reproductores de medios comunicarse con servidores de medios de transmisión a través de NAT."
            }, {
                type: "name",
                title: "ALG H323",
                content: "Seleccione esta casilla de verificación para habilitar la función ALG H323 con el fin de permitir a clientes Microsoft NetMeeting comunicarse a través de NAT."
            }, {
                type: "name",
                title: "ALG SIP",
                content: "Seleccione esta casilla de verificación para habilitar la función ALG SIP con el fin de permitir a clientes y servidores SIP transferir datos a través de NAT."
            }, {
                type: "name",
                title: "Guardar",
                content: "Haga clic para guardar la configuración."
            }]
        },
        virtualServer: {
            TITLE: "Servidores Virtuales",
            CONTENT: [{
                type: "paragraph",
                content: "Los servidores virtuales se utilizan para configurar servicios públicos en su red local. Un servidor virtual se define como un puerto externo, y todas las solicitudes de Internet para este puerto externo se redirigirán a un equipo designado, que debe configurarse con una dirección IP Estática o reservada."
            }, {
                type: "name",
                title: "Tipo de Servicio",
                content: "Muestra el nombre de su servidor virtual."
            }, {
                type: "name",
                title: "Puerto Externo",
                content: "Muestra el número de puerto o un intervalo de puertos utilizados por el servidor virtual."
            }, {
                type: "name",
                title: "IP Interna",
                content: "Muestra la dirección IP del equipo que ejecuta la aplicación de servicio."
            }, {
                type: "name",
                title: "Puerto Interno",
                content: "Muestra el número de puerto del equipo que ejecuta la aplicación de servicio."
            }, {
                type: "name",
                title: "Protocolo",
                content: "Muestra el protocolo utilizado para la aplicación de servicio: TCP, UDP o Todo (Todos los protocolos admitidos por el router)."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica el estado actual de un servidor virtual. Haga clic en el icono de la bombilla para habilitar (o deshabilitar) la entrada de servidor virtual."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para modificar o eliminar la regla correspondiente."
            }, {
                type: "note",
                title: "<strong>Para añadir una entrada de servidor virtual</strong>",
                content: [
                    "Haga clic en Añadir.",
                    "Seleccione un nombre de interfaz en la lista desplegable.",
                    "Haga clic en Ver aplicaciones existentes para seleccionar un servicio de la lista y rellenar automáticamente el número de puerto adecuado en los campos Puerto externo y Puerto interno. Si el servicio no aparece en la lista, introduzca el número de puerto externo (p.ej., 21) o un intervalo de puertos (p.ej., 21-25). Deje el campo Puerto interno en blanco si es el mismo que el puerto externo o introduzca un número de puerto específico (p.ej., 21) si el puerto externo es un puerto único.",
                    "Introduzca la dirección IP del equipo que ejecuta la aplicación de servicio en notación decimal con punto en el campo IP interna. ",
                    "Seleccione un protocolo para la aplicación de servicio: TCP, UDP o Todo en la lista desplegable Protocolo.",
                    "Seleccione Habilitar esta Entrada.",
                    "Haga clic en Aceptar."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar o eliminar una entrada de servidor virtual</strong><br>Haga clic en el icono Editar o Papelera de la entrada correspondiente."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar varias entradas</strong><br>Seleccione todas las entradas de servidor virtual que desee eliminar y haga clic en Eliminar encima de la tabla."
            }, {
                type: "paragraph",
                content: "<strong>Nota:</strong><br>Si su dispositivo host local aloja más de un tipo de los servicios disponibles, debe crear un servidor virtual para cada servicio. "
            }]
        },
        portTrigger: {
            TITLE: "Port Triggering",
            CONTENT: [{
                type: "paragraph",
                content: "Port triggering se utiliza para reenviar tráfico en un puerto determinado a un servidor específico en la red."
            }, {
                type: "name",
                title: "Aplicación",
                content: "Muestra el nombre de la aplicación."
            }, {
                type: "name",
                title: "Puerto de Activación",
                content: "Muestra el puerto de tráfico saliente utilizado para activar una regla de filtro de una conexión saliente."
            }, {
                type: "name",
                title: "Protocolo de Activación",
                content: "Muestra el protocolo utilizado para el puerto de activación: TCP, UDP o Todo (todos los protocolos admitidos por el router)."
            }, {
                type: "name",
                title: "Puerto Externo",
                content: "Muestra el puerto o intervalo de puertos utilizado por el sistema remoto. Se reenviará una respuesta que utilice uno de estos puertos al PC que active la regla. Puede introducir un máximo de 5 grupos de puertos (o secciones de puertos). Cada grupo de puertos debe separarse con una coma; por ejemplo, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Protocolo Externo",
                content: "Muestra el protocolo utilizado para el puerto entrante: TCP, UDP o Todo (todos los protocolos admitidos por el router)."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica el estado actual de una entrada de port triggering. Haga clic en el icono de la bombilla para habilitar (o deshabilitar) la entrada."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para modificar o eliminar la entrada correspondiente."
            }, {
                type: "note",
                title: "<strong>Para configurar una entrada de port triggering</strong><br>Nota: </strong> Cada entrada solo puede ser utilizada por un host a la vez.",
                content: [
                    "Haga clic en Añadir.",
                    "Seleccione un nombre de interfaz en la lista desplegable.",
                    "Haga clic en Ver aplicaciones existentes para seleccionar una aplicación de la lista y rellenar automáticamente los valores predeterminados de los campos correspondientes. Si desea añadir una aplicación que no aparece en la lista, introduzca manualmente la aplicación, puerto de activación, protocolo de activación, puerto externo y protocolo externo.<br><strong>Nota:</strong> Las entradas de port triggering no pueden tener intervalos de puertos que se superpongan (p.ej., si Entrada 1 tiene el intervalo de puertos 4200-4205, Entrada 2 no puede tener el intervalo de puertos 4203-4205).",
                    "Seleccione Habilitar esta Entrada.",
                    "Haga clic en Aceptar."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Para modificar o eliminar una entrada de port triggering</strong><br>Haga clic en el icono Editar o Papelera de la entrada correspondiente."
            }, {
                type: "paragraph",
                content: "<strong>Para eliminar varias entradas de port triggering</strong><br>En la tabla, seleccione todas las entradas que desee eliminar y haga clic en Eliminar encima de la tabla."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "La función de host DMZ (zona desmilitarizada) permite exponer un host local a Internet para un servicio de propósito especial, como juegos en línea o videoconferencias. Básicamente, DMZ permite a un equipo en la LAN abrir todos sus puertos. Es preciso configurar este equipo con una dirección IP Estática y deshabilitar su función de cliente DHCP."
            }, {
                type: "note",
                title: "<strong>Para asignar un equipo o servidor como servidor DMZ</strong>",
                content: [
                    "Seleccione Habilitar DMZ.",
                    "Introduzca la dirección IP del equipo local asignado como host DMZ.",
                    "Haga click en Guardar."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "De forma predeterminada, la función UPnP (Universal Plug-and-Play) está habilitada para permitir a dispositivos, como ordenadores o equipos de Internet, descubrirse y comunicarse automáticamente entre ellos en la red local."
            }, {
                type: "name",
                title: "UPnP",
                content: "Establezca esta opción en Sí para habilitar la función UPnP."
            }, {
                type: "title",
                content: "Lista de Servicios UPnP"
            }, {
                type: "paragraph",
                content: "La lista de servicios UPnP muestra información de los dispositivos UPnP."
            }, {
                type: "name",
                title: "Total de Clientes",
                content: "Muestra el número total de dispositivos UPnP."
            }, {
                type: "name",
                title: "Descripción de Servicio",
                content: "Muestra una breve descripción del host local que inicia la solicitud UPnP."
            }, {
                type: "name",
                title: "Puerto Externo",
                content: "Muestra el puerto externo abierto por el host local."
            }, {
                type: "name",
                title: "Protocolo",
                content: "Muestra el tipo de protocolo de red utilizado por el host local."
            }, {
                type: "name",
                title: "Dirección IP Interno",
                content: "Muestra la dirección IP del host local."
            }, {
                type: "name",
                title: "Puerto Interno",
                content: "Muestra el puerto interno abierto por el host local."
            }, {
                type: "paragraph",
                content: "Haga clic en <strong>Actualizar</strong> para actualizar la lista de servidores UPnP."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Red de Invitados",
            CONTENT: [{
                type: "paragraph",
                content: "Red de Invitados permite configurar una red inalámbrica independiente con un nombre de red y contraseña independientes (SSID) que los invitados pueden utilizar para acceder a Internet."
            }, {
                type: "title",
                content: "Configuración"
            }, {
                type: "name",
                title: "Permitir a invitados verse entre ellos",
                content: "Seleccione esta casilla de verificación para permitir a los dispositivos inalámbricos en la red de invitado intercomunicarse entre ellos."
            }, {
                type: "name",
                title: "Permitir a invitados acceder a mi red local",
                content: "Seleccione esta casilla de verificación para permitir a los dispositivos inalámbricos en la red de invitado acceder a su red local."
            }, {
                type: "name",
                title: "Guardar",
                content: "Haga clic para guardar la configuración."
            }, {
                type: "title",
                content: "Configuración Inalámbrica"
            }, {
                type: "name",
                title: "Red de Invitados 2.4GHz | 5GHz",
                content: "Haga clic en el botón correspondiente para habilitar la red de invitado 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "SSID de la Red de Invitados",
                content: "Utilice el SSID predeterminado o cree un nombre nuevo (de 1 a 32 caracteres). Este campo distingue entre mayúsculas y minúsculas."
            }, {
                type: "name",
                title: "Seguridad",
                content: "Seleccione una opción de seguridad para la red de invitado:",
                children: [{
                    type: "name",
                    title: "Ninguna",
                    content: "De forma predeterminada, la seguridad de la red de invitado está establecida en Ninguna; nadie puede acceder a la red."
                }, {
                    type: "name",
                    title: "WPA/WPA2 - Personal",
                    content: "Seleccione esta opción para habilitar el método de autenticación estándar basado en una clave previamente compartida (PSK), también denominada frase de contraseña. En caso de seleccionar esta opción, configure lo siguiente.",
                    children: [{
                        type: "name",
                        title: "Versión",
                        content: "Seleccione una versión de seguridad para su red de invitado.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Esta opción admite la implementación múltiple del estándar WPA (Wi-Fi Protected Access), como WPA y WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esta opción admite el cifrado AES, que ofrece un mejor nivel de seguridad que WPA-PSK, y está recomendada."
                        }]
                    }, {
                        type: "name",
                        title: "Cifrado",
                        content: "Seleccione un tipo de cifrado Auto (para TKIP y AES), TKIP (Temporal Key Integrity Protocol) o AES (Advanced Encryption Standard). NO se recomienda utilizar el cifrado TKIP si el router funciona en modo 802.11n, porque TKIP no es compatible con la especificación 802.11n. Si se selecciona TKIP, se deshabilitará la función WPS."
                    }]
                }]
            }, {
                type: "name",
                title: "Contraseña",
                content: "Cree una contraseña de entre 8 y 63 caracteres ASCII o de entre 8 y 64 caracteres hexadecimales (0-9, a-f, A-F)."
            }, {
                type: "paragraph",
                content: "Las instrucciones previas para la red de invitado 2.4GHz también se aplican a la red de invitado 5GHz."
            }, {
                type: "name",
                title: "Guardar",
                content: "Haga clic para guardar la configuración."
            }]
        },
        wirelessStat: {
            TITLE: "Dispositivos en línea",
            CONTENT: [{
                type: "name",
                title: "Dirección MAC",
                content: "Muestra la dirección MAC del cliente inalámbrico asociado."
            }, {
                type: "name",
                title: "Tipo de Conexión",
                content: "Muestra la banda de frecuencias (2.4GHz o 5GHz) a la que está conectado el cliente inalámbrico."
            }, {
                type: "name",
                title: "Seguridad",
                content: "Muestra el tipo de seguridad (Ninguna, WEP, WPA/WPA2-Personal o WPA/WPA2-Empresa) del cliente inalámbrico asociado."
            }, {
                type: "name",
                title: "Paquetes Recibidos",
                content: "Muestra el número de paquetes recibidos por el cliente inalámbrico asociado."
            }, {
                type: "name",
                title: "Paquetes Enviados",
                content: "Muestra el número de paquetes enviados por el cliente inalámbrico asociado."
            }, {
				type: "name",
				title: "Tasa de Transmisión",
				content: "Muestra la velocidad de los últimos paquetes recibidos por el cliente inalámbrico asociado."
			}, {
                type: "paragraph",
                content: "Haga clic en <strong>Actualizar</strong> para actualizar la información en esta página."
            }]
        },
        wirelessAdv: {
            TITLE: "Configuración avanzada",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Seleccione 2.4GHz | 5GHz para establecer la configuración Wi-Fi avanzada."
            }, {
                type: "name",
                title: "Intervalo de Señalización",
                content: "Introduzca un valor entre 25 y 1000 en milisegundos para determinar el intervalo en que el router transmitirá los paquetes de señalización con el fin de sincronizar la red inalámbrica. El valor predeterminado es 100 milisegundos."
            }, {
                type: "name",
                title: "Umbral de RTS",
                content: "Introduzca un valor entre 1 y 2346 para determinar el tamaño de paquete de la transmisión de datos a través del router. De forma predeterminada, el tamaño de Umbral de RTS (Request to Send) es de 2346. Si el tamaño del paquete es mayor que el umbral actual, el router envía tramas RTS a una estación de recepción particular y negocia el envío de una trama de datos; si no, el paquete se envía de inmediato."
            }, {
                type: "name",
                title: "Intervalo de DTIM",
                content: "Introduzca un valor entre 1 y 255 para determinar el intervalo de DTIM (Delivery Traffic Indication Message). 1 indica que el intervalo de DTIM es igual que el intervalo de señalización."
            }, {
                type: "name",
                title: "Periodo de Actualización de Clave de Grupo",
                content: "Introduzca el número de segundos (mínimo 30) para controlar el intervalo de tiempo para la renovación automática de la clave de cifrado. El valor predeterminado es 0 (sin renovación de clave)."
            }, {
                type: "name",
                title: "WMM",
                content: "Esta función garantiza que los paquetes con mensajes de alta prioridad se transmitan con preferencia. WMM está habilitado en el modo 802.11n o 802.11ac. Se recomienda encarecidamente habilitar WMM."
            }, {
                type: "name",
                title: "GI corto",
                content: "Esta función está habilitada de forma predeterminada y se recomienda para aumentar la capacidad de datos mediante la reducción del tiempo del intervalo de guardia (GI)."
            }, {
                type: "name",
                title: "Aislamiento de AP",
                content: "Seleccione esta casilla de verificación para habilitar la función Aislamiento de AP, que permite confinar y restringir la interacción de todos los dispositivos inalámbricos de la red entre ellos, pese a seguir teniendo acceso a Internet. El aislamiento de AP está deshabilitado de forma predeterminada."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "Puente WDS",
                content: "Seleccione esta casilla de verificación para habilitar la función Puente WDS (Wireless Distribution System) y permitir al router enlazarse con otro punto de acceso (AP) en una red de área local inalámbrica (WLAN). En caso de habilitarse, configure lo siguiente:"
            }, {
                type: "name",
                title: "SSID (para puente)",
                content: "Introduzca el SSID del punto de acceso inalámbrico (WAP) al que se conectará el router como cliente o utilice la función Encuesta para analizar y mostrar todas las redes disponibles al alcance."
            }, {
                type: "name",
                title: "Dirección MAC (para puente)",
                content: "Introduzca la dirección MAC en el formato de caracteres hexadecimales (0-9, a-f, A-F) separados por guiones del WAP al que se conectará el router como cliente. Si selecciona una red a través de la función Encuesta, el campo Dirección MAC se rellenará automáticamente."
            }, {
                type: "name",
                title: "Encuesta",
                content: "Haga clic en este botón para buscar y mostrar la dirección MAC, SSID, intensidad de señal, canal e información de seguridad de todas las redes inalámbricas disponibles. Cuando seleccione una red, los campos SSID, Dirección MAC y Seguridad se rellenarán automáticamente.",
                children: [{
                    type: "name",
                    title: "Lista de AP",
                    content: "Muestra la información del AP al que se puede conectar el router."
                }, {
                    type: "name",
                    title: "Dirección MAC",
                    content: "Muestra la dirección MAC del AP al que se conectará el router como cliente."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Muestra el SSID del AP al que se conectará el router como cliente."
                }, {
                    type: "name",
                    title: "Intensidad de señal",
                    content: "Muestra la intensidad de la señal del AP al que se conectará el router como cliente."
                }, {
                    type: "name",
                    title: "Canal",
                    content: "Muestra el canal del AP al que se conectará el router como cliente."
                }, {
                    type: "name",
                    title: "Cifrado",
                    content: "Muestra el tipo de cifrado del AP al que se conectará el router como cliente."
                }, {
                    type: "name",
                    title: "Conectar",
                    content: "Haga clic en el icono para conectarse o desconectarse del AP correspondiente."
                }]
            }, {
                type: "name",
                title: "Seguridad",
                content: "Seleccione una de las siguientes opciones de seguridad:",
                children: [{
                    type: "name",
                    title: "Ninguna",
                    content: "Seleccione esta opción para deshabilitar la seguridad inalámbrica. Se recomienda encarecidamente habilitar la seguridad inalámbrica para proteger la red inalámbrica del acceso no autorizado."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Seleccione esta opción para habilitar el método de autenticación estándar basado en una clave previamente compartida (PSK), también denominada frase de contraseña. Se recomienda esta opción. En caso de seleccionarse, configure lo siguiente.",
                    children: [{
                        type: "name",
                        title: "Versión",
                        content: "Seleccione una versión de seguridad para su red inalámbrica.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Esta opción admite el cifrado AES, que ofrece un nivel de seguridad más bajo que WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esta opción admite el cifrado AES, que ofrece un mayor nivel de seguridad que WPA-PSK y está recomendada."
                        }]
                    }, {
                        type: "name",
                        title: "Cifrado",
                        content: "Seleccione un tipo de cifrado de seguridad: TKIP (Temporal Key Integrity Protocol) o AES (Advanced Encryption Standard). NO se recomienda utilizar el cifrado TKIP si el router funciona en modo 802.11n, porque TKIP no es compatible con la especificación 802.11n. Si se selecciona TKIP, se deshabilitará la función WPS."
                    }, {
                        type: "name",
                        title: "Contraseña",
                        content: "Introduzca una contraseña de entre 8 y 63 caracteres ASCII o de entre 8 y 64 caracteres hexadecimales en este campo."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Seleccione esta opción para habilitar el método de autenticación básico si alguna versión de sus dispositivos cliente solo puede acceder a la red inalámbrica con WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Tipo",
                        content: "Seleccione un tipo de autenticación para su red inalámbrica. Seleccione Sistema abierto o Clave compartida en función de la capacidad y solicitud de acceso del cliente inalámbrico."
                    }, {
                        type: "name",
                        title: "Formato de clave WEP",
                        content: "Seleccione el formato ASCII o hexadecimal. El formato ASCII es una combinación de caracteres alfabéticos y numéricos. El formato hexadecimal es una combinación de número (0-9) y letras (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Índice de clave",
                        content: "Seleccione cuál de las cuatro claves se utilizará e introduzca la clave WEP correspondiente que creó en el campo Valor de clave. Asegúrese de que estos valores sean idénticos en todas las estaciones inalámbrica de la red."
                    }, {
                        type: "name",
                        title: "Valor de clave",
                        content: "Introduzca la clave WEP correspondiente creada."
                    }]
                }]
            }, {
                type: "name",
                title: "Guardar",
                content: "Haga clic aquí para guardar la configuración."
            }]
        },
        wirelessSchedule: {
            TITLE: "Programación Inalámbrica",
            CONTENT: [{
                type: "paragraph",
                content: "El periodo efectivo se basa en la hora del router. La hora puede establecerse en Herramientas del Sistema -> Configuración Horaria"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Seleccione 2.4GHz o 5GHz para establecer la programación inalámbrica."
            }, {
                type: "name",
                title: "Programación Inalámbrica",
                content: "Establezca esta opción en Sí para habilitar esta función. A continuación, arrastre el ratón por las celdas para establecer el periodo de tiempo en que se apagará la Wi-Fi."
            }, {
                type: "name",
                title: "Restaurar",
                content: "Haga clic aquí para restaurar."
            }, {
                type: "name",
                title: "Guardar",
                content: "Haga clic aquí para guardar la configuración."
            }]
        },
        macFilter: {
            TITLE: "Configuración de Filtrado de MAC",
            CONTENT: [{
                type: "name",
                title: "Filtrado de MAC",
                content: "Establezca esta opción en Sí para controlar el acceso inalámbrico con la dirección MAC de dispositivos individuales."
            }, {
                type: "title",
                title: "Reglas de Filtrado"
            }, {
                type: "name",
                title: "Bloquear acceso inalámbrico de los dispositivos en la lista a continuación.",
                content: "Seleccione esta opción para bloquear el acceso inalámbrico de los dispositivos en la lista a continuación."
            }, {
                type: "name",
                title: "Permitir acceso inalámbrico únicamente de los dispositivos en la lista a continuación.",
                content: "Seleccione esta opción para permitir el acceso inalámbrico únicamente de los dispositivos en la lista a continuación."
            }, {
                type: "title",
                title: "Lista de Dispositivos"
            }, {
                type: "name",
                title: "Dirección MAC/Descripción",
                content: "Muestra la dirección MAC y la descripción del dispositivo."
            }, {
                type: "name",
                title: "Habilitar",
                content: "Haga clic en el icono de la bombilla para habilitar o deshabilitar el filtrado de MAC del dispositivo."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para modificar o eliminar la entrada correspondiente."
            }, {
                type: "note",
                title: "Para añadir un nuevo dispositivo",
                content: [
                    "Haga clic en Añadir.",
                    "Introduzca la dirección MAC del dispositivo.",
                    "Introduzca una descripción para el dispositivo.",
                    "Haga clic en Habilitar esta Entrada.",
                    "Haga clic en Aceptar"
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Configuración Inalámbrica",
            CONTENT: [/*{
                type: "name",
                title: "Región",
                content: "Seleccione su región en la lista desplegable. Este campo especifica la región donde se puede utilizar la función Wi-Fi del router. Puede ser ilegal utilizar la función inalámbrica del router en una región distinta de la especificada en este campo. Si su país o región no aparecen en la lista, póngase en contacto con su organismo gubernamental local para solicitar ayuda."
            }, */{
                type: "name",
                title: "Conexión Inteligente",
                content: "Seleccione esta casilla de verificación para habilitar la conexión inteligente. Esta función ayuda a los dispositivos a ejecutarse de forma más rápida asignándoles las mejores bandas inalámbricas de acuerdo con las condiciones reales para equilibrar las solicitudes de red."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Seleccione 2.4GHz | 5GHz para modificar la configuración correspondiente."
            }, {
                type: "name",
                title: "Emisión Inalámbrica",
                content: "Seleccione esta casilla de verificación para habilitar la frecuencia de emisión inalámbrica 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Nombre de Red Wi-Fi (SSID)",
                content: "Puede dejar el nombre de red (SSID) predeterminado tal y como está o crear un nuevo nombre (de hasta 32 caracteres). Este campo distingue entre mayúsculas y minúsculas."
            }, {
                type: "name",
                title: "Ocultar SSID",
                content: "Seleccione esta casilla de verificación si desea ocultar el nombre de red (SSID) 2.4GHz | 5GHz de la lista de redes Wi-Fi."
            }, {
                type: "name",
                title: "Seguridad",
                content: "Seleccione una de las siguientes opciones de seguridad:",
                children: [{
                    type: "name",
                    title: "Sin seguridad",
                    content: "Seleccione esta opción para deshabilitar la seguridad inalámbrica. Se recomienda encarecidamente habilitar la seguridad inalámbrica para proteger la red inalámbrica del acceso no autorizado."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Seleccione esta opción para habilitar el método de autenticación estándar basado en una clave previamente compartida (PSK), también denominada frase de contraseña. Se recomienda esta opción. En caso de seleccionarse, configure lo siguiente.",
                    children: [{
                        type: "name",
                        title: "Versión",
                        content: "Seleccione una versión de seguridad para su red inalámbrica.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Esta opción admite la implementación múltiple del estándar WPA (Wi-Fi Protected Access), como WPA y WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esta opción admite el cifrado AES, que ofrece un mayor nivel de seguridad que WPA-PSK y está recomendada."
                        }]
                    }, {
                        type: "name",
                        title: "Cifrado",
                        content: "Seleccione un tipo de cifrado Auto (para TKIP y AES), TKIP (Temporal Key Integrity Protocol) o AES (Advanced Encryption Standard). NO se recomienda utilizar el cifrado TKIP si el router funciona en modo 802.11n, porque TKIP no es compatible con la especificación 802.11n. Si se selecciona TKIP, se deshabilitará la función WPS."
                    }, {
                        type: "name",
                        title: "Contraseña",
                        content: "Cree una contraseña Wi-Fi de entre 8 y 63 caracteres ASCII o de entre 8 y 64 caracteres hexadecimales en este campo."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Empresa",
                    content: "Seleccione esta opción para habilitar el método de autenticación más avanzado con un servidor RADIUS (Remote Authentication Dial In User Service). Si se selecciona, se deshabilitará la función WPS.",
                    children: [{
                        type: "name",
                        title: "Versión",
                        content: "Seleccione una versión de seguridad para su red inalámbrica.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Esta opción admite la implementación múltiple del estándar WPA (Wi-Fi Protected Access), como WPA y WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esta opción admite el cifrado AES, que ofrece un mayor nivel de seguridad que WPA-PSK y está recomendada."
                        }]
                    }, {
                        type: "name",
                        title: "Cifrado",
                        content: "Seleccione un tipo de cifrado Auto (para TKIP y AES), TKIP (Temporal Key Integrity Protocol) o AES (Advanced Encryption Standard). NO se recomienda utilizar el cifrado TKIP si el router funciona en modo 802.11n, porque TKIP no es compatible con la especificación 802.11n. Si se selecciona TKIP, se deshabilitará la función WPS."
                    }, {
                        type: "name",
                        title: "IP de servidor RADIUS",
                        content: "Introduzca la dirección IP del servidor RADIUS."
                    }, {
                        type: "name",
                        title: "Puerto de servidor RADIUS",
                        content: "Introduzca el número de puerto del servidor RADIUS."
                    }, {
                        type: "name",
                        title: "Contraseña de servidor RADIUS",
                        content: "Introduzca la contraseña compartida del servidor RADIUS."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Seleccione esta opción para habilitar el método de autenticación básico si alguna versión de sus dispositivos cliente solo puede acceder a la red Wi-Fi con WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Tipo",
                        content: "Seleccione un tipo de autenticación para su red inalámbrica. El valor predeterminado es Auto, que selecciona automáticamente Sistema abierto o Clave compartida en función de la capacidad y solicitud de acceso del cliente inalámbrico."
                    }, {
                        type: "name",
                        title: "Clave seleccionada",
                        content: "Seleccione cuál de las cuatro claves se utilizará y cree una clave WEP en el campo Valor de clave. Los Clientes Inalámbricos deberán introducir la clave WEP correspondiente para conectarse a la red."
                    }, {
                        type: "name",
                        title: "Formato de clave WEP",
                        content: "Utilice el formato ASCII o seleccione Hexadecimal. El formato ASCII es una combinación de caracteres alfabéticos y numéricos. El formato Hexadecimal es una combinación de número (0-9) y letras (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Tipo de clave",
                        content: "Seleccione una longitud de clave WEP.",
                        children: [{
                            type: "name",
                            title: "Cifrado de 64 bits",
                            content: "Permite introducir 10 dígitos hexadecimales (0-9, A-F, a-f) o 5 caracteres ASCII en el campo Valor WEP."
                        }, {
                            type: "name",
                            title: "Cifrado de 128 bits",
                            content: "Permite introducir 26 dígitos hexadecimales (0-9, A-F, a-f) o 13 caracteres ASCII en el campo Valor WEP."
                        }]
                    }, {
                        type: "name",
                        title: "Valor de clave",
                        content: "Cree una clave WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Modo",
                content: "Seleccione un modo de transmisión mixto."
            }, {
                type: "name",
                title: "Canal",
                content: "Seleccione un canal operativo para la red inalámbrica. El canal predeterminado es Auto. No cambie esta opción a menos que esté experimentando problemas de conexión inalámbrica intermitente."
            }, {
                type: "name",
                title: "Ancho de Canal",
                content: "Seleccione un ancho de canal (ancho de banda) para la red inalámbrica."
            }, {
                type: "name",
                title: "Potencia de Transmisión",
                content: "Seleccione Alta, Media o Baja para especificar la potencia de transmisión. El valor predeterminado y recomendado es Alta."
            }, {
                type: "paragraph",
                content: "Haga clic en <strong>Guardar</strong> para guardar la configuración."
            }]
        },
        wps: {
            TITLE: "PIN de Router",
            CONTENT: [{
                type: "name",
                title: "PIN de Router",
                content: "Establezca esta opción en Sí para permitir a los dispositivos inalámbricos conectarse al router con el PIN (número de identificación personal) del router."
            }, {
                type: "name",
                title: "PIN Actual",
                content: "Muestra el PIN actual del router. El PIN predeterminado puede encontrarse en la etiqueta del router o en la Guía del usuario. Haga clic en Generar para generar un nuevo PIN aleatoriamente o haga clic en Restaurar para restaurar el PIN actual al PIN predeterminado."
            }, {
                type: "title",
                content: "Configuración de WPS"
            }, {
                type: "name",
                title: "Botón Físico (recomendado)",
                content: "Seleccione este método de configuración para habilitar la función WPS y para conectar fácilmente cualquier dispositivo habilitado para WPS a su red inalámbrica mediante el botón WPS o virtualmente con el botón Conectar."
            }, {
                type: "name",
                title: "Código PIN",
                content: "Seleccione este método de configuración para añadir un dispositivo manualmente introduciendo el PIN WPS del dispositivo inalámbrico en el campo."
            }, {
                type: "name",
                title: "Conectar",
                content: "Haga clic en este botón para iniciar WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Control Parental",
            CONTENT: [{
                type: "paragraph",
                content: "Control Parental permite bloquear sitios web inadecuados, explícitos y maliciosos; restringir el acceso en ciertos periodos del día (por ejemplo, Facebook o YouTube en el momento de hacer deberes)."
            }, {
                type: "name",
                title: "Estado",
                content: "Seleccione Sí para habilitar la función Control Parental. Esta función está deshabilitada de forma predeterminada."
            }, {
                type: "title",
                content: "Dispositivos Bajo Control Parental"
            }, {
                type: "paragraph",
                content: "Dispositivos bajo Control Parental muestra la lista de dispositivos que están restringidos por Control Parental."
            }, {
                type: "name",
                title: "Nombre del Dispositivo",
                content: "Muestra el nombre de todos los dispositivos cliente conectados que están bajo Control Parental."
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "Muestra la dirección MAC de todos los dispositivos cliente que están bajo Control Parental."
            }, {
                type: "name",
                title: "Periodo Efectivo",
                content: "Muestra los periodos de tiempo de la restricción de acceso."
            }, {
                type: "name",
                title: "Descripción",
                content: "Muestra una breve descripción del dispositivo conectado."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica si Control Parental está habilitado para el dispositivo correspondiente. Haga clic en el icono de la bombilla para habilitarlo o deshabilitarlo."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para modificar o eliminar el dispositivo correspondiente."
            }, {
                type: "note",
                title: "<strong>Para restringir un nuevo dispositivo cliente</strong>",
                content: [
                    "Haga clic en Añadir.",
                    "Haga clic en Ver Dispositivos para seleccionar un dispositivo conectado de la Lista de dispositivos de acceso; o introduzca el nombre del dispositivo y la dirección MAC manualmente para añadir un dispositivo que no está conectado.",
                    "Haga clic en el icono Periodo Efectivo para especificar el periodo de tiempo durante el cual se aplica la restricción.",
                    "Introduzca una breve descripción en el campo Descripción. Este campo es opcional.",
                    "Seleccione Habilitar.",
                    "Haga clic en Aceptar para guardar la entrada."
                ]
            }, {
                type: "paragraph",
                content: "<b>Para modificar o eliminar un dispositivo</b></br>En la lista Dispositivos bajo Control Parental, simplemente haga clic en el icono Editar o Papelera correspondiente al dispositivo que desee modificar o eliminar."
            }, {
                type: "paragraph",
                content: "<b>Para eliminar varios dispositivos</b></br>En Dispositivos bajo Control Parental, seleccione la casilla de verificación correspondiente a los dispositivos que se vayan a eliminar y haga clic en Eliminar encima de la tabla."
            }, {
                type: "title",
                title: "Restricción de Contenido"
            }, {
                type: "paragraph",
                content: "Restricción de contenido permite restringir el acceso a contenidos mediante palabras clave y nombres de dominio a los que los dispositivos cliente controlados por Control Parental pueden o no acceder en función del tipo de restricción. "
            }, {
                type: "name",
                title: "Tipo de Restricción",
                content: "Seleccione el siguiente tipo de restricción:",
                children: [{
                    type: "name",
                    title: "Lista Negra",
                    content: "Contiene palabras clave y nombres de dominio que se utilizarán para bloquear el acceso a sitios web de los dispositivos cliente especificados en la lista Dispositivos bajo Control Parental."
                }, {
                    type: "name",
                    title: "Lista Blanca",
                    content: "Contiene palabras clave y nombres de dominio a los que pueden acceder los dispositivos cliente especificados en la lista Dispositivos bajo Control Parental."
                }]
            }, {
                type: "name",
                title: "Añadir una Nueva Palabra Clave",
                content: "Haga clic aquí para añadir una nueva palabra clave o nombre de dominio a la lista negra o blanca."
            }, {
                type: "paragraph",
                content: "Para eliminar una palabra clave o nombre de dominio, haga clic en el icono - (menos) junto al elemento que desee eliminar."
            }, {
                type: "name",
                title: "Guardar",
                content: "Haga clic aquí para guardar la configuración."
            }]
        },
        parentCtrl: {
            TITLE: "Control Parental",
            CONTENT: [{
                type: "paragraph",
                content: "Con filtrados de antigüedad, límites de acceso y perfiles de usuario, los Controles Parentales proporcionan a su familia un acceso a internet apropiado y personalizado."
            }, {
                type: "note",
                title: "<strong>Aplicar los Controles Parentales a un nuevo dispositivo</strong>",
                content: [
                    "Haga click en Añadir.",
                    "Introduzca un nombre para este perfil y haga click en \"+\" para añadir dispositivos bajo este perfil.",
                    "Seleccione un Nivel de Filtro y personalice el contenido del filtro según sus necesidades. Puede introducir palabras clave para buscar páginas web que quiera filtrar en nuestra base de datos. Otras páginas web (URLs) pueden ser introducidas manualmente.<br/>Diríjase a las siguientes explicaciones para las diferentes categorías de filtros:<p>Contenido Adulto-Sitios con contenido sexual, contenido ilícito o dañino, incluyendo pornografía, uso de sustancias, violencia y discriminación</p><p>Juego-Sitios que promueban o proporcionen información sobre juego, incluyendo sitios de juego online</p><p>Educación Sexual - Sitios que hablen sobre información relativa a la sexualidad, incluyendo reproducción, sexualidad, seguridad sexual e información sobre como dar a luz, enfermedades de transmisión sexual y traumas sexuales</p><p>Comunicación Online - Sitios que tengan formatos de comunicación mediante texto, voz o vídeo, incluyendo email, blogs, fórums online, servicios de chat de VoIP y vídeo</p><p>Redes Sociales - Sitios que distribuyan información personal, enlaces a personas y su actividad personal basada en intereses similares, trayectoria profesional, experiencia o aptitudes</p><p>Pay to Surf - Sitios que compensan a los usuarios para ver determinados sitios web, mensajes de correo electrónico o anuncios, hacer clic en vínculos o responder a encuestas</p><p>Multimedia - Sitios que ofrecen o dan acceso a administradores de webs o descarga de videojuegos, incluyendo videojuegos online, videoconsolas en red y navegadores de juegos</p>",
                    "Si desea limitar el tiempo total que este perfil puede estar conectado, habilite y especifique Límites de Tiempo. También puede utilizar Hora de irse a la Cama para establecer un período de tiempo diario durante el cual los dispositivos de este perfil no pueden utilizar Internet.",
                    "Haga click en Guardar."
                ]
            }, {
                type: "note",
                title: "<strong>Ver el perfil detallado del historial de internet </strong>",
                content: [
                    "En la columna Insights, haga clic en el botón Insights correspondiente.",
                    "Si quiere ver más grabaciones, haga click en botón de Historial <span class=\"ptl-ctr-help-icon history\"></span>.",
                    "Puede bloquear o desbloquear páginas web haciendo click en el botón <span class=\"ptl-ctr-help-icon block\"></span> or <span class=\"ptl-ctr-help-icon unblock\"></span>."
                ]
            }, {
                type: "note",
                title: "<strong>Deshabilitar o habilitar el acceso a Internet inmediatamente.</strong>",
                content: [
                    "En la columna Acceso a Internet, haga click en <span class=\"ptl-ctr-help-icon stop\"></span> to stop the corresponding profile's devices from accessing the internet and click <span class=\"ptl-ctr-help-icon enable\"></span>para habilitar el acceso otra vez."
                ]
            }]
        },
        qos: {
            TITLE: "QoS",
            CONTENT: [{
                type: "paragraph",
                content: "La funcionalidad QoS (Calidad de Servicio) prioriza las actividades y dispositivos online para garantizar una conexión de red más rápida cuando más lo necesites."
            }, {
                type: "paragraph",
                content: "Seleccione la Prioridad de Aplicación para priorizar la velocidad de red para actividades online y seleccione el Prioridad de Dispositivo para priorizar la velocidad de red de los dipositivos."
            }, {
                type: "title",
                content: "Prioridad de Aplicación"
            }, {
                type: "paragraph",
                content: "Elija las actividades online que quiere priorizar o haga click en Personalizar para establecer el nivel de prioridad de cada actividad online."
            }, {
                type: "title",
                content: "Prioridad de Dispositivo"
            }, {
                type: "paragraph",
                content: "Elija los dispositivos que quiere priorizar y cuánto quiere que dure dicha priorización."
            }, {
                type: "note",
                title: "<strong>Priorizar un dispositivo</strong>",
                content: [
                    "Encontrar el dispositivo que quiere priorizar en la lista y activar Prioridad.",
                    "Select how long the device will be prioritized for in the Timing column."
                ]
            }]
        },
        antiVirus: {
            TITLE: "Antivirus",
            CONTENT: [{
                type: "paragraph",
                content: "With frequent network scans, malicious site detection and infected device isolation, the Antivirus feature keeps your personal information secure. You can also check how your network is protected, and if there have been any attacks on your network."
            }, {
                type: "paragraph",
                content: "History - Records the devices that have been protected by Antivirus and the source and classification of the attacks."
            }, {
                type: "paragraph",
                content: "Habilitar Todo - Seleccione para habilitar todos los tipos de Protecciones si uno o más no están habilitados."
            }, {
                type: "paragraph",
                content: "Tipos de Protección - Habilita los Tipos de Protección mediante las siguientes explicaciones. Se recomienda habilitar todos los Tipos de Protecciones."
            }]
        },
        applicationPriority: {
            TITLE: "Prioridad de Aplicación",
            CONTENT: [{
                type: "paragraph",
                content: "La funcionalidad de Prioridad de Aplicación prioriza las actividades online para garantizar una conexión de red más rápida cuando más lo necesite. Elija la actividad online que quiera priorizar o haga click en Personalizar para establecer el nivel de prioridad de cada actividad online."
            }]
        },
        devicePriority: {
            TITLE: "Prioridad de Dispositivo",
            CONTENT: [{
                type: "paragraph",
                content: "La funcionalidad de Prioridad de Dispositivo prioriza los dispositivos para garantizar una conexión de red más rápida cuando más lo necesite. Elija los dispositivos que quiera priorizar y cuánto quiere que dure dicha priorización. "
            }, {
                type: "note",
                title: "<strong>Priorizar un dispositivo</strong>",
                content: [
                    "Encontrar el dispositivo que quiere priorizar en la lista y activar Prioridad.",
                    "Select how long the device will be prioritized for in the Timing column."
                ]
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Red de Invitados",
            CONTENT: [{
                type: "paragraph",
                content: "Red de Invitados permite configurar una red inalámbrica independiente con un nombre de red y contraseña independientes (SSID) que los invitados pueden utilizar para acceder a Internet."
            }, {
                type: "name",
                title: "Permitir a invitados verse entre ellos",
                content: "Seleccione esta casilla de verificación para permitir a los dispositivos inalámbricos en la red de invitado intercomunicarse entre ellos."
            }, {
                type: "name",
                title: "Permitir a invitados acceder a mi red local",
                content: "Seleccione esta casilla de verificación para permitir a los dispositivos inalámbricos en la red de invitado acceder a su red local."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz",
                content: "Seleccione el botón correspondiente para habilitar la Red de Invitados 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "SSID de la Red de Invitados",
                content: "Utilice el SSID predeterminado o cree un nombre nuevo (de 1 a 32 caracteres). Este campo distingue entre mayúsculas y minúsculas."
            }, {
                type: "name",
                title: "Ocultar SSID",
                content: "Seleccione esta casilla de verificación si desea ocultar el SSID de la red de invitado."
            }, {
                type: "name",
                title: "Seguridad",
                content: "Seleccione una opción de seguridad para la red de invitado:",
                children: [{
                    type: "name",
                    title: "Ninguna",
                    content: "De forma predeterminada, la seguridad de la red de invitado está establecida en Ninguna; nadie puede acceder a la red."
                }, {
                    type: "name",
                    title: "Establecer contraseña",
                    content: "Cree una contraseña para la red de invitado de entre 8 y 63 caracteres ASCII o de entre 8 y 64 caracteres hexadecimales (0-9, a-f, A-F) en el campo Contraseña."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Estado de Internet",
                content: "Muestra el estado actual de la conexión a Internet del router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Tipo de Conexión",
                content: "Muestra el tipo de Conexión a Internet."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Dirección IP",
                content: "Muestra la dirección IP de Internet actual asignada al router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Servidor DNS",
                content: "Muestra las direcciones IP de los servidores DNS primario y secundario."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Puerta de Enlace",
                content: "Muestra la dirección IP de la puerta de enlace."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Dirección MAC",
                "content": "Muestra la dirección física única del router."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Dirección IP",
                "content": "Muestra la dirección IP del router, la cual puede ser utilizada para acceder a la página de gestión web del router."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Máscara de Subred",
                "content": "Muestra la submáscara de red del router."
            }, {
				display: "$.routerMode == 'AP'",
				"type": "name",
                "title": "Tipo de Dirección",
                "content": "Muestra el tipo de configuración de la dirección IP del router."
            }, {
		display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",	    	
		type: 'title',
		title: 'Prueba de velocidad'
		}, {
		display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",
		type: "paragraph",
		content: "This feature tests the current upload and download speeds you're getting from your service provider and provides helpful advice about your internet's capabilities."
		} ,{
		display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                      
		type: "paragraph",
		content: "Tip: For a more accurate result, try closing down other apps and programs."
		} ,{  
		display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                    
		type: "paragraph",
		content: "History - A record of previous speed tests."
		} ,{  
		display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",                    
		type: "paragraph",
		content: "Test Again - Click to perform a speed test."
		}, {
                type: "title",
                title: "Router"
            }, {
                type: "title2",
                content: "Wi-Fi 2.4GHz | 5GHz"
            }, {/*
                type: "name",
                title: "Estado",
                content: "Muestra si la red inalámbrica 2.4GHz | 5GHz está habilitada (Sí) o deshabilitada (No)."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Muestra el nombre de la red inalámbrica actual de la frecuencia de bandas 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Canal",
                content: "Muestra el canal del cual transmite la red inalámbrica 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "MAC",
                content: "Muestra la dirección MAC actual de la red inalámbrica 2.4GHz | 5GHz."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "title2",
                content: "Red de Invitados 2.4GHz | 5GHz"
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "Estado",
                content: "Muestra si la Red de Invitados 2.4GHz | 5GHz está habilitada (Sí) o deshabilitada (No)."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "SSID",
                content: "Muestra el nombre de red inalámbrica de la red de invitado."
            }, {
                type: "title",
                title: "Clientes Inalámbricos/Cableados"
            }, {
                type: "name",
                title: "Nombre",
                content: "Muestra el nombre del cliente conectado al router."
            }, {
                type: "name",
                title: "Dirección IP",
                content: "Muestra la dirección IP asignada del cliente."
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "Muestra la dirección MAC del cliente."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Teléfono"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Nombre de teléfono",
                content: "Muestra el nombre del teléfono."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Números de llamadas entrantes",
                content: "Muestra los números utilizados por sus dispositivos de telefonía para recibir llamadas entrantes a través del router."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Número interno",
                content: "Muestra los números de teléfono utilizados para realizar llamadas entre dispositivos de telefonía conectados al mismo router. Este valor está predefinido y no se puede modificar."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Número de llamadas salientes",
                content: "Muestra los números utilizados por los dispositivos de telefonía para realizar llamadas salientes a través del router. El valor predeterminado es Auto, que significa que el router seleccionará un número disponible como número para realizar llamadas salientes (puede modificarse en la página VoIP)."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Impresora"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Nombre",
                content: "Muestra el nombre de la impresora conectada al router a través del puerto USB."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Disco USB"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Marca",
                content: "Muestra la marca del disco USB conectado al router."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Total",
                content: "Muestra el volumen total del disco USB."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Disponible",
                content: "Muestra el espacio disponible del disco USB."
            }]
        },
		sysMode: {
            TITLE: "Modo de operación",
            CONTENT: [{
                type: "name",
                title: "Router",
                content: "En este modo, su router se conecta directamente a Internet mediante IP Dinámica, IP Estática, PPPoE, L2TP o PPTP y comparte el acceso a Internet para múltiples dispositivos cableados o inalámbricos. El NAT, el firewall y el servidor DHCP están habilitados por defecto. Seleccione este modo si es su primera vez como usuario o si actualmente no está utilizando otro router."
            }, {
                type: "name",
                title: "Punto de Acceso",
                content: "En este modo, su router se conecta a un router cableado o inalámbrico mediante cable Ethernet y extiende la cobertura inalámbrica de su red. Funciones como NAT, Controles Parentales y QoS no están soportadas en este modo. La dirección IP de este router está asignada por el Servidor DHCP del router principal. Si no sabe la dirección IP de este router, puede utilizar http://tplinkwifi.net para acceder a la página de gestión web."
            }]
        },
        wirelessBasic: {
            TITLE: "Configuración Inalámbrica",
            CONTENT: [{
                type: "name",
                title: "Wi-Fi en 2.4GHz | 5GHz",
                content: "Seleccione esta casilla de verificación para habilitar la frecuencia de emisión inalámbrica 2.4GHz | 5GHz."
            }, {
                type: "name",
                title: "Nombre de Red Wi-Fi (SSID)",
                content: "Puede dejar el nombre de red (SSID) predeterminado tal y como está o crear un nuevo nombre (de hasta 32 caracteres). Este campo distingue entre mayúsculas y minúsculas."
            }, {
                type: "name",
                title: "Contraseña",
                content: "Cree una contraseña Wi-Fi de entre 8 y 63 caracteres ASCII o de entre 8 y 64 caracteres hexadecimales. Este campo distingue entre mayúsculas y minúsculas."
            }, {
                type: "name",
                title: "Ocultar SSID",
                content: "Seleccione esta casilla de verificación si desea ocultar el SSID 2.4GHz | 5GHz de la lista de redes Wi-Fi."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Muestra información relevante sobre la conexión a Internet."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                /*type: "name",
                title: "Nombre",
                content: "Muestra el nombre del puerto de Internet del router."
            }, {*/
                type: "name",
                title: "Dirección MAC",
                content: "La dirección física única asignada al puerto de Internet (WAN) del router."
            }, {
                type: "name",
                title: "Dirección IP",
                content: "La dirección IP asignada al puerto de Internet (WAN) del router. Si la dirección IP se muestra como 0.0.0.0 indica que no hay acceso a Internet."
            }, {
                type: "name",
                title: "Máscara de Subred",
                content: "Este parámetro determina la porción correspondiente a la red y la porción correspondiente al host de una dirección IP."
            }, {
                type: "name",
                title: "Puerta de Enlace Predeterminada",
                content: "La dirección IP utilizada para conectar el router a la red."
            }, {
                type: "name",
                title: "DNS Primario/DNS Pecundario",
                content: "El DNS (Domain Name System) traduce nombres de host y dominios de Internet en direcciones IP. La información de estos servidores DNS es asignada por el proveedor de servicios de Internet (ISP)."
            }, {
                type: "name",
                title: "Tipo de Conexión",
                content: "El tipo de Conexión actual de Internet."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "La dirección física única asignada al puerto de Internet (WAN) del router."
            }, {
                type: "name",
                title: "Dirección IP",
                content: "La dirección IPv6 asignada al puerto de Internet (WAN) del router."
            }, {
                type: "name",
                title: "Puerta de Enlace Predeterminada",
                content: "La dirección IP utilizada para conectar el router a la red."
            }, {
                type: "name",
                title: "DNS Primario/DNS Pecundario",
                content: "El DNS (Domain Name System) traduce nombres de host y dominios de Internet en direcciones IP. La información de estos servidores DNS es asignada por el proveedor de servicios de Internet (ISP)."
            }, {
                type: "name",
                title: "Tipo de Conexión",
                content: "El tipo de Conexión actual de Internet."
            }, {
                type: "title",
                title: "Wi-Fi"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Seleccione esta opción para ver la configuración e información de Wi-Fi 2.4G | 5G."
            }, {
                type: "name",
                title: "Nombre de red",
                content: "El nombre de red inalámbrica, también conocido como SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "Emisión Inalámbrica",
                content: "El estado actual (Sí o No) de la red inalámbrica."
            }, {
                type: "name",
                title: "Modo",
                content: "El modo inalámbrico actual."
            }, {
                type: "name",
                title: "Ancho de Canal",
                content: "El ancho de banda de canal de la red inalámbrica."
            }, {
                type: "name",
                title: "Canal",
                content: "El canal inalámbrico actual y su frecuencia correspondiente (en GHz)."
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "La dirección MAC de la radio de la red inalámbrica."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Muestra información sobre los puertos Ethernet (LAN)."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "La dirección física única asignada al puerto Ethernet (LAN) del router."
            }, {
                type: "name",
                title: "Dirección IP",
                content: "La dirección IPv4 asignada al puerto Ethernet (LAN) del router."
            }, {
                type: "name",
                title: "Máscara de Subred",
                content: "Este parámetro determina la porción correspondiente a la red y la porción correspondiente al host de una dirección IP."
            }, {
                type: "name",
                title: "DHCP",
                content: "Muestra si el servidor DHCP integrado del router está activo para dispositivos en los puertos LAN o no."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "La dirección física única asignada al puerto Ethernet (LAN) del router."
            }, {
                type: "name",
                title: "Dirección IP",
                content: "La dirección IPv6 asignada al puerto Ethernet (LAN) del router."
            }, {
                type: "name",
                title: "Longitud de prefijo",
                content: "La longitud del prefijo de la dirección IPv6."
            }, {
                type: "name",
                title: "Tipo asignado",
                content: "El tipo de dirección IPv6 asignado a la interfaz LAN."
            }, {
                type: "title",
                title: "Red de Invitados"
            }, {
                type: "name",
                title: "2.4G | 5G",
                content: "Seleccione esta opción para ver la configuración e información de la Red de Invitados 2.4G | 5G."
            }, {
                type: "name",
                title: "SSID de la Red de Invitados",
                content: "El nombre de red inalámbrica (SSID) de la red de invitado."
            }, {
                type: "name",
                title: "Ocultar SSID",
                content: "Muestra si el nombre de red inalámbrico (SSID) de la red de invitado está oculto (Sí) o no (No)."
            }, {
                type: "name",
                title: "Emisión Inalámbrica",
                content: "Indica el estado actual (Sí o No) de la red de invitado."
            }, {
                type: "name",
                title: "Verse entre ellos",
                content: "Muestra si todos los dispositivos en la red de invitado pueden comunicarse entre ellos."
            }]
        },
        time: {
            TITLE: "Configuración Horaria",
            CONTENT: [{
                type: "name",
                title: "Zona horaria",
                content: "Seleccione su zona horaria en la lista desplegable."
            }, {
                type: "name",
                title: "Fecha",
                content: "Introduzca la fecha local en formato MM/DD/AA en el campo."
            }, {
                type: "name",
                title: "Hora",
                content: "Seleccione la hora local en la lista desplegable (en formato de 24 horas; p.ej., 16:00:00 es 04:00 PM)."
            }, {
                type: "name",
                title: "Servidor NTP I/Servidor NTP II",
                content: "Introduzca la dirección IP del servidor NTP I o Servidor NTP II, y el router obtendrá la hora del servidor NTP automáticamente. Asimismo, el router dispone de algunos servidores NTP comunes integrados que se sincronizarán automáticamente una vez que se conecte a Internet."
            }, {
                type: "name",
                title: "Obtener de PC",
                content: "Haga clic aquí para sincronizar la hora con la hora del sistema del equipo."
            }, {
                type: "name",
                title: "Obtener GMT",
                content: "Haga clic aquí para sincronizar la hora con la zona horaria GMT (Greenwich Mean Time) de Internet."
            }, {
                type: "name",
                title: "Guardar",
                content: "Haga clic aquí para guardar la configuración."
            }, {
                type: "title",
                content: "Horario de Verano"
            }, {
                type: "note",
                title: "Para configurar el horario de verano",
                content: [
                    "Seleccione <b>Habilitar Horario de Verano</b>",
                    "Seleccione la fecha y hora de <b>inicio</b> correctas en que se inicia el horario de verano en su zona horaria local.",
                    "Seleccione la fecha y hora de <b>finalización</b> correctas en que finaliza el horario de verano en su zona horaria local.",
                    "Haga clic en <b>Guardar</b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Herramientas de Diagnóstico",
            CONTENT: [{
                type: "paragraph",
                content: "El router ofrece dos herramientas de diagnóstico: Ping y Traceroute."
            }, {
                type: "note",
                title: "Para realizar el diagnóstico con la herramienta Ping:",
                content: [
                    "Active el botón de radio correspondiente a Ping.",
                    "Introduzca la dirección IP o nombre de dominio.",
                    "Haga clic en el icono desplegable delante de Avanzado para ver el número de pings, el tamaño del paquete ping y el tiempo de espera de ping. Conserve el valor predeterminado de estos parámetros o configúrelos de acuerdo con sus necesidades.",
                    "Haga clic en el botón Iniciar para empezar el diagnóstico."
                ]
            }, {
                type: "paragraph",
                content: "O BIEN"
            }, {
                type: "note",
                title: "Para realizar el diagnóstico con la herramienta Traceroute:",
                content: [
                    "Active el botón de radio correspondiente a Traceroute.",
                    "Introduzca la dirección IP o nombre de dominio.",
                    "Haga clic en el icono desplegable delante de Avanzado para ver TTL máx. de Traceroute. Conserve el valor predeterminado de este parámetro o configúrelo de acuerdo con sus necesidades.",
                    "Haga clic en el botón Iniciar para empezar el diagnóstico."
                ]
            }]
        },
        softup: {
            TITLE: "Actualización de Firmware",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Una actualización de firmware actualiza el sistema operativo del router con las últimas y nuevas funcionalidades y las diversas soluciones de problemas para mejorar el rendimiento. Cuando una nueva actualización de firmware está disponible, se le notificará con un icono de Actualizar en la esquina superior derecha. Haga click en el icono para entrar a la página de Actualización de Firmware."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>IMPORTANTE: Por favor siga las intrucciones para prevenir un fallo de actualización.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Antes de Actualizar:",
                content: [
                    "Conecte su ordenador al router con un cable Ethernet. NO se recomienda actualizar el firmware inalámbricamente.",
                    "Quite todos los dispositivos de almacenamiento USB conectados al router .",
                    "Guarde los ajustes de configuración del router."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Durante el proceso de actualización:<br>Mantenga el router encendido y no realice ninguna acción en él."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Para actualizar el firmware online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Haga click en Actualizar y confirme cuando se muestre. El router automáticamente descargará y actualizará el último firmware y después se reiniciará. <br><b>Nota</b>: Puede que necesite primero hacer click en Comprobar actualizaciones para comprobar si hay disponible alguna actualización de firmware. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Para actualizar el firmware manualmente"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Visite www.tp-link.es y descargue a su ordenador el último firmware de nuestra página de soporte. Asegúrese que el archivo del firmware que ha descargado coincide con la versión de hardware de su router como se muestra en la página.",
                    "Haga click en <b>Examinar</b> y seleccione el archivo de firmware descargado.",
                    "Haga click en <b>Actualizar</b>. La actualización de firmware puede tardar unos minutos en completarse. El router se reiniciará automáticamente cuando la actualización de firmware haya terminado."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Antes de actualizar el firmware del router, deberá descargar la última actualización de firmware de la página <a href='http://www.tp-link.es/download-center.html'>Centro de descargas de TP-LINK</a> en su equipo."
            }, {
            	display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>IMPORTANTE:</B> Para evitar errores de actualización, tenga en cuenta lo siguiente:",
                content: [
                    "Compruebe que el archivo de firmware se corresponda con la versión de hardware (tal y como se muestra en la página <b>Actualización de firmware</b>).",
                    "Asegúrese de disponer de una conexión estable entre el router y el equipo. <b>NO</b> se recomienda actualizar el firmware mediante una conexión inalámbrica.",
                    "Compruebe que haya quitado todos los dispositivos USB conectados al router antes de actualizar el firmware para evitar la pérdida de datos.",
                    "Realice una copia de seguridad de la configuración del router.",
                    "No apague el router durante la actualización de firmware."
                ]
            }, {
            	display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Para actualizar el firmware del router",
                content: [
                    "Haga clic en <b>Examinar</b>.",
                    "Localice y seleccione el archivo de firmware descargado.",
                    "Haga clic en <b>Actualizar</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Copia de Seguridad",
            CONTENT: [{
                type: "paragraph",
                content: "Se recomienda encarecidamente realizar una copia de seguridad de la configuración actual en caso de que sea necesario restaurar un estado previo del sistema o los valores predeterminados de fábrica."
            }, {
                type: "paragraph",
                content: "Haga clic en <b>Copia de Seguridad</b> para guardar la configuración actual en el equipo. Asegúrese de guardar el archivo de copia de seguridad en una ubicación segura para poder restaurar el router, en caso de ser necesario."
            }, {
                type: "title",
                content: "Restaurar"
            }, {
                type: "note",
                title: "Para restaurar una copia de seguridad",
                content: [
                    "Haga clic en <b>Examinar</b>.",
                    "Localice y seleccione el archivo de copia de seguridad.",
                    "Haga clic en <b>Restaurar</b>."
                ]
            }, {
                type: "title",
                content: "Restaurar Configuración a Valores de Fábrica"
            }, {
                type: "paragraph",
                content: "Haga clic en <b>Restaurar a Valores de Fábrica</b> para restablecer la configuración predeterminada de fábrica del router."
            }, {
                type: "note",
                title: "Note:",
                content: [
                    "Restaurar valores de fábrica restablecerá los valores predeterminados de fábrica del router. Una vez que se haya restaurado y reiniciado el router, cree una nueva contraseña para volver a iniciar sesión en la página de gestión basada en la Web.",
                    "NO apague el router durante el proceso de copia de seguridad o restauración."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Administración de Cuentas",
            CONTENT: [{
                type: "paragraph",
		display: "$.helpControl.cloudLogin",
                content: "Esta página permite cambiar la contraseña de inicio de sesión."
            }, /*{
                type: "name",
                title: "Nombre de Usuario Anterior",
                content: "Escriba el nombre de usuario actual."
            }, */{
                type: "name",
                title: "Contraseña Anterior",
                content: "Escriba la contraseña actual."
            }, /*{
                type: "name",
                title: "Nombre de Usuario Nuevo",
                content: "Escriba el nombre de usuario nuevo."
            }, */{
                type: "name",
                title: "Contraseña Nueva",
                content: "Escriba la contraseña nueva."
            }, {
                type: "name",
                title: "Confirmar Contraseña Nueva",
                content: "Vuelva a escribir la contraseña nueva."
            }, {
                type: "title",
                content: "Administración Local"
            }, {
                type: "paragraph",
                content: "Administración local permite asignar específicamente un dispositivo cliente en la red para acceder al router y administrarlo con la autenticación basada en direcciones MAC."
            }, {
                type: "name",
                title: "Puerto",
                content: "Introduzca el número de puerto que se vaya a utilizar para acceder al router (entre 1024 y 65535). El número predeterminado es 80."
            }, {
                type: "name",
                title: "Dirección IP/MAC",
                content: "Introduzca una dirección MAC o una dirección IP local válida del dispositivo para poder acceder al router."
            }, {
                type: "title",
                content: "Administración Remota"
            }, {
                type: "paragraph",
                content: "La función Administración remota permite acceder al router y configurarlo de forma remota desde Internet."
            }, {
                type: "name",
                title: "Administración Remota",
                content: "Seleccione la casilla de verificación para habilitar la función Administración remota."
            }, {
                type: "name",
                title: "Puerto",
                content: "Introduzca el número de puerto que se vaya a utilizar para acceder al router con mayor seguridad (entre 1024 y 65535). Por lo general, los exploradores web utilizan el puerto de servicio HTTP estándar (80)."
            }, {
                type: "name",
                title: "Dirección IP/MAC",
                content: "Introduzca una dirección MAC o una dirección IP remota válida para poder acceder al router."
            }]
        },
        log: {
            TITLE: "Registro del Sistema",
            CONTENT: [{
                type: "paragraph",
                content: "La página Registro del sistema muestra una lista de las actividades (eventos) más recientes del router. Puede definir qué tipos de registros y/o nivel de registros desea ver. Esta página también permite al router exportar el registro del sistema a un equipo o enviarlo automáticamente a un servidor remoto específico."
            }, {
                type: "name",
                title: "Tipo",
                content: "Seleccione el tipo de registro del sistema que desea ver."
            }, {
                type: "name",
                title: "Nivel",
                content: "Seleccione el nivel de registro del sistema que desea ver."
            }, {
                type: "name",
                title: "Actualizar",
                content: "Haga clic en este icono para actualizar el registro del sistema."
            }, {
                type: "name",
                title: "Eliminar Todo",
                content: "Haga clic en este icono para eliminar todos los registros del sistema."
            }, {
                type: "name",
                title: "Configuración de Registro",
                content: "Haga clic aquí para establecer la configuración del archivo de registro.",
                children: [{
                    type: "name",
                    title: "Guardar Localmente",
                    content: "Seleccione esta opción para guardar el registro del sistema en la memoria local del router. El registro se mostrará en la tabla de la página Registro del sistema.",
                    children: [{
                        type: "name",
                        title: "Nivel Mínimo",
                        content: "Seleccione el nivel mínimo de registro del sistema que se debe guardar en la lista desplegable. La lista se encuentra en orden descendente, con el nivel más bajo en la última posición."
                    }]
                }, {
                    type: "name",
                    title: "Guardar Remotamente",
                    content: "Seleccione esta opción para enviar el registro del sistema a un servidor remoto. Si el servidor remoto dispone de un cliente visor de registros o de una herramienta sniffer implementada, podrá ver y analizar el registro del sistema de forma remota en tiempo real.",
                    children: [{
                        type: "name",
                        title: "Nivel Mínimo",
                        content: "Seleccione el nivel mínimo de registro del sistema que se debe guardar en la lista desplegable. La lista se encuentra en orden descendente, con el nivel más bajo en la última posición."
                    }, {
                        type: "name",
                        title: "IP de Servidor",
                        content: "Especifique la dirección IP del servidor de registros del sistema remoto."
                    }, {
                        type: "name",
                        title: "Puerto de Servidor",
                        content: "Especifique el número de puerto del servidor de registros del sistema remoto."
                    }, {
                        type: "name",
                        title: "Nombre de Instalación Local",
                        content: "Seleccione el nombre de instalación local del servidor remoto en la lista desplegable."
                    }]
                }]
            }, {
                type: "name",
                title: "Guardar Registro",
                content: "Haga clic en este botón para descargar todos los registros del sistema en el equipo local."
            }]
        },
        snmp: {
            TITLE: "Configuración SNMP",
            CONTENT: [{
                type: "name",
                title: "Agente SNMP",
                content: "Establezca esta opción en Sí para habilitar el agente SNMP integrado, que permite al router tener el rol operativo en la recepción y procesamiento de mensajes SNMP, el envío de respuestas al administrador SNMP y la activación de capturas SNMP cuando se produce un evento."
            }, {
                type: "name",
                title: "Comunidad de Solo Lectura",
                content: "Muestra la cadena de comunidad pública predetermina que protege el router del acceso no autorizado."
            }, {
                type: "name",
                title: "Comunidad de Escritura",
                content: "Muestra la cadena de comunidad de lectura y escritura predetermina que protege el router de cambios no autorizados."
            }, {
                type: "name",
                title: "Nombre de Sistema",
                content: "Muestra el nombre asignado de forma administrativa para este dispositivo gestionado."
            }, {
                type: "name",
                title: "Descripción de Sistema",
                content: "Muestra la descripción textual del dispositivo gestionado. Este valor debe incluir el nombre completo y la identificación de versión del tipo de hardware del sistema, sistema operativo del software y software de red."
            }, {
                type: "name",
                title: "Ubicación de Sistema",
                content: "Muestra la ubicación física de este dispositivo (p.ej., armario telefónico, 3ª planta)."
            }, {
                type: "name",
                title: "Contacto de Sistema",
                content: "Muestra la identificación textual de la persona de contacto para este dispositivo gestionado, junto con información sobre cómo contactar con esa persona."
            }, {
                type: "name",
                title: "IP de Administrador de Capturas",
                content: "Muestra la dirección IP del host para recibir las capturas."
            }]
        },
        stat: {
            TITLE: "Estadísticas de Tráfico",
            CONTENT: [{
                type: "name",
                title: "Estadísticas de Tráfico",
                content: "Establezca esta opción en Sí para habilitar la función Estadísticas de tráfico."
            }, {
                type: "title",
                content: "Lista de Estadísticas de Tráfico"
            }, {
                type: "name",
                title: "Dirección IP/MAC",
                content: "Las direcciones IP y MAC de los clientes conectados."
            }, {
                type: "name",
                title: "Total de Paquetes",
                content: "El número total de paquetes recibidos y transmitidos por el router."
            }, {
                type: "name",
                title: "Total de Bytes",
                content: "El número total de bytes recibidos y transmitidos por el router."
            }, {
                type: "name",
                title: "Paquetes Actuales",
                content: "El número total de paquetes recibidos y transmitidos en un intervalo de tiempo específico en segundos."
            }, {
                type: "name",
                title: "Bytes Actuales",
                content: "El número total de bytes recibidos y transmitidos en un intervalo de tiempo específico en segundos."
            }, {
                type: "name",
                title: "Tx ICMP Actual",
                content: "Muestra la velocidad de transmisión actual de los paquetes ICMP transmitidos a través del puerto LAN por encima de la velocidad máxima de transmisión por segundo."
            }, {
                type: "name",
                title: "Tx UDP Actual",
                content: "Muestra la velocidad de transmisión actual de los paquetes UDP transmitidos a través del puerto LAN por encima de la velocidad máxima de transmisión por segundo."
            }, {
                type: "name",
                title: "Tx SYN Actual",
                content: "Muestra la velocidad de transmisión actual de los paquetes SYN TCP transmitidos a través del puerto LAN por encima de la velocidad máxima de transmisión por segundo."
            }, {
                type: "name",
                title: "Modificar",
                content: "Haga clic en el icono <b>Papelera</b> para eliminar las estadísticas correspondientes."
            }, {
                type: "name",
                title: "Actualizar",
                content: "Haga clic aquí para actualizar la información de estadísticas en la página."
            }, {
                type: "name",
                title: "Restablecer",
                content: "Haga clic aquí para restablecer a cero todos los valores de estadísticas en la lista."
            }, {
                type: "name",
                title: "Eliminar Todo",
                content: "Haga clic aquí para eliminar la información de estadísticas en la lista."
            }]
        },
        ethWan: {
            TITLE: "Interfaz WAN",
            CONTENT: [{
                type: "title2",
                content: "Tipo de Conexión: IP Dinámica"
            }, {
                type: "name",
                title: "IP Dinámica",
                content: "Seleccione este tipo si el proveedor de servicios de Internet (ISP) le proporciona una conexión de servidor DHCP."
            }, {
                type: "name",
                title: "Dirección IP/Máscara de Subred/Puerta de Enlace/Puerta de Enlace Predeterminada",
                content: "Estos parámetros son asignados automáticamente por el servidor DCHP de su ISP."
            }, {
                type: "name",
                title: "Renovar/Liberar",
                content: "Haga clic en este botón para renovar/liberar los parámetros IP de su ISP."
            }, {
                type: "name",
                title: "Avanzado",
                children: [{
                    type: "name",
                    title: "Tamaño de MTU (en bytes)",
                    content: "El tamaño de unidad de transmisión máxima (MTU) típico y predeterminado para la mayoría de las redes Ethernet es <b>1500 bytes</b>. No se recomienda modificar el tamaño de MTU predeterminado a menos que el ISP lo requiera."
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "IGMP (Internet Group Management Protocol) se utiliza para gestionar la multidifusión en redes TCP/IP. Algunos ISP utilizan IGMP para realizar la configuración remota en un router. Esta opción está habilitada de forma predeterminada."
                }, {
                    type: "name",
                    title: "Obtener IP con DHCP Unicast",
                    content: "Seleccione esta casilla de verificación si el servidor DHCP de su ISP no admite aplicaciones de difusión y no puede obtener la dirección IP de forma dinámica."
                }, {
                    type: "name",
                    title: "Utilizar la Siguiente Dirección DNS",
                    content: "Seleccione esta casilla de verificación e introduzca la dirección o direcciones del servidor DNS en notación decimal con punto proporcionadas por su ISP. Esta interfaz WAN utilizará el servidor DNS especificado como prioridad."
                }, {
                    type: "name",
                    title: "Nombre de Host",
                    content: "Introduzca el nombre de host de esta interfaz WAN."
                }]
            }, {
                type: "title2",
                content: "Tipo de Conexión: IP Estática"
            }, {
                type: "name",
                title: "IP Estática",
                content: "Seleccione este tipo si el proveedor de servicios de Internet (ISP) proporciona los parámetros de DNS, puerta de enlace, máscara de subred y dirección IP (fija) específica."
            }, {
                type: "name",
                title: "Dirección IP/Máscara de Subred/Puerta de Enlace/Servidor DNS/Servidor DNS Secundario",
                content: "Introduzca la información de IP proporcionada por su ISP en notación decimal con punto."
            }, {
                type: "paragraph",
                content: "Haga clic en <b>Avanzado</b> para ver más parámetros avanzados."
            }, {
                type: "name",
                title: "Avanzado",
                children: [{
                    type: "name",
                    title: "Tamaño de MTU (en bytes)",
                    content: "El tamaño de unidad de transmisión máxima (MTU) típico y predeterminado para la mayoría de las redes Ethernet es <b>1500 bytes</b>. No se recomienda modificar el tamaño de MTU predeterminado a menos que el ISP lo requiera."
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "IGMP (Internet Group Management Protocol) se utiliza para gestionar la multidifusión en redes TCP/IP. Algunos ISP utilizan IGMP para realizar la configuración remota en un router. Esta opción está habilitada de forma predeterminada."
                }]
            }, {
                type: "title2",
                content: "Tipo de Conexión: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Seleccione este tipo si utiliza el servicio DSL (Digital Subscriber Line) y el ISP le proporciona un nombre de usuario y contraseña."
            }, {
                type: "name",
                title: "Nombre de Usuario PPPoE/Contraseña PPPoE/Confirmar Contraseña",
                content: "Introduzca el nombre de usuario y contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
            }, {
                type: "name",
                title: "Conexión Secundaria",
                content: "Solo está disponible para la conexión PPPoE. Si su ISP proporciona un tipo de conexión extra, como IP Dinámica/Secundaria, para la conexión a una red de área local, puede seleccionar el botón de radio de IP Dinámica/Estática para activar esta conexión secundaria.<br>La conexión secundaria está deshabilitada de forma predeterminada, por lo que solo hay la conexión PPPoE. No habilite está opción salvo que sea necesario."
            }, {
                type: "name",
                title: "Modo de Conexión",
                content: "Seleccione uno de los modos de conexión a continuación para determinar cómo establecer la conexión a Internet:",
                children: [{
                    type: "name",
                    title: "Siempre",
                    content: "Seleccione este modo para reconectarse automáticamente en caso de que se desconecte la conexión."
                }, {
                    type: "name",
                    title: "Conectar a petición",
                    content: "Seleccione este modo para desconectar la conexión a Internet de acuerdo con el tiempo de inactividad específico (Tiempo máx. de inactividad). La conexión se restablecerá cuando intente acceder a Internet de nuevo."
                }, {
                    type: "name",
                    title: "Conectar manualmente",
                    content: "Seleccione este modo para conectar o desconectar la conexión a Internet manualmente o en función del tiempo de inactividad específico (Tiempo máx. de inactividad)."
                }, {
                    type: "name",
                    title: "Tiempo máx. de inactividad",
                    content: "<b>15 minutos</b> - Introduzca el número de minutos que la conexión a Internet puede estar inactiva antes de que se interrumpa. El tiempo de inactividad predeterminado es 15 minutos. "
                }]
            }, {
                type: "name",
                title: "Tipo de Autenticación",
                content: "Seleccione un tipo de autenticación en la lista desplegable. El método predeterminado es AUTO_AUTH."
            }, {
                type: "name",
                title: "Conectar/Desconectar",
                content: "Haga clic para conectarse/desconectarse de forma inmediata."
            }, {
                type: "paragraph",
                content: "Haga clic en <b>Avanzado</b> para ver más parámetros avanzados."
            }, {
                type: "name",
                title: "Avanzado",
                children: [{
                    type: "name",
                    title: "Nombre de Servicio",
                    content: "Introduzca el nombre de servicio proporcionado por su ISP. En caso de no proporcionarse ningún nombre de servicio, déjelo en blanco."
                }, {
                    type: "name",
                    title: "Nombre de Servidor",
                    content: "Introduzca el nombre de servidor proporcionado por su ISP. En caso de no proporcionarse ningún nombre de servidor, déjelo en blanco."
                }, {
                    type: "name",
                    title: "Tamaño de MTU (en bytes)",
                    content: "El tamaño de MTU (Maximum Transmission Unit) típico para la red Ethernet es 1480 bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Nota</b>: en algunos casos, su ISP puede pedirle que ajuste el tamaño de MTU para un mejor rendimiento de la red. No cambie este valor salvo que sea absolutamente necesario."
                    }]
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "IGMP (Internet Group Management Protocol) se utiliza para gestionar la multidifusión en redes TCP/IP. Algunos ISP utilizan IGMP para realizar la configuración remota en un router. Esta opción está habilitada de forma predeterminada."
                }, {
                    type: "name",
                    title: "Utilizar la IP especificada por ISP",
                    content: "Seleccione esta opción e introduzca la dirección IP proporcionada por su ISP."
                }, {
                    type: "name",
                    title: "Intervalo de solicitudes de eco",
                    content: "Introduzca el valor de intervalo de tiempo (0-120), en segundos, para el que el router solicita a Access Concentrator hacer echo en cada intervalo. El valor predeterminado es 30 (0 significa sin detección)."
                }, {
                    type: "name",
                    title: "Utilizar la siguiente dirección DNS",
                    content: "Seleccione esta casilla de verificación e introduzca la dirección o direcciones del servidor DNS en notación decimal con punto proporcionadas por su ISP. Esta interfaz WAN utilizará el servidor DNS especificado como prioridad."
                }]
            }, {
                type: "title2",
                content: "Tipo de Conexión: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Seleccione este tipo si se conecta a un servidor VPN L2TP/PPTP y su proveedor de internet proporciona los parámetros Nombre de usuario, Contraseña y Dirección IP/Nombre de dominio del servidor."
            }, {
                type: "name",
                title: "Nombre de Usuario/Contraseña",
                content: "Introduzca el nombre de usuario y contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
            }, {
                type: "name",
                title: "Dirección IP/DNS Primario",
                content: "Estos parámetros son asignados automáticamente por el servidor DCHP de su ISP."
            }, {
                type: "name",
                title: "Conexión Secundaria (IP Dinámica o IP Estática)",
                children: [{
                    type: "name",
                    title: "IP Dinámica",
                    content: "Seleccione esta opción si la dirección IP y máscara de subred son asignadas automáticamente por su ISP."
                }, {
                    type: "name",
                    title: "IP Estática",
                    content: "Seleccione esta opción si la dirección IP, máscara de subred, puerta de enlace y direcciones DNS son proporcionadas automáticamente por su ISP, e introduzca esta información en los campos correspondientes."
                }]
            }, {
                type: "name",
                title: "IP/Nombre de dominio de servidor VPN",
                content: "Introduzca la dirección IP o nombre de dominio del servidor VPN proporcionados por su ISP. "
            }, {
                type: "name",
                title: "Tamaño de MTU",
                content: "El tamaño de la unidad de transmisión máxima (MTU) típica y predetermina para la mayoría de las redes Ethernet es 1460 bytes (1420 para PPTP). No cambie el tamaño de MTU predeterminado a menos que su ISP lo requiera."
            }, {
                type: "name",
                title: "Modo de Conexión",
                content: "Seleccione un modo de conexión adecuado que determine cómo conectarse a Internet.",
                children: [{
                    type: "name",
                    title: "Siempre activada",
                    content: "En este modo, la conexión a Internet se reconecta automáticamente en caso de desconectarse."
                }, {
                    type: "name",
                    title: "Conectar a petición",
                    content: "En este modo, la conexión a Internet finalizará automáticamente después de que haya transcurrido el tiempo de inactividad especificado (Tiempo máx. de inactividad). La conexión se restablecerá cuando intente acceder a Internet de nuevo."
                }, {
                    type: "name",
                    title: "Conectar manualmente",
                    content: "En este modo, la conexión a Internet se controla manualmente al hacer clic en el botón Conectar o Desconectar. Este modo también admite la función Tiempo máx. de inactividad. Introduzca el Tiempo máx. de inactividad (en minutos) para especificar el tiempo máximo que la conexión a Internet puede estar inactiva antes de interrumpirse. El valor predeterminado es 15 minutos. Si desea que la conexión a Internet permanezca siempre activa, introduzca 0 (cero)."
                }]
            }, {
                type: "title",
                content: "Clonar MAC"
            }, {
                type: "name",
                title: "Utilizar Dirección MAC Predeterminada",
                content: "Seleccione esta opción para utilizar la dirección MAC predeterminada en caso de que el ISP no haya asignado una dirección IP a la dirección MAC del router."
            }, {
                type: "name",
                title: "Utilizar Dirección MAC de Equipo Actual",
                content: "Seleccione esta opción para utilizar la dirección MAC del equipo conectado actualmente en caso de que el ISP solo permita a este equipo acceder a Internet."
            }, {
                type: "name",
                title: "Utilizar Dirección MAC Personalizada",
                content: "Seleccione esta opción para introducir la dirección MAC registrada manualmente."
            }]
        },
        route: {
            TITLE: "Enrutamiento Avanzado",
            CONTENT: [{
                type: "paragraph",
                content: "Enrutamiento avanzado se utiliza para predeterminar una ruta fija para que los paquetes de información de la red alcancen un host o una red específicos."
            }, {
                type: "title",
                content: "Enrutamiento Estático"
            }, {
                type: "name",
                title: "Dirección IP/Máscara de Subred/Puerta de Enlace de Destino",
                content: "Muestra la dirección IP, máscara de subred y puerta de enlace de destino de la ruta estática."
            }, {
                type: "name",
                title: "Habilitar",
                content: "Indica el estado actual de una ruta estática. Haga clic en el icono de la <b>bombilla</b> para habilitar (o deshabilitar) la ruta estática."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para <b>modificar</b> o <b>eliminar</b> la entrada correspondiente."
            }, {
                type: "note",
                title: "Para configurar un enrutamiento estático",
                content: [
                    "Haga clic en <b>Añadir</b>.",
                    "Introduzca una dirección IP de destino para asignar la ruta estática para esta entrada.",
                    "Introduzca una máscara de subred en formato hexadecimal para determinar la porción correspondiente a la red y la porción correspondiente al host de la dirección IP.",
                    "Introduzca un formato de dirección IP de puerta de enlace para conectar el router a la red o host.",
                    "Seleccione una interfaz <b>LAN</b> o WAN para especificar el tipo de dirección IP de destino. ",
                    "Seleccione <b>Habilitar Esta Entrada</b>.",
                    "Haga clic en <b>Aceptar</b>."
                ]
            }, {
                type: "title",
                content: "Tabla de Enrutamiento del Sistema"
            }, {
                type: "paragraph",
                content: "La tabla de enrutamiento del sistema muestra todas las entradas de ruta válidas actualmente en uso."
            }, {
                type: "paragraph",
                content: "Haga clic en Actualizar para actualizar la tabla de enrutamiento."
            }]
        },
        ddns: {
            TITLE: "Configuración de DNS Dinámico",
            CONTENT: [{
                type: "paragraph",
                content: "El DNS Dinámico le permite asignar un host fijo y un nombre de dominio a una dirección IP de internet dinámica. Es muy útil cuando esta administrando su propio sitio web, servidor FTP o servidor detrás del router. Primero necesita darse de alta en un proveedor de servicio DDNS como www.dyndns.com."
            }, {
                type: "step",
                title: "Establecer un DNS Dinámico",
                content: [
                    "Seleccione el proveedor de servicios de DNS Dinámico",
                    "Enter the Username and Password of the Dynamic DNS account.",
                    "Introduzca el Nombre de Dominio  que le haya proporcionado su proveedor de servicio DDNS.",
                    "Click Log in and click Save."
                ]
            }, {
                type: "paragraph",
                title: "Note:",
                content: "Si quiere utilizar una nueva cuenta DDNS, por favor primero cierre sesión y después acceda \r\ncon la nueva cuenta."
            }]
        },
        dhcp: {
            TITLE: "Servidor DHCP",
            CONTENT: [{
                type: "paragraph",
                content: "El servidor DHCP (Dynamic Host Configuration Protocol) asigna dinámicamente la configuración TCP/IP a los dispositivos cliente desde un grupo de direcciones IP. NO deshabilite el servidor DHCP predeterminado a menos que disponga de otro servidor DHCP o que desee asignar manualmente la configuración TCP/IP a clientes individuales de la red."
            }, {
                type: "name",
                title: "Grupo de Direcciones IP",
                content: "Introduzca el intervalo de direcciones IP que pueden concederse a los clientes."
            }, {
                type: "name",
                title: "Tiempo de Concesión de Dirección",
                content: "Introduzca el tiempo que se concederá la dirección IP al cliente (1-2880 minutos)."
            }, {
                type: "name",
                title: "Puerta de Enlace Predeterminada",
                content: "Introduzca la IP de la LAN (Opcional)."
            }, {
                type: "name",
                title: "DNS Primario/DNS Secundario",
                content: "Introduzca las direcciones del servidor DNS de la forma proporcionada por su ISP (Opcional)."
            }, {
                type: "title",
                content: "Lista de Clientes"
            }, {
                type: "name",
                title: "Total de Clientes",
                content: "Muestra el número total de clientes DHCP asociados."
            }, {
                type: "name",
                title: "Nombre de Cliente",
                content: "Muestra el nombre del cliente DHCP."
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "Muestra la dirección MAC."
            }, {
                type: "name",
                title: "Dirección IP Asignada",
                content: "Muestra la dirección IP asignada al cliente para el servidor DHCP."
            }, {
                type: "name",
                title: "Tiempo Concedido",
                content: "Muestra el tiempo que se ha concedido la dirección IP al cliente."
            }, {
                type: "name",
                title: "Actualizar",
                content: "Haga clic para actualizar la Lista de clientes DHCP."
            }, {
                type: "title",
                content: "Reserva de Dirección"
            }, {
                type: "paragraph",
                content: "Puede reservar manualmente una dirección IP para un cliente conectado al router. Una vez reservada, el servidor DHCP solo asignará la dirección al mismo cliente."
            }, {
                type: "name",
                title: "Dirección MAC",
                content: "Muestra la dirección MAC del cliente con una dirección IP reservada."
            }, {
                type: "name",
                title: "Dirección IP Reservada",
                content: "Muestra la dirección IP reservada del cliente."
            }, {
                type: "name",
                title: "Descripción",
                content: "Muestra la descripción del dispositivo."
            }, {
                type: "name",
                title: "Habilitar",
                content: "Haga clic aquí para habilitar o deshabilitar la entrada correspondiente."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para <b>modificar</b> o <b>eliminar</b> el cliente correspondiente."
            }, {
                type: "note",
                title: "Para reservar una dirección IP para un cliente DHCP",
                content: [
                    "Haga clic en <b>Añadir</b>.",
                    "Introduzca la <b>dirección MAC</b> del cliente.",
                    "Introduzca la dirección IP que desee reservar para el cliente.",
                    "Introduzca la descripción del dispositivo.",
                    "Seleccione <b>Habilitar Esta Entrada</b>.",
                    "Haga clic en <b>Aceptar</b>."
                ]
            }, {
                type: "note",
                title: "Para modificar o eliminar un cliente existente",
                content: [
                    "Haga clic en el icono <b>Editar</b> o <b>Papelera</b> en la entrada correspondiente."
                ]
            }, {
                type: "title",
                content: "Condiciones de Grupo"
            }, {
                type: "name",
                title: "ID del Proveedor/Dirección IP Inicial/Dirección IP Final/Servicio",
                content: "Muestra el ID del proveedor, la dirección IP inicial, la dirección IP final y la servicio del condiciones de grupo."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica el estado actual del condiciones de grupo. Haga clic en el icono de la bombilla para habilitar (o deshabilitar) el condiciones de grupo."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para <b>Modificar</b> o <b>Eliminar</b> el cliente correspondiente."
            }, {
                type: "note",
                title: "Para añadir un condiciones de grupo",
                content: [
                    "Haga clic en <b>Añadir</b>.",
                    "Introduzca el nombre del dispositivo de la LAN.",
                    "Introduzca un valor para identificar el proveedor y la funcionalidad del cliente DHCP.",
                    "Introduzca la dirección IP inicial que el servidor DHCP asigna a los clientes.",
                    "Introduzca la dirección IP final que el servidor DHCP asigna a los clientes.",
                    "Introduzca la puerta de enlace predeterminada del servidor DHCP.",
                    "Seleccione un tipo de dispositivo en la lista desplegable.",
                    "Seleccione una opción en la lista desplegable.",
                    "Introduzca el valor de la opción.",
                    "Seleccione <b>Habilitar Esta Entrada</b>.",
                    "Haga clic en <b>Aceptar</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "Configuración de IPTV",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Seleccione esta opción para habilitar la función IPTV."
            }, {
                type: "name",
                title: "Modo",
                content: "Seleccione el modo apropiado conforme a su ISP. Hay seis modos IPTV:",
                children: [{
                    type: "name",
                    title: "Bridge",
                    content: "Seleccione esta opción si su ISP no aparece en la lista y no hay otros parámetros predeterminados.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Asigne su puerto LAN para que funcione como proveedor de Internet o como proveedor IPTV."
                    }]
                }, {
                    /*type: "name",
                    title: "Rusia",
                    content: "Seleccione esta opción si su ISP es de Rusia y los parámetros necesarios están predeterminados, incluidos Internet/Teléfono IP/IPTV de VLAN de ID/Prioridad y puerto de LAN 1/2/3/4.",
                    children: [{
                        type: "name",
                        title: "VLAN ID/Prioridad VLAN de Multicast IPTV",
                        content: "Puede habilitar la función de multidifusión IPTV si lo desea y configurar el ID y Prioridad de VLAN conforme a su ISP."
                    }]
                }, {*/
                    type: "name",
                    title: "Singapur-ExStream",
                    content: "Seleccione esta opción si su ISP es ExStream de Singapur y los parámetros necesarios están predeterminados, incluidos Internet/IPTV de VLAN de ID/Prioridad IPTV y puerto de LAN 1/2/3/4."
                }, {
                    type: "name",
                    title: "Malasia-Unifi",
                    content: "Seleccione esta opción si su ISP es Unifi de Malasia y los parámetros necesarios están predeterminados, incluidos Internet/IPTV de VLAN de ID/Prioridad y puerto de LAN 1/2/3/4."
                }, {
                    type: "name",
                    title: "Malasia-Maxis",
                    content: "Seleccione esta opción si su ISP es Maxis de Malasia y los parámetros necesarios están predeterminados, incluidos Internet/Teléfono IP/IPTV de VLAN de ID/Prioridad y puerto de LAN 1/2/3/4."
                }, {
                    type: "name",
                    title: "Personalizado",
                    content: "Seleccione esta opción si su ISP no aparece en la lista, pero proporciona los parámetros necesarios, incluidos Internet/Teléfono IP/IPTV de VLAN de ID/Prioridad y puerto de LAN 1/2/3/4.",
                    children: [{
                        type: "name",
                        title: "VLAN ID/ Prioridad VLAN de Internet/Teléfono IP/IPTV",
                        content: "Configure los ID de VLAN, según los proporcione su ISP."
                    }, {
                        type: "name",
                        title: "Etiqueta 802.11Q",
                        content: "Seleccione si desea etiquetar los paquetes de Internet con 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Asigne su puerto LAN para que funcione como proveedor de Internet o como proveedor IPTV."
                    }, {
                        type: "name",
                        title: "VLAN ID /Prioridad de VLAN de Multicast IPTV",
                        content: "Puede habilitar la función de multidifusión IPTV si lo desea y configurar el ID y Prioridad de VLAN conforme a su ISP."
                    }]
                }]
            }, {
                type: "name",
                title: "Proxy IGMP",
                content: "Seleccione la versión del proxy IGMP (Internet Group Management Protocol), V2 o V3, conforme a su ISP."
            }]
        },
        usbManage: {
            TITLE: "Dispositivos de Almacenamiento USB",
            CONTENT: [{
                type: "paragraph",
                content: "La pantalla <b>Dispositivos de Almacenamiento USB</b> muestra la información básica del dispositivos de almacenamiento USB conectado al puerto USB."
            }, {
                type: "name",
                title: "Buscar",
                content: "Por lo general, el router detecta automáticamente cualquier dispositivo conectado. De lo contrario, haga clic en este botón para buscar y actualizar la pantalla con la información actualizada."
            }, {
                type: "name",
                title: "Nombre de volumen",
                content: "Muestra el nombre del volumen USB."
            }, {
                type: "name",
                title: "Capacidad",
                content: "Muestra la capacidad de almacenamiento total del dispositivo USB."
            }, {
                type: "name",
                title: "Espacio libre",
                content: "Muestra el espacio de almacenamiento libre disponible actualmente."
            }, {
                type: "name",
                title: "Activo",
                content: "Esta casilla de verificación solo aparece cuando hay un dispositivos de almacenamiento USB conectado al router. Actívela para habilitar el uso compartido del dispositivo USB."
            }, {
                type: "name",
                title: "Quitar de forma segura",
                content: "Haga clic en este botón para desmontar de forma segura el dispositivos de almacenamiento USB antes de desconectarlo físicamente del router. Tenga en cuenta que el botón Quitar de forma segura solo aparece cuando hay un dispositivos de almacenamiento USB conectado al router. Asimismo, no es posible desmontar un dispositivo USB cuando está en uso."
            }, {
                type: "title",
                content: "Configuración de Uso Compartido"
            }, {
                type: "name",
                title: "Nombre de servidor de red/medios",
                content: "Muestra el nombre utilizado para acceder al dispositivos de almacenamiento USB conectado."
            }, {
                type: "title",
                content: "Compartición de Carpetas"
            }, {
                type: "name",
                title: "Compartir Todo",
                content: "Establezca esta opción en Sí para compartir todos los archivos y carpetas o No para compartir solamente las carpetas seleccionadas."
            }, {
                type: "name",
                title: "Habilitar Autenticación",
                content: "Establezca esta opción en Sí para habilitar la autenticación, que requiere que los usuarios introduzcan un nombre de usuario y contraseña válidos para acceder a todas las carpetas compartidas."
            }, {
                type: "name",
                title: "Nombre de Carpeta",
                content: "Muestra el nombre de la carpeta compartida."
            }, {
                type: "name",
                title: "Nombre de Ruta",
                content: "Muestra la ruta de la carpeta compartida."
            }, {
                type: "name",
                title: "Nombre de Volumen",
                content: "Muestra el nombre del volumen compartido."
            }]
        },
        printSrv: {
            TITLE: "Servidor de Impresión",
            CONTENT: [{
                type: "name",
                title: "Habilitar servidor de impresión",
                content: "Establezca esta opción en Sí para habilitar la función de servidor de impresión."
            }, {
                type: "name",
                title: "Nombre de la Impresora",
                content: "Muestra el nombre de la impresora conectada al router."
            }]
        },
        diskSettings: {
            TITLE: "Dispositivos de Almacenamiento USB",
            CONTENT: [{
                type: "paragraph",
                content: "La pantalla <b>Dispositivos de Almacenamiento USB</b> muestra la información básica del dispositivos de almacenamiento USB conectado al puerto USB."
            }, {
                type: "name",
                title: "Buscar",
                content: "Por lo general, el router detecta automáticamente cualquier dispositivo conectado. De lo contrario, haga clic en este botón para buscar y actualizar la pantalla con la información actualizada."
            }, {
                type: "name",
                title: "Nombre de volumen",
                content: "Muestra el nombre del volumen USB."
            }, {
                type: "name",
                title: "Capacidad",
                content: "Muestra la capacidad de almacenamiento total del dispositivo USB."
            }, {
                type: "name",
                title: "Espacio libre",
                content: "Muestra el espacio de almacenamiento libre disponible actualmente."
            }, {
                type: "name",
                title: "Activo",
                content: "Esta casilla de verificación solo aparece cuando hay un dispositivos de almacenamiento USB conectado al router. Actívela para habilitar el uso compartido del dispositivo USB."
            }, {
                type: "name",
                title: "Quitar de forma segura",
                content: "Haga clic en este botón para desmontar de forma segura el dispositivos de almacenamiento USB antes de desconectarlo físicamente del router. Tenga en cuenta que el botón Quitar de forma segura solo aparece cuando hay un dispositivos de almacenamiento USB conectado al router. Asimismo, no es posible desmontar un dispositivo USB cuando el volumen actual está en uso."
            }, {
                type: "note",
                title: "Para configurar un servidor de archivos",
                content: [
                    "Conecte el dispositivos de almacenamiento USB al puerto del router con un cable USB.",
                    "El router debería detectar automáticamente el nuevo dispositivo conectado y mostrar su información en la sección <b>Configuración de Dispositivos</b>. De no ser así, haga clic en <b>Buscar</b>.",
                    "Haga clic en icono <b>Activo</b> para habilitar el uso compartido de archivos."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Cuenta Compartida",
            CONTENT: [{
                type: "name",
                title: "Cuenta",
                content: "Puede seleccionar <b>Utilizar cuenta predeterminada</b> para iniciar sesión en los archivos y carpetas compartidos o <b>Utilizar nueva cuenta</b> e introducir la siguiente información para crear una nueva cuenta de usuario."
            }, {
                type: "name",
                title: "Nombre de Usuario/Contraseña",
                content: "Introduzca hasta 15 caracteres que contengan letras, números y/o caracteres de subrayado. El nombre de usuario debe empezar con un carácter alfabético. Estos campos distinguen entre mayúsculas y minúsculas."
            }, {
                type: "paragraph",
                content: "Haga clic en <b>Guardar</b> para guardar la configuración de cuenta."
            }, {
                type: "title",
                content: "Configuración de Uso Compartido"
            }, {
                type: "name",
                title: "Nombre de servidor de red/medios",
                content: "Muestra el nombre utilizado para acceder al dispositivos de almacenamiento USB conectado."
            }, {
                type: "name",
                title: "Habilitar",
                content: "Seleccione las casillas de verificación para habilitar los métodos de acceso correspondientes."
            }, {
                type: "name",
                title: "Método de Acceso",
                content: "Existen cuatro métodos para acceder al dispositivos de almacenamiento USB compartido.",
                children: [{
                    type: "name",
                    title: "Servidor de medios",
                    content: "Seleccione esta opción para permitir a los usuarios de la red ver fotos, reproducir música y ver películas en el dispositivo des almacenamiento USB compartido desde dispositivos compatibles con DLNA, como ordenadores, teléfonos móviles y consolas de juego (PS2/3)."
                }, {
                    type: "name",
                    title: "Entorno de red",
                    content: "Seleccione esta opción para permitir a los usuarios en su red acceder a contenidos compartidos a través de la dirección mostrada en la columna Dirección."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Seleccione esta opción para habilitar la función de servidor FTP que permite a los usuarios y clientes FTP en la red acceder al dispositivos de almacenamiento USB a través de la dirección FTP mostrada en la columna Dirección. Para modificar el puerto del servidor FTP, introduzca un nuevo número de puerto y haga clic en <b>Guardar</b> para aplicar los cambios."
                }, {
			display: "$.routerMode == 'Router'",
                    type: "name",
                    title: "FTP (a través de Internet)",
                    content: "Seleccione esta opción para permitir a los usuarios y clientes FTP acceder, descargar y cargar archivos de forma remota al dispositivos de almacenamiento USB compartido a través de FTP en Internet."
                }]
            }, {
                type: "name",
                title: "Acceder",
                content: "Muestra la dirección utilizada para acceder al dispositivos de almacenamiento USB compartido."
            }, {
                type: "name",
                title: "Puerto",
                content: "Muestra el número de puerto del servidor FTP."
            }, {
                type: "title",
                content: "Compartición de Carpetas"
            }, {
                type: "name",
                title: "Compartir Todo",
                content: "Establezca esta opción en Sí para compartir todos los archivos y carpetas, o en No para compartir solamente las carpetas seleccionadas."
            }, {
                type: "name",
                title: "Habilitar Autenticación",
                content: "Establezca esta opción en Sí para habilitar la autenticación, que requiere que los usuarios introduzcan un nombre de usuario y contraseña válidos para acceder a todas las carpetas compartidas."
            }, {
                type: "name",
                title: "Nombre de Carpeta",
                content: "Muestra el nombre de la carpeta compartida."
            }, {
                type: "name",
                title: "Nombre de Ruta",
                content: "Muestra la ruta de la carpeta compartida."
            }, {
                type: "name",
                title: "Uso compartido de medios",
                content: "Muestra si la función de uso compartido de medios está habilitada (Sí) o deshabilitada (No)."
            }, {
                type: "name",
                title: "Nombre de Volumen",
                content: "Muestra el nombre del volumen compartido."
            }, {
                type: "name",
                title: "Estado",
                content: "Indica el estado actual de una carpeta compartida. Haga clic en el icono de la bombilla para habilitar (o deshabilitar) el uso compartido de carpetas."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para <b>Modificar</b> o <b>Eliminar</b> la carpeta compartida correspondiente."
            }, {
                type: "note",
                title: "Para añadir una entrada de uso compartido de carpetas:",
                content: [
                    "Desactive <b>Seleccionar todo</b>.",
                    "Haga clic en <b>Añadir</b>.",
                    "Seleccione <b>Nombre de volumen</b> y <b>Ruta de carpeta</b>.",
                    "Cree un nombre de carpeta.",
                    "Decida la forma en que desea compartir la carpeta:<br /><b>Habilitar Autenticación</b> - Seleccione esta opción para pedir a los usuarios que se autentiquen con un nombre de usuario y contraseña válidos para acceder a las carpetas compartidas.<br /><b>Habilitar acceso de escritura</b> - Seleccione esta opción para permitir a los usuarios realizar cambios en el contenido de la carpeta.<br /><b>Habilitar uso compartido de medios</b> - Seleccione esta opción para habilitar el uso compartido de medios.<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "Configuración de IPSec",
            CONTENT: [{
                type: "name",
                title: "Dead Peer Detection",
                content: "La función Dead Peer Detection (DPD) es un método para detectar un par de intercambio de claves de Internet (IKE) inactivo. DPD se utiliza para reclamar los recursos perdidos en caso de que un par esté inactivo y también se utiliza para realizar una conmutación por error de par IKE. Establezca esta opción en Sí para habilitar la función Dead Peer Detection."
            }, {
                type: "name",
                title: "Nombre de Conexión IPSec/Puerta de Enlace Remota/Dirección Local/Dirección Remota",
                content: "Muestra el nombre de conexión, la puerta de enlace remota, la dirección local y la dirección remota de la entrada IPSec."
            }, {
                type: "name",
                title: "Estado",
                content: "Muestra el estado de la entrada IPSec. Estados:",
                children: [{
                    type: "name",
                    title: "Deshabilitado",
                    content: "La entrada está deshabilitada."
                }, {
                    type: "name",
                    title: "Sin Conexión",
                    content: "La entrada está habilitada, pero sin conexión."
                }, {
                    type: "name",
                    title: "Con Conexión",
                    content: "La entrada está habilitada y la conexión se ha establecido correctamente."
                }]
            }, {
                type: "name",
                title: "Habilitar",
                content: "Haga clic en el icono de la <b>bombilla</b> para habilitar o deshabilitar la entrada."
            }, {
                type: "name",
                title: "Modificar",
                content: "Muestra opciones para <b>modificar</b> o <b>eliminar</b> la entrada correspondiente."
            }, {
                type: "name",
                title: "Añadir",
                content: "Haga clic para añadir una nueva conexión VPN IPSec."
            }, {
                type: "name",
                title: "Nombre de Conexión IPSec",
                content: "Introduzca un nombre para la conexión VPN IPSec."
            }, {
                type: "name",
                title: "Dirección de puerta de enlace IPSec remota (URL)",
                content: "Introduzca la dirección IP de la puerta de enlace de destino, que es el nombre de dominio o IP de WAN pública del extremo del servidor VPN."
            }, {
                type: "name",
                title: "Acceso a túnel desde dirección IP Local",
                content: "Seleccione Dirección de subred si desea que toda la LAN se una a la red VPN, o seleccione Una única dirección si solo desea que una IP se una a la red VPN."
            }, {
                type: "name",
                title: "Dirección IP para VPN",
                content: "Introduzca la dirección IP de la LAN."
            }, {
                type: "name",
                title: "Máscara de Subred",
                content: "Introduzca la máscara de subred de la LAN."
            }, {
                type: "name",
                title: "Acceso a túnel desde dirección IP remota",
                content: "Seleccione Dirección de subred si desea que toda la LAN remota se una a la red VPN, o seleccione Una única dirección si solo desea que una IP se una a la red VPN."
            }, {
                type: "name",
                title: "Dirección IP para VPN",
                content: "Introduzca la dirección IP de la LAN remota."
            }, {
                type: "name",
                title: "Máscara de Subred",
                content: "Introduzca la máscara de subred de la LAN remota."
            }, {
                type: "name",
                title: "Método de Intercambio de Claves",
                content: "Seleccione Auto (IKE) o Manual para la autenticación de los pares IPSec."
            }, {
                type: "name",
                title: "Método de Autenticación",
                content: "Seleccione Clave Precompartida (recomendado)."
            }, {
                type: "name",
                title: "Clave Precompartida",
                content: "Cree una clave precompartida para la autenticación."
            }, {
                type: "name",
                title: "Perfect Forward Secrecy",
                content: "Seleccione Habilitar (o Deshabilitar) el Perfect Forward Secrecy (PFS) como protocolo de seguridad adicional para la clave previamente compartida."
            }, {
                type: "name",
                title: "Avanzado",
                content: "Haga clic aquí para configurar parámetros avanzados. Se recomienda conservar la configuración predeterminada. Si desea cambiar esta configuración, asegúrese de que ambos extremos del servidor VPN utilicen el mismo algoritmo de cifrado, algoritmo de integridad, grupo Diffie-Hellman y validez de clave tanto en la Fase 1 como en la Fase 2.",
                children: [{
                    type: "title2",
                    content: "Fase 1"
                }, {
                    type: "name",
                    title: "Modo",
                    content: "Seleccione <b>Principal</b> para configurar los parámetros de negociación estándar para la fase IKE 1. Seleccione <b>Intenso</b> para que la fase IKE 1 del túnel VPN lleve a cabo la negociación en un menor espacio de tiempo. (No se recomienda porque es menos seguro.)"
                }, {
                    type: "name",
                    title: "Tipo de Identificador Local",
                    content: "Seleccione el tipo de identificador local para la negociación IKE. La IP de WAN local utiliza una dirección IP como identificador en la negociación IKE. FQDN (Fully Qualified Domain Name) utiliza un nombre de usuario como identificador."
                }, {
                    type: "name",
                    title: "Identificador Local",
                    content: "El identificador local se rellenará automáticamente si se selecciona <b>IP de WAN local</b>. Si se selecciona <b>FQDN</b>, introduzca el nombre de usuario del dispositivo local que se utilizará como identificador para la negociación IKE."
                }, {
                    type: "name",
                    title: "Tipo de Identificador Remoto",
                    content: "Seleccione el tipo de identificador remoto para la negociación IKE. La IP de WAN remota utiliza una dirección IP como identificador en la negociación IKE. FQDN utiliza un nombre de usuario como identificador."
                }, {
                    type: "name",
                    title: "Identificador Remoto",
                    content: "La dirección IP de la puerta de enlace remota se rellenará automáticamente si se selecciona <b>IP de WAN remota</b>. Si se selecciona <b>FQDN</b>, introduzca el nombre de usuario del par remoto que se utilizará como identificador para la negociación IKE."
                }, {
                    type: "name",
                    title: "Algoritmo de Cifrado",
                    content: "Seleccione uno de los siguientes algoritmos de cifrado para la negociación IKE.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) cifra un bloque de texto sin formato de 64 bits con una clave de 56 bits."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES cifra un texto sin formato con una clave de 168 bits."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Utiliza el algoritmo AES y una clave de 128 bits para el cifrado."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Utiliza el algoritmo AES y una clave de 192 bits para el cifrado."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Utiliza el algoritmo AES y una clave de 256 bits para el cifrado."
                    }]
                }, {
                    type: "name",
                    title: "Algoritmo de Integridad",
                    content: "Seleccione uno de los siguientes algoritmos de integridad para la negociación IKE.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) toma un mensaje de longitud aleatoria y genera una síntesis del mensaje de 128 bits."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) toma un mensaje inferior a 2^64 en bits y genera una síntesis del mensaje de 160 bits."
                    }]
                }, {
                    type: "name",
                    title: "Grupo Diffie-Hellman para Intercambio de Claves",
                    content: "Seleccione el grupo Diffie-Hellman que se utilizará en la Fase 1 de la negociación de claves. Este grupo establece la seguridad del algoritmo en bits."
                }, {
                    type: "name",
                    title: "Validez de Clave",
                    content: "Introduzca el periodo de tiempo (en segundos) que debe transcurrir antes de que se establezca una nueva asociación de seguridad (SA) IPSec con el extremo remoto. El valor predeterminado es 3600."
                }, {
                    type: "title2",
                    content: "Fase 2"
                }, {
                    type: "name",
                    title: "Algoritmo de Cifrado",
                    content: "Seleccione uno de los siguientes algoritmos de cifrado para la negociación IKE.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) cifra un bloque de texto sin formato de 64 bits con una clave de 56 bits."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple DES cifra un texto sin formato con una clave de 168 bits."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Utiliza el algoritmo AES y una clave de 128 bits para el cifrado."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Utiliza el algoritmo AES y una clave de 192 bits para el cifrado."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Utiliza el algoritmo AES y una clave de 256 bits para el cifrado."
                    }]
                }, {
                    type: "name",
                    title: "Algoritmo de Integridad",
                    content: "Seleccione uno de los siguientes algoritmos de integridad para la negociación IKE.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) toma un mensaje de longitud aleatoria y genera una síntesis del mensaje de 128 bits."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) toma un mensaje inferior a 2^64 en bits y genera una síntesis del mensaje de 160 bits."
                    }]
                }, {
                    type: "name",
                    title: "Grupo Diffie-Hellman para Intercambio de Claves",
                    content: "Seleccione el grupo Diffie-Hellman que se utilizará en la Fase 2 de la negociación de claves. Este grupo establece la seguridad del algoritmo en bits."
                }, {
                    type: "name",
                    title: "Validez de Clave",
                    content: "Introduzca el periodo de tiempo (en segundos) que debe transcurrir antes de que se establezca una nueva asociación de seguridad (SA) IPSec con el extremo remoto. El valor predeterminado es 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Configuración de Conexión a Internet",
            CONTENT: [{
                type: "name",
                title: "Detección Automática",
                content: "Haga clic en este botón para que el router detecte automáticamente el tipo de conexión a Internet actual."
            }, {
                type: "paragraph",
                title: "Nota",
                content: "Si no está seguro de qué tipo de conexión a Internet tiene, utilice la función Detección Automática o póngase en contacto con su ISP para obtener ayuda."
            }, {
                type: "title",
                title: "Tipo de Conexión a Internet: IP Estática"
            }, {
                type: "name",
                title: "Dirección IP/Máscara de Subred/Puerta de Enlace Predeterminada/DNS Primario/DNS Secundario",
                content: "Introduzca la información proporcionada por su ISP."
            }, {
                type: "title",
                title: "Tipo de Conexión a Internet: IP Dinámica"
            }, {
                type: "name",
                title: "NO clonar dirección MAC/Clonar dirección MAC de equipo actual",
                content: "Seleccione si desea clonar su dirección MAC o no, de acuerdo con su ISP."
            }, {
                type: "title",
                title: "Tipo de Conexión a Internet: PPPoE"
            }, {
                type: "name",
                title: "Nombre de Usuario/Contraseña",
                content: "Introduzca el nombre de usuario y contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
            }, {
                type: "title",
                title: "Tipo de Conexión a Internet: L2TP/PPTP"
            }, {
                type: "name",
                title: "Nombre de Usuario/Contraseña",
                content: "Introduzca el nombre de usuario y contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
            }, {
                type: "name",
                title: "Conexión Secundaria (IP Dinámica o IP Estática)",
                children: [{
                    type: "name",
                    title: "IP Dinámica",
                    content: "Seleccione esta opción si la dirección IP y máscara de subred son asignadas automáticamente por su ISP."
                }, {
                    type: "name",
                    title: "IP Estática",
                    content: "Seleccione esta opción si su ISP proporciona la dirección IP, máscara de subred, puerta de enlace y direcciones DNS, e introduzca esta información en los campos correspondientes."
                }]
            }, {
                type: "name",
                title: "IP/Nombre de dominio de servidor VPN",
                content: "Introduzca la dirección IP o Nombre de dominio del servidor VPN proporcionados por su ISP."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Servidor de Impresión",
            CONTENT: [{
                type: "paragraph",
                content: "Puede configurar el servidor de impresión en esta página."
            }, {
                type: "name",
                title: "Servidor de Impresión",
                content: "Indica el estado Habilitar/Deshabilitar actual del servidor de impresión."
            }, {
                type: "name",
                title: "Nombre de la Impresora",
                content: "Nombre de la impresora conectada al router."
            }, {
                type: "note",
                title: "Siga las instrucciones a continuación para configurar su servidor de impresión:",
                content: [
                    "Paso1: conecte la impresora USB al puerto USB del router con un cable de impresora USB.",
                    "Paso2: instale el contralor de impresora en su equipo.",
                    "Paso3: instale el controlador de impresora  TP-LINK USB Printer Controller en su equipo. Ejecute el CD de recursos o descargue la utilidad TP-LINK USB Printer Controller en nuestro sitio web: www.tp-link.es. "
                ]
            }]
        },
        sysconf: {
            TITLE: "Configuración avanzada de Wi-Fi 2.4GHz | 5GHz",
            CONTENT: [{
                type: "name",
                title: "Intervalo de Señalización",
                content: "Introduzca un valor entre 25 y 1000 en milisegundos para determinar el intervalo en que el router transmitirá los paquetes de señalización con el fin de sincronizar la red inalámbrica. El valor predeterminado es 100 milisegundos."
            }, {
                type: "name",
                title: "Umbral de RTS",
                content: "Introduzca un valor entre 1 y 2346 en bytes para determinar el tamaño del paquete de transmisión de datos a través del router. De forma predeterminada, el tamaño de Umbral de RTS (Request to Send) es 2346. Si el tamaño del paquete es mayor que el umbral predefinido, el router envía tramas RTS a una estación de recepción específica y negocia el envío de una trama de datos; si no, el paquete se enviará automáticamente."
            }, {
                type: "name",
                title: "Intervalo de DTIM",
                content: "Introduzca un valor entre 1 y 255 para determinar el intervalo de DTIM (Delivery Traffic Indication Message). 1 indica que el intervalo de DTIM es igual que el intervalo de señalización."
            }, {
                type: "name",
                title: "Periodo de Actualización de Clave de Grupo",
                content: "Introduzca el número de segundos (mínimo 30) para controlar el intervalo de tiempo para la renovación automática de la clave de cifrado. El valor predeterminado es 0 (sin renovación de clave)."
            }, {
                type: "name",
                title: "Función WMM",
                content: "La función WMM (Wi-Fi Multimedia) garantiza que los paquetes con mensajes de alta prioridad se transmitan de forma preferente. Esta función está recomendada y está habilitada de forma predeterminada."
            }, {
                type: "name",
                title: "Función Short GI",
                content: "Esta función aumenta la capacidad de los datos reduciendo el tiempo del intervalo de guardia (GI). Está función está recomendada y está habilitada de forma predeterminada."
            }, {
                type: "name",
                title: "Función Aislamiento de AP",
                content: "Seleccione esta casilla de verificación para habilitar la función Aislamiento de AP, que permite confinar y restringir la interacción de todos los dispositivos inalámbricos de la red entre ellos, pese a seguir teniendo acceso a Internet. El aislamiento de AP está deshabilitado de forma predeterminada."
            }, {
				display: INCLUDE_AIRTIME_FAIRNESS,
				"type": "name",
                "title": "Funcionalidad Airtime Fairness",
                "content": "Seleccione esta casilla para habilitar la función Airtime Fairness (ATF) que le permite optimizar el rendimiento de cada flujo. El programador de tráfico ATF utiliza los objetivos por destino del tiempo del aire para balancear su uso a lo largo de los flujos de destino."
			},  {
				display: INCLUDE_MU_MIMO,
				"type": "name",
                "title": "Función Multi-User MIMO",
                "content": "Haga click en habilitar para utilizar la función Multi-User MIMO."
			},  {
				"type": "name",
				"title": "Reducción de Interferencia USB 3.0",
				"content": "Haga click en habilitar para reducir la interferencia USB 3.0."
			}, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Habilitar WPS",
                content: "Establezca esta opción en Sí para habilitar la función WPS."
            }, {
                type: "paragraph",
                content: "Haga clic en Guardar para guardar su configuración."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Modo Nocturno",
                content: "Cuando esta función está habilitada, los LED del router se apagarán automáticamente durante el periodo de tiempo especificado."
            }, {
                type: "name",
                title: "Periodo de Tiempo",
                content: "Introduzca el periodo de tiempo durante el cual se apagarán los LED del router."
            }, {
                type: "paragraph",
                content: "Haga clic en Guardar para guardar su configuración."
            }, {
				display: "$.routerMode == 'Router'",
                type: "title",
                title: "Configuración de Protección DoS"
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "El nivel de protección DoS protege el router de ataques TCP-SYN-Flood, UDP-Flood e ICMP-Flood."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Nivel de Paquetes ICMP-FLOOD",
                content: "Introduzca un valor entre 5 y 3600 para activar la protección ICMP-FLOOD inmediatamente cuando el número de paquetes ICMP exceda el valor de umbral preestablecido."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Nivel de Paquetes UDP-FLOOD",
                content: "Introduzca un valor entre 5 y 3600 para activar la protección UDP-FLODD inmediatamente cuando el número de paquetes UDP exceda el valor de umbral preestablecido."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Nivel de Paquetes TCP-FLOOD",
                content: "Introduzca un valor entre 5 y 3600 para activar la protección TCP-SYN-FLODD inmediatamente cuando el número de paquetes TCP-SYN exceda el valor de umbral preestablecido."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Haga clic en Guardar para guardar su configuración."
            }]
        },
        logConf: {
            TITLE: "Configuración de Registro",
            CONTENT: [{
                type: "name",
                title: "Guardar Localmente",
                content: "Seleccione esta opción para guardar registros en su memoria local.",
                children: [{
                    type: "name",
                    title: "Nivel Mínimo",
                    content: "Seleccione el nivel mínimo en la lista desplegable para guardar todos los eventos con un nivel igual o superior al seleccionado."
                }]
            }, {
                type: "name",
                title: "Guardar Remotamente",
                content: "Seleccione esta opción para enviar registros a la dirección IP y puerto UDP del servidor de registros del sistema remoto.",
                children: [{
                    type: "name",
                    title: "Nivel Mínimo",
                    content: "Seleccione el nivel mínimo en la lista desplegable para guardar todos los eventos con un nivel igual o superior al seleccionado."
                }, {
                    type: "name",
                    title: "IP de Servidor",
                    content: "Especifique la dirección IP del servidor de registros del sistema remoto al que se enviarán los eventos."
                }, {
                    type: "name",
                    title: "Puerto de Servidor",
                    content: "Especifique el número de puerto del servidor de registros del sistema remoto al que se enviarán los eventos."
                }, {
                    type: "name",
                    title: "Nombre de Instalación Local",
                    content: "Seleccione el nombre de instalación local conforme al nombre de instalación del servidor remoto."
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Wi-Fi",
            CONTENT: [{
                type: "name",
                title: "Seguridad",
                content: "Puede seleccionar una de las opciones de seguridad siguientes.",
                children: [{
                    type: "name",
                    title: "Sin seguridad",
                    content: "Las estaciones inalámbricas se conectarán al router sin cifrado. Se recomienda encarecidamente seleccionar uno de los siguientes modos para habilitar la seguridad."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Personal",
                    content: "Seleccione WPA según la frase de contraseña previamente compartida.",
                    children: [{
                        type: "name",
                        title: "Versión",
                        content: "Puede seleccionar una de las versiones siguientes",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Seleccione WPA-PSK o WPA2-PSK automáticamente según la capacidad y solicitud de la estación inalámbrica."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Clave precompartida de WPA2."
                        }]
                    }, {
                        type: "name",
                        title: "Cifrado",
                        content: "Puede seleccionar Auto, TKIP o AES."
                    }, {
                        type: "name",
                        title: "Contraseña Wi-Fi",
                        content: "Puede introducir caracteres ASCII (entre 8 y 64) o hexadecimales (entre 8 y 63)."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Empresa",
                    content: "Seleccione WPA según el servidor Radius.",
                    children: [{
                        type: "name",
                        title: "Versión",
                        content: "Puede seleccionar una de las versiones siguientes",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Seleccione WPA o WPA2 automáticamente según la capacidad y solicitud de la estación inalámbrica."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Acceso protegido Wi-Fi."
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA versión 2."
                        }]
                    }, {
                        type: "name",
                        title: "Cifrado",
                        content: "Puede seleccionar Auto, TKIP o AES."
                    }, {
                        type: "name",
                        title: "IP de servidor Radius",
                        content: "Introduzca la dirección IP del servidor Radius."
                    }, {
                        type: "name",
                        title: "Puerto de Radius",
                        content: "Introduzca el puerto utilizado por el servicio Radius."
                    }, {
                        type: "name",
                        title: "Contraseña de Radius",
                        content: "Introduzca la contraseña del servidor Radius."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Seleccione la seguridad WEP 802.11.",
                    children: [{
                        type: "name",
                        title: "Tipo",
                        content: "Puede selecciona uno de los siguiente tipos",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Seleccione el tipo de autenticación Clave compartida o Sistema abierto automáticamente según la capacidad y solicitud de la estación inalámbrica."
                        }, {
                            type: "name",
                            title: "Clave compartida",
                            content: "Seleccione la autenticación Clave compartida 802.11."
                        }, {
                            type: "name",
                            title: "Sistema abierto",
                            content: "Seleccione la autenticación Sistema abierto 802.11."
                        }]
                    }, {
                        type: "name",
                        title: "Clave seleccionada",
                        content: "Seleccione cuál de las cuatro claves desea utilizar."
                    }, {
                        type: "name",
                        title: "Formato de clave WEP",
                        content: "Puede seleccionar el formato ASCII o Hexadecimal. El formato ASCII está compuesto por cualquier combinación de caracteres del teclado con la longitud especificada y el formato Hexadecimal está formado por cualquier combinación de dígitos hexadecimales (0-9, a-f, A-F) con la longitud especificada."
                    }, {
                        type: "name",
                        title: "Tipo de clave",
                        content: "Puede seleccionar la longitud de la clave WEP (64 bits, 128 bits o 152 bits) para el cifrado. \"Deshabilitado\" significa que la entrada de la clave WEP no es válida.",
                        children: [{
                            type: "name",
                            title: "Para cifrado de 64 bits",
                            content: "Puede introducir 10 dígitos hexadecimales (cualquier combinación de 0-9, a-f y A-F, y no se permite una clave nula) o 5 caracteres ASCII."
                        }, {
                            type: "name",
                            title: "Para cifrado de 128 bits",
                            content: "Puede introducir 26 dígitos hexadecimales (cualquier combinación de 0-9, a-f y A-F, y no se permite una clave nula) o 13 caracteres ASCII."
                        }, {
                            type: "name",
                            title: "Para cifrado de 152 bits",
                            content: "Puede introducir 32 dígitos hexadecimales (cualquier combinación de 0-9, a-f y A-F, y no se permite una clave nula) o 16 caracteres ASCII."
                        }]
                    }, {
                        type: "name",
                        title: "Valor de clave",
                        content: "Introduzca la contraseña para WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Modo",
                content: "Este campo determina el modo inalámbrico en que trabaja el router."
            }, {
                type: "name",
                title: "Ancho de Canal",
                content: "El ancho de banda del canal inalámbrico."
            }, {
                type: "name",
                title: "Canal",
                content: "Este campo determina la frecuencia de funcionamiento que se utilizará. No es necesario cambiar el canal inalámbrico a menos que tenga problemas de interferencia con otro punto de acceso cercano. Si selecciona Auto, el AP elegirá el mejor canal automáticamente."
            }, {
                type: "name",
                title: "Potencia de Transmisión",
                content: "Aquí puede especificar la potencia de transmisión del router. Puede seleccionar Alta, Media o Baja. Alta es el valor predeterminado y el valor recomendado."
            }, {
                type: "paragraph",
                content: "Haga clic en Guardar para <strong>guardar</strong> y aplicar la configuración."
            }]
        },
        diagnostic: {
            TITLE: "Herramientas de Diagnóstico",
            CONTENT: [{
                type: "paragraph",
                content: "El router proporciona las herramientas Ping y Traceroute para ayudarle a solucionar problemas de conectividad de la red. La herramienta Ping envía paquetes a una dirección IP o nombre de dominio específicos y registra los resultados, como el número de paquetes enviados/recibidos y el tiempo de ida y vuelta. La herramienta Traceroute envía paquetes a una dirección IP o Nombre de dominio de destino y muestra el número de saltos y el tiempo que se tarda en llegar al destino."
            }, {
                type: "paragraph",
                content: "Puede hacer ping o traceroute para un dispositivo de red utilizando la dirección IP o el nombre de dominio, como google.com, yahoo.com, etc."
            }, {
                type: "note",
                title: "Para diagnosticar con Ping",
                content: [
                    "Introduzca la dirección IP o el nombre de dominio de destino.",
                    "Haga clic en el icono de flecha para abrir el menú Avanzado y especifique el número de pings y el tamaño del paquete ping. (Opcional)",
                    "Haga clic en Iniciar."
                ]
            }, {
                type: "note",
                title: "Para diagnosticar con Traceroute",
                content: [
                    "Introduzca la dirección IP o el nombre de dominio de destino.",
                    "Haga clic en el icono de flecha para abrir el menú Avanzado y especifique el número de saltos (que se deben alcanzar) en el campo TTL máx. de Traceroute. El valor predeterminado es 20. (Opcional)",
                    "Haga clic en Iniciar."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "Dirección MAC",
                content: "La única dirección física del router."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IPv4 de LAN",
                content: "Conserve la dirección IP predeterminada del router (192.168.0.1) o introduzca una nueva. Esta dirección IP puede utilizarse para registrarse en la página de gestión web del router."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Tipo de Dirección",
                "content": "La forma de configurar la dirección IP del router. Puede configurarla manualmente (IP Estática) o automáticamente (Inteligente DHCP)."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "IP de LAN",
                "content": "Conserve la dirección IP predeterminada del router (192.168.0.254) o introduzca una nueva. Esta dirección IP puede utilizarse para registrarse en la página de gestión web del router."
            }, {
                type: "name",
                title: "Máscara de Subred",
                content: "Seleccione un identificador asignado utilizado por el puerto LAN para enrutar el tráfico interno y externo en la lista desplegable o introduzca un nuevo formato de máscara de subred. El valor predeterminado es 255.255.255.0."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IGMP Snooping",
                content: "IGMP (Internet Group Management Protocol) se utiliza para gestionar la multidifusión en redes TCP/IP. Algunos ISP utilizan IGMP para realizar la configuración remota de dispositivos cliente, como el router. Esta función está habilitada de forma predeterminada."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                title: "Nota",
                content: "Si la nueva dirección IP de la LAN no está en la misma subred que la antigua, se cambiará automáticamente el grupo de direcciones IP en el servidor DHCP; no obstante, el host DMZ y servidor virtual deberán configurarse de nuevo."
            }, {
				display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "title",
                content: "Agregación de Enlace"
            }, {
            	display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "paragraph",
                content: "La Agregación de Enlace combina dos puertos juntos para hacer una única ruta de datos de alto ancho de banda, por tanto proporcionando una red cableada más rápida y más estable."
			}, {
                display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "note",
                title: "Para aplicar la agregación de enlace",
                content: [
                    "Marque para habilitar la función de agregación de enlace.",
                    "Seleccione el modo de agregación de enlace.<br><b> LACP activo:</b> habilita LACP (Protocolo de Agregación de Enlace) incondicionalmente.<br><b>LACP pasivo:</b> habilita LACP solo cuando se detecta un dispositivo LACP.",
					"Especifique dos puertos para la agregación de enlace.",
					"Haga click en Guardar."
                ]
            }]
        },
        ddos: {
            TITLE: "Firewall",
            CONTENT: [{
                type: "name",
                title: "Firewall SPI",
                content: "El firewall SPI (Stateful Packet Inspection) evita los ciberataques y valida el tráfico que pasa a través del router. La función Firewall SPI está habilitada de forma predeterminada."
            }, {
                type: "title",
                title: "Protección DoS"
            }, {
                type: "name",
                title: "Protección DoS",
                content: "La protección DoS (Denial of Service) evita que los ataques DoS desborden la red con solicitudes de servidor. La función Protección DoS está deshabilitada (No) de forma predeterminada."
            }, {
                type: "name",
                title: "Filtrado de Ataques ICMP-FLOOD",
                content: "Habilite esta opción para evitar el ataque \"flood\" de ICMP (Internet Control Message Protocol)."
            }, {
                type: "name",
                title: "Filtrado de Ataques UDP-FLOOD",
                content: "Habilite esta opción para evitar el ataque \"flood\" de UDP (User Datagram Protocol)."
            }, {
                type: "name",
                title: "Filtrado de Ataques TCP-FLOOD",
                content: "Habilite esta opción para evitar el ataque \"flood\" de TCP-SYN (Transmission Control Protocol-Synchronize).",
                children: [{
                    type: "name",
                    title: "No",
                    content: "Sin Protección."
                }, {
                    type: "name",
                    title: "Baja",
                    content: "Nivel bajo de protección e impacto bajo en el rendimiento del router."
                }, {
                    type: "name",
                    title: "Media",
                    content: "Nivel medio de protección e impacto medio en el rendimiento del router."
                }, {
                    type: "name",
                    title: "Alta",
                    content: "Nivel alto de protección e impacto alto en el rendimiento del router."
                }]
            }, {
                type: "name",
                title: "Prohibir Ping desde LAN",
                content: "Habilite esta opción para prohibir pings de puertos LAN."
            }, {
                type: "name",
                title: "Prohibir Ping desde WAN",
                content: "Habilite esta opción para prohibir pings de puertos WAN."
            }, {
                type: "title",
                title: "Lista de Hosts DoS Bloqueados"
            }, {
                type: "name",
                title: "Lista de Hosts DoS Bloqueados",
                content: "Muestra la dirección IP y la dirección MAC de cualquier fuente de ataque DoS bloqueada."
            }, {
                type: "name",
                title: "Para Eliminar una o más Entradas",
                content: "En Lista de hosts, seleccione la entrada o entradas que desee eliminar y haga clic en Eliminar encima de la tabla."
            }]
        },
        ipv6: {
            TITLE: "Internet IPv6",
            CONTENT: [{
                type: "name",
                title: "Habilitar IPv6",
                content: "Seleccione esta opción para habilitar (Sí) o deshabilitar (No) la función IPv6 del router."
            }, {
                type: "title",
                title: "Tipo de Conexión a Internet: IP Estática"
            }, {
                type: "name",
                title: "IP Estática",
                content: "Seleccione este tipo si su ISP utiliza la asignación de direcciones IPv6 estáticas."
            }, {
                type: "name",
                title: "Dirección IPv6/Puerta de Enlace Predeterminada IPv6/Servidor DNS IPv6/Servidor DNS IPv6 Secundario",
                content: "Introduzca estos parámetros proporcionada por su ISP."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "El tamaño de MTU (Maximum Transmission Unit) predeterminado y típico para la mayoría de las redes Ethernet es 1500 bytes. No cambie el tamaño de MTU predeterminado salvo que lo requiera su ISP."
            }, {
                type: "title",
                title: "Tipo de Conexión a Internet: IP Dinámica"
            }, {
                type: "name",
                title: "IP Dinámica",
                content: "Seleccione este tipo si su ISP utiliza la asignación de direcciones IPv6 dinámicas."
            }, {
                type: "name",
                title: "Dirección IPv6/Puerta de Enlace IPv6",
                content: "Estos parámetros son asignados automáticamente por el servidor DHCPv6 del ISP."
            }, {
                type: "name",
                title: "Tipo de Direccionamiento",
                content: "Seleccione el tipo de conexión de la conexión IPv6."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "El tamaño de MTU (Maximum Transmission Unit) predeterminado y típico para la mayoría de las redes Ethernet es 1500 bytes. No cambie el tamaño de MTU predeterminado salvo que lo requiera su ISP."
            }, {
                type: "name",
                title: "Utilizar la siguiente dirección de DNS IPv6",
                content: "Seleccione esta casilla de verificación e introduzca las direcciones del servidor DNS proporcionadas por su ISP en notación decimal con punto. Esta interfaz WAN utilizará el servidor DNS especificado como prioridad."
            }, {
                type: "name",
                title: "Nombre de host",
                content: "Introduzca un valor en este campo para especificar el nombre de host del router."
            }, {
                type: "title",
                title: "Tipo de Conexión a Internet: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Seleccione este tipo si su ISP utiliza PPPoEv6 y le proporciona un nombre de usuario y contraseña."
            }, {
                type: "name",
                title: "Nombre de Usuario/Contraseña/Confirmar Contraseña",
                content: "Introduzca estos parámetros proporcionada por su ISP."
            }, {
                type: "name",
                title: "Tipo de Direccionamiento",
                content: "Seleccione el tipo de conexión de la conexión IPv6."
            }, {
                type: "name",
                title: "Nombre de Servicio",
                content: "Introduzca el nombre de servicio proporcionado por su ISP. En caso de no proporcionarse, déjelo en blanco."
            }, {
                type: "name",
                title: "Nombre de Servidor",
                content: "Introduzca el nombre de servidor proporcionado por su ISP. En caso de no proporcionarse, déjelo en blanco."
            }, {
                type: "name",
                title: "MTU (bytes)",
                content: "El tamaño de MTU (Maximum Transmission Unit) típico para la red Ethernet es 1480 bytes.",
                children: [{
                    type: "paragraph",
                    content: "<b>Nota</b>: en algunos casos, su ISP puede pedirle que ajuste el tamaño de MTU para un mejor rendimiento de la red. No cambie este valor salvo que sea absolutamente necesario."
                }]
            }, {
                type: "name",
                title: "Utilizar la información IPv6 especificada por el ISP",
                content: "Seleccione esta casilla de verificación e introduzca la dirección IP y puerta de enlace proporcionadas por su ISP."
            }, {
                type: "name",
                title: "Utilizar la siguiente dirección de DNS IPv6",
                content: "Seleccione esta opción si desea introducir manualmente la dirección DNS proporcionada por su ISP. Si no se selecciona, el router obtendrá la dirección DNS dinámicamente de su ISP."
            }, {
                type: "title",
                title: "Tipo de Conexión a Internet: túnel 6a4"
            }, {
                type: "name",
                title: "Túnel 6a4",
                content: "Seleccione este tipo si su ISP utiliza la implementación 6a4 para asignar direcciones."
            }, {
                type: "title",
                title: "LAN IPv6"
            }, {
                type: "name",
                title: "Tipo de Direccionamiento",
                content: "Seleccione la opción adecuada según su ISP.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Seleccione esta opción para asignar direcciones IPv6 a los equipos en su LAN a través de RADVD.",
                    children: [{
                        type: "name",
                        title: "Habilitar RDNSS",
                        content: "Seleccione esta casilla de verificación para habilitar la función RDNSS."
                    }, {
                        type: "name",
                        title: "Habilitar Prefijo ULA",
                        content: "Seleccione esta casilla de verificación para habilitar la función Prefijo ULA.",
                        children: [{
                            type: "name",
                            title: "Prefijo ULA",
                            content: "Introduzca el Prefijo ULA."
                        }, {
                            type: "name",
                            title: "Longitud de Prefijo ULA",
                            content: "Introduzca la longitud del prefijo ULA. El valor predeterminado es 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Servidor DHCPv6",
                    content: "Para asignar direcciones IP automáticamente a los clientes en la LAN.",
                    children: [{
                        type: "name",
                        title: "Dirección IPv6 Inicial",
                        content: "Introduzca la dirección IPv6 inicial."
                    }, {
                        type: "name",
                        title: "Dirección IPv6 Final",
                        content: "Introduzca la dirección IPv6 final."
                    }, {
                        type: "name",
                        title: "Tiempo Concedido",
                        content: "Introduzca durante cuánto tiempo un cliente DHCP puede conceder su dirección IPv6 dinámica actual asignada por el router. Una vez haya vencido la dirección IPv6 dinámica, se asignará automáticamente una nueva dirección IPv6 dinámica al usuario. El valor predeterminado es 86400 segundos."
                    }]
                }]
            }, {
                type: "name",
                title: "Tipo de Prefijo de Sitio",
                content: "Seleccione un tipo para asignar un prefijo a las direcciones IPv6. Las opciones disponibles son Delegado y Estático."
            }, {
                type: "name",
                title: "Delegado",
                children: [{
                    type: "name",
                    title: "Conexión WAN de Prefijo Delegado",
                    content: "Seleccione una conexión WAN en la lista desplegable para asignar un prefijo."
                }]
            }, {
                type: "name",
                title: "Estático",
                children: [{
                    type: "name",
                    title: "Prefijo de Sitio",
                    content: "Introduzca un valor para el prefijo de sitio."
                }, {
                    type: "name",
                    title: "Longitud de Prefijo de Sitio",
                    content: "Introduzca un valor para la longitud del prefijo de sitio."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Habilitar Servidor VPN",
				content: "Seleccionar esta casilla para habilitar el servidor OpenVPN."
			},{
				type: "name",
				title: "Tipo de Servicio",
				content: "Seleccionar el protocolo de comunicación para el servidor OpenVPN: UDP o TCP."
			},{
				type: "name",
				title: "Puerto de Servicio",
				content: "Introduzca un número de puerto de comunicación entre 1024 y 65535. El puerto de servicio por defecto y común es 1194."
			},{
				type: "name",
				title: "Subred/Máscara de Red VPN",
				content: "Introduzca el rango de direcciones IP que pueden ser concedidas a los clientes por parte del servidor OpenVPN."
			},{
				type: "name",
				title: "Acceso de Clientes",
				content: "Seleccione el tipo de acceso para su cliente OpenVPN."
			},{
				type: "name",
				title: "Solo Red Doméstica",
				content: "Los clientes pueden acceder solo a router y LAN. La ruta por defecto del cliente no cambiará."
			},{
				type: "name",
				title: "Internet y Red Doméstica.",
				content: "Los clientes pueden acceder solo a router y LAN. La ruta predeterminada del cliente cambiará."
			},{
				type: "paragraph",
                content: "Haga click en Guardar para guardar todos sus ajustes."
            },{
                type: "title",
                content: "Certificado"
            },{
                type: "paragraph",
                content: "Utilizar el certificado para la información e identidad de la conexión VPN para un ordenador remoto."
            },{
                type: "name",
                title: "Generar",
                content: "Haga click en generar un nuevo certificado."
            },{
                type: "title",
                content: "Archivo de Configuración"
            },{
                type: "name",
                title: "Exportar",
                content: "Haga click en este botón para guardar el archivo de configuración OpenVPN a utilizar para añadir una nueva conexión VPN."
			},{
                type: "title",
                content: "Guía de Instalación de Cliente VPN"
			},{
				type: "step",
                title: "Para habilitar y conectar sus dispositivos clientes al servidor OpenVPN:"
			},{
				type: "paragraph",
				content: "Antes de configurar el servidor OpenVPN, por favor configure el Servicio DNS Dinámico (recomendado) o asigne una dirección IP estática del puerto WAN. Por favor asegúrese que su puerto externo de su configuración NAT no es el puerto de servicio y que su Horario de Sistema está sincronizado con Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Seleccione Habilitar Servidor VPN.",
					"Configurelos parámetros del servidor OpenVPN (Tipo de Servicio, Puerto de Servicio y Acceso de Cliente) y haga click en Guardar.",
					"Haga click en Exportar para guardar el archivo de configuración.",
					"En sus dispositivos clientes, descargue e instale la utilidad del cliente OpenVPN de <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> La plataforma oficial compatible incluye Windows, Mac OSX, Linux.",
					"Inicie la utilidad cliente OpenVPN y añada una nueva conexión VPN utilizando el archivo de configuración guardado de su dispositivo cliente al servidor VPN."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Para saber más sobre clientes OpenVPN, visite <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "name",
				title: "Habilitar Servidor VPN",
				content: "Seleccionar esta casilla para habilitar el servidor VPN PPTP."
			},{
				type: "name",
				title: "Dirección IP del Cliente",
				content: "Introduzca el rango de direcciones IP (hasta 10 clientes) que pueden ser concedidas a los clientes mediante el servidor VPN PPTP."
			},{
				type: "name",
				title: "Nombre de Usuario y Contraseña",
				content: "Introduzca el nombre de usuario y contraseña para autenticar los clientes en el servidor VPN PPTP."
			},{
				type: "paragraph",
				content: "Haga click en Guardar para guardar todos sus ajustes."
			},{
                type: "title",
                content: "Guía de Instalación de Cliente VPN"
			},{
				type: "step",
                title: "Para habilitar y conectar sus dispositivos clientes al servidor VPN PPTP:"
			},{
				type: "paragraph",
				content: "Antes configure el servidor VPN PPTP, por favor configure el Servicio DNS Dinámico (recomendado) o asigne una dirección IP estática del puerto WAN. Por favor asegúrese que su puerto externo de la configuración NAT no es 1723 y que su Horario de Sistema está sincronizado con Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Seleccione Habilitar Servidor VPN.",
					"Configure los parámetros del servidor VPN PPTP y haga click en Guardar.",
					"En sus dispostivos clientes, cree una conexión VPN PPTP. Las plataformas oficiales compatibles incluyen Windows, Mac OSX, Linux, iOS y Android.",
                    "Inicie el programa VPN PPTP, añada una nueva conexión e introduzca el nombre de dominio del servicio DDNS registrado o la dirección IP estática que está asignada al puerto WAN, para conectar su dispositivo cliente al servidor VPN PPTP."
				]				
			}]
		},

		vpnServerStatus: {
			TITLE: "Conexiones VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Esta página muestra los clientes que están actualmente conectados a los servidores VPN OpenVPN y PPTP alojados en el router."
			},{
				type: "paragraph",
				content: "Haga click en el icono Minus para desconectar el cliente correspondiente."
			}]
		},
        cloudBasic: {
            TITLE: "TP-Link Cloud",
            CONTENT: [{
                type: "paragraph",
                content: "El servicio TP-Link Cloud le permite monitorizar remotamente su red en directo, acceder y gestionar sus dispositivos TP-Link desde Internet en cualquier momento y en cualquier lugar."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Información de la Cuenta"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Muestra la información de su cuenta TP-Link ID. Puede editar la información de la cuenta haciendo click en el icono Editar."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Información del Dispositivos"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Muestra la información de su dispositivo, incluyendo la cuenta cloud que está gestionando el dispositivo."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Cuentas Vinculadas"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Esta tabla muestra todas las cuentas cloud que están actualmente vinculadas a este dispositivo."
            }, {
                type: "step",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                title: "Para vincular una cuenta de usuario",
                content: [
                    "Haga click en Vincular.",
                    "Introduzca el email registrado que quiera vincular.",
                    "Haga click en Guardar."
                ]
            }]
        }
    };
})(jQuery);
