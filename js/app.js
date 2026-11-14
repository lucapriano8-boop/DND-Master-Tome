// =====================================================================
// DND Master Tome — logica del sito
// Legge i dati da data.js e costruisce le schede. Nessun testo della
// campagna è scritto qui: tutto viene da data.js.
// =====================================================================
(function () {
  'use strict';

  const app = document.getElementById('app');

  // ---------- Utilità ----------
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  // Trasforma "Quest 4.3" in un link alla quest
  const linkify = (s) => esc(s).replace(/Quest (4\.\d+)/g, (m, id) =>
    QUEST.some((q) => q.id === id) ? `<a href="#/quest/${id}">${m}</a>` : m);

  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignora */ }
    },
  };

  const GRUPPI = {
    luce: 'Luce', ombra: 'Ombra', setta: 'Setta', indipendente: 'Indipendenti', neutrale: 'Neutrali', drago: 'Drago',
  };
  const STAT_NOMI = ['FOR', 'DES', 'COS', 'INT', 'SAG', 'CAR'];

  const tuttiPersonaggi = () => [...PERSONAGGI, ...PNG_MINORI];
  const trovaPersonaggio = (id) => tuttiPersonaggi().find((p) => p.id === id);
  const tuttiLuoghi = () => [...VILLAGGI, ...CITTA];
  const trovaLuogo = (id) => tuttiLuoghi().find((l) => l.id === id);
  const tuttiIndizi = () => INDIZI.flatMap((cat) => cat.voci.map((v) => ({ ...v, categoria: cat })));

  const linkPersonaggio = (p) => `<a href="#/personaggi/${p.id}">${esc(p.nome)}</a>`;
  const linkLuogo = (l) => `<a href="#/luoghi/${l.id}">${esc(l.nome)}</a>`;
  const linkQuest = (q) => `<a href="#/quest/${q.id}">${esc(q.id)} — ${esc(q.titolo)}</a>`;
  const linkIndizio = (i) => `<a href="#/indizi/${i.id}">${esc(i.titolo)}</a>`;

  const secret = (html, tag = 'span') => `<${tag} class="secret" title="Segreto del DM">${html}</${tag}>`;

  // ---------- Bestiario: utilità ----------
  const trovaCreatura = (id) => CREATURE.find((c) => c.id === id);
  const linkCreatura = (c) => `<a href="#/bestiario/${c.id}">${esc(c.nome)}</a>`;
  const creatureDiLuogo = (id) => CREATURE.filter((c) => c.luoghi.includes(id));
  const creatureDiQuest = (id) => CREATURE.filter((c) => c.quest.includes(id));
  const creatureDiPersonaggio = (id) => CREATURE.filter((c) => c.personaggi.includes(id));

  // Trasforma i nomi delle creature in link (es. "2 Mefiti di Cenere")
  const aliasCreature = CREATURE.flatMap((c) => c.alias.map((a) => [a, c.id]))
    .sort((a, b) => b[0].length - a[0].length);
  const reCreature = new RegExp(`\\b(${aliasCreature.map(([a]) => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'g');
  const linkifyCreature = (s) => linkify(s).replace(reCreature, (m) => {
    const hit = aliasCreature.find(([a]) => a === m);
    return hit ? `<a href="#/bestiario/${hit[1]}">${m}</a>` : m;
  });

  const head = (kicker, title) => `
    <div class="page-head">
      ${kicker ? `<div class="kicker">${esc(kicker)}</div>` : ''}
      <h1>${esc(title)}</h1>
    </div>`;

  const listaLink = (titolo, items) => items.length ? `
    <div class="box">
      <h3>${esc(titolo)}</h3>
      <ul class="link-list">${items.map((i) => `<li>${i}</li>`).join('')}</ul>
    </div>` : '';

  // ---------- Pagine ----------
  const pagine = {};

  pagine.home = () => {
    const d = leggiDiario();
    const inCorso = tutteLeQuest().filter((q) => d.quest[q.id] === 'corso');
    const ultima = [...d.sessioni].sort((a, b) => b.n - a.n)[0];
    return `
    <a class="box now-card" href="#/diario">
      <div><span class="kick">Diario della campagna</span>
        <b>Settimana ${d.settimana}</b> · ${inCorso.length} quest in corso · ${d.sigilli} sigilli cancellati</div>
      <div class="muted">${ultima ? `Ultima sessione: ${ultima.n}${ultima.titolo ? ` — ${esc(ultima.titolo)}` : ''}` : 'Nessuna sessione registrata'} →</div>
    </a>
    <section class="cover">
      <h1>${esc(CAMPAGNA.titolo)}</h1>
      <div class="sub">${esc(CAMPAGNA.sottotitolo.toUpperCase())}</div>
      <hr>
      <p class="topics">${esc(CAMPAGNA.argomenti)}</p>
      <hr>
      <p class="intro">${esc(CAMPAGNA.intro)}</p>
      <p class="setting">${esc(CAMPAGNA.ambientazione)}</p>
      <p>${esc(CAMPAGNA.durata)}</p>
    </section>
    <div class="home-tiles">
      <a href="#/storia"><strong>Storia</strong><span>Aethelred, i Sette Saggi e la Grande Frattura</span></a>
      <a href="#/fazioni"><strong>Fazioni e Casate</strong><span>${FAZIONI.length} fazioni</span></a>
      <a href="#/personaggi"><strong>Personaggi</strong><span>${PERSONAGGI.length} schede complete e ${PNG_MINORI.length} PNG minori</span></a>
      <a href="#/luoghi"><strong>Luoghi</strong><span>${VILLAGGI.length} villaggi e ${CITTA.length} luoghi principali</span></a>
      <a href="#/quest"><strong>Quest</strong><span>${QUEST.length} missioni e la Maledizione di Cinerebrax</span></a>
      <a href="#/indizi"><strong>Segreti e Indizi</strong><span>${tuttiIndizi().length} indizi in ${INDIZI.length} categorie</span></a>
      <a href="#/archi"><strong>Archi Narrativi</strong><span>${ARCHI.length} archi e come intrecciarli</span></a>
      <a href="#/timeline"><strong>Timeline</strong><span>Eventi settimana per settimana</span></a>
      <a href="#/web"><strong>Web della Trama</strong><span>La mappa di tutti i fili</span></a>
      <a href="#/bestiario"><strong>Bestiario</strong><span>${CREATURE.length} creature della Setta e dell'isola</span></a>
      <a href="#/incontri"><strong>Incontri</strong><span>${INCONTRI_PRONTI.righe.length} incontri pronti e 2 tabelle casuali</span></a>
    </div>`;
  };

  pagine.storia = () => `
    ${head('Parte I', 'La Storia e il Mondo')}
    <h2>1. Aethelred e i Sette Saggi</h2>
    <p>${esc(STORIA.aethelred)}</p>
    <h3>I Sette Saggi di Aethelred</h3>
    <div class="saggi">
      ${STORIA.saggi.map((s) => `
        <div class="saggio">
          <b>${s.ref ? `<a href="#/personaggi/${s.ref}">${esc(s.nome)}</a>` : esc(s.nome)}</b>
          <span class="el">(${esc(s.elemento)})</span>
          <div>${esc(s.testo)}</div>
        </div>`).join('')}
    </div>
    <h2>2. La Grande Frattura</h2>
    <p>${esc(STORIA.frattura)}</p>
    ${secret(`<div class="callout">■ ${esc(STORIA.veritaNascosta)}</div>`, 'div')}
    <p class="muted">Gli indizi per scoprirla sono nella sezione <a href="#/indizi">Segreti e Indizi</a>.</p>`;

  pagine.fazioni = () => {
    const casate = PERSONAGGI.filter((p) => /Casata/.test(p.titolo));
    return `
    ${head('Parte I', 'Fazioni e Casate')}
    <h2>3. Le Due Fazioni</h2>
    ${FAZIONI.map((f) => {
      const membri = tuttiPersonaggi().filter((p) => p.gruppo === f.id);
      const citta = CITTA.filter((c) => c.fazione === f.id);
      return `
      <div class="box c-${f.id}">
        <h3>${esc(f.nome)} <span class="muted">(${esc(f.sottotitolo)})</span></h3>
        <table class="info-table">
          ${f.campi.map(([k, v]) => `<tr><th>${esc(k)}:</th><td>${esc(v)}</td></tr>`).join('')}
        </table>
        <p style="margin-top:.8em"><b>Personaggi:</b> ${membri.map(linkPersonaggio).join(' · ')}</p>
        <p><b>Città:</b> ${citta.map(linkLuogo).join(' · ')}</p>
      </div>`;
    }).join('')}
    <h2>4. Le Quattro Casate</h2>
    <div class="missing">Nel PDF questo capitolo è presente nell'indice ma la pagina è vuota.
      Le casate qui sotto sono quelle nominate nelle schede personaggio.</div>
    <div class="grid" style="margin-top:16px">
      ${casate.map((p) => {
        const casata = p.titolo.split('—').pop().trim();
        return `<div class="box c-${p.gruppo}">
          <h3>${esc(casata)}</h3>
          <p>${linkPersonaggio(p)}<br><span class="muted">${esc(p.titolo)}</span></p>
        </div>`;
      }).join('')}
    </div>`;
  };

  let filtroGruppo = 'tutti';

  pagine.personaggi = (id) => {
    if (id) return paginaPersonaggio(id);
    const filtra = (arr) => filtroGruppo === 'tutti' ? arr : arr.filter((p) => p.gruppo === filtroGruppo);
    const principali = filtra(PERSONAGGI);
    const minori = filtra(PNG_MINORI);
    return `
    ${head('Parte II', 'Personaggi e Schede')}
    <div class="chips" id="chips">
      <button class="chip ${filtroGruppo === 'tutti' ? 'active' : ''}" data-g="tutti">Tutti</button>
      ${Object.entries(GRUPPI).map(([g, n]) =>
        `<button class="chip ${filtroGruppo === g ? 'active' : ''}" data-g="${g}">${n}</button>`).join('')}
    </div>
    ${principali.length ? `<h2>Schede Personaggio</h2>
    <div class="grid">
      ${principali.map((p) => `
        <a class="char-card ${p.gruppo}" href="#/personaggi/${p.id}">
          <span class="tag ${p.gruppo}">${esc(p.etichetta)}</span>
          <h3>${esc(p.nome)}</h3>
          <div class="t">${p.titoloSegreto ? secret(esc(p.titolo)) : esc(p.titolo)}</div>
          <div class="mini"><span>❤ ${esc(p.pf)} PF</span><span>🛡 ${esc(p.ca)} CA</span><span>LVL/CR ${esc(p.lvl)}</span></div>
        </a>`).join('')}
    </div>` : ''}
    ${minori.length ? `<h2>14. PNG Minori — Schede Rapide</h2>
    <div class="grid">
      ${minori.map((p) => `
        <a class="char-card ${p.gruppo}" href="#/personaggi/${p.id}">
          <h3>${esc(p.nome)}</h3>
          <div class="t">${esc(p.sottotitolo)}</div>
        </a>`).join('')}
    </div>` : ''}`;
  };

  function correlatiPersonaggio(p) {
    const luoghi = (p.luoghi || []).map(trovaLuogo).filter(Boolean);
    const abitaIn = VILLAGGI.filter((v) => v.abitanti.some((a) => a.ref === p.id));
    const tuttiLuoghiP = [...new Set([...luoghi, ...abitaIn])];
    const quest = QUEST.filter((q) => (q.personaggi || []).includes(p.id));
    return `<div class="related">
      ${listaLink('Luoghi', tuttiLuoghiP.map(linkLuogo))}
      ${listaLink('Quest collegate', quest.map(linkQuest))}
      ${listaLink('Nel Bestiario', creatureDiPersonaggio(p.id).map(linkCreatura))}
      <div class="box rapporto">
        <h3>Rapporto con i PG</h3>
        ${editorRapporto(p.id, leggiDiario())}
        <p class="muted" style="font-size:.85rem;margin:.4em 0 0">Salvato nel <a href="#/diario">Diario</a>.</p>
      </div>
    </div>`;
  }

  function paginaPersonaggio(id) {
    const p = trovaPersonaggio(id);
    if (!p) return nonTrovato();
    const back = `<a class="back" href="#/personaggi">← Tutti i personaggi</a>`;

    if (!p.stats) {
      // PNG minore: scheda rapida
      return `${back}
        <div class="box c-${p.gruppo}">
          <h1 style="font-family:var(--serif);font-style:italic">${esc(p.nome)}${p.sottotitolo ? ` — ${esc(p.sottotitolo)}` : ''}</h1>
          <h3>Profilo Rapido</h3>
          ${p.righe.map((r) => `<p>${esc(r)}</p>`).join('')}
          <p class="note">${linkify(p.nota)}</p>
        </div>
        ${correlatiPersonaggio(p)}`;
    }

    return `${back}
    <article class="sheet ${p.gruppo}">
      <div class="sheet-head">
        <div class="lbl">${esc(p.etichetta)}</div>
        <h1>${esc(p.nome)}</h1>
        <div class="sub">${p.titoloSegreto ? secret(esc(p.titolo)) : esc(p.titolo)}</div>
      </div>
      <div class="sheet-body">
        <div>
          <table class="info-table">
            <tr><th>Razza:</th><td>${esc(p.razza)}</td></tr>
            <tr><th>Classe:</th><td>${esc(p.classe)}</td></tr>
            <tr><th>Età:</th><td>${esc(p.eta)}</td></tr>
            <tr><th>Allineam.:</th><td>${esc(p.allineamento)}</td></tr>
          </table>
        </div>
        <div>
          <div class="badges">
            <div class="badge pf">${esc(p.pf)}<small>PF</small></div>
            <div class="badge ca">${esc(p.ca)}<small>CA</small></div>
            <div class="badge vel">${esc(p.vel)}<small>VEL</small></div>
            <div class="badge lvl">${esc(p.lvl)}<small>LVL/CR</small></div>
          </div>
          <div class="stats">
            ${p.stats.map(([v, m], i) => `<div class="stat"><div class="n">${STAT_NOMI[i]}</div><div class="v">${esc(v)}</div><div class="m">${esc(m)}</div></div>`).join('')}
          </div>
        </div>
        <div class="panel full">
          <h4>CARATTERISTICHE SPECIALI</h4>
          <ul>${p.speciali.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>
        <div class="panel"><h4>BACKGROUND</h4><p>${esc(p.background)}</p></div>
        <div class="panel"><h4>MOTIVAZIONE</h4><p>${esc(p.motivazione)}</p></div>
        ${secret(`<div class="panel secret-panel" style="height:100%"><h4>SEGRETO</h4><p>${esc(p.segreto)}</p></div>`, 'div')}
        <div class="panel"><h4>GANCIO TRAMA</h4><p>${linkify(p.gancio)}</p></div>
        <div class="panel full">
          <h4>AZIONI IN COMBATTIMENTO</h4>
          ${p.azioni.map(([n, d]) => `<div class="action"><b>${esc(n)}</b>${esc(d)}</div>`).join('')}
        </div>
      </div>
    </article>
    ${correlatiPersonaggio(p)}`;
  }

  pagine.luoghi = (id) => {
    if (id) return paginaLuogo(id);
    const conteggi = (l) => {
      const q = QUEST.filter((x) => x.luoghi.includes(l.id)).length;
      const i = tuttiIndizi().filter((x) => x.luoghi.includes(l.id)).length;
      return `<div class="mini"><span>📜 ${q} quest</span><span>🔍 ${i} indizi</span></div>`;
    };
    return `
    ${head('Parte III', 'I Villaggi Sperduti')}
    <div class="grid">
      ${VILLAGGI.map((v) => `
        <a class="char-card" href="#/luoghi/${v.id}">
          <h3>${esc(v.nome)}</h3>
          <div class="t">${esc(v.descrizione)}</div>
          ${conteggi(v)}
        </a>`).join('')}
    </div>
    <h2>Città e Luoghi Principali</h2>
    <p class="muted">Il PDF non contiene una descrizione di questi luoghi: le loro schede raccolgono quello che ne dicono le altre sezioni.</p>
    <div class="grid">
      ${CITTA.map((c) => `
        <a class="char-card ${c.fazione || ''}" href="#/luoghi/${c.id}">
          <h3>${esc(c.nome)}</h3>
          ${c.fazione ? `<span class="tag ${c.fazione}">${esc(FAZIONI.find((f) => f.id === c.fazione).sottotitolo)}</span>` : ''}
          ${conteggi(c)}
        </a>`).join('')}
    </div>`;
  };

  function paginaLuogo(id) {
    const l = trovaLuogo(id);
    if (!l) return nonTrovato();
    const quest = QUEST.filter((q) => q.luoghi.includes(id));
    const atti = MALEDIZIONE.filter((a) => a.luoghi.includes(id));
    const indizi = tuttiIndizi().filter((i) => i.luoghi.includes(id));
    const personaggi = tuttiPersonaggi().filter((p) => (p.luoghi || []).includes(id));
    const isVillaggio = !!l.descrizione;
    const fazione = l.fazione && FAZIONI.find((f) => f.id === l.fazione);

    return `
    <a class="back" href="#/luoghi">← Tutti i luoghi</a>
    ${head(isVillaggio ? 'Villaggio' : 'Luogo principale', l.nome)}
    ${isVillaggio ? `
      <p style="font-size:1.1rem">${esc(l.descrizione)}</p>
      <div class="box">
        <h3>Abitanti Notevoli</h3>
        <ul>${l.abitanti.map((a) => `<li>${a.ref ? `<a href="#/personaggi/${a.ref}">${esc(a.t)}</a>` : esc(a.t)}</li>`).join('')}</ul>
        ${l.note.map((n) => `<p class="note" style="margin-top:.6em">${esc(n)}</p>`).join('')}
      </div>` : `
      <div class="missing">Il PDF non contiene una descrizione di questo luogo.</div>
      ${fazione ? `<p style="margin-top:12px"><b>Fazione:</b> <a href="#/fazioni">${esc(fazione.nome)}</a> (${esc(fazione.sottotitolo)})</p>` : ''}`}
    <div class="related">
      ${listaLink('Personaggi', personaggi.map((p) => `${linkPersonaggio(p)}${p.titolo ? `<br><small class="muted">${p.titoloSegreto ? secret(esc(p.titolo)) : esc(p.titolo)}</small>` : ''}`))}
      ${listaLink('Quest in questo luogo', [
        ...quest.map((q) => `${linkQuest(q)}<br><small class="muted">${esc(q.info)}</small>`),
        ...atti.map((a) => `<a href="#/quest/${a.id}">${esc(a.titolo)}</a>`),
      ])}
      ${listaLink('Indizi trovabili qui', indizi.map((i) => `${linkIndizio(i)}<br><small class="muted">${esc(i.dove)}</small>`))}
      ${listaLink('Creature', creatureDiLuogo(id).map((c) => `${linkCreatura(c)}<br><small class="muted">GS ${esc(c.indice.gs)} · ${esc(c.indice.tipo)}</small>`))}
    </div>`;
  }

  pagine.quest = (id) => {
    setTimeout(() => evidenzia(id), 30);
    const dq = leggiDiario().quest;
    return `
    ${head('Parte IV', 'Quest e Avventure')}
    ${QUEST.map((q) => `
      <section class="quest stato-${dq[q.id] || 'nessuno'}" id="q-${q.id}">
        <div class="quest-top"><h3>${esc(q.id)} — ${esc(q.titolo)}</h3>${selectStato(q.id, dq[q.id] || '')}</div>
        <div class="info">${esc(q.info)}</div>
        <p>${esc(q.testo)}</p>
        <div class="conn">${linkify(q.connette)}</div>
        <p class="muted" style="font-size:.9rem;margin-top:6px">
          ${q.luoghi.map((lid) => trovaLuogo(lid)).filter(Boolean).map(linkLuogo).join(' · ')}
          ${q.personaggi.length ? ' — ' + q.personaggi.map(trovaPersonaggio).filter(Boolean).map(linkPersonaggio).join(' · ') : ''}
        </p>
        ${creatureDiQuest(q.id).length ? `<p class="creature-line">🐉 ${creatureDiQuest(q.id).map(linkCreatura).join(' · ')}</p>` : ''}
      </section>`).join('')}
    <h2>La Maledizione di Cinerebrax — Riepilogo</h2>
    ${MALEDIZIONE.map((a) => `
      <div class="box atto quest stato-${dq[a.id] || 'nessuno'}" id="q-${a.id}">
        <div class="quest-top"><h3>${esc(a.titolo)}</h3>${selectStato(a.id, dq[a.id] || '')}</div>
        ${a.righe.map((r) => `<p style="margin:0 0 .3em">${esc(r)}</p>`).join('')}
        ${a.nota ? `<p class="note">${esc(a.nota)}</p>` : ''}
        ${creatureDiQuest(a.id).length ? `<p class="creature-line">🐉 ${creatureDiQuest(a.id).map(linkCreatura).join(' · ')}</p>` : ''}
      </div>`).join('')}`;
  };

  // ---------- Bestiario ----------
  pagine.bestiario = (id) => {
    if (id) return paginaCreatura(id);
    return `
    ${head('Supplemento', 'Bestiario')}
    <p class="muted" style="text-align:center;margin-top:-10px">${esc(BESTIARIO_INFO.sottotitolo)} · ${esc(BESTIARIO_INFO.meta)}</p>
    <details class="box">
      <summary><b>Come usare questo bestiario</b></summary>
      ${BESTIARIO_INFO.comeUsare.map((p) => `<p style="margin-top:.6em">${linkify(p)}</p>`).join('')}
    </details>
    <p><a class="btn" href="#/incontri">⚔ Incontri pronti e casuali</a></p>
    ${SEZIONI_BESTIARIO.map((s) => {
      const lista = CREATURE.filter((c) => c.sezione === s.id);
      return `
      <h2>${esc(s.nome)}</h2>
      <div class="grid">
        ${lista.map((c) => `
          <a class="char-card mon ${s.id}" href="#/bestiario/${c.id}">
            <span class="gs">GS ${esc(c.indice.gs)}</span>
            <h3>${esc(c.nome)}</h3>
            <div class="t">${esc(c.indice.tipo)}</div>
            <div class="mini"><span>🛡 CA ${esc(c.ca.split(' ')[0])}</span><span>❤ PF ${esc(c.pf.split(' ')[0])}</span></div>
            <div class="t" style="margin-top:6px">📍 ${esc(c.indice.dove)}</div>
          </a>`).join('')}
      </div>`;
    }).join('')}`;
  };

  function paginaCreatura(id) {
    const c = trovaCreatura(id);
    if (!c) return nonTrovato();
    const sez = SEZIONI_BESTIARIO.find((s) => s.id === c.sezione);
    const blocco = (titolo, voci) => voci && voci.length ? `
      <h4 class="sb-title">${esc(titolo)}</h4>
      ${voci.map(([n, t, lista]) => `
        <p class="sb-trait"><b><i>${esc(n)}.</i></b> ${linkify(t)}</p>
        ${lista ? `<ul class="sb-spells">${lista.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}`).join('')}` : '';
    const luoghi = c.luoghi.map(trovaLuogo).filter(Boolean);
    const quest = c.quest.map((q) => QUEST.find((x) => x.id === q) || MALEDIZIONE.find((x) => x.id === q)).filter(Boolean);
    const pers = c.personaggi.map(trovaPersonaggio).filter(Boolean);
    const incontri = INCONTRI_PRONTI.righe.filter((r) => c.alias.some((a) => r.composizione.includes(a)));

    return `
    <a class="back" href="#/bestiario">← Tutto il bestiario</a>
    <article class="statblock-wrap">
      <div class="statblock">
        <div class="sb-kicker ${c.sezione}">${esc(sez.etichetta)}</div>
        <h1 class="sb-name">${esc(c.nome)}</h1>
        <div class="sb-type">${esc(c.tipo)}</div>
        <hr class="sb-rule">
        <p class="sb-line"><b>Classe Armatura</b> ${esc(c.ca)}</p>
        <p class="sb-line"><b>Punti Ferita</b> ${esc(c.pf)}</p>
        <p class="sb-line"><b>Velocità</b> ${esc(c.vel)}</p>
        <hr class="sb-rule">
        <div class="sb-stats">
          ${c.stats.map((s, i) => `<div><b>${STAT_LABELS[i]}</b><span>${esc(s)}</span></div>`).join('')}
        </div>
        <hr class="sb-rule">
        ${c.dettagli.map(([k, v]) => `<p class="sb-line"><b>${esc(k)}</b> ${esc(v)}</p>`).join('')}
        <hr class="sb-rule">
        ${c.tratti.map(([n, t, lista]) => `
          <p class="sb-trait"><b><i>${esc(n)}.</i></b> ${linkify(t)}</p>
          ${lista ? `<ul class="sb-spells">${lista.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}`).join('')}
        ${blocco('Azioni', c.azioni)}
        ${blocco('Reazioni', c.reazioni)}
      </div>
      <aside class="isola">
        <h3>Sull'isola</h3>
        <h4>Dove si incontra</h4><p>${linkify(c.isola.dove)}</p>
        <h4>Tattiche e comportamento</h4><p>${linkify(c.isola.tattiche)}</p>
        <h4>Bottino e indizi</h4><p>${linkify(c.isola.bottino)}</p>
        <h4>Aggancio di trama</h4><p>${linkify(c.isola.aggancio)}</p>
        <p class="fonte"><b>Fonte:</b> ${linkify(c.fonte)}</p>
      </aside>
    </article>
    <div class="related">
      ${listaLink('Luoghi', luoghi.map(linkLuogo))}
      ${listaLink('Quest', quest.map((q) => QUEST.includes(q) ? linkQuest(q) : `<a href="#/quest/${q.id}">${esc(q.titolo)}</a>`))}
      ${listaLink('Personaggi collegati', pers.map(linkPersonaggio))}
      ${listaLink('Incontri pronti', incontri.map((r) => `<a href="#/incontri">${esc(r.nome)}</a><br><small class="muted">Liv. ${esc(r.liv)} · ${esc(r.difficolta)}</small>`))}
    </div>`;
  }

  pagine.incontri = () => `
    ${head('Bestiario', 'Incontri')}
    <h2 style="margin-top:0">Incontri pronti</h2>
    <p>${esc(INCONTRI_PRONTI.intro)}</p>
    <div class="enc-table" role="table">
      <div class="enc-row enc-head" role="row">
        <span role="columnheader">Incontro</span><span role="columnheader">Liv.</span>
        <span role="columnheader">Composizione</span><span role="columnheader">PE mod.</span><span role="columnheader">Difficoltà</span>
      </div>
      ${INCONTRI_PRONTI.righe.map((r) => `
        <div class="enc-row diff-${norm(r.difficolta.split(/[ :(]/)[0])}" role="row">
          <span role="cell" data-l="Incontro"><b>${esc(r.nome)}</b>${r.rif ? `<small>${linkify(r.rif)}</small>` : ''}</span>
          <span role="cell" data-l="Liv.">${esc(r.liv)}</span>
          <span role="cell" data-l="Composizione">${linkifyCreature(r.composizione)}</span>
          <span role="cell" data-l="PE mod.">${esc(r.pe)}</span>
          <span role="cell" data-l="Difficoltà" class="diff">${esc(r.difficolta)}</span>
        </div>`).join('')}
    </div>
    <h2>Incontri casuali</h2>
    <p>${esc(INCONTRI_CASUALI.intro)}</p>
    ${INCONTRI_CASUALI.tabelle.map((t) => `
      <div class="box roll-table" id="tab-${t.id}">
        <div class="roll-head">
          <h3>${esc(t.titolo)}</h3>
          <button class="btn roll-btn" type="button" data-roll="${t.id}">🎲 Tira d8</button>
        </div>
        <ol class="roll-list">
          ${t.righe.map((r, i) => `<li data-n="${i + 1}"><span class="n">${i + 1}</span><span>${linkifyCreature(r)}</span></li>`).join('')}
        </ol>
      </div>`).join('')}`;

  // Indizi trovati: salvati nel browser
  const indiziTrovati = () => new Set(store.get('mt-indizi', []));

  pagine.indizi = (id) => {
    setTimeout(() => evidenzia(id), 30);
    const trovati = indiziTrovati();
    return `
    ${head('Parte V', 'Segreti e Indizi')}
    <h2 style="margin-top:0">Come Usare gli Indizi</h2>
    <p>${esc(COME_USARE_INDIZI)}</p>
    <p class="muted" style="font-size:.95rem">Spunta gli indizi che i PG hanno già trovato: la scelta resta salvata in questo browser.
      <button class="reset-btn" id="resetIndizi" type="button">Azzera tutti</button></p>
    ${INDIZI.map((cat) => {
      const n = cat.voci.filter((v) => trovati.has(v.id)).length;
      return `
      <h2>${esc(cat.titolo)}</h2>
      <div class="progress"><span>${n}/${cat.voci.length} trovati</span><div class="bar"><span style="width:${(n / cat.voci.length) * 100}%"></span></div></div>
      ${cat.voci.map((v) => `
        <label class="clue ${trovati.has(v.id) ? 'found' : ''}" id="q-${v.id}">
          <input type="checkbox" data-clue="${v.id}" ${trovati.has(v.id) ? 'checked' : ''} aria-label="Indizio trovato">
          <span class="ct">■ ${esc(v.titolo)}</span>
          <span></span><span>${esc(v.testo)}</span>
          <span></span><span class="cw">■ ${linkify(v.dove)}</span>
        </label>`).join('')}`;
    }).join('')}`;
  };

  pagine.archi = () => `
    ${head('Parte VI', 'Archi Narrativi e Come Intrecciarli')}
    <div class="box c-indipendente">
      <h3>Connessioni con altri archi</h3>
      ${CONNESSIONI_ARCHI.map((c) => `<p style="margin:0 0 .3em">${esc(c)}</p>`).join('')}
    </div>
    ${ARCHI.map((a) => `
      <section class="arc">
        <h2>${esc(a.titolo)}</h2>
        <p>${esc(a.intro)}</p>
        ${a.fasi.map(([k, v]) => `<div class="fase"><b>■ ${esc(k)}:</b>${linkify(v)}</div>`).join('')}
      </section>`).join('')}`;

  pagine.timeline = () => {
    const w = leggiDiario().settimana;
    const iT = indiceTimeline(w);
    return `
    ${head('Parte VI', 'Timeline degli Eventi e Pressioni Temporali')}
    <p class="muted" style="color:#2d5a27">${esc(TIMELINE.intro)}</p>
    <div class="box week-banner">📅 Siete alla <b>settimana ${w}</b>. <a href="#/diario">Cambiala nel Diario →</a></div>
    <div class="timeline">
      ${TIMELINE.voci.map(([t, d], i) => `
        <div class="tl-item ${/Scadenza/.test(t) ? 'deadline' : ''} ${i < iT ? 'past' : ''} ${i === iT ? 'now' : ''}">
          <h3>■ ${esc(t)}${i === iT ? ' <span class="now-tag">ORA</span>' : ''}</h3>
          <p>${linkify(d)}</p>
        </div>`).join('')}
    </div>
    <blockquote class="quote">${esc(TIMELINE.citazione)}</blockquote>
    ${TIMELINE.chiusura.map((c) => `<p>${esc(c)}</p>`).join('')}`;
  };

  pagine.web = () => {
    const colori = {
      setta: ['#f3e3e3', '#8b1a1a'], drago: ['#fbece4', '#8a1f0a'], neutrale: ['#e6f0e2', '#2d5a27'],
      ombra: ['#e4dbef', '#5b3584'], luce: ['#fdf4d8', '#c8960c'], aethelred: ['#3a2618', '#7a5530'],
      ferrovia: ['#2b1d10', '#8b1a1a'], solara: ['#d7e7f5', '#1d5c8e'], villaggio: ['#4e6b2e', '#2b3d17'],
      pace: ['#eaf3e3', '#2d5a27'],
    };
    const lineStyle = {
      principale: ['#a87b1e', ''], guerra: ['#7a1414', '8 5'], pace: ['#2d5a27', '6 5'],
      setta: ['#8b1a1a', '5 5'], drago: ['#a3290f', '5 4'], magico: ['#1d3c6e', '5 5'], villaggio: ['#c9b48a', '4 4'],
    };
    const nodo = Object.fromEntries(WEB.nodi.map((n) => [n.id, n]));
    const villaggiColori = {
      radicechiara: '#2d5a27', roccabuia: '#4b2e7a', villagrotta: '#5b4a8a', cenerefondi: '#6b5a48',
      auriverde: '#4e6b2e', 'bassa-marea': '#1d5c8e', passo: '#7a6420',
    };

    const linee = WEB.archi.map((a) => {
      const A = nodo[a.da], B = nodo[a.a];
      const [col, dash] = lineStyle[a.tipo];
      const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${col}" stroke-width="${a.tipo === 'guerra' ? 3 : 1.6}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>
        ${a.etichetta ? `<text x="${mx}" y="${my - 4}" text-anchor="middle" font-size="11" font-style="italic" fill="${col}" stroke="#ece0c2" stroke-width="3" paint-order="stroke">${esc(a.etichetta)}</text>` : ''}`;
    }).join('');

    const nodi = WEB.nodi.map((n) => {
      let [fill, stroke] = colori[n.colore];
      if (n.colore === 'villaggio') { fill = villaggiColori[n.id] || fill; stroke = '#2b1d10'; }
      const scuro = ['aethelred', 'ferrovia', 'villaggio'].includes(n.colore);
      const tc = scuro ? '#fff' : '#2b1d10';
      const righe = [n.t1, n.t2, n.t3].filter(Boolean);
      const fs = n.piccolo ? 10 : 13;
      const y0 = n.y - ((righe.length - 1) * (fs + 2)) / 2 + fs / 3;
      const testo = righe.map((t, i) => {
        const titolo = i === 0 && !n.piccolo;
        const segreto = n.id === 'corvus' && i === 1;
        return `<text ${segreto ? 'class="secret"' : ''} x="${n.x}" y="${y0 + i * (fs + 3)}" text-anchor="middle" font-size="${fs}" fill="${tc}" ${titolo ? 'font-weight="700" font-style="italic"' : ''}>${esc(t)}</text>`;
      }).join('');
      const forma = n.rett
        ? `<rect x="${n.x - 95}" y="${n.y - 28}" width="190" height="56" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`
        : `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;
      return `<a href="${n.link}" class="web-node">${forma}${testo}</a>`;
    }).join('');

    return `
    ${head('Parte VI', 'Web della Trama — Mappa Completa')}
    <p class="muted" style="text-align:center">Come ogni arco narrativo, personaggio e segreto si collegano. Clicca un cerchio per aprire la sua scheda.</p>
    <div class="web-wrap">
      <svg viewBox="0 0 800 720" role="img" aria-label="Web della Trama" font-family="EB Garamond, Georgia, serif">
        ${linee}
        ${nodi}
      </svg>
    </div>
    <p class="scroll-hint">↔ Scorri di lato per vedere tutta la mappa</p>
    <div class="web-legend">
      <b>LEGENDA</b>
      ${WEB.legenda.map(([t, n]) => `<span><i style="border-color:${lineStyle[t][0]};${lineStyle[t][1] ? 'border-top-style:dashed' : ''}"></i>${esc(n)}</span>`).join('')}
    </div>`;
  };

  // =====================================================================
  // DIARIO DELLA CAMPAGNA — stato della partita, salvato nel browser
  // =====================================================================
  const DIARIO_KEY = 'mt-diario';
  const diarioVuoto = () => ({ settimana: 0, sigilli: 0, rook: 0, quest: {}, obiettivi: {}, png: {}, sessioni: [] });
  const leggiDiario = () => ({ ...diarioVuoto(), ...store.get(DIARIO_KEY, {}) });
  const salvaDiario = (d) => store.set(DIARIO_KEY, d);
  const modificaDiario = (fn) => { const d = leggiDiario(); fn(d); salvaDiario(d); return d; };

  const STATI_QUEST = [['', 'Non iniziata'], ['corso', 'In corso'], ['fatta', 'Completata'], ['fallita', 'Fallita']];
  const ATTEGGIAMENTI = ['', 'Ostile', 'Diffidente', 'Neutrale', 'Amichevole', 'Alleato'];
  const OBIETTIVI = [
    ['lettera', 'Lettera delle trattative Oakhart-Kaelan trovata', '#/quest/4.7'],
    ['oakhart', 'Oakhart salvato al Duello di Mezza Estate', '#/quest/4.10'],
    ['ombra-bianca', 'Ombra-Bianca protetta', '#/personaggi/ombra-bianca'],
    ['corvus', 'Corvus smascherato', '#/personaggi/corvus'],
    ['silas', 'Silas liberato', '#/personaggi/silas'],
    ['drago', 'Cinerebrax neutralizzato', '#/personaggi/cinerebrax'],
    ['rituale', 'Rituale di Corvus fermato', '#/archi'],
  ];
  const tutteLeQuest = () => [...QUEST.map((q) => ({ id: q.id, titolo: `${q.id} — ${q.titolo}`, info: q.info })),
    ...MALEDIZIONE.map((a) => ({ id: a.id, titolo: a.titolo, info: 'La Maledizione di Cinerebrax' }))];

  // La timeline del PDF raggruppa alcune settimane: 4–5, 6+ (fino alla 7), 8
  const indiceTimeline = (w) => (w <= 3 ? w : w <= 5 ? 4 : w <= 7 ? 5 : 6);
  const SETTIMANA_MAX = 8;

  const selectStato = (qid, stato) => `
    <select class="stato-select" data-quest="${esc(qid)}" aria-label="Stato della quest">
      ${STATI_QUEST.map(([v, n]) => `<option value="${v}" ${stato === v ? 'selected' : ''}>${n}</option>`).join('')}
    </select>`;

  const editorRapporto = (pid, d) => {
    const r = d.png[pid] || {};
    return `
      <select data-png-att="${esc(pid)}" aria-label="Atteggiamento verso i PG">
        ${ATTEGGIAMENTI.map((a) => `<option value="${a}" ${r.att === a ? 'selected' : ''}>${a || '— nessuno —'}</option>`).join('')}
      </select>
      <textarea data-png-note="${esc(pid)}" rows="2" placeholder="Note: cosa sa, cosa ha promesso, cosa pensa dei PG…">${esc(r.note || '')}</textarea>`;
  };

  const contatore = (act, valore, max) => `
    <div class="counter">
      <button type="button" class="cbtn" data-act="${act}-" aria-label="Diminuisci">−</button>
      <span class="cval">${valore}${max ? `<small>/${max}</small>` : ''}</span>
      <button type="button" class="cbtn" data-act="${act}+" aria-label="Aumenta">+</button>
    </div>`;

  pagine.diario = () => {
    const d = leggiDiario();
    const iT = indiceTimeline(d.settimana);
    const [tOra, dOra] = TIMELINE.voci[iT];
    const prossima = TIMELINE.voci[iT + 1];
    const trovati = indiziTrovati();
    const indiziFrattura = INDIZI[0].voci.filter((v) => trovati.has(v.id)).length;
    const reqA = [
      ['La lettera Oakhart-Kaelan', !!d.obiettivi.lettera],
      [`Almeno 4 indizi sulla vera storia (${indiziFrattura}/8 spuntati)`, indiziFrattura >= 4],
      ['Silas liberato', !!d.obiettivi.silas],
    ];
    const conteggio = (s) => tutteLeQuest().filter((q) => (d.quest[q.id] || '') === s).length;
    const sessioni = [...d.sessioni].sort((a, b) => b.n - a.n);
    const pngList = [...PERSONAGGI, ...PNG_MINORI];

    return `
    ${head('Al tavolo', 'Diario della Campagna')}
    <p class="muted" style="text-align:center;margin-top:-8px">Tutto quello che segni qui resta salvato in questo dispositivo.
      Per portarlo su un altro usa <a href="#/diario" data-act="vai-backup">Esporta / Importa</a>.</p>

    <section class="dsec">
      <h2>Settimana della campagna</h2>
      <div class="week">
        ${contatore('sett', d.settimana)}
        <div class="week-info">
          <div class="week-label">Settimana ${d.settimana}${d.settimana >= SETTIMANA_MAX ? ' — scadenza' : ''}</div>
          <div class="muted">${esc(TIMELINE.intro)}</div>
        </div>
      </div>
      <div class="box tl-now">
        <h3>■ ${esc(tOra)}</h3>
        <p>${linkify(dOra)}</p>
      </div>
      ${prossima ? `<div class="box tl-next"><h3>In arrivo — ${esc(prossima[0])}</h3><p>${linkify(prossima[1])}</p></div>` : ''}
      <p><a href="#/timeline">Vedi tutta la timeline →</a></p>
    </section>

    <section class="dsec">
      <h2>Contatori</h2>
      <div class="grid">
        <div class="box">
          <h3>Sigilli cancellati</h3>
          ${contatore('sig', d.sigilli)}
          <p class="note" style="margin-top:.6em">Ogni sigillo cancellato avvicina il rituale di Corvus (Timeline, settimana 6+).</p>
          <p style="font-size:.92rem">Vedi: <a href="#/bestiario/cancellatore">Cancellatore di Glifi</a> ·
            <a href="#/bestiario/sentinella">Sentinella di Aethelred</a> · <a href="#/bestiario/bambino">Il Bambino con gli Occhi d'Argento</a></p>
        </div>
        <div class="box">
          <h3>Rook il Cacciatore — interazioni positive</h3>
          ${contatore('rook', d.rook, 3)}
          <p class="note" style="margin-top:.6em">Guida essenziale per Monte Cinere. Tre interazioni positive: rivela tutto sul drago.</p>
          ${d.rook >= 3 ? `<p class="ok">✓ Rook si fida dei PG: <a href="#/indizi/d5">indizio «Rook con la Torcia»</a></p>` : ''}
        </div>
        <div class="box">
          <h3>Indizi trovati</h3>
          ${INDIZI.map((c) => {
            const n = c.voci.filter((v) => trovati.has(v.id)).length;
            return `<div class="mini-prog"><span>${esc(c.titolo.replace(/^\d+\.\s*/, ''))}</span><b>${n}/${c.voci.length}</b></div>`;
          }).join('')}
          <p style="font-size:.92rem;margin-top:.5em"><a href="#/indizi">Apri Segreti e Indizi →</a></p>
        </div>
      </div>
    </section>

    <section class="dsec">
      <h2>Obiettivi chiave</h2>
      <div class="grid">
        <div class="box">
          ${OBIETTIVI.map(([k, n, h]) => `
            <label class="check">
              <input type="checkbox" data-ob="${k}" ${d.obiettivi[k] ? 'checked' : ''}>
              <span>${esc(n)} <a href="${h}" aria-label="Apri">↗</a></span>
            </label>`).join('')}
        </div>
        <div class="box c-indipendente">
          <h3>Arco A — La Pace Impossibile</h3>
          <p class="muted" style="font-size:.95rem">Risoluzione — richiede:</p>
          ${reqA.map(([n, ok]) => `<p class="req ${ok ? 'ok' : ''}">${ok ? '✓' : '○'} ${esc(n)}</p>`).join('')}
          ${reqA.every(([, ok]) => ok) ? '<p class="ok"><b>Tutti i requisiti sono soddisfatti.</b></p>' : ''}
        </div>
      </div>
    </section>

    <section class="dsec">
      <h2>Quest</h2>
      <p class="muted">${conteggio('corso')} in corso · ${conteggio('fatta')} completate · ${conteggio('fallita')} fallite</p>
      <div class="qlist">
        ${tutteLeQuest().map((q) => `
          <div class="qrow stato-${d.quest[q.id] || 'nessuno'}">
            <a href="#/quest/${esc(q.id)}">${esc(q.titolo)}<small>${esc(q.info)}</small></a>
            ${selectStato(q.id, d.quest[q.id] || '')}
          </div>`).join('')}
      </div>
    </section>

    <section class="dsec">
      <h2>Rapporti con i PNG</h2>
      <details class="box">
        <summary><b>Atteggiamento e note per ogni personaggio</b> <span class="muted">(${Object.values(d.png).filter((r) => r.att || r.note).length} compilati)</span></summary>
        <div class="png-list">
          ${pngList.map((p) => `
            <div class="png-row">
              <div class="png-name">${linkPersonaggio(p)}</div>
              ${editorRapporto(p.id, d)}
            </div>`).join('')}
        </div>
      </details>
    </section>

    <section class="dsec">
      <h2>Sessioni</h2>
      <button type="button" class="btn" data-act="nuova-sessione">＋ Nuova sessione</button>
      ${sessioni.length ? sessioni.map((s) => `
        <div class="box sess" data-sess="${s.id}">
          <div class="sess-head">
            <b>Sessione ${s.n}</b>
            <input type="date" value="${esc(s.data)}" data-sess-field="data" aria-label="Data">
            <button type="button" class="reset-btn" data-act="del-sessione" data-id="${s.id}">Elimina</button>
          </div>
          <input type="text" class="sess-title" value="${esc(s.titolo)}" data-sess-field="titolo" placeholder="Titolo (es. «La notte della cenere»)">
          <textarea rows="5" data-sess-field="testo" placeholder="Cosa è successo, scelte dei PG, PNG incontrati, cose da ricordare per la prossima volta…">${esc(s.testo)}</textarea>
        </div>`).join('') : '<p class="muted" style="margin-top:12px">Nessuna sessione ancora. Premi «Nuova sessione» per iniziare.</p>'}
    </section>

    <section class="dsec" id="backup">
      <h2>Esporta / Importa</h2>
      <p>Salva in un file il diario e gli indizi spuntati, per tenerne una copia o aprirli su un altro dispositivo (iPad, iPhone, PC).</p>
      <div class="btn-row">
        <button type="button" class="btn" data-act="export">⬇ Esporta file</button>
        <button type="button" class="btn btn-light" data-act="import">⬆ Importa file</button>
        <input type="file" id="importFile" accept="application/json,.json" hidden>
        <button type="button" class="reset-btn" data-act="reset-diario">Azzera diario</button>
      </div>
    </section>`;
  };

  // Ridisegna la pagina corrente senza tornare in cima
  function ridisegna() {
    const y = window.scrollY;
    const [page = 'home', id] = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    if (pagine[page]) app.innerHTML = pagine[page](id);
    window.scrollTo(0, y);
  }

  function esporta() {
    const dati = { app: 'dnd-master-tome', versione: 1, esportato: new Date().toISOString(),
      diario: leggiDiario(), indizi: [...indiziTrovati()] };
    const blob = new Blob([JSON.stringify(dati, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `master-tome-diario-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  function importa(file) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const dati = JSON.parse(r.result);
        if (dati.app !== 'dnd-master-tome' || !dati.diario) throw new Error('formato');
        const n = (dati.diario.sessioni || []).length;
        if (!confirm(`Il file contiene ${n} sessioni ed è stato esportato il ${new Date(dati.esportato).toLocaleString('it-IT')}.\nVuoi sostituire il diario di questo dispositivo?`)) return;
        salvaDiario({ ...diarioVuoto(), ...dati.diario });
        store.set('mt-indizi', Array.isArray(dati.indizi) ? dati.indizi : []);
        ridisegna();
        alert('Diario importato.');
      } catch (err) {
        alert('Questo file non è un diario di DND Master Tome.');
      }
    };
    r.readAsText(file);
  }

  function nonTrovato() {
    return `${head('', 'Pagina non trovata')}<p><a href="#/home">Torna alla panoramica</a></p>`;
  }

  function evidenzia(id) {
    if (!id) return;
    const el = document.getElementById('q-' + id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }

  // ---------- Router ----------
  function render() {
    const [page = 'home', id] = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    const fn = pagine[page];
    app.innerHTML = fn ? fn(id) : nonTrovato();
    document.querySelectorAll('#nav a, #tabbar a').forEach((a) => a.classList.toggle('active', a.dataset.page === page));
    document.title = (page === 'home' ? '' : (document.querySelector(`#nav a[data-page="${page}"]`)?.textContent || '') + ' · ') + 'DND Master Tome';
    if (!id || !['quest', 'indizi'].includes(page)) window.scrollTo(0, 0);
    chiudiMenu();
  }

  // ---------- Eventi ----------
  app.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) { filtroGruppo = chip.dataset.g; render(); return; }

    const roll = e.target.closest('[data-roll]');
    if (roll) {
      const box = document.getElementById('tab-' + roll.dataset.roll);
      const n = 1 + Math.floor(Math.random() * 8);
      box.querySelectorAll('li').forEach((li) => li.classList.toggle('rolled', li.dataset.n === String(n)));
      roll.textContent = `🎲 Risultato: ${n} — tira ancora`;
      box.querySelector(`li[data-n="${n}"]`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    if (e.target.id === 'resetIndizi') {
      if (confirm('Vuoi togliere la spunta da tutti gli indizi?')) { store.set('mt-indizi', []); render(); }
      return;
    }

    const s = e.target.closest('.secret');
    if (s && document.body.classList.contains('hide-secrets') && !s.classList.contains('revealed')) {
      e.preventDefault(); s.classList.add('revealed');
    }
  });

  app.addEventListener('change', (e) => {
    const id = e.target.dataset.clue;
    if (!id) return;
    const set = indiziTrovati();
    e.target.checked ? set.add(id) : set.delete(id);
    store.set('mt-indizi', [...set]);
    const y = window.scrollY;
    const hash = location.hash;
    app.innerHTML = pagine.indizi();
    if (location.hash === hash) window.scrollTo(0, y);
  });

  // ---------- Eventi del diario (valgono in tutte le pagine) ----------
  app.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    const passi = { 'sett+': ['settimana', 1, SETTIMANA_MAX], 'sett-': ['settimana', -1, SETTIMANA_MAX],
      'sig+': ['sigilli', 1, 999], 'sig-': ['sigilli', -1, 999], 'rook+': ['rook', 1, 3], 'rook-': ['rook', -1, 3] };
    if (passi[act]) {
      const [k, delta, max] = passi[act];
      modificaDiario((d) => { d[k] = Math.max(0, Math.min(max, (d[k] || 0) + delta)); });
      ridisegna();
    } else if (act === 'nuova-sessione') {
      modificaDiario((d) => {
        const n = d.sessioni.reduce((m, s) => Math.max(m, s.n), 0) + 1;
        d.sessioni.push({ id: Date.now().toString(36), n, data: new Date().toISOString().slice(0, 10), titolo: '', testo: '' });
      });
      ridisegna();
      app.querySelector('.sess .sess-title')?.focus();
    } else if (act === 'del-sessione') {
      const d = leggiDiario();
      const s = d.sessioni.find((x) => x.id === b.dataset.id);
      if (s && confirm(`Eliminare la sessione ${s.n}${s.titolo ? ` «${s.titolo}»` : ''}? Non si può annullare.`)) {
        modificaDiario((dd) => { dd.sessioni = dd.sessioni.filter((x) => x.id !== s.id); });
        ridisegna();
      }
    } else if (act === 'export') {
      esporta();
    } else if (act === 'import') {
      document.getElementById('importFile').click();
    } else if (act === 'reset-diario') {
      if (confirm('Azzerare tutto il diario (settimana, contatori, quest, rapporti e sessioni)? Gli indizi spuntati restano. Non si può annullare: se vuoi, esporta prima un file.')) {
        salvaDiario(diarioVuoto()); ridisegna();
      }
    } else if (act === 'vai-backup') {
      e.preventDefault();
      document.getElementById('backup')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  app.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.quest !== undefined) {
      modificaDiario((d) => { if (t.value) d.quest[t.dataset.quest] = t.value; else delete d.quest[t.dataset.quest]; });
      ridisegna();
    } else if (t.dataset.ob) {
      modificaDiario((d) => { d.obiettivi[t.dataset.ob] = t.checked; });
      ridisegna();
    } else if (t.dataset.pngAtt !== undefined) {
      modificaDiario((d) => { d.png[t.dataset.pngAtt] = { ...(d.png[t.dataset.pngAtt] || {}), att: t.value }; });
    } else if (t.id === 'importFile' && t.files[0]) {
      importa(t.files[0]); t.value = '';
    }
  });

  // Testi: salvati mentre scrivi, senza ridisegnare (il cursore resta dov'è)
  app.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.pngNote !== undefined) {
      modificaDiario((d) => { d.png[t.dataset.pngNote] = { ...(d.png[t.dataset.pngNote] || {}), note: t.value }; });
    } else if (t.dataset.sessField) {
      const id = t.closest('[data-sess]').dataset.sess;
      modificaDiario((d) => { const s = d.sessioni.find((x) => x.id === id); if (s) s[t.dataset.sessField] = t.value; });
    }
  });

  // Mostra/nascondi segreti
  const toggle = document.getElementById('secretToggle');
  function aggiornaToggle() {
    const hidden = store.get('mt-hide-secrets', false);
    document.body.classList.toggle('hide-secrets', hidden);
    toggle.innerHTML = hidden
      ? '<span class="ico">🔒</span> <span class="lbl">Segreti nascosti</span>'
      : '<span class="ico">👁</span> <span class="lbl">Segreti visibili</span>';
    toggle.setAttribute('aria-label', hidden ? 'Segreti nascosti' : 'Segreti visibili');
    toggle.title = hidden ? 'Clicca per mostrare i segreti del DM' : 'Clicca per nascondere i segreti del DM (utile se condividi lo schermo)';
  }
  toggle.addEventListener('click', () => {
    store.set('mt-hide-secrets', !store.get('mt-hide-secrets', false));
    document.querySelectorAll('.secret.revealed').forEach((s) => s.classList.remove('revealed'));
    aggiornaToggle();
  });

  // Menu mobile
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  function impostaMenu(open) {
    sidebar.classList.toggle('open', open);
    backdrop.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  function chiudiMenu() { impostaMenu(false); }
  menuBtn.addEventListener('click', () => impostaMenu(!sidebar.classList.contains('open')));
  document.getElementById('tabMenu').addEventListener('click', () => impostaMenu(!sidebar.classList.contains('open')));
  backdrop.addEventListener('click', chiudiMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') chiudiMenu(); });

  // ---------- Ricerca ----------
  const indice = [
    ...PERSONAGGI.map((p) => ({ t: p.nome, s: 'Personaggio', h: `#/personaggi/${p.id}`,
      x: [p.nome, p.titolo, p.razza, p.classe, p.background, p.motivazione, p.segreto, p.gancio, ...p.speciali].join(' ') })),
    ...PNG_MINORI.map((p) => ({ t: p.nome, s: 'PNG minore', h: `#/personaggi/${p.id}`, x: [p.nome, p.sottotitolo, ...p.righe, p.nota].join(' ') })),
    ...VILLAGGI.map((v) => ({ t: v.nome, s: 'Villaggio', h: `#/luoghi/${v.id}`, x: [v.nome, v.descrizione, ...v.abitanti.map((a) => a.t), ...v.note].join(' ') })),
    ...CITTA.map((c) => ({ t: c.nome, s: 'Luogo principale', h: `#/luoghi/${c.id}`, x: c.nome })),
    ...QUEST.map((q) => ({ t: `${q.id} — ${q.titolo}`, s: 'Quest · ' + q.info, h: `#/quest/${q.id}`, x: [q.id, q.titolo, q.info, q.testo, q.connette].join(' ') })),
    ...MALEDIZIONE.map((a) => ({ t: a.titolo, s: 'La Maledizione di Cinerebrax', h: `#/quest/${a.id}`, x: [a.titolo, ...a.righe, a.nota || ''].join(' ') })),
    ...tuttiIndizi().map((i) => ({ t: i.titolo, s: 'Indizio · ' + i.categoria.titolo.replace(/^\d+\.\s*/, ''), h: `#/indizi/${i.id}`, x: [i.titolo, i.testo, i.dove].join(' ') })),
    ...ARCHI.map((a) => ({ t: a.titolo, s: 'Arco narrativo', h: '#/archi', x: [a.titolo, a.intro, ...a.fasi.flat()].join(' ') })),
    ...STORIA.saggi.map((s) => ({ t: s.nome, s: 'Saggio di Aethelred · ' + s.elemento, h: '#/storia', x: [s.nome, s.elemento, s.testo].join(' ') })),
    ...CREATURE.map((c) => ({ t: c.nome, s: `Creatura · GS ${c.indice.gs}`, h: `#/bestiario/${c.id}`,
      x: [c.nome, c.tipo, c.indice.dove, ...c.tratti.map((t) => t[0] + ' ' + t[1]), ...c.azioni.map((a) => a[0]), ...Object.values(c.isola), c.fonte].join(' ') })),
    ...INCONTRI_PRONTI.righe.map((r) => ({ t: r.nome, s: `Incontro pronto · Liv. ${r.liv}`, h: '#/incontri', x: [r.nome, r.rif, r.composizione].join(' ') })),
  ].map((e) => ({ ...e, nt: norm(e.t), nx: norm(e.x) }));

  const searchInput = document.getElementById('search');
  const searchResults = document.getElementById('searchResults');
  searchInput.addEventListener('input', () => {
    const q = norm(searchInput.value.trim());
    if (q.length < 2) { searchResults.hidden = true; return; }
    const risultati = indice
      .map((e) => ({ e, score: e.nt.includes(q) ? 2 : e.nx.includes(q) ? 1 : 0 }))
      .filter((r) => r.score)
      .sort((a, b) => b.score - a.score)
      .slice(0, 14);
    searchResults.innerHTML = risultati.length
      ? risultati.map(({ e }) => `<a href="${e.h}">${esc(e.t)}<small>${esc(e.s)}</small></a>`).join('')
      : `<div class="empty">Nessun risultato</div>`;
    searchResults.hidden = false;
  });
  searchResults.addEventListener('click', (e) => {
    if (e.target.closest('a')) { searchResults.hidden = true; searchInput.value = ''; }
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) searchResults.hidden = true;
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { searchResults.hidden = true; searchInput.blur(); }
    if (e.key === 'Enter') {
      const first = searchResults.querySelector('a');
      if (first) { location.hash = first.getAttribute('href'); searchResults.hidden = true; searchInput.value = ''; }
    }
  });

  // ---------- Avvio ----------
  aggiornaToggle();
  window.addEventListener('hashchange', render);
  if (!location.hash) location.replace('#/home');
  render();
})();
