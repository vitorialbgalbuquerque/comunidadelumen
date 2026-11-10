// Escada de categorias (SPEC.md, item 3), na mesma ordem do banco de dados.
export const CATEGORIAS = [
  "acolhida",
  "formacao_1",
  "formacao_2",
  "formacao_3",
  "lumeniano",
  "pre_candidato",
  "candidato_1",
  "candidato_2",
  "consagrado",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export const NOME_CATEGORIA: Record<Categoria, string> = {
  acolhida: "Acolhida",
  formacao_1: "Formação 1",
  formacao_2: "Formação 2",
  formacao_3: "Formação 3",
  lumeniano: "Lumeniano",
  pre_candidato: "Pré-Candidato",
  candidato_1: "Candidato 1",
  candidato_2: "Candidato 2",
  consagrado: "Consagrado",
};

// Funções (SPEC.md, item 4): permissões extras, que podem ser acumuladas.
export type Funcao =
  | "controlador_geral"
  | "conselho"
  | "assistente_formacao"
  | "assistente_evangelizacao"
  | "assistente_eventos"
  | "assistente_caridade_fraterna"
  | "assistente_vida_consagrada"
  | "assistente_apostolico"
  | "assistente_comunicacao"
  | "assistente_economato"
  | "responsavel_grupo"
  | "acompanhador";

export const NOME_FUNCAO: Record<Funcao, string> = {
  controlador_geral: "Controlador Geral",
  conselho: "Conselho",
  assistente_formacao: "Assistente de Formação",
  assistente_evangelizacao: "Assistente de Evangelização",
  assistente_eventos: "Assistente de Eventos",
  assistente_caridade_fraterna: "Assistente de Caridade Fraterna",
  assistente_vida_consagrada: "Assistente da Vida Consagrada",
  assistente_apostolico: "Assistente Apostólico",
  assistente_comunicacao: "Assistente de Comunicação",
  assistente_economato: "Assistente do Economato",
  responsavel_grupo: "Responsável de Grupo",
  acompanhador: "Acompanhador",
};
