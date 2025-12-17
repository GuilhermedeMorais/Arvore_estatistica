// ======= Função para adicionar tooltips automáticos =======
function addTooltips(text) {
  const terms = {
    "Paramétrica": "Análises que assumem distribuição normal e utilizam estatísticas baseadas em média e variância.",
    "Não Paramétrica": "Análises que não exigem distribuição normal; baseiam-se em postos ou frequências.",
    "Ordinal": "Variáveis com ordem, mas sem intervalos iguais entre os valores (ex: nível de satisfação).",
    "Nominal": "Categorias sem ordem (ex: gênero, cor dos olhos).",
    "Escalar": "Variáveis numéricas contínuas com intervalos iguais (ex: idade, peso, pontuação).",
    "Top Down": "Abordagem guiada por teoria prévia.",
    "Bottom Up": "Abordagem exploratória, sem estrutura teórica prévia."
  };

  for (const [term, def] of Object.entries(terms)) {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedTerm}\\b`, "g");
    text = text.replace(
      regex,
      `<span class="tooltip" data-tooltip="${def}">${term}</span>`
    );
  }
  return text;
}

// ======= Árvore de decisão =======
const decisionTree = {

  start: {
    header: "Tomada de decisão estatística",
    text: "Qual é o objetivo da sua pesquisa?",
    image: "logopucrs.png",
    imageWidth: "250px",
    imageHeight: "auto",
    options: [
      { text: "Descrever", next: "descrever" },
      { text: "Correlacionar / Associar", next: "correlacionar" },
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
      { text: "Paramétrica", next: "descr_parametrico" },
      { text: "Não Paramétrica", next: "descr_nparametrico" }
    ]
  },

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
    header: "Interpretação",
    text: "Os dados seguem distribuição normal. Utilize testes <b>Paramétricos</b>.",
    image: "img/normal.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  shapiro_menor: {
    header: "Interpretação",
    text: "Os dados não seguem distribuição normal. Utilize testes <b>Não Paramétricos</b>.",
    image: "img/nonnormal.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  descr_parametrico: {
    header: "Análises Paramétricas",
    text: "Exemplos: média, desvio-padrão, IC, testes t.",
    image: "img/parametrico.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  descr_nparametrico: {
    header: "Análises Não Paramétricas",
    text: "Exemplos: mediana, IQR, testes por postos.",
    image: "img/nparametrico.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  descr_nominal: {
    header: "Variáveis Nominais",
    text: "Utilize medidas de <b>frequência</b> e proporção.",
    image: "img/frequencia.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  // ======= CORRELACIONAR =======
  correlacionar: {
    header: "Correlação entre variáveis",
    text: "Escolha o tipo de variável:",
    image: "img/correlacionar.jpg",
    options: [
      { text: "Ordinal / Escalar", next: "corr_num" },
      { text: "Nominal", next: "corr_nominal" }
    ]
  },

  corr_num: {
    header: "Variáveis Ordinais ou Escalares",
    text: "Selecione o tipo de correlação:",
    image: "img/parametrica.jpg",
    options: [
      { text: "Paramétrica", next: "corrpara" },
      { text: "Não Paramétrica", next: "corr_nparametrica" }
    ]
  },

  corrpara: {
    header: "Correlação Paramétrica",
    text: "Exemplo: correlação de Pearson.",
    image: "img/parametrica.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  corr_nparametrica: {
    header: "Correlação Não Paramétrica",
    text: "Exemplos: Spearman, Kendall.",
    image: "img/nparametrica.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  corr_nominal: {
    header: "Correlação Nominal",
    text: "Selecione o tipo de associação:",
    image: "img/nominal.jpg",
    options: [
      { text: "Nominal × Nominal", next: "corr_nominal_assoc" },
      { text: "Nominal × Ordinal", next: "corr_nominal_ord" }
    ]
  },

  corr_nominal_assoc: {
    header: "Nominal × Nominal",
    text: "Exemplo: Qui-quadrado.",
    image: "img/chi2.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  corr_nominal_ord: {
    header: "Nominal × Ordinal",
    text: "Exemplo: correlação bisserial.",
    image: "img/nominal_ordinal.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  // ======= COMPARAR =======
  comparar: {
    header: "Comparar grupos",
    text: "Quantos grupos?",
    image: "img/comparar.jpg",
    options: [
      { text: "2 grupos", next: "comparar_2grupos" },
      { text: "3 ou mais grupos", next: "comparar_3grupos" }
    ]
  },

  comparar_2grupos: {
    header: "Comparação entre 2 grupos",
    text: "Escolha o tipo de teste:",
    image: "img/2grupos.jpg",
    options: [
      { text: "Paramétrica", next: "comparar_2_param" },
      { text: "Não Paramétrica", next: "comparar_2_nparam" }
    ]
  },

  comparar_2_param: {
    header: "Teste Paramétrico",
    text: "Exemplo: teste t.",
    image: "img/t_parametrico2.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  comparar_2_nparam: {
    header: "Teste Não Paramétrico",
    text: "Exemplo: Mann-Whitney.",
    image: "img/t_nparametrico2.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  comparar_3grupos: {
    header: "3 ou mais grupos",
    text: "Escolha o tipo de teste:",
    image: "img/3grupos.jpg",
    options: [
      { text: "Paramétrica", next: "comparar_3_param" },
      { text: "Não Paramétrica", next: "comparar_3_nparam" }
    ]
  },

  comparar_3_param: {
    header: "Teste Paramétrico",
    text: "Exemplo: ANOVA.",
    image: "img/anova.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  comparar_3_nparam: {
    header: "Teste Não Paramétrico",
    text: "Exemplo: Kruskal-Wallis.",
    image: "img/kruskal.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  // ======= PREDIZER =======
  predizer: {
    header: "Predição",
    text: "Tipo de variável dependente:",
    image: "img/predizer.jpg",
    options: [
      { text: "Escalar / Ordinal", next: "reg_linear" },
      { text: "Dicotômica", next: "pred_logistica" }
    ]
  },

  reg_linear: {
    header: "Regressão Linear",
    text: "Modelo para variável contínua.",
    image: "img/reg_linear.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  pred_logistica: {
    header: "Regressão Logística",
    text: "Modelo para variável dicotômica.",
    image: "img/reg_logistica.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  // ======= VALIDAR =======
  validar: {
    header: "Psicometria",
    text: "Abordagem fatorial:",
    image: "img/validar.jpg",
    options: [
      { text: "Top Down", next: "afc" },
      { text: "Bottom Up", next: "afe" }
    ]
  },

  afc: {
    header: "AFC",
    text: "Análise Fatorial Confirmatória.",
    image: "img/afc.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  afe: {
    header: "AFE",
    text: "Análise Fatorial Exploratória.",
    image: "img/afe.jpg",
    options: [{ text: "Finalizar", next: "final" }]
  },

  final: {
    header: "Interpretação",
    text: "Reporte <b>p</b> e <b>tamanho de efeito</b>.",
    image: "img/final.jpg",
    options: []
  }
};

// ======= Lógica de navegação =======
let history = [];

function displayNode(nodeKey) {
  const node = decisionTree[nodeKey];
  if (!node) return;

  if (history[history.length - 1] !== nodeKey) {
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

  document.getElementById("back-button").style.display =
    history.length > 1 ? "inline-block" : "none";
}

document.getElementById("back-button").onclick = () => {
  if (history.length > 1) {
    history.pop();
    displayNode(history[history.length - 1]);
  }
};

displayNode("start");


