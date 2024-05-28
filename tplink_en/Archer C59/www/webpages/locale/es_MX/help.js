﻿(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra información relevante acerca de la conexión de la Red de Área Amplia (Internet)."
                       } ,{                      
                           type: "title",
                            title: "IPv4"
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "La única dirección física asignada al puerto (WAN) de Internet del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "La dirección IPv4 asignada al puerto (WAN) de Internet del router. Si la dirección IP se muestra como 0.0.0.0, indica que no hay acceso a Internet."
                       } ,{                      
                           type: "name",
                           title: "Máscara de Subred",
                           content: "Este parámetro determina parte de la red y parte del host de una dirección IP."
                       } ,{                      
                           type: "name",
                           title: "Puerta de Enlace Predeterminada",
                           content: "La dirección IP usada para conectar el router a la red."
                       } ,{                      
                           type: "name",
                           title: "DNS Primario / DNS Secundario",
                           content: "El DNS (Domain Name System - Sistema de Nombres de Dominio) traduce los nombres de host y los dominios de Internet a las direcciones IP. La información de estos servidores DNS es asignada por el Proveedor de Servicios de Internet (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Conexión",
                           content: "El tipo de conexión actual del puerto (WAN) de Internet."
                       } ,{                      
                           type: "title",
                            title: "IPv6"
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "La única dirección física asignada al puerto (WAN) de Internet del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "La dirección IPv6 única asignada al puerto (WAN) de Internet del router."
                       } ,{                      
                           type: "name",
                           title: "Puerta de Enlace Predeterminada",
                           content: "La dirección IP usada para conectar el router a la red."
                       } ,{                      
                           type: "name",
                           title: "DNS Primario / DNS Secundario",
                           content: "El DNS (Domain Name System - Sistema de Nombres de Dominio) traduce los nombres de host y los dominios de Internet a las direcciones IP. La información de estos servidores DNS es asignada por el Proveedor de Servicios de Internet (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Conexión",
                           content: "El tipo de conexión actual del puerto (WAN) de Internet."
                       } ,{                      
                           type: "title",
                            title: "3G/4G"
                       } ,{                      
                           type: "name",
                           title: "Estado del Módem 3G/4G",
                           content: "Muestra el estado actual del módem 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Muestra la Dirección IP 3G/4G (Internet) actual. Este campo estará en blanco o 0.0.0.0 si no se detecta la red 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Máscara de Subred",
                           content: "Muestra la máscara de subred asociada con la Dirección IP 3G/4G (Internet)."
                       } ,{                      
                           type: "name",
                           title: "Puerta de Enlace Predeterminada",
                           content: "Muestra la dirección IP de la puerta de enlace predeterminada (su router)."
                       } ,{                      
                           type: "name",
                           title: "DNS Primario / DNS Secundario",
                           content: "Muestra las direcciones IP del servidor DNS asignadas por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Señal del Módem 3G/4G",
                           content: "Muestra la potencia de la señal inalámbrica 3G / 4G."
                       }]
},
       STATUS_INTERNET_NO_USB :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra información relevante acerca de la conexión de la Red de Área Amplia (Internet)."
                       } ,{                      
                           type: "title",
                            title: "IPv4"
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "La única dirección física asignada al puerto (WAN) de Internet del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "La dirección IPv4 asignada al puerto (WAN) de Internet del router. Si la dirección IP se muestra como 0.0.0.0, indica que no hay acceso a Internet."
                       } ,{                      
                           type: "name",
                           title: "Máscara de Subred",
                           content: "Este parámetro determina parte de la red y parte del host de una dirección IP."
                       } ,{                      
                           type: "name",
                           title: "Puerta de Enlace Predeterminada",
                           content: "La dirección IP usada para conectar el router a la red."
                       } ,{                      
                           type: "name",
                           title: "DNS Primario / DNS Secundario",
                           content: "El DNS (Domain Name System - Sistema de Nombres de Dominio) traduce los nombres de host y los dominios de Internet a las direcciones IP. La información de estos servidores DNS es asignada por el Proveedor de Servicios de Internet (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Conexión",
                           content: "El tipo de conexión actual del puerto (WAN) de Internet."
                       } ,{                      
                           type: "title",
                            title: "IPv6"
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "La única dirección física asignada al puerto (WAN) de Internet del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "La dirección IPv6 única asignada al puerto (WAN) de Internet del router."
                       } ,{                      
                           type: "name",
                           title: "Puerta de Enlace Predeterminada",
                           content: "La dirección IP usada para conectar el router a la red."
                       } ,{                      
                           type: "name",
                           title: "DNS Primario / DNS Secundario",
                           content: "El DNS (Domain Name System - Sistema de Nombres de Dominio) traduce los nombres de host y los dominios de Internet a las direcciones IP. La información de estos servidores DNS es asignada por el Proveedor de Servicios de Internet (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Conexión",
                           content: "El tipo de conexión actual del puerto (WAN) de Internet."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Inalámbrico",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información relevante acerca de la Red Inalámbrica."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Red (SSID)",
                           content: "El nombre de la red inalámbrica, también conocido como SSID (Service Set Identifier - Identificador de Conjunto de Servicios)."
                       } ,{                      
                           type: "name",
                           title: "Radio Inalámbrica",
                           content: "El estado (Encendido o Apagado) del estado actual de la red inalámbrica."
                       } ,{                      
                           type: "name",
                           title: "Modo",
                           content: "El modo inalámbrico actual."
                       } ,{                      
                           type: "name",
                           title: "Ancho de Canal",
                           content: "El ancho de canal de la red inalámbrica."
                       } ,{                      
                           type: "name",
                           title: "Canal",
                           content: "El canal inalámbrico actual"
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "La dirección MAC de la radio de la red inalámbrica en el router."
                       } ,{                      
                           type: "name",
                           title: "Estado de WDS",
                           content: "El estado actual (habilitado o deshabilitado) del modo WDS."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información acerca de los puertos Ethernet (LAN)."
                       } ,{                      
                           type: "title",
                            title: "IPv4"
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "La dirección física única asignada al puerto Ethernet (LAN) del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "La dirección IPv4 asignada al puerto Ethernet (LAN) del router."
                       } ,{                      
                           type: "name",
                           title: "Máscara de Subred",
                           content: "Este parámetro determina parte de la red y parte del host de una dirección IP."
                       } ,{                      
                           type: "name",
                           title: "DHCP",
                           content: "Muestra si el servidor DHCP integrado del router está activo para los dispositivos en los puertos LAN o no. "
                       } ,{                      
                           type: "title",
                            title: "IPv6"
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "La dirección física única asignada al puerto Ethernet (LAN) del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "La dirección IPv6 asignada al puerto Ethernet (LAN) del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección de Enlace Local",
                           content: "La dirección de enlace de IPv6 para la interfaz de la LAN."
                       } ,{                      
                           type: "name",
                           title: "Tipo Asignado",
                           content: "El tipo de dirección IPv6 para la Interfaz de la LAN."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Red para Invitados",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información acerca de la red inalámbrica para invitados."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Red (SSID)",
                           content: "El nombre de la red inalámbrica (SSID) de su Red para Invitados."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Muestra si el nombre de la red inalámbrica (SSID) de la Red para Invitados está oculta o no."
                       } ,{                      
                           type: "name",
                           title: "Radio Inalámbrica",
                           content: "El estado actual (Encendido o Apagado) de la Red para Invitados."
                       } ,{                      
                           type: "name",
                           title: "Permitir que los invitados se vean entre sí",
                           content: "Muestra si todos los dispositivos en la Red para Invitados tienen permitido comunicarse entre sí o no."
                       }]
},
       STATUS_USB :{ 
               TITLE:"Dispositivos USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información de los dispositivos de almacenamiento USB y/o impresoras conectadas al router por medio de los puertos USB."
                       } ,{                      
                           type: "name",
                           title: "Impresora",
                           content: "El nombre de la impresora conectada."
                       } ,{                      
                           type: "name",
                           title: "Disco USB",
                           content: "El nombre del disco USB conectado al router."
                       } ,{                      
                           type: "name",
                           title: "Totales",
                           content: "La capacidad de almacenamiento total del dispositivo de almacenamiento USB conectado."
                       } ,{                      
                           type: "name",
                           title: "Disponible",
                           content: "La capacidad de almacenamiento disponible del dispositivo de almacenamiento USB conectado."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Desempeño",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra el rendimiento actual del router."
                       } ,{                      
                           type: "name",
                           title: "Carga del CPU",
                           content: "El uso del CPU actual."
                       } ,{                      
                           type: "name",
                           title: "Uso de Memoria",
                           content: "El uso de memoria actual."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Clientes Conectados por Cable",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información de todos los dispositivos conectados por cable que están conectados actualmente a la red."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Clientes Inalámbricos",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información de todos los dispositivos inalámbricos que están conectados actualmente a la red."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "title",
                            title: "Tipo de Conexión de Internet: IP Estático"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccionar este tipo si cuenta con una Dirección IP específica (fija), Máscara de Subred, Puerta de Enlace, y parámetros de DNS por parte del ISP."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP / Máscara de Subred / Puerta de Enlace Predeterminada / DNS Primario / DNS Secundario",
                           content: "Ingresar la información proporcionada por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamaño de MTU",
                           content: "El tamaño del MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) típico y predeterminado para la mayoría de las redes Ethernet es 1500 Bytes. No se recomienda cambiar el tamaño del MTU predeterminado a menos que se requiera por el ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: IP Dinámico"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccionar este tipo si cuenta con una conexión del servidor DHCP por parte de su ISP."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP / Máscara de Subred / Puerta de Enlace Predeterminada / DNS Primario / DNS Secundario",
                           content: "Estos parámetros son asignados automáticamente por el servidor DHCP de su ISP."
                       } ,{                      
                           type: "name",
                           title: "Renovar",
                           content: "Dar clic en este botón para obtener los nuevos parámetros de IP del servidor DHCP."
                       } ,{                      
                           type: "name",
                           title: "Liberar",
                           content: "Dar clic en este botón para liberar todas las direcciones IP asignadas por el servidor DHCP."
                       } ,{                      
                           type: "name",
                           title: "Usar las siguientes Direcciones DNS",
                           content: "Si el ISP ofrece una o dos direcciones DNS, seleccione esta casilla de verificación e ingrese las direcciones del DNS primario y DNS secundario en los campos de entrada correspondientes. De lo contrario, las direcciones DNS serán asignadas de manera dinámica por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamaño de MTU",
                           content: "El tamaño del MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) típico y predeterminado para la mayoría de las redes Ethernet es 1500 Bytes. No se recomienda cambiar el tamaño del MTU predeterminado a menos que se requiera por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Nombre del Host",
                           content: "Ingresar un valor en este campo para especificar el nombre del host del router."
                       } ,{                      
                           type: "name",
                           title: "Obtener el IP usando el DHCP de Unidifusión",
                           content: "Seleccionar esta casilla de verificación si su servidor DHCP del ISP no soporta aplicaciones de transmisión y no puede obtener la dirección IP de manera dinámica."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccionar este tipo si usa el servicio de DSL (Digital Subscriber Line - Línea de Suscripción Digital) y cuenta con un nombre de usuario y contraseña proporcionados por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar el nombre de usuario y la contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP/DNS Primario / DNS Secundario",
                           content: "Estos parámetros son asignados de manera automática por el servidor DHCP en su ISP."
                       } ,{                      
                           type: "name",
                           title: "Conexión Secundaria (Ninguna, IP Dinámico, IP Estático)",
       children: [{                      
                           type: "name",
                           title: "Ninguno",
                           content: "Seleccionar si no se proporciona ninguna conexión secundaria."
                       } ,{                      
                           type: "name",
                           title: "IP Dinámico",
                           content: "Seleccionar si la dirección IP y la máscara de subred son asignadas automáticamente por el ISP.",
       children: [{                      
                           type: "name",
                           title: "Renovar",
                           content: "Dar clic en este botón para renovar los parámetros de IP de su ISP."
                       } ,{                      
                           type: "name",
                           title: "Liberar",
                           content: "Dar clic en este botón para liberar los parámetros de IP asignados."
                       }]
} ,{                      
                           type: "name",
                           title: "IP Estático",
                           content: "Seleccionar si la dirección IP and máscara de subred son proporcionados por el ISP, e ingresar esta información en los campos correspondientes."
                       }]
} ,{                      
                           type: "name",
                           title: "Tamaño de MTU",
                           content: "El tamaño del MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) típico para la red de Ethernet es 1480 Bytes.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "En un caso raro, su ISP podría requerir ajustar el tamaño del MTU para un mejor desempeño de la red. No debe cambiar este valor a menos que sea absolutamente necesario."
                       }]
} ,{                      
                           type: "name",
                           title: "Nombre del Servicio / Nombre del Concentrador de Acceso",
                           content: "De manera predeterminada, el Nombre del Servicio y el Nombre del Concentrador de Acceso (AC) se dejan en blanco. Estos campos no deben ser configurados a menos que se requiera por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Detectar Intervalo en Línea",
                           content: "Ingresar un valor de intervalo de tiempo entre 0 y 120 (en segundos) para el cual el router solicita al Concentrador de Acceso en línea en cada intervalo. El valor predeterminado es 10."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Si su ISP proporciona una dirección IP específica (fija), seleccione Usar la siguiente Dirección IP e ingrese la dirección IP en el campo. De otro modo, seleccione Obtener de manera dinámica del ISP para obtener una dirección IP asignada por el servidor de manera automática."
                       } ,{                      
                           type: "name",
                           title: "Dirección DNS / DNS Primario / DNS Secundario",
                           content: "Si su ISP proporciona direcciones IP DNS específicas (fijas), seleccione Usar la siguiente Dirección DNS e ingresar las direcciones en los campos de DNS primario y DNS secundario respectivamente. De otro modo, seleccione Obtener de manera dinámica del ISP para obtener la(s) dirección(es) IP DNS asignada(s) por el servidor de manera automática."
                       } ,{                      
                           type: "name",
                           title: "Modo de Conexión",
                           content: "Seleccionar un modo de conexión adecuado que determine cómo conectarse a Internet.",
       children: [{                      
                           type: "name",
                           title: "Automático",
                           content: "En este modo, la conexión de Internet se reconecta automáticamente en cualquier momento que se desconecte."
                       } ,{                      
                           type: "name",
                           title: "Bajo Demanda",
                           content: "En este modo, la conexión de Internet finalizará después que haya transcurrido un tiempo específico de inactividad (Tiempo Máximo de Inactividad). La conexión se restablecerá cuando intente tener acceso a Internet de nuevo."
                       } ,{                      
                           type: "name",
                           title: "Basado en el tiempo",
                           content: "En este modo, la conexión de Internet sólo es establecida en un periodo de tiempo específico. Si se selecciona esta opción, ingrese la hora de inicio y la hora final; ambos están en el formato HH:MM."
                       } ,{                      
                           type: "name",
                           title: "Manualmente",
                           content: "En este modo, la conexión de Internet es controlada manualmente dando clic en el botón de Conectar o Desconectar. Este modo también soporta la función de Tiempo Máximo de Inactividad. Ingrese un tiempo máximo (en minutos) que la conexión de Internet puede estar inactiva antes de que finalice en el campo de Tiempo Máximo de Inactividad. El valor predeterminado es 15 minutos. Si desea que la conexión de Internet permanezca activa todo el tiempo, ingrese 0 (cero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "El modo de conexión Basada en el Tiempo sólo tomará efecto una vez que se configure el Tiempo del Sistema en la página de Avanzado → Herramientas del Sistema → Configuración del Tiempo."
                       }]
} ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: Cable BigPond"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccionar este tipo si su ISP proporciona la conexión del Cable BigPond."
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar el nombre de usuario y la contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Servidor de Autenticación",
                           content: "Ingresar la dirección IP del servidor de autenticación o el nombre del host."
                       } ,{                      
                           type: "name",
                           title: "Dominio de Autenticación",
                           content: "Ingresar el sufijo del nombre de dominio del servidor (basado en su ubicación). Por ejemplo, nsw.bigpond.net.au para NSW/ACT, vic.bigpond.net.au para VIC/TAS/WA/SA/NT, o qld.bigpond.net.au para QLD."
                       } ,{                      
                           type: "name",
                           title: "Tamaño de MTU",
                           content: "El tamaño del MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) típico y predeterminado para la mayoría de las redes Ethernet es 1500 Bytes. No se recomienda cambiar el tamaño del MTU predeterminado a menos que se requiera por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Modo de Conexión",
                           content: "Seleccionar un modo de conexión adecuado que determine cómo conectarse a Internet.",
       children: [{                      
                           type: "name",
                           title: "Automático",
                           content: "En este modo, la conexión de Internet se reconecta automáticamente en cualquier momento que se desconecte."
                       } ,{                      
                           type: "name",
                           title: "Bajo Demanda",
                           content: "En este modo, la conexión de Internet finalizará después que haya transcurrido un tiempo específico de inactividad (Tiempo Máximo de Inactividad). La conexión se restablecerá cuando intente tener acceso a Internet de nuevo."
                       } ,{                      
                           type: "name",
                           title: "Manualmente",
                           content: "En este modo, la conexión de Internet es controlada manualmente dando clic en el botón de Conectar o Desconectar. Este modo también soporta la función de Tiempo Máximo de Inactividad. Ingrese un tiempo máximo (en minutos) que la conexión de Internet puede estar inactiva antes de que finalice en el campo de Tiempo Máximo de Inactividad. El valor predeterminado es 15 minutos. Si desea que la conexión de Internet permanezca activa todo el tiempo, ingrese 0 (cero)."
                       }]
} ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccionar este tipo se conecta a un Servidor VPN de L2TP/PPTP  y se le proporciona un nombre de usuario, contraseña y la Dirección IP / Nombre de Dominio del servidor por parte del ISP."
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar el nombre de usuario y la contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP/DNS Primario / DNS Secundario",
                           content: "Estos parámetros serán asignados de manera automática por el servidor DHCP de su ISP."
                       } ,{                      
                           type: "name",
                           title: "Conexión Secundaria (IP Dinámico o IP Estático)",
       children: [{                      
                           type: "name",
                           title: "IP Dinámico",
                           content: "Seleccionar si la dirección IP y la máscara de subred son asignadas automáticamente por el ISP."
                       } ,{                      
                           type: "name",
                           title: "IP Estático",
                           content: "Seleccionar si la dirección IP, máscara de subred, puerta de enlace, y direcciones DNS son proporcionados por el ISP, e ingresar esta información en los campos correspondientes."
                       }]
} ,{                      
                           type: "name",
                           title: "IP del Servidor VPN/Nombre de Dominio",
                           content: "Ingresar la dirección IP del servidor VPN o nombre de dominio proporcionados por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamaño de MTU",
                           content: "El tamaño del MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) típico y predeterminado para la mayoría de las redes Ethernet es 1460 Bytes. No se recomienda cambiar el tamaño del MTU predeterminado a menos que se requiera por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Modo de Conexión",
                           content: "Seleccionar un modo de conexión adecuado que determine cómo conectarse a Internet.",
       children: [{                      
                           type: "name",
                           title: "Automático",
                           content: "En este modo, la conexión de Internet se reconecta automáticamente en cualquier momento que se desconecte."
                       } ,{                      
                           type: "name",
                           title: "Bajo Demanda",
                           content: "En este modo, la conexión de Internet finalizará después que haya transcurrido un tiempo específico de inactividad (Tiempo Máximo de Inactividad). La conexión se restablecerá cuando intente tener acceso a Internet de nuevo."
                       } ,{                      
                           type: "name",
                           title: "Manualmente",
                           content: "En este modo, la conexión de Internet es controlada manualmente dando clic en el botón de Conectar o Desconectar. Este modo también soporta la función de Tiempo Máximo de Inactividad. Ingrese un tiempo máximo (en minutos) que la conexión de Internet puede estar inactiva antes de que finalice en el campo de Tiempo Máximo de Inactividad. El valor predeterminado es 15 minutos. Si desea que la conexión de Internet permanezca activa todo el tiempo, ingrese 0 (cero)."
                       }]
} ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       INTERNET_MAC :{ 
               TITLE:"Clon de MAC",
               CONTENT: [{
                           type: "name",
                           title: "Usar la Dirección MAC Predeterminada",
                           content: "NO cambiar la dirección MAC predeterminada del router, en caso que el ISP no enlace la dirección IP asignada a la dirección MAC."
                       } ,{                      
                           type: "name",
                           title: "Usar la Dirección MAC de la Computadora Actual",
                           content: "Seleccionar para copiar la dirección MAC de la computadora que está conectada al router, en caso que el ISP enlace la dirección IP asignada a la dirección MAC de la computadora."
                       } ,{                      
                           type: "name",
                           title: "Usar la Dirección MAC Personalizada",
                           content: "Ingresar la Dirección MAC manualmente, en caso que el ISP enlace la dirección IP asignada a la dirección MAC específica."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "name",
                           title: "Dirección MAC",
                           content: "La dirección física única asignada al puerto Ethernet (LAN) del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Muestra la dirección IP del router predeterminado, la cual se usa para iniciar sesión en la página de administración a través de Internet del router y puede ser anulada."
                       } ,{                      
                           type: "name",
                           title: "Máscara de Subred",
                           content: "Seleccionar un identificador asignado usado por el puerto LAN para enrutar el tráfico Interno y Externo de la lista desplegable o ingresa una máscara de subred nueva en formato decimal con puntos."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si la dirección IP de la LAN nueva no está en la misma subred que la anterior, el Conjunto de Direcciones IP en el servidor DHCP se configurará de manera automática; sin embargo, el Servidor Virtual y el Host DMZ no tomarán efecto hasta que sean reconfigurados."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       IPTV :{ 
               TITLE:"Configuraciones",
               CONTENT: [{
                           type: "name",
                           title: "Snooping IGMP",
                           content: "Seleccionar para habilitar la característica de IGMP (Internet Group Management Protocol - Protocolo de Administración de Grupos de Internet) Snooping."
                       } ,{                      
                           type: "name",
                           title: "Proxy IGMP ",
                           content: "Seleccionar para habilitar la característica de Proxy de IGMP (Internet Group Management Protocol - Protocolo de Administración de Grupos de Internet)."
                       } ,{                      
                           type: "name",
                           title: "Versión de IGMP",
                           content: "Seleccionar la versión de Proxy de IGMP, ya sea V2 o V3, de acuerdo a su ISP."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Seleccionar para habilitar la característica de IPTV."
                       } ,{                      
                           type: "name",
                           title: "Modo",
                           content: "Seleccionar el modo adecuado de acuerdo a su ISP. Existen seis modos de IPTV soportados:",
       children: [{                      
                           type: "name",
                           title: "Puente",
                           content: "Si su ISP no está listado y no se requiere ningún otro parámetro, simplemente seleccione este modo y configure las características del puerto de LAN del router.",
       children: [{                      
                           type: "name",
                           title: "LAN 1/2/3/4",
                           content: "Asignar su puerto de LAN ya sea a la función del proveedor de Internet o al proveedor de IPTV."
                       }]
} ,{                      
                           type: "name",
                           title: "Rusia",
                           content: "Seleccionar si su ISP es de Rusia y los parámetros necesarios están predeterminados, incluyendo las características de Internet/ Teléfono IP / IDs de VLAN de IPTV y de Prioridad, y el puerto de LAN (1/2/3/4).",
       children: [{                      
                           type: "name",
                           title: "ID de VLAN de Multidifusión de IPTV / Prioridad",
                           content: "Puede habilitar la característica de multidifusión de IPTV según desee, y configurar el ID de VLAN y la Prioridad de acuerdo a su ISP."
                       }]
} ,{                      
                           type: "name",
                           title: "Singapur-ExStream",
                           content: "Seleccionar si su ISP es ExStream de Singapur y los parámetros necesarios están predeterminados, incluyendo las características de Internet/ IDs de VLAN de IPTV y de Prioridad, y el puerto de LAN (1/2/3/4)."
                       } ,{                      
                           type: "name",
                           title: "Malasia-Unifi",
                           content: "Seleccionar si su ISP es Unifi de Malasia y los parámetros necesarios están predeterminados, incluyendo las características de Internet/ IDs de VLAN de IPTV y de Prioridad, y el puerto de LAN (1/2/3/4)."
                       } ,{                      
                           type: "name",
                           title: "Malasia-Maxis",
                           content: "Seleccionar si su ISP es Maxis de Malasia y los parámetros necesarios están predeterminados, incluyendo las características de Internet / Teléfono IP / IDs de VLAN de IPTV y de Prioridad, y el puerto de LAN (1/2/3/4)."
                       } ,{                      
                           type: "name",
                           title: "Personalizado",
                           content: "Seleccionar si su ISP no está listado pero proporciona los parámetros necesarios, incluyendo Internet/ Teléfono IP/ IDs de VLAN de IPTV y de Prioridad, y el puerto de LAN (1/2/3/4).",
       children: [{                      
                           type: "name",
                           title: "Internet / Teléfono IP / IDs de VLAN de IPTV/ Prioridad",
                           content: "Configurar los IDs de VLAN y las prioridades según se proporcionen por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Etiqueta 802.11Q",
                           content: "Seleccionar para etiquetar los paquetes de Internet con 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "ID de VLAN de Multidifusión de IPTV / Prioridad",
                           content: "Puede habilitar la característica de multidifusión de IPTV según desee, y configurar el ID de VLAN y la Prioridad de acuerdo a su ISP."
                       } ,{                      
                           type: "name",
                           title: "LAN 1/2/3/4",
                           content: "Asigne su puerto de LAN a la función del proveedor de Internet, proveedor de teléfono IP o proveedor de IPTV."
                       }]
}]
} ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"Configuraciones",
               CONTENT: [{
                           type: "name",
                           title: "Servidor DHCP",
                           content: "De manera predeterminada, el Servidor DHCP (Dynamic Host Configuration Protocol - Protocolo de Configuración de Host Dinámico) está habilitado, asigna de manera dinámica los parámetros de TCP/IP a los dispositivos del cliente de un conjunto de direcciones IP. NO deshabilitar el Servidor DHCP a menos que tenga otro servidor DHCP o desee asignar manualmente los parámetros de TCP/IP a cada dispositivo del cliente en su red."
                       } ,{                      
                           type: "name",
                           title: "Grupo de Direcciones IP",
                           content: "Ingresar el rango de direcciones IP que pueden ser arrendadas a los clientes"
                       } ,{                      
                           type: "name",
                           title: "Tiempo de concesión de Direcciones",
                           content: "Ingresar la duración de tiempo que una dirección IP puede ser arrendada al cliente entre 2 y 2880 minutos. El valor predeterminado es 120 minutos"
                       } ,{                      
                           type: "name",
                           title: "Puerta de Enlace Predeterminada",
                           content: "Ingresar la dirección IP de la LAN. (Opcional)"
                       } ,{                      
                           type: "name",
                           title: "DNS Primario / DNS Secundario",
                           content: "Ingresar estos parámetros según se proporcionen por su ISP. (Opcional)"
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Reservación de Direcciones",
               CONTENT: [{
                           type: "paragraph",
                           content: "Puede reservar manualmente una dirección IP para un cliente que está conectado al router. Una vez reservada, la dirección IP sólo será asignada al mismo cliente por el servidor DHCP."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC del cliente con Dirección IP Reservada de DHCP."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP Reservada",
                           content: "Muestra la Dirección IP Reservada del cliente."
                       } ,{                      
                           type: "name",
                           title: "Descripción",
                           content: "Muestra una descripción del dispositivo del cliente."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual (habilitado o deshabilitado) del dispositivo del cliente."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Modificar o Borrar el cliente correspondiente."
                       } ,{                      
                           type: "step",
                           title: "Para reservar una dirección IP",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Ingresar la dirección MAC de su cliente deseado.",
                "3. Ingresar la dirección IP que desee reservar para el cliente.",
                "4. Ingresar una descripción para el cliente.",
                "5. Seleccionar Habilitar Esta Entrada.",
                "6. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar un cliente existente",
                           content: "En la tabla, dar clic en el ícono de Editar o en el ícono de Papelera de Reciclaje que corresponda al cliente que desee modificar o borrar."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"Lista de Clientes DHCP",
               CONTENT: [{
                           type: "name",
                           title: "Clientes totales",
                           content: "Muestra el número de clientes DHCP asociados."
                       } ,{                      
                           type: "name",
                           title: "Nombre del Cliente",
                           content: "Muestra el nombre del Cliente DHCP."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra las direcciones MAC."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP de concesión",
                           content: "Muestra la dirección IP asignada para el cliente por el servidor DHCP."
                       } ,{                      
                           type: "name",
                           title: "Tiempo de concesión",
                           content: "Muestra el tiempo restante de la dirección IP que ha sido arrendada para el cliente."
                       } ,{                      
                           type: "name",
                           title: "Actualizar",
                           content: "Dar clic para actualizar la Lista de Clientes DHCP."
                       }]
},
       DDNS :{ 
               TITLE:"DNS dinámico",
               CONTENT: [{
                           type: "paragraph",
                           content: "El DNS (Domain Name System en inglés) dinámico le permite asignar un host y un nombre de dominio fijos a una dirección IP dinámica de Internet. Esto es muy útil cuando usted hospeda su propio sitio, servidor FTP, u otro servidor del router.  Para empezar, necesitará registrarse con algún proveedor del servicio de DNS dinámico como por ejemplo www.dynds.com. Después ingrese su información de registro. "
                       } ,{                      
                           type: "step",
                           title: "Parta configurar un DNS Dinámico",
       content: [ 
                "1. Seleccionar el proveedor de servicios de DNS Dinámico.",
                "2. Ingrese el Nombre de Usuario y Contraseña de su cuenta de DNS Dinámico.",
                "3. Ingrese el nombre del dominio que registró con su proveedor del servicio de DNS dinámico. ",
                "4. Seleccione el intervalo de tiempo en el que la solicitud de actualización del DNS dinámico será enviada.",
                "5. Haga clic en Iniciar Sesión y Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si usted quiere utilizar una nueva cuenta de DDNS, por favor cierre su sesión y luego inicie la sesión con la nueva cuenta. "
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"DNS dinámico",
               CONTENT: [{
                           type: "paragraph",
                           content: "El DNS (Domain Name System en inglés) dinámico le permite asignar un host y un nombre de dominio fijos a una dirección IP dinámica de Internet. Esto es muy útil cuando usted hospeda su propio sitio, servidor FTP, u otro servidor del router.  Para empezar, necesitará registrarse con algún proveedor del servicio de DNS dinámico como por ejemplo www.dynds.com. Después ingrese su información de registro. "
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Lista de nombres de dominio",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra los nombres de dominio de DNS Dinámico que están registrados a su ID de TP-Link."
                       } ,{                      
                           type: "step",
                           title: "Para registrar un nuevo nombre de dominio:",
       content: [ 
                "1. Haga clic en Registrar.",
                "2. Ingrese el nombre del dominio. ",
                "3. Haga clic en Guardar."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Enrutamiento Estático",
               CONTENT: [{
                           type: "paragraph",
                           content: "El enrutamiento estático se usa para predeterminar una ruta fija para los paquetes de información de la red para alcanzar un host o red específicos."
                       } ,{                      
                           type: "step",
                           title: "Para configurar un Enrutamiento Estático",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Red Destino - Ingresar una dirección IP en formato decimal con puntos para asignar la ruta estática para esta entrada.",
                "3. Máscara de Subred - Ingresar una máscara de subred en formato decimal con puntos para determinar la parte de la red y la parte del host de la dirección IP.",
                "4. Puerta de Enlace Predeterminada - Ingresar una dirección IP de la puerta de enlace en formato decimal con puntos para conectar el router a la red o al host.",
                "5. Interfaz - Seleccionar LAN o WAN para especificar el tipo de la Red Destino.",
                "6. Descripción - Ingresar una descripción breve para esta entrada.",
                "7. Seleccionar Habilitar Esta Entrada.",
                "8. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar una entrada existente",
                           content: "En la tabla, dar clic en el ícono de Editar o en el ícono de Papelera de Reciclaje que corresponda a la entrada que desee modificar o borrar."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Tabla de Enrutamiento del Sistema",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Tabla de Enrutamiento del Sistema muestra todas las entradas de rutas válidas que están actualmente en uso."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Actualizar para actualizar la tabla de enrutamiento."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Configuraciones Inalámbricas",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configurar las configuraciones inalámbricas según lo necesite."
                       }]
},
       WIRELESS_REGION :{ 
               TITLE:"Configuraciones de la Región",
               CONTENT: [{
                           type: "name",
                           title: "Región",
                           content: "Seleccione su región del menú desplegable. Si su país o región no está listado, puede ser que esté restringido el uso de la radio inalámbrica en su localidad."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Inalámbrico de 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "Habilitar la Radio Inalámbrica",
                           content: "Seleccionar esta casilla de verificación para habilitar la frecuencia de la radio inalámbrica de 2.4GHz."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Red (SSID)",
                           content: "Puede dejar el Nombre de la Red predeterminado (SSID) como está, o crear un nombre nuevo (hasta 32 caracteres). Este campo hace distinción entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccionar esta casilla de verificación si desea ocultar el nombre de la red (SSID) de 2.4GHz de la lista de redes Wi-Fi."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Seleccionar una de las siguientes opciones de seguridad:",
       children: [{                      
                           type: "name",
                           title: "Sin Seguridad",
                           content: "Seleccionar esta opción para deshabilitar la seguridad inalámbrica. Se recomienda ampliamente que habilite la seguridad inalámbrica para proteger su red inalámbrica de acceso no autorizado."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Seleccionar esta opción para habilitar el método de autentificación estándar basado en una PSK (Pre-shared Key - clave pre-compartida), también llamada frase de contraseña. Si se selecciona, configurar lo siguiente.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccionar una versión de seguridad para su red inalámbrica.",
       children: [{                      
                           type: "name",
                           title: "Automático",
                           content: "Esta opción soporta múltiple implementación del WPA (Wi-Fi Protected Access - Acceso Wi-Fi protegido) estándar, como WPA y WPA2."
                       } ,{                      
                           type: "name",
                           title: "WPA-PSK",
                           content: "Esta opción proporciona un buen nivel de seguridad."
                       } ,{                      
                           type: "name",
                           title: "WPA2-PSK",
                           content: "Esta opción proporciona un mejor nivel de seguridad que WPA-PSK y se recomienda."
                       }]
} ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccionar un tipo de encriptación de seguridad: TKIP (Temporal Key Integrity Protocol - Protocolo de Integridad de Clave Temporal), o AES (Advanced Encryption Standard - Estándar de Encriptación Avanzada), o Auto (tanto para TKIP como AES). No se recomienda usar la encriptación TKIP si el router opera en el modo 802.11n, ya que TKIP no está soportado por la especificación 802.11n. Si se selecciona TKIP, se deshabilitará la función WPS."
                       } ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Ingresar una contraseña del inalámbrico entre 8 y 63 caracteres ASCII o entre 8 y 64 caracteres hexadecimales en este campo."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Empresarial",
                           content: "Seleccionar esta opción para habilitar el método de autentificación más avanzado usando un servidor RADIUS (Remote Authentication Dial In User Service -Servicio de Marcación Remota para Autenticación de Usuarios). Si se selecciona, se deshabilitará la función WPS.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccionar una versión de seguridad para su red inalámbrica.",
       children: [{                      
                           type: "name",
                           title: "Automático",
                           content: "Esta opción soporta múltiple implementación del WPA (Wi-Fi Protected Access - Acceso Wi-Fi protegido) estándar, como WPA y WPA2."
                       } ,{                      
                           type: "name",
                           title: "WPA",
                           content: "Esta opción proporciona un buen nivel de seguridad."
                       } ,{                      
                           type: "name",
                           title: "WPA2",
                           content: "Esta opción proporciona un mejor nivel de seguridad que WPA-PSK y se recomienda."
                       }]
} ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccionar un tipo de encriptación de seguridad: TKIP (Temporal Key Integrity Protocol - Protocolo de Integridad de Clave Temporal), o AES (Advanced Encryption Standard - Estándar de Encriptación Avanzada), o Auto (tanto para TKIP como AES). No se recomienda usar la encriptación TKIP si el router opera en el modo 802.11n, ya que TKIP no está soportado por la especificación 802.11n."
                       } ,{                      
                           type: "name",
                           title: "IP del Servidor RADIUS",
                           content: "Ingresar la dirección IP del servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Puerto de RADIUS",
                           content: "Ingresar el número de puerto del servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Contraseña de RADIUS",
                           content: "Ingresar la contraseña compartida del servidor RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Seleccionar esta opción para habilitar el método de autenticación básico si alguno sus dispositivos de cliente sólo pueden acceder al inalámbrico usando WEP (Wired Equivalent Privacy - Privacidad Equivalente al Cableado).",
       children: [{                      
                           type: "name",
                           title: "Tipo",
                           content: "Seleccionar un tipo de autenticación para su red inalámbrica. El valor predeterminado es Auto, la cual escoge el Sistema Abierto automáticamente o Clave Compartida basándose en la capacidad y solicitud de acceso del cliente inalámbrico."
                       } ,{                      
                           type: "name",
                           title: "Formato de Clave WEP",
                           content: "Usar el formato ASCII o seleccionar Hexadecimal. El formato ASCII es una combinación de caracteres alfabéticos y numéricos. El formato hexadecimal es una combinación de números (0-9) y letras (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Clave",
                           content: "Seleccionar una longitud de la clave WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "Le permite ingresar 10 dígitos hexadecimales (0-9, A-F, a-f) o 5 caracteres ASCII en el campo de Valor de WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Le permite ingresar 26 dígitos hexadecimales (0-9, A-F, a-f) o 13 caracteres ASCII en el campo de Valor de WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Valor Clave",
                           content: "Ingresar la clave WEP en el campo respectivo."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Modo",
                           content: "Seleccionar un modo de transmisión."
                       } ,{                      
                           type: "name",
                           title: "Ancho de Canal",
                           content: "Seleccionar un ancho de canal (ancho de banda) para la red inalámbrica de 2.4GHz."
                       } ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Seleccionar un canal de operación para la red inalámbrica de 2.4GHz. Se recomienda dejar en canal en Auto, si no está experimentando un problema de conexión inalámbrica intermitente."
                       } ,{                      
                           type: "name",
                           title: "Potencia de Transmisión",
                           content: "Seleccionar Alto, Intermedio o Bajo para especificar la potencia de transmisión de datos. La configuración predeterminada y recomendada es Alto."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Inalámbrico de 5GHz ",
               CONTENT: [{
                           type: "name",
                           title: "Habilitar la Radio Inalámbrica",
                           content: "Seleccionar esta casilla de verificación para habilitar la frecuencia de la radio inalámbrica de 5GHz."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Red (SSID)",
                           content: "Puede dejar el Nombre de la Red predeterminado (SSID) como está, o crear un nombre nuevo (hasta 32 caracteres). Este campo hace distinción entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccionar esta casilla de verificación si desea ocultar el nombre de la red (SSID) de 5GHz de la lista de redes Wi-Fi."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Seleccionar una de las siguientes opciones de seguridad:",
       children: [{                      
                           type: "name",
                           title: "Sin Seguridad",
                           content: "Seleccionar esta opción para deshabilitar la seguridad inalámbrica. Se recomienda ampliamente que habilite la seguridad inalámbrica para proteger su red inalámbrica de acceso no autorizado."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Seleccionar esta opción para habilitar el método de autentificación estándar basado en una PSK (Pre-shared Key - clave pre-compartida), también llamada frase de contraseña. Si se selecciona, configurar lo siguiente.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccionar una versión de seguridad para su red inalámbrica.",
       children: [{                      
                           type: "name",
                           title: "Automático",
                           content: "Esta opción soporta múltiple implementación del WPA (Wi-Fi Protected Access - Acceso Wi-Fi protegido) estándar, como WPA y WPA2."
                       } ,{                      
                           type: "name",
                           title: "WPA-PSK",
                           content: "Esta opción proporciona un buen nivel de seguridad."
                       } ,{                      
                           type: "name",
                           title: "WPA2-PSK",
                           content: "Esta opción proporciona un mejor nivel de seguridad que WPA-PSK y se recomienda."
                       }]
} ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccionar un tipo de encriptación de seguridad: TKIP (Temporal Key Integrity Protocol - Protocolo de Integridad de Clave Temporal), o AES (Advanced Encryption Standard - Estándar de Encriptación Avanzada), o Auto (tanto para TKIP como AES). No se recomienda usar la encriptación TKIP si el router opera en el modo 802.11n, ya que TKIP no está soportado por la especificación 802.11n. Si se selecciona TKIP, se deshabilitará la función WPS."
                       } ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Ingresar una contraseña del inalámbrico entre 8 y 63 caracteres ASCII o entre 8 y 64 caracteres hexadecimales en este campo."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Empresarial",
                           content: "Seleccionar esta opción para habilitar el método de autentificación más avanzado usando un servidor RADIUS (Remote Authentication Dial In User Service -Servicio de Marcación Remota para Autenticación de Usuarios). Si se selecciona, se deshabilitará la función WPS.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccionar una versión de seguridad para su red inalámbrica.",
       children: [{                      
                           type: "name",
                           title: "Automático",
                           content: "Esta opción soporta múltiple implementación del WPA (Wi-Fi Protected Access - Acceso Wi-Fi protegido) estándar, como WPA y WPA2."
                       } ,{                      
                           type: "name",
                           title: "WPA",
                           content: "Esta opción proporciona un buen nivel de seguridad."
                       } ,{                      
                           type: "name",
                           title: "WPA2",
                           content: "Esta opción proporciona un mejor nivel de seguridad que WPA-PSK y se recomienda."
                       }]
} ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccionar un tipo de encriptación de seguridad: TKIP (Temporal Key Integrity Protocol - Protocolo de Integridad de Clave Temporal), o AES (Advanced Encryption Standard - Estándar de Encriptación Avanzada), o Auto (tanto para TKIP como AES). No se recomienda usar la encriptación TKIP si el router opera en el modo 802.11n, ya que TKIP no está soportado por la especificación 802.11n."
                       } ,{                      
                           type: "name",
                           title: "IP del Servidor RADIUS",
                           content: "Ingresar la dirección IP del servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Puerto de RADIUS",
                           content: "Ingresar el número de puerto del servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Contraseña de RADIUS",
                           content: "Ingresar la contraseña compartida del servidor RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Seleccionar esta opción para habilitar el método de autenticación básico si alguno sus dispositivos de cliente sólo pueden acceder al inalámbrico usando WEP (Wired Equivalent Privacy - Privacidad Equivalente al Cableado).",
       children: [{                      
                           type: "name",
                           title: "Tipo",
                           content: "Seleccionar un tipo de autenticación para su red inalámbrica. El valor predeterminado es Auto, la cual escoge el Sistema Abierto automáticamente o Clave Compartida basándose en la capacidad y solicitud de acceso del cliente inalámbrico."
                       } ,{                      
                           type: "name",
                           title: "Formato de Clave WEP",
                           content: "Usar el formato ASCII o seleccionar Hexadecimal. El formato ASCII es una combinación de caracteres alfabéticos y numéricos. El formato hexadecimal es una combinación de números (0-9) y letras (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Clave",
                           content: "Seleccionar una longitud de la clave WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "Le permite ingresar 10 dígitos hexadecimales (0-9, A-F, a-f) o 5 caracteres ASCII en el campo de Valor de WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Le permite ingresar 26 dígitos hexadecimales (0-9, A-F, a-f) o 13 caracteres ASCII en el campo de Valor de WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Valor Clave",
                           content: "Ingresar la clave WEP en el campo respectivo."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Modo",
                           content: "Seleccionar un modo de transmisión mixto."
                       } ,{                      
                           type: "name",
                           title: "Ancho de Canal",
                           content: "Seleccionar un ancho de canal (ancho de banda) para la red inalámbrica de 5GHz."
                       } ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Seleccionar un canal de operación para la red inalámbrica de 5GHz. Se recomienda dejar en canal en Auto, si no está experimentando un problema de conexión inalámbrica intermitente."
                       } ,{                      
                           type: "name",
                           title: "Potencia de Transmisión",
                           content: "Seleccionar Alto, Intermedio o Bajo para especificar la potencia de transmisión de datos. La configuración predeterminada y recomendada es Alto."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       WPS :{ 
               TITLE:"PIN del Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Otros dispositivos pueden conectar este router mediante WPS con el PIN del Router."
                       } ,{                      
                           type: "name",
                           title: "PIN del Router",
                           content: "Activar para permitir que los dispositivos inalámbricos se conecten al router usando el PIN (Personal Identification Number - Número de Identificación Personal) del router."
                       } ,{                      
                           type: "name",
                           title: "PIN",
                           content: "Muestra el PIN del router. El PIN predeterminado se puede encontrar en la etiqueta del router. Dar clic en Generar para generar un nuevo PIN al azar o dar clic en Restaurar para restaurar el PIN actual al PIN predeterminado de fábrica."
                       }]
},
       WPS_WIZARD :{ 
               TITLE:"Asistente de WPS",
               CONTENT: [{
                           type: "name",
                           title: "Botón (Recomendado)",
                           content: "Seleccionar este método de conexión para habilitar la característica de WPS para conectar fácilmente cualquier dispositivo habilitado con WPS a su red inalámbrica usando el botón WPS o usando de manera virtual el botón de Conectar."
                       } ,{                      
                           type: "name",
                           title: "PIN",
                           content: "Seleccionar este método de conexión para agregar un dispositivo de manera manual ingresando el PIN de WPS del dispositivo inalámbrico en el campo y dar clic en Conectar."
                       }]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Estaciones Inalámbricas En Línea",
               CONTENT: [{
                           type: "name",
                           title: "Clientes totales",
                           content: "Muestra el número de clientes inalámbricos asociados."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC de clientes inalámbricos asociados."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Conexión",
                           content: "Muestra la frecuencia de banda inalámbrica (2.4 GHz o 5 GHz) de los clientes inalámbricos asociados."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Muestra el tipo de seguridad de los clientes inalámbricos asociados."
                       } ,{                      
                           type: "name",
                           title: "Paquetes Recibidos",
                           content: "Muestra el número de paquetes recibidos por los clientes inalámbricos asociados."
                       } ,{                      
                           type: "name",
                           title: "Paquetes Enviados",
                           content: "Muestra el número de paquetes enviados por los clientes inalámbricos asociados."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Actualizar para actualizar la información en esta página."
                       }]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Configuraciones",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Red para Invitados le permite configurar una red inalámbrica separada con un nombre de red (SSID) y contraseña separados que sus invitados pueden usar para tener acceso a su red inalámbrica."
                       } ,{                      
                           type: "name",
                           title: "Permitir que los invitados se vean entre sí",
                           content: "Seleccionar esta casilla de verificación para permitir que los dispositivos inalámbricos en la Red para Invitados se vean entre sí."
                       } ,{                      
                           type: "name",
                           title: "Permitir que los invitados tengan acceso a mi red local",
                           content: "Seleccionar esta casilla de verificación para permitir que los dispositivos inalámbricos en la Red para Invitados tengan acceso a las impresoras de la red local."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Inalámbrico de 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Habilitar la Red para Invitados",
                           content: "Seleccionar esta casilla de verificación para habilitar la característica de la Red para Invitados."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Red (SSID)",
                           content: "Usar la opción predeterminada de SSID de Invitado o crear un nombre nuevo (hasta 32 caracteres)."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccionar esta casilla de verificación si desea ocultar el SSID de Invitado de la lista de la red Wi-Fi."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Intervalo de Actualización de la Contraseña",
                           content: "Seleccionar el intervalo de actualización de su contraseña de la Red para Invitados."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Cuando seleccione nunca actualizar la contraseña, seleccione una de las siguientes opciones de seguridad:",
       children: [{                      
                           type: "name",
                           title: "Sin Seguridad",
                           content: "Seleccionar esta opción para deshabilitar la seguridad inalámbrica. Se recomienda ampliamente que habilite la seguridad inalámbrica para proteger su Red para Invitados del acceso no autorizado."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Seleccionar esta opción para habilitar el método de autenticación estándar basado en una PSK (Pre-Shared Key - clave pre-compartida), también llamada frase de contraseña. Si se selecciona, configurar lo siguiente.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccione una versión de seguridad para su Red para Invitados.",
       children: [{                      
                           type: "name",
                           title: "Automático",
                           content: "Esta opción soporta múltiple implementación del WPA (Wi-Fi Protected Access - Acceso Wi-Fi protegido) estándar, como WPA y WPA2."
                       } ,{                      
                           type: "name",
                           title: "WPA-PSK",
                           content: "Esta opción proporciona un buen nivel de seguridad."
                       } ,{                      
                           type: "name",
                           title: "WPA2-PSK",
                           content: "Esta opción proporciona un mejor nivel de seguridad que WPA-PSK y se recomienda."
                       }]
} ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccionar un tipo de encriptación de seguridad: TKIP (Temporal Key Integrity Protocol - Protocolo de Integridad de Clave Temporal), o AES (Advanced Encryption Standard - Estándar de Encriptación Avanzada), o Auto (tanto para TKIP como AES). No se recomienda usar la encriptación TKIP si el router opera en el modo 802.11n, ya que TKIP no está soportado por la especificación 802.11n. Si se selecciona TKIP, se deshabilitará la función WPS."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Usar la contraseña generada de manera aleatoria, o crear una contraseña entre 8 y 63 caracteres ASCII o entre 8 y 64 caracteres hexadecimales (0-9, a-f, A-F)."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       NAT :{ 
               TITLE:"Puerta de Enlace de Capa de Aplicación (ALG)",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG permite que los filtros transversales de NAT (Network Address Translation - Traducción de Dirección de Red) sean conectados a la puerta de enlace para soportar la dirección y la traducción del puerto para ciertos protocolos de \"control/datos\" de la capa de aplicación: FTP, TFTP, H323 etc. Se recomienda habilitar ALG."
                       } ,{                      
                           type: "name",
                           title: "Habilitar FTP ALG",
                           content: "Si se selecciona, permite que los clientes y servidores de FTP (File Transfer Protocol - Protocolo de Transferencia de Archivos) transfieran datos mediante NAT."
                       } ,{                      
                           type: "name",
                           title: "Habilitar TFTP ALG",
                           content: "Si se selecciona, permite que los clientes y servidores de TFTP (Trivial File Transfer Protocol - Protocolo de Transferencia de Archivos Trivial) transfieran datos mediante NAT."
                       } ,{                      
                           type: "name",
                           title: "Habilitar H323 ALG",
                           content: "Si se selecciona, permite que los clientes de Microsoft NetMeeting se comuniquen mediante NAT."
                       } ,{                      
                           type: "name",
                           title: "Habilitar RTSP ALG",
                           content: "Si se selecciona, permite que los clientes de reproductores de medios se comuniquen con los servidores de multimedia simultánea mediante NAT."
                       } ,{                      
                           type: "name",
                           title: "Habilitar SIP ALG",
                           content: "Si se selecciona, ayuda a prevenir ciber-ataques mediante el registro de más estados por sesión. Valida que el tráfico que pasa a través de la sesión cumpla con el protocolo."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Transferencia de PPTP",
                           content: "Si se selecciona, permite que las sesiones de Punto a Punto sean tunelizadas a través de una red IP y que pasen a través del router."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Transferencia de L2TP",
                           content: "Si se selecciona, permite que las sesiones de Punto a Punto de Capa 2 sean tunelizadas a través de una red IP y que pasen a través del router."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Transferencia de IPSec",
                           content: "Si se selecciona, permite que la seguridad del Protocolo de Internet (IPSec) sea tunelizada a través de una red IP y que pase a través del router. IPSec usa servicios de seguridad criptográficos para asegurar comunicaciones privadas y seguras a través de las redes de IP."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Servidores Virtuales",
               CONTENT: [{
                           type: "paragraph",
                           content: "Los Servidores Virtuales se usan para configurar los servicios públicos en su red local. Un servidor virtual se define como un puerto externo, y todas las solicitudes de Internet a este puerto externo serán redirigidas a una computadora designada, la cual debe estar configurada con una dirección IP estática o reservada."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Servicio",
                           content: "Muestra el nombre de su servidor virtual."
                       } ,{                      
                           type: "name",
                           title: "Puerto Externo",
                           content: "Muestra el número de puerto o un rango de puertos usados por el servidor virtual."
                       } ,{                      
                           type: "name",
                           title: "IP Interno",
                           content: "Muestra la dirección IP de la computadora que ejecuta la aplicación del servicio."
                       } ,{                      
                           type: "name",
                           title: "Puerto Interno",
                           content: "Muestra el número de puertos de la computadora que ejecuta la aplicación del servicio."
                       } ,{                      
                           type: "name",
                           title: "Protocolo",
                           content: "Muestra el protocolo usado para la aplicación del servicio: TCP, UDP, o Todos (Todos los protocolos soportados por el router).."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual (habilitado o deshabilitado) de la regla de filtrado específica."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Modificar o Borrar la regla correspondiente."
                       } ,{                      
                           type: "step",
                           title: "Para configurar una regla del Servidor Virtual",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Dar Clic en Ver Servicios Existentes para seleccionar un servicio de la lista para alimentar automáticamente el número de puerto adecuado en los campos del Puerto Externo y Puerto Interno. Si el servicio no está listado, ingresar el número de puerto externo (ejemplo, 21) o un rango de puertos (ejemplo, 21-25). Dejar el Puerto Interno en blanco si es el mismo que el Puerto Externo o ingresar un número de puerto específico (ejemplo, 21) si el Puerto Externo es un puerto único. Ingresar la dirección IP de la computadora que ejecuta la aplicación del servicio en el formato de notación decimal con puntos en el campo de IP Interno.",
                "3. Seleccionar un protocolo para la aplicación del servicio: TCP, UDP, o Todo de la lista desplegable de Protocolo.",
                "4. Seleccionar Habilitar Esta Entrada.",
                "5. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar una regla del Servidor Virtual",
                           content: "En la tabla, dar clic en el ícono de Editar o en el ícono de Papelera de Reciclaje que corresponda a la regla que desee modificar o borrar."
                       } ,{                      
                           type: "step",
                           title: "Para borrar múltiples reglas",
                           content: "Seleccionar todas las reglas que desee borrar, dar clic en Borrar arriba de la tabla."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si su dispositivo de host local está alojando más de un tipo de servicios disponibles, necesita crear una regla para cada servicio. "
                       }]
},
       PORT_TRIGGERING :{ 
               TITLE:"Activación de Puertos",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Activación de Puertos se usa para reenviar el tráfico de cierto puerto a un servidor específico en la red. "
                       } ,{                      
                           type: "name",
                           title: "Aplicación",
                           content: "Muestra el nombre de la aplicación."
                       } ,{                      
                           type: "name",
                           title: "Puerto de Activación",
                           content: "Muestra el puerto de tráfico saliente usado para activar una regla de filtrado de una conexión saliente. "
                       } ,{                      
                           type: "name",
                           title: "Protocolo de Activación",
                           content: "Muestra el protocolo usado para el Puerto de Activación. TCP, UDP, o Todos (Todos los protocolos soportados por el router)."
                       } ,{                      
                           type: "name",
                           title: "Puerto Externo",
                           content: "Muestra el puerto o rango de puertos usados por el sistema remoto. Una respuesta que usa uno de estos puertos será reenviada a la PC que activa esta regla. Puede ingresar 5 grupos de puertos (o secciones de puertos) como máximo. Cada grupo de puertos debe estar separado con \",\" (comas), por ejemplo, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Protocolo Externo",
                           content: "Muestra el protocolo usado del Puerto Entrante: TCP, UDP, o TODOS (Todos los protocolos soportados por el router)."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual (habilitado o deshabilitado) de la regla de filtrado específica."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Modificar o Borrar la regla correspondiente."
                       } ,{                      
                           type: "step",
                           title: "Para configurar una regla de Activación de Puerto",
       content: [{                      
                           type: "note",
                           title: "Nota",
                           content: "Cada regla sólo puede ser usada por un host a la vez."
                       },
                "1. Dar clic en Agregar.",
                "Dar Clic en Ver Aplicaciones Existentes para seleccionar una aplicación de la lista para alimentar automáticamente los valores predeterminados en los campos adecuados. Si desea agregar una aplicación no listada, ingrese de manera manual la Aplicación, Puerto de Activación, Puerto Externo y Protocolo Externo.",
                "3. Seleccionar Habilitar Esta Entrada.",
                "4. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar una regla de Activación de Puerto",
                           content: "En la tabla, dar clic en el ícono de Editar o en el ícono de Papelera de Reciclaje que corresponda a la regla que desee modificar o borrar."
                       } ,{                      
                           type: "step",
                           title: "Para borrar múltiples reglas de Activación de Puerto",
                           content: "En la tabla, seleccione todas las reglas que desea borrar, dar clic en Borrar arriba de la tabla."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "La característica del host DMZ (Demilitarized Zone - Zona Desmilitarizada) permite que un host local sea expuesto a Internet para un servicio de propósito especial, como videojuegos en línea o videoconferencias. Básicamente, el DMZ permite que una sola computadora en su LAN abra todos sus puertos. Esta computadora necesita estar configurada con una dirección IP estática y tener su función de cliente DHCP deshabilitada. "
                       } ,{                      
                           type: "step",
                           title: "Para asignar una computadora o servidor para que sea un servidor DMZ",
       content: [ 
                "1. Seleccionar Habilitar DMZ.",
                "2. En el campo de Dirección IP del Host de DMZ, ingresar la Dirección IP de una computadora local para configurar como el host de DMZ.",
                "3. Haga clic en Guardar."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "De manera predeterminada, la característica de UPnP (Universal Plug and Play - Conexión y Funcionamiento Universal) está habilitada para permitir que dispositivos como computadoras y dispositivos que usan Internet descubran y se comuniquen automáticamente entre sí en la red local."
                       } ,{                      
                           type: "paragraph",
                           content: "La Lista de Servicios de UPnP muestra la información del dispositivo UPnP."
                       } ,{                      
                           type: "name",
                           title: "Descripción del Servicio",
                           content: "Muestra una breve descripción del host local que inicia la solicitud UPnP."
                       } ,{                      
                           type: "name",
                           title: "Puerto Externo",
                           content: "Muestra el puerto externo que es abierto por el host local."
                       } ,{                      
                           type: "name",
                           title: "Protocolo",
                           content: "Muestra el tipo de protocolo de la red que es usado por el host local. "
                       } ,{                      
                           type: "name",
                           title: "Dirección IP Interna",
                           content: "Muestra la dirección IP del host local."
                       } ,{                      
                           type: "name",
                           title: "Puerto Interno",
                           content: "Muestra el puerto interno que es abierto por el host local."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Actualizar para actualizar la Lista del Servidor UPnP."
                       }]
},
       MODEM :{ 
               TITLE:"Ayuda de 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Módem USB 3G/4G",
                           content: "Muestra el estado del módem USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Región",
                           content: "Selecciona y muestra automáticamente su región cuando el módem USB y la tarjeta SIM son identificadas de manera exitosa. De no ser así, seleccione su región del menú desplegable."
                       } ,{                      
                           type: "name",
                           title: "ISP Móvil",
                           content: "Muestra el ISP (Internet Service Provider - Proveedor de Servicios de Internet) de la red 3G/4G. Si no lo detecta automáticamente, seleccione el ISP del menú desplegable. El Número de Marcación predeterminado y el APN se alimentarán de datos automáticamente según sea el caso."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Si está habilitada la Protección de SIM/UIM, ingrese el código PIN. La Protección de SIM/UIM está deshabilitada de manera predeterminada. Por favor tome en cuenta que si ingresa un PIN inválido 3 veces, la tarjeta SIM/UIM se bloqueará automáticamente. Puede desbloquearla únicamente ingresando el código PUK de su PC/laptop."
                       } ,{                      
                           type: "name",
                           title: "Mensaje",
                           content: "Muestra la información del PIN de su tarjeta SIM/UIM si la Protección de PIN está habilitada."
                       } ,{                      
                           type: "name",
                           title: "Configura de manera manual el Número de Marcación, APN, Nombre de Usuario y Contraseña",
                           content: "Si su ISP no está listado en la lista de <strong>ISP Móvil</strong>, seleccione esta casilla de verificación e ingrese el Número de Marcación, APN (Access Point Name - Nombre del Punto de Acceso), Nombre de Usuario y Contraseña que son proporcionados por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Número de Marcación",
                           content: "Ingrese el Número de Marcación proporcionado por su ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Ingrese el APN (Access Point Name - Nombre del Punto de Acceso) proporcionado por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar el Nombre de Usuario y Contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Conectar bajo Demanda",
                           content: "En este modo, la conexión de Internet finalizará después que haya transcurrido un tiempo específico de inactividad (Tiempo Máximo de Inactividad). La conexión se restablecerá cuando intente tener acceso a Internet de nuevo."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Algunas veces, la conexión no puede desconectarse, aunque especifique el Tiempo Máximo de Inactividad, ya que algunas aplicaciones mantienen el acceso a Internet ejecutándose en segundo plano."
                       } ,{                      
                           type: "name",
                           title: "Conectar Automáticamente",
                           content: "En este modo, la conexión de Internet se reconecta de manera automática en cualquier momento que se desconecte."
                       } ,{                      
                           type: "name",
                           title: "Conectar Manualmente",
                           content: "En este modo, puede dar clic en el botón de Conectar o Desconectar para controlar la conexión de Internet de manera manual. Este modo también soporta la función de Tiempo Máximo de Inactividad. Ingrese un tiempo máximo (en minutos) la conexión de Internet puede estar inactiva antes de que finalice en el campo de Tiempo Máximo de Inactividad. El valor predeterminado es 15 minutos. Si desea que la conexión de Internet permanezca activa todo el tiempo, ingrese 0 (cero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Algunas veces, la conexión no puede desconectarse, aunque especifique el Tiempo Máximo de Inactividad, ya que algunas aplicaciones mantienen el acceso a Internet ejecutándose en segundo plano."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en el botón de Guardar para guardar sus configuraciones."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Ayuda de 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Módem USB 3G/4G",
                           content: "Muestra el estado del módem USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Región",
                           content: "Selecciona y muestra automáticamente su región cuando el módem USB y la tarjeta SIM son identificadas de manera exitosa. De no ser así, seleccione su región del menú desplegable."
                       } ,{                      
                           type: "name",
                           title: "ISP Móvil",
                           content: "Muestra el ISP (Internet Service Provider - Proveedor de Servicios de Internet) de la red 3G/4G. Si no lo detecta automáticamente, seleccione el ISP del menú desplegable. El Número de Marcación predeterminado y el APN se alimentarán de datos automáticamente según sea el caso."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Si está habilitada la Protección de SIM/UIM, ingrese el código PIN. La Protección de SIM/UIM está deshabilitada de manera predeterminada. Por favor tome en cuenta que si ingresa un PIN inválido 3 veces, la tarjeta SIM/UIM se bloqueará automáticamente. Puede desbloquearla únicamente ingresando el código PUK de su PC/laptop."
                       } ,{                      
                           type: "name",
                           title: "Mensaje",
                           content: "Muestra la información del PIN de su tarjeta SIM/UIM si la Protección de PIN está habilitada."
                       } ,{                      
                           type: "name",
                           title: "Configura de manera manual el Número de Marcación, APN, Nombre de Usuario y Contraseña",
                           content: "Si su ISP no está listado en la lista de <strong>ISP Móvil</strong>, seleccione esta casilla de verificación e ingrese el Número de Marcación, APN (Access Point Name - Nombre del Punto de Acceso), Nombre de Usuario y Contraseña que son proporcionados por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Número de Marcación",
                           content: "Ingrese el Número de Marcación proporcionado por su ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Ingrese el APN (Access Point Name - Nombre del Punto de Acceso) proporcionado por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar el Nombre de Usuario y Contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Conectar bajo Demanda",
                           content: "En este modo, la conexión de Internet finalizará después que haya transcurrido un tiempo específico de inactividad (Tiempo Máximo de Inactividad). La conexión se restablecerá cuando intente tener acceso a Internet de nuevo."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Algunas veces, la conexión no puede desconectarse, aunque especifique el Tiempo Máximo de Inactividad, ya que algunas aplicaciones mantienen el acceso a Internet ejecutándose en segundo plano."
                       } ,{                      
                           type: "name",
                           title: "Conectar Automáticamente",
                           content: "En este modo, la conexión de Internet se reconecta de manera automática en cualquier momento que se desconecte."
                       } ,{                      
                           type: "name",
                           title: "Conectar Manualmente",
                           content: "En este modo, puede dar clic en el botón de Conectar o Desconectar para controlar la conexión de Internet de manera manual. Este modo también soporta la función de Tiempo Máximo de Inactividad. Ingrese un tiempo máximo (en minutos) la conexión de Internet puede estar inactiva antes de que finalice en el campo de Tiempo Máximo de Inactividad. El valor predeterminado es 15 minutos. Si desea que la conexión de Internet permanezca activa todo el tiempo, ingrese 0 (cero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Algunas veces, la conexión no puede desconectarse, aunque especifique el Tiempo Máximo de Inactividad, ya que algunas aplicaciones mantienen el acceso a Internet ejecutándose en segundo plano."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Autenticación",
                           content: "Seleccione un tipo de Autenticación. El valor predeterminado es Auto. Algunos ISPs requieren un tipo de autenticación específico, por favor confírmelo con su ISP o mantenga las configuraciones predeterminadas."
                       } ,{                      
                           type: "name",
                           title: "Automático",
                           content: "Si es Auto (predeterminado), el router determina automáticamente el tipo de autenticación usado por su ISP."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Si es PAP (Password Authentication Protocol - Protocolo de Autenticación de la Contraseña), el router autentifica con el usuario usando dos entradas de comunicación. Seleccione esta opción si el ISP requiere este tipo de autenticación."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Si es CHAP (Challenge Handshake Authentication Protocol - Protocolo de Autenticación por Desafío Mutuo), el router autentifica con el usuario usando tres entradas de comunicación y valida la identificación del usuario de manera periódica. Seleccione esta opción si el ISP requiere este tipo de autenticación."
                       } ,{                      
                           type: "name",
                           title: "Tamaño de MTU",
                           content: "El tamaño de MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) predeterminado es 1480 Bytes. No lo cambie a menos que se requiera por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Usar los siguientes Servidores DNS",
                           content: "Si su ISP proporciona direcciones IP del servidor DNS, seleccione esta casilla de verificación e ingrese las direcciones IP del <strong>DNS Primario</strong> y DNS Secundario (Opcional) abajo. De otro modo los servidores DNS serán asignados de manera dinámica por su ISP."
                       } ,{                      
                           type: "name",
                           title: "DNS Primario",
                           content: "Ingrese la dirección IP de DNS en notación decimal con puntos proporcionada por su ISP."
                       } ,{                      
                           type: "name",
                           title: "DNS Secundario",
                           content: "(Opcional) Ingrese otra dirección IP de DNS en notación decimal con puntos proporcionada por su ISP."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en el botón de <strong>Guardar</strong> para guardar sus configuraciones."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Configuraciones del Dispositivo",
               CONTENT: [{
                           type: "paragraph",
                           content: "La página de Configuraciones del Dispositivo muestra la información relacionada de cualquier dispositivo de almacenamiento USB conectado mediante el puerto USB."
                       } ,{                      
                           type: "name",
                           title: "Escanear",
                           content: "Generalmente el router detecta automáticamente cualquier dispositivo recién conectado. De lo contrario, dar clic en este botón para buscar y actualizar la página con la información actualizada. "
                       } ,{                      
                           type: "name",
                           title: "Volumen",
                           content: "Muestra el nombre del volumen USB."
                       } ,{                      
                           type: "name",
                           title: "Capacidad",
                           content: "Muestra la capacidad total de almacenamiento del USB."
                       } ,{                      
                           type: "name",
                           title: "Espacio Libre",
                           content: "Muestra el espacio de almacenamiento libre disponible actual."
                       } ,{                      
                           type: "name",
                           title: "Remover de Manera Segura",
                           content: "Dar clic en este botón para retirar de manera segura el dispositivo de almacenamiento USB antes de desconectarlo físicamente del router."
                       } ,{                      
                           type: "paragraph",
                           content: "Por favor tome en cuenta que el botón de Retirar de Manera Segura sólo aparece cuando hay un dispositivo de almacenamiento USB conectado al router, y no podrá retirar el dispositivo USB mientras el volumen actual está ocupado."
                       } ,{                      
                           type: "name",
                           title: "Activo",
                           content: "Esta tabla sólo aparece cuando hay un dispositivo de almacenamiento USB conectado al router. Seleccionar para habilitar el uso compartido de archivos del dispositivo USB."
                       } ,{                      
                           type: "step",
                           title: "Para configurar un servidor de archivos",
       content: [ 
                "1. Conectar el dispositivo de almacenamiento USB al puerto USB del router usando un cable USB.",
                "2. El dispositivo USB recién conectado debe ser detectado automáticamente por el router y se debe mostrar la información en la sección de Configuraciones del Dispositivo. De lo contrario, dar clic en Escanear.",
                "3. Seleccionar Activar para habilitar el uso compartido de archivos."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Cuenta de uso compartido",
               CONTENT: [{
                           type: "name",
                           title: "Cuenta",
                           content: "Puede seleccionar Usar Cuenta Predeterminada para tener acceso a los archivos y carpetas compartidas o Usar Cuenta Nueva e ingresar lo siguiente para crear una nueva cuenta de usuario."
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar una cadena alfanumérica o subrayada de hasta 15 caracteres de longitud. El nombre de usuario debe iniciar con un carácter del alfabeto. Estos campos hacen distinción entre mayúsculas y minúsculas. "
                       } ,{                      
                           type: "name",
                           title: "Confirmar Contraseña",
                           content: "Volver a ingresar la contraseña para confirmar que no haya ningún error tipográfico. Este campo también hace distinción entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Configuraciones de Uso Compartido",
               CONTENT: [{
                           type: "name",
                           title: "Nombre de la Red/Servidor Multimedia",
                           content: "Muestra el nombre usado para acceder dispositivo de almacenamiento USB conectado."
                       } ,{                      
                           type: "name",
                           title: "Habilitar",
                           content: "Seleccionar para habilitar el método de acceso."
                       } ,{                      
                           type: "name",
                           title: "Método de Acceso",
                           content: "Existen tres métodos de acceso para permitir el acceso al dispositivo de almacenamiento USB conectado. Puede seleccionar uno o más métodos de acceso seleccionando la casilla de verificación correspondiente.",
       children: [{                      
                           type: "name",
                           title: "Mis Sitios de Red",
                           content: "Si se habilita, los usuarios en su red pueden tener acceso al dispositivo de almacenamiento USB usando una dirección IP asignada (ejemplo, \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Si se habilita, los clientes de FTP en su red local pueden tener acceso al dispositivo de almacenamiento USB usando una dirección IP asignada, seguida por el número de puerto del servidor FTP (ejemplo, ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (a través de Internet)",
                           content: "Si se habilita, los usuarios pueden tener acceso de manera remota a la unidad de almacenamiento USB mediante FTP a través de Internet. Esta característica soporta tanto descargar como subir archivos. Para cambiar el número de puerto del servidor, ingresar un número de puerto y dar clic en Guardar para aplicar los cambios."
                       }]
} ,{                      
                           type: "name",
                           title: "Vínculo",
                           content: "Muestra la dirección usada para tener acceso al dispositivo de almacenamiento USB compartido."
                       } ,{                      
                           type: "name",
                           title: "Puerto",
                           content: "Muestra el número de puerto del servidor FTP."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Uso Compartido de Carpetas",
               CONTENT: [{
                           type: "name",
                           title: "Compartir Todas",
                           content: "Activar para compartir todos los archivos y carpetas o Desactivar para sólo compartir las carpetas seleccionadas. "
                       } ,{                      
                           type: "name",
                           title: "Habilitar Autenticación",
                           content: "Se recomienda ampliamente habilitar la autenticación para requerir que los usuarios ingresen un nombre de usuario y contraseña válidos para tener acceso a todas las carpetas compartidas"
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Carpeta",
                           content: "Muestra el nombre de la carpeta compartida."
                       } ,{                      
                           type: "name",
                           title: "Ruta de la Carpeta",
                           content: "Muestra la ruta hacia la carpeta compartida."
                       } ,{                      
                           type: "name",
                           title: "Uso Compartido de Multimedia",
                           content: "Indica si la carpeta compartida permite el uso compartido de multimedia o no."
                       } ,{                      
                           type: "name",
                           title: "Nombre del Volumen",
                           content: "Muestra el nombre del volumen compartido."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado de la carpeta compartida mediante el indicador de foco."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Modificar o Borrar la carpeta compartida correspondiente."
                       } ,{                      
                           type: "name",
                           title: "Explorar",
                           content: "Dar clic en buscar una carpeta de uso compartido."
                       } ,{                      
                           type: "name",
                           title: "Permitir el Acceso a la Red para Invitados",
                           content: "Seleccionar para permitir que los clientes en la Red para Invitados tengan acceso a las carpetas de uso compartido."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Autenticación",
                           content: "Seleccionar para requerir que los usuarios tengan acceso a las carpetas de uso compartido con un nombre de usuario y contraseña válidos."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el Acceso de Escritura",
                           content: "Seleccionar para permitir que los usuarios realicen cambios al contenido de la carpeta."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el Uso Compartido de Multimedia",
                           content: "Seleccionar para habilitar el uso compartido de multimedia."
                       } ,{                      
                           type: "name",
                           title: "Actualizar",
                           content: "Dar clic para actualizar la lista de la carpeta de uso compartido."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Servidor de impresión",
               CONTENT: [{
                           type: "name",
                           title: "Servidor de impresión",
                           content: "Activar para habilitar la función del servidor de impresión."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Impresora",
                           content: "Muestra el nombre de su impresora conectada al router."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Descarga fuera de línea",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con la Descarga Fuera delinea habilitada, el router puede descargar los archivos son mantener su computadora encendida todo el tiempo. "
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Activar para habilitar la característica de Descarga Fuera de Línea."
                       } ,{                      
                           type: "name",
                           title: "Ruta de la Carpeta",
                           content: "Seleccionar una ruta del directorio para almacenar o guardar sus descargas.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "No cambie la ruta del directorio o retire el dispositivo de almacenamiento USB cuando cargue y descargue archivos; de otro modo podrían ocurrir algunos errores fatales."
                       }]
} ,{                      
                           type: "name",
                           title: "Programar",
                           content: "Seleccionar la casilla de verificación para habilitar la característica de Programar que le permite especificar el periodo de tiempo para descargar / cargar archivos."
                       } ,{                      
                           type: "name",
                           title: "Mantener la Carga Después que se Complete la Tarea",
                           content: "Seleccionar la casilla de verificación para seguir descargando los datos de las descargas completadas a otros."
                       } ,{                      
                           type: "name",
                           title: "Número Máximo de Descargas Activas",
                           content: "Ingresar un valor entre 1 y 10 para establecer el número máximo de descargas activas."
                       } ,{                      
                           type: "name",
                           title: "Límites de Velocidad",
                           content: "Especificar la velocidad máxima de carga y descarga para su conexión de Internet."
                       } ,{                      
                           type: "name",
                           title: "Velocidad Máxima de Descarga",
                           content: "Ingresar un valor entre 1 y 100000 kB/s para establecer la velocidad de descarga máxima. El valor predeterminado es 1024."
                       } ,{                      
                           type: "name",
                           title: "Velocidad Máxima de Carga",
                           content: "Ingresar un valor entre 1 y 100000 kB/s para establecer la velocidad máxima de carga. El valor predeterminado es 128."
                       } ,{                      
                           type: "name",
                           title: "Número de Conexiones",
                           content: "Especificar el número máximo de conexiones."
                       } ,{                      
                           type: "name",
                           title: "Número Máximo de Conexiones Globales",
                           content: "Ingresar un valor entre 1 y 200 para establecer el número máximo global de conexiones. El valor predeterminado es 100."
                       } ,{                      
                           type: "name",
                           title: "Número Máximo de Red de Pares Conectadas por Torrent",
                           content: "Ingresar un valor entre 1 y 100 para establecer el número máximo de usuarios conectados por torrent. El valor predeterminado es 50."
                       } ,{                      
                           type: "name",
                           title: "Habilitar la Red DHT ",
                           content: "Habilitar esta característica para mejorar la eficiencia para encontrar los usuarios de tal modo que pueda incrementar la velocidad de descarga."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Intercambio entre Pares",
                           content: "Habilitar esta característica para mejorar la eficiencia de comunicación entre su grupo de usuarios de tal modo que pueda incrementar la velocidad de descarga."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Encriptación del Protocolo BitTorrent",
                           content: "Habilitar esta característica para fortalecer la privacidad y confidencialidad durante el proceso de transmisión de datos."
                       } ,{                      
                           type: "name",
                           title: "Servidor aMule",
                           content: "Ingresar la dirección IP y el puerto del servidor aMule. La descarga de aMule funciona únicamente cuando el router está conectado al servidor."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Descargas",
               CONTENT: [{
                           type: "name",
                           title: "Elemento",
       children: [{                      
                           type: "name",
                           title: "Archivo",
                           content: "Muestra el nombre y tipo del archivo de descarga."
                       } ,{                      
                           type: "name",
                           title: "Velocidad",
                           content: "Muestra la velocidad de descarga (o carga) actual de la descarga."
                       } ,{                      
                           type: "name",
                           title: "Completado",
                           content: "Muestra el progreso de la descarga."
                       } ,{                      
                           type: "name",
                           title: "Tiempo Restante",
                           content: "Muestra el tiempo restante de la descarga."
                       } ,{                      
                           type: "name",
                           title: "Red de pares conectadas",
                           content: "Muestra el número de usuarios conectados de la descarga."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual de la descarga (descargando, en espera, enviando, en pausa, completado o error)."
                       }]
} ,{                      
                           type: "name",
                           title: "Para agregar una descarga nueva",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Dar clic en Agregar.",
		"2. Seleccionar su origen de descarga, torrent de la PC, torrent del USB, o URL.",
		"3. Seleccionar la ubicación del torrent para BT, o ingresar el URL para FTP, HTTP y aMule. ",
                "4. Dar clic en OK.",
		"5. Para aMule, especifique la dirección IP del servidor aMule y el puerto en Avanzado > Servidor aMule."
					]}]

} ,{                      
                           type: "name",
                           title: "Para borrar descargas.",
                           content: "Seleccionar la casilla de verificación correspondiente de la descarga(s) que desee borrar, y después dar clic en Borrar arriba de la tabla."
                       } ,{                      
                           type: "name",
                           title: "Para pausar descargas",
                           content: "Dar clic en la casilla de verificación correspondiente de la descarga(s) que desea pausar, y después dar clic en Pausa arriba de la tabla. "
                       } ,{                      
                           type: "name",
                           title: "Para reanudar descargas",
                           content: "Dar clic en la casilla de verificación correspondiente de la descarga(s) que desea reanudar, y después dar clic en Reanudar arriba de la tabla. "
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Controles Parentales",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con Controles Parentales, puede bloquear sitios web inadecuados, explícitos y maliciosos; restringir el acceso por ciertas horas del día (por ejemplo, Facebook o YouTube durante la hora de la tarea); y al mismo tiempo proteger cada dispositivo en su red doméstica contra software maligno y fraude por internet a través de un punto de control central."
                       } ,{                      
                           type: "name",
                           title: "Controles Parentales",
                           content: "Activar para habilitar la característica de Controles Parentales."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Dispositivos Bajo el Control Parental",
               CONTENT: [{
                           type: "name",
                           title: "Nombre del dispositivo",
                           content: "Muestra el nombre de todos los dispositivos de cliente conectados que están actualmente bajo los Controles Parentales."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC de todos los dispositivos de cliente conectados que están actualmente bajo los Controles Parentales."
                       } ,{                      
                           type: "name",
                           title: "Tiempo de Acceso a Internet",
                           content: "Muestra los periodos de tiempo de acceso de restricción. El horario de tiempo toma efecto basándose en el tiempo del sistema del router que puede ser ajustado en \"Herramientas del Sistema -> Configuración del Tiempo\"."
                       } ,{                      
                           type: "name",
                           title: "Descripción",
                           content: "Muestra una descripción breve del dispositivo conectado."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual (habilitado o deshabilitado) de los Controles Parentales del dispositivo correspondiente."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Modificar o Borrar el dispositivo correspondiente."
                       } ,{                      
                           type: "step",
                           title: "Para restringir un dispositivo de cliente nuevo",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Dar clic en Ver Dispositivos Existentes y seleccionar un dispositivo conectado actualmente desde la Lista de Dispositivos de Acceso; o ingresar el Nombre del Dispositivo y la Dirección MAC manualmente para agregar un dispositivo que no esté conectado.",
                "3. Dar clic en el icono de Tiempo de Acceso a Internet para especificar un periodo de tiempo durante el cual aplique la restricción.",
                "4. Ingresar una descripción breve en el campo de Descripción. (Opcional)",
                "5. Seleccionar Habilitar Esta Entrada.",
                "6. Dar clic en OK."]
} ,{                      
                           type: "paragraph",
                           content: "Para modificar o borrar una entrada de Control Parental, simplemente dar clic en el icono de Editar para editar la información o en el ícono de Papelera de Reciclaje para quitar la entrada correspondiente."
                       } ,{                      
                           type: "paragraph",
                           content: "Para borrar múltiples entradas, seleccionar todas las entradas y dar clic en Borrar arriba de la tabla."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Restricción de Contenido",
               CONTENT: [{
                           type: "name",
                           title: "Lista Negra",
                           content: "Contiene palabras clave que se usarán para bloquear cualquier acceso al sitio de Internet de los dispositivos cliente especificados en la lista de Controles Parentales. ",
       children: [{                      
                           type: "paragraph",
                           content: "Dar clic en Agregar una Palabra Clave Nueva para agregar una palabra clave a la lista negra. Para borrar una palabra clave, dar clic en el icono de (-) de la palabra clave que desea borrar."
                       }]
} ,{                      
                           type: "name",
                           title: "Lista Blanca",
                           content: "Contiene las direcciones de los sitios de Internet a los cuales tienen permitido el acceso los dispositivos de cliente especificados en la lista de Controles Parentales.",
       children: [{                      
                           type: "paragraph",
                           content: "Dar clic en Agregar un Nombre de Dominio Nuevo para agregar un sitio de Internet a la lista blanca. Para borrar un sitio de Internet, dar clic en el icono de (-) del sitio de Internet que desea borrar."
                       }]
} ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar su configuración."
                       }]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service - Calidad del Servicio) ayuda a priorizar el tráfico de Internet basado en sus necesidades. Puede especificar el nivel de prioridad para un dispositivo o una aplicación en la lista de reglas de QoS."
                       } ,{                      
                           type: "name",
                           title: "Habilitar QoS",
                           content: "Seleccionar esta casilla para habilitar la función de QoS."
                       } ,{                      
                           type: "name",
                           title: "Cargar Ancho de Banda",
                           content: "Ingresar el ancho de banda de carga máximo proporcionado por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Descargar Ancho de Banda",
                           content: "Ingresar el ancho de banda de descarga máximo proporcionado por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Prioridad Alta",
                           content: "Especificar un porcentaje para el tráfico de prioridad alta."
                       } ,{                      
                           type: "name",
                           title: "Prioridad Intermedia",
                           content: "Especificar un porcentaje para el tráfico de prioridad intermedia."
                       } ,{                      
                           type: "name",
                           title: "Prioridad Baja",
                           content: "Especificar un porcentaje para el tráfico de prioridad baja."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "La cantidad máxima (porcentaje) de todas las prioridades es 100%."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       QOS_RULE :{ 
               TITLE:"Lista de Reglas QoS",
               CONTENT: [{
                           type: "name",
                           title: "Tipo",
                           content: "Seleccionar un tipo para agregar la lista de reglas de QoS."
                       } ,{                      
                           type: "step",
                           title: "Para configurar una regla para la prioridad alta / intermedia / baja por Dispositivo",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Seleccionar Por Dispositivo.",
                "3. Dar clic en Ver Dispositivos Existentes para seleccionar su dispositivo deseado de la Lista de Dispositivos de Acceso; o puede ingresar el Nombre del Dispositivo y su Dirección MAC de manera manual en los campos de Nombre del Dispositivo y Dirección MAC.",
                "4. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para configurar una regla para la prioridad alta / intermedia / baja Por Aplicación",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Seleccionar Por Aplicación.",
                "3. Seleccionar su aplicación deseada de la lista de Aplicación, o puede personalizar una aplicación configurando el nombre, protocolo, y puerto destino (1-65535) en los campos correspondientes, puede ingresar un solo puerto o múltiples puertos, use comas para separar (ejemplo, 21,36-105,111).",
                "4. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para configurar una regla para la prioridad alta / intermedia / baja Por Puerto Físico",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Seleccionar Por Puerto Físico.",
                "3. Seleccionar su puerto deseado.",
                "4. Dar clic en OK."]
}]
},
       QOS_DATABASE :{ 
               TITLE:"Actualizar Base de Datos",
               CONTENT: [{
                           type: "name",
                           title: "Archivo Nuevo de la Base de Datos",
                           content: "Dar clic en Explorar para localizar su archivo nuevo de la base de datos. Seleccionarlo y dar clic en Actualizar para actualizar su base de datos a una versión más nueva."
                       } ,{                      
                           type: "name",
                           title: "Versión de la Base de Datos",
                           content: "Muestra la versión de la base de datos actual."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Cortafuegos",
               CONTENT: [{
                           type: "name",
                           title: "Cortafuegos de SPI",
                           content: "El cortafuegos de SPI (Stateful Packet Inspection - Inspección Superficial de Paquetes) previene ciber-ataques y valida el tráfico que está pasando a través del router basado en el protocolo."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"Protección DoS",
               CONTENT: [{
                           type: "name",
                           title: "Protección DoS",
                           content: "La Protección de DoS (Denial of Service - Negación del Servicio) protege su LAN contra ataques de DoS que saturan su red con solicitudes del servidor."
                       } ,{                      
                           type: "name",
                           title: "Filtrado de Ataque de ICMP-FLOOD",
                           content: "Habilitar para prevenir el ataque masivo de ICMP (Internet Control Message Protocol - Protocolo de Mensajes de Control de Internet).",
       children: [{                      
                           type: "name",
                           title: "Apagado",
                           content: "Sin protección."
                       } ,{                      
                           type: "name",
                           title: "Bajo",
                           content: "Nivel bajo de protección y bajo impacto en el desempeño del router."
                       } ,{                      
                           type: "name",
                           title: "Medio",
                           content: "Nivel moderado de protección e impacto semi-notable en el desempeño del router."
                       } ,{                      
                           type: "name",
                           title: "Alto",
                           content: "Nivel alto de protección pero un impacto notable en el desempeño del router."
                       }]
} ,{                      
                           type: "name",
                           title: "Filtrado de Ataque de UDP-FLOOD",
                           content: "Habilitar para prevenir el ataque masivo de UDP (User Datagram Protocol - Protocolo de Datagramas de Usuario)."
                       } ,{                      
                           type: "name",
                           title: "Filtrado de Ataque de TCP-SYN-FLOOD",
                           content: "Habilitar para prevenir el ataque masivo de TCP-SYN (Protocolo de Control de Transmisión) - Sincronizar."
                       } ,{                      
                           type: "name",
                           title: "Ignorar el Paquete Ping del Puerto WAN",
                           content: "Habilitar para ignorar paquetes ping desde el puerto WAN."
                       } ,{                      
                           type: "name",
                           title: "Prohibir el Paquete Ping del Puerto LAN",
                           content: "Habilitar para prohibir los paquetes ping desde el puerto LAN."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"La Protección DoS y las Estadísticas de Tráfico deben ser habilitadas al mismo tiempo.",
               CONTENT: [{
                           type: "name",
                           title: "La Protección DoS y las Estadísticas de Tráfico deben ser habilitadas al mismo tiempo.",
                           content: "Lista la Dirección IP y la Dirección MAC desde cualquier fuente de ataque de DoS bloqueada."
                       } ,{                      
                           type: "step",
                           title: "Para borrar una entrada",
                           content: "En la Lista del Host, seleccionar la entrada que desea borrar y dar clic en Borrar arriba de la tabla."
                       }]
},
       YANDEX_DNS :{ 
               TITLE:"Yandex.DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "En esta página puede configurar Yandex. El filtro DNS que protegerá sus dispositivos de sitios web maliciosos y restringirá los sitios web para adultos para los dispositivos de sus niños. Puede configurar un filtro general para todos los dispositivos o un filtro separado para cada dispositivo."
                       } ,{                      
                           type: "paragraph",
                           content: "Por favor visite dns.yandex.ru para conocer más acerca del servicio de Yandex.DNS "
                       } ,{                      
                           type: "name",
                           title: "Habilitar Yandex.DNS para todos los dispositivos",
                           content: "Lista la Dirección IP y la Dirección MAC desde cualquier fuente de ataque de DoS bloqueada."
                       } ,{                      
                           type: "name",
                           title: "Deshabilitado",
                           content: "Esto significa que ningún filtro Yandex.DNS funcionará en todos los dispositivos."
                       } ,{                      
                           type: "name",
                           title: "Básico",
                           content: "Esto significa que el filtro BasicYandex.DNS funcionará en todos los dispositivos."
                       } ,{                      
                           type: "name",
                           title: "Seguro",
                           content: "Esto significa que el filtro SafeYandex.DNS funcionará en todos los dispositivos."
                       } ,{                      
                           type: "name",
                           title: "Niño",
                           content: "Esto significa que el filtro ChildYandex.DNS funcionará en todos los dispositivos."
                       }]
},
       YANDEX_DNS_GRID :{ 
               TITLE:"Reglas de Yandex.DNS para dispositivos especiales",
               CONTENT: [{
                           type: "name",
                           title: "MAC address",
                           content: "Muestra la dirección MAC del dispositivo en la cual funcionará el filtro Yandex.DNS."
                       } ,{                      
                           type: "name",
                           title: "Modo de Control",
                           content: "Muestra el filtro Yandex.DNS seleccionado para el dispositivo especial."
                       } ,{                      
                           type: "name",
                           title: "Descripción",
                           content: "Muestra la descripción del dispositivo para una mejor identificación del dispositivo."
                       } ,{                      
                           type: "paragraph",
                           content: "Para configurar el filtro Yandex.DNS específico para el dispositivo especial dar clic en Agregar. Puede seleccionar el dispositivo de la lista de Escanear o ingresar la dirección MAC manualmente. Seleccione el modo de control especial (básico, seguro, niño) y proporcione una pequeña descripción a la regla."
                       } ,{                      
                           type: "paragraph",
                           content: "Para agregar o borrar la entrada dar clic en Modificar o en el ícono de Papelera de Reciclaje en la tabla."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Control de Acceso",
               CONTENT: [{
                           type: "paragraph",
                           content: "El Control de Acceso se usa para permitir o bloquear el acceso a su red de computadoras específicas y otros dispositivos. Cuando un dispositivo es bloqueado, es incapaz de comunicarse con otros dispositivos o conectarse a Internet."
                       } ,{                      
                           type: "paragraph",
                           content: "Para usar el Control de Acceso, habilitar esta característica y especificar una lista negra o una lista blanca. Si el Control de Acceso está deshabilitado (Apagado), todos los dispositivos incluyendo los que se encuentran en la lista negra, tienen permitido conectarse."
                       }]
},
       ACCESS_MODE :{ 
               TITLE:"Modo de Acceso",
               CONTENT: [{
                           type: "name",
                           title: "Lista Negra",
                           content: "Sólo los dispositivos en la Lista Negra NO tienen permitido tener acceso a su red."
                       } ,{                      
                           type: "name",
                           title: "Lista Blanca",
                           content: "Sólo los dispositivos en la Lista Blanca NO tienen permitido tener acceso a su red."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Dispositivos en Línea",
               CONTENT: [{
                           type: "name",
                           title: "Nombre del dispositivo",
                           content: "Muestra el nombre del dispositivo conectado."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Muestra la dirección IP del dispositivo conectado."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC del dispositivo conectado."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Conexión",
                           content: "Muestra el tipo de conexión del dispositivo conectado."
                       } ,{                      
                           type: "step",
                           title: "Para bloquear un dispositivo",
                           content: "En la tabla de Dispositivos En Línea, dar clic en el icono de Bloquear en la columna de Modificar que corresponda al dispositivo que desea bloquear."
                       } ,{                      
                           type: "step",
                           title: "Para bloquear múltiples dispositivos",
                           content: "En la tabla de Dispositivos en Línea, seleccionar todos los dispositivos que desea bloquear, dar clic en Bloquear arriba de la tabla. El dispositivo se agregará automáticamente a los Dispositivos en la Lista Negra."
                       }]
},
       ACCESS_LIST :{ 
               TITLE:"Dispositivos en la Lista Negra / Lista Blanca",
               CONTENT: [{
                           type: "step",
                           title: "Para poner un dispositivo en la lista negra o en la lista blanca",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Ingresar el Nombre del Dispositivo.",
                "3. Ingresar la dirección MAC del dispositivo.",
                "4. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar un dispositivo en la Lista Negra / Lista Blanca",
                           content: "En la tabla de la Lista Negra / Lista Blanca, dar clic en el ícono de Editar o en el ícono de Papelera de Reciclaje que corresponda al dispositivo que desee modificar o borrar."
                       } ,{                      
                           type: "step",
                           title: "Para borrar múltiples dispositivos en la Lista Negra / Lista Blanca",
                           content: "En la tabla de la Lista Negra / Lista Blanca, seleccionar todos los dispositivos que desee borrar, dar clic en Borrar arriba de la tabla."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"Configuraciones",
               CONTENT: [{
                           type: "paragraph",
                           content: "El Enlace de ARP (Address Resolution Protocol - Protocolo de Resolución de Direcciones) es útil para controlar el acceso de una computadora específica en la LAN mediante el enlace de la dirección IP y la dirección MAC del dispositivo en conjunto. El enlace de ARP también evita que otros dispositivos usen una dirección IP específica."
                       }]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"Lista de ARP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra las direcciones MAC e IP de los dispositivos conectados actualmente."
                       } ,{                      
                           type: "name",
                           title: "Número de Entrada de ARP",
                           content: "Muestra el número total de dispositivos que están conectados actualmente al router."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC del dispositivo conectado."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Muestra la dirección IP asignada al dispositivo conectado."
                       } ,{                      
                           type: "name",
                           title: "Enlazado",
                           content: "Indica si las direcciones MAC e IP están enlazadas o no."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Enlazar o Borrar la entrada correspondiente de la lista."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "No puede enlazar la misma dirección IP a más de una dirección MAC"
                       }]
},
       IPMAC_BIND_LIST :{ 
               TITLE:"Lista de Enlace",
               CONTENT: [{
                           type: "step",
                           title: "Para configurar un dispositivo con el enlace de ARP",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Ingresar la Dirección MAC del dispositivo.",
                "3. Ingresar una Dirección IP que desee enlazar a la dirección MAC de arriba.",
                "4. Ingresar una Descripción para este dispositivo. (Opcional)",
                "5. Seleccionar Habilitar Esta Entrada.",
                "6. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar una entrada",
                           content: "En la Lista de Enlace, dar clic en el ícono de Editar o en el ícono de Papelera de Reciclaje que corresponda a la entrada que desee modificar o borrar."
                       } ,{                      
                           type: "step",
                           title: "Para borrar múltiples entradas",
                           content: "En la Lista de Enlace, seleccionar todas las entradas que desea borrar, dar clic en Borrar arriba de la tabla."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "Seleccionar para habilitar (Activado) o deshabilitar (Desactivado) la característica de IPv6 del router."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: IP Estático"
                       } ,{                      
                           type: "name",
                           title: "IP Estático",
                           content: "Seleccionar este tipo si su ISP usa la asignación de direcciones IPv6 Estático."
                       } ,{                      
                           type: "name",
                           title: "Dirección IPv6/ Puerta de Enlace Predeterminada/ DNS Primario / DNS Secundario",
                           content: "Ingresar estos parámetros según sean proporcionados por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamaño de MTU",
                           content: "El tamaño del MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) típico y predeterminado para la mayoría de las redes Ethernet es 1500 Bytes. No se recomienda cambiar el tamaño del MTU predeterminado a menos que se requiera por el ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: IP Dinámico"
                       } ,{                      
                           type: "name",
                           title: "IP Dinámico",
                           content: "Seleccionar este tipo si su ISP usa la asignación de direcciones IPv6 Dinámico"
                       } ,{                      
                           type: "name",
                           title: "Dirección IPv6 / DNS Primario / DNS Secundario",
                           content: "Estos parámetros son asignados automáticamente por el servidor DHCPv6 de su ISP."
                       } ,{                      
                           type: "name",
                           title: "Renovar",
                           content: "Dar clic en este botón para obtener parámetros nuevos de IPv6 del servidor DHCPv6 del ISP."
                       } ,{                      
                           type: "name",
                           title: "Liberar",
                           content: "Dar clic en este botón para liberar todas las direcciones IPv6 asignadas por servidor DHCPv6 del ISP."
                       } ,{                      
                           type: "name",
                           title: "Obtener Dirección IPv6",
                           content: "Seleccionar DHCPv6 para obtener una dirección IPv6 no temporal o SLAAC para obtener una dirección IPv6 que se genera del paquete de notificación del router, de acuerdo a su ISP."
                       } ,{                      
                           type: "name",
                           title: "Delegación del Prefijo",
                           content: "Seleccionar Habilitar para obtener una delegación del prefijo por medio del Servidor DHCPv6 del ISP, o Deshabilitar para designar un prefijo de dirección de manera manual. Los clientes en la LAN generarán una dirección IPv6 con este prefijo."
                       } ,{                      
                           type: "name",
                           title: "Dirección DNS",
                           content: "Seleccionar para Obtener de manera dinámica del ISP o Usar la siguiente Dirección DNS. Si se selecciona Usar la siguiente Dirección DNS, por favor ingrese de manera manual la dirección DNS proporcionada por su ISP."
                       } ,{                      
                           type: "name",
                           title: "DNS Primario / DNS Secundario",
                           content: "Ingresar estos parámetros de manera manual o dinámica para obtenerlos del ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Seleccionar este tipo si su ISP usa PPPoEv6, y proporciona un nombre de usuario y contraseña."
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar estos parámetros según se proporcionen por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Dirección IPv6",
                           content: "Esta dirección será asignada de manera automática por medio del servidor DHCPv6 del ISP, después que ingrese el nombre de usuario y contraseña y dé clic en Conectar."
                       } ,{                      
                           type: "name",
                           title: "Dirección DNS",
                           content: "Seleccionar para Obtener de manera dinámica del ISP o Usar la siguiente Dirección DNS. Si se selecciona Usar la siguiente Dirección DNS, por favor ingrese de manera manual la dirección DNS proporcionada por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Obtener Dirección IPv6",
                           content: "Seleccionar DHCPv6 para obtener una dirección IPv6 no temporal o SLAAC para obtener una dirección IPv6 que se genera del paquete de notificación del router, o se Especifica por el ISP que se ingrese manualmente la dirección IPv6, de acuerdo a su ISP."
                       } ,{                      
                           type: "name",
                           title: "Delegación del Prefijo",
                           content: "Seleccionar Habilitar para obtener una delegación del prefijo por medio del Servidor DHCPv6 del ISP, o Deshabilitar para designar un prefijo de dirección de manera manual. Los clientes en la LAN generarán una dirección IPv6 con este prefijo."
                       } ,{                      
                           type: "name",
                           title: "Conectar",
                           content: "Dar clic en este botón para conectarse a Internet."
                       } ,{                      
                           type: "name",
                           title: "Desconectar",
                           content: "Dar clic en este botón para desconectarse de Internet."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: Túnel 6to4"
                       } ,{                      
                           type: "name",
                           title: "Túnel 6to4",
                           content: "Seleccionar este tipo si su ISP usa el despliegue de 6to4 para la asignación de dirección."
                       } ,{                      
                           type: "name",
                           title: "Dirección IPv4 / Máscara de Subred de IPv4 / Puerta de Enlace Predeterminada de IPv4 / Dirección de Túnel",
                           content: "Estos parámetros se generarán de manera dinámica por medio de la información de IPv4 en el puerto WAN después de dar clic en Conectar."
                       } ,{                      
                           type: "name",
                           title: "Usar el siguiente Servidor DNS",
                           content: "Seleccionar la casilla de verificación para ingresar de manera manual el DNS primario y/o DNS secundario según se proporcione por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Conectar",
                           content: "Dar clic en este botón para conectarse a Internet."
                       } ,{                      
                           type: "name",
                           title: "Desconectar",
                           content: "Dar clic en este botón para desconectarse de Internet."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: Transferencia (Puente)"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccionar este tipo si su ISP usa el despliegue de la red Transferencia (Puente). No se requiere ninguna configuración para este tipo de conexión."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Excepto para la Transferencia (Puente), los otros 6 tipos de conexión de Internet requieren la configuración de IPv6."
                       } ,{                      
                           type: "name",
                           title: "Tipo Asignado",
                           content: "Seleccionar el adecuado de acuerdo a su ISP.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Para asignar automáticamente las direcciones IP a los clientes en la LAN.",
       children: [{                      
                           type: "name",
                           title: "Prefijo de Dirección",
                           content: "Ingresar el prefijo de la dirección según se proporcione por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Tiempo de concesión",
                           content: "El tiempo de duración en segundos cuando la dirección IP asignada permanece válida. Mantenga el valor predeterminado de 86400 segundos o cámbielo si se requiere por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Dirección",
                           content: "Es la dirección IP asignada automáticamente por el servidor DHCPv6 del ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+Stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "Prefijo de Dirección",
                           content: "Ingresar el prefijo de la dirección según se proporcione por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Dirección",
                           content: "Es la dirección IP asignada automáticamente por el ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Prefijo de Dirección",
                           content: "Ingresar el prefijo de la dirección según se proporcione por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Dirección",
                           content: "Es la dirección IP asignada automáticamente por el ISP."
                       }]
}]
} ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"Clon de MAC",
               CONTENT: [{
                           type: "name",
                           title: "Usar la Dirección MAC Predeterminada",
                           content: "NO cambiar la dirección MAC predeterminada del router, en caso que el ISP no enlace la dirección IP asignada a la dirección MAC."
                       } ,{                      
                           type: "name",
                           title: "Usar la Dirección MAC de la Computadora Actual",
                           content: "Seleccionar para copiar la dirección MAC de la computadora que está conectada al router, en caso que el ISP enlace la dirección IP asignada a la dirección MAC de la computadora."
                       } ,{                      
                           type: "name",
                           title: "Usar la Dirección MAC Personalizada",
                           content: "Ingresar la Dirección MAC manualmente, en caso que el ISP enlace la dirección IP asignada a la dirección MAC específica."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Configuraciones de la Hora",
               CONTENT: [{
                           type: "step",
                           title: "Para sincronizar automáticamente la hora",
       content: [ 
                "1. En el campo de Ajustar la Hora, seleccionar Obtener automáticamente de Internet.",
                "2. Seleccionar su Zona Horaria local del menú desplegable.",
                "3. En el campo de Servidor de NTP I, ingresar la dirección IP o el nombre de dominio de su Servidor NTP deseado.",
                "4. En el campo de Servidor NTP II, ingresar la dirección IP o el nombre de dominio del segundo Servidor NTP. (Opcional)",
                "5. Dar clic en Obtener.",
                "6. Dar clic en Guardar."]
} ,{                      
                           type: "step",
                           title: "Para ajustar manualmente la fecha y la hora",
       content: [ 
                "1. En el campo de Ajustar la Hora, seleccionar Manualmente.",
                "2. Ingresar la Fecha actual.",
                "3. Seleccionar la Hora actual (en formato de reloj de 24 horas, ejemplo, 16:00:00 es 04:00PM).",
                "4. Dar clic en Guardar."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"Horario de Verano",
               CONTENT: [{
                           type: "step",
                           title: "Para configurar el Horario de Verano",
       content: [ 
                "1. Seleccionar Habilitar Horario de Verano.",
                "2. Seleccionar la fecha de Inicio correcta y la hora cuando el horario de verano comience en su zona horaria local.",
                "3. Seleccionar la fecha final correcta y la hora cuando el horario de verano finalice en su zona horaria local.",
                "4. Dar clic en Guardar."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnóstico",
               CONTENT: [{
                           type: "paragraph",
                           content: "El router proporciona las herramientas de Ping y Traceroute para ayudarle a solucionar problemas de conectividad de la red. La herramienta Ping envía paquetes a una Dirección IP o Nombre de Dominio objetivo y registra los resultados, como el número de paquetes enviados y recibidos, y el tiempo de propagación en ambos sentidos. La herramienta de Traceroute envía paquetes a una Dirección IP objetico o Nombre de Dominio y muestra el número de saltos y el tiempo para llegar al destino."
                       } ,{                      
                           type: "paragraph",
                           content: "Puede verificar el ping y traceroute en un dispositivo local por medio de una dirección IP o un nombre de dominio, como google.com, yahoo.com, etc."
                       } ,{                      
                           type: "step",
                           title: "Para diagnosticar usando Ping",
       content: [ 
                "1. Ingresar la Dirección IP o Nombre de Dominio Objetivo.",
                "2. Dar clic en el Ícono de Flecha para abrir el menú de Avanzado y especificar el Conteo de Ping, y el Tamaño del Paquete de Ping. (Opcional)",
                "3. Dar clic en Iniciar."]
} ,{                      
                           type: "step",
                           title: "Para diagnosticar usando Traceroute",
       content: [ 
                "1. Ingresar la Dirección IP o Nombre de Dominio Objetivo.",
                "2. Dar clic en el Ícono de Flecha para abrir el menú de Avanzado y especificar el número de saltos (a ser alcanzados) en el campo de TTL (Time to Live - Tiempo de Vida) Máximo de Traceroute. El valor predeterminado es 20. (Opcional)",
                "3. Dar clic en Iniciar."]
}]
},
       FIRMWARE :{ 
               TITLE:"Actualización del Firmware",
               CONTENT: [{
                           type: "paragraph",
                           content: "Antes de actualizar el firmware del router, necesitará descargar la actualización del firmware más reciente del sitio de Internet <a class=\"link\" href=\"http://www.tp-link.com.mx/Support/\" target=\"_blank\">TP-Link Support</a> a su computadora."
                       } ,{                      
                           type: "step",
                           title: "IMPORTANTE: Para prevenir fallas de actualización, por favor tome en cuenta lo siguiente: ",
       content: [ 
                "Asegúrese que el archivo del firmware más reciente coincida con la versión hardware (como se muestra en la página de Actualización del Firmware).",
                "Asegúrese de tener una conexión estable entre el router y su computadora. NO se recomienda actualizar el firmware inalámbricamente.",
                "Asegúrese de quitar cualquier dispositivo de almacenamiento USB conectado al router antes de la actualización del firmware para evitar la pérdida de información.",
                "Realice una copia de seguridad de la configuración de su router.",
                "NO apague el router durante la actualización del firmware."]
} ,{                      
                           type: "step",
                           title: "Para actualizar el firmware del router",
       content: [ 
                "1. Dar clic en Examinar.",
                "2. Localizar y seleccionar el archivo del firmware descargado.",
                "3. Dar clic en Actualizar."]
} ,{                      
                           type: "paragraph",
                           content: "El proceso de actualización toma unos minutos en completarse. Por favor NO apague el router mientras la actualización está en progreso."
                       }]
},
       BACKUP :{ 
               TITLE:"Copia de Seguridad",
               CONTENT: [{
                           type: "paragraph",
                           content: "Se recomienda ampliamente que haga una copia de seguridad de sus configuraciones actuales en caso de que sea necesaria una recuperación para restaurar el sistema a un estado anterior o a los ajustes predeterminados de fábrica. "
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Crear copia de seguridad para guardar sus configuraciones actuales a su computadora. Asegúrese de guardar el archivo de la copia de seguridad en una ubicación segura de tal manera que pueda recuperar y restaurar el router posteriormente, si es necesario. "
                       }]
},
       RESTORE :{ 
               TITLE:"Restaurar",
               CONTENT: [{
                           type: "step",
                           title: "Para restaurar desde una copia de seguridad",
       content: [ 
                "1. Dar clic en Examinar.",
                "2. Localice y seleccione el archivo de la copia de seguridad.",
                "3. Dar clic en Restaurar."]
}]
},
       FACTORY :{ 
               TITLE:"Restaurar a los Ajustes Predeterminados de Fábrica",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dar clic en Restauración a los Ajustes de Fábrica para restablecer su router a sus configuraciones predeterminadas de fábrica."
                       } ,{                      
                           type: "step",
                           title: "Nota",
       content: [ 
                "1. La Restauración a los Ajustes de Fábrica borrará todas las configuraciones que haya configurado para el router. Para volver a iniciar sesión en la página de administración del router, use admin tanto para el nombre de usuario como para la contraseña.",
                "2. Por favor NO apague el router durante la copia de seguridad o proceso de restauración."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administración de la Cuenta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta página le permite cambiar su nombre de usuario y/o contraseña, y establecer una dirección de correo electrónico para la recuperación de la contraseña."
                       } ,{                      
                           type: "name",
                           title: "Contraseña Anterior",
                           content: "Escriba su contraseña actual."
                       } ,{                      
                           type: "name",
                           title: "Contraseña Nueva",
                           content: "Escriba su contraseña nueva."
                       } ,{                      
                           type: "name",
                           title: "Confirmar Contraseña Nueva",
                           content: "Escriba su contraseña de nuevo."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "If you decide to change the current password used to login to the router, make sure to write down the new login information in a secure location."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Recuperación de Contraseña",
               CONTENT: [{
                           type: "name",
                           title: "Habilitar Recuperación de Contraseña",
                           content: "Se recomienda ampliamente que habilite la característica de Recuperación de la Contraseña, la cual ayudará a restablecer su nombre de usuario y contraseña por medio de correo electrónico."
                       } ,{                      
                           type: "name",
                           title: "Desde",
                           content: "Ingresar la dirección válida de correo electrónico a ser utilizada para el correo electrónico saliente."
                       } ,{                      
                           type: "name",
                           title: "Hasta",
                           content: "Ingresar la dirección válida de correo electrónico a ser utilizada para el correo electrónico entrante."
                       } ,{                      
                           type: "name",
                           title: "Servidor SMTP",
                           content: "Ingresar la dirección del servidor SMTP que el router usa para enviar el código de verificación a través del correo electrónico."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Autenticación",
                           content: "Seleccionar Habilitar Autenticación si el servidor del correo electrónico saliente requiere autenticación para enviar correo electrónico, y llenar el Nombre de Usuario y Contraseña en los campos correspondientes. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       ADMIN_LOCAL :{ 
               TITLE:"Administración Local",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta sección le permite limitar el número de dispositivos de cliente en su LAN que pueden tener acceso al router usando la autenticación basada en la dirección MAC."
                       } ,{                      
                           type: "name",
                           title: "Acceso a Todos los Dispositivos Conectados a la LAN",
                           content: "Activar para habilitar la administración local para todos los dispositivos conectados a la LAN o Desactivar para habilitar la administración para un dispositivo específico."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC del dispositivo de acceso limitado."
                       } ,{                      
                           type: "name",
                           title: "Descripción",
                           content: "Muestra la descripción del dispositivo de acceso limitado."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual del dispositivo de acceso limitado (habilitado o deshabilitado)."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Modificar y Borrar el dispositivo correspondiente de la lista."
                       } ,{                      
                           type: "step",
                           title: "Para agregar un dispositivo de cliente a la lista",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Dar clic en Ver Dispositivos Existentes para seleccionar un dispositivo existente o ingresar la dirección MAC de un dispositivo en el campo de Dirección MAC.",
                "3. Ingresar una Descripción para el dispositivo.",
                "4. Seleccionar Habilitar Esta Entrada.",
                "5. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar un dispositivo en la lista",
                           content: "En la tabla, dar clic en el ícono de Editar o en el ícono de Papelera de Reciclaje que corresponda al dispositivo que desee modificar o borrar."
                       } ,{                      
                           type: "step",
                           title: "Para borrar múltiples dispositivos",
                           content: "Seleccionar todos los dispositivos que desee borrar, dar clic en Borrar."
                       }]
},
       ADMIN_REMOTE :{ 
               TITLE:"Administración Remota",
               CONTENT: [{
                           type: "paragraph",
                           content: "La característica de Administración Remota le permite acceder y configurar el router de manera remota desde Internet."
                       } ,{                      
                           type: "name",
                           title: "Deshabilitar la Administración Remota ",
                           content: "Seleccionar esta opción para habilitar la administración remota."
                       } ,{                      
                           type: "name",
                           title: "Habilitar la Administración Remota para Todos los Dispositivos",
                           content: "Seleccionar esta opción para habilitar la administración remota para todas las direcciones IP. Si se selecciona, ingresar el campo del Puerto de Administración a Través de Internet. "
                       } ,{                      
                           type: "name",
                           title: "Habilitar la Administración Remota para los Dispositivos Especificados",
                           content: "Seleccionar esta opción para habilitar la administración remota para una dirección IP específica. Si se selecciona, ingresar los campos del Puerto de Administración a Través de Internet y de la Dirección IP de la Administración Remota."
                       } ,{                      
                           type: "name",
                           title: "Puerto de Administración A Través de Internet",
                           content: "Ingresar el número de puerto a ser usado para acceder a la interfaz de administración a través de Internet del router con mayor seguridad entre 1024 y 65535. Normalmente, los navegadores de Internet usan puerto de servicio HTTP estándar 80. El puerto de servicio común y predeterminado es 8080, el cual es un puerto de servicio alternativo del HTTP."
                       } ,{                      
                           type: "name",
                           title: "Administración Remota Dirección IP",
                           content: "Ingresar una dirección IP válida o rango de IP para permitir el acceso al router."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SYSTEM_LOG :{ 
               TITLE:"Registro del Sistema",
               CONTENT: [{
                           type: "paragraph",
                           content: "La página de Registro del Sistema muestra una lista de las actividades (eventos) más recientes del router. Puede definir qué tipos de registros y/o el nivel de registros que desea ver. Esta página también cuenta con la característica de correo electrónico que puede configurar para enviar de manera automática los archivos del registro a una dirección específica de correo electrónico, o exportar los archivos del registro a una computadora."
                       } ,{                      
                           type: "name",
                           title: "Tipo",
                           content: "Seleccionar el tipo de registro del sistema a mostrar."
                       } ,{                      
                           type: "name",
                           title: "Nivel",
                           content: "Seleccionar el nivel del registro del sistema a mostrar. "
                       } ,{                      
                           type: "name",
                           title: "Actualizar",
                           content: "Dar clic en este icono para actualizar el registro del sistema."
                       } ,{                      
                           type: "name",
                           title: "Borrar Todo",
                           content: "Dar clic en este icono para borrar todos los registros del sistema. "
                       } ,{                      
                           type: "name",
                           title: "Guardar Registro",
                           content: "Dar clic en este botón para descargar todos los registros del sistema a su computadora local. "
                       } ,{                      
                           type: "name",
                           title: "Configuraciones del Correo",
                           content: "Dar clic en este botón para configurar las configuraciones del correo electrónico para los registros del sistema."
                       } ,{                      
                           type: "step",
                           title: "Para configurar las configuraciones del correo electrónico para los registros del sistema",
       content: [ 
                "1. Dar clic en Configuraciones del Correo.",
                "2. De - Ingresar la dirección válida de correo electrónico a ser utilizada para el correo electrónico saliente.",
                "3. Para - Ingresar la dirección válida de correo electrónico a ser utilizada para el correo electrónico entrante.",
                "4. SMTP Server - Ingresar la dirección del servidor SMTP que el router usa para enviar el código de verificación a través del correo electrónico." ,
{                      
                           content: "5. Habilitar Autenticación - Seleccionar esta opción si el servidor SMTP requiere autenticación para enviar el correo electrónico.",
       children: [{                      
                           type: "name",
                           title: "Nombre de Usuario",
                           content: "Ingresar el nombre de usuario para el servidor SMTP. Este campo hace distinción entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Ingresar la contraseña para el servidor SMTP. Este campo también hace distinción entre mayúsculas y minúsculas."
                       }]
} ,
{                      
                           content: "6. Habilitar Correo Automático - Seleccionar esta opción para especificar qué hora del día el registro del sistema debe ser enviado automáticamente.",
       children: [{                      
                           type: "paragraph",
                           content: "Para enviar el registro del sistema todos los días a una hora específica, ingresar las Horas (HH) y Minutos (MM) en el formato de reloj de 24 horas, ejemplo, 16:00 es 4PM."
                       } ,{                      
                           type: "paragraph",
                           content: "Para enviar el registro del sistema a una hora específica o intervalo de tiempo, ingresar el número de horas."
                       }]
},
                "7. Dar clic en Guardar."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Estadísticas de Tráfico",
               CONTENT: [{
                           type: "paragraph",
                           content: "La página de Estadísticas de Tráfico muestra el tráfico de la red de los paquetes enviados y recibidos de la LAN, WAN, y WLAN."
                       } ,{                      
                           type: "name",
                           title: "Estadísticas de Tráfico",
                           content: "Activar para mostrar la información de estadística."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Lista de Estadísticas de Tráfico",
               CONTENT: [{
                           type: "name",
                           title: "Dirección IP/Dirección MAC",
                           content: "Muestra la dirección IP y la dirección MAC del dispositivo cliente asociado."
                       } ,{                      
                           type: "name",
                           title: "Paquetes Totales",
                           content: "Muestra el número total de paquetes recibidos y transmitidos por el dispositivo del cliente desde el comienzo de la sesión o de la última reinicialización del contador."
                       } ,{                      
                           type: "name",
                           title: "Bytes Totales",
                           content: "Muestra el número total de bytes recibidos y transmitidos por el dispositivo del cliente desde el comienzo de la sesión o de la última reinicialización del contador."
                       } ,{                      
                           type: "name",
                           title: "Paquetes Actuales",
                           content: "Muestra el número actual de paquetes recibidos y transmitidos en un intervalo de tiempo específico. "
                       } ,{                      
                           type: "name",
                           title: "Bytes Actuales",
                           content: "Muestra el número actual de bytes recibidos y transmitidos en un intervalo de tiempo específico. "
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Restablecer (a cero) y Borrar las estadísticas correspondientes de la lista."
                       } ,{                      
                           type: "name",
                           title: "Actualizar",
                           content: "Dar clic para actualizar la información estadísticas en la página."
                       } ,{                      
                           type: "name",
                           title: "Restablecer Todo",
                           content: "Dar clic para restablecer todos los valores estadísticos en la lista a cero."
                       } ,{                      
                           type: "name",
                           title: "Borrar Todo",
                           content: "Dar clic para borrar toda la información estadística en la lista."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Inalámbrico de 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Intervalo de Baliza",
                           content: "Ingresar un valor entre 40 y 1000 en milisegundos para determinar la duración entre los paquetes de balizas que son transmitidos por el router para sincronizar la red inalámbrica. El valor predeterminado es 100 milisegundos."
                       } ,{                      
                           type: "name",
                           title: "Umbral de RTS",
                           content: "Ingresar un valor entre 1 y 2346 para determinar el tamaño del paquete de la transmisión de datos a través del router. De manera predeterminada, el tamaño del Umbral RTS (Request to Send - Petición de Envío) es 2346. Si el tamaño del paquete es mayor que el umbral preestablecido, el router envía tramas de Petición de Envío a una estación de recepción particular y negocia el envío de una trama de datos, o de otro modo el paquete será enviado inmediatamente."
                       } ,{                      
                           type: "name",
                           title: "Intervalo de DTIM",
                           content: "Este valor determina el intervalo de DTIM (Delivery Traffic Indication Message - Mensaje Indicativo de Tráfico de Entrega). Ingresar un valor entre 1 y 15 intervalos de baliza. El valor predeterminado es 1, indica que el intervalo de DTIM es el mismo que el Intervalo de Baliza."
                       } ,{                      
                           type: "name",
                           title: "Periodo de Actualización de la Clave de Grupo",
                           content: "Ingresar el número de segundos (mínimo 30) para controlar el intervalo de tiempo para la renovación automática de la clave de encriptación. El valor predeterminado es 0, indicando ninguna renovación de la clave."
                       } ,{                      
                           type: "name",
                           title: "Característica de WMM",
                           content: "La función de WMM garantiza que los paquetes con mensajes de alta prioridad sean transmitidos preferencialmente. Está habilitado de manera predeterminada y se recomienda ampliamente."
                       } ,{                      
                           type: "name",
                           title: "Característica de GI Corto ",
                           content: "Esta función está habilitada de manera predeterminada y se recomienda incrementar la capacidad de datos reduciendo el tiempo de GI (Guard Interval - Intervalo de Seguridad)."
                       } ,{                      
                           type: "name",
                           title: "Característica de Aislamiento del AP",
                           content: "Si desea limitar y restringir que todos los dispositivos inalámbricos conectados a su red interactúen entre sí, pero aún puedan acceder a Internet, seleccione la casilla de verificación de Habilitar Aislamiento de AP. "
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"WDS de 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Habilitar Conexión en Puente de WDS",
                           content: "Habilitar la característica de Conexión en Puente de WDS (Wireless Distribution System - Sistema de Distribución Inalámbrico) para permitir que el router se una con otro punto de acceso (AP) en la red del área local inalámbrica (WLAN). Si se habilita esta característica, configurar lo siguiente: "
                       } ,{                      
                           type: "name",
                           title: "SSID (para ser conectado en puente)",
                           content: "Ingresar el SSID del WAP (Wireless Access Point - Punto de Acceso Inalámbrico) al que su router se conectará como cliente o use la característica de Examinar para encontrar todas las redes disponibles."
                       } ,{                      
                           type: "name",
                           title: "Examinar",
                           content: "Dar clic en este botón para escanear y mostrar el SSID, BSSID, potencia de la señal, canal e información de seguridad de todas las redes inalámbricas disponibles dentro del rango. Una vez que seleccione una red, el SSID, Dirección MAC, y Seguridad se alimentarán automáticamente."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC (para ser conectado en puente)",
                           content: "Ingresar la dirección MAC (BSSID) en formato de 12 caracteres hexadecimales (0-9, a-f, A-F) separado por guiones del punto de acceso inalámbrico al que el router se conectará como cliente. Si selecciona el AP deseado a través de la característica de Examinar, el campo de dirección MAC es alimentado automáticamente. "
                       } ,{                      
                           type: "name",
                           title: "Modo WDS",
                           content: "Seleccionar el modo de WDS, Auto, WDS1 o WDS2."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Seleccionar el tipo correcto de seguridad del punto de acceso seleccionado, No, WPA-PSK/WPA2-PSK o WEP. Si selecciona el AP deseado a través de la característica de Examinar, el campo de Seguridad es alimentado automáticamente.",
       children: [{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Esta opción está disponible cuando el tipo de seguridad es WPA-PSK/WPA2-PSK o WEP. Ingresar la contraseña de seguridad del punto de acceso seleccionado."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Autenticación",
                           content: "Esta opción sólo está disponible cuando el tipo de seguridad es WEP (Wired Equivalent Privacy - Privacidad Equivalente al Cableado). Seleccionar el tipo de autenticación adecuado (Auto, Sistema Abierto o Clave Compartida) usado del punto de acceso seleccionado."
                       } ,{                      
                           type: "name",
                           title: "Formato de Clave WEP",
                           content: "Esta opción sólo está disponible cuando el tipo de seguridad es WEP. Seleccionar el formato clave (ASCII o Hexadecimal) usado del AP seleccionado."
                       }]
} ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Seleccionar Habilitar la casilla de verificación de WPS y dar clic en Guardar para habilitar la función de WPS (Wi-Fi Protected Setup) que le permite configurar fácilmente y conectar los dispositivos con WPS habilitado presionando el botón WPS."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"NAT",
               CONTENT: [{
                           type: "name",
                           title: "NAT",
                           content: "Seleccionar la casilla de verificación de Habilitar NAT y dar clic en Guardar para habilitar la función de NAT (Network Address Translation - Traducción de Direcciones de Red)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Cuando NAT está deshabilitado, el reenvío de NAT no tomará efecto, ni de NAT Boost."
                       } ,{                      
                           type: "name",
                           title: "Acelerador NAT",
                           content: "Seleccionar la casilla de verificación de Habilitar NAT Boost y dar clic en Guardar para asegurar que su router tenga un mejor rendimiento."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Cuando NAT Boost está habilitado, las Estadísticas de Tráfico y QoS se deshabilitarán automáticamente."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"Configuración del Nivel de Protección DoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "El Nivel de Protección de DoS protege al router de ataques de INUNDACIÓN DE ICMP, INUNDACIÓN DE UDP, e INUNDACIÓN DE TCP."
                       } ,{                      
                           type: "name",
                           title: "Nivel de Paquetes de INUNDACIÓN ICMP",
                           content: "Ingresar un valor entre 5 y 7200 paquetes de ICMP para activar la protección de INUNDACIÓN DE ICMP inmediatamente cuando el número de paquetes excede el valor del umbral preestablecido."
                       } ,{                      
                           type: "name",
                           title: "Nivel de Paquetes de INUNDACIÓN UDP",
                           content: "Ingresar un valor entre 5 y 7200 paquetes de UDP para activar la protección de INUNDACIÓN DE UDP inmediatamente cuando el número de paquetes excede el valor del umbral preestablecido."
                       } ,{                      
                           type: "name",
                           title: "Nivel de Paquetes de INUNDACIÓN TCP",
                           content: "Ingresar un valor entre 5 y 7200 paquetes de TCP-SYN para activar la protección de INUNDACIÓN DE TCP-SYN inmediatamente cuando el número de paquetes excede el valor del umbral preestablecido."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"Dúplex",
               CONTENT: [{
                           type: "name",
                           title: "Dúplex",
                           content: "Seleccionar el tipo dúplex de la lista desplegable."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"Control de LED ",
               CONTENT: [{
                           type: "name",
                           title: "Habilitar el Modo Nocturno",
                           content: "Seleccionar esta casilla de verificación para apagar los LEDs durante el Periodo de Modo Nocturno sin afectar el desempeño del router."
                       } ,{                      
                           type: "name",
                           title: "Periodo de Modo Nocturno",
                           content: "Especificar un periodo de tiempo durante el cual aplique el modo nocturno."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       SYSTEM_DEBUG_MODE :{ 
               TITLE:"Registro del sistema",
               CONTENT: [{
                           type: "name",
                           title: "Modo de Depuración",
                           content: "Habilitar para ver el registro del estado anormal del router, por favor use esta opción sólo para depurar bajo la guía de nuestro Soporte Técnico."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"Abrir VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con VPN, puede usar Internet para tener acceso de manera segura a su red cuando está fuera de casa. Para usar el Servicio de VPN, necesita configurar el Servicio de DNS Dinámico (recomendado) o asignar una dirección IP estática para el puerto WAN del router. Y su Tiempo del Sistema debe ser sincronizado con Internet."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el Servidor VPN",
                           content: "Seleccionar para habilitar el Servidor de VPN Abierto."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Servicio",
                           content: "Seleccionar el protocolo de comunicación para el servidor de VPN Abierto: UDP o TCP."
                       } ,{                      
                           type: "name",
                           title: "Puerto de Servicio",
                           content: "Ingresar un número de puerto de comunicación entre 1024 y 65535. El puerto de servicio común y predeterminado es 1194."
                       } ,{                      
                           type: "name",
                           title: "Subred / Máscara de Red VPN",
                           content: "Ingresar el rango de direcciones IP que pueden ser arrendadas para los clientes por medio del servidor de VPN Abierto."
                       } ,{                      
                           type: "name",
                           title: "Acceso a Clientes",
                           content: "Seleccionar el tipo de acceso para su cliente de VPN Abierto.",
       children: [{                      
                           type: "name",
                           title: "Red Doméstica Únicamente",
                           content: "Los clientes sólo pueden tener acceso a la red doméstica. La ruta predeterminada del cliente no cambiará. "
                       } ,{                      
                           type: "name",
                           title: "Red Doméstica e Internet",
                           content: "Los cliente4s pueden tener acceso a la red doméstica, y a los sitios de Internet o servicios con una limitación geográfica cuando está fuera del país. La ruta predeterminada del cliente se modificará."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certificado",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Usar el certificado para la información e identificación de la conexión de VPN para clientes remotos.",
                "Dar clic para generar un certificado nuevo."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Archivo de Configuración",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Los clientes remotos usarán el archivo de configuración para tener acceso a su router.",
                "Dar clic para guardar el archivo de configuración de VPN Abierto."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Guía de Instalación de Clientes VPN",
               CONTENT: [{
                           type: "step",
                           title: "Para conectar sus dispositivos de cliente al servidor de VPN Abierto:",
       content: [{                      
                           type: "paragraph",
                           content: "Configurar los parámetros del servidor VPN abierto (Tipo de Servicio, Puerto de Servicio y Acceso a Clientes) y dar clic en Guardar. Y asegúrese que su Puerto Externo de las configuraciones de NAT no sea el puerto de servicio y el DMZ esté deshabilitado."
                       },
                "1. Seleccionar Habilitar el Servidor VPN.",
                "2. Configurar los parámetros del servidor de VPN (Tipo de Servicio, Puerto de Servicio, Acceso a Clientes y Subred / Máscara de Red de VPN) and dar clic en Guardar.",
                "3. Dar clic en Exportar para guardar el archivo de configuración.",
                "4. En sus dispositivos de cliente, descargue e instale la utilidad de cliente de VPN Abierto desde <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "Las plataformas oficiales soportadas incluyen Windows, Mac OSX, Linux.",
                "5. Ejecutar la utilidad del cliente de VPN Abierto y agregar una conexión nueva de VPN usando el archivo de configuración guardado para conectar su dispositivo cliente al servidor VPN."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Para aprender más acerca de los clientes de VPN Abierto, visite <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con PPTP VPN, puede usar Internet para tener acceso a su red de manera fácil y rápida cuando está fuera de casa. Puede ser impedido por algunos ISPs. Para usar el Servicio de VPN, necesita configurar el Servicio de DNS Dinámico (recomendado) o asignar una dirección IP estática para el puerto WAN del router. Y su Tiempo del Sistema debe ser sincronizado con Internet."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el Servidor VPN",
                           content: "Seleccionar para habilitar el Servidor de PPTP VPN."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP del Cliente",
                           content: "Ingresar el rango de direcciones IP (hasta 10 clientes) que pueden ser arrendadas para los clientes por medio del servidor de PPTP VPN."
                       } ,{                      
                           type: "name",
                           title: "Permitir el acceso a Samba (Sitio de Red)",
                           content: "Seleccionar para permitir que su cliente VPN tenga acceso a su servidor local de Samba."
                       } ,{                      
                           type: "name",
                           title: "Permitir la transferencia de NetBIOS",
                           content: "Seleccionar para permitir que su cliente VPN tenga acceso a su servidor de Samba usando el nombre de NetBIOS."
                       } ,{                      
                           type: "name",
                           title: "Permitir conexiones no encriptadas ",
                           content: "Seleccionar para permitir conexiones no encriptadas a su servidor VPN."
                       }]
},
       PPTP_ACCOUNT_LIST :{ 
               TITLE:"Lista de Cuentas",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra las cuentas que pueden ser usadas para conectarse al servidor de PPTP VPN por medio de clientes remotos."
                       } ,{                      
                           type: "step",
                           title: "Para agregar una cuenta de PPTP VPN",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Introduzca el nombre de usuario y contraseña para la autenticación de clientes del servidor PPTP VPN.",
                "3. Dar clic en OK."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar una cuenta existente",
                           content: "En la tabla, dar clic en el ícono de Editar o en el ícono de Papelera de Reciclaje que corresponda a la cuenta que desee modificar o borrar."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Guía de Instalación de Clientes VPN",
               CONTENT: [{
                           type: "step",
                           title: "Para conectar sus dispositivos de cliente al servidor de PPTP VPN:",
       content: [{                      
                           type: "paragraph",
                           content: "Antes de configurar el servidor de PPTP VPN, por favor configure el Servicio de DNS Dinámico (recomendado) o asigne una dirección IP estática para el puerto WAN. Por favor asegúrese que su puerto externo de las configuraciones de NAT no sea 1723 y que su Tiempo del Sistema esté sincronizado con Internet."
                       },
                "1. Seleccionar Habilitar el Servidor VPN.",
                "2. Configurar los parámetros del servidor de PPTP VPN y dar clic en Guardar.",
                "3. En sus dispositivos de cliente, crear una conexión de PPTP. Las plataformas oficiales soportadas incluyen Windows, Mac OSX, Linux, iOS, y Android.",
                "4. Ejecutar el programa de PPTP VPN, agregar una conexión nueva e ingresar el nombre de dominio del servicio de DDNS registrado o la dirección IP estática que se asignó al puerto de WAN, para conectar su dispositivo de cliente al servidor de PPTP VPN."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"Conexiones VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta página muestra los clientes que están conectados actualmente a los servidores de VPN Abierto y PPTP VPN alojados en el router."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en el ícono de Menos para desconectar el cliente correspondiente."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "Estado de Internet",
                           content: "Muestra el estado actual de la conexión de Internet del router."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Conexión",
                           content: "Muestra el tipo de conexión de Internet."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Muestra la dirección IP de Internet actual asignada al router."
                       } ,{                      
                           type: "name",
                           title: "Conexión Secundaria / Dirección IP",
                           content: "Muestra el tipo de la conexión secundaria y la dirección IP."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router ",
               CONTENT: [{
                           type: "title",
                            title: "Inalámbrico de 2.4GHz/5GHz"
                       } ,{                      
                           type: "name",
                           title: "SSID",
                           content: "Muestra el nombre de la red inalámbrica actual de la frecuencia de banda de 2.4GHz/5GHz."
                       } ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Muestra el canal del cual transmite la red inalámbrica de 2.4GHz/5GHz."
                       } ,{                      
                           type: "name",
                           title: "MAC",
                           content: "Muestra la dirección MAC actual del inalámbrico de 2.4GHz/5GHz."
                       } ,{                      
                           type: "title",
                            title: "Red para Invitados de 2.4GHz/5GHz"
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra si la Red para Invitados inalámbrica de 2.4GHz/5GHz está encendida (habilitada) o apagada (deshabilitada)."
                       } ,{                      
                           type: "name",
                           title: "SSID",
                           content: "Muestra el nombre de la red inalámbrica de la Red para Invitados."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Clientes Inalámbricos / Conectados por Cable",
               CONTENT: [{
                           type: "name",
                           title: "Nombre",
                           content: "Muestra el nombre del cliente conectado al router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Muestra la dirección IP asignada del cliente."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC del cliente."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Impresora",
               CONTENT: [{
                           type: "name",
                           title: "Nombre",
                           content: "Muestra el nombre de la impresora conectada al router por medio del puerto USB."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"Disco USB",
               CONTENT: [{
                           type: "name",
                           title: "Disco USB",
                           content: "Muestra el nombre del disco USB conectado al router."
                       } ,{                      
                           type: "name",
                           title: "Totales",
                           content: "Muestra la capacidad de almacenamiento total del dispositivo de almacenamiento USB conectado. "
                       } ,{                      
                           type: "name",
                           title: "Disponible",
                           content: "Muestra la capacidad de almacenamiento disponible del dispositivo de almacenamiento USB conectado. "
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           id: "auto_detect_button",
                           title: "Detección Automática",
                           content: "Dar clic en este botón para hacer que el router detecte automáticamente su tipo de conexión de Internet actual."
                       } ,{                      
                           type: "note",
                           id: "auto_detect_note",
                           title: "Nota",
                           content: "Si no está seguro qué tipo de conexión de Internet tiene, use la función de Detección Automática o contacte a su ISP para obtener asistencia."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: IP Estático"
                       } ,{                      
                           type: "name",
                           title: "Dirección IP / Máscara de Subred / Puerta de Enlace Predeterminada / DNS Primario / DNS Secundario",
                           content: "Ingresar la información proporcionada por su ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: IP Dinámico"
                       } ,{                      
                           type: "name",
                           title: "No Clonar la Dirección MAC/ Clonar la Dirección MAC Actual de la Computadora",
                           content: "Seleccionar si clona la dirección MAC o no, de acuerdo a su ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar el nombre de usuario y la contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión de Internet: L2TP/PPTP"
                       } ,{                      
                           type: "name",
                           title: "Nombre de Usuario / Contraseña",
                           content: "Ingresar el nombre de usuario y la contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Conexión Secundaria (IP Dinámico o IP Estático)",
       children: [{                      
                           type: "name",
                           title: "IP Dinámico",
                           content: "Seleccionar si la dirección IP y la máscara de subred son asignadas automáticamente por el ISP."
                       } ,{                      
                           type: "name",
                           title: "IP Estático",
                           content: "Seleccionar si la dirección IP and máscara de subred son proporcionados por el ISP, e ingresar esta información en los campos correspondientes."
                       }]
} ,{                      
                           type: "name",
                           title: "IP del Servidor VPN/Nombre de Dominio",
                           content: "Ingresar la dirección IP del servidor VPN o nombre de dominio proporcionados por su ISP."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Configuraciones Inalámbricas",
               CONTENT: [{
                           type: "name",
                           title: "Habilitar la Radio Inalámbrica",
                           content: "Seleccionar esta casilla de verificación para habilitar la frecuencia de la radio inalámbrica de 2.4GHz/5GHz."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Red (SSID)",
                           content: "Puede dejar el nombre de la red inalámbrica (SSID) como está, o crear un nombre nuevo (hasta 32 caracteres). Este campo hace distinción entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccionar esta casilla de verificación si desea ocultar el nombre de la red (SSID) de 2.4GHz/5GHz de la lista de redes Wi-Fi."
                       } ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Ingresar una contraseña del inalámbrico entre 8 y 63 caracteres ASCII o entre 8 y 64 caracteres hexadecimales. Este campo hace distinción entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"Configuraciones del Dispositivo",
               CONTENT: [{
                           type: "paragraph",
                           content: "La página de Configuraciones del Dispositivo muestra la información relacionada de cualquier dispositivo de almacenamiento USB conectado mediante el puerto USB."
                       } ,{                      
                           type: "name",
                           title: "Escanear",
                           content: "Generalmente el router detecta automáticamente cualquier dispositivo recién conectado. De lo contrario, dar clic en este botón para buscar y actualizar la página con la información actualizada. "
                       } ,{                      
                           type: "name",
                           title: "Volumen",
                           content: "Muestra el nombre del volumen USB."
                       } ,{                      
                           type: "name",
                           title: "Capacidad",
                           content: "Muestra la capacidad total de almacenamiento del USB."
                       } ,{                      
                           type: "name",
                           title: "Espacio Libre",
                           content: "Muestra el espacio de almacenamiento libre disponible actual."
                       } ,{                      
                           type: "name",
                           title: "Remover de Manera Segura",
                           content: "Dar clic en este botón para retirar de manera segura el dispositivo de almacenamiento USB antes de desconectarlo físicamente del router.",
       children: [{                      
                           type: "paragraph",
                           content: "Por favor tome en cuenta que el botón de Retirar de Manera Segura sólo aparece cuando hay un dispositivo de almacenamiento USB conectado al router, y no podrá retirar el dispositivo USB mientras el volumen actual está ocupado."
                       }]
} ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Esta tabla sólo aparece cuando hay un dispositivo de almacenamiento USB conectado al router. Seleccionar para habilitar el uso compartido de archivos del dispositivo USB."
                       }]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Configuraciones de Uso Compartido",
               CONTENT: [{
                           type: "name",
                           title: "Nombre de la Red/Servidor Multimedia",
                           content: "Muestra el nombre usado para acceder dispositivo de almacenamiento USB conectado."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Uso Compartido de Carpetas",
               CONTENT: [{
                           type: "name",
                           title: "Compartir Todas",
                           content: "Activar para compartir todos los archivos y carpetas o Desactivar para sólo compartir las carpetas seleccionadas. "
                       } ,{                      
                           type: "name",
                           title: "Habilitar Autenticación",
                           content: "Se recomienda ampliamente habilitar la autenticación para requerir que los usuarios ingresen un nombre de usuario y contraseña válidos para tener acceso a las carpetas compartidas"
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Carpeta",
                           content: "Muestra el nombre de la carpeta compartida."
                       } ,{                      
                           type: "name",
                           title: "Ruta de la Carpeta",
                           content: "Muestra la ruta hacia la carpeta compartida."
                       } ,{                      
                           type: "name",
                           title: "Uso Compartido de Multimedia",
                           content: "Indica si la carpeta compartida permite el uso compartido de multimedia o no."
                       } ,{                      
                           type: "name",
                           title: "Nombre del Volumen",
                           content: "Muestra el nombre del volumen compartido."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado de la carpeta compartida mediante el indicador de foco."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Modificar o Borrar la carpeta compartida correspondiente."
                       } ,{                      
                           type: "name",
                           title: "Agregar ",
                           content: "Dar clic en este botón para crear una entrada nueva."
                       } ,{                      
                           type: "name",
                           title: "Borrar",
                           content: "Dar clic en este botón para eliminar la entrada seleccionada de la tabla."
                       } ,{                      
                           type: "name",
                           title: "Explorar",
                           content: "Dar clic en buscar una carpeta de uso compartido."
                       } ,{                      
                           type: "name",
                           title: "Permitir el Acceso a la Red para Invitados",
                           content: "Seleccionar para permitir que los clientes en la Red para Invitados tengan acceso a las carpetas de uso compartido."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Autenticación",
                           content: "Seleccionar para requerir que los usuarios tengan acceso a las carpetas de uso compartido con un nombre de usuario y contraseña válidos."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el Acceso de Escritura",
                           content: "Seleccionar para permitir que los usuarios realicen cambios al contenido de la carpeta."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el Uso Compartido de Multimedia",
                           content: "Seleccionar para habilitar el uso compartido de multimedia."
                       } ,{                      
                           type: "name",
                           title: "Actualizar",
                           content: "Dar clic para actualizar la lista de la carpeta de uso compartido."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Servidor de impresión",
               CONTENT: [{
                           type: "name",
                           title: "Servidor de impresión",
                           content: "Activar para habilitar la función del servidor de impresión."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Impresora",
                           content: "Muestra el nombre de su impresora conectada al router."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Controles Parentales",
               CONTENT: [{
                           type: "name",
                           title: "Controles Parentales",
                           content: "Activar para habilitar la característica de Controles Parentales. De manera predeterminada, esta característica está deshabilitada."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Dispositivos Bajo el Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la lista de dispositivos bajo Controles Parentales."
                       } ,{                      
                           type: "name",
                           title: "Nombre del dispositivo",
                           content: "Muestra el nombre de todos los dispositivos de cliente conectados que están actualmente bajo los Controles Parentales."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC de todos los dispositivos de cliente conectados que están actualmente bajo los Controles Parentales."
                       } ,{                      
                           type: "name",
                           title: "Tiempo de Acceso a Internet",
                           content: "Muestra los periodos de tiempo de acceso de restricción. El horario de tiempo toma efecto basándose en el tiempo del sistema del router que puede ser ajustado en \"Herramientas del Sistema -> Configuración del Tiempo\"."
                       } ,{                      
                           type: "name",
                           title: "Descripción",
                           content: "Muestra una descripción breve del dispositivo conectado. Esta es una configuración opcional."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual (habilitado o deshabilitado) de los Controles Parentales del dispositivo correspondiente."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones para Modificar o Borrar el dispositivo correspondiente."
                       } ,{                      
                           type: "step",
                           title: "Para restringir un dispositivo de cliente nuevo",
       content: [ 
                "1. Dar clic en Agregar.",
                "2. Dar clic en Ver Dispositivos Existentes y seleccionar un dispositivo conectado actualmente desde la Lista de Dispositivos de Acceso; o ingresar el Nombre del Dispositivo y la Dirección MAC manualmente para agregar un dispositivo que no esté conectado.",
                "3. Dar clic en el icono de Tiempo de Acceso a Internet para especificar un periodo de tiempo durante el cual aplique la restricción.",
                "4. Ingresar una descripción breve en el campo de Descripción. (Opcional)",
                "5. Seleccionar Habilitar Esta Entrada.",
                "6. Dar clic en OK."]
} ,{                      
                           type: "paragraph",
                           content: "Para modificar o borrar una entrada de Control Parental, simplemente dar clic en el icono de Editar para editar la información o en el ícono de Papelera de Reciclaje para quitar la entrada correspondiente."
                       } ,{                      
                           type: "paragraph",
                           content: "Para borrar múltiples entradas, seleccionar todas las entradas y dar clic en Borrar arriba de la tabla."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Red para Invitados",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Red para Invitados le permite configurar una red inalámbrica separada con un nombre de red (SSID) y contraseña separados que sus invitados pueden usar para tener acceso a su red inalámbrica."
                       } ,{                      
                           type: "name",
                           title: "Permitir que los invitados se vean entre sí",
                           content: "Seleccionar esta casilla de verificación para permitir que los dispositivos inalámbricos en la Red para Invitados se vean entre sí."
                       } ,{                      
                           type: "name",
                           title: "Permitir que los invitados tengan acceso a mi red local",
                           content: "Seleccionar esta casilla de verificación para permitir que los dispositivos inalámbricos en la Red para Invitados tengan acceso a las impresoras de la red local."
                       } ,{                      
                           type: "name",
                           title: "Habilitar la Red para Invitados",
                           content: "Seleccionar esta casilla de verificación para habilitar la característica de la Red para Invitados."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Red (SSID)",
                           content: "Usar la opción predeterminada de SSID de Invitado o crear un nombre nuevo (hasta 32 caracteres)."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccionar esta casilla de verificación si desea ocultar el SSID de Invitado de la lista de la red Wi-Fi."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Intervalo de Actualización de la Contraseña",
                           content: "Seleccionar el intervalo de actualización de su contraseña de la Red para Invitados."
                       } ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Usar la contraseña generada de manera aleatoria, o crear una contraseña entre 8 y 63 caracteres ASCII o entre 8 y 64 caracteres hexadecimales (0-9, a-f, A-F)."
                       } ,{                      
                           type: "paragraph",
                           content: "Dar clic en Guardar para guardar todas sus configuraciones"
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"Nube de TP-Link",
               CONTENT: [{
                           type: "paragraph",
                           content: "El servicio de Nube de TP-Link le permite monitorear su red en tiempo real, acceder y administrar sus dispositivos a través de Internet y proporciona otras características avanzadas cuando se encuentra lejos. Se recomienda ampliamente que inicie sesión y vincule su cuenta de la nube a los dispositivos de su nube."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Información de la cuenta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información del ID de TP-Link. Puede editar la información de la cuenta dando clic en el icono de Editar."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Información del dispositivo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Despliega la información de su dispositivo, incluyendo la cuenta de la nube que administra este dispositivo. "
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Cuentas enlazadas",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra todas las cuentas de la nube que están actualmente enlazadas al dispositivo. "
                       } ,{                      
                           type: "step",
                           title: "Para enlazar una cuenta de usuario:",
       content: [ 
                "1. Haga clic en Enlazar.",
                "2. Ingrese la cuenta de correo registrada que usted quiere enlazar.",
                "3. Haga clic en Guardar."]
}]
},
       "" :     ""
    };
})(jQuery);