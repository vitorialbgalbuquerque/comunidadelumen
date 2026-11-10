# PLAN.md: Site da Comunidade (versão 0.2)

Este plano transforma o `SPEC.md` (versão 1.0) em tarefas pequenas e ordenadas. Cada tarefa tem um critério de aceite: só marcamos como concluída quando o critério for verificado.

## 1. Tecnologias (aprovadas)

| Parte | Escolha | Por quê |
|---|---|---|
| Telas (front-end) | Next.js com Tailwind CSS | Padrão amplamente usado e bem conhecido pelo Claude Code |
| Login e banco de dados | Supabase (login por e-mail e senha, banco PostgreSQL) | Entrega login pronto e permite regras de acesso direto no banco, o que combina com o modelo de categorias e funções da spec |
| Publicação | Vercel | Publica o site a partir do repositório, com poucos passos |
| Código | GitHub | Guarda o histórico do projeto e liga com a Vercel |

Pontos de LGPD a tratar desde o início: regras de acesso aplicadas no banco (não só na tela), região de hospedagem dos dados no Brasil quando disponível, e coleta do mínimo de dados.

## 2. Como trabalhamos no Claude Code

1. Abrimos a pasta do projeto, que contém `SPEC.md`, `PLAN.md` e um `CLAUDE.md` com as regras do projeto.
2. Para cada tarefa, você pede: "Implemente a tarefa X do PLAN.md, conforme o SPEC.md".
3. O Claude Code propõe as alterações e pede sua permissão antes de modificar arquivos.
4. Testamos o critério de aceite. Se passar, marcamos `[x]` no plano. Se não, corrigimos.
5. Qualquer mudança de regra volta primeiro para o `SPEC.md`, depois para o código.

## 3. Regras de dados

- Até a Fase 10, o site usa apenas dados fictícios de teste.
- Dados reais dos membros não são enviados ao chat. A importação das planilhas reais é feita pela tela de importação do site, direto do computador para o banco de dados.
- Para desenhar as tabelas e a importação, basta uma planilha de exemplo com nomes e e-mails fictícios.

## 4. Tarefas

### Fase 0: Preparação
- [x] 0.1 Criar contas no GitHub, Supabase e Vercel.
- [x] 0.2 Instalar Git, Node.js e o Claude Code no computador (Mac).
- [x] 0.3 Criar a pasta do projeto e colocar nela o `SPEC.md` e o `PLAN.md`.
- [x] 0.4 Gerar o `CLAUDE.md` com as regras do projeto (idioma em português, spec como fonte da verdade, nunca expor dados pessoais em área pública, usar apenas dados fictícios até a Fase 10).
  - Aceite: ao iniciar o Claude Code na pasta, ele resume corretamente o objetivo do site.

### Fase 1: Fundação e acessos
- [x] 1.1 Criar o projeto no Supabase, escolhendo a região de São Paulo.
- [x] 1.2 Projeto base no ar (página inicial simples) e publicado na Vercel.
- [x] 1.3 Login e senha por e-mail, cadastro feito pelo administrador.
- [x] 1.4 Tabela de pessoas com categoria (escada: Acolhida, Formação 1, 2 e 3, Lumeniano, Pré-Candidato, Candidato 1 e 2, Consagrado).
- [x] 1.5 Tabela de funções (Assistentes, Conselho, Responsável de Grupo, Acompanhador, Economato etc.), com possibilidade de acumular funções.
- [x] 1.6 Painel do Controlador Geral para definir categoria e funções de cada pessoa.
- [ ] 1.7 Regra de acesso por escada (cada categoria vê a sua e as anteriores) e acesso total do Controlador Geral.
  - Aceite: com usuários de teste de categorias diferentes, cada um só enxerga o que a spec permite. Visitante só vê a área pública.

### Fase 2: Área pública
- [ ] 2.1 Página pública com apresentação da comunidade.
- [ ] 2.2 Espaço para a prestação de contas numérica (sem nomes).
  - Aceite: nenhum dado pessoal aparece sem login.

