-- Dados FICTÍCIOS de teste para a tarefa 1.7.
-- Pré-requisito: criar os logins teste.formacao2@exemplo.com e
-- teste.lumeniano@exemplo.com em Authentication > Users ("Auto Confirm User").
-- (Também dá para fazer pelo Painel do Controlador: "Cadastrar pessoa" com o e-mail.)

insert into public.pessoas (user_id, nome, categoria)
select id, 'Pessoa Teste Formação 2', 'formacao_2'
from auth.users where email = 'teste.formacao2@exemplo.com'
on conflict (user_id) do nothing;

insert into public.pessoas (user_id, nome, categoria)
select id, 'Pessoa Teste Lumeniano', 'lumeniano'
from auth.users where email = 'teste.lumeniano@exemplo.com'
on conflict (user_id) do nothing;
