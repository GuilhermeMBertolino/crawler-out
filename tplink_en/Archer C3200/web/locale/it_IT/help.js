(function($) {

    $.helpContent = {
        trafficCtrl: {
            TITLE: "Controllo banda",
            CONTENT: [{
                type: "paragraph",
                content: "Questa funzionalità consente di configurare la banda in upstream e dowstream della rete. La velocità di trasmissione totale non deve superare i 1.000.000 kbps. Per un controllo ottimale della banda, selezionare il tipo di linea corretto e consultare il provider ISP per conoscere la larghezza totale di banda in upstream e downstream consentita."
            }, {
                type: "name",
                title: "Abilita",
                content: "Selezionare la casella di controllo per abilitare la funzionalità Controllo banda."
            }, {
                type: "name",
                title: "Banda totale in upstream ",
                content: "Immettere la velocità totale di upload attraverso la porta WAN."
            }, {
                type: "name",
                title: "Banda totale in downstream",
                content: "Immettere la velocità totale di download attraverso la porta WAN."
            }, {
                type: "title",
                content: "Regole di controllo"
            }, {
                type: "name",
                title: "Descrizione",
                content: "Visualizza l'intervallo di porte o l'intervallo di IP controllati."
            }, {
                type: "name",
                title: "Priorità",
                content: "Visualizza il livello di priorità della regola. 1 corrisponde al livello massimo di priorità e 8 a quello minimo. La larghezza totale di banda in upload e download verrà allocata in modo da garantire la velocità minima di tutte le regole di controllo relative alla banda."
            }, {
                type: "name",
                title: "Upload (min/max) ",
                content: "Visualizza la larghezza minima e massima di banda in upload, espressa in kbps."
            }, {
                type: "name",
                title: "Download (min/max)",
                content: "Visualizza la larghezza minima e massima di banda in download, espressa in kbps."
            }, {
                type: "name",
                title: "Abilita",
                content: "Indica lo stato corrente di una regola. Fare clic sull'icona Lampadina per abilitare o disabilitare la regola."
            }, {
                type: "name",
                title: "Modifica",
                content: "Visualizza le opzioni relative alla modifica o all'eliminazione della regola corrispondente."
            }, {
                type: "note",
                title: "Aggiunta di una nuova regola",
                content: [
                    "Fare clic su Aggiungi. ",
                    "Immettere un intervallo di indirizzi IP da controllare.",
                    "Immettere un intervallo di numeri di porta da controllare.",
                    "Selezionare il tipo di protocollo della regola.",
                    "Selezionare il livello di priorità della regola. (1 corrisponde al livello massimo di priorità)",
                    "Immettere la larghezza minima e massima di banda in upload (in kbps) attraverso la porta WAN.",
                    "Immettere la larghezza minima e massima di banda in download (in kbps) attraverso la porta WAN.",
                    "Selezionare Abilita questa voce.",
                    "Fare clic su OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Eliminare più di una regola</strong><br>Nell'elenco Regole di controllo, selezionare la casella di controllo corrispondente alle regole da eliminare e, sopra la tabella, fare clic su Elimina."
            }]
        },
        accessControl: {
            TITLE: "Controllo accessi",
            CONTENT: [{
                type: "paragraph",
                content: "La funzionalità Controllo accessi viene usata per consentire o bloccare l'accesso alla rete da parte di specifici computer o altri dispositivi. I dispositivi bloccati possono ottenere un indirizzo IP dal router, ma non possono comunicare con altri dispositivi o connettersi a Internet. "
            }, {
                type: "paragraph",
                content: "<strong>Nota:</strong>per usare Controllo accessi, abilitare la funzionalità e seguire i passaggi della guida operativa. Se la funzionalità Controllo accessi è disabilitata (Spento) qualsiasi dispositivo potrà accedere alla rete, anche quelli presenti nella blacklist."
            }, {
                type: "name",
                title: "Controllo accessi",
                content: "Selezionare On per abilitare la funzionalità Controllo accessi."
            }, {
                type: "title",
                content: "Modalità di accesso"
            }, {
                type: "name",
                title: "Blacklist",
                content: "Selezionare questa opzione per bloccare l'accesso dai dispositivi elencati di seguito."
            }, {
                type: "name",
                title: "Whitelist",
                content: "Selezionare questa opzione per consentire l'accesso solo dai dispositivi elencati di seguito."
            }, {
                type: "title",
                content: "Dispositivi in Blacklist/Whitelist"
            }, {
                type: "note",
                title: "<strong>Aggiungere un dispositivo alla blacklist o alla whitelist</strong>",
                content: [
                    "Fare clic sull'icona Aggiungi.",
                    "Immettere il nome del dispositivo.",
                    "Immettere l'indirizzo MAC del dispositivo.",
                    "Fare clic su OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Modificare o eliminare un dispositivo presente nella blacklist o nella whitelist</strong><br>Nella tabella Blacklist/Whitelist, fare clic sull'icona Modifica o sull'icona Cestino corrispondente al dispositivo che si desidera modificare o eliminare."
            }, {
                type: "paragraph",
                content: "<strong>Eliminare più dispositivi presenti nella blacklist o nella whitelist</strong><br>Nella tabella Blacklist/Whitelist, selezionare tutti i dispositivi che si desidera eliminare e, sopra la tabella, fare clic su Elimina."
            }, {
                type: "title",
                content: "Dispositivi online"
            }, {
                type: "name",
                title: "Nome dispositivo",
                content: "Visualizza il nome del dispositivo connesso."
            }, {
                type: "name",
                title: "Indirizzo IP",
                content: "Visualizza l'indirizzo IP del dispositivo connesso."
            }, {
                type: "name",
                title: "Indirizzo MAC",
                content: "Visualizza l'indirizzo MAC del dispositivo connesso."
            }, {
                type: "name",
                title: "Tipo di connessione",
                content: "Visualizza il tipo di connessione, cablata o wireless, del dispositivo connesso. "
            }, {
                type: "paragraph",
                content: "<strong>Bloccare uno o più dispositivi</strong><br>Nella tabella Dispositivi online, selezionare i dispositivi che si desidera bloccare e, sopra la tabella, fare clic su Blocca. I dispositivi selezionati verranno aggiunti automaticamente ai dispositivi della blacklist."
            }]
        },
        arpBind: {
            TITLE: "Impostazioni",
            CONTENT: [{
                type: "paragraph",
                content: "La funzionalità IP & MAC Binding (conosciuta anche come ARP Binding) è utilizzata per controllare l'accesso di uno specifico computer della LAN, tramite l'associazione dell'indirizzo IP e dell'indirizzo MAC. La funzionalità impedisce inoltre l'utilizzo di uno specifico indirizzo IP da parte di altri dispositivi."
            }, {
                type: "name",
                title: "IP & MAC Binding",
                content: "Selezionare On per abilitare la funzionalità IP & MAC Binding."
            }, {
                type: "title",
                title: "Elenco binding"
            }, {
                type: "note",
                title: "<strong>Configurazione dell'ARP Binding per un dispositivo</strong>",
                content: [
                    "Fare clic su Aggiungi.",
                    "Immettere l'indirizzo MAC del dispositivo.",
                    "Immettere l'indirizzo IP da associare all'indirizzo MAC immesso.",
                    "Selezionare Abilita.",
                    "Fare clic su OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Modificare o eliminare una voce</strong><br>In Elenco binding, fare clic sull'icona Modifica o sull'icona Cestino corrispondente alla voce che si desidera modificare o eliminare."
            }, {
                type: "paragraph",
                content: "<strong>Eliminare più voci</strong><br>In Elenco binding, selezionare le voci che si desidera eliminare e, sopra la tabella, fare clic su Elimina."
            }, {
                type: "title",
                title: "Elenco ARP"
            }, {
                type: "paragraph",
                content: "Visualizza gli indirizzi MAC e IP dei dispositivi attualmente connessi."
            }, {
                type: "name",
                title: "Nome dispositivo",
                content: "Visualizza il nome del dispositivo connesso."
            }, {
                type: "name",
                title: "Indirizzo MAC",
                content: "Visualizza l'indirizzo MAC del dispositivo connesso."
            }, {
                type: "name",
                title: "Indirizzo IP",
                content: "Visualizza l'indirizzo IP assegnato al dispositivo connesso."
            }, {
                type: "name",
                title: "Associato",
                content: "Indica se gli indirizzi MAC o IP siano o meno associati."
            }, {
                type: "name",
                title: "Modifica",
                content: "Visualizza le opzioni relative all'eliminazione della voce corrispondente dall'elenco."
            }, {
                type: "paragraph",
                content: "<strong>Nota: </strong>non è possibile associare lo stesso indirizzo IP a più di un indirizzo MAC."
            }, {
                type: "paragraph",
                content: "<strong>Associazione di più dispositivi</strong><br>Nell'elenco ARP, selezionare i dispositivi per i quali si desidera associare l'indirizzo IP all'indirizzo MAC, quindi fare clic su Associa, sopra la tabella."
            }]
        },
        alg: {
            TITLE: "Application Layer Gateway (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "La funzionalità ALG consente di aggiungere filtri NAT (Network Address Translation) personalizzati al gateway per fornire l'indirizzo e la porta di traduzione per alcuni protocolli del livello applicazione \"controllo/dati\": FTP, TFTP, H323, ecc. Si consiglia di abilitare ALG."
            }, {
                type: "name",
                title: "PPTP Pass-through",
                content: "Selezionare la casella di controllo per abilitare la funzionalità PPTP Pass-through, in modo da consentire il tunneling delle sessioni Point-to-Point tramite una rete IP e la loro trasmissione attraverso il router."
            }, {
                type: "name",
                title: "L2TP Pass-through",
                content: "Selezionare la casella di controllo per abilitare la funzionalità L2TP Pass-through, in modo da consentire il tunneling delle sessioni Layer 2 Point-to-Point tramite una rete IP e la loro trasmissione attraverso il router."
            }, {
                type: "name",
                title: "IPSec Pass-through",
                content: "Selezionare la casella di controllo per abilitare la funzionalità IPSec Pass-through, in modo da consentire il tunneling con Internet Protocol Security (IPSec) tramite una rete IP e la trasmissione attraverso il router. I protocolli IPSec garantiscono la riservatezza e la sicurezza delle comunicazioni sulle reti IP tramite servizi di crittografia."
            }, {
                type: "name",
                title: "FTP ALG",
                content: "Selezionare la casella di controllo per abilitare la funzionalità FTP ALG, in modo da consentire ai client e ai server FTP (File Transfer Protocol) di trasferire dati tramite NAT."
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "Selezionare la casella di controllo per abilitare la funzionalità TFTP ALG, in modo da consentire ai client e ai server TFTP (Trivial File Transfer Protocol) di trasferire dati tramite NAT."
            }, {
                type: "name",
                title: "RTSP ALG",
                content: "Se selezionata, questa funzionalità consente ai client di lettori multimediali di comunicare con i server multimediali tramite NAT."
            }, {
                type: "name",
                title: "H323 ALG",
                content: "Selezionare la casella di controllo per abilitare la funzionalità H323 ALG, per consentire ai client Microsoft NetMeeting di comunicare tramite NAT."
            }, {
                type: "name",
                title: "SIP ALG",
                content: "Selezionare la casella di controllo per abilitare la funzionalità SIP ALG, in modo da consentire ai client e ai server SIP di trasferire dati tramite NAT."
            }, {
                type: "name",
                title: "Salva",
                content: "Fare clic per salvare tutte le impostazioni."
            }]
        },
        virtualServer: {
            TITLE: "Server virtuali",
            CONTENT: [{
                type: "paragraph",
                content: "I server virtuali sono utilizzati per impostare servizi pubblici su una rete locale. Un server virtuale agisce come una porta esterna. Tutte le richieste provenienti da Internet e dirette a questa porta esterna vengono reindirizzate a un computer designato, che deve essere configurato con un indirizzo IP statico o riservato."
            }, {
                type: "name",
                title: "Tipo di servizio",
                content: " Visualizza il nome del server virtuale."
            }, {
                type: "name",
                title: "Porta esterna",
                content: "Visualizza il numero di porta o un intervallo di porte utilizzato dal server virtuale. "
            }, {
                type: "name",
                title: "IP interno",
                content: "Visualizza l'indirizzo IP del computer che sta eseguendo l'applicazione di servizio."
            }, {
                type: "name",
                title: "Porta interna",
                content: "Visualizza il numero di porta del computer che sta eseguendo l'applicazione di servizio."
            }, {
                type: "name",
                title: "Protocollo",
                content: "Visualizza il protocollo usato per l'applicazione di servizio: TCP, UDP o Tutti (tutti i protocolli supportati dal router)."
            }, {
                type: "name",
                title: "Stato",
                content: "Indica lo stato corrente di un server virtuale. Fare clic sull'icona Lampadina per abilitare (o disabilitare) la voce del server virtuale."
            }, {
                type: "name",
                title: "Modifica",
                content: "Visualizza le opzioni relative alla modifica o all'eliminazione della regola corrispondente."
            }, {
                type: "note",
                title: "<strong>Aggiunta di una voce del server virtuale</strong>",
                content: [
                    "Fare clic su Aggiungi.",
                    "Selezionare un nome interfaccia dall'elenco a discesa.",
                    "Fare clic su Visualizza applicazioni esistenti e selezionare un servizio dall'elenco per popolare automaticamente i campi Porta esterna e Porta interna con il numero di porta appropriato. Se il servizio non è presente nell'elenco, immettere il numero di porta esterna (ad es. 21) o un intervallo di porte (ad es. 21-25). Lasciare vuoto il campo Porta interna se quest'ultima corrisponde alla porta esterna o immettere uno specifico numero di porta (ad es. 21) se la porta esterna è una porta singola. ",
                    "Immettere nel campo IP interno l'indirizzo IP del computer che sta eseguendo l'applicazione di servizio (in formato decimale separato da punti).",
                    "Dall'elenco a discesa, selezionare un protocollo per l'applicazione di servizio: TCP, UDP o Tutti.",
                    "Selezionare Abilita questa voce.",
                    "Fare clic su OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Modificare o eliminare una voce del server virtuale</strong><br>Fare clic su Modifica o sull'icona Cestino della voce corrispondente."
            }, {
                type: "paragraph",
                content: "<strong>Eliminare più voci</strong><br>Selezionare tutte le voci del server virtuale che si desidera eliminare e, sopra la tabella, fare clic su Elimina."
            }, {
                type: "paragraph",
                content: "<strong>Nota:</strong><br>se nel dispositivo di host locale sono presenti più tipi di servizi disponibili, occorre creare un server virtuale per ciascun servizio."
            }]
        },
        portTrigger: {
            TITLE: "Port Triggering",
            CONTENT: [{
                type: "paragraph",
                content: "La funzionalità Port Triggering è usata per inoltrare il traffico su una determinata porta a uno specifico server della rete.  "
            }, {
                type: "name",
                title: "Applicazione",
                content: "Visualizza il nome dell'applicazione."
            }, {
                type: "name",
                title: "Porta di triggering",
                content: "Visualizza la porta di uscita usata per il triggering di una regola di filtro relativa a una connessione in uscita."
            }, {
                type: "name",
                title: "Protocollo di triggering",
                content: "Visualizza il protocollo usato per la porta di triggering: TCP, UDP o Tutti (tutti i protocolli supportati dal router)."
            }, {
                type: "name",
                title: "Porta esterna",
                content: "Visualizza la porta o l'intervallo di porte utilizzato dal sistema remoto. Quando si utilizza una di queste porte, la risposta viene inoltrata al PC che esegue il triggering di questa regola. È possibile immettere fino a 5 gruppi di porte (o sezioni di porta). I gruppi di porte devono essere separati da una virgola, ad esempio 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Protocollo esterno",
                content: "Visualizza il protocollo usato per la porta in entrata: TCP, UDP o TUTTI (tutti i protocolli supportati dal router)."
            }, {
                type: "name",
                title: "Stato",
                content: "Indica lo stato corrente di una voce di port triggering. Fare clic sull'icona Lampadina per abilitare (o disabilitare) la voce."
            }, {
                type: "name",
                title: "Modifica",
                content: "Visualizza le opzioni relative alla modifica o all'eliminazione della voce corrispondente."
            }, {
                type: "note",
                title: "<strong>Configurazione di una voce di port triggering</strong><br><strong>Nota: </strong> ciascuna voce può essere usata da un solo host alla volta.",
                content: [
                    "Fare clic su Aggiungi.",
                    "Selezionare un nome interfaccia dall'elenco a discesa.",
                    "Fare clic su Visualizza applicazioni esistenti e selezionare un'applicazione dall'elenco per popolare automaticamente i campi appropriati con i valori predefiniti. Per aggiungere un'applicazione non presente nell'elenco, compilare manualmente i campi Applicazione, Porta di triggering, Protocollo di triggering, Porta esterna e Protocollo esterno<br><strong>Nota: </strong> gli intervalli di porta delle voci di port triggering non possono sovrapporsi (se ad es. la voce 1 ha come intervallo di porte 4200-4205, la voce 2 non può avere come intervallo 4203-4206).",
                    "Selezionare Abilita questa voce.",
                    "Fare clic su OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Modificare o eliminare una voce di port triggering</strong><br>Dalla tabella, fare clic sull'icona Modifica o sull'icona Cestino corrispondente alla voce che si desidera modificare o eliminare."
            }, {
                type: "paragraph",
                content: "<strong>Eliminare più voci di port triggering</strong><br>Dalla tabella, selezionare tutte voci che si desidera eliminare e, sopra la tabella, fare clic su Elimina."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "La funzionalità di host DMZ (Demilitarized Zone) permette a un host locale di essere raggiungibile tramite Internet per un servizio specifico, ad esempio per i videogiochi online o le videoconferenze. La funzionalità DMZ permette l'apertura di tutte le porte di un singolo computer sulla LAN. Su questo computer deve essere configurato un indirizzo IP statico e la funzionalità client DHCP deve essere disabilitata."
            }, {
                type: "note",
                title: "<strong>Impostare un computer o un server come server DMZ</strong>",
                content: [
                    "Selezionare Abilita DMZ.",
                    "Immettere l'indirizzo IP del computer locale da designare come host DMZ.",
                    "Fare clic su Salva."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "La funzionalità UPnP (Universal Plug-and-Play) è abilitata per impostazione predefinita, in modo da consentire a computer e altri dispositivi con accesso a Internet di rilevarsi tra loro e comunicare l'un l'altro sulla rete locale."
            }, {
                type: "name",
                title: "UPnP",
                content: "Selezionare On per abilitare la funzionalità UPnP."
            }, {
                type: "title",
                content: "Elenco servizi UPnP"
            }, {
                type: "paragraph",
                content: "Nell'elenco servizi UPnP vengono visualizzate le informazioni dei dispositivi UPnP."
            }, {
                type: "name",
                title: "Client totali",
                content: "Visualizza il numero totale di dispositivi UPnP."
            }, {
                type: "name",
                title: "Descrizione servizio",
                content: "Visualizza una breve descrizione dell'host locale che effettua la richiesta UPnP."
            }, {
                type: "name",
                title: "Porta esterna",
                content: "Visualizza la porta esterna aperta dall'host locale."
            }, {
                type: "name",
                title: "Protocollo",
                content: "Visualizza il tipo di protocollo di rete usato dall'host locale."
            }, {
                type: "name",
                title: "Indirizzo IP interno",
                content: "Visualizza l'indirizzo IP dell'host locale."
            }, {
                type: "name",
                title: "Porta interna",
                content: "Visualizza la porta interna aperta dall'host locale."
            }, {
                type: "paragraph",
                content: "Fare clic su <strong>Aggiorna</strong>per aggiornare l'elenco di server UPnP."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Rete Ospiti",
            CONTENT: [{
                type: "paragraph",
                content: "La funzionalità Rete Ospiti consente di impostare una rete wireless separata con un nome di rete (SSID) e una password diversi, tramite la quale gli ospiti possono accedere a Internet."
            }, {
                type: "title",
                content: "Impostazioni"
            }, {
                type: "name",
                title: "Consenti agli ospiti di vedersi tra loro",
                content: "Selezionare questa casella di controllo per permettere ai dispositivi wireless sulla rete ospiti di comunicare tra loro."
            }, {
                type: "name",
                title: "Consenti agli ospiti di accedere alla rete locale",
                content: "Selezionare questa casella di controllo per permettere ai dispositivi wireless sulla rete ospiti di accedere alla rete locale."
            }, {
                type: "name",
                title: "Salva",
                content: "Fare clic per salvare tutte le impostazioni."
            }, {
                type: "title",
                content: "Impostazioni wireless"
            }, {
                type: "name",
                title: "Rete Ospiti 2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Fare clic sul pulsante corrispondente per abilitare la rete ospiti 2.4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "SSID Rete Ospiti",
                content: "Usare il SSID predefinito o creare un nuovo nome usando da 1 a 32 caratteri. Questo campo è sensibile all'uso di caratteri maiuscoli/minuscoli."
            }, {
                type: "name",
                title: "Protezione",
                content: "Selezionare un'opzione di protezione per la rete ospiti:",
                children: [{
                    type: "name",
                    title: " Nessuna",
                    content: "Per impostazione predefinita la protezione della rete ospiti è impostata su Nessuna: chiunque può accedere."
                }, {
                    type: "name",
                    title: "WPA/WPA2 - Personal",
                    content: "Selezionare questa opzione per abilitare il metodo di autenticazione standard basato su una chiave precondivisa (PSK), detta anche passphrase. Se questa opzione è selezionata, configurare quanto segue.",
                    children: [{
                        type: "name",
                        title: "Versione",
                        content: "Selezionare una versione della protezione per la rete ospiti.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Questa opzione supporta più implementazioni dello standard WPA (Wi-Fi Protected Access), ad esempio WPA e WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Questa opzione supporta la crittografia AES, che garantisce un migliore livello di protezione rispetto all'opzione WPA-PSK. L'utilizzo di questa opzione è consigliato."
                        }]
                    }, {
                        type: "name",
                        title: "Crittografia",
                        content: "Selezionare un tipo di crittografia di protezione: Auto (sia TKIP che AES), TKIP (Temporal Key Integrity Protocol) o AES (Advanced Encryption Standard). Se il router usa la modalità 802.11n NON è consigliato l'utilizzo della crittografia TKIP, non essendo supportata da tale modalità. Se TKIP è selezionato, la funzione WPS viene disabilitata."
                    }]
                }]
            }, {
                type: "name",
                title: "Password",
                content: "Creare una password usando da 8 a 63 caratteri ASCII o da 8 a 64 caratteri esadecimali (0-9, a-f, A-F)."
            }, {
                type: "paragraph",
                content: "Le precedenti istruzioni relative alla rete ospiti 2.4GHz si applicano anche alle reti guest 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Salva",
                content: "Fare clic per salvare tutte le impostazioni."
            }]
        },
        wirelessStat: {
            TITLE: "Dispositivi online",
            CONTENT: [{
                type: "name",
                title: "Indirizzo MAC",
                content: "Visualizza l'indirizzo MAC del client wireless associato."
            }, {
                type: "name",
                title: "Tipo di connessione",
                content: "Visualizza la banda di frequenza (2.4GHz or 5GHz) a cui il client wireless è connesso."
            }, {
                type: "name",
                title: "Protezione",
                content: "Visualizza il tipo di protezione (Nessuna, WEP, WPA/WPA2-Personal o WPA/WPA2-Enterprise) del client wireless associato."
            }, {
                type: "name",
                title: "Pacchetti ricevuti",
                content: "Visualizza il numero di pacchetti ricevuti dal client wireless associato."
            }, {
                type: "name",
                title: "Pacchetti inviati",
                content: "Visualizza il numero di pacchetti inviati dal client wireless associato."
            }, {
				type: "name",
				title: "Rate Trasmissione",
				content: "Mostra il rate degli ultimi pacchetti ricevuti dal client wireless associato."
			}, {
                type: "paragraph",
                content: "Fare clic su <strong>Aggiorna</strong>per aggiornare le informazioni su questa pagina."
            }]
        },
        wirelessAdv: {
            TITLE: "Impostazioni avanzate",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Selezionare 2.4GHz | 5GHz-1 | 5GHz-2 per impostare le relative impostazioni wireless avanzate."
            }, {
                type: "name",
                title: "Intervallo beacon",
                content: "Immettere un valore compreso tra 25 e 1000 millisecondi per stabilire l'intervallo in base al quale i pacchetti beacon vengono trasmessi dal router per la sincronizzazione della rete wireless. Il valore predefinito è 100 millisecondi."
            }, {
                type: "name",
                title: "Soglia RTS",
                content: "Immettere un valore compreso tra 1 e 2346 per stabilire le dimensioni dei pacchetti di trasmissione di dati attraverso il router. Il valore predefinito delle dimensioni della soglia RTS (Request to Send) è 2346. Se le dimensioni del pacchetto superano la soglia predefinita, il router invia frame RTS a una specifica stazione ricevente e negozia l'invio di un frame di dati. Altrimenti il pacchetto viene inviato immediatamente."
            }, {
                type: "name",
                title: "Intervallo DTIM",
                content: "Immettere un valore compreso tra 1 e 255 per stabilire l'intervallo DTIM (Delivery Traffic Indication Message). 1 indica che l'intervallo DTIM corrisponde all'intervallo beacon."
            }, {
                type: "name",
                title: "Periodo di aggiornamento chiave di gruppo",
                content: " Immettere un numero di secondi (il valore minimo è 30) per stabilire l'intervallo di rinnovo automatico della chiave di crittografia. Il valore predefinito è 0, che corrisponde a nessun rinnovo della chiave."
            }, {
                type: "name",
                title: "WMM",
                content: "Questa funzionalità garantisce la trasmissione preferenziale dei pacchetti con messaggi ad alta priorità. La funzionalità WMM è sempre abilitata in modalità 802.11n o 802.11ac. L'abilitazione di WMM è altamente consigliata."
            }, {
                type: "name",
                title: "Intervallo di guardia breve",
                content: "Questa funzionalità è abilitata per impostazione predefinita. Il suo utilizzo è consigliato e ha la funzione di aumentare la capacità di dati riducendo l'intervallo di guardia (Guard Interval, GI)."
            }, {
                type: "name",
                title: "Isolamento AP",
                content: " Selezionare questa casella di controllo per abilitare la funzionalità Isolamento AP, che consente di isolare e limitare l'interazione tra tutti i dispositivi wireless sulla rete, pur permettendogli di accedere a Internet. Per impostazione predefinita, la funzionalità Isolamento AP è disabilitata."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "Bridging WDS",
                content: "Selezionare questa casella di controllo per abilitare la funzionalità Bridging WDS (Wireless Distribution System), che consente di creare un bridge tra il router e un punto di accesso (AP) all'interno di una WLAN (Wireless Local Area Network). Se questa funzionalità è abilitata, configurare quanto segue:"
            }, {
                type: "name",
                title: "SSID (per il quale creare il bridge)",
                content: "Immettere il SSID del WAP (Wireless Access Point) al quale il router si connetterà come client o usare la funzionalità Rilevamento per ricercare e visualizzare tutte le reti disponibili all'interno di un intervallo."
            }, {
                type: "name",
                title: "Indirizzo MAC (per il quale creare il bridge)",
                content: "Immettere l'indirizzo MAC di 12 caratteri in formato esadecimale (0-9, a-f, A-F) separati dal segno meno del WAP al quale il router si connetterà come client. Se si seleziona una rete tramite la funzionalità Rilevamento, il campo Indirizzo MAC viene popolato automaticamente."
            }, {
                type: "name",
                title: "Rilevamento",
                content: "Fare clic su questo pulsante per ricercare e visualizzare l'indirizzo MAC, il SSID, la potenza del segnale, il canale e le informazioni di protezione di tutte le reti wireless disponibili all'interno dell'intervallo. Dopo aver selezionato una rete, i campi SSID, Indirizzo MAC e Protezione vengono popolati automaticamente.",
                children: [{
                    type: "name",
                    title: "Elenco AP",
                    content: "Visualizza le informazioni degli AP a cui il router può connettersi."
                }, {
                    type: "name",
                    title: "Indirizzo MAC",
                    content: "Visualizza l'indirizzo MAC dell'AP al quale il router si connetterà come client."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Visualizza il SSID dell'AP al quale il router si connetterà come client."
                }, {
                    type: "name",
                    title: "Potenza segnale",
                    content: "Visualizza la potenza del segnale dell'AP al quale il router si connetterà come client."
                }, {
                    type: "name",
                    title: "Canale",
                    content: "Visualizza il canale dell'AP al quale il router si connetterà come client."
                }, {
                    type: "name",
                    title: "Crittografia",
                    content: "Visualizza il tipo di crittografia dell'AP al quale il router si connetterà come client."
                }, {
                    type: "name",
                    title: "Connetti",
                    content: "Fare clic sull'icona per connettersi o disconnettersi dall'AP corrispondente."
                }]
            }, {
                type: "name",
                title: "Protezione",
                content: "Selezionare una delle seguenti opzioni di protezione:",
                children: [{
                    type: "name",
                    title: "Nessuna",
                    content: "Selezionare questa opzione per disabilitare la protezione wireless. Si consiglia vivamente di abilitare la protezione wireless, al fine di proteggere la rete wireless da accessi non autorizzati."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Selezionare questa opzione per abilitare il metodo di autenticazione standard basato su una chiave precondivisa (PSK), detta anche passphrase. Si consiglia di abilitare questa opzione. Se questa opzione è selezionata, configurare quanto segue.",
                    children: [{
                        type: "name",
                        title: "Versione",
                        content: "Selezionare una versione della protezione per la rete wireless.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Questa opzione supporta la crittografia AES, che offre un livello minore di protezione rispetto all'opzione WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Questa opzione supporta la crittografia AES, che garantisce un migliore livello di protezione rispetto all'opzione WPA-PSK. L'utilizzo di questa opzione è consigliato."
                        }]
                    }, {
                        type: "name",
                        title: "Crittografia",
                        content: "Selezionare un tipo di crittografia di protezione: TKIP (Temporal Key Integrity Protocol) o AES (Advanced Encryption Standard). Se il router usa la modalità 802.11n NON è consigliato l'utilizzo della crittografia TKIP, non essendo supportata da tale modalità. Se TKIP è selezionato, la funzione WPS viene disabilitata."
                    }, {
                        type: "name",
                        title: "Password",
                        content: "Immettere in questo campo una password wireless che contenga da 8 a 63 caratteri ASCII o da 8 a 64 caratteri esadecimali."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Selezionare questa opzione per abilitare il metodo di autenticazione di base se una qualsiasi versione dei dispositivi client può accedere al sistema wireless solo tramite WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Tipo",
                        content: "Selezionare un tipo di autenticazione per la rete wireless. Selezionare Sistema aperto o Chiave condivisa in base alla funzionalità e alla richiesta di accesso del client wireless."
                    }, {
                        type: "name",
                        title: "Formato chiave WEP",
                        content: "Selezionare il formato ASCII o esadecimale. Il formato ASCII è una combinazione di caratteri alfabetici e numerici. Il formato esadecimale è una combinazioni di numeri (0-9) e lettere (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Indice chiavi",
                        content: "Selezionare quale delle quattro chiavi verrà utilizzata e immettere nel campo Valore la corrispondente chiave WEP creata. Verificare che i valori siano identici in tutte le stazioni wireless della rete."
                    }, {
                        type: "name",
                        title: "Valore chiave",
                        content: "Immettere la chiave WEP creata corrispondente."
                    }]
                }]
            }, {
                type: "name",
                title: "Salva",
                content: "Fare clic per salvare le impostazioni."
            }]
        },
        wirelessSchedule: {
            TITLE: "Pianificazione connessione wireless",
            CONTENT: [{
                type: "paragraph",
                content: "La Pianificazione schedulazione attività si basa sull'ora del router. L'ora può essere impostata in Strumenti di Sistema -> Impostazioni data e ora"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Selezionare 2.4GHz | 5GHz-1 | 5GHz-2 per impostare la pianificazione della connessione wireless."
            }, {
                type: "name",
                title: "Pianificazione connessione wireless",
                content: "Selezionare On per abilitare questa funzionalità. Quindi fare clic e trascinare il cursore sulle celle per impostare il periodo di tempo per la disattivazione della connessione wireless."
            }, {
                type: "name",
                title: "Ripristina",
                content: "Fare clic per selezionare il periodo."
            }, {
                type: "name",
                title: "Salva",
                content: "Fare clic per salvare le impostazioni."
            }]
        },
        macFilter: {
            TITLE: "Impostazioni filtro MAC",
            CONTENT: [{
                type: "name",
                title: "Filtro MAC",
                content: "Selezionare On per controllare l'accesso wireless tramite l'indirizzo MAC dei singoli dispositivi."
            }, {
                type: "title",
                title: "Regole di filtro"
            }, {
                type: "name",
                title: "Blocca l'accesso wireless dai dispositivi elencati di seguito.",
                content: "Selezionare questa opzione per bloccare l'accesso wireless dai dispositivi elencati di seguito."
            }, {
                type: "name",
                title: "Consenti l'accesso wireless solo dai dispositivi elencati di seguito.",
                content: "Selezionare questa opzione per consentire l'accesso wireless solo dai dispositivi elencati di seguito."
            }, {
                type: "title",
                title: "Elenco dispositivi"
            }, {
                type: "name",
                title: "Indirizzo MAC/Descrizione",
                content: "Visualizza l'indirizzo MAC e la descrizione del dispositivo."
            }, {
                type: "name",
                title: "Abilita",
                content: "Fare clic sull'icona Lampadina per abilitare o disabilitare il filtro MAC del dispositivo."
            }, {
                type: "name",
                title: "Modifica",
                content: "Visualizza le opzioni relative alla modifica o all'eliminazione della voce corrispondente."
            }, {
                type: "note",
                title: "Aggiunta di un nuovo dispositivo",
                content: [
                    "Fare clic su Aggiungi.",
                    "Immettere l'indirizzo MAC del dispositivo.",
                    "Immettere una descrizione del dispositivo.",
                    "Fare clic su Abilita questa voce.",
                    "Fare clic su OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Impostazioni wireless",
            CONTENT: [/*{
                    type: "name",
                    title: "Regione",
                    content: "Selezionare la propria regione dall'elenco a discesa. In questo campo viene specificata la regione in cui è possibile usare la funzione wireless del router. L'uso della funzione wireless del router in una regione diversa da quelle specificata in questo campo può essere illegale. Se il paese o la regione non sono presenti sull'elenco, contattare un ente pubblico locale per maggiori informazioni."
                }, */{
                    type: "name",
                    title: "Smart Connect",
                    content: "Selezionare questa casella di controllo per abilitare Smart Connect. Questa funzione rende i dispositivi più veloci, assegnando ad essi le bande wireless migliori in base alle condizioni attuali per bilanciare le esigenze della rete."
                }, {
                    type: "name",
                    title: "2.4GHz | 5GHz-1 | 5GHz-2",
                    content: "Selezionare 2.4GHz | 5GHz-1 | 5GHz-2 per modificare le relative impostazioni."
                }, {
                    type: "name",
                    title: "Radio wireless",
                    content: "Selezionare questa casella di controllo per abilitare la frequenza 2.4GHz | 5GHz-1 | 5GHz-2 per la radio wireless."
                }, {
                    type: "name",
                    title: "Nome rete wireless (SSID)",
                    content: "È possibile mantenere il nome predefinito (SSID) o creare un nuovo nome (massimo 32 caratteri). Questo campo è sensibile all'uso di caratteri maiuscoli/minuscoli."
                }, {
                    type: "name",
                    title: "Nascondi SSID",
                    content: "Selezionare questa casella di controllo se si desidera nascondere il nome della rete (SSID) 2.4GHz | 5GHz-1 | 5GHz-2 nell'elenco delle reti Wi-Fi."
                }, {
                    type: "name",
                    title: "Protezione",
                    content: "Selezionare una delle seguenti opzioni di protezione:",
                    children: [{
                        type: "name",
                        title: "Nessuna protezione",
                        content: "Selezionare questa opzione per disabilitare la protezione wireless. Si consiglia vivamente di abilitare la protezione wireless, al fine di proteggere la rete wireless da accessi non autorizzati."
                    }, {
                        type: "name",
                        title: "WPA/WPA2 Personal",
                        content: "Selezionare questa opzione per abilitare il metodo di autenticazione standard basato su una chiave precondivisa (PSK), detta anche passphrase. Si consiglia di abilitare questa opzione. Se questa opzione è selezionata, configurare quanto segue.",
                        children: [{
                            type: "name",
                            title: "Versione",
                            content: "Selezionare una versione della protezione per la rete wireless.",
                            children: [{
                                type: "name",
                                title: "Auto",
                                content: "Questa opzione supporta più implementazioni dello standard WPA (Wi-Fi Protected Access), ad esempio WPA e WPA2."
                            }, {
                                type: "name",
                                title: "WPA2-PSK",
                                content: "Questa opzione supporta la crittografia AES, che garantisce un migliore livello di protezione rispetto all'opzione WPA-PSK. L'utilizzo di questa opzione è consigliato."
                            }]
                        }, {
                            type: "name",
                            title: "Crittografia",
                            content: "Selezionare un tipo di crittografia di protezione: Auto (sia TKIP che AES), TKIP (Temporal Key Integrity Protocol) o AES (Advanced Encryption Standard). Se il router usa la modalità 802.11n NON è consigliato l'utilizzo della crittografia TKIP, non essendo supportata da tale modalità. Se TKIP è selezionato, la funzione WPS viene disabilitata."
                        }, {
                            type: "name",
                            title: "Password",
                            content: "Creare in questo campo una password wireless che contenga da 8 a 63 caratteri ASCII o da 8 a 64 caratteri esadecimali."
                        }]
                    }, {
                        type: "name",
                        title: "WPA/WPA2 Enterprise",
                        content: "Selezionare questa opzione per abilitare il metodo di autenticazione più avanzato tramite un server RADIUS (Remote Authentication Dial In User Service). Se questa opzione è selezionata, la funzione WPS viene disabilitata.",
                        children: [{
                            type: "name",
                            title: "Versione",
                            content: "Selezionare una versione della protezione per la rete wireless.",
                            children: [{
                                type: "name",
                                title: "Auto",
                                content: "Questa opzione supporta più implementazioni dello standard WPA (Wi-Fi Protected Access), ad esempio WPA e WPA2."
                            }, {
                                type: "name",
                                title: "WPA2-PSK",
                                content: "Questa opzione supporta la crittografia AES, che garantisce un migliore livello di protezione rispetto all'opzione WPA. L'utilizzo di questa opzione è consigliato."
                            }]
                        }, {
                            type: "name",
                            title: "Crittografia",
                            content: "Selezionare un tipo di crittografia di protezione: Auto (sia TKIP che AES), TKIP (Temporal Key Integrity Protocol) o AES (Advanced Encryption Standard). Se il router usa la modalità 802.11n NON è consigliato l'utilizzo della crittografia TKIP, non essendo supportata da tale modalità. Se TKIP è selezionato, la funzione WPS viene disabilitata."
                        }, {
                            type: "name",
                            title: "IP server RADIUS",
                            content: "Immettere l'indirizzo IP del server RADIUS."
                        }, {
                            type: "name",
                            title: "Porta server RADIUS",
                            content: "Immettere il numero di porta del server RADIUS."
                        }, {
                            type: "name",
                            title: "Password server RADIUS",
                            content: " Immettere la password condivisa del server RADIUS."
                        }]
                    }, {
                        type: "name",
                        title: "WEP",
                        content: "Selezionare questa opzione per abilitare il metodo di autenticazione di base se una qualsiasi versione dei dispositivi client può accedere al sistema wireless solo tramite WEP (Wired Equivalent Privacy).",
                        children: [{
                            type: "name",
                            title: "Tipo",
                            content: "Selezionare un tipo di autenticazione per la rete wireless. Il tipo predefinito è Auto, che effettua una selezione automatica tra Sistema aperto o Chiave condivisa in base alla funzionalità e alla richiesta di accesso del client wireless."
                        }, {
                            type: "name",
                            title: "Chiave selezionata",
                            content: "Selezionare quale delle quattro chiavi verrà utilizzata e creare una chiave WEP nel campo Valore chiave. I client wireless devono immettere la chiave WEP corrispondente per connettersi alla rete."
                        }, {
                            type: "name",
                            title: "Formato chiave WEP",
                            content: "Usare il formato ASCII o selezionare Esadecimale. Il formato ASCII è una combinazione di caratteri alfabetici e numerici. Il formato esadecimale è una combinazioni di numeri (0-9) e lettere (A-F, a-f)."
                        }, {
                            type: "name",
                            title: "Tipo chiave",
                            content: "Selezionare la lunghezza della chiave WEP.",
                            children: [{
                                type: "name",
                                title: "Crittografia a 64 bit",
                                content: "Consente di immettere nel campo Valore WEP 10 cifre esadecimali (0-9, A-F, a-f) o 5 caratteri ASCII."
                            }, {
                                type: "name",
                                title: "Crittografia a 128 bit",
                                content: "Consente di immettere nel campo Valore WEP 26 cifre esadecimali (0-9, A-F, a-f) o 13 caratteri ASCII."
                            }]
                        }, {
                            type: "name",
                            title: "Valore chiave",
                            content: "Creare una chiave WEP."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Modalità",
                    content: "Selezionare una modalità mista di trasmissione."
                }, {
                    type: "name",
                    title: "Canale",
                    content: "Selezionare un canale operativo per la rete wireless. Il canale predefinito è Auto. Modificare il canale predefinito solo se la connessione wireless è intermittente."
                }, {
                    type: "name",
                    title: "Larghezza canale",
                    content: "Selezionare la larghezza (di banda) del canale per la rete wireless."
                }, {
                    type: "name",
                    title: "Potenza di trasmissione",
                    content: "Selezionare Alta, Media o Bassa per specificare la potenza di trasmissione di dati. L'impostazione predefinita e consigliata è Alta."
                }, {
                    type: "paragraph",
                    content: "Fare clic su <strong>Salva</strong> per salvare tutte le impostazioni."
                }



            ]
        },
        wps: {
            TITLE: "PIN del router",
            CONTENT: [{
                type: "name",
                title: "PIN del router",
                content: "Selezionare On per consentire ai dispositivi wireless di connettersi al router usando il relativo PIN (Personal Identification Number)."
            }, {
                type: "name",
                title: "PIN corrente",
                content: "Visualizza il PIN corrente del router. Il PIN predefinito si trova sull'etichetta del router o nel manuale utente. Fare clic su Genera per generare un nuovo PIN casuale o fare clic su Ripristina per ripristinare il PIN predefinito."
            }, {
                type: "title",
                content: "Impostazioni WPS"
            }, {
                type: "name",
                title: "Pulsante di comando (consigliato)",
                content: "Selezionare questo metodo di configurazione per abilitare la funzionalità WPS, che consente di connettere facilmente qualsiasi dispositivo WPS alla rete wireless usando il pulsante WPS o il pulsante virtuale Connetti."
            }, {
                type: "name",
                title: "Codice PIN",
                content: "Selezionare questo metodo di configurazione per aggiungere manualmente un dispositivo wireless immettendone il PIN WPS."
            }, {
                type: "name",
                title: "Connetti",
                content: "Fare clic su questo campo per avviare WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Parental Control",
            CONTENT: [{
                    type: "paragraph",
                    content: "La funzionalità Parental Control consente di bloccare i siti Web inappropriati, espliciti e dannosi o di limitare l'accesso in determinati orari (ad esempio Facebook o YouTube durante l'orario di studio)."
                }, {
                    type: "name",
                    title: "Stato",
                    content: "Selezionare On per abilitare la funzionalità Parental Control. Questa funzionalità è disabilitata per impostazione predefinita."
                }, {
                    type: "title",
                    content: "Dispositivi sottoposti a parental control"
                }, {
                    type: "paragraph",
                    content: "In Dispositivi sottoposti a parental control viene visualizzato l'elenco dei dispositivi attualmente limitati da Parental Control."
                }, {
                    type: "name",
                    title: "Nome dispositivo",
                    content: "Visualizza il nome di tutti i dispositivi client connessi e attualmente sottoposti a Parental Control."
                }, {
                    type: "name",
                    title: "Indirizzo MAC",
                    content: " Visualizza l'indirizzo MAC di tutti i dispositivi client connessi e attualmente sottoposti a Parental Control."
                }, {
                    type: "name",
                    title: "Schedulazione attività",
                    content: "Visualizza i periodi di limitazione dell'accesso."
                }, {
                    type: "name",
                    title: "Descrizione",
                    content: "Visualizza una breve descrizione del dispositivo connesso. "
                }, {
                    type: "name",
                    title: "Stato",
                    content: "Indica se il Parental Control è abilitato o disabilitato per il dispositivo corrispondente. Fare clic sull'icona Lampadina per abilitarlo (o disabilitarlo)."
                }, {
                    type: "name",
                    title: "Modifica",
                    content: "Visualizza le opzioni relative alla modifica o all'eliminazione del dispositivo corrispondente."
                }, {
                    type: "note",
                    title: "<strong>Limitare un nuovo dispositivo client</strong>",
                    content: [
                        "Fare clic su Aggiungi.",
                        "Fare clic su Visualizza dispositivi esistenti per scegliere un dispositivo attualmente connesso dall'Elenco dispositivi di accesso. Per aggiungere un dispositivo non connesso, immetterne manualmente il nome e l'indirizzo MAC.",
                        "Fare clic sull'icona Schedulazione attività per specificare il periodo di efficacia della limitazione.",
                        "Immettere una breve descrizione nel campo Descrizione. Questo campo è facoltativo.",
                        "Selezionare Abilita.",
                        "Fare clic su OK per salvare."
                    ]
                }, {
                    type: "paragraph",
                    content: "<strong>Modificare o eliminare un dispositivo</strong><br>Nell'elenco Dispositivi sottoposti a parental control, fare clic sull'icona Modifica o sull'icona Cestino corrispondente al dispositivo che si desidera modificare o eliminare."
                }, {
                    type: "paragraph",
                    content: "<strong>Eliminare più dispositivi</strong><br>Nell'elenco Dispositivi sottoposti a parental control, selezionare la casella di controllo corrispondente ai dispositivi da eliminare e, sopra la tabella, fare clic su Elimina."
                }, {
                    type: "title",
                    title: "Restrizione dei contenuti"
                }, {
                    type: "paragraph",
                    content: "La funzionalità Restrizione dei contenuti consente di limitare l'accesso a determinati contenuti, specificando le parole chiave e i nomi di dominio a cui i dispositivi client sottoposti a Parental Control possono o non possono accedere in base al tipo di restrizione."
                }, {
                    type: "name",
                    title: "Tipo di restrizione",
                    content: "Selezionare i seguenti tipi di restrizione:",
                    children: [{
                        type: "name",
                        title: "Blacklist",
                        content: "Contiene le parole chiave e i nomi di dominio che verranno usati per bloccare l'accesso a siti Web da parte dei dispositivi client specificati nell'elenco Dispositivi sottoposti a parental control."
                    }, {
                        type: "name",
                        title: "Whitelist",
                        content: "Contiene le parole chiave e i nomi di dominio per i quali è permesso l'accesso da parte dei dispositivi client specificati nell'elenco Dispositivi sottoposti a parental control."
                    }]
                }, {
                    type: "name",
                    title: "Aggiungi nuova parola chiave",
                    content: "Fare clic su questa opzione per aggiungere una parola chiave o un nome di dominio alla blacklist o alla whitelist. "
                }, {
                    type: "paragraph",
                    content: "Per eliminare una parola chiave o un nome di dominio, fare clic sull'icona - (meno) accanto all'elemento che si desidera eliminare."
                }, {
                    type: "name",
                    title: "Salva",
                    content: "Fare clic su Salva per salvare le configurazioni."
                }

            ]
        },
        wlGuestDulBandBasic: {
            TITLE: "Rete Ospiti",
            CONTENT: [{
                type: "paragraph",
                content: "La funzionalità Rete Ospiti consente di impostare una rete wireless separata con un nome di rete (SSID) e una password diversi, tramite la quale gli ospiti possono accedere a Internet."
            }, {
                type: "name",
                title: "Consenti agli ospiti di vedersi tra loro",
                content: "Selezionare questa casella di controllo per permettere ai dispositivi wireless sulla rete ospiti di comunicare tra loro."
            }, {
                type: "name",
                title: "Consenti agli ospiti di accedere alla rete locale",
                content: "Selezionare questa casella di controllo per permettere ai dispositivi wireless sulla rete ospiti di accedere alla rete locale."
            }, {
                type: "name",
                title: "Rete wireless 2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Selezionare il pulsante corrispondente per abilitare la rete ospiti 2.4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "SSID Rete Ospiti",
                content: "Usare il SSID predefinito o creare un nuovo nome usando da 1 a 32 caratteri. Questo campo è sensibile all'uso di caratteri maiuscoli/minuscoli."
            }, {
                type: "name",
                title: "Nascondi SSID",
                content: "Selezionare questa casella di controllo se si desidera nascondere il SSID della rete ospiti."
            }, {
                type: "name",
                title: "Protezione",
                content: "Selezionare un'opzione di protezione per la rete ospiti:",
                children: [{
                    type: "name",
                    title: "Nessuna",
                    content: "Per impostazione predefinita la protezione della rete ospiti è impostata su Nessuna: chiunque può accedere."
                }, {
                    type: "name",
                    title: "Imposta password",
                    content: "Creare una password per la rete ospiti immettendo da 8 a 63 caratteri ASCII o da 8 a 64 caratteri esadecimali (0-9, a-f, A-F) nel campo Password."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
                type: "name",
                title: "Stato connessione Internet",
                content: "Visualizza lo stato corrente della connessione Internet del router."
            }, {
                type: "name",
                title: "Tipo di connessione",
                content: "Visualizza il tipo di connessione Internet. "
            }, {
                type: "name",
                title: "Indirizzo IP",
                content: "Visualizza l'indirizzo IP Internet attualmente assegnato al router."
            }, {
                type: "name",
                title: "Server DNS",
                content: " Visualizza gli indirizzi IP dei server DNS primari e secondari."
            }, {
                type: "name",
                title: "Gateway",
                content: "Visualizza l'indirizzo IP del gateway."
            }, {
                type: "title",
                title: "Router"
            }, {
                type: "title2",
                content: "Wireless 2.4GHz | 5GHz-1 | 5GHz-2"
            }, {/*
                type: "name",
                title: "Stato",
                content: "Visualizza se la rete wireless 2.4GHz | 5GHz-1 | 5GHz-2 è attivata (abilitata) o disattivata (disabilitata)."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Visualizza il nome corrente della rete wireless della frequenza di banda 2.4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Canale",
                content: "Visualizza il canale di trasmissione della rete wireless 2.4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "MAC",
                content: "Visualizza l'indirizzo MAC corrente wireless 2.4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "title2",
                content: "Rete Ospiti 2.4GHz | 5GHz-1 | 5GHz-2"
            }, {
                type: "name",
                title: "Stato",
                content: "Visualizza se la rete ospiti 2.4GHz | 5GHz-1 | 5GHz-2 è attivata (abilitata) o disattivata (disabilitata)."
            }, {
                type: "name",
                title: "SSID",
                content: "Visualizza il nome della rete wireless della rete ospiti."
            }, {
                type: "title",
                title: "Client wireless/cablati"
            }, {
                type: "name",
                title: "Nome",
                content: " Visualizza il nome del client connesso al router. "
            }, {
                type: "name",
                title: "Indirizzo IP",
                content: "Visualizza l'indirizzo IP assegnato al client."
            }, {
                type: "name",
                title: "Indirizzo MAC",
                content: "Visualizza l'indirizzo MAC del client."
            }, {
                type: "title",
                display: "INCLUDE_VOIP",
                title: "Telefono"
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Nome telefono",
                content: "Visualizza il nome del telefono."
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Numeri chiamate in entrata",
                content: "Visualizza i numeri usati dai dispositivi di telefonia per ricevere le chiamate in entrata tramite il router. "
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Numero interno",
                content: "Visualizza i numeri di telefono usati per effettuare chiamate tra dispositivi di telefonia connessi allo stesso router. È preimpostato e non può essere modificato."
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Numero in uscita",
                content: "Visualizza i numeri usati dai dispositivi di telefonia per effettuare chiamate in uscita tramite il router. L'impostazione predefinita è Auto, in base alla quale il router seleziona un numero disponibile come numero in uscita. Questo numero può essere modificato sulla pagina VoIP."
            }, {
                type: "title",
                display: "INCLUDE_USB",
                title: "Stampante"
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Nome",
                content: "Visualizza il nome della stampante connessa al router tramite una porta USB. "
            }, {
                type: "title",
                display: "INCLUDE_USB",
                title: "Disco USB"
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Marchio",
                content: "Visualizza il marchio del disco USB connesso al router."
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Totale",
                content: "Visualizza il volume totale del disco USB."
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Disponibile",
                content: "Visualizza lo spazio disponibile sul disco USB."
            }]
        },
        wirelessBasic: {
            TITLE: "Impostazioni wireless",
            CONTENT: [{
                type: "name",
                title: "Rete wireless 2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Selezionare questa casella di controllo per abilitare la frequenza 2.4GHz | 5GHz-1 | 5GHz-2 per la radio wireless."
            }, {
                type: "name",
                title: "Nome rete wireless (SSID)",
                content: "È possibile mantenere il nome predefinito (SSID) o creare un nuovo nome (massimo 32 caratteri). Questo campo è sensibile all'uso di caratteri maiuscoli/minuscoli."
            }, {
                type: "name",
                title: "Password",
                content: "Creare una password wireless che contenga da 8 a 63 caratteri ASCII o da 8 a 64 caratteri esadecimali. Questo campo è sensibile all'uso di caratteri maiuscoli/minuscoli."
            }, {
                type: "name",
                title: "Nascondi SSID",
                content: "Selezionare questa casella di controllo se si desidera nascondere il SSID 2.4GHz | 5GHz-1 | 5GHz-2 nell'elenco delle reti Wi-Fi."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                    type: "paragraph",
                    content: "Visualizza informazioni rilevanti sulla connessione Internet."
                }, {
                    type: "title2",
                    content: "IPv4"
                }, {
                    /*type: "name",
                    title: "Nome",
                    content: "Visualizza il nome della porta Internet del router."
                }, {*/
                    type: "name",
                    title: "Indirizzo MAC",
                    content: "L'indirizzo fisico univoco assegnato alla porta Internet (WAN) del router."
                }, {
                    type: "name",
                    title: "Indirizzo IP",
                    content: "L'indirizzo IP assegnato alla porta Internet (WAN) del router. Se l'indirizzo IP viene visualizzato come 0.0.0.0, non si ha accesso a Internet."
                }, {
                    type: "name",
                    title: "Subnet mask",
                    content: "Questo parametro stabilisce la parte di un indirizzo IP che definisce la rete e quella che definisce l'host. "
                }, {
                    type: "name",
                    title: "Gateway predefinito",
                    content: " L'indirizzo IP usato per connettere il router alla rete."
                }, {
                    type: "name",
                    title: "DNS primario/DNS secondario",
                    content: "Il DNS (Domain Name System) traduce i nomi host e i domini Internet in indirizzi IP. Le informazioni di questi server DNS vengono assegnate dall'Internet Service Provider (ISP)."
                }, {
                    type: "name",
                    title: "Tipo di connessione",
                    content: "Il tipo di connessione Internet corrente."
                }, {
                    type: "title2",
                    content: "IPv6"
                }, {
                    type: "name",
                    title: "Indirizzo MAC",
                    content: "L'indirizzo fisico univoco assegnato alla porta Internet (WAN) del router."
                }, {
                    type: "name",
                    title: "Indirizzo IP",
                    content: " L'indirizzo IPv6 assegnato alla porta Internet (WAN) del router."
                }, {
                    type: "name",
                    title: "Gateway predefinito",
                    content: " L'indirizzo IP usato per connettere il router alla rete."
                }, {
                    type: "name",
                    title: "DNS primario/DNS secondario",
                    content: "Il DNS (Domain Name System) traduce i nomi host e i domini Internet in indirizzi IP. Le informazioni di questi server DNS vengono assegnate dall'Internet Service Provider (ISP)."
                }, {
                    type: "name",
                    title: "Tipo di connessione",
                    content: "Il tipo di connessione Internet corrente."
                }, {
                    type: "title",
                    title: "Wireless"
                }, {
                    type: "name",
                    title: "2.4G | 5G-1 | 5G-2",
                    content: "Selezionare questa opzione per visualizzare le informazioni e le impostazioni wireless 2.4GHz | 5GHz-1 | 5GHz-2."
                }, {
                    type: "name",
                    title: "Nome rete",
                    content: "Il nome della rete wireless, conosciuto anche come SSID (Service Set Identifier)."
                }, {
                    type: "name",
                    title: "Radio wireless",
                    content: "Lo stato corrente (On o Spento) della rete wireless."
                }, {
                    type: "name",
                    title: "Modalità",
                    content: "La modalità wireless corrente."
                }, {
                    type: "name",
                    title: "Larghezza canale",
                    content: "La banda del canale della rete wireless."
                }, {
                    type: "name",
                    title: "Canale",
                    content: "Il canale wireless corrente e la relativa frequenza (espressa in GHz)."
                }, {
                    type: "name",
                    title: "Indirizzo MAC",
                    content: "L'indirizzo MAC della radio della rete wireless."
                }, {
                    type: "title",
                    title: "LAN"
                }, {
                    type: "paragraph",
                    content: "Visualizza informazioni sulle porte Ethernet (LAN)."
                }, {
                    type: "title2",
                    content: "IPv4"
                }, {
                    type: "name",
                    title: "Indirizzo MAC",
                    content: "L'indirizzo fisico univoco assegnato alla porta Ethernet (LAN) del router."
                }, {
                    type: "name",
                    title: "Indirizzo IP",
                    content: "L'indirizzo IPv4 assegnato alla porta Ethernet (LAN) del router."
                }, {
                    type: "name",
                    title: "Subnet mask",
                    content: "Questo parametro stabilisce la parte di un indirizzo IP che definisce la rete e quella che definisce l'host."
                }, {
                    type: "name",
                    title: "DHCP",
                    content: "Indica se il server DHCP incorporato nel router è attivo o disattivo per i dispositivi sulle porte LAN."
                }, {
                    type: "title2",
                    content: "IPv6"
                }, {
                    type: "name",
                    title: "Indirizzo MAC",
                    content: " L'indirizzo fisico univoco assegnato alla porta Ethernet (LAN) del router."
                }, {
                    type: "name",
                    title: "Indirizzo IP",
                    content: "L'indirizzo IPv6 assegnato alla porta Ethernet (LAN) del router."
                }, {
                    type: "name",
                    title: "Lunghezza prefisso",
                    content: "La lunghezza del prefisso dell'indirizzo IPv6."
                }, {
                    type: "name",
                    title: "Tipo assegnato",
                    content: "Il tipo di indirizzo IPv6 assegnato all'interfaccia LAN."
                }, {
                    type: "title",
                    title: "Rete Ospiti"
                }, {
                    type: "name",
                    title: "2.4G | 5G-1 | 5G-2",
                    content: "Selezionare questa opzione per visualizzare le informazioni e le impostazioni della rete ospiti 2.4GHz | 5GHz-1 | 5GHz-2."
                }, {
                    type: "name",
                    title: "SSID Rete Ospiti",
                    content: " Visualizza il nome della rete wireless (SSID) della rete ospiti."
                }, {
                    type: "name",
                    title: "Nascondi SSID",
                    content: "Indica se il nome della rete wireless (SSID) della rete ospiti è nascosto (On) o visibile (Spento)."
                }, {
                    type: "name",
                    title: "Radio wireless",
                    content: "Indica lo stato corrente (On o Spento) della rete ospiti."
                }, {
                    type: "name",
                    title: "Comunicazione tra dispositivi",
                    content: "Indica se tutti i dispositivi sulla rete ospiti possono o non possono comunicare tra loro."
                }, {
                    type: "title",
                    display: "$.sysMode == 'DSL'",
                    title: "DSL"
                }, {
                    type: "paragraph",
                    display: "$.sysMode == 'DSL'",
                    content: "Visualizza le informazioni sulla connessione DNS."
                }, {
                    type: "name",
                    display: "$.sysMode == 'DSL'",
                    title: "Stato linea",
                    content: "Indica se la connessione DSL è connessa o disconnessa."
                }, {
                    type: "name",
                    display: "$.sysMode == 'DSL'",
                    title: "Tipo di modulazione DSL",
                    content: "Visualizza il tipo di modulazione delle operazioni DSL utilizzato dalla connessione DSL."
                }, {
                    type: "name",
                    display: "$.sysMode == 'DSL'",
                    title: "Tipo Annex",
                    content: "Visualizza il tipo di Annex delle operazioni DSL utilizzato dalla connessione DSL."
                }, {
                    type: "name",
                    display: "$.sysMode == 'DSL'",
                    title: "Velocità corrente (kbps)",
                    content: "Visualizza la velocità corrente in upload e download della connessione DSL."
                }, {
                    type: "name",
                    display: "$.sysMode == 'DSL'",
                    title: "Velocità massima (kbps)",
                    content: "Visualizza la velocità massima in upload e download della connessione DSL."
                }, {
                    type: "name",
                    display: "$.sysMode == 'DSL'",
                    title: "Margine SNR (dB)",
                    content: "Visualizza il margine SNR (rapporto segnale/rumore) in upload e download della connessione DSL."
                }, {
                    type: "name",
                    display: "$.sysMode == 'DSL'",
                    title: "Attenuazione linea (dB)",
                    content: "Visualizza l'attenuazione della linea della connessione DSL."
                }, {
                    type: "name",
                    display: "$.sysMode == 'DSL'",
                    title: "Errori (pacchetti)",
                    content: "Visualizza il numero di errori in upstream e downstream della connessione DSL."
                }




            ]
        },
        time: {
            TITLE: "Impostazioni data e ora",
            CONTENT: [{
                type: "name",
                title: "Fuso orario",
                content: "Selezionare il fuso orario locale dall'elenco a discesa."
            }, {
                type: "name",
                title: "Data",
                content: "Immettere nel campo la data locale nel formato MM/GG/AA."
            }, {
                type: "name",
                title: "Ora",
                content: "Selezionare l'ora locale dall'elenco a discesa (in formato 24 ore)."
            }, {
                type: "name",
                title: "Server NTP I/Server NTP II",
                content: "Immettere l'indirizzo IP del server NTP I o del server NTP II. Il router recupererà automaticamente l'ora dal server NTP. Il router dispone inoltre di alcuni server NTP incorporati comuni, che si sincronizzeranno automaticamente in seguito alla connessione a Internet."
            }, {
                type: "name",
                title: "Ottieni da PC",
                content: "Fare clic per eseguire la sincronizzazione con l'ora di sistema del computer."
            }, {
                type: "name",
                title: "Ottieni da GMT",
                content: "Fare clic per eseguire la sincronizzazione in base al fuso orario GMT (orario di Greenwich) tramite Internet."
            }, {
                type: "name",
                title: "Salva",
                content: "Fare clic per salvare le impostazioni."
            }, {
                type: "title",
                content: "Ora legale"
            }, {
                type: "note",
                title: "Configurazione dell'ora legale",
                content: [
                    "Selezionare <b>Abilita ora legale</b>.",
                    "Selezionare la data e l'ora di <b>inizio</b> corrette di entrata in vigore dell'ora legale nel proprio fuso orario.",
                    "Selezionare la data e l'ora di <b>fine</b> corrette dell'applicazione dell'ora legale nel il proprio fuso orario.",
                    "Fare clic su <b>Salva</b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Strumenti di diagnostica",
            CONTENT: [{
                type: "paragraph",
                content: "Il router offre due strumenti di diagnostica: Ping e Traceroute."
            }, {
                type: "note",
                title: "Per eseguire una diagnosi con lo strumento Ping:",
                content: [
                    "Controllare il pulsante radio prima del ping.",
                    "Immettere l'indirizzo IP o il nome di dominio.",
                    "Fare clic sull'icona a discesa prima di Avanzate per visualizzare il numero di ping, le dimensioni del pacchetto ping e il timeout del ping. Mantenere questi parametri impostati sul valore predefinito o configurarli in base alle proprie esigenze.",
                    "Fare clic sul pulsante Avvia per avviare la diagnosi."
                ]
            }, {
                type: "paragraph",
                content: "OPPURE"
            }, {
                type: "note",
                title: "Per eseguire una diagnosi con lo strumento Traceroute:",
                content: [
                    "1. Controllare il pulsante radio prima di utilizzare Traceroute.",
                    "2. Immettere l'indirizzo IP o il nome di dominio.",
                    "3. Fare clic sull'icona a discesa prima di Avanzate per visualizzare il TTL massimo di Traceroute. Mantenere questo parametro impostato sul valore predefinito o configurarlo in base alle proprie esigenze.",
                    "4. Fare clic sul pulsante Avvia per avviare la diagnosi."
                ]
            }]
        },
        softup: {
            TITLE: "Aggiornamento Firmware",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Un aggiornamento firmware aggiorna il sistema operativo del router all'ultima e più recente versione, migliorandone al contempo le prestazioni. Quando è disponibile un aggiornamento di un nuovo firmware, verrete avvisati con una icona Aggiorna nell'angolo superiore destro. Facendo clic sull'icona accedete alla pagina Aggiorna Firmware."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>IMPORTANTE: Seguite le istruzioni per evitare problemi nell'aggiornamento.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Prima di aggiornare:",
                content: [
                    "Collegate il vostro computer al router con un cavo Ethernet. Si consiglia di NON aggiornare il firmware tramite wireless.",
                    "Rimuovete tutti i dispositivi di storage USB connessi al router.",
                    "Fate un backup delle impostazioni di configurazione del router."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Durante il processo di aggiornamento:<br>Il router non deve essere disalimentato ne utilizzato."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Per aggiornare il firmware online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Fate clic su Aggiorna e confermate quando richiesto. Il router scaricherà e aggiornerà automaticamente l'ultimo firmware, poi si riavvierà.<br><b>Nota</b>: Dovete prima fare clic su Verifica per verificare se è disponibile un aggiornamento firmware."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Per aggiornare manualmente il firmware"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Visitate www.tp-link.it e scaricate nel vostro computer l'ultimo firmware dalla nostra pagina di supporto. Assicuratevi che la versione del firmware che avete scaricato sia compatibile con la versione hardware del router come mostrato nella pagina.",
                    "Fate clic su <b>Cerca</b> e selezionate il firmware che avete scaricato.",
                    "Fate clic su <b>Aggiorna</b>. L'aggiornamento del firmware richiede pochi minuti per essere completato. Il router verrà riavviato automaticamente quando l'aggiornamento del firmware è stato completato.",
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Prima di aggiornare il firmware del router, dovete scaricare l'ultima versione di firmware da <a href='http://www.tp-link.it/support/download.html'>pagina di download TP-LINK</a> nel vostro computer."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>IMPORTANTE:</B> Per evitare che fallisca l'aggiornamento, annotate ciò che segue:",
                content: [
                    "Assicuratevi che la versione firmware coincida con la versione hardware (come mostrato nella pagina <b>Aggiornamento Firmware</b> ). ",
                    "Assicuratevi di avere una connessione stabile fra il router e il vostro computer. Si consiglia di <b>NON</b> aggiornare il firmware mediante connessione wireless.",
                    "Assicuratevi di rimuovere tutti i dispositivi di storage USB collegati al router prima di aggiornare il firmware per evitare perdite di dati.",
                    "Fate un back up della configurazione del router.",
                    "Non spegnete il router durante l'aggiornamento firmware."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Per aggiornare il firmware del router",
                content: [
                    "Fate clic su <b>Browse</b>.",
                    "Localizzate e selezionate il firmware scaricato.",
                    "Fate clic su <b>Aggiornamento</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Backup",
            CONTENT: [{
                type: "paragraph",
                content: "Si consiglia vivamente di eseguire il backup delle configurazioni correnti, nell'eventualità che sia necessario riportare il sistema a uno stato precedente o ripristinare le impostazioni di fabbrica."
            }, {
                type: "paragraph",
                content: "Fare clic su <b>Backup</b> per salvare le configurazioni correnti sul computer. Verificare di aver salvato il file di backup in un luogo sicuro e facile da ritrovare in caso di un successivo ripristino del router."
            }, {
                type: "title",
                content: "Ripristina"
            }, {
                type: "note",
                title: "Ripristino da un file di backup",
                content: [
                    "Fare clic su <b>Sfoglia</b>.",
                    "Individuare e selezionare il file di backup.",
                    "Fare clic su <b>Ripristina</b>."
                ]
            }, {
                type: "title",
                content: "Ripristino delle impostazioni di fabbrica"
            }, {
                type: "paragraph",
                content: "Fare clic su <b>Ripristino impostazioni di fabbrica</b> per ripristinare le impostazioni di fabbrica del router."
            }, {
                type: "note",
                title: "Nota:",
                content: [
                    "con il ripristino delle impostazioni di fabbrica verranno reimpostate tutte le impostazioni configurate. Dopo aver ripristinato e riavviato il router, creare una nuova password per effettuare nuovamente l'accesso alla pagina di gestione basata sul Web.",
                    "NON spegnere il router durante il processo di backup o di ripristino."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Gestione account",
            CONTENT: [{
                type: "paragraph",
                content: "In questa pagina è possibile modificare la password di accesso."
            }, {
                type: "name",
                title: "Vecchia username",
                content: "Digitare la username corrente."
            }, {
                type: "name",
                title: "Vecchia password",
                content: "Digitare la password corrente."
            }, {
                type: "name",
                title: "Nuova username",
                content: "Digitare il nuova username."
            }, {
                type: "name",
                title: "Nuova password",
                content: "Digitare la nuova password."
            }, {
                type: "name",
                title: "Conferma nuova password",
                content: "Digitare nuovamente la password."
            }, {
                type: "title",
                content: "Gestione locale"
            }, {
                type: "paragraph",
                content: "La funzionalità Gestione locale consente di assegnare l'accesso e la gestione del router a uno specifico dispositivo client presente sulla rete, tramite un'autenticazione basata sull'indirizzo MAC."
            }, {
                type: "name",
                title: "Porta",
                content: "Immettere il numero della porta (compreso tra 1024 e 65535) che verrà usata per accedere al router. Il numero predefinito è 80."
            }, {
                type: "name",
                title: "Indirizzo IP/MAC",
                content: "Immettere un indirizzo MAC o un indirizzo IP locale valido del dispositivo al quale consentire l'accesso al router."
            }, {
                type: "title",
                content: "Gestione remota"
            }, {
                type: "paragraph",
                content: "La funzionalità Gestione remota consente di accedere al router e di configurarlo da remoto tramite Internet."
            }, {
                type: "name",
                title: "Gestione remota",
                content: "Selezionare la casella di controllo per abilitare la funzionalità Gestione remota."
            }, {
                type: "name",
                title: "Porta",
                content: "Immettere il numero della porta (compreso tra 1024 e 65535) che verrà usata per accedere al router in modo più sicuro. Solitamente i browser Web usano la porta 80, ossia la porta standard del protocollo HTTP."
            }, {
                type: "name",
                title: "Indirizzo IP/MAC",
                content: "Immettere un indirizzo MAC o un indirizzo IP remoto al quale consentire l'accesso al router."
            }]
        },
        log: {
            TITLE: "Registro Log",
            CONTENT: [{
                type: "paragraph",
                content: "Nella pagina Registro Log viene visualizzato un elenco delle attività (eventi) più recenti del router. È possibile stabilire quali tipi e/o livelli di log si desidera visualizzare. Questa pagina consente inoltre di esportare il registro log in un computer o di inviarlo automaticamente a uno specifico server remoto tramite il router."
            }, {
                type: "name",
                title: "Tipo",
                content: "Selezionare il tipo di log da visualizzare."
            }, {
                type: "name",
                title: "Livello",
                content: "Selezionare il livello di log da visualizzare."
            }, {
                type: "name",
                title: "Aggiorna",
                content: "Fare clic su questa icona per aggiornare il registro log."
            }, {
                type: "name",
                title: "Elimina tutto",
                content: "Fare clic su questa icona per eliminare tutti i registri log."
            }, {
                type: "name",
                title: "Impostazioni Log",
                content: "Fare clic per configurare le impostazioni del file di log.",
                children: [{
                    type: "name",
                    title: "Salva localmente",
                    content: "Selezionare questa opzione per salvare la cache del registro log nella memoria locale del router. Il registro verrà visualizzato nella tabella della pagina registro log.",
                    children: [{
                        type: "name",
                        title: "Livello minimo",
                        content: "Selezionare dall'elenco a discesa il livello minimo di log da salvare. L'elenco è in ordine decrescente, con il livello più basso riportato per ultimo."
                    }]
                }, {
                    type: "name",
                    title: "Salva in remoto",
                    content: "Selezionare questa opzione per inviare il registro log a un server remoto. Se nel server remoto è implementato un client del Visualizzatore log o uno sniffer, è possibile visualizzare e analizzare il registro log da remoto e in tempo reale.",
                    children: [{
                        type: "name",
                        title: "Livello minimo",
                        content: "Selezionare dall'elenco a discesa il livello minimo di log da salvare. L'elenco è in ordine decrescente, con il livello più basso riportato per ultimo."
                    }, {
                        type: "name",
                        title: "IP server",
                        content: "Specificare l'indirizzo IP del server remoto del registro log."
                    }, {
                        type: "name",
                        title: "Porta server",
                        content: "Specificare il numero di porta del server remoto del registro log."
                    }, {
                        type: "name",
                        title: "Nome struttura locale",
                        content: "Selezionare dall'elenco a discesa il nome della struttura locale del server remoto."
                    }]
                }]
            }, {
                type: "name",
                title: "Salva Log",
                content: "Fare clic su questo pulsante per scaricare tutti i registri log su un computer locale."
            }]
        },
        snmp: {
            TITLE: "Impostazioni SNMP",
            CONTENT: [{
                type: "name",
                title: "Agente SNMP",
                content: "Selezionare Attiva per abilitare l'agente SNMP incorporato, che assegna al router il ruolo operativo nella ricezione ed elaborazione dei messaggi SNMP, nell'invio delle risposte al manager SNMP e nell'attivazione dei messaggi trap SNMP al verificarsi di un evento."
            }, {
                type: "name",
                title: "Comunità sola lettura",
                content: "Visualizza la stringa comunità pubblica predefinita che protegge il router da accessi non autorizzati."
            }, {
                type: "name",
                title: "Comunità scrittura",
                content: "Visualizza la stringa comunità di lettura e scrittura predefinita che protegge il router da modifiche non autorizzate."
            }, {
                type: "name",
                title: "Nome sistema",
                content: "Visualizza il nome assegnato dall'amministratore al dispositivo gestito."
            }, {
                type: "name",
                title: "Descrizione sistema",
                content: "Visualizza la descrizione testuale del dispositivo gestito.  Questo valore deve includere il nome completo e l'identificativo della versione del tipo di hardware del sistema, del sistema operativo e del software di rete."
            }, {
                type: "name",
                title: "Posizione del sistema",
                content: "Visualizza la posizione fisica del dispositivo (ad es. armadietto telefonico, terzo piano).  "
            }, {
                type: "name",
                title: "Contatto di sistema",
                content: "Visualizza l'identificazione testuale del contatto per il dispositivo gestito, nonché le informazioni su come contattarlo."
            }, {
                type: "name",
                title: "IP trap manager",
                content: "Visualizza l'indirizzo IP dell'host che riceve i messaggi trap."
            }]
        },
        stat: {
            TITLE: "Statistiche del traffico",
            CONTENT: [{
                type: "name",
                title: "Statistiche del traffico",
                content: "Selezionare Attiva per abilitare la funzionalità Statistiche del traffico."
            }, {
                type: "title",
                content: "Elenco statistiche del traffico"
            }, {
                type: "name",
                title: "Indirizzo IP/MAC",
                content: "L'indirizzo IP e MAC dei client connessi."
            }, {
                type: "name",
                title: "Totale pacchetti",
                content: "Il numero totale di pacchetti ricevuti e trasmessi dal router."
            }, {
                type: "name",
                title: "Totale byte",
                content: "Il numero totale di byte ricevuti e trasmessi dal router."
            }, {
                type: "name",
                title: "Pacchetti correnti",
                content: "Il numero totale di pacchetti ricevuti e trasmessi in uno specifico intervallo di tempo, espresso in secondi."
            }, {
                type: "name",
                title: "Byte correnti",
                content: "Il numero totale di byte ricevuti e trasmessi in uno specifico intervallo di tempo, espresso in secondi."
            }, {
                type: "name",
                title: "ICMP Tx corrente",
                content: "Visualizza la velocità corrente di trasmissione dei pacchetti ICMP trasmessi attraverso la porta WAN rispetto alla velocità massima di trasmissione al secondo."
            }, {
                type: "name",
                title: "UDP Tx corrente",
                content: "Visualizza la velocità corrente di trasmissione dei pacchetti UDP trasmessi attraverso la porta WAN rispetto alla velocità massima di trasmissione al secondo."
            }, {
                type: "name",
                title: "SYN Tx corrente",
                content: "Visualizza la velocità corrente di trasmissione dei pacchetti TCP SYN trasmessi attraverso la porta WAN rispetto alla velocità massima di trasmissione al secondo."
            }, {
                type: "name",
                title: "Modifica",
                content: "Fare clic sull'icona <b>Cestino</b> per eliminare le statistiche corrispondenti."
            }, {
                type: "name",
                title: "Aggiorna",
                content: "Fare clic per aggiornare le informazioni statistiche della pagina."
            }, {
                type: "name",
                title: "Reimposta",
                content: "Fare clic per azzerare tutti i valori statistici dell'elenco."
            }, {
                type: "name",
                title: "Elimina tutto",
                content: "Fare clic per eliminare tutte le informazioni statistiche dell'elenco."
            }]
        },
        ethWan: {
            TITLE: "Interfaccia WAN",
            CONTENT: [{
                    type: "title2",
                    content: "Tipo di connessione: IP dinamico"
                }, {
                    type: "name",
                    title: "IP dinamico",
                    content: "Selezionare questa tipologia se la connessione viene fornita dal provider ISP tramite un server DHCP."
                }, {
                    type: "name",
                    title: "Indirizzo IP/Subnet mask/Gateway/Gateway predefinito",
                    content: "Questi parametri vengono assegnati automaticamente dal server DHCP del provider ISP."
                }, {
                    type: "name",
                    title: "Rinnova/Rilascia",
                    content: "Fare clic su questo pulsante per rinnovare/rilasciare i parametri IP del provider ISP."
                }, {
                    type: "name",
                    title: "Avanzate",
                    children: [{
                        type: "name",
                        title: "Dimensioni MTU (in byte)",
                        content: "Le dimensioni predefinite della MTU (unità massima di trasmissione) della maggior parte delle reti Ethernet corrispondono a <b>1500 byte</b>. Si sconsiglia di modificare le dimensioni predefinite della MTU, a meno che non sia richiesto dal provider ISP."
                    }, {
                        type: "name",
                        title: "Proxy IGMP",
                        content: "IGMP (Internet Group Management Protocol) è un protocollo per la gestione dei gruppi multicast sulle reti TCP/IP. Alcuni provider ISP usano IMGP per eseguire la configurazione remota dei router. È abilitato per impostazione predefinita."
                    }, {
                        type: "name",
                        title: "Ottieni IP via DHCP Unicast",
                        content: "Selezionare questa casella di controllo se il server DHCP del provider ISP non supporta applicazioni di trasmissione e non è possibile ottenere l'indirizzo IP in modo dinamico."
                    }, {
                        type: "name",
                        title: "Usa il seguente indirizzo DNS",
                        content: "Selezionare questa casella di controllo e immettere in notazione decimale puntata gli indirizzi dei server DNS forniti dal provider ISP. Questa interfaccia WAN userà con priorità il server DNS specificato."
                    }, {
                        type: "name",
                        title: "Nome host",
                        content: "Immettere il nome host di questa interfaccia WAN."
                    }]
                }, {
                    type: "title2",
                    content: "Tipo di connessione: IP statico"
                }, {
                    type: "name",
                    title: "IP statico",
                    content: "Selezionare questa tipologia se l'indirizzo IP, la subnet mask, il gateway e i parametri DNS forniti dal provider ISP sono fissi e determinati."
                }, {
                    type: "name",
                    title: "Indirizzo IP/Subnet mask/Gateway/Server DNS/Server DNS secondario",
                    content: "Immettere le informazioni IP fornite dal provider ISP in notazione decimale puntata."
                }, {
                    type: "paragraph",
                    content: "Fare clic su <b>Avanzate</b> per visualizzare le impostazioni avanzate."
                }, {
                    type: "name",
                    title: "Avanzate",
                    children: [{
                        type: "name",
                        title: "Dimensioni MTU (in byte)",
                        content: "Le dimensioni predefinite della MTU (unità massima di trasmissione) della maggior parte delle reti Ethernet corrispondono a <b>1500 byte</b>. Si sconsiglia di modificare le dimensioni predefinite della MTU, a meno che non sia richiesto dal provider ISP."
                    }, {
                        type: "name",
                        title: "Proxy IGMP",
                        content: "IGMP (Internet Group Management Protocol) è un protocollo per la gestione dei gruppi multicast sulle reti TCP/IP. Alcuni provider ISP usano IMGP per eseguire la configurazione remota dei router. È abilitato per impostazione predefinita."
                    }]
                }, {
                    type: "title2",
                    content: "Tipo di connessione: PPPoE"
                }, {
                    type: "name",
                    title: "PPPoE",
                    content: "Selezionare questa tipologia se si utilizza un servizio DSL (Digital Subscriber Line) e la username e la password sono forniti dal provider ISP."
                }, {
                    type: "name",
                    title: "Nome utente PPPoE/Password PPPoE/Conferma password",
                    content: "Immettere la username e la password forniti dal provider ISP. Questi campi sono sensibili all'uso di caratteri maiuscoli/minuscoli."
                }, {
                    type: "name",
                    title: "Connessione secondaria",
                    content: "È disponibile solo per la connessione PPPoE. Se il provider ISP fornisce un tipo supplementare di connessione, ad esempio un IP dinamico/statico per una rete locale, è possibile selezionare il pulsante radio dell'IP dinamico/statico per attivare la connessione secondaria.<br>Per impostazione predefinita la connessione secondaria è disabilitata ed è disponibile solo la connessione PPPoE. Abilitarla solo se necessario."
                }, {
                    type: "name",
                    title: "Modalità di connessione",
                    content: "Selezionare una delle seguenti modalità di connessione a Internet:",
                    children: [{
                        type: "name",
                        title: "Sempre",
                        content: "Selezionare questa modalità per riconnettersi automaticamente quando la connessione viene interrotta."
                    }, {
                        type: "name",
                        title: "Connessione su richiesta",
                        content: "Selezionare questa modalità per interrompere la connessione Internet dopo uno specifico periodo di inattività (tempo di inattività massimo). La connessione viene ristabilita quando si prova nuovamente ad accedere a Internet."
                    }, {
                        type: "name",
                        title: "Connessione manuale",
                        content: "Selezionare questa modalità per stabilire o interrompere la connessione Internet manualmente o dopo uno specifico periodo di inattività (tempo di inattività massimo)."
                    }, {
                        type: "name",
                        title: "Tempo di inattività massimo",
                        content: "<b>15 minuti</b> - Immettere il numero di minuti di inattività trascorsi i quali la connessione Internet viene interrotta. Il tempo di inattività predefinito è 15 minuti."
                    }]
                }, {
                    type: "name",
                    title: "Tipo di autenticazione",
                    content: "Selezionare un tipo di autenticazione dall'elenco a discesa. Il metodo predefinito è AUTO_AUTH."
                }, {
                    type: "name",
                    title: "Connetti/Disconnetti",
                    content: "Fare clic per connettersi/disconnettersi immediatamente."
                }, {
                    type: "paragraph",
                    content: "Fare clic su <b>Avanzate</b> per visualizzare le impostazioni avanzate."
                }, {
                    type: "name",
                    title: "Avanzate",
                    children: [{
                        type: "name",
                        title: "Nome servizio",
                        content: "Immettere il nome del servizio fornito dal provider ISP. Se non è stato fornito, lasciare vuoto questo campo."
                    }, {
                        type: "name",
                        title: "Nome server",
                        content: "Immettere il nome del server fornito dal provider ISP. Se non è stato fornito, lasciare vuoto questo campo."
                    }, {
                        type: "name",
                        title: "Dimensioni MTU (in byte)",
                        content: "Le dimensioni della MTU (unità massima di trasmissione) utilizzate solitamente dalle reti Ethernet corrispondono a 1480 byte.",
                        children: [{
                            type: "paragraph",
                            content: "<b>Nota</b>: In alcuni rari casi il provider ISP può richiedere di regolare le dimensioni della MTU al fine di migliorare le prestazioni della rete. Modificare questo valore solo se assolutamente necessario."
                        }]
                    }, {
                        type: "name",
                        title: "Proxy IGMP",
                        content: "IGMP (Internet Group Management Protocol) è un protocollo per la gestione dei gruppi multicast sulle reti TCP/IP. Alcuni provider ISP usano IMGP per eseguire la configurazione remota dei router. È abilitato per impostazione predefinita."
                    }, {
                        type: "name",
                        title: "Usa l'IP specificato dall'ISP",
                        content: "Selezionare questa opzione e immettere l'indirizzo IP fornito dal provider ISP."
                    }, {
                        type: "name",
                        title: "Intervallo richieste echo",
                        content: "Immettere un valore compreso tra 0 e 120 (secondi), che rappresenta l'intervallo di tempo in base al quale il router invia una richiesta echo al concentratore di accesso. Il valore predefinito è 30. 0 corrisponde a nessun rilevamento."
                    }, {
                        type: "name",
                        title: "Usa il seguente indirizzo DNS",
                        content: "Selezionare questa casella di controllo e immettere in notazione decimale puntata gli indirizzi dei server DNS forniti dal provider ISP. Questa interfaccia WAN userà con priorità il server DNS specificato."
                    }]
                }, {
                    type: "title2",
                    content: "Tipo di connessione: L2TP/PPTP"
                }, {
                    type: "name",
                    title: "L2TP/PPTP",
                    content: "Selezionare questa tipologia se ci si connette a un server VPN L2TP/PPTP e la username, la password e l'indirizzo IP/nome di dominio del server sono forniti dal provider ISP."
                }, {
                    type: "name",
                    title: "Nome utente/Password",
                    content: "Immettere la username e la password forniti dal provider ISP. Questi campi sono sensibili all'uso di caratteri maiuscoli/minuscoli."
                }, {
                    type: "name",
                    title: "Indirizzo IP/DNS primario",
                    content: "Questi parametri verranno assegnati automaticamente al server DHCP da parte del provider ISP."
                }, {
                    type: "name",
                    title: "Connessione secondaria (IP dinamico o IP statico)",
                    children: [{
                        type: "name",
                        title: "IP dinamico",
                        content: "Selezionare questa opzione se l'indirizzo IP e la subnet mask sono assegnati automaticamente dal provider ISP."
                    }, {
                        type: "name",
                        title: "IP statico",
                        content: "Se l'indirizzo IP, la subnet mask, il gateway e gli indirizzi DSN sono forniti dal provider ISP, selezionare questa opzione e immettere le relative informazioni nei campi corrispondenti."
                    }]
                }, {
                    type: "name",
                    title: "IP server VPN/Nome di dominio",
                    content: "Immettere l'indirizzo IP o il nome di dominio del server VPN fornito dal provider ISP."
                }, {
                    type: "name",
                    title: "Dimensioni MTU",
                    content: "Le dimensioni predefinite della MTU (unità massima di trasmissione) della maggior parte delle reti Ethernet corrispondono a 1460 byte (1420 per PPTP). Non modificare le dimensioni predefinite della MTU, a meno che non sia richiesto dal provider ISP."
                }, {
                    type: "name",
                    title: "Modalità di connessione",
                    content: "Selezionare la modalità appropriata di connessione a Internet.",
                    children: [{
                        type: "name",
                        title: "Sempre attiva",
                        content: "In questa modalità, la connessione Internet si riconnette automaticamente ogni volta che viene interrotta."
                    }, {
                        type: "name",
                        title: "Connessione su richiesta",
                        content: "In questa modalità la connessione Internet viene interrotta automaticamente una volta trascorso un determinato periodo di inattività (tempo di inattività massimo). La connessione viene ristabilita quando si prova nuovamente ad accedere a Internet."
                    }, {
                        type: "name",
                        title: "Connessione manuale",
                        content: "In questa modalità è possibile controllare manualmente la connessione Internet tramite il pulsante Connetti o Disconnetti. Anche questa modalità supporta la funzione Tempo di inattività massimo. Immettere un tempo di inattività massimo (in minuti) per specificare il periodo massimo di inattività prima dell'interruzione della connessione Internet. Il valore predefinito è 15 minuti. Se si desidera che la connessione Internet rimanga sempre attiva, immettere il valore 0 (zero)."
                    }]
                }, {
                    type: "title",
                    content: "MAC Clone"
                }, {
                    type: "name",
                    title: "Usa indirizzo MAC predefinito",
                    content: "Selezionare questa opzione per usare l'indirizzo MAC predefinito quando il provider ISP non ha assegnato un indirizzo IP all'indirizzo MAC del router."
                }, {
                    type: "name",
                    title: "Usa indirizzo MAC computer corrente",
                    content: "Selezionare questa opzione per usare l'indirizzo MAC del computer attualmente connesso quando il provider ISP consente solo a questo computer di accedere a Internet."
                }, {
                    type: "name",
                    title: "Usa indirizzo MAC personalizzato",
                    content: "Selezionare questa opzione per immettere manualmente l'indirizzo MAC registrato."
                }

            ]
        },
        route: {
            TITLE: "Routing avanzato",
            CONTENT: [{
                    type: "paragraph",
                    content: "La funzionalità Routing avanzato consente di prestabilire una route fissa per la trasmissione dei pacchetti di informazioni della rete a una rete o un host specifico."
                }, {
                    type: "title",
                    content: "Routing statico"
                }, {
                    type: "name",
                    title: "Indirizzo IP di destinazione/Subnet mask/Gateway",
                    content: "Visualizza l'indirizzo IP di destinazione, la subnet mask e il gateway della route statica."
                }, {
                    type: "name",
                    title: "Abilita",
                    content: "Indica lo stato corrente di una route statica. Fare clic sull'icona <b>Lampadina</b> per abilitare (o disabilitare) la route statica."
                }, {
                    type: "name",
                    title: "Modifica",
                    content: "Visualizza le opzioni relative alla <b>modifica</b> o all'<b>eliminazione</b> della voce corrispondente."
                }, {
                    type: "note",
                    title: "Configurazione del routing statico",
                    content: [
                        "Fare clic su <b>Aggiungi</b>.",
                        "Immettere un indirizzo IP di destinazione per assegnare la route statica relativa a questa voce.",
                        "Immettere una subnet mask in formato esadecimale per stabilire la parte dell'indirizzo IP che definisce la rete e quella che definisce l'host.",
                        "Immettere un formato di indirizzo IP del gateway per connettere il router alla rete o all'host.",
                        "Selezionare <b>LAN</b> o un'interfaccia WAN per specificare il tipo di indirizzo IP di destinazione.",
                        "Selezionare <b>Abilita questa voce</b>.",
                        "Fare clic su <b>OK</b>."
                    ]
                }, {
                    type: "title",
                    content: "Tabella routing di sistema"
                }, {
                    type: "paragraph",
                    content: "Nella tabella di routing di sistema vengono visualizzate tutte le route valide attualmente in uso."
                }, {
                    type: "paragraph",
                    content: "Fare clic su Aggiorna per aggiornare la tabella di routing."
                }

            ]
        },
        ddns: {
            TITLE: "Impostazioni DNS dinamico",
            CONTENT: [{
                    type: "paragraph",
                    content: "Il DNS (Domain Name System) dinamico consente di assegnare un nome di dominio e un host fisso a un indirizzo IP Internet dinamico. Questa funzionalità è molto utile per l'hosting di siti Web, di server FTP o di un altro server dietro il router. Per prima cosa occorre registrarsi tramite un provider di servizi DDNS come <a href='http://www.dyndns.com'>www.dyndns.com</a>."
                }, {
                    type: "name",
                    title: "Provider di servizi",
                    content: "Selezionare il proprio provider di servizi DDNS. Se non si dispone di un account DDNS, fare clic su <b>Registrarsi</b>"
                }, {
                    type: "name",
                    title: "Nome utente/Password",
                    content: "Immettere la username e la password dell'account DDNS."
                }, {
                    type: "name",
                    title: "Nome di dominio",
                    content: "Immettere il nome di dominio fornito dal provider di servizi DDNS."
                }, {
                    type: "name",
                    title: "Accedi/Disconnetti",
                    content: "Fare clic per accedere al servizio DDNS o disconnettersi da esso."
                }, {
                    type: "name",
                    title: "Salva",
                    content: "Fare clic per salvare tutte le impostazioni."
                }, {
                    type: "paragraph",
                    content: "Per passare da un account DDNS a un altro, fare clic su Disconnetti per uscire dall'account corrente, quindi accedere nuovamente con una account diverso."
                }


            ]
        },
        dhcp: {
            TITLE: "Server DHCP",
            CONTENT: [{
                type: "paragraph",
                content: "Il server DHCP (Dynamic Host Configuration Protocol) assegna in modo dinamico la configurazione TCP/IP ai dispositivi client da un pool di indirizzi IP. NON disabilitare il server DHCP predefinito, a meno che si disponga di un altro server DHCP o si desideri assegnare manualmente la configurazione TCP/IP a singoli client sulla rete."
            }, {
                type: "name",
                title: "Pool di indirizzi IP",
                content: "Immettere l'intervallo di indirizzi IP da assegnare in lease ai client."
            }, {
                type: "name",
                title: "Tempo di lease indirizzo",
                content: "Immettere la durata dell'assegnazione in lease di un indirizzo IP al client (da 1 a 2880 minuti)."
            }, {
                type: "name",
                title: "Gateway predefinito",
                content: "Immettere l'indirizzo IP della LAN. (facoltativo)"
            }, {
                type: "name",
                title: "Server DNS/Server DNS secondario",
                content: "Immettere gli indirizzi dei server DNS forniti dal provider ISP. (facoltativo)"
            }, {
                type: "title",
                content: "Elenco client"
            }, {
                type: "name",
                title: "Client totali",
                content: "Visualizza il numero totale di client DHCP associati."
            }, {
                type: "name",
                title: "Nome client",
                content: "Visualizza il nome del client DHCP."
            }, {
                type: "name",
                title: "Indirizzo MAC",
                content: "Visualizza l'indirizzo MAC."
            }, {
                type: "name",
                title: "Indirizzo IP assegnato",
                content: "Visualizza l'indirizzo IP allocato al client dal server DHCP."
            }, {
                type: "name",
                title: "Tempo di lease",
                content: "Visualizza la durata dell'indirizzo IP assegnato in lease al client."
            }, {
                type: "name",
                title: "Aggiorna",
                content: "Fare clic per aggiornare l'elenco dei client DHCP."
            }, {
                type: "title",
                content: "Prenotazione dell'indirizzo"
            }, {
                type: "paragraph",
                content: "È possibile prenotare manualmente un indirizzo IP per un client connesso al router. Una volta prenotato, l'indirizzo IP verrà assegnato dal server DHCP solamente allo stesso client."
            }, {
                type: "name",
                title: "Indirizzo MAC",
                content: "Visualizza l'indirizzo MAC del client con l'indirizzo IP prenotato da DHCP."
            }, {
                type: "name",
                title: "Indirizzo IP prenotato",
                content: "Visualizza l'indirizzo IP prenotato del client."
            }, {
                type: "name",
                title: "Descrizione",
                content: "Visualizza la descrizione del dispositivo."
            }, {
                type: "name",
                title: "Abilita",
                content: "Fare clic per abilitare o disabilitare la voce corrispondente."
            }, {
                type: "name",
                title: "Modifica",
                content: "Visualizza le opzioni relative alla <b>modifica</b> o all'<b>eliminazione</b> del client corrispondente."
            }, {
                type: "note",
                title: "Prenotazione di un indirizzo IP per un client DHCP",
                content: [
                    "Fare clic su <b>Aggiungi</b>.",
                    "Immettere l'<b>indirizzo MAC</b> del client.",
                    "Immettere l'indirizzo IP che si desidera prenotare per il client.",
                    "Immettere la descrizione del dispositivo.",
                    "Selezionare <b>Abilita questa voce</b>.",
                    "Fare clic su <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "Modificare o eliminare un client esistente",
                content: [
                    "Fare clic su <b>Modifica</b> o sull'icona <b>Cestino</b> nella voce corrispondente."
                ]
            }, {
                type: "title",
                content: "Pool di condizioni"
            }, {
                type: "name",
                title: "ID fornitore/Indirizzo IP iniziale/Indirizzo IP finale/Struttura",
                content: "Visualizza l'ID fornitore, l'indirizzo IP iniziale, l'indirizzo IP finale e la struttura del pool di condizioni."
            }, {
                type: "name",
                title: "Stato",
                content: "Indica lo stato corrente del pool di condizioni. Fare clic sull'icona Lampadina per abilitare (o disabilitare) il pool di condizioni."
            }, {
                type: "name",
                title: "Modifica",
                content: "Visualizza le opzioni relative alla <b>modifica</b> o all'<b>eliminazione</b> del client corrispondente."
            }, {
                type: "note",
                title: "Aggiunta di un pool di condizioni",
                content: [
                    "Fare clic su <b>Aggiungi</b>.",
                    "Immettere il nome del dispositivo LAN.",
                    "Immettere un valore per identificare il fornitore e la funzionalità del client DHCP.",
                    "Immettere l'indirizzo IP iniziale assegnato ai client dal server DHCP.",
                    "Immettere l'indirizzo IP finale assegnato ai client dal server DHCP.",
                    "Immettere il gateway predefinito del server DHCP.",
                    "Selezionare un tipo di dispositivo dall'elenco a discesa.",
                    "Selezionare un'opzione dall'elenco a discesa.",
                    "Immettere un valore opzione.",
                    "Selezionare <b>Abilita questa voce</b>.",
                    "Fare clic su <b>OK</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "Impostazioni IPTV",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "Selezionare questa opzione per abilitare la funzionalità IPTV."
            }, {
                type: "name",
                title: "Modalità",
                content: "Selezionare la modalità corretta in base al provider ISP. Esistono sei modalità IPTV:",
                children: [{
                    type: "name",
                    title: "Bridge",
                    content: "Selezionare questa modalità se il sistema IPTV non è presente nell'elenco e non ci sono altri parametri prestabiliti.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Assegnare alla porta LAN la funzione di fornitore Internet o fornitore IPTV."
                    }]
                }, {
                    /*type: "name",
                    title: "Russia",
                    content: "Selezionare questa opzione se il provider ISP è russo e i parametri necessari sono prestabiliti, inclusi Internet/IP-Telefono/ID VLAN IPTV e Priorità, nonché Porta LAN (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "ID VLAN IPTV Multicast/Priorità",
                        content: "È possibile abilitare la funzionalità IPTV multicast nel modo desiderato e configurare l'ID VLAN e la priorità in base all'ISP."
                    }]
                }, {*/
                    type: "name",
                    title: "Singapore-ExStream",
                    content: "Selezionare questa opzione se il provider ISP è ExStream (Singapore) e i parametri necessari sono prestabiliti, inclusi Internet/ID VLAN IPTV e Priorità, nonché Porta LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malesia-Unifi",
                    content: "Selezionare questa opzione se il provider ISP è Unifi (Malesia) e i parametri necessari sono prestabiliti, inclusi Internet/ID VLAN IPTV e Priorità, nonché Porta LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Malesia-Maxis",
                    content: "Selezionare questa opzione se il provider ISP è Maxis (Malesia) e i parametri necessari sono prestabiliti, inclusi Internet/IP-Telefono/ID VLAN IPTV e Priorità, nonché Porta LAN (1/2/3/4)."
                }, {
                    type: "name",
                    title: "Personalizzato",
                    content: "Selezionare questa opzione se il provider ISP non è presente nell'elenco ma fornisce i parametri necessari, inclusi Internet/IP-Telefono/ID VLAN IPTV e Priorità, nonché Porta LAN (1/2/3/4).",
                    children: [{
                        type: "name",
                        title: "Internet/IP-Telefono/ID VLAN IPTV/Priorità",
                        content: "Configurare gli ID VLAN in base a quelli forniti dal provider ISP."
                    }, {
                        type: "name",
                        title: "Tag 802.11Q",
                        content: "Selezionare se assegnare un tag ai pacchetti Internet con 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "Assegnare alla porta LAN la funzione di fornitore Internet o fornitore IPTV."
                    }, {
                        type: "name",
                        title: "ID VLAN IPTV Multicast/Priorità",
                        content: "È possibile abilitare la funzionalità IPTV multicast nel modo desiderato e configurare l'ID VLAN e la priorità in base all'ISP."
                    }]
                }]
            }, {
                type: "name",
                title: "Proxy IGMP",
                content: "Selezionare la versione V2 o V3 del proxy IGMP (Internet Group Management Protocol) in base al provider ISP."
            }]
        },
        usbManage: {
            TITLE: "Dispositivo di archiviazione USB",
            CONTENT: [{
                type: "paragraph",
                content: "Nella schermata <b>Dispositivo di archiviazione USB</b> vengono visualizzate le informazioni di base del dispositivo di archiviazione USB connesso tramite la porta USB."
            }, {
                type: "name",
                title: "Scansione",
                content: "Solitamente il router rileva automaticamente qualsiasi nuovo dispositivo connesso. Se ciò non avviene, fare clic su questo pulsante per eseguire una scansione e visualizzare le informazioni aggiornate nella schermata."
            }, {
                type: "name",
                title: "Nome volume",
                content: "Visualizza il nome del volume USB."
            }, {
                type: "name",
                title: "Capacità",
                content: "Visualizza la capacità totale di archiviazione del dispositivo USB."
            }, {
                type: "name",
                title: "Spazio disponibile",
                content: "Visualizza lo spazio di archiviazione attualmente disponibile."
            }, {
                type: "name",
                title: "Attivo",
                content: "Questa casella di controllo viene visualizzata solo quando un dispositivo di archiviazione USB viene connesso al router. Selezionarla per abilitare la condivisone dei file del dispositivo USB."
            }, {
                type: "name",
                title: "Rimozione sicura",
                content: "Fare clic su questo pulsante per smontare in modo sicuro il dispositivo di archiviazione USB prima di scollegarlo fisicamente dal router. Il pulsante Rimozione sicura viene visualizzato solo quando un dispositivo di archiviazione USB è connesso al router. Non è inoltre possibile smontare dispositivi USB ancora in uso."
            }, {
                type: "title",
                content: "Impostazioni condivisione"
            }, {
                type: "name",
                title: "Nome rete/server multimediale",
                content: "Visualizza il nome usato per accedere al dispositivo di archiviazione USB connesso."
            }, {
                type: "title",
                content: "Condivisione cartelle"
            }, {
                type: "name",
                title: "Condividi tutto",
                content: "Selezionare On per condividere tutti i file e le cartelle o Spento per condividere solo le cartelle selezionate."
            }, {
                type: "name",
                title: "Abilita autenticazione",
                content: "Selezionare On per abilitare l'autenticazione, in base alla quale gli utenti devono immettere un nome utente e una password validi per accedere alle cartelle condivise."
            }, {
                type: "name",
                title: "Nome cartella",
                content: "Visualizza il nome della cartella condivisa. "
            }, {
                type: "name",
                title: "Percorso cartella",
                content: "Visualizza il percorso della cartella condivisa. "
            }, {
                type: "name",
                title: "Nome volume",
                content: "Visualizza il nome del volume condiviso."
            }]
        },
        printSrv: {
            TITLE: "Print Server",
            CONTENT: [{
                type: "name",
                title: "Abilita print server",
                content: "Selezionare On per abilitare la funzione Print Server."
            }, {
                type: "name",
                title: "Nome stampante",
                content: "Visualizza il nome della stampante connessa al router."
            }]
        },
        diskSettings: {
            TITLE: "Dispositivo di archiviazione USB",
            CONTENT: [{
                type: "paragraph",
                content: "Nella schermata <b>Dispositivo di archiviazione USB</b> vengono visualizzate le informazioni di base del dispositivo di archiviazione USB connesso tramite la porta USB."
            }, {
                type: "name",
                title: "Scansione",
                content: "Solitamente il router rileva automaticamente qualsiasi nuovo dispositivo connesso. Se ciò non avviene, fare clic su questo pulsante per eseguire una scansione e visualizzare le informazioni aggiornate nella schermata."
            }, {
                type: "name",
                title: "Nome volume",
                content: "Visualizza il nome del volume USB."
            }, {
                type: "name",
                title: "Capacità",
                content: "Visualizza la capacità totale di archiviazione del dispositivo USB."
            }, {
                type: "name",
                title: "Spazio disponibile",
                content: "Visualizza lo spazio di archiviazione attualmente disponibile."
            }, {
                type: "name",
                title: "Attivo",
                content: "Questa casella di controllo viene visualizzata solo quando un dispositivo di archiviazione USB viene connesso al router. Selezionarla per abilitare la condivisone dei file del dispositivo USB."
            }, {
                type: "name",
                title: "Rimozione sicura",
                content: "Fare clic su questo pulsante per smontare in modo sicuro il dispositivo di archiviazione USB prima di scollegarlo fisicamente dal router. Il pulsante Rimozione sicura viene visualizzato solo quando un dispositivo di archiviazione USB è connesso al router. Non è inoltre possibile smontare il dispositivo USB quando il volume corrente è occupato."
            }, {
                type: "note",
                title: "Configurazione del file server",
                content: [
                    "Collegare il dispositivo di archiviazione USB alla porta USB del router tramite un cavo USB.",
                    "Il dispositivo USB collegato dovrebbe essere automaticamente rilevato dal router e le relative informazioni dovrebbero venire visualizzate nella sezione <b>Impostazioni dispositivo</b>. In caso contrario, fare clic su <b>Scansione</b>.",
                    "Fare clic sull'icona <b>Attiva</b> per abilitare la condivisione dei file."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Account di condivisione",
            CONTENT: [{
                type: "name",
                title: "Account",
                content: "Selezionare <b>Usa account predefinito</b> per accedere alle cartelle e ai file condivisi o selezionare <b>Usa nuovo account</b> e immettere le voci riportate di seguito per creare un nuovo account."
            }, {
                type: "name",
                title: "Nome utente/Password",
                content: "Immettere fino a 15 caratteri composti da lettere, numeri e/o caratteri di sottolineatura. La username deve iniziare con una lettera. Questi campi sono sensibili all'uso di caratteri maiuscoli/minuscoli. "
            }, {
                type: "paragraph",
                content: "Fare clic su <b>Salva</b> per salvare le impostazioni avanzate."
            }, {
                type: "title",
                content: "Impostazioni condivisione"
            }, {
                type: "name",
                title: "Nome rete/server multimediale",
                content: "Visualizza il nome usato per accedere al dispositivo di archiviazione USB connesso."
            }, {
                type: "name",
                title: "Abilita",
                content: "Selezionare una o più caselle di controllo per abilitare i metodi di accesso corrispondenti."
            }, {
                type: "name",
                title: "Metodo di accesso",
                content: "Esistono quattro metodi di accesso al dispositivo di archiviazione USB condiviso.",
                children: [{
                    type: "name",
                    title: "Server multimediale",
                    content: "Selezionare questa opzione per consentire agli utenti della rete di visualizzare le fotografie, ascoltare la musica e assistere ai film presenti nel dispositivo di archiviazione USB condiviso tramite dispositivi supportati da DLNA, come computer, dispositivi mobili e console per videogiochi (PS2/3)."
                }, {
                    type: "name",
                    title: "Risorse di rete",
                    content: "Selezionare questa opzione per consentire agli utenti della rete di accedere ai contenuti condivisi attraverso l'indirizzo visualizzato nella colonna Indirizzo."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Selezionare questa opzione per abilitare la funzionalità del server FTP, che consente ai client e agli utenti FTP della rete di accedere al dispositivo di archiviazione USB attraverso l'indirizzo FTP visualizzato nella colonna Indirizzo. Per modificare la porta del server FTP, immettere un nuovo numero di porta e fare clic su <b>Salva</b> per applicare le modifiche."
                }, {
                    type: "name",
                    title: "FTP (via Internet)",
                    content: "Selezionare questa opzione per consentire ai client e agli utenti FTP di accedere e di scaricare e caricare file da remoto nel dispositivo di archiviazione USB attraverso FTP tramite Internet."
                }]
            }, {
                type: "name",
                title: "Accesso",
                content: "Visualizza l'indirizzo usato per accedere al dispositivo di archiviazione USB condiviso."
            }, {
                type: "name",
                title: "Porta",
                content: "Immettere il numero di porta del server FTP."
            }, {
                type: "title",
                content: "Condivisione cartelle"
            }, {
                type: "name",
                title: "Condividi tutto",
                content: "Selezionare On per condividere tutti i file e le cartelle o Spento per condividere solo le cartelle selezionate."
            }, {
                type: "name",
                title: "Abilita autenticazione",
                content: "Selezionare On per abilitare l'autenticazione, in base alla quale gli utenti devono immettere un nome utente e una password validi per accedere alle cartelle condivise."
            }, {
                type: "name",
                title: "Nome cartella",
                content: "Visualizza il nome della cartella condivisa. "
            }, {
                type: "name",
                title: "Percorso cartella",
                content: "Visualizza il percorso della cartella condivisa. "
            }, {
                type: "name",
                title: "Condivisione file multimediali",
                content: "Visualizza se la funzione di Condivisione file multimediali è abilitata (On) o disabilitata (Spento)."
            }, {
                type: "name",
                title: "Nome volume",
                content: "Visualizza il nome del volume condiviso."
            }, {
                type: "name",
                title: "Stato",
                content: "Indica lo stato corrente di una cartella condivisa. Fare clic sull'icona Lampadina per abilitare (o disabilitare) la cartella condivisa."
            }, {
                type: "name",
                title: "Modifica",
                content: "Visualizza le opzioni relative alla <b>modifica</b> o all'<b>eliminazione</b> della cartella condivisa."
            }, {
                type: "note",
                title: "Per aggiungere una voce di condivisione cartella:",
                content: [
                    "Impostare <b>Seleziona tutto</b> su Spento.",
                    "Fare clic su <b>Aggiungi</b>.",
                    "Selezionare il <b>Nome volume</b> e il <b>Percorso cartella</b>.",
                    "Creare un nome cartella.",
                    "Scegliere la modalità di condivisione della cartella: <br /><b>Abilita autenticazione</b> - Selezionare questa opzione per richiedere agli utenti di autenticarsi tramite un nome utente e una password per accedere alle cartelle condivise<br /><b>Abilita accesso in scrittura</b> - Selezionare questa opzione per consentire agli utenti di modificare il contenuto delle cartelle.<br /><b>Abilita condivisione file multimediali</b> - Selezionare questa opzione per abilitare la condivisione di file multimediali.<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "Impostazioni IPSec",
            CONTENT: [{
                    type: "name",
                    title: "Dead Peer Detection",
                    content: "Il Dead Peer Detection (DPD) è un metodo usato per rilevare i peer IKE (Internet Key Exchange) inattivi. Il metodo DPD viene usato per recuperare le risorse perse quando un peer risulta inattivo, nonché per eseguire il failover dei peer IKE. Selezionare On per abilitare la funzionalità Dead Peer Detection."
                }, {
                    type: "name",
                    title: "Nome connessione/Gateway remoto/Indirizzo locale/Indirizzo remoto",
                    content: "Visualizza il nome connessione, il gateway remoto, l'indirizzo locale e l'indirizzo remoto della voce IPSec."
                }, {
                    type: "name",
                    title: "Stato",
                    content: "Visualizza lo stato della voce IPSec. Lo stato può essere:",
                    children: [{
                        type: "name",
                        title: "Disabilitata",
                        content: "La voce è disabilitata."
                    }, {
                        type: "name",
                        title: "Non attiva",
                        content: "La voce è abilitata, ma non è presente una connessione."
                    }, {
                        type: "name",
                        title: "Attiva",
                        content: "La voce è abilitata e la connessione è riuscita. "
                    }]
                }, {
                    type: "name",
                    title: "Abilita",
                    content: "Fare clic sull'icona <b>Lampadina</b> per abilitare (o disabilitare) la voce."
                }, {
                    type: "name",
                    title: "Modifica",
                    content: "Visualizza le opzioni relative alla <b>modifica</b> o all'<b>eliminazione</b> della voce corrispondente."
                }, {
                    type: "name",
                    title: "Aggiungi",
                    content: "Fare clic per aggiungere una nuova connessione IPSec VPN."
                }, {
                    type: "name",
                    title: "Nome connessione IPSec",
                    content: "Immettere un nome per la connessione IPSec VPN."
                }, {
                    type: "name",
                    title: "Indirizzo gateway IPSec remoto (URL)",
                    content: "Immettere l'indirizzo IP del gateway di destinazione che corrisponde all'IP WAN pubblico o al nome di dominio dell'endpoint server VPN remoto."
                }, {
                    type: "name",
                    title: "Instradare l'accesso da indirizzi IP locali",
                    content: "Selezionare Indirizzo sottorete se si desidera aggiungere l'intera LAN alla rete VPN o Indirizzo singolo se si desidera aggiungere un singolo IP alla rete VPN."
                }, {
                    type: "name",
                    title: "Indirizzo IP per VPN",
                    content: "Immettere l'indirizzo IP della LAN. "
                }, {
                    type: "name",
                    title: "Subnet mask IP",
                    content: "Immettere la subnet mask della LAN."
                }, {
                    type: "name",
                    title: "Instradare l'accesso da indirizzi IP remoti",
                    content: "Selezionare Indirizzo sottorete se si desidera aggiungere tutta la LAN remota alla rete VPN o Indirizzo singolo se si desidera aggiungere un singolo IP alla rete VPN."
                }, {
                    type: "name",
                    title: "Indirizzo IP per VPN",
                    content: "Immettere l'indirizzo IP della LAN remota. "
                }, {
                    type: "name",
                    title: "Subnet mask IP",
                    content: "Immettere la subnet mask della LAN remota."
                }, {
                    type: "name",
                    title: "Metodo scambio chiavi",
                    content: "Selezionare la modalità Auto (IKE) o Manuale da usare per l'autenticazione dei peer IPSec."
                }, {
                    type: "name",
                    title: "Metodo di autenticazione",
                    content: "Selezionare Chiave precondivisa (consigliato)."
                }, {
                    type: "name",
                    title: "Chiave precondivisa",
                    content: "Creare una chiave precondivisa da usare per l'autenticazione."
                }, {
                    type: "name",
                    title: "Perfect Forward Secrecy",
                    content: "Selezionare Abilita (o Disabilita) per attivare (o disattivare) PFS (Perfect Forward Secrecy) come protocollo aggiuntivo di protezione per la chiave precondivisa."
                }, {
                    type: "name",
                    title: "Avanzate",
                    content: "Fare clic per configurare le impostazioni avanzate. Si consiglia di mantenere le impostazioni predefinite. Se si desidera modificare queste impostazioni, verificare che entrambi gli endpoint server VPN usino lo stesso algoritmo di crittografia, lo stesso gruppo Diffie-Hellman e la stessa durata della chiave sia nella fase 1 che nella fase 2.",
                    children: [{
                        type: "title2",
                        content: "Fase 1"
                    }, {
                        type: "name",
                        title: "Modalità",
                        content: "Selezionare <b>Principale</b> per configurare i parametri di negoziazione standard per la fase IKE 1. Selezionare <b>Aggressiva</b> per configurare la fase IKE 1 del tunnel VPN in modo da eseguire la negoziazione in un minor lasso di tempo. (configurazione non consigliata perché meno sicura)"
                    }, {
                        type: "name",
                        title: "Tipo di identificatore locale",
                        content: "Selezionare il tipo di identificatore locale per la negoziazione IKE. L'IP WAN locale usa un indirizzo IP come l'identificatore per la negoziazione IKE. FQDN (Fully Qualified Domain Name) usa un nome utente come identificatore."
                    }, {
                        type: "name",
                        title: "Identificatore locale",
                        content: "Se l'opzione <b>IP WAN locale</b> è selezionata, l'identificatore locale verrà popolato automaticamente. Se l'opzione <b>FQDN</b> è selezionata, immettere la username del dispositivo locale da usare come identificatore per la negoziazione IKE."
                    }, {
                        type: "name",
                        title: "Tipo di identificatore remoto",
                        content: "Selezionare il tipo di identificatore remoto per la negoziazione IKE. L'IP WAN remoto usa un indirizzo IP come identificatore per la negoziazione IKE. FQDN usa un nome utente come identificatore."
                    }, {
                        type: "name",
                        title: "Identificatore remoto",
                        content: "Se l'opzione <b>IP WAN remoto</b> è selezionata, l'indirizzo IP del gateway remoto verrà popolato automaticamente. Se l'opzione <b>FQDN</b> è selezionata, immettere la username del peer remoto da usare come identificatore per la negoziazione IKE."
                    }, {
                        type: "name",
                        title: "Algoritmo di crittografia",
                        content: "Selezionare uno dei seguenti algoritmi di crittografia per la negoziazione IKE.",
                        children: [{
                            type: "name",
                            title: "DES",
                            content: "L'algoritmo DES (Data Encryption Standard) codifica un blocco di 64 bit di testo con una chiave a 56 bit."
                        }, {
                            type: "name",
                            title: "3DES",
                            content: "L'algoritmo triplo DES codifica il testo con una chiave a 168 bit."
                        }, {
                            type: "name",
                            title: "AES128",
                            content: "Usa l'algoritmo AES e una chiave crittografica a 128 bit."
                        }, {
                            type: "name",
                            title: "AES192",
                            content: "Usa l'algoritmo AES e una chiave crittografica a 192 bit."
                        }, {
                            type: "name",
                            title: "AES256",
                            content: "Usa l'algoritmo AES e una chiave crittografica a 256 bit."
                        }]
                    }, {
                        type: "name",
                        title: "Algoritmo di integrità",
                        content: "Selezionare uno dei seguenti algoritmi di integrità per la negoziazione IKE.",
                        children: [{
                            type: "name",
                            title: "MD5",
                            content: "L'algoritmo MD5 (Message Digest Algorithm) prende in input un messaggio di lunghezza arbitraria e genera un digest a 128 bit."
                        }, {
                            type: "name",
                            title: "SHA1",
                            content: "L'algoritmo SHA1 (Secure Hash Algorithm) prende in input un messaggio inferiore a 2^64 (2 elevato a 64) bit e genera un digest a 160 bit."
                        }]
                    }, {
                        type: "name",
                        title: "Scambio di chiavi Diffie-Hellman",
                        content: "Selezionare il gruppo Diffie-Hellman da usare nella fase 1 della negoziazione delle chiavi. Il gruppo Diffie-Hellman imposta l'attendibilità dell'algoritmo in bit."
                    }, {
                        type: "name",
                        title: "Durata chiave",
                        content: "Immettere il periodo di tempo (in secondi) che deve trascorrere prima che venga stabilita una nuova associazione di protezione con l'endpoint remoto. Il valore predefinito è 3600."
                    }, {
                        type: "title2",
                        content: "Fase 2"
                    }, {
                        type: "name",
                        title: "Algoritmo di crittografia",
                        content: "Selezionare uno dei seguenti algoritmi di crittografia per la negoziazione IKE.",
                        children: [{
                            type: "name",
                            title: "DES",
                            content: "L'algoritmo DES (Data Encryption Standard) codifica un blocco di 64 bit di testo con una chiave a 56 bit."
                        }, {
                            type: "name",
                            title: "3DES",
                            content: "L'algoritmo triplo DES codifica il testo con una chiave a 168 bit."
                        }, {
                            type: "name",
                            title: "AES128",
                            content: "Usa l'algoritmo AES e una chiave crittografica a 128 bit."
                        }, {
                            type: "name",
                            title: "AES192",
                            content: "Usa l'algoritmo AES e una chiave crittografica a 192 bit."
                        }, {
                            type: "name",
                            title: "AES256",
                            content: "Usa l'algoritmo AES e una chiave crittografica a 256 bit."
                        }]
                    }, {
                        type: "name",
                        title: "Algoritmo di integrità",
                        content: "Selezionare uno dei seguenti algoritmi di integrità per la negoziazione IKE.",
                        children: [{
                            type: "name",
                            title: "MD5",
                            content: "L'algoritmo MD5 (Message Digest Algorithm) prende in input un messaggio di lunghezza arbitraria e genera un digest a 128 bit."
                        }, {
                            type: "name",
                            title: "SHA1",
                            content: "L'algoritmo SHA1 (Secure Hash Algorithm) prende in input un messaggio inferiore a 2^64 (2 elevato a 64) bit e genera un digest a 160 bit."
                        }]
                    }, {
                        type: "name",
                        title: "Scambio di chiavi Diffie-Hellman",
                        content: "Selezionare il gruppo Diffie-Hellman da usare nella fase 2 della negoziazione delle chiavi. Il gruppo Diffie-Hellman imposta l'attendibilità dell'algoritmo in bit."
                    }, {
                        type: "name",
                        title: "Durata chiave",
                        content: "Immettere il periodo di tempo (in secondi) che deve trascorrere prima che venga stabilita una nuova associazione di protezione con l'endpoint remoto. Il valore predefinito è 3600."
                    }]
                }


            ]
        },
        wanBasic: {
            TITLE: "Configurazione connessione Internet",
            CONTENT: [{
                type: "name",
                title: "Rilevamento automatico",
                content: "Fare clic su questo pulsante per far rilevare automaticamente al router il tipo di connessione Internet corrente."
            }, {
                type: "paragraph",
                title: "Nota",
                content: "Se non si è sicuri del tipo di connessione Internet di cui si dispone, usare la funzione di Rilevamento automatico o contattare il provider ISP."
            }, {
                type: "title",
                title: "Tipo di connessione Internet: IP statico"
            }, {
                type: "name",
                title: "Indirizzo IP/Subnet mask/Gateway predefinito/DNS primario/DNS secondario",
                content: "Immettere le informazioni fornite dal provider ISP."
            }, {
                type: "title",
                title: "Tipo di connessione Internet: IP dinamico"
            }, {
                type: "name",
                title: "NON clonare indirizzo MAC/Clona indirizzo MAC del computer corrente",
                content: "Scegliere se clonare o non clonare l'indirizzo MAC, in base al provider ISP."
            }, {
                type: "title",
                title: "Tipo di connessione Internet: PPPoE"
            }, {
                type: "name",
                title: "Nome utente/Password",
                content: "Immettere la username e la password forniti dal provider ISP. Questi campi sono sensibili all'uso di caratteri maiuscoli/minuscoli."
            }, {
                type: "title",
                title: "Tipo di connessione Internet: L2TP/PPTP"
            }, {
                type: "name",
                title: "Nome utente/Password",
                content: "Immettere la username e la password forniti dal provider ISP. Questi campi sono sensibili all'uso di caratteri maiuscoli/minuscoli."
            }, {
                type: "name",
                title: "Connessione secondaria (IP dinamico o IP statico)",
                children: [{
                    type: "name",
                    title: "IP dinamico",
                    content: "Selezionare questa opzione se l'indirizzo IP e la subnet mask sono assegnati automaticamente dal provider ISP."
                }, {
                    type: "name",
                    title: "IP statico",
                    content: " Se l'indirizzo IP, la subnet mask, il gateway e gli indirizzi DSN sono forniti dal provider ISP, selezionare questa opzione e immettere le relative informazioni nei campi corrispondenti."
                }]
            }, {
                type: "name",
                title: "IP server VPN/Nome di dominio",
                content: "Immettere l'indirizzo IP o il nome di dominio del server VPN fornito dal provider ISP."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Print Server",
            CONTENT: [{
                type: "paragraph",
                content: "In questa pagina è possibile configurare il Print Server."
            }, {
                type: "name",
                title: "Print Server",
                content: "Indica lo stato corrente (abilitato o disabilitato) del Print Server."
            }, {
                type: "name",
                title: "Nome stampante",
                content: "Il nome della stampante connessa al router."
            }, {
                type: "note",
                title: "Per configurare il Print Server, seguire le istruzioni riportate di seguito:",
                content: [
                    "Passaggio 1: collegare la stampante USB alla porta USB del router tramite un cavo stampante USB.",
                    "Passaggio 2:  installare il driver della stampante sul computer.",
                    "Passaggio 3:  installare TP-LINK USB Printer Controller sul computer. Eseguire P-LINK USB Printer Controller dal CD o scaricare la relativa utilità dal nostro sito Web: www.tp-link.it."
                ]
            }]
        },
        sysconf: {
            TITLE: "Impostazioni avanzate wireless 2.4GHz | 5GHz-1 | 5GHz-2",
            CONTENT: [{
                type: "name",
                title: "Intervallo beacon",
                content: "Immettere un valore compreso tra 25 e 1000 millisecondi per stabilire l'intervallo in base al quale i pacchetti beacon vengono trasmessi dal router per la sincronizzazione della rete wireless. Il valore predefinito è 100 millisecondi."
            }, {
                type: "name",
                title: "Soglia RTS",
                content: "Immettere un valore compreso tra 1 e 2346 byte per stabilire le dimensioni dei pacchetti di trasmissione di dati attraverso il router. Il valore predefinito delle dimensioni della soglia RTS (Request to Send) è 2346. Se le dimensioni del pacchetto superano la soglia predefinita, il router invia frame RTS a una specifica stazione ricevente e negozia l'invio di un frame di dati. Altrimenti il pacchetto viene inviato immediatamente."
            }, {
                type: "name",
                title: "Intervallo DTIM",
                content: "Immettere un valore compreso tra 1 e 255 per stabilire l'intervallo DTIM (Delivery Traffic Indication Message). 1 indica che l'intervallo DTIM corrisponde all'intervallo beacon."
            }, {
                type: "name",
                title: "Periodo di aggiornamento chiave di gruppo",
                content: "Immettere un numero di secondi (il valore minimo è 30) per stabilire l'intervallo di rinnovo automatico della chiave di crittografia. Il valore predefinito è 0, che corrisponde a nessun rinnovo della chiave."
            }, {
                type: "name",
                title: "Funzionalità WMM",
                content: "La funzionalità WMM (Wi-Fi multi-media) garantisce la trasmissione preferenziale dei pacchetti con messaggi ad alta priorità. È altamente consigliata ed è abilitata per impostazione predefinita."
            }, {
                type: "name",
                title: "Funzionalità Intervallo di guardia breve",
                content: "Questa funzionalità aumenta la capacità di dati riducendo l'intervallo di guardia (Guard Interval, GI). È consigliata ed è abilitata per impostazione predefinita."
            }, {
                type: "name",
                title: "Funzionalità Isolamento AP",
                content: "Selezionare questa casella di controllo per abilitare la funzionalità Isolamento AP, che consente di isolare e limitare l'interazione tra tutti i dispositivi wireless sulla rete, pur permettendogli di accedere a Internet. Per impostazione predefinita, la funzionalità Isolamento AP è disabilitata."
            }, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Abilita WPS",
                content: "Selezionare On per abilitare la funzionalità WPS."
            }, {
                type: "paragraph",
                content: "Fare clic su Salva per salvare le impostazioni."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Modalità notturna",
                content: "Se questa funzionalità è abilitata, i LED del router si spegneranno automaticamente per il periodo di tempo specificato."
            }, {
                type: "name",
                title: "Periodo",
                content: "Immettere il periodo di tempo durante il quale i LED del router verranno spenti."
            }, {
                type: "paragraph",
                content: "Fare clic su Salva per salvare le impostazioni."
            }, {
                type: "title",
                title: "Impostazioni protezione DoS"
            }, {
                type: "paragraph",
                content: "Il livello di protezione DoS protegge il router dagli attacchi di tipo TCP-SYN-Flood, UDP-Flood e ICMP-Flood."
            }, {
                type: "name",
                title: "Livello pacchetti ICMP-FLOOD",
                content: "Immettere un valore compreso da 5 e 3600 per attivare immediatamente la protezione ICMP-FLOOD quando il numero di pacchetti ICMP supera il valore di soglia preimpostato."
            }, {
                type: "name",
                title: "Livello pacchetti UDP-FLOOD",
                content: "Immettere un valore compreso da 5 e 3600 per attivare immediatamente la protezione UDP-FLOOD quando il numero di pacchetti UDP supera il valore di soglia preimpostato."
            }, {
                type: "name",
                title: "Livello pacchetti TCP-FLOOD",
                content: "Immettere un valore compreso da 5 e 3600 per attivare immediatamente la protezione TCP-SYN-FLOOD quando il numero di pacchetti TCP-SYN supera il valore di soglia preimpostato."
            }, {
                type: "paragraph",
                content: "Fare clic su Salva per salvare le impostazioni."
            }]
        },
        logConf: {
            TITLE: "Impostazioni Log",
            CONTENT: [{
                type: "name",
                title: "Salva localmente",
                content: "Selezionare questa opzione per salvare i registri nella memoria locale.",
                children: [{
                    type: "name",
                    title: "Livello minimo",
                    content: "Selezionare il livello minimo dall'elenco a discesa. Verranno salvati tutti gli eventi registrati con un livello pari o superiore a quello selezionato."
                }]
            }, {
                type: "name",
                title: "Salva in remoto",
                content: "Selezionare questa opzione per inviare i registri all'indirizzo IP e alla porta UDP specificati del server remoto del registro log.",
                children: [{
                    type: "name",
                    title: "Livello minimo",
                    content: "Selezionare il livello minimo dall'elenco a discesa. Verranno salvati tutti gli eventi registrati con un livello pari o superiore a quello selezionato."
                }, {
                    type: "name",
                    title: "IP server",
                    content: "Specificare l'indirizzo IP del server remoto del registro log a cui verranno inviati gli eventi."
                }, {
                    type: "name",
                    title: "Porta server",
                    content: "Specificare il numero di porta del server remoto del registro log a cui verranno inviati gli eventi."
                }, {
                    type: "name",
                    title: "Nome struttura locale",
                    content: "Selezionare dall'elenco a discesa il nome della struttura locale del server remoto."
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Wireless",
            CONTENT: [{
                type: "name",
                title: "Protezione",
                content: "È possibile selezionare una delle seguenti opzioni di protezione. ",
                children: [{
                    type: "name",
                    title: "Nessuna protezione",
                    content: "Le stazioni wireless si connetteranno al router senza alcuna crittografia. Si consiglia vivamente di abilitare la protezione scegliendo una delle seguenti modalità."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Personal",
                    content: "Selezionare un protocollo WPA basato su una passphrase precondivisa.",
                    children: [{
                        type: "name",
                        title: "Versione",
                        content: "È possibile selezionare una delle seguenti versioni.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Selezionare automaticamente WPA-PSK o WPA2-PSK in base alla richiesta e alla funzionalità della stazione wireless."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Chiave precondivisa di WPA2."
                        }]
                    }, {
                        type: "name",
                        title: "Crittografia",
                        content: "È possibile selezionare Auto, TKIP o AES."
                    }, {
                        type: "name",
                        title: "Password wireless",
                        content: "È possibile immettere caratteri ASCII o esadecimali. Per il formato esadecimale la lunghezza deve essere compresa tra 8 e 64 caratteri. Per il formato ASCII la lunghezza deve essere compresa tra 8 e 63 caratteri."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Enterprise",
                    content: "Selezionare un protocollo WPA basato su server RADIUS.",
                    children: [{
                        type: "name",
                        title: "Versione",
                        content: "È possibile selezionare una delle seguenti versioni.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Selezionare automaticamente WPA o WPA2 in base alla richiesta e alla funzionalità della stazione wireless."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Protocollo Wi-Fi Protected Access. "
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA versione 2. "
                        }]
                    }, {
                        type: "name",
                        title: "Crittografia",
                        content: "È possibile selezionare Auto, TKIP o AES."
                    }, {
                        type: "name",
                        title: "IP server RADIUS",
                        content: "Immettere l'indirizzo IP del server RADIUS."
                    }, {
                        type: "name",
                        title: "Porta RADIUS",
                        content: "Immettere la porta usata dal server RADIUS."
                    }, {
                        type: "name",
                        title: "Password RADIUS",
                        content: "Immettere la password del server RADIUS."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Selezionare la protezione WEP 802.11.",
                    children: [{
                        type: "name",
                        title: "Tipo",
                        content: "È possibile selezionare uno dei seguenti tipi.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Selezionare automaticamente il tipo di autenticazione Sistema aperto o Chiave condivisa in base alla richiesta e alla funzionalità della stazione wireless."
                        }, {
                            type: "name",
                            title: "Chiave condivisa",
                            content: "Selezionare l'autenticazione Chiave condivisa 802.11."
                        }, {
                            type: "name",
                            title: "Sistema aperto",
                            content: "Selezionare l'autenticazione Sistema aperto 802.11. "
                        }]
                    }, {
                        type: "name",
                        title: "Chiave selezionata",
                        content: "Selezionare quali delle quattro chiavi usare."
                    }, {
                        type: "name",
                        title: "Formato chiave WEP",
                        content: "È possibile selezionare il formato ASCII o esadecimale. Il formato ASCII è costituito da una combinazione di caratteri della tastiera della lunghezza specificata. Il formato esadecimale è costituito da qualsiasi combinazione di cifre esadecimali (0-9, a-f, A-F) della lunghezza specificata."
                    }, {
                        type: "name",
                        title: "Tipo chiave",
                        content: "È possibile selezionare la lunghezza della chiave WEP (64 bit, 128 bit o 152 bit) per la crittografia. \"Disabilitato\" indica che la voce della chiave WEP non è valida.",
                        children: [{
                            type: "name",
                            title: "Crittografia a 64 bit",
                            content: "È possibile immettere 10 cifre esadecimali (qualsiasi combinazione di 0-9, a-f, A-F. La chiave Null non è consentita) o 5 caratteri ASCII."
                        }, {
                            type: "name",
                            title: "Crittografia a 128 bit",
                            content: "È possibile immettere 26 cifre esadecimali (qualsiasi combinazione di 0-9, a-f, A-F. La chiave Null non è consentita) o 13 caratteri ASCII."
                        }, {
                            type: "name",
                            title: "Crittografia a 152 bit",
                            content: "È possibile immettere 32 cifre esadecimali (qualsiasi combinazione di 0-9, a-f, A-F. La chiave Null non è consentita) o 16 caratteri ASCII. "
                        }]
                    }, {
                        type: "name",
                        title: "Valore chiave",
                        content: "Immettere la password per WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Modalità",
                content: "In questo campo determina la modalità wireless usata dal router."
            }, {
                type: "name",
                title: "Larghezza canale",
                content: "La banda del canale wireless."
            }, {
                type: "name",
                title: "Canale",
                content: "Questo campo determina quale frequenza operativa verrà usata. Non è necessario modificare il canale wireless, a meno che non si rilevino problemi di interferenza con un altro punto di accesso situato a breve distanza. Se si seleziona Auto, l'AP sceglierà automaticamente il canale migliore."
            }, {
                type: "name",
                title: "Potenza di trasmissione",
                content: "Consente di specificare la potenza di trasmissione del router. È possibile scegliere tra Alta, Media o Bassa. L'impostazione predefinita e consigliata è Alta. "
            }, {
                type: "paragraph",
                content: "Fare clic su Salva per <strong>salvare</strong> e applicare la configurazione."
            }]
        },
        diagnostic: {
            TITLE: "Strumenti di diagnostica",
            CONTENT: [{
                type: "paragraph",
                content: "Il router offre gli strumenti Ping e Traceroute per la risoluzione dei problemi di connettività della rete. Lo strumento Ping invia pacchetti a un indirizzo IP o a un nome di dominio di destinazione e registra i risultati, ad esempio il numero di pacchetti inviati e ricevuti e il tempo di roundtrip. Lo strumento Traceroute invia pacchetti a un indirizzo IP o a un nome di dominio di destinazione e visualizza il numero di hop e il tempo impiegato."
            }, {
                type: "paragraph",
                content: "È possibile usare gli strumenti Ping e Traceroute su un dispositivo di rete tramite l'indirizzo IP o il nome di dominio, come google.com, yahoo.com, ecc."
            }, {
                type: "note",
                title: "Eseguire una diagnosi con Ping",
                content: [
                    "Immettere l'indirizzo IP o il nome di dominio di destinazione.",
                    "Fare clic sull'icona Freccia per aprire il menu Avanzate, quindi specificare il numero di ping e le dimensioni del pacchetto ping. (facoltativo)",
                    "Fare clic su Avvia."
                ]
            }, {
                type: "note",
                title: "Eseguire una diagnosi con Traceroute",
                content: [
                    "Immettere l'indirizzo IP o il nome di dominio di destinazione.",
                    "Fare clic sull'icona Freccia per aprire il menu Avanzate, quindi specificare il numero di hop (da raggiungere) nel campo TTL massimo di Traceroute. Il valore predefinito è 20. (facoltativo) ",
                    "Fare clic su Avvia."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "Indirizzo MAC",
                content: "L'indirizzo fisico univoco del router."
            }, {
                type: "name",
                title: "LAN IPv4",
                content: "Mantenere l'indirizzo IP predefinito del router (192.168.0.1) o immetterne uno nuovo. Con questo indirizzo IP è possibile accedere alla pagina Web di gestione del router."
            }, {
                type: "name",
                title: "Subnet mask",
                content: "Selezionare dall'elenco a discesa un identificatore assegnato utilizzato dalla porta LAN per il routing del traffico interno ed esterno o immettere un nuovo formato di subnet mask. Il valore predefinito è 255.255.255.0."
            }, {
                type: "name",
                title: "IGMP snooping",
                content: "IGMP (Internet Group Management Protocol) è un protocollo per la gestione dei gruppi multicast sulle reti TCP/IP. Alcuni provider ISP usano IMGP per eseguire la configurazione remota di dispositivi client, ad esempio dei router. È abilitato per impostazione predefinita."
            }, {
                type: "paragraph",
                title: "Nota",
                content: "Se il nuovo indirizzo IP LAN non si trova nella stessa sottorete di quello vecchio, il pool di indirizzi IP nel server DHCP verrà modificato automaticamente. Tuttavia il server virtuale e l'host DMZ diverranno efficaci solo dopo essere stati riconfigurati."
            }]
        },
        ddos: {
            TITLE: "Firewall",
            CONTENT: [{
                    type: "name",
                    title: "Firewall SPI",
                    content: "Il firewall SPI (Stateful Packet Inspection) previene gli attacchi informatici e convalida il traffico che passa attraverso il router. Il firewall SPI è abilitato per impostazione predefinita. "
                }, {
                    type: "title",
                    title: "Protezione DoS"
                }, {
                    type: "name",
                    title: "Protezione DoS",
                    content: "La protezione DoS (Denial of Service) protegge la LAN dagli attacchi DoS, evitando che la rete venga inondata da richieste provenienti da server. La protezione DoS è disabilitata per impostazione predefinita (Spento)."
                }, {
                    type: "name",
                    title: "ICMP-FLOOD Attack Filtering",
                    content: "Abilitare questa funzionalità per prevenire attacchi ICMP (Internet Control Message Protocol)."
                }, {
                    type: "name",
                    title: "UDP-FLOOD Attack Filtering",
                    content: "Abilitare questa funzionalità per prevenire attacchi UDP (User Datagram Protocol)."
                }, {
                    type: "name",
                    title: "TCP-FLOOD Attack Filtering",
                    content: "Abilitare questa funzionalità per prevenire attacchi TCP-SYN (Transmission Control Protocol-Synchronize).",
                    children: [{
                        type: "name",
                        title: "Spento",
                        content: "Nessuna protezione."
                    }, {
                        type: "name",
                        title: "Bassa",
                        content: "Basso livello di protezione e basso impatto sulle prestazioni del router."
                    }, {
                        type: "name",
                        title: "Media",
                        content: "Moderato livello di protezione e impatto parzialmente rilevante sulle prestazioni del router."
                    }, {
                        type: "name",
                        title: "Alta",
                        content: "Alto livello di protezione e impatto rilevante sulle prestazioni del router."
                    }]
                }, {
                    type: "name",
                    title: "Vieta ping LAN",
                    content: "Abilitare questa opzione per vietare i ping provenienti da porte LAN."
                }, {
                    type: "name",
                    title: "Vieta ping WAN",
                    content: "Abilitare questa opzione per vietare i ping provenienti dalla porta WAN."
                }, {
                    type: "title",
                    title: "Elenco host DoS bloccati"
                }, {
                    type: "name",
                    title: "Elenco host DoS bloccati",
                    content: "Elenca gli indirizzi IP e MAC di qualsiasi fonte da cui provengono gli attacchi DoS bloccati."
                }, {
                    type: "name",
                    title: "Eliminare una o più voci",
                    content: "Nell'elenco host, selezionare le voci che si desiderano eliminare e, sopra la tabella, fare clic su Elimina."
                }



            ]
        },
        ipv6: {
            TITLE: "Internet IPv6",
            CONTENT: [{
                    type: "name",
                    title: "Abilita IPv6",
                    content: "Selezionare questa opzione per abilitare (On) o disabilitare (Spento) la funzionalità IPv6 del router."
                }, {
                    type: "title",
                    title: "Tipo di connessione Internet: IP statico"
                }, {
                    type: "name",
                    title: "IP statico",
                    content: "Selezionare questo tipo di connessione se il provider ISP usa l'assegnazione statica di indirizzi IPv6."
                }, {
                    type: "name",
                    title: "Indirizzo IPv6/Gateway predefinito IPv6/Server DNS IPv6/Server DNS secondario IPv6",
                    content: "Immettere questi parametri in base a quanto indicato dal provider ISP."
                }, {
                    type: "name",
                    title: "MTU (byte)",
                    content: "Le dimensioni predefinite della MTU (unità massima di trasmissione) utilizzate dalla maggior parte delle reti Ethernet corrispondono a 1500 byte. Non modificare le dimensioni predefinite della MTU, a meno che non sia richiesto dal provider ISP."
                }, {
                    type: "title",
                    title: "Tipo di connessione Internet: IP dinamico"
                }, {
                    type: "name",
                    title: "IP dinamico",
                    content: "Selezionare questo tipo di connessione se il provider ISP usa l'assegnazione dinamica di indirizzi IPv6."
                }, {
                    type: "name",
                    title: "Indirizzo IPv6/Gateway IPv6",
                    content: "Questi parametri vengono assegnati automaticamente dal server DHCPv6 del provider ISP."
                }, {
                    type: "name",
                    title: "Tipo di indirizzamento",
                    content: "Selezionare il tipo di connessione della connessione IPv6."
                }, {
                    type: "name",
                    title: "MTU (byte)",
                    content: "Le dimensioni predefinite della MTU (unità massima di trasmissione) utilizzate dalla maggior parte delle reti Ethernet corrispondono a 1500 byte. Non modificare le dimensioni predefinite della MTU, a meno che non sia richiesto dal provider ISP."
                }, {
                    type: "name",
                    title: "Usa il seguente indirizzo DNS IPv6",
                    content: "Selezionare questa casella di controllo e immettere gli indirizzi dei server DNS forniti dal provider ISP in notazione decimale puntata. Questa interfaccia WAN userà con priorità il server DNS specificato."
                }, {
                    type: "name",
                    title: "Nome host",
                    content: "Immettere un valore in questo campo per specificare il nome host del router."
                }, {
                    type: "title",
                    title: "Tipo di connessione Internet: PPPoE"
                }, {
                    type: "name",
                    title: "PPPoE",
                    content: "Selezionare questo tipo di connessione se il provider ISP usa PPPoEv6 e fornisce un nome utente e una password."
                }, {
                    type: "name",
                    title: "Nome utente/Password/Conferma password",
                    content: "Immettere questi parametri in base a quanto indicato dal provider ISP."
                }, {
                    type: "name",
                    title: "Tipo di indirizzamento",
                    content: "Selezionare il tipo di connessione della connessione IPv6."
                }, {
                    type: "name",
                    title: "Nome servizio",
                    content: "Immettere il nome del servizio fornito dal provider ISP. Se non è stato fornito, lasciare vuoto questo campo."
                }, {
                    type: "name",
                    title: "Nome server",
                    content: "Immettere il nome del server fornito dal provider ISP. Se non è stato fornito, lasciare vuoto questo campo."
                }, {
                    type: "name",
                    title: "MTU (byte)",
                    content: "Le dimensioni della MTU (unità massima di trasmissione) utilizzate solitamente dalle reti Ethernet corrispondono a 1480 byte.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Nota</b>: In alcuni rari casi il provider ISP può richiedere di regolare le dimensioni della MTU al fine di migliorare le prestazioni della rete. Modificare questo valore solo se assolutamente necessario."
                    }]
                }, {
                    type: "name",
                    title: "Usa le informazioni IPv6 specificate dall'ISP",
                    content: "Selezionare questa casella di controllo e immettere l'indirizzo IP e il gateway forniti dal provider ISP."
                }, {
                    type: "name",
                    title: "Usa il seguente indirizzo DNS IPv6",
                    content: "Selezionare questa opzione se si desidera immettere manualmente l'indirizzo DNS fornito dal provider ISP. Se l'opzione non è selezionata, il router ottiene l'indirizzo DNS in modo dinamico dal provider IPS."
                }, {
                    type: "title",
                    title: "Tipo di connessione Internet: Tunnel 6to4"
                }, {
                    type: "name",
                    title: "Tunnel 6to4",
                    content: "Selezionare questo tipo di connessione se il provider ISP usa la distribuzione 6to4 per l'assegnazione degli indirizzi."
                }, {
                    type: "title",
                    title: "LAN IPv6"
                }, {
                    type: "name",
                    title: "Tipo di indirizzamento",
                    content: "Selezionare il tipo corretto in base al provider ISP.",
                    children: [{
                        type: "name",
                        title: "RADVD",
                        content: "Selezionare questa opzione per assegnare gli indirizzi IPv6 ai computer della LAN tramite RADVD.",
                        children: [{
                            type: "name",
                            title: "Abilita RDNSS",
                            content: "Selezionare la casella di controllo per abilitare la funzionalità RDNSS."
                        }, {
                            type: "name",
                            title: "Abilita prefisso ULA",
                            content: "Selezionare la casella di controllo per abilitare la funzionalità Prefisso ULA.",
                            children: [{
                                type: "name",
                                title: "Prefisso ULA",
                                content: "Immettere il prefisso ULA."
                            }, {
                                type: "name",
                                title: "Lunghezza prefisso ULA",
                                content: "Immettere la lunghezza del prefisso ULA. Il valore predefinito è 64."
                            }]
                        }]
                    }, {
                        type: "name",
                        title: "Server DHCPv6",
                        content: "Assegna automaticamente gli indirizzi IP ai client nella LAN.",
                        children: [{
                            type: "name",
                            title: "Indirizzo IPv6 iniziale",
                            content: "Immettere l'indirizzo IPv6 iniziale."
                        }, {
                            type: "name",
                            title: "Indirizzo IPv6 finale",
                            content: "Immettere l'indirizzo IPv6 finale."
                        }, {
                            type: "name",
                            title: "Tempo di lease",
                            content: "Immettere il tempo in cui un client DHCP può assegnare in lease l'indirizzo IPv6 dinamico corrente assegnatoli dal router. Una volta scaduto l'indirizzo IPv6 dinamico, all'utente ne verrà assegnato automaticamente uno nuovo. Il valore predefinito è 86400 millisecondi."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Tipo di prefisso sito",
                    content: "Selezionare il tipo di prefisso da assegnare agli indirizzi IPv6. Può essere di tipo Delegato o Statico."
                }, {
                    type: "name",
                    title: "Delegato",
                    children: [{
                        type: "name",
                        title: "Connessione WAN con prefisso delegato",
                        content: "Per assegnare il prefisso, selezionare una connessione WAN dall'elenco a discesa."
                    }]
                }, {
                    type: "name",
                    title: "Statico",
                    children: [{
                        type: "name",
                        title: "Prefisso sito",
                        content: "Immettere un valore per il prefisso del sito."
                    }, {
                        type: "name",
                        title: "Lunghezza prefisso sito",
                        content: "Immettere un valore per la lunghezza del prefisso del sito."
                    }]
                }
            ]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Abilita Server VPN",
				content: "Selezionate questa casella di controllo per abilitare il server OpenVPN."
			},{
				type: "name",
				title: "Tipo Servizio",
				content: "Selezionate il protocollo di comunicazione per il server OpenVPN: UDP o TCP."
			},{
				type: "name",
				title: "Porta Servizio",
				content: "Immettete il numero della porta di comunicazione compreso fra 1024 e 65535. La porta di default è 1194."
			},{
				type: "name",
				title: "VPN Subnet/Netmask",
				content: "Immettete il range di indirizzi IP che può essere rilasciato ai client dal server OpenVPN."
			},{
				type: "name",
				title: "Accesso Client",
				content: "Selezionate il tipo di accesso per il vostro client OpenVPN."
			},{
				type: "name",
				title: "Solo Rete Domestica",
				content: "I client possono accedere solo al router e alla LAN. La route di default del client non cambierà."
			},{
				type: "name",
				title: "Internet e Rete Domestica",
				content: "I client possono accedere a router, LAN e Internet. La route di default del client verrà modificata."
			},{
				type: "paragraph",
				content: "Fate clic su Salva per salvare tutte le impostazioni."
            },{
                type: "title",
                content: "Certificato"
            },{
                type: "paragraph",
                content: "Usate il certificato che fornisce informazioni e identità della connessione VPN del computer remoto."
            },{
                type: "name",
                title: "Genera",
                content: "Fate clic per generare un nuovo certificato."
            },{
                type: "title",
                content: "File Configurazione"
            },{
                type: "name",
                title: "Esporta",
                content: "Fate clic su questo tasto per salvare il file di configurazione OpenVPN da usare per aggiungere una nuova connessione VPN."
 			},{
                type: "title",
                content: "Guida Installazione Client VPN"
			},{
				type: "step",
				title: "Per abilitare e connettere i vostri dispositivi client al server OpenVPN:",
			},{
				type: "paragraph",
				content: "Prima di configurare il server OpenVPN, configurate il servizio DNS Dinamico (consigliato) o assegnate un indirizzo IP statico alla porta WAN. Assicuratevi che la porta esterna delle impostazioni NAT non sia la porta di servizio, e l'Ora di Sistema sia sincronizzata con Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Selezionate Abilita Server VPN.",
					"Configurate i parametri del server OpenVPN (Tipo Servizio, Porta di Servizio e Accesso Client) e fate clic su salva.",
					"Fate clic su Esporta per salvare il file di configurazione.",
					"Scaricate e installate l'utility OpenVPN client sui vostri dispositivi client da <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> Le piattaforme supportate ufficialmente includono Windows, Mac OSX, Linux.",
					"Lanciate l'utility OpenVPN client, e aggiungete una nuova connessione VPN usando il file di configurazione salvato per connettere il vostro dispositivo client al server VPN."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Per saperne di più riguardo i client OpenVPN, visitate <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "name",
				title: "Abilita Server VPN",
				content: "Selezionate questa casella di controllo per abilitare il server VPN PPTP."
			},{
				type: "name",
				title: "Indirizzo IP Client",
				content: "Immettete il range di indirizzi IP (fino a 10 client) che possono essere rilasciati ai client dal server VPN PPTP."
			},{
				type: "name",
				title: "Username e Password",
				content: "Immettete username e password per autenticare i client al server VPN PPTP."
			},{
				type: "paragraph",
				content: "Fate clic su Salva per salvare tutte le impostazioni."
			},{
                type: "title",
                content: "Guida Installazione Client VPN"
			},{
				type: "step",
				title: "Per abilitare e connettere i vostri dispositivi client al server VPN PPTP:",
			},{
				type: "paragraph",
				content: "Prima di configurare il server VPN PPTP, configurate il Servizio DNS Dinamico (consigliato) o assegnate un indirizzo IP statico alla porta WAN. Assicuratevi che la porta esterna del NAT non sia 1723 e la vostra Ora di Sistema sia sincronizzata con Internet."
			},{
				type: "step",
				title:"",
				content:[
					"Selezionate Abilita Server VPN.",
					"Configurate i parametri del server VPN PPTP e fate clic su Salva.",
					"Create una connessione VPN PPTP nei vostri dispositivi client. Le piattaforme supportate ufficialmente includono Windows, Mac OSX, Linux, iOS e Android.",
					"Lanciate il programma VPN PPTP, aggiungete una nuova connessione e immettete il nome dominio del servizio DDNS registrato o l'indirizzo IP statico che è stato assegnato alla porta WAN, per connettere il vostro dispositivo client al server VPN PPTP.",
				]
			}]
		},

		vpnServerStatus: {
			TITLE: "Connessioni VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Questa pagina mostra i client che sono connessi ai server OpenVPN e VPN PPTP presenti nel router."
			},{
				type: "paragraph",
				content: "Fate clic sull'icona Meno per disconnettere il client corrispondente."
			}]
		},
    };
})(jQuery);
