// =====================================================================
// DATI DELLA CAMPAGNA — trascritti parola per parola dal PDF
// "Isola di Sanguis e Lux — Guida Completa del Dungeon Master".
// Il testo NON va modificato. I campi "luoghi", "personaggi", "ref"
// servono solo a collegare le schede tra loro.
// =====================================================================

const CAMPAGNA = {
  titolo: `Isola di Sanguis e Lux`,
  sottotitolo: `Guida Completa del Dungeon Master`,
  argomenti: `Storia · Fazioni · Casate · Personaggi · Segreti · Setta della Settezza Perduta · Villaggi · Quest · Drago · Schede Personaggio · Web della Trama`,
  intro: `Un'isola spezzata dalla guerra. Due fazioni divise dall'odio ereditato. Una setta che vuole il controllo totale. Un drago antico risvegliato dalla magia instabile. E una verità sepolta sotto le macerie che potrebbe salvare tutti — o distruggerli.`,
  ambientazione: `Ambientazione D&D 5e · Livelli 1–4 · Medioevo Fantasy`,
  durata: `Contiene materiale per una campagna completa di 20–30 sessioni.`,
};

// ---------------------------------------------------------------------
// PARTE I — LA STORIA E IL MONDO
// ---------------------------------------------------------------------
const STORIA = {
  aethelred: `Molto prima che l'isola fosse divisa, la città di Aethelred era il faro della civiltà — un luogo dove magia e conoscenza fiorivano in armonia, governato da un Concilio dei Sette Saggi. L'isola stessa era stata creata da un'entità primordiale dell'equilibrio, che aveva lasciato un "Cuore d'Isola" pulsante nelle profondità della terra.`,
  saggi: [
    { nome: `VALERIUS`, elemento: `Luce`, testo: `Maestro della magia solare. Visionario rigido, credeva nella purificazione totale.` },
    { nome: `LYSANDRA`, elemento: `Ombra`, testo: `Maestra della magia lunare. Credeva che l'ombra fosse necessaria all'equilibrio.` },
    { nome: `THORNE`, elemento: `Terra`, testo: `Druido custode della vita naturale. Mediatore fallito.` },
    { nome: `AERION`, elemento: `Vento`, testo: `Maestro della comunicazione e della lettura dei pensieri.` },
    { nome: `IGNIS`, elemento: `Fuoco`, testo: `Nano fabbro, maestro della trasformazione. Un Blackstone era suo assistente.` },
    { nome: `AQUA`, elemento: `Acqua`, testo: `Sirena guaritrice, portatrice di calma.` },
    { nome: `SILAS`, elemento: `Equilibrio`, testo: `Il settimo Saggio. L'unico che vide la catastrofe in arrivo. Morì tentando di fermarla.`, ref: `silas` },
  ],
  frattura: `Il conflitto tra Valerius e Lysandra degenerò fino allo scontro diretto nel cuore di Aethelred. L'energia scatenata superò la capacità del Cuore d'Isola di mantenere l'armonia. La città sprofondata, l'isola si spezzò. Milioni di morti. I sopravvissuti fuggirono in direzioni opposte portando versioni polarizzate della storia.`,
  veritaNascosta: `LA VERITÀ NASCOSTA: Entrambi condividono la colpa. Valerius attaccò per primo. Lysandra usò poteri proibiti. Un Blackstone partecipò a un rituale proibito su istruzioni di Lysandra. Nessuna fazione lo sa.`,
};

const FAZIONI = [
  {
    id: `luce`,
    nome: `ALLEANZA DEL SOLE NASCENTE`,
    sottotitolo: `Fazione della Luce`,
    campi: [
      [`Territorio`, `Lato orientale, terre fertili e soleggiate.`],
      [`Risorse`, `Agricoltura, artigianato, flotta mercantile (Solara).`],
      [`Ideologia`, `Purezza del lignaggio, luce come unica forza dell'ordine.`],
      [`Bugia fondante`, `"Lysandra causò la Frattura da sola."`],
      [`Debolezza`, `Intransigenza di Anya, infiltrati di Corvus alla corte.`],
    ],
  },
  {
    id: `ombra`,
    nome: `CONFRATERNITA DEL CUORE DI ROCCIA`,
    sottotitolo: `Fazione dell'Ombra`,
    campi: [
      [`Territorio`, `Lato occidentale, montagne e cave.`],
      [`Risorse`, `Metalli, magia runica, armamenti (Ferrovia).`],
      [`Ideologia`, `L'ombra è vitale; tradimento storico da vendicare.`],
      [`Bugia fondante`, `"Valerius ci attaccò e Lysandra si difese."`],
      [`Debolezza`, `Le pergamene Blackstone; il Tomo di Lysandra.`],
    ],
  },
];

