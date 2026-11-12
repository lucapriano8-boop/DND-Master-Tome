// =====================================================================
// BESTIARIO — trascritto parola per parola dal PDF
// "Isola di Sanguis e Lux — Bestiario della Setta e dell'Isola".
// Il testo NON va modificato. I campi "luoghi", "quest", "personaggi",
// "alias" servono solo a collegare le schede tra loro.
// =====================================================================

const BESTIARIO_INFO = {
  titolo: `Bestiario`,
  sottotitolo: `della Setta della Settezza Perduta e delle altre creature dell'isola`,
  supplemento: `Supplemento alla Guida Completa del Dungeon Master`,
  meta: `D&D 5e · Livelli 1–4 · 16 schede, tabelle degli incontri`,
  comeUsare: [
    `Questo supplemento raccoglie le schede delle creature per la campagna dell'Isola di Sanguis e Lux. Le statistiche usano le regole di D&D 5ª edizione e sono pensate per gruppi di 4 personaggi dal 1° al 4° livello, come la Guida Completa del DM.`,
    `Ogni scheda ha due parti: a sinistra il blocco delle statistiche, a destra il riquadro Sull'isola, con il luogo in cui si incontra la creatura, come si comporta, il bottino e il filo di trama a cui è legata.`,
    `Alcune creature vengono direttamente dalla guida (le wyvern di Cinerebrax, le Lucciole Nere, il Golem di Lyra Blackstone, i Cancellatori della Quest 4.8, Sienna Redscale); altre sono nuove, scritte per riempire i vuoti dei tunnel, delle rovine e della rete della Setta. La nota Fonte in fondo a ogni scheda dice quali sono quali. I PNG che hanno già una scheda nella guida (Corvus, Cinerebrax, Lyra Blackstone, ecc.) non sono ripetuti qui.`,
  ],
};

const SEZIONI_BESTIARIO = [
  { id: `setta`, nome: `Setta della Settezza Perduta`, etichetta: `SETTA DELLA SETTEZZA PERDUTA` },
  { id: `drago`, nome: `Creature di Cinerebrax`, etichetta: `CREATURE DI CINEREBRAX` },
  { id: `rovine`, nome: `Rovine di Aethelred`, etichetta: `ROVINE DI AETHELRED` },
  { id: `isola`, nome: `Magie e creature dell'isola`, etichetta: `MAGIE E CREATURE DELL'ISOLA` },
];

const STAT_LABELS = [`FOR`, `DES`, `COS`, `INT`, `SAG`, `CAR`];

