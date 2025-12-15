// ======= Função para adicionar tooltips automáticos =======
function addTooltips(text) {
  const terms = {
    "Paramétrica": "Análises que assumem distribuição normal e utilizam estatísticas baseadas em média e variância.",
    "Não paramétrica": "Análises que não exigem distribuição normal; baseiam-se em postos ou frequências.",
    "Ordinal": "Variáveis com ordem, mas sem intervalos iguais entre os valores (ex: nível de satisfação).",
    "Nominal": "Categorias sem ordem (ex: gênero, cor dos olhos).",
    "Escalar": "Variáveis numéricas contínuas com intervalos iguais (ex: idade, peso, pontuação).",
    "Top Down": "Lorem ipsum dolor sit amet. Et enim nobis et quia maiores sed ipsa nihil et .",
    "Bottom Up": "Lorem ipsum dolor sit amet. Et enim nobis et quia maiores sed ipsa nihil et ."
  };
  for (const [term, def] of Object.entries(terms)) {
    const regex = new RegExp(`\\b${term}\\b`, "g");
    text = text.replace(regex, `<span class="tooltip" data-tooltip="${def}">${term}</span>`);
  }
  return text;
}

// ======= Árvore de decisão =======
const decisionTree = {
  start: {
    header: "Tomada de decisão estatística",
    text: "Qual é o objetivo da sua pesquisa?",
    image: "logopucrs.png",
    options: [
      { text: "Descrever", next: "descrever" },
      { text: "Correlacionar/ Associar", next: "correlacionar" },
      { text: "Comparar", next: "comparar" },
      { text: "Predizer", next: "predizer" },
      { text: "Validar / Adaptar (Psicometria)", next: "validar" }
    ]
  },

  // ======= DESCREVER =======
 descrever: {
    header: "Descrição / Avaliação",
    text: "O tipo de variável é <b>Ordinal ou Escalar</b>, ou <b>Nominal</b>?",
    image: "img/descrever.jpg",
    options: [
      { text: "Ordinal ou Escalar", next: "descr_ordinal" },
      { text: "Nominal", next: "descr_nominal" }
    ]
  },

  descr_ordinal: {
    header: "Variáveis Ordinais ou Escalares",
    text: "Escolha uma opção de análise:",
    image: "img/medidas.jpg",
    options: [
      { text: "Distribuição (Shapiro-Wilk)", next: "shapiro" },
      { text: "Paramétrico", next: "descr_parametrico" },   // Mudar o nome
      { text: "Não Paramétrico", next: "descr_nparametrico" } //Mudar o nome
    ]
  },

  // ======= TESTE DE NORMALIDADE =======
  shapiro: {
    header: "Teste de Normalidade - Shapiro-Wilk",
    text: "Selecione o resultado do teste:",
    image: "img/shapiro.jpg",
    options: [
      { text: "p-valor > 0,05", next: "shapiro_maior" },
      { text: "p-valor < 0,05", next: "shapiro_menor" }
    ]
  },

  shapiro_maior: {
    header: "Interpretação: p > 0,05",
    text: "Os dados seguem distribuição normal. É possível utilizar testes <b>Paramétricos</b>.",
    image: "img/normal.jpg",
    options: [{ text: "Finalizar", next: "final_descr" }]
  },

  shapiro_menor: {
    header: "Interpretação: p < 0,05",
    text: "Os dados <b>não seguem</b> distribuição normal. Utilize testes <b>Não Paramétricos</b>.",
    image: "img/nonnormal.jpg",
    options: [{ text: "Finalizar", next: "final_descr" }]
  },

  descr_parametrico: {
    header: "Análises Paramétricas",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed purus vel justo tempus blandit. Donec in imperdiet arcu.",
    image: "img/parametrico.jpg",
    options: [{ text: "Finalizar", next: "final_descr" }]
  },

  descr_nparametrico: {
    header: "Análises Não Paramétricas",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non lectus nec neque efficitur rhoncus. Ut consequat augue et velit imperdiet posuere.",
    image: "img/nparametrico.jpg",
    options: [{ text: "Finalizar", next: "final_descr" }]
  },

  // ======= NOMINAL =======
  descr_nominal: {
    header: "Variáveis Nominais",
    text: "Para variáveis nominais, utilize medidas de <b>Frequência</b>.",
    image: "img/frequencia.jpg",
    options: [{ text: "Entendido", next: "final_descr" }]
  },

  // ======= CORRELACIONAR =======
 correlacionar: {
    header: "Correlação entre variáveis",
    text: "Escolha o tipo de análise de correlação desejada:",
    image: "img/correlacionar.jpg",
    options: [
      { text: "Paramétrica", next: "corr_parametrica" },
      { text: "Não Paramétrica", next: "corr_nparametrica" },
      { text: "Nominal", next: "corr_nominal" }
    ]
  },

  // ======= PARAMÉTRICA =======
  corr_parametrica: {
    header: "Correlação Paramétrica",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id enim in velit dapibus ultricies. Praesent luctus, lorem at placerat tincidunt, nisl sem vehicula lacus, non fringilla neque justo vitae erat.",
    image: "img/parametrica.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  // ======= NÃO PARAMÉTRICA =======
  corr_nparametrica: {
    header: "Correlação Não Paramétrica",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies magna et sapien luctus, non gravida mi volutpat. Vivamus at bibendum urna, ac imperdiet odio.",
    image: "img/nparametrica.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  // ======= NOMINAL =======
  corr_nominal: {
    header: "Correlação Nominal",
    text: "Para variáveis nominais, selecione a situação que melhor descreve seu caso:",
    image: "img/nominal.jpg",
    options: [
      { text: "Associação entre duas variáveis nominais", next: "corr_nominal_assoc" },
      { text: "Associação entre variável nominal e ordinal", next: "corr_nominal_ord" }
    ]
  },

  corr_nominal_assoc: {
    header: "Associação entre variáveis nominais",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce cursus felis sed tellus finibus, in hendrerit lorem fermentum.",
    image: "img/chi2.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  corr_nominal_ord: {
    header: "Associação entre variável nominal e ordinal",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt convallis tortor, sit amet cursus elit ullamcorper vel.",
    image: "img/nominal_ordinal.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

 // ======= COMPARAR =======
  comparar: {
    header: "Comparar grupos",
    text: "Selecione a quantidade de grupos que deseja comparar:",
    image: "img/comparar.jpg",
    options: [
      { text: "2 grupos", next: "comparar_2grupos" },
      { text: "3 ou mais grupos", next: "comparar_3grupos" }
    ]
  },

  // ======= 2 GRUPOS =======
  comparar_2grupos: {
    header: "Comparação entre 2 grupos",
    text: "Escolha o tipo de teste a ser utilizado:",
    image: "img/2grupos.jpg",
    options: [
      { text: "Paramétrica", next: "comparar_2_param" },
      { text: "Não Paramétrica", next: "comparar_2_nparam" }
    ]
  },

  comparar_2_param: {
    header: "Teste Paramétrico - 2 Grupos",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et justo at sapien cursus vestibulum. Etiam dictum mi at ligula tristique, in suscipit justo lacinia.",
    image: "img/t_parametrico2.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  comparar_2_nparam: {
    header: "Teste Não Paramétrico - 2 Grupos",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut lacus vitae justo condimentum tincidunt. Aliquam erat volutpat.",
    image: "img/t_nparametrico2.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  // ======= 3 OU MAIS GRUPOS =======
  comparar_3grupos: {
    header: "Comparação entre 3 ou mais grupos",
    text: "Escolha o tipo de teste a ser utilizado:",
    image: "img/3grupos.jpg",
    options: [
      { text: "Paramétrica", next: "comparar_3_param" },
      { text: "Não Paramétrica", next: "comparar_3_nparam" }
    ]
  },

  comparar_3_param: {
    header: "Teste Paramétrico - 3 ou mais Grupos",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel sem eget nisl gravida sollicitudin nec non urna.",
    image: "img/anova.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  comparar_3_nparam: {
    header: "Teste Não Paramétrico - 3 ou mais Grupos",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor sapien non dolor suscipit, ut accumsan justo pharetra.",
    image: "img/kruskal.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },


    // ======= PREDIZER =======
  predizer: {
    header: "Predição de variáveis",
    text: "Escolha o tipo de modelo de regressão que deseja utilizar:",
    image: "img/predizer.jpg",
    options: [
      { text: "Linear", next: "pred_linear" },
      { text: "Logística", next: "pred_logistica" }
    ]
  },

  pred_linear: {
    header: "Regressão Linear",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed orci a eros aliquet facilisis. Nam sagittis quam vel est porta, vel tristique elit bibendum. Phasellus vitae efficitur lorem.",
    image: "img/reg_linear.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  pred_logistica: {
    header: "Regressão Logística",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis nibh a mi volutpat, in tristique urna maximus. Praesent et faucibus sem. Nullam id ligula in nulla fermentum tincidunt.",
    image: "img/reg_logistica.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  // ======= VALIDAR / PSICOMETRIA =======
  validar: {
    header: "Validação / Psicometria",
    text: "Escolha a abordagem teórica da sua análise fatorial:",
    image: "img/validar.jpg",
    options: [
      { text: "Top Down", next: "afc" },     // Com teoria
      { text: "Bottom Up", next: "afe" }     // Sem teoria
    ]
  },

  afc: {
    header: "Análise Fatorial Confirmatória (AFC)",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet facilisis nulla. Vestibulum ac dolor ac purus hendrerit efficitur. Integer sagittis tortor non dolor tempus, eget viverra massa fermentum.",
    image: "img/afc.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  afe: {
    header: "Análise Fatorial Exploratória (AFE)",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit felis at eros imperdiet, at consequat ex dignissim. Mauris id nulla id arcu dictum accumsan. Donec ullamcorper sapien a metus dictum, et bibendum enim malesuada.",
    image: "img/afe.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },


  // ======= FINAIS =======
  final_descr: {
    header: "Medidas descritivas",
    text: "Você pode complementar sua análise com gráficos e medidas de dispersão.",
    image: "img/final.jpg",
    options: []
  },

  final: {
    header: "Interpretação dos resultados",
    text: "Lembre-se de reportar o <b>tamanho de efeito</b> e o <b>valor p</b> para suas análises de comparação ou correlação.",
    image: "img/final.jpg",
    options: []
  }
};

// ======= Lógica de navegação =======
let history = [];

function displayNode(nodeKey) {
  const node = decisionTree[nodeKey];
  if (!node) return;

  if (history.length === 0 || history[history.length - 1] !== nodeKey) {
    history.push(nodeKey);
  }

  document.getElementById("node-header").textContent = node.header;
  document.getElementById("node-text").innerHTML = addTooltips(node.text);
  document.getElementById("node-image").src = node.image;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  node.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-button";
    btn.innerHTML = addTooltips(opt.text);
    btn.onclick = () => displayNode(opt.next);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("back-button").style.display = history.length > 1 ? "inline-block" : "none";
}

document.getElementById("back-button").addEventListener("click", () => {
  if (history.length > 1) {
    history.pop();
    const previousNode = history[history.length - 1];
    displayNode(previousNode);
  }
});

displayNode("start");