// ---------------------------------------------------------------------
// PARTE II — PERSONAGGI E SCHEDE
// gruppo: luce | ombra | setta | indipendente | neutrale | drago
// ---------------------------------------------------------------------
const PERSONAGGI = [
  {
    id: `anya`, gruppo: `luce`, etichetta: `FAZIONE DELLA LUCE`,
    nome: `Lady Anya d'Aurum`, titolo: `Reggente di Lumina — Casata d'Aurum`,
    razza: `Umana`, classe: `Guerriero/Nobile (Fighter 5)`, eta: `40 anni`, allineamento: `Legale Neutrale`,
    pf: `52`, ca: `15`, vel: `9m`, lvl: `5`,
    stats: [[`14`, `+2`], [`12`, `+1`], [`14`, `+2`], [`16`, `+3`], [`14`, `+2`], [`18`, `+4`]],
    speciali: [
      `Senso tattico: vantaggio su prove di Intuizione vs inganni in contesto poli`,
      `Aura di Comando: alleati a 9m +1 ai TS contro paura.`,
      `Disprezzo dell'Ombra: svantaggio su Persuasione con membri della Confratern`,
      `Custode del Segreto: sa del diario di Valerius e lo tiene nascosto.`,
    ],
    background: `Nata alla corte di Lumina, educata alla strategia e alla diplomazia. Ha sconfitto un tentativo di colpo di stato a 28 anni. Non si è mai sposata.`,
    motivazione: `Proteggere Lumina e il lignaggio di Valerius a ogni costo. Crede sinceramente che la Luce sia superiore.`,
    segreto: `Custodisce il Diario completo di Valerius. Sa che contiene verità scomode ma non lo ha mai letto per intero — ha paura di quello che troverebbe.`,
    gancio: `Se i PG scoprono la verità sulla Frattura, Anya è l'ostacolo principale. Ma se la sua cecità la porta a una sconfitta militare, potrebbe aprirsi alla verità.`,
    azioni: [
      [`Spada Lunga`, `+6 per colpire, 1d8+4 tagli`],
      [`Attacco Multiplo`, `Due attacchi per azione`],
      [`Secondo Fiato`, `1/riposo breve, recupera 1d10+5 PF`],
      [`Azione Impetuosa`, `Attacco bonus come azione bonus`],
    ],
    luoghi: [`lumina`],
  },
  {
    id: `oakhart`, gruppo: `luce`, etichetta: `FAZIONE DELLA LUCE`,
    nome: `Lord Elias Oakhart`, titolo: `Signore di Solara — Casata d'Oakhart`,
    razza: `Umano`, classe: `Ladro/Mercante (Rogue 4)`, eta: `52 anni`, allineamento: `Neutrale`,
    pf: `36`, ca: `13`, vel: `9m`, lvl: `3`,
    stats: [[`10`, `+0`], [`15`, `+2`], [`12`, `+1`], [`18`, `+4`], [`16`, `+3`], [`16`, `+3`]],
    speciali: [
      `Mente Commerciale: vantaggio su prove di Persuasione/Inganno in contesti ec`,
      `Rete di Contatti: può trovare informazioni su qualsiasi mercante/nobile (In`,
      `Attacco Furtivo: +2d6 danni se ha vantaggio.`,
      `Schivare Evasivamente: reazione per dimezzare danni da area.`,
    ],
    background: `Figlio di mercanti, ha costruito l'impero commerciale di Solara in vent'anni. Ha finanziato tre guerre e ora vuole fermarle tutte.`,
    motivazione: `La pace è più profittevole della guerra. Vuole un accordo commerciale che superi la faida delle fazioni.`,
    segreto: `Ha già incontrato Kaelan di Nox di persona. La lettera delle trattative è nascosta in un doppio fondo della sua scrivania.`,
    gancio: `Chiave per la risoluzione pacifica. Se l'assassinio durante il duello (Quest 4.10) va a buon fine, la pace muore con lui.`,
    azioni: [
      [`Pugnale`, `+4 per colpire, 1d4+2 perforanti`],
      [`Borseggio`, `Destrezza +4 vs Percezione passiva bersaglio`],
      [`Azione Astuta`, `Disimpegno o Scatto come azione bonus`],
      [`Parole Ponderate`, `Persuasione o Inganno con vantaggio 1/riposo lungo`],
    ],
    luoghi: [`solara`],
  },
  {
    id: `kaelan`, gruppo: `ombra`, etichetta: `FAZIONE DELL'OMBRA`,
    nome: `Lord Kaelan di Nox`, titolo: `Reggente di Umbrage — Casata di Nox`,
    razza: `Umano`, classe: `Stregone (Sorcerer 6)`, eta: `41 anni`, allineamento: `Legale Neutrale`,
    pf: `42`, ca: `12`, vel: `9m`, lvl: `6`,
    stats: [[`10`, `+0`], [`12`, `+1`], [`12`, `+1`], [`16`, `+3`], [`14`, `+2`], [`18`, `+4`]],
    speciali: [
      `Lignaggio dell'Ombra: può lanciare Oscurità 1/riposo lungo senza spell slot`,
      `Resistenza alla Magia: vantaggio su TS contro incantesimi.`,
      `Presenza Intimidatoria: Intimidazione con vantaggio se nella sua corte.`,
      `Vendetta Controllata: non attacca impulsivamente, pianifica sempre.`,
    ],
    background: `Cresciuto in guerra, ha perso due fratelli in battaglia. Ha la disciplina di chi sa quanto costi la guerra e la testardaggine di chi non vuole cedere.`,
    motivazione: `Vendetta per l'ingiustizia ancestrale — ma parte di lui vuole solo la fine della guerra. Non lo ammetterà mai.`,
    segreto: `Non sa che Lysandra fu complice attiva nella Frattura. Le lettere nell'archivio profondo di Umbrage lo proverebbero.`,
    gancio: `Se i PG gli mostrano le lettere di Lysandra, è il personaggio con il maggiore arco di sviluppo: può diventare il più grande alleato per la pace o il più grande ostacolo.`,
    azioni: [
      [`Tocco Gelido`, `+6 per colpire, 2d8 necrotici, bersaglio non può recuperare PF`],
      [`Cono di Freddo (4° livello)`, `TS Cos CD 15, 8d8 freddo o metà`],
      [`Oscurità`, `Sfera 4.5m raggio, oscurità magica`],
      [`Metamagia - Incantesimo Potenziato`, `Aggiunge CARmod ai danni`],
    ],
    luoghi: [`umbrage`],
  },
  {
    id: `blackstone`, gruppo: `ombra`, etichetta: `FAZIONE DELL'OMBRA`,
    nome: `Magistra Lyra Blackstone`, titolo: `Matriarca di Ferrovia — Casata di Blackstone`,
    razza: `Umana`, classe: `Artefice (Artificer 7)`, eta: `67 anni`, allineamento: `Legale Malvagio`,
    pf: `58`, ca: `16`, vel: `9m`, lvl: `7`,
    stats: [[`12`, `+1`], [`10`, `+0`], [`14`, `+2`], [`20`, `+5`], [`14`, `+2`], [`12`, `+1`]],
    speciali: [
      `Maestro Fabbro: può creare oggetti magici comuni in metà tempo.`,
      `Rune di Potenziamento: le sue armi forgiate infliggono +1d4 danni elemental`,
      `Mente Analitica: vantaggio su Arcano e Investigation relative a costruzioni`,
      `Determinazione d'Acciaio: immunità alla condizione spaventata.`,
    ],
    background: `Ha dedicato trent'anni a pianificare la distruzione della Casata d'Aurum. Ha costruito Ferrovia come arma. La sua arma runica è quasi completa.`,
    motivazione: `Distruggere l'Alleanza della Luce. Non per rabbia cieca — per convinzione ideologica profonda e piani decennali.`,
    segreto: `Possiede le pergamene che provano la complicità dei Blackstone nella Frattura. Le sta distruggendo pezzo per pezzo.`,
    gancio: `L'arma runica che sta costruendo usa frammenti del Cuore d'Isola. Se completata e usata, potrebbe risvegliare qualcosa di catastrofico ad Aethelred.`,
    azioni: [
      [`Fulmine Runico`, `+7 per colpire, 2d8+5 fulmine a distanza 18m`],
      [`Golem di Ferro (Convoca)`, `Golem CA 14, PF 40, FOR +6, 2d6+4 per turno`],
      [`Runa di Esplosione`, `area 4.5m, TS Des CD 15, 4d6 fuoco`],
      [`Tuta Runica`, `Armatura potenziata: +1 CA, immunità proiettili non magici`],
    ],
    luoghi: [`ferrovia`],
  },
  {
    id: `corvus`, gruppo: `setta`, etichetta: `SETTA DELLA SETTEZZA PERDUTA`,
    nome: `Grand Saggio Corvus`, titolo: `Capo della Setta — vera identità: Lord Theron d'Aurum`, titoloSegreto: true,
    razza: `Umano`, classe: `Mago Evocatore (Wizard 8)`, eta: `38 anni`, allineamento: `Neutrale Malvagio`,
    pf: `52`, ca: `12`, vel: `9m`, lvl: `8`,
    stats: [[`8`, `-1`], [`14`, `+2`], [`12`, `+1`], [`20`, `+5`], [`16`, `+3`], [`15`, `+2`]],
    speciali: [
      `Mente dei Sette: conosce incantesimi di entrambe le scuole (luce e ombra) s`,
      `Doppia Identità: DC Intuizione 18 per smascherarlo in costume.`,
      `Stratega: +2 alle prove di Inganno, Intuizione e Persuasione in contesti po`,
      `Rituale Proibito: può usare il Cuore d'Isola come focus — con conseguenze.`,
    ],
    background: `Fratello minore di Anya d'Aurum. Brillante studioso ossessionato da Aethelred. Ha finto la propria morte per fondare la Setta.`,
    motivazione: `Imporre la pace attraverso il controllo totale. Crede che le fazioni siano troppo corrotte per cambiare spontaneamente.`,
    segreto: `È Lord Theron d'Aurum. La sua sorella Anya non sa che è vivo. Il suo "piano di pace" prevede una dittatura sotto la Setta.`,
    gancio: `Il villain principale della campagna. Conoscere la sua identità è il punto di svolta narrativo centrale. Ombra-Bianca lo conosce.`,
    azioni: [
      [`Fulmine`, `+7 per colpire, 8d6 fulmine LS Cos CD 15 metà`],
      [`Palla di Fuoco`, `Raggio 6m, TS Des CD 15, 8d6 fuoco o metà`],
      [`Vincolo Arcano`, `Bersaglio incapacitato 1 round, TS Int CD 15`],
      [`Controspell`, `Contrastare incantesimo livello 3 automatico`],
    ],
    luoghi: [],
  },
  {
    id: `lyra-ombra`, gruppo: `indipendente`, etichetta: `INDIPENDENTE`,
    nome: `Lyra l'Ombra Silenziosa`, titolo: `Assassina Indipendente — cerca l'Occhio di Aethelred`,
    razza: `Mezza-Elfa`, classe: `Ladro Assassino (Rogue 6)`, eta: `29 anni`, allineamento: `Caotico Neutrale`,
    pf: `44`, ca: `15`, vel: `9m`, lvl: `5`,
    stats: [[`12`, `+1`], [`19`, `+4`], [`13`, `+1`], [`15`, `+2`], [`14`, `+2`], [`13`, `+1`]],
    speciali: [
      `Uccisione Furtiva: +3d6 danni se attacca da sorpresa o con vantaggio.`,
      `Passo dell'Assassino: non lascia tracce magiche o fisiche per 1 ora/giorno.`,
      `Colpo Critico Migliorato: critico con 19-20 nelle prime azioni di combattim`,
      `Infallibile: 1/giorno può ritirare qualsiasi prova di abilità.`,
    ],
    background: `Origini sconosciute. Ha lavorato per entrambe le fazioni e per nessuna. L'unico obiettivo dichiarato è l'Occhio di Aethelred.`,
    motivazione: `Trovare la verità sulla Grande Frattura contenuta nell'Occhio. Non per altruismo — per sapere. La conoscenza è potere.`,
    segreto: `Corvus sa della sua missione e la usa come pedina. Lei non sa di essere manipolata.`,
    gancio: `Può essere alleata o antagonista. Se i PG trovano l'Occhio prima di lei, la trattativa cambia. Se capisce di essere una pedina di Corvus, potrebbe diventare un'alleata preziosa.`,
    azioni: [
      [`Stocco`, `+7 per colpire, 1d6+4 perforanti + 3d6 furtivi`],
      [`Pugnale (lancio)`, `+7 per colpire, 1d4+4 perforanti, gittata 6/18m`],
      [`Schivare`, `Azione per rendere difficile ogni attacco su di lei`],
      [`Disimpegno Rapido`, `Disimpegno come azione bonus sempre`],
    ],
    luoghi: [],
  },
  {
    id: `seraphim`, gruppo: `neutrale`, etichetta: `NEUTRALE / MANIPOLATORE`,
    nome: `Seraphim — Il Collezionista`, titolo: `Mago Errante — ultimo erede dei Sette Saggi`,
    razza: `Umano (molto anziano)`, classe: `Mago Divinatore (Wizard 10)`, eta: `Sconosciuta`, allineamento: `Neutrale`,
    pf: `68`, ca: `13`, vel: `9m`, lvl: `10`,
    stats: [[`8`, `-1`], [`13`, `+1`], [`14`, `+2`], [`22`, `+6`], [`18`, `+4`], [`17`, `+3`]],
    speciali: [
      `Portento: può rimpiazzare qualsiasi tiro con due d20 tenuti all'inizio del`,
      `Sapienza Ancestrale: conosce la storia completa dei Sette Saggi.`,
      `Mente Protetta: immune a lettura del pensiero e magie di controllo mentale.`,
      `Collezione Arcana: porta con sé 3 oggetti magici rari che può attivare.`,
    ],
    background: `Dice di essere uno studioso. In realtà è l'ultimo discendente di una linea laterale dei Sette Saggi — non da Valerius né da Lysandra, ma da Aerion.`,
    motivazione: `Spingere entrambe le fazioni verso la pace, credendo che solo l'unità possa prevenire un'altra Frattura. Usa i PG come strumenti.`,
    segreto: `Sa tutto sulla Grande Frattura — le responsabilità di entrambi i Saggi, il Cuore d'Isola, e il rischio che rappresenta Corvus. Non lo rivela tutto insieme per non perdere influenza.`,
    gancio: `Può essere la chiave per capire la verità, ma i PG devono guadagnarsi la sua fiducia. Ogni informazione che dà ha un costo (un favore, un oggetto, un'azione).`,
    azioni: [
      [`Fulmine di Classe`, `10° livello: 10d6 fulmine LS Cos CD 17 metà`],
      [`Confusione`, `LS Sag CD 17, area 3m, turni confusi`],
      [`Portento`, `Rimpiazza tiro con d20 preparato (x2/giorno)`],
      [`Controspell Potenziato`, `Contrasta automaticamente incantesimi fino a 5° liv`],
    ],
    luoghi: [],
  },
  {
    id: `silas`, gruppo: `neutrale`, etichetta: `NEUTRALE — CUSTODE DELLA VERITÀ`,
    nome: `Spirito di Silas`, titolo: `Presenza Vincolata — rovine di Aethelred`,
    razza: `Spirito`, classe: `Spirito Vincolato (non combatte)`, eta: `Secoli`, allineamento: `Neutrale Buono`,
    pf: `—`, ca: `—`, vel: `volo 18m`, lvl: `—`,
    stats: [[`0`, `—`], [`16`, `+3`], [`0`, `—`], [`22`, `+6`], [`24`, `+7`], [`18`, `+4`]],
    speciali: [
      `Incorporeo: può attraversare oggetti solidi.`,
      `Immunità: danni fisici, veleni, condizioni mentali.`,
      `Voce della Verità: le sue parole non possono essere dette con inganno.`,
      `Vincolato: non può allontanarsi dalle rovine di Aethelred.`,
    ],
    background: `Fu il settimo Saggio — il solo che cercò di prevenire la Frattura. Il suo corpo fu distrutto nel tentativo finale. Il suo spirito aspetta che qualcuno porti la verità al mondo.`,
    motivazione: `Essere liberato. La sua pace verrà solo quando la verità sulla Grande Frattura sarà conosciuta da entrambe le fazioni.`,
    segreto: `Sa esattamente chi ha torto e chi ha ragione — ovvero: tutti e due hanno torto. Ha visto tutto in prima persona.`,
    gancio: `Guida i PG verso la verità. Può mostrare le visioni della Frattura come avvennero realmente. Liberarlo (portando la verità a entrambe le fazioni) è uno dei finali possibili della campagna.`,
    azioni: [
      [`Rivelazione Visiva`, `Mostra una visione del passato al PG (non modificabile)`],
      [`Voce nell'Ombra`, `Comunicazione telepatica entro le rovine`],
      [`Forma Terrificante`, `TS Sag CD 15 o spaventati 1 round (non fa danni)`],
      [`Legame di Verità`, `Un PG sotto effetto di bugie viene avvertito da sensazione`],
    ],
    luoghi: [`aethelred`],
  },
  {
    id: `cinerebrax`, gruppo: `drago`, etichetta: `ANTAGONISTA PRINCIPALE — QUEST DEL DRAGO`,
    nome: `Cinerebrax`, titolo: `Drago Rosso Antico — Monte Cinere`,
    razza: `Drago Rosso`, classe: `Drago Antico (versione Lvl 1-4)`, eta: `Millenni`, allineamento: `Caotico Malvagio`,
    pf: `85`, ca: `14`, vel: `12m/volo 18m`, lvl: `8 (ridotto)`,
    stats: [[`20`, `+7`], [`10`, `+0`], [`18`, `+6`], [`16`, `+3`], [`12`, `+1`], [`18`, `+4`]],
    speciali: [
      `Immunità al Fuoco: immune a tutti i danni da fuoco.`,
      `Terrore Antico: creature a 12m TS Sag CD 14 o spaventate.`,
      `Pelle Vulcanica: chi colpisce in mischia subisce 1d6 fuoco.`,
      `Resistenza Leggendaria: 3/giorno può scegliere di riuscire in un TS fallito`,
    ],
    background: `Era presente durante la Grande Frattura come osservatore. Un'ondata di magia grezza lo mandò in sonno incantato sotto Monte Cinere. Si è risvegliato ora per l'instabilità del Cuore d'Isola.`,
    motivazione: `Distruzione — ma non casuale. Trova la guerra umana familiare e irritante. Preferirebbe che l'isola fosse ancora Aethelred. Dal momento che non lo è, tanto vale bruciarla.`,
    segreto: `Il libro draconico nel suo antro contiene la sua testimonianza oculare della Frattura — una fonte storica di inestimabile valore.`,
    gancio: `Il suo risveglio è la prima minaccia esterna che costringe le fazioni a guardare oltre la loro guerra. Il suo libro draconico può essere la prova finale della verità sulla Frattura.`,
    azioni: [
      [`Artigli`, `+7 per colpire, due attacchi, 2d8+7 tagli`],
      [`Morso`, `+7 per colpire, 2d10+7 perforanti + 2d6 fuoco`],
      [`Soffio di Fuoco (Ric 5-6)`, `Cono 12m, 8d6 fuoco, LS Des CD 16 metà`],
      [`Schiacciamento della Coda`, `Reazione: +7, 2d8+7 contundenti, spinge 3m`],
    ],
    luoghi: [`monte-cinere`],
  },
];

