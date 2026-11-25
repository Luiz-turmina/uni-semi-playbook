/* data2.js — conteúdo complementar do playbook (estrutura em partes, trilhas, casos, funil, rituais, onboarding).
   Carregado depois de data.js e soma novas chaves a window.PB. Números de funil são EXEMPLOS para calibrar com a operação. */
(function (P) {

  /* ---------- partes e capítulos ---------- */
  P.partes = [
    { t: "Parte I · Fundamentos", ch: [1, 2, 3] },
    { t: "Parte II · Operação do atendimento", ch: [4, 5, 6] },
    { t: "Parte III · Método de venda", ch: [7, 8, 9] },
    { t: "Parte IV · Números e gestão", ch: [10, 11, 12, 13] },
    { t: "Fechamento", ch: [14] }
  ];

  /* ---------- trilhas de leitura (por papel) ---------- */
  P.trilhasLeitura = [
    { ic: "🌱", t: "Sou nova no time", d: "O caminho completo, na ordem certa.", cap: [1, 2, 3, 4, 5, 6, 7, 8, 13, 14] },
    { ic: "📞", t: "Já atendo leads", d: "Aprofunde o método e a qualificação.", cap: [6, 7, 8, 9, 11] },
    { ic: "📊", t: "Acompanho ou lidero SDRs", d: "Funil, indicadores, rituais e rampa.", cap: [10, 11, 12, 13] }
  ];

  /* ---------- no fim de cada capítulo: regra de ouro, erros e dica ---------- */
  P.callouts = {
    1: { rg: "Visita realizada é o único resultado que conta: agendar não basta, o cliente precisa aparecer e o gerente precisa confirmar.", err: ["Tratar visita agendada como visita realizada.", "Prometer condições que só a loja pode dar.", "Agendar “para ver se vai”, sem o lead estar pronto."], sdr: "Seu trabalho é preparar o cliente certo para a conversa na loja, com carro, pagamento, troca e prazo alinhados." },
    2: { rg: "Fale só o que está no site oficial ou o que o gerente confirmou.", err: ["Citar o valor da Garantia Mais sem conferir.", "Dizer “o carro é perfeito”: use as palavras do site (procedência garantida, quilometragem verificada, garantia legal de 3 meses).", "Citar uma promoção que já acabou."], sdr: "Você não precisa saber tudo do carro. Precisa saber o que a Unidas oferece e quando chamar a loja." },
    3: { rg: "Não finja que sabe de carro: pergunte, anote e deixe a avaliação com a loja.", err: ["Dar opinião mecânica sobre o carro do cliente.", "Confundir ano de fabricação com ano do modelo.", "Esquecer de perguntar a KM e a placa."], sdr: "Use o glossário como cola. Na dúvida, repita a palavra do cliente e peça para ele explicar." },
    4: { rg: "Ligar primeiro, registrar sempre e nunca deixar um lead sem próximo passo.", err: ["Começar pelo WhatsApp em vez da ligação.", "Agendar a visita e esquecer de avisar o gerente no grupo.", "Pular o anti no-show porque “o cliente parecia animado”."], sdr: "Decore os 10 passos. É a sequência de toda ligação, todos os dias." },
    5: { rg: "Se não está no Ficha Única, não aconteceu.", err: ["Criar lead duplicado.", "Esquecer de finalizar o ticket no Blip.", "Passar valor de memória em vez de usar o valor tabelado."], sdr: "No primeiro dia, abra as três ferramentas e faça o teste de ligação para o seu celular." },
    6: { rg: "Lead pronto = ficha completa, valor informado e dia e hora marcados.", err: ["Mandar para a loja um lead sem forma de pagamento definida.", "Deixar o carro de troca “para a loja ver”: os dados precisam ir prontos.", "Esquecer de perguntar quanto o cliente espera receber pelo usado."], sdr: "Use o formulário deste capítulo em todos os atendimentos até decorar os blocos." },
    7: { rg: "Escute mais do que fale e sempre feche com duas opções de horário.", err: ["Ler o script como um robô.", "Perguntar “quando você pode ir?” em vez de oferecer dois horários.", "Terminar a ligação sem repetir dia, hora e loja."], sdr: "Grave a sua primeira ligação do dia e ouça com o gestor. É a forma mais rápida de melhorar." },
    8: { rg: "Objeção é uma pergunta disfarçada: descubra a verdadeira antes de responder.", err: ["Responder antes de entender o motivo real.", "Discutir com o cliente ou falar mal do concorrente.", "Prometer desconto para “segurar” o cliente."], sdr: "Escolha as 5 objeções que você mais ouve e treine a resposta em voz alta." },
    9: { rg: "Argumento sem prova é opinião. Toda vantagem vem com o fato que a sustenta.", err: ["Usar adjetivos (“excelente”, “perfeito”) sem fato.", "Falar do carro antes de entender o que o cliente precisa.", "Repetir o mesmo argumento para todo mundo."], sdr: "Treine o pitch de 30 segundos até ele soar como conversa." },
    10: { rg: "A meta só é real quando a atividade que ela exige cabe na capacidade de quem atende.", err: ["Assumir a meta sem calcular quantos leads e ligações ela exige.", "Culpar a pessoa quando o funil está represado em uma etapa.", "Não recalibrar as taxas a cada ciclo."], sdr: "Entenda onde você está no funil: o que você controla hoje é o topo (rapidez, tentativas, qualidade da ficha)." },
    11: { rg: "Todo indicador existe para gerar uma ação. Indicador que não muda comportamento é decoração.", err: ["Olhar só o resultado e ignorar a atividade que o produz.", "Mascarar um número ruim: ele só serve se for honesto.", "Esperar o fim do mês para agir na bandeira."], sdr: "Acompanhe o seu CPVR toda semana, não só no fechamento do mês." },
    12: { rg: "Todo problema levantado em um ritual sai dele com dono e data.", err: ["Fazer a daily de memória, sem o Ficha Única aberto.", "Coaching que aponta o erro, mas não simula a correção.", "Cancelar o ritual justamente na semana mais cheia."], sdr: "Chegue na daily com os números do dia anterior e um bloqueio que você quer resolver." },
    13: { rg: "O cliente não é campo de treino: role play antes do primeiro lead real.", err: ["Colocar a SDR nova para atender sozinha no primeiro dia.", "Avançar de fase pelo calendário e não pela competência demonstrada.", "Treinar só o que a pessoa já domina."], sdr: "Peça role play dos cenários que você mais teme. É lá que você mais aprende." }
  };

  /* ---------- cap 6: casos resolvidos ---------- */
  P.casos = [
    { t: "Caso 1 · Quase pronto", s: "Carlos quer o Onix 2022, vai financiar e tem um Argo 2019 para dar na troca. Quer ir sábado. Você tem: carro de interesse, forma de pagamento e o modelo do Argo.", f: "Faltam KM, placa, cor, estado dos pneus, repintura, revisões e quanto ele espera receber pelo Argo.", d: "Ainda não está pronto. Complete os dados do carro de troca (3 minutos) e só então agende. Com a ficha completa, vai para a loja." },
    { t: "Caso 2 · Só olhando", s: "A cliente diz que está vendo uns 5 carros e “sem pressa”. Não sabe como vai pagar.", f: "Faltam prazo e forma de pagamento. Interesse ainda é de pesquisa.", d: "Não agende. Descubra o prazo (“se achar o carro certo, em quanto tempo fecharia?”). Se for acima de 30 dias, mantenha o contato e retome em 7 dias." },
    { t: "Caso 3 · Carro vendido", s: "O cliente pediu informações sobre um Polo, mas o carro foi vendido ontem.", f: "O interesse é real, o carro não existe mais.", d: "Ofereça 2 alternativas parecidas (modelo, ano, câmbio, faixa de preço) e requalifique. Só agende quando ele escolher um carro disponível." },
    { t: "Caso 4 · Pronto na hora", s: "O cliente vai pagar à vista com Pix, não tem carro para dar na troca e quer ir amanhã às 10h.", f: "Nada. Ficha completa: carro, pagamento, sem troca, prazo imediato, horário.", d: "Pronto. Informe o valor tabelado, confirme dia, hora e loja, avise o gerente no grupo e inicie o anti no-show. Dica de venda: com Pix, a retirada pode ser no mesmo dia." }
  ];

  /* ---------- cap 7: método ---------- */
  P.anatomia = [
    { n: 1, t: "Cumprimento com nome e motivo", d: "Chame o cliente pelo nome e cite o carro que ele viu. É o que mostra que não é uma ligação genérica." },
    { n: 2, t: "Peça permissão", d: "“Posso falar 3 minutinhos?” Quem se sente respeitado, fica na linha." },
    { n: 3, t: "Pergunta aberta antes da proposta", d: "“O que te chamou atenção nesse carro?” O motivo dele vira o seu argumento." },
    { n: 4, t: "Dados completos, sem pressa", d: "Carro, prazo, pagamento, troca e valor. Uma pergunta por vez." },
    { n: 5, t: "Convite com duas opções", d: "“Quinta às 10h ou sexta às 16h?” Fechar a data é fechar o resultado." }
  ];
  P.dificeis = [
    { q: "“Já me ligaram três vezes hoje.”", r: "Peço desculpas pelo transtorno, [Nome]. Vou resolver isso com você agora, em dois minutos, para você não ser incomodado de novo. Você ainda tem interesse no [Modelo]?", n: "Aconteceu duplicidade. Peça desculpas, resolva rápido e registre para evitar repetição." },
    { q: "“Quanto custa? Só me fala o preço.”", r: "O valor de tabela do [Modelo] é R$ [valor]. Para te ajudar melhor com as condições, posso te fazer duas perguntas rápidas sobre o seu momento de compra?", n: "Responda ao que ele perguntou e depois volte à qualificação." },
    { q: "O cliente desliga na sua cara.", r: "Mande uma mensagem curta: “Oi [Nome], desculpe se liguei em hora ruim! Sobre o [Modelo]: posso te ligar em outro horário? Me diz o melhor.”", n: "Não leve para o lado pessoal. Tente de novo em outro horário." },
    { q: "“Quem decide é o meu pai/minha esposa.”", r: "Combinado! Que tal o [pai/sua esposa] participar da visita? Assim a decisão é na hora. Qual o melhor horário para vocês dois?", n: "Descubra quem decide e leve essa pessoa para a visita." },
    { q: "“Moro em outra cidade.”", r: "Em qual cidade você está? Vou ver a loja mais próxima. A Unidas Seminovos tem mais de 50 lojas pelo país. Se for outro estado, posso te passar o contato certo.", n: "Confirme a loja mais próxima antes de agendar. Se for fora de cobertura, registre o motivo." },
    { q: "“Já comprei outro carro.”", r: "Parabéns pela compra, [Nome]! Fico feliz. Se um dia precisar de outro carro na família ou for trocar, é só chamar a Unidas Seminovos. Posso te perguntar o que te fez decidir pelo outro?", n: "Agradeça, pergunte o motivo e registre como perdido com o motivo correto." },
    { q: "Número errado ou pessoa que não pediu contato.", r: "Desculpe o engano! Pode me confirmar se o seu nome é [Nome] e se pediu informações sobre um carro da Unidas Seminovos? Se não, retiro o seu número agora.", n: "Registre “número incorreto” e finalize. Nunca insista." }
  ];
  P.dialogo = {
    intro: "Uma ligação do começo ao fim, com o raciocínio por trás de cada movimento. Lead: Marcos, interessado em um T-Cross, vai financiar e tem um HB20 para dar na troca.",
    turnos: [
      { w: "sdr", t: "Oi, Marcos, tudo bem? Aqui é a Joana, da Unidas Seminovos. Você pediu informações sobre o T-Cross 2022. Posso falar 3 minutinhos com você?", n: "Nome, motivo e permissão em uma frase." },
      { w: "cli", t: "Pode, pode falar." },
      { w: "sdr", t: "Perfeito. Só para eu separar o carro certo: é o T-Cross 200 TSI, 2022/2023, prata, com 41 mil km. É esse mesmo?", n: "Confirma os dados do Ficha Única. Se ele disser outro carro, você corrige agora." },
      { w: "cli", t: "É esse mesmo, prata." },
      { w: "sdr", t: "Ótimo! E o que te chamou atenção nele?", n: "Pergunta aberta. A resposta vira argumento." },
      { w: "cli", t: "Estou com filho pequeno e preciso de um carro mais alto, com espaço no porta-malas." },
      { w: "sdr", t: "Faz total sentido, SUV é ótimo para cadeirinha e mala. E para quando você pretende estar com o carro?", n: "Reflete o motivo e avança para o prazo." },
      { w: "cli", t: "Quero resolver este mês." },
      { w: "sdr", t: "Ótimo. Como você pretende pagar: à vista, financiado ou vai dar um carro na troca?", n: "Prazo curto: lead quente. Vá para o pagamento." },
      { w: "cli", t: "Vou financiar e dar meu HB20 de entrada." },
      { w: "sdr", t: "Perfeito. Me conta do HB20: ano, cor, KM, placa, como estão os pneus, se já teve batida ou pintura e se as revisões estão em dia?", n: "Todos os dados do carro de troca em uma só pergunta, anotando enquanto ele fala." },
      { w: "cli", t: "É 2018, branco, 72 mil, placa final 4. Pneus meia-vida, nunca bateu, revisões na concessionária." },
      { w: "sdr", t: "Obrigada! E quanto você pensa em receber por ele? E em quanto pensa dar de entrada, além do carro?", n: "Expectativa de valor e ideia de negociação. Não comente o valor: a avaliação é na loja." },
      { w: "cli", t: "Uns 45 mil. De dinheiro eu consigo mais uns 10." },
      { w: "sdr", t: "Anotado. O T-Cross está hoje em R$ 109.900, valor de tabela. Esse valor cabe no que você imaginou?", n: "Valor sempre do Ficha Única, sem arredondar." },
      { w: "cli", t: "Cabe sim, vamos ver." },
      { w: "sdr", t: "Para te passar as condições certinhas, você faz a avaliação do HB20 e o test drive na loja. Consigo te encaixar na quinta às 10h ou na sexta às 16h. Qual é melhor?", n: "Duas opções. Nunca “quando você puder”." },
      { w: "cli", t: "Quinta às 10h." },
      { w: "sdr", t: "Combinado, quinta às 10h na loja de [bairro]. Leve um documento com foto e o documento do HB20. Vou te mandar tudo por WhatsApp e te aviso antes. Posso salvar esse número?", n: "Repete dia, hora e loja e pede para ele salvar o contato. Depois: grupo do gerente e anti no-show." }
    ],
    sim: ["Confirme o que combinaram, mande a mensagem de confirmação e avise o gerente no grupo no mesmo dia.", "Inicie o anti no-show: D-3 ligar, D-2 mensagem, D-1 ligar, D0 mensagem."],
    nao: ["Pergunte o motivo com leveza: “O que faltou para você decidir?”", "Se for caso de tempo ou dinheiro, ofereça retomar em uma data combinada.", "Registre o motivo da perda no Ficha Única e agradeça. Porta aberta."]
  };
  P.motivosPerda = ["Preço acima do esperado", "Comprou em outro lugar", "Sem crédito aprovado", "Só pesquisando, sem prazo", "Carro já vendido", "Fora da área de lojas", "Número incorreto", "Sem retorno após todas as tentativas"];

  /* ---------- cap 10: funil e registro ---------- */
  P.funil = {
    intro: "O funil é a sequência que transforma um lead em visita realizada. Para planejar, leia de trás para frente: da visita que você precisa entregar até quantos leads e ligações isso exige.",
    etapas: [
      { k: "Lead", d: "Entrou no Blip ou no Ficha Única." },
      { k: "Contato", d: "Você falou com o cliente de fato." },
      { k: "Qualificado", d: "Ficha completa: carro, pagamento, troca, prazo." },
      { k: "Agendado", d: "Dia e hora marcados, gerente avisado." },
      { k: "Realizada", d: "Cliente foi à loja e o gerente confirmou." }
    ],
    cal: [
      "Reúna o histórico da própria operação em um período representativo (pelo menos 1 mês).",
      "Calcule as taxas reais de passagem entre cada etapa.",
      "Lance as taxas no simulador e veja o que a meta exige de leads e ligações por dia.",
      "Revise a calibragem todo mês, porque os números mudam."
    ],
    saudavel: ["Entrada constante de leads, tempo de primeira resposta dentro de 5 minutos.", "Conversão estável entre as etapas.", "Poucos leads parados sem próximo passo.", "Comparecimento estável e motivos de perda registrados."],
    represado: ["Muitos leads em “Em contato” sem qualificação.", "Agendamentos que não viram visita (no-show alto).", "Leads sem data de retomada.", "Tempo de primeira resposta crescendo."],
    status: [
      { s: "Novo", d: "Lead recém-chegado, ainda sem tentativa de contato.", r: "Primeira tentativa em até 5 minutos." },
      { s: "Em contato", d: "Houve tentativa. Registre cada ligação e mensagem.", r: "Sempre com data da próxima ação." },
      { s: "Qualificado", d: "Ficha completa (carro, pagamento, troca, prazo e valor informado).", r: "Só vai para a loja neste status." },
      { s: "Agendado", d: "Visita marcada com dia, hora e loja; gerente avisado.", r: "Anti no-show ativo." },
      { s: "Visita realizada", d: "O gerente confirmou que o cliente foi à loja.", r: "Gera a comissão de R$ 60." },
      { s: "No-show / reagendado", d: "O cliente não foi ou remarcou.", r: "Reagende na hora e registre o motivo." },
      { s: "Perdido", d: "Sem interesse, comprou em outro lugar ou sem retorno.", r: "Sempre com o motivo da perda." }
    ],
    cadencia: [
      { d: "D0", t: "Primeira tentativa em até 5 min · nova ligação 30 a 60 min depois · WhatsApp de primeiro contato" },
      { d: "D+1", t: "Ligar em dois horários diferentes (manhã e tarde)" },
      { d: "D+3", t: "Ligar e enviar a mensagem de segunda tentativa" },
      { d: "D+7", t: "Última mensagem, deixando a porta aberta. Sem resposta, mover para perdido com o motivo" }
    ],
    cadNota: "Cadência sugerida pela BLU. Ajuste com o gestor conforme o comportamento dos leads na operação.",
    registro: [
      "Evite lead duplicado: busque pelo telefone antes de criar qualquer cadastro.",
      "Registre toda tentativa de contato, mesmo quando o cliente não atende.",
      "Preencha todos os campos obrigatórios antes de mover o lead de etapa.",
      "Cada lead termina como Visita realizada ou Perdido, sempre com o motivo.",
      "Dados confusos ou incompletos prejudicam o seu resultado: o gerente e o gestor leem o Ficha Única todos os dias."
    ]
  };

  /* ---------- cap 11: indicadores ---------- */
  P.familias = [
    { ic: "⚡", t: "Indicadores de atividade", d: "Mede o esforço que você controla hoje: tentativas de ligação, mensagens enviadas, tempo de primeira resposta. É o primeiro a reagir e o mais fácil de corrigir.", ex: "Ligações por dia · tempo de 1ª resposta" },
    { ic: "🎯", t: "Indicadores de qualidade", d: "Mede a qualidade da execução: taxa de contato, ficha completa, comparecimento, motivos de perda registrados. Mostra se o esforço vira resultado.", ex: "Taxa de contato · comparecimento" },
    { ic: "🏆", t: "Indicadores de resultado", d: "Mede a consequência: visitas agendadas, visitas realizadas, CPVR e comissão. Só se move depois de tudo o que veio antes.", ex: "Visitas realizadas · CPVR" }
  ];
  P.ritmo = [
    { k: "Diário", d: "Atividade e SLA de primeira resposta." },
    { k: "Semanal", d: "Taxa de contato, qualificação, agendamentos, no-show e CPVR parcial." },
    { k: "Mensal", d: "Visitas realizadas, CPVR final, bandeira e PDI." }
  ];
  P.acende = ["Trate como sinal de ação, não de pânico.", "Investigue a etapa que está puxando o número.", "Revise script, cadência ou qualificação.", "Use role play para corrigir o comportamento.", "Nunca mascare o número: só serve se for honesto."];

  /* ---------- cap 12: rituais e coaching ---------- */
  P.rituais = [
    { ic: "☀️", t: "Daily da operação, às 9h", d: "Reunião diária fixa, todos os dias às 9h. Pauta curta, sempre com o Ficha Única aberto: o que aconteceu ontem, o plano de hoje e um bloqueio. Números reais, sem “acho que”.", freq: "Todo dia, às 9h", st: "em vigor" },
    { ic: "📅", t: "Revisão semanal", d: "Funil, no-show, reagendamentos, objeções novas e leads parados. O foco é a etapa que está represando, não a pessoa.", freq: "Sugestão: 1x por semana", st: "proposta" },
    { ic: "📈", t: "Análise mensal", d: "CPVR final, bandeira, PDI e metas do mês seguinte. Olha conversão e ciclo, não só visitas.", freq: "Sugestão: 1x por mês", st: "proposta" },
    { ic: "🎧", t: "Coaching por gravação", d: "Uma ligação gravada por SDR, com um único ponto de melhoria, começando pelo positivo e terminando com a simulação da correção.", freq: "Sugestão: a cada 15 dias", st: "proposta" }
  ];
  P.rituaisNota = "Hoje a única rotina fixa é a daily das 9h. Os demais rituais são propostas da BLU para validação com a gestão: só passam a valer depois de confirmados.";
  P.coachPassos = ["Escolha uma ligação gravada de cada SDR por quinzena.", "Ouça antes da sessão e prepare um único ponto de melhoria.", "Comece pelo positivo concreto e depois trate o ponto a melhorar.", "Termine com a simulação da correção e revise na semana seguinte se foi aplicada."];
  P.teatro = ["Daily de memória, sem o sistema aberto.", "Revisão que dura horas, sem pauta.", "Análise mensal que só olha visitas, sem conversão.", "Coaching que aponta o erro e não simula a correção.", "Cancelar o ritual na semana mais cheia, justo quando é mais necessário."];
  P.scorecard = [
    { k: "Abertura", d: "Nome do cliente, nome do carro e permissão para falar.", p: 10 },
    { k: "Confirmou os dados do carro", d: "Modelo, ano, KM, cor e placa.", p: 10 },
    { k: "Descobriu o motivo", d: "Perguntou por que aquele carro e ouviu.", p: 10 },
    { k: "Prazo de compra", d: "Perguntou e registrou.", p: 10 },
    { k: "Forma de pagamento", d: "À vista, financiado, entrada.", p: 10 },
    { k: "Carro de troca completo", d: "Todos os dados, pneus, repintura, revisões, expectativa.", p: 15 },
    { k: "Informou o valor tabelado", d: "Valor do Ficha Única, sem promessa de desconto.", p: 10 },
    { k: "Convite com duas opções", d: "Dia e hora fechados.", p: 10 },
    { k: "Tom e escuta", d: "Voz sorrindo, sem interromper, profissional.", p: 5 },
    { k: "Registro depois da ligação", d: "Tudo no Ficha Única em até 10 minutos.", p: 10 }
  ];

  /* ---------- cap 13: onboarding e rampa ---------- */
  P.rampa = [
    { f: "Dias 1 a 30", t: "Aprender e executar com apoio", ent: ["Concluir a trilha de estudo e a prova final com 80% ou mais.", "Fazer ligações acompanhadas pelo gestor e passar nos role plays dos 6 cenários.", "Usar as 3 ferramentas sem ajuda e registrar todos os atendimentos."], av: "Avança quem demonstra conduzir a qualificação completa sem apoio do gestor." },
    { f: "Dias 31 a 60", t: "Operar com revisão", ent: ["Atender leads reais com revisão semanal dos resultados.", "Média de 80% ou mais no scorecard de ligações.", "Cumprir o anti no-show em todas as visitas agendadas."], av: "Avança quem mantém a ficha completa e o tempo de primeira resposta dentro de 5 minutos." },
    { f: "Dias 61 a 90", t: "Autonomia e consistência", ent: ["CPVR na bandeira amarela ou melhor.", "Comparecimento estável e motivos de perda sempre registrados.", "Montar o primeiro PDI com 2 comportamentos."], av: "Avança quem mostra consistência por 30 dias e começa a ajudar quem chega." }
  ];
  P.rampaNota = "Metas de cada fase: sugestão BLU. Valide e ajuste com o gestor da operação. A regra é avançar por competência demonstrada, não pelo calendário.";
  P.roleplays = [
    { t: "O “só estou olhando”", d: "Cliente sem prazo, sem pagamento definido. Objetivo: descobrir o prazo real." },
    { t: "O cliente com restrição de crédito", d: "Cliente que já foi negado. Objetivo: acolher e orientar sem prometer." },
    { t: "O carro de troca complexo", d: "Usado financiado, com batida antiga e KM alta. Objetivo: coletar todos os dados e alinhar expectativa." },
    { t: "O cliente que cancela a visita", d: "Cliente que avisa na véspera que não vai. Objetivo: remarcar na hora." },
    { t: "O caçador de desconto", d: "Cliente que só quer saber “o menor preço”. Objetivo: levar para a loja sem prometer." },
    { t: "O cliente desconfiado", d: "Medo de carro usado. Objetivo: usar procedência, quilometragem verificada e garantia." }
  ];
  P.rolePassos = ["O gestor faz o papel do cliente difícil, no cenário que a SDR mais erra.", "A SDR pratica exatamente a parte fraca, não a que já domina.", "O feedback termina em simulação da correção, não apenas em conversa."];
  P.prontaSinais = ["Conduz a qualificação completa sem apoio.", "Registra tudo no Ficha Única sem ser lembrada.", "Contorna a primeira objeção sem prometer desconto."];

  /* ---------- quiz: perguntas extras ---------- */
  P.quiz = P.quiz.concat([
    { q: "Para planejar a meta de visitas, como se lê o funil?", o: ["Da primeira ligação para a frente, sem contas", "De trás para frente: da visita realizada até quantos leads e ligações ela exige", "Só pelo número de leads que entram", "Pelo tempo de casa de cada SDR"], a: 1, e: "Leia de trás para frente: meta de visitas → agendadas → qualificadas → contatos → leads." },
    { q: "Em que status um lead pode ser enviado para a loja?", o: ["Novo", "Em contato", "Qualificado, com dia e hora marcados", "Perdido"], a: 2, e: "Só o lead qualificado e agendado vai para a loja." },
    { q: "No coaching por gravação, como deve terminar a sessão?", o: ["Com uma lista de todos os erros", "Com a simulação da correção do ponto trabalhado", "Sem feedback", "Com uma advertência"], a: 1, e: "Terminar com a simulação da correção é o que transforma coaching em melhoria." },
    { q: "O cliente tem um carro de troca financiado. O que você faz?", o: ["Diz que não dá para trocar", "Coleta os dados do carro e o saldo devedor aproximado, e leva para a loja", "Promete um valor de avaliação", "Ignora a troca"], a: 1, e: "Dá para trocar: colete os dados e o saldo devedor aproximado." }
  ]);

})(window.PB);
