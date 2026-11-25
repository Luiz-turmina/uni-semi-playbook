/* ============================================================
   data.js — todo o conteúdo do Playbook SDR · Unidas Seminovos.
   Para mudar texto, meta ou valor, mude aqui; o site se atualiza sozinho.
   Fontes: site oficial da Unidas Seminovos (consultado em 25/11/2026), apresentação institucional da Unidas 2026,
   reuniões e treinamentos com a Unidas, e o sistema de bandeiras da BLU.
   ============================================================ */
window.PB = {

  /* prints reais das ferramentas: salve na pasta do site como print-ficha-1.png, print-blip-3.png, print-ligacao-2.png ...
     (um por passo) e liste o nome do arquivo aqui para ele aparecer no lugar da ilustração. */
  prints: [],

  /* ---------- números que mandam no jogo (mude aqui) ---------- */
  regras: {
    comissaoVisita: 60,        // R$ por visita realizada (confirmada pelo gerente)
    cpvrMax: 200,              // custo por visita realizada: teto da bandeira verde (R$)
    bandeiras: { verde: 200, amarela: 300, vermelha: 400 },   // cortes do CPVR; acima da vermelha = preta
    aumentoFixo: 500,          // R$ de aumento no fixo a cada ciclo de meses consecutivos em verde
    cicloVerde: 3,             // meses consecutivos em verde para ganhar o aumento
    primeiraResposta: 5,       // minutos para a primeira tentativa de contato
    antiNoShow: [3, 2, 1, 0]   // dias antes da visita: ligar, mensagem, ligar, mensagem
  },

  /* ---------- 01 · missão ---------- */
  missao: {
    frase: "Levar o cliente certo, pronto para comprar, até a loja.",
    visita: "Visita realizada = o cliente que você qualificou e agendou apareceu na loja e o gerente confirmou. É o único resultado que conta (e que paga a sua comissão).",
    naoE: [
      "Fechar a venda (quem fecha é o vendedor da loja).",
      "Prometer desconto, aprovação de crédito ou valor do carro de troca.",
      "Mandar para a loja quem ainda está só “dando uma olhada”."
    ],
    porque: [
      { n: "~40", l: "carros vendidos por loja, por mês, em média (Seminovos Leves)" },
      { n: "~2", l: "meses de carro parado no pátio, em média. Quanto menos tempo parado, melhor" },
      { n: "60–70%", l: "dos leads de Seminovos chegam pelo digital: é a fila que você atende" }
    ],
    ouro: [
      { t: "Ligue antes de escrever", d: "A voz converte mais do que o texto. WhatsApp é plano B, não plano A." },
      { t: "Primeira tentativa em até 5 minutos", d: "Lead esfria rápido. Quem responde primeiro, leva." },
      { t: "Só vai para a loja quem está pronto", d: "Carro, pagamento, troca e prazo validados. Sem “vai ver o que acha”." },
      { t: "Nunca prometa o que não é seu", d: "Desconto, crédito e avaliação do usado são decididos na loja. Você alinha expectativa." },
      { t: "Registre tudo", d: "Se não está no Ficha Única, não aconteceu. Toda tentativa, todo detalhe." },
      { t: "Visita só conta com o gerente", d: "Depois que o cliente for, confirme com o gerente. Sem confirmação, sem comissão." }
    ]
  },

  /* ---------- 02 · quem é a Unidas Seminovos ---------- */
  unidas: {
    resumo: "A Unidas Seminovos é a operação de venda de carros seminovos da Unidas, uma das maiores empresas de aluguel de carros e gestão de frotas do Brasil. Em geral são carros que rodaram na própria frota e agora ganham novo dono, com procedência, revisões em dia e garantia.",
    grupo: [
      { v: 5000, pre: "+", l: "colaboradores" },
      { v: 240, pre: "+", l: "lojas de Rent a Car e Seminovos" },
      { v: 52, pre: "", l: "anos de mercado" },
      { v: 118000, pre: "+", l: "veículos e equipamentos" },
      { v: 1300, pre: "+", l: "clientes de frotas" },
      { v: 9000, pre: "+", l: "oficinas credenciadas" }
    ],
    grupoNota: "Números do grupo Unidas (apresentação institucional 2026). A Unidas tem outras frentes (aluguel, assinatura, frotas, pesados); o seu foco é Seminovos de carros leves.",
    premios: [
      "Great Place to Work® em 2026",
      "8x campeã do Prêmio Consumidor Moderno entre as melhores locadoras do país",
      "Entre as 500 Melhores Empresas do Brasil (Época Negócios)",
      "Entre as 1.000 Maiores do país (Exame e Valor Econômico)",
      "Selo RA1000 do ReclameAQUI, de excelência em atendimento"
    ],
    seminovos: [
      { v: 50, pre: "+", l: "lojas Unidas Seminovos no Brasil (site oficial)" },
      { v: 44005, pre: "", l: "seminovos vendidos em 2025 (+7,2% sobre 2024)" },
      { v: 22712, pre: "", l: "vendidos no 1º semestre de 2026 (+21,6%)" }
    ],
    seminovosNota: "Lojas: o site oficial informa “mais de 50”; algumas páginas citam 45 e relatórios financeiros citam 58 (lojas dedicadas). Vendas: resultados divulgados pela Unidas. Se o cliente perguntar, diga “mais de 50 lojas”.",
    estados: "AL · BA · CE · DF · ES · GO · MA · MS · MG · PA · PR · PE · RJ · RS · SC · SP",
    vende: [
      { ic: "🚗", t: "Carros de passeio seminovos, de várias marcas", d: "Hatches, sedãs, SUVs e picapes das marcas mais procuradas. Muitos vieram da própria frota da Unidas." },
      { ic: "🏷️", t: "Outlet", d: "Carros com preço de oportunidade. Giram rápido: é o argumento para o cliente não deixar para depois." },
      { ic: "✨", t: "Quase novo", d: "Carros com pouco tempo de uso, perto da condição de zero." },
      { ic: "🛣️", t: "Menor KM", d: "Carros com baixa quilometragem, para quem quer rodar muitos anos sem se preocupar." }
    ],
    comoVende: [
      { n: 1, t: "O cliente vê o carro no site", d: "Site da Unidas Seminovos, portais de anúncio e redes sociais. É daí que vêm os leads digitais (60–70%)." },
      { n: 2, t: "Você faz o primeiro contato", d: "Liga, entende o que ele quer, qualifica e agenda a visita. É a sua parte." },
      { n: 3, t: "O cliente vai à loja", d: "Vê o carro, faz test drive, negocia com o vendedor. O gerente confirma a visita." },
      { n: 4, t: "Pagamento e documentos", d: "À vista, financiado, consórcio ou com o carro usado na troca. Contrato assinado de forma digital." },
      { n: 5, t: "Retirada com vistoria", d: "Retirada no pátio onde o carro está, com checklist de vistoria feito junto com o cliente." }
    ],
    diferenciais: [
      { ic: "🔍", t: "Quilometragem real verificada", d: "Todos os carros passam por testes antifraude de quilometragem.", f: "Site oficial" },
      { ic: "📋", t: "Garantia de procedência", d: "Carros selecionados, com procedência garantida e revisões em dia.", f: "Site oficial" },
      { ic: "🛡️", t: "Garantia legal de 3 meses", d: "O carro já sai da loja com 3 meses de garantia.", f: "Site oficial" },
      { ic: "➕", t: "Garantia Mais: até 12 meses", d: "Opcional: soma 9 meses aos 3 da garantia legal. Cobre motor, câmbio, freios, ar-condicionado, direção, parte elétrica e tração. Vale para carros com até 5 anos de fabricação e 80 mil km, e uso particular. O site mostra R$ 799 em uma página e R$ 899 em outra: não cite valor sem conferir com a loja.", f: "Site oficial" },
      { ic: "🔁", t: "Troca com Troco", d: "O cliente dá o usado na troca, com a “melhor avaliação do mercado” (palavras do site) e ainda pode sair com dinheiro no bolso.", f: "Site oficial" },
      { ic: "⚡", t: "Pix: retirada no mesmo dia", d: "Pagando com Pix, dá para retirar o carro no mesmo dia.", f: "Site oficial" },
      { ic: "✍️", t: "Contrato 100% digital", d: "Assinaturas do contrato e da documentação são feitas online.", f: "Site oficial" },
      { ic: "🧰", t: "Serviços junto da compra", d: "Simulador de financiamento, consórcio (Unidas Consórcio), seguro, despachante e pós-venda (0800 772 0997).", f: "Site oficial" }
    ],
    pagamento: [
      { t: "À vista", d: "Pix, boleto, cartão de débito, cartão de crédito ou TED. Boleto e QR Code do Pix valem 3 dias corridos." },
      { t: "Financiamento", d: "Bancos e financeiras parceiros. A entrada pode ser parcelada em até 12x sem juros e o restante em até 72x (condições do site; a aprovação é do banco)." },
      { t: "Consórcio", d: "Unidas Consórcio: carta de crédito, parcelas mensais e contemplação por sorteio ou lance. O crédito compra o seminovo à vista na Unidas." },
      { t: "Carro na troca", d: "O usado entra como parte do pagamento ou da entrada. A avaliação final é feita na loja." }
    ],
    documentos: [
      "Assinatura digital do contrato e da documentação.",
      "O CRV (documento do carro) é enviado ao endereço escolhido pelo cliente, em até 13 dias úteis.",
      "A transferência é feita pelo cliente com um despachante de confiança (a Unidas também oferece o serviço de despachante).",
      "Na retirada, o carro passa por um checklist de vistoria na presença do cliente."
    ],
    promo: "Campanhas mudam toda semana. Em nov/2026, por exemplo, a Esquenta Black Friday trouxe “IPVA 2027 grátis” e bônus de até R$ 12 mil em alguns modelos. Antes de citar qualquer promoção, confira a página Promoções do site ou pergunte ao gerente."
  },

  /* ---------- 03 · entenda de carro ---------- */
  glossario: [
    { t: "KM (quilometragem)", d: "Quantos quilômetros o carro já rodou. Para carro de passeio, a média é de 10 a 15 mil km por ano. Muito acima disso, o desgaste é maior.", dica: "Pergunte sempre a KM do carro de troca: ela pesa muito na avaliação." },
    { t: "Ano de fabricação x ano do modelo", d: "Fabricação é quando o carro saiu da fábrica. Modelo é a linha a que ele pertence. Um carro 2023/2024 foi feito em 2023 e é da linha 2024.", dica: "Confira os dois anos. O cliente costuma falar só um." },
    { t: "Versão", d: "O “nível” do carro dentro do mesmo modelo (ex.: Drive, Comfortline, Limited). Muda equipamentos, motor e preço.", dica: "Dois Onix do mesmo ano podem valer valores bem diferentes por causa da versão." },
    { t: "Câmbio manual x automático", d: "Manual tem pedal de embreagem e marchas. Automático troca sozinho e é mais confortável no trânsito.", dica: "Pergunte qual o cliente prefere: muda a lista de carros." },
    { t: "Flex", d: "Motor que roda com gasolina, etanol ou mistura dos dois.", dica: "Quase todos os carros da loja são flex." },
    { t: "Placa e final de placa", d: "Identifica o carro. O final (último número) define o mês do licenciamento e do rodízio em algumas cidades.", dica: "Peça a placa do carro de troca: é por ela que a loja consulta o histórico." },
    { t: "Renavam", d: "Número de registro do carro no Detran. Fica no documento (CRLV).", dica: "Na loja, o cliente leva o documento do carro de troca." },
    { t: "CRLV e CRV", d: "CRLV é o documento do carro que o dono guarda (licenciamento). CRV é o certificado de registro, usado para transferir a propriedade.", dica: "Na compra, o CRV é enviado ao cliente para fazer a transferência." },
    { t: "Tabela FIPE", d: "Preço de referência de mercado para carros usados, publicado todo mês. O preço de venda pode ficar acima ou abaixo dela.", dica: "Não prometa avaliar o usado pela FIPE: a avaliação é na loja." },
    { t: "Repintura", d: "Quando uma parte da lataria foi pintada de novo (por amassado, arranhão ou batida). Repintura pequena é comum; muita repintura pode indicar batida.", dica: "Pergunte: “Já teve batida ou pintura em alguma peça?”" },
    { t: "Sinistro", d: "Acidente com dano relevante ou perda parcial/total. Carro com histórico de sinistro vale menos.", dica: "Não afirme que o carro do cliente “nunca bateu”. Registre o que ele disser." },
    { t: "Leilão e remarcação", d: "Carros de leilão costumam ter histórico de sinistro ou de seguro. Remarcação é quando o chassi foi alterado de forma irregular.", dica: "A Unidas só vende carros com procedência garantida." },
    { t: "Procedência", d: "A origem e o histórico do carro: de onde veio, quem usou, se há ocorrências.", dica: "É o grande argumento da Unidas: muitos carros vieram da própria frota." },
    { t: "Revisões em dia", d: "Manutenção feita nos prazos do fabricante (ex.: a cada 10 mil km ou 12 meses). Carro com revisões em dia vale mais.", dica: "Pergunte se o carro de troca tem as revisões na concessionária." },
    { t: "Pneus", d: "Pneu gasto, ressecado ou de marcas diferentes entre si reduz o valor de avaliação e a segurança.", dica: "Pergunte: “Os pneus estão novos, meia-vida ou já precisam trocar?”" },
    { t: "Alienado", d: "Carro financiado que ainda não foi quitado: o banco é o dono no documento até o fim das parcelas.", dica: "Se o carro de troca é financiado, peça o saldo devedor aproximado." },
    { t: "Quitado", d: "Carro 100% pago, sem dívida com banco.", dica: "Carro quitado facilita a troca." },
    { t: "Entrada", d: "Valor pago de início em uma compra financiada. Pode ser em dinheiro ou o carro usado.", dica: "Quanto maior a entrada, menor a parcela e maiores as chances de aprovação." },
    { t: "Parcela e prazo", d: "Parcela é o valor mensal do financiamento; prazo, o número de meses (aqui, até 72x).", dica: "Prazo maior = parcela menor, mas paga-se mais juros no total." },
    { t: "Aprovação de crédito", d: "Análise do banco sobre se o cliente pode financiar. Depende de renda, histórico e score.", dica: "Você nunca garante aprovação. Diga: “O banco faz a análise na loja”." },
    { t: "Test drive", d: "Volta rápida com o carro para o cliente sentir como ele anda.", dica: "Convide para a visita: “E você já faz o test drive.”" },
    { t: "Laudo e vistoria", d: "Documento ou checklist que mostra a condição do carro. Na retirada, a Unidas faz um checklist com o cliente presente.", dica: "Use para passar segurança." },
    { t: "Outlet / Quase novo / Menor KM", d: "Três vitrines da Unidas Seminovos: oportunidade de preço, poucos meses de uso e baixa quilometragem.", dica: "Pergunte o que pesa mais para o cliente e use a vitrine certa." },
    { t: "Despachante", d: "Profissional que cuida da papelada de transferência do carro no Detran.", dica: "A Unidas oferece o serviço: o cliente decide se quer." }
  ],

  segmentos: [
    { t: "Hatch compacto", ex: "Mobi, Argo, Onix, HB20, Polo", p: "Primeiro carro, uso na cidade, quem quer economia.", q: "Quantas pessoas andam no carro? Uso mais na cidade ou na estrada?" },
    { t: "Sedã", ex: "Cronos, Virtus, HB20S, Onix Plus, Corolla", p: "Quem precisa de porta-malas grande, motoristas de aplicativo, famílias.", q: "Precisa de espaço para mala? Vai usar para trabalho?" },
    { t: "SUV compacto", ex: "Pulse, T-Cross, Nivus, Creta, Tracker", p: "Posição de dirigir mais alta, conforto e visual. Muito procurado.", q: "Prefere dirigir mais alto? Tem criança, cadeirinha?" },
    { t: "SUV médio", ex: "Corolla Cross, Compass, Renegade", p: "Quem quer mais espaço, conforto em viagem e status.", q: "Costuma viajar? Qual o orçamento?" },
    { t: "Picape", ex: "Strada, Toro, Saveiro, Ranger", p: "Trabalho, carga, quem mora em sítio ou área rural.", q: "Vai carregar peso? Precisa de cabine dupla?" },
    { t: "Utilitário", ex: "Fiorino, Kangoo", p: "Pequenas empresas, entregas, autônomos.", q: "É para a empresa? Qual carga?" }
  ],
  perfis: [
    { ic: "🧑‍🎓", t: "Primeiro carro", q: "Foco na parcela e na segurança. Oriente para o carro simples e confiável." },
    { ic: "👨‍👩‍👧", t: "Família", q: "Espaço, porta-malas, segurança e conforto. Pergunte quantas pessoas andam no carro." },
    { ic: "🚖", t: "Motorista de aplicativo", q: "Economia, câmbio, ar-condicionado e documentos em dia. Pergunte quantos km por mês." },
    { ic: "🔁", t: "Quem quer trocar", q: "Quer sentir ganho: mais espaço, câmbio automático, menos KM. O carro de troca é o centro da conversa." },
    { ic: "💼", t: "Autônomo ou empresa", q: "Pergunte se é no CPF ou no CNPJ. A loja orienta documentos e forma de pagamento." }
  ],

  /* ---------- 04 · fluxo ideal ---------- */
  fluxo: [
    { ic: "📥", t: "O lead cai", tag: "Blip ou Ficha Única", d: "Assim que o lead aparecer no Blip ou no Ficha Única, o relógio começa. Abra, leia o carro de interesse e o histórico em 30 segundos.", sla: "Primeira tentativa em até 5 min" },
    { ic: "📞", t: "Ligue primeiro", tag: "Ligação", d: "A primeira ação é sempre ligar. Voz transmite confiança e acelera a qualificação. Deixe tocar até cair na caixa.", sla: "Duas tentativas seguidas" },
    { ic: "💬", t: "Não atendeu? WhatsApp", tag: "Blip", d: "Mande a mensagem de primeiro contato (modelo no capítulo de scripts) e volte a ligar mais tarde, em horário diferente.", sla: "Nova ligação em outro horário" },
    { ic: "✅", t: "Qualifique tudo", tag: "Telefone", d: "Valide todos os critérios: carro, pagamento, carro de troca e prazo. Continue tentando falar por telefone até validar tudo.", sla: "Nenhum campo em branco" },
    { ic: "💰", t: "Informe o valor", tag: "Ficha Única", d: "Passe ao cliente o valor do carro que ele quer. O preço já está tabelado no Ficha Única.", sla: "Valor sempre da tabela" },
    { ic: "📅", t: "Agende a visita", tag: "Telefone", d: "Feche dia e hora com o cliente (escolha entre duas opções). Confirme a loja e o que levar.", sla: "Data e hora fechadas" },
    { ic: "👥", t: "Avise o gerente", tag: "Grupo do WhatsApp", d: "Poste no grupo da loja a mensagem padrão com ícones: cliente, carro, pagamento, troca, dia e hora.", sla: "Mesmo dia do agendamento" },
    { ic: "🔔", t: "Anti no-show BLU", tag: "Ligação e mensagem", d: "Até o dia da visita, mantenha o cliente aquecido: 3 dias antes ligar, 2 dias antes mensagem, 1 dia antes ligar e no dia uma mensagem.", sla: "D-3 · D-2 · D-1 · D0" },
    { ic: "✔️", t: "Confirme com o gerente", tag: "Grupo do WhatsApp", d: "Depois da visita, pergunte ao gerente se o cliente de fato foi à loja. Só a confirmação dele valida a visita.", sla: "No mesmo dia ou no dia seguinte" },
    { ic: "🏆", t: "Visita realizada = comissão", tag: "Resultado", d: "Cada visita realizada e confirmada rende a comissão de R$ 60 e entra no cálculo do seu custo por visita.", sla: "R$ 60 por visita" }
  ],

  /* ---------- 05 · ferramentas ---------- */
  ferramentas: [
    {
      id: "ficha", nome: "Ficha Única", ic: "🗂️",
      oque: "Sistema onde o lead está cadastrado: dados do cliente, carro de interesse, valor tabelado e histórico de atendimento. É o seu “prontuário” do lead.",
      quando: "Em toda ligação e em todo agendamento. É o lugar do registro oficial.",
      mock: "ficha",
      passos: [
        { t: "Entre no sistema", d: "Acesse o Ficha Única com o login que a Unidas liberou para você. Use o e-mail com domínio Unidas, o mesmo do seu acesso.", hl: "topo" },
        { t: "Confira a sua unidade (loja)", d: "No topo, veja se a unidade está correta. Se você não consegue trocar de unidade ou ela aparece errada, o seu perfil está alocado na loja errada: abra um chamado com o print e o número do chamado, e avise seu gestor.", hl: "unidade" },
        { t: "Busque o lead pelo telefone", d: "Copie o telefone do cliente (no Blip, painel da direita) e cole na busca. Pelo telefone você acha o nome mesmo quando o WhatsApp esconde.", hl: "busca" },
        { t: "“Este lead já existe”? Clique em OK", d: "Se o sistema avisar que o lead já existe, é normal: ele entrou pelo Blip. Clique em OK e siga no mesmo cadastro. Nunca crie um duplicado.", hl: "aviso" },
        { t: "Abra o carro de interesse", d: "Confira modelo, ano, KM, cor, placa e o valor tabelado. É esse valor que você passa ao cliente.", hl: "carro" },
        { t: "Registre a qualificação", d: "Preencha os campos e escreva o histórico: data, hora, se ligou, se falou, o que combinaram e o próximo passo.", hl: "campos" },
        { t: "Agende a visita", d: "Informe dia, hora e loja e salve. Depois avise o gerente no grupo do WhatsApp.", hl: "agenda" }
      ],
      erros: [
        "Criar um lead novo em vez de usar o que já existe.",
        "Esquecer de registrar a tentativa de contato quando o cliente não atende.",
        "Passar valor de memória em vez do valor tabelado."
      ],
      nota: "Os nomes de botões e campos podem mudar com atualizações do sistema. Se algo estiver diferente, pergunte ao seu gestor antes de seguir."
    },
    {
      id: "blip", nome: "Blip (WhatsApp)", ic: "💬",
      oque: "Plataforma onde o cliente escreve pelo WhatsApp e você atende em fila. Para o cliente, é uma conversa normal no WhatsApp dele; para você, é uma plataforma de tickets.",
      quando: "Sempre que o cliente chamar ou quando você precisar escrever depois de uma ligação sem resposta.",
      mock: "blip",
      passos: [
        { t: "Entre com o acesso que a Unidas liberou", d: "Se a plataforma não mostrar você como ativo, avise o time da Unidas: às vezes é preciso recriar o usuário. Aperte F5 depois de ajustado.", hl: "topo" },
        { t: "Fique online para receber tickets", d: "O status online é o que faz o lead cair para você. Há também invisível e ocupado. Na hora do almoço ou de uma pausa, coloque invisível para não cair ticket.", hl: "status" },
        { t: "Atenção ao tempo ocioso", d: "Se a tela ficar parada, depois de cerca de 30 minutos ela pode te deixar offline. Volte a ficar online ao retomar.", hl: "status" },
        { t: "O ticket chega", d: "Abra o ticket e leia: histórico da conversa, carro de interesse e a loja. No painel lateral estão os dados do cliente.", hl: "ticket" },
        { t: "Converse com o cliente", d: "Responda no painel central. Dá para usar emojis, mandar áudio e deixar comentário interno (visível só para a equipe) ao lado.", hl: "chat" },
        { t: "Número escondido? Use o painel", d: "Às vezes o nome não aparece porque o cliente tem privacidade ativa. Pegue o telefone e o e-mail do painel e busque no Ficha Única.", hl: "painel" },
        { t: "Finalize o atendimento", d: "Ao terminar (agendou ou se despediu), clique no botão azul Finalizar. Isso libera a fila para novos tickets. Sem finalizar, você trava o seu fluxo.", hl: "finalizar" }
      ],
      erros: [
        "Esquecer de finalizar o ticket e ficar sem receber novos leads.",
        "Ficar online na hora do almoço e deixar lead sem resposta.",
        "Responder no Blip e não registrar nada no Ficha Única."
      ],
      nota: "A quantidade de tickets simultâneos é definida pela Unidas (começa em 4 ou 5 e pode ser ajustada). Se só você estiver online, vão cair vários: finalize assim que se despedir."
    },
    {
      id: "ligacao", nome: "Ligação", ic: "📞",
      oque: "O discador (Contact Center) com o qual você liga para o cliente. Toda a conversa começa aqui, antes do WhatsApp.",
      quando: "Em todo lead novo, no anti no-show e para validar o que faltou.",
      mock: "ligacao",
      passos: [
        { t: "Faça o login no Contact Center", d: "Use o acesso enviado pela Unidas. Se der erro, mande mensagem para quem liberou o acesso e avise seu gestor.", hl: "topo" },
        { t: "Teste antes de começar", d: "Ligue para o seu próprio celular e veja o áudio dos dois lados. Se o áudio estiver baixo, ajuste o microfone e o fone antes de ligar para clientes.", hl: "teste" },
        { t: "Abra o lead no Ficha Única", d: "Deixe o carro de interesse na tela. Você precisa dos dados para fazer perguntas certas.", hl: "numero" },
        { t: "Disque com DDD", d: "Digite o número completo com DDD e clique para ligar. Deixe tocar até cair na caixa postal.", hl: "numero" },
        { t: "Conduza o script", d: "Siga o script de ligação (capítulo 7). Você pode ter a conversa gravada: fale sempre de forma profissional e honesta.", hl: "chamada" },
        { t: "Encerrou? Registre", d: "Anote no Ficha Única o resultado: atendeu, não atendeu, o que ficou combinado e a data da próxima ação.", hl: "registro" }
      ],
      erros: [
        "Ligar sem abrir o carro de interesse do lead.",
        "Desistir na primeira tentativa. Tente de novo em outro horário.",
        "Não registrar a tentativa depois de ligar."
      ],
      nota: "Ambiente tranquilo, fone com microfone e voz sorrindo: a ligação é o seu principal instrumento de trabalho."
    }
  ],
  suporte: "Problemas de acesso (unidade errada, usuário inativo, erro de login) são resolvidos por chamado aberto com a Unidas. Mande o número do chamado ao seu gestor e acompanhe pelo grupo.",

  /* ---------- 06 · qualificação ---------- */
  qualificacao: {
    intro: "Lead pronto é o lead que chega à loja com tudo alinhado. Quanto mais completa a ficha, menos tempo o vendedor perde e mais chance de a visita virar venda.",
    blocos: [
      { id: "carro", t: "1 · O carro que ele quer", ic: "🚗", campos: [
        { id: "modelo", l: "Modelo e versão", q: "Qual carro e qual versão você viu?", req: true },
        { id: "ano", l: "Ano (fabricação/modelo)", q: "Confirmo: é ano ____ / ____?", req: true },
        { id: "km", l: "KM", q: "Ele está com ____ mil km, certo?", req: true },
        { id: "cor", l: "Cor", q: "Era na cor ____ mesmo?", req: true },
        { id: "placa", l: "Placa (final)", q: "A placa que está no anúncio termina em ____?", req: true }
      ]},
      { id: "motivo", t: "2 · Por que esse carro", ic: "🎯", campos: [
        { id: "porque", l: "Motivo da escolha", q: "O que te fez escolher esse carro em específico?", req: true },
        { id: "uso", l: "Uso e quem vai dirigir", q: "Vai usar mais na cidade ou na estrada? Quem mais vai dirigir?", req: false }
      ]},
      { id: "prazo", t: "3 · Prazo de compra", ic: "⏳", campos: [
        { id: "quando", l: "Quando pretende comprar", q: "Para quando você quer estar com o carro?", req: true }
      ]},
      { id: "pgto", t: "4 · Forma de pagamento", ic: "💳", campos: [
        { id: "forma", l: "À vista ou financiado", q: "Pretende pagar à vista ou financiar?", req: true },
        { id: "entrada", l: "Entrada (se financiar)", q: "Quanto pretende dar de entrada? E em quantas parcelas quer pagar o restante?", req: false },
        { id: "cpf", l: "Quem vai financiar", q: "O financiamento seria no seu CPF? Já fez simulação em algum banco?", req: false }
      ]},
      { id: "troca", t: "5 · Carro de troca (se tiver)", ic: "🔁", campos: [
        { id: "tmodelo", l: "Marca, modelo e versão", q: "Qual é o seu carro hoje?", req: false },
        { id: "tano", l: "Ano (fabricação/modelo)", q: "De que ano?", req: false },
        { id: "tkm", l: "KM", q: "Quantos km ele tem hoje?", req: false },
        { id: "tcor", l: "Cor", q: "Qual a cor?", req: false },
        { id: "tplaca", l: "Placa", q: "Pode me passar a placa para a loja já consultar o histórico?", req: false },
        { id: "tpneus", l: "Estado dos pneus", q: "Como estão os pneus: novos, meia-vida ou a trocar?", req: false },
        { id: "trepintura", l: "Repintura ou batida", q: "Ele já teve alguma batida ou pintura em alguma peça?", req: false },
        { id: "trevisoes", l: "Revisões em dia", q: "As revisões estão em dia? Foram em concessionária?", req: false },
        { id: "tfin", l: "Está quitado?", q: "O carro é quitado ou ainda tem financiamento?", req: false },
        { id: "texpect", l: "Quanto quer receber", q: "Qual valor você espera receber pelo seu carro?", req: false },
        { id: "tneg", l: "Ideia de negociação", q: "Como você imagina fechar: o seu carro cobre a entrada? Pensa em dinheiro de volta ou em diferença a pagar?", req: false }
      ]},
      { id: "valor", t: "6 · Valor do carro e visita", ic: "💰", campos: [
        { id: "valorinf", l: "Valor informado (tabela)", q: "O valor dele hoje é R$ ____. Isso cabe no que você imaginou?", req: true },
        { id: "visita", l: "Dia e hora da visita", q: "Consigo te encaixar quinta às ____ ou sexta às ____. Qual é melhor?", req: true }
      ]}
    ],
    prontoSe: [
      "Carro de interesse confirmado (modelo, ano, KM, cor e placa).",
      "Motivo da escolha e prazo de compra entendidos.",
      "Forma de pagamento clara (à vista ou financiado, com entrada).",
      "Se tem carro de troca: dados completos e expectativa de valor.",
      "Valor da tabela informado e aceito como ponto de partida.",
      "Dia e hora da visita combinados, com o cliente ciente do que levar."
    ],
    naoPronto: [
      "“Só estou pesquisando” sem prazo nem carro definido: nutra, mas não agende.",
      "Cliente que não sabe como pretende pagar: ajude a se decidir antes de mandar para a loja.",
      "Carro de interesse que já foi vendido: ofereça alternativas antes de agendar."
    ],
    levar: [
      "Documento com foto (RG ou CNH).",
      "Comprovante de residência recente.",
      "Documento do carro de troca (CRLV) e chave reserva, se for dar o usado.",
      "Comprovante de renda, se for financiar."
    ],
    levarNota: "Lista padrão de mercado. Confirme com o gerente da loja se há exigências diferentes."
  },

  /* ---------- 07 · scripts ---------- */
  scripts: {
    ligacao: [
      { n: 1, t: "Abertura", seg: "0–20 s", fala: "Oi, [Nome], tudo bem? Aqui é a [Seu nome], da Unidas Seminovos. Vi que você pediu informações sobre o [Modelo] [Ano]. Posso falar rapidinho com você? Levo uns 3 minutinhos.", dica: "Sorria ao falar. Diga o nome do carro: isso mostra que você sabe do que se trata.", se: "Se está ocupado: “Sem problema! Qual o melhor horário para eu te ligar de volta hoje?” e anote." },
      { n: 2, t: "Confirme o interesse", seg: "20–40 s", fala: "Esse carro ainda faz sentido para você, ou você já está de olho em outro também?", dica: "Se ele já viu outros, anote quais: é o mapa da concorrência.", se: "Se o carro foi vendido: “Esse saiu, mas tenho opções parecidas. Posso te mostrar?” e vá para o passo 3." },
      { n: 3, t: "Confira o carro (modelo, ano, cor, KM e placa)", seg: "40 s–1 min", fala: "Só para eu separar o carro certo: é o [Modelo], ano [__/__], cor [__], com [__] mil km, placa final [__]. É esse?", dica: "Leia os dados do Ficha Única. Se o cliente falar outro carro, corrija o cadastro." },
      { n: 4, t: "Entenda o motivo", seg: "1–2 min", fala: "Me conta: o que te chamou atenção nesse carro? É para uso do dia a dia, para a família, para trabalho?", dica: "Ouça mais do que fala. A resposta vira argumento depois (“como você falou que precisa de espaço…”)." },
      { n: 5, t: "Prazo de compra", seg: "2 min", fala: "E para quando você pretende estar com o carro?", dica: "Imediato, até 15 dias e “estou só vendo” são três perfis diferentes.", se: "Se disser “só olhando”: “Perfeito! Para eu te ajudar certo: se tudo se encaixar, em quanto tempo você fecharia?”" },
      { n: 6, t: "Forma de pagamento", seg: "2–3 min", fala: "Como você pretende pagar: à vista, financiado ou vai dar um carro na troca?", dica: "Se financiado: pergunte entrada, prazo e se já simulou. Não prometa aprovação." },
      { n: 7, t: "Carro de troca (se tiver)", seg: "3–5 min", fala: "Qual é o seu carro hoje? Me passa modelo, ano, cor, placa e KM. Como estão os pneus? Já teve batida ou pintura? As revisões estão em dia? Quanto você pensa em receber por ele?", dica: "Use a lista completa do capítulo 6. A loja faz a avaliação final: você só alinha expectativa.", se: "Se ele pedir valor: “A avaliação oficial é na loja, com o carro na frente do avaliador. Eu já levo todas as informações para agilizar.”" },
      { n: 8, t: "Passe o valor", seg: "5 min", fala: "O [Modelo] está hoje em R$ [valor da tabela]. Esse valor é uma boa base para você?", dica: "Sempre o valor que está no Ficha Única. Não arredonde nem “dê desconto”.", se: "Se achar caro: vá ao contorno de objeções (capítulo 8). Mantenha-se na loja como solução." },
      { n: 9, t: "Convide para a visita", seg: "5–6 min", fala: "Para te passar as condições certinhas e você ver o carro de perto e fazer o test drive, o ideal é passar na loja. Consigo te encaixar na [quinta, às 10h] ou na [sexta, às 16h]. Qual é melhor?", dica: "Sempre duas opções (escolha dirigida). Nunca “quando você puder”." },
      { n: 10, t: "Confirme e feche", seg: "6–7 min", fala: "Combinado, [Nome]! Fica agendado para [dia] às [hora] na loja [bairro/endereço]. Leve um documento com foto [e o documento do seu carro, se for trocar]. Vou te mandar um WhatsApp com tudo e te aviso antes. Ficou alguma dúvida?", dica: "Repita dia, hora e loja. Peça para ele salvar o seu contato." }
    ],
    primeiroZap: [
      { t: "Primeiro contato (não atendeu)", msg: "Oi, [Nome], tudo bem? Aqui é a [Seu nome], da Unidas Seminovos 🚗\nTentei te ligar agora sobre o [Modelo] [Ano] que você viu no nosso site. Posso te ligar em outro momento? Me diz qual o melhor horário." },
      { t: "Segunda tentativa (2h depois)", msg: "[Nome], passando para te avisar que o [Modelo] [Ano] ainda está disponível ✅\nSe preferir, me conta por aqui: você pretende pagar à vista, financiar ou dar um carro na troca? Assim já adianto as condições para você." },
      { t: "Terceira tentativa (dia seguinte)", msg: "Bom dia, [Nome]! ☀️ Vou te ligar rapidinho sobre o [Modelo]. Se preferir que eu escreva, me responde por aqui. Esse modelo costuma sair rápido." },
      { t: "Pedir os dados do carro de troca", msg: "Perfeito, [Nome]! Para a loja já deixar a avaliação do seu carro adiantada, me manda por favor:\n• Modelo e versão\n• Ano\n• Cor\n• Placa\n• KM atual\n• Como estão os pneus\n• Se já teve batida ou pintura\n• Se as revisões estão em dia\n• Quanto você espera receber 😉" },
      { t: "Confirmação do agendamento", msg: "Agendado, [Nome]! ✅\n📅 [Dia], às [Hora]\n📍 Unidas Seminovos [Loja] — [Endereço]\n🚗 [Modelo] [Ano]\nLeve um documento com foto [e o documento do carro de troca]. Qualquer imprevisto, me avisa por aqui." },
      { t: "Último contato (lead sem retorno)", msg: "[Nome], não consegui falar com você nos últimos dias. Vou deixar o seu contato anotado. Se ainda quiser ver o [Modelo], é só me chamar por aqui que eu retomo na hora 🙂" }
    ],
    grupo: {
      titulo: "Mensagem padrão para o gerente (grupo do WhatsApp)",
      tpl: "🚗 *NOVA VISITA AGENDADA*\n👤 *Cliente:* [Nome]\n📞 *Telefone:* [DDD + número]\n📅 *Dia e hora:* [Dia, dd/mm] às [hh:mm]\n🏬 *Loja:* [Loja]\n🎯 *Interesse:* [Modelo, ano, KM, cor, placa]\n💰 *Valor informado:* R$ [valor tabela]\n💳 *Pagamento:* [À vista / Financiado, entrada R$ ___]\n🔁 *Troca:* [Não / Sim: modelo, ano, KM, placa, cor]\n💵 *Espera receber:* R$ [valor]\n⏳ *Prazo de compra:* [quando]\n📝 *Obs.:* [pneus, repintura, revisões, outros]\n🙋 *SDR:* [Seu nome]",
      confirma: "✔️ Gerente, o cliente [Nome] ([Modelo]) agendado para [dia/hora] compareceu à loja? Responda com “foi” ou “não foi” para eu registrar a visita 🙏",
      regras: [
        "Uma mensagem por visita, no grupo da loja correta.",
        "Mensagem completa: sem campo vazio. Se não tem a informação, escreva “não informado”.",
        "Poste no mesmo dia do agendamento.",
        "Depois da visita, peça a confirmação ao gerente. Sem “foi”, a visita não conta."
      ]
    },
    noshow: [
      { d: -3, tipo: "ligar", ic: "📞", t: "3 dias antes: ligue", fala: "Oi, [Nome], aqui é a [Seu nome], da Unidas Seminovos! Estou te ligando para confirmar a sua visita na [dia] às [hora] para ver o [Modelo]. Tudo certo para você?", dica: "Reforce o motivo da visita (o carro, o test drive). Tire dúvidas e remarque aqui mesmo se precisar." },
      { d: -2, tipo: "msg", ic: "💬", t: "2 dias antes: mensagem", msg: "Oi, [Nome]! 🚗 Passando para lembrar da sua visita na Unidas Seminovos, [dia] às [hora], na loja [Loja]. O [Modelo] está te esperando! Confirma para mim com um “ok”? 😉", dica: "Pergunte se ele tem alguma dúvida do carro." },
      { d: -1, tipo: "ligar", ic: "📞", t: "1 dia antes: ligue", fala: "[Nome], aqui é a [Seu nome]! Ligando para confirmar a sua visita de amanhã às [hora] na [Loja]. Já separei o carro para você. Você vai conseguir ir?", dica: "Se ele hesitar, pergunte o que atrapalha e ofereça outro horário. Melhor remarcar do que perder." },
      { d: 0, tipo: "msg", ic: "💬", t: "No dia: mensagem", msg: "Bom dia, [Nome]! ☀️ Hoje é o dia! Te espero na Unidas Seminovos [Loja] às [hora]. Endereço: [endereço]. Me avisa quando estiver chegando? O gerente já está avisado 👍", dica: "Avise o gerente de manhã com o nome, o carro e o horário." }
    ],
    noshowRegra: "Se o cliente avisar que não pode ir, não aceite “depois eu vejo”. Ofereça duas novas datas e remarque na hora. Remarcar é visita preservada."
  },

  /* ---------- 08 · contorno de objeções ---------- */
  objecoes: [
    { cat: "Preço", q: "“Está caro.”", por: "Ele compara com anúncios de outros lugares ou quer negociar.", r: "Entendo, [Nome]. Esse valor é o da tabela e já inclui carro com procedência, quilometragem verificada e garantia. O melhor jeito de ver se faz sentido é você conhecer o carro de perto. Na loja, o vendedor vai te apresentar as condições, inclusive a avaliação do seu usado. Consigo te encaixar na [dia] às [hora]?", nao: "Prometer desconto ou dizer “dá para negociar”." },
    { cat: "Preço", q: "“Vi mais barato em outro site.”", por: "Compara só preço, sem comparar o que vem junto.", r: "Faz sentido comparar. Só vale conferir se o outro carro tem procedência, quilometragem verificada e garantia, porque preço baixo sem isso costuma sair caro. Aqui o carro tem quilometragem real verificada e garantia legal de 3 meses, com opção de estender. Me conta qual carro você viu? Eu comparo com você.", nao: "Falar mal do concorrente." },
    { cat: "Preço", q: "“Qual é o menor preço? Faz por quanto?”", por: "Quer um número para decidir sem sair de casa.", r: "O valor de tabela é R$ [valor]. As condições finais (entrada, avaliação do seu carro, financiamento) quem fecha é o vendedor, com o carro na frente. Para você não perder a oportunidade, vamos deixar agendado?", nao: "Inventar valor ou dizer que “vai dar um jeito”." },
    { cat: "Preço", q: "“Tem alguma promoção?”", por: "Quer pagar menos ou ganhar algo.", r: "Temos campanhas que mudam toda semana e dependem do carro. Vou verificar o que está valendo hoje para o [Modelo] e já te falo. O vendedor na loja confirma tudo no ato.", nao: "Citar promoção sem checar a página Promoções." },
    { cat: "Confiança", q: "“Não sei se posso confiar em carro usado.”", por: "Já ouviu histórias ruins de revendas.", r: "Faz todo sentido ter cuidado. Por isso aqui os carros têm procedência garantida, com a quilometragem verificada por testes antifraude, e saem com garantia legal de 3 meses. Na retirada, é feito um checklist de vistoria com você junto. Você pode conferir tudo pessoalmente na loja.", nao: "Garantir “carro perfeito”. Diga o que a Unidas garante." },
    { cat: "Confiança", q: "“O carro já bateu?”", por: "Medo de comprar carro com histórico de sinistro.", r: "Os carros vendidos passam por seleção de procedência. O histórico detalhado desse [Modelo] eu consigo te mostrar na loja, junto com o vendedor. Quer que eu peça para o gerente deixar o histórico separado para você?", nao: "Afirmar que “nunca bateu” sem ter o documento." },
    { cat: "Confiança", q: "“E se der problema depois que eu comprar?”", por: "Quer segurança pós-compra.", r: "O carro sai com garantia legal de 3 meses. E existe a Garantia Mais, opcional, que estende a cobertura para até 12 meses para motor, câmbio, freios, ar-condicionado, direção e parte elétrica. O vendedor te explica as regras na loja.", nao: "Citar o preço da Garantia Mais sem conferir (o site mostra valores diferentes)." },
    { cat: "Confiança", q: "“Não conheço a Unidas Seminovos.”", por: "Associa Unidas só ao aluguel.", r: "A Unidas é uma das maiores empresas de aluguel de carros do país, com mais de 50 anos de mercado e mais de 240 lojas somando aluguel e seminovos. Muitos dos nossos seminovos vieram da própria frota, com manutenção em dia. É uma empresa grande, com reputação para cuidar.", nao: "Exagerar números. Use os que estão aqui." },
    { cat: "Financiamento", q: "“Não tenho a entrada toda agora.”", por: "Entrada alta assusta.", r: "Tudo bem! A entrada pode ser parcelada em até 12 vezes sem juros e o restante em até 72 vezes. Quanto você consegue dar de entrada hoje, mesmo que seja menos? Se tiver um carro para dar na troca, ele pode ajudar na entrada.", nao: "Garantir aprovação do banco." },
    { cat: "Financiamento", q: "“Meu nome está sujo / já fui negado.”", por: "Teme o crédito negado.", r: "Obrigada por me contar, é importante para eu te ajudar. A análise de crédito é do banco, e na loja trabalhamos com vários bancos parceiros, o que aumenta as chances. Dar um carro na troca ou uma entrada maior também ajuda. Vamos agendar para você conversar com o vendedor, sem compromisso?", nao: "Prometer que “passa” ou que “dá um jeito”." },
    { cat: "Financiamento", q: "“Qual a taxa de juros?”", por: "Quer comparar.", r: "A taxa depende do banco, do prazo e do seu perfil, e é calculada na hora com os seus dados. Na loja o vendedor simula com vários bancos para você escolher a melhor. Quer deixar a visita marcada para fazermos essa simulação?", nao: "Citar taxa de cabeça." },
    { cat: "Financiamento", q: "“Prefiro consórcio.”", por: "Quer parcelas menores e sem juros.", r: "A Unidas tem o Unidas Consórcio: você escolhe a carta de crédito e a parcela, participa das assembleias e, quando contemplado, usa o crédito para comprar o seminovo à vista. Se quiser comprar agora, o financiamento é mais rápido. Posso te orientar nos dois caminhos na visita.", nao: "Prometer data de contemplação." },
    { cat: "Troca", q: "“Quanto vocês pagam no meu carro?”", por: "Quer saber o valor antes de ir.", r: "A avaliação precisa ser feita presencialmente, com o carro na frente do avaliador. Para você não ir à toa, me conta as informações dele (ano, KM, pneus, revisões, se teve batida ou pintura). Eu levo tudo para a loja agilizar. Quanto você espera receber por ele?", nao: "Dar valor, faixa de valor ou comparar com a FIPE." },
    { cat: "Troca", q: "“Meu carro vale mais que isso.”", por: "Expectativa acima do mercado.", r: "Entendo, a gente quer sempre o melhor valor. A Unidas Seminovos divulga que oferece a melhor avaliação do mercado. O avaliador vai olhar o carro em detalhe, e você ainda pode ter a Troca com Troco. Vale ir ver? Se não gostar, você decide com calma.", nao: "Discutir valor ou prometer “vai conseguir mais”." },
    { cat: "Troca", q: "“Meu carro ainda está financiado.”", por: "Acha que não pode trocar.", r: "Dá para trocar, sim. Para a loja já preparar, me diz o banco e o saldo devedor aproximado. A loja cuida do processo com você.", nao: "Dizer que “é fácil” sem saber o saldo." },
    { cat: "Tempo e logística", q: "“Não tenho tempo de ir à loja.”", por: "Agenda cheia ou preguiça.", r: "Eu entendo. Por isso quero te encaixar no horário mais fácil: temos [dia/hora 1] ou [dia/hora 2]. É uma visita rápida, e você já faz o test drive e resolve tudo de uma vez. Qual funciona melhor?", nao: "Aceitar “depois eu vejo”." },
    { cat: "Tempo e logística", q: "“A loja é longe.”", por: "Distância é a objeção real.", r: "Qual cidade ou bairro você está? Vou ver qual é a loja mais próxima. Hoje são mais de 50 lojas pelo país. E se você já tiver o carro aprovado, a retirada é rápida.", nao: "Garantir entrega em casa sem confirmar." },
    { cat: "Tempo e logística", q: "“Vou pensar e te falo.”", por: "Quer terminar a conversa.", r: "Claro! Para eu não te incomodar à toa: o que falta para você decidir? É o valor, a forma de pagar ou ver o carro de perto? Se for isso, a visita resolve de uma vez. Posso te encaixar na [dia]? Se preferir, eu te ligo [dia] para você me dizer.", nao: "Desistir sem entender o motivo real." },
    { cat: "Tempo e logística", q: "“Pode me mandar tudo por WhatsApp?”", por: "Quer evitar falar.", r: "Mando sim! Mas tem muita informação que só dá para ver com o carro e com o vendedor. Vamos fazer assim: me responde duas perguntas rápidas por aqui e eu já te mando as condições e agendo a visita?", nao: "Mandar só textos longos e esperar resposta." },
    { cat: "Decisão", q: "“Preciso falar com minha esposa/marido.”", por: "Decisão conjunta.", r: "Faz sentido decidir juntos. Que tal levar essa pessoa junto para a visita? Aí ela vê o carro também e vocês decidem no mesmo dia. Qual horário funciona para os dois?", nao: "Ignorar. Peça para a outra pessoa participar." },
    { cat: "Decisão", q: "“Estou vendo outros carros também.”", por: "Está pesquisando.", r: "Ótimo, comparar é inteligente. Posso te ajudar a comparar? Me conta quais outros você está vendo. Se quiser, você traz essa lista para a loja e o vendedor mostra as diferenças.", nao: "Criticar o outro carro." },
    { cat: "Decisão", q: "“Só estou olhando.”", por: "Sem urgência.", r: "Tudo bem! Me conta o que você procura em um carro, para eu mostrar o que mais se encaixa. Quando fecharia, se achasse o carro certo? Se for em menos de 30 dias, vale conhecer na loja. Se não, eu mantenho o seu contato e te aviso quando surgir uma oportunidade.", nao: "Agendar visita sem prazo nem intenção." },
    { cat: "Decisão", q: "“O carro que eu queria já foi vendido.”", por: "Perdeu o interesse.", r: "Esse saiu, mas estoque novo chega sempre. Me diz o que você gostou nele (modelo, cor, câmbio, KM), que eu busco opções parecidas na nossa rede de lojas e te mando as melhores.", nao: "Mandar uma lista aleatória. Busque semelhantes." },
    { cat: "Documentos", q: "“Quanto tempo leva a documentação?”", por: "Quer saber o prazo.", r: "O contrato é assinado de forma digital. O documento do carro (CRV) é enviado para o endereço que você escolher, em até 13 dias úteis, e a transferência é feita com um despachante de confiança (a Unidas também oferece esse serviço). Pagando com Pix, dá para retirar o carro no mesmo dia.", nao: "Prometer prazos diferentes dos do site." },
    { cat: "Documentos", q: "“Quem paga o IPVA e a transferência?”", por: "Quer saber custos extras.", r: "Essa parte depende de cada negociação e da campanha do momento. Em nov/2026, por exemplo, teve campanha de IPVA grátis em alguns carros. O vendedor passa os valores certinhos na loja, para você não ter surpresa.", nao: "Afirmar o que está incluso sem confirmar." },
    { cat: "Documentos", q: "“Posso levar o carro para um mecânico de confiança?”", por: "Quer inspeção independente.", r: "Boa ideia, é um cuidado válido. Esse alinhamento é feito na loja. Vou deixar anotado para o gerente já saber. Na retirada, também fazemos um checklist de vistoria com você presente.", nao: "Recusar ou prometer sem consultar a loja." },
    { cat: "Pós-visita", q: "“Fui à loja, mas não gostei do atendimento.”", por: "Experiência ruim.", r: "Sinto muito, [Nome]. Obrigada por me contar. Vou passar isso para o gerente agora mesmo. Me diz o que aconteceu para eu encaminhar certinho e ver como te atender melhor.", nao: "Defender a loja sem ouvir. Registre e avise o gerente." }
  ],

  /* ---------- 09 · argumentação ---------- */
  pitch: {
    c30: "A Unidas é uma das maiores empresas de aluguel de carros do Brasil. A Unidas Seminovos vende os carros que saem da frota e de outras origens selecionadas, com procedência garantida, quilometragem verificada e garantia. Você tem opções de pagamento (à vista, financiamento, consórcio ou o seu carro na troca) e pode visitar uma das mais de 50 lojas. Posso te mostrar o carro certo para você?",
    perguntas: [
      "O que mais pesa para você: preço, espaço, economia ou conforto?",
      "Se achasse o carro certo, em quanto tempo você fecharia?",
      "Já tem carro hoje? Pretende dar na troca?",
      "Você vai financiar? Já fez simulação em algum banco?",
      "Quem mais vai dirigir o carro?"
    ],
    provas: [
      { t: "Procedência", d: "Muitos carros vieram da frota da Unidas, com revisões em dia." },
      { t: "KM real", d: "Testes antifraude verificam a quilometragem de todos os carros." },
      { t: "Garantia", d: "3 meses de garantia legal; opcional até 12 meses com a Garantia Mais." },
      { t: "Troca", d: "Troca com Troco e a “melhor avaliação do mercado”, segundo o site." },
      { t: "Facilidade", d: "Contrato digital, Pix com retirada no mesmo dia, financiamento em até 72x." },
      { t: "Escala", d: "Mais de 50 lojas e uma empresa com mais de 50 anos de mercado." }
    ]
  },

  /* ---------- 10 · bandeiras, PDI ---------- */
  bandeiras: [
    { k: "verde", nome: "Bandeira verde", ic: "🚀", faixa: "CPVR até R$ 200", resumo: "Meta batida. Elegível a promoção e a aumento.", pts: [
      "Necessário 3 meses consecutivos nesta zona para ser elegível à promoção.",
      "A cada 3 meses consecutivos em verde: aumento de R$ 500 no fixo.",
      "Para Sênior: avaliação combinada de KPIs e Cultura de Liderança (360º)."
    ]},
    { k: "amarela", nome: "Bandeira amarela", ic: "⚠️", faixa: "CPVR de R$ 200 a R$ 300", resumo: "Atenção. Hora de entender a causa e se desenvolver.", pts: [
      "Gatilho: 3 meses consecutivos nesta zona.",
      "Desenvolvimento de PDI (Plano de Ação) focado na causa raiz.",
      "Apoio: mentoria guiada de 1 mês."
    ]},
    { k: "vermelha", nome: "Bandeira vermelha", ic: "❤️", faixa: "CPVR de R$ 300 a R$ 400", resumo: "Zona de risco. Plano intensivo.", pts: [
      "Gatilho: 2 meses nesta zona.",
      "Plano intensivo nos 2 meses seguintes.",
      "Regra: é obrigatório subir para a amarela.",
      "Proibido voltar para a vermelha por 2 meses."
    ]},
    { k: "preta", nome: "Bandeira preta", ic: "💀", faixa: "CPVR acima de R$ 400", resumo: "Zona crítica. Ação emergencial imediata.", pts: [
      "Gatilho: 1 mês nesta zona (imediato).",
      "Plano de ação emergencial.",
      "Ultimato: é obrigatório sair da zona crítica no mês seguinte.",
      "Retorno à preta proibido por 3 meses."
    ]}
  ],
  cpvr: {
    formula: "Custo por Visita Realizada (CPVR) = custo total da operação no mês ÷ visitas realizadas no mês.",
    explica: "Quanto mais visitas realizadas (e confirmadas pelo gerente), menor o CPVR. Por isso a qualidade do agendamento e o anti no-show mudam o seu resultado: visita agendada que não aparece não entra na conta.",
    pdi: [
      { t: "O que é o PDI", d: "Plano de Desenvolvimento Individual: um plano escrito com a sua meta, os comportamentos que vão mudar e o apoio que você recebe. Ele nasce a cada mês de bandeira amarela, vermelha ou preta." },
      { t: "Como funciona o ciclo", d: "Todo mês o CPVR é apurado e define a bandeira. Meses seguidos na mesma bandeira ativam os gatilhos acima." },
      { t: "Como ganhar o aumento", d: "A cada 3 meses consecutivos em bandeira verde, o seu fixo sobe R$ 500. Um mês fora da verde zera a contagem do ciclo." },
      { t: "Como se desenvolve", d: "Escolha 1 ou 2 comportamentos por mês (ex.: ligar em até 5 minutos, fechar sempre duas opções de horário, cumprir o anti no-show) e meça." }
    ]
  },

  /* ---------- 11 · trilha de estudo e rotina ---------- */
  trilha: [
    { id: "t1", n: 1, t: "Missão e regras de ouro", cap: "01", min: 20, itens: ["Leia a missão e explique em 1 frase o que é uma visita realizada.", "Decore as 6 regras de ouro.", "Responda: o que NÃO é a sua função?"] },
    { id: "t2", n: 2, t: "A Unidas e a Unidas Seminovos", cap: "02", min: 40, itens: ["Memorize 3 números do grupo e 2 de Seminovos.", "Treine o pitch de 30 segundos em voz alta.", "Liste 5 diferenciais e a prova de cada um.", "Abra o site de Seminovos e navegue por Promoções, Garantia Mais e Nossas Lojas."] },
    { id: "t3", n: 3, t: "Entenda de carro", cap: "03", min: 45, itens: ["Leia o glossário inteiro e marque os termos que você não conhecia.", "Aprenda os 6 segmentos e dois modelos de cada.", "Treine as perguntas de descoberta para os 5 perfis."] },
    { id: "t4", n: 4, t: "O fluxo ideal", cap: "04", min: 30, itens: ["Desenhe o fluxo de memória em 10 passos.", "Decore o anti no-show: D-3 ligar, D-2 mensagem, D-1 ligar, D0 mensagem.", "Entenda por que a confirmação do gerente é indispensável."] },
    { id: "t5", n: 5, t: "Ferramentas: Ficha Única, Blip e Ligação", cap: "05", min: 60, itens: ["Percorra os passos de cada ferramenta.", "Faça um teste de ligação para o seu celular.", "Crie um lead de teste, registre e finalize um ticket (com o gestor).", "Anote em que ponto você travou."] },
    { id: "t6", n: 6, t: "Qualificação completa", cap: "06", min: 45, itens: ["Preencha a ficha de qualificação do capítulo 6 simulando um lead.", "Decore os blocos: carro, motivo, prazo, pagamento, troca, valor.", "Treine as perguntas do carro de troca."] },
    { id: "t7", n: 7, t: "Scripts de ligação e mensagens", cap: "07", min: 60, itens: ["Leia o script de ligação 3 vezes em voz alta.", "Grave você mesma uma ligação e ouça.", "Copie e adapte as mensagens de WhatsApp para o seu tom.", "Monte uma mensagem para o gerente com um lead fictício."] },
    { id: "t8", n: 8, t: "Contorno de objeções", cap: "08", min: 90, itens: ["Estude todas as objeções, por categoria.", "Escolha 5 que você ouve mais e reescreva com as suas palavras.", "Faça um role play com o gestor (objeção + contorno + convite)."] },
    { id: "t9", n: 9, t: "A lógica do funil", cap: "10", min: 40, itens: ["Explique o funil de trás para frente.", "Use o simulador com a meta de visitas da operação.", "Decore os status do lead e a regra de cada um.", "Aprenda a cadência de contato."] },
    { id: "t10", n: 10, t: "Metas, bandeiras e PDI", cap: "11", min: 30, itens: ["Calcule o seu CPVR de um mês no simulador.", "Explique cada bandeira e a regra do aumento de R$ 500.", "Escreva o seu primeiro PDI com 2 comportamentos."] },
    { id: "t11", n: 11, t: "Rituais e coaching", cap: "12", min: 30, itens: ["Participe de uma daily com os números do dia anterior.", "Avalie uma ligação no scorecard.", "Faça uma sessão de coaching por gravação com o gestor."] },
    { id: "t12", n: 12, t: "Onboarding e prova final", cap: "13 e 14", min: 40, itens: ["Passe nos 6 role plays.", "Faça a prova final e alcance pelo menos 80%.", "Mostre o resultado ao seu gestor."] }
  ],
  semana: [
    { d: "Dia 1", t: "Entender o jogo", d1: "Capítulos 1 a 3 e acompanhamento de ligações com o gestor." },
    { d: "Dia 2", t: "Dominar o fluxo e as ferramentas", d1: "Capítulos 4 e 5, teste de acessos, lead de teste." },
    { d: "Dia 3", t: "Qualificar e roteirizar", d1: "Capítulos 6 e 7, role play de ligação." },
    { d: "Dia 4", t: "Objeções e prática", d1: "Capítulo 8, ligações reais com apoio do gestor." },
    { d: "Dia 5", t: "Metas e prova", d1: "Capítulo 10, simulador de CPVR e prova final." }
  ],
  rotinaNota: "A daily das 9h é fixa. O restante é uma sugestão de organização do dia, a validar com a gestão da operação.",
  rotina: [
    { h: "Antes das 9h", ic: "☀️", t: "Abrir os acessos e ficar online", d: "Blip, Ficha Única e Contact Center funcionando. Teste de áudio." },
    { h: "9h", ic: "🗓️", t: "Daily da operação", d: "Reunião fixa de todos os dias. Chegue com os números de ontem e um bloqueio." },
    { h: "Manhã", ic: "📞", t: "Leads novos e retornos", d: "Primeira tentativa em até 5 minutos. Ligue, depois WhatsApp. Anti no-show do dia." },
    { h: "Almoço", ic: "🍽️", t: "Status invisível", d: "Coloque invisível para não cair ticket e deixar lead sem resposta." },
    { h: "Tarde", ic: "✅", t: "Qualificação e agendamentos", d: "Valide o que falta, informe valor e feche a visita. Poste no grupo do gerente." },
    { h: "Fim do dia", ic: "📊", t: "Registrar e preparar amanhã", d: "Tudo no Ficha Única. Liste as visitas de amanhã e os toques de anti no-show. Confirme as visitas de hoje com o gerente." }
  ],
  indicadores: [
    { k: "Primeira resposta", m: "até 5 min", d: "Tempo entre o lead cair e a primeira tentativa de contato." },
    { k: "Taxa de contato", m: "acompanhe", d: "Leads com quem você conseguiu falar de fato." },
    { k: "Leads qualificados", m: "acompanhe", d: "Leads com a ficha completa." },
    { k: "Visitas agendadas", m: "acompanhe", d: "Visitas marcadas com dia e hora." },
    { k: "Comparecimento", m: "o maior possível", d: "Visitas realizadas ÷ visitas agendadas. É o resultado do anti no-show." },
    { k: "Visitas realizadas", m: "meta mensal", d: "Confirmadas pelo gerente. É o que paga e o que baixa o CPVR." },
    { k: "CPVR", m: "até R$ 200", d: "Custo por visita realizada. Define a bandeira do mês." }
  ],

  /* ---------- 12 · quiz ---------- */
  quiz: [
    { q: "Qual é a primeira ação quando um lead novo cai no Blip ou no Ficha Única?", o: ["Mandar uma mensagem no WhatsApp", "Tentar ligar para o cliente", "Esperar o cliente chamar", "Enviar e-mail"], a: 1, e: "A primeira ação é ligar. Só se não atender, vai para o WhatsApp." },
    { q: "Em quanto tempo deve ser a primeira tentativa de contato?", o: ["Até 5 minutos", "Até 1 hora", "No fim do dia", "No dia seguinte"], a: 0, e: "A regra é a primeira tentativa em até 5 minutos." },
    { q: "Quando uma visita é considerada realizada?", o: ["Quando é agendada", "Quando o cliente confirma por mensagem", "Quando o gerente confirma que o cliente foi à loja", "Quando o vendedor liga para o cliente"], a: 2, e: "Só a confirmação do gerente valida a visita e a comissão." },
    { q: "Qual é a comissão por visita realizada?", o: ["R$ 30", "R$ 60", "R$ 100", "R$ 200"], a: 1, e: "R$ 60 por visita realizada." },
    { q: "Qual é o teto do custo por visita realizada na bandeira verde?", o: ["R$ 100", "R$ 200", "R$ 300", "R$ 400"], a: 1, e: "Verde é CPVR até R$ 200." },
    { q: "Como é o anti no-show BLU?", o: ["D-3 mensagem, D-2 ligar, D-1 mensagem, D0 ligar", "D-3 ligar, D-2 mensagem, D-1 ligar, D0 mensagem", "Só ligar no dia", "Só mandar mensagem 1 dia antes"], a: 1, e: "3 dias antes ligar, 2 antes mensagem, 1 antes ligar e no dia uma mensagem." },
    { q: "O cliente pergunta quanto vão pagar no carro dele. O que você faz?", o: ["Diz um valor pela tabela FIPE", "Diz que a avaliação é presencial na loja e coleta as informações do carro", "Diz que depende e desliga", "Promete o melhor valor do mercado"], a: 1, e: "A avaliação é na loja. Você coleta as informações e alinha expectativa, sem prometer valor." },
    { q: "Quantas bandeiras de cada resultado mensal existem e qual a regra do aumento?", o: ["3 bandeiras; aumento a cada 6 meses em verde", "4 bandeiras; aumento de R$ 500 a cada 3 meses consecutivos em verde", "4 bandeiras; aumento de R$ 500 todo mês verde", "2 bandeiras; sem aumento"], a: 1, e: "São 4 bandeiras. A cada 3 meses consecutivos em verde, aumento de R$ 500 no fixo." },
    { q: "Quais dados do carro de troca você precisa coletar?", o: ["Só marca e ano", "Modelo, ano, cor, placa, KM, estado dos pneus, repintura, revisões e quanto ele espera receber", "Só a placa", "Só o valor que ele quer"], a: 1, e: "A lista completa ajuda a loja a avaliar rápido." },
    { q: "Qual é a garantia legal do carro Unidas Seminovos?", o: ["30 dias", "3 meses", "6 meses", "12 meses"], a: 1, e: "Garantia legal de 3 meses. A Garantia Mais estende para até 12 meses." },
    { q: "O cliente diz “vou pensar”. Qual a melhor resposta?", o: ["“Tudo bem, me liga quando decidir.”", "Perguntar o que falta para ele decidir e propor duas opções de visita", "Encerrar a ligação", "Oferecer desconto"], a: 1, e: "Descubra a objeção real e leve a conversa de volta para a visita." },
    { q: "O que você deve fazer ao terminar o atendimento no Blip?", o: ["Fechar a aba", "Clicar em Finalizar para liberar a fila", "Ficar offline", "Nada"], a: 1, e: "Finalizar libera a fila para novos tickets." }
  ]
};
