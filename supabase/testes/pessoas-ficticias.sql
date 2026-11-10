-- Dados FICTÍCIOS de teste (regra do projeto: nada de dados reais até a Fase 10).
-- Liga o usuário de teste a uma pessoa fictícia na categoria Acolhida.
-- Pré-requisito: o usuário teste.acolhida@exemplo.com já existe em Authentication > Users.

insert into public.pessoas (user_id, nome, categoria)
select id, 'Pessoa Teste Acolhida', 'acolhida'
from auth.users
where email = 'teste.acolhida@exemplo.com'
on conflict (user_id) do nothing;

-- Uma pessoa fictícia sem login, para conferir que ela NÃO aparece
-- para o usuário de teste.
insert into public.pessoas (nome, categoria)
values ('Pessoa Teste Sem Login', 'formacao_2');

-- Conferência: deve listar as duas pessoas fictícias.
select nome, categoria, user_id is not null as tem_login
from public.pessoas
order by criado_em;
