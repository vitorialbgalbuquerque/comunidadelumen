"use client";

import { useActionState } from "react";
import {
  CATEGORIAS,
  FUNCOES,
  NOME_CATEGORIA,
  NOME_FUNCAO,
  type Categoria,
  type Funcao,
} from "@/lib/categorias";
import {
  cadastrarPessoa,
  ligarLogin,
  salvarPessoa,
  type EstadoAcao,
} from "./actions";

const campo =
  "rounded-md border border-black/20 bg-transparent px-3 py-2 text-base dark:border-white/20";
const botao =
  "rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-60";

function Aviso({ estado }: { estado: EstadoAcao }) {
  if (estado?.erro)
    return (
      <p role="alert" className="text-sm text-red-600 dark:text-red-400">
        {estado.erro}
      </p>
    );
  if (estado?.ok)
    return (
      <p role="status" className="text-sm text-green-700 dark:text-green-400">
        {estado.ok}
      </p>
    );
  return null;
}

function SeletorCategoria({ valor }: { valor?: Categoria }) {
  return (
    <select
      name="categoria"
      defaultValue={valor ?? "acolhida"}
      className={campo}
    >
      {CATEGORIAS.map((c) => (
        <option key={c} value={c}>
          {NOME_CATEGORIA[c]}
        </option>
      ))}
    </select>
  );
}

export type PessoaPainel = {
  id: string;
  nome: string;
  categoria: Categoria;
  temLogin: boolean;
  funcoes: Funcao[];
};

export function CartaoPessoa({ pessoa }: { pessoa: PessoaPainel }) {
  const [estado, acao, salvando] = useActionState(salvarPessoa, undefined);

  return (
    <li className="rounded-lg border border-black/10 p-4 text-left dark:border-white/15">
      <form action={acao} className="flex flex-col gap-3">
        <input type="hidden" name="pessoa_id" value={pessoa.id} />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-medium">{pessoa.nome}</h3>
          <span className="text-xs opacity-60">
            {pessoa.temLogin ? "Tem login" : "Sem login"}
          </span>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          Categoria
          <SeletorCategoria valor={pessoa.categoria} />
        </label>

        <fieldset className="flex flex-col gap-1 text-sm">
          <legend className="mb-1">Funções</legend>
          <div className="grid gap-1 sm:grid-cols-2">
            {FUNCOES.map((f) => (
              <label key={f} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="funcoes"
                  value={f}
                  defaultChecked={pessoa.funcoes.includes(f)}
                />
                {NOME_FUNCAO[f]}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={salvando} className={botao}>
            {salvando ? "Salvando..." : "Salvar"}
          </button>
          <Aviso estado={estado} />
        </div>
      </form>

      {!pessoa.temLogin && <LigarLogin pessoaId={pessoa.id} />}
    </li>
  );
}

function LigarLogin({ pessoaId }: { pessoaId: string }) {
  const [estado, acao, enviando] = useActionState(ligarLogin, undefined);

  return (
    <form
      action={acao}
      className="mt-4 flex flex-col gap-2 border-t border-black/10 pt-4 text-sm dark:border-white/15"
    >
      <input type="hidden" name="pessoa_id" value={pessoaId} />
      <label className="flex flex-col gap-1">
        Ligar a um login (e-mail já criado no Supabase)
        <input name="email" type="email" required className={campo} />
      </label>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={enviando} className={botao}>
          {enviando ? "Ligando..." : "Ligar login"}
        </button>
        <Aviso estado={estado} />
      </div>
    </form>
  );
}

export function NovaPessoa() {
  const [estado, acao, enviando] = useActionState(cadastrarPessoa, undefined);

  return (
    <form
      action={acao}
      className="flex flex-col gap-3 rounded-lg border border-black/10 p-4 text-left dark:border-white/15"
    >
      <h2 className="text-lg font-medium">Cadastrar pessoa</h2>
      <label className="flex flex-col gap-1 text-sm">
        Nome
        <input name="nome" required className={campo} />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Categoria
        <SeletorCategoria />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        E-mail do login (opcional, precisa já existir no Supabase)
        <input name="email" type="email" className={campo} />
      </label>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={enviando} className={botao}>
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </button>
        <Aviso estado={estado} />
      </div>
    </form>
  );
}
