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