// 14. PNG Minori — Schede Rapide
const PNG_MINORI = [
  {
    id: `sienna`, gruppo: `setta`, nome: `Sienna Redscale`, sottotitolo: `La Mano di Corvus`,
    righe: [
      `Tiefling, F, 36 anni. Mercante di spezie in copertura, principale agente operativo della Setta. CR 4.`,
      `FOR+1 DES+4 COS+2 INT+3 SAG+2 CAR+3 | PF 38 CA 14 | Pugnale +6 1d4+4, Veleno CD13`,
      `Porta un anello con il simbolo dei Sette Saggi rovesciato. Torna più volte nella campagna.`,
    ],
    nota: `Prima apparizione: Quest 4.6 (La Spia nella Taverna). Ritorna: Quest 4.10, arco di Corvus.`,
    luoghi: [`passo`],
  },
  {
    id: `ombra-bianca`, gruppo: `indipendente`, nome: `Ombra-Bianca`, sottotitolo: `La Disertrice`,
    righe: [
      `Umana, F, 25 anni. Ex agente della Setta nascosta a Villagrotta. CR 2.`,
      `FOR+0 DES+3 COS+1 INT+3 SAG+2 CAR+2 | PF 22 CA 13 | Sa il vero nome di Corvus.`,
      `Conosce posizione del QG della Setta e data del rituale finale. Proteggerla è priorità.`,
    ],
    nota: `Trovata a Villagrotta. È la chiave per smascherare Corvus — la Setta la cerca.`,
    luoghi: [`villagrotta`],
  },
  {
    id: `warwick`, gruppo: `luce`, nome: `Warwick il Segugio`, sottotitolo: ``,
    righe: [
      `Umano, M, 45 anni. Cacciatore di taglie al servizio di Lady Anya. CR 3.`,
      `FOR+3 DES+3 COS+2 INT+2 SAG+3 CAR+1 | PF 32 CA 14 | Balestra +5 1d8+3`,
      `Ha il compito di monitorare i PG. Non è malvagio — fa il suo lavoro.`,
    ],
    nota: `Appare dopo che i PG iniziano a trovare troppi segreti. Può essere corrotto o convinto.`,
    luoghi: [],
  },
  {
    id: `gorc`, gruppo: `neutrale`, nome: `Gorc il Nano`, sottotitolo: `Testimone di Aethelred`,
    righe: [
      `Nano, M, 120 anni. Vive a Villagrotta. Era presente durante la Grande Frattura da bambino.`,
      `Non combatte. INT+4 SAG+4. Parla nel sonno in Antico Comune (lingua di Aethelred).`,
      `Nipote di un assistente del Saggio Ignis. Ricorda dettagli che nessun documento riporta.`,
    ],
    nota: `Fonte storica unica. Se i PG lo aiutano (qualsiasi quest a Villagrotta) inizia a ricordare.`,
    luoghi: [`villagrotta`],
  },
  {
    id: `rook`, gruppo: `indipendente`, nome: `Rook il Cacciatore`, sottotitolo: `Guida alle Alture`,
    righe: [
      `Mezzorco, M, 28 anni. Cacciatore freelance. Ha visto Cinerebrax. CR 2.`,
      `FOR+4 DES+3 COS+3 INT+1 SAG+3 CAR+0 | PF 28 CA 13 | Arco lungo +5 1d8+3`,
      `Porta sempre una torcia. Non parla di ciò che ha visto finché non si fida dei PG.`,
    ],
    nota: `Guida essenziale per Monte Cinere. Tre interazioni positive: rivela tutto sul drago.`,
    luoghi: [`monte-cinere`],
  },
];

