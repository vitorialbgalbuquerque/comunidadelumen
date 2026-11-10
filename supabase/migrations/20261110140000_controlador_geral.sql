-- Tarefa 1.6 do PLAN.md: painel do Controlador Geral.
-- O Controlador Geral pode ver todas as pessoas, cadastrar pessoas,
-- mudar categorias e atribuir ou retirar funções (SPEC.md, itens 3 e 4).
-- Aplicar uma única vez no SQL Editor do Supabase.

-- 1. Pessoas: o Controlador Geral vê, cadastra e altera todas.
--    (Apagar pessoas não é liberado: saídas da comunidade são tratadas na Fase 8.)
create policy "controlador ve todas as pessoas"
on public.pessoas
for select
to authenticated
using ((select public.tem_funcao('controlador_geral')));

create policy "controlador cadastra pessoas"
on public.pessoas
for insert
to authenticated
with check ((select public.tem_funcao('controlador_geral')));

create policy "controlador altera pessoas"
on public.pessoas
for update
to authenticated
using ((select public.tem_funcao('controlador_geral')))
with check ((select public.tem_funcao('controlador_geral')));

-- 2. Funções: o Controlador Geral vê, atribui e retira todas.
create policy "controlador ve todas as funcoes"
on public.pessoa_funcoes
for select
to authenticated
using ((select public.tem_funcao('controlador_geral')));

create policy "controlador atribui funcoes"
on public.pessoa_funcoes
for insert
to authenticated
with check ((select public.tem_funcao('controlador_geral')));

create policy "controlador retira funcoes"
on public.pessoa_funcoes
for delete
to authenticated
using ((select public.tem_funcao('controlador_geral')));

-- 3. Proteção: a comunidade nunca pode ficar sem Controlador Geral.
create function public.impedir_remover_ultimo_controlador()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.funcao = 'controlador_geral' and (
    select count(*) from public.pessoa_funcoes
    where funcao = 'controlador_geral'
  ) <= 1 then
    raise exception 'Não é possível retirar o último Controlador Geral.';
  end if;
  return old;
end;
$$;

create trigger pessoa_funcoes_ultimo_controlador
before delete on public.pessoa_funcoes
for each row execute function public.impedir_remover_ultimo_controlador();

-- 4. Ligar uma pessoa a um login já criado (pelo e-mail do login).
--    O login em si continua sendo criado em Authentication > Users.
--    Só o Controlador Geral pode usar.
create function public.vincular_login(p_pessoa uuid, p_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid;
begin
  if not public.tem_funcao('controlador_geral') then
    raise exception 'Apenas o Controlador Geral pode ligar logins.';
  end if;

  select id into v_user
  from auth.users
  where lower(email) = lower(trim(p_email));

  if v_user is null then
    raise exception 'Nenhum login encontrado com este e-mail. Crie o login primeiro em Authentication > Users.';
  end if;

  if exists (select 1 from public.pessoas where user_id = v_user) then
    raise exception 'Este login já está ligado a outra pessoa.';
  end if;

  update public.pessoas set user_id = v_user where id = p_pessoa;
end;
$$;

revoke execute on function public.vincular_login(uuid, text) from public, anon;
grant execute on function public.vincular_login(uuid, text) to authenticated;
