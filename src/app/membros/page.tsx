import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { criarClienteServidor } from "@/lib/supabase/server";
import { supabaseConfigurado } from "@/lib/supabase/env";
import { sair } from "../entrar/actions";
import {
  NOME_CATEGORIA,
  NOME_FUNCAO,
  type Categoria,
  type Funcao,
} from "@/lib/categorias";

export const metadata: Metadata = {
  title: "Área de membros | Comunidade Católica Lumen",
};

export default function PaginaMembros() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Área de membros
      </h1>
      <Suspense fallback={<p className="opacity-60">Carregando...</p>}>
        <ConteudoMembro />
      </Suspense>
    </main>
  );
}

// Lê o login a cada acesso. Sem login, volta para "Entrar"
// (segunda verificação, além do proxy).
async function ConteudoMembro() {
  if (!supabaseConfigurado) redirect("/entrar");
  const supabase = await criarClienteServidor();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/entrar");

  // O banco só devolve o cadastro da própria pessoa (regra de acesso RLS).
  const { data: pessoa } = await supabase
    .from("pessoas")
    .select("nome, categoria, pessoa_funcoes ( funcao )")
    .eq("user_id", data.user.id)
    .maybeSingle<{
      nome: string;
      categoria: Categoria;
      pessoa_funcoes: { funcao: Funcao }[];
    }>();

  const funcoes = pessoa?.pessoa_funcoes.map((f) => NOME_FUNCAO[f.funcao]);
  const ehControlador = pessoa?.pessoa_funcoes.some(
    (f) => f.funcao === "controlador_geral",
  );

  // Conteúdos de teste da escada (tarefa 1.7). O banco só devolve os que a
  // categoria da pessoa permite (a sua e as anteriores; tudo para o
  // Controlador Geral).
  const { data: conteudos } = await supabase
    .from("conteudos_teste")
    .select("id, titulo, categoria")
    .order("categoria");

  return (
    <>
      {pessoa ? (
        <>
          <p className="opacity-80">
            Olá, {pessoa.nome}. Sua categoria:{" "}
            {NOME_CATEGORIA[pessoa.categoria]}.
          </p>
          {funcoes && funcoes.length > 0 && (
            <p className="text-sm opacity-70">
              {funcoes.length === 1 ? "Sua função" : "Suas funções"}:{" "}
              {funcoes.join(", ")}.
            </p>
          )}
        </>
      ) : (
        <p className="opacity-80">
          Você entrou como {data.user.email}, mas seu cadastro ainda não foi
          completado pela coordenação.
        </p>
      )}
      <p className="max-w-md text-sm opacity-60">
        Em breve, aqui ficarão as formações, o calendário e a sua frequência.
      </p>
      {pessoa && (
        <section className="w-full max-w-sm rounded-lg border border-dashed border-black/20 p-4 text-left text-sm dark:border-white/20">
          <h2 className="mb-2 font-medium">
            Conteúdos que você pode ver ({conteudos?.length ?? 0})
          </h2>
          <ul className="list-disc pl-5 opacity-80">
            {(conteudos ?? []).map((c) => (
              <li key={c.id}>
                {c.titulo}: {NOME_CATEGORIA[c.categoria as Categoria]}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs opacity-60">
            Lista de teste da regra de acesso. Será substituída pelas
            formações e documentos reais.
          </p>
        </section>
      )}
      {ehControlador && (
        <Link href="/membros/controle" className="text-sm underline">
          Abrir o Painel do Controlador Geral
        </Link>
      )}
      <form action={sair}>
        <button
          type="submit"
          className="rounded-md border border-black/20 px-4 py-2 text-sm dark:border-white/20"
        >
          Sair
        </button>
      </form>
    </>
  );
}