// ---------------------------------------------------------------------
// PARTE III — I VILLAGGI SPERDUTI
// ---------------------------------------------------------------------
const VILLAGGI = [
  {
    id: `auriverde`, nome: `Auriverde`,
    descrizione: `Crocevia orientale, ~300 abitanti. Vigneti dorati, fontana eterna. Hub centrale per i PG.`,
    abitanti: [
      { t: `Mira la Locandiera (informatrice di Oakhart)` },
      { t: `Theo il Bambino (moneta di Aethelred)` },
      { t: `Bardo la Guardia (ex soldato con segreti)` },
    ],
    note: [`Cippo con i nomi dei Sette Saggi a 2h a nord. La moneta di Theo prova che Aethelred era unita.`],
  },
  {
    id: `bassa-marea`, nome: `Bassa Marea`,
    descrizione: `Porto nascosto, ~180 abitanti. Pescatori e disertori. Nessuna domanda.`,
    abitanti: [
      { t: `Nava la Pescatrice (contrabbandiera onesta)` },
      { t: `Il Dottore (ex mago di Umbrage, possiede pagina del Tomo di Lysandra)` },
      { t: `Crate il Barelliere (muto, sa leggere le labbra)` },
    ],
    note: [`Il Dottore possiede un frammento del Tomo di Lysandra — non sa cosa sia.`],
  },
  {
    id: `roccabuia`, nome: `Roccabuia`,
    descrizione: `Ai piedi delle montagne di Umbrage, ~220 abitanti. Minatori stanchi della guerra.`,
    abitanti: [
      { t: `Madre Verna (sciamana, statuetta delle sette braccia)` },
      { t: `Draven il Fabbro (rifiuta di forgiare armi)` },
      { t: `Livia Nox-Sangue (erede bastarda di Kaelan, ha visioni)` },
    ],
    note: [`Livia non sa di essere una Nox. Le sue visioni includono il drago che brucia entrambe le città.`],
  },
  {
    id: `cenerefondi`, nome: `Cenerefondi`,
    descrizione: `Valle sotto Monte Cinere, ~400 abitanti. Il cielo è sempre grigio.`,
    abitanti: [
      { t: `Sindaco Orvus (nega la realtà)` },
      { t: `Yssa la Geologa (ha prove del drago, le nasconde)` },
      { t: `Figlio di Cenere (conosce il nome Cinerebrax, identità misteriosa)` },
    ],
    note: [`Hub principale della quest del drago. Tutte le prove fisiche del risveglio convergono qui.`],
  },
  {
    id: `passo`, nome: `Passo delle Lacrime`,
    descrizione: `Unico valico montano, ~90 abitanti. Pedaggi, contrabbando, spie.`,
    abitanti: [
      { t: `Ren il Doganiere (lavora per tutti senza saperlo)` },
      { t: `La Gemella Rossa (contrabbandiera, ha una terza sorella di cui non parla)` },
      { t: `Anselm il Cieco (ricorda 50 anni di conversazioni)` },
    ],
    note: [`Anselm ha sentito parlare di "risvegliare il cuore prima che il drago arrivi" — connessione Corvus+drago.`],
  },
  {
    id: `radicechiara`, nome: `Radicechiara`,
    descrizione: `Villaggio druido nel bosco orientale, ~150 abitanti. Neutrale da sempre.`,
    abitanti: [
      { t: `Anziana Siol (sa dove trovare lo spirito di Silas)` },
      { t: `Finn il Raccoglitore (porta frammento del Cuore d'Isola)` },
      { t: `Dew la Bambina Silenziosa (parla con gli animali)` },
    ],
    note: [`Siol è la chiave per contattare Silas. Finn porta inconsapevolmente un frammento del Cuore d'Isola.`],
  },
  {
    id: `villagrotta`, nome: `Villagrotta`,
    descrizione: `Villaggio sotterraneo, ~130 abitanti. Reietti di Umbrage sotto le montagne.`,
    abitanti: [
      { t: `Petra la Cronista (incide visioni senza saperlo)` },
      { t: `Gorc il Nano (testimone diretto di Aethelred)`, ref: `gorc` },
      { t: `Ombra-Bianca (ex agente della Setta — la chiave per smascherare Corvus)`, ref: `ombra-bianca` },
    ],
    note: [`Il villaggio più importante per il finale della campagna. Ombra-Bianca e Gorc sono risorse uniche.`],
  },
];

