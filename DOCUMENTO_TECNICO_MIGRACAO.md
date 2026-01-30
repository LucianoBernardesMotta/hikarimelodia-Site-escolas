# Documento Técnico: Hikari Melodia – Escola Objetivo de Iwata

**Versão:** 1.0  
**Data:** Janeiro de 2026  
**Autor:** Manus AI

---

## 1. Visão Geral do Projeto

O projeto **Hikari Melodia – Escola Objetivo de Iwata** é uma aplicação web completa que combina duas funcionalidades principais: uma **landing page de vendas** para o curso de japonês musical "Hikari Melodia" e um **Painel Família** para comunicação entre a escola e os responsáveis pelos alunos.

### 1.1 Objetivo do Site

O site atende a dois públicos distintos com objetivos complementares. A landing page Hikari Melodia tem como objetivo converter visitantes em assinantes do curso de japonês para crianças brasileiras no Japão, utilizando uma abordagem baseada em neurociência e música. O Painel Família funciona como um portal seguro para que pais e responsáveis acompanhem a rotina escolar de seus filhos, visualizem notas, cardápios, transporte e se comuniquem diretamente com a equipe escolar.

### 1.2 Público-Alvo

O público primário são famílias brasileiras residentes no Japão (especialmente na região de Iwata, Shizuoka-ken) com filhos em idade escolar. O público secundário inclui a equipe escolar (diretora, coordenadores, professores, secretaria, cantina e transporte) que utiliza o painel administrativo para gerenciar comunicações e publicar conteúdos.

### 1.3 Principais Páginas

| Página | Descrição |
|--------|-----------|
| **Hikari Melodia (Landing Page)** | Página de vendas com hero, seções de metodologia, planos de preço, depoimentos e CTAs |
| **Escola Objetivo** | Página institucional da escola com níveis de ensino, diferenciais, localização e contato |
| **Painel Família** | Portal isolado estilo "app" com abas Meu Filho, Dia a Dia, Mural e Chat |
| **Modal Admin** | Painel administrativo para equipe escolar com Mensagens, Nova Postagem e Gerenciar Equipe |

### 1.4 Tom de Comunicação

O tom é **acolhedor, profissional e empático**, direcionado a pais preocupados com a adaptação cultural e linguística de seus filhos. Na landing page, utiliza-se copywriting emocional com base científica (neurociência). No Painel Família, o tom é mais objetivo e funcional, priorizando clareza na comunicação de informações escolares.

### 1.5 Estilo Visual Geral

O design segue uma estética **moderna, lúdica e acessível**, com influências de design "claymorphism" (efeitos de argila 3D) e gradientes suaves. A paleta de cores é vibrante mas harmoniosa, com predominância de tons ciano/turquesa para elementos principais e magenta para destaques e CTAs.

---

## 2. Arquitetura de Frontend

### 2.1 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | 19.x | Framework principal de UI |
| **TypeScript** | 5.9.x | Tipagem estática |
| **Tailwind CSS** | 4.x | Classes utilitárias de estilo |
| **tRPC** | 11.x | Comunicação type-safe com backend |
| **Wouter** | 3.x | Roteamento client-side |
| **Lucide React** | 0.453.x | Biblioteca de ícones |
| **Radix UI** | Várias | Componentes primitivos (Dialog, Dropdown, Tabs, etc.) |
| **Framer Motion** | 12.x | Animações |

### 2.2 Organização de Pastas e Arquivos

```
client/
├── public/
│   └── images/
│       └── slides/           # 12 imagens do carrossel (slide-01.jpg a slide-12.jpg)
├── src/
│   ├── _core/
│   │   └── hooks/
│   │       └── useAuth.ts    # Hook de autenticação
│   ├── components/
│   │   └── ui/               # Componentes shadcn/ui (Button, Card, Dialog, etc.)
│   ├── contexts/
│   │   └── ThemeContext.tsx  # Contexto de tema (light/dark)
│   ├── lib/
│   │   └── trpc.ts           # Cliente tRPC
│   ├── pages/
│   │   ├── Home.tsx          # Página inicial (não utilizada diretamente)
│   │   ├── NotFound.tsx      # Página 404
│   │   └── PainelFamilia.tsx # Componente completo do Painel Família
│   ├── App.tsx               # Componente raiz com todas as páginas e navegação
│   ├── main.tsx              # Ponto de entrada com providers
│   ├── index.css             # Estilos globais e variáveis CSS
│   └── const.ts              # Constantes (URLs de login, etc.)
```

### 2.3 Componentes Principais

