# CLAUDE.md: Regras do projeto (Site da Comunidade Católica Lumen)

## Idioma
- Responder sempre em português do Brasil, em todas as mensagens, comentários e textos do site.

## Fonte da verdade
- O `SPEC.md` é a fonte da verdade sobre o que o site deve fazer.
- O `PLAN.md` define a ordem das tarefas e os critérios de aceite.
- Se algo no código, no plano ou num pedido conflitar com o `SPEC.md`, seguir o `SPEC.md` e avisar o conflito.
- Qualquer mudança de regra entra primeiro no `SPEC.md` e só depois no código.

## Forma de trabalho
- Pedir confirmação explícita antes de iniciar cada tarefa do `PLAN.md`, dizendo qual tarefa será feita e o que vai mudar.
- Fazer uma tarefa por vez. Só marcar `[x]` no `PLAN.md` depois de verificar o critério de aceite.
- Explicar as coisas de forma simples: quem mantém o projeto não é técnico.

## Dados pessoais e LGPD
- Nunca expor dados pessoais em área pública (sem login), em relatórios agregados ou na prestação de contas. Convicção religiosa é dado pessoal sensível.
- Regras de acesso aplicadas no banco de dados (Supabase, RLS), não só na tela.
- Coletar apenas o mínimo de dados necessário.
- Até a Fase 10 do `PLAN.md`, usar somente dados fictícios de teste (nomes, e-mails, frequências, partilhas). Nunca pedir nem colocar dados reais de membros no chat, no código ou no repositório.
- Os dados reais só entram pela tela de importação do site (Fase 10.5), direto do computador para o banco.

## Pasta do projeto
- O projeto (código, `SPEC.md`, `PLAN.md` e este arquivo) fica em `~/Downloads/Projetos/site-lumen`, fora do iCloud, para evitar lentidão e conflitos de sincronização. O backup é feito pelo GitHub.
- A pasta `Lumen` no iCloud guarda só os arquivos de arte (logo, fotos), que serão usados na Fase 11.

## Tecnologias aprovadas
- Next.js + Tailwind CSS, Supabase (região São Paulo), Vercel, GitHub.