// Città e luoghi principali: il PDF NON contiene una loro descrizione.
// Qui ci sono solo i collegamenti ad altre parti della guida.
const CITTA = [
  { id: `lumina`, nome: `Lumina`, fazione: `luce` },
  { id: `solara`, nome: `Solara`, fazione: `luce` },
  { id: `umbrage`, nome: `Umbrage`, fazione: `ombra` },
  { id: `ferrovia`, nome: `Ferrovia`, fazione: `ombra` },
  { id: `aethelred`, nome: `Aethelred (Rovine)`, fazione: null },
  { id: `monte-cinere`, nome: `Monte Cinere`, fazione: null },
];

// ---------------------------------------------------------------------
// PARTE IV — QUEST E AVVENTURE
// ---------------------------------------------------------------------
const QUEST = [
  {
    id: `4.1`, titolo: `Il Messaggero Muto`, info: `Lvl 1 · Auriverde`,
    testo: `Un corriere arriva silenzioso per magia con una mappa dei tunnel sotto Monte Cinere. La mappa è di Corvus.`,
    connette: `Quest del drago (i tunnel), Corvus (l'origine), Kaelan (la consegna se i PG scelgono così).`,
    luoghi: [`auriverde`], personaggi: [`corvus`, `kaelan`, `cinerebrax`],
  },
  {
    id: `4.2`, titolo: `Il Pozzo Avvelenato`, info: `Lvl 1 · Radicechiara`,
    testo: `Il pozzo si contamina per una crepa nel suolo causata dal risveglio di Cinerebrax.`,
    connette: `Quest del drago (prima prova fisica), Spirito di Silas (Siol come ricompensa rivela dove trovarlo).`,
    luoghi: [`radicechiara`], personaggi: [`cinerebrax`, `silas`],
  },
  {
    id: `4.3`, titolo: `La Reliquia Rubata`, info: `Lvl 1–2 · Passo delle Lacrime`,
    testo: `Una statua rubata nasconde una lettera che prova un infiltrato di Corvus a Lumina.`,
    connette: `Setta di Corvus (prima prova scritta), arco di Anya (può ricevere la lettera o meno).`,
    luoghi: [`passo`], personaggi: [`corvus`, `anya`],
  },
  {
    id: `4.4`, titolo: `La Carovana Scomparsa`, info: `Lvl 2 · Auriverde→Cenerefondi`,
    testo: `Una carovana è stata attaccata da una wyvern al servizio di Cinerebrax. Una cassa è di Corvus.`,
    connette: `Drago (primo avvistamento di una wyvern), Setta (materiale di Corvus).`,
    luoghi: [`auriverde`, `cenerefondi`], personaggi: [`cinerebrax`, `corvus`],
  },
  {
    id: `4.5`, titolo: `Il Bambino con gli Occhi d'Argento`, info: `Lvl 1 · Radicechiara/Aethelred`,
    testo: `Un bambino trovato nelle rovine porta i PG alla prima camera intatta di Aethelred. È una manifestazione del Cuore d'Isola.`,
    connette: `Cuore d'Isola, spirito di Silas, arco narrativo principale.`,
    luoghi: [`radicechiara`, `aethelred`], personaggi: [`silas`],
  },
  {
    id: `4.6`, titolo: `La Spia nella Taverna`, info: `Lvl 1–2 · Passo delle Lacrime`,
    testo: `Una rete di spionaggio codificata in canzoni da osteria porta fino a Sienna Redscale.`,
    connette: `Prima apparizione di Sienna Redscale, rete operativa di Corvus.`,
    luoghi: [`passo`], personaggi: [`sienna`, `corvus`],
  },
  {
    id: `4.7`, titolo: `Il Contrabbandiere Onesto`, info: `Lvl 1 · Bassa Marea`,
    testo: `Proteggere rifugiati dell'Ombra rivela una lettera delle trattative di pace Oakhart-Kaelan.`,
    connette: `Arco di pace (accelera o sabota), caratterizzazione di Oakhart.`,
    luoghi: [`bassa-marea`], personaggi: [`oakhart`, `kaelan`],
  },
  {
    id: `4.8`, titolo: `Il Manoscritto Bruciato`, info: `Lvl 2 · Villagrotta`,
    testo: `Agenti di Corvus cancellano sistematicamente i sigilli che stabilizzano il Cuore d'Isola.`,
    connette: `Piano operativo di Corvus, instabilità del Cuore d'Isola, finale della campagna.`,
    luoghi: [`villagrotta`], personaggi: [`corvus`],
  },
  {
    id: `4.9`, titolo: `Le Lucciole Nere`, info: `Lvl 1–2 · Roccabuia`,
    testo: `Un frammento del Tomo di Lysandra attira vittime in trance. Recuperarlo è prezioso ma pericoloso.`,
    connette: `Documenti proibiti (arco principale), Seraphim (lo vuole), Kaelan (non sa che esiste).`,
    luoghi: [`roccabuia`], personaggi: [`seraphim`, `kaelan`],
  },
  {
    id: `4.10`, titolo: `Il Duello di Mezza Estate`, info: `Lvl 2 · Passo delle Lacrime`,
    testo: `Sventare l'assassinio di Oakhart durante il torneo annuale. Corvus vuole sabotare la pace.`,
    connette: `Oakhart (diventa alleato), Sienna Redscale (seconda apparizione), arco di pace.`,
    luoghi: [`passo`], personaggi: [`oakhart`, `sienna`, `corvus`],
  },
];