const CREATURE = [
  // ------------------------------------------------------------------
  {
    id: `novizio`, sezione: `setta`,
    nome: `Novizio della Setta`,
    tipo: `Umanoide Medio (qualsiasi razza), neutrale malvagio`,
    indice: { tipo: `Umanoide Medio (qualsiasi razza)`, gs: `1/4`, dove: `Ovunque ci sia la rete della Setta: Passo delle Lacrime` },
    ca: `12 (armatura di cuoio)`, pf: `13 (3d8)`, vel: `9 m`,
    stats: [`10 (+0)`, `14 (+2)`, `10 (+0)`, `11 (+0)`, `10 (+0)`, `12 (+1)`],
    dettagli: [
      [`Abilità`, `Furtività +4, Inganno +3`],
      [`Sensi`, `Percezione passiva 10`],
      [`Linguaggi`, `Comune`],
      [`Sfida`, `1/4 (50 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Fervore dei Sette`, `Quando un altro membro della Setta entro 9 m dal novizio scende a 0 punti ferita, il novizio ottiene 3 punti ferita temporanei.`],
      [`Anello Rovesciato`, `Porta il simbolo dei Sette Saggi capovolto, nascosto sotto il guanto o cucito nel colletto.`],
    ],
    azioni: [
      [`Pugnale`, `Attacco con arma da mischia o a distanza: +4 al tiro per colpire, portata 1,5 m o gittata 6/18 m, un bersaglio. Colpito: 4 (1d4 + 2) danni perforanti.`],
      [`Balestra Leggera`, `Attacco con arma a distanza: +4 al tiro per colpire, gittata 24/96 m, un bersaglio. Colpito: 6 (1d8 + 2) danni perforanti.`],
    ],
    isola: {
      dove: `Ovunque ci sia la rete della Setta: Passo delle Lacrime (Quest 4.6), carovane (Quest 4.4), dintorni delle rovine.`,
      tattiche: `Contadini, scaricatori e disertori reclutati con la promessa di una «pace vera». Combattono in gruppo e scappano se metà del gruppo cade. Se catturati, recitano a memoria frasi di Corvus senza capirle.`,
      bottino: `Anello rovesciato (indizio «Anello Rovesciato»), 2d6 mo, un biglietto in cifrario da canzone d'osteria.`,
      aggancio: `Un novizio interrogato (Intimidire o Persuasione CD 13) può rivelare un punto d'incontro, ma non ha mai visto Corvus in faccia.`,
    },
    fonte: `Creatura nuova, basata sulla rete di Corvus (Parte II e Arco B).`,
    alias: [`Novizi della Setta`, `Novizio della Setta`, `Novizi`],
    luoghi: [`passo`], quest: [`4.6`, `4.4`], personaggi: [],
  },
  // ------------------------------------------------------------------
  {
    id: `lama-rovesciata`, sezione: `setta`,
    nome: `Lama Rovesciata`,
    tipo: `Umanoide Medio (umano), neutrale malvagio`,
    indice: { tipo: `Umanoide Medio (umano)`, gs: `1`, dove: `Scorta di Sienna Redscale` },
    ca: `16 (cotta ad anelli, scudo)`, pf: `27 (5d8 + 5)`, vel: `9 m`,
    stats: [`14 (+2)`, `12 (+1)`, `13 (+1)`, `10 (+0)`, `11 (+0)`, `10 (+0)`],
    dettagli: [
      [`Abilità`, `Atletica +4, Percezione +2`],
      [`Sensi`, `Percezione passiva 12`],
      [`Linguaggi`, `Comune`],
      [`Sfida`, `1 (200 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Formazione Spezzata`, `La lama dispone di vantaggio ai tiri per colpire contro una creatura se almeno uno dei suoi alleati non incapacitati si trova entro 1,5 m da quella creatura.`],
    ],
    azioni: [
      [`Multiattacco`, `La lama effettua due attacchi con la spada lunga.`],
      [`Spada Lunga`, `Attacco con arma da mischia: +4 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 6 (1d8 + 2) danni taglienti.`],
      [`Giavellotto`, `Attacco con arma a distanza: +4 al tiro per colpire, gittata 9/36 m, un bersaglio. Colpito: 5 (1d6 + 2) danni perforanti.`],
    ],
    reazioni: [
      [`Parata`, `La lama aggiunge 2 alla propria CA contro un attacco in mischia che la colpirebbe. Deve vedere l'attaccante e impugnare un'arma da mischia.`],
    ],
    isola: {
      dove: `Scorta di Sienna Redscale (Quest 4.10), guardia del QG della Setta, sentinella durante il rituale finale.`,
      tattiche: `Ex soldati di entrambe le fazioni, «liberati» dall'odio dalla Setta. Si muovono a coppie e accerchiano chi resta isolato. Proteggono gli incantatori della Setta prima di tutto.`,
      bottino: `Anello rovesciato, cotta ad anelli con stemmi di Lumina o di Umbrage abrasi.`,
      aggancio: `Una Lama con lo stemma di Lumina abraso dimostra che la Setta recluta da entrambe le fazioni: un argomento utile davanti ad Anya o a Kaelan.`,
    },
    fonte: `Creatura nuova: il braccio armato della Setta.`,
    alias: [`Lame Rovesciate`, `Lama Rovesciata`],
    luoghi: [], quest: [`4.10`], personaggi: [`sienna`],
  },
  // ------------------------------------------------------------------
  {
    id: `cancellatore`, sezione: `setta`,
    nome: `Cancellatore di Glifi`,
    tipo: `Umanoide Medio (qualsiasi razza), neutrale malvagio`,
    indice: { tipo: `Umanoide Medio (qualsiasi razza)`, gs: `1`, dove: `Villagrotta e tunnel sotto Aethelred` },
    ca: `12 (15 con armatura magica)`, pf: `22 (5d8)`, vel: `9 m`,
    stats: [`9 (−1)`, `14 (+2)`, `10 (+0)`, `15 (+2)`, `12 (+1)`, `10 (+0)`],
    dettagli: [
      [`Abilità`, `Arcano +4, Furtività +4, Storia +4`],
      [`Sensi`, `Percezione passiva 11`],
      [`Linguaggi`, `Comune, Antico Comune`],
      [`Sfida`, `1 (200 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Raschiatura dei Sigilli`, `Con 1 minuto di lavoro (come per la concentrazione) il cancellatore cancella un sigillo stabilizzante del Cuore d'Isola. Il Cuore pulsa: ogni creatura entro 9 m, cancellatore escluso, deve superare un tiro salvezza su Costituzione con CD 12 o subisce 3 (1d6) danni da forza. Ogni sigillo cancellato avvicina il rituale di Corvus (Timeline, settimana 6+).`],
      [`Incantesimi`, `Il cancellatore è un incantatore di 3° livello. Usa Intelligenza (CD del tiro salvezza 12, +4 al tiro per colpire con gli attacchi di incantesimo). Ha preparato:`, [
        `Trucchetti (a volontà): mano magica, prestidigitazione, raggio di gelo`,
        `1° livello (4 slot): armatura magica, dardo incantato, individuazione del magico`,
        `2° livello (2 slot): oscurità, passo velato`,
      ]],
    ],
    azioni: [
      [`Punteruolo Runico`, `Attacco con arma da mischia: +4 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 4 (1d4 + 2) danni perforanti più 2 (1d4) danni da forza.`],
      [`Raggio di Gelo`, `Attacco con incantesimo a distanza: +4 al tiro per colpire, gittata 18 m, un bersaglio. Colpito: 4 (1d8) danni da freddo e la velocità del bersaglio è ridotta di 3 m fino all'inizio del turno successivo del cancellatore.`],
    ],
    isola: {
      dove: `Villagrotta e tunnel sotto Aethelred (Quest 4.8); rovine di Aethelred dalla settimana 6.`,
      tattiche: `Lavora di notte, sempre con una scorta (Novizi o una Lama). Se scoperto lancia oscurità sul sigillo e continua a raschiare: per lui finire il lavoro conta più che sopravvivere. Fugge con passo velato.`,
      bottino: `Taccuino con la mappa dei sigilli già cancellati e di quelli rimasti; raschietto d'argento runico (25 mo).`,
      aggancio: `Il taccuino è l'indizio «Agenti che Cancellano i Glifi»: mostra che l'instabilità del Cuore è voluta. Contare i sigilli rimasti dice ai PG quanto tempo resta.`,
    },
    fonte: `Dalla guida: gli agenti della Quest 4.8 «Il Manoscritto Bruciato».`,
    alias: [`Cancellatore di Glifi`, `Cancellatori`],
    luoghi: [`villagrotta`, `aethelred`], quest: [`4.8`], personaggi: [],
  },
  // ------------------------------------------------------------------
  {
    id: `infiltrato`, sezione: `setta`,
    nome: `Infiltrato della Setta`,
    tipo: `Umanoide Medio (qualsiasi razza), neutrale malvagio`,
    indice: { tipo: `Umanoide Medio (qualsiasi razza)`, gs: `1`, dove: `La corte di Lumina` },
    ca: `13 (giustacuore imbottito di seta)`, pf: `27 (6d8)`, vel: `9 m`,
    stats: [`10 (+0)`, `15 (+2)`, `10 (+0)`, `12 (+1)`, `14 (+2)`, `15 (+2)`],
    dettagli: [
      [`Abilità`, `Inganno +6, Intuizione +4, Persuasione +4, Furtività +4`],
      [`Sensi`, `Percezione passiva 12`],
      [`Linguaggi`, `Comune, un cifrario della Setta`],
      [`Sfida`, `1 (200 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Volto di Corte`, `Mentre recita il suo ruolo (cortigiano, scrivano, mercante) serve una prova di Saggezza (Intuizione) con CD 15 per capire che mente.`],
      [`Azione Astuta`, `Nel suo turno l'infiltrato può effettuare Disimpegno, Nascondersi o Scatto come azione bonus.`],
      [`Attacco Furtivo (1/turno)`, `L'infiltrato infligge 7 (2d6) danni extra quando colpisce con un attacco con arma e dispone di vantaggio, oppure se un suo alleato non incapacitato si trova entro 1,5 m dal bersaglio.`],
    ],
    azioni: [
      [`Multiattacco`, `L'infiltrato effettua due attacchi con lo stiletto.`],
      [`Stiletto Velenoso`, `Attacco con arma da mischia: +4 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 4 (1d4 + 2) danni perforanti; il bersaglio deve superare un tiro salvezza su Costituzione con CD 12 o è avvelenato per 1 minuto (ripete il tiro salvezza alla fine di ogni suo turno).`],
      [`Balestra a Mano`, `Attacco con arma a distanza: +4 al tiro per colpire, gittata 9/36 m, un bersaglio. Colpito: 5 (1d6 + 2) danni perforanti.`],
    ],
    isola: {
      dove: `La corte di Lumina (nome in codice «Settimo Sole»); altri infiltrati a Solara e a Umbrage, a discrezione del DM.`,
      tattiche: `Non combatte se può evitarlo: avvelena, mente e fa arrestare i PG da altri. Messo alle strette, usa lo stiletto e poi l'Azione Astuta per sparire tra la folla.`,
      bottino: `Cifrario «a canzone d'osteria», lettere firmate «Settimo Sole», sigillo falso della Casata d'Aurum.`,
      aggancio: `Smascherarlo davanti ad Anya mette a nudo il suo punto debole (gli infiltrati di Corvus a corte) e può renderla più disposta ad ascoltare i PG.`,
    },
    fonte: `Dalla guida: l'infiltrato «Settimo Sole» a Lumina (Quest 4.3).`,
    alias: [`Infiltrato della Setta`],
    luoghi: [`lumina`], quest: [`4.3`], personaggi: [`anya`],
  },
  // ------------------------------------------------------------------
  {
    id: `adepto`, sezione: `setta`,
    nome: `Adepto del Cuore Spezzato`,
    tipo: `Umanoide Medio (qualsiasi razza), neutrale malvagio`,
    indice: { tipo: `Umanoide Medio (qualsiasi razza)`, gs: `2`, dove: `Il QG della Setta, le rovine di Aethelred, la preparazione del rituale` },
    ca: `12 (15 con armatura magica)`, pf: `33 (6d8 + 6)`, vel: `9 m`,
    stats: [`10 (+0)`, `14 (+2)`, `12 (+1)`, `16 (+3)`, `13 (+1)`, `11 (+0)`],
    dettagli: [
      [`Tiri salvezza`, `Int +5, Sag +3`],
      [`Abilità`, `Arcano +5, Storia +5`],
      [`Sensi`, `Percezione passiva 11`],
      [`Linguaggi`, `Comune, Antico Comune, Draconico`],
      [`Sfida`, `2 (450 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Doppia Fiamma`, `Quando l'adepto lancia un incantesimo che infligge danni da fuoco o radiosi, può trasformarli in danni necrotici, e viceversa. È l'eco della «Mente dei Sette» insegnata da Corvus.`],
      [`Incantesimi`, `L'adepto è un incantatore di 4° livello. Usa Intelligenza (CD del tiro salvezza 13, +5 al tiro per colpire con gli attacchi di incantesimo). Ha preparato:`, [
        `Trucchetti (a volontà): dardo di fuoco, luce, tocco gelido`,
        `1° livello (4 slot): armatura magica, dardo incantato, scudo`,
        `2° livello (3 slot): oscurità, passo velato, raggio rovente`,
      ]],
    ],
    azioni: [
      [`Bastone`, `Attacco con arma da mischia: +2 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 3 (1d6) danni contundenti.`],
      [`Dardo di Fuoco`, `Attacco con incantesimo a distanza: +5 al tiro per colpire, gittata 36 m, un bersaglio. Colpito: 5 (1d10) danni da fuoco.`],
      [`Eco del Cuore (Ricarica 5–6)`, `L'adepto attinge al Cuore d'Isola instabile. Ogni creatura entro 4,5 m deve effettuare un tiro salvezza su Costituzione con CD 13: se lo fallisce subisce 13 (3d8) danni da forza ed è spinta indietro di 3 m; se lo supera subisce la metà dei danni e non viene spinta. Se tira 1 sul dado di ricarica, anche l'adepto subisce 4 (1d8) danni da forza.`],
    ],
    isola: {
      dove: `Il QG della Setta, le rovine di Aethelred, la preparazione del rituale (Arco B, climax).`,
      tattiche: `Resta dietro le Lame Rovesciate. Apre con raggio rovente, tiene scudo per i momenti critici e usa l'Eco del Cuore quando viene circondato. Conosce Corvus soltanto come «il Grand Saggio».`,
      bottino: `Grimorio con incantesimi «di luce» e «di ombra» trascritti senza distinzione; frammento del diagramma della macchina (vedi Quest 4.4).`,
      aggancio: `Il grimorio mostra che la Setta mescola le due magie, proprio come Aethelred prima della Frattura: un indizio che collega Corvus agli studi sui Sette Saggi.`,
    },
    fonte: `Creatura nuova: gli allievi diretti di Corvus.`,
    alias: [`Adepto del Cuore Spezzato`, `Adepto`],
    luoghi: [`aethelred`], quest: [], personaggi: [`corvus`],
  },
  // ------------------------------------------------------------------
  {
    id: `sienna-redscale`, sezione: `setta`,
    nome: `Sienna Redscale, la Mano di Corvus`,
    tipo: `Umanoide Medio (tiefling), neutrale malvagio`,
    indice: { tipo: `Umanoide Medio (tiefling)`, gs: `4`, dove: `Prima apparizione: Quest 4.6` },
    ca: `14 (abiti da mercante rinforzati)`, pf: `39 (6d8 + 12)`, vel: `9 m`,
    stats: [`12 (+1)`, `18 (+4)`, `14 (+2)`, `16 (+3)`, `14 (+2)`, `16 (+3)`],
    dettagli: [
      [`Tiri salvezza`, `Des +6, Int +5`],
      [`Abilità`, `Furtività +6, Inganno +5, Intuizione +4, Percezione +4, Persuasione +5`],
      [`Resistenze ai danni`, `fuoco`],
      [`Sensi`, `scurovisione 18 m, Percezione passiva 14`],
      [`Linguaggi`, `Comune, Infernale, cifrario della Setta`],
      [`Sfida`, `4 (1.100 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Lame del Mercante di Spezie`, `La prima volta in ogni turno che Sienna colpisce una creatura con il pugnale, il bersaglio deve effettuare un tiro salvezza su Costituzione con CD 13: se lo fallisce subisce 7 (2d6) danni da veleno ed è avvelenato fino alla fine del turno successivo di Sienna; se lo supera subisce la metà dei danni.`],
      [`Attacco Furtivo (1/turno)`, `Sienna infligge 10 (3d6) danni extra quando colpisce con un attacco con arma e dispone di vantaggio, oppure se un suo alleato non incapacitato si trova entro 1,5 m dal bersaglio.`],
      [`Azione Astuta`, `Nel suo turno Sienna può effettuare Disimpegno, Nascondersi o Scatto come azione bonus.`],
      [`Sempre un'Uscita`, `La prima volta che scende sotto la metà dei punti ferita, Sienna può lanciare oscurità (senza componenti) e muoversi fino a metà della sua velocità senza provocare attacchi di opportunità. Non usa reazioni.`],
      [`Retaggio Infernale`, `Sienna conosce il trucchetto taumaturgia e può lanciare intimorire infernale (2° livello) 1 volta al giorno. Il Carisma è la sua caratteristica da incantatore.`],
    ],
    azioni: [
      [`Multiattacco`, `Sienna effettua due attacchi con il pugnale.`],
      [`Pugnale`, `Attacco con arma da mischia o a distanza: +6 al tiro per colpire, portata 1,5 m o gittata 6/18 m, un bersaglio. Colpito: 6 (1d4 + 4) danni perforanti.`],
      [`Polvere di Spezie (Ricarica 5–6)`, `Sienna soffia una manciata di pepe rosso e cenere in un cono di 4,5 m. Ogni creatura nel cono deve superare un tiro salvezza su Costituzione con CD 13 o è accecata fino alla fine del suo turno successivo.`],
    ],
    reazioni: [
      [`Intimorire Infernale (1/giorno)`, `Quando una creatura che Sienna può vedere la danneggia, quella creatura deve effettuare un tiro salvezza su Destrezza con CD 13: subisce 11 (2d10) danni da fuoco se lo fallisce, la metà se lo supera.`],
    ],
    isola: {
      dove: `Prima apparizione: Quest 4.6 (Passo delle Lacrime). Ritorna: Quest 4.10 (attentato a Oakhart) e nel finale dell'arco di Corvus.`,
      tattiche: `Non combatte mai ad armi pari: compare con 2–3 Lame o Novizi, acceca con la Polvere e colpisce chi resta isolato. Nei primi incontri fugge appena può: deve sopravvivere per tornare. Al livello 2 (Quest 4.10) togli il Multiattacco e porta l'Attacco Furtivo a 2d6 (circa GS 2).`,
      bottino: `Libretto contabile (indizio «Libretto Contabile al Passo», pagamenti a «T. d'Aurum»), anello rovesciato d'oro, 3 fiale del suo veleno.`,
      aggancio: `Catturarla viva è difficile ma vale molto: sa dov'è il QG, ma tradisce Corvus solo se è convinta che lui stia per sacrificarla.`,
    },
    fonte: `Dalla guida: scheda rapida di Sienna Redscale (PNG minori), qui sviluppata in un blocco completo.`,
    alias: [`Sienna Redscale`, `Sienna`],
    luoghi: [`passo`], quest: [`4.6`, `4.10`], personaggi: [`sienna`, `oakhart`],
  },
  // ------------------------------------------------------------------
  {
    id: `eco-distorta`, sezione: `setta`,
    nome: `Eco Distorta del Cuore`,
    tipo: `Elementale Medio, senza allineamento`,
    indice: { tipo: `Elementale Medio`, gs: `2`, dove: `Vicino ai sigilli cancellati, nei tunnel di Villagrotta, nelle rovine. Più sigilli mancano, più echi compaiono` },
    ca: `13 (armatura naturale)`, pf: `39 (6d8 + 12)`, vel: `0 m, volare 9 m (fluttuare)`,
    stats: [`10 (+0)`, `16 (+3)`, `14 (+2)`, `3 (−4)`, `12 (+1)`, `6 (−2)`],
    dettagli: [
      [`Resistenze ai danni`, `necrotico, radioso`],
      [`Immunità ai danni`, `veleno`],
      [`Immunità alle condizioni`, `affascinato, avvelenato, esausto, spaventato`],
      [`Sensi`, `scurovisione 18 m, Percezione passiva 11`],
      [`Linguaggi`, `—`],
      [`Sfida`, `2 (450 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Duplice Natura`, `All'inizio di ogni suo turno l'eco tira un d6. Pari (Luce): emana luce intensa in un raggio di 3 m e i suoi attacchi infliggono danni radiosi. Dispari (Ombra): intorno a lei la luce si abbassa di un livello entro 3 m, i suoi attacchi infliggono danni necrotici e ha vantaggio alle prove di Destrezza (Furtività).`],
      [`Riconoscimento del Cuore`, `Se una creatura le mostra un frammento del Cuore d'Isola (come quello di Finn) con un'azione, l'eco deve superare un tiro salvezza su Saggezza con CD 12 o diventa non ostile e se ne va.`],
      [`Instabile`, `Quando l'eco scende a 0 punti ferita esplode. Ogni creatura entro 3 m deve effettuare un tiro salvezza su Destrezza con CD 12 e subisce 7 (2d6) danni da forza se lo fallisce, la metà se lo supera.`],
    ],
    azioni: [
      [`Multiattacco`, `L'eco effettua due attacchi con il tocco prismatico.`],
      [`Tocco Prismatico`, `Attacco con arma da mischia: +5 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 7 (1d8 + 3) danni radiosi o necrotici (vedi Duplice Natura).`],
    ],
    isola: {
      dove: `Vicino ai sigilli cancellati, nei tunnel di Villagrotta, nelle rovine. Più sigilli mancano, più echi compaiono.`,
      tattiche: `Non è un servitore della Setta: è un effetto collaterale. Attacca chiunque, membri della Setta compresi. La Setta, però, impara a pilotarla verso i nemici.`,
      bottino: `Niente di materiale. Un incantatore che studia i resti (Arcano CD 13) capisce che luce e ombra hanno la stessa origine.`,
      aggancio: `Ogni eco che compare è un orologio visibile: se i PG ne incontrano tre in una sola sessione, il rituale è vicino (settimana 6+).`,
    },
    fonte: `Creatura nuova: l'energia liberata dai sigilli cancellati (Quest 4.8, Arco B).`,
    alias: [`Echi Distorti del Cuore`, `Eco Distorta del Cuore`],
    luoghi: [`villagrotta`, `aethelred`], quest: [`4.8`], personaggi: [],
  },
  // ------------------------------------------------------------------
  {
    id: `wyvern`, sezione: `drago`,
    nome: `Wyvern Cinerea`,
    tipo: `Drago Grande, senza allineamento`,
    indice: { tipo: `Drago Grande`, gs: `3`, dove: `Strada Auriverde → Cenerefondi` },
    ca: `13 (armatura naturale)`, pf: `52 (7d10 + 14)`, vel: `6 m, volare 24 m`,
    stats: [`17 (+3)`, `10 (+0)`, `14 (+2)`, `5 (−3)`, `12 (+1)`, `6 (−2)`],
    dettagli: [
      [`Abilità`, `Percezione +3`],
      [`Resistenze ai danni`, `fuoco`],
      [`Sensi`, `scurovisione 18 m, Percezione passiva 13`],
      [`Linguaggi`, `comprende il Draconico ma non lo parla`],
      [`Sfida`, `3 (700 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Picchiata`, `Se la wyvern vola per almeno 9 m in linea retta verso un bersaglio e lo colpisce con gli artigli nello stesso turno, il bersaglio subisce 7 (2d6) danni extra e deve superare un tiro salvezza su Forza con CD 13 o cade a terra prono.`],
      [`Richiamo di Cinerebrax`, `Entro 1,5 km da Monte Cinere la wyvern ha vantaggio ai tiri salvezza contro la condizione spaventato e non fugge mai.`],
    ],
    azioni: [
      [`Multiattacco`, `La wyvern effettua due attacchi: uno con il morso e uno con il pungiglione. In volo può usare gli artigli al posto del morso.`],
      [`Morso`, `Attacco con arma da mischia: +5 al tiro per colpire, portata 3 m, un bersaglio. Colpito: 8 (1d10 + 3) danni perforanti.`],
      [`Artigli`, `Attacco con arma da mischia: +5 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 10 (2d6 + 3) danni taglienti.`],
      [`Pungiglione`, `Attacco con arma da mischia: +5 al tiro per colpire, portata 3 m, una creatura. Colpito: 6 (1d6 + 3) danni perforanti. Il bersaglio deve effettuare un tiro salvezza su Costituzione con CD 12 e subisce 7 (2d6) danni da veleno se lo fallisce, la metà se lo supera.`],
    ],
    isola: {
      dove: `Strada Auriverde → Cenerefondi (Quest 4.4); attacco notturno a Cenerefondi (Atto I, climax); camera delle wyvern addormentate (Atto II).`,
      tattiche: `Attacca dall'alto con la Picchiata e poi si rialza in volo. Preferisce bestiame e bersagli isolati. A meno di 15 PF, se non è vicina alla montagna, scappa verso Monte Cinere e indica ai PG la strada.`,
      bottino: `Ghiandola velenosa (vale 50 mo a un alchimista, oppure usala per un veleno di ferita); scaglie striate di cenere.`,
      aggancio: `Le scaglie hanno lo stesso odore di zolfo delle pecore carbonizzate: è la prova che collega le wyvern al drago.`,
    },
    fonte: `Dalla guida: le wyvern al servizio di Cinerebrax (Quest 4.4 e Atti I–II). Versione giovane, ridotta per i livelli 1–4.`,
    alias: [`Wyvern Cineree`, `Wyvern Cinerea`],
    luoghi: [`auriverde`, `cenerefondi`, `monte-cinere`], quest: [`4.4`, `atto-1`, `atto-2`], personaggi: [`cinerebrax`],
  },
  // ------------------------------------------------------------------
  {
    id: `coboldo`, sezione: `drago`,
    nome: `Coboldo della Cenere`,
    tipo: `Umanoide Piccolo (coboldo), legale malvagio`,
    indice: { tipo: `Umanoide Piccolo (coboldo)`, gs: `1/8`, dove: `I tunnel di Monte Cinere` },
    ca: `12`, pf: `5 (2d6 − 2)`, vel: `9 m`,
    stats: [`7 (−2)`, `15 (+2)`, `9 (−1)`, `8 (−1)`, `7 (−2)`, `8 (−1)`],
    dettagli: [
      [`Resistenze ai danni`, `fuoco`],
      [`Sensi`, `scurovisione 18 m, Percezione passiva 8`],
      [`Linguaggi`, `Comune, Draconico`],
      [`Sfida`, `1/8 (25 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Sensibilità alla Luce del Sole`, `Alla luce del sole il coboldo ha svantaggio ai tiri per colpire e alle prove di Saggezza (Percezione) basate sulla vista.`],
      [`Tattiche del Branco`, `Il coboldo ha vantaggio ai tiri per colpire contro una creatura se almeno uno dei suoi alleati non incapacitati si trova entro 1,5 m da quella creatura.`],
    ],
    azioni: [
      [`Pugnale`, `Attacco con arma da mischia: +4 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 4 (1d4 + 2) danni perforanti.`],
      [`Fionda`, `Attacco con arma a distanza: +4 al tiro per colpire, gittata 9/36 m, un bersaglio. Colpito: 4 (1d4 + 2) danni contundenti.`],
      [`Vaso di Brace (1/giorno)`, `Il coboldo lancia un vaso di brace in un punto entro 6 m. Ogni creatura entro 1,5 m da quel punto deve superare un tiro salvezza su Destrezza con CD 12 o subisce 3 (1d6) danni da fuoco.`],
    ],
    isola: {
      dove: `I tunnel di Monte Cinere (Atto II), le prime zone dell'antro; esploratori ai margini di Cenerefondi.`,
      tattiche: `Sono arrivati da poco e venerano un drago che non hanno ancora visto. Tendono trappole (sassi rotolanti, reti, braci sotto la cenere) e attaccano soltanto in superiorità numerica.`,
      bottino: `Ninnoli bruciacchiati, 1d6 mr. Il capo porta un «dente di Cinerebrax» (in realtà di wyvern).`,
      aggancio: `Un coboldo catturato racconta il «respiro delle 3:14» e può fare da guida, inaffidabile, per le prime due zone dell'antro.`,
    },
    fonte: `Creatura nuova: i servitori nati dal risveglio del drago.`,
    alias: [`Coboldi della Cenere`, `Coboldo della Cenere`],
    luoghi: [`monte-cinere`, `cenerefondi`], quest: [`atto-2`], personaggi: [`cinerebrax`],
  },
  // ------------------------------------------------------------------
  {
    id: `mefite`, sezione: `drago`,
    nome: `Mefite di Cenere`,
    tipo: `Elementale Piccolo, neutrale malvagio`,
    indice: { tipo: `Elementale Piccolo`, gs: `1/2`, dove: `Cenerefondi e le pendici di Monte Cinere` },
    ca: `11`, pf: `22 (5d6 + 5)`, vel: `9 m, volare 9 m`,
    stats: [`8 (−1)`, `12 (+1)`, `12 (+1)`, `7 (−2)`, `10 (+0)`, `10 (+0)`],
    dettagli: [
      [`Abilità`, `Furtività +3`],
      [`Vulnerabilità ai danni`, `freddo`],
      [`Immunità ai danni`, `fuoco, veleno`],
      [`Immunità alle condizioni`, `avvelenato`],
      [`Sensi`, `scurovisione 18 m, Percezione passiva 10`],
      [`Linguaggi`, `Ignan, Terran`],
      [`Sfida`, `1/2 (100 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Falso Aspetto`, `Finché resta immobile, il mefite non si distingue da un cumulo di cenere tiepida.`],
      [`Nube Mortale`, `Quando muore il mefite si dissolve in una nube di cenere rovente. Ogni creatura entro 1,5 m deve superare un tiro salvezza su Costituzione con CD 11 o è accecata fino alla fine del suo turno successivo.`],
    ],
    azioni: [
      [`Artigli`, `Attacco con arma da mischia: +3 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 3 (1d4 + 1) danni taglienti più 2 (1d4) danni da fuoco.`],
      [`Soffio di Cenere (Ricarica 6)`, `Il mefite esala cenere ardente in un cono di 4,5 m. Ogni creatura nel cono deve effettuare un tiro salvezza su Costituzione con CD 11 e subisce 7 (2d6) danni da fuoco se lo fallisce, la metà se lo supera.`],
    ],
    isola: {
      dove: `Cenerefondi e le pendici di Monte Cinere; la zona del pavimento sul magma (Atto II).`,
      tattiche: `Dispettosi e vigliacchi. Si fingono cenere, colpiscono e scappano ridendo. Si aggregano attorno a chi porta fuoco o torce, come Rook.`,
      bottino: `Nessuno. Lasciano un residuo vetroso che Yssa la geologa riconosce subito.`,
      aggancio: `Il numero di mefiti cresce ogni settimana insieme al respiro del drago: un buon segnale per mostrare ai giocatori che il tempo stringe.`,
    },
    fonte: `Creatura nuova, nata dal cielo sempre grigio di Cenerefondi.`,
    alias: [`Mefiti di Cenere`, `Mefite di Cenere`],
    luoghi: [`cenerefondi`, `monte-cinere`], quest: [`atto-2`], personaggi: [`rook`],
  },
  // ------------------------------------------------------------------
  {
    id: `verme`, sezione: `drago`,
    nome: `Verme di Brace`,
    tipo: `Mostruosità Media, senza allineamento`,
    indice: { tipo: `Mostruosità Media`, gs: `1`, dove: `Monte Cinere, zone 2–4 dell'antro` },
    ca: `13 (armatura naturale)`, pf: `30 (4d8 + 12)`, vel: `6 m, scavare 6 m`,
    stats: [`14 (+2)`, `10 (+0)`, `16 (+3)`, `1 (−5)`, `8 (−1)`, `3 (−4)`],
    dettagli: [
      [`Immunità ai danni`, `fuoco`],
      [`Sensi`, `percezione tellurica 9 m (cieco oltre questo raggio), Percezione passiva 9`],
      [`Linguaggi`, `—`],
      [`Sfida`, `1 (200 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Corpo Rovente`, `Una creatura che tocca il verme o lo colpisce con un attacco in mischia stando entro 1,5 m da lui subisce 2 (1d4) danni da fuoco.`],
      [`Agguato dal Magma`, `Il verme può scavare nella roccia tenera e nel magma. Ha vantaggio al primo tiro per colpire contro una creatura che non lo ha visto emergere.`],
    ],
    azioni: [
      [`Morso`, `Attacco con arma da mischia: +4 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 6 (1d8 + 2) danni perforanti più 3 (1d6) danni da fuoco. Se il bersaglio è una creatura Media o più piccola, è afferrato (CD 12 per sfuggire).`],
      [`Trascinare`, `Il verme si sposta fino a metà della sua velocità portando con sé la creatura afferrata. Se finisce in una zona di magma, la creatura subisce 7 (2d6) danni da fuoco.`],
    ],
    isola: {
      dove: `Monte Cinere, zone 2–4 dell'antro; le gallerie calde vicino all'Anticamera delle ossa.`,
      tattiche: `Aspetta sotto la crosta, sente i passi ed emerge sotto l'ultimo del gruppo. Trascina la preda verso il magma e si ritira quando scende a metà PF.`,
      bottino: `Nel ventre: monete fuse e un anello d'ottone con il simbolo dei Sette Saggi non rovesciato (residuo di una vittima di secoli fa).`,
      aggancio: `L'anello intatto viene da Aethelred: qualcuno arrivò fin qui già prima della Frattura. Gorc lo riconosce come un anello della bottega di Ignis.`,
    },
    fonte: `Creatura nuova per la zona «pavimento su magma» (Atto II).`,
    alias: [`Vermi di Brace`, `Verme di Brace`],
    luoghi: [`monte-cinere`], quest: [`atto-2`], personaggi: [`gorc`],
  },
  // ------------------------------------------------------------------
  {
    id: `eco-aethelred`, sezione: `rovine`,
    nome: `Eco di Aethelred`,
    tipo: `Non morto Medio, neutrale`,
    indice: { tipo: `Non morto Medio`, gs: `1`, dove: `Rovine di Aethelred, la prima camera intatta` },
    ca: `12`, pf: `22 (5d8)`, vel: `0 m, volare 9 m (fluttuare)`,
    stats: [`1 (−5)`, `14 (+2)`, `11 (+0)`, `10 (+0)`, `10 (+0)`, `11 (+0)`],
    dettagli: [
      [`Resistenze ai danni`, `acido, freddo, fuoco, fulmine, tuono; contundenti, perforanti e taglienti da attacchi non magici`],
      [`Immunità ai danni`, `necrotico, veleno`],
      [`Immunità alle condizioni`, `afferrato, avvelenato, esausto, paralizzato, pietrificato, prono, trattenuto`],
      [`Sensi`, `scurovisione 18 m, Percezione passiva 10`],
      [`Linguaggi`, `comprende l'Antico Comune ma non lo parla`],
      [`Sfida`, `1 (200 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Movimento Incorporeo`, `L'eco può attraversare creature e oggetti come se fossero terreno difficile. Se termina il turno dentro un oggetto subisce 5 (1d10) danni da forza.`],
      [`L'Ultimo Istante`, `Una creatura può usare un'azione per parlare all'eco in Antico Comune o per mostrarle un simbolo dei Sette Saggi uniti (per esempio la moneta di Theo). L'eco deve superare un tiro salvezza su Saggezza con CD 12, altrimenti smette di combattere e mostra a quella creatura una visione di 6 secondi del crollo di Aethelred, poi svanisce.`],
    ],
    azioni: [
      [`Tocco del Crollo`, `Attacco con incantesimo da mischia: +4 al tiro per colpire, portata 1,5 m, una creatura. Colpito: 7 (2d6) danni necrotici. Il bersaglio deve superare un tiro salvezza su Costituzione con CD 11 o la sua velocità è dimezzata fino alla fine del suo turno successivo, come se macerie invisibili gli schiacciassero le gambe.`],
    ],
    isola: {
      dove: `Rovine di Aethelred, la prima camera intatta (Quest 4.5), resti della città sprofondata. Mai fuori dalle rovine.`,
      tattiche: `Rivive in eterno l'ultimo momento della propria vita e attacca chiunque scambi per un saggio in lotta. Non insegue oltre le rovine.`,
      bottino: `Nessuno. Le visioni dell'Ultimo Istante sono piccoli frammenti di indizio sulla vera storia della Frattura.`,
      aggancio: `Tre visioni diverse, viste da tre echi, mostrano che lampi di luce e d'ombra caddero insieme: non fu un attacco solo.`,
    },
    fonte: `Creatura nuova: i morti della Grande Frattura.`,
    alias: [`Eco di Aethelred`],
    luoghi: [`aethelred`], quest: [`4.5`], personaggi: [],
  },
  // ------------------------------------------------------------------
  {
    id: `sentinella`, sezione: `rovine`,
    nome: `Sentinella di Aethelred`,
    tipo: `Costrutto Grande, senza allineamento`,
    indice: { tipo: `Costrutto Grande`, gs: `3`, dove: `Le camere intatte di Aethelred e il luogo dove riposa lo Spirito di Silas` },
    ca: `16 (armatura naturale)`, pf: `51 (6d10 + 18)`, vel: `9 m`,
    stats: [`18 (+4)`, `8 (−1)`, `16 (+3)`, `3 (−4)`, `11 (+0)`, `1 (−5)`],
    dettagli: [
      [`Resistenze ai danni`, `necrotico, radioso`],
      [`Immunità ai danni`, `psichico, veleno`],
      [`Immunità alle condizioni`, `affascinato, avvelenato, esausto, paralizzato, pietrificato, spaventato`],
      [`Sensi`, `scurovisione 18 m, Percezione passiva 10`],
      [`Linguaggi`, `comprende l'Antico Comune ma non lo parla`],
      [`Sfida`, `3 (700 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Sette Rune`, `Sul petto della sentinella brillano sette rune, una per ogni Saggio. La sentinella non attacca una creatura che porta un frammento del Cuore d'Isola né una che pronuncia i sette nomi dei Saggi in Antico Comune (come sono incisi sul cippo di Auriverde).`],
      [`Rune Spente`, `Se i sigilli del Cuore vengono cancellati nella sua zona (Quest 4.8), le rune si spengono una dopo l'altra. Con tre o più rune spente la sentinella ignora la regola precedente e attacca chiunque.`],
      [`Forma Immutabile`, `La sentinella è immune a qualsiasi incantesimo o effetto che ne altererebbe la forma.`],
    ],
    azioni: [
      [`Multiattacco`, `La sentinella effettua due attacchi con il pugno di pietra.`],
      [`Pugno di Pietra`, `Attacco con arma da mischia: +6 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 11 (2d6 + 4) danni contundenti.`],
      [`Onda dell'Equilibrio (Ricarica 5–6)`, `La sentinella batte i pugni sul terreno. Ogni creatura entro 3 m deve effettuare un tiro salvezza su Forza con CD 14: se lo fallisce subisce 10 (3d6) danni da forza, è spinta indietro di 3 m e cade a terra prona; se lo supera subisce la metà dei danni e basta.`],
    ],
    isola: {
      dove: `Le camere intatte di Aethelred e il luogo dove riposa lo Spirito di Silas.`,
      tattiche: `Non insegue chi esce dalla camera che protegge. Con le rune accese è quasi un enigma da risolvere; con le rune spente è un muro che picchia.`,
      bottino: `Nucleo runico (300 mo, oppure componente per il Rituale del Sonno nel Finale B di Cinerebrax).`,
      aggancio: `Una sentinella che lascia passare i PG perché portano il frammento di Finn mostra che il Cuore non fa differenza tra Luce e Ombra.`,
    },
    fonte: `Creatura nuova: i guardiani lasciati dal Concilio dei Sette Saggi.`,
    alias: [`Sentinella di Aethelred`],
    luoghi: [`aethelred`], quest: [`4.5`, `atto-3`], personaggi: [`silas`],
  },
  // ------------------------------------------------------------------
  {
    id: `bambino`, sezione: `rovine`,
    nome: `Il Bambino con gli Occhi d'Argento`,
    tipo: `Celestiale Piccolo (manifestazione del Cuore d'Isola), neutrale`,
    indice: { tipo: `Celestiale Piccolo (manifestazione del Cuore d'Isola)`, gs: `—`, dove: `Rovine di Aethelred, Radicechiara` },
    ca: `15 (grazia)`, pf: `18 (4d6 + 4)`, vel: `9 m`,
    stats: [`6 (−2)`, `16 (+3)`, `12 (+1)`, `14 (+2)`, `20 (+5)`, `16 (+3)`],
    dettagli: [
      [`Immunità ai danni`, `necrotico, radioso`],
      [`Immunità alle condizioni`, `affascinato, spaventato`],
      [`Sensi`, `visione del vero 18 m, Percezione passiva 15`],
      [`Linguaggi`, `comprende tutti i linguaggi, parla solo con domande`],
      [`Sfida`, `— (non combatte; 0 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Non Ostile`, `Il bambino non attacca mai. Se scende a 0 PF, svanisce in luce argentea e ricompare una settimana dopo altrove sull'isola.`],
      [`Specchio del Cuore`, `I suoi occhi riflettono l'instabilità del Cuore d'Isola: argento puro (stabile), screziati d'oro e di nero (sigilli cancellati), completamente neri (rituale imminente).`],
      [`Passaggio Antico`, `Il bambino può aprire le porte sigillate di Aethelred semplicemente toccandole.`],
    ],
    azioni: [
      [`Domanda Vera`, `Il bambino pone una domanda a una creatura che può vedere entro 9 m. Se la creatura mente nel rispondere, deve superare un tiro salvezza su Saggezza con CD 15 o diventa incapacitata fino alla fine del suo turno successivo, sopraffatta dal ricordo della Frattura.`],
      [`Svanire`, `Il bambino diventa invisibile finché non decide di riapparire.`],
    ],
    isola: {
      dove: `Rovine di Aethelred, Radicechiara; compare quando qualcuno si avvicina alla verità.`,
      tattiche: `Non è un mostro da combattere ma una presenza. Il DM lo usa per guidare, mettere alla prova o mettere in allerta i PG. Se la Setta lo cattura, Corvus ottiene un focus perfetto per il rituale.`,
      bottino: `Nessuno. Chi lo tratta con gentilezza trova il giorno dopo in tasca una moneta di Aethelred con i sette simboli uniti.`,
      aggancio: `Il colore dei suoi occhi è un indicatore visivo della Timeline: mostralo ogni volta che lo incontrano.`,
    },
    fonte: `Dalla guida: Quest 4.5, «Il Bambino con gli Occhi d'Argento».`,
    alias: [],
    luoghi: [`aethelred`, `radicechiara`], quest: [`4.5`], personaggi: [`corvus`],
  },
  // ------------------------------------------------------------------
  {
    id: `lucciole`, sezione: `isola`,
    nome: `Sciame di Lucciole Nere`,
    tipo: `Sciame Medio di mostruosità Minuscole, senza allineamento`,
    indice: { tipo: `Sciame Medio di mostruosità Minuscole`, gs: `1`, dove: `Dintorni di Roccabuia, di notte, attorno al frammento del Tomo di Lysandra` },
    ca: `12`, pf: `22 (5d8)`, vel: `1,5 m, volare 9 m`,
    stats: [`3 (−4)`, `14 (+2)`, `10 (+0)`, `2 (−4)`, `12 (+1)`, `15 (+2)`],
    dettagli: [
      [`Resistenze ai danni`, `contundenti, perforanti, taglienti`],
      [`Immunità alle condizioni`, `affascinato, afferrato, paralizzato, pietrificato, prono, spaventato, stordito, trattenuto`],
      [`Sensi`, `vista cieca 9 m, Percezione passiva 11`],
      [`Linguaggi`, `—`],
      [`Sfida`, `1 (200 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Sciame`, `Lo sciame può occupare lo spazio di un'altra creatura e viceversa, e può passare attraverso qualsiasi apertura abbastanza grande per una lucciola. Non può recuperare punti ferita né ottenere punti ferita temporanei.`],
      [`Richiamo del Tomo`, `Una creatura che inizia il turno entro 9 m dallo sciame e può vederlo deve superare un tiro salvezza su Saggezza con CD 12, altrimenti è affascinata fino alla fine del suo turno successivo e usa il movimento per avvicinarsi al frammento del Tomo di Lysandra. Se supera il tiro salvezza, è immune al Richiamo per 24 ore.`],
      [`Luce Nera`, `Lo sciame emana un bagliore viola scuro che non illumina: entro 3 m la luce si abbassa di un livello.`],
    ],
    azioni: [
      [`Morsi`, `Attacco con arma da mischia: +4 al tiro per colpire, portata 0 m, una creatura nello spazio dello sciame. Colpito: 5 (2d4) danni necrotici, oppure 2 (1d4) danni necrotici se lo sciame ha metà dei suoi punti ferita o meno. Una creatura affascinata subisce anche 3 (1d6) danni psichici.`],
    ],
    isola: {
      dove: `Dintorni di Roccabuia, di notte, attorno al frammento del Tomo di Lysandra.`,
      tattiche: `Le vittime in trance (sonnambuli: usa le statistiche del popolano, GS 0) proteggono lo sciame senza volerlo: colpirle è un dilemma morale. Distruggere o coprire il frammento del Tomo disperde lo sciame in 1d4 round.`,
      bottino: `Il frammento del Tomo di Lysandra (lo vuole Seraphim; Kaelan non sa che esiste).`,
      aggancio: `Madre Verna sa che le lucciole compaiono «quando l'Ombra viene usata senza la Luce», un'eco dell'idea di equilibrio dei Saggi.`,
    },
    fonte: `Dalla guida: Quest 4.9, «Le Lucciole Nere» (Roccabuia).`,
    alias: [`Sciame di Lucciole Nere`],
    luoghi: [`roccabuia`], quest: [`4.9`], personaggi: [`seraphim`, `kaelan`],
  },
  // ------------------------------------------------------------------
  {
    id: `golem`, sezione: `isola`,
    nome: `Golem Runico di Ferrovia`,
    tipo: `Costrutto Grande, senza allineamento`,
    indice: { tipo: `Costrutto Grande`, gs: `2`, dove: `Le forge e le cave di Ferrovia` },
    ca: `14 (armatura naturale)`, pf: `39 (6d10 + 6)`, vel: `9 m`,
    stats: [`18 (+4)`, `9 (−1)`, `12 (+1)`, `3 (−4)`, `10 (+0)`, `1 (−5)`],
    dettagli: [
      [`Immunità ai danni`, `fulmine, psichico, veleno`],
      [`Immunità alle condizioni`, `affascinato, avvelenato, esausto, paralizzato, pietrificato, spaventato`],
      [`Sensi`, `scurovisione 18 m, Percezione passiva 10`],
      [`Linguaggi`, `comprende il Comune ma non lo parla`],
      [`Sfida`, `2 (450 PE)`],
      [`Bonus di competenza`, `+2`],
    ],
    tratti: [
      [`Assorbire il Fulmine`, `Quando il golem sarebbe colpito da danni da fulmine, invece non subisce danni e recupera un numero di PF pari ai danni da fulmine inflitti.`],
      [`Rune di Potenziamento`, `I colpi del golem infliggono 2 (1d4) danni da fulmine extra (già inclusi nell'attacco).`],
      [`Vincolato alla Chiave`, `Se Lyra Blackstone o chi porta la sua Chiave Runica non si trova entro 36 m, il golem continua a eseguire l'ultimo ordine ricevuto oppure resta immobile.`],
    ],
    azioni: [
      [`Pugno Runico`, `Attacco con arma da mischia: +6 al tiro per colpire, portata 1,5 m, un bersaglio. Colpito: 11 (2d6 + 4) danni contundenti più 2 (1d4) danni da fulmine.`],
      [`Scarica Runica (Ricarica 6)`, `Il golem scarica un fulmine in una linea lunga 9 m e larga 1,5 m. Ogni creatura sulla linea deve effettuare un tiro salvezza su Destrezza con CD 12 e subisce 10 (3d6) danni da fulmine se lo fallisce, la metà se lo supera.`],
    ],
    isola: {
      dove: `Le forge e le cave di Ferrovia; scorta di Lyra Blackstone; difesa degli archivi Blackstone.`,
      tattiche: `Lento, prevedibile e durissimo. Si mette fra Lyra e i nemici. Se Lyra usa il Fulmine Runico, mira in modo che il golem sia sulla linea: così lo cura.`,
      bottino: `Nucleo con frammenti del Cuore d'Isola (Arcano CD 14 per riconoscerli): la prova che Lyra sta già usando il Cuore per la sua arma runica.`,
      aggancio: `Il nucleo è un indizio fisico portabile per l'arco della «verità»: la Casata Blackstone sta ripetendo l'errore della Frattura.`,
    },
    fonte: `Dalla guida: il Golem di Ferro evocato da Magistra Lyra Blackstone (CA 14, PF ~40, 2d6+4 a turno).`,
    alias: [`Golem Runico di Ferrovia`],
    luoghi: [`ferrovia`], quest: [], personaggi: [`blackstone`],
  },
];

