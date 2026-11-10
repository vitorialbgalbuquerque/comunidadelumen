"use client";

import { useActionState } from "react";
import { entrar } from "./actions";

export function FormularioLogin() {
  const [estado, acao, enviando] = useActionState(entrar, undefined);

  return (
    <form action={acao} className="flex w-full max-w-sm flex-col gap-4">
      <label className="flex flex-col gap-1 text-left text-sm">
        E-mail
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-md border border-black/20 bg-transparent px-3 py-2 text-base dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-left text-sm">
        Senha
        <input
          name="senha"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-md border border-black/20 bg-transparent px-3 py-2 text-base dark:border-white/20"
        />
      </label>
      {estado?.erro && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {estado.erro}
        </p>
      )}
      <button
        type="submit"
        disabled={enviando}
        className="rounded-md bg-foreground px-4 py-2 font-medium text-background disabled:opacity-60"
      >
        {enviando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