const MALEDIZIONE = [
  {
    id: `atto-1`, titolo: `ATTO I — La Cenere Scende sul Passo (Lvl 1-2)`,
    righe: [
      `Luogo: Cenerefondi. I PG raccolgono le prime prove del risveglio.`,
      `PNG chiave: Yssa (geologa), Orvus (sindaco), Figlio di Cenere.`,
      `Climax: Attacco di una wyvern al villaggio di notte.`,
      `Obiettivo: Partire verso Monte Cinere con le prove sufficienti.`,
    ],
    luoghi: [`cenerefondi`],
  },
  {
    id: `atto-2`, titolo: `ATTO II — L'Antro del Fuoco Antico (Lvl 2-3)`,
    righe: [
      `Luogo: Monte Cinere, tunnel e camere. 5 zone progressivamente pericolose.`,
      `Trappole: gas vulcanici, pavimento su magma, camera delle wyvern addormentate.`,
      `Zona chiave: L'Anticamera con le ossa di secoli di vittime.`,
      `Obiettivo: Raggiungere l'antro principale dove dorme Cinerebrax.`,
    ],
    luoghi: [`monte-cinere`],
  },
  {
    id: `atto-3`, titolo: `ATTO III — Il Cuore di Fiamma (Lvl 3-4) — Tre Finali`,
    righe: [
      `FINALE A (Fuga): Raccogliere prove, avvertire le fazioni, creare coalizione anti-drago.`,
      `FINALE B (Rituale del Sonno): Con Silas + frammento del Cuore, far tornare il drago a dormire 50 anni.`,
      `FINALE C (Dialogo): Convincere Cinerebrax che l'isola sta cambiando. Persuasione CD 20.`,
    ],
    nota: `Qualsiasi finale: il libro draconico nell'antro contiene la verità sulla Frattura.`,
    luoghi: [`monte-cinere`],
  },
];

// ---------------------------------------------------------------------
// PARTE V — SEGRETI E INDIZI
// ---------------------------------------------------------------------
const COME_USARE_INDIZI = `Gli indizi sono progettati per essere trovati in qualsiasi ordine. Ognuno aggiunge un pezzo al puzzle senza rivelare tutto. Nessun singolo indizio è sufficiente — servono almeno 4-5 indizi della stessa categoria per permettere ai PG di trarre conclusioni affidabili.`;

const INDIZI = [
  {
    id: `frattura`, titolo: `20. Indizi sulla Vera Storia della Frattura`,
    voci: [
      { id: `f1`, titolo: `Cippo di Auriverde`, testo: `I nomi di tutti e sette i Saggi — la metà "cattiva" è stata scalpellata. Ma si legge ancora. Arcano CD 12: l'energia residua è sia luce che ombra, intrecciata.`, dove: `Trovato: a 2h da Auriverde sulla strada verso nord.`, luoghi: [`auriverde`] },
      { id: `f2`, titolo: `Moneta di Theo`, testo: `Coniata ad Aethelred: tutti e sette i simboli dei Saggi in cerchio. Nessuna divisione tra Luce e Ombra.`, dove: `Trovata: al collo del bambino Theo ad Auriverde.`, luoghi: [`auriverde`] },
      { id: `f3`, titolo: `Incisione di Petra`, testo: `Ha inciso inconsapevolmente la scena della Frattura vista da testimone. Gorc la riconosce.`, dove: `Trovata: parete di Villagrotta.`, luoghi: [`villagrotta`] },
      { id: `f4`, titolo: `Sogno di Livia`, testo: `Vede Lysandra passare un testo a una figura in abiti da fabbro. Un Blackstone.`, dove: `Ottenuto: confidandosi con Livia a Roccabuia (fiducia necessaria).`, luoghi: [`roccabuia`] },
      { id: `f5`, titolo: `Frammento di Finn`, testo: `Pietra del Cuore d'Isola: reagisce sia alla magia della luce che dell'ombra, senza distinzione.`, dove: `Trovato: Finn lo porta da Radicechiara.`, luoghi: [`radicechiara`] },
      { id: `f6`, titolo: `Voce di Gorc nel sonno`, testo: `In antico comune: "Non era bene contro male. Era due orgogliosi che avevano dimenticato di servire qualcosa di più grande."`, dove: `Udita: di notte a Villagrotta.`, luoghi: [`villagrotta`] },
      { id: `f7`, titolo: `Libro Draconico di Cinerebrax`, testo: `Testimonianza oculare del drago: né Valerius né Lysandra erano dalla parte del torto — entrambi lo erano.`, dove: `Trovato: antro di Cinerebrax a Monte Cinere.`, luoghi: [`monte-cinere`] },
      { id: `f8`, titolo: `Visioni di Silas`, testo: `Lo spirito mostra la Frattura come avvenne — nessuna versione di parte, solo fatti.`, dove: `Ottenuto: liberando o contattando Silas nelle rovine.`, luoghi: [`aethelred`] },
    ],
  },
  {
    id: `setta`, titolo: `21. Indizi sulla Setta di Corvus`,
    voci: [
      { id: `s1`, titolo: `Anello Rovesciato`, testo: `Il simbolo dei Sette Saggi portato rovesciato: segno di riconoscimento della Setta. Visto su Sienna Redscale.`, dove: `Primo avvistamento: Quest 4.6.`, luoghi: [`passo`] },
      { id: `s2`, titolo: `Lettera nella Statua`, testo: `Prima prova scritta di un infiltrato di Corvus a Lumina. Nome in codice: "Settimo Sole".`, dove: `Trovata: Quest 4.3, statua rubata.`, luoghi: [`passo`] },
      { id: `s3`, titolo: `Diagramma nella Cassa Bruciata`, testo: `Macchina per concentrare l'energia del Cuore d'Isola. Qualcuno ha studiato i rituali di Silas.`, dove: `Trovato: Quest 4.4, cassa nella carovana.`, luoghi: [] },
      { id: `s4`, titolo: `Agenti che Cancellano i Glifi`, testo: `Prova diretta: la Setta rende instabile il Cuore d'Isola deliberatamente. Preparazione al rituale finale.`, dove: `Scoperto: Quest 4.8.`, luoghi: [`villagrotta`] },
      { id: `s5`, titolo: `Libretto Contabile al Passo`, testo: `Movimenti di denaro verso "T. d'Aurum" — il nome da morto di Theron.`, dove: `Trovato: punto morto di Sienna Redscale.`, luoghi: [`passo`] },
      { id: `s6`, titolo: `Testimonianza di Ombra-Bianca`, testo: `Sa il vero nome di Corvus, posizione del QG e data del rituale. La bomba a orologeria della campagna.`, dove: `Trovata: Villagrotta.`, luoghi: [`villagrotta`] },
    ],
  },
  {
    id: `drago`, titolo: `22. Indizi sul Drago Cinerebrax`,
    voci: [
      { id: `d1`, titolo: `Pecore Carbonizzate`, testo: `Cenere disposta a cerchio, temperatura impossibile per qualsiasi fuoco normale.`, dove: `Trovate: ai margini di Cenerefondi.`, luoghi: [`cenerefondi`] },
      { id: `d2`, titolo: `Striature Nere sul Campanile`, testo: `Dall'alto verso il basso, come artigli. La pietra è fusa ai bordi.`, dove: `Viste: campanile di Cenerefondi.`, luoghi: [`cenerefondi`] },
      { id: `d3`, titolo: `Impronte di Artigli di Yssa`, testo: `80 cm per impronta, incise nella roccia solida.`, dove: `Coperte da un telo da Yssa a Cenerefondi.`, luoghi: [`cenerefondi`] },
      { id: `d4`, titolo: `Respiro Ritmico sotto Monte Cinere`, testo: `Ogni notte alle 03:14, ogni settimana più forte.`, dove: `Registrato: negli appunti di Yssa.`, luoghi: [`cenerefondi`] },
      { id: `d5`, titolo: `Rook con la Torcia`, testo: `Ha visto Cinerebrax. Tre interazioni positive: "Un'ombra enorme con le ali piegate. Il cielo gli faceva spazio."`, dove: `Ottenuto: fiducia con Rook il Cacciatore.`, luoghi: [] },
      { id: `d6`, titolo: `Figlio di Cenere conosce il Nome`, testo: `Dice "Cinerebrax" senza che nessuno glielo abbia detto.`, dove: `Incontro: Cenerefondi.`, luoghi: [`cenerefondi`] },
      { id: `d7`, titolo: `Visione di Livia Nox-Sangue`, testo: `Il drago brucia entrambe le città. E sembra trovarlo familiare, come se la guerra lo ricordasse di qualcosa.`, dove: `Ottenuta: confidandosi con Livia.`, luoghi: [`roccabuia`] },
    ],
  },
];