O arquivo `App.tsx` contém aproximadamente 1.800 linhas e inclui todos os componentes da landing page e da página institucional. Os principais componentes são:

**Landing Page Hikari Melodia:**
- `SakuraBackground` – Animação de pétalas de sakura flutuantes
- `MusicalBackground` – Notas musicais animadas no fundo
- `HeroSection` – Seção principal com vídeo do YouTube e CTA
- `PainSection` – Seção de "dores" do público-alvo
- `SolutionSection` – Apresentação da solução Hikari
- `MethodologySection` – Cards com base científica (neurociência)
- `CarouselSection` – Carrossel de 12 slides do app
- `PlansSection` – Planos de preço (Mensal e Anual)
- `TestimonialsSection` – Depoimentos de pais
- `FAQSection` – Perguntas frequentes
- `FinalCTASection` – CTA final com formulário de inscrição
- `RegistrationModal` – Modal de cadastro com formulário completo
- `AdminDashboard` – Painel de estatísticas (acessível via ícone de cadeado)

**Página Escola Objetivo:**
- `EscolaObjetivoPage` – Componente completo da página institucional
- Seções: Hero, Níveis de Ensino (cards), Diferenciais, Localização (Google Maps), Rodapé

**Painel Família (arquivo separado `PainelFamilia.tsx`):**
- `PainelFamilia` – Componente principal com ~1.800 linhas
- `LoadingScreen` – Tela de carregamento
- `LoginScreen` – Tela de login (atualmente desativada)
- `AccessDeniedScreen` – Tela de acesso negado com opção de cadastro
- `MeuFilhoTab` – Aba com informações do aluno (notas, frequência, documentos, saúde)
- `DiaDiaTab` – Aba com cardápio, transporte e bem-estar
- `MuralTab` – Aba com posts da escola (notícias, eventos, fotos)
- `ChatTab` – Aba de mensagens com a equipe escolar
- `AdminModal` – Modal administrativo com abas Mensagens, Nova Postagem, Gerenciar Equipe

---

## 3. Descrição Detalhada do Painel Família

### 3.1 Layout Geral

O Painel Família é uma interface isolada estilo "app" que ocupa toda a tela, sem o header/footer do site institucional. O layout é dividido em:

**Header (fixo no topo):**
- Logo da escola (ícone GraduationCap em gradiente ciano)
- Título "Painel Família" com subtítulo "Escola Objetivo de Iwata"
- Botão "Admin" com dropdown de cargos (borda magenta, fundo branco)
- Avatar do usuário com nome e tipo (Visitante/Responsável/Equipe)
- Botão "Voltar ao Site" (ícone Home)
- Botão de Logout (ícone LogOut)

**Área Principal:**
- Seletor de aluno (se o responsável tiver múltiplos filhos)
- Tabs de navegação: Meu Filho, Dia a Dia, Mural, Chat

### 3.2 Componentes e Estados

**Estados principais do componente `PainelFamilia`:**

```typescript
const [activeTab, setActiveTab] = useState('meu-filho');
const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
const [userProfile, setUserProfile] = useState<{ tipo: 'responsavel' | 'equipe'; data: Responsavel | EquipeMembro } | null>(null);
const [adminModalOpen, setAdminModalOpen] = useState(false);
const [selectedCargo, setSelectedCargo] = useState<CargoAdmin | null>(null);
const [adminTab, setAdminTab] = useState('mensagens');
```

**Queries tRPC utilizadas:**
- `trpc.painelFamilia.getProfile` – Obtém perfil do usuário logado
- `trpc.painelFamilia.getAlunos` – Lista alunos vinculados ao responsável
- `trpc.painelFamilia.getMural` – Lista posts do mural
- `trpc.painelFamilia.getDiaDia` – Registros do dia a dia do aluno
- `trpc.painelFamilia.getMensagens` – Mensagens do chat

### 3.3 Aba "Meu Filho"

Esta aba exibe informações completas do aluno selecionado, organizadas em cards:

**Card "Desempenho Acadêmico":**
- Notas por disciplina (Português, Matemática, Ciências, História, Geografia)
- Barra de progresso colorida para cada nota
- Frequência geral (porcentagem)
- Dias ausentes

**Card "Atividades Pendentes":**
- Lista de tarefas com status (entregue/pendente)
- Prazo de entrega
- Ícones de status (CheckCircle2 verde / AlertCircle amarelo)

**Card "Documentos":**
- Cartão de Vacina, Autorização de Transporte, Termo de Uniforme
- Status de entrega (ícone verde/vermelho)

**Card "Saúde e Segurança":**
- Alergias (badges vermelhos)
- Medicamentos autorizados (nome, dose, horário)
- Contatos médicos (clínica, pediatra, plano de saúde)
- Contatos de emergência

