/* app.js — monta o playbook a partir de data.js e liga as interações. */
(function () {
  "use strict";
  var P = window.PB, R = P.regras;
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- utilidades ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function brl(v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
  function brl2(v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
  function nf(v) { return Math.round(v).toLocaleString("pt-BR"); }
  function norm(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function nl2br(t) { return esc(t).replace(/\n/g, "<br>"); }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("usp_" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("usp_" + k, JSON.stringify(v)); } catch (e) {} }
  };
  var toastT;
  function toast(t) { var el = $("#toast"); el.textContent = t || "Copiado"; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { el.hidden = true; }, 1800); }
  function copy(text) {
    function fb() { var t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); toast("Copiado"); } catch (e) { toast("Não foi possível copiar"); } document.body.removeChild(t); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { toast("Copiado"); }, fb); else fb();
  }
  function flagOf(c) { var b = R.bandeiras; return c <= b.verde ? "verde" : c <= b.amarela ? "amarela" : c <= b.vermelha ? "vermelha" : "preta"; }
  var FLAGCOL = { verde: "#19E65B", amarela: "#FFE600", vermelha: "#FF3B3B", preta: "#8190A0" };

  var CH = [
    { t: "Sua missão", l: "O que é uma visita realizada e as 6 regras que guiam todo o seu trabalho." },
    { t: "Quem é a Unidas Seminovos", l: "A empresa, o produto, os diferenciais e como o carro chega ao cliente." },
    { t: "Entenda de carro", l: "Você não precisa ser especialista. Precisa falar com segurança e fazer as perguntas certas." },
    { t: "O fluxo ideal", l: "Do lead que cai até a comissão: o caminho de cada atendimento." },
    { t: "Ferramentas", l: "Ficha Única, Blip e Ligação, passo a passo." },
    { t: "Qualificação", l: "Todos os critérios para o lead ir pronto para a loja, com casos resolvidos." },
    { t: "Scripts e método", l: "O que falar na ligação, no WhatsApp, no grupo do gerente e no anti no-show, e como conduzir a conversa." },
    { t: "Contorno de objeções", l: "O que o cliente diz, por que diz e como responder." },
    { t: "Argumentação", l: "O pitch de 30 segundos, as perguntas certas e as provas." },
    { t: "A lógica do funil", l: "Da meta de visitas à atividade do dia, com simulador de planejamento e regras de registro." },
    { t: "Metas, bandeiras e PDI", l: "Como você é medida, quais indicadores acompanha e como ganhar mais." },
    { t: "Rituais e coaching", l: "A daily das 9h (em vigor), os rituais propostos para validar e um scorecard de ligação para você usar." },
    { t: "Onboarding e trilha de estudo", l: "A rampa de 30, 60 e 90 dias, os role plays e o que estudar, em que ordem." },
    { t: "Prova final", l: "Teste o que você aprendeu." }
  ];

  /* =====================  RENDERIZADORES  ===================== */
  function callouts(n) {
    var c = (P.callouts || {})[n]; if (!c) return "";
    return '<div class="blk rv co-wrap"><div class="rg"><b>Regra de ouro</b><p>' + esc(c.rg) + '</p></div><div class="grid g2"><div class="co-box err"><b>Erros comuns a evitar</b><ul>' + c.err.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div><div class="co-box sdr"><b>Para quem está começando</b><p>' + esc(c.sdr) + "</p></div></div></div>";
  }
  function chap(i, body) {
    var n = i + 1, c = CH[i];
    return '<section class="ch" id="c' + n + '" data-n="' + n + '"><header class="ch-h rv"><span class="ch-n">' + (n < 10 ? "0" : "") + n + '</span><div><p class="ch-k">Capítulo ' + n + '</p><h2>' + esc(c.t) + '</h2><p class="ch-lead">' + esc(c.l) + '</p></div></header><div class="ch-b">' + body + callouts(n) + '</div><footer class="ch-f"><button class="done-btn" type="button" data-done="' + n + '"><span class="dk">○</span> <span class="dt">Marcar como estudado</span></button></footer></section>';
  }
  function blk(h, sub, inner) { return '<div class="blk rv">' + (h ? '<h3 class="h3">' + h + "</h3>" : "") + (sub ? '<p class="h3-s">' + sub + "</p>" : "") + inner + "</div>"; }

  function c1() {
    var m = P.missao;
    return '<div class="blk rv"><div class="mission"><q>' + esc(m.frase) + "</q><p>" + esc(m.visita) + "</p></div></div>" +
      blk("O que não é o seu trabalho", "", '<ul class="dont">' + m.naoE.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") +
      blk("Por que o seu trabalho importa", "Dados da operação de Seminovos Leves da Unidas.", '<div class="grid g3 why">' + m.porque.map(function (s) { return '<div class="stat"><b>' + esc(s.n) + "</b><span>" + esc(s.l) + "</span></div>"; }).join("") + "</div>") +
      blk("As 6 regras de ouro", "Se tiver dúvida no meio de um atendimento, volte aqui.", '<div class="grid g3">' + m.ouro.map(function (r, i) { return '<div class="card rule"><span class="rn">' + (i + 1) + "</span><h4>" + esc(r.t) + "</h4><p>" + esc(r.d) + "</p></div>"; }).join("") + "</div>");
  }

  function cnt(o, hl) { return '<div class="cnt' + (hl ? " hl" : "") + '"><b data-v="' + o.v + '" data-pre="' + esc(o.pre) + '">' + esc(o.pre) + nf(o.v) + "</b><span>" + esc(o.l) + "</span></div>"; }
  function c2() {
    var u = P.unidas;
    return blk("Quem é a Unidas", u.resumo, '<div class="grid g3">' + u.grupo.map(function (o) { return cnt(o); }).join("") + "</div><p class=\"note\">" + esc(u.grupoNota) + "</p>" +
      '<div class="blk"><h3 class="h3">Reconhecimentos</h3><ul class="aw">' + u.premios.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>") +
      blk("A Unidas Seminovos em números", "", '<div class="grid g3">' + u.seminovos.map(function (o) { return cnt(o, true); }).join("") + "</div><p class=\"note\">" + esc(u.seminovosNota) + '</p><p class="blk states" style="margin-top:20px"><span style="color:var(--dim)">Estados com lojas: </span>' + esc(u.estados) + "</p>") +
      blk("O que a Unidas Seminovos vende", "Carros de passeio seminovos, de várias marcas, em quatro vitrines.", '<div class="grid g2">' + u.vende.map(function (x) { return '<div class="card"><div class="ic">' + x.ic + "</div><h4>" + esc(x.t) + "</h4><p>" + esc(x.d) + "</p></div>"; }).join("") + "</div>") +
      blk("Como a Unidas vende", "O caminho do carro até o cliente, e onde você entra (passo 2).", '<div class="how">' + u.comoVende.map(function (s) { return '<div class="how-i"><span class="hn">' + s.n + "</span><div><h4>" + esc(s.t) + "</h4><p>" + esc(s.d) + "</p></div></div>"; }).join("") + "</div>") +
      blk("Diferenciais (confira no site oficial)", "Tudo o que está aqui consta no site da Unidas Seminovos. Use estas palavras com o cliente.", '<div class="grid g2">' + u.diferenciais.map(function (x) { return '<div class="card"><div class="ic">' + x.ic + "</div><h4>" + esc(x.t) + "</h4><p>" + esc(x.d) + '</p><span class="src">' + esc(x.f) + "</span></div>"; }).join("") + "</div>") +
      blk("Formas de pagamento", "", '<div class="grid g2">' + u.pagamento.map(function (x) { return '<div class="pay-i"><b>' + esc(x.t) + "</b><span>" + esc(x.d) + "</span></div>"; }).join("") + "</div>") +
      blk("Documentos e retirada", "", '<ul class="docs">' + u.documentos.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><p class="note">' + esc(u.promo) + "</p>");
  }

  function c3() {
    return blk("Glossário do dia a dia", "Toque em um termo para ler a explicação e a dica de como usar na conversa.", '<label class="fi"><span aria-hidden="true">🔎</span><input id="gl-q" type="search" placeholder="Buscar termo (ex.: repintura)" autocomplete="off" /></label><div class="gl" id="gl">' +
      P.glossario.map(function (g) { return '<div class="gl-i" data-s="' + esc(norm(g.t + " " + g.d)) + '"><button type="button">' + esc(g.t) + '</button><div class="gl-b">' + esc(g.d) + '<span class="tip">' + esc(g.dica) + "</span></div></div>"; }).join("") + "</div>") +
      blk("Os tipos de carro", "Saiba a que segmento cada modelo pertence e para quem ele serve.", '<div class="grid g3">' + P.segmentos.map(function (s) { return '<div class="card seg-i"><b>' + esc(s.t) + '</b><p class="ex">' + esc(s.ex) + "</p><p>" + esc(s.p) + '</p><p class="qq">' + esc(s.q) + "</p></div>"; }).join("") + "</div>") +
      blk("Perfis de cliente", "Descubra quem está do outro lado e ajuste a conversa.", '<div class="grid g3">' + P.perfis.map(function (s) { return '<div class="card"><div class="ic">' + s.ic + "</div><h4>" + esc(s.t) + "</h4><p>" + esc(s.q) + "</p></div>"; }).join("") + "</div>");
  }

  function c4() {
    return blk("Os 10 passos de cada atendimento", "Clique em um passo (ou deixe tocar sozinho) para ver os detalhes.", '<div class="flow-track" id="flow-track"><span class="fill" id="flow-fill"></span><span class="fcar" id="flow-car">🚗</span></div><div class="flow"><ul class="flow-list" id="flow-list">' +
      P.fluxo.map(function (f, i) { return '<li data-i="' + i + '"><button type="button"><span class="fn">' + (i + 1) + "</span><span>" + esc(f.t) + "</span></button></li>"; }).join("") + '</ul><div class="flow-card" id="flow-card"></div></div>') +
      blk("O anti no-show BLU", "Depois de agendar, o cliente precisa ser lembrado. Esta é a régua que protege a sua visita.", '<div class="anti"><div><b>D-3</b><span>📞 ligar</span></div><div><b>D-2</b><span>💬 mensagem</span></div><div><b>D-1</b><span>📞 ligar</span></div><div><b>D0</b><span>💬 mensagem</span></div></div><p class="note">Os scripts de cada toque estão no capítulo 7. Cliente que avisa que não vai: remarque na hora com duas novas opções.</p>');
  }

  function mock(id) {
    if (id === "ficha") return '<div class="mk" id="mk"><div class="mk-top" data-p="topo"><b>Ficha Única</b><span class="mk-pill" data-p="unidade">Unidade: Salvador ▾</span><span class="mk-pill sp">SDR</span></div><div class="mk-in" data-p="busca"><span>Buscar por telefone…</span><span class="mk-btn">Buscar</span></div><div class="mk-alert" data-p="aviso">⚠ Este lead já existe<span class="mk-btn">OK</span></div><div class="mk-row"><div class="mk-box" data-p="carro"><small>🚗 Carro de interesse</small>Modelo · Ano · KM · Cor · Placa<br><b>Valor tabelado: R$ ——</b></div><div class="mk-box" data-p="campos"><small>📝 Qualificação e histórico</small>Pagamento · Troca · Prazo<br>Ligou · Falou · Próximo passo</div><div class="mk-box full" data-p="agenda"><small>📅 Agendar visita</small>Dia · Hora · Loja <span class="mk-btn" style="float:right">Salvar</span></div></div></div>';
    if (id === "blip") return '<div class="mk" id="mk"><div class="mk-top" data-p="topo"><b>Blip</b><span class="mk-pill" data-p="status">● Online ▾</span><span class="mk-pill sp">Fila</span></div><div class="mk-chat"><div class="mk-list" data-p="ticket"><div><b>Cliente A</b>Argo 2022 · novo</div><div><b>Cliente B</b>HB20 · retorno</div></div><div class="mk-msgs" data-p="chat"><span class="mk-m">Oi! Tenho interesse no Onix.</span><span class="mk-m me">Oi! Sou a Maria, da Unidas Seminovos 🚗</span><span class="mk-m">Posso pagar à vista?</span></div><div class="mk-box" data-p="painel"><small>Dados do cliente</small>Nome<br>Telefone<br>E-mail<br>Carro de interesse</div></div><div style="margin-top:10px;text-align:right"><span class="mk-btn" data-p="finalizar" style="display:inline-block;padding:9px 18px;background:#1d6bf3">Finalizar</span></div></div>';
    return '<div class="mk" id="mk"><div class="mk-top" data-p="topo"><b>Contact Center</b><span class="mk-pill sp">● Conectado</span></div><div class="mk-row"><div class="mk-box" data-p="teste"><small>🎧 Teste de áudio</small>Ligue para o seu celular e confira os dois lados</div><div class="mk-box" data-p="registro"><small>📝 Resultado da ligação</small>Atendeu · Não atendeu · Próxima ação</div></div><div class="mk-dial" style="margin-top:10px"><div class="mk-num" data-p="numero">(71) 9 ____-____</div><div class="mk-call">📞</div><div class="mk-timer" data-p="chamada" style="margin-top:10px">● Em chamada 02:14</div></div></div>';
  }
  function c5() {
    var tabs = P.ferramentas.map(function (t, i) { return '<button class="tab' + (i ? "" : " on") + '" type="button" data-tool="' + t.id + '">' + t.ic + " " + esc(t.nome) + "</button>"; }).join("");
    var panels = P.ferramentas.map(function (t, i) {
      return '<div class="panel" data-panel="' + t.id + '"' + (i ? " hidden" : "") + '><div class="tool"><div><div class="tool-info"><p><b>O que é:</b> ' + esc(t.oque) + "</p><p><b>Quando usar:</b> " + esc(t.quando) + '</p></div><ol class="stp">' +
        t.passos.map(function (s, k) { return '<li data-k="' + k + '"><button type="button"><span class="sn">' + (k + 1) + '</span><span><span class="st-t">' + esc(s.t) + '</span><span class="st-d">' + esc(s.d) + "</span></span></button></li>"; }).join("") +
        '</ol><ul class="tool-err">' + t.erros.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") + '</ul><p class="note">' + esc(t.nota) + '</p></div><div class="mockwrap"><div class="mock-t"><b>Ilustração</b><span>Passo <span class="mk-step">1</span> de ' + t.passos.length + '</span></div><img class="shot" alt="" style="display:none" />' + mock(t.mock) +
        '<div class="mock-bar"><i></i></div><div class="mock-ctl"><button class="btn-s" type="button" data-c="prev">‹ Anterior</button><button class="btn-s" type="button" data-c="play">⏸ Pausar</button><button class="btn-s" type="button" data-c="next">Próximo ›</button></div><p class="slot">Telas em formato ilustrativo, não são os prints reais. Quando houver prints reais (um por passo), eles aparecem aqui no lugar da ilustração.</p></div></div></div>';
    }).join("");
    return blk("Escolha a ferramenta", "Cada uma tem os passos de uso, os erros comuns e uma ilustração que acompanha o passo.", '<div class="tabs" id="tool-tabs">' + tabs + "</div>" + panels) +
      '<p class="note">' + esc(P.suporte) + "</p>";
  }

  function c6() {
    var q = P.qualificacao;
    var bl = [{ id: "lead", t: "0 · Dados do lead", ic: "👤", campos: [{ id: "nome", l: "Nome do cliente", q: "Como posso te chamar?", req: true }, { id: "tel", l: "Telefone (com DDD)", q: "", req: true }, { id: "loja", l: "Loja", q: "", req: true }, { id: "sdr", l: "Seu nome", q: "", req: true }] }].concat(q.blocos);
    function field(c, b) {
      var type = "text", extra = "";
      if (c.id === "forma") return '<label class="qf-f" data-f="' + c.id + '"><span>' + esc(c.l) + (c.req ? "<i>obrigatório</i>" : "") + '</span><em>' + esc(c.q) + '</em><select id="q-' + c.id + '"><option value="">Escolha…</option><option>À vista</option><option>Financiado</option><option>À vista com carro na troca</option><option>Financiado com carro na troca</option><option>Consórcio</option></select></label>';
      if (c.id === "quando") return '<label class="qf-f" data-f="' + c.id + '"><span>' + esc(c.l) + (c.req ? "<i>obrigatório</i>" : "") + '</span><em>' + esc(c.q) + '</em><select id="q-' + c.id + '"><option value="">Escolha…</option><option>Imediato (até 7 dias)</option><option>Até 15 dias</option><option>Até 30 dias</option><option>Mais de 30 dias</option></select></label>';
      if (c.id === "visita") return '<label class="qf-f" data-f="' + c.id + '"><span>' + esc(c.l) + (c.req ? "<i>obrigatório</i>" : "") + '</span><em>' + esc(c.q) + '</em><input id="q-' + c.id + '" type="datetime-local" /></label>';
      return '<label class="qf-f" data-f="' + c.id + '"><span>' + esc(c.l) + (c.req ? "<i>obrigatório</i>" : "") + "</span>" + (c.q ? "<em>" + esc(c.q) + "</em>" : "") + '<input id="q-' + c.id + '" type="' + type + '" autocomplete="off"' + extra + " /></label>";
    }
    var form = bl.map(function (b) { return '<div class="qf-b" data-b="' + b.id + '"' + (b.id === "troca" ? " hidden" : "") + "><h4>" + b.ic + " " + esc(b.t) + "</h4>" + (b.id === "troca" ? "" : "") + b.campos.map(function (c) { return field(c, b); }).join("") + "</div>"; }).join("");
    form = form.replace('<div class="qf-b" data-b="troca" hidden>', '<label class="qf-tg"><input type="checkbox" id="q-temtroca" /> O cliente tem carro para dar na troca?</label><div class="qf-b" data-b="troca" hidden>');
    return blk("", q.intro, '<div class="qf"><div id="qf-form">' + form + '</div><aside class="qf-side"><div class="meter"><span style="color:var(--mut);font-weight:700;font-size:14px">Ficha completa</span><b id="mt-n">0%</b><div class="meter-bar"><i id="mt-bar"></i></div><span class="badge no" id="mt-badge">Ainda não está pronto para a loja</span><div class="out" id="qf-out"></div><div class="out-ctl"><button class="btn btn-r" id="qf-copy" type="button">Copiar para o grupo do gerente</button><button class="btn-s" id="qf-reset" type="button">Limpar</button></div></div></aside></div>') +
      blk("O lead está pronto quando…", "", '<ul class="chk">' + q.prontoSe.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") +
      blk("Não mande para a loja ainda se…", "", '<ul class="chk bad">' + q.naoPronto.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") +
      blk("O que o cliente deve levar", "", '<ul class="chk">' + q.levar.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><p class="note">' + esc(q.levarNota) + "</p>") +
      blk("Casos resolvidos: este lead está pronto?", "Quatro situações reais. Leia a situação e depois a decisão.", '<div class="grid g2">' + P.casos.map(function (c) { return '<div class="card case"><h4>' + esc(c.t) + "</h4><p>" + esc(c.s) + '</p><p class="case-f"><b>O que falta:</b> ' + esc(c.f) + '</p><p class="case-d"><b>Decisão:</b> ' + esc(c.d) + "</p></div>"; }).join("") + "</div>");
  }

  function c7() {
    var s = P.scripts;
    var tabs = [["lig", "📞 Ligação"], ["zap", "💬 WhatsApp"], ["grp", "👥 Grupo do gerente"], ["nsh", "🔔 Anti no-show"], ["met", "🧭 Método e casos"]].map(function (t, i) { return '<button class="tab' + (i ? "" : " on") + '" type="button" data-sc="' + t[0] + '">' + t[1] + "</button>"; }).join("");
    var lig = '<div class="panel" data-sp="lig"><p class="h3-s">Siga a ordem. As falas são sugestões: adapte ao seu jeito, sem perder nenhuma pergunta.</p><div class="cs">' + s.ligacao.map(function (x) {
      return '<div class="cs-i"><span class="cs-n">' + x.n + '</span><div><div class="cs-h"><b>' + esc(x.t) + "</b><span>" + esc(x.seg) + '</span></div><div class="say">' + esc(x.fala) + "</div>" + (x.dica ? '<p class="cs-d"><b>Dica:</b> ' + esc(x.dica) + "</p>" : "") + (x.se ? '<p class="cs-s"><b>Se…</b> ' + esc(x.se) + "</p>" : "") + '<button class="btn-s cp" type="button" data-copy="' + esc(x.fala) + '">Copiar fala</button></div></div>';
    }).join("") + '</div><p class="note">Regras da ligação: nunca prometa desconto, aprovação de crédito ou valor do carro de troca. Se não souber, diga “vou confirmar com a loja e te retorno”.</p></div>';
    var zap = '<div class="panel" data-sp="zap" hidden><p class="h3-s">Mensagens para quando o cliente não atende. Escolha uma e copie.</p><div class="zap"><ul class="zap-l" id="zap-l">' + s.primeiroZap.map(function (z, i) { return '<li data-i="' + i + '"' + (i ? "" : ' class="on"') + '><button type="button">' + esc(z.t) + "</button></li>"; }).join("") + '</ul><div><div class="wa"><div class="wa-h"><i>U</i>Cliente</div><div class="wa-b" id="wa-b"></div></div><div class="out-ctl"><button class="btn btn-r" id="wa-copy" type="button">Copiar mensagem</button></div></div></div></div>';
    var g = s.grupo;
    var grp = '<div class="panel" data-sp="grp" hidden><p class="h3-s">' + esc(g.titulo) + ". Preencha os campos entre colchetes e envie no grupo da loja.</p><div class=\"zap\"><div><div class=\"wa\"><div class=\"wa-h\"><i>👥</i>Grupo da loja</div><div class=\"wa-b\"><div class=\"wa-m\" style=\"animation:none\">" + nl2br(g.tpl) + '</div></div></div><div class="out-ctl"><button class="btn btn-r" type="button" data-copy="' + esc(g.tpl) + '">Copiar modelo</button></div></div><div><h4 class="h3" style="font-size:19px">Depois da visita</h4><div class="wa"><div class="wa-b" style="min-height:0"><div class="wa-m" style="animation:none">' + nl2br(g.confirma) + '</div></div></div><div class="out-ctl"><button class="btn-s" type="button" data-copy="' + esc(g.confirma) + '">Copiar pergunta ao gerente</button></div><ul class="chk" style="margin-top:14px">' + g.regras.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div></div>";
    var nsh = '<div class="panel" data-sp="nsh" hidden><p class="h3-s">Quatro toques até o dia da visita: D-3 ligar, D-2 mensagem, D-1 ligar, D0 mensagem.</p><div class="nsh">' + s.noshow.map(function (x) { return '<div class="card"><span class="d">D' + (x.d === 0 ? "0" : x.d) + '</span><h4>' + x.ic + " " + esc(x.t) + "</h4><p>" + esc(x.fala || x.msg) + '</p><p style="margin-top:10px;color:#e8d98a">' + esc(x.dica) + '</p><button class="btn-s cp" type="button" data-copy="' + esc(x.fala || x.msg) + '">Copiar</button></div>'; }).join("") + '</div><p class="note ok">' + esc(s.noshowRegra) + "</p></div>";
    var d = P.dialogo;
    var met = '<div class="panel" data-sp="met" hidden><h3 class="h3">A anatomia de uma boa abordagem</h3><div class="grid g3" style="margin-bottom:34px">' + P.anatomia.map(function (x) { return '<div class="card"><span class="hn-s">' + x.n + "</span><h4>" + esc(x.t) + "</h4><p>" + esc(x.d) + "</p></div>"; }).join("") + '</div><h3 class="h3">Uma ligação do começo ao fim, comentada</h3><p class="h3-s">' + esc(d.intro) + '</p><div class="dlg">' + d.turnos.map(function (t) { return '<div class="dl ' + t.w + '"><span class="dl-w">' + (t.w === "sdr" ? "SDR" : "Cliente") + '</span><div class="dl-b">' + esc(t.t) + "</div>" + (t.n ? '<p class="dl-n">💡 ' + esc(t.n) + "</p>" : "") + "</div>"; }).join("") + '</div><div class="grid g2" style="margin-top:20px"><div class="card"><h4>✅ Se ele disser sim</h4><ul class="chk" style="margin-top:8px">' + d.sim.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div><div class="card"><h4>↩️ Se ele disser não</h4><ul class="chk" style="margin-top:8px">' + d.nao.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div></div><h3 class="h3" style="margin-top:36px">Situações difíceis</h3><div class="grid g2">' + P.dificeis.map(function (x) { return '<div class="card"><h4>' + esc(x.q) + '</h4><div class="obj-r" style="margin-top:8px">' + esc(x.r) + '</div><p style="margin-top:10px;color:#e8d98a;font-size:14.5px">' + esc(x.n) + '</p><button class="btn-s cp" type="button" data-copy="' + esc(x.r) + '">Copiar resposta</button></div>'; }).join("") + '</div><h3 class="h3" style="margin-top:36px">Motivos de perda (sempre registre um)</h3><div class="chips">' + P.motivosPerda.map(function (m) { return '<span class="chip">' + esc(m) + "</span>"; }).join("") + "</div></div>";
    return blk("", "", '<div class="tabs" id="sc-tabs">' + tabs + "</div>" + lig + zap + grp + nsh + met);
  }

  function c8() {
    var cats = ["Todas"]; P.objecoes.forEach(function (o) { if (cats.indexOf(o.cat) < 0) cats.push(o.cat); });
    return blk("", "", '<div class="fi"><span aria-hidden="true">🔎</span><input id="ob-q" type="search" placeholder="Buscar objeção (ex.: caro, vou pensar)" autocomplete="off" /></div><div class="chips" id="ob-chips" style="margin-top:14px">' + cats.map(function (c, i) { return '<button class="chip' + (i ? "" : " on") + '" type="button" data-c="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + '</div><p class="obj-cnt" id="ob-cnt" style="margin-top:12px"></p><div class="obj" id="obj">' +
      P.objecoes.map(function (o) { return '<div class="obj-i" data-cat="' + esc(o.cat) + '" data-s="' + esc(norm(o.q + " " + o.r + " " + o.cat)) + '"><button type="button"><span class="obj-c">' + esc(o.cat) + '</span><span class="obj-q">' + esc(o.q) + '</span></button><div class="obj-b"><p class="why"><b>Por que diz isso:</b> ' + esc(o.por) + '</p><div class="obj-r">' + esc(o.r) + '</div><div class="obj-n">' + esc(o.nao) + '</div><button class="btn-s cp" type="button" data-copy="' + esc(o.r) + '">Copiar resposta</button></div></div>'; }).join("") + "</div>") +
      '<p class="note">Método para qualquer objeção: 1) ouça até o fim, 2) reconheça (“entendo”), 3) descubra o motivo real, 4) responda com um fato verdadeiro, 5) volte para a visita com duas opções de horário.</p>';
  }

  function c9() {
    var p = P.pitch;
    return blk("Pitch de 30 segundos", "Para quem pergunta “quem é a Unidas Seminovos?”.", '<div class="pitch">' + esc(p.c30) + '</div><div class="out-ctl"><button class="btn-s" type="button" data-copy="' + esc(p.c30) + '">Copiar pitch</button></div>') +
      blk("Perguntas que abrem a conversa", "", '<ul class="qs">' + p.perguntas.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") +
      blk("As provas dos seus argumentos", "Nunca diga só “é bom”. Use a prova.", '<div class="grid g3">' + p.provas.map(function (x) { return '<div class="card"><h4>' + esc(x.t) + "</h4><p>" + esc(x.d) + "</p></div>"; }).join("") + "</div>");
  }

  function cMetas() {
    var f = P.bandeiras, c = P.cpvr;
    return blk("O sistema de bandeiras BLU", "Todo mês medimos o custo por visita realizada (CPVR) e definimos a sua bandeira. O teto da verde na sua operação é " + brl(R.cpvrMax) + ".", '<div class="flags">' + f.map(function (b) { return '<div class="flag ' + b.k + '"><div class="flag-b"><div class="fic">' + b.ic + "</div><h4>" + esc(b.nome) + '</h4><span class="faixa">' + esc(b.faixa) + '</span><p class="res">' + esc(b.resumo) + "</p><ul>" + b.pts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div>"; }).join("") + "</div>") +
      blk("Como o CPVR é calculado", esc(c.formula), '<p class="h3-s" style="margin-top:-8px">' + esc(c.explica) + "</p>") +
      blk("Simulador: qual seria a sua bandeira?", "Valores de exemplo. Troque pelos números do mês.", '<div class="calc"><div class="calc-in"><label>Custo total da operação no mês<small>Valor apurado pela BLU para o mês.</small><span class="money"><b>R$</b><input id="cp-c" type="text" inputmode="decimal" value="6.000" /></span></label><label>Visitas realizadas no mês<small>Só as confirmadas pelo gerente.</small><span class="money"><b>nº</b><input id="cp-v" type="text" inputmode="numeric" value="35" /></span></label><p class="note" style="margin-top:0">Comissão por visita: ' + brl(R.comissaoVisita) + ".</p></div><div class=\"calc-out\" id=\"cp-out\"></div></div>") +
      blk("Simulador de 6 meses: bandeiras e aumento no fixo", "Clique em cada mês para mudar a bandeira. A cada " + R.cicloVerde + " meses consecutivos em verde, o fixo sobe " + brl(R.aumentoFixo) + ".", '<div class="sim" id="sim"></div><div class="sim-out" id="sim-out"></div>') +
      blk("PDI: Plano de Desenvolvimento Individual", "", '<ul class="pdi">' + c.pdi.map(function (x) { return "<li><b>" + esc(x.t) + "</b><span>" + esc(x.d) + "</span></li>"; }).join("") + "</ul>") +
      blk("Três famílias de indicadores", "Olhar só o resultado cega para a causa. Acompanhe as três.", '<div class="grid g3">' + P.familias.map(function (x) { return '<div class="card"><div class="ic">' + x.ic + "</div><h4>" + esc(x.t) + "</h4><p>" + esc(x.d) + '</p><span class="src">' + esc(x.ex) + "</span></div>"; }).join("") + "</div>") +
      blk("Ritmo de leitura sugerido", "Sugestão para validar com a gestão. A daily das 9h já é o momento diário.", '<div class="grid g3">' + P.ritmo.map(function (x) { return '<div class="pay-i"><b>' + esc(x.k) + "</b><span>" + esc(x.d) + "</span></div>"; }).join("") + '</div><p class="h3-s" style="margin-top:22px"><b style="color:#fff">Quando um indicador acende:</b></p><ul class="chk">' + P.acende.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>");
  }

  function cTrilha() {
    return blk("Trilha de estudo", "Estude na ordem. Marque cada item concluído: o seu progresso fica salvo neste aparelho. Padrão para quem entra agora e para novas pessoas.", '<div class="trail" id="trail">' +
      P.trilha.map(function (m) { return '<div class="mod" data-m="' + m.id + '"><button type="button"><span class="mn">' + m.n + '</span><span><b>' + esc(m.t) + "</b><span>Capítulo " + m.cap + " · cerca de " + m.min + ' min</span></span><span class="pc">0/' + m.itens.length + '</span></button><div class="mod-b">' + m.itens.map(function (it, i) { return '<label><input type="checkbox" data-m="' + m.id + '" data-i="' + i + '" /> <span>' + esc(it) + "</span></label>"; }).join("") + "</div></div>"; }).join("") + "</div>") +
      blk("A primeira semana", "", '<div class="week">' + P.semana.map(function (d) { return '<div class="card"><p class="d">' + esc(d.d) + "</p><h4>" + esc(d.t) + "</h4><p>" + esc(d.d1) + "</p></div>"; }).join("") + "</div>") +
      blk("A rotina do dia", P.rotinaNota, '<div class="routine">' + P.rotina.map(function (r) { return '<div class="rt"><div class="h">' + esc(r.h) + '</div><div class="c" data-ic="' + r.ic + '"><b>' + esc(r.t) + "</b><span>" + esc(r.d) + "</span></div></div>"; }).join("") + "</div>") +
      blk("Indicadores que você acompanha", "", '<div class="ind">' + P.indicadores.map(function (x) { return "<div><b>" + esc(x.k) + "</b><em>" + esc(x.m) + "</em><span>" + esc(x.d) + "</span></div>"; }).join("") + "</div>");
  }

  function cQuiz() {
    return blk("", P.quiz.length + " perguntas. Para fechar o treinamento, acerte pelo menos 80%.", '<div class="quiz" id="quiz"></div>');
  }


  function cFunil() {
    var f = P.funil;
    function sl(id, l, min, max, v, suf) { return '<label class="sl"><span>' + esc(l) + '<b id="fs-' + id + '-o"></b></span><input type="range" id="fs-' + id + '" min="' + min + '" max="' + max + '" value="' + v + '" data-suf="' + suf + '" /></label>'; }
    return blk("", f.intro, '<div class="fun-track">' + f.etapas.map(function (e, i) { return '<div class="fun-e"><b>' + esc(e.k) + "</b><span>" + esc(e.d) + "</span></div>" + (i < f.etapas.length - 1 ? '<i class="fun-a">›</i>' : ""); }).join("") + "</div>") +
      blk("Simulador de planejamento", "Valores de exemplo: calibre com os números reais da operação. Mexa nos controles e veja o que a meta exige.", '<div class="calc"><div class="calc-in">' + sl("meta", "Meta de visitas realizadas no mês", 10, 150, 40, "") + sl("comp", "Comparecimento (agendadas que viram visita)", 30, 95, 65, "%") + sl("agend", "Agendamento (qualificados que agendam)", 20, 95, 60, "%") + sl("qual", "Qualificação (contatos que viram qualificados)", 10, 90, 45, "%") + sl("cont", "Contato (leads com quem você fala)", 20, 90, 55, "%") + sl("dias", "Dias úteis no mês", 15, 26, 22, "") + sl("tent", "Tentativas médias por lead", 1, 6, 3, "") + sl("sdrs", "SDRs na operação", 1, 6, 2, "") + sl("cap", "Capacidade: tentativas por SDR por dia", 30, 150, 80, "") + '<label class="sl"><span>Custo mensal da operação (exemplo)</span><span class="money"><b>R$</b><input id="fs-custo" type="text" inputmode="decimal" value="12.000" /></span></label></div><div class="calc-out" id="fs-out"></div></div>') +
      blk("Funil saudável e funil represado", "Leia o funil do time e atue na etapa que represa, não na pessoa.", '<div class="grid g2"><div class="card"><h4>✅ Saudável</h4><ul class="chk" style="margin-top:8px">' + f.saudavel.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div><div class="card"><h4>⚠️ Represado</h4><ul class="chk bad" style="margin-top:8px">' + f.represado.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div>") +
      blk("Como calibrar o simulador", "", '<ul class="chk">' + f.cal.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") +
      blk("Status do lead: definições", "Cada lead está em um só status. Mover de etapa sem cumprir o critério suja os dados.", '<div class="ind st">' + f.status.map(function (s) { return "<div><b>" + esc(s.s) + "</b><em>" + esc(s.r) + "</em><span>" + esc(s.d) + "</span></div>"; }).join("") + "</div>") +
      blk("Cadência de contato", f.cadNota, '<div class="cad">' + f.cadencia.map(function (c) { return '<div><b>' + esc(c.d) + "</b><span>" + esc(c.t) + "</span></div>"; }).join("") + "</div>") +
      blk("Regras de registro", "", '<ul class="chk">' + f.registro.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>");
  }

  function cRituais() {
    return blk("Os quatro rituais", "Rituais sustentam o método. Sem eles, o playbook vira um documento esquecido.", '<div class="grid g2">' + P.rituais.map(function (r) { return '<div class="card"><div class="ic">' + r.ic + "</div><h4>" + esc(r.t) + '</h4><p>' + esc(r.d) + '</p><span class="src">' + esc(r.freq) + '</span><span class="stt ' + (r.st === "em vigor" ? "on" : "") + '">' + esc(r.st) + "</span></div>"; }).join("") + '</div><p class="note">' + esc(P.rituaisNota) + "</p>") +
      blk("Como conduzir o coaching por gravação", "", '<ol class="how">' + P.coachPassos.map(function (x, i) { return '<li class="how-i"><span class="hn">' + (i + 1) + "</span><div><p style=\"color:#d4e3f2;margin-top:10px\">" + esc(x) + "</p></div></li>"; }).join("") + "</ol>") +
      blk("O que transforma ritual em teatro", "", '<ul class="chk bad">' + P.teatro.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") +
      blk("Scorecard de ligação", "Ouça uma ligação (a sua ou de uma colega) e marque o que foi feito. A meta da fase 2 do onboarding é 80% ou mais.", '<div class="calc"><div class="calc-in" id="sc-list">' + P.scorecard.map(function (c, i) { return '<label class="scr"><input type="checkbox" data-i="' + i + '" /><span><b>' + esc(c.k) + "</b> <i>" + c.p + " pts</i><small>" + esc(c.d) + "</small></span></label>"; }).join("") + '</div><div class="calc-out" id="sc-out"></div></div>');
  }

  function cOnb() {
    return blk("A rampa de 30, 60 e 90 dias", P.rampaNota, '<div class="grid g3">' + P.rampa.map(function (r) { return '<div class="card"><span class="rf">' + esc(r.f) + "</span><h4>" + esc(r.t) + '</h4><ul class="chk" style="margin-top:8px">' + r.ent.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><p class="case-d" style="margin-top:12px"><b>Critério de avanço:</b> ' + esc(r.av) + "</p></div>"; }).join("") + "</div>") +
      blk("Role plays: seis cenários", "Todo role play vem antes do primeiro lead real. Conduzido pelo gestor.", '<div class="grid g3">' + P.roleplays.map(function (r) { return '<div class="card"><h4>' + esc(r.t) + "</h4><p>" + esc(r.d) + "</p></div>"; }).join("") + '</div><ul class="chk" style="margin-top:18px">' + P.rolePassos.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul><p class="h3-s" style="margin-top:16px"><b style="color:#fff">Sinais de que está pronta para atender sozinha:</b></p><ul class="chk">' + P.prontaSinais.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") +
      cTrilha();
  }

  /* =====================  MONTAGEM  ===================== */
  var html = [c1, c2, c3, c4, c5, c6, c7, c8, c9, cFunil, cMetas, cRituais, cOnb, cQuiz].map(function (fn, i) { return chap(i, fn()); }).join("");
  $("#chapters").innerHTML = html;
  $("#trilhas").innerHTML = '<div class="wrap"><p class="eyebrow-s">Por onde começar</p><h2 class="h3 tr-h">Escolha a sua trilha de leitura</h2><div class="grid g3">' + P.trilhasLeitura.map(function (t) { return '<div class="card tr"><div class="ic">' + t.ic + "</div><h4>" + esc(t.t) + "</h4><p>" + esc(t.d) + '</p><div class="tr-ch">' + t.cap.map(function (n) { return '<a href="#c' + n + '">' + (n < 10 ? "0" : "") + n + "</a>"; }).join("") + "</div></div>"; }).join("") + "</div></div>";
  $("#hero-kpis").innerHTML = '<li><b>' + brl(R.comissaoVisita) + "</b><span>de comissão por visita realizada</span></li><li><b>até " + brl(R.cpvrMax) + "</b><span>de custo por visita para a bandeira verde</span></li><li><b>" + R.primeiraResposta + " min</b><span>para a primeira tentativa de contato</span></li><li><b>4 toques</b><span>de anti no-show até o dia da visita</span></li>";

  /* ---------- menu lateral e progresso ---------- */
  var done = store.get("done", {});
  (function () {
    var h = "";
    P.partes.forEach(function (pt) { h += '<li class="rail-p">' + esc(pt.t) + "</li>" + pt.ch.map(function (n) { return '<li data-n="' + n + '"><a href="#c' + n + '"><span class="rn">' + (n < 10 ? "0" : "") + n + "</span><span>" + esc(CH[n - 1].t) + '</span><span class="rk">✓</span></a></li>'; }).join(""); });
    $("#rail-list").innerHTML = h;
  })();
  function paintProgress() {
    var n = 0;
    CH.forEach(function (c, i) { var d = !!done[i + 1]; if (d) n++; var li = $('#rail-list li[data-n="' + (i + 1) + '"]'); if (li) li.classList.toggle("done", d); var b = $('.done-btn[data-done="' + (i + 1) + '"]'); if (b) { b.classList.toggle("on", d); $(".dk", b).textContent = d ? "✓" : "○"; $(".dt", b).textContent = d ? "Capítulo estudado" : "Marcar como estudado"; } });
    $("#pg-n").textContent = n + "/" + CH.length; $("#pg-fg").style.strokeDashoffset = 97.4 * (1 - n / CH.length);
  }
  $("#chapters").addEventListener("click", function (e) { var b = e.target.closest(".done-btn"); if (!b) return; var n = b.getAttribute("data-done"); done[n] = !done[n]; store.set("done", done); paintProgress(); });
  $("#rail-reset").addEventListener("click", function () { if (confirm("Zerar o seu progresso neste aparelho?")) { done = {}; store.set("done", done); store.set("trail", {}); location.reload(); } });
  function setRail(open) { $("#rail").classList.toggle("open", open); $("#rail-bg").classList.toggle("open", open); $("#menu-btn").setAttribute("aria-expanded", open ? "true" : "false"); }
  $("#menu-btn").addEventListener("click", function () { setRail(!$("#rail").classList.contains("open")); });
  $("#rail-bg").addEventListener("click", function () { setRail(false); });
  $("#rail").addEventListener("click", function (e) { if (e.target.closest("a")) setRail(false); });
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { var n = e.target.getAttribute("data-n"); $$("#rail-list li").forEach(function (li) { li.classList.toggle("on", li.getAttribute("data-n") === n); }); $("#top-cur").innerHTML = "<b>Cap. " + n + "</b> · " + esc(CH[n - 1].t); } });
  }, { rootMargin: "-40% 0px -55% 0px" });
  $$(".ch").forEach(function (c) { spy.observe(c); });
  paintProgress();

  /* ---------- contadores ---------- */
  function countUp(el) {
    var to = +el.getAttribute("data-v"), pre = el.getAttribute("data-pre") || "";
    if (REDUCE) { el.textContent = pre + nf(to); return; }
    var t0 = performance.now(), dur = 1400;
    (function step(t) { var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + nf(to * e); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  var cio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } }); }, { threshold: 0.4 });
  $$(".cnt b[data-v]").forEach(function (b) { cio.observe(b); });

  /* ---------- glossário ---------- */
  $("#gl").addEventListener("click", function (e) { var b = e.target.closest(".gl-i > button"); if (b) b.parentNode.classList.toggle("open"); });
  $("#gl-q").addEventListener("input", function (e) { var q = norm(e.target.value.trim()); $$(".gl-i").forEach(function (g) { var hit = !q || g.getAttribute("data-s").indexOf(q) > -1; g.hidden = !hit; if (q && hit) g.classList.add("open"); }); });

  /* ---------- fluxo ---------- */
  var fi = 0, ft = null, fUser = false;
  function showFlow(i) {
    fi = i; var f = P.fluxo[i], n = P.fluxo.length;
    $$("#flow-list li").forEach(function (li, k) { li.classList.toggle("on", k === i); li.classList.toggle("past", k < i); });
    $("#flow-card").innerHTML = '<div class="big">' + f.ic + '</div><h4>' + (i + 1) + ". " + esc(f.t) + '</h4><span class="tag">' + esc(f.tag) + "</span><p>" + esc(f.d) + '</p><div class="sla">' + esc(f.sla) + '</div><div class="flow-ctl"><button class="btn-s" type="button" data-f="prev">‹ Anterior</button><button class="btn-s" type="button" data-f="next">Próximo ›</button></div>';
    var pct = (i / (n - 1)) * 100; $("#flow-fill").style.width = pct + "%"; $("#flow-car").style.left = pct + "%";
  }
  $("#flow-list").addEventListener("click", function (e) { var li = e.target.closest("li"); if (!li) return; fUser = true; showFlow(+li.getAttribute("data-i")); });
  $("#flow-card").addEventListener("click", function (e) { var b = e.target.closest("[data-f]"); if (!b) return; fUser = true; var n = P.fluxo.length; showFlow(b.getAttribute("data-f") === "next" ? (fi + 1) % n : (fi - 1 + n) % n); });
  showFlow(0);
  var fvis = false;
  new IntersectionObserver(function (es) { fvis = es[0].isIntersecting; }, { threshold: 0.25 }).observe($("#c4"));
  if (!REDUCE) ft = setInterval(function () { if (fvis && !fUser) showFlow((fi + 1) % P.fluxo.length); }, 4200);

  /* ---------- ferramentas (passo a passo animado) ---------- */
  var tools = {}, curTool = "ficha";
  P.ferramentas.forEach(function (t) {
    var panel = $('[data-panel="' + t.id + '"]'), st = { i: 0, playing: !REDUCE, t0: 0, id: t.id, panel: panel, n: t.passos.length };
    tools[t.id] = st;
    function set(i) {
      st.i = (i + st.n) % st.n; var p = t.passos[st.i];
      $$(".stp li", panel).forEach(function (li, k) { li.classList.toggle("on", k === st.i); li.classList.toggle("past", k < st.i); });
      var mk = $(".mk", panel); mk.classList.add("has-hl"); $$("[data-p]", mk).forEach(function (el) { el.classList.toggle("hl", el.getAttribute("data-p") === p.hl); });
      $(".mk-step", panel).textContent = st.i + 1; st.t0 = performance.now();
      var img = $(".shot", panel); img.onload = function () { img.style.display = "block"; }; img.onerror = function () { img.style.display = "none"; }; img.style.display = "none"; var pn = "print-" + t.id + "-" + (st.i + 1) + ".png"; if ((P.prints || []).indexOf(pn) > -1) img.src = pn;
    }
    st.set = set;
    panel.addEventListener("click", function (e) {
      var li = e.target.closest(".stp li"); if (li) { st.playing = false; $('[data-c="play"]', panel).textContent = "▶ Reproduzir"; set(+li.getAttribute("data-k")); return; }
      var b = e.target.closest("[data-c]"); if (!b) return; var c = b.getAttribute("data-c");
      if (c === "next") { set(st.i + 1); } else if (c === "prev") { set(st.i - 1); } else { st.playing = !st.playing; b.textContent = st.playing ? "⏸ Pausar" : "▶ Reproduzir"; st.t0 = performance.now(); }
    });
    set(0);
  });
  var toolVis = false;
  new IntersectionObserver(function (es) { toolVis = es[0].isIntersecting; }, { threshold: 0.2 }).observe($("#c5"));
  var STEP_MS = 5200;
  function tick() {
    var st = tools[curTool];
    if (st && toolVis && st.playing) { var k = Math.min(1, (performance.now() - st.t0) / STEP_MS); $(".mock-bar i", st.panel).style.width = k * 100 + "%"; if (k >= 1) st.set(st.i + 1); }
    else if (st) $(".mock-bar i", st.panel).style.width = st.playing ? "0%" : "100%";
    requestAnimationFrame(tick);
  }
  if (!REDUCE) requestAnimationFrame(tick);
  $("#tool-tabs").addEventListener("click", function (e) { var b = e.target.closest(".tab"); if (!b) return; curTool = b.getAttribute("data-tool"); $$("#tool-tabs .tab").forEach(function (x) { x.classList.toggle("on", x === b); }); $$("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== curTool; }); tools[curTool].set(0); tools[curTool].t0 = performance.now(); });

  /* ---------- qualificação ---------- */
  var QF = {}; P.qualificacao.blocos.forEach(function (b) { b.campos.forEach(function (c) { QF[c.id] = { b: b.id, req: c.req, l: c.l }; }); });
  ["nome", "tel", "loja", "sdr"].forEach(function (k) { QF[k] = { b: "lead", req: true, l: k }; });
  function qv(id) { var el = $("#q-" + id); return el ? el.value.trim() : ""; }
  function fmtVisit(v) { if (!v) return "não definido"; var d = new Date(v); if (isNaN(d)) return v; var dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]; return dias[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + " às " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  function ni(v) { return v || "não informado"; }
  function qfUpdate() {
    var troca = $("#q-temtroca").checked, req = [], ok = 0;
    $("[data-b=\"troca\"]").hidden = !troca;
    Object.keys(QF).forEach(function (k) { var q = QF[k], isReq = q.req || (troca && q.b === "troca" && ["tmodelo", "tano", "tkm", "tplaca", "tcor", "texpect"].indexOf(k) > -1); if (isReq) { req.push(k); var f = $('[data-f="' + k + '"]'); var has = !!qv(k); if (has) ok++; if (f) f.classList.toggle("ok", has); } else { var f2 = $('[data-f="' + k + '"]'); if (f2) f2.classList.toggle("ok", !!qv(k)); } });
    var pct = req.length ? Math.round(ok / req.length * 100) : 0, ready = pct === 100;
    $("#mt-n").textContent = pct + "%"; $("#mt-bar").style.width = pct + "%";
    var bd = $("#mt-badge"); bd.className = "badge " + (ready ? "yes" : "no"); bd.textContent = ready ? "✓ Pronto para a loja" : "Ainda faltam " + (req.length - ok) + " campo(s) obrigatório(s)";
    var g = P.scripts.grupo.tpl;
    var trocaTxt = troca ? "Sim: " + [qv("tmodelo"), qv("tano"), qv("tkm") && qv("tkm") + " km", qv("tplaca") && "placa " + qv("tplaca"), qv("tcor")].filter(Boolean).join(", ") : "Não";
    var obs = [qv("tpneus") && "pneus: " + qv("tpneus"), qv("trepintura") && "repintura/batida: " + qv("trepintura"), qv("trevisoes") && "revisões: " + qv("trevisoes"), qv("tfin") && "quitado: " + qv("tfin"), qv("tneg") && "negociação: " + qv("tneg"), qv("porque") && "motivo: " + qv("porque")].filter(Boolean).join("; ");
    var pg = qv("forma") ? qv("forma") + (qv("entrada") ? ", entrada " + qv("entrada") : "") : "não informado";
    var vals = { "[Nome]": ni(qv("nome")), "[DDD + número]": ni(qv("tel")), "[Dia, dd/mm] às [hh:mm]": fmtVisit(qv("visita")), "[Loja]": ni(qv("loja")), "[Modelo, ano, KM, cor, placa]": [qv("modelo"), qv("ano"), qv("km") && qv("km") + " km", qv("cor"), qv("placa") && "placa " + qv("placa")].filter(Boolean).join(", ") || "não informado", "[valor tabela]": ni(qv("valorinf")).replace(/^R\$\s*/, ""), "[À vista / Financiado, entrada R$ ___]": pg, "[Não / Sim: modelo, ano, KM, placa, cor]": trocaTxt, "[valor]": ni(qv("texpect")).replace(/^R\$\s*/, ""), "[quando]": ni(qv("quando")), "[pneus, repintura, revisões, outros]": obs || "não informado", "[Seu nome]": ni(qv("sdr")) };
    Object.keys(vals).forEach(function (k) { g = g.split(k).join(vals[k]); });
    g = g.replace("R$ não informado", "não informado");
    $("#qf-out").textContent = g; $("#qf-out").setAttribute("data-t", g);
  }
  $("#qf-form").addEventListener("input", qfUpdate); $("#qf-form").addEventListener("change", qfUpdate);
  $("#q-temtroca").addEventListener("change", qfUpdate);
  $("#qf-copy").addEventListener("click", function () { copy($("#qf-out").getAttribute("data-t") || ""); });
  $("#qf-reset").addEventListener("click", function () { $$("#qf-form input, #qf-form select").forEach(function (el) { if (el.type === "checkbox") el.checked = false; else el.value = ""; }); qfUpdate(); });
  qfUpdate();

  /* ---------- scripts ---------- */
  $("#sc-tabs").addEventListener("click", function (e) { var b = e.target.closest(".tab"); if (!b) return; var k = b.getAttribute("data-sc"); $$("#sc-tabs .tab").forEach(function (x) { x.classList.toggle("on", x === b); }); $$("[data-sp]").forEach(function (p) { p.hidden = p.getAttribute("data-sp") !== k; }); if (k === "zap") showZap(zi); });
  var zi = 0, zt;
  function showZap(i) {
    zi = i; $$("#zap-l li").forEach(function (li, k) { li.classList.toggle("on", k === i); });
    var box = $("#wa-b"), msg = P.scripts.primeiroZap[i].msg; clearTimeout(zt);
    if (REDUCE) { box.innerHTML = '<div class="wa-m">' + nl2br(msg) + "<small>agora ✓✓</small></div>"; return; }
    box.innerHTML = '<div class="wa-typing"><i></i><i></i><i></i></div>';
    zt = setTimeout(function () { box.innerHTML = '<div class="wa-m">' + nl2br(msg) + "<small>agora ✓✓</small></div>"; }, 900);
  }
  $("#zap-l").addEventListener("click", function (e) { var li = e.target.closest("li"); if (li) showZap(+li.getAttribute("data-i")); });
  $("#wa-copy").addEventListener("click", function () { copy(P.scripts.primeiroZap[zi].msg); });
  showZap(0);
  document.addEventListener("click", function (e) { var b = e.target.closest("[data-copy]"); if (b) copy(b.getAttribute("data-copy")); });

  /* ---------- objeções ---------- */
  var obCat = "Todas";
  function obFilter() {
    var q = norm($("#ob-q").value.trim()), n = 0;
    $$(".obj-i").forEach(function (o) { var hit = (obCat === "Todas" || o.getAttribute("data-cat") === obCat) && (!q || o.getAttribute("data-s").indexOf(q) > -1); o.hidden = !hit; if (hit) n++; });
    $("#ob-cnt").textContent = n + " objeç" + (n === 1 ? "ão" : "ões");
  }
  $("#ob-q").addEventListener("input", obFilter);
  $("#ob-chips").addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (!b) return; obCat = b.getAttribute("data-c"); $$("#ob-chips .chip").forEach(function (x) { x.classList.toggle("on", x === b); }); obFilter(); });
  $("#obj").addEventListener("click", function (e) { var b = e.target.closest(".obj-i > button"); if (b) b.parentNode.classList.toggle("open"); });
  obFilter();

  /* ---------- simulador de CPVR ---------- */
  function num(s) { s = String(s).replace(/[^\d,.]/g, ""); if (s.indexOf(",") > -1) s = s.replace(/\./g, "").replace(",", "."); else if ((s.match(/\./g) || []).length > 0 && /\.\d{3}$/.test(s)) s = s.replace(/\./g, ""); var v = parseFloat(s); return isNaN(v) ? 0 : v; }
  function cpUpdate() {
    var c = num($("#cp-c").value), v = num($("#cp-v").value), out = $("#cp-out");
    if (c <= 0 || v <= 0) { out.innerHTML = '<p style="color:var(--mut)">Informe o custo e as visitas para ver o resultado.</p>'; return; }
    var cp = c / v, f = flagOf(cp), pos = Math.min(100, cp / (R.bandeiras.vermelha * 1.25) * 100);
    var need = Math.ceil(c / R.cpvrMax), falta = Math.max(0, need - v);
    out.innerHTML = '<span style="color:var(--mut);font-weight:700;font-size:14px">Seu CPVR</span><div class="big-n" style="color:' + FLAGCOL[f] + '">' + brl2(cp) + '</div><span class="pill-f" style="background:' + FLAGCOL[f] + '">Bandeira ' + f + '</span><div class="gauge"><i style="left:calc(' + pos + '% - 2px)"></i></div><div class="gauge-l"><span>R$ 0</span><span>' + brl(R.bandeiras.verde) + "</span><span>" + brl(R.bandeiras.amarela) + "</span><span>" + brl(R.bandeiras.vermelha) + '+</span></div><div class="calc-kv"><div><span>Sua comissão no mês</span><b>' + brl(v * R.comissaoVisita) + "</b></div><div><span>Visitas para ficar na verde</span><b>" + nf(need) + "</b></div><div><span>" + (falta ? "Faltam para a verde" : "Margem sobre a verde") + "</span><b>" + (falta ? nf(falta) + " visitas" : "OK") + "</b></div></div>";
  }
  $("#cp-c").addEventListener("input", cpUpdate); $("#cp-v").addEventListener("input", cpUpdate); cpUpdate();

  /* ---------- simulador de 6 meses ---------- */
  var seq = ["verde", "verde", "verde", "amarela", "verde", "verde"], ORDER = ["verde", "amarela", "vermelha", "preta"];
  function simPaint() {
    $("#sim").innerHTML = seq.map(function (f, i) { return '<button type="button" data-f="' + f + '" data-i="' + i + '"><small>Mês ' + (i + 1) + "</small><b>" + f + "</b></button>"; }).join("");
    var runs = [], cur = null; seq.forEach(function (f, i) { if (cur && cur.f === f) cur.n++; else { cur = { f: f, n: 1 }; runs.push(cur); } });
    var aumentos = 0; runs.forEach(function (r) { if (r.f === "verde") aumentos += Math.floor(r.n / R.cicloVerde); });
    var msgs = [];
    msgs.push('<div class="card"><h4>💰 Aumento no fixo: ' + brl(aumentos * R.aumentoFixo) + '</h4><p>' + (aumentos ? aumentos + " ciclo(s) de " + R.cicloVerde + " meses consecutivos em verde." : "Ainda não há " + R.cicloVerde + " meses consecutivos em verde. Um mês fora da verde zera a contagem.") + "</p></div>");
    runs.forEach(function (r) {
      if (r.f === "amarela" && r.n >= 3) msgs.push('<div class="card"><h4>⚠️ PDI ativado</h4><p>3 meses consecutivos na amarela: PDI focado na causa raiz e mentoria guiada de 1 mês.</p></div>');
      if (r.f === "vermelha" && r.n >= 2) msgs.push('<div class="card"><h4>❤️ Plano intensivo</h4><p>2 meses na vermelha: plano intensivo nos 2 meses seguintes, subida obrigatória para a amarela e proibido voltar à vermelha por 2 meses.</p></div>');
      if (r.f === "preta") msgs.push('<div class="card"><h4>💀 Ação emergencial</h4><p>1 mês na preta já aciona o plano emergencial: é obrigatório sair da zona crítica no mês seguinte, e o retorno fica proibido por 3 meses.</p></div>');
    });
    $("#sim-out").innerHTML = msgs.join("");
  }
  $("#sim").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; var i = +b.getAttribute("data-i"); seq[i] = ORDER[(ORDER.indexOf(seq[i]) + 1) % ORDER.length]; simPaint(); });
  simPaint();

  /* ---------- trilha ---------- */
  var trail = store.get("trail", {});
  function trailPaint() {
    P.trilha.forEach(function (m) {
      var el = $('.mod[data-m="' + m.id + '"]'), n = 0;
      m.itens.forEach(function (_, i) { var cb = $('input[data-m="' + m.id + '"][data-i="' + i + '"]'); cb.checked = !!trail[m.id + "." + i]; if (cb.checked) n++; });
      $(".pc", el).textContent = n + "/" + m.itens.length; el.classList.toggle("done", n === m.itens.length);
    });
  }
  $("#trail").addEventListener("click", function (e) { var b = e.target.closest(".mod > button"); if (b) b.parentNode.classList.toggle("open"); });
  $("#trail").addEventListener("change", function (e) { var cb = e.target; if (cb.type !== "checkbox") return; trail[cb.getAttribute("data-m") + "." + cb.getAttribute("data-i")] = cb.checked; store.set("trail", trail); trailPaint(); });
  trailPaint();

  /* ---------- quiz ---------- */
  var qi = 0, qs = 0, qans = false;
  function quizPaint() {
    var z = $("#quiz"), Q = P.quiz;
    if (qi >= Q.length) {
      var pct = Math.round(qs / Q.length * 100), ok = pct >= 80, best = Math.max(store.get("best", 0), pct); store.set("best", best);
      z.innerHTML = '<div class="q-res' + (ok ? "" : " fail") + '"><p style="color:var(--mut);font-weight:700">Seu resultado</p><div class="big-n">' + pct + "%</div><p style=\"margin-top:8px\">" + qs + " de " + Q.length + " corretas. " + (ok ? "Parabéns, você está pronta para operar! Mostre o resultado ao seu gestor." : "Faltam poucos pontos. Releia os capítulos em que errou e tente de novo.") + '</p><p style="color:var(--dim);margin-top:6px;font-size:14px">Melhor resultado neste aparelho: ' + best + '%</p><div class="q-ctl" style="justify-content:center"><button class="btn btn-r" type="button" id="q-again">Refazer a prova</button></div></div>';
      $("#q-again").addEventListener("click", function () { qi = 0; qs = 0; quizPaint(); });
      return;
    }
    var q = Q[qi]; qans = false;
    z.innerHTML = '<div class="q-top"><span>Pergunta ' + (qi + 1) + " de " + Q.length + "</span><span>" + qs + ' acertos</span></div><div class="q-bar"><i style="width:' + (qi / Q.length * 100) + '%"></i></div><p class="q-q">' + esc(q.q) + '</p><div class="q-o">' + q.o.map(function (o, i) { return '<button type="button" data-i="' + i + '">' + esc(o) + "</button>"; }).join("") + '</div><div id="q-fb"></div>';
  }
  $("#quiz").addEventListener("click", function (e) {
    var b = e.target.closest(".q-o button"); if (b && !qans) {
      qans = true; var q = P.quiz[qi], i = +b.getAttribute("data-i"); if (i === q.a) qs++;
      $$(".q-o button").forEach(function (x, k) { x.disabled = true; if (k === q.a) x.classList.add("ok"); else if (k === i) x.classList.add("no"); });
      $("#q-fb").innerHTML = '<div class="q-e">' + (i === q.a ? "✓ Correto. " : "✕ Não foi dessa vez. ") + esc(q.e) + '</div><div class="q-ctl"><button class="btn btn-r" type="button" id="q-next">' + (qi === P.quiz.length - 1 ? "Ver resultado" : "Próxima") + "</button></div>";
      $("#q-next").addEventListener("click", function () { qi++; quizPaint(); }); return;
    }
  });
  quizPaint();


  /* ---------- simulador de funil ---------- */
  var FIDS = ["meta", "comp", "agend", "qual", "cont", "dias", "tent", "sdrs", "cap"];
  function fsUpdate() {
    var v = {}; FIDS.forEach(function (k) { var el = $("#fs-" + k); v[k] = +el.value; $("#fs-" + k + "-o").textContent = " " + el.value + (el.getAttribute("data-suf") || ""); });
    var custo = num($("#fs-custo").value);
    var ag = Math.ceil(v.meta / (v.comp / 100)), ql = Math.ceil(ag / (v.agend / 100)), ct = Math.ceil(ql / (v.qual / 100)), ld = Math.ceil(ct / (v.cont / 100));
    var tentTot = ld * v.tent / v.dias, porSdr = tentTot / v.sdrs, oc = porSdr / v.cap * 100, cp = custo > 0 ? custo / v.meta : 0, fl = cp ? flagOf(cp) : "verde";
    var cor = oc > 100 ? "#FF3B3B" : oc > 85 ? "#FFE600" : "#19E65B";
    $("#fs-out").innerHTML = '<span style="color:var(--mut);font-weight:700;font-size:14px">Para entregar ' + v.meta + ' visitas realizadas você precisa de</span><div class="big-n">' + nf(ld) + ' <small style="font-size:.4em;color:var(--mut)">leads/mês</small></div><div class="fun-bars">' + [["Leads", ld], ["Contatos", ct], ["Qualificados", ql], ["Agendadas", ag], ["Realizadas", v.meta]].map(function (x, i) { return '<div class="fb"><span>' + x[0] + '</span><div><i style="width:' + (x[1] / ld * 100) + '%;opacity:' + (1 - i * 0.14) + '"></i></div><b>' + nf(x[1]) + "</b></div>"; }).join("") + '</div><div class="calc-kv"><div><span>Leads por dia útil</span><b>' + (ld / v.dias).toFixed(1).replace(".", ",") + '</b></div><div><span>Tentativas por dia (total)</span><b>' + nf(tentTot) + '</b></div><div><span>Por SDR, por dia</span><b>' + nf(porSdr) + '</b></div><div><span>Ocupação da capacidade</span><b style="color:' + cor + '">' + Math.round(oc) + '%</b></div><div><span>Comissão total do mês</span><b>' + brl(v.meta * R.comissaoVisita) + '</b></div><div><span>CPVR estimado</span><b style="color:' + FLAGCOL[fl] + '">' + (cp ? brl2(cp) + " · " + fl : "—") + '</b></div></div><p class="note ' + (oc > 100 ? "" : "ok") + '" style="margin-top:14px">' + (oc > 100 ? "A atividade exigida passa da capacidade do time. Três caminhos: ajustar a meta, melhorar a conversão ou ampliar o time. Fingir que a conta fecha é o que estoura o mês." : "A atividade exigida cabe na capacidade. Mantenha as taxas sob observação e recalibre todo mês.") + "</p>";
  }
  $("#chapters").addEventListener("input", function (e) { if (e.target.id && e.target.id.indexOf("fs-") === 0) fsUpdate(); });
  fsUpdate();

  /* ---------- scorecard de ligação ---------- */
  function scUpdate() {
    var tot = 0, ok = 0; P.scorecard.forEach(function (c, i) { tot += c.p; if ($('#sc-list input[data-i="' + i + '"]').checked) ok += c.p; });
    var pct = Math.round(ok / tot * 100), lv = pct >= 90 ? ["Excelente", "#19E65B"] : pct >= 80 ? ["Boa, dentro da meta da fase 2", "#19E65B"] : pct >= 60 ? ["Em desenvolvimento", "#FFE600"] : ["Precisa de coaching", "#FF3B3B"];
    $("#sc-out").innerHTML = '<span style="color:var(--mut);font-weight:700;font-size:14px">Nota da ligação</span><div class="big-n" style="color:' + lv[1] + '">' + pct + '%</div><span class="pill-f" style="background:' + lv[1] + '">' + lv[0] + '</span><p style="margin-top:14px;color:var(--mut);font-size:15px">Escolha um único ponto para melhorar na próxima ligação e simule a correção com o gestor.</p><div class="out-ctl"><button class="btn-s" id="sc-reset" type="button">Limpar</button></div>';
  }
  $("#sc-list").addEventListener("change", scUpdate);
  $("#sc-out").addEventListener("click", function (e) { if (e.target.id === "sc-reset") { $$("#sc-list input").forEach(function (x) { x.checked = false; }); scUpdate(); } });
  scUpdate();

  /* ---------- entrada suave dos blocos (estado final sempre normal) ---------- */
  if (!REDUCE && "IntersectionObserver" in window) {
    var els = $$(".ch-h, .blk"), io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -5% 0px", threshold: 0.01 });
    els.forEach(function (el) { io.observe(el); });
    document.documentElement.classList.add("rv-on");
    setTimeout(function () { els.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add("in"); }); }, 3500);
  }
})();