// ---------------------------------------------------------------------
// PARTE VI — COLLEGAMENTI DI TRAMA
// ---------------------------------------------------------------------
const CONNESSIONI_ARCHI = [
  `A ↔ B: Corvus sabota la pace → combattere la Setta è prerequisito per la pace.`,
  `A ↔ D: La verità è il solo argomento che convince Anya e Kaelan → raccogliere gli indizi prima.`,
  `B ↔ C: Corvus usa il drago come distrazione → sconfiggere Corvus libera risorse per il drago.`,
  `C ↔ D: Il libro di Cinerebrax è l'indizio finale → la quest del drago sblocca la verità.`,
];

const ARCHI = [
  {
    id: `A`, titolo: `ARCO A — La Pace Impossibile`,
    intro: `Oakhart e Kaelan vogliono la pace. Corvus vuole sabotarla. Anya e Lyra Blackstone osteggiano ogni accordo per motivi diversi.`,
    fasi: [
      [`Innesco`, `Quest 4.7: i PG trovano la lettera delle trattative di pace nella barca dei rifugiati.`],
      [`Escalation`, `Quest 4.10: assassinio di Oakhart tentato da Sienna Redscale. Se i PG lo sventano, Oakhart li arruola come agenti della pace.`],
      [`Climax`, `I PG devono convincere Anya e Kaelan che la verità sulla Frattura annulla le ragioni della guerra.`],
      [`Risoluzione`, `Richiede: la lettera Oakhart-Kaelan + almeno 4 indizi sulla vera storia + Silas liberato.`],
    ],
  },
  {
    id: `B`, titolo: `ARCO B — La Setta della Settezza Perduta`,
    intro: `Corvus (alias Theron d'Aurum) opera nell'ombra destabilizzando l'isola per attivare il Cuore d'Isola con un rituale.`,
    fasi: [
      [`Innesco`, `Quest 4.6: prima apparizione di Sienna Redscale. I PG capiscono che esiste una terza parte.`],
      [`Escalation`, `Quest 4.3 + 4.8: lettera dell'infiltrato + distruzione dei sigilli. La Setta ha un piano operativo preciso.`],
      [`Rivelazione`, `Ombra-Bianca a Villagrotta: rivela il nome di Corvus. Se protetta, smantella la Setta dall'interno.`],
      [`Climax`, `Impedire il rituale di attivazione del Cuore d'Isola nelle rovine di Aethelred.`],
    ],
  },
  {
    id: `C`, titolo: `ARCO C — Il Risveglio di Cinerebrax`,
    intro: `Il drago si risveglia a causa dell'instabilità del Cuore d'Isola. È una minaccia esterna che forza le fazioni a cooperare.`,
    fasi: [
      [`Innesco`, `Quest 4.2 + 4.4: il pozzo avvelenato e la carovana attaccata sono i primi segnali.`],
      [`Escalation`, `I PG arrivano a Cenerefondi e raccolgono le prove fisiche. Yssa e il Figlio di Cenere completano il quadro.`],
      [`Climax`, `Tre atti a Monte Cinere: tunnels, camera delle wyvern, confronto con Cinerebrax.`],
      [`Risoluzione`, `Il libro draconico nell'antro è la prova finale della verità sulla Frattura. Cambia tutto.`],
    ],
  },
  {
    id: `D`, titolo: `ARCO D — La Verità Sepolta`,
    intro: `La vera storia di Aethelred è frammentata in otto indizi sparsi per l'isola. Riunirli e presentarli ad entrambe le fazioni è la chiave per la pace.`,
    fasi: [
      [`Innesco`, `Qualsiasi primo indizio (cippo di Auriverde, moneta di Theo, ecc.). I PG iniziano a vedere che qualcosa non torna.`],
      [`Escalation`, `Ogni indizio aggiunge complessità. Gorc, Siol, Silas e il libro di Cinerebrax sono le fonti più complete.`],
      [`Climax`, `Presentare le prove ad Anya e Kaelan simultaneamente, in presenza di testimoni neutri.`],
      [`Risoluzione`, `Liberare Silas, smascherare le bugie di entrambe le fazioni, e aprire la strada al Consiglio dell'Equilibrio.`],
    ],
  },
];

const TIMELINE = {
  intro: `Questa timeline crea pressione narrativa. I PG non devono saperla — ma il DM sì.`,
  voci: [
    [`Settimana 0 (Arrivo dei PG)`, `Le pecore di Cenerefondi sono già carbonizzate. Yssa ha già le prove. Corvus ha già iniziato a cancellare i sigilli nelle rovine. Oakhart e Kaelan hanno già avuto il primo incontro segreto.`],
    [`Settimana 1`, `Attacco della wyvern alla carovana (Quest 4.4). Primo tentativo di avvelenamento del pozzo (Quest 4.2). Warwick inizia a monitorare i PG se hanno trovato più di un segreto.`],
    [`Settimana 2`, `Sienna Redscale arriva al Passo delle Lacrime. La rete di spionaggio è attiva (Quest 4.6). Il respiro di Cinerebrax diventa più forte — percepibile anche di giorno vicino alla montagna.`],
    [`Settimana 3`, `Corvus organizza l'attentato a Oakhart (Quest 4.10, al torneo del solstizio). Se i PG non intervengono, Oakhart muore e l'arco di pace collassa.`],
    [`Settimana 4–5`, `Cinerebrax si sveglia completamente. Prima incursione verso Cenerefondi (non la distrugge — è un avvertimento). Entrambe le fazioni ricevono la notizia. Primo momento in cui possono cooperare.`],
    [`Settimana 6+`, `Rituale di Corvus entra nella fase finale — ha bisogno che il Cuore d'Isola sia completamente instabile. Se i PG non intervengono, i sigilli sono tutti cancellati entro la settimana 8.`],
    [`Settimana 8 (Scadenza)`, `Se Corvus non è fermato, attiva il rituale nelle rovine. Se Cinerebrax non è neutralizzato, attacca Lumina o Ferrovia. Se la pace non è avanzata, la guerra diventa aperta. Il DM gestisce le scadenze in base al ritmo della campagna.`],
  ],
  citazione: `"Ogni segreto sepolto sotto Aethelred aspetta qualcuno con il coraggio di scavare nel passato."`,
  chiusura: [
    `Questa guida contiene materiale per una campagna completa di 20–30 sessioni. Gli archi narrativi sono progettati per intrecciarsi naturalmente: ogni quest secondaria alimenta almeno uno degli archi principali, ogni indizio appartiene a più fili della trama, ogni personaggio ha connessioni con almeno due altri.`,
    `Il finale dipende dalle scelte dei PG — non c'è un solo finale corretto. La verità può essere rivelata, la pace può essere raggiunta, il drago può essere fermato o convinto, Corvus può essere smascherato o sfuggire. L'isola di Sanguis e Lux è un mondo vivo che reagisce a ogni decisione.`,
  ],
};

