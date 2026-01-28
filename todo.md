# Hikari Melodia - Escola Objetivo de Iwata

## Tarefas Anteriores (Concluídas)
- [x] Localizar o componente/página referente à "Escola Objetivo de Iwata" no `App.tsx` original
- [x] Analisar a estrutura da página da Escola Objetivo (seções, design, conteúdo)
- [x] Identificar a implementação completa da Área Administrativa (Dashboard) no código original
- [x] Criar um sistema de navegação claro para alternar entre "Hikari Melodia" e "Escola Objetivo de Iwata"
- [x] Implementar a página da Escola Objetivo de Iwata
- [x] Garantir que todos os modais da Escola Objetivo estejam funcionando corretamente
- [x] Revisar e expandir a Área Administrativa conforme o original
- [x] Ajustar CSS do DialogContent do Lightbox no App.tsx para mobile
- [x] Ajustar CSS do DialogContent dos modais de Metodologia para mobile
- [x] Mover a seção de "Níveis de Ensino" para o componente `EscolaObjetivoPage`
- [x] Atualizar textos da seção "Confiança para Falar, Sem Medo de Errar"
- [x] Trocar imagens do carrossel (12 slides)
- [x] Remover botão "Área do Aluno"
- [x] Remover seção "Sobre a Escola"
- [x] Adicionar seção de Localização com mapa
- [x] Atualizar informações de contato e redes sociais

---

# Painel Família - Escola Objetivo de Iwata

## Fase 1: Infraestrutura
- [x] Upgrade do projeto para web-db-user (full-stack)
- [x] Criar schema do banco de dados (turmas, equipe, alunos, responsáveis, mural, diaDia, mensagens, arquivos)
- [x] Script de seed com dados fictícios realistas
- [x] Router tRPC do Painel Família com procedures básicas
- [x] Testes unitários do router

## Fase 2: Interface do Responsável
- [x] Layout isolado "App" do Painel Família
- [x] Tela de Login com Manus OAuth
- [x] Tela de Acesso Negado (usuário não cadastrado)
- [x] Header com informações do usuário e navegação
- [x] Seletor de alunos (para responsáveis com múltiplos filhos)
- [x] Aba "Meu Filho" - Perfil do aluno, notas, frequência, documentos, saúde
- [x] Aba "Dia a Dia" - Cardápio, transporte, bem-estar
- [x] Aba "Mural" - Notícias, eventos, fotos
- [x] Aba "Chat" - Seleção de setores e mensagens
- [x] Botão "Painel Família" na página Escola Objetivo

## Fase 3: Painel Administrativo (Equipe)
- [ ] Botão "Área Admin" para membros da equipe
- [ ] Dashboard da Diretora com visão geral
- [ ] Gestão de alunos e turmas
- [ ] Gestão de equipe e permissões
- [ ] Criação de posts no mural
- [ ] Registro de bem-estar dos alunos
- [ ] Registro de cardápio
- [ ] Visualização e resposta de mensagens

## Fase 4: Sistema de Upload
- [ ] Upload de arquivos para S3
- [ ] Anexos no chat
- [ ] Fotos no mural
- [ ] Documentos dos alunos

## Fase 5: Testes e Validação
- [x] Testes unitários do router
- [ ] Testes de integração
- [ ] Validação de fluxos completos

## Fase 6: Sistema de Login/Cadastro do Painel Família
- [x] Criar tela de login com opções Google e cadastro Nome/Email
- [x] Implementar lógica de cadastro simples no backend (salvar nome/email)
- [x] Integrar fluxo de autenticação com redirecionamento ao Painel Família
- [x] Testar fluxo completo de login/cadastro
- [x] Implementar tela de boas-vindas para usuários não cadastrados
- [x] Permitir auto-cadastro de responsáveis via formulário

## Bug Fixes
- [x] Corrigir erro de query SQL com lista vazia de matrículas (IN ())

## Fase 7: Botão Admin no Painel Família
- [x] Adicionar botão "Admin" na parte superior esquerda do Painel Família
- [x] Criar menu suspenso com opções de cargo (Diretor, Coordenador, Professor, Secretaria, Cantina, Transporte)
- [x] Implementar modal administrativo com abas:
  - [x] Mensagens recebidas (ler e responder mensagens dos pais)
  - [x] Nova postagem (publicar no Mural ou Dia a Dia)
  - [x] Gerenciar equipe (apenas para Diretora - criar/remover perfis)
- [x] Botão visível para todos os usuários (sem autenticação extra nesta fase)
