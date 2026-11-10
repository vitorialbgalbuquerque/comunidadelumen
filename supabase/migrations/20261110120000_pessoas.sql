-- Tarefa 1.4 do PLAN.md: tabela de pessoas com categoria.
-- Aplicar uma única vez no SQL Editor do Supabase.

-- 1. Escada de categorias (SPEC.md, item 3).
--    A ordem abaixo É a ordem da escada: o banco compara categorias por ela
--    (acolhida < formacao_1 < ... < consagrado). Isso será usado na tarefa 1.7.
--    "Visitante" não é categoria: é quem não tem login.
create type public.categoria as enum (
  'acolhida',
  'formacao_1',
  'formacao_2',
  'formacao_3',
  'lumeniano',
  'pre_candidato',
  'candidato_1',
  'candidato_2',
  'consagrado'
);

-- 2. Tabela de pessoas.
--    LGPD: só o mínimo. O e-mail e a senha ficam no sistema de login do
--    Supabase (auth.users) e não são copiados para cá.
create table public.pessoas (
  id            uuid primary key default gen_random_uuid(),
  -- Ligação com o login. Pode ficar vazia para quem for cadastrado
  -- (por digitação ou importação) antes de receber acesso.
  user_id       uuid unique references auth.users (id) on delete set null,
  nome          text not null check (length(trim(nome)) > 0),
  categoria     public.categoria not null default 'acolhida',
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table public.pessoas is
  'Membros da comunidade. Dado pessoal sensível (convicção religiosa): acesso restrito por RLS.';

-- 3. Atualiza "atualizado_em" sozinho a cada alteração.
create function public.marcar_atualizacao()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

create trigger pessoas_atualizado_em
before update on public.pessoas
for each row execute function public.marcar_atualizacao();

-- 4. Regras de acesso no banco (RLS).
--    Com RLS ligado, tudo é proibido, exceto o que as regras abaixo liberam.
alter table public.pessoas enable row level security;

-- Visitantes (sem login) não acessam nada desta tabela.
revoke all on table public.pessoas from anon;

-- Quem tem login vê apenas o próprio cadastro.
-- Não há regra de inserir, alterar ou apagar: por enquanto isso só é feito
-- pelo painel do Supabase. O painel do Controlador Geral vem na tarefa 1.6
-- e as visões de grupo (Responsáveis, Conselho) nas Fases 3 em diante.
create policy "pessoa ve o proprio cadastro"
on public.pessoas
for select
to authenticated
using ((select auth.uid()) = user_id);
