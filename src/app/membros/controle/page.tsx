import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { criarClienteServidor } from "@/lib/supabase/server";
import { supabaseConfigurado } from "@/lib/supabase/env";
import { temFuncao } from "@/lib/acesso";
import type { Categoria, Funcao } from "@/lib/categorias";
import { CartaoPessoa, NovaPessoa, type PessoaPainel } from "./formularios";

export const metadata: Metadata = {
  title: "Painel do Controlador Geral | Comunidade Católica Lumen",
};

export default function PaginaControle() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Painel do Controlador Geral
        </h1>
        <Link href="/membros" className="text-sm underline opacity-80">
          Voltar à área de membros
        </Link>
      </div>
      <Suspense fallback={<p className="opacity-60">Carregando...</p>}>
        <ConteudoControle />
      </Suspense>
    </main>
  );
}

async function ConteudoControle() {
  if (!supabaseConfigurado) redirect("/entrar");
  const supabase = await criarClienteServidor();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/entrar");

  // Só o Controlador Geral vê esta página. Para os demais, ela "não existe".
  if (!(await temFuncao(supabase, "controlador_geral"))) notFound();

  const { data: linhas, error } = await supabase
    .from("pessoas")
    .select("id, nome, categoria, user_id, pessoa_funcoes ( funcao )")
    .order("nome");

  if (error) {
    return <p className="text-red-600">Não foi possível carregar as pessoas.</p>;
  }

  const pessoas: PessoaPainel[] = (linhas ?? []).map((p) => ({
    id: p.id as string,
    nome: p.nome as string,
    categoria: p.categoria as Categoria,
    temLogin: p.user_id !== null,
    funcoes: (p.pessoa_funcoes as { funcao: Funcao }[]).map((f) => f.funcao),
  }));

  return (
    <>
      <NovaPessoa />
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Pessoas ({pessoas.length})</h2>
        <ul className="flex flex-col gap-3">
          {pessoas.map((p) => (
            <CartaoPessoa key={p.id} pessoa={p} />
          ))}
        </ul>
      </section>
    </>
  );
}