### Fase 3: Grupos e frequência
- [ ] 3.1 Criar e encerrar grupos (Assistência Apostólica e da Vida Consagrada); nomear grupo (Responsável de Grupo).
- [ ] 3.2 Incluir, retirar e realocar membros, mantendo o histórico.
- [ ] 3.3 Definição de Responsáveis de Grupo e Acompanhadores.
- [ ] 3.4 Lançamento de presença, ausência e confronto por reunião.
- [ ] 3.5 Registro de formação realizada e de colóquios.
- [ ] 3.6 Visões de frequência: o membro vê a sua; Responsável e Acompanhadores veem o grupo; Conselho e Controlador Geral veem todos; o Responsável do novo grupo vê o histórico do membro realocado.
  - Aceite: cada visão respeita a spec, testada com usuários de teste.

### Fase 4: Calendário
- [ ] 4.1 Calendário visível apenas para quem tem login.
- [ ] 4.2 Edição restrita a Assistente de Comunicação, Conselho e Controlador Geral.

### Fase 5: Formações e documentos
- [ ] 5.1 Envio de documentos e formações (Assistente de Formação, Conselho, Controlador Geral).
- [ ] 5.2 Cada arquivo é associado a uma categoria e fica visível a ela e às categorias seguintes na escada.
  - Aceite: um documento de Lumeniano não aparece para Formação 3.

### Fase 6: Eventos e inscrições
- [ ] 6.1 Criar formulário de inscrição de evento (funções autorizadas na spec).
- [ ] 6.2 Acompanhar as inscrições recebidas.

### Fase 7: Economato
- [ ] 7.1 Lançamento de quem fez as partilhas (Assistência do Economato).
- [ ] 7.2 Visualização das partilhas apenas por Responsáveis de Grupo e Economato.
- [ ] 7.3 Publicação do documento de prestação de contas, somente numérico.

### Fase 8: Censo e desligamentos
- [ ] 8.1 Censo geral automático: total e quantidade por categoria (sem Acolhida).
- [ ] 8.2 Registro de saída como demitido ou pedido de afastamento, sem motivo.
- [ ] 8.3 Tela de totais por ano e total geral, com acesso definido pelo Controlador Geral (Assistência Apostólica, Conselho e Controlador Geral).

### Fase 9: Informativos
- [ ] 9.1 Publicação e leitura de informativos da comunidade.

### Fase 10: Importação das planilhas e dashboard
- [ ] 10.1 Receber a planilha de exemplo (com dados fictícios) e conferir as colunas com as tabelas do site.
- [ ] 10.2 Tela de importação de membros e histórico (arquivo CSV ou Excel), com relatório de linhas com erro.
- [ ] 10.3 Testar a importação com uma planilha de teste e conferir linha a linha.
- [ ] 10.4 Dashboard de frequência, censo e grupos, respeitando as regras de acesso da spec.
- [ ] 10.5 Importação das planilhas reais, feita por quem tem permissão, direto pela tela do site.
  - Aceite: os totais do dashboard batem com a contagem manual das planilhas.

### Fase 11: Identidade visual e lançamento
- [ ] 11.1 Aplicar logo, cores e fotos.
- [ ] 11.2 Domínio próprio.
- [ ] 11.3 Preencher e revisar a Política de Privacidade e o Termo de Ciência e Consentimento (minutas já redigidas), e publicá-los no site, com aceite eletrônico no primeiro acesso.
- [ ] 11.4 Revisão final de segurança e LGPD (acessos, dados expostos, registro de consentimento).
- [ ] 11.5 Treinamento do Controlador Geral e entrega.

## 5. Decisões pendentes

1. Preencher os campos em aberto da Política de Privacidade e do Termo (nome da comunidade, CNPJ, encarregado, prazo de retenção, foro).
2. Enviar uma planilha de exemplo com dados fictícios (Fase 10.1).
3. Identidade visual: logo, cores e fotos (Fase 11).
