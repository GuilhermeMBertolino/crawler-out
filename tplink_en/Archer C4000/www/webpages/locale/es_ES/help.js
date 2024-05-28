(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra información relevante sobre la conexión de red de área extensa (Internet)."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Inalámbrico 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra información relevante sobre la red inalámbrica."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información sobre los puertos Ethernet (LAN)."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Red de Invitados 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra información sobre la red inalámbrica de invitados."
                       }]
},
       STATUS_USB :{ 
               TITLE:"Dispositivos USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra información de los actuales dispositivos de almacenamiento USB y/o impresoras conectadas al router mediante puertos USB."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Funcionamiento",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra el funcionamiento actual del router."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Clientes Conectados por Cable",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra información de los dispositivos cableados conectados "
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Clientes Inalámbricos",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra información de los dispositivos inalámbricos conectados a la red."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configure los parámetros IPv4 y seleccione el método que necesite de Clonado MAC."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Seleccione el Tipo de Conexión a Internet e introduzca los parámetros correspondientes."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: IP Dinámica"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccione este tipo si tiene una conexión por servidor DHCP proporcionada por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP/máscara de subred/Puerta de Enlace Predeterminada/DNS primario/DNS secundario",
                           content: "Estos parámetros son asignados automáticamente por el servidor DHCP del ISP."
                       } ,{                      
                           type: "name",
                           title: "Renovar",
                           content: "Haga click en obtener nuevos parámetros IP del servidor DHCP."
                       } ,{                      
                           type: "name",
                           title: "Liberar",
                           content: "Haga click en liberar todas las direcciones IP asignadas por el servidor DHCP."
                       } ,{                      
                           type: "name",
                           title: "Dirección de DNS",
                           content: "Si el ISP proporciona una o dos direcciones de DNS, seleccione este casillero e introduzca las direcciones de DNS Primaria y Secundaria en el correspondiente campo; por otro lado las direcciones DNS se asignarán dinámicamente por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamaño MTU",
                           content: "El tamaño por defecto y típico de MTU (Unidad de Transmisión Máxima) para la mayoría de las redes Ethernet es 1500 Bytes. No se recomienda cambiar el tamaño por defecto de MTU a menos que sea requerido por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Nombre de Host",
                           content: "Introduzca un valor en el campo para especificar el nombre del Host en el Router."
                       } ,{                      
                           type: "name",
                           title: "Obtener IP Utilizando DHCP Unicast",
                           content: "Seleccione esta casilla si el servidor DHCP del ISP no soporta aplicaciones de broadcast y no puede obtener dirección IP dinámicamente."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: IP Estática"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccione este tipo si su ISP le está proporcionando una dirección IP específica (fija), una Submáscara de Red, una Puerta de Enlace y parámetros DNS."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP/máscara de subred/Puerta de Enlace Predeterminada/DNS primario/DNS secundario",
                           content: "Introduzca la información proporcionada por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamaño MTU",
                           content: "El tamaño por defecto y típico de MTU (Unidad de Transmisión Máxima) para la mayoría de las redes Ethernet es 1500 Bytes. No se recomienda cambiar el tamaño por defecto de MTU a menos que sea requerido por su ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: Cable BigPond"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccione este tipo si su ISP proporciona una conexión de Cable BigPond."
                       } ,{                      
                           type: "name",
                           title: "Nombre de usuario/Contraseña",
                           content: "Introduzca el nombre de usuario y contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Autenticación de Servidor",
                           content: "Introducir la dirección IP del servidor de autenticación o el nombre del host."
                       } ,{                      
                           type: "name",
                           title: "Autenticación de Dominio",
                           content: "Introduzca el nombre del sufijo del servidor de dominio (basado en la localización). Por ejemplo, nsw.bigpond.net.au para NSW/ACT, vic.bigpond.net.au para VIC/TAS/WA/SA/NT, o qld.bigpond.net.au para QLD."
                       } ,{                      
                           type: "name",
                           title: "Tamaño MTU",
                           content: "El tamaño por defecto y típico de MTU (Unidad de Transmisión Máxima) para la mayoría de las redes Ethernet es 1500 Bytes. No se recomienda cambiar el tamaño por defecto de MTU a menos que sea requerido por su ISP."
                       } ,{                      
                           type: "name",
                           title: "Modo de Conexión",
                           content: "Seleccione un modo de conexión apropiado que determine como conectarse a internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "En este modo, la conexión a internet se reconecta automáticamente en cualquier momento en el que se desconecte."
                       } ,{                      
                           type: "name",
                           title: "Bajo Demanda",
                           content: "En este modo, la conexión a internet estará terminada automáticamente después de un especifico periodo de inactividad(Max Periodo de Inactividad) haya transcurrido. La conexión se re-establece cuando intente acceder a internet otra vez."
                       } ,{                      
                           type: "name",
                           title: "Manualmente",
                           content: "En este modo, la conexión a internet esta controlada manualmente haciendo click en el botón Conectar o Desconectar. Este modo también soporta la función de Max Periodo de Inactividad. Introduzca un tiempo máximo (en minutos) la conexión a Internet puede estar inactiva antes de que se termine el campo Tiempo Máximo de Inactividad. El valor por defecto es 15 minutos. Si quiere que la conexión a internet permanezca activada todo el tiempo, introducir 0 (cero)."
                       }]
} ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccione este tipo si utiliza un servicio DSL (Línea de Subscripción Digital) y su ISP le está proporcionando un usuario y contraseña."
                       } ,{                      
                           type: "name",
                           title: "Nombre de usuario/Contraseña",
                           content: "Introduzca el nombre de usuario y contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP/DNS Primario/DNS secundario",
                           content: "Estos parámetros están automáticamente asignados por el servidor DHCP en el ISP."
                       } ,{                      
                           type: "name",
                           title: "Conexión Secundaria(Ninguna, IP Dinámica, IP Estática)",
       children: [{                      
                           type: "name",
                           title: "Ninguna",
                           content: "Seleccione esta opción si no tiene una conexión secundaria."
                       } ,{                      
                           type: "name",
                           title: "IP dinámica",
                           content: "Seleccione si la dirección IP y la máscara de subred son asignados automáticamente por el ISP.",
       children: [{                      
                           type: "name",
                           title: "Renovar",
                           content: "Haga click en renovar los parámetros IP del ISP."
                       } ,{                      
                           type: "name",
                           title: "Liberar",
                           content: "Haga click en liberar los parámetros IP asignados."
                       }]
} ,{                      
                           type: "name",
                           title: "IP estática",
                           content: "Seleccione si la dirección IP y submáscara de red están proporcionadas por el ISP e introduzca la información en los campos correspondientes."
                       }]
} ,{                      
                           type: "name",
                           title: "Tamaño MTU",
                           content: "El tamaño típico de MTU (Unidad de Transmisión Máxima) para redes Ethernet es 1480 Bytes.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "En algunos casos, puede que el ISP requiera ajustar el tamaño de MTU para un mejor rendimiento de red. No debe cambiar este valor a menos que sea absolutamente necesario."
                       }]
} ,{                      
                           type: "name",
                           title: "Nombre de Servicio/ Nombre de Concentrador de Acceso",
                           content: "Por defecto, el Nombre de Servicio y el Nombre de Concentrador de Acceso (AC) están en blanco. Estos campos no deben ser configurados a menos que sea requerido por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Intervalo de Detección en Red",
                           content: "Introduzca un tiempo de intervalo entre 0 y 120 (en segundos) en los que el router detecta el concentrador de acceso en línea a cada intervalo. El valor por defecto es 10."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Si el ISP proporciona una dirección IP específica (fija), seleccione Utilizar la siguiente Dirección IP e introduzca la dirección IP en el campo. Si no, seleccione Obtener Dinámicamente del ISP para obtener automáticamente una dirección IP asignada por el servidor."
                       } ,{                      
                           type: "name",
                           title: "Dirección de DNS",
                           content: "Si el ISP proporciona la dirección IP de DNS específica (fija), seleccione Utilizar la siguiente Dirección IP de DNS e introduzca el DNS primario y el DNS secundario en los respectivos campos. Si no, seleccione Obtener Dinámicamente del ISP para obtener automáticamente una dirección IP asignada por el ISP para obtener la dirección (es) IP de DNS asignadas por el servidor automáticamente."
                       } ,{                      
                           type: "name",
                           title: "Modo de Conexión",
                           content: "Seleccione un modo de conexión apropiado que determine como conectarse a internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "En este modo, la conexión a internet se reconecta automáticamente en cualquier momento en el que se desconecte."
                       } ,{                      
                           type: "name",
                           title: "Bajo Demanda",
                           content: "En este modo, la conexión a internet estará terminada automáticamente después de un especifico periodo de inactividad(Max Periodo de Inactividad) haya transcurrido. La conexión se re-establece cuando intente acceder a internet otra vez."
                       } ,{                      
                           type: "name",
                           title: "Basado en Tiempo",
                           content: "En este modo, la conexión a internet se establece solo en un intervalo de tiempo específico. Si esta opción está seleccionada, introduzca un tiempo incial y un tiempo final; ambos tienen el formato HH:MM."
                       } ,{                      
                           type: "name",
                           title: "Manualmente",
                           content: "En este modo, la conexión a internet esta controlada manualmente haciendo click en el botón Conectar o Desconectar. Este modo también soporta la función de Max Periodo de Inactividad. Introduzca un tiempo máximo (en minutos) la conexión a Internet puede estar inactiva antes de que se termine el campo Tiempo Máximo de Inactividad. El valor por defecto es 15 minutos. Si quiere que la conexión a internet permanezca activada todo el tiempo, introducir 0 (cero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "El modo de conexión Basado en Tiempo no tendrá efecto una vez la página de Periodo de Sistema en Avanzado → Herramientas de Sistema → Ajustes de Tiempo esté configurada."
                       }]
} ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccione este tipo si se conecta a un servidor VPN L2TP/PPTP y su ISP le proporciona nombre de usuario, contraseña y dirección IP/Nombre de Dominio del servidor."
                       } ,{                      
                           type: "name",
                           title: "Nombre de usuario/Contraseña",
                           content: "Introduzca el nombre de usuario y contraseña proporcionados por su ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP/DNS Primario/DNS secundario",
                           content: "Estos parámetros se asignarán automáticamente por el servidor DHCP del ISP."
                       } ,{                      
                           type: "name",
                           title: "Conexión Secundaria (IP dinámica o IP estática)",
       children: [{                      
                           type: "name",
                           title: "IP dinámica",
                           content: "Seleccione si la dirección IP y la máscara de subred son asignados automáticamente por el ISP."
                       } ,{                      
                           type: "name",
                           title: "IP estática",
                           content: "Seleccione si la dirección IP, submáscara de red, puerta de enlace y direcciones de DNS están proporcionadas por el ISP e introduzca la información en los campos correspondientes."
                       }]
} ,{                      
                           type: "name",
                           title: "IP del Servidor VPN/Nombre del dominio",
                           content: "Introduzca la dirección IP del servidor VPN o el nombre de dominio proporcionado por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Tamaño MTU",
                           content: "Por defecto y el tamaño típico de MTU (Unidad de transmisión máxima) para la mayoría de redes Ethernet es 1460 Bytes para L2TP o 1420 Bytes para PPTP. NO es recomendable cambiar el tamaño por defecto del MTU a menos que lo requiera el ISP."
                       } ,{                      
                           type: "name",
                           title: "Modo de Conexión",
                           content: "Seleccione un modo de conexión apropiado que determine como conectarse a internet.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "En este modo, la conexión a internet se reconecta automáticamente en cualquier momento en el que se desconecte."
                       } ,{                      
                           type: "name",
                           title: "Bajo Demanda",
                           content: "En este modo, la conexión a internet estará terminada automáticamente después de un especifico periodo de inactividad(Max Periodo de Inactividad) haya transcurrido. La conexión se re-establece cuando intente acceder a internet otra vez."
                       } ,{                      
                           type: "name",
                           title: "Manualmente",
                           content: "En este modo, la conexión a internet esta controlada manualmente haciendo click en el botón Conectar o Desconectar. Este modo también soporta la función de Max Periodo de Inactividad. Introduzca un tiempo máximo (en minutos) la conexión a Internet puede estar inactiva antes de que se termine el campo Tiempo Máximo de Inactividad. El valor por defecto es 15 minutos. Si quiere que la conexión a internet permanezca activada todo el tiempo, introducir 0 (cero)."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"Clonado de MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Seleccione el método que necesite de Clonado MAC."
                       } ,{                      
                           type: "name",
                           title: "NO clonar dirección MAC",
                           content: "NO cambie la dirección MAC predeterminada del router, en el caso de que su ISP asocie la dirección IP asignada a la dirección MAC."
                       } ,{                      
                           type: "name",
                           title: "Clonar la actual dirección MAC del ordenador",
                           content: "Seleccione copiar la dirección MAC actual del ordenador que está conectado al Router, en caso de que el ISP vincule una dirección IP asignada a la dirección MAC de su ordenador."
                       } ,{                      
                           type: "name",
                           title: "Uso de Dirección MAC personalizada",
                           content: "Introduzca manualmente una dirección MAC, en caso de que el ISP vincule una dirección IP asignada a una dirección MAC específica."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"Agregación WAN",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "La Agregación WAN transforma el puerto LAN1 en un puerto WAN adicional, haciendo un único enlace de datos de alto ancho de banda. Desata el Internet más rápido de tu ISP proporcionando tasas de ancho de banda superiores a 1Gbps y no habrá nunca más limitación debido a su hardware de red."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Nota",
                           content: "Antes de habilitar esta funcionalidad, asegúrese de que su ISP soporta Agregación WAN y su módem tiene dos puertos WAN."
                       } ,{                      
                           type: "step",
                           title: "Para aplicar la agregación WAN",
       content: [ 
                "1. Seleccione para habilitar la Agregación WAN.",
                "2. Haga click en Guardar",
                "3. Conecte los puertos WAN y LAN1 del router a su módem de dos puertos WAN con dos cables Ethernet."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la dirección MAC, dirección IP y submáscara de red del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Las direcciones físicas únicas asignadas al puerto Ethernet (LAN) del router."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP",
                           content: "Muestra la dirección IP por defecto del router el cual se está usando para acceder a la página de gestión web del router. Puede cambiarla por otra."
                       } ,{                      
                           type: "name",
                           title: "Submáscara de Red",
                           content: "Seleccione un identificador asignado y utilizado por el puerto LAN para comunicar el tráfico Interno y Externo o introduzca una nueva submáscara de red."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si la nueva dirección LAN IP no está en la misma subred que la anterior, el Pool de direcciones IP en el servidor DHCP se configurará automáticamente; sin embargo, el servidor virtual y el Host DMZ no tendrá efecto hasta que no estén configurados."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Agregación de Enlace",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Agregación de Enlace combina dos puertos juntos para hacer una única ruta de datos de alto ancho de banda, por tanto proporcionando una red cableada más rápida y más estable."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Para aplicar la agregación de enlace",
       content: [ 
                "1. Marque para habilitar la función de agregación de enlace.",
                "2. Especifique dos puertos para la agregación de enlace.",
                "3. Haga click en Guardar."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Televisión por Protocolo de Internet) es un sistema mediante el cual los servicios de televisión se difunden mediante el conjunto de protocolos de Internet a través de una red de conmutación de paquetes como por ejemplo LAN o Internet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "La funcionalidad IGMP (Internet Group Management Protocol) Snooping permite al router reenviar solo el tráfico multicast a los puertos que lo soliciten."
                       } ,{                      
                           type: "name",
                           title: "Proxy IGMP",
                           content: "Seleccione para habilitar la función IGMP Proxy si el servicio IPTV proporcionado por el ISP está basado en tecnología IGMP."
                       } ,{                      
                           type: "name",
                           title: "Versión IGMP",
                           content: "Seleccione la Versión de IGMP a corde a su ISP. La Versión de IGMP por defecto es la V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Reenvío de Difusión Inalámbrica",
                           content: "Seleccione para habilitar la función Wireless Multicast Forwarding que permite que los paquetes se redirijan a la red inalámbrica."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Seleccione para habilitar la función IPTV si el servicio proporcionado por el ISP no está basado en tecnología IGMP."
                       } ,{                      
                           type: "name",
                           title: "Perfil de ISP",
                           content: "Seleccione el perfil apropiado de su ISP (proveedor de servicios de Internet) para finalizar la configuración. Hay tres tipos de perfiles:",
       children: [{                      
                           type: "name",
                           title: "Nombre País-ISP",
                           content: "Los perfiles ISP con los ajustes por defecto están en formato \"País-ISP-Nombre\". Simplemente busque y seleccione su ISP de la lista desplegable."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bridge",
                           content: "Si su ISP no está en la lista y no se requieren otros parámetros para configurar IPTV, puede simplemente seleccionar este perfil y especificar el puerto LAN para a IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Especifique qué tipo de datos transmitirá el puerto LAN. Por ejemplo, si se ha seleccionado el puerto LAN1 para IPTV, solo transmitirá datos IPTV y tendrá que conectar el decodificador al LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bridge",
                           content: "Si su ISP no está en la lista y no se requieren otros parámetros para configurar IPTV, puede simplemente seleccionar este perfil y especificar el puerto LAN para a IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Especifique que clase de datos transmitirá el puerto LAN. Por ejemplo, si se selecciona IPTV para LAN2, solo se transmitirán datos de IPTV y deberá conectar un decodificador en LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bridge",
                           content: "Si su ISP no está en la lista y no se requieren otros parámetros para configurar IPTV, puede simplemente seleccionar este perfil y especificar el puerto LAN para a IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Especifique que clase de datos transmitirá el puerto LAN. Por ejemplo, si se selecciona IPTV para LAN5, solo se transmitirán datos de IPTV y deberá conectar un decodificador en LAN5."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Personalizado",
                           content: "Si su ISP no está en la lista pero necesita algunos parámetros necesarios, como por ejemplo IDs de VLAN y Prioridad de internet/VoIP/IPTV, seleccione este perfil.",
       children: [{                      
                           type: "name",
                           title: "ID de VLAN/Prioridad de Internet/VoIP/IPTV",
                           content: "Configure las IDs de VLAN y las prioridades proporcionadas por el ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Seleccione esta opción para taggear los paquetes de Internet con 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "VLAN ID de Multicast IPTV/Prioridad",
                           content: "Puede habilitar la funcionalidad IPTV multicast como desee y configurar el ID de VLAN y Prioridad según su ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Especifique qué tipo de datos transmitirá el puerto LAN. Por ejemplo, si se ha seleccionado el puerto LAN1 para IPTV, solo transmitirá datos IPTV y tendrá que conectar el decodificador al LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Personalizado",
                           content: "Si su ISP no está en la lista pero necesita algunos parámetros necesarios, como por ejemplo IDs de VLAN y Prioridad de internet/VoIP/IPTV, seleccione este perfil.",
       children: [{                      
                           type: "name",
                           title: "ID de VLAN/Prioridad de Internet/VoIP/IPTV",
                           content: "Configure las IDs de VLAN y las prioridades proporcionadas por el ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Seleccione esta opción para taggear los paquetes de Internet con 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "VLAN ID de Multicast IPTV/Prioridad",
                           content: "Puede habilitar la funcionalidad IPTV multicast como desee y configurar el ID de VLAN y Prioridad según su ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Especifique que clase de datos transmitirá el puerto LAN. Por ejemplo, si se selecciona IPTV para LAN2, solo se transmitirán datos de IPTV y deberá conectar un decodificador en LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Personalizado",
                           content: "Si su ISP no está en la lista pero necesita algunos parámetros necesarios, como por ejemplo IDs de VLAN y Prioridad de internet/VoIP/IPTV, seleccione este perfil.",
       children: [{                      
                           type: "name",
                           title: "ID de VLAN/Prioridad de Internet/VoIP/IPTV",
                           content: "Configure las IDs de VLAN y las prioridades proporcionadas por el ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Seleccione esta opción para taggear los paquetes de Internet con 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "VLAN ID de Multicast IPTV/Prioridad",
                           content: "Puede habilitar la funcionalidad IPTV multicast como desee y configurar el ID de VLAN y Prioridad según su ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Especifique que clase de datos transmitirá el puerto LAN. Por ejemplo, si se selecciona IPTV para LAN5, solo se transmitirán datos de IPTV y deberá conectar un decodificador en LAN5."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"Servidor DHCP",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Por defecto, el Servidor DHCP (Protocolo de Configuración de Host Dinámico) está habilitado; asigna dinámicamente parámetros TCP/IP a los dispositivos clientes del Pool de direcciones IP.",
                "NO deshabilite el servidor DHCP a menos que haya otro servidor DHCP o quiera manualmente asignar los parámetros TCP/IP a cada dispositivo cliente en su red."]
} ,{                      
                           type: "name",
                           title: "Pool de Direcciones IP",
                           content: "Introduzca el rango de direcciones IP que se pueden repartir a los clientes."
                       } ,{                      
                           type: "name",
                           title: "Tiempo de Concesión de Direcciones",
                           content: "Introduzca un tiempo de duración (entre 1 y 2880 minutos) en el que la dirección IP sea concedida a un cliente. El valor por defecto es 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Reserva de Direcciones",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra los correspondientes parámetros de los dispositivos con IP reservada."
                       } ,{                      
                           type: "step",
                           title: "Para reservar una dirección IP",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Haga click en Escanear para elegir a los dispositivos conectados actualmente a la Lista de Clientes DHCP; o introduzca la dirección MAC del cliente que desee en el campo Dirección MAC y la dirección IP que quiera reservar para el cliente en el campo Dirección IP.",
                "3. Introduzca una descripción para el cliente en el campo Descripción.",
                "4. Seleccione Habilitar.",
                "5. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si quiere deshabilitar esta entrada, haga click en el icono de la Bombilla."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"Lista de Clientes DHCP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información de los dispositivos conectados."
                       }]
},
       DDNS :{ 
               TITLE:"DNS Dinámico",
               CONTENT: [{
                           type: "paragraph",
                           content: "El DNS (Sistema de Nombre de Dominio Dinámico) Dinámico le permite asignar un host y nombre de dominio fijo para direcciones IP de Internet. Esto es muy útil cuando tiene su propia página web, servidor FTP u otro servidor detrás del router. Para empezar, necesita darse de alta con un proveedor de servicio de DNS Dinámico como por ejemplo www.dyndns.com"
                       } ,{                      
                           type: "step",
                           title: "Establecer un DNS Dinámico",
       content: [ 
                "1. Seleccione el proveedor de servicios de DNS Dinámico",
                "2. Introduza el Nombre de Usuario y Contraseña de la cuenta de DNS Dinámica.",
                "3. Introduzca el Nombre de Dominio que le haya proporcionado su proveedor de servicio DDNS.",
                "4. Seleccione el Intervalo de Actualización de la lista desplegable.",
                "5. Si su proveedor de servicio es NO-IP, la Vinculación de IP WAN permitirá al nombre de dominio vincularse a la IP WAN de este router.",
                "6. Haga click en Acceder y Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si quiere utilizar una nueva cuenta DDNS, por favor desconéctese primero y después acceda con la nueva cuenta."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"DNS Dinámico",
               CONTENT: [{
                           type: "paragraph",
                           content: "El DNS (Sistema de Nombre de Dominio Dinámico) Dinámico le permite asignar un host y nombre de dominio fijo para direcciones IP de Internet. Esto es muy útil cuando tiene su propia página web, servidor FTP u otro servidor detrás del router. Para empezar, necesita darse de alta con un proveedor de servicio de DNS Dinámico como por ejemplo www.dyndns.com"
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Lista de Nombres de Dominio",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra la información de todos los nombres de dominio que están registrados con su cuenta cloud."
                       } ,{                      
                           type: "step",
                           title: "Registrar un nuevo nombre de dominio",
       content: [ 
                "1. Haga click en Registrar.",
                "2. Introduzca el nombre de dominio que quiere registrar.",
                "3. Haga click en Guardar."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Enrutamiento Estático",
               CONTENT: [{
                           type: "paragraph",
                           content: "El enrutamiento estático se usa para predeterminar una ruta fija para los paquetes de información de red y llegar a una red o host específico."
                       } ,{                      
                           type: "step",
                           title: "Establecer una Ruta Estática",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Introduzca una dirección IP en el campo Destino de Red para asignar la ruta estática para esta entrada.",
                "3. Introduzca una submáscara de red en el campo Submáscara de Red para determinar el rango de red y rango host de la dirección IP.",
                "4. Introduzca una dirección IP de puerta de enlace en el campo Puerta de Enlace Predeterminada para conectar el router a la red o host.",
                "5. Seleccione LAN o WAN en el campo Interfaz para especificar el tipo de Destino de Red.",
                "6. Introduzca una breve descripción para esta entrada.",
                "7. Seleccione Activar.",
                "8. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si quiere deshabilitar esta entrada, haga click en el icono de la Bombilla."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Tabla de Enrutamiento del Sistema",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra todas las entradas de rutas válidas que están actualmente en uso."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Configuración inalámbrica",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configure los ajustes inalámbricos como necesite."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Conexión inteligente",
               CONTENT: [{
                           type: "paragraph",
                           content: "Seleccione esta casilla de verificación para habilitar la conexión inteligente. Esta función permite que los dispositivos se ejecuten más rápido asignándolos a mejores bandas inalámbricas en función de las condiciones reales para equilibrar las demandas de red."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Wi-Fi 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nombre de red (SSID)",
                           content: "Se recomienda que cambie el nombre de red (SSID). Este campo distingue en mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccione si quiere ocultar el nombre de red de 2.4GHz (SSID) de la lista de red inalámbrica. Cuando está seleccionado, el SSID no se difundirá y necesitará manualmente añadir la red."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Seleccione una de las siguientes opciones de seguridad:",
       children: [{                      
                           type: "name",
                           title: "Sin Seguridad",
                           content: "Seleccionar esta opción para deshabilitar la seguridad inalámbrica. Esto no está recomendado."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Seleccione esta opción para habilitar la seguridad inalámbrica. Es altamente recomendado proteger la red inalámbrica de accesos no autorizados. Si está seleccionado, configure lo siguiente.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccione una versión de seguridad. WPA2-PSK es la más segura. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccione un tipo de encriptación de seguridad. AES es la más segura. NO se recomienda utilizar encriptación TKIP si el router funciona en modo 802.11n. Además, utilizando TKIP deshabilitará la función WPS. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Introduzca una contraseña inalámbrica entre 8 y 63 de caracteres ASCII o entre 8 y 64 para caracteres Hexadecimales en este campo."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Seleccione esta opción para habilitar el método de autenticación más avanzada utilizando un RADIUS (Remote Dial de autenticación de usuario de servicios) del servidor. Si se selecciona, la función WPS se desactivará.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccione una versión de seguridad. WPA2-PSK es la más segura. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccione un tipo de encriptación de seguridad. AES es la más segura. NO se recomienda utilizar encriptación TKIP si el router funciona en modo 802.11n. Además, utilizando TKIP deshabilitará la función WPS. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Servidor RADIUS IP",
                           content: "Introduzca la dirección IP del servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Puerto RADIUS",
                           content: "Introduzca el número de puerto del servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Contraseña RADIUS",
                           content: "Introduzca la contraseña compartida del servidor RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Seleccione esta opción para habilitar el método de autenticación básico si alguno de los dispositivos cliente solamente puede acceder utilizando WEP (Wired Equivalent Privacy). Si selecciona esta opción, la función WPS será desactivada.",
       children: [{                      
                           type: "name",
                           title: "Tipo",
                           content: "Seleccione un tipo de autenticación para la red inalámbrica. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Formato de Clave WEP",
                           content: "Formato clave WEP. Formato ASCII es una combinación de caracteres alfabéticos y numéricos. El formato hexadecimal es una combinación de la serie (0-9) y letras (AF, af)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Clave",
                           content: "Seleccione una longitud de clave WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "Permite introducir 10 dígitos hexadecimales (0-9, AF, af) o 5 caracteres ASCII en el campo Valor WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Permite introducir 26 dígitos hexadecimales (0-9, AF, af) o 13 caracteres ASCII en el campo Valor WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Valor de la Clave",
                           content: "Introduzca la contraseña WEP en el campo correspondiente"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Seleccione un canal operativo para la red inalámbrica 2.4 GHz. Es recomendable dejar el canal en Auto, si no está teniendo problemas con la conexión inalámbrica."
                       } ,{                      
                           type: "name",
                           title: "Potencia de Transmisión",
                           content: "Selecciona Alta, Media o Baja para especificar la potencia de transmisión de datos."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Funcionalidad Airtime Fairness",
                           content: "Seleccione esta casilla para habilitar la función Airtime Fairness (ATF) que le permitirá optimizar el rendimiento de cada flujo de datos. El planificador de tráfico ATF utiliza los objetivos de tiempo de uso por cada destino para así equilibrar el tiempo de uso en todos los destinos de flujo de datos."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Funcionalidad MIMO Multi-Usuario",
                           content: "Haga click en habilitar para utilizar la Funcionalidad MIMO Multi-Usuario."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Wi-Fi 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nombre de red (SSID)",
                           content: "Se recomienda que cambie el nombre de red (SSID). Este campo distingue en mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccione si quiere ocultar el nombre de red de 5GHz (SSID) de la lista de red inalámbrica. Cuando está seleccionado, el SSID no se difundirá y necesitará manualmente añadir la red."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Seleccione una de las siguientes opciones de seguridad:",
       children: [{                      
                           type: "name",
                           title: "Sin Seguridad",
                           content: "Seleccionar esta opción para deshabilitar la seguridad inalámbrica. Esto no está recomendado."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Seleccione esta opción para habilitar la seguridad inalámbrica. Es altamente recomendado proteger la red inalámbrica de accesos no autorizados. Si está seleccionado, configure lo siguiente.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccione una versión de seguridad. WPA2-PSK es la más segura. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccione un tipo de encriptación de seguridad. AES es la más segura. NO se recomienda utilizar encriptación TKIP si el router funciona en modo 802.11n. Además, utilizando TKIP deshabilitará la función WPS. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Introduzca una contraseña inalámbrica entre 8 y 63 de caracteres ASCII o entre 8 y 64 para caracteres Hexadecimales en este campo."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Seleccione esta opción para habilitar el método de autenticación más avanzada utilizando un RADIUS (Remote Dial de autenticación de usuario de servicios) del servidor. Si se selecciona, la función WPS se desactivará.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccione una versión de seguridad. WPA2-PSK es la más segura. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccione un tipo de encriptación de seguridad. AES es la más segura. NO se recomienda utilizar encriptación TKIP si el router funciona en modo 802.11n. Además, utilizando TKIP deshabilitará la función WPS. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Servidor RADIUS IP",
                           content: "Introduzca la dirección IP del servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Puerto RADIUS",
                           content: "Introduzca el número de puerto del servidor RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Contraseña RADIUS",
                           content: "Introduzca la contraseña compartida del servidor RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Seleccione esta opción para habilitar el método de autenticación básico si alguno de los dispositivos cliente solamente puede acceder utilizando WEP (Wired Equivalent Privacy). Si selecciona esta opción, la función WPS será desactivada.",
       children: [{                      
                           type: "name",
                           title: "Tipo",
                           content: "Seleccione un tipo de autenticación para la red inalámbrica. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Formato de Clave WEP",
                           content: "Formato clave WEP. Formato ASCII es una combinación de caracteres alfabéticos y numéricos. El formato hexadecimal es una combinación de la serie (0-9) y letras (AF, af)."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Clave",
                           content: "Seleccione una longitud de clave WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "Permite introducir 10 dígitos hexadecimales (0-9, AF, af) o 5 caracteres ASCII en el campo Valor WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Permite introducir 26 dígitos hexadecimales (0-9, AF, af) o 13 caracteres ASCII en el campo Valor WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Valor de la Clave",
                           content: "Introduzca la contraseña WEP en el campo correspondiente"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Seleccione un canal operativo para la red inalámbrica 5 GHz. Es recomendable dejar el canal en Auto, si no está teniendo problemas con la conexión inalámbrica."
                       } ,{                      
                           type: "name",
                           title: "Potencia de Transmisión",
                           content: "Selecciona Alta, Media o Baja para especificar la potencia de transmisión de datos."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Funcionalidad Airtime Fairness",
                           content: "Seleccione esta casilla para habilitar la función Airtime Fairness (ATF) que le permitirá optimizar el rendimiento de cada flujo de datos. El planificador de tráfico ATF utiliza los objetivos de tiempo de uso por cada destino para así equilibrar el tiempo de uso en todos los destinos de flujo de datos."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Funcionalidad MIMO Multi-Usuario",
                           content: "Haga click en habilitar para utilizar la Funcionalidad MIMO Multi-Usuario."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Configuración de Wi-Fi Protegido) proporciona una fácil configuración de la conexión Wi-Fi segura y protegida."
                       } ,{                      
                           type: "name",
                           title: "Pulsación de Botón (recomendado)",
       content: [ 
                "Este método le permite conectar fácilmente a la red inalámbrica cualquier dispositivo que tenga habilitado el WPS.",
                "Haga click en el botón Iniciar WPS en la pantalla. Dentro de los dos siguientes minutos, presione el botón WPS en el dispositivo cliente."]
} ,{                      
                           type: "name",
                           title: "PIN del Router",
       content: [ 
                "El PIN por defecto puede encontrarse en la etiqueta del router.",
                "Haga click en generar un nuevo PIN o haga click en Por Defecto para restaurar el PIN actual al PIN por defecto."]
} ,{                      
                           type: "name",
                           title: "Introducir el PIN del cliente",
       content: [ 
                "Este método le permite añadir un dispositivo inalámbrico manualmente.",
                "Introduzca el PIN del dispositivo en el campo y después haga click en Conectar."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Dispositivos Conectados",
               CONTENT: [{
                           type: "name",
                           title: "Número de Cliente",
                           content: "Muestra el número de clientes inalámbricos asociados."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC asociada al cliente inalámbrico."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Conexión",
                           content: "Muestra la banda de frecuencia inalámbrica (2.4 GHz o 5 GHz) asociada al cliente inalámbrico."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Muestra el tipo de seguridad asociado al cliente inalámbrico."
                       } ,{                      
                           type: "name",
                           title: "Paquetes Recibidos",
                           content: "Muestra el número de paquetes recibidos asociados al cliente inalámbrico."
                       } ,{                      
                           type: "name",
                           title: "Paquetes Enviados",
                           content: "Muestra el número de paquetes enviados asociados al cliente inalámbrico."
                       } ,{                      
                           type: "paragraph",
                           content: "Haga click en Refrescar para actualizar la información de la página."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Horario Wi-Fi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con la Programación Inalámbrica, puede deshabilitar la señal inalámbrica durante un periodo específico. Por ejemplo, puede apagar la señal inalámbrica entre las 00:00 am y las 07:00 am."
                       } ,{                      
                           type: "name",
                           title: "Horario de Desactivación Wi-Fi",
                           content: "Muestra el periodo(s) durante el cual la señal inalámbrica está apagada.",
       children: [{                      
                           type: "step",
                           title: "Establecer horario de apagado inalámbrico",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Establecer el periodo de tiempo durante el cual necesita que la señal inalámbrica esté apagada.",
                "3. Seleccionar los días de repetición. Puede elegir \"Todos los Días\" o especificar unos días concretos.",
                "4. Haga click en Guardar."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Ajustes",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta función le permite proporcionar acceso Wi-Fi a los invitados sin revelar la red principal."
                       } ,{                      
                           type: "name",
                           title: "Permitir a los invitados verse",
                           content: "Seleccione esta casilla para permitir a los dispositivos inalámbricos en la Red de Invitados comunicarse con los demás mediante métodos como network neighbors, Samba, Ping y FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Permitir a los Invitados Acceder a Mi Red Local",
                           content: "Seleccione esta casilla para permitir a los dispositivos inalámbricos en la Red de Invitados comunicarse con los dispositivos conectados a los puertos LAN del router o red principal mediante métodos como network neighbors, Samba, Ping y FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Inalámbrico 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Habilitar invitado de red",
                           content: "Seleccione esta casilla de verificación para activar la función de red de invitados."
                       } ,{                      
                           type: "name",
                           title: "Nombre de red (SSID)",
                           content: "Utilizar el SSID de Invitado por defecto o crear un nuevo nombre (hasta 32 caracteres)."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccione esta casilla de verificación si desea ocultar el SSID de invitados en la lista de redes Wi-Fi."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Intervalo de Actualización de la contraseña",
                           content: "Seleccionar el intervalo de actualización de la contraseña de Red de Invitados."
                       } ,{                      
                           type: "name",
                           title: "Seguridad",
                           content: "Cuando seleccione nunca actualizar la contraseña, seleccione una de las siguientes opciones de seguridad:",
       children: [{                      
                           type: "name",
                           title: "Sin Seguridad",
                           content: "Seleccionar esta opción para deshabilitar la seguridad inalámbrica. Esto no está recomendado."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Seleccione esta opción para habilitar la seguridad inalámbrica. Es altamente recomendado proteger la red inalámbrica de accesos no autorizados. Si está seleccionado, configure lo siguiente.",
       children: [{                      
                           type: "name",
                           title: "Versión",
                           content: "Seleccione una versión de seguridad. WPA2-PSK es la más segura. Si no está seguro, seleccione Auto."
                       } ,{                      
                           type: "name",
                           title: "Encriptación",
                           content: "Seleccione un tipo de encriptación de seguridad. AES es la más segura. NO se recomienda utilizar encriptación TKIP si el router funciona en modo 802.11n. Además, utilizando TKIP deshabilitará la función WPS. Si no está seguro, seleccione Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "La autenticación mediante portal mejora la seguridad de red mediante la solicitud de autenticación de los clientes que necesiten acceso temporal a su red inalámbrica."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Configurar autenticación en el portal:",
       content: [ 
                "1. Seleccione Portal para Seguridad.",
                "2. Seleccione Contraseña Simple o Sin Autenticación para la Autenticación.",
                "A. Contraseña Simple - Especifique una contraseña para",
                "B. Sin Autenticación - Los clientes pueden acceder a la red sin ninguna autenticación.",
                "3. Seleccione 1 Hora, 2 Horas, 4 Horas, 8 Horas o Siempre para especificar el tiempo de espera de autenticación. Cuando la autenticación de un cliente expire, el cliente tiene que iniciar sesión de nuevo para la autenticación de acceso.",
                "4. (Opcional) Habilite Redireccionar e introduzca la dirección URL a la que quiera redireccionar. Un nuevo cliente autenticado será redirigido a la URL especificada.",
                "5. (Opcional) También puede personalizar la página de autenticación de acceso.",
                "A. Título del Portal - Hasta 31 caracteres.",
                "B. Términos de Uso - Hasta 1023 caracteres.",
                "C. Imagen de logo - Suba una imagen JPG o PNG (menos de 100KB) para personalizar el logo.",
                "D. Imagen de Fondo - Suba una imagen JPG o PNG (menos de 2 MB) para personalizar el fondo.",
                "6. Haga click en Guardar."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Contraseña",
                           content: "Cree una contraseña de entre 8 y 63 caracteres ASCII o de entre 8 y 64 caracteres hexadecimales (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Contraseña",
                           content: "Use o bien la contraseña generada de manera aleatoria, o cree una contraseña entre 8 y 63 caracteres ASCII o entre 8 y 64 caracteres hexadecimales (0-9,a-f,A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Puerta de Enlace de Capa de Aplicación) permite personalizar filtros NAT (Traducción de Direcciones de Red) trasversales ser conectado a la puerta de enlace, para soportar traducción de direcciones y puertos para un protocolo de \"control/datos\" de capa de aplicación: FTP, TFTP, H323 etc. Se recomienda habilitar ALG. "
                       } ,{                      
                           type: "name",
                           title: "Activar ALG FTP",
                           content: "Si está seleccionada, permite a los clientes y servidores FTP (File Transfer Protocolo) a transfirir datos vía NAT."
                       } ,{                      
                           type: "name",
                           title: "Activar ALG TFTP",
                           content: "Si está seleccionada, permite a los clientes y servidores TFTP (Trivial File Transfer Protocolo) transferir datos vía NAT."
                       } ,{                      
                           type: "name",
                           title: "Activar ALG H323",
                           content: "Si está seleccionada, permite a los clientes Microsoft NetMeeting a comunicarse vía NAT."
                       } ,{                      
                           type: "name",
                           title: "Activar ALG RTSP",
                           content: "Si está seleccionada, permite a los clientes de reproductores de media a comunicarse con servidores de media en streaming via NAT."
                       } ,{                      
                           type: "name",
                           title: "Habilitar SIP ALG",
                           content: "Si se selecciona, se permitirá a los clientes comunicarse con servidores SIP(Protocolo de Inicio de Sesiones) mediante NAT."
                       } ,{                      
                           type: "name",
                           title: "ActivarPassthrough PPTP",
                           content: "Si está seleccionada, permite sesiones Point-to-Point a establecer túneles a través de una red IP y pasar a través del router."
                       } ,{                      
                           type: "name",
                           title: "ActivarPassthrough L2TP",
                           content: "Si está seleccionada, permite sesiones Point-to-Point de capa 2 a establecer túneles a través de redes IP y pasar a través del router."
                       } ,{                      
                           type: "name",
                           title: "ActivarPassthrough IPsec",
                           content: "Si se selecciona, se permitirá que IPSec (Internet Protocol security) sea tunelado a través de una red IP y pase por el router. IPSec utiliza servicios de seguridad criptográfica para asegurar la comunicación privada y segura sobre redes IP."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Servidores Virtuales",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Virtual Server sirven para configurar servicios públicos en su red local. Un virtual server se define como un puerto externo, y todas las peticiones desde internet a este puerto externo serán redirigidas al ordenador designado, que debe de estar configurado con una dirección IP fija reservada.",
                "Cuando arranca un servidor en la red local y quiere compartirlo en Internet, la función Servidores Virtuales permite realizar esta compartición y habilitar el servidor a los usuarios de Internet."]
} ,{                      
                           type: "paragraph",
                           content: "La tabla muestra los parámetros relevantes del servidor virtual."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Servicio",
                           content: "Muestra el nombre del servidor virtual."
                       } ,{                      
                           type: "name",
                           title: "Puerto Externo",
                           content: "Muestra el número de puerto o un rango de puertos usados por el virtual server."
                       } ,{                      
                           type: "name",
                           title: "IP Interna",
                           content: "Muestra la dirección IP del ordenador que utiliza la aplicación del servicio."
                       } ,{                      
                           type: "name",
                           title: "Puerto Interno",
                           content: "Muestra el número del puerto del ordenador que utiliza la aplicación del servicio."
                       } ,{                      
                           type: "name",
                           title: "Protocolo",
                           content: "Muestra el protocolo usado por la aplicación del servicio: TCP, UDP, or ALL (todos los protocolos soportados por el router)."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual (habilitado o deshabilitado) de la específica regla de filtrado."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra la opción para modificiar o eliminar la regla correspondiente."
                       } ,{                      
                           type: "step",
                           title: "Configurar un Servidor Virtual",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Haga click en Escanear para seleccionar un servicio de la lista para ingresar automáticamente los números de puerto en los campos Puerto Externo y Puerto Interno. Si el servicio no está en la lista, introduzca el número de Puerto Externo (ej: 21) o un rango de puertos (ej: 21-25). No introduzca nada en Puerto Internto si es el mismo que el Puerto Externo o introduzca un número de puerto específico (ej: 21) si el Puerto Externo es un puerto individual. Introduzca la dirección IP del ordenador donde está funcionando la aplicación de servicio en notación decimal en el campo IP Interna.",
                "3. Seleccione un protocolo de la aplicación del servicio: TCP, UDP, o All desde la lista desplegable del campo Protocolo.",
                "4. Seleccione Habilitar.",
                "5. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
       content: [ 
                "1. Si quiere deshabilitar esta entrada, haga click en el icono de la Bombilla.",
                "2. Se recomienda mantener por defecto la configuración del Puerto Interno y Procolo si no tiene claro que puertos o protocolos utilizar.",
                "3. Si el dispositivo host local está alojando más de un tipo de servicios, necesitará crear una regla para cada servicio. Por favor tenga en cuenta que el Puerto Externo NO debe repetirse."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port Triggering",
               CONTENT: [{
                           type: "paragraph",
                           content: "El Port Triggering se usa para dirigir el tráfico en un puerto espe."
                       } ,{                      
                           type: "paragraph",
                           content: "La tabla muestra los parámetros relevantes del puerto dinámico."
                       } ,{                      
                           type: "name",
                           title: "Aplicación",
                           content: "Muestra el nombre de la aplicación."
                       } ,{                      
                           type: "name",
                           title: "Puerto Dinámico",
                           content: "Muestra el tráfico saliente a través del puerto usado para iniciar la regla filtrada en una conexión saliente."
                       } ,{                      
                           type: "name",
                           title: "Protocolo Dinámico",
                           content: "Muestra el protocolo usado para el Puerto Dinámico. TCP, UDP o All (Todos los protocolos soportados por el router)."
                       } ,{                      
                           type: "name",
                           title: "Puerto Externo",
                           content: "Muestra el puerto o rango de puertos usados por el sistema remoto. Una respuesta usando uno de estos puertos será redirigida al PC que inicie esta regla. Puede introducir hasta 5 grupos de puertos (o secciones de puertos). Cada grupo de puertos debe de estar separado por una \",\" (comma), por ejemplo: 2000-2038, 2046, 2050-2051, 2085, 3010-3030,"
                       } ,{                      
                           type: "name",
                           title: "Protocolo Interno",
                           content: "Muestra el protocolo usado por el puerto interno: TCP, UDP o ALL (todos los protocolos soportados por el router)."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual (habilitado o deshabilitado) de la específica regla de filtrado."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra la opción para modificiar o eliminar la regla correspondiente."
                       } ,{                      
                           type: "step",
                           title: "Configurar un Port Triggering.",
       content: [{                      
                           type: "note",
                           title: "Nota",
                           content: "Cada regla solamente puede ser usada por un host a la vez."
                       },
                "1. Haga click en Añadir.",
                "2. Haga click en Escanear para seleccionar una aplicación de la lista para ingresar automáticamente los valores por defecto en los campos apropiados. Si quiere añadir una aplicación que no esté en la lista, introduzca manualmente la Aplicación, el Puerto Dinámico, el Protocolo Dinámico, el Puerto Externo y el Protocolo Externo.",
                "3. Seleccione Habilitar.",
                "4. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si quiere deshabilitar esta regla, haga click en el icono de la Bombilla."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "La funcionalidad host DMZ (Zona Desmilitarizada) permite al host local ser expuesto a Internet para servicios de propósito especial, como por ejemplo videojuegos online o videoconferencias. Basicamente, el DMZ permite a un único ordenador en la LAN abrir todos sus puertos. Este ordenador necesita ser configurado con una dirección IP estática y su función de cliente DHCP deshabilitada."
                       } ,{                      
                           type: "paragraph",
                           content: "Cuando el DMZ está habilitado, el host estará totalmente expuesto a Internet, lo que llevará a que pueda haber amenazas de seguridad en el ordenador. Si DMZ no se está utilizando, por favor deshabilítelo."
                       } ,{                      
                           type: "step",
                           title: "Para asignar un ordenador o servidor a un servidor DMZ",
       content: [ 
                "1. Haga click en Activar DMZ.",
                "2. En el campo Dirección IP del equipo DMZ, introduzca la dirección IP del PC local para configurarlo como host DMZ.",
                "3. Haga click en Guardar."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Por defecto, la funcionalidad UPnP (Universal Plug-and-Play) está habilitada para permitir que los dispositivos, como ordenadores y equipos de Internet, descubran y comuniquen automáticamente entre ellos en la red local. "
                       } ,{                      
                           type: "paragraph",
                           content: "Puede que necesite habilitar el UPnP si quiere utilizar aplicaciones para juegos online multijugador, conexiones peer-to-peer, comunicaciones a tiempo real (como por ejemplo VoIP o conferencias teleVoIP) o asistencia remota, etc."
                       } ,{                      
                           type: "name",
                           title: "Lista de Servicio UPnP",
                           content: "La Lista de Servicios UPnP muestra la información UPnP de los host locales."
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
                           title: "Utilizar los parámetros auto identificados del ISP",
                           content: "Esta funcionalidad está habiltiada por defecto. Si está habilitada, el router puede identificar el ISP de una tarjeta SIM/UIM y completar los parámetros automáticamente. Si la identificación falla, por favor seleccione la Región y el ISP Móvil manualmente."
                       } ,{                      
                           type: "name",
                           title: "Región",
                           content: "Selecciona y muestra automáticamente la región cuando el módem USB y la tarjeta SIM está identificado correctamente. Si no, seleccione la región del menú desplegable."
                       } ,{                      
                           type: "name",
                           title: "ISP Móvil",
                           content: "Muestra el ISP (proveedor de servicios de Internet) de la red 3G/4G. Si no se detecta automáticamente, seleccione el ISP en el menú desplegable. El APN y número de marcación predeterminados se rellenarán automáticamente en consecuencia."
                       } ,{                      
                           type: "name",
                           title: "PIN SIM/UIM",
                           content: "Si la Protección SIM/UIM está habilitada, introduzca el código PIN. La Protección SIM/UIM está deshabilitada por defecto. Por favor tenga en cuenta que si introduce 3 veces mal el PIN, la tarjeta SIM/UIM se bloqueará automáticamente. Solo puede desbloquearlo introduciendo el código PUK en su PC/Portátil."
                       } ,{                      
                           type: "name",
                           title: "Mensaje",
                           content: "Muestra la información del PIN de la tarjeta SIM/UIM si la Protección del PIN está habilitada."
                       } ,{                      
                           type: "name",
                           title: "Ajustes Número Dial,APN,Nombre de usuario/Contraseña",
                           content: "Si el ISP no está en la lista en la lista <strong>ISP Móvil</strong>, seleccione esta casilla e introduzca el Número de Marcación, APN (Nombre del Punto de Acceso), Nombre de Usuario y Contraseña proporcionados por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Número Dial",
                           content: "Introduzca el Número de Marcación proporcionado por el ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Introduzca el APN (Nombre del Punto de Acceso) proporcionado por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Nombre de usuario/Contraseña",
                           content: "Introduzca el nombre de usuario y contraseña proporcionados por el ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Conectar por demanda",
                           content: "En este modo, la conexión a internet estará terminada automáticamente después de un especifico periodo de inactividad(Max Periodo de Inactividad) haya transcurrido. La conexión se re-establece cuando intente acceder a internet otra vez."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "En ocasiones, no es posible interrumpir la conexión aunque haya especificado un tiempo máximo de inactividad, porque algunas aplicaciones siguen accediendo a Internet en segundo plano."
                       } ,{                      
                           type: "name",
                           title: "Conectar automáticamente",
                           content: "En este modo, la conexión a Internet se restablece automáticamente siempre que se interrumpa."
                       } ,{                      
                           type: "name",
                           title: "Conectar manualmente",
                           content: "En este modo, puede hacer clic en el botón Conectar o Desconectar para controlar la conexión a Internet manualmente. Este modo también admite la función Tiempo máx. de inactividad. Introduzca el tiempo máximo (en minutos) que la conexión a Internet puede estar inactiva antes de que se interrumpa en Tiempo máx. de inactividad. El valor predeterminado es 15 minutos. Si desea que la conexión permanezca activa permanentemente, introduzca 0 (cero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "En ocasiones, no es posible interrumpir la conexión aunque haya especificado un tiempo máximo de inactividad, porque algunas aplicaciones siguen accediendo a Internet en segundo plano."
                       } ,{                      
                           type: "paragraph",
                           content: "Haga click en el botón Guardar para guardar los cambios realizados."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Ayuda de ajustes avanzados de 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: " módem USB 3G/4G",
                           content: "Muestra el estado del módem USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Utilizar los parámetros auto identificados del ISP",
                           content: "Esta funcionalidad está habiltiada por defecto. Si está habilitada, el router puede identificar el ISP de una tarjeta SIM/UIM y completar los parámetros automáticamente. Si la identificación falla, por favor seleccione la Región y el ISP Móvil manualmente."
                       } ,{                      
                           type: "name",
                           title: "Región",
                           content: "Selecciona y muestra automáticamente la región cuando el módem USB y la tarjeta SIM está identificado correctamente. Si no, seleccione la región del menú desplegable."
                       } ,{                      
                           type: "name",
                           title: "ISP Móvil",
                           content: "Muestra el ISP (proveedor de servicios de Internet) de la red 3G/4G. Si no se detecta automáticamente, seleccione el ISP en el menú desplegable. El APN y número de marcación predeterminados se rellenarán automáticamente en consecuencia."
                       } ,{                      
                           type: "name",
                           title: "PIN SIM/UIM",
                           content: "Si la Protección SIM/UIM está habilitada, introduzca el código PIN. La Protección SIM/UIM está deshabilitada por defecto. Por favor tenga en cuenta que si introduce 3 veces mal el PIN, la tarjeta SIM/UIM se bloqueará automáticamente. Solo puede desbloquearlo introduciendo el código PUK en su PC/Portátil."
                       } ,{                      
                           type: "name",
                           title: "Mensaje",
                           content: "Muestra la información del PIN de la tarjeta SIM/UIM si la Protección del PIN está habilitada."
                       } ,{                      
                           type: "name",
                           title: "Ajustes Número Dial,APN,Nombre de usuario/Contraseña",
                           content: "Si el ISP no está en la lista en la lista <strong>ISP Móvil</strong>, seleccione esta casilla e introduzca el Número de Marcación, APN (Nombre del Punto de Acceso), Nombre de Usuario y Contraseña proporcionados por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Número Dial",
                           content: "Introduzca el Número de Marcación proporcionado por el ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Introduzca el APN (Nombre del Punto de Acceso) proporcionado por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Nombre de usuario/Contraseña",
                           content: "Introduzca el nombre de usuario y contraseña proporcionados por el ISP. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Conectar por demanda",
                           content: "En este modo, la conexión a internet estará terminada automáticamente después de un especifico periodo de inactividad(Max Periodo de Inactividad) haya transcurrido. La conexión se re-establece cuando intente acceder a internet otra vez."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "En ocasiones, no es posible interrumpir la conexión aunque haya especificado un tiempo máximo de inactividad, porque algunas aplicaciones siguen accediendo a Internet en segundo plano."
                       } ,{                      
                           type: "name",
                           title: "Conectar automáticamente",
                           content: "En este modo, la conexión a Internet se restablece automáticamente siempre que se interrumpa."
                       } ,{                      
                           type: "name",
                           title: "Conectar manualmente",
                           content: "En este modo, puede hacer clic en el botón Conectar o Desconectar para controlar la conexión a Internet manualmente. Este modo también admite la función Tiempo máx. de inactividad. Introduzca el tiempo máximo (en minutos) que la conexión a Internet puede estar inactiva antes de que se interrumpa en Tiempo máx. de inactividad. El valor predeterminado es 15 minutos. Si desea que la conexión permanezca activa permanentemente, introduzca 0 (cero)."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "En ocasiones, no es posible interrumpir la conexión aunque haya especificado un tiempo máximo de inactividad, porque algunas aplicaciones siguen accediendo a Internet en segundo plano."
                       } ,{                      
                           type: "name",
                           title: "Tipo de autenticación",
                           content: "Seleccione un tipo de autenticación. Por defecto es Auto. Algunos ISPs requieren un tipo de autenticación específica, por favor confírmelo con el ISP o mantenga los valores por defecto."
                       } ,{                      
                           type: "name",
                           title: "Auto",
                           content: "Si está en Auto (por defecto), el router determinará automáticamente el tipo de autenticación utilizado por el ISP."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Si se selecciona PAP (Password Authentication Protocol), el router se autentica con el interlocutor utilizando dos protocolos de enlace. Seleccione esta opción si el ISP requiere este tipo de autenticación."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Si se selecciona CHAP (Challenge Handshake Authentication Protocol), el router se autentica con el interlocutor utilizando tres protocolos de enlace y valida la identidad del interlocutor periódicamente. Seleccione esta opción si el ISP requiere este tipo de autenticación."
                       } ,{                      
                           type: "name",
                           title: "Tamaño MTU",
                           content: "El tamaño de MTU(Unidad Máxima de Transmisión) por defecto es 1480 bytes. No cambie este valor a menos que lo requiera el ISP. "
                       } ,{                      
                           type: "name",
                           title: "Utilizar las siguientes direcciones DNS",
                           content: "Si el ISP proporciona las direcciones IP del servidor DNS, seleccione esta casilla e introduzca la dirección IP del <strong>DNS Primario</strong> y DNS Secundario (Opcional). Si no, los servidores DNS se asignarán dinámicamente por el ISP."
                       } ,{                      
                           type: "name",
                           title: "DNS Primario",
                           content: "Introduzca la dirección IP del DNS en notación decimal proporcionada por el ISP."
                       } ,{                      
                           type: "name",
                           title: "DNS Secundario",
                           content: "(Opcional) Introduzca otra dirección IP de DNS en notación decimal proporcionada por el ISP."
                       } ,{                      
                           type: "paragraph",
                           content: "Haga click en el botón <strong>Guardar</strong> para guardar los cambios realizados."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Dispositivos de Almacenamiento USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "La pantalla de Configuración de Dispositivos muestra información relacionada sobre los dispositivos de almacenamiento USB conectados a través del puerto USB."
                       } ,{                      
                           type: "name",
                           title: "Escanear",
                           content: "Normalmente, el router detecta automáticamente cualquier dispositivo cuando se conecta. Si no es así, pulse el botón escanear cuando introduzca el dispositivo y refresque la pantalla con la información actualizada."
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
                           title: "Espacio libre",
                           content: "Muestra el actual espacio de almacenamiento libre disponible."
                       } ,{                      
                           type: "name",
                           title: "Extraer de forma segura",
                           content: "Haga clic en este botón para extraer de forma segura el dispositivo de almacenamiento USB antes de desconectarlo físicamente del router."
                       } ,{                      
                           type: "paragraph",
                           content: "El botón Quitar solo aparecerá cuando un dispositivo de almacenamiento USB esté conectado al router. Cuando el volumen actual esté ocupado, no podrá extraerlo."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Esta casilla sólo aparece cuando hay un dispositivo de almacenamiento USB conectado al router. Seleccione esta casilla para habilitar el intercambio de archivos al dispositivo USB."
                       } ,{                      
                           type: "step",
                           title: "Para configurar un servidor de archivos",
       content: [ 
                "1. Conectar el dispositivo de almacenamiento de USB al puerto USB del router utilizando un cable USB.",
                "2. El nuevo dispositivo USB conectado debe ser detectado por el router automáticamente y mostrada la información dentro de la sección Configuración de dispositivo. Si no aparece, pulse Escanear.",
                "3. Seleccione Activar para habilitar el intercambio de archivos."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Cuenta compartida",
               CONTENT: [{
                           type: "name",
                           title: "Cuenta",
                           content: "Puede seleccionar Usar la cuenta por defecto para acceder a los archivos y carpetas compartidos o Usar una nueva cuenta y acceder a la siguiente pantalla para crear una nueva cuenta de usuario."
                       } ,{                      
                           type: "name",
                           title: "Nombre de usuario/Contraseña",
                           content: "Introduzca un nombre de usuario de entre 1 y 15 caracteres alfanuméricos o subrayado, y una contraseña de entre 1 y 15 caracteres ASCII. Estos campos distinguen entre mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Confirmación de contraseña",
                           content: "vuelva a introducir la contraseña para confirmar que no existe ningún error. Este campo distingue mayúsculas de minúsculas."
                       } ,{                      
                           type: "paragraph",
                           content: "Haga click en Guardar para guardar todos los cambios realizados."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Configuración Compartido",
               CONTENT: [{
                           type: "name",
                           title: "Red/Nombre del servidor",
                           content: "Muestra el nombre utilizado para acceder al dispositivo de almacenamiento USB conectado."
                       } ,{                      
                           type: "name",
                           title: "Habilitar",
                           content: "Seleccione esta opción para habilitar el método de acceso."
                       } ,{                      
                           type: "name",
                           title: "Método de Acceso",
                           content: "Hay tres métodos de acceso para permitir el acceso al dispositivo de almacenamiento USB conectado. Puede elegir uno o más métodos de acceso seleccionando las casillas correspondientes.",
       children: [{                      
                           type: "name",
                           title: "Redes vecinas",
                           content: "Si está habilitado, los usuarios en la red pueden acceder al dispositivo de almacenamiento USB utilizando una dirección IP (ej: \\\\192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Si está habilitado, los clientes FTP en la red local podrán acceder al dispositivo de almacenamiento USB utilizando la dirección IP asignada, seguida del puerto del servidor FTP (ej: ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (Mediante internet)",
                           content: "Si está habilitado, los usuarios pueden acceder remotamente al dispositivo de almacenamiento USBconducido por el FTP a través de Internet. Esta función admite tanto la carga como la descaga de archivos. Para cambiar el puerto del servidor FTP, introduzca un número de puerto y pulse Guardar para aplicar los cambios."
                       }]
} ,{                      
                           type: "name",
                           title: "Enlace",
                           content: "Muestra la dirección utilizada para acceder al dispositivo de almacenamiento USB."
                       } ,{                      
                           type: "name",
                           title: "Puerto",
                           content: "Muestra el número de puerto del servidor FTP. Utilice el valor predeterminado (21) o un valor entre 1024 y 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Haga click en Guardar para guardar todos los cambios realizados."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Compartir Carpetas",
               CONTENT: [{
                           type: "name",
                           title: "Compartir Todas",
                           content: "Actívelo para compartir todos los archivos y carpetas o apáguelo para compartir sólo las carpetas seleccionadas."
                       } ,{                      
                           type: "name",
                           title: "Habilitar autenticación",
                           content: "Es muy recomendable activar la autenticación para que los usuarios deban introducir un nombre y contraseña válidos para acceder a las carpetas compartidas."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la Carpeta",
                           content: "Muestra el nombre de la carpeta compartida."
                       } ,{                      
                           type: "name",
                           title: "Ruta de la Carpeta",
                           content: "Muestra la ruta de la carpeta compartida."
                       } ,{                      
                           type: "name",
                           title: "Uso compartido de multimedia",
                           content: "Indica si cuando está permitido que la carpeta compartida para compartir o no."
                       } ,{                      
                           type: "name",
                           title: "Nombre de volumen",
                           content: "Muestra el nombre del volumen compartido."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado de los archivos compartidos mediante el indicador de la bombilla."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones de Modificar o Borrar la correspondiente carpeta compartida."
                       } ,{                      
                           type: "name",
                           title: "Explorar",
                           content: "Pulse para buscar una carpeta compartida."
                       } ,{                      
                           type: "name",
                           title: "Permitir el acceso de invitados Red",
                           content: "Seleccione para permitir que los clientes de la red de invitados accedan a las carpetas compartidas."
                       } ,{                      
                           type: "name",
                           title: "Habilitar autenticación",
                           content: "Seleccione para que los usuarios tengan acceso a las carpetas compartidas con un nombre de usuario y contraseña válidos."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el acceso de escritura",
                           content: "Seleccione para permitir a los usuarios realizar cambios en el contenido de las carpetas."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el uso multimedia compartido",
                           content: "Seleccionar para activar el uso compartido de medios."
                       } ,{                      
                           type: "name",
                           title: "Actualizar",
                           content: "Haga click para actualizar la lista de carpetas compartidas."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Servidor de Impresión",
               CONTENT: [{
                           type: "name",
                           title: "Servidor de Impresión",
                           content: "Actívelo para habilitar la función del Servidor de Impresión."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la impresora",
                           content: "Muestra el nombre de la impresora conectada al router."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Máquina del tiempo",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Máquina del Tiempo realiza una copia de seguridad de todos los archivos de su ordenador Mac en un dispositivo de almacenamiento USB conectado a su módem router."
                       } ,{                      
                           type: "name",
                           title: "Habilitar",
                           content: "Seleccione esta casilla de verificación para activar la función de la Máquina de Tiempo."
                       } ,{                      
                           type: "name",
                           title: "Disco para copia de seguridad",
                           content: "Seleccione una ubicación para las copias de seguridad de la Máquina del Tiempo."
                       } ,{                      
                           type: "name",
                           title: "Límite de tamaño para copias de seguridad",
                           content: "Asigna la cantidad de espacio en disco que se puede utilizar para las copias de seguridad de la Máquina del Tiempo. 0 significa que no hay límite de espacio."
                       } ,{                      
                           type: "name",
                           title: "Guardar",
                           content: "Haga clic en para guardar la configuración."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Descarga Offline",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con la Descarga Offline habilitada, el router puede descargar archivos sin necesidad de estar encendido todo el tiempo."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Actívelo para habilitar la función de Descarga Offline."
                       } ,{                      
                           type: "name",
                           title: "Ruta de la Carpeta",
                           content: "Seleccione una ruta de directorio para almacenar o guardar las descargas.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "No cambie la ruta del directorio o extraiga el dispositivo de almacenamiento USB cuando suba o descargue archivos; si no lo hace pueden aparecer errores."
                       }]
} ,{                      
                           type: "name",
                           title: "Programación",
                           content: "Seleccione la casilla para habilitar la función de Programación que le permite especificar el periodo(s) de tiempo para descargar/subir archivos."
                       } ,{                      
                           type: "name",
                           title: "Mantener la Subida Después de Completar las Tareas",
                           content: "Seleccione la casilla para mantener la subida de datos de la descarga(s) completadas."
                       } ,{                      
                           type: "name",
                           title: "Número Máximo de Descargas Activas",
                           content: "Introduzca un valor entre 1 y 10 para establecer el número máximo de descargas activas. El valor por defecto es 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Descargas",
               CONTENT: [{
                           type: "note",
                           title: "Archivo",
                           content: "Muestra el nombre y tipo del archivo de descarga."
                       } ,{                      
                           type: "note",
                           title: "Velocidad",
                           content: "Muestra la velocidad de descarga (o subida) actual."
                       } ,{                      
                           type: "note",
                           title: "Completado",
                           content: "Muestra el progreso de la descarga."
                       } ,{                      
                           type: "note",
                           title: "Tiempo Restante",
                           content: "Muestra el tiempo restante de la descarga."
                       } ,{                      
                           type: "note",
                           title: "Pares Conectados",
                           content: "Muestra el número de pares conectados de la descarga."
                       } ,{                      
                           type: "note",
                           title: "Estado",
                           content: "Muestra el estado actual de la descarga (descargando, esperando, compartiendo, pausado, completado o error)."
                       } ,{                      
                           type: "name",
                           title: "Añadir una nueva descarga",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Seleccione la fuente de la descarga, torrent desde PC, torrent desde USB o URL.",
                "3. Seleccione la ubicación del torrent para BT o introduzca el URL para FTP, HTTP y aMule.",
                "4. Haga click en Guardar.",
                "5. Para aMule, especifique la dirección IP del servidor aMule y el puerto en Avanzado > Servidor aMule."]
}]
} ,{                      
                           type: "name",
                           title: "Borrar descargas",
                           content: "Seleccione la casilla correspondiente de la descarga(s) que quiere borrar y después haga click en Borrar sobre la tabla."
                       } ,{                      
                           type: "name",
                           title: "Pausar descargas",
                           content: "Haga click en la correspondiente casilla de la descarga(s) que quiere pausar y después haga click en Pausar encima de la tabla."
                       } ,{                      
                           type: "name",
                           title: "Reanudar descargas",
                           content: "Haga click en la correspondiente casilla de la descarga(s) que quiere reanudar y después haga click en Reanudar encima de la tabla."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Avanzada",
               CONTENT: [{
                           type: "name",
                           title: "Límites de Velocidad",
                           content: "Especifica la velocidad máxima de subida y bajada para la conexión a Internet."
                       } ,{                      
                           type: "name",
                           title: "Velocidad de Descarga Máxima",
                           content: "Introduzca un valor entre 1 y 100000 kB/s para establecer la velocidad máxima de descarga. El valor por defecto es 1024."
                       } ,{                      
                           type: "name",
                           title: "Velocidad de Subida Máxima",
                           content: "Introduzca un valor entre 1 y 100000 kB/s para establecer la velocidad máxima de descarga. El valor por defecto es 512."
                       } ,{                      
                           type: "name",
                           title: "Número de Conexiones",
                           content: "Especifica el número máximo de conexiones."
                       } ,{                      
                           type: "name",
                           title: "Número Máximo de Conexiones Globales",
                           content: "Introduzca un valor entre 1 y 200 para establecer el número máximo global de conexiones. El valor por defecto es 100."
                       } ,{                      
                           type: "name",
                           title: "Número Máximo de Pares conectados por Torrent",
                           content: "Introduzca un valor entre 1 y 100 para establecer el número máximo de pares conectados por torrent. El valor por defecto es 50."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Red DHT",
                           content: "Habilite esta funcionalidad para mejorar la eficiencia al buscar pares para que pueda incrementar la velocidad de descarga."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Intercambio de Pares",
                           content: "Habilite esta funcionalidad para mejorar la eficiencia en la comunicación en los grupos de pares para que pueda incrementar la velocidad de descarga."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Encriptación de Protocolo BitTorrent",
                           content: "Habilite esta funcionalidad para fortalecer la privacidad y confidencialidad durante el procesod e transmisión de datos."
                       } ,{                      
                           type: "name",
                           title: "Servidor aMule",
                           content: "Introduzca la dirección IP y puerto del servidor aMule. La descarga aMule solo funciona cuando el router está conectado al servidor."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con el Control Parental, puede bloquear páginas web maliciosas, con contenido explícito e inapropiado; restringir el acceso durante cierto periodo de tiempo al día (por ejemplo, Facebook o YouTube durante el horario de los deberes)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Dispositivos Bajo el Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra la información y ajustes de los dispositivos que están actualmente restringidos por Control Parental."
                       } ,{                      
                           type: "step",
                           title: "Para restringir un nuevo dispositivo cliente",
       content: [ 
                "1. Active los Controles Parentales.",
                "2. Haga click en Añadir.",
                "3. Haga click en Escanear para elegir un dispositivo conectado de la Lista de Acceso de Dispositivos; o introduzca el Nombre del Dispositivo y Dirección MAC manualmente para añadir un dispositivo que no esté conectado.",
                "4. Haga click en el icono de Tiempo Efectivo para especificar un periodo de tiempo por el cual se aplican las restricciones.",
                "5. Introduzca una breve descripción en el campo Descripción. Este campo es opcional.",
                "6. Seleccione Habilitar Esta Entrada.",
                "7. Click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si quiere deshabilitar esta entrada, haga click en el icono de la Bombilla."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Restricción de Contenido",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Resctricción de Contenido le permite restringir el acceso a páginas web específicas utilizando palabras clave o nombres de dominio. Los dispositivos clientes que están siendo controlados por el Control Parental podrán o no acceder a estas páginas web dependiendo de la política de restricción que seleccione."
                       } ,{                      
                           type: "step",
                           title: "Para especificar el contenido de acceso",
       content: [ 
                "1. Active la Restricción de Contenido.",
                "2. Seleccione la Política de Restricción según las necesidades:",
                "A. Si quiere que los dispositivos controlados tengan acceso a todas las páginas web excepto a algunas, seleccione Lista Negra.",
                "B. Si quiere que los dispositivos controlados tengan acceso a ciertas páginas web, seleccione Lista Blanca.",
                "3. Haga click en Añadir Palabra Clave para añadir una palabra clave de la dirección web (por ejemplo, wikipedia) o nombre de dominio a la Lista Negra o Lista Blanca.",
                "4. Haga click en Guardar."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "El QoS (Calidad de Servicio) ayuda a priorizar el tráfico de Internet basándose en las necesidades. Puede especificar el nivel de prioridad para un dispositivo, un puerto físico o una aplicación en la lista de reglas QoS."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Nota",
                           content: "Si se habilita NAT Boost, se debe deshabilitar QoS."
                       } ,{                      
                           type: "name",
                           title: "Ancho de Banda de Subida",
                           content: "Introduzca el máximo ancho de banda de subida proporcionado por su el ISP."
                       } ,{                      
                           type: "name",
                           title: "Ancho de banda de bajada",
                           content: "Introduzca el máximo ancho de banda de bajada proporcionado por su el ISP."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Avanzada",
               CONTENT: [{
                           type: "name",
                           title: "Prioridad Alta/Media/Baja",
                           content: "Especifique un porcentaje para la prioridad de tráfico alta/media/baja.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "La cantidad máxima (porcentaje) de todas las prioridades es 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"Lista de Reglas QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Puede añadir aquí reglas QoS detalladas para priorizar el tráfico de Internet."
                       } ,{                      
                           type: "step",
                           title: "Establecer una regla QoS",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Seleccione un tipo de prioridad para añadir la regla QoS.",
                "Por Dispositivo - Haga click en Escanear para seleccionar el dispositivo deseado o introduzca manualmente un nombre de dispositivo y su dirección MAC.",
                "Por Aplicación - Seleccione la aplicación deseada o personalice una aplicación configurando el nombre, protocolo y puerto de destino (1-65535). Puede introducir un único puerto o múltiples puertos o rango de puertos, separado por comas (ej: 21, 35-105, 111).",
                "Por Puerto Físico - Seleccione el puerto que desee.",
                "3. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Puede arrastrar una regla entre las diferentes listas de prioridades para cambiar su prioridad."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Actualización de la base de datos",
               CONTENT: [{
                           type: "paragraph",
                           content: "Lanzaremos la última versión de la base de datos en www.tp-link.com. Puede descargar y actualizar la base de datos del router para incrementar el soporte de aplicaciones."
                       } ,{                      
                           type: "name",
                           title: "Nuevo archivo de base de datos",
                           content: "Haga click en Examinar para localizar la última base de datos. Seleccionela y haga click en actualizar la base de datos a la última versión."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "name",
                           title: "SPI Firewall",
                           content: "Firewall SPI (Stateful Packet Inspection) previene ciber ataques y validaciones de tráfico que pasan a través del router basándose en el protocolo. Por defecto, esta funcionalidad está habilitada."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"Protección DoS",
               CONTENT: [{
                           type: "name",
                           title: "Protección DoS",
                           content: "La Protección DoS (Denegación de Servicio) protege la LAN frente a ataques DoS de inundaciones de red con solicitudes de servidores. Puede filtrar los siguientes tres clases de ataques según necesite. Hay cuatro niveles por cada filtrado:",
       children: [{                      
                           type: "name",
                           title: "Apagado",
                           content: "Sin protección."
                       } ,{                      
                           type: "name",
                           title: "Bajo",
                           content: "Nivel bajo de protección y bajo impacto en el rendimiento de su router."
                       } ,{                      
                           type: "name",
                           title: "Medio",
                           content: "Nivel moderado de protección y el impacto semi notable en el rendimiento de su router."
                       } ,{                      
                           type: "name",
                           title: "Alto",
                           content: "Nivel alto de protección pero impacto notable en el rendimiento de su router."
                       }]
} ,{                      
                           type: "name",
                           title: "Filtrado de Ataques ICMD-FLOOD",
                           content: "Habilítelo para prevenir ataques de inundación ICMP (Protocolo de Control de Mensajes de Internet)."
                       } ,{                      
                           type: "name",
                           title: "Filtrado de Ataques UDP-FLOOD",
                           content: "Habilítelo para prevenir ataques de inundación UDP (Protocolo de Datagrama de Usuario)."
                       } ,{                      
                           type: "name",
                           title: "Filtrado de Ataques TCP-SYN-FLOOD",
                           content: "Habilítelo para prevenir ataques de inundación TCP-SYN (Protocolo de Sincrionización de Control de Transmisión)."
                       } ,{                      
                           type: "name",
                           title: "Ignorar Paquetes Ping del Puerto WAN",
                           content: "Habilitar para ignorar los paquetes de ping del puerto WAN."
                       } ,{                      
                           type: "name",
                           title: "Prohibir Paquetes Ping del Puerto LAN",
                           content: "Habilitar para prohibir los paquetes de ping del puerto LAN."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Lista de Equipos Bloqueados DoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra la dirección IP y MAC del host(s) DoS bloqueado."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Control de Acceso",
               CONTENT: [{
                           type: "paragraph",
                           content: "El Control de Acceso se utiliza para permitir o bloquear clientes específicos del acceso a la red. Cuando un dispositivo está bloqueado, es imposible comunicarse con otros dispositivos o conectarse a Internet."
                       } ,{                      
                           type: "step",
                           title: "Para controlar el acceso",
       content: [ 
                "1. Actívelo para habilitar el Control de Acceso.",
                "2. Si también quiere controlar el acceso de los dispositivos conectados a la Red de Invitados, active el Control de Dispositivos Invitados.",
                "3. Seleccione un modo de acceso según necesite y haga click en Guardar:",
                "A. Si quiere bloquear el acceso de dispositivos en la lista de abajo, seleccione Lista Negra.",
                "B. Si quiere permitir el acceso solo a los dispositivos en la lista de abajo, seleccione Lista Blanca.",
                "4. En Dispositivos en la sección Lista Negra/Lista Blanca, haga click en Añadir. Introduzca el Nombre del Dispositivo y la Dirección MAC del dispositivo. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si quiere deshabilitar esta entrada, haga click en el icono de la Bombilla."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Dispositivos en Red",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra la información de todos los dispositivos conectados (incluyendo dispositivos conectados a la Red de Invitados si el Control de Dispositivos está habilitado)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"Vinculación IP&MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Vinculación IP y MAC (también conocida como Vinculación ARP) es muy útil para controlar el acceso a dispositivos específicos en la LAN mediante la vinculación de la dirección IP y MAC del dispositivo. La vinculación de IP y MAC también prevee que otros dispositivos utilicen una dirección IP específica."
                       } ,{                      
                           type: "step",
                           title: "Configurar un dispositivo con Vinculación IP y MAC",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Introduzca la dirección MAC del dispositivo.",
                "3. Introduzca una Dirección IP que quiera vincular a la dirección MAC de arriba.",
                "4. Seleccione Habilitar.",
                "5. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
       content: [ 
                "1. No puede vincluar la misma dirección IP para más de una dirección MAC.",
                "2. Si quiere deshabilitar esta entrada, haga click en el icono de la Bombilla."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"Lista ARP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra la dirección IP y MAC de los dispositivos conectados."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Protocolo de Internet versión 6) es la versión más reciente de IP (Protocolo de Internet) y soluciona el problema de extinción de direcciones IPv4 (Protocolo de Internet versión 4)."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: IP Dinámica"
                       } ,{                      
                           type: "name",
                           title: "IP dinámica",
                           content: "Seleccione este tipo si el ISP utiliza asignación de direcciones IPv6 Dinámica."
                       } ,{                      
                           type: "name",
                           title: "Dirección IPv6/ DNS Primario/DNS Secundario",
                           content: "Estos parámetros son asignados automáticamente por el servidor DHCPv6 del ISP."
                       } ,{                      
                           type: "name",
                           title: "Renovar",
                           content: "Haga click para obtener nuevos parámetros IPv6 del servidor DHCPv6 del ISP."
                       } ,{                      
                           type: "name",
                           title: "Liberar",
                           content: "Haga click para liberar todas las direcciones IPv6 asignadas al servidor DHCPv6 del ISP."
                       } ,{                      
                           type: "name",
                           title: "Obtener dirección IPv6",
                           content: "Seleccione DHCPv6 para obtener una dirección IPv6 fija o SLAAC para obtener una dirección IPv6 generada por el router advertisement packet, según el ISP."
                       } ,{                      
                           type: "name",
                           title: "Delegación de Prefijo",
                           content: "Sellecione Habilitar para obtener un prefijo de delegación del Servidor DHCPv6 del ISP ó Deshabilitar para quitar manualmente la asignación de un prefijo de dirección. Los clientes en la LAN generarán una dirección IPv6 con este prefijo."
                       } ,{                      
                           type: "name",
                           title: "Dirección de DNS",
                           content: "Seleccione Obtener Dinámicamente del ISP o Utilizar las Siguientes Direcciones DNS. Si Utilizar las Siguientes Direcciones DNS está seleccionado, por favor introduzca manualmente la dirección DNS proporcionada por el ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: IP Estática"
                       } ,{                      
                           type: "name",
                           title: "IP estática",
                           content: "Seleccione este tipo si el ISP utiliza asignación de direcciones IPv6 Estática."
                       } ,{                      
                           type: "name",
                           title: "Dirección IPv6/Puerta de Enlace Predeterminada/DNS Primario/DNS Secundario",
                           content: "Introduzca estos parámetros proporcionada por su proveedor."
                       } ,{                      
                           type: "name",
                           title: "Tamaño MTU",
                           content: "El tamaño por defecto y típico de MTU (Unidad de Transmisión Máxima) para la mayoría de las redes Ethernet es 1500 Bytes. No se recomienda cambiar el tamaño por defecto de MTU a menos que sea requerido por su ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: Túnel 6a4"
                       } ,{                      
                           type: "name",
                           title: "Túnel 6a4",
                           content: "Seleccione este tipo si el ISP utiliza despliegue 6to4 para el asignamiento de direcciones."
                       } ,{                      
                           type: "name",
                           title: "Dirección IPv4/Submáscara IPv4/Puerta de Enlace Predeterminada IPv4/Dirección de Túnel",
                           content: "Estos parámetros se generarán de forma dinámica por la información IPv4 de puerto WAN después de hacer clic en Conectar."
                       } ,{                      
                           type: "name",
                           title: "Utilizar el Siguiente Servidor DNS",
                           content: "Seleccione para introducir manualmente el DNS primario y/o DNS secundario tal y como lo proporcione el ISP."
                       } ,{                      
                           type: "name",
                           title: "Conectar",
                           content: "Haga click en conectar a Internet."
                       } ,{                      
                           type: "name",
                           title: "Desconectar",
                           content: "Haga click en desconectar de Internet."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Seleccione este tipo si el ISP utiliza PPPoEv6 y proporciona un nombre de usuario y contraseña."
                       } ,{                      
                           type: "name",
                           title: "Nombre de usuario/Contraseña",
                           content: "Introduzca estos parámetros proporcionada por su proveedor."
                       } ,{                      
                           type: "name",
                           title: "Dirección IPv6",
                           content: "Esta dirección se asignará automáticamente por el servidor DHCPv6 del ISP, después introduzca el nombre de usuario y contraseña y haga click en Conectar."
                       } ,{                      
                           type: "name",
                           title: "Obtener dirección IPv6",
                           content: "Seleccione DHCPv6 para obtener una dirección IPv6 fija o SLAAC para obtener una dirección IPv6 generada por el router advertisement packet, según el ISP."
                       } ,{                      
                           type: "name",
                           title: "Delegación de Prefijo",
                           content: "Sellecione Habilitar para obtener un prefijo de delegación del Servidor DHCPv6 del ISP ó Deshabilitar para quitar manualmente la asignación de un prefijo de dirección. Los clientes en la LAN generarán una dirección IPv6 con este prefijo."
                       } ,{                      
                           type: "name",
                           title: "Dirección de DNS",
                           content: "Seleccione Obtener Dinámicamente del ISP o Utilizar las Siguientes Direcciones DNS. Si Utilizar las Siguientes Direcciones DNS está seleccionado, por favor introduzca manualmente la dirección DNS proporcionada por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Conectar",
                           content: "Haga click en conectar a Internet."
                       } ,{                      
                           type: "name",
                           title: "Desconectar",
                           content: "Haga click en desconectar de Internet."
                       } ,{                      
                           type: "title",
                            title: "Tipo de Conexión a Internet: Pass-Through (Bridge)"
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccione este tipo si el ISP utiliza despliegue de red (Bridge) Pass-Through. No se requiere configuración para este tipo de conexión."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Excepto para el tipo de Conexión a Internet Pass-Through (Bridge), los otros tipos de conexiones a Internet requieren configuración IPv6."
                       } ,{                      
                           type: "name",
                           title: "Tipo Asignado",
                           content: "Seleccione el apropiado según el ISP.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Para asignar automáticamente direcciones IP a los clientes de la LAN.",
       children: [{                      
                           type: "name",
                           title: "Dirección de Prefijo",
                           content: "Introduzca el prefijo proporcionado por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Release Time",
                           content: "Es el tiempo válido de la dirección IP asignada. Mantenga por defecto por defecto 86400 segundos o cámbielo si lo requiere el ISP."
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
                           title: "Dirección de Prefijo",
                           content: "Introduzca el prefijo proporcionado por el ISP."
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
                           title: "Dirección de Prefijo",
                           content: "Introduzca el prefijo proporcionado por el ISP."
                       } ,{                      
                           type: "name",
                           title: "Dirección",
                           content: "Es la dirección IP asignada automáticamente por el ISP."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"Clonado de MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Seleccione el método que necesite de Clonado MAC."
                       } ,{                      
                           type: "name",
                           title: "NO clonar dirección MAC",
                           content: "NO cambie la dirección MAC predeterminada del router, en el caso de que su ISP asocie la dirección IP asignada a la dirección MAC."
                       } ,{                      
                           type: "name",
                           title: "Clonar la actual dirección MAC del ordenador",
                           content: "Seleccione copiar la dirección MAC actual del ordenador que está conectado al Router, en caso de que el ISP vincule una dirección IP asignada a la dirección MAC de su ordenador."
                       } ,{                      
                           type: "name",
                           title: "Uso de Dirección MAC personalizada",
                           content: "Introduzca manualmente una dirección MAC, en caso de que el ISP vincule una dirección IP asignada a una dirección MAC específica."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Configuración Horaria",
               CONTENT: [{
                           type: "paragraph",
                           content: "La Configuración Horaria permite configurar la hora de sistema del router. Una vez modificado, la hora de sistema se aplicará basándose en las funciones y configuraciones como Control Parental."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Puede activar la funcionalidad habilitar 24 Horas antes de la configuración, lo que se aplicará la hora de sistema basándose en las funciones y configuraciones."
                       } ,{                      
                           type: "title",
                            title: "Hora del sistema"
                       } ,{                      
                           type: "step",
                           title: "Obtener horario de Internet",
       content: [ 
                "Seleccione por defecto, Obtener de Internet para permitirle obtener la hora de sistema de Internet.",
                "1. Seleccione Obtener de Internet.",
                "2. Seleccione la Zona Horaria local del menú desplegable.",
                "3. En el campo Servidor NTP I, introduzca la dirección IP o nombre de dominio del servidor NTP deseado.",
                "4. En el campo Servidor NTP II, introduzca la dirección IP o el nombre del dominio del segundo servidor NTP. (Opcional)",
                "5. Haga click en Obtener.",
                "6. Haga click en Guardar."]
} ,{                      
                           type: "step",
                           title: "Obtener hora del PC",
       content: [ 
                "Esta funcionalidad le permite obtener la hora del sistema del PC. Por favor confirme que la hora del PC está configurado previamente.",
                "Seleccione Obtener del PC y Haga Click en Guardar."]
} ,{                      
                           type: "step",
                           title: "Establecer hora manualmente",
       content: [ 
                "Si el dispositivo no puede obtener automáticamente la hora de Internet o del PC, puede configurar manualmente la hora del sistema.",
                "1. Seleccione Manualmente.",
                "2. Introduzca la Fecha y Hora actual.",
                "3. Haga click en Guardar."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Horario de Verano",
                           content: "Esta funcionalidad puede sincronizar automáticamente el horario de sistema con el horario de verano."
                       } ,{                      
                           type: "step",
                           title: "Para configurar el ahorro con luz diurna",
       content: [ 
                "1. Seleccione Habilitar ahorro con luz diurna.",
                "2. Especifique un periodo de tiempo para el horario de verano en la Zona Horaria local.",
                "3. Haga click en Guardar."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnóstico",
               CONTENT: [{
                           type: "paragraph",
                           content: "El router proporciona herramientas de Ping y Tracerouter para ayudarle en la resolución de problemas de red."
                       } ,{                      
                           type: "title",
                            title: "Ping & Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "La herramienta Ping envia paquetes a una dirección IP o nombre de dominio y registra los resultados, como por ejemplo el número de paquetes enviados y recibidos y el tiempo de respuesta."
                       } ,{                      
                           type: "paragraph",
                           content: "La herramienta Traceroute envía paquetes a una dirección IP o nombre de dominio y registra los resultados, como por ejemplo el número de paquetes enviados y recibidos y el tiempo de respuesta."
                       } ,{                      
                           type: "paragraph",
                           content: "Puede hacer ping o traceroute a un dispositivo local mediante la dirección IP o a un nombre de dominio como tp-link.com, yahoo.com, etc."
                       } ,{                      
                           type: "step",
                           title: "Para diagnosticar usando Ping",
       content: [ 
                "1. Seleccione Ping como Herramienta de Diagnóstico.",
                "2. Introduzca la Dirección IP o Nombre de Dominio.",
                "3. Haga click en el Icono de la Flecha para abrir el menú Avanzado y especificar el Contador de Ping y el Tamaño de Paquete de Ping. (Opcional)",
                "4. Haga Click en Empezar."]
} ,{                      
                           type: "step",
                           title: "Para diagnosticar usando las rutas de trazado",
       content: [ 
                "1. Seleccione Traceroute como Herramienta de Diagnóstico.",
                "2. Introduzca la Dirección IP o Nombre de Dominio.",
                "3. Haga click en el Icono de la Flecha para abrir el menú Avanzado y especificar el número de saltos (a realizar) en el campo Traceroute Max TTL (Tiempo de Vida). Por defecto es 20. (Opcional)",
                "4. Haga Click en Empezar."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Port Mirroring"
                       } ,{                      
                           type: "paragraph",
                           content: "El Port Mirroring se refiere al proceso por el cual se reenvían las copias de paquetes desde un puerto a un puerto mirroring. Normalmente el puerto mirroring está conectado a un dispositivo de diagnóstico de datos, el cual se utiliza para analizar los paquetes reflejados para monitorización y resolución de problemas."
                       } ,{                      
                           type: "step",
                           title: "Reenviar copias de paquetes del puerto designado.",
       content: [ 
                "1. Habilitar Port Mirroring.",
                "2. Seleccione el puerto que desee que sea reflejado.",
                "3. Seleccione el puerto que desee que sea puerto mirroring.",
                "4. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Un puerto no puede establecerse como puerto reflejado y puerto mirroring a la vez."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Actualización de Firmware",
               CONTENT: [{
                           type: "paragraph",
                           content: "Las Actualizaciones de Firmware actualizan el firmware del router con nuevas funcionalidades o resolución de problemas. Se recomienda actualizar el router con el último archivo de firmware para tener el mejor rendimiento."
                       } ,{                      
                           type: "step",
                           title: "Notificando lo siguiente ayudará a evitar fallos de actualización:",
       content: [ 
                "Antes de actualizar",
                "1. Asegúrese de que tiene una conexión estable entre el router y el ordenador. NO se recomienda actualizar el firmware inalámbricamente.",
                "2. Asegúrese de que ha quitado todos los dispositivos USB conectados al router.",
                "3. Recuerde guardar el archivo de configuración del router.",
                "Mientras actualiza",
                "Manténga el router ENCENDIDO hasta que la actualización esté completada."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Actualizar el firmware online",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Haga click en Actualizar y confirme cuando aparezca la ventana. El router descargará y se actualizará automáticamente a la última versión de firmware."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Actualizar el firmware manualmente",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Haga click en Soporte en la parte inferior de la página y descargue el último firmware en el ordenador. Por favor asegúrese que el archivo de firmware que va a descargar coincide con la versión de hardware del router tal y como se muestra en la página.",
                "2. Haga click en Examirar y seleccione el archivo de firmware descargado.",
                "3. Haga click en Actualizar."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "La actualización de firmware llevará unos minutos en completarse. El router se reiniciará automáticamente cuando la actualización de firmware finalice."]
}]
},
       BACKUP :{ 
               TITLE:"Copia de Seguridad & Restaurar",
               CONTENT: [{
                           type: "paragraph",
                           content: "La funcionalidad Backup y Restauración le permite guardar la configuración actual del router para recuperarla o simplemente restaurar el router a sus valores de fábrica por defecto."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Por favor NO apague el router durante el proceso de backup o Restaurar."
                       } ,{                      
                           type: "title",
                           title: "Copia de Seguridad",
                           content: "Se recomienda encarecidamente guardar la configuración actual, por si fuese necesaria su recuperación a causa de una restauración a su estado anterior."
                       } ,{                      
                           type: "step",
                           title: "Guardar la configuración actual",
       content: [ 
                "1. Haga click en Backup.",
                "2. Espere a que el router guarde la configuración actual."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Restaurar",
                           content: "Puede restaurar el router a un estado previo con el archivo backup."
                       } ,{                      
                           type: "step",
                           title: "Para restaurar una copia de seguridad",
       content: [ 
                "1. Haga click en Examinar.",
                "2. Localice y seleccione la copia de seguridad.",
                "3. Pulse Restaurar."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Restaurar a valores de fábrica",
       content: [ 
                "La restauración de fábrica del router borrará todas sus configuraciones y ajustes y las dejará en valores de fábrica. Por ejemplo, todos los ajustes inalámbricos, controles parentales e información de red se borrarán.",
                "Después de un reset de fábrica, tendrá que establecer una nueva contraseña de acceso a la página de gestión web del router."]
}]
},
       REBOOT :{ 
               TITLE:"Programar Reinicio",
               CONTENT: [{
                           type: "paragraph",
                           content: "La función de Programación de Reinicio limpia el caché para mejorar el funcionamiento del router. Puede reiniciar el router manualmente o establecer un reinicio regularmente."
                       } ,{                      
                           type: "step",
                           title: "Reiniciar manualmente",
       content: [ 
                "Haga click en Reiniciar y espere unos minutos a que el router se encienda."]
} ,{                      
                           type: "step",
                           title: "Programar el horario de reinicio",
       content: [ 
                "1. Habilitar Programación de Reinicio.",
                "2. Establecer cuando y con qué frecuencia el router se reinicia especificando los parámetros de Horario de Reinicio y campos Repetidos.",
                "3. Haga click en Guardar."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administración",
               CONTENT: [{
                           type: "paragraph",
                           content: "La administración permite gestionar la contraseña de acceso y los permisos de acceso a los clientes conectados al router."
                       } ,{                      
                           type: "name",
                           title: "Administración de Cuentas",
                           content: "Esta funcionalidad le permite cambiar la contraseña.",
       children: [{                      
                           type: "step",
                           title: "Cambiar la contraseña",
       content: [ 
                "1. Introducir Contraseña Antigua.",
                "2. Introducir Nueva Contraseña.",
                "3. Confirmar Nueva Contraseña.",
                "4. Haga click en Guardar."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Recuperar Contraseña",
               CONTENT: [{
                           type: "name",
                           title: "Recuperación de Contraseña por Defecto",
                           content: "La Recuperación de Contraseña Por defecto le permite recuperar la contraseña de acceso por defecto sin restaurar el router a su configuración de fábrica.",
       children: [{                      
                           type: "step",
                           title: "Cambiar la contraseña",
       content: [ 
                "1. Habilitar la funcionalidad de Recuperación de Contraseña Por Defecto.",
                "2. En el campo De, introduzca una dirección de email válida utilizada para enviar un código de verificación para recuperar la información de acceso.",
                "3. En el campo Para, introduzca una dirección de email válida para recibir el código de verificación.",
                "4. Introducir el Servidor SMTP del email saliente (De).",
                "5. Si el email en el campo De requiere encriptación, debe seleccionar la casilla Habilitar Autenticación e introduzca su Nombre de Usuario (dirección de email) y Contraseña.",
                "6. Haga click en Guardar."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Administración Local",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta funcionalidad permite a los dispositivos locales acceder y gestionar el router."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Gestión Local por HTTPS",
                           content: "Habilite la Gestión Local por HTTPS si quiere acceder al router tanto por HTTPS como por HTTP, o manténtala deshabilitada si solo quiere acceder al router por HTTP."
                       } ,{                      
                           type: "name",
                           title: "Acceso a todos los dispositivos coenctados en LAN",
                           content: "Cambie a Encendido para habilitar la administración local de los dispositivos conectados en LAN o Apagado para habilitar la administración de un dispositivo específico."
                       } ,{                      
                           type: "name",
                           title: "Dirección MAC",
                           content: "Muestra la dirección MAC del dispositivo de acceso limitado."
                       } ,{                      
                           type: "name",
                           title: "Descripción",
                           content: "Muestra la descripción de los dispositivos de acceso limitado."
                       } ,{                      
                           type: "name",
                           title: "Estado",
                           content: "Muestra el estado actual de los dispositivos de acceso limitado (Habilitado o deshabilitado)."
                       } ,{                      
                           type: "name",
                           title: "Modificar",
                           content: "Muestra las opciones de Modificar y Borrar los correspondientes dispositivos de la lista."
                       } ,{                      
                           type: "step",
                           title: "Para añadir un dispositivo cliente a la lista",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Pulse Ver dispositivos existentes para elegirun dispositivo existente o introduzca la dirección MAC del dispositivo en el campo Dirección MAC.",
                "3. Introduzca una Descripción del dispositivo.",
                "4. Seleccione Habilitar.",
                "5. Haga click en Aceptar."]
} ,{                      
                           type: "step",
                           title: "Para modificar o borrar un dispositivo en la lista",
                           content: "En la tabla, haga click en el icono Editar o en el icono Borrar que corresponda al cliente que desee modificar o borrar."
                       } ,{                      
                           type: "step",
                           title: "Para borrar múltiples dispositivos",
                           content: "Seleccione todos los dispositivos que desee borrar, pulse Borrar."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Gestión Remota",
               CONTENT: [{
                           type: "name",
                           title: "Gestión Remota",
                           content: "La funcionalidad Gestión Remota permite a los dispositivos acceder y gestionar el router.",
       children: [{                      
                           type: "step",
                           title: "Prohibir gestionar el router a todos los dispositivos remotos",
                           content: "Seleccione Deshabilitar la Gestión Remota y haga click en Guardar."
                       } ,{                      
                           type: "step",
                           title: "Permitir gestionar el router a todos los dispositivos remotos",
       content: [ 
                "1. Seleccionar Habilitar la Gestión Remota para TODOS los Dispositivos.",
                "2. Introducir el Puerto de Gestión Web (1024-65535 u 80) a través del cual los dispositivos remotos accederán al router.",
                "3. Haga click en Guardar."]
} ,{                      
                           type: "step",
                           title: "Permitir gestionar el router a un dispositivo remoto específico",
       content: [ 
                "1. Seleccionar Habilitar la Gestión Remota para un Dispositivo Específico.",
                "2. Introducir el Puerto de Gestión Web (1024-65535 u 80) a través del cual los dispositivos remotos accederán al router.",
                "3. Introducir la Dirección IP de Gestión Remota del dispositivo remoto para gestionar el router.",
                "4. Haga click en Guardar."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Gestión Remota",
               CONTENT: [{
                           type: "paragraph",
                           content: "La opción de Gestión Remota le permite acceder y configurare su Router remotamente desde Internet."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Para configurar la Gestión Remota"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Seleccione la casilla para habilitar la funcionalidad de Gestión Remota. "
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Mantenga el Puerto HTTPS y el HTTP como están configurados por defecto."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Seleccione para decidir qué dispositivo remoto puede acceder al router remotamente:",
       children: [{                      
                           type: "name",
                           title: "Todos los Dispositivos",
                           content: "Todos los dispositivos remotos pueden acceder al router."
                       } ,{                      
                           type: "name",
                           title: "Dispositivo Específico",
                           content: "Introduzca la Dirección IP del dispositivo remoto para acceder al router."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Haga click en Guardar."
                       } ,{                      
                           type: "paragraph",
                           content: "Ahora puede gestionar remotamente el router mediante la dirección mostrada como Dirección Web para Gestión."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si aparece un pops up de advertencia cuando visita la dirección de arriba remotamente, haga click en Confiar (u opción similar) para continuar."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Una vez que el Modo Nocturno esté habilitado, los LEDs se apagarán durante el periodo especificado cada día sin afectar al rendimiento del router."
                       } ,{                      
                           type: "step",
                           title: "Habilitar el Modo Nocturno",
       content: [ 
                "1. Seleccione Habilitar Modo Nocturno.",
                "2. Especifique un periodo de tiempo en el que se apaguen los LEDs.",
                "3. Haga click en Guardar."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Registro de Sistema",
               CONTENT: [{
                           type: "paragraph",
                           content: "El Registro de Sistema muestra las actividades más recientes del router. La tabla consiste en el tipo, nivel y contenido del registro de sistema que puede ser filtrado. También puede guardar los registros de sistema en un ordenador local o enviarlos por email."
                       } ,{                      
                           type: "step",
                           title: "Guardar Registros de sistema en ordenador local",
       content: [ 
                "1. Establezca el Tipo y el mínimo nivel para filtrar los registros de sistema deseados. La lista de niveles está en orden descendente, el nivel más bajo es el último.",
                "2. Haga click en Guardar Registro para guardar el archivo de registros de sistema en un ordenador local."]
} ,{                      
                           type: "step",
                           title: "Recibir registros de sistema por email",
       content: [ 
                "1. Establezca el Tipo y el mínimo nivel para filtrar los registros de sistema deseados. La lista de niveles está en orden descendente, el nivel más bajo es el último.",
                "2. Haga click en Ajustes de Email.",
                "3. En el campo De, introduzca una dirección de email válida para ser utilizada como email saliente.",
                "4. En el campo Para: introduzca una dirección de email válida para ser utilizada como email entrante.",
                "5. Introduzca la dirección del Servidor SMTP del email saliente (De).",
                "Nota: Si el email saliente requiere autenticación, seleccione la casilla Habilitar Autenticación e introduzca su Nombre de Usuario (dirección de email) y Contraseña.",
                "6. Si quiere recibir registros de sistema mediante email de manera regular, seleccione la casilla Habilitar Auto Email y establezca una hora específica (en formato 24 horas) o un intervalo de tiempo.",
                "Si quiere recibir inmediatamente los registros de sistema actuales, haga click en Registro de Email Ahora.",
                "7. Click en Guardar."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Monitor de Tráfico",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra el uso del tráfico de un dispositivo en los siguientes 10 minutos o todos los dispositivos pasados 10 minutos/24 horas/7 días."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Lista de Monitorización de Tráfico",
               CONTENT: [{
                           type: "paragraph",
                           content: "La lista está agrupada por tipo de conexión de dispositivo: cableada o inalámbrica."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Parámetros de Sistema",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Inalámbrico 2.4GHz/5GHz",
                           content: "Esta sección le permite configurar los parámetros de reglas de transmisión de tráfico en redes inalámbricas. Se recomienda mantener los ajustes por defecto si no está seguro de cuáles tiene que configurar."
                       } ,{                      
                           type: "name",
                           title: "Intervalo Beacon",
                           content: "Introduzca un valor entre 40 y 1000 en milisegundos para determinar la duración entre los paquetes beacon que son transmitidos por el Router para sincronizar la red inalámbrica. El valor por defecto es 100 milisegundos."
                       } ,{                      
                           type: "name",
                           title: "Umbral RTS",
                           content: "Introduzca un valor entre 1 y 2346 para determinar el tamaño de paquete de transmisión de datos a través del Router. Por defecto, el tamaño del umbral RTS(Solicitudes a Enviar) es 2346. Si el tamaño del paquete es mayor que el del umbral pre establecido, el Router envía tramas de Solicitudes de Envío a una estación receptora particular y negocia el envío de la estructura de datos o de lo contrario el paquete se enviará inmediatamente."
                       } ,{                      
                           type: "name",
                           title: "Intervalo DTIM",
                           content: "Este valor determina el intervalo de DTIM (Mensaje de Indicación de Tráfico Entregado). Introduzca un valor entre 1 y 15 intervalos. El intervalo por defecto es 1, indicando que el intervalo DTIM es el mismo que el Intervalo Beacon."
                       } ,{                      
                           type: "name",
                           title: "Periodo de Grupo de Actualización de Clave",
                           content: "Introduzca el número de segundos (mínimo 30) para controlar el intervalo de tiempo para el cifrado de la renovación automática de claves. El valor por defecto es 0, indicando que no hay renovación de claves."
                       } ,{                      
                           type: "name",
                           title: "Función de WMM",
                           content: "La Función de WMM garantiza los paquetes con mensajes de alta prioridad que se transmiten preferentemente. Está activada de forma predeterminada y altamente recomendable."
                       } ,{                      
                           type: "name",
                           title: "Función de Intervalo de Guardia",
                           content: "Esta función está habilitada por defecto y se recomienda para incrementar la capacidad de paquetes mediante el tiempo GI (Intervalo de Guarda)."
                       } ,{                      
                           type: "name",
                           title: "Función de Aislamiento de AP",
                           content: "Si quiere restringir todos los dispositivos inalámbricos conectados a la red de la interación entre ellos, pero seguir permitiéndoles acceder a Internet, seleccione la casilla Habilitar Aislamiento AP."
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
                           title: "Habilitar WDS",
                           content: "La funcionalidad WDS (Sistema de Distribución Inalámbrico) Bridging le permite extender la cobertura de la red inalámbrica mediante el puente entre un AP (punto de acceso) y una WLAN (red local) inalámbrica."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Seleccione habilitar la funcionalidad WDS Bridging.",
                "2. Para puentear una red mediante la funcionalidad de Escanear: haga click en Escanear para escanear y mostrar todas las redes disponibles y seleccione la red que quiere puentear. El SSID (nombre de red), Dirección MAC y Seguridad aparecerán automáticamente.",
                "O puentear una red manualmente: introduzca el SSID (nombre de red), Dirección MAC y Modo WDS de la red puenteada. Selecione un tipo de Seguridad e introduzca los parámetros necesarios, que deberán ser los mismos que la red puenteada.",
                "3. Haga click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si no está seguro del Modo WDS, mantenga por defecto la opción en Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Configuración de Wi-Fi Protegido) proporciona una fácil conexión entre los dispositivos WPS y el router mediante la pulsación del botón WPS. Compruebe para habilitar la funcionalidad WPS y haga click en Guardar."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Esta funcionalidad está habiltiada por defecto. Se recomienda mantener los ajustes por defecto. Si se deshabilita, puede que no tenga acceso a Internet."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Cuando el NAT esté deshabilitado, las configuraciones en el NAT Forwarding no tendrán efecto."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Seleccione la casilla Habilitar NAT Boost y haga click en Guardar para asegurar que el router tenga el mejor rendimiento."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Nota",
                           content: "Cuando el NAT Boost está activado, las estadísticas de QoS y Tráfico se desactivarán automáticamente."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Ajustes de Protección DOS",
                           content: "La Protección DoS protege el rotuer de ataques ICMP-FLOOD, UDP-FLOOD y TCP-FLOOD."
                       } ,{                      
                           type: "name",
                           title: "Nivel de Paquetes ICMP-FLOOD",
                           content: "Introduzca un valor entre 5 y 7200 para activar inmediatamente la protección ICMP-FLOOD cuando el número de paquetes ICMP exceda el valor de umbral programado."
                       } ,{                      
                           type: "name",
                           title: "Nivel de Paquetes UDP-FLOOD",
                           content: "Introduzca un valor entre 5 y 7200 para activar inmediatamente la protección UDP-FLOOD cuando el número de paquetes UDP exceda el valor de umbral programado."
                       } ,{                      
                           type: "name",
                           title: "Nivel de Paquetes TCP-FLOOD",
                           content: "Introduzca un valor entre 5 y 7200 para activar inmediatamente la protección TCP-SYN-FLOOD cuando el número de paquetes TCP exceda el valor de umbral programado."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Duplex",
                           content: "Seleccione el tipo duplex de la lista desplegable y haga click en Guardar."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Activar",
                           content: "Seleccione esta casilla de verificación para apagar los LED durante el periodo Modo nocturno sin afectar al rendimiento del router."
                       } ,{                      
                           type: "name",
                           title: "Período de modo noche",
                           content: "Especifique el periodo de tiempo en que se aplicará el modo nocturno."
                       } ,{                      
                           type: "paragraph",
                           content: "Haga click en Guardar para guardar todos sus ajustes."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con OpenVPN, puede utilizar Internet para acceder de manera segura a la red cuando está fuera de casa. Para utilizar el Servicio VPN, necesitará configurar el Servicio de DNS Dinámico (recomendado) o asignar una dirección IP estática al puerto WAN del router. El Horario de Sistema debe estar sincronizado con Internet."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Servicio",
                           content: "Seleccione el protocolo de comunicación para el servidor OpenVPN: UDP o TCP."
                       } ,{                      
                           type: "name",
                           title: "Puerto de Servicio",
                           content: "Introduzca un puerto de comunicación entre el 1024 y el 65535. Por defecto el puerto común de servicio es el 1194."
                       } ,{                      
                           type: "name",
                           title: "Subred/Máscara de Red VPN",
                           content: "Introduzca el intervalo de direcciones IP que el servidor OpenVPN puede conceder a los clientes."
                       } ,{                      
                           type: "name",
                           title: "Tipo de Acceso del Cliente",
                           content: "Seleccione el tipo de acceso para el cliente OpenVPN.",
       children: [{                      
                           type: "name",
                           title: "Solo red doméstica",
                           content: "El cliente solo puede acceder a la red doméstica. La ruta del cliente por defecto no cambiará."
                       } ,{                      
                           type: "name",
                           title: "Internet y red doméstica",
                           content: "El cliente puede acceder a la red doméstica y a ubicaciones de internet o servicios con limitación geográfica cuando este fuera del país. La ruta de los clientes por defecto se modificará."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certificado",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Utilice el certificado para la información e identidad de la conexión VPN del ordenador remoto.",
                "Haga clic para generar un nuevo certificado."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Archivo de Configuración",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Los clientes remotos utilizarán el archivo de configuración para acceder a su router.",
                "Haga clic en este botón para guardar el archivo de configuración OpenVPN que se utilizará para agregar una nueva conexión VPN."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Guía de instalación del cliente VPN",
               CONTENT: [{
                           type: "step",
                           title: "Conectar los dispositivos clientes al servidor OpenVPN:",
       content: [{                      
                           type: "paragraph",
                           content: "Antes de configurar el servidor OpenVPN, por favor configure el Servicio de DNS Dinámico (recomendado) o asigne una dirección IP estática para el puerto WAN. Asegúrese que el puerto externo de los ajustes NAT no es el puerto de servicio y que el Horario de Sistema está sincronizado con Internet."
                       },
                "1. Seleccione Habilitar Servidor VPN.",
                "2. Configure los parámetros del servidor OpenVPN (Tipo de Servicio, Puerto de Servicio, Acceso de Cliente y Subred/Máscara de Red VPN) y haga click en Guardar.",
                "3. Haga click en Exportar para guardar el archivo de configuración.",
                "4. En los dispositivos clientes, descargue e instale la utilidad cliente OpenVPN de <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "Las plataformas oficiales soportadas son Windows, Mac OSX y Linux.",
                "5. Inicie la utilidad cliente OpenVPN y añada una nueva conexión VPN utilizando el archivo de configuración guardado para conectar el dispositivo cliente al servidor VPN."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Para obtener más información sobre los clientes OpenVPN, visite <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con VPN PPTP, puede utilizar Internet para acceder rápida y fácilmente a la red cuando está fuera de casa. Esto puede estar deshabilitado en algunos ISPs. Para utilizar el Servicio VPN, necesitará configurar el Servicio de DNS Dinámico (recomendado) o asignar una dirección IP estática para el puerto WAN del router. El Horario del Sistema debe estar sincronizado con Internet."
                       } ,{                      
                           type: "name",
                           title: "Dirección IP del Cliente",
                           content: "Introduzca el intervalo de direcciones IP (hasta 10 clientes) que el servidor PPTP VPN puede conceder a los clientes."
                       } ,{                      
                           type: "name",
                           title: "Nombre de usuario y contraseña",
                           content: "Introduzca el nombre de usuario y contraseña para la autenticación de clientes del servidor PPTP VPN."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Guía de instalación del cliente VPN",
               CONTENT: [{
                           type: "step",
                           title: "Conectar los dispositivos clientes al servidor VPN PPTP:",
       content: [{                      
                           type: "paragraph",
                           content: "Antes de configurar el servidor VPN PPTP, por favor configure el Servicio de DNS Dinámico (recomendado) o asigne una dirección IP estática para el puerto WAN. Asegúrese que el puerto externo de los ajustes NAT no es el 1723 y que el Horario del Sistema está sincronizado con Internet."
                       },
                "1. Seleccione Habilitar Servidor VPN.",
                "2. Configure los parámetros del servidor VPN PPTP y haga click en Guardar.",
                "3. En los dispositivos clientes, cree una conexión VPN PPTP. Las plataformas oficiales soportadas son Windows, Mac OSX, Linux, iOS y Android.",
                "4. Inicie el programa VPN PPTP, añada una nueva conexión e introduzca el nombre de dominio del servicio DDNS registrado o de la dirección IP estática que está asignada al puerto WAN, para conectar el dispositivo cliente al servidor VPN PPTP."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"Conexiones VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta página muestra los clientes que actualmente están conectados a los servidores OpenVPN y PPTP VPN alojados en el router."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Mapa de Red",
               CONTENT: [{
                           type: "paragraph",
                           content: "En el Mapa de Red, puede visualizar el estado de la conexión actual, la información inalámbrica del router y la información de los dispositivos conectados."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información de Internet."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información de red actual de las redes inalámbricas y los puertos LAN."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Clientes cableados/Inalámbricos",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra el nombre de red (editable), IP asignada y dirección MAC de los clientes conectados del router."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Impresora",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra el nombre de la impresora conectada al router a través del puerto USB."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"Disco USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información relevante del disco USB conectado al router mediante el puerto USB."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Prueba de velocidad",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta funcionalidad prueba las velocidades actuales de subida y bajada que recibe de su proveedor de servicios y proporciona consejos útiles sobre las capacidades de su Internet."
                       } ,{                      
                           type: "paragraph",
                           content: "Consejo: Para conseguir un resultado más preciso, intente cerrar otras apps y programas."
                       } ,{                      
                           type: "paragraph",
                           content: "Historial - Grabación de anteriores tests de velocidad."
                       } ,{                      
                           type: "paragraph",
                           content: "Probar Otra vez - Click para probar un test de velocidad."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Haga click en Auto Detectar o seleccione el tipo de conexión manualmente. Después introduzca los parámetros correspondientes proporcionados por el ISP."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Conexión inteligente",
               CONTENT: [{
                           type: "paragraph",
                           content: "Seleccione esta casilla de verificación para habilitar la conexión inteligente. Esta función permite que los dispositivos se ejecuten más rápido asignándolos a mejores bandas inalámbricas en función de las condiciones reales para equilibrar las demandas de red."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Configuración inalámbrica",
               CONTENT: [{
                           type: "paragraph",
                           content: "Puede configurar los ajustes inalámbricos (SSID, contraseña, etc.)"
                       } ,{                      
                           type: "name",
                           title: "Nombre de red (SSID)",
                           content: "Se recomienda que cambie el nombre de red (SSID). Este campo distingue en mayúsculas y minúsculas."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccione si quiere ocultar el nombre de red (SSID) de 2.4GHZ/5GHz de la lista de redes inalámbricas. Una vez seleccionado, el SSID no será emitido y tendrá que unirse a la red manualmente. "
                       } ,{                      
                           type: "name",
                           title: "Contraseña",
                           content: "Introduzca una contraseña inalámbrica de entre 8 y 63 caracteres ASCII ó entre 8 y 64 caracteres Hexadecimales. Este campo distingue entre mayúsculas y minúsculas."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"Dispositivo de Almacenamiento USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta funcionalidad le permite compartir dispositivos de almacenamiento USB en diferentes clientes en la red de área local o a través de Internet."
                       } ,{                      
                           type: "title",
                           title: "Dispositivos de Almacenamiento USB",
                           content: "La sección de Ajustes del Dispositivo muestra la información básica del dispositivo de almacenamiento USB conectado al puerto USB. Un disco flash USB suele tener solo un volumen."
                       } ,{                      
                           type: "name",
                           title: "Escanear",
                           content: "Normalmente, el router detecta automáticamente cualquier dispositivo nuevo introducido. Si no, haga click en este botón para escanear y actualizar la pantalla con la información actualizada.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "Un área gris representa que el volumen está deshabilitado. Puede hacer click en el área para compartir el volumen específico."
                       }]
} ,{                      
                           type: "name",
                           title: "Quitar",
                           content: "Haga click en este botón para extraer de manera segura el dispositivo de almacenamiento USB antes de desconectarlo físicamente del puerto USB.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "El botón Quitar solo aparecerá cuando un dispositivo de almacenamiento USB esté conectado al router. Cuando el volumen actual esté ocupado, no podrá extraerlo."
                       }]
} ,{                      
                           type: "step",
                           title: "Para configurar un servidor de archivos",
       content: [ 
                "1. Introduzca el dispositivo de almacenamiento USB en el puerto USB directamente o utilice un cable USB. Si el dispositivo requiere una fuente de alimentación extra, asegúrese que la fuente externa está conectada.",
                "2. El nuevo dispositivo USB introducido debería ser detectado automáticamente por el router y mostrado debajo de la sección Ajustes del Dispositivo. Si no, haga click en Escanear.",
                "Nota: El icono Compartir aparece cuando más de 5 volúmenes están conectados al router. Puede hacer click en el icono para deshabilitar volúmenes que no necesite compartir."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Dirección de Acceso",
               CONTENT: [{
                           type: "name",
                           title: "Red/Nombre del servidor",
                           content: "Muestra el nombre utilizado para acceder al dispositivo de almacenamiento USB conectado mediante el método de Descubrimiento de Vecinos de Red o mediante la funcionalidad de Compartición Multimedia. Por defecto es TP-Share."
                       } ,{                      
                           type: "name",
                           title: "Método de Acceso",
                           content: "Hay 4 métodos de acceder al dispositivo de almacenamiento USB compartido.",
       children: [{                      
                           type: "name",
                           title: "Redes vecinas",
                           content: "Seleccione esta opción para permitir a los usuarios en la red a acceder al contenido compartido mediante la dirección mostrada bajo la columna Dirección."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Seleccione esta opción para habilitar la funcionalidad del servidor FTP que permite a los clientes y usuarios FTP en la red acceder al dispositivo de almacenamiento USB mediante la dirección FTP mostrada bajo la columna Dirección."
                       } ,{                      
                           type: "name",
                           title: "FTP (mediante Internet)",
                           content: "Seleccione esta opción para permitir a los clientes y usuarios FTP acceder remotamente, descargar y subir archivos para compartir el dispositivo de almacenamiento USB mediante FTP sobre Internet. Para personalizar la dirección de acceso, haga click en Editar y establecer el DNS Dinámico en el router. Para cambiar el puerto del servidor FTP, introduzca un nuevo puerto y haga click en Guardar para aplicar los cambios."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Seleccione esta opción para habilitar la función servdidor SFTP que permite a los clientes SFTP y usuarios en la red el acceso al dispositivo de almacenamiento USB a través de la dirección SFTP mostrada debajo de la columna de Dirección."
                       }]
} ,{                      
                           type: "name",
                           title: "Dirección",
                           content: "Muestra la dirección utilizada para acceder al dispositivo de almacenamiento USB."
                       } ,{                      
                           type: "name",
                           title: "Puerto",
                           content: "Muestra el puerto utilizado para acceder al servidor FTP."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Contenido Compartido",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la carpeta que está compartiendo. Todas las carpetas está compartidas por defecto. Puede hacer click en el icono Editar para personalizar las carpetas compartidas."
                       } ,{                      
                           type: "note",
                           title: "Nota",
                           content: "El icono Compartir aparece en la sección Ajustes del Dispositivo cuando más de 5 volúmenes están conectados al router. Puede hacer click en el icono Compartir para deshabilitar volúmenes que no necesite compartir."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Contenido Compartido y Seguridad",
               CONTENT: [{
                           type: "name",
                           title: "Contenido Compartido",
                           content: "Muestra la carpeta que está compartiendo. Todas las carpetas está compartidas por defecto. Puede hacer click en el icono Editar para personalizar las carpetas compartidas.",
       children: [{                      
                           type: "note",
                           title: "Nota",
                           content: "El icono Compartir aparece en la sección Ajustes del Dispositivo cuando más de 5 volúmenes están conectados al router. Puede hacer click en el icono Compartir para deshabilitar volúmenes que no necesite compartir."
                       }]
} ,{                      
                           type: "name",
                           title: "Autenticación de Acceso",
       content: [ 
                "Actívelo para habilitar la autenticación requerida para que los usuarios introduzca un nombre de usuario y contraseña válidos para acceder a todas las carpetas compartidas. Accediendo como Administrador puede leer y modificar los archivos mientras el Usuario solo puede leer los archivos.",
                "El nombre de usuario debe empezar con una letra o un símbolo y contener entre 1 y 15 caracteres utilizando letras, números o símbolos.",
                "La contraseña debe contener entre 1 y 15 caracteres utilizando letras, números y símbolos."]
} ,{                      
                           type: "name",
                           title: "Permitir el acceso de invitados Red",
                           content: "Actívelo para permitir a los usuarios de la red de invitados acceder a todas las carpetas compartidas."
                       } ,{                      
                           type: "name",
                           title: "Habilitar el uso multimedia compartido",
                           content: "Con esta funcionalidad habilitada, todos los dispositivos que soporten DLNA en la red local podrán acceder a los archivos multimedia en todas las carpetas compartidas. Los usuarios no necesitarán introducir nombre de usuario o contraseña incluso si está habilitada la Autenticación de Acceso."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Servidor de Impresión",
               CONTENT: [{
                           type: "name",
                           title: "Servidor de Impresión",
                           content: "Actívelo para habilitar la función del Servidor de Impresión."
                       } ,{                      
                           type: "name",
                           title: "Nombre de la impresora",
                           content: "Muestra el nombre de la impresora conectada al router."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con la configuración básica del Control Parental, puede restringir el acceso durante ciertos periodos del día (por ejemplo, sin acceso a Internet en el PC de los niños durante la hora de los deberes)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Dispositivos Bajo el Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra la información y ajustes de los dispositivos que están actualmente restringidos por Control Parental."
                       } ,{                      
                           type: "step",
                           title: "Para restringir un nuevo dispositivo cliente",
       content: [ 
                "1. Active los Controles Parentales.",
                "2. Haga click en Añadir.",
                "3. Haga click en Escanear para elegir un dispositivo conectado de la Lista de Acceso de Dispositivos; o introduzca el Nombre del Dispositivo y Dirección MAC manualmente para añadir un dispositivo que no esté conectado.",
                "4. Haga click en el icono de Tiempo Efectivo para especificar un periodo de tiempo por el cual se aplican las restricciones.",
                "5. Introduzca una breve descripción en el campo Descripción. Este campo es opcional.",
                "6. Seleccione Habilitar Esta Entrada.",
                "7. Click en Guardar."]
} ,{                      
                           type: "note",
                           title: "Nota",
                           content: "Si quiere deshabilitar esta entrada, haga click en el icono de la Bombilla."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Red de Invitados",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta función le permite proporcionar acceso Wi-Fi a los invitados sin revelar la red principal."
                       } ,{                      
                           type: "name",
                           title: "Permitir a los invitados verse",
                           content: "Seleccione esta casilla para permitir a los dispositivos inalámbricos en la Red de Invitados comunicarse con los demás mediante métodos como network neighbors, Samba, Ping y FTP."
                       } ,{                      
                           type: "name",
                           title: "Permitir a los Invitados Acceder a Mi Red Local",
                           content: "Seleccione esta casilla para permitir a los dispositivos inalámbricos en la Red de Invitados comunicarse con los dispositivos conectados a los puertos LAN del router o red principal mediante métodos como network neighbors, Samba, Ping y FTP."
                       } ,{                      
                           type: "name",
                           title: "Habilitar invitado de red",
                           content: "Seleccione esta casilla de verificación para activar la función de red de invitados."
                       } ,{                      
                           type: "name",
                           title: "Nombre de red (SSID)",
                           content: "Utilizar el SSID de Invitado por defecto o crear un nuevo nombre (hasta 32 caracteres)."
                       } ,{                      
                           type: "name",
                           title: "Ocultar SSID",
                           content: "Seleccione esta casilla de verificación si desea ocultar el SSID de invitados en la lista de redes Wi-Fi."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Intervalo de Actualización de la contraseña",
                           content: "Seleccionar el intervalo de actualización de la contraseña de Red de Invitados."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Contraseña",
                           content: "Cree una contraseña de entre 8 y 63 caracteres ASCII o de entre 8 y 64 caracteres hexadecimales (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Contraseña",
                           content: "Use o bien la contraseña generada de manera aleatoria, o cree una contraseña entre 8 y 63 caracteres ASCII o entre 8 y 64 caracteres hexadecimales (0-9,a-f,A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "El servicio TP-Link Cloud le permite monitorizar remotamente su red en directo, acceder y gestionar sus dispositivos TP-Link desde Internet en cualquier momento y en cualquier lugar."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Información de la Cuenta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra su información de ID de TP-Link. Puede editar la información de su cuenta pulsando en el icono de Editar."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Información del Dispositivo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Muestra la información de su dispositivo, incluyendo la cuenta cloud que está gestionando el dispositivo."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Cuentas Vinculadas",
               CONTENT: [{
                           type: "paragraph",
                           content: "Esta tabla muestra todas las cuentas cloud que están actualmente vinculadas a este dispositivo."
                       } ,{                      
                           type: "step",
                           title: "Vincular una cuenta de usuario",
       content: [ 
                "1. Haga click en Vincular.",
                "2. Introduzca el email registrado que quiera vincular.",
                "3. Haga click en Guardar."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Con filtrados de antigüedad, límites de acceso y perfiles de usuario, los Controles Parentales proporcionan a su familia un acceso a internet apropiado y personalizado."
                       } ,{                      
                           type: "step",
                           title: "Aplicar los Controles Parentales a un nuevo dispositivo",
       content: [ 
                "1. Haga click en Añadir.",
                "2. Introduzca un nombre para este perfil y haga click en \"+\" para añadir dispositivos bajo este perfil.",
                "3. Seleccione un Nivel de Filtro y personalice el contenido del filtro según sus necesidades. Puede introducir palabras clave para buscar páginas web que quiera filtrar en nuestra base de datos. Otras páginas web (URLs) pueden ser introducidas manualmente.<br/>Diríjase a las siguientes explicaciones para las diferentes categorías de filtros:<p>Contenido Adulto-Sitios con contenido sexual, contenido ilícito o dañino, incluyendo pornografía, uso de sustancias, violencia y discriminación</p><p>Juego-Sitios que promueban o proporcionen información sobre juego, incluyendo sitios de juego online</p><p>Educación Sexual - Sitios que hablen sobre información relativa a la sexualidad, incluyendo reproducción, sexualidad, seguridad sexual e información sobre como dar a luz, enfermedades de transmisión sexual y traumas sexuales</p><p>Comunicación Online - Sitios que tengan formatos de comunicación mediante texto, voz o vídeo, incluyendo email, blogs, fórums online, servicios de chat de VoIP y vídeo</p><p>Redes Sociales - Sitios que distribuyan información personal, enlaces a personas y su actividad personal basada en intereses similares, trayectoria profesional, experiencia o aptitudes</p><p>Pay to Surf - Sitios que compensan a los usuarios para ver determinados sitios web, mensajes de correo electrónico o anuncios, hacer clic en vínculos o responder a encuestas</p><p>Multimedia - Sitios que ofrecen o dan acceso a administradores de webs o descarga de videojuegos, incluyendo videojuegos online, videoconsolas en red y navegadores de juegos</p>",
                "4. Si desea limitar el tiempo total que este perfil puede estar conectado, habilite y especifique Límites de Tiempo. También puede utilizar Hora de irse a la Cama para establecer un período de tiempo diario durante el cual los dispositivos de este perfil no pueden utilizar Internet.",
                "5. Haga click en Guardar."]
} ,{                      
                           type: "step",
                           title: "Ver el perfil detallado del historial de internet ",
       content: [ 
                "1. En la columna Insights, haga clic en el botón Insights correspondiente.",
                "2. Si quiere ver más grabaciones, haga click en botón de Historial <span class=\"ptl-ctr-help-icon history\"></span>.",
                "3. Puede bloquear o desbloquear páginas web haciendo click en el botón <span class=\"ptl-ctr-help-icon block\"></span> or <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Deshabilitar o habilitar el acceso a Internet inmediatamente.",
       content: [ 
                "En la columna Acceso a Internet, haga click en <span class=\"ptl-ctr-help-icon stop\"></span> to stop the corresponding profile's devices from accessing the internet and click <span class=\"ptl-ctr-help-icon enable\"></span>para habilitar el acceso otra vez."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "La funcionalidad QoS (Calidad de Servicio) prioriza las actividades y dispositivos online para garantizar una conexión de red más rápida cuando más lo necesites."
                       } ,{                      
                           type: "paragraph",
                           content: "Seleccione la Prioridad de Aplicación para priorizar la velocidad de red para actividades online y seleccione el Prioridad de Dispositivo para priorizar la velocidad de red de los dipositivos."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Prioridad de Aplicación",
               CONTENT: [{
                           type: "paragraph",
                           content: "Elija las actividades online que quiere priorizar o haga click en Personalizar para establecer el nivel de prioridad de cada actividad online."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Prioridad de Dispositivo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Elija los dispositivos que quiere priorizar y cuánto quiere que dure dicha priorización."
                       } ,{                      
                           type: "step",
                           title: "Priorizar un dispositivo",
       content: [ 
                "1. Encontrar el dispositivo que quiere priorizar en la lista y activar Prioridad.",
                "2. Select how long the device will be prioritized for in the Timing column."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivirus",
               CONTENT: [{
                           type: "paragraph",
                           content: "With frequent network scans, malicious site detection and infected device isolation, the Antivirus feature keeps your personal information secure. You can also check how your network is protected, and if there have been any attacks on your network."
                       } ,{                      
                           type: "paragraph",
                           content: "History - Records the devices that have been protected by Antivirus and the source and classification of the attacks."
                       } ,{                      
                           type: "paragraph",
                           content: "Habilitar Todo - Seleccione para habilitar todos los tipos de Protecciones si uno o más no están habilitados."
                       } ,{                      
                           type: "paragraph",
                           content: "Tipos de Protección - Habilita los Tipos de Protección mediante las siguientes explicaciones. Se recomienda habilitar todos los Tipos de Protecciones."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Prioridad de Aplicación",
               CONTENT: [{
                           type: "paragraph",
                           content: "La funcionalidad de Prioridad de Aplicación prioriza las actividades online para garantizar una conexión de red más rápida cuando más lo necesite. Elija la actividad online que quiera priorizar o haga click en Personalizar para establecer el nivel de prioridad de cada actividad online."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Prioridad de Dispositivo",
               CONTENT: [{
                           type: "paragraph",
                           content: "La funcionalidad de Prioridad de Dispositivo prioriza los dispositivos para garantizar una conexión de red más rápida cuando más lo necesite. Elija los dispositivos que quiera priorizar y cuánto quiere que dure dicha priorización. "
                       } ,{                      
                           type: "step",
                           title: "Priorizar un dispositivo",
       content: [ 
                "1. Encontrar el dispositivo que quiere priorizar en la lista y activar Prioridad.",
                "2. Select how long the device will be prioritized for in the Timing column."]
}]
},
       FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "paragraph",
                           content: "Firewall SPI (Stateful Packet Inspection) previene ciber ataques y validaciones de tráfico que pasan a través del router basándose en el protocolo. Por defecto, esta funcionalidad está habilitada."
                       } ,{                      
                           type: "name",
                           title: "Habilitar Firewall SPI",
                           content: "No deshabilitar el Firewall SPI a menos que sea necesario."
                       } ,{                      
                           type: "name",
                           title: "Permitir Pings desde Puerto WAN/Permitir Pings desde Puerto LAN",
                           content: "Habilitar para permitir paquetes ping desde puerto WAN/LAN. Se recomienda mantener los valores por defecto."
                       }]
},
       "" :     ""
    };
})(jQuery);