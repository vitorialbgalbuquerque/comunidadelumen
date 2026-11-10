-- Tarefa 1.7 do PLAN.md: regra de acesso por escada (SPEC.md, item 3).
-- Cada categoria acessa o conteúdo da sua categoria e de todas as anteriores.
-- O Controlador Geral acessa tudo.
-- Aplicar uma única vez no SQL Editor do Supabase.

-- 1. Categoria da pessoa logada (vazio para quem não tem cadastro).
create function public.minha_categoria()
returns public.categoria
language sql
stable
security definer
set search_path = ''
as $$
  select categoria
  from public.pessoas
  where user_id = (select auth.uid());
$$;

-- 2. A regra da escada, num lugar só. Todas as tabelas de conteúdo
--    (formações, documentos etc., nas próximas fases) usarão esta função.
--    As categorias são comparadas pela ordem da escada (tarefa 1.4).
create function public.pode_ver_categoria(c public.categoria)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.tem_funcao('controlador_geral')
      or c <= public.minha_categoria();
$$;

revoke execute on function public.minha_categoria() from public, anon;
revoke execute on function public.pode_ver_categoria(public.categoria) from public, anon;
grant execute on function public.minha_categoria() to authenticated;
grant execute on function public.pode_ver_categoria(public.categoria) to authenticated;

-- 3. Conteúdos de TESTE, um por categoria, só para comprovar a regra.
--    Podem ser apagados quando os conteúdos reais chegarem (Fase 5).
create table public.conteudos_teste (
  id        uuid primary key default gen_random_uuid(),
  titulo    text not null,
  categoria public.categoria not null,
  criado_em timestamptz not null default now()
);

alter table public.conteudos_teste enable row level security;
revoke all on table public.conteudos_teste from anon;

create policy "escada de acesso"
on public.conteudos_teste
for select
to authenticated
using ((select public.pode_ver_categoria(categoria)));

insert into public.conteudos_teste (titulo, categoria)
select 'Conteúdo de teste', c
from unnest(enum_range(null::public.categoria)) as c;