### 3.4 Aba "Dia a Dia"

Exibe registros diários organizados por tipo:

**Cardápio:**
- Prato principal
- Opção vegetariana
- Alergênicos destacados em badges vermelhos

**Transporte:**
- Horário de saída e previsão de chegada
- Nome e foto do motorista
- Telefone de contato

**Bem-Estar:**
- Humor do dia (emoji)
- Alimentação
- Interação social
- Observações da professora

### 3.5 Aba "Mural"

Lista de posts da escola com diferentes tipos:

| Tipo | Ícone | Cor |
|------|-------|-----|
| Notícia | Megaphone | Azul |
| Evento | Calendar | Verde |
| Foto | ImageIcon | Rosa |
| Vídeo | Video | Vermelho |
| Depoimento | Star | Amarelo |

Cada post exibe: título, conteúdo, autor, data de criação e mídia (se houver).

### 3.6 Aba "Chat"

Interface de mensagens com a equipe escolar:

**Seletor de Setor:**
- Professor(a)
- Coordenação
- Direção
- Transporte
- Cantina
- Financeiro
- Secretaria

**Lista de Mensagens:**
- Mensagens enviadas (alinhadas à direita, fundo ciano)
- Mensagens recebidas (alinhadas à esquerda, fundo cinza)
- Data/hora de cada mensagem
- Indicador de lido/não lido

**Campo de Envio:**
- Input de texto
- Botão de anexo (Paperclip)
- Botão de enviar (Send)

### 3.7 Botão Admin e Modal Administrativo