// ---------------------------------------------------------------------
// INCONTRI PRONTI
// ---------------------------------------------------------------------
const INCONTRI_PRONTI = {
  intro: `Difficoltà calcolate con le regole della Guida del DM (PE modificati per il numero di nemici) per un gruppo di 4 PG. Le soglie del gruppo sono: Facile, Media, Difficile e Mortale. 1° liv. 100 / 200 / 300 / 400 PE · 2° liv. 200 / 400 / 600 / 800 · 3° liv. 300 / 600 / 900 / 1.600 · 4° liv. 500 / 1.000 / 1.500 / 2.000.`,
  righe: [
    { nome: `Canzoni d'osteria`, rif: `Quest 4.6, Passo delle Lacrime`, liv: `1`, composizione: `3 Novizi della Setta`, pe: `300`, difficolta: `Difficile` },
    { nome: `Il pozzo e la crepa`, rif: `Quest 4.2, Radicechiara`, liv: `1`, composizione: `1 Eco di Aethelred (risalita dalla crepa) oppure 1 Sciame di Lucciole Nere`, pe: `200`, difficolta: `Media` },
    { nome: `La carovana scomparsa`, rif: `Quest 4.4`, liv: `2`, composizione: `1 Wyvern Cinerea (si ritira a 15 PF)`, pe: `700`, difficolta: `Difficile` },
    { nome: `Il Manoscritto Bruciato`, rif: `Quest 4.8, Villagrotta`, liv: `2`, composizione: `1 Cancellatore di Glifi + 2 Novizi`, pe: `600`, difficolta: `Difficile` },
    { nome: `Le Lucciole Nere`, rif: `Quest 4.9, Roccabuia`, liv: `2`, composizione: `1 Sciame di Lucciole Nere + 2 sonnambuli (popolani)`, pe: `440`, difficolta: `Media` },
    { nome: `Il Duello di Mezza Estate`, rif: `Quest 4.10`, liv: `2`, composizione: `Sienna (versione liv. 2, GS 2) + 1 Lama Rovesciata`, pe: `975`, difficolta: `Mortale: Sienna punta a Oakhart e fugge` },
    { nome: `Le forge di Ferrovia`, rif: ``, liv: `2`, composizione: `1 Golem Runico di Ferrovia`, pe: `450`, difficolta: `Media` },
    { nome: `Atto I, la notte della cenere`, rif: `Cenerefondi`, liv: `2`, composizione: `1 Wyvern Cinerea + 2 Mefiti di Cenere`, pe: `1.800`, difficolta: `Mortale: usa i PNG del villaggio come alleati` },
    { nome: `Atto II, le gallerie`, rif: `Monte Cinere, zone 1–2`, liv: `2`, composizione: `5 Coboldi della Cenere + 1 Mefite di Cenere`, pe: `450`, difficolta: `Media` },
    { nome: `Atto II, il pavimento sul magma`, rif: `Monte Cinere, zone 3–4`, liv: `3`, composizione: `2 Vermi di Brace + 2 Mefiti di Cenere`, pe: `1.200`, difficolta: `Difficile` },
    { nome: `Atto II, la camera delle wyvern`, rif: ``, liv: `3–4`, composizione: `2 Wyvern Cineree addormentate (Furtività di gruppo CD 13 per passare)`, pe: `2.100`, difficolta: `Mortale se si svegliano` },
    { nome: `La prima camera intatta`, rif: `Quest 4.5, Aethelred`, liv: `3`, composizione: `1 Sentinella di Aethelred (rune accese: enigma)`, pe: `700`, difficolta: `Media` },
    { nome: `Sigilli spezzati`, rif: `Rovine, settimana 6+`, liv: `3`, composizione: `2 Echi Distorti del Cuore`, pe: `1.350`, difficolta: `Difficile` },
    { nome: `Il laboratorio dell'Adepto`, rif: `QG della Setta`, liv: `3`, composizione: `1 Adepto del Cuore Spezzato + 1 Lama Rovesciata`, pe: `975`, difficolta: `Difficile` },
    { nome: `La Mano di Corvus`, rif: `Arco B, finale`, liv: `4`, composizione: `Sienna Redscale + 1 Infiltrato della Setta`, pe: `1.950`, difficolta: `Difficile (al limite del Mortale)` },
    { nome: `Il rituale`, rif: `Rovine di Aethelred, settimana 8`, liv: `4`, composizione: `1 Adepto + 2 Lame Rovesciate + 1 Eco Distorta del Cuore`, pe: `2.600`, difficolta: `Mortale: i PG devono interrompere il rituale, non vincere lo scontro` },
  ],
};

