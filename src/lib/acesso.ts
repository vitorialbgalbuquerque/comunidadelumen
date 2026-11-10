import type { SupabaseClient } from "@supabase/supabase-js";
import type { Funcao } from "./categorias";

// Pergunta ao banco se a pessoa logada tem a função.
// A resposta vem da função tem_funcao() do banco, a mesma usada nas regras
// de acesso (RLS). Esconder telas é só conforto: quem protege é o banco.
export async function temFuncao(
  supabase: SupabaseClient,
  funcao: Funcao,
): Promise<boolean> {
  const { data, error } = await supabase.rpc("tem_funcao", { f: funcao });
  return !error && data === true;
}