// 23. Web della Trama — nodi ed etichette come nel diagramma del PDF
const WEB = {
  nodi: [
    { id: `corvus`, t1: `CORVUS`, t2: `(Theron d'Aurum)`, t3: `Setta`, x: 400, y: 80, r: 62, colore: `setta`, link: `#/personaggi/corvus` },
    { id: `cinerebrax`, t1: `CINEREBRAX`, t2: `Drago del Fuoco`, x: 205, y: 125, r: 58, colore: `drago`, link: `#/personaggi/cinerebrax` },
    { id: `silas`, t1: `SILAS`, t2: `Spirito Vincolato`, x: 610, y: 105, r: 58, colore: `neutrale`, link: `#/personaggi/silas` },
    { id: `umbrage`, t1: `UMBRAGE`, t2: `Kaelan di Nox`, x: 120, y: 280, r: 62, colore: `ombra`, link: `#/luoghi/umbrage` },
    { id: `lumina`, t1: `LUMINA`, t2: `Anya d'Aurum`, x: 680, y: 265, r: 62, colore: `luce`, link: `#/luoghi/lumina` },
    { id: `aethelred`, t1: `AETHELRED`, t2: `(Rovine)`, t3: `Cuore d'Isola`, x: 400, y: 405, r: 66, colore: `aethelred`, link: `#/luoghi/aethelred` },
    { id: `ferrovia`, t1: `FERROVIA`, t2: `L.Blackstone`, x: 115, y: 560, r: 60, colore: `ferrovia`, link: `#/luoghi/ferrovia` },
    { id: `solara`, t1: `SOLARA`, t2: `Elias Oakhart`, x: 690, y: 530, r: 60, colore: `solara`, link: `#/luoghi/solara` },
    { id: `radicechiara`, t1: `Radice`, t2: `chiara`, x: 405, y: 290, r: 28, colore: `villaggio`, link: `#/luoghi/radicechiara`, piccolo: true },
    { id: `roccabuia`, t1: `Roccabuia`, x: 260, y: 360, r: 28, colore: `villaggio`, link: `#/luoghi/roccabuia`, piccolo: true },
    { id: `villagrotta`, t1: `Villa`, t2: `grotta`, x: 170, y: 390, r: 28, colore: `villaggio`, link: `#/luoghi/villagrotta`, piccolo: true },
    { id: `cenerefondi`, t1: `Cenere`, t2: `fondi`, x: 250, y: 485, r: 28, colore: `villaggio`, link: `#/luoghi/cenerefondi`, piccolo: true },
    { id: `auriverde`, t1: `Auriverde`, x: 545, y: 350, r: 28, colore: `villaggio`, link: `#/luoghi/auriverde`, piccolo: true },
    { id: `bassa-marea`, t1: `Bassa`, t2: `Marea`, x: 545, y: 480, r: 28, colore: `villaggio`, link: `#/luoghi/bassa-marea`, piccolo: true },
    { id: `passo`, t1: `Passo`, t2: `Lacrime`, x: 405, y: 560, r: 28, colore: `villaggio`, link: `#/luoghi/passo`, piccolo: true },
    { id: `pace`, t1: `TRATTATIVE DI PACE`, t2: `(Oakhart ↔ Kaelan)`, x: 400, y: 670, rett: true, colore: `pace`, link: `#/archi` },
  ],
  // tipo: principale | guerra | pace | setta | drago | magico | villaggio
  archi: [
    { da: `auriverde`, a: `lumina`, tipo: `principale`, etichetta: `confine est` },
    { da: `roccabuia`, a: `umbrage`, tipo: `principale`, etichetta: `confine ovest` },
    { da: `aethelred`, a: `corvus`, tipo: `setta`, etichetta: `obiettivo Corvus` },
    { da: `aethelred`, a: `cinerebrax`, tipo: `drago`, etichetta: `risveglia` },
    { da: `aethelred`, a: `silas`, tipo: `magico`, etichetta: `spirito legato` },
    { da: `umbrage`, a: `ferrovia`, tipo: `principale`, etichetta: `alleanza` },
    { da: `lumina`, a: `solara`, tipo: `principale`, etichetta: `alleanza` },
    { da: `lumina`, a: `umbrage`, tipo: `guerra`, etichetta: `GUERRA` },
    { da: `solara`, a: `pace`, tipo: `pace`, etichetta: `Oakhart negozia` },
    { da: `villagrotta`, a: `pace`, tipo: `pace`, etichetta: `Kaelan negozia` },
    { da: `corvus`, a: `lumina`, tipo: `setta`, etichetta: `infiltrato` },
    { da: `corvus`, a: `umbrage`, tipo: `setta`, etichetta: `sabotaggio` },
    { da: `corvus`, a: `cinerebrax`, tipo: `setta`, etichetta: `vuole usarlo` },
    { da: `passo`, a: `pace`, tipo: `setta`, etichetta: `vuole sabotare` },
    { da: `cinerebrax`, a: `ferrovia`, tipo: `drago`, etichetta: `cenere su Ferrovia` },
    { da: `cinerebrax`, a: `cenerefondi`, tipo: `drago`, etichetta: `cenere su Cenerefondi` },
    { da: `silas`, a: `umbrage`, tipo: `magico`, etichetta: `verità nascosta` },
    { da: `silas`, a: `lumina`, tipo: `magico`, etichetta: `verità nascosta` },
    { da: `auriverde`, a: `aethelred`, tipo: `villaggio` },
    { da: `roccabuia`, a: `aethelred`, tipo: `villaggio` },
    { da: `cenerefondi`, a: `aethelred`, tipo: `villaggio` },
    { da: `passo`, a: `aethelred`, tipo: `villaggio` },
    { da: `bassa-marea`, a: `solara`, tipo: `villaggio` },
    { da: `radicechiara`, a: `aethelred`, tipo: `villaggio` },
  ],
  legenda: [
    [`villaggio`, `Villaggi collegati`],
    [`magico`, `Legame magico`],
    [`drago`, `Minaccia del drago`],
    [`setta`, `Setta/Manipolazione`],
    [`pace`, `Alleanza/Pace`],
    [`guerra`, `Conflitto/Guerra`],
    [`principale`, `Connessione principale`],
  ],
};