// ---------------------------------------------------------------------
// INCONTRI CASUALI
// ---------------------------------------------------------------------
const INCONTRI_CASUALI = {
  intro: `Tira quando i PG viaggiano fra i villaggi (1 tiro ogni mezza giornata, incontro con 1–2 su d6). Non tutti gli incontri sono combattimenti: molti servono a far trapelare la Setta o il risveglio del drago.`,
  tabelle: [
    {
      id: `est`, titolo: `Strade dell'Est e Passo delle Lacrime (d8)`,
      righe: [
        `Due Novizi della Setta travestiti da pellegrini chiedono la strada per Aethelred. Spiano i PG; Intuizione CD 13 per notare l'anello sotto il guanto.`,
        `Warwick il Segugio segue i PG a distanza (solo se hanno già scoperto più di un segreto). Non attacca.`,
        `Un mercante di Solara con una lettera sigillata di Oakhart: chiede una scorta fino a Bassa Marea.`,
        `Infiltrato della Setta nei panni di un esattore delle tasse: prova a sequestrare un oggetto «sospetto» dei PG.`,
        `Un Eco di Aethelred appare sopra un vecchio cippo stradale al tramonto.`,
        `Una Wyvern Cinerea passa alta nel cielo diretta a ovest: Furtività di gruppo CD 12 per non attirarla (2° livello e oltre).`,
        `Bambini di Auriverde giocano con monete «di Aethelred» false. Una è vera.`,
        `3 Novizi + 1 Lama Rovesciata tendono un'imboscata a un corriere. Se i PG intervengono, trovano un messaggio in cifrario.`,
      ],
    },
    {
      id: `ovest`, titolo: `Montagne dell'Ovest, Cenerefondi e Monte Cinere (d8)`,
      righe: [
        `Pioggia di cenere: 1d3 Mefiti di Cenere si nascondono nei cumuli lungo il sentiero.`,
        `Rook il Cacciatore con la sua torcia: diffidente, ma conta come una delle tre interazioni positive.`,
        `Pattuglia di 4 Coboldi della Cenere che trasporta pecore carbonizzate verso la montagna.`,
        `Un minatore di Roccabuia in trance segue un bagliore viola: c'è uno Sciame di Lucciole Nere poco più avanti.`,
        `Il terreno trema alle 3:14 in punto. Chi dorme deve superare un TS su Saggezza CD 10 o non recupera i dadi vita.`,
        `Un Golem Runico di Ferrovia fermo sul ciglio della strada, ancora con l'ultimo ordine da eseguire: «nessuno passa».`,
        `Un Verme di Brace emerge da una fumarola (solo vicino a Monte Cinere; altrimenti ritira).`,
        `Una Wyvern Cinerea caccia il bestiame di un pastore. Se i PG lo salvano, il pastore indica una grotta d'accesso ai tunnel.`,
      ],
    },
  ],
};
