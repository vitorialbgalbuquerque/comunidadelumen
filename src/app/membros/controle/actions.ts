"use server";

import { refresh } from "next/cache";
import { criarClienteServidor } from "@/lib/supabase/server";
import { temFuncao } from "@/lib/acesso";
import { CATEGORIAS, FUNCOES, type Funcao } from "@/lib/categorias";

export type EstadoAcao = { ok?: string; erro?: string } | undefined;

// Traduz erros do banco para mensagens simples.
function mensagemErro(mensagem: string): string {
  if (mensagem.includes("último Controlador Geral"))
    return "Não é possível retirar o último Controlador Geral.";
  if (mensagem.includes("Nenhum login encontrado"))
    return "Nenhum login com este e-mail. Crie o login primeiro no Supabase (Authentication > Users).";
  if (mensagem.includes("já está ligado"))
    return "Este login já está ligado a outra pessoa.";
  return "Não foi possível salvar. Tente de novo.";
}

async function clienteDoControlador() {
  const supabase = await criarClienteServidor();
  const ok = await temFuncao(supabase, "controlador_geral");
  return ok ? supabase : null;
}

export async function salvarPessoa(
  _estado: EstadoAcao,
  formData: FormData,
): Promise<EstadoAcao> {
  const supabase = await clienteDoControlador();
  if (!supabase) return { erro: "Acesso permitido só ao Controlador Geral." };

  const pessoaId = String(formData.get("pessoa_id") ?? "");
  const categoria = String(formData.get("categoria") ?? "");
  if (!pessoaId || !(CATEGORIAS as readonly string[]).includes(categoria)) {
    return { erro: "Dados inválidos." };
  }

  const marcadas = new Set(
    formData.getAll("funcoes").map(String).filter((f): f is Funcao =>
      (FUNCOES as readonly string[]).includes(f),
    ),
  );

  const { error: erroCategoria } = await supabase
    .from("pessoas")
    .update({ categoria })
    .eq("id", pessoaId);
  if (erroCategoria) return { erro: mensagemErro(erroCategoria.message) };

  const { data: atuais, error: erroLeitura } = await supabase
    .from("pessoa_funcoes")
    .select("funcao")
    .eq("pessoa_id", pessoaId);
  if (erroLeitura) return { erro: mensagemErro(erroLeitura.message) };

  const jaTem = new Set((atuais ?? []).map((f) => f.funcao as Funcao));
  const adicionar = [...marcadas].filter((f) => !jaTem.has(f));
  const retirar = [...jaTem].filter((f) => !marcadas.has(f));

  if (adicionar.length > 0) {
    const { error } = await supabase
      .from("pessoa_funcoes")
      .insert(adicionar.map((funcao) => ({ pessoa_id: pessoaId, funcao })));
    if (error) return { erro: mensagemErro(error.message) };
  }

  if (retirar.length > 0) {
    const { error } = await supabase
      .from("pessoa_funcoes")
      .delete()
      .eq("pessoa_id", pessoaId)
      .in("funcao", retirar);
    if (error) {
      refresh();
      return { erro: mensagemErro(error.message) };
    }
  }

  refresh();
  return { ok: "Salvo." };
}

export async function cadastrarPessoa(
  _estado: EstadoAcao,
  formData: FormData,
): Promise<EstadoAcao> {
  const supabase = await clienteDoControlador();
  if (!supabase) return { erro: "Acesso permitido só ao Controlador Geral." };

  const nome = String(formData.get("nome") ?? "").trim();
  const categoria = String(formData.get("categoria") ?? "");
  const email = String(formData.get("email") ?? "").trim();

  if (!nome) return { erro: "Preencha o nome." };
  if (!(CATEGORIAS as readonly string[]).includes(categoria)) {
    return { erro: "Escolha a categoria." };
  }

  const { data: pessoa, error } = await supabase
    .from("pessoas")
    .insert({ nome, categoria })
    .select("id")
    .single();
  if (error || !pessoa) return { erro: mensagemErro(error?.message ?? "") };

  if (email) {
    const { error: erroLogin } = await supabase.rpc("vincular_login", {
      p_pessoa: pessoa.id,
      p_email: email,
    });
    if (erroLogin) {
      refresh();
      return {
        erro: `Pessoa cadastrada, mas o login não foi ligado: ${mensagemErro(erroLogin.message)}`,
      };
    }
  }

  refresh();
  return { ok: `${nome} cadastrado(a).` };
}

export async function ligarLogin(
  _estado: EstadoAcao,
  formData: FormData,
): Promise<EstadoAcao> {
  const supabase = await clienteDoControlador();
  if (!supabase) return { erro: "Acesso permitido só ao Controlador Geral." };

  const pessoaId = String(formData.get("pessoa_id") ?? "");
  const email = String(formData.get("email") ?? "").trim();
  if (!pessoaId || !email) return { erro: "Preencha o e-mail do login." };

  const { error } = await supabase.rpc("vincular_login", {
    p_pessoa: pessoaId,
    p_email: email,
  });
  if (error) return { erro: mensagemErro(error.message) };

  refresh();
  return { ok: "Login ligado." };
}
