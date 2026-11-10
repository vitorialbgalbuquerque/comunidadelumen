import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabasePublishableKey, supabaseUrl } from "./env";

// Cliente do Supabase para uso no servidor (páginas e ações).
// Deve ser criado a cada requisição.
export async function criarClienteServidor() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Chamado a partir de uma página (Server Component), onde não é
          // possível gravar cookies. O proxy renova a sessão nesse caso.
        }
      },
    },
  });
}
