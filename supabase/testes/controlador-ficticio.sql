-- Dados FICTÍCIOS de teste para a tarefa 1.6.
-- Pré-requisito: criar o login teste.controlador@exemplo.com em
-- Authentication > Users (com "Auto Confirm User" marcado).

insert into public.pessoas (user_id, nome, categoria)
select id, 'Pessoa Teste Controladora', 'consagrado'
from auth.users
where email = 'teste.controlador@exemplo.com'
on conflict (user_id) do nothing;

insert into public.pessoa_funcoes (pessoa_id, funcao)
select p.id, 'controlador_geral'
from public.pessoas p
join auth.users u on u.id = p.user_id
where u.email = 'teste.controlador@exemplo.com'
on conflict do nothing;

-- Conferência: deve mostrar a Pessoa Teste Controladora com a função.
select p.nome, p.categoria, pf.funcao
from public.pessoas p
join public.pessoa_funcoes pf on pf.pessoa_id = p.id
where pf.funcao = 'controlador_geral';
