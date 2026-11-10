// Endereço e chave pública do projeto Supabase.
// Os valores ficam no arquivo .env.local (no computador) e nas
// variáveis de ambiente da Vercel (no site publicado).
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const supabaseConfigurado = Boolean(
  supabaseUrl && supabasePublishableKey,
);
