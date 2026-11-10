# SPEC.md: Site da Comunidade (versão 1.0, pendente apenas a identidade visual)

## 1. Objetivo

Unificar em um único lugar as diferentes frentes da comunidade católica: formações, frequência, documentos, informativos, calendário, inscrições em eventos e transparência financeira, com acesso por camadas.

## 2. Público

Membros da comunidade, em todas as categorias da escada de acesso (item 3), e visitantes.

## 3. Níveis de acesso (escada de categorias)

O acesso às áreas de membros funciona em escada: cada categoria acessa o conteúdo da sua categoria e o de todas as anteriores.

| Ordem | Categoria | Acessa conteúdo de |
|---|---|---|
| 0 | Visitante (sem login) | Apenas a "área pública" |
| 1 | Acolhida | Acolhida |
| 2 | Formação 1 | Acolhida, Formação 1 |
| 3 | Formação 2 | Todas as anteriores e Formação 2 |
| 4 | Formação 3 | Todas as anteriores e Formação 3 |
| 5 | Lumeniano | Todas as anteriores e Lumeniano |
| 6 | Pré-Candidato | Todas as anteriores e Pré-Candidato |
| 7 | Candidato 1 | Todas as anteriores e Candidato 1 |
| 8 | Candidato 2 | Todas as anteriores e Candidato 2 |
| 9 | Consagrado | Todas as anteriores e Consagrado |

Regras:
- Quem define quem terá acesso a cada área é o Controlador Geral.
- Todos os usuários são cadastrados com e-mail e senha.
- O Controlador Geral tem sempre acesso a tudo.
- O membro vê a própria frequência, o calendário e os documentos enviados para a sua categoria e as anteriores.
- O calendário é visível apenas para quem tem login.
- A prestação de contas é visível a todos, inclusive visitantes, e contém apenas dados numéricos, sem nomes de membros.

## 4. Funções (permissões adicionais, sobrepostas à categoria)

O Controlador Geral é quem define quem terá cada função de acesso.

Uma mesma pessoa pode acumular mais de uma função. O Conselho e o Controlador Geral veem a frequência de todos os grupos.

| Capacidade | Quem pode |
|---|---|
| Anexar documentos e formações | Assistente de Formação, Conselho, Controlador Geral |
| Criar, montar e acompanhar formulários de inscrição de eventos | Assistente de Evangelização, Assistente de Eventos, Assistente de Caridade Fraterna, Assistente da Vida Consagrada, Assistente Apostólico, Conselho, Controlador Geral |
| Modificar o Calendário | Assistente de Comunicação, Conselho, Controlador Geral |
| Incluir e retirar membros de grupo; lançar presença, ausência ou confronto nas reuniões; registrar a formação realizada e os colóquios; acompanhar tudo isso | Assistência Apostólica, Assistência da Vida Consagrada, Responsável de Grupo, Acompanhadores |
| Criar e encerrar grupos | Assistência Apostólica, Assistência da Vida Consagrada |
| Dar nome ao grupo | Responsável de Grupo |
| Definir os Responsáveis de Grupo e os Acompanhadores | Assistência da Vida Consagrada, Assistência Apostólica |
| Definir quem está em cada área de acesso | Controlador Geral |
| Lançar quem fez as partilhas | Assistência do Economato |
| Visualizar as partilhas (aba de membros) | Responsáveis de Grupo, Economato |
| Lançar o documento de prestação de contas (público, só numérico) | Assistência do Economato |
| Acessar a área de desligamentos e saídas (totais de demitidos e de pedidos de afastamento) | Assistência Apostólica, Conselho, Controlador Geral (o Controlador Geral define quem tem acesso a esta parte) |
| Acessar o censo geral da comunidade | Definido pelo Controlador Geral |

## 5. Módulos

1. Área pública (inclui prestação de contas numérica)
2. Login e gestão de acessos
3. Formações e documentos
4. Calendário (somente logados)
5. Eventos e inscrições
6. Grupos, frequência e acompanhamento (presença, ausência, confronto, formação realizada, colóquios)
7. Economato (partilhas e prestação de contas)
8. Informativos
9. Censo geral da comunidade: total de membros e quantidade por categoria (Formação 1, 2 e 3, Lumenianos, Pré-Candidatos, Candidatos 1 e 2, Consagrados). Atualizado automaticamente a partir do cadastro. A categoria Acolhida não entra no censo.
10. Desligamentos e saídas da comunidade: somente números, separados entre demitidos e pedidos de afastamento, exibidos por ano e em total geral. Não registra motivo.

## 6. Dados e regras atuais

- Hoje, os registros são feitos em planilha, em períodos distintos.
- A prestação de contas é um relatório com entradas e saídas, partilhas, eventos, doações e auxílios, apenas em valores numéricos.
- Administrador do site: Controlador Geral.
- Não há limite de usuários.
- Os grupos são dinâmicos: aumentam e diminuem conforme a necessidade. O sistema deve permitir realocar membros entre grupos e criar e encerrar grupos.
- Quando um membro é realocado ou um grupo é encerrado, o histórico de frequência é mantido. O Responsável do novo grupo passa a ter acesso a esse histórico.
- Cadastro de membros: tanto por importação das planilhas atuais quanto por digitação.

## 7. Requisitos não funcionais

- LGPD: convicção religiosa é dado pessoal sensível. Exige controle de acesso rigoroso, mínimo de dados coletados, base legal definida e guarda segura.
- Registros de frequência e partilhas visíveis somente a quem a regra permite (item 4).
- Áreas públicas e relatórios agregados não podem expor dados pessoais.
- Uso simples por pessoas sem familiaridade técnica.

## 8. Pontos em aberto

1. Identidade visual, domínio, logo, cores e fotos (a definir mais adiante).

Decisões já confirmadas: Formação 1, 2 e 3 são níveis distintos no acesso e no censo; os totais de desligamentos são exibidos por ano e total geral.