**Botão Admin:**
- Posição: header, à direita do título
- Estilo: borda magenta (#D21E9D), fundo branco, ícone Shield
- Ao clicar: abre dropdown com lista de cargos

**Dropdown de Cargos:**
- Fundo branco sólido, borda cinza, sombra
- Opções: Diretor(a), Coordenador(a), Professor(a), Secretaria, Cantina, Transporte
- Cada opção tem ícone colorido correspondente

**Modal Administrativo:**
- Fundo branco sólido, borda cinza, sombra, cantos arredondados
- Header: "Painel Administrativo" com cargo selecionado
- Tabs: Mensagens, Nova Postagem, Gerenciar Equipe (apenas para Diretor)

**Aba "Mensagens" (Admin):**
- Lista de mensagens recebidas dos pais
- Cada mensagem mostra: remetente, assunto, data, status (Nova/Lida)
- Campo para responder diretamente
- Botão "Responder" com ícone Send

**Aba "Nova Postagem" (Admin):**
- Seletor de tipo: Mural ou Dia a Dia
- Seletor de categoria: Notícia, Evento, Foto, Vídeo, Depoimento
- Campo de título
- Campo de conteúdo (textarea)
- Upload de mídia (foto/vídeo)
- Seletor de visibilidade: Todos ou Turma específica
- Botão "Publicar"

**Aba "Gerenciar Equipe" (apenas Diretor):**
- Lista de membros da equipe com cargo e turmas
- Botão "Adicionar Membro" (abre formulário)
- Botões de editar/remover em cada membro
- Formulário: Nome, Email, Cargo (select), Turmas (multi-select)

---

## 4. Descrição Detalhada da Landing Page Hikari Melodia

### 4.1 Hero Section

A seção hero ocupa a altura total da viewport (min-h-screen) com fundo gradiente ciano (#5DCCD6 para #4FBFD9). Elementos principais:

**Lado Esquerdo:**
- Badge "EDUCAÇÃO MUSICAL INOVADORA" (fundo branco, texto preto)
- Título principal: "Hikari メロディー" (fonte Baloo 2, tamanho h1)
- Subtítulo: "Aprender Japonês Não Foi Nunca Tão Musical"
- Parágrafo descritivo do programa
- Botão CTA principal: "QUERO COMEÇAR AGORA" (fundo magenta, ícone Zap)

**Lado Direito:**
- Player de vídeo do YouTube (embed responsivo)
- Borda arredondada com sombra

**Elementos Decorativos:**
- Notas musicais flutuantes (animação `note-float`)
- Nuvens com efeito blur (animação `cloudDrift`)
- Estrelas douradas com brilho (animação `starGlow`)

### 4.2 Pain Section (Seção de Dores)

Fundo branco/cinza claro com título "A Realidade Que Muitos Pais Enfrentam". Apresenta 4 cards de "dores":

| Dor | Ícone | Descrição |
|-----|-------|-----------|
| Isolamento | Users | Criança se sente diferente na escola japonesa |
| Frustração | Target | Métodos tradicionais não funcionam |
| Medo | Shield | Receio de falar e errar |
| Desconexão | Heart | Perda da conexão com a cultura brasileira |

### 4.3 Solution Section

Apresenta o Hikari Melodia como solução, com cards explicativos sobre:
- Aprendizado através da música
- Metodologia baseada em neurociência
- Comunidade de apoio (Alianças)
- Resultados comprovados

### 4.4 Methodology Section

4 cards detalhados sobre a base científica do método:

| Card | Título | Cor |
|------|--------|-----|
| 1 | Ativação Neuroquímica | Roxo |
| 2 | Córtex Auditivo | Índigo |
| 3 | Fisioterapia Digital | Rosa |
| 4 | Vínculo Social | Verde |

Cada card é clicável e abre um modal com explicação científica detalhada, incluindo fontes acadêmicas.

### 4.5 Carousel Section

Título: "Confiança para Falar, Sem Medo de Errar"

Carrossel horizontal com 12 slides (imagens do app Hikari):
- Navegação por setas (esquerda/direita)
- Indicadores de posição (dots)
- Transição suave entre slides
- Imagens: `/images/slides/slide-01.jpg` até `slide-12.jpg`

### 4.6 Plans Section

Dois cards de planos lado a lado:

**Plano Mensal:**
- Preço: ¥2.980/mês
- Lista de benefícios
- Botão "Começar Agora"

**Plano Anual (destaque):**
- Badge "MAIS POPULAR"
- Preço: ¥29.800/ano (economia de 2 meses)
- Lista de benefícios
- Botão "Garantir Minha Vaga" (magenta)

### 4.7 Testimonials Section

Carrossel de depoimentos de pais com:
- Foto do responsável (avatar)
- Nome e localização
- Texto do depoimento
- Avaliação em estrelas

### 4.8 FAQ Section

Accordion com perguntas frequentes:
- "Para qual idade é indicado?"
- "Preciso saber japonês para ajudar meu filho?"
- "Como funciona o acesso?"
- "Posso cancelar a qualquer momento?"

### 4.9 Final CTA Section

Seção final com:
- Título de urgência
- Contador de vagas restantes (simulado)
- Botão CTA grande
- Garantia de satisfação

### 4.10 Registration Modal

Modal de cadastro com formulário:
- Nome da criança
- Idade
- Nome do responsável
- Endereço
- WhatsApp
- Seleção de plano (Mensal/Anual)
- Botão "Confirmar Inscrição"

---

## 5. Design System / Style Guide

### 5.1 Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Ciano Hikari | `#5DCCD6` | Cor principal, fundos, botões secundários |
| Turquesa Evolução | `#4FBFD9` | Gradientes, variação do ciano |
| Magenta Destaque | `#D21E9D` | CTAs, botões de ação, destaques |
| Magenta Vibrante | `#E91E8C` | Gradientes de botões |
| Amarelo Conquista | `#FFD700` | Estrelas, badges de destaque |
| Verde Crescimento | `#60D394` | Sucesso, confirmações |
| Grafite Texto | `#2D3436` | Texto principal |
| Azul Calma | `#5A9DFC` | Links, informações |
| Rosa Alegria | `#FFB3D9` | Pétalas de sakura, elementos decorativos |
| Verde Objetivo | `#4CAF50` | Elementos da Escola Objetivo |

### 5.2 Tipografia

| Fonte | Uso |
|-------|-----|
| **Baloo 2** | Títulos (h1, h2, h3), elementos lúdicos |
| **Nunito** | Corpo de texto, parágrafos |
| **Inter** | Elementos de interface, labels, dados |

**Tamanhos:**
- H1: `clamp(2rem, 5vw, 3rem)`, peso 800
- H2: `clamp(1.75rem, 4vw, 2.5rem)`, peso 700
- Body: `clamp(1rem, 2vw, 1.125rem)`, line-height 1.7

### 5.3 Estilo de Componentes

**Botões Primários (`.hikari-btn-primary`):**
- Fundo: preto
- Texto: branco
- Border-radius: 30px
- Sombra: `0 4px 16px rgba(0,0,0,0.12)`
- Hover: fundo 85% opacidade, translate-y -0.5, sombra maior

**Botões de Destaque (`.hikari-btn-accent`):**
- Fundo: gradiente magenta (135deg, #D21E9D → #E91E8C)
- Texto: branco
- Border-radius: 30px
- Hover: opacidade 90%, translate-y -0.5

**Botão Admin:**
- Borda: 1px solid #D21E9D
- Fundo: branco (transparente)
- Texto: #D21E9D
- Hover: fundo #D21E9D/10

**Cards:**
- Fundo: branco
- Border-radius: 16px (lg) ou 12px (md)
- Sombra: `0 4px 6px -1px rgba(0,0,0,0.1)`
- Padding: 24px

**Modais:**
- Fundo: branco sólido
- Border: 1px solid #e5e7eb
- Border-radius: 16px
- Sombra: `0 25px 50px -12px rgba(0,0,0,0.25)`
- Overlay: preto 50% opacidade

**Dropdowns:**
- Fundo: branco sólido
- Border: 1px solid #e5e7eb
- Border-radius: 8px
- Sombra: `0 10px 15px -3px rgba(0,0,0,0.1)`
- Item hover: fundo cinza claro

### 5.4 Espaçamento e Layout

- Container máximo: 1280px (max-w-7xl)
- Padding horizontal: 16px (mobile), 24px (tablet), 32px (desktop)
- Gap entre seções: 64px a 96px
- Gap entre cards: 24px
- Border-radius padrão: 30px (botões), 16px (cards), 8px (inputs)

### 5.5 Animações

| Animação | Duração | Uso |
|----------|---------|-----|
| `sakuraFloat` | 10s linear infinite | Pétalas de sakura caindo |
| `note-float` | variável, linear infinite | Notas musicais subindo |
| `cloudDrift` | 11s ease-in-out infinite | Nuvens flutuantes |
| `starGlow` | 2s ease-in-out infinite | Brilho das estrelas |
| `pulse-scale` | 2s ease-in-out infinite | Pulsação de CTAs |
| `bounce-subtle` | 0.8s ease-in-out infinite | Bounce suave |
| `clay-pulse` | 3s infinite | Efeito de argila pulsante |

**Transições padrão:**
- Duração: 300ms
- Timing: ease-out
- Propriedades: all (ou específicas como transform, opacity)

---

## 6. Fluxo de Navegação do Usuário

### 6.1 Navegação Principal

O site utiliza um sistema de navegação por estado (`currentView`) em vez de rotas tradicionais:

```typescript
type ViewType = 'hikari' | 'escola' | 'painel-familia';
const [currentView, setCurrentView] = useState<ViewType>('hikari');
```

**Header de Navegação:**
- Botão "Hikari Melodia" → `setCurrentView('hikari')`
- Botão "Escola Objetivo" → `setCurrentView('escola')`
- Ícone de cadeado (Lock) → Abre AdminDashboard (estatísticas)

### 6.2 Fluxo: Landing Page → Painel Família

1. Usuário acessa o site (página Hikari Melodia)
2. Clica em "Escola Objetivo" no header
3. Na página da escola, clica no botão "Painel Família"
4. Sistema redireciona para o Painel Família (view isolada)
5. Usuário visualiza as abas (Meu Filho, Dia a Dia, Mural, Chat)

### 6.3 Fluxo: Menu Admin

1. No Painel Família, usuário clica no botão "Admin" (header)
2. Dropdown abre com lista de cargos
3. Usuário seleciona um cargo (ex: "Diretor(a)")
4. Modal administrativo abre com abas correspondentes
5. Usuário navega entre Mensagens, Nova Postagem, Gerenciar Equipe
6. Para fechar: clica no X ou fora do modal

### 6.4 Fluxo: Área dos Pais

**Seleção de Aluno:**
1. Se responsável tem múltiplos filhos, aparece seletor
2. Clica no nome do filho desejado
3. Todas as abas atualizam para mostrar dados daquele aluno

**Visualização do Dia a Dia:**
1. Clica na aba "Dia a Dia"
2. Visualiza cards de Cardápio, Transporte, Bem-Estar
3. Cada card mostra informações do dia atual

**Leitura do Mural:**
1. Clica na aba "Mural"
2. Lista de posts aparece ordenada por data
3. Clica em um post para expandir detalhes

**Uso do Chat:**
1. Clica na aba "Chat"
2. Seleciona setor de destino (Professor, Coordenação, etc.)
3. Digita mensagem no campo de texto
4. Clica em "Enviar" ou pressiona Enter
5. Mensagem aparece na lista de conversas

---

## 7. Lógica de Autenticação e Permissões

### 7.1 Estado Anterior (com autenticação)

O sistema utilizava Manus OAuth para autenticação via Google:

```typescript
const { user, loading: authLoading, logout } = useAuth();

// Verificações de acesso:
if (authLoading) return <LoadingScreen />;
if (!user) return <LoginScreen />;
if (!userProfile) return <AccessDeniedScreen />;
```

**Fluxo de Login:**
1. Usuário clicava em "Entrar com Google"
2. Redirecionava para Manus OAuth
3. Após autenticação, verificava se email estava cadastrado
4. Se não cadastrado, mostrava tela de cadastro
5. Se cadastrado, carregava perfil e dados

### 7.2 Estado Atual (sem autenticação)

A autenticação foi removida para facilitar testes:

```typescript
// Loading state (apenas para queries, não para autenticação)
if (profileLoading && user) {
  return <LoadingScreen />;
}

// Acesso livre - sem verificação de autenticação
```

**Comportamento atual:**
- Qualquer usuário acessa o Painel Família
- Perfil exibe "Visitante" se não autenticado
- Botão Admin visível para todos
- Queries retornam dados vazios se não autenticado

### 7.3 Regras de Acesso Planejadas (Produção)

| Perfil | Acesso |
|--------|--------|
| **Visitante** | Apenas visualização do site institucional |
| **Responsável** | Painel Família completo (abas Meu Filho, Dia a Dia, Mural, Chat) |
| **Professor** | Admin: Mensagens, Nova Postagem (Dia a Dia) |
| **Coordenador** | Admin: Mensagens, Nova Postagem (Mural + Dia a Dia) |
| **Diretor** | Admin: Todas as abas + Gerenciar Equipe |
| **Secretaria** | Admin: Mensagens, vincular alunos a responsáveis |
| **Cantina** | Admin: Nova Postagem (Cardápio) |
| **Transporte** | Admin: Nova Postagem (Transporte) |

---

## 8. Estrutura de Dados / Banco de Dados

### 8.1 Entidades Principais

**Tabela: `users`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| openId | VARCHAR(64) | ID do Manus OAuth |
| name | TEXT | Nome do usuário |
| email | VARCHAR(320) | Email |
| loginMethod | VARCHAR(64) | Método de login (google) |
| role | ENUM('user', 'admin') | Papel no sistema |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |
| lastSignedIn | TIMESTAMP | Último login |

**Tabela: `turmas`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| codigo | VARCHAR(10) | Código da turma (ex: "3B") |
| serie | VARCHAR(50) | Série (ex: "3º ano") |
| nivel | ENUM | creche, educacao_infantil, fundamental, medio |
| professorTitularId | INT | FK para equipe |
| ativo | BOOLEAN | Status ativo |

**Tabela: `equipe`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| email | VARCHAR(320) | Email único |
| nome | VARCHAR(255) | Nome completo |
| cargo | ENUM | diretor, coordenador, professor, cantina, transporte, secretaria, financeiro |
| turmas | JSON | Array de códigos de turmas |
| telefone | VARCHAR(20) | Telefone |
| foto | TEXT | URL da foto |
| ativo | BOOLEAN | Status ativo |

**Tabela: `alunos`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| matricula | VARCHAR(20) | Matrícula única |
| nome | VARCHAR(255) | Nome completo |
| dataNascimento | TIMESTAMP | Data de nascimento |
| turmaId | INT | FK para turmas |
| foto | TEXT | URL da foto |
| notas | JSON | `{ "disciplina": [nota1, nota2] }` |
| frequencia | INT | Porcentagem de frequência |
| diasAusentes | INT | Dias ausentes |
| atividadesPendentes | JSON | Array de atividades |
| documentos | JSON | Status de documentos |
| alergias | JSON | Array de alergias |
| medicamentosAutorizados | JSON | Array de medicamentos |
| contatosMedicos | JSON | Contatos médicos |
| contatosEmergencia | JSON | Array de contatos |
| ativo | BOOLEAN | Status ativo |

**Tabela: `responsaveis`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| email | VARCHAR(320) | Email único |
| nome | VARCHAR(255) | Nome completo |
| telefone | VARCHAR(20) | Telefone |
| parentesco | VARCHAR(50) | Pai, Mãe, Avó, etc. |
| filhos | JSON | Array de matrículas dos filhos |
| contatosEmergencia | JSON | Array de contatos |
| ativo | BOOLEAN | Status ativo |

**Tabela: `mural`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| tipo | ENUM | noticia, evento, foto, video, depoimento |
| titulo | VARCHAR(255) | Título do post |
| conteudo | TEXT | Conteúdo |
| urlMidia | TEXT | URL de imagem/vídeo |
| dataEvento | TIMESTAMP | Data do evento |
| postadoPor | VARCHAR(320) | Email do autor |
| visibilidade | ENUM | todos, turma |
| turmasCodigo | JSON | Array de turmas (se visibilidade = turma) |
| expiracaoEm | TIMESTAMP | Data de expiração |
| ativo | BOOLEAN | Status ativo |

**Tabela: `dia_dia`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| data | TIMESTAMP | Data do registro |
| tipo | ENUM | cardapio, transporte, atividade, material, bem_estar |
| turmaId | INT | FK para turmas |
| alunoId | INT | FK para alunos (bem-estar individual) |
| cardapio | JSON | `{ principal, vegetariano, alergenicos }` |
| transporte | JSON | `{ horarioSaida, previsaoChegada, motorista, ... }` |
| descricao | TEXT | Descrição da atividade |
| itens | JSON | Array de itens/materiais |
| bemEstar | JSON | `{ humor, alimentacao, interacaoSocial, observacoes }` |
| postadoPor | VARCHAR(320) | Email do autor |
| ativo | BOOLEAN | Status ativo |

**Tabela: `mensagens`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| alunoMatricula | VARCHAR(20) | Contexto da conversa |
| remetente | VARCHAR(320) | Email do remetente |
| remetenteNome | VARCHAR(255) | Nome do remetente |
| remetenteTipo | ENUM | responsavel, equipe |
| destinatario | VARCHAR(320) | Email do destinatário |
| destinatarioSetor | ENUM | professor, coordenacao, direcao, transporte, cantina, financeiro, secretaria |
| texto | TEXT | Conteúdo da mensagem |
| anexoUrl | TEXT | URL do anexo |
| anexoTipo | VARCHAR(50) | MIME type do anexo |
| lido | BOOLEAN | Status de leitura |
| lidoEm | TIMESTAMP | Data de leitura |
| createdAt | TIMESTAMP | Data de criação |

**Tabela: `arquivos`**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK) | ID auto-incrementado |
| nomeOriginal | VARCHAR(255) | Nome original do arquivo |
| nomeArmazenado | VARCHAR(255) | Nome no storage |
| mimeType | VARCHAR(100) | Tipo MIME |
| tamanho | INT | Tamanho em bytes |
| url | TEXT | URL de acesso |
| enviadoPor | VARCHAR(320) | Email do uploader |
| createdAt | TIMESTAMP | Data de upload |

### 8.2 Relacionamentos

```
users (1) ←→ (1) responsaveis [via email]
users (1) ←→ (1) equipe [via email]
responsaveis (1) ←→ (N) alunos [via filhos[] → matricula]
turmas (1) ←→ (N) alunos [via turmaId]
turmas (N) ←→ (N) equipe [via turmas[] → codigo]
alunos (1) ←→ (N) dia_dia [via alunoId]
turmas (1) ←→ (N) dia_dia [via turmaId]
responsaveis/equipe (1) ←→ (N) mensagens [via remetente/destinatario]
```

### 8.3 Procedures tRPC

| Procedure | Tipo | Descrição |
|-----------|------|-----------|
| `cadastrarResponsavel` | Mutation | Cria novo responsável (nome, email, telefone) |
| `verificarEmail` | Query | Verifica se email existe como responsável ou equipe |
| `getProfile` | Query | Retorna perfil do usuário logado |
| `getAlunos` | Query | Lista alunos vinculados ao responsável |
| `getAluno` | Query | Retorna aluno específico por ID |
| `getMural` | Query | Lista posts do mural |
| `getDiaDia` | Query | Lista registros do dia a dia |
| `getMensagens` | Query | Lista mensagens do chat |
| `sendMensagem` | Mutation | Envia nova mensagem |
| `marcarLida` | Mutation | Marca mensagem como lida |
| `listAllAlunos` | Query | Lista todos os alunos (admin) |
| `listTurmas` | Query | Lista todas as turmas |
| `listEquipe` | Query | Lista membros da equipe |
| `createMuralPost` | Mutation | Cria post no mural |
| `registrarBemEstar` | Mutation | Registra bem-estar de aluno |
| `registrarCardapio` | Mutation | Registra cardápio do dia |

---

## 9. Comportamento Dinâmico e Animações

### 9.1 Transições de Tabs

As tabs utilizam o componente Radix UI `Tabs` com transições suaves:

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="meu-filho">Meu Filho</TabsTrigger>
    {/* ... */}
  </TabsList>
  <TabsContent value="meu-filho">
    {/* Conteúdo com fade-in */}
  </TabsContent>
</Tabs>
```

**Comportamento:**
- Tab ativa: fundo ciano, texto branco
- Tab inativa: fundo transparente, texto cinza
- Transição: 200ms ease-out
- Conteúdo: fade-in ao trocar

### 9.2 Estados de Loading

**LoadingScreen:**
- Spinner animado (ícone girando)
- Texto "Carregando..."
- Fundo semi-transparente

**Skeleton Loading:**
- Cards com fundo cinza pulsante
- Linhas de texto com gradiente animado

### 9.3 Feedbacks Visuais

**Botões:**
- Hover: translate-y -2px, sombra maior
- Active: scale 0.98
- Disabled: opacidade 50%, cursor not-allowed

**Inputs:**
- Focus: borda ciano, ring azul
- Error: borda vermelha, mensagem de erro abaixo

**Mensagens:**
- Enviada: slide-in da direita
- Recebida: slide-in da esquerda
- Nova: badge "Nova" com pulse

### 9.4 Animações de Dropdown e Modal

**Dropdown:**
- Abertura: scale de 0.95 para 1, opacity de 0 para 1
- Duração: 150ms
- Timing: ease-out

**Modal:**
- Abertura: scale de 0.95 para 1, opacity de 0 para 1
- Overlay: fade-in 200ms
- Fechamento: reverse das animações

### 9.5 Carrossel de Slides

**Navegação:**
- Setas laterais com hover effect
- Transição entre slides: 300ms ease-out
- Indicadores (dots): opacidade muda ao trocar

**Auto-play (opcional):**
- Intervalo: 5 segundos
- Pausa ao hover

### 9.6 Animações Decorativas

**Pétalas de Sakura:**
- Caem do topo para baixo
- Rotação durante a queda
- Fade-out ao final
- 15 pétalas simultâneas

**Notas Musicais:**
- Sobem de baixo para cima
- Rotação suave
- Opacidade variável
- 15 notas simultâneas

**Nuvens:**
- Movimento horizontal suave
- Blur para efeito de profundidade
- Loop infinito

---

## 10. Requisitos para Recriação em Outra Plataforma

Para recriar este projeto em outra plataforma de desenvolvimento, os seguintes requisitos devem ser atendidos:

### 10.1 Stack Tecnológico

**Frontend:**
- HTML5 semântico
- CSS3 com variáveis customizadas (ou Tailwind CSS 4.x equivalente)
- JavaScript/TypeScript moderno (ES2022+)
- Framework de UI: React 19+ ou equivalente (Vue 3, Svelte, etc.)
- Biblioteca de ícones: Lucide ou equivalente (Heroicons, Feather)
- Componentes primitivos: Radix UI ou equivalente (Headless UI)

**Backend:**
- API REST ou tRPC para comunicação type-safe
- Banco de dados relacional (MySQL, PostgreSQL)
- ORM: Drizzle ou equivalente (Prisma, TypeORM)
- Autenticação OAuth (Google)

**Hospedagem:**
- Servidor Node.js ou equivalente
- Storage para arquivos (S3 ou equivalente)
- CDN para assets estáticos

### 10.2 Fidelidade Visual

O design deve ser replicado com máxima fidelidade, incluindo:

- Paleta de cores exata (hex codes fornecidos)
- Tipografia (Baloo 2, Nunito, Inter via Google Fonts)
- Espaçamentos e border-radius
- Sombras e gradientes
- Animações e transições
- Responsividade (mobile-first)

### 10.3 Funcionalidades Essenciais

**Landing Page:**
- Hero com vídeo embed
- Seções de conteúdo com cards
- Carrossel de imagens
- Modal de cadastro
- Accordion de FAQ

**Painel Família:**
- Sistema de tabs
- Cards de informação
- Chat em tempo real (ou simulado)
- Upload de arquivos
- Modal administrativo

### 10.4 Dados de Teste

O script de seed (`server/seed.ts`) deve ser adaptado para popular o banco com dados fictícios realistas, incluindo:

- 1 diretora
- 2 coordenadores
- 4 professores
- 2 funcionários (cantina, transporte)
- 1 secretária
- 10+ alunos
- 5+ responsáveis
- Posts no mural
- Registros de dia a dia
- Mensagens de exemplo

---

## 11. Informações de Contato da Escola

**Escola Objetivo de Iwata - Tia Rosa**
- **Diretora:** Rosa Kayoko Tinen
- **Endereço:** 438-0811 Shizuoka-ken, Iwata-shi, Hitokoto 3592
- **Telefone:** 0538-36-3225
- **E-mail:** tiarosaiwata@hotmail.com
- **Facebook:** https://www.facebook.com/groups/125278208150208
- **Instagram:** https://www.instagram.com/tiarosa_objetivo_iwata/

---

*Este documento foi gerado automaticamente para fins de migração do projeto. Todas as informações refletem o estado atual do código-fonte e banco de dados em Janeiro de 2026.*
