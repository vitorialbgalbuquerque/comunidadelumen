import type { Metadata } from "next";
import Link from "next/link";
import { FormularioLogin } from "./formulario";

export const metadata: Metadata = {
  title: "Entrar | Comunidade Católica Lumen",
};

export default function PaginaEntrar() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        Área de membros
      </h1>
      <FormularioLogin />
      <p className="max-w-sm text-sm opacity-60">
        O acesso é criado pela coordenação da comunidade. Se você é membro e
        ainda não tem acesso, procure o seu responsável.
      </p>
      <Link href="/" className="text-sm underline opacity-80">
        Voltar para o início
      </Link>
    </main>
  );
}
