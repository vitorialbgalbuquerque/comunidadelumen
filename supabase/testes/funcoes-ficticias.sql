-- Dados FICTÍCIOS de teste para a tarefa 1.5.
-- Mostra que uma pessoa pode acumular funções.

insert into public.pessoa_funcoes (pessoa_id, funcao)
select id, f
from public.pessoas,
     unnest(array['conselho', 'assistente_formacao']::public.funcao[]) as f
where nome = 'Pessoa Teste Sem Login'
on conflict do nothing;

insert into public.pessoa_funcoes (pessoa_id, funcao)
select id, 'acompanhador'
from public.pessoas
where nome = 'Pessoa Teste Acolhida'
on conflict do nothing;

-- Conferência: deve listar 3 linhas (2 funções para a pessoa sem login,
-- 1 para a pessoa de teste com login).
select p.nome, pf.funcao
from public.pessoa_funcoes pf
join public.pessoas p on p.id = pf.pessoa_id
order by p.nome, pf.funcao;
