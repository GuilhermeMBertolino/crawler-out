var AccessCtrlAccessRulesAdvHelpRpm =
{
	"header": "Ayuda de Agregar o Modificar una Entrada de Control de Acceso de Internet",
	"brief": "Puede crear una regla nueva en esta página.",
	"description": "<B>Descripción</B> - En este campo, se crea un nombre para la regla. Tome en cuenta que este nombre debe ser <b>único</b>.",
	"lan_host": "<B>Host de LAN</B> - En este campo, seleccionar un host de la lista desplegable para la regla.",
	"target": "<B>Destino</B> - En este campo, seleccionar un destino de la lista desplegable para la regla. El valor predeterminado es Cualquier Destino.",
	"schedule": "<B>Horario</B> - En este campo, seleccionar un horario de la lista desplegable pata la regla. El valor predeterminado es en Cualquier Momento.",
	"rule": "<B>Regla</B> - En este campo, seleccionar Permitir o Denegar de la lista desplegable para la regla. El valor predeterminado es Denegar.",
	"direction": "<B>Dirección</B> - En este campo, seleccionar IN (dentro) o OUT (fuera) de la lista desplegable para la dirección.",
	"protocol": "<b>Protocolo</b> - En este campo, hay cuatro opciones, Todos, TCP, UDP, and ICMP. Seleccione una de ellas de la lista desplegable para el destino.",
	"save": "Dar clic en <B>Guardar</B> para completar las configuraciones.",
	"back": "Dar clic en el botón de <B>Regresar</B> para regresar a la página de Administración de la Regla de Control de Acceso."
};
var AccessCtrlAccessRulesHelpRpm =
{
	"header": "Ayuda de Administración de Reglas de Control de Acceso de Internet",
	"brief": "El Router, que suministra la función de <B>control de acceso de Internet</B> conveniente y potente, puede controlar las actividades de internet de los hosts en la LAN. Además, puede combinar de manera flexible la <B>Lista de Host</B>, <B>Lista Destino</B> y el <B>Horario</B> para restringir la navegación de Internet de estos hosts.",
	"internet": "<B>Habilitar el Control de Acceso a Internet </B> - Poner una marca de selección en la casilla para habilitar la función de Control de Acceso de Internet, para que la Regla de Filtros Predeterminada pueda tomar efecto.",
	"description": "<B>Descripción</B> - Aquí se muestra el nombre de la regla y este nombre es único.",
	"lan_host": "<B>Host de LAN</B> - Aquí se muestran los host seleccionados en la regla correspondiente.",
	"target": "<B>Destino</B> - Aquí se muestra el destino seleccionado en la regla correspondiente.",
	"schedule": "<B>Horario</B> - Aquí se muestra el horario seleccionado en la regla correspondiente.",
	"rule": "<B>Regla</B> - Permite o deniega los paquetes no especificados por cualquier regla de filtración que pase a través de este dispositivo. ",
	"status": "<B>Estado</B> - El estado de la regla.",
	"edit": "<B>Editar</B> - Aquí puede editar una regla existente.",
	"for_exam": "<B>Por ejemplo</B>: Si desea permitir que el host con la dirección MAC <font color=\"#C11C66\">00:11:22:33:44:AA</font> tenga acceso <b>www.google.com</b> únicamente de <b>18:00</b> a <b>20:00</b> el <b>Sábado y Domingo</b>, y <b>prohibir</b> que los otros hosts en la LAN tengan acceso a Internet, debe seguir las siguientes configuraciones que se muestran a continuación:",
	"rule_0": "Dar clic en el submenú de <b>Regla</b> de <b>Control de Acceso</b> de la izquierda para regresar a la página de la Lista de Reglas. Seleccionar Habilitar el Control de Acceso de Internet y seleccionar \"Negar que los paquetes no especificados por alguna de las reglas de filtración pasen a través de este dispositivo \".",
	"setup_wiza": "Le recomendamos que dé clic en el botón de <b>Asistente de Configuración</b> para finalizar todas las configuraciones siguientes.",
	"host": "Dar clic en el submenú de <b>Host</b> de <b>Control de Acceso</b> de la izquierda para ingresar a la página de la Lista de Host. Agregar una entrada nueva con la Descripción del Host es Host_1 y la Dirección MAC es 00:11:22:33:44:AA.",
	"target_0": "Dar clic en el submenú de <b>Destino</b> de <b>Control de Acceso</b> de la izquierda para ingresar a la página de la Lista Destino. Agregar una entrada nueva con la Descripción del Destino es Destino_1 y Nombre de Dominio es www.google.com.",
	"schedule_0": "Dar clic en el submenú de <b>Horario</b> de <b>Control de Acceso</b> de la izquierda para ingresar a la página de la Lista de Horarios. Agregar una entrada nueva con la Descripción del Horario es Horario_1, el Día es Sábado y Domingo, la Hora de Inicio es 1800 y la Hora de Detención es 2000.",
	"rule_1": "Dar clic en el submenú de <b>Regla</b> de <b>Control de Acceso</b> de la izquierda. Dar clic en <b>Agregar Nuevo</b> para agregar una regla nueva como se muestra a continuación:",
	"s_0": "En el campo de Nombre de la Regla, crear un nombre para la regla. Tome en cuenta que este nombre debe ser único, por ejemplo, Regla_1.",
	"s_1": "En el campo de Host, seleccionar Host_1.",
	"s_2": "En el campo de Destino, seleccionar Destino_1.",
	"s_3": "En el campo de Horario, seleccionar Horario_1.",
	"s_4": "En el campo de Estado, seleccionar Habilitar.",
	"s_5": "Dar clic en Guardar para completar las configuraciones.",
	"s_6": "Después regresará a la página de Administración de Reglas de Control de Acceso y verá la siguiente lista:",
	"add_new": "Dar clic en el botón de <b>Agregar Nuevo</b> para agregar una entrada nueva de regla.",
	"enable_sele": "Dar clic en el botón de <b>Habilitar Seleccionado</b> para habilitar las reglas seleccionadas en la lista.",
	"disable_sele": "Dar clic en el botón de <b>Deshabilitar Seleccionado</b> para deshabilitar las reglas seleccionadas en la lista.",
	"delete_sele": "Dar clic en el botón de <b>Borrar Seleccionado</b> para borrar las entradas seleccionadas en la tabla.",
	"note": "<B>Nota:</B> El router primero intentará asociar el paquete con las reglas de filtrado habilitadas una por una en la lista y aplicará la primera regla de concordancia. Si el paquete no está especifica por ninguna regla de filtración en la lista, entonces la Regla de Filtración Predeterminada tomará efecto.",
	td_description: "Descripción",
	td_lan: "Host de LAN",
	td_target: "Destino",
	td_sched: "Horario",
	td_rule: "Regla",
	td_status: "Estado",
	td_edit: "Editar",
	td_allow: "Permitir",
	td_enable: "Habilitar"
};
var AccessCtrlAccessTargetsAdvHelpRpm =
{
	"header": "Ayuda de Agregar una Entrada Destino de Acceso",
	"brief": "Puede crear una entrada para la lista destino en esta página.",
	"mode": "<B>Modo</B> - Aquí hay tres opciones, Dirección IP, Dirección MAC, Dirección URL. Puede seleccionar cualquiera de ellas de la lista desplegable.",
	"description": "<B>Descripción</B> - En este campo, se crea una descripción para el destino. Tome en cuenta que esta descripción debe ser <b>única</b>.",
	"ip_addr": "Si se selecciona <B>Dirección IP</B>, verá los siguientes elementos:",
	"ip_addr_0": "<B>Dirección IP</B> - Ingresar la dirección IP (o rango de direcciones) del destino (destinos) en formato decimal con puntos, por ejemplo 192.168.0.23.",
	"port": "<B>Puerto</B> - Aquí se listan algunos puertos de servicio común. Seleccione uno de la lista desplegable, y el número de puerto correspondiente se llenaría automáticamente en el campo de Puerto Destino. Por ejemplo, si selecciona \"FTP\", \"21\" se llenará el Puerto Destino automáticamente.",
	"url_addr": "Si se selecciona <B>Dirección URL</B>, verá los siguientes elementos:",
	"url_addr_0": "<B>Dirección URL </B> - Aquí puede ingresar 4 URLs, ya sea el nombre completo o las palabras clave (por ejemplo google). Cualquier URL con palabras clave en el mismo (www.google.com, www.google.cn) será bloqueado o permitido.",
	"save": "Dar clic en <B>Guardar</B> para completar las configuraciones.",
	"back": "Dar clic en el botón de <B>Regresar</B> para regresar a la página de Configuraciones del Destino."
};
var AccessCtrlAccessTargetsHelpRpm =
{
	"header": "Ayuda de Configuraciones de Destino",
	"brief": "El Router, que suministra la función de control de acceso de Internet conveniente y potente, puede controlar las actividades de internet de los hosts en la LAN. En esta página, puede crear una lista destino para que los hosts tengan acceso o no.",
	"description": "<B>Descripción</B> - Aquí se muestra la descripción acerca del destino y esta descripción es <B>única</B>.",
	"details": "<B>Detalles</B> - El destino puede ser la dirección IP, puerto o nombre de domino.",
	"edit": "<B>Editar</B> - Para editar una entrada existente.",
	"for_exam": "<B>Por ejemplo</B>: Si desea restringir el acceso a actividades de internet del host con la dirección MAC <font color=\"#C11C66\">00:11:22:33:44:AA</font> en la LAN a <B>www.google.com</B> únicamente, primero debe seguir las siguientes configuraciones que se muestran a continuación:",
	"s_0": "Dar clic en el botón de Agregar Nuevo para ingresar a la página de Configuraciones de la Lista Destino.",
	"s_1": "En el campo de Modo, seleccionar el Nombre de Dominio de la lista desplegable.",
	"unique": "En el campo de Descripción del Destino, crear una descripción <B>única</B> para el destino. (Ejemplo, Destino_1)",
	"google": "En el campo de Nombre de Dominio, ingresar <B>www.google.com</B>.",
	"save": "Dar clic en <B>Guardar</B> para completar las configuraciones.",
	"s_2": "Después regresará a la página de Destino y verá la siguiente lista:",
	"add_new": "Dar clic en el botón de <b> Agregar Nuevo</b> para agregar una entrada nueva del destino.",
	"delete_sele": "Dar clic en el botón de <b>Borrar Seleccionado</b> para borrar las entradas seleccionadas en la tabla.",
	td_description: "Descripción",
	td_details: "Detalles",
	td_edit: "Editar"
};
var AccessCtrlHostsListsAdvHelpRpm =
{
	"header": "Ayuda de Agregar o Editar una Entrada de Host ",
	"brief": "Puede crear una entrada para la lista de hosts en esta página.",
	"mode": "<B>Modo</B> - Aquí hay dos opciones, Dirección IP y Dirección MAC. Puede seleccionar cualquiera de ellas de la lista desplegable.",
	"description": "<B>Descripción</B> - En este campo, se crea una descripción <B>única</B> para el host.",
	"ip_addr": "Si se selecciona <B>Dirección IP</B>, puede ver el siguiente elemento:",
	"address": "<B>Dirección IP de la LAN</B> - Ingresar la dirección IP o el rango de direcciones del host en formato decimal con puntos, por ejemplo 192.168.0.23.",
	"mac_addr": "Si se selecciona <B>Dirección MAC</B>, puede ver el siguiente elemento:",
	"mac_addr_0": "<B>Dirección MAC</B> - Ingresar la Dirección MAC del host en el formato XX:XX:XX:XX:XX:XX, por ejemplo 00:11:22:33:44:AA.",
	"save": "Dar clic en <B>Guardar</B> para completar las configuraciones.",
	"back": "Dar clic en el botón de <B>Regresar</B> para regresar a la página de Configuraciones de Host."
};
var AccessCtrlHostsListsHelpRpm =
{
	"header": "Ayuda de Configuraciones del Host",
	"brief": "El Router, que suministra la función de control de acceso de Internet conveniente y potente, puede controlar las actividades de internet de los hosts en la LAN. En esta página, puede configurar una lista de los hosts que es necesario que tengan acceso a la Regla de Control de Acceso.",
	"description": "<B>Descripción </B> - Aquí se muestra la descripción del host y esta descripción es <b>única</b>.",
	"addr_info": "<B>Información de la Dirección </B> - Aquí muestra la información acerca del host. Puede ser IP o MAC.",
	"edit": "<B>Editar </B> - Para editar una entrada existente.",
	"for_exam": "<B>Por ejemplo</B>: Si desea restringir las actividades de internet del host con la dirección MAC <font color=\"#C11C66\">00:11:22:33:44:AA</font>, primero debe seguir las siguientes configuraciones que se muestran a continuación:",
	"add_new": "Dar clic en el botón de <B>Agregar Nuevo</B> para ingresar a la página de Configuraciones de la Lista de Host.",
	"s_0": "En el campo de Modo, seleccionar Dirección MAC de la lista desplegable.",
	"unique": "En el campo de Nombre del Host, crear una descripción <B>única</B> para el destino para el host. (Ejemplo, Host_1)",
	"aa": "En el campo de Dirección MAC, ingresar <B>00:11:22:33:44:AA</B>.",
	"save": "Dar clic en <B>Guardar</B> para completar las configuraciones.",
	"s_1": "Después regresará a la página de Host y verá la siguiente lista:",
	"add_new_0": "Dar clic en el botón de <b> Agregar Nuevo</b> para agregar una entrada nueva de lista de host.",
	"delete_sele": "Dar clic en el botón de <b>Borrar Seleccionado</b> para borrar las entradas seleccionadas en la tabla.",
	td_description: "Descripción",
	td_addr: "Información de la Dirección",
	td_edit: "Editar"
};
var AccessCtrlTimeSchedAdvHelpRpm =
{
	"header": "Ayuda de Agregar o Editar una Entrada de Horario",
	"brief": "Puede crear una entrada para la lista de horarios en esta página.",
	"description": "<B>Descripción </B> - En este campo, crear una descripción para el horario. Tome en cuenta que esta descripción debe ser <b>única</b>, por ejemplo Horario_1.",
	"apply": "<B>Aplicar A </B> - En este campo, seleccionar \"Cada Semana\" y el día (días) que necesita, o seleccione \"Cada Día\".",
	"time": "<B>Hora de Inicio/Final </B> - En estos campos, puede seleccionar la Hora de Inicio y la Hora Final en el campo correspondiente.",
	"save": "Dar clic en <B>Guardar</B> para completar las configuraciones.",
	"back": "Dar clic en el botón de <B>Regresar</B> para regresar a la página de Configuraciones de Horario."
};
var AccessCtrlTimeSchedHelpRpm =
{
	"header": "Ayuda de Configuraciones del horario",
	"brief": "El Router, que suministra la función de control de acceso de Internet conveniente y potente, puede controlar las actividades de internet de los hosts en la LAN. Puede configurar las listas de horarios en esta página para controlar las actividades de Internet de los hosts en ciertos horarios.",
	"descript": "<B>Descripción</B> - Aquí se muestra la descripción del horario y esta descripción es <b>única</b>",
	"edit": "<B>Editar</B> - Aquí puede editar un horario existente.",
	"for_exam": "<B>Por ejemplo</B>: Si desea restringir el acceso a actividades de internet del host con la dirección MAC 00:11:22:33:44:AA a www.google.com únicamente <b>de 18:00 a 20:00</b> el <b>Sábado y Domingo </b>, primero debe seguir las siguientes configuraciones que se muestran a continuación:",
	"add_new": "Dar clic en el botón de <B>Agregar Nuevo</B> para ingresar a la página de Configuraciones de la Lista de Horarios.",
	"unique": "En el campo de Descripción, crear una descripción <b>única</b> para el horario, por ejemplo Horario_1.",
	"s_0": "En el campo de Aplicar A, seleccione el día o los días que necesita.",
	"s_1": "En el campo de hora, puede seleccionar todo el día 24 horas o puede ingresar la Hora de Inicio y la Hora de Detención en el campo correspondiente.",
	"save": "Dar clic en <B>Guardar</B> para completar las configuraciones.",
	"s_2": "Después regresará a la página de Horario y verá la siguiente lista:",
	"add_new_0": "Dar clic en el botón de <b> Agregar Nuevo</b> para agregar una entrada nueva de lista de host.",
	"delete_sele": "Dar clic en el botón de <b>Borrar Seleccionado</b> para borrar las entradas seleccionadas en la tabla.",
	tb_descript: "Descripción",
	tb_edit: "Editar"
};
var AssignedIpAddrListHelpRpm =
{
	"header": "Ayuda de Lista de Clientes de DHCP ",
	"brief": "Esta página muestra <B> Nombre del cliente </B>, <B> Dirección MAC </B>, <B> IP asignada </B> y <B> Tiempo de concesión </B> de cada cliente DHCP conectado al dispositivo .",
	"clie_name": "<B>Nombre del Cliente</B> - El nombre del cliente DHCP.",
	"mac_addr": "<B>Dirección MAC</B> - La Dirección MAC del cliente DHCP.",
	"assi_ip": "<B> IP asignada </B>: la dirección IP que el dispositivo ha asignado al cliente DHCP.",
	"leas_time": "<B>Tiempo de Arrendamiento</B> - El tiempo que es arrendado el cliente de DHCP.",
	"refresh": "No puede cambiar ninguno de los valores en esta página. Para actualizar esta página y mostrar los dispositivos conectados actualmente, dar clic en el botón de <B>Actualizar</B>."
};
var BackNRestoreHelpRpm =
{
	"header": "Ayuda de Copia de Seguridad y Restauración",
	"brief": "Dar clic en el botón de <B>Copia de Respaldo</B> para guardar todas sus configuraciones a su computadora local como un archivo.",
	"s_0": "Para restaurar la configuración del dispositivo, siga estas instrucciones:",
	"browse": "Dar clic en el botón de <B>Examinar</B> para encontrar el archivo de configuración que desea restablecer.",
	"restore": "Dar clic en el botón de <B>Restaurar</B> para actualizar la configuración con el archivo cuya ruta es la que ha ingresado o seleccionado en el espacio en blanco..",
	"note": "<B> Nota: </B> La configuración actual se cubrirá con el archivo de configuración de carga. Un proceso incorrecto conducirá al dispositivo sin administrar. El proceso de restauración dura 20 segundos y el dispositivo se reiniciará automáticamente. Mantenga la alimentación electrica del dispositivo durante el proceso, en caso de cualquier daño."
};
var BasicSecurityHelpRpm =
{
	"header": "Ayuda de Seguridad Básica ",
	"brief": "Puede configurar las Configuraciones Básicas de Seguridad en esta página.",
	"firewall": "<B>Cortafuegos</B> - Aquí puede habilitar o deshabilitar el cortafuegos del Router.",
	"spi_fire": "<B>Cortafuegos de SPI </B> - SPI (Stateful Packet Inspection - Inspección de Paquetes con Estado) ayuda a prevenir ciber-ataques mediante el registro de más estados por sesión. Esto valida que el tráfico que pasa a través de la sesión cumpla con el protocolo. El cortafuegos de SPI está habilitado de manera predeterminada por los ajustes de fábrica. Si desea que todas las computadoras en la LAN estén expuestas al mundo exterior, puede deshabilitarlo).",
	"vpn": "<B>VPN</B> - Transferencia de VPN debe ser habilitada si desea permitir que los túneles VPN que usan protocolos VPN pasen a través del Router.",
	"pptp_pass": "<B> Transferencia de PPTP </B> - Transferencia de PPTP. El PPTP (Point-to-Point Tunneling Protocol - Protocolo de Túnel de Punto a Punto) permite que el PPP (Protocolo de Punto a Punto) sea tunelizado a través de una red IP. Para permitir que los túneles de PPTP pasen por el Router, dar clic en Habilitar.",
	"l2tp_pass": "<B>Transferencia de L2TP </B> - El L2TP (Layer Two Tunneling Protocol - Protocolo de Túneles Capa Dos) es el método usado para habilitar las sesiones Punto a Punto a través de Internet en el nivel de Capa 2. Para permitir que los túneles de L2TP pasen por el Router, dar clic en Habilitar. ",
	"ipsec_pass": "<B> Transferencia de IPSec </B> - IPSec (Internet Protocol security - Seguridad de Protocolo de Internet) es un conjunto de protocolos para asegurar comunicaciones privadas, seguras a través de las redes de IP (Internet Protocol - Protocolo de Internet), mediante el uso de servicios de seguridad criptográficos. Para permitir que los túneles de IPSec pasen a través del Router, dar clic en Habilitar.",
	"alg": "<B>ALG</B> - Se recomienda habilitar ALG (Application Layer Gateway - Puerta de Enlace de Capa de Aplicación) ya que ALG permite que los filtros transversales de NAT (Network Address Translation - Traducción de Dirección de Red ) sean conectados a la puerta de enlace para soportar la dirección y la traducción del puerto para ciertos protocolos de \"control/datos\" de la capa de aplicación como FTP, TFTP, H323 etc. ",
	"ftp_alg": "<B>FTP ALG</B> - Para permitir que los clientes y servidores de FTP transfieran datos a través de NAT, dar clic en Habilitar.",
	"tftp_alg": "<B>TFTP ALG</B> - Para permitir que los clientes y servidores TFTP transfieran datos a través de NAT, dar clic en Habilitar.",
	"h323_alg": "<B>H323 ALG</B> - Para permitir que los clientes de Microsoft NetMeeting se comuniquen a través de NAT, dar clic en Habilitar.",
	"sip_alg": "<B>SIP ALG</B> - Permitir que los clientes y servidores de SIP transfieran datos a través de NAT, dar clic en Habilitar.",
	"rtsp_alg": "<B>RTSP ALG</B> - Para permitir que algunos clientes de media player se comuniquen con algunos servidores de streaming media a través de NAT, dar clic en Habilitar.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var BpaCfgHelpRpm =
{
	"header": "Ayuda de WAN",
	"brief": "<B>WAN Tipo de Conexión:</B>",
	"dyna_ip": "Si su ISP está ejecutando un servidor DHCP, seleccione la opción de <B>IP Dinámico</B>.",
	"stat_ip": "Si su ISP proporciona una Dirección IP estática o fija, Máscara de Subred, Puerta de Enlace y configuraciones de DNS, seleccione la opción de <B>IP Estática</B>.",
	"pppoe": "Si su ISP proporciona una conexión PPPoE, seleccione la opción de <B>PPPoE</B>.",
	"bigp_cable": "Si su ISP proporciona la conexión de Cable BigPond (o Señal de Red Activa), por favor seleccione la opción de <B>Cable BigPond</B>.",
	"l2tp": "Si su ISP proporciona la conexión de L2TP, por favor seleccione la opción de <B>L2TP</B>.",
	"pptp": "Si su ISP proporciona la conexión de PPTP, por favor seleccione la opción de <B>PPTP</B>.",
	"password": "<B>Nombre de Usuario /Contraseña</B> - Ingresar el Nombre de Usuario y la Contraseña proporcionados por su ISP. Estos campos son sensibles a mayúsculas y minúsculas.",
	"auth_serv": "<B>Servidor Automático</B> - Ingresar la dirección IP del servidor de autenticación o el nombre del host.",
	"auth_doma": "<B>Dominio Automático</B> - Escribir el nombre del servidor del sufijo de dominio basado en su ubicación, ejemplo.<br>",
	"mtu_size": "<B>Tamaño de MTU</B> - El valor normal de MTU (Maximum Transmit Unit - Unidad de Transmisión Máxima) para la mayoría de las redes Ethernet es 1500 Bytes. Para algunos ISPs, puede ser necesario modificar el MTU. Pero esto rara vez se requiere, y no debe realizarse a menos que esté seguro que es necesario para su conexión del ISP.",
	"alwa_on": "<b>Siempre encendido</b> - Se conecta automáticamente después que el Router es desconectado. Para usar esta opción, dar clic en el botón de elección.",
	"connect": "<B> Conectar bajo Demanda </B> - Puede configurar el Router para desconectar su conexión de Internet después de un periodo especificado de tiempo de la conectividad de Internet (<B>Tiempo Máximo de Inactividad</B>). Si su conexión de Internet ha sido finalizada debido a inactividad, <B>Conectar bajo Demanda</B> permite que el Router restablezca automáticamente su conexión tan pronto intente acceder a Internet de nuevo. Si desea activar <B>Conectar bajo Demanda</B>, dar clic en el botón de elección. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingresar <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>. De otra manera, ingrese el número de minutos que desea que hayan transcurrido antes de que finalice su conexión de Internet.",
	"caution": "<b>Precaución</b> - Algunas veces la conexión no puede ser desconectada aunque especifique un tiempo para <B>Tiempo Máximo de Inactividad</B> ya que algunas aplicaciones visitan continuamente Internet en segundo plano. ",
	"connect_manu": "<b>Conectar Manualmente</b> - Puede configurar el Router para hacer que se conecte o desconecte manualmente. Después de un periodo especificado de inactividad (<B>Tiempo Máximo de Inactividad</B>), el Router desconectará su conexión de Internet, y no podrá restablecer su conexión automáticamente tanto pronto intente acceder a Internet de nuevo. Para usar esta opción, dar clic en el botón de elección. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingrese <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>. De otra manera, ingrese el número de minutos que desea que tenga la última conexión de Internet a menos se solicite un nuevo enlace.",
	"caution_0": "<b>Precaución</b> - Algunas veces la conexión no puede ser desconectada aunque especifique un tiempo para <B>Tiempo Máximo de Inactividad</B> ya que algunas aplicaciones visitan continuamente Internet en segundo plano. ",
	"connect_0": "Dar clic en el botón de <B>Conectar</B> para conectar inmediatamente.",
	"disconnect": "Dar clic en el botón de <B>Desconectar</B> para desconectar inmediatamente.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var ChangeLoginPwdHelpRpm =
{
	"header": "Ayuda de Contraseña",
	"brief": "Se recomienda encarecidamente que cambie el nombre de usuario y la contraseña predeterminados de fábrica del dispositivo. A todos los usuarios que intenten acceder a la utilidad basada en la Web del dispositivo se le pedirá el nombre de usuario y la contraseña del dispositivo.",
	"note": "<B>Nota</B>: El nombre de usuario y la contraseña nuevos no deben exceder 32 caracteres de longitud y no debe incluir ningún espacio. Ingrese la Contraseña nueva dos veces para confirmarla.",
	"save": "Dar clic en el botón de <B>Guardar</B> cuando haya terminado.",
	"clea_all": "Dar clic en el botón de <B>Borrar Todo</B> para borrar todo."
};
var DateTimeCfgHelpRpm =
{
	"header": "Ayuda de Configuraciones de la Hora ",
	"brief": "Esta página le permite configurar la hora manualmente o configurar la sincronización automática de la hora. El dispositivo puede actualizar automáticamente el tiempo desde un servidor NTP a través de Internet.",
	"time_zone": "<B>Zona Horaria</B> - Seleccione su zona horaria local de esta lista desplegable.",
	"manually": "<B>Para ajustar la hora manualmente:</B>",
	"s_0": "Seleccionar su zona horaria local.",
	"date": "Ingresar la <B>Fecha</B>.",
	"time": "Ingresar la <B>Hora</B>.",
	"save": "Dar clic en <B>Guardar</B>.",
	"synchronization": "<B>Para la sincronización automática de la hora:</B>",
	"ntp_serv": "Ingresar la dirección o el dominio del <B>Servidor 1 de NTP</B> o <B>Servidor 2 de NTP </B>.",
	"get_gmt": "Dar clic en el botón de <B>Obtener GMT</B> para obtener GMT desde Internet.",
	"daylight": "<B>Para configurar el Horario de Verano:</B>",
	"daylight_0": "Seleccionar la casilla de seleccionar de <B>Habilitar Horario de Verano</B> para habilitar la función de horario de verano.",
	"start": "Seleccionar la hora de <B>Inicio</B> correcta y la hora <B>Final</B> del rango de horario de verano.",
	"save_0": "Dar clic en <B>Guardar</B>.",
	"note": "<B>Nota:</B>",
	"s_1": "Esta configuración se utilizará para algunas funciones basadas en el tiempo, como las funciones de firewall. Estas funciones dependientes del tiempo no funcionarán si no se ajusta el tiempo. Por lo tanto, es importante especificar la configuración de tiempo tan pronto como ingrese al dispositivo con éxito.",
	"s_2": "El tiempo se perderá si el dispositivo está apagado.",
	"s_3": "El dispositivo obtendrá automáticamente GMT de Internet si está configurado en consecuencia.",
	"s_4": "En la configuración del horario de verano, si el tiempo de termino es anterior al tiempo de inicio, significa que el tiempo de termino es del proximo año ",
	"s_5": "Después que habilite la función de horario de verano, tomará acción en un minuto."
};
var DdnsAddComexeHelpRpm =
{
	"header": "Ayuda de DDNS",
	"brief": "El Router ofrece la característica de <B>DDNS</B> (Dynamic Domain Name System - Sistema del Nombre de Dominio Dinámico). El DDNS le permite asignar un host fijo y el nombre de dominio a una dirección IP de Internet dinámica. Es útil cuando está alojando su propio sitio web, servidor FTP u otro servidor detrás del Router. Antes de usar esta característica, necesita suscribirse con un proveedor de servicio de DDNS como <a href=\"#\" onClick=\"openWindow2();\" class=L1>www.comexe.cn</a>. El proveedor de servicio de cliente de DNS Dinámico le dará una contraseña o clave.",
	"s_0": "Para configurar el DDNS, siga estas instrucciones:",
	"service_prov": "Si su <b>Proveedor de Servicio</b> de DNS dinámico seleccionado es <a href=\"#\" onClick=\"openWindow2();\" class=L1>www.comexe.cn</a>.&nbsp;",
	"doma_names": "Ingresar los <B>Nombres de Dominio</B> que le dio su proveedor de servicios de DNS dinámico.",
	"user_name": "Ingresar el <B>Nombre de Usuario</B> para su cuenta de DDNS.",
	"password": "Ingresar la <B>Contraseña</B> para su cuenta de DDNS.",
	"login": "Dar clic en el botón de <B>Iniciar Sesión</B> para iniciar sesión en el servicio de DDNS.",
	"conn_status": "<B>Estado de Conexión</B> - El estado de conexión del servicio de DDNS se muestra aquí.",
	"logout": "Dar clic en <B>Finalizar Sesión</B> para finalizar la sesión del servicio de DDNS.",
	"notice": "<B>Aviso:</B>&nbsp;&nbsp; Si desea iniciar sesión de nuevo con otra cuenta después de un inicio de sesión exitoso, por favor dé clic en el botón de <B>Finalizar la sesión</B>, después ingrese su nombre de usuario y contraseña nuevos y dar clic en el botón de <B>Iniciar Sesión</B>. "
};
var DiagHelp =
{
	"header": "Ayuda de Diagnóstico ",
	"brief": "En esta página puede ver los resultados de prueba para la conectividad de la capa física y la capa de protocolo tanto para los lados de LAN como de WAN en la pantalla. Seleccione el tipo deseado y dar clic en el botón de iniciar."
};
var DMZHelpRpm =
{
	"header": "Ayuda de DMZ",
	"brief": "La característica de DMZ permite que un host local esté expuesto a Internet para un servicio de propósito especial como juegos en línea o video conferencias. El Router envía paquetes de todos los servicios al host de DMZ. Cuando una PC está configurada para ser el host de DMZ, es mejor deshabilitar su función de cliente DHCP y configurar una nueva dirección IP estática a la misma, ya que su Dirección IP puede ser cambiada cuando use la función de DHCP.",
	"computer": "<B>Para asignar una computadora o servidor para que sea un servidor DMZ </B>:",
	"enable": "Dar clic en el botón de <B>Habilitar</B>.",
	"address": "Ingresar la dirección IP de una PC local que esté configurada para ser el host de DMZ en el campo de <B> Dirección IP del Host de DMZ </B>.",
	"save": "Dar clic en el botón de <B>Guardar</B>."
};
var DualBandSelectionHelpRpm =
{
	"header": "Ayuda de Selección de la Banda Dual",
	"brief": "La configuración de internet está finalizada, por favor seleccione la banda inalámbrica del router.",
	"advantages": "<B>Ventajas de 5GHz:</B>",
	"s_0": "Es probable que se congestione la banda de 5GHz. El rango de frecuencia de 2.4GHz tiene mayor tendencia a interferencia, como se usa comúnmente por otras redes inalámbricas en el área, lo mismo que teléfonos inalámbricos, dispositivos de apertura de puertas de garaje y otros aparatos eléctricos del hogar y productos de consumo.",
	"disadvantages": "<B>Desventajas de 5GHz:</B>",
	"s_1": "En general, entre más alta sea la frecuencia de una señal inalámbrica, más corto es su rango. De este modo, las redes de 2.4GHz cubren sustancialmente un rango más grande que las redes inalámbricas de 5GHz. En particular, las señales de frecuencia más alta de 5GHz no penetran objetos sólidos casi tan bien como las señales de 2.4GHz, limitando su alcance dentro de las casas."
};
var DynDdnsHelpRpm =
{
	"header": "Ayuda de DDNS",
	"brief": "El Router ofrece la característica de <B>DDNS</B> (Dynamic Domain Name System - Sistema del Nombre de Dominio Dinámico). El DDNS le permite asignar un host fijo y el nombre de dominio a una dirección IP de Internet dinámica. Es útil cuando está alojando su propio sitio web, servidor FTP u otro servidor detrás del Router. Antes de usar esta característica, necesita suscribirse con proveedores de servicio de DDNS como <a href=\"#\" onClick=\"openWindow1();\" class=L1>dyn.com</a>. El proveedor de servicio de cliente de DNS Dinámico le dará una contraseña o clave.",
	"s_0": "Seguir estas instrucciones para configurar el DDNS:",
	"service_prov": "Si su <b>Proveedor de Servicio</b> de DNS dinámico seleccionado es <a href=\"#\" onClick=\"openWindow1();\" class=L1>dyn.com</a>.",
	"user_name": "Ingresar el <B>Nombre de Usuario</B> para su cuenta de DDNS.",
	"password": "Ingresar la <B>Contraseña</B> para su cuenta de DDNS.",
	"doma_name": "Ingresar el <B>Nombre de Dominio</B> que recibió del proveedor de servicios DNS dinámico.",
	"login": "Dar clic en el botón de <B>Iniciar Sesión</B> para iniciar sesión en el servicio de DDNS.",
	"conn_status": "<B>Estado de Conexión</B> - El estado de conexión del servicio de DDNS se muestra aquí.",
	"logout": "Dar clic en <B>Finalizar Sesión</B> para finalizar la sesión del servicio de DDNS.",
	"notice": "<B>Aviso:</B>&nbsp;&nbsp; Si desea iniciar sesión de nuevo con otra cuenta después de un inicio de sesión exitoso, por favor dé clic en el botón de <B>Finalizar la sesión</B>, después ingrese su nombre de usuario y contraseña nuevos y dar clic en el botón de <B>Iniciar Sesión</B>. "
};
var FixMapCfgHelpRpm =
{
	"header": "Ayuda de Reservación de Direcciones",
	"brief": "Cuando especifique una dirección IP reservada para una PC en la LAN, esa PC siempre recibirá la misma dirección IP cada vez cuando acceda al servidor DHCP. Las direcciones IP reservadas pueden ser asignadas a los servidores que requieren configuraciones IP permanentes.",
	"mac_addr": "<B>Dirección MAC</B> - La Dirección MAC para la PC que desea reservar una dirección IP. ",
	"ip_addr": "<B> Dirección IP </B> - La dirección IP que el dispositivo reservó.",
	"status": "<B>Estado</B> - Muestra si la entrada está habilitada o no.",
	"edit": "<b>Editar</b> - Para editar o borrar una entrada existente.",
	"addresses": "<b>Para Reservar las Direcciones IP, puede seguir estos pasos </B>:",
	"s_0": "Ingresar la Dirección MAC (El formato para la Dirección MAC es XX:XX:XX:XX:XX:XX) y la dirección IP en notación decimal con puntos de la computadora que desea agregar. ",
	"save": "Dar clic en el botón de <B>Guardar</B>.",
	"address": "<B>Para editar una Dirección IP, puede seguir estos pasos </B>:",
	"delete_sele": "Seleccionar la entrada de la dirección reservada según desee, edítela. Si desea borrar la entrada, seleccione la entrada y dar clic en el botón de <b>Borrar Seleccionado</b>.",
	"delete_sele_0": "Si desea borrar la entrada, seleccionar la entrada y dar clic en el botón de <b>Borrar Seleccionado</b>.",
	"save_0": "Dar clic en el botón de <B>Guardar</B>.",
	"add_new": "Dar clic en el botón de <b> Agregar Nuevo</b> para agregar una entrada nueva de Reservación de Direcciones.",
	"enable_sele": "Dar clic en el botón de <b>Habilitar Seleccionado</b> para habilitar las entradas seleccionadas en la tabla.",
	"disable_sele": "Dar clic en el botón de <b>Deshabilitar Seleccionado</b> para deshabilitar las entradas Seleccionadas en la tabla.",
	"delete_sele_1": "Dar clic en el botón de <b>Borrar Seleccionado</b> para borrar las entradas seleccionadas en la tabla."
};
var YandexDnsHelpRpm =
{
	"header": "Yandex.DNS",
	"brief": "En esta página usted puede configurar el filtro de Yandex.DNS que asegurará sus dispositivos contra sitios Web malinciosos y restringirá los sitios Web para adultos en sus dispositivos de los niños. Puede configurar un filtro general para todos los dispositivos o un filtro independiente para cada dispositivo.",
	"brief2": "Por favor, visite dns.yandex.ru para saber más sobre el servicio Yandex.DNS.",
	"dev_all": "<B> Habilitar DNS de Yandex para todos los dispositivos </b> - Este filtro Yandex.DNS estará habilitado en todos los dispositivos, que no existen en la lista de reglas de Yandex.DNS.",
	"disabled": "<B> Deshabilitado </b> - Significa que ningún filtro Yandex.DNS funcionará en todos los dispositivos.",
	"basic": "<B> Básico </b> - Significa que el filtro Basic Yandex.DNS funcionará en todos los dispositivos.",
	"safe": "<B> Seguro </b> - significa que el filtro Yandex.DNS seguro funcionará en todos los dispositivos.",
	"child": "<B> Menor </b> - Significa que el filtro Yandex.DNS funcionará en todos los dispositivos.",
	"mac_addr": "<B> Dirección MAC </B> - Muestra la dirección MAC del dispositivo en la que funcionará el filtro Yandex.DNS.",
	"description": "<B> Nombre del cliente </B>: muestra la descripción del dispositivo para una mejor identificación del dispositivo.",
	"mode": "<B> Modo de control </b> - Muestra el filtro Yandex.DNS seleccionado para el dispositivo especial.",
	"edit": "<b>Editar</b> - Para editar o borrar una entrada existente.",
	"steps": "Para configurar el filtro específico de Yandex.DNS para un dispositivo especial, haga clic en Agregar. Puede elegir el dispositivo de la lista de escaneo o ingresar la dirección MAC manualmente. Seleccione el modo de control especial (básico, seguro, menor) y dar una pequeña descripción para la regla."
};
var GuestNetUsbCfgHelpRpm =
{
	"header": "Ayuda de Almacenamiento de Uso Compartido de la Red para Invitados",
	"brief": "Puede configurar Almacenamiento de Uso Compartido de la Red para Invitados en esta página.",
	"s_0": "Seguir las instrucciones que se muestran a continuación para configurar su Almacenamiento de Uso Compartido de la Red para Invitados:",
	"s_1": "Conecte una unidad de disco duro USB externo o unidad flash USB en este Router.",
	"s_2": "Asegúrese que el Estado de Servicio en la página de Configuraciones de USB ->Almacenamiento de Uso Compartido esté <SPAN style=\"color:#C11C66\">Iniciado</SPAN>.",
	"s_3": "Asegúrese que el Acceso de almacenamiento compartido con contraseña en la página de Configuraciones de USB ->Almacenamiento de Uso Compartido esté <SPAN style=\"color:#C11C66\"> habilitado</SPAN>.",
	"start": "Dar clic en el botón de <B>Comenzar</B> para iniciar el Almacenamiento de Uso Compartido de la Red para Invitados.",
	"folder": "Dar clic en el botón de <B>Agregar Carpeta Nueva para Compartir</B> para especificar una carpeta para compartir a los invitados.",
	"s_4": "Sólo hay una cuenta de usuario predeterminada que puede acceder al Almacenamiento de Uso Compartido de la Red para Invitados, puede cambiar la contraseña de la cuenta.",
	"user_name": "<B>Nombre de Usuario</B> - El nombre de usuario es <B>invitado</B> para la Red para Invitados, no puede ser cambiada. ",
	"password": "<B>Contraseña</B> - Ingresar la contraseña en el campo de Contraseña. La contraseña debe estar compuesta de símbolos alfanuméricos que no excedan 15 caracteres de longitud.",
	"confirm_pass": "<B>Confirmar Contraseña</B> - Volver a ingresar la contraseña aquí.",
	"storage_auth": "<B>Autoridad de Almacenamiento </B> - Autoridad del usuario: <B>Sólo Lectura</B> o <B>Lectura y Escritura</B>.",
	"delete": "En esta página, cuando se agrega una carpeta compartida, puede ver su nombre para mostrar, partición del volumen, ruta de la carpeta y puede borrar la carpeta compartida dando clic en el botón de <B>borrar</B>.",
	"name": "<B>Nombre</B> - Este es el nombre que se muestra de la carpeta.",
	"partition": "<B>Partición</B> - El volumen en el que reside la carpeta. <SPAN style=\"color:#C11C66\">El Volumen 1-8</SPAN> es mapeando al puerto 1 USB, <SPAN style=\"color:#C11C66\">El Volumen 9-16</SPAN> es mapeando al puerto 2 USB.",
	"folder_0": "<B>Carpeta</B> - La trayectoria real completa de la carpeta especificada.",
	"edit": "<B>Editar</B> - Puede editar la carpeta compartida dando clic en el botón de <B>editar</B>.",
	"delete_0": "<B>Borrar</B> - Puede borrar la carpeta compartida dando clic en el botón de <B>borrar</B>.",
	"note": "<B>Nota</B>:",
	"s_5": "Si desea que los invitados visiten las carpetas de Almacenamiento de Uso Compartido de la Red para Invitados con la cuenta para invitado, debe <SPAN style=\"color:#C11C66\">habilitar</SPAN> Acceder al almacenamiento de uso compartido con la contraseña en la página de Configuraciones de USB -> Almacenamiento de Uso Compartido, o los invitados no podrán tener acceso al Almacenamiento de Uso Compartido de la Red para Invitados.",
	"s_6": "El número máximo de carpetas compartidas es 6. Si desea compartir una carpeta nueva cuando el número ha llegado a 6, puede borrar una carpeta compartida y después agregar una nueva."
};
var GuestNetWirelessCfgHelpRpm =
{
	"header": "Configuraciones Inalámbricas de la Red para Invitados",
	"brief": "Puede configurar Configuraciones Inalámbricas de la Red para Invitados en esta página.",
	"network": "<B>Permitir que los Invitados tengan Acceso a mi Red Local</B> - Si se habilita, los invitados pueden comunicarse con los hosts.",
	"storage": "<B>Permitir que los Invitados tengan Acceso al Almacenamiento USB de Uso Compartido</B> - Si se habilita, los invitados pueden tener acceso al USB.",
	"isolation": "<B>Aislamiento de la Red para Invitado</B> - Si se habilita, un invitado no puede comunicarse con otro.",
	"bandwidth": "<B>Habilitar el Control de Ancho de Banda de la Red para Invitados</B> - Si se habilita, las reglas de Control de Ancho de Banda de la Red para Invitados tomarán efecto.",
	"bandwidth_0": "<B>Control de Ancho de Banda de Egreso para la Red para Invitados</B> - La velocidad de carga a través del puerto&#10;WAN para la Red para Invitados.",
	"bandwidth_1": "<B> Control de Ancho de Banda de Ingreso para la Red para Invitados </B> - La velocidad de descarga a través del puerto de WAN para la Red para Invitados.",
	"network_0": "<B>Red de Invitados</B> - Habilitar o Deshabilitar la función de Red de Invitados",
	"netw_name": "<B>Nombre de la Red</B> - Ingresar un valor de hasta 32 caracteres. El mismo Nombre (SSID) debe ser asignado a todos los dispositivos inalámbricos en su Red para Invitados.",
	"guests": "<B>Número Máximo de Invitados </B> - Invitados Máximos.(1-32)",
	"security": "<B>Seguridad</B> - Puede configurar la seguridad de la Red para Invitados aquí.",
	"access":"<B>Hora de Acceso</B>",
	"acce_time": "<B>Agenda</B> - Durante este periodo, los dispositivos inalámbricos no podrán conectarse a la red de invitados",
	"timeout": "<B>Tiempo de Espera</B> - Cuando el reloj de cuenta regresiva  llega a cero, la red de invitados se cerrará",
	"note": "<B>Nota</B>:",
	"s_0": "El rango de ancho de banda para la Red para Invitados se calcula de acuerdo a la configuración del Control de Ancho de Banda en la página de Control de Ancho de Banda->Configuraciones de Control."
};
var IPv6LanHelp =
{
	"header": "Ayuda de LAN de IPv6",
	"brief": "En la página puede configurar la interfaz de IPv6 de la LAN para su router",
	"configuration": "<B>Tipo de Dirección de Configuración Automática:</B> Seleccionar un tipo para asignar las direcciones IPv6 a las computadoras en su LAN. Se proporcionan los Servidores RADVD y DHCPv6.",
	"s_0": "1) Si se selecciona RADVD, No&rsquo;t necesita ser configurado.",
	"s_1": "2) Si se selecciona DHCPv6, por favor complete los siguientes parámetros.",
	"address": "<B> Dirección IPv6 de Inicio </B> Ingresar un valor con el cual el servidor DHCPv6 inicie cuando se envíen direcciones IPv6.",
	"address_0": "<B>Dirección IPv6 Final</B> Ingresar un valor para el servidor DHCPv6 al final cuando se envían las direcciones IPv6.",
	"leas_time": "<B>Tiempo Arrendado</B> El Tiempo arrendado es la cantidad de tiempo en el cual un usuario de la red tiene permitida la conexión al router con su dirección de IPv6 dinámica. Ingresar la cantidad de tiempo, en horas, después el usuario tendrá arrendada esta dirección IPv6 dinámica. Después que haya expirado la dirección IPv6 dinámica, el usuario será asignado automáticamente a una nueva dirección IPv6 dinámica. El valor predeterminado es 86400 segundos.",
	"configuration_0": "<B>Tipo de Configuración del Prefijo del Sitio</B> Seleccione un tipo para asignar las direcciones del prefijo de IPv6 a las computadoras en su LAN. Delegado y Estático son proporcionados.",
	"note": "<B>Nota:</B>Si su tipo de conexión de WAN de IPv6 es \"Túnel 6a4\", el Tipo de Configuración del Prefijo del Sitio debe ser \"Estático\" para asegurarse que el \"Túnel 6a4\" funciona adecuadamente.",
	"s_2": "1) Si Delegado es seleccionado.",
	"connection": "<B>conexión de WAN de Prefijo Delegado </B> Muestra la conexión de WAN seleccionada para asignar el prefijo.",
	"s_3": "2) Si se selecciona Estático.",
	"site_pref": "<B>Prefijo del Sitio </B> Ingresar un valor para el prefijo del sitio.",
	"prefix": "<B>Longitud del Prefijo del Sitio </B> Ingresar un valor para la longitud del prefijo del sitio."
};
var IPv6StatusHelpRpm =
{
	"header": "Ayuda de Estado de IPv6",
	"brief": "La página de <B>Estado de IPv6</B> muestra el estado y la configuración de IPv6 actual del Router. Toda la información es de sólo lectura.",
	"conn_type": "<B>Tipo de Conexión</B> - - La forma de conexión de IPv6 para WAN.",
	"conn_status": "<B>Estado de Conexión</B> - - El estado de la conexión de IPv6.",
	"ipv6_addr": "<B>Dirección IPv6</B> - - La dirección de IPv6 de WAN.",
	"default": "<B>IPv6 Puerta de Enlace Predeterminada </B> - - La puerta de enlace predeterminada del router.",
	"primary": "<B> DNS de IPv6 Primario</B> - - La dirección DNS de IPv6 Primario.",
	"secondary": "<B>DNS de IPv6 Secundario</B> - - La dirección DNS de IPv6 secundario.",
	"lan": "<B>LAN</B>",
	"address": "<B>Tipo de Dirección de IPv6 </B> - - La forma como el router asigna la dirección IPv6 para la PC en la LAN, SLAAC (Stateless address autoconfiguration – Autoconfiguración de la dirección sin estado) y Servidor DHCPv6 (Dynamic Host Configuration Protocol for IPv6 - Protocolo de Configuración del Host Dinámico para IPv6).",
	"prefix_leng": "<B>Longitud del Prefijo</B> - - El prefijo del sitio.",
	"ipv6_addr_0": "<B>Dirección IPv6</B> - - La dirección de IPv6 global de la LAN del Router."
};
var IPv6TunnelHelp =
{
	"header": "Ayuda de Túnel de IPv6",
	"brief": "Si el túnel de IPv6 es un tipo de mecanismo de transición para habilitar los hosts de IPv6 únicamente para llegar a los servicios de IPv4 y para permitir que los hosts y redes aisladas de IPv6 se alcancen entre sí sobre la infraestructura de IPv4 únicamente antes de que IPv6 suplante completamente IPv4. Es una solución temporal para las redes que no soportan el apilamiento dual nativo, donde se ejecutan tanto IPv6 como IPv4 independientemente.",
	"enable": "<B>Habilitar</B> Poner una marca de selección en la casilla para habilitar la función de Túnel de IPv6. Está deshabilitada de manera predeterminada.",
	"mechanism": "<B>Mecanismo</B> Seleccionar un tipo para túnel de IPv6 de la lista desplegable. DS-Lite, 6RD y 6to4 están soportados.",
	"ds_lite": "<B>DS-Lite</B>",
	"s_0": "Este tipo se usa en la situación que su conexión de WAN sea IPv6 mientras que la conexión de LAN es IPv4.",
	"wan_conn": "<B>Conexión de WAN</B> Seleccionar una conexión de WAN de la lista desplegable. Sólo las conexiones de WAN pueden ser mostradas en la lista desplegable.",
	"conf_type": "<B>Tipo de Configuración</B> Seleccionar un tipo de configuración para este túnel. Automático significa obtener la Dirección IPv6 Remota automáticamente mientras que Manual significa que puede configurarlo manualmente.",
	"address": "<B>Dirección IPv6 Remota</B> Ingresar la dirección IPv6 del nodo remoto.",
	"note": "<B>Nota:</B> En este tipo, no debe haber ninguna conexión de WAN de IPv4. Si hay conexiones de WAN de IPv4, la página le indicara que borre todas las conexiones de WAN de IPv4.",
	"rd": "<B>6RD</B>",
	"s_1": "Este tipo se usa en la situación que su conexión de WAN sea IPv4 mientras que la conexión de LAN es IPv6.",
	"wan_conn_0": "<B>Conexión de WAN</B> Seleccionar una conexión de WAN de la lista desplegable. Sólo las conexiones de WAN pueden ser mostradas en la lista desplegable.",
	"conf_type_0": "<B>Tipo de Configuración</B> Seleccionar un tipo de configuración para este túnel. Automático significa obtener los siguientes parámetros automáticamente mientras que Manual significa que puede configurarlos manualmente. Si se selecciona Automático, únicamente la conexión IP Dinámica puede ser seleccionada de la lista desplegable.",
	"length": "<B>Longitud de la Máscara de IPv4 </B> La longitud de la máscara de IPv4 de la conexión de WAN seleccionada &rsquo;s.",
	"rd_pref": "<B>Prefijo 6RD</B> El prefijo del túnel 6RD.",
	"prefix": "<B>Longitud del Prefijo 6RD</B> La longitud del prefijo 6RD.",
	"address_0": "<B>Dirección IPv4 de Relé de Borde</B> La Dirección IPv4 del router del relé de borde del túnel 6RD.",
	"note_0": "<B>Nota:</B> En este tipo, no debe haber ninguna conexión de WAN de IPv6. Si hay conexiones de WAN de IPv6, la página le indicara que borre todas las conexiones de WAN de IPv6.",
	"to": "<B>6to4</B>",
	"s_2": "Este tipo se usa en la situación que su conexión de WAN sea IPv4 mientras que la conexión de LAN es IPv6.",
	"wan_conn_1": "<B>Conexión de WAN</B> Seleccionar una conexión de WAN de la lista desplegable. Sólo las conexiones de WAN pueden ser mostradas en la lista desplegable."
};
var L2tpCfgHelpRpm =
{
	"header": "Ayuda de WAN",
	"brief": "<B>WAN Tipo de Conexión:</B>",
	"dyna_ip": "Si su ISP está ejecutando un servidor DHCP, seleccione la opción de <B>IP Dinámico</B>.",
	"stat_ip": "Si su ISP proporciona una Dirección IP estática o fija, Máscara de Subred, Puerta de Enlace y configuraciones de DNS, seleccione la opción de <B>IP Estática</B>.",
	"pppoe": "Si su ISP proporciona una conexión PPPoE, seleccione la opción de <B>PPPoE</B>.",
	"bigp_cable": "Si su ISP proporciona la conexión de Cable BigPond (o Señal de Red Activa), por favor seleccione la opción de <B>Cable BigPond</B>.",
	"l2tp": "Si su ISP proporciona la conexión de L2TP, por favor seleccione la opción de <B>L2TP</B>.",
	"pptp": "Si su ISP proporciona la conexión de PPTP, por favor seleccione la opción de <B>PPTP</B>.",
	"password": "<B>Nombre de Usuario /Contraseña</B> - Ingresar el Nombre de Usuario y la Contraseña proporcionados por su ISP. Estos campos son sensibles a mayúsculas y minúsculas.",
	"dynamic": "<B>IP Dinámico / IP Estática</B> - Seleccione <B>IP Estática</B> si la dirección IP, la máscara de subred y la puerta de enlace y la dirección del servidor DNS han sido proporcionados por su ISP. De otra manera, por favor seleccione <B>IP Dinámico</B>.",
	"address": "<B>Dirección IP / Nombre del Servidor</B> - Ingresar la dirección IP o nombre de dominio del servidor proporcionados por su ISP.",
	"ip_addr": "<B>Dirección IP</B> - Ingresar la dirección IP usada para marcación. (Sólo puede ser configurada cuando se selecciona IP Estática)",
	"subn_mask": "<B>Máscara de Subred</B> - Ingresar la máscara de subred proporcionada por su ISP. (Sólo puede ser configurada cuando se selecciona IP Estática)",
	"gateway": "<B>Puerta de Enlace</B> - Ingresar la puerta de enlace proporcionada por su ISP. (Sólo puede ser configurada cuando se selecciona IP Estática) ",
	"dns_serv": "<B>Servidor DNS</B> - Ingresar el servidor DNS proporcionado por su ISP. (Sólo puede ser configurado cuando se selecciona IP Estática)",
	"internet": "<B>Dirección IP de Internet</B> La dirección IP de Internet asignada por el servidor L2TP.",
	"inte_dns": "<B>DNS de Internet</B> La dirección del servidor DNS de Internet asignada por el servidor L2TP.",
	"alwa_on": "<b>Siempre encendido</b> - Se conecta automáticamente después que el Router es desconectado. Para usar esta opción, dar clic en el botón de elección.",
	"connect": "<B> Conectar bajo Demanda </B> - Puede configurar el Router para desconectar su conexión de Internet después de un periodo especificado de tiempo de la conectividad de Internet (<B>Tiempo Máximo de Inactividad</B>). Si su conexión de Internet ha sido finalizada debido a inactividad, <B>Conectar bajo Demanda</B> permite que el Router restablezca automáticamente su conexión tan pronto intente acceder a Internet de nuevo. Si desea activar <B>Conectar bajo Demanda</B>, dar clic en el botón de elección. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingresar <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>. De otra manera, ingrese el número de minutos que desea que hayan transcurrido antes de que finalice su conexión de Internet.",
	"caution": "<b>Precaución</b> - Algunas veces la conexión no puede ser desconectada aunque especifique un tiempo para <B>Tiempo Máximo de Inactividad</B> ya que algunas aplicaciones visitan continuamente Internet en segundo plano. ",
	"connect_manu": "<b>Conectar Manualmente</b> - Puede configurar el Router para hacer que se conecte o desconecte manualmente. Después de un periodo especificado de inactividad (<B>Tiempo Máximo de Inactividad</B>), el Router desconectará su conexión de Internet, y no podrá restablecer su conexión automáticamente tanto pronto intente acceder a Internet de nuevo. Para usar esta opción, dar clic en el botón de elección. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingrese <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>. De otra manera, ingrese el número de minutos que desea que tenga la última conexión de Internet a menos se solicite un nuevo enlace.",
	"caution_0": "<b>Precaución</b> - Algunas veces la conexión no puede ser desconectada aunque especifique un tiempo para <B>Tiempo Máximo de Inactividad</B> ya que algunas aplicaciones visitan continuamente Internet en segundo plano. ",
	"connect_0": "Dar clic en el botón de <B>Conectar</B> para conectar inmediatamente.",
	"disconnect": "Dar clic en el botón de <B>Desconectar</B> para desconectar inmediatamente.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var LanArpBindingHelpRpm =
{
	"header": "Ayuda de Configuraciones de Enlace ",
	"brief": "El Enlace de ARP es útil para controlar el acceso de computadoras específicas en la LAN.",
	"mac_addr": "<B>Dirección MAC</B> - La Dirección MAC de la computadora controlada en la LAN.",
	"ip_addr": "<B>Dirección IP</B> - La dirección IP asignada de una computadora controlada en la LAN.",
	"bind": "<B>Enlace</B> - Revisar esta opción para habilitar el enlace de ARP para un dispositivo específico.",
	"edit": "<b>Editar</b>-Para editar una entrada existente.",
	"add_new": "<b>Agregar Nuevo</b> - Dar clic en el botón de <b>Agregar Nuevo</b> para agregar una entrada nueva a la tabla.",
	"enable_sele": "<b>Habilitar Seleccionado</b> - Dar clic en el botón de <b>Habilitar Seleccionado</b> para habilitar las entradas seleccionadas.</b>",
	"disable_sele": "<b>Deshabilitar Seleccionado</b> - Dar clic en el botón de <b>Deshabilitar Seleccionado</b> para deshabilitar las entradas seleccionadas.</b>",
	"delete_sele": "<b>Borrar Seleccionado</b> - Dar clic en el botón de <b>Borrar Seleccionado</b> para borrar las entradas seleccionadas.</b>",
	"example": "<B>Ejemplo:</B> Si desea usar el enlace para asignar 192.168.0.4 a una PC A (MAC: 00:E0:4C:00:07:BE) y para que otras PCS sigan usando la dirección. Primero, habilite el \"Enlace de ARP\". Después agregue un elemento nuevo en la tabla de enlace de tal modo que la tabla se asemeje a la que se muestra abajo.",
	td_mac: "Dirección MAC",
	td_ip: "Dirección IP",
	td_bind: "Enlazar",
	td_edit: "Editar"
};
var LanArpBindingListHelpRpm =
{
	"header": "Ayuda de Lista de ARP ",
	"brief": "Puede ver las direcciones IP en la LAN y sus direcciones MAC asociadas viendo la lista de ARP. También puede usar los botones de Cargar y Borrar para administrar la lista.",
	"mac_addr": "<B>Dirección MAC</B> - La Dirección MAC de una computadora controlada en la LAN.",
	"ip_addr": "<B>Dirección IP</B> - La dirección IP asignada de una computadora controlada en la LAN.",
	"status": "<B>Estado</B> - Indica si las direcciones de MAC e IP están enlazadas o no.",
	"load_sele": "<B>Carga Seleccionada</B> - Carga el elemento a la Lista de Enlace de IP y MAC.",
	"delete_sele": "<B>Borrar Seleccionado</B> - Borra el elemento de la lista.",
	"note": "<B>Nota:</B> Un elemento no puede ser cargado a la Lista de Enlace de IP y MAC si la dirección IP del elemento ha sido cargada antes."
};
var LanDhcpServerHelpRpm =
{
	"header": "Ayuda de Configuraciones de DHCP ",
	"brief": "El dispositivo se configura de forma predeterminada como servidor DHCP (Protocolo de configuración dinámica de host), que proporciona la configuración TCP / IP para todas las PC que están conectadas al dispositivo en la LAN.",
	"server": "<b>Servidor DHCP - Habilitar</b> o <b>Deshabilitar</b> el servidor. Si deshabilita el servidor, debe tener otro servidor DHCP dentro de su red o de otro modo debe configurar la dirección IP de la computadora manualmente.",
	"address": "<b>Dirección IP de Inicio -</b> Este campo especifica la primer dirección en el conjunto de Direcciones IP. 192.168.0.100 es la dirección IP de inicio predeterminada.",
	"address_0": "<B>Dirección IP Final</B> - Este campo especifica las direcciones finales en el Conjunto de Direcciones IP. 192.168.0.199 es la dirección IP final predeterminada.",
	"leas_time": "<B> Tiempo de concesión </B> - El <B> tiempo de concesión de la dirección </B> es el período de tiempo que un usuario de red podrá seguir conectando al dispositivo con la dirección DHCP actual. Ingrese la cantidad de tiempo, en minutos, que la dirección DHCP será \"arrendada\". El intervalo de tiempo es 1 ~ 2880 minutos. El valor predeterminado es 120 minutos.",
	"default_gate": "<B> Puerta de Enlace Predeterminado - </B> (Opcional) Sugerencia para ingresar la dirección IP del puerto LAN del dispositivo, el valor predeterminado es 192.168.0.1.",
	"defa_domain": "<B>Dominio Predeterminado</B> - (Opcional) Ingrese el nombre de dominio de su red.",
	"dns_serv": "<B>Servidor DNS - </B> (Opcional) Ingresar la dirección IP de DNS proporcionada por su ISP. O consulte a su ISP.",
	"secondary": "<B>Servidor DNS Secundario</B> - (Opcional) Puede ingresar la Dirección IP de otro servidor DNS si su ISP proporciona dos servidores DNS..",
	"note": "<B> Nota </B>: Para utilizar la función de servidor DHCP del dispositivo, debe configurar todos los equipos de la LAN como el modo \"Obtener una dirección IP automáticamente\". Esta función tendrá efecto hasta que el dispositivo se reinicie.",
	"save": "Dar clic en <B>Guardar</B> para guardar los cambios."
};
var LanDhcpServerHelpRpm_AP = {
	"header": LanDhcpServerHelpRpm.header,
	"brief": LanDhcpServerHelpRpm.brief,
	"server": LanDhcpServerHelpRpm.server,
	"address": LanDhcpServerHelpRpm.address,
	"address_0": LanDhcpServerHelpRpm.address_0,
	"leas_time": "<B> Tiempo de concesión </B> - El <B> tiempo de concesión de la dirección </B> es el período de tiempo que un usuario de red podrá seguir conectando al dispositivo con la dirección DHCP actual. Ingrese la cantidad de tiempo, en minutos, que la dirección DHCP será \"arrendada\". El intervalo de tiempo es 1 ~ 2880 minutos. El valor predeterminado es 1 minuto.",
	"default_gate": "<B> Puerta de Enlace Predeterminado - </B> (Opcional) Sugerencia para ingresar la dirección IP del puerto LAN del dispositivo, el valor predeterminado es 192.168.0.1.",
	"defa_domain": LanDhcpServerHelpRpm.defa_domain,
	"dns_serv": LanDhcpServerHelpRpm.dns_serv,
	"secondary": LanDhcpServerHelpRpm.secondary,
	"note": LanDhcpServerHelpRpm.note,
	"save": LanDhcpServerHelpRpm.save
};
var LocalManageControlHelpRpm =
{
	"header": "Ayuda de Administración Local ",
	"brief": "Esta página le permite negar el acceso al Router de las computadoras de la LAN.",
	"allowed": "De manera predeterminada, el botón de elección de <B>Todas las PCs en la LAN tienen permitido el acceso a la Utilidad a través de Internet del Router </B> está seleccionado. Si desea permitir que PCs con Direcciones MAC específicas tengan acceso a la página de Configuración de la Utilidad a través de Internet del Router localmente, desde adentro de la red, dar clic en el botón de elección de <B>Sólo las PCs listadas pueden navegar en las páginas de internet integradas para realizar tareas del Administrador</B>,, y después ingresar la Dirección MAC en el campo de Dirección MAC de su PC. El formato para la Dirección MAC es XX-XX-XX-XX-XX-XX (X es cualquier dígito hexadecimal). Sólo las PCs con la Dirección MAC listada pueden usar la contraseña para navegar en las páginas de internet integradas para realizar tareas del Administrador y todas las demás serán bloqueadas.",
	"set": "Después de dar clic en el botón de <B>Configurar</B>, la Dirección MAC de su PC será colocada en la Lista de Control de arriba.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones.",
	"note": "<B>Nota</B>: Si su PC está bloqueada y desea acceder al Router de nuevo, use un alfiler para mantener presionado el <B>Botón de Reset</B> en el panel trasero aproximadamente 5 segundos para restablecer el Router a sus ajustes predeterminados de fábrica en la Utilidad a través de Internet del Router."
};
var MacCloneCfgHelpRpm =
{
	"header": "Ayuda de Clon de MAC ",
	"brief": "La mayoría de los ISPs (Internet Service Provider – Proveedor de Servicios de Internet) por Cable registran la Dirección MAC única desde la conexión por cable en su <span id = \"t_main_computer\" style=\"color:#C11C66\">COMPUTADORA PRINCIPAL – la última computadora usada para ser conectada con el Módem de Cable y que tenía conexión a Internet </span>.",
	"s_0": "Si agrega un router a la red, su ISP podría no reconocer la Dirección MAC del router y no permitiría que se conecte.",
	"s_1": "Sin embargo, el router de TP-Link puede \"clonar\" o duplicar la Dirección MAC registrada de la COMPUTADORA PRINCIPAL. Después su ISP puede liberar la conexión de Internet al router y todas las computadoras.",
	"address": "<B>Dirección MAC de WAN </B> - Este campo muestra la Dirección MAC actual del puerto de WAN. Si su ISP requiere que registre la Dirección MAC, por favor ingrese la Dirección MAC correcta en este campo. El formato para la Dirección MAC es XX-XX-XX-XX-XX-XX (X es cualquier dígito hexadecimal).",
	"address_0": "<B>Dirección MAC de su PC </B> - - Este campo muestra la Dirección MAC de la PC que está manejando el Router. Si la Dirección MAC de su adaptador está registrada, puede dar clic en el botón de <B>Clonar Dirección MAC</B>,después se llenará en el campo de <B>Dirección MAC de WAN </B>.",
	"restore": "Dar clic en <B>Restablecer MAC a su Configuración Predeterminada </B> para restablecer la dirección MAC del puerto de WAN al valor predeterminado de fábrica.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones.",
	"note": "<B>Nota</B>:",
	"s_2": "Por favor asegúrese que está haciendo el Clon de MAC con la conexión por cable de su <span style=\"color:#C11C66\">COMPUTADORA PRINCIPAL </span> que usó para conectarse con su Cable y tenía conexión a Internet.",
	"address_1": "Únicamente la(s) PC(s) en su LAN pueden usar la característica de <B>Clon de la Dirección MAC</B> .",
	"address_2": "Si cambia la <B>Dirección MAC de WAN</B> cuando el tipo de conexión de WAN es PPPoE, no tomará efecto hasta que la conexión sea restablecida."
};
var ManageControlHelpRpm =
{
	"header": "Ayuda de Administración Remota",
	"brief": "Esta característica le permite manejar su Router desde una ubicación remota a través de Internet.",
	"management": "<B>Puerto de Administración Remota</B> - El acceso al navegador de Internet normalmente usa el puerto de servicio 80 de HTTP estándar. El número de puerto de internet predeterminado de administración remota es 80. Para mayor seguridad, puede cambiar el puerto de internet de administración remota a un puerto personalizado ingresando ese número en el recuadro proporcionada. Seleccione un número entre 1024 y 65535 pero no use el número de ningún puerto de servicio común. ",
	"management_0": "<B>Dirección IP de Administración Remota</B> - Esta es la dirección actual que usará cuando acceda a su Router desde Internet. ",
	"s_0": "Para tener acceso al Router, debe ingresar la dirección IP de WAN del Router en el recuadro de dirección del navegador (en IE) u ubicación (en Netscape), seguida por dos puntos y el número de puerto personalizado que configuró en el recuadro del Puerto de Administración a través de Internet. Por ejemplo, si la dirección WAN de su Router es 202.96.12.8 y usa el número de puerto 8080, ingrese http://202.96.12.8:8080 en su navegador. Se le pedirá la contraseña del Router. Después de ingresar exitosamente la contraseña, podrá acceder a la utilidad a través de internet del Router.",
	"note": "<B>Nota:</B>",
	"s_1": "Asegúrese de cambiar la contraseña predeterminada del Router a una contraseña segura.",
	"virt_server": "Si el puerto de administración a través de Internet crea conflicto con uno usado para una entrada del <b>Servidor Virtual</b>, la entrada será <b>deshabilitada</b> automáticamente después que la configuración sea guardada."
};
var MediaServerCfgHelpRpm =
{
	"header": "Ayuda del Servidor de Medios ",
	"brief": "Puede configurar media server en esta página.",
	"s_0": "Seguir las instrucciones que se muestran a continuación para configurar su Servidor de Medios:",
	"s_1": "Conecte una unidad de disco duro USB externo o unidad flash USB en este Router.",
	"start": "Dar clic en el botón de <B>Comenzar</B> para iniciar el Servidor de Medios.",
	"folder": "Dar clic en el botón de <B>Agregar compartir carpeta</B> para especificar una carpeta como la trayectoria de búsqueda del Servidor de Medios.",
	"scan_all": "Dar clic en el botón de <B>Escanear Todo</B> para escanear todas las carpetas compartidas inmediatamente. También puede seleccionar <B>Escaneo Automático</B>, al mismo tiempo seleccionar un intervalo de escaneo automático de la lista desplegable. En este caso, el Servidor de Medios escaneará automáticamente las carpetas compartidas.",
	"delete": "En esta página, cuando se agrega una carpeta compartida, puede ver su nombre para mostrar, el tipo del sistema del archivo, la ruta de la carpeta y puede borrar la carpeta compartida dando clic en <B>borrar</B>.",
	"name": "<B>Nombre</B> - Este es el nombre que se muestra de la carpeta.",
	"file_syst": "<B>Sistema de Archivos</B> - El tipo de sistema de archivos en la partición puede ser FAT32 o NTFS.",
	"folder_0": "<B>Carpeta</B> - La trayectoria real completa de la carpeta especificada.",
	"delete_0": "<B>Borrar</B> - Puede borrar la carpeta compartida dando clic en <B>borrar</B>.",
	"note": "<B>Nota</B>:",
	"s_2": "El número máximo de carpetas compartidas es 6. Si desea compartir una carpeta nueva cuando el número ha llegado a 6, puede borrar una carpeta compartida y después agregar una nueva.",
	"start_0": "Dar clic en el botón de <B>Comenzar</B> para iniciar el Servidor de Medios.",
	"stop": "Dar clic en el botón de <B>Parar</B> para parar el Servidor de Medios.",
	"scan_all_0": "Dar clic en el botón de <B>Escanear Todo</B> para escanear todas las carpertas compartidas inmediatamente.",
	"delete_1": "Dar clic en el botón de <B>borrar</B> para borrar la carpeta compartida especifica."
};
var MiscHelpRpm =
{
	"header": "Ayuda de Seguridad Avanzada",
	"brief": "Al usar la página de <B>Configuraciones Avanzadas </B>, puede proteger al Router de ser atacado por TCP-SYN Flood, UDP Flood y ICMP-Flood.",
	"statistics": "<font color=\"#C11C66\">Nota: El filtrado FLOOD tendrá efecto solo cuando la función <b> Estadísticas</b> ubicada en el menú <b> Herramientas del Sistema</b> este habilitada. </font> ",
	"note_2":"<font color=\"#C11C66\">Nota 2: Si Hardware NAT está habilitado, el Filtrado de FLOOD NO tomará efecto, ya que estos dos módulos no pueden operar al mismo tiempo.</font>",
	"dos_prot": "<B>Protección DoS</B> - Habilitar o Deshabilitar la función de protección DoS. Sólo cuando esté habilitado, se habilitarán los filtros de flood. ",
	"filtering": "<B>Habilitar el Filtrado de Ataque de ICMP-FLOOD</B> - Habilita o Deshabilita el Filtrado de Ataque de ICMP-FLOOD.",
	"threshold": "<B> Umbral de Paquetes de ICMP-FLOOD (5~3600) </B> - El valor predeterminado es 50. Ingresar un valor entre 5 <B>~</B> 3600. Cuando el número de Paquetes de ICMP-FLOOD actual está por encima del valor establecido, el Router iniciará la función de bloqueo",
	"filtering_0": "<B>Habilitar el Filtrado UDP-FLOOD</B> - Habilita o Deshabilita el Filtrado UDP-FLOOD.",
	"threshold_0": "<B>Umbral de Paquetes de ICMP-FLOOD (5~3600)</B> - El valor predeterminado es 500. Ingresar un valor entre 5 ~ 3600. Cuando el número de Paquetes de ICMP-FLOOD actual está por encima del valor establecido, el Router iniciará la función de bloqueo inmediatamente.",
	"filtering_1": "<B>Habilitar el Filtrado de Ataque de TCP-SYN-FLOOD </B> - Habilita o Deshabilita el Filtrado de Ataque de TCP-SYN-FLOOD .",
	"threshold_1": "<B> Umbral de Paquetes de TCP-SYN-FLOOD (5~3600)</B> - El valor predeterminado es 50. Ingresar un valor entre 5 <B>~</B> 3600. Cuando el número de Paquetes de TCP-SYN-FLOOD actual está por encima del valor establecido, el Router iniciará la función de bloqueo inmediatamente.",
	"forbidwan": "<B> Prohibir el Paquete Ping desde el Puerto de WAN </B> - Habilita o Deshabilita Prohibir el Paquete Ping desde el Puerto de WAN. La configuración predeterminada está habilitada. El paquete de ping de WAN no puede acceder al Router. (Defiende contra algunos virus).",
	"forbidlan": "<B>Prohibir el Paquete Ping desde el Puerto de LAN </B> - Habilita o Deshabilita Prohibir el Paquete Ping desde el Puerto de LAN. La configuración predeterminada está deshabilitada. Si se habilita, el paquete de ping de la LAN no puede acceder al Router. (Defiende contra algunos virus).",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar las configuraciones.",
	"blocked": "Dar clic en el botón de <B> Lista de Host de DOS Bloqueada </B> para mostrar la tabla de host de DoS por bloqueo."
};
var NasCfgHelpRpm =
{
	"header": "Ayuda de Almacenamiento de Uso Compartido",
	"brief": "Puede configurar una unidad de disco USB conectada al Router en esta página.",
	"s_0": "Seguir las instrucciones que se muestran a continuación para configurar su Router como un servidor de archivos:",
	"s_1": "Conecte una unidad de disco duro USB externo o unidad flash USB en este Router.",
	"rescan": "Dar clic en el botón de <B>Volver a examinar</B> para encontrar la unidad USB que ha sido conectada al Router.",
	"start": "Dar clic en el botón de <B>Comenzar</B> para iniciar el Servicio de Almacenamiento de Uso Compartido.",
	"enable": "Dar clic en el botón de <B>Habilitar</B> en la fila compartida para habilitar el disco a compartir.",
	"disable": "Dar clic en el botón de <B>Deshabilitar</B> en la fila compartida para deshabilitar el disco a compartir.",
	"s_2": "En esta página, puede ver el volumen y compartir las propiedades como compartir nombre, capacidad, espacio usado y espacio libre, etc.",
	"serv_status": "<B> Estado de Servicio </B> - Indica el estado actual del servicio de Uso Compartido de almacenamiento.",
	"volume": "<B>Volumen</B> - El nombre del volumen de la unidad USB a la que los usuarios tienen acceso. <SPAN style=\"color:#C11C66\">El Volumen 1-8</SPAN> es mapeando al puerto 1 USB, <SPAN style=\"color:#C11C66\">El Volumen 9-16</SPAN> es mapeando al puerto 2 USB.",
	"capacity": "<B>Capacidad</B> - La capacidad de almacenamiento de la unidad USB.",
	"used": "<B>Usado</B> - El espacio usado de la unidad USB.",
	"free": "<B>Libre</B> - El espacio disponible de la unidad USB.",
	"use": "<B>Uso%</B> - El porcentaje del espacio usado.",
	"shared": "<B>Compartido</B> - Indica el estado compartido o no compartido del volumen. Cuando el volumen es compartido, puede dar clic en <B>Deshabilitar</B> para dejar de compartir el volumen; pero cuando el volumen es no compartido, puede dar clic en el botón de <B>Habilitar</B> para compartir el volumen.",
	"following": "<B>Puede acceder al Almacenamiento USB mediante los siguientes pasos </B>:",
	"windows": "<B>Para Windows XP</B>:",
	"s_3": "Ir a Inicio > Ejecutar",
	"s_4": "Ingresar \"	plinklogin.net\" en el recuadro de diálogo",
	"s_5": "Dar clic en OK",
	"windows_0": "<B>Para Windows Vista/7</B>:",
	"s_6": "Ir a Inicio",
	"s_7": "Escribir \"ejecutar\" en el recuadro de búsqueda",
	"s_8": "Abrir la aplicación de ejecutar",
	"s_9": "Ingresar \"	plinklogin.net\" en el recuadro de diálogo",
	"s_10": "Dar clic en OK",
	"note": "<B>Nota</B>:",
	"s_11": "El Router puede localizar automáticamente la nueva unidad USB.",
	"s_12": "Las configuraciones nuevas no tomarán efecto hasta que reinicie el servicio.",
	"ejec_disk": "Para desconectar la unidad USB, dar clic en el botón de <B>Expulsar Disco</B> primero. Sacar simplemente la unidad USB del puerto puede causar daño al dispositivo y pérdida de información.",
	"s_13": "Los volúmenes montados de cada puerto USB están sujetos al límite de 8 volúmenes, por lo tanto no puede acceder a más de 8 volúmenes en el dispositivo de almacenamiento USB.",
	"s_14": "Si cambia las configuraciones de almacenamiento durante el establecimiento de la conexión de almacenamiento, entonces los cambios no tomarán efecto hasta que el Router o el cliente hayan sido reiniciados.",
	"start_0": "Dar clic en el botón de <B>Comenzar</B> para iniciar el Servicio de Almacenamiento de Uso Compartido.",
	"stop": "Dar clic en el botón de <B>Parar</B> para parar el Servicio de Almacenamiento de Uso Compartido.",
	"ejec_disk_0": "Dar clic en el botón de <B>Expulsar Disco</B> para retirar de manera segura el dispositivo de almacenamiento USB que está conectado al puerto USB. Esto hace que la unidad esté fuera de línea. Aparecerá un mensaje en su navegador de Internet cuando sea seguro desconectar el disco USB.",
	"rescan_0": "Dar clic en el botón de <B>Volver a examinar</B> para iniciar un nuevo escaneo."
};
var NasFtpCfgHelpRpm =
{
	"header": "Ayuda del Servidor FTP",
	"brief": "Puede configurar un servidor ftp en esta página.",
	"s_0": "Seguir las instrucciones que se muestran a continuación para configurar su servidor ftp:",
	"s_1": "Conecte una unidad de disco duro USB externo o unidad flash USB en este Router.",
	"enable_disa": "Dar clic en el botón de elección de <B>Habilitar / Deshabilitar </B> para habilitar / deshabilitar el acceso a internet para ftp desde el puerto de WAN.",
	"serv_port": "Cambiar el <B>Puerto de servicio</B> para especificar un puerto para que el servidor FTP use (valor predeterminado 21).",
	"inte_address": "La <B>Dirección de Internet</B> muestra la dirección IP de WAN de este router, por lo tanto otros pueden acceder a ftp a través de esta dirección.",
	"public_addr": "Si el tipo Wan es PPPOE/PPTP/L2TP, habría dos conexiones. Por lo tanto, los usuarios pueden acceder al servidor ftp mediante dos conexiones. Los usuarios en una LAN privada pueden acceder al servidor ftp mediante la <B>Dirección Pública</B> mientras que los usuarios de internet pueden acceder al servidor ftp por medio de la <B>Dirección de Internet</B>.",
	"start": "Dar clic en el botón de <B>Comenzar</B> para iniciar el servidor ftp.",
	"delete": "En esta página, cuando se agrega una carpeta compartida, puede ver su nombre para mostrar, partición del volumen, ruta de la carpeta y puede borrar la carpeta compartida dando clic en el botón de <B>borrar</B>.",
	"name": "<B>Nombre</B> - Este es el nombre que se muestra de la carpeta.",
	"partition": "<B>Partición</B> - El volumen en el que reside la carpeta. <SPAN style=\"color:#C11C66\">El Volumen 1-8</SPAN> es mapeando al puerto 1 USB, <SPAN style=\"color:#C11C66\">El Volumen 9-16</SPAN> es mapeando al puerto 2 USB.",
	"folder": "<B>Carpeta</B> - La trayectoria real completa de la carpeta especificada.",
	"edit": "<B>Editar</B> - Puede editar la carpeta compartida dando clic en el botón de <B>editar</B>.",
	"delete_0": "<B>Borrar</B> - Puede borrar la carpeta compartida dando clic en el botón de <B>borrar</B>.",
	"note": "<B>Nota</B>:",
	"s_2": "El número máximo de carpetas compartidas es 10. Si desea compartir una carpeta nueva cuando el número ha llegado a 10, puede borrar una carpeta compartida y después agregar una nueva.",
	"s_3": "Si desea cambiar las configuraciones de FTP, necesita reiniciar el Servidor FTP para habilitar el Cambio de Configuraciones."
};
var NasUserCfgHelpRpm =
{
	"header": "Ayuda de Cuentas de Usuario",
	"brief": "Puede especificar el nombre de usuario y la contraseña para los usuarios del Almacenamiento de Uso Compartido y el Servidor FTP en esta página. Los usuarios del Almacenamiento de Uso Compartido pueden usar Internet Explorer para acceder a los archivos en la unidad USB. Los usuarios del Servidor pueden iniciar sesión en el Servidor FTP a través de Clientes de FTP.",
	"s_0": "Sólo hay una cuenta de usuario predeterminada que puede acceder al Almacenamiento de Uso Compartido y al Servidor FTP. Es Administrador. El administrador tiene acceso de lectura / escritura al Almacenamiento de Uso Compartido y puede acceder al Servidor FTP.",
	"s_1": "Únicamente el Administrador puede usar un navegador de Internet para transferir los archivos desde una PC al volumen compartido con autorización de escritura en la unidad USB. ",
	"user_name": "<B>Nombre de Usuario</B> - Escribir el nombre de usuario al que desea dar acceso a la unidad USB. El nombre de usuario debe estar compuesto de símbolos alfanuméricos que no excedan 15 caracteres de longitud.",
	"password": "<B>Contraseña</B> - Ingresar la contraseña en el campo de Contraseña. La contraseña debe estar compuesta de símbolos alfanuméricos que no excedan 15 caracteres de longitud. Por razones de seguridad, la contraseña para cada cuenta de usuario no se muestra.",
	"confirm_pass": "<B>Confirmar Contraseña</B> - Volver a ingresar la contraseña aquí.",
	"note": "<B>Nota</B>:",
	"windows": "Si no puede usar el nuevo nombre de usuario y la contraseña para tener acceso a los elementos compartidos, presione el <B>logo de Windows + R</B> para abrir la caja de diálogo de <B>Ejecutar</B> y escribir <B>uso de red 92.168.0.1 /borrar /sí</B> y presionar Enter. (192.168.0.1 es la dirección IP de la LAN de su Router.)",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var NatStatusCfgHelpRpm =
{
	"header": "Ayuda de Configuraciones de Control de NAT ",
	"brief": "En esta página puede deshabilitar o habilitar la característica de NAT y Control de NAT del Hardware. Las Reglas de NAT y NAT de Hardware funcionarán adecuadamente sólo cuando la característica de NAT Control esté habilitada.",
	"control": "<B>Habilitar el Control de NAT</B> - Si se habilita, la función de NAT y la configuración de Reenvío tomarán efecto.",
	"disable": "<B>Deshabilitar el Control de NAT</B> - Si se deshabilita, ninguna función de NAT ni la configuración de Reenvío tomarán efecto.",
	"hardware": "<B>Habilitar el Control de NAT del Hardware</B> - Si se habilita, la característica de NAT del Hardware tomará efecto.",
	"hardware_0": "<B>Deshabilitar el Control de NAT del Hardware</B> - Si se deshabilita, ninguna de las características de NAT del Hardware tomará efecto. "
};
var NetworkCfgHelpRpm =
{
	"header": "Ayuda de LAN ",
	"brief": "Puede configurar los parámetros IP de la LAN en esta página.",
	"type": "<B> Tipo </B> - Elegir IP inteligente (DHCP) para obtener la dirección IP del servidor DHCP o elegir IP estático para configurar la dirección IP manualmente.",
	"mac_addr": "<B>Dirección MAC</B> - La dirección física de los puertos LAN, como se ve desde la LAN. El valor no puede ser cambiado.",
	"ip_addr": "<B> Dirección IP </B> - Introduzca la dirección IP de su dispositivo en notación decimal (valor predeterminado de fábrica: 192.168.0.1).",
	"subn_mask": "<B>Máscara de Subred</B> - Un código de dirección que determina el tamaño de la red. Generalmente es 255.255.255.0.",
	"igmp_snoo": "<B>IGMP Snooping</B> - IGMP snooping está diseñado para evitar que los hosts en una red local reciban tráfico para un grupo de multidifusión al que no se han unido explícitamente. IGMP snooping es especialmente útil para aplicaciones multidifusión de IP con ancho de banda intenso como IPTV. ",
	"note": "<B>Nota: </B>",
	"s_0": "Si cambia la dirección IP, debe utilizar la nueva dirección IP para iniciar sesión en el dispositivo.",
	"s_1":  "Si la nueva dirección IP de la LAN que configuró no está en la misma subred que la anterior, el conjunto de Direcciones IP en el servidor DHCP será configurado automáticamente, pero el Servidor Virtual y el Host de DMZ no tomarán efecto hasta que sean reconfigurados.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var NetworkCfgHelpRpm_AP =
{
	"header": NetworkCfgHelpRpm.header,
	"brief": NetworkCfgHelpRpm.brief,
	"type": NetworkCfgHelpRpm.type,
	"mac_addr": NetworkCfgHelpRpm.mac_addr,
	"ip_addr_HasRouter": "<B> Dirección IP </B> - Introduzca la dirección IP de su dispositivo en notación decimal (valor predeterminado de fábrica: 192.168.0.1).",
	"ip_addr": "<B> Dirección IP </B> - Introduzca la dirección IP de su dispositivo en notación decimal (valor predeterminado de fábrica: 192.168.0.254)",
	"subn_mask": NetworkCfgHelpRpm.subn_mask,
	"igmp_snoo": NetworkCfgHelpRpm.igmp_snoo,
	"note": NetworkCfgHelpRpm.note,
	"s_0": NetworkCfgHelpRpm.s_0,
	"s_1": "Si selecciona el tipo de IP inteligente (DHCP), el servidor DHCP de este dispositivo no se iniciará",
	"s_2": "Si la nueva dirección IP que estableció no está en la misma subred que la anterior, el conjunto de direcciones IP del servidor DHCP se configurará automáticamente",
	"save": NetworkCfgHelpRpm.save
};
var NoipDdnsHelpRpm =
{
	"header": "Ayuda de DDNS",
	"brief": "El Router ofrece la característica de <B>DDNS</B> (Dynamic Domain Name System - Sistema del Nombre de Dominio Dinámico). El DDNS le permite asignar una característica de host. El DDNS le permite asignar un host fijo y el nombre de dominio a una dirección IP de Internet dinámica. Es útil cuando está alojando su propio sitio web, servidor FTP u otro servidor detrás del Router. Antes de usar esta característica, necesita suscribirse con proveedores de servicio de DDNS como <a href=\"#\" onClick=\"openWindow1();\" class=L1>www.noip.com</a>. El proveedor de servicio de cliente de DNS Dinámico le dará una contraseña o clave.",
	"s_0": "Seguir estas instrucciones para configurar el DDNS:",
	"service_prov": "Si su <b>Proveedor de Servicio</b> de DNS dinámico seleccionado es <a href=\"#\" onClick=\"openWindow1();\" class=L1>www.noip.com</a>.&nbsp;",
	"user_name": "Ingresar el <B>Nombre de Usuario</B> para su cuenta de DDNS.",
	"password": "Ingresar la <B>Contraseña</B> para su cuenta de DDNS.",
	"doma_name": "Ingresar el <B>Nombre de Dominio</B> que recibió del proveedor de servicios DNS dinámico.",
	"login": "Dar clic en el botón de <B>Iniciar Sesión</B> para iniciar sesión en el servicio de DDNS.",
	"conn_status": "<B>Estado de Conexión</B> - El estado de conexión del servicio de DDNS se muestra aquí.",
	"logout": "Dar clic en <B>Finalizar Sesión</B> para finalizar la sesión del servicio de DDNS.",
	"notice": "<B>Aviso:</B>&nbsp;&nbsp; Si desea iniciar sesión de nuevo con otra cuenta después de un inicio de sesión exitoso, por favor dé clic en el botón de <B>Finalizar la sesión</B>, después ingrese su nombre de usuario y contraseña nuevos y dar clic en el botón de <B>Iniciar Sesión</B>. "
};
var ParentCtrlAdvHelpRpm =
{
	"header": "Ayuda de Agregar o Modificar una Entrada de Control Parental ",
	"brief": "El Router suministra la función de control parental conveniente para controlar las actividades de internet de los niños, puede limitar el acceso a ciertos sitios web y restringir el tiempo de navegación. En esta página, puede crear la regla.",
	"address": "<B> Dirección MAC de la PC de los Niños </B> - Ingresar la Dirección MAC de la PC que desea controlar, o puede hacer uso del elemento de abajo de Todas las Direcciones MAC en la LAN Actual. Si lo deja en blanco, entonces la regla será aplicada a todas las PCs excepto la PC parental. ",
	"address_0": "<B>TODAS las Direcciones MAC en la LAN Actual</B> - Puede ver las direcciones MAC de todas las PCs en la LAN actual dando clic en el botón desplegable. Seleccione una de ellas, después esta dirección MAC será llenada con la Dirección MAC en el campo de la PC del Niño.",
	"website_desc": "<B>Descripción del sitio web </B> - En este campo, se crea una descripción del sitio web. Tome en cuenta que esta descripción debe ser <b>única</b>.",
	"allowed": "<B>Nombre del Sitio Web Permitido </B> - En este campo, puede ingresar 8 nombres de dominio permitidos para que el niño pueda acceder, ya sea el nombre completo o las palabras clave (por ejemplo, google). Cualquier nombre de dominio con las palabras clave dentro de este campo (www.google.com, news.google.com) será permitido.",
	"effe_time": "<B>Tiempo Efectivo </B> - En este campo, seleccione el tiempo efectivo para la regla o puede hacer uso de <b>Control de Acceso > Horario/b> para crear el horario que quiera. El valor predeterminado es En Cualquier Momento.",
	"status": "<B>Estado </B> - En este campo, hay dos opciones, Habilitado o Deshabilitado. Habilitado significa que esta regla tomará efecto mientras que Deshabilitado significa que esta regla no tomará efecto.",
	"save": "Dar clic en <B>Guardar</B> para completar las configuraciones.",
	"back": "Dar clic en el botón de <B>Regresar</B> para regresar a la página de Configuraciones de Controles Parentales."
};
var ParentCtrlHelpRpm =
{
	"header": "Ayuda de Controles Parentales",
	"brief": "Puede configurar los controles parentales en la página. La función de Control Parental puede ser usada para controlar las actividades de internet del niño, limitar el acceso al niño a ciertos sitios de Internet y restringir la hora de navegación.",
	"parental": "<B>Habilitar los Controles Parentales</B> Seleccionar la casilla si desea que esta función tome efecto. Esta función está deshabilitada de manera predeterminada.",
	"parental_0": "<B> Dirección MAC de la PC Parental </B> En este campo, ingresar la Dirección MAC de la PC que controla, o puede hacer uso del botón de abajo de <B> Copiar lo Citado Más Arriba </B> de arriba.",
	"address": "<B> Dirección MAC de la PC Actual</B> Este campo muestra la dirección MAC de la PC que está manejando este router. Si la Dirección MAC de su adaptador está registrada, puede dar clic en el botón de Copiar lo Citado Más Arriba a para llenar esta dirección a la Dirección MAC del campo de la PC Parental citado más arriba.",
	"sche": "Configurar el periodo de tiempo permitido para que la PC controlada tenga acceso a Internet.",
	"for_exam": "<B>Por ejemplo</B>: Si desea restringir el acceso a actividades de internet del host con la dirección MAC 00:11:22:33:44:AA a www.google.com únicamente <b>de 18:00 a 20:00</b> el <b>Sábado y Domingo </b>, primero debe seguir las siguientes configuraciones que se muestran a continuación:",
	"add_new": "Dar clic en el botón de <B>Agregar Nuevo</B> para ingresar a la página de Configuraciones de la Lista de Horarios.",
	"unique": "En el campo de Descripción, crear una descripción <b>única</b> para el horario, por ejemplo Horario_1.",
	"s_0": "En el campo de Aplicar A, seleccione el día o los días que necesita.",
	"s_1": "En el campo de hora, puede seleccionar todo el día 24 horas o puede ingresar la Hora de Inicio y la Hora de Detención en el campo correspondiente.",
	"controlClient": "Configurar la PC que desee controlar.",
	"control_exam": "<B>Por ejemplo</B>: Ingrese la dirección MAC de la PC (ejemplo 00: 11:22:33:44:AA) que le gustaría controlar en el campo 1-4 de la Dirección MAC, o puede escoger la dirección MAC de la Dirección MAC en la lista desplegable de la LAN actual.",
	"add_url": "<B>Agregar URL</B> Aquí puede ingresar las direcciones de la red a las cuales el niño tiene permitido tener acceso."
};
var PingHelpRpm =
{
	"header": "Ayuda Herramientas de Diagnóstico ",
	"brief": "Las herramientas de diagnóstico (Ping y Traceroute) le permiten revisar las conexiones de sus componen de red.",
	"diag_tool": "<B>Herramienta de Diagnóstico</B> - Dar clic en el botón de elección para seleccionar una herramienta de diagnóstico:",
	"ping": "<B>Ping</B> - Esta Herramienta de Diagnóstico soluciona problemas de conectividad, accesibilidad y resolución del nombre para un host o puerta de enlace determinado usando el datagrama de Petición de Eco obligatorio del protocolo de ICMP (Internet Control Message Protocol - Protocolo de Mensajes de Control de Internet) para obtener una Respuesta de Echo de ICMP desde un host o puerta de enlace. Puede usar ping para probar las dos direcciones IP numéricas o nombre de dominio. Si al usar ping la dirección IP es exitosa, pero no lo es al usar ping el nombre de dominio, podría tener un problema de resolución del nombre. En este caso, asegúrese que el nombre de dominio que está especificando pueda ser resuelto usando las peticiones del DNS (Domain Name System - Sistema de Nombre de Dominio). ",
	"traceroute": "<B> Trazo de ruta </B> - Esta herramienta de diagnóstico determina la ruta de acceso a un host dado enviando mensajes de petición de eco de ICMP (Internet Control Message Protocol) con valores TTL diferentes al destino. Cada gateway a lo largo de la trayectoria se requiere para decrementar el TTL en un paquete IP por al menos 1 antes de reenviarlo. Efectivamente, el TTL es un contador de enlaces máximo. Cuando el TTL en un paquete llega a 0, se espera que la puerta de enlace devuelva una respuesta ICMP Tiempo excedido a su dispositivo. Trazo de ruta determina la ruta enviando el primer mensaje de petición de eco con una TTL de 1 e incrementando la TTL por 1 en cada transmisión posterior hasta que el objetivo responde o se alcanza el número máximo de saltos. El número máximo de saltos es 20 por defecto y se puede especificar en el campo \"Max Trazo de ruta\". La ruta se determina examinando los mensajes ICMP Time Exceeded devueltos por pasarelas intermedias y el mensaje Responder Echo devuelto por el destino. Sin embargo, algunas pasarelas no devuelven mensajes de Tiempo excedido para paquetes con valores TTL caducados y son invisibles para la herramienta traceroute. En este caso, se muestra una fila de asteriscos (*) para ese salto.",
	"address": "<B>Dirección IP/ Nombre de Dominio</B> - Ingresar la Dirección IP o Nombre de Dominio de la PC cuya conexión desea diagnosticar.",
	"ping_coun": "<B>Conteo de Ping </B> - Especifica el número de mensajes de Petición de Eco enviados. El valor predeterminado es 4.",
	"packet": "<B> Tamaño del Paquete de Ping </B> - Especifica el número de bytes de datos a ser enviados. El valor predeterminado es 64.",
	"ping_time": "<B> Tiempo de Espera Agotado de Ping </B> - Tiempo para esperar una respuesta en segundos. El valor predeterminado es 1.",
	"traceroute_0": "<B>Traceroute Max TTL</B> - Establece el número máximo de saltos (TTL máximo a ser alcanzado) en la ruta para buscar el objetivo (destino). El valor predeterminado es 20.",
	"start": "Dar clic en el botón de <B>Comenzar</B> para comenzar el procedimiento de diagnóstico.",
	"note": "<B>Nota:</B>",
	"s_0": "Únicamente un usuario puede usar las herramientas de diagnóstico a la vez.",
	"s_1": "\"Conteo de Ping\", \"Tamaño del Paquete de Ping\" y \"Tiempo de espera agotado de Ping\" son Parámetros de Ping, y \"Traceroute Max TTL\" es Parámetro de Traceroute."
};
var PPPoECfgHelpRpm =
{
	"header": "Ayuda de WAN",
	"brief": "<B>WAN Tipo de Conexión:</B>",
	"dyna_ip": "Si su ISP está ejecutando un servidor DHCP, seleccione la opción de <B>IP Dinámico</B>.",
	"stat_ip": "Si su ISP proporciona una Dirección IP estática o fija, Máscara de Subred, Puerta de Enlace y configuraciones de DNS, seleccione la opción de <B>IP Estática</B>.",
	"pppoe": "Si su ISP proporciona una conexión PPPoE, seleccione la opción de <B>PPPoE</B>.",
	"bigp_cable": "Si su ISP proporciona la conexión de Cable BigPond (o Señal de Red Activa), por favor seleccione la opción de <B>Cable BigPond</B>.",
	"l2tp": "Si su ISP proporciona la conexión de L2TP, por favor seleccione la opción de <B>L2TP</B>.",
	"pptp": "Si su ISP proporciona la conexión de PPTP, por favor seleccione la opción de <B>PPTP</B>.",
	"note": "<B>Nota</B>: Si no sabe cómo seleccionar el tipo de conexión adecuado, dar clic en el botón de <B>Detectar</B> para permitir que el Router busque automáticamente su conexión de Internet para servidores y protocolos. El tipo de conexión será reportado cuando un servicio de Internet activo sea detectado exitosamente por el Router. Este reporte es para su referencia únicamente. Para estar seguro del tipo de conexión que su ISP le proporciona, por favor consulte al ISP. Los diversos tipos de conexiones de Internet que el Router puede detectar son los siguientes:",
	"pppoe_0": "<B>PPPoE</B> - Conexiones que usan PPPoE que requieren un nombre de usuario y la contraseña.",
	"dyna_ip_0": "<B>IP Dinámico</B> - Conexiones que usan la asignación de la dirección de IP dinámico.",
	"stat_ip_0": "<B>IP Estática</B> - Conexiones que usan la asignación de la dirección IP estática.",
	"password": "<B>Nombre de Usuario /Contraseña</B> - Ingresar el Nombre de Usuario y la Contraseña proporcionados por su ISP. Estos campos son sensibles a mayúsculas y minúsculas.",
	"secondary_conn": "<B>Conexión Secundaria</B> - Conexión Secundaria - Está disponible únicamente para la Conexión PPPoE. Si su ISP proporciona un tipo de conexión adicional como IP Estática/Dinámico para conectarse a una red del área local, entonces puede seleccionar el botón de elección de IP Estática/Dinámico para activar esta conexión secundaria. (La conexión secundaria no debe estar en la misma subred con la conexión pppoe.)",
	"disabled": "<B>Deshabilitado</B> - La Conexión Secundaria está deshabilitada de manera predeterminada, de tal manera que haya una conexión PPPoE únicamente. Esta opción es la que se recomienda. ",
	"dyna_ip_1": "<B>IP Dinámico</B> - Usar la dirección IP dinámica para conectarse a la red del área local proporcionada por el ISP.",
	"stat_ip_1": "<B>IP Estática</B> - Usar la dirección IP estática para conectarse a la red del área local proporcionada por el ISP. <B> Dirección IP </B> - Dirección IP - Ingresar la dirección IP proporcionada por el ISP para la conexión secundaria. Esta dirección es usada únicamente para tener acceso a la red del área local de la conexión secundaria. <B>Máscara de Subred</B> - Ingresar la máscara de subred proporcionada por el ISP para la conexión secundaria.",
	"alwa_on": "<b>Siempre encendido</b> - Se conecta automáticamente después que el Router es desconectado. Para usar esta opción, dar clic en el botón de elección.",
	"connect": "<B> Conectar bajo Demanda </B> - Puede configurar el Router para desconectar su conexión de Internet después de un periodo especificado de tiempo de la conectividad de Internet (<B>Tiempo Máximo de Inactividad</B>). Si su conexión de Internet ha sido finalizada debido a inactividad, <B>Conectar bajo Demanda</B> permite que el Router restablezca automáticamente su conexión cuando intente acceder a Internet de nuevo. Si desea activar <B>Conectar bajo Demanda</B>, ponga una marca de selección en el círculo. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingrese <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>.",
	"note_0": "<B>Nota:</B> Algunas veces la conexión no puede ser desconectada aunque especifique un tiempo para <B>Tiempo Máximo de Inactividad</B> (0~99 mins) ya que algunas aplicaciones visitan continuamente Internet en segundo plano.",
	"connect_manu": "<b>Conectar Manualmente</b> - Puede configurar el Router para hacer que se conecte o desconecte manualmente. Después de un periodo especificado de inactividad (<B>Tiempo Máximo de Inactividad</B>), el Router desconectará su conexión de Internet, y no podrá restablecer su conexión automáticamente tanto pronto intente acceder a Internet de nuevo. Para usar esta opción, dar clic en el botón de elección. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingrese <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>. De otra manera, ingrese el número de minutos que desea que tenga la última conexión de Internet a menos se solicite un nuevo enlace",
	"note_1": "<B>Nota:</B> Algunas veces la conexión no puede ser desconectada aunque especifique un <B>Tiempo Máximo de Inactividad</B> (0~99 mins) ya que algunas aplicaciones visitan continuamente Internet en segundo plano.",
	"note_2": "<B>Nota:</B> Únicamente cuando haya ajustado la hora del sistema en la página de <B> Herramientas del Sistema</B> -> <B>Configuraciones de la Hora</B>, la función de <B>Conexión basada en el Tiempo</B> puede tomar efecto.",
	"connect_0": "Dar clic en el botón de <B>Conectar</B> para conectar inmediatamente.",
	"disconnect": "Dar clic en el botón de <B>Desconectar</B> para desconectar inmediatamente.",
	"advanced": "Dar clic en el botón de <B>Avanzado</B> para configurar las opciones avanzadas.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var PPPoEv6CfgHelpRpm =
{
	"header": "Ayuda de WAN de IPv6",
	"brief": "<B>WAN Tipo de Conexión:</B>",
	"s_0": "Selecciona el tipo de conexión de WAN correcto basado en la topología de la red de su ISP.",
	"dhcpv": "<B>DHCPv6</B> - Conexiones que usan la asignación de la dirección IPv6.",
	"stat_ipv": "<B>IPv6 Estática</B> - Conexiones que usan la asignación de la dirección IPv6 Estática.",
	"pppoev": "<B>PPPoEv6</B> - Conexiones que usan PPPoEv6 que requieren un nombre de usuario y la contraseña.",
	"tunn_6to": "<B>Túnel 6a4</B> - Conexiones que usan la asignación de la dirección 6a4.",
	"password": "<B>Nombre de Usuario /Contraseña</B> - Ingresar el Nombre de Usuario y la Contraseña proporcionados por su ISP. Estos campos son sensibles a mayúsculas y minúsculas.",
	"advance": "Si su ISP le da una o dos direcciones IPv6 de DNS, dar clic en <b>Avanzado</b> y seleccionar <B>Configurar el servidor DNS de IPv6 manualmente</B> e ingresar el <B>DNS de IPv6 Primario</B> y el <B>DNS de IPv6 Secundario</B> en los campos correctos. De lo contrario, los servidores DNS serán asignados desde ISP dinámicamente.",
	"primary": "<B> DNS de IPv6 Primario</B> - Ingresar la dirección de IPv6 de DNS en notación hexadecimal con dos puntos proporcionada por su ISP.",
	"secondary": "<B>DNS de IPv6 Secundario</B> - Ingresar otra dirección IPv6 de DNS en notación hexadecimal con dos puntos proporcionada por su ISP.",
	"connect": "<B> Conectar bajo Demanda </B> - Puede configurar el Router para desconectar su conexión de Internet después de un periodo especificado de tiempo de la conectividad de Internet (<B>Tiempo Máximo de Inactividad</B>). Si su conexión de Internet ha sido finalizada debido a inactividad, <B>Conectar bajo Demanda</B> permite que el Router restablezca automáticamente su conexión cuando intente acceder a Internet de nuevo. Si desea activar <B>Conectar bajo Demanda</B>, ponga una marca de selección en el círculo. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingrese <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>.",
	"note": "<B>Nota:</B> Algunas veces la conexión no puede ser desconectada aunque especifique un tiempo para <B>Tiempo Máximo de Inactividad</B> (0~99 mins) ya que algunas aplicaciones visitan continuamente Internet en segundo plano.",
	"connect_auto": "<b>Conectar Automáticamente</b> - Conecta automáticamente después que Router es desconectado. Para usar esta opción, dar clic en el botón de elección. ",
	"connecting": "<B> Conexión basada en el tiempo </B> - Puede configurar el Router para hacer que se conecte o desconecte basándose en el tiempo. Ingresar la hora de inicio en HH-MM para conectar y la hora final en HH-MM para desconectar en los campos de <B>Periodo de Tiempo</B>.",
	"connect_manu": "<b>Conectar Manualmente</b> - Puede configurar el Router para hacer que se conecte o desconecte manualmente. Después de un periodo especificado de inactividad (<B>Tiempo Máximo de Inactividad</B>), el Router desconectará su conexión de Internet, y no podrá restablecer su conexión automáticamente tanto pronto intente acceder a Internet de nuevo. Para usar esta opción, dar clic en el botón de elección. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingrese <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>. De otra manera, ingrese el número de minutos que desea que tenga la última conexión de Internet a menos se solicite un nuevo enlace",
	"note_0": "<B>Nota:</B> Algunas veces la conexión no puede ser desconectada aunque especifique un <B>Tiempo Máximo de Inactividad</B> (0~99 mins) ya que algunas aplicaciones visitan continuamente Internet en segundo plano.",
	"note_1": "<B>Nota:</B> Únicamente cuando haya ajustado la hora del sistema en la página de <B> Herramientas del Sistema</B> -> <B>Configuraciones de la Hora</B>, la función de <B>Conexión basada en el Tiempo</B> puede tomar efecto."
};
var PptpCfgHelpRpm =
{
	"header": "Ayuda de WAN",
	"brief": "<B>WAN Tipo de Conexión:</B>",
	"dyna_ip": "Si su ISP está ejecutando un servidor DHCP, seleccione la opción de <B>IP Dinámico</B>.",
	"stat_ip": "Si su ISP proporciona una Dirección IP estática o fija, Máscara de Subred, Puerta de Enlace y configuraciones de DNS, seleccione la opción de <B>IP Estática</B>.",
	"pppoe": "Si su ISP proporciona una conexión PPPoE, seleccione la opción de <B>PPPoE</B>.",
	"bigp_cable": "Si su ISP proporciona la conexión de Cable BigPond (o Señal de Red Activa), por favor seleccione la opción de <B>Cable BigPond</B>.",
	"l2tp": "Si su ISP proporciona la conexión de L2TP, por favor seleccione la opción de <B>L2TP</B>.",
	"pptp": "Si su ISP proporciona la conexión de PPTP, por favor seleccione la opción de <B>PPTP</B>.",
	"password": "<B>Nombre de Usuario /Contraseña</B> - Ingresar el Nombre de Usuario y la Contraseña proporcionados por su ISP. Estos campos son sensibles a mayúsculas y minúsculas.",
	"dynamic": "<B>IP Dinámico / IP Estática</B> - Seleccione <B>IP Estática</B> si la dirección IP, la máscara de subred y la puerta de enlace y la dirección del servidor DNS han sido proporcionados por su ISP. De otra manera, por favor seleccione <B>IP Dinámico</B>.",
	"address": "<B>Dirección IP / Nombre del Servidor</B> - Ingresar la dirección IP o nombre de dominio del servidor proporcionados por su ISP.",
	"ip_addr": "<B>Dirección IP</B> - Ingresar la dirección IP usada para marcación. (Sólo puede ser configurada cuando se selecciona IP Estática)",
	"subn_mask": "<B>Máscara de Subred</B> - Ingresar la máscara de subred proporcionada por su ISP. (Sólo puede ser configurada cuando se selecciona IP Estática)",
	"gateway": "<B>Puerta de Enlace</B> - Ingresar la puerta de enlace proporcionada por su ISP. (Sólo puede ser configurada cuando se selecciona IP Estática) ",
	"dns_serv": "<B>Servidor DNS</B> - Ingresar el servidor DNS proporcionado por su ISP. (Sólo puede ser configurado cuando se selecciona IP Estática)",
	"internet": "<B>Dirección IP de Internet</B> La dirección IP de Internet asignada por el servidor PPTP.",
	"inte_dns": "<B>DNS de Internet</B> La dirección del servidor DNS de Internet asignada por el servidor PPTP.",
	"alwa_on": "<b>Siempre encendido</b> - Se conecta automáticamente después que el Router es desconectado. Para usar esta opción, dar clic en el botón de elección.",
	"connect": "<B> Conectar bajo Demanda </B> - Puede configurar el Router para desconectar su conexión de Internet después de un periodo especificado de tiempo de la conectividad de Internet (<B>Tiempo Máximo de Inactividad</B>). Si su conexión de Internet ha sido finalizada debido a inactividad, <B>Conectar bajo Demanda </B> permite que el Router restablezca automáticamente su conexión tan pronto intente acceder a Internet de nuevo. Si desea activar <B>Conectar bajo Demanda</B>, dar clic en el botón de elección. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingresar <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>. De otra manera, ingrese el número de minutos que desea que hayan transcurrido antes de que finalice su conexión de Internet.",
	"caution": "<b>Precaución</b> - Algunas veces la conexión no puede ser desconectada aunque especifique un tiempo para <B>Tiempo Máximo de Inactividad</B> ya que algunas aplicaciones visitan continuamente Internet en segundo plano. ",
	"connect_manu": "<b>Conectar Manualmente</b> - Puede configurar el Router para hacer que se conecte o desconecte manualmente. Después de un periodo especificado de inactividad (<B>Tiempo Máximo de Inactividad</B>), el Router desconectará su conexión de Internet, y no podrá restablecer su conexión automáticamente tanto pronto intente acceder a Internet de nuevo. Para usar esta opción, dar clic en el botón de elección. Si desea que su conexión de Internet permanezca activa todo el tiempo, ingrese <B>0</B> en el campo de <B>Tiempo Máximo de Inactividad</B>. De otra manera, ingrese el número de minutos que desea que tenga la última conexión de Internet a menos se solicite un nuevo enlace.",
	"caution_0": "<b>Precaución</b> - Algunas veces la conexión no puede ser desconectada aunque especifique un tiempo para <B>Tiempo Máximo de Inactividad</B> ya que algunas aplicaciones visitan continuamente Internet en segundo plano. ",
	"connect_0": "Dar clic en el botón de <B>Conectar</B> para conectar inmediatamente.",
	"disconnect": "Dar clic en el botón de <B>Desconectar</B> para desconectar inmediatamente.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var PrintServerCfgHelpRpm =
{
	"header": "Ayuda del Servidor de Impresiones ",
	"brief": "Puede configurar el servidor de impresión en esta página.",
	"s_0": "Hay dos estados del servidor de impresión, descritos a continuación:",
	"online": "<B>En línea</B>- Indica que el servidor de impresiones ha sido encendido. Puede dar clic en el botón de <B>\"Parar\"</B> para detenerlo.",
	"offline": "<B>Fuera de línea</B>- Indica que la característica del servidor de impresiones está deshabilitada. Puede dar clic en el botón de <B>\"Iniciar\"</B> para iniciarla."
};
var QoSCfgHelpRpm =
{
	"header": "Ayuda de Configuración de Control de Ancho de Banda ",
	"brief": "En esta página puede deshabilitar o habilitar la característica de Control de Ancho de Banda. Las Reglas de Control de Ancho de Banda funcionarán adecuadamente sólo cuando la característica de Control de Ancho de Banda esté habilitada.",
	"bandwidth": "<B>Habilitar el Control de Ancho de Banda</B> - Si se habilita, las reglas del Control de Ancho de Banda tomarán efecto.",
	"egress_band": "<B>Ancho de Banda de Egreso</B> - La velocidad de carga que pasa a través del puerto de WAN.",
	"ingress_band": "<B> Ancho de Banda de Ingreso </B> - La velocidad de descarga a través del puerto de WAN.",
	"s_0": "Lista de Reglas de Control de Ancho de Banda.",
	"description": "<b>Descripción</b> - La información de la descripción incluye el rango de direcciones, el rango de puerto y el protocolo de la capa de transporte.",
	"priority": "<b>Prioridad</b> - Prioridad de las reglas de Control de Ancho de Banda. &lsquo;1&rsquo; significa la prioridad más alta mientras que &lsquo;8&rsquo; significa la prioridad más baja. El Ancho de Banda total de Envío/Recepción primero es asignado para garantizar la Tasa Mínima de las reglas de Control de Ancho de Banda. Si queda algo de ancho de banda, primero es asignado a la regla con la prioridad más alta, después a la regla con la segunda prioridad más alta, y así sucesivamente.",
	"egress_band_0": "<b>Ancho de Banda de Egreso</b> - La velocidad de carga máxima que pasa a través del puerto de WAN, el número predeterminado es 0.",
	"ingress_band_0": "<b> Ancho de Banda de Ingreso </b> - La velocidad de descarga máxima que pasa través del puerto de WAN, el número predeterminado es 0.",
	"status": "<B>Estado</B> - Estado de la regla, muestra si la regla toma efecto.",
	"edit": "<b>Editar</b> - Seleccionar para editar o borrar una entrada existente."
};
var QoSRuleCfgHelpRpm =
{
	"header": "Ayuda de Configuración de Reglas de Control de Ancho de Banda",
	"brief": "Esta página es para configurar el ancho de banda de las reglas de Control de Ancho de Banda.",
	"status": "<B>Estado</B> Habilita o deshabilita la regla.",
	"ip_rang": "<b>Rango de IP</b> - Rango de dirección de la PC Interior. Si los dos están en blanco (o 0.0.0.0), el dominio es inefectivo.",
	"port_rang": "<b>Rango de Puerto</b> - El rango de puertos con el cual puede acceder la PC interior a la PC exterior. Si todos están en blanco (o 0), el dominio es inefectivo.",
	"priority": "<b>Prioridad</b> - Prioridad de las reglas de Control de Ancho de Banda. &lsquo;1&rsquo; significa la prioridad más alta mientras que &lsquo;8&rsquo; significa la prioridad más baja. El Ancho de Banda total de Envío/Recepción primero es asignado para garantizar la Tasa Mínima de las reglas de Control de Ancho de Banda. Si queda algo de ancho de banda, primero es asignado a la regla con la prioridad más alta, después a la regla con la segunda prioridad más alta, y así sucesivamente.",
	"egress_band": "<b>Control de Ancho de Banda de Egreso</b> - La velocidad de carga máxima y mínima que pasa a través del puerto de WAN.",
	"ingress_band": "<b> Ancho de Banda de Ingreso </b> - La velocidad de descarga máxima y la mínima través del puerto de WAN.",
	proto: "<b>Protocolo</b> - Transporta el protocolo de capa, aquí están Todos, TCP, UDP."
};
var QoSRuleListHelpRpm =
{
	"header": "Ayuda de la Lista de Reglas de Control de Ancho de Banda ",
	"brief": "Esta página muestra la lista de reglas de Control de Ancho de Banda.",
	"id": "<b>ID</b> - La secuencia de la entrada.",
	"description": "<b>Descripción</b> - La información de la descripción incluye el rango de direcciones, el rango de puerto y el protocolo de la capa de transporte.",
	"egress_band": "<b>Ancho de Banda de Egreso</b> - La velocidad de carga máxima que pasa a través del puerto de WAN, el número predeterminado es 0.",
	"ingress_band": "<b> Ancho de Banda de Ingreso </b> - La velocidad de descarga máxima que pasa través del puerto de WAN, el número predeterminado es 0.",
	"status": "<B>Estado</B> - Estado de la regla, muestra si la regla toma efecto.",
	"modify": "<b>Modificar</b> - Seleccionar para modificar o borrar una entrada existente."
};
var RestoreDefaultCfgHelpRpm =
{
	"header": "Ayuda de Configuraciones Predeterminadas de Fábrica",
	"brief": "Dar clic en el botón de <B>Restaurar</B> para restablecer las configuraciones a sus valores predeterminados.",
	"admin": "Nombre de Usuario Predeterminado",
	"admin_0": "Contraseña Predeterminada",
	"s_0": "Dirección IP Predeterminada",
	"s_1": "Máscara de Subred",
	"note": "<B>Nota:</B> Todas las configuraciones cambiadas se perderán cuando los ajustes predeterminados sean restablecidos."
};

var SiteSurveyHelpRpm =
{
	"header": "Ayuda de Examinar el Sitio de Wlan",
	"brief": "<B>Nota</B>: La información de las APs que puede conectar se muestra en esta página. Use como se indica a continuación ",
	"s_0": "Primero, encuentre la línea donde está colocada la red a la que desea conectarse.",
	"s_1": "Después, dar clic en el hipervínculo de \"Conectar\" al final de esa línea.",
	"s_2": "Ahora, el SSID de la red destino se llenó en el lugar correcto en la página de configuración de Wlan automáticamente.",
	"note": "<B>Nota</B>: Dar clic en el botón de <B> Actualizar </B> para actualizar la lista de AP.",
	"back": "Dar clic en el botón de <B> Regresar</B> para regresar a la página de configuración de Wlan."
};
var SoftwareUpgradeHelpRpm =
{
	"header": "Ayuda de Actualización del Firmware",
	"brief": "Para actualizar el firmware del dispositivo, siga estas instrucciones:",
	"s_0": "Descargar el archivo de actualización del firmware más reciente desde nuestro sitio web",
	"file_name": "Ingresar o seleccionar el nombre de la ruta donde guarda el archivo descargado en la computadora en el espacio en blanco de <B>Nombre del Archivo</B>.",
	"upgrade": "Dar clic en el botón de <B>Actualizar</B>.",
	"s_1": "El dispositivo se reiniciará mientras se completa la actualización.",
	"firm_version": "<B>Versión del Firmware</B> - Muestra la versión actual del firmware.",
	"hard_version": "<B>Versión del Hardware</B> - Muestra la versión actual del hardware. La versión del hardware del archivo de actualización debe ser de acuerdo con la versión actual del hardware.",
	"note": "<B> Nota: </b> La versión del firmware debe corresponder al hardware. El proceso de actualización tarda unos instantes y el dispositivo se reinicia automáticamente cuando se completa la actualización. Es importante mantener la alimentación electrica durante todo el proceso. La pérdida de energía durante la actualización podría dañar el dispositivo."
};
var SpecialAppHelpRpm =
{
	"header": "Ayuda de Activación del Puerto ",
	"brief": "Algunas aplicaciones requieren conexiones múltiples, como juegos de Internet, video-conferencias, llamadas telefónicas por Internet, y etc. La Activación de Puertos se usa para algunas de estas aplicaciones que no pueden funcionar con un Router NAT simple.",
	"configured": "<B>Una vez configurada, la operación es como se muestra a continuación </B>:",
	"trig_port": "Un host local hace una conexión de salida hacia un host externo usando un número de puerto destino definido en el campo de <B> Puerto de Activación </B>.",
	"port_trig": "El Router registra esta conexión, abre el puerto entrante o los puertos asociados con esta entrada en la tabla de <B>Activación de Puertos</B> , y los asocia con el host local.",
	"open_port": "Cuando sea necesario, el host externo podrá conectarse al host local usando uno de los puertos definidos en el campo de <B>Puerto Abierto</B>.",
	"rules": "<B>Reglas</B>:",
	"trig_port_0": "<B>Puerto de Activación</B> - El puerto para el tráfico saliente. Una conexión de salida que usa este puerto activará esta regla. ",
	"trigger_prot": "<B> Protocolo de Activación </B> - El protocolo usado para los Puertos de Activación, ya sea <B>TCP, </B><B>UDP</B>, o <B>Todos</B> (todos los protocolos soportados por el Router).",
	"open_port_0": "<B>Puerto Abierto</B> - El puerto o rango de puertos usados por el sistema remoto cuando responde a la solicitud de salida. Una respuesta que usa uno de estos puertos será enviada a la PC que activó esta regla. Puede ingresar 5 grupos de puertos (o secciones de puertos) como máximo. Cada grupo de puertos debe estar separado con \",\", por ejemplo, 2000-2038, 2046, 2050-2051, 2085, 3010-3030.",
	"open_prot": "<B>Protocolo Abierto </B> - El protocolo usado para el Puerto Entrante, ya sea <B>TCP, </B><B>UDP</B>, o <B>TODOS </B> (todos los protocolos soportados por el Router).",
	"status": "<B>Estado</B> - El estado de esta entrada, Habilitado significa que la entrada de Activación de Puertos está habilitada.",
	"edit": "<b>Editar</b> - Para editar una entrada existente.",
	"following": "<B>Para agregar una regla nueva, por favor realice lo siguiente en la pantalla de Activación de Puertos </B>:",
	"add_new": "Dar clic en el botón de <B>Agregar Nuevo</B>.",
	"s_0": "Ingresar un número de puerto usado por la aplicación para enviar una solicitud saliente en el recuadro de Puerto de Activación.",
	"trig_port_1": "Seleccionar el protocolo usado para el <B>Puerto de Activación</B> de la lista desplegable de Protocolo de Activación, ya sea <B>TCP</B>, <B>UDP</B>, o <B>Todos</B>.",
	"s_1": "Ingresar el rango del número de puertos usados por el sistema remoto cuando responde a la solicitud de PCs en el recuadro de Puerto Abierto.",
	"open_port_1": "Seleccionar el protocolo usado para el rango de <B>Puerto Abierto</B> de la lista desplegable, ya sea <B>TCP</B>, <B>UDP</B>, o <B>Todos</B>.",
	"enabled": "Seleccionar la opción de <B>Habilitado</B> en la lista desplegable de <B>Estado</B>.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar la regla nueva.",
	"service": "Hay muchas aplicaciones populares en la lista del <B>Puerto de Servicio Común</B>. Puede seleccionar una aplicación y después las casillas del Puerto de Activación y de Puerto Abierto se llenarán automáticamente. Esto tiene el mismo efecto como cuando se agrega una regla nueva.",
	"enable_sele": "Dar clic en el botón de <B>Habilitar Seleccionado</B> para habilitar las entradas seleccionadas.",
	"disable_sele": "Dar clic en el botón de <B>Deshabilitar Seleccionado</B> para deshabilitar las entradas seleccionadas.",
	"delete_sele": "Dar clic en el botón de <B>Borrar Seleccionado</B> para borrar las entradas seleccionadas.",
	"note": "<B>Nota:</B>",
	"s_2": "Cuando la conexión de activación sea liberada, los puertos abiertos correspondientes se cerrarán.",
	"s_3": "Cada regla sólo puede ser usada por un host en la LAN a la vez. La conexión de activación de otros hosts en la LAN será negada.",
	"open_port_2": "<B>Puerto Abierto </B> los rangos no pueden superponerse entre sí."
};
var StaticRouteTableHelpRpm =
{
	"header": "Ayuda de Ruta Estática",
	"brief": "Una ruta estática es una ruta pre-determinada que la información de la red debe seguir para alcanzar un host o red específico. Usar la página de Enrutamiento Estático para agregar o borrar una ruta.",
	"routing": "<B>Para agregar entradas de enrutamiento estático </B>:",
	"add_new": "Dar clic en el botón de <B>Agregar Nuevo</B>.",
	"s_0": "Ingresar la siguiente información:",
	"enabled": "Seleccionar <B>Habilitado</B> en la lista desplegable de <B>Estado</B>.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar los cambios.",
	"existing": "<B>Para modificar o borrar una entrada existente </B>:",
	"s_1": "Encontrar la entrada deseada en la tabla.",
	"edit": "Dar clic en <B>Editar</B> según se desee en la columna de <B>Editar</B>.",
	"enable_sele": "Dar clic en el botón de <B>Habilitar Seleccionado</B> para habilitar las entradas seleccionadas.",
	"disable_sele": "Dar clic en el botón de <B>Deshabilitar Seleccionado</B> para deshabilitar las entradas seleccionadas.",
	"delete_sele": "Dar clic en el botón de <B>Borrar Seleccionado</B> para borrar las entradas seleccionadas.",
	dest: "<B>Red Destino</B> - La Dirección IP Destino es la dirección de la red o host que desea asignar a una ruta estática. ",
	mask: "<B>Máscara de Subred</B> - La Máscara de Subred determina qué parte de una dirección IP es parte de la red, y qué parte es parte del host.",
	gw: "<B>Puerta de Enlace</B> - Esta es la dirección IP del dispositivo de la puerta de enlace predeterminada que permite el contacto entre el Router y la red o host.",
	intf: "<B>Interfaz</B> - Está vacío de manera predeterminada. Por favor seleccione una conexión de la lista desplegable, si la Puerta de Enlace se deja vacía o si no está en el mismo segmento de la red que la interfaz de LAN/WAN."
};
var StatusHelpRpm =
{
	"header": "Ayuda de Estado",
	"brief": "La página de <B>Estado</B> muestra el estado y la configuración actual del Router. Toda la información es de sólo lectura.",
	"lan": "<B>LAN</B> - Los siguientes parámetros aplican al puerto de LAN del Router. Puede configurarlos en la página de <B>Red -> LAN</B>.",
	"mac_addr": "<B>Dirección MAC</B> - La dirección física del Router, como se ve desde la LAN.",
	"ip_addr": "<B>Dirección IP</B> - La dirección IP de la LAN del Router.",
	"subn_mask": "<B>Máscara de Subred</B> - La máscara de subred asociada con la dirección IP de la LAN.",
	"wireless 2.4GHz/5GHz": "<B> Inalámbrico 2.4GHz / 5GHz  </B> - Estos son los ajustes o información actuales para inalambrico. Usted puede configurarlos en <B> Inalámbrico 2.4GHz / 5GHz - & gt; Configuración básica </B>.",
	"operation_mode": "<B> Modo de operación </B> - Indica el modo en el que está trabajando el dispositivo.",	
	"wireless": "<B>Inalámbrico</B> - Estas son las configuraciones actuales o información para Inalámbrico. Puede configurarlos en la página de <B> Inalámbrico -&gt; Configuraciones Básicas </B>.",
	"wire_radio": "<B>Radio Inalámbrica</B> - Indica si la característica de la radio inalámbrica del Router está habilitada o deshabilitada.",
	"name_ssid": "<B>Nombre (SSID)</B> - El SSID del Router.",
	"mode": "<B>Modo</B> - El modo inalámbrico actual en el cual opera el Router.",
	"channel": "<B>Canal</B> - El canal inalámbrico actual en uso.",
	"chan_width": "<B>Ancho del Canal</B> - El ancho de banda del canal inalámbrico.",
	"mac_addr_0": "<B>Dirección MAC</B> - La dirección física del Router, como se ve desde la WLAN.",
	"wds_stat": "<B>Estado de WDS </B> - Se muestra el estado de la conexión de WDS.",
	"wan": "<B>WAN</B> - Los siguientes parámetros aplican para los puertos WAN del Router. Puede configurarlos en la página de <b><B>Redes -> WAN</B></b>.",
	"mac_addr_1": "<B>Dirección MAC</B> - La dirección física del puerto de WAN, como se ve desde Internet.",
	"ip_addr_0": "<B>Dirección IP</B> - La dirección IP de la WAN actual (Internet). Este campo se dejará en blanco o 0.0.0.0 si la dirección IP es asignada dinámicamente y no hay conexión a Internet.",
	"subn_mask_0": "<B>Máscara de Subred</B> - La máscara de subred asociada con la dirección IP de WAN.",
	"default_gate": "<B>Puerta de Enlace Predeterminada </B> - La puerta de enlace usada actualmente por el Router se muestra aquí.",
	"dns_serv": "<B>Servidor DNS</B> - Las direcciones IP del Servidor DNS (Domain Name System - Sistema de Nombres de Dominio) usadas actualmente por el Router. Múltiples configuraciones de IP de DNS son comunes. Generalmente se usa el primer servidor DNS disponible.",
	"onli_time": "<B>Tiempo de conexión en línea </B> - El tiempo que usted está en línea. Cuando usa <b>PPPoE</b> como el tiempo de conexión de WAN, el tiempo en línea se muestra aquí.",
	"secondary_conn": "<B>Conexión Secundaria</B> - La Conexión Secundaria se mostrará en esta área.",
	"sent_byte": "<B>Enviado (Bytes)</B> - El tráfico que se contó en bytes ha sido enviado desde el puerto de WAN.",
	"sent_pack": "<B>Enviados(Paquetes)</B> - El tráfico que se contó en paquetes ha sido enviado desde el puerto de WAN.",
	"rece_bytes": "<b>Recibidos (Bytes)</b> - El tráfico que se contó en bytes ha sido recibido desde el puerto de WAN.",
	"rece_packets": "<b>Recibidos (Paquetes)</b> - El tráfico que se contó en paquetes ha sido recibido desde el puerto de WAN.",
	"system": "<B> Tiempo de Actividad del Sistema </B> - La cantidad de tiempo desde la última vez que el Router fue encendido o restablecido.",
	"refresh": "Dar clic en el botón de <B>Actualizar</B> para obtener el estado más reciente y las configuraciones del Router."
};
var StatusHelpRpm_AP =
{
	"header": StatusHelpRpm.header,
	"brief": "La página <B> Estado </B> muestra el estado actual del AP y su configuración. Toda la información es de sólo lectura.",
	"lan": "<B> LAN </B> - Los siguientes parámetros se aplican al puerto LAN del AP. Puede configurarlos en la página <B> Red -> LAN </B>.",
	"mac_addr": "<B> Dirección MAC </B> - La dirección física del AP, como se ve desde la LAN.",
	"ip_addr": "<B> Dirección IP </B> - La dirección IP de LAN del AP.",
	"subn_mask": StatusHelpRpm.subn_mask,
	"operation_mode": StatusHelpRpm.operation_mode,	
	"wireless": StatusHelpRpm.wireless,
	"wire_radio": "<B> Radio inalámbrico </B>: indica si la función de radio inalámbrico del AP está habilitada o deshabilitada.",
	"name_ssid_root": "<B> Nombre (SSID) de raíz del AP </B> - El SSID de raíz del AP.",	
	"name_ssid": "<B> Nombre (SSID) </B> - El SSID del AP.",
	"mode": "<B> Modo </B> - El modo inalámbrico actual en el que trabaja el AP.",
	"channel": StatusHelpRpm.channel,
	"chan_width": StatusHelpRpm.chan_width,
	"mac_addr_0": "<B> Dirección MAC </B> - La dirección física del AP, como se ve desde la WLAN.",
	"wds_stat": StatusHelpRpm.wds_stat,	
	"system": "<B> Tiempo de encendido del sistema </B> - Es el tiempo transcurrido desde que el AP se encendió o restableció por última vez.",
	"refresh": "Haga clic en el botón <B> Actualizar </B> para obtener el último estado y la configuración del AP."
};
var SysRebootHelpRpm =
{
	"header": "Ayuda de Reiniciar",
	"brief": "Haga clic en el botón <B> Reinicio </B> para reiniciar el dispositivo.",
	"reboot_title": "<B> Reinicio </b>",
	"reboot_brief": "Haga clic en el botón <B> Reinicio </B> para reiniciar el dispositivo.",
    "auto_reboot_title": "<B> Tiempo de reinicio automático </b>",
    "r_0": "Hay dos opciones:",
    "r_1": "Desactivar: Desactiva la función de reinicio automático.",
    "r_2": "Horario:",
    "r_3": "Día: elija Todos los días o elija Seleccionar días y seleccione el día determinado (días) para reiniciar el router.",
    "r_4": "Hora: especifique la hora en el formato HHMM para el reinicio automático.",
	"s_0": "Algunos ajustes del dispositivo sólo tendrán efecto después de reiniciar, que incluyen:",
	"s_1": "Cambiar la Dirección IP de la LAN (el sistema reiniciará automáticamente).",
	"s_2": "Actualizar el firmware del dispositivo (el sistema se reiniciará automáticamente).",
	"s_3": "Restaure los ajustes del dispositivo a los valores predeterminados de fábrica (el sistema se reiniciará automáticamente).",
	"s_4": "Actualizar la configuración con el archivo (el sistema reiniciará automáticamente)."
};
var SysRouteTableHelpRpm =
{
	"header": "Ayuda de la Tabla de Enrutamiento del Sistema",
	"brief": "La tabla de enrutamiento del sistema ve todas las entradas de rutas válidas en uso. La Dirección IP Destino, Máscara de Subred, Puerta de Enlace, y la Interfaz serán desplegadas para cada entrada. Dar clic en el botón de <B>Actualizar</B> para actualizar la información mostrada.",
	dest: "<B>Red Destino</B> - La Red Destino es la dirección de la red o host a la cual se le asigna la ruta estática.",
	mask: "<B>Máscara de Subred</B> - La Máscara de Subred determina qué parte de una dirección IP es parte de la red, y qué parte es parte del host.",
	gw: "<B>Puerta de Enlace</B> - Esta es la dirección IP del dispositivo de la puerta de enlace que permite el contacto entre el Router y la red o host. ",
	intf: "<B>Interfaz</B> - Esta interfaz le dice si la Dirección IP Destino está en la <B>LAN y WLAN</B> (redes internas conectadas por cable e inalámbricas), la <B>Conexión de Internet </B> o la <B>Conexión Secundaria </B> (conexión interna con Acceso Dual de PPPoE, L2TP o PPTP). "
};
var SystemLogHelpRpm =
{
	"header": "Ayuda de Registro del Sistema",
	"brief": "<B>Tipo de Registro</B> - Al seleccionar el tipo de registro, se mostrarán sólo los registros de este tipo.",
	"log_leve": "<B>Nivel de Registro </B> - Al seleccionar el nivel de registro, se mostrarán sólo los registros de este nivel.",
	"refresh": "<B>Actualizar</B> - Actualiza la página para mostrar la lista de registros más reciente.",
	"clea_log": "<B> Borrar registro </B> - Todos los registros se eliminarán del dispositivo permanentemente, no sólo de la página.",
	"save_log": "<B>Guardar Registro</B> - Dar clic para guardar todos los registros en un archivo txt.",
	"log_sett": "<B>Configuraciones del Registro</B> - Dar clic para configurar los registros en la pantalla.",
	"save_loca": "<B>Guardar Localmente</B> - Si selecciona Guardar Localmente, los eventos serán registrados en la memoria local.",
	"mini_level": "<B>Nivel Mínimo</B> - Seleccionar el nivel Mínimo en la lista desplegable, para el Nivel Mínimo, todos los eventos registrados por encima o igual al nivel seleccionado serán desplegados. ",
	"save_remo": "<B>Guardar Remotamente </B> - Si se selecciona Guardar Remotamente, los eventos serán enviados a la dirección IP especificada y el puerto UDP del servidor de registros del sistema remoto."
};
var SystemStatisticHelpRpm =
{
	"header": "Ayuda de Estadísticas",
	"brief": "La página de Estadísticas muestra el tráfico de la red de cada PC en la LAN, incluyendo el tráfico total y el valor del último B>Intervalo de las Estadísticas de Paquetes</B> en segundos.",
	"note": "<font color=\"#C11C66\">Nota: Si Hardware NAT está habilitado, Estadísticas NO tomará efecto, ya que estos dos módulos no pueden operar al mismo tiempo.</font>",
	"statistics": "<B>Estado Actual de Estadísticas</B> - Habilitado o Deshabilitado. El valor predeterminado está deshabilitado. Para habilitarlo, dar clic en el botón de Habilitar. Si está deshabilitado, la función de protección de DoS en las configuraciones de Seguridad se deshabilitará. ",
	"statistics_0": "<B> Intervalo de Estadísticas de Paquetes </B> - El valor predeterminado es 10. Seleccionar un valor entre 5 y 60 segundos en la lista desplegable. El valor del Intervalo de Estadísticas de Paquetes indica la sección de tiempo de la estadística de paquetes.",
	"sort_rules": "<B>Reglas Clasificadas </B>- Seleccionar cómo las estadísticas mostradas son clasificadas. ",
	"auto_refr": "Dar clic en la casilla se selección de <B>Actualización Automática</B> para actualizar automáticamente.",
	"refresh": "Dar clic en el botón de <B>Actualizar</B> para actualizar la página.",
	"rese_all": "Dar clic en el botón de <B>Restablecer Todo</B> para restablecer los valores de todas las entradas a cero.",
	"dele_all": "Dar clic en el botón de <b>Borrar Todo</b> para borrar todas las entradas en la tabla.",
	"stat_table": "<B>Tabla de Estadísticas </B>",
	"address": "<B>Dirección IP/ Dirección MAC</B> - La Dirección IP y la Dirección MAC se muestran con estadísticas relacionadas.",
	"total": "<B>Total</B>",
	"current": "<B>Actual</B>",
	"operation": "<B>Operación</B>",
	t_packets: "<B>Paquetes</B> - El número total de paquetes recibidos y transmitidos por el Router.",
	t_bytes: "<B>Bytes</B> - El número total de bytes recibidos y transmitidos por el Router.",
	c_packets: "<B>Paquetes</B> - El número de paquetes recibidos y transmitidos por segundo en el Intervalo de Estadísticas de Paquetes especificado.",
	c_bytes: "<B>Bytes</B> - El número de bytes recibidos y transmitidos por segundo en el Intervalo de Estadísticas de Paquetes especificados. ",
	icmpTx: "<B>ICMP Tx</B> - El número de paquetes ICMP transmitidos a la WAN por segundo en el Intervalo de Estadísticas de Paquetes especificado. Se muestra como la \"tasa de transmisión actual / tasa de transmisión máxima\".",
	udpTx: "<B>UDP Tx</B> - El número de paquetes UDP transmitidos a la WAN por segundo en el Intervalo de Estadísticas de Paquetes especificado. Se muestra como la \"tasa de transmisión actual / tasa de transmisión máxima\".",
	tcpTx: "<B>TCP SYN Tx</B> - El número de paquetes TCP SYN transmitidos a la WAN por segundo en el Intervalo de Estadísticas de Paquetes especificado. Se muestra como la \"tasa de transmisión actual / tasa de transmisión máxima\".",
	t_reset: "<b> Restablecer </b> - Restablece los valores de la entrada a cero.",
	t_delete: "<b>Borrar</b> - Borra la entrada existente en la tabla."
};
var UpnpCfgHelpRpm =
{
	"header": "Ayuda de UPnP ",
	"brief": "La característica de UPnP (Universal Plug and Play - Conexión y Funcionamiento Universal) permite que todos los dispositivos como computadoras de Internet tengan acceso a los recursos o dispositivos del host local según sea necesario. Los dispositivos de UPnP pueden ser descubiertos automáticamente por la aplicación del servicio de UPnP en la LAN.",
	"current": "<B>Estado Actual de UPnP</B> - UPnP puede ser habilitado o deshabilitado dando clic en el botón de <B>Habilitar</B> o <B>Deshabilitar</B>. Esta característica está habilitada de manera predeterminada.",
	"settings": "<B>Lista de Configuraciones Actuales de UPnP</B>:",
	"s_0": "Esta tabla muestra la información actual de UPnP.",
	"app_desc": "<B>Descripción de la App</B> - La descripción acerca de la aplicación que inicia la petición de UPnP.",
	"exte_port": "<B>Puerto Externo</B> - El puerto que el Router abrió para la aplicación.",
	"protocol": "<b>Protocolo</b> - El tipo de protocolo que está abierto.",
	"inte_port": "<B>Puerto Interno</B> - El puerto el cual el Router abrió para el host local.",
	"ip_addr": "<B>Dirección IP</B> - La dirección IP del host local que inicia la solicitud de UPnP.",
	"status": "<B>Estado</B> - Puede ser Habilitado o Deshabilitado, \"Habilitado\" significa que el puerto aún está activo; de lo contrario, el puerto está inactivo.",
	"enable": "Dar clic en el botón de <B>Habilitar</B> para habilitar UPnP.",
	"disable": "Dar clic en el botón de <B>Deshabilitar</B> para deshabilitar el UPnP.",
	"refresh": "Dar clic en el botón de <B>Actualizar</B> para actualiza la Lista de Configuraciones Actuales de UPnP."
};
var UsbAccountHelp =
{
	"header": "Ayuda de Cuentas USB",
	"brief": "En esta página puede especificar el nombre de usuario y la contraseña para los usuarios del Almacenamiento de Uso Compartido y Servidores FTP en esta página. Los usuarios del Almacenamiento de Uso Compartido pueden acceder a las carpetas ingresando el siguiente URL en el campo de dirección de su navegador o Windows Explorer, como \\192.168.0.1. El Servidor FTP puede iniciar sesión en el Servidor FTP mediante el Cliente FTP. Hay cinco usuarios aquí que proporcionan medios para controlar el acceso al almacenamiento masivo USB mediante el Almacenamiento de Uso Compartido o FTP. El Súper Usuario tiene el derecho de leer y escribir al Almacenamiento de Uso Compartido y Servidores FTP.",
	"s_0": "Para agregar una cuenta de usuario nueva, por favor siga los pasos que se muestran a continuación:",
	"choo_index": "1. Seleccionar el índice de la lista desplegable de <B>Seleccionar Índice</B>.",
	"new_user": "2. Defina por sí mismo un <B>Nuevo Nombre de Usuario </B>.",
	"new_pass": "3. Ingresar la contraseña en el campo de <B>Contraseña Nueva</B>.",
	"password": "4. Re-Ingresar la contraseña en el campo de <B>Confirmar contraseña</B>.",
	"set": "5. Dar clic en el botón de <B>Configurar</B>, y después se agregará una entrada nueva en la tabla.",
	"delete": "Para borrar una cuenta de usuario existente, por favor dar clic en <B>Borrar</B> en la columna de <B>Acción</B>."
};
var UsbDlnaHelp =
{
	"header": "Ayuda del Servidor de Medios ",
	"brief": "En esta página puede crear un Servidor de Medios que le permita compartir contenido almacenado con otras computadoras y dispositivos en la red de su casa y en Internet.",
	"server_enab": "<B>Habilitar Servidor </B> Seleccionar esta casilla para habilitar esta función.",
	"serv_name": "<B>Nombre del Servidor </B> El nombre de este Servidor de Medios.",
	"s_0": "Para agregar una nueva carpeta compartida para su servidor de medios, por favor siga las instrucciones que se muestran a continuación:",
	"folder": "a) Dar clic en el botón de <B>Agregar Carpeta Nueva</B>, y verá la pantalla.",
	"shar_name": "b) Ingresar el nombre de la carpeta compartida en el campo de <B>Compartir Nombre</B>.",
	"apply": "c) Dar clic en el botón de <B>Aplicar</B> para aplicar la configuración.",
	"scan_now": "d) Dar clic en el botón de <B>Escanear ahora </B> para escanear todas las carpetas compartidas inmediatamente. También puede seleccionar <B>Escaneo automático </B>, al mismo tiempo, seleccionar un tiempo de intervalo de escaneo automático por medio de la lista desplegable. En este caso el Servidor de Medios escaneará las carpetas compartidas."
};
var UsbFtpHelp =
{
	"header": "Ayuda del Servidor FTP USB",
	"brief": "Puede crear un servidor FTP que puede ser accedido desde Internet o su red local.",
	"server_stat": "<B>Estado del Servidor </B> Indica el estado actual del Servidor FTP.",
	"inte_access": "<B>Acceso Interno</B> Si <B>Acceso Interno</B> está habilitado, el(los) usuario(s) en la red pública pueden acceder al servidor FTP mediante la <B>Dirección de Internet</B>.",
	"inte_address": "<B>Dirección de Internet</B> Si el <B>Acceso Interno</B> está habilitado, el IP de WAN se mostrará aquí.",
	"serv_port": "<B> Puerto de Servicio </B> Ingresar el número del Puerto FTP a usar. El valor predeterminado es 21.",
	"shar_name": "<B>Compartir Nombre </B> El nombre mostrado de esta carpeta.",
	"directory": "<B>Directorio</B> La trayectoria completa real de la carpeta especificada.",
	"user_inde": "<B>Índice del Usuario </B> Se muestra la autorización del usuario.",
	"status": "<B>Estado</B> El estado de la entrada está habilitado o deshabilitado.",
	"edit": "<B>Editar</B> Dar clic en <B>Editar</B> en la tabla, y después puede modificar la entrada.",
	"s_0": "Para agregar una carpeta nueva, siga las instrucciones de abajo.",
	"folder": "1. Dar clic en <B>Agregar Carpeta Nueva</B>",
	"browse": "2. Dar clic en el botón de <B>Examinar</B>, y después seleccionar <B>Seleccionar Volumen</B> de la lista desplegable.",
	"shar_name_0": "3. Ingresar el nombre a mostrar de la carpeta compartida en el campo de <B>Compartir Nombre </B> .",
	"apply": "4. Dar clic en el botón de <B>Aplicar</B> para aplicar las configuraciones.",
	"upper": "Puede dar clic en el botón de arriba para ir a la carpeta <B>de arriba </B>. Dar clic en el botón de <B>Habilitar/Deshabilitar Seleccionado</B> para habilitar o deshabilitar las entradas seleccionadas. Dar clic en el botón de <B>Borrar Seleccionado</B> para borrar las entradas seleccionadas.",
	"s_1": "Puede que tenga acceso a las carpetas ingresando el siguiente URL en Windows Explorer u otro software de FTP:",
	"s_2": "ftp://(<span class=\"T T_ipaddr\">Dirección IP</span>)</span>",
	"s_3": "ejemplo, ftp://192.168.0.1",
	"s_4": "El Servidor FTP se reiniciará y todas sus conexiones FTP actuales finalizarán después que dé clic en el botón de Aplicar.",
	"note": "<B>Nota:</B>",
	"s_5": "1. El número máximo de carpetas compartidas es 10. Si desea compartir una carpeta nueva cuando el número haya alcanzado 10, puede borrar una carpeta existente compartida y después agregar una nueva.",
	"s_6": "2. Si desea cambiar las configuraciones de Uso Compartido de Almacenamiento, puede dar clic en el botón de Aplicar para hacer que los cambios tomen efecto."
};
var UsbMassHelp =
{
	"header": "Ayuda de Almacenamiento Masivo USB",
	"brief": "En esta página puede configurar una unidad de disco USB conectada al router y ver el volumen y compartir las propiedades como nombre para compartir, capacidad, estado y acción.",
	"volume": "<B>Volumen</B> El nombre del volumen de la unidad USB a la que los usuarios tienen acceso.",
	"file_syst": "<B>Sistema de Archivos</B> El sistema de la unidad USB.",
	"capacity": "<B>Capacidad</B> La capacidad de almacenamiento de la unidad USB.",
	"status": "<B>Estado</B> Indica el estado compartido o no compartido del volumen. En línea significa que el volumen puede ser compartido. Si el campo de Desactivar en Acción está habilitado, Deshabilitado se mostrará en el campo de Estado, lo cual significa que el volumen no puede ser compartido.",
	"action": "<B>Acción</B> Cuando del volumen es compartido, puede dar clic en Desactivar para dejar de compartir el volumen; cuando el volumen no es compartido, puede dar clic en Habilitar botón para compartir el volumen.",
	"note": "<B>Nota:</B> Antes de retirar el dispositivo de almacenamiento USB, debe dar clic en <B>Desconectar</B> para asegurarse que toda su información haya sido guardada completamente. Quitar el dispositivo directamente puede causar que falle dispositivo de almacenamiento USB.",
	"note_0": "<B>Nota</B>:",
	"s_0": "1. Dar clic en el botón de <B>Actualizar</B> para detectar su dispositivo USB. El Router activará automáticamente los primeros dos dispositivos de almacenamiento USB o hasta ocho volúmenes;",
	"deactivate": "2. Si desea usar otros volúmenes en su dispositivo de almacenamiento, por favor <B>Desactivar</B> algunos volúmenes no usados y <B>Activar</B> los otros volúmenes deseados;",
	"disconnect": "3. Dar clic en el botón de <B>Desconectar</B> antes de desconectar su dispositivo USB para evitar que se pierdan los datos o se dañe el dispositivo.",
	"supported": "<B> Almacenamiento Masivo USB Soportado:</B> disco duro, memoria flash usb o lector de tarjetas de memorias;",
	"supported_0": "<B>Tipo de Archivo Soportado:</B> FAT32 y NTFS;",
	"supp_volumes": "<B>Volúmenes Soportados: </B> Únicamente dos dispositivos de almacenamiento USB con hasta ocho volúmenes pueden ser activados simultáneamente, hasta cuatro dispositivos de almacenamiento USB con aproximadamente dieciocho volúmenes pueden ser reconocidos. "
};
var UsbSharingHelp =
{
	"header": "Ayuda de Uso Compartido de Almacenamiento USB",
	"brief": "En esta página puede configurar una unidad de disco USB conectada al router y ver el volumen y compartir las propiedades.",
	"server_stat": "<B>Estado del Servidor </B> Indica el estado actual de Uso Compartido de Almacenamiento.",
	"anonymous": "<B>Acceso anónimo a todos los volúmenes </B> Esta función está habilitada de manera predeterminada, de tal modo que los usuarios puedan tener acceso a todos los volúmenes activados de Almacenamiento de Uso Compartido sin cuentas. Si desea agregar una carpeta de uso compartido que no permite el inicio de sesión anónimo, deseleccione la casilla para deshabilitar esta función. Y la <B>Tabla de Carpetas</B> se mostrará como se muestra a continuación.",
	"shar_name": "<B>Compartir Nombre </B> El nombre mostrado de esta carpeta.",
	"directory": "<B>Directorio</B> La trayectoria completa real de la carpeta especificada.",
	"user_acce": "<B>Acceso del Usuario </B> Se muestra la autorización del usuario. * usuarios significa Súper Usuarios que tienen permiso de acceso total a todos los volúmenes activados y carpetas compartidas. Los usuarios gris significa los usuarios que no tienen derecho a usar esta función. Otros son usuarios comunes.",
	"status": "<B>Estado</B> El estado de la entrada está habilitado o deshabilitado.",
	"edit": "<B>Editar</B> Dar clic en <B>Editar</B> en la tabla, y después puede modificar la entrada.",
	"s_0": "Para agregar una carpeta nueva, siga las instrucciones de abajo.",
	"folder": "1. Dar clic en <B>Agregar Carpeta Nueva</B>",
	"browse": "2. Dar clic en el botón de <B>Examinar</B>, y después seleccionar <B>Seleccionar Volumen</B> de la lista desplegable.",
	"shar_name_0": "3. Ingresar el nombre a mostrar de la carpeta compartida en el campo de <B>Compartir Nombre </B> .",
	"apply": "4. Dar clic en el botón de <B>Aplicar</B> para aplicar las configuraciones.",
	"upper": "Puede dar clic en el botón de arriba para ir a la carpeta <B>de arriba </B>. Dar clic en el botón de <B>Habilitar/Deshabilitar Seleccionado</B> para habilitar o deshabilitar las entradas seleccionadas. Dar clic en el botón de <B>Borrar Seleccionado</B> para borrar las entradas seleccionadas.",
	"note": "<B>Nota:</B>",
	"s_1": "1. El número máximo de carpetas compartidas es 10. Si desea compartir una carpeta nueva cuando el número haya alcanzado 10, puede borrar una carpeta existente compartida y después agregar una nueva.",
	"s_2": "2. Si desea cambiar las configuraciones de Uso Compartido de Almacenamiento, puede dar clic en el botón de Aplicar para hacer que los cambios tomen efecto.",
	"s_3": "3. La función de Uso Compartido de Almacenamiento se basa en el protocolo de NetBIOS/SMB que está soportado por la mayoría de sistemas operativos de Windows y algunos otros sistemas operativos.",
	"s_4": "4. Anónimo: Todos los volúmenes activos serán compartidos y no se requiere autenticación.",
	"s_5": "5. Podrá acceder a las carpetas con los siguientes métodos:",
	"windows": "<B> Para el Sistema Operativo Windows:</B>Abrir la ventana de \"Ejecutar\" en el menú de Inicio e ingresar \\(Dirección IP) o \\(Dirección IP)(Nombre para Compartir) <br />ejemplo, \\192.168.0.1 o \\192.168.0.1photo;",
	"for": "<B>Para el Sistema Operativo Mac:</B>Abrir la ventana de \"Conectarse al Servidor\" en el Menú de Ir e ingresar smb://(Dirección IP) o smb://(Dirección IP)/(Nombre para Compartir)</span> <br />ejemplo, smb://192.168.0.1 o smb://192.168.0.1/photo.</span>"
};
var Usb3gHelpRpm=
{
	"header": "Configuraciones de 3G/4G",
	"backup": "<B>Enable 3G as a backup solution for Internet access</B> - Select the checkbox to enable 3G/4G as the backup solution for Internet access.",
	"modem": "<B>3G/4G USB Modem</B> - Displays whether or not a 3G/4G USB modem is plugged into the router.",
	"pinStatus": "<B> Estado del PIN </B> - Muestra el estado del PIN de la tarjeta SIM, incluyendo No se puede desbloquear la tarjeta SIM, Listo, Bloqueo de SIM, Bloqueo de PIN y Error desconocido.",
	"local": "<B> Ubicación </B>: muestra la ubicación de la tarjeta SIM.",
	"misp": "<B>Mobile ISP</B> - Displays the ISP (Internet Service Provider) of the 3G or 4G network. You can select your mobile ISP after you enable 3G/4G as the backup solution for Internet access.",
	"setaup": "<B> Establecer el número de marcación, APN, nombre de usuario y contraseña manualmente </B>: seleccione la casilla de verificación para configurar manualmente el número de marcación, APN, el nombre de usuario y la contraseña.",
	"number": "<B> Número de marcación / APN / Nombre de usuario / Contraseña </B> - Introduzca el número de marcación, APN, nombre de usuario y contraseña proporcionados por su ISP.",
	"auth": "<B> Tipo de autenticación </B>: Seleccione un tipo de autenticación en la lista desplegable. El método predeterminado es AUTO_AUTH. Algunos ISP pueden requerir un tipo específico de autenticación, por favor confirme con su ISP o mantenga la configuración predeterminada.",
	"mtu": "<B>MTU Size (in bytes)</B> - The typical MTU (Maximum Transmission Unit) size for 3G or 4G network is 1480 Bytes.",
	"echo": "<B> Intervalo de solicitud de Echo </B>: Ingrese un valor de intervalo de tiempo entre 0 y 120 (en segundos) para el que el router solicite que el Concentrador de acceso emita un Echo en cada intervalo. El valor predeterminado es 30. y 0 significa que no hay detección.",
	"fip": "<B> Utilice la siguiente dirección IP </B>: seleccione esta opción e introduzca la dirección IP proporcionada por su ISP. </ Li>",
	"fdns": "<B>Use The Following DNS Servers</B> - Select this checkbox and enter the DNS server address(es) in dotted decimal notation provided by your ISP. This 3G/4G connection will only use the specified DNS server(s).",
	"modemSet": "<B>Modem Settings</B> - Click to configure the advanced settings of the 3G/4G USB modem by uploading the downloaded .bin file(s)."
};
var Usb3gModemListHelpRpm=
{
	"header": "Configuraciones de 3G/4G",
	"brief": "In this page you can configure a USB 3G/4G modem settings.",
	"vendor": "<B>Vendor</B> - Displays the vendor of the connected USB modem.",
	"model": "<B>Model</B> - Displays the model of the connected USB modem.",
	"delete": "<B> Eliminar </B>: muestra opciones para eliminar el archivo .bin correspondiente."
};
var VirtualServerHelpRpm =
{
	"header": "Ayuda del Servidor Virtual ",
	"brief": "El servidor virtual puede ser usado para configurar servicios públicos en su LAN. Un servidor virtual se define como un puerto de servicio, y todas las solicitudes desde Internet para este puerto de servicio serán redirigidas a la computadora especificada por medio del IP del servidor. Cualquier PC que haya sido usada por un servidor virtual debe tener una dirección IP estática o reservada ya que su dirección IP puede cambiar cuando usa la función de DHCP.",
	"serv_port": "<B>Puerto de Servicio </B> - Los números de los Puertos de Servicio Externo. Puede ingresar un puerto de servicio o un rango de puertos de servicio (el formato es XXX - YYY, XXX es el puerto de Inicio, YYY es el puerto Final).",
	"ip_addr": "<B>Dirección IP</B> - La dirección IP de la PC que ejecuta la aplicación del servicio.",
	"inte_port": "<B>Puerto Interno</B> - El número de Puerto de Servicio Interno de la PC que ejecuta la aplicación del servicio. Puede dejarlo en blanco si el <B>Puerto Interno</B> es el mismo que el <B>Puerto de Servicio</B>, o ingresar un número de puerto específico cuando el <B>Puerto de Servicio</B> sea uno solo.",
	"protocol": "<b>Protocolo</b> - El protocolo usado para esta aplicación, ya sea <B>TCP, </B><B>UDP</B>, o <B>Todos </B> ( todos los protocolos soportados por el Router).",
	"status": "<B>Estado</B> - El estado de esta entrada, \"Habilitado” significa que la entrada del servidor virtual está habilitada.",
	"edit": "<b>Editar</b> - Para editar una entrada existente.",
	"virtual": "<B>Para configurar una entrada del servidor virtual </B>:",
	"add_new": "Dar clic en el botón de <B>Agregar Nuevo</B>.",
	"service": "Seleccionar el servicio que desea usar de la lista de <B>Puerto de Servicio Común</B>. Si el menú de <B>Puerto de Servicio Común</B> no lista el servicio que desea usar, ingrese el número del puerto de servicio o rango del puerto de servicio en la casilla de <B>Puerto de Servicio</B>.",
	"ip_addr_0": "Ingresar la dirección IP de la computadora que ejecuta la aplicación del servicio en el recuadro de <B>Dirección IP</B>.",
	"tcp": "Seleccionar el protocolo usado para esta aplicación de la lista desplegable, ya sea <B>TCP, </B><B>UDP</B>, o <B>Todos</B>.",
	"enabled": "Seleccionar la opción de <B>Habilitado</B> en la lista desplegable de <B>Estado</B>.",
	"save": "Dar clic en el botón de <B>Guardar</B>.",
	"note": "<B>Nota</B>: Es posible que tenga una computadora o servidor que tenga más de un tipo de servicio disponible. De ser así, seleccione otro servicio, y escriba la misma dirección IP para esa computadora o servidor.",
	"enable_sele": "Dar clic en el botón de <B>Habilitar Seleccionado</B> para habilitar las entradas seleccionadas.",
	"disable_sele": "Dar clic en el botón de <B>Deshabilitar Seleccionado</B> para deshabilitar las entradas seleccionadas.",
	"delete_sele": "Dar clic en el botón de <B>Borrar Seleccionado</B> para borrar las entradas seleccionadas."
};
var Wan6to4TunnelCfgHelpRpm =
{
	"header": "Ayuda de WAN de IPv6",
	"brief": "<B>WAN Tipo de Conexión:</B>",
	"s_0": "Selecciona el tipo de conexión de WAN correcto basado en la topología de la red de su ISP.",
	"dhcpv": "<B>DHCPv6</B> - Conexiones que usan la asignación de la dirección IPv6.",
	"stat_ipv": "<B>IPv6 Estática</B> - Conexiones que usan la asignación de la dirección IPv6 Estática.",
	"pppoev": "<B>PPPoEv6</B> - Conexiones que usan PPPoEv6 que requieren un nombre de usuario y la contraseña.",
	"tunn_6to": "<B>Túnel 6a4</B> - Conexiones que usan la asignación de la dirección 6a4.",
	"s_1": "Este tipo se usa en la situación que su conexión de WAN sea IPv4 mientras que la conexión de LAN es IPv6.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var WanDynamicIpCfgHelpRpm =
{
	"header": "Ayuda de WAN",
	"brief": "<B>WAN Tipo de Conexión:</B>",
	"dyna_ip": "Si su ISP está ejecutando un servidor DHCP, seleccione la opción de <B>IP Dinámico</B>.",
	"stat_ip": "Si su ISP proporciona una Dirección IP estática o fija, Máscara de Subred, Puerta de Enlace y configuraciones de DNS, seleccione la opción de <B>IP Estática</B>.",
	"pppoe": "Si su ISP proporciona una conexión PPPoE, seleccione la opción de <B>PPPoE</B>.",
	"bigp_cable": "Si su ISP proporciona la conexión de Cable BigPond (o Señal de Red Activa), por favor seleccione la opción de <B>Cable BigPond</B>.",
	"l2tp": "Si su ISP proporciona la conexión de L2TP, por favor seleccione la opción de <B>L2TP</B>.",
	"pptp": "Si su ISP proporciona la conexión de PPTP, por favor seleccione la opción de <B>PPTP</B>.",
	"detect": "Si no sabe cómo seleccionar el tipo de conexión adecuado, dar clic en el botón de <B>Detectar</B> para permitir que el Router busque automáticamente su conexión de Internet para servidores y protocolos. El tipo de conexión será reportado cuando un servicio de Internet activo sea detectado exitosamente por el Router. Este reporte es para su referencia únicamente. Para estar seguro del tipo de conexión que su ISP le proporciona, por favor consulte al ISP. Los diversos tipos de conexiones de Internet que el Router puede detectar son los siguientes:",
	"pppoe_0": "<B>PPPoE</B> - Conexiones que usan PPPoE que requieren un nombre de usuario y la contraseña.",
	"dyna_ip_0": "<B>IP Dinámico</B> - Conexiones que usan la asignación de la dirección de IP dinámico.",
	"stat_ip_0": "<B>IP Estática</B> - Conexiones que usan la asignación de la dirección IP estática.",
	"ip_addr": "<B>Dirección IP</B> - La dirección IP asignada por su ISP dinámicamente.",
	"subn_mask": "<B>Máscara de Subred</B> - La máscara de subred asignada por su ISP dinámicamente.",
	"default_gate": "<B>Puerta de Enlace Predeterminada </B> - La puerta de enlace predeterminada asignada por su ISP dinámicamente.",
	"renew": "Dar clic en el botón de <B>Renovar</B> para renovar los parámetros de IP de su ISP.",
	"release": "Dar clic en el botón de <B>Liberar</B> para liberar los parámetros de IP de su ISP.",
	"bytes": "<B>Tamaño de MTU (en bytes)</B> - El valor normal de MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) para la mayoría de las redes Ethernet es 1500 Bytes. Para algunos ISPs necesita modificar el MTU. Pero esto rara vez se requiere, y no debe realizarse a menos que esté seguro que es necesario para su conexión del ISP.",
	"manually": "Si su ISP le da una o dos direcciones IP de DNS, seleccione <B>Configurar el servidor DNS manualmente</B> e ingrese el <B>Servidor DNS</B> y el <B>Servidor DNS Secundario</B> en los campos correctos. De lo contrario, los servidores DNS serán asignados desde ISP dinámicamente.",
	"prim_dns": "<B>DNS Primario</B> - Ingresar la dirección IP de DNS en notación decimal con puntos proporcionada por su ISP.",
	"seco_dns": "<B>DNS Secundario</B> - Ingresar otra dirección IP de DNS en notación decimal con puntos proporcionada por su ISP.",
	"note": "<B>Nota:</B> Si obtiene un error de no se ha encontrado la Dirección cuando usted accede a un sitio Web, es probable que los servidores DNS están configurados incorrectamente. Debe ponerse en contacto con su ISP para obtener las direcciones del servidor DNS.",
	"host_name": "<B>Nombre del Host</B> - Esta opción especifica el Nombre del Host del Router.",
	"unicast": "<B> Obtener el IP con Unidifusión </B> - Algunos servidores DHCP de ISPs no soportan aplicaciones de transmisión. Si no puede obtener la dirección IP normalmente, puede seleccionar Unidifusión. (Generalmente es necesario no marcar esta opción).",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var WanDynamicIpV6CfgHelpRpm =
{
	"header": "Ayuda de WAN de IPv6",
	"brief": "<B>Tipo de Conexión:</B>",
	"s_0": "Selecciona el tipo de conexión de WAN correcto basado en la topología de la red de su ISP.",
	"dyna_ipv": "<B>IPv6 Dinámico</B> - Conexiones que usan la asignación de la dirección de IPv6 dinámico.",
	"stat_ipv": "<B>IPv6 Estática</B> - Conexiones que usan la asignación de la dirección IPv6 Estática.",
	"pppoev": "<B>PPPoEv6</B> - Conexiones que usan PPPoEv6 que requieren un nombre de usuario y la contraseña.",
	"tunn_6to": "<B>Túnel 6a4</B> - Conexiones que usan la asignación de la dirección 6a4.",
	"ipv6_addr": "<B>Dirección IPv6</B> - La dirección de IPv6 asignada por su ISP dinámicamente.",
	"advance": "Si su ISP le da una o dos direcciones IPv6 de DNS, dar clic en <b>Avanzado</b> y seleccionar <B>Configurar el servidor DNS de IPv6 manualmente</B> e ingresar el <B>DNS de IPv6 Primario</B> y el <B>DNS de IPv6 Secundario</B> en los campos correctos. De lo contrario, los servidores DNS serán asignados desde ISP dinámicamente.",
	"primary": "<B> DNS de IPv6 Primario</B> - Ingresar la dirección de IPv6 de DNS en notación hexadecimal con dos puntos proporcionada por su ISP.",
	"secondary": "<B>DNS de IPv6 Secundario</B> - Ingresar otra dirección IPv6 de DNS en notación hexadecimal con dos puntos proporcionada por su ISP.",
	"note": "<B>Nota:</B> Si obtiene un error de no se ha encontrado la Dirección cuando usted accede a un sitio Web, es probable que los servidores DNS están configurados incorrectamente. Debe ponerse en contacto con su ISP para obtener las direcciones del servidor DNS."
};
var WanStaticIpCfgHelpRpm =
{
	"header": "Ayuda de WAN",
	"brief": "<B>WAN Tipo de Conexión:</B>",
	"dyna_ip": "Si su ISP está ejecutando un servidor DHCP, seleccione la opción de <B>IP Dinámico</B>.",
	"stat_ip": "Si su ISP proporciona una Dirección IP estática o fija, Máscara de Subred, Puerta de Enlace y configuraciones de DNS, seleccione la opción de <B>IP Estática</B>.",
	"russia": "Si su ISP proporciona una conexión PPPoE, seleccione la opción de <B>PPPoE/Russian PPPoE</B>.",
	"bigp_cable": "Si su ISP proporciona la conexión de Cable BigPond (o Señal de Red Activa), por favor seleccione la opción de <B>Cable BigPond</B>.",
	"russia_0": "Si su ISP proporciona la conexión de L2TP, por favor seleccione la opción de <B>L2TP/Russian L2TP</B>.",
	"russia_1": "Si su ISP proporciona la conexión de PPTP, por favor seleccione la opción de <B>PPTP/Russian PPTP</B>.",
	"detect": "Si no sabe cómo seleccionar el tipo de conexión adecuado, dar clic en el botón de <B>Detectar</B> para permitir que el Router busque automáticamente su conexión de Internet para servidores y protocolos. El tipo de conexión será reportado cuando un servicio de Internet activo sea detectado exitosamente por el Router. Este reporte es para su referencia únicamente. Para estar seguro del tipo de conexión que su ISP le proporciona, por favor consulte al ISP. Los diversos tipos de conexiones de Internet que el Router puede detectar son los siguientes:",
	"russia_2": "<B>PPPoE/Russian PPPoE</B> - Conexiones que usan PPPoE que requieren un nombre de usuario y la contraseña.",
	"dyna_ip_0": "<B>IP Dinámico</B> - Conexiones que usan la asignación de la dirección de IP dinámico.",
	"stat_ip_0": "<B>IP Estática</B> - Conexiones que usan la asignación de la dirección IP estática.",
	"ip_addr": "<B>Dirección IP</B> - Ingresar la dirección IP en notación decimal por puntos proporcionada por su ISP.",
	"subn_mask": "<B>Máscara de Subred</B> - Ingresar la máscara de subred en notación decimal con puntos proporcionada por su ISP.",
	"default_gate": "<B>Puerta de Enlace Predeterminada </B> - Ingresar la puerta de enlace predeterminada en notación decimal con puntos proporcionada por su ISP.",
	"mtu_size": "<B>Tamaño de MTU</B> - El valor normal de MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) para la mayoría de las redes Ethernet es 1500 Bytes. Para algunos ISPs, puede ser necesario modificar el MTU. Pero esto rara vez se requiere, y no debe realizarse a menos que esté seguro que es necesario para su conexión del ISP.",
	"prim_dns": "<B>DNS Primario</B> - Ingresar la dirección IP de DNS en notación decimal con puntos proporcionada por su ISP.",
	"seco_dns": "<B>DNS Secundario</B> - Ingresar otra dirección IP de DNS en notación decimal con puntos proporcionada por su ISP.",
	"save": "Dar clic en el botón de <B>Guardar</B> cuando termine de cambiar las configuraciones."
};
var WanStaticIpV6CfgHelpRpm =
{
	"header": "Ayuda de WAN de IPv6",
	"brief": "<B>Habilitar IPv6:</B>Habilita o deshabilita la característica de IPv6.",
	"connection": "<B>WAN Tipo de Conexión:</B>",
	"s_0": "Selecciona el tipo de conexión de WAN correcto basado en la topología de la red de su ISP.",
	"dhcpv": "<B>DHCPv6</B> - Conexiones que usan la asignación de la dirección IPv6.",
	"stat_ipv": "<B>IPv6 Estática</B> - Conexiones que usan la asignación de la dirección IPv6 Estática.",
	"pppoev": "<B>PPPoEv6</B> - Conexiones que usan PPPoEv6 que requieren un nombre de usuario y la contraseña.",
	"tunn_6to": "<B>Túnel 6a4</B> - Conexiones que usan la asignación de la dirección 6a4.",
	"ipv6_addr": "<B>Dirección IPv6</B> - Ingresar la dirección IPv6 en notación hexadecimal con dos puntos proporcionada por su ISP.",
	"prefix_leng": "<B>Longitud del Prefijo</B> - Ingresar la Longitud del Prefijo IPv6 en notación decimal con puntos proporcionada por su ISP.",
	"ipv6_gate": "<B>Puerta de Enlace de IPv6</B> - Ingresar la puerta de enlace predeterminada en notación hexadecimal con dos puntos proporcionada por su ISP.",
	"server": "<B>Servidor DNS de IPv6</B> - Ingresar la dirección de IPv6 de DNS en notación hexadecimal con dos puntos proporcionada por su ISP.",
	"secondary": "<B>Servidor DNS de IPv6 Secundario</B> - Ingresar otra dirección IPv6 de DNS en notación hexadecimal con dos puntos proporcionada por su ISP.",
	"mtu_size": "<B>Tamaño de MTU</B> - El valor normal de MTU (Maximum Transmission Unit - Unidad de Transmisión Máxima) para la mayoría de las redes Ethernet es 1500 Bytes. Para algunos ISPs, puede ser necesario modificar el MTU. Pero esto rara vez se requiere, y no debe realizarse a menos que esté seguro que es necesario para su conexión del ISP.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
};
var WlanAdvHelpRpm =
{
	"header": "Ayuda de Inalámbrico Avanzado",
	"brief": "<B> Energía de transmisión </B> - Aquí puede especificar la potencia de transmisión del router. Usted puede seleccionar 100%, 75% o 50% que usted quisiera.",
	"brief_AP": "<B> Energía de transmisión </B> - Aquí puede especificar la potencia de transmisión del AP. Usted puede seleccionar 100%, 75% o 50% que usted quisiera.",	
	"beacon_inte": "<B>Intervalo de Baliza </B> - Las balizas son los paquetes enviados por el Router para sincronizar una red inalámbrica. El valor del Intervalo de Baliza determina el intervalo de tiempo de las balizas. Puede especificar un valor entre 40-1000 milisegundos. El valor predeterminado es 100.&#10;",
	"beacon_inte_AP": "<B> Intervalo Beacon </B> - El beacon son los paquetes enviados por el AP para sincronizar una red inalámbrica. El valor de intervalo Beacon determina el intervalo de tiempo de los beacons. Puede especificar un valor entre 40-1000 milisegundos. El valor predeterminado es 100.",	
	"rts_thre": "<B> Umbral de RTS </B> - Aquí puede especificar el Umbral RTS (Request to Send - Petición para Enviar). En caso de que el paquete sea mayor al tamaño del Umbral RTS especificado, este Router enviará tramas RTS a una estación receptora particular y negociará el envío de una trama de datos. El valor predeterminado es 2346.",
	"rts_thre_AP": "<B> Umbral RTS </B> - Aquí puede especificar el umbral RTS (Solicitud de envio). Si el paquete es mayor que el tamaño de umbral RTS especificado, el AP enviará tramas RTS a una estación receptora particular y negociará el envío de un marco de datos. El valor predeterminado es 2346.",	
	"frag_threshold": "<B>Umbral de Fragmentación </B> - Este valor es el tamaño máximo al determinar si los paquetes serán fragmentados. Configurar el Umbral de Fragmentación demasiado bajo podría resultar en un mal desempeño de la red debido al exceso de paquetes. 2346 es la configuración predeterminada y es la que se recomienda.",
	"dtim_inte": "<B>Intervalo de DTIM</B> - Este valor determina el intervalo de DTIM (Delivery Traffic Indication Message - Mensaje de Indicación de Trafico de Entrega). Puede especificar el valor entre 1-15 Intervalos de Baliza. El valor predeterminado es 1, lo que indica que el Intervalo de DTIM es el mismo que el Intervalo de Baliza. ",
	"enable": "<B>Habilitar GI Corto</B> - Se recomienda esta función para incrementar la capacidad de los datos reduciendo el tiempo del intervalo de seguridad. ",
	"isolation": "<B>Habilitar el Aislamiento de Cliente</B> - Aislar todas las estaciones inalámbricas conectadas de tal modo que las estaciones inalámbricas no puedan tener acceso entre sí a través de WLAN. Esta función se deshabilitará si está habilitado WDS/Puente.",
	"enab_wmm": "<B> Habilitar WMM </B> - La función WMM puede garantizar que los paquetes con mensajes de alta prioridad sean transmitidos preferentemente. Se recomienda activarlo.",
	"note": "<B>Nota: </B>En caso de que no se encuentre muy familiarizado con los elementos de configuración en esta página, se recomienda ampliamente mantener los valores predeterminados provistos, de otro modo puede resultar en un desempeño menor de red inalámbrica."
};
var WlanAdvHelpRpm_AP =
{
	"header": WlanAdvHelpRpm.header,
	"brief": WlanAdvHelpRpm.brief,
	"brief_AP": WlanAdvHelpRpm.brief_AP,
	"beacon_inte": "<B> Intervalo Beacon </B> - El beacon son los paquetes enviados por el AP para sincronizar una red inalámbrica. El valor de intervalo Beacon determina el intervalo de tiempo de los beacons. Puede especificar un valor entre 40-1000 milisegundos. El valor predeterminado es 100.",	
	"beacon_inte_AP": "<B> Intervalo Beacon </B> - El beacon son los paquetes enviados por el AP para sincronizar una red inalámbrica. El valor de intervalo Beacon determina el intervalo de tiempo de los beacons. Puede especificar un valor entre 40-1000 milisegundos. El valor predeterminado es 100.",	
	"rts_thre": "<B> Umbral RTS </B> - Aquí puede especificar el umbral RTS (Solicitud de envio). Si el paquete es mayor que el tamaño de umbral RTS especificado, el AP enviará tramas RTS a una estación receptora particular y negociará el envío de un marco de datos. El valor predeterminado es 2346.",	
	"rts_thre_AP": "<B> Umbral RTS </B> - Aquí puede especificar el umbral RTS (Solicitud de envio). Si el paquete es mayor que el tamaño de umbral RTS especificado, el AP enviará tramas RTS a una estación receptora particular y negociará el envío de un marco de datos. El valor predeterminado es 2346.",	
	"frag_threshold": WlanAdvHelpRpm.frag_threshold,
	"dtim_inte": WlanAdvHelpRpm.dtim_inte,
	"enable": WlanAdvHelpRpm.enable,
	"isolation": WlanAdvHelpRpm.isolation,
	"enab_wmm": WlanAdvHelpRpm.enab_wmm,
	"note": WlanAdvHelpRpm.note
};
var WlanMacFilterHelpRpm =
{
	"header": "Ayuda de Filtrado MAC Inalámbrico",
	"brief": "La característica de Filtrado de la Dirección MAC Inalámbrica le permite controlar el acceso a la AP de las estaciones inalámbricas, que depende de las direcciones MAC de las estaciones.",
	"mac_addr": "<B>Dirección MAC</B> - La dirección MAC de la estación inalámbrica a la que desea acceder.",
	"description": "<B>Descripción</B> - Una descripción simple de la estación inalámbrica.",
	"status": "<B>Estado</B> - El estado de esta entrada , ya sea <B>Habilitado</B> o <B>Deshabilitado</B> .",
	"host": "<B>Host</B> - El nombre del inalámbrico.",
	"disable": "Para deshabilitar la característica de Filtros de la Dirección MAC Inalámbrica, mantenga la configuración predeterminada de <b>Deshabilitar</b>.",
	"enable": "Para configurar una entrada, dar clic en <B>Habilitar</B>, y siga estas instrucciones: <BR>Primero debe decidir su las estaciones inalámbricas especificadas pueden o no acceder a la AP. Si desea que las estaciones inalámbricas especificadas puedan acceder al AP, por favor seleccione el botón se elección de <B>Permitir que las estaciones especificadas por cualquier entrada habilitada en la lista tengan acceso </B>, de lo contrario, seleccione el botón se elección de <B>Negar que las estaciones especificadas por cualquier entrada habilitada en la lista tengan acceso </B>.",
	"add_new": "Para agregar una entrada del filtrado de la Dirección MAC inalámbrica, dé clic en el botón de <B>Agregar Nuevo</B>, y siga estas instrucciones:",
	"mac_addr_0": "Ingresar la Dirección MAC adecuada en el campo de <B>Dirección MAC </B>. El formato de la Dirección MAC es XX:XX:XX:XX:XX:XX (X es cualquier dígito hexadecimal). Por ejemplo, 00:0A:EB:B0:00:0B.",
	"description_0": "Ingresar una descripción simple de la estación inalámbrica en el campo de <B>Descripción</B>. Por ejemplo, Estación Inalámbrica A.",
	"status_0": "<B>Estado</B> - Seleccionar <B>Habilitado</B> o <B>Deshabilitado</B> para esta entrada en la lista desplegable de <B>Estado</B>.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar esta entrada.",
	"s_0": "Para agregar otras entradas, repita los pasos 1~4.",
	"existing": "<B>Para editar una entrada existente</B>:",
	"edit": "Dar clic en el botón de <B>Editar</B> en la columna de <B>Editar</B> en la Tabla de Filtrado de Direcciones MAC.",
	"filtering": "Ingresar el valor deseado en la página de <B>Agregar o Modificar la entrada del Filtrado de la Dirección MAC Inalámbrica</B>, y dar clic en el botón de <B>Guardar</B>.",
	"enable_sele": "Puede dar clic en el botón de <B>Habilitar Seleccionado</B> para hacer que se habiliten las Entradas seleccionadas, dar clic en el botón de <B>Deshabilitar Seleccionado</B> para hacer que se deshabiliten las Entradas seleccionadas, dar clic en el botón de <B>Borrar Seleccionado</B> para borrar las entradas seleccionadas.",
	"note": "<B>Nota</B>: Si habilita la función y selecciona <B>Permitir las estaciones especificadas de cualquier entrada habilitada en la lista para tener acceso</B> para las <B>Reglas de Filtrado</B>,, y no hay ninguna entrada habilitada en la lista, por lo tanto, ninguna estación inalámbrica puede acceder al AP. "
};
var WlanNetworkHelpRpm =
{
	"header": "Ayuda de Configuraciones Inalámbricas",
	"brief": "<B>Nota</B>: La distancia o rango de operación de su conexión inalámbrica varía significativamente en la ubicación física del Router. Para obtener mejores resultados, coloque su Router:",
	"s_0": "Cerca del centro del área en la cual operan sus estaciones inalámbricas.",
	"s_1": "En una ubicación elevada como un estante alto.",
	"s_2": "Lejos de fuentes potenciales de interferencia, como PCs, microondas y teléfonos inalámbricos.",
	"s_3": "Con la Antena en la posición vertical.",
	"s_4": "Lejos de superficies de metal grandes",
	"note": "<B>Nota</B>: No seguir estos lineamientos de manera adecuada puede resultar en una degradación significativa en el desempeño o la falta de capacidad de conectarse de manera inalámbrica al Router.",
	"wireless": "<B>Nombre de la Red Inalámbrica</B> - Introducir un valor de hasta 32 caracteres. El mismo Nombre (SSID) debe asignarse a todos los dispositivos inalámbricos en su red.",
	"region": "<b>Región</b> - Seleccione su región de la lista desplegable. Este campo especifica la región en la que la función inalámbrica del Router puede utilizarse. Puede ser ilegal utilizar la función inalámbrica del Router en una región diferente a las que se especifican en este campo. En caso de que su país o región no se encuentren en la lista, favor de contactar a su agencia local del gobierno para obtener ayuda.",
	"mode": "<B>Modo</B> - Puede seleccionar el modo “Mixto” adecuado.",
	"chan_width": "<B>Ancho del Canal</B> - El ancho de banda del canal inalámbrico.",
	"channel": "<B>Canal</B> - Este campo determina la frecuencia operativa que se utilizará. No es necesario cambiar el canal inalámbrico a menos que se presenten problemas de interferencia con otros puntos de acceso cercanos. En caso de seleccionar automático, entonces el AP seleccionará el mejor canal de manera automática.",
	"broadcast": "<B>Habilitar la Transmisión de SSID</B> - Si selecciona la casilla de selección de <B>Habilitar la Transmisión de SSID</B>, el router inalámbrico transmitirá su nombre (SSID) en el aire.",
	"enab_wds": "<B>Habilitar WDS</B> - Puede seleccionar esta opción para habilitar la Conexión en Puente de WDS, con esta función, el Router puede conectar en puente dos o más Wlans. NOTA: si se selecciona esta casilla de selección, es mejor que se asegure que las siguientes configuraciones sean correctas.",
	"bridged": "<B>SSID (a ser conectado en puente)</B> - El SSID del AP a la que su Router va a conectarse como un cliente. También puede usar la función de explorar para seleccionar el SSID a unir.",
	"address": "<B>Dirección MAC (a ser conectada en puente)</B> - La Dirección MAC del AP de su Router que va a conectar como cliente. También puede usar la función de explorar para seleccionar la Dirección MAC a unir.",
	"scan": "<B>Explorar</B> - Al dar clic en este botón, puede buscar el AP que se ejecuta en el canal actual.",
	"key_type": "<B>Tipo de Clave</B> - Esta opción debe ser seleccionada de acuerdo a la configuración de seguridad del AP. Se recomienda que el tipo de seguridad sea el mismo que el tipo de seguridad de su AP.",
	"wep_inde": "<B>Índice de WEP </B> - Esta opción debe ser seleccionada si el tipo clave es WEP(ASCII) o WEP(HEX). Indica el índice de la clave WEP.",
	"auth_type": "<B>Tipo de Autenticación</B> - Esta opción debe ser seleccionada si el tipo de clave es WEP(ASCII) o WEP(HEX). Indica el tipo de autorización del AP Raíz.",
	"encryption": "<B>Encriptación</B> - Por favor seleccione el tipo de encriptación basándose en el AP de origen.",
	"password": "<B>Contraseña</B> - Si el AP al que su Router va a conectarse necesita contraseña, necesita colocar la contraseña en este espacio en blanco."
};
var WlanNetworkHelpRpm_AP =
{
	"header": WlanNetworkHelpRpm.header,
	"brief": "<B> Nota </B>: La distancia o rango de funcionamiento de su conexión inalámbrica varía significativamente según la ubicación física del AP. Para mejores resultados, coloque su AP:",	
	"s_0": WlanNetworkHelpRpm.s_0,
	"s_1": WlanNetworkHelpRpm.s_1,
	"s_2": WlanNetworkHelpRpm.s_2,
	"s_3": WlanNetworkHelpRpm.s_3,
	"s_4": WlanNetworkHelpRpm.s_4,
	"note": "<B> Nota </B>: el incumplimiento de estas directrices puede resultar en una degradación significativa del rendimiento o incapacidad para conectarse de forma inalámbrica al AP.",	
	"wireless": WlanNetworkHelpRpm.wireless,
	"region": WlanNetworkHelpRpm.region,
	"mode": WlanNetworkHelpRpm.mode,
	"chan_width": WlanNetworkHelpRpm.chan_width,
	"channel": WlanNetworkHelpRpm.channel,
	"broadcast": "<B> Habilitar difusión SSID </B>: Si selecciona la casilla <B> Habilitar difusión SSID </B>, el AP emitirá su nombre (SSID) en el aire."	
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
	"wireless": "<B> SSID </B> - Introduzca un valor de hasta 32 caracteres. El mismo nombre (SSID) debe asignarse a todos los dispositivos inalámbricos de su red. En el modo de operación Multi-SSID, ingrese SSID para cada BSS en el campo \"SSID1\" ~ \"SSID4\".",
	"region": WlanNetworkHelpRpm.region,
	"mode": WlanNetworkHelpRpm.mode,
	"chan_width": WlanNetworkHelpRpm.chan_width,
	"channel": WlanNetworkHelpRpm.channel,
	"broadcast": WlanNetworkHelpRpm_AP.broadcast,
	"vlan":"<B> VLAN ID </B> - El ID de una VLAN. Sólo en la misma VLAN, una PC inalámbrica y una PC con cable pueden comunicarse entre sí. El valor puede estar entre 1 y 4094. Si la función VLAN está habilitada, cuando AP envía paquetes, los paquetes fuera del puerto LAN se agregarán con una etiqueta VLAN IEEE 802.1Q, cuyo VLAN ID es sólo el ID de la VLAN donde El remitente pertenece.",
	"en_vlan":"<B> Activar VLAN </B> - Marque esta casilla para activar la función VLAN. El AP admite hasta 4 VLAN. Todas las PCs inalámbricas de las VLAN pueden acceder a este AP. El AP también puede funcionar con un switch IEEE 802.1Q Tag VLAN."
};
var WlanSecurityHelpRpm =
{
	"header": "Ayuda de Seguridad Inalámbrica",
	"brief": "Puede seleccionar una de las siguientes opciones de seguridad:",
	"wireless": "<B> Desactivar seguridad inalámbrica </b>: la función de seguridad inalámbrica se puede habilitar o deshabilitar. Si está desactivada, las estaciones inalámbricas podrán conectar el dispositivo sin encriptación. Se recomienda firmemente que elija una de las siguientes opciones para habilitar la seguridad.",
	"personal": "<B>WPA/WPA2 - Personal</B> - Seleccionar WPA basándose en la contraseña pre-compartida.",
	"enterprise": "<B>WPA/WPA2 - Empresarial </B> - Seleccionar WPA basándose en el Servidor Radius.",
	"wep": "<B>WEP</B> - Seleccionar Seguridad WEP 802.11.",
	"s_0": "Cada opción de seguridad tiene sus propias configuraciones como se describe&nbsp; a continuación,",
	"personal_0": "<B>WPA/WPA2 - Personal</B> <b>Versión</b> -&nbsp; Puede seleccionar una de las siguientes versiones,",
	"auto": "<B> Automático</B> - Seleccionar <B>WPA-PSK</B> o <B>WPA2-PSK</B> se basa automáticamente en la capacidad y solicitud de la estación inalámbrica.",
	"wpa_psk": "<B>WPA-PSK</B> - Clave pre-compartida de WPA.",
	"wpa2_psk": "<B>WPA2-PSK</B> - Clave pre-compartida de WPA2.",
	"encryption": "<B>Encriptación</B> - Puede seleccionar <B>Automático</B>, o <B>TKIP</B> o <B>AES</B>.",
	"psk_pass": "<B> Contraseña inalámbrica </B> - Puede introducir caracteres <B> ASCII </B> o <B> Hexadecimal </B>. Para <B> Hexadecimal </B>, la longitud debe estar entre 8 y 64 caracteres; Para <B> ASCII </B>, la longitud debe estar entre 8 y 63 caracteres.",
	"update": "<B>Periodo de Actualización de la Clave de Grupo </B> - Especificar el intervalo de actualización de la clave de grupo en segundos. El valor puede ser 0 o 30 como mínimo. Ingresar 0 para deshabilitar la actualización.",
	"enterprise_0": "<B>WPA/WPA2 - Empresarial </B><b>Versión</b> -&nbsp; Puede seleccionar una de las siguientes versiones,",
	"auto_0": "<B> Automático</B> - Seleccionar <B>WPA</B> o <B>WPA2</B> se basa automáticamente en la capacidad y solicitud de la estación inalámbrica.",
	"wpa": "<B>WPA</B> - Acceso Protegido de Wi-Fi.",
	"wpa_0": "<B>WPA2</B> - Versión 2 de WPA.",
	"encryption_0": "<B>Encriptación</B> - Puede seleccionar <B>Automático</B>, o <B>TKIP</B> o <B>AES</B>.",
	"radius": "<B>IP del Servidor Radius </B> - Ingresar la dirección IP del Servidor Radius.",
	"radius_0": "<B>Puerto del Servidor Radius </B> - Ingresar el puerto que usa el servicio radius. (1-65535, 0 representa el puerto predeterminado 1812)",
	"password": "<B>Contraseña del Servidor Radius</B> - Ingresar la contraseña del Servidor Radius.",
	"update_0": "<B>Periodo de Actualización de la Clave de Grupo </B> - Especificar el intervalo de actualización de la clave de grupo en segundos. El valor puede ser 0 o 30 como mínimo. Ingresar 0 para deshabilitar la actualización.",
	"wep_0": "<B>WEP</B>",
	"auth_type": "<B>Tipo de Autenticación</B> - Puede seleccionar uno de los siguientes tipos,",
	"auto_1": "<B>Automático</B> - Seleccionar <b>Clave Compartida</b> o <b>Sistema Abierto</b> el tipo de autenticación se basa automáticamente en la capacidad y solicitud de la estación inalámbrica.",
	"shar_key": "<B>Clave Compartida</B> - Seleccionar autenticación 802.11 de Clave Compartida.",
	"open_syst": "<B>Sistema Abierto</B> - Seleccionar la autenticación del Sistema Abierto 802.11",
	"format": "<B>Formato de la Clave WEP </B> - Puede seleccionar el formato <B>ASCII</B> o <B>Hexadecimal</B>. El Formato ASCII se representa por cualquier combinación de caracteres del teclado en la longitud especificada. El formato Hexadecimal se representa por cualquier combinación de dígitos hexadecimales (0-9, a-f, A-F) en la longitud especificada.",
	"settings": "<B>Configuraciones de la Clave WEP </B> - Seleccionar cuál de las cuatro claves se utilizará e introducir la información de la clave WEP correspondiente para su red en su botón de elección clave seleccionado. Estos valores deben ser idénticos en todas las estaciones inalámbricas de su red.",
	"key_type": "<B>Tipo de Clave</B> - Puede seleccionar la longitud para la encriptación de la clave (<B>64-bit</B>, o <B>128-bit</B>.) para encriptación. &quot;Deshabilitado&quot; significa que esta entrada de clave WEP es invalida..",
	"bit": "Para la encriptación de <B>64-bit</B> Puede ingresar 10 dígitos hexadecimales (cualquier combinación de 0-9, a-f, A-F, y la clave nula no está permitida) o 5 caracteres ASCII. ",
	"bit_0": "Para la encriptación de <B>128-bit</B> - Puede ingresar 26 dígitos hexadecimales (cualquier combinación de 0-9, a-f, A-F, y la clave nula no está permitida) o 13 caracteres ASCII.",
	"note": "<B>Nota</B>: En caso de que no configure la clave, la función de seguridad inalámbrica aún permanecerá deshabilitada aún en caso de que seleccione Clave Compartida como Tipo de Autenticación.",
	"save": "Asegúrese de dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones en esta página.",
	"version": "<b>Versión</b> -&nbsp; Puede seleccionar una de las siguientes versiones,"
};
var WlanStationHelpRpm =
{
	"header": "Ayuda de Estadísticas Inalámbricas",
	"brief": "Esta página muestra <B>Dirección MAC</B>, <b>Estado Actual</b>, <b>Paquetes Recibidos</b>, <b>Paquetes Enviados </b> y <b>SSID</b> para cada estación inalámbrica conectada.",
	"mac_addr": "<B>Dirección MAC</b> - la dirección MAC de la estación inalámbrica conectada",
	"curr_status": "<b>Estado Actual</b> - el estado de ejecución de la estación inalámbrica conectada. ",
	"rece_packets": "<b>Paquetes Recibidos </b> - paquetes recibidos por la estación",
	"sent_pack": "<b>Paquetes Enviados</b> - paquetes enviados por la estación.",
	"ssid": "<b>SSID</b> - SSID con el que asocia la estación.",
	"refresh": "No puede cambiar ninguno de los valores en esta página. Para actualizar esta página y mostrar las estaciones inalámbricas conectadas actualmente, dar clic en el botón de <b>Actualizar</b>.",
	"note": "<B>Nota:</B> Esta página se actualizará automáticamente cada 5 segundos."
};
var WlanThroughputHelpRpm =
{
	"header": "Ayuda en Monitor de rendimiento",
	"brief": "Esta página ayuda a ver la información de rendimiento inalámbrico.",
	"rate": "<B> Tasa </b> - La unidad de rendimiento.",
	"run_time": "<B> Tiempo de ejecución </b> - Cuánto tiempo está funcionando esta función.",
	"transmit": "<B> Transmitir </b> - Información de velocidad de transmisión inalámbrica.",
	"receive": "<B> Recibir </b> - Información de tasa de recepción inalámbrica.",
	"start": "Haga clic en el botón <b> Inicio </b> para iniciar el monitor de rendimiento inalámbrico.",
	"stop": "Haga clic en el botón <b> Detener </b> para detener el monitor de rendimiento inalámbrico."
};
var WlanWpsChkModeHelpRpm =
{
	"header": "Ayuda de Agregar un Dispositivo Nuevo",
	"brief": "Esta sección lo guiará para agregar un nuevo dispositivo inalámbrico a una red existente manualmente. Si el dispositivo nuevo soporta la Configuración de Wi-Fi Protegida y está equipado con un botón de configuración, puede agregarlo a la red presionando el botón de configuración en el dispositivo, después seleccione <B>\"Presionar el botón del dispositivo nuevo en dos minutos \"</B> y dar clic en el botón de Conectar en la página de internet de configuración dentro de dos minutos. Adicionalmente, también puede agregar el dispositivo nuevo ingresando el PIN de este dispositivo y después dando clic en el botón de Conectar.",
	"device": "<B>Ingresar el nuevo PIN del dispositivo</B> - Seleccionar esta configuración si el dispositivo nuevo soporta la forma de conexión al ingresar su PIN.",
	"pin": "<B>PIN</B> - Ingresar el valor del PIN del dispositivo nuevo aquí.",
	"minutes": "<B> Presionar el botón del dispositivo nuevo en dos minutos</B> - Seleccionar esta configuración si el dispositivo nuevo soporta la forma de conexión presionando el botón.",
	"back": "<B> Regresar</B> - Regresa a la página de configuración <SCRIPT language=\"JavaScript\">document.write(str_wps_name_short);</SCRIPT>.",
	"connect": "<B>Conectar</B> - Conecta al dispositivo nuevo y lo agrega a la red existente."
};
var WlanWpsHelpRpm =
{
	"header": "Ayuda de Configuración de Wi-Fi Protegida",
	"brief": "La función WPS le ayudará a agregar un nuevo dispositivo a la red rápidamente. Si el nuevo dispositivo admite Wi-Fi Configuración protegida y está equipado con un botón de configuración, puede agregarlo a la red presionando el botón de configuración del dispositivo y luego presione el botón en el enrutador dentro de dos minutos. El LED de estado del enrutador permanecerá encendido durante cinco minutos si el dispositivo se ha agregado correctamente a la red. Si el nuevo dispositivo admite Wi-Fi Configuración protegida y el modo de conexión mediante PIN, puede agregarlo a la red introduciendo el PIN del enrutador.",
	"wps_stat": "<B>WPS Status</B> - Habilitar o deshabilitar la función de WPS aquí.",
	"curr_pin": "<B>PIN Actual</B> - El valor actual del PIN del Router se muestra aquí. El PIN predeterminado del Router puede encontrarse en la etiqueta o en la Guía del Usuario.",
	"rest_pin": "<B> Restaurar PIN </B> - Restaura el PIN de este dispositivo al predeterminado.",
	"generate": "<B>Generar un PIN Nuevo</B> - Dar clic en este botón, y después puede obtener un nuevo valor aleatorio para el PIN del Router. Puede garantizar la seguridad de la red generando un PIN nuevo.",
	"add_devi": "<B>Agregar Dispositivo</B> - Puede agregar el dispositivo nuevo a la red existente de manera manual dando clic en este botón.",
	"note": "<B>Nota: </B> La función de WPS no puede ser configurada si la Función Inalámbrica del Router está deshabilitada. Por favor asegúrese que la Función Inalámbrica esté habilitada antes de configurar el WPS."
};
var WlanWpsHelpRpm_AP =
{
	"header": WlanWpsHelpRpm.header,
	"brief": "La función WPS le ayudará a agregar un nuevo dispositivo a la red rápidamente. Si el nuevo dispositivo admite Wi-Fi Configuración protegida y está equipado con un botón de configuración, puede agregarlo a la red presionando el botón de configuración del dispositivo y luego presione el botón en el AP dentro de dos minutos. El LED de estado del AP permanecerá encendido durante cinco minutos si el dispositivo se ha agregado correctamente a la red. Si el nuevo dispositivo admite Wi-Fi Configuración protegida y el modo de conexión mediante PIN, puede agregarlo a la red introduciendo el PIN del AP.",
	"wps_stat": WlanWpsHelpRpm.wps_stat,
	"curr_pin": "<B> PIN actual </B>: el valor actual del PIN del AP aparece aquí. El PIN predeterminado del AP se puede encontrar en la etiqueta o Guía del usuario.",
	"rest_pin": "<B> Restaurar PIN </B> - Restaura el PIN del AP a su valor predeterminado.",
	"generate": "<B> Generar nuevo PIN </B>: haga clic en este botón y, a continuación, puede obtener un nuevo valor aleatorio para el PIN del AP. Puede garantizar la seguridad de la red generando un nuevo PIN.",
	"add_devi": WlanWpsHelpRpm.add_devi,
	"note": "<B> Nota: </B> La función WPS no se puede configurar si la función inalámbrica del AP está desactivada. Asegúrese de que la función inalámbrica esté habilitada antes de configurar el WPS."
};
var WlanNetworkHelpRpm_RE =
{
	"header": WlanNetworkHelpRpm.header,
	"brief": "En el modo repetidor, el dispositivo retransmitirá datos a un AP raíz asociado. La función AP está activada mientras tanto. El repetidor inalámbrico transmite la señal entre sus estaciones y el AP raíz para un rango inalámbrico mayor.",
	"region": WlanNetworkHelpRpm.region,
	"connect24g": "<B> Conectar a 2.4GHz </B> - Activar o desactivar para conectar el extensor a una red existente de 2.4GHz.",
	"lock_to_ap": "<B>Bloquear AP</B> - Si se selecciona, la conexión del dispositivo estará restringida solo a la red con esta dirección MAC específica.",
	"scanner": "<B> Escáner inalámbrico </B>: haga clic en este botón para explorar y mostrar todas las redes Wi-Fi disponibles dentro del rango al que desea conectarse el extensor. Una vez que se selecciona una red, el SSID y la configuración de seguridad de esa red se llenarán automáticamente.",
	"host_ssid24g": "<B> SSID (puente) </B> - Introduzca el SSID sensible a mayúsculas de la red anfitriona a la que se conectará el extensor o haga clic en <b> Escáner inalámbrico </b> y seleccione una red Wi-Fi .",
	"host_bssid24g": "<B> Dirección MAC (a puentear) </B> - Introduzca la dirección MAC de la red anfitriona a la que se conectará el extensor o haga clic en <b> Escáner inalámbrico </b> y seleccione una red Wi-Fi.",
	"host_sec": "<B> Seguridad </B>: seleccione una de las opciones de seguridad para que coincida con la red de host.",
	"sec_none": "<B> Sin seguridad </B>: esta opción deshabilita la seguridad inalámbrica.",
	"sec_wpa": "<B> WPA-PSK </B>: esta opción admite la implementación del estándar WPA (Acceso Protegido Wi-Fi). Es recomendado.",
	"sec_wpa2": "<B> WPA2-PSK </B>: esta opción admite la implementación del estándar WPA2 (acceso protegido Wi-Fi). También se recomienda.",
	"sec_wep": "<B> WEP </B> - Esta opción es la forma más básica de seguridad inalámbrica que puede utilizarse si sus dispositivos cliente sólo pueden acceder a redes inalámbricas mediante WEP (Wired Equivalent Privacy).",
	"ext24g": "<B> Extender 2.4GHz </B> - Activa o desactiva la función inalámbrica de 2.4 GHz del extensor de rango.",
	"ext_ssid24g": "<B> Extender SSID </B>: utilice el botón <b> Copiar host SSID </b> para copiar automáticamente el SSID del router principal / AP o ingrese un nuevo nombre (hasta 32 caracteres). Este campo distingue entre mayúsculas y minúsculas.",
	"ext_cpssid": "<B> Copiar host SSID </B>: haga clic para copiar el SSID del host. Cuando se selecciona, la red extendida compartirá el SSID de su red de host.",
	"ext_sec": "<B> Seguridad extendida </B>: Seleccione una de las opciones de seguridad para establecer la red inalámbrica extendida local.",
	"sec_none": "<B> Sin seguridad </B>: esta opción deshabilita la seguridad inalámbrica.",
	"sec_wpa": "<B> WPA-PSK / WPA2-PSK </B> - Esta opción admite la implementación múltiple del estándar WPA (Wi-Fi Protected Access), como WPA y WPA2.",
	"sec_wep": "<B> WEP </B> - Esta opción es la forma más básica de seguridad inalámbrica que puede utilizarse si sus dispositivos cliente sólo pueden acceder a redes inalámbricas mediante WEP (Wired Equivalent Privacy).",
	"settings":"<B> Índice </B> - Seleccione cuál de las cuatro claves será utilizada.",
	"psk_pass": WlanSecurityHelpRpm.psk_pass,
	"auth_type":WlanSecurityHelpRpm.auth_type,
	"open_syst":WlanSecurityHelpRpm.open_syst,
	"shar_key":WlanSecurityHelpRpm.shar_key,
	"format":WlanSecurityHelpRpm.format,
	"wep_password":"<B> Contraseña </B>: Ingrese la información de clave WEP correspondiente a su red."

};
var WlanConnectHelpRpm =
{
	"header": "Conectarse a la Ayuda de la Red de Host",
	"brief": "En el modo repetidor, el dispositivo retransmitirá datos a un AP raíz asociado. La función AP está activada mientras tanto. El repetidor inalámbrico transmite la señal entre sus estaciones y el AP raíz para un rango inalámbrico mayor.",
	"connect24g": "<B> Conectar a 2.4GHz </B> - Activar o desactivar para conectar el extensor a una red existente de 2.4GHz.",
	"scanner": "<B> Escáner inalámbrico </B>: haga clic en este botón para explorar y mostrar todas las redes Wi-Fi disponibles dentro del rango al que desea conectarse el extensor. Una vez que se selecciona una red, el SSID y la configuración de seguridad de esa red se llenarán automáticamente.",
	"host_ssid24g": "<B> SSID (puente) </B> - Introduzca el SSID sensible a mayúsculas de la red anfitriona a la que se conectará el extensor o haga clic en <b> Escáner inalámbrico </b> y seleccione una red Wi-Fi .",
	"host_bssid24g": "<B> Dirección MAC (a puentear) </B> - Introduzca la dirección MAC de la red anfitriona a la que se conectará el extensor o haga clic en <b> Escáner inalámbrico </b> y seleccione una red Wi-Fi.",
	"host_sec": "<B> Seguridad </B>: seleccione una de las opciones de seguridad para que coincida con la red de host.",
	"sec_none": "<B> Sin seguridad </B>: esta opción deshabilita la seguridad inalámbrica.",
	"sec_wpa": "<B> WPA-PSK </B>: esta opción admite la implementación del estándar WPA (Acceso Protegido Wi-Fi). Es recomendado.",
	"sec_wpa2": "<B> WPA2-PSK </B>: esta opción admite la implementación del estándar WPA2 (acceso protegido Wi-Fi). También se recomienda.",
	"sec_wep": "<B> WEP </B> - Esta opción es la forma más básica de seguridad inalámbrica que puede utilizarse si sus dispositivos cliente sólo pueden acceder a redes inalámbricas mediante WEP (Wired Equivalent Privacy).",
	"settings":"<B> Índice </B> - Seleccione cuál de las cuatro claves será utilizada.",
	"psk_pass": WlanSecurityHelpRpm.psk_pass,
	/* modify the WlanSecurityHelpRpm.auth_type */
	"auth_type":WlanSecurityHelpRpm.auth_type,
	"open_syst":WlanSecurityHelpRpm.open_syst,
	"shar_key":WlanSecurityHelpRpm.shar_key,
	"format":WlanSecurityHelpRpm.format,
	"wep_password":"<B> Contraseña </B>: Ingrese la información de clave WEP correspondiente a su red."
};
var WlanExtenderHelpRpm =
{
	"header": "Ayuda en Configuración de Red Extendida",
	"brief": "En el modo repetidor, el dispositivo retransmitirá datos a un AP raíz asociado. La función AP está activada mientras tanto. El repetidor inalámbrico transmite la señal entre sus estaciones y el AP raíz para un rango inalámbrico mayor.",
	"ext24g": "<B> Extender 2.4GHz </B> - Activa o desactiva la función inalámbrica de 2.4 GHz del extensor de rango.",
	"ext_ssid24g": "<B> Extender SSID </B>: utilice el botón <b> Copiar host SSID </b> para copiar automáticamente el SSID del router principal / AP o ingrese un nuevo nombre (hasta 32 caracteres). Este campo distingue entre mayúsculas y minúsculas.",
	"ext_cpssid": "<B> Copiar host SSID </B>: haga clic para copiar el SSID del host. Cuando se selecciona, la red extendida compartirá el SSID de su red de host.",
	"ext_sec": "<B> Seguridad extendida </B>: Seleccione una de las opciones de seguridad para establecer la red inalámbrica extendida local.",
	"sec_none": "<B> Sin seguridad </B>: esta opción deshabilita la seguridad inalámbrica.",
	"sec_wpa": "<B> WPA-PSK / WPA2-PSK </B> - Esta opción admite la implementación múltiple del estándar WPA (Wi-Fi Protected Access), como WPA y WPA2.",
	"sec_wep": "<B> WEP </B> - Esta opción es la forma más básica de seguridad inalámbrica que puede utilizarse si sus dispositivos cliente sólo pueden acceder a redes inalámbricas mediante WEP (Wired Equivalent Privacy)."
};	
var QsChangeLoginPwdHelpRpm =
{
	"header": "Ayuda de Contraseña",
	"brief": "Se recomienda encarecidamente que cambie el nombre de usuario y la contraseña predeterminados de fábrica del dispositivo. A todos los usuarios que intenten acceder a la utilidad basada en la Web del dispositivo se le pedirá el nombre de usuario y la contraseña del dispositivo.",
	"note": "<B>Nota</B>: El nombre de usuario y la contraseña nuevos no deben exceder 32 caracteres de longitud y no debe incluir ningún espacio. Ingrese la Contraseña nueva dos veces para confirmarla."
};
var QsLanApHelpRpm =
{
	"header": "Ayuda en Configuración de Red",
	"brief": "Puede configurar los parámetros IP de la LAN en esta página.",
	"type": "<B> Tipo </B> - Elegir IP inteligente para obtener la dirección IP del servidor DHCP remoto o elegir IP estática para configurar la dirección IP manualmente.",	
	"ipaddr": "<B> Dirección IP </B> - Introduzca la dirección IP de su sistema en notación decimal (valor predeterminado de fábrica: <SCRIPT language = \"JavaScript\"> document.write ('192.168.0.1') </ SCRIPT>) .",
	"mask": "<B> Máscara de subred </B> - Un código de dirección que determina el tamaño de la red. Normalmente 255.255.255.0 se utiliza como máscara de subred.",
	"dhcps": "<B> Servidor DHCP </B>: Activa o Desactiva el servidor. Si selecciona Tipo de IP inteligente, la selección se desactivará. Si deshabilita el servidor, debe tener otro servidor DHCP dentro de su red o bien debe configurar la dirección IP del equipo manualmente.",
	"note": "<B> Nota: </B> Si cambia la dirección IP, debe utilizar la nueva dirección IP para iniciar sesión en el sistema."
};
var QsModeHelpRpm =
{
	"header": "Ayuda en Modo de Funcionamiento",
	"mode_router": "<B> Router inalámbrico (Predeterminado) </B>: En este modo, el dispositivo permite a varios usuarios compartir la conexión a Internet a través de ADSL / Cable Modem. Los dispositivos LAN comparten la misma IP del ISP a través del puerto inalámbrico. Durante la conexión a Internet, el puerto Ethernet LAN / WAN funciona como un puerto WAN en el modo Router inalámbrico.",
	"mode_ap": "<B> Punto de acceso </B>: En este modo, este dispositivo puede conectarse a una red cableada y transformar el acceso por cable en un dispositivo inalámbrico que varios dispositivos pueden compartir juntos, especialmente para un hogar, una oficina ó cuando en un hotel hay una conexion por cable disponible.",
	"mode_re": "<B> Repetidor / Puentee </B>: En este modo, el dispositivo puede copiar y reforzar la señal inalámbrica existente para extender la cobertura de la señal, especialmente para un espacio grande para eliminar las esquinas ciegas de señal.",
	"mode_client": "<B> Cliente </B>: En este modo, este dispositivo puede conectarse a otro dispositivo a través de un puerto Ethernet y actuar como un adaptador para conceder acceso a dispositivos inalámbricos a una red inalámbrica, especialmente para Smart TV, Media Player o Consola de juegos sólo con un puerto Ethernet.",	
	"mode_mssid": "<B> Multi-SSID </B>: En este modo, el dispositivo puede crear hasta 4 redes inalámbricas etiquetadas con diferentes SSIDs y asignar cada SSID con diferentes seguridad o VLAN, especialmente para la situación en la que las distintas políticas y funciones de acceso necesario.",
    "mode_hotspot": "<B>WISP</B>: En este modo, el dispositivo permite a varios usuarios compartir la conexión a Internet desde WISP. Los dispositivos de puerto LAN comparten la misma IP desde WISP a través del puerto inalámbrico. Mientras se conecta a WISP, el puerto inalámbrico funciona como un puerto WAN en el modo WISP Client Router. El puerto Ethernet actúa como un puerto LAN."
};
var QsMultissidHelpRpm =
{
	"header": "Ayuda del Inalámbrico",
	"brief": "<B> Multi-SSID </B> - AP puede admitir hasta 4 SSID.",
	"en_vlan": "<B> Habilitarr VLAN </B> - Marque esta casilla para activar la función VLAN. El AP admite hasta 4 VLAN. Todas las PCs inalámbricas de las VLAN pueden acceder a este AP. El AP también puede funcionar con un switch IEEE 802.1Q Tag VLAN.",	
	"ssid": "<B> SSID </B> - Introduzca un valor de hasta 32 caracteres. El mismo nombre (SSID) debe asignarse a todos los dispositivos inalámbricos de su red. En el modo de operación Multi-SSID, ingrese SSID para cada BSS en el campo \"SSID1\" ~ \"SSID4\".",	
	"vlan": "<B> VLAN ID </B> - El ID de una VLAN. Sólo en la misma VLAN, una PC inalámbrica y una PC con cable pueden comunicarse entre sí. El valor puede estar entre 1 y 4094. Si la función VLAN está habilitada, cuando AP envía paquetes, los paquetes fuera del puerto LAN se agregarán con una etiqueta VLAN IEEE 802.1Q, cuyo VLAN ID es sólo el ID de la VLAN donde El remitente pertenece.",
	"mode": "<B> Modo </B> - Puede elegir el modo \"Mixto\" como apropiado.",
	"chan_width": "<B>Ancho del Canal</B> - El ancho de banda del canal inalámbrico.",	
	"chan": "<B> Canal </B> - Este campo determina qué frecuencia de operación se utilizará. No es necesario cambiar el canal inalámbrico a menos que note problemas de interferencia con otro punto de acceso cercano.",
	"security": "<B> Puede seleccionar una de las siguientes opciones de seguridad:",
	"no_sec": "<B> Sin seguridad </b> - La función de seguridad inalámbrica puede habilitarse o inhabilitarse. Si selecciona \"Ninguno\", las estaciones inalámbricas podrán conectar este dispositivo sin encriptación. Se recomienda firmemente que elija una de las siguientes opciones para habilitar la seguridad.",	
	"wpa2-psk": "<B>WPA2-PSK</B>",	
	"password": "<B> Contraseña </B> - Puede introducir caracteres <B> ASCII </B>. La longitud debe ser entre 8 y 63 caracteres."
};
var QsReviewHelpRpm =
{
	"header": "Ayuda de Finalizar",
	"finish": "Haga clic en el botón <strong> Finalizar </ strong> para finalizar la <B> Configuración rápida </B>.",
	"back": "Haga clic en el botón <strong> Atrás </ strong> para volver a la página anterior."		
};
var QsWlScanClientHelpRpm =
{
	"header": "Ayuda de Examinar el Sitio de Wlan",
	"note": "<B> Nota </B>: La información de los puntos de acceso a los que podría conectarse se muestra en esta página. Establezca como sigue:",
	"n_0": "Primero, encuentre la línea donde está colocada la red a la que desea conectarse.",	
	"n_1": "A continuación, compruebe  \"conectar\" al final de esa línea.",	
	"n_2": "Ahora, el SSID de la red de destino se rellena automáticamente en la página de configuración de Wlan.",	
	"refresh": "<B> Nota </B>: Haga clic en el botón <B> Actualizar </B> para actualizar la lista AP.",
	"back": "Haga clic en el botón <B> Atrás </B> para volver a la página de selección del modo de operación."
};
var WzdAccessCtrlHostAddHelpRpm =
{
	"header": "Ayuda de Crear una Entrada del Host",
	"brief": "Puede crear una entrada para la lista de hosts en esta página.",
	"host_desc": "<B> Descripción del Host </B> - En este campo, se crea una descripción <B>única</B> para el host.",
	"mode": "<B>Modo</B> - Aquí hay dos opciones, Dirección IP y Dirección MAC. Puede seleccionar cualquiera de ellas de la lista desplegable.",
	"ip_addr": "Si se selecciona <B>Dirección IP</B>, puede ver el siguiente elemento:",
	"address": "<B>Dirección IP de la LAN</B> - Ingresar la dirección IP o el rango de direcciones del host en formato decimal con puntos, por ejemplo 192.168.0.23.",
	"mac_addr": "Si se selecciona <B>Dirección MAC</B>, puede ver el siguiente elemento:",
	"mac_addr_0": "<B>Dirección MAC</B> - Ingresar la Dirección MAC del host en el formato XX:XX:XX:XX:XX:XX, por ejemplo 00:11:22:33:44:AA.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdAccessCtrlRuleAddHelpRpm =
{
	"header": "Ayuda de Crear una Entrada de Control de Acceso de Internet",
	"brief": "Puede crear una regla nueva en esta página.",
	"rule": "<B>Regla</B> - En este campo, crear un nombre para la regla. Tome en cuenta que este nombre debe ser <b>único</b>.",
	"host": "<B>Host</B> - En este campo, seleccionar un host de la lista desplegable para la regla.",
	"target": "<B>Destino</B> - En este campo, seleccionar un destino de la lista desplegable para la regla. El valor predeterminado es Cualquier Destino.",
	"schedule": "<B>Horario</B> - En este campo, seleccionar un horario de la lista desplegable pata la regla. El valor predeterminado es en Cualquier Momento.",
	"status": "<B>Estado</B> - En este campo, hay dos opciones, Habilitar o Deshabilitar. Seleccionar Habilitar para que la regla tome efecto. Seleccionar Deshabilitar para que la regla no tome efecto.",
	"finish": "Dar clic en el botón de <B>Finalizar</B> para aplicar la nueva Política de Control de Acceso, en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdAccessCtrlSchedAddHelpRpm =
{
	"header": "Ayuda de Crear una Entrada de Horario Avanzado",
	"brief": "Puede crear una entrada para la lista de hosts en esta página.",
	"schedule_desc": "<B>Descripción del Horario </B> - En este campo, crear una descripción para el horario. Tome en cuenta que esta descripción debe ser <b>única</b>, por ejemplo Horario_1.",
	"day": "<B>Día </B> - Escoja Seleccionar Días y seleccione cierto día (días), o seleccione Todos los Días.",
	"time": "<B>Tiempo </B> - Seleccionar \"24 horas\", o especificar la Hora de Inicio y la Hora de Detención por sí mismo.",
	"star_time": "<B>Hora de Inicio </B> - Ingresar la hora de inicio en el formato de HHMM (HHMM son 4 números). Por ejemplo 0800 es 8:00.",
	"stop_time": "<B>Hora de Detención </B> - Ingresar la hora de detención en el formato de HHMM (HHMM son 4 números). Por ejemplo 2000 es 20:00.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdAccessCtrlTargetAddHelpRpm =
{
	"header": "Ayuda de Crear una Entrada Destino de Acceso",
	"brief": "Puede crear una entrada para la lista destino en esta página.",
	"target_desc": "<B>Descripción Destino</B> - En este campo, crear una descripción para el destino. Tome en cuenta que esta descripción debe ser <b>única</b>.",
	"mode": "<B>Modo</B> - Aquí hay dos opciones, Dirección IP y Nombre de Dominio. Puede seleccionar cualquiera de ellas de la lista desplegable.",
	"ip_addr": "Si se selecciona <B>Dirección IP</B>, verá los siguientes elementos:",
	"ip_addr_0": "<B>Dirección IP</B> - Ingresar la dirección IP (o rango de direcciones) del destino (destinos) en formato decimal con puntos, por ejemplo 192.168.0.23.",
	"targ_port": "<B>Puerto Destino</B> - Especificar el puerto o rango de puertos para el destino. Para algunos puertos de servicio comunes, puede hacer uso de elemento de abajo de Puerto de Servicio Común.",
	"protocol": "<b>Protocolo</b> - Aquí hay cuatro opciones, Todos, TCP, UDP, e ICMP. Seleccione una de ellas de la lista desplegable para el destino.",
	"service": "<B>Puerto de Servicio Común</B> - Aquí se listan algunos puertos de servicio común. Seleccione uno de la lista desplegable y el número de puerto correspondiente se llenará en el campo de Puerto Destino automáticamente. Por ejemplo, si selecciona \"FTP\", \"21\" se llenará en el Puerto Destino automáticamente.",
	"doma_name": "Si se selecciona <B>Nombre de Dominio</B>, verá los siguientes elementos:",
	"doma_name_0": "<B>Nombre de Dominio</B> - Aquí puede ingresar 4 nombres de dominio, ya sea el nombre completo o las palabras clave (por ejemplo google). Cualquier nombre de dominio con las palabras clave en el mismo (www.google.com, www.google.cn) será bloqueado o permitido. ",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdConfirmHelpRpm =
{
	"header": "Confirmar Ayuda",
	"brief": "Por favor confirme todos los parámetros.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar todos los parámetros, o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdFinishHelpRpm =
{
	"header": "Ayuda de Finalizar",
	"brief": "Dar clic en el botón de <b>Finalizar</b> para finalizar la <B>Configuración Rápida </B>."
};
var WzdL2TPHelpRpm =
{
	"header": "Ayuda de L2TP",
	"brief": "<B>Nombre de Usuario y Contraseña </B> - Ingresar el Nombre de Usuario y la Contraseña proporcionados por su ISP. Estos campos son sensibles a mayúsculas y minúsculas.",
	"stat_ip": "Seleccionar <B>IP Estática</B> si la dirección IP, máscara de subred, puerta de enlace y la dirección del servidor DNS han sido proporcionados por su ISP. De lo contrario, por favor seleccione <B>IP Dinámico</B> .",
	"s_0": "Ingresar la dirección IP del servidor o el nombre de dominio proporcionado por su ISP.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdPPPoEHelpRpm =
{
	"header": "Ayuda de PPPoE",
	"brief": "<B>Nombre de Usuario y Contraseña </B> - Ingresar el Nombre de Usuario y la Contraseña proporcionados por su ISP. Estos campos son sensibles a mayúsculas y minúsculas.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdPPTPHelpRpm =
{
	"header": "Ayuda de PPTP",
	"brief": "<B>Nombre de Usuario y Contraseña </B> - Ingresar el Nombre de Usuario y la Contraseña proporcionados por su ISP. Estos campos son sensibles a mayúsculas y minúsculas.",
	"stat_ip": "Seleccionar <B>IP Estática</B> si la dirección IP, máscara de subred, puerta de enlace y la dirección del servidor DNS han sido proporcionados por su ISP. De lo contrario, por favor seleccione <B>IP Dinámico</B> .",
	"s_0": "Ingresar la dirección IP del servidor o el nombre de dominio proporcionado por su ISP.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdStartHelpRpm =
{
	"header": "Ayuda de Configuración Rápida",
	"brief": "Con esta guía, puede configurar los parámetros básicos para obtener una conexión a Internet. Aunque no esté familiarizado con este producto, aún puede finalizar las configuraciones fácilmente. Si usted es un experto, también puede escoger configurar lo que desee en el menú en lugar de usar esta opción.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar."
};
var WzdStaticIpHelpRpm =
{
	"header": "Ayuda de IP Estática",
	"brief": "Los parámetros de la IP deben haber sido proporcionados por su ISP.",
	"ip_addr": "<B>Dirección IP</B> - Esta es la dirección IP de la WAN como se ve por usuarios externos en Internet (incluyendo su ISP). Ingresar la dirección IP en el campo.",
	"subn_mask": "<B>Máscara de Subred</B> - La Máscara de Subred se usa para la Dirección IP de WAN, generalmente es 255.255.255.0.",
	"default_gate": "<B>Puerta de Enlace Predeterminada </B> - Ingresar la puerta de enlace predeterminada en el espacio en blanco.",
	"prim_dns": "<B>DNS Primario</B> - Ingresar la dirección IP de DNS en el espacio en blanco.",
	"seco_dns": "<B>DNS Secundario</B> - Si su ISP proporciona otra dirección IP de DNS, ingresarla en este campo.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdWanMACHelpRpm =
{
	"header": "Ayuda de Clon de MAC ",
	"brief": "La mayoría de los ISPs (Internet Service Provider – Proveedor de Servicios de Internet) por Cable registran la Dirección MAC única desde la conexión por cable en su <span id = \"t_main_computer\" style=\"color:#C11C66\">COMPUTADORA PRINCIPAL – la última computadora usada para ser conectada con el Módem de Cable y que tenía conexión a Internet </span>.",
	"s_0": "Si agrega un router a la red, su ISP podría no reconocer la Dirección MAC del router y no permitiría que se conecte.",
	"s_1": "Sin embargo, el router de TP-Link puede \"clonar\" o duplicar la Dirección MAC registrada de la COMPUTADORA PRINCIPAL. Después su ISP puede liberar la conexión de Internet al router y todas las computadoras.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdWanTypeHelpRpm =
{
	"header": "Ayuda del Tipo de Conexión de WAN ",
	"brief": "La <b>Configuración Rápida</b> soporta cinco tipos populares de conexión. Para asegurarse que el tipo de conexión que su ISP proporciona, por favor consulte al ISP.",
	"auto_dete": "<b>Detección Automática</b> - Si no conoce el tipo de conexión que su ISP le proporciona, use esta opción para permitir que la Configuración Rápida busque su conexión de Internet para servidores y protocolos y determine su configuración de ISP. Asegúrese que el cable esté conectado de manera segura en el puerto de WAN antes de la detección. La página de configuración adecuada se mostrará cuando se detecte exitosamente un servicio de Internet activo por el Router.",
	"dyna_ip": "<b>IP Dinámico </b> - Cuando el Router se conecta a un servidor DHCP, o el ISP le suministra con la conexión DHCP, por favor seleccione este tipo. El Router obtendrá la dirección IP automáticamente desde el servidor DHCP o el ISP si selecciona el tipo IP Dinámico.",
	"stat_ip": "<b>IP Estática</b> - Su ISP proporciona sus parámetros de IP especificados.",
	"russia": "<b>PPPoE/Russian PPPoE</b> - En el caso de haber aplicado el ADSL para realizar el servicio de conexión por acceso telefónico, deberá elegir este tipo. Bajo esta condición, deberá llenar los campos con el Nombre de Usuario como de Contraseña que el ISP le proporcionó.",
	"russia_0": "<b>L2TP/Russian L2TP</b> - En esta tipo, debe llenar los campos con el nombre de usuario, la contraseña y la dirección IP/Nombre del Dominio del Servidor VPN.",
	"russia_1": "<b>PPTP/Russian PPTP</b> - En esta tipo, deberá llenar los campos de nombre de usuario, contraseña y la dirección IP / Nombre de Dominio del Servidor VPN.",
	"next": "Dar clic en el botón de <B>Siguiente</B> para continuar o en el botón de <B> Regresar</B> para regresar a la página anterior."
};
var WzdWlanHelpRpm =
{
	"header": "Ayuda del Inalámbrico",
	"brief": "<b>Nombre de la Red Inalámbrica</b> - Introducir una serie de hasta 32 caracteres. El mismo nombre (SSID) deberá asignarse a todos los dispositivos inalámbricos en su red. El SSID predeterminado está configurado para ser <B> TP-Link_xxxx</B> (xxxx indica los últimos cuatro caracteres de cada Dirección MAC de cada Router), lo cual puede garantizar la seguridad de su red inalámbrica. Pero se recomienda ampliamente que cambie el nombre de su red (SSID) a un valor diferente. Este valor distingue entre mayúsculas y minúsculas. Por ejemplo, <b>MYSSID</b> NO es lo mismo que <b>MySsid</b>.",
	"region": "<b>Región</b> - Seleccione su región de la lista desplegable. Este campo especifica la región en la que la función inalámbrica del Router puede utilizarse. Puede ser ilegal utilizar la función inalámbrica del Router en una región diferente a las que se especifican en este campo. En caso de que su país o región no se encuentren en la lista, favor de contactar a su agencia local del gobierno para obtener ayuda.",
	"power": WlanAdvHelpRpm.brief,
	"band": "<b>Banda</b> - Este campo determina la banda de frecuencia en la radio funcionará, hay dos bandas que puede seleccionar: 2.4G o 5G. Por favor seleccione la banda de frecuencia adecuada de acuerdo a la política del gobierno local y su requisito.",
	"mode": "<B>Modo</B> - Este campo determina el modo inalámbrico en el cual opera el Router.",
	"chan_width": "<b>Ancho del Canal</b> - El ancho de banda del canal inalámbrico.",
	"channel": "<B>Canal</B> - Este campo determina la frecuencia operativa que se utilizará. No es necesario cambiar el canal inalámbrico a menos que se presenten problemas de interferencia con otros puntos de acceso cercanos. En caso de seleccionar automático, entonces el AP seleccionará el mejor canal de manera automática.",
	"s_0": "Puede seleccionar una de las siguientes opciones de seguridad:",
	"disable_secu": "<b>Deshabilitar la Seguridad</b> - La función de seguridad inalámbrica puede ser habilitada o deshabilitada. En caso de que se deshabilite, las estaciones inalámbricas podrán conectarse al Router sin encriptar. Se recomienda ampliamente elegir una de las siguientes opciones para habilitar la seguridad. ",
	"s_1": "",
	"wpa2": "<B>WPA2-PSK</B> - Seleccionar WPA basándose en la contraseña pre-compartida.",
	"psk_pass": "<B> Contraseña inalámbrica </B> - Puede introducir caracteres <B> ASCII </B>. La longitud debe ser entre 8 y 63 caracteres. Tenga en cuenta que la clave distingue entre mayúsculas y minúsculas.",
	"s_2": ""
};
var WzdWlanHelpRpm_AP =
{
	"header": WzdWlanHelpRpm.header,
	"brief": "<B> Nombre de red inalámbrico </b>: ingrese una cadena de hasta 32 caracteres. El mismo nombre (SSID) debe asignarse a todos los dispositivos inalámbricos de su red. El SSID predeterminado es <B> TP-Link_xxxx </B> (xxxx indica los últimos cuatro caracteres únicos de la dirección MAC de cada AP), lo que puede garantizar la seguridad de su red inalámbrica. Pero se recomienda firmemente que cambie el nombre de su red (SSID) a un valor diferente. Este valor distingue entre mayúsculas y minúsculas. Por ejemplo, <b> MISSID </b> NO es el mismo que <b> MiSsid </b>.",
	"region": WzdWlanHelpRpm.region,
	"power": WlanAdvHelpRpm.brief,
	"band": WzdWlanHelpRpm.band,
	"mode": "<B> Modo </b> - Este campo determina el modo inalámbrico en el que funciona el AP.",
	"chan_width": WzdWlanHelpRpm.chan_width,
	"channel": WzdWlanHelpRpm.channel,
	"s_0": WzdWlanHelpRpm.s_0,
	"disable_secu": "<B> Desactivar la seguridad </b>: la función de seguridad inalámbrica se puede activar o desactivar. Si está desactivada, las estaciones inalámbricas podrán conectar el AP sin cifrado. Se recomienda firmemente que elija una de las siguientes opciones para habilitar la seguridad.",
	"s_1": WzdWlanHelpRpm.s_1,
	"wpa2": WzdWlanHelpRpm.wpa2,
	"psk_pass": WzdWlanHelpRpm.psk_pass
};
/*
var QsWlClientHelpRpm =
{
	"header": "Ayuda en Configuración de Red",
	"brief": "Puede configurar los parámetros IP de la LAN en esta página.",
	"type": "<B> Tipo </B> - Elegir IP inteligente para obtener la dirección IP del servidor DHCP remoto o elegir IP estática para configurar la dirección IP manualmente.",	
	"n_0": "Primero, encuentre la línea donde está colocada la red a la que desea conectarse.",	
	"n_1": "A continuación, compruebe  \"conectar\" al final de esa línea.",	
	"n_2": "Ahora, el SSID de la red de destino se rellena automáticamente en la página de configuración de Wlan.",
	"refresh": "<B> Nota </B>: Haga clic en el botón <B> Actualizar </B> para actualizar la lista AP.",
	"back": "Haga clic en el botón <B> Atrás </B> para volver a la página de selección del modo de operación."		
};
*/
var QsWlClientHelpRpm =
{
	"header": WzdWlanHelpRpm.header,
	"brief_re":"<B> Range Extender </B> - En el modo Range Extender, el repetidor inalámbrico transmite la señal entre sus estaciones y el punto de acceso de la raíz para un rango inalámbrico mayor. </ P>",
	"region": WlanNetworkHelpRpm.region,
	"power": WlanAdvHelpRpm.brief,
	"re_wirelessAP":"<B> Nombre inalámbrico del AP de Principal </B>: Ingrese el nombre de un AP remoto (también llamado SSID) al que desea acceder. Haga clic en el botón <B> Atrás </B> de nuevo a la página de lista de AP, puede elegir otro de los resultados de búsqueda para rellenar este campo.",
	"re_wirelessAP2":"<B> Dirección MAC del AP Principal </B> - Introduzca la dirección MAC del AP al que desea acceder. Cuando utilice la función de encuesta en la página anterior para cumplir con el <B> nombre inalámbrico del AP raíz </B>, este campo se rellenará automáticamente.",
	"re_wds":"<B> Modo WDS </B> - Este campo determina qué modo WDS se utilizará. No es necesario cambiar el modo WDS a menos que note problemas de comunicación de red con el AP raíz. Si selecciona Auto, el Router seleccionará el modo WDS apropiado automáticamente.",
	"re_wirelessname":"<B> Nombre inalámbrico del extensor de rango </B> - Este campo determina el SSID AP local. Puede configurar el mismo SSID con los puntos de acceso principal o personalizarlo según desee.",
	"brief_hotspot":"<B>WISP</B> - En este modo, el dispositivo permite a varios usuarios compartir conexión a Internet desde WISP.",
	"hotspot_ssid":"<B> SSID (del puente) </B> - Introduzca el nombre de un AP remoto (también llamado SSID) al que desea acceder. Haga clic en el botón <B> Atrás </B> de nuevo a la página de lista AP, puede elegir otro de los resultados de búsqueda para rellenar este campo.",
	"hostpot_mac":"<B> Dirección MAC (del puente): </B> - Introduzca la dirección MAC del AP a la que desea acceder. Cuando utilice la función de encuesta en la página anterior para cumplir con el <B> nombre inalámbrico del AP principal </B>, este campo se rellenará automáticamente.",
	"hotspot_localssid":"<B> SSID de red local: </B>: ingrese el nombre de la red Wi-Fi local.",
	"brief_client":"<B> Cliente </B> - Este dispositivo actuará como una estación inalámbrica para permitir que los hosts cableados accedan al AP.",
	"client_wirelessAP1":"<B> Nombre inalámbrico del AP Principal </B> - Introduzca una cadena de hasta 32 caracteres. Para obtener más información, puede leer el mismo glosario en la parte del punto de acceso.",
	"client_wirelessAP2":"<B> Dirección MAC del AP Principal </B> - Introduzca la dirección MAC del AP al que desea acceder. Cuando utilice la función de encuesta en la página anterior para cumplir con el <B> nombre inalámbrico del AP raíz </B>, este campo se rellenará automáticamente.",
	"security": WzdWlanHelpRpm.s_0,
	"no_sec": QsMultissidHelpRpm.no_sec,
	/*"wep_0":WlanSecurityHelpRpm.wep_0,*/
	"wep_0":"<B> Seguridad (WEP) </B>",
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
	"bit_1":"Para cifrado <B> 152-bit </B> - Puede introducir 32 dígitos hexadecimales (no se permite ninguna combinación de 0-9, a-f, A-F y clave nula) o 13 caracteres ASCII.",
	"wpa_0":"Mayor Seguridad (WPA / WPA2-PSK)",
	"version":WlanSecurityHelpRpm.version,
	"auto":WlanSecurityHelpRpm.auto,
	"wpa_psk":WlanSecurityHelpRpm.wpa_psk,
	"wpa2_psk":WlanSecurityHelpRpm.wpa2_psk,
	"encryption":WlanSecurityHelpRpm.encryption,
	"psk_pass":WlanSecurityHelpRpm.psk_pass,
	"update":WlanSecurityHelpRpm.update_0,
	"not_change":"<B> Sin Cambios </B> - Si elige esta opción, la configuración de seguridad inalámbrica no cambiará. </ P>"
};
var IPTVHelp = 
{
	"header": "Ayuda de Configuraciones de IPTV",
	"brief": "En esta página puede configurar las características relacionadas con IPTV.",
	"igmp_snoop": "<b>IGMP Snooping</b> - IGMP snooping está diseñado para evitar que los hosts en una red local reciban tráfico para un grupo de multidifusión al que no se han unido explícitamente. IGMP snooping es especialmente útil para aplicaciones multidifusión de IP con ancho de banda intenso como IPTV.",
	"igmp_proxy": "<b>IGMP Proxy</b> - Seleccionar para habilitar IGMP Proxy.",
	"igmp_version": "<b> Versión de IGMP </b> - Seleccionar la Versión Proxy de IGMP (Internet Group Management Protocol - Protocolo de Administración de Grupos de Internet), ya sea V2 o V3, de acuerdo a su ISP.",
	"iptv_enable": "<b>IPTV</b> - Seleccionar para habilitar la característica de IPTV.",
	"iptv_mode": "<B>Modo</B> - Seleccionar el modo adecuado de acuerdo a su ISP.",
	"lan": "<b>LAN 1/2/3/4</b> - Asigna su puerto de LAN ya sea como la función del proveedor de Internet o como la del proveedor de IPTV."
};
var Wan6DisabledCfgHelpRpm = 
{
   "header": "Ayuda de WAN de IPv6",
   "brief": "<B>WAN Tipo de Conexión:</B>",
   "s_0": "Selecciona el tipo de conexión de WAN correcto basado en la topología de la red de su ISP.",
   "dhcpv": "<B>DHCPv6</B> - Conexiones que usan la asignación de la dirección IPv6.",
   "stat_ipv": "<B>IPv6 Estática</B> - Conexiones que usan la asignación de la dirección IPv6 Estática.",
   "pppoev": "<B>PPPoEv6</B> - Conexiones que usan PPPoEv6 que requieren un nombre de usuario y la contraseña.",
   "tunn_6to": "<B>Túnel 6a4</B> - Conexiones que usan la asignación de la dirección 6a4.",
   "save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones.",
   "wan_disabled": "<B>Deshabilitado</B> - Deshabilita todas las conexiones de IPv6."
};
var PingWatchDogHelpRpm =
{
    "header": "Ayuda Ping Watch Dog",
    "brief": "El <B> Ping Watch Dog </B> está dedicado para el monitoreo continuo de la conexión particular al host remoto usando la herramienta Ping. Hace que este dispositivo haga ping continuamente a una dirección IP definida por el usuario (puede ser la pasarela de Internet, por ejemplo). Si no puede hacer ping bajo las restricciones definidas por el usuario, este dispositivo se reiniciará automáticamente.",
    "switch": "<B> Switch</B> - Activar / Desactivar Ping Watch Dog.",
    "ip": "<B> Dirección IP </B> - La dirección IP del host de destino donde la utilidad Ping Watch Dog está enviando paquetes ping.",
    "interval": "<B> Intervalo </B> - Intervalo de tiempo entre dos paquetes de ping que se envían continuamente.",
    "delay": "<B> Atraso </B> - El retardo de tiempo antes de que el primer paquete de ping se envíe cuando se reinicie este dispositivo.",
    "failcount": "<B> Número de Fallos </B> - Límite superior del paquete de ping en el que este dispositivo puede caer continuamente. Si este valor se invierte, este dispositivo se reiniciará automáticamente.",
	"save": "Asegúrese de hacer clic en el botón <B> Guardar </B> para hacer que sus ajustes estén en funcionamiento."		
};
var SnmpHelpRpm = 
{
    "header": "Ayuda en Ajustes SNMP",
    "brief": "Simple Network Management Protocol (SNMP) es un protocolo de monitorización y administración de redes.", 		
	"agent": "<B> Agente SNMP </B> - Seleccione <B> Habilitar </B> para abrir esta función si desea tener un control remoto a través del agente SNMPv1 / v2 con MIB-II. Seleccione <B> Desactivar </B> para cerrar esta función.",
	"contact": "<B> Contacto Sys</B> - La identificación textual de la persona de contacto para este nodo administrado.",
	"name": "<B> NombreSys </B> - Un nombre asignado administrativamente para este nodo administrado.",
	"desc": "<B> Descripción Sys </B> - La información de la versión de software para este nodo administrado.",
	"location": "<B>Localización Sys</B> -  La ubicación física de este nodo.",
	"note1": "<B> Nota: </B> Especificar uno de estos valores a través de la Utilidad basada en la Web del Dispositivo hace que el objeto correspondiente sea de sólo lectura. Si no existe tal ajusten de configuración, la solicitud de escritura tendrá éxito (suponiendo ajustes de control de acceso adecuados), pero el nuevo valor se olvidará la próxima vez que se reinicie el agente.",	
	"getcomm": "<B> Obtener comunidad </B>: Ingrese el nombre de la comunidad que permite el acceso de sólo lectura a la información SNMP de este dispositivo. El nombre de la comunidad puede considerarse una contraseña de grupo. El valor predeterminado es <B> público </B>.",
	"getsour": "<B> Obtener origen </B> - Obtener origen define la dirección IP o subred para los sistemas de administración que pueden leer información de este dispositivo \"Obtener\" comunidad.",
	"setcomm": "<B> Establecer comunidad </B>: ingrese el nombre de la comunidad que permite el acceso de lectura / escritura a la información SNMP de este dispositivo. El nombre de la comunidad puede considerarse una contraseña de grupo. El valor predeterminado es <B> privado </B>.",
	"setsour": "<B> Establecer origen </b> - Define el origen de la dirección IP o subred para los sistemas de gestión que pueden controlar y \"Establecer\" el dispositivo de la comunidad.",
	"note2": "<B> Nota: </B> Una fuente restringida puede ser una dirección IP específica (por ejemplo, 10.10.10.1) o una subred - representada como IP / BITS (por ejemplo, 10.10.10.0/24). Si se especifica una dirección IP de 0.0.0.0, el agente aceptará todas las solicitudes con el nombre de comunidad correspondiente.",
	"save": "Dar clic en el botón de <B>Guardar</B> para guardar sus configuraciones."
}; 
var ledControlHelp = {
    header: "Control de LED",
    brief: "El control de LED le permite encender o apagar los LED de su dispositivo de acuerdo a un horario específico.",
	night_mode: "<B> Modo nocturno </b>: Indica si el modo nocturno está activado (Habilitado) o desactivado (deshabilitado).",
    off_time: "<B> Tiempo de Apagado del LED </b> - Seleccione el horario para apagar los LEDs."
};
var languageHelp = {
    header: "Ayuda de idioma",
    brief: "Seleccione el idioma que prefiere en la lista desplegable.",
};
var ManageCtrl_h = 
{
   "header": "Ayuda en Control de Administración",
   "userstatus": "<B>Estado actual del usuario</B>",
   "routerinfo": "La información del router: Tipo de usuario, Nombre de usuario, Dirección IP del host y Dirección MAC del host",
   "manageAccount": "<b>Administración de cuentas</b>",
   "password_brief": "Se recomienda ampliamente que cambie el nombre de usuario y la contraseña predeterminados de fábrica del router. A todos los usuarios que intenten acceder a la utilidad basada en web del router se les solicitará el nombre de usuario y la contraseña.",
   "password_note": "<strong>Nota</strong>: El nuevo nombre de usuario y la contraseña no deben exceder los 32 caracteres de longitud y no deben incluir espacios. Ingrese la nueva contraseña dos veces para confirmarla.",
   "serviceConfig": "<B>Configuración del Servicio</B>",
   "locale_manage": "Administración Local ",
   "remote_manage": "Administración Remota",
   "l_brief": "Esta página le permite negar el acceso al Router de las computadoras de la LAN.",
   "r_brief": "Esta característica le permite manejar su Router desde una ubicación remota a través de Internet.",
   "management": "<B>Puerto</B> - El acceso al navegador de Internet normalmente usa el puerto de servicio 80(443) de HTTP(HTTPS) estándar. El número de puerto de internet predeterminado de administración remota es 80. Para mayor seguridad, puede cambiar el puerto de internet de administración remota a un puerto personalizado ingresando ese número en el recuadro proporcionada. Seleccione un número entre 1024 y 65535 pero no use el número de ningún puerto de servicio común. ",
   "management_0": "<B>Host Disponible (IP/MAC)</B>  - Esta es la dirección actual que usará cuando acceda a su router desde el Internet. ",
   "s_0": "Para acceder al router, debe ingresar la dirección IP WAN del router en la dirección de su navegador (en IE) o en la ubicación (en Netscape), seguido de dos puntos y el número de puerto personalizado que configuró en el cuadro Puerto de administración web. Por ejemplo, si la dirección WAN de su router es 202.96.12.8 y utiliza el número de puerto 8080, ingrese http://202.96.12.8:8080 en su navegador. Se le pedirá la contraseña del router. Después de ingresar la contraseña correctamente, podrá acceder a la utilidad basada en la web.",
   "note1": "<B>Nota:</B>",
   "s_1": "Asegúrese de cambiar la contraseña predeterminada del Router a una contraseña segura.",
   "virt_server": "Si el puerto de administración a través de Internet crea conflicto con uno usado para una entrada del <b>Servidor Virtual</b>, la entrada será <b>deshabilitada</b> automáticamente después que la configuración sea guardada.",
   "certnote": "<B>Certificado</B>",
   "cert_brief": "Un archivo que le proporciona información de autenticación. Descargue e instale el certificado de Gestión local / remota a través de HTTPS si lo necesita. Una vez que el certificado esté instalado, las advertencias no aparecerán cuando acceda al router a través de HTTPS.",
   "note": "<B>Nota:</B>",
   "Cert_note": "Para obtener la guía completa, consulte la Guía del usuario en la página de soporte del producto.",
   "save": "Haga clic en el botón <strong> Guardar </strong> cuando haya terminado."
};
var cwmp_h = 
{
	"header": "Configuraciones de CWMP",
	"brief": "CWMP (Protocolo de gestión de la red de área extendida del CPE, también conocido como TR-069) permite la configuración, configuración, conexión y diagnóstico automáticos del equipo por medio de un servidor de configuración automática (ACS).Puede configurar esta función de acuerdo con la descripción del ISP.",
	"cwmp": "<B>CWMP</B> - Habilitar o deshabilitar la función CWMP (CPE WAN Management Protocol).",
	"inform": "<B>Informe</B> - Active esta función para enviar periódicamente mensajes de notificación a ACS (servidor de configuración automática).",
	"inform_interval": "<B>Intervalo de Informe</B> - Ingrese el tiempo en segundos cuando se enviará el mensaje Informar al ACS.",
	"acs_url": "<B>ACS URL</B> - Ingrese la dirección web del ACS que le proporciona su ISP.",
	"acs_name_pwd": "<B>Nombre de usuario/contraseña ACS</B> - Introduzca el nombre de usuario y la contraseña para iniciar sesión en el servidor ACS.",
	"interface": "<B>Interfaz usada por el cliente TR-069</B> - seleccione la interfaz que utilizará el cliente TR-069.",
	"soap_msg": "<B>Muestra mensajes de SOAP en la consola serial</B> - cambiar para activar o desactivar esta función.",
	"conn_req_auth": "<B>Autenticación de la Solicitud de Conexión</B> - Seleccione esta casilla de verificación para habilitar la autenticación para la solicitud de conexión.",
	"conn_name_pwd": "<B>Nombre de usuario/contraseña</B> - introduzca el nombre de usuario y la contraseña del encaminador de acceso del servidor ACS.",
	"path_port_url": "<B>La ruta/Port/URL</B> - introduzca la ruta, el puerto y el URL conectados al router por el servidor ACS.",
	"rpc_method": "<B>Obtener Métodos de RPC</B> - haga clic en el método para obtener apoyo para CWMP."	
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

