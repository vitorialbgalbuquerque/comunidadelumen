-- Tarefa 1.5 do PLAN.md: tabela de funções (SPEC.md, item 4).
-- Funções são permissões extras, somadas à categoria da pessoa.
-- Uma pessoa pode acumular várias funções.
-- Aplicar uma única vez no SQL Editor do Supabase.

-- 1. Lista de funções do SPEC.
--    "Assistente Apostólico" e "Assistência Apostólica" são a mesma função;
--    o mesmo vale para Vida Consagrada e Economato.
create type public.funcao as enum (
  'controlador_geral',
  'conselho',
  'assistente_formacao',
  'assistente_evangelizacao',
  'assistente_eventos',
  'assistente_caridade_fraterna',
  'assistente_vida_consagrada',
  'assistente_apostolico',
  'assistente_comunicacao',
  'assistente_economato',
  'responsavel_grupo',
  'acompanhador'
);

-- 2. Quem tem cada função. Uma linha por pessoa e função.
create table public.pessoa_funcoes (
  pessoa_id    uuid not null references public.pessoas (id) on delete cascade,
  funcao       public.funcao not null,
  atribuida_em timestamptz not null default now(),
  primary key (pessoa_id, funcao)
);

comment on table public.pessoa_funcoes is
  'Funções de cada pessoa (permissões extras). Definidas pelo Controlador Geral.';

-- 3. Regras de acesso (RLS).
alter table public.pessoa_funcoes enable row level security;

-- Visitantes (sem login) não acessam nada desta tabela.
revoke all on table public.pessoa_funcoes from anon;

-- Quem tem login vê apenas as próprias funções.
-- Atribuir e retirar funções: só pelo painel do Supabase por enquanto;
-- o painel do Controlador Geral vem na tarefa 1.6.
create policy "pessoa ve as proprias funcoes"
on public.pessoa_funcoes
for select
to authenticated
using (
  pessoa_id in (
    select id from public.pessoas where user_id = (select auth.uid())
  )
);

-- 4. Verificação usada pelas próximas regras de acesso:
--    "a pessoa que está logada tem esta função?"
--    Roda com permissão do sistema (security definer) para poder consultar
--    as tabelas sem cair nas próprias regras, mas só responde sim ou não
--    sobre quem está logado.
create function public.tem_funcao(f public.funcao)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.pessoa_funcoes pf
    join public.pessoas p on p.id = pf.pessoa_id
    where p.user_id = (select auth.uid())
      and pf.funcao = f
  );
$$;

revoke execute on function public.tem_funcao(public.funcao) from public, anon;
grant execute on function public.tem_funcao(public.funcao) to authenticated;
