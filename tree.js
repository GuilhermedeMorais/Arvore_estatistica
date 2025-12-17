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

  // ======= COMPARAR ==
