# Análise de Componentes Faltantes - Hikari Melodia

Após reanalisar o código original (`hikari-reference/App.tsx`), identifiquei os seguintes componentes e páginas que precisam ser implementados ou ajustados no projeto atual para garantir 100% de fidelidade:

## Páginas Faltantes ou Incompletas

1.  **WelcomePage (Página de Boas-vindas)**
    *   **Estado Atual:** Implementação básica no `App.tsx` atual.
    *   **Referência:** O código original possui uma versão muito mais rica (linhas 1228-1308), incluindo:
        *   Animação de "Check" saltitante.
        *   Card "Sua Primeira Missão" com player de áudio simulado (botão Play/Pause e barra de progresso).
        *   Card de QR Code para instalar o App.
        *   Card de "Prêmio Físico" com estimativa de entrega e endereço do usuário.
        *   Botão para entrar no Grupo de Pais no WhatsApp.
    *   **Ação:** Substituir a `WelcomePage` atual pela versão completa da referência.

2.  **HikariMelodiaPage (Landing Page Alternativa/Principal)**
    *   **Estado Atual:** O `App.tsx` atual implementa uma `LandingPage` misturada.
    *   **Referência:** O código original define um componente `HikariMelodiaPage` (linhas 1310-1368) que parece ser uma versão específica ou a versão principal da landing page, com:
        *   Hero Section com vídeo do YouTube (`iframe`).
        *   Sessão de Storytelling ("Por que tantas crianças...").
        *   Design específico para a seção Hero diferente da atual.
    *   **Ação:** Verificar se a `LandingPage` atual deve ser substituída ou mesclada com a `HikariMelodiaPage`. Pela análise, a `HikariMelodiaPage` parece ser a versão mais atualizada/correta do Hero e Storytelling.

3.  **CheckoutPage**
    *   **Estado Atual:** Implementada, mas verificar se todos os campos e estilos batem com a referência (linhas 1123-1226).
    *   **Ação:** Revisar a implementação para garantir fidelidade total (ex: placeholder do endereço, layout dos botões).

## Componentes Faltantes

1.  **Modais de Metodologia (`MethodologyModal`)**
    *   **Estado Atual:** Implementado.
    *   **Ação:** Validar se os conteúdos e estilos estão idênticos.

2.  **Modais de Níveis de Ensino (`CrecheModal`, `EducacaoInfantilModal`, etc.)**
    *   **Estado Atual:** Implementados.
    *   **Ação:** Validar conteúdo.

3.  **Dashboard Admin (`Dashboard`)**
    *   **Estado Atual:** Implementado.
    *   **Ação:** Validar métricas e layout.

## Plano de Ação Imediato

1.  Atualizar `WelcomePage` com a versão completa (Player, QR Code, Entrega).
2.  Atualizar a `LandingPage` (dentro de `App.tsx`) para incorporar o Hero com Vídeo e a Seção de Storytelling da `HikariMelodiaPage` original.
3.  Revisar `CheckoutPage` para garantir precisão nos campos.

---
**Observação:** O código original parece ter duas versões de "Landing Page" ou seções que foram refatoradas. A `HikariMelodiaPage` (linhas 1310+) parece conter o conteúdo de marketing mais rico (Vídeo, Storytelling), enquanto a estrutura inicial do `App` atual pegou partes disso. Vou unificar para a versão mais rica.
