/**
 * Router do Painel Família
 * Procedures para gerenciar dados do painel família
 */

import { z } from "zod";
import { eq, and, or, desc, sql } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { 
  equipe, 
  responsaveis, 
  alunos, 
  turmas, 
  mural, 
  diaDia, 
  mensagens 
} from "../drizzle/schema";

export const painelFamiliaRouter = router({
  /**
   * Obtém o perfil do usuário logado (responsável ou equipe)
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const userEmail = ctx.user.email;
    if (!userEmail) return null;

    // Verificar se é membro da equipe
    const equipeMembro = await db
      .select()
      .from(equipe)
      .where(and(eq(equipe.email, userEmail), eq(equipe.ativo, true)))
      .limit(1);

    if (equipeMembro.length > 0) {
      return {
        tipo: 'equipe' as const,
        data: equipeMembro[0]
      };
    }

    // Verificar se é responsável
    const responsavel = await db
      .select()
      .from(responsaveis)
      .where(and(eq(responsaveis.email, userEmail), eq(responsaveis.ativo, true)))
      .limit(1);

    if (responsavel.length > 0) {
      return {
        tipo: 'responsavel' as const,
        data: responsavel[0]
      };
    }

    return null;
  }),

  /**
   * Obtém os alunos vinculados ao responsável logado
   */
  getAlunos: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const userEmail = ctx.user.email;
    if (!userEmail) return [];

    // Buscar responsável
    const responsavel = await db
      .select()
      .from(responsaveis)
      .where(eq(responsaveis.email, userEmail))
      .limit(1);

    if (responsavel.length === 0 || !responsavel[0].filhos) return [];

    // Buscar alunos pelos números de matrícula
    const matriculas = responsavel[0].filhos as string[];
    const alunosList = await db
      .select()
      .from(alunos)
      .where(and(
        sql`${alunos.matricula} IN (${sql.join(matriculas.map(m => sql`${m}`), sql`, `)})`,
        eq(alunos.ativo, true)
      ));

    return alunosList;
  }),

  /**
   * Obtém um aluno específico por ID
   */
  getAluno: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const aluno = await db
        .select()
        .from(alunos)
        .where(eq(alunos.id, input.id))
        .limit(1);

      return aluno[0] || null;
    }),

  /**
   * Obtém posts do mural (filtrados por visibilidade)
   */
  getMural: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    // Por enquanto, retorna todos os posts públicos
    const posts = await db
      .select()
      .from(mural)
      .where(eq(mural.ativo, true))
      .orderBy(desc(mural.createdAt))
      .limit(20);

    return posts;
  }),

  /**
   * Obtém registros do dia a dia para um aluno
   */
  getDiaDia: protectedProcedure
    .input(z.object({ alunoId: z.number().optional() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      // Buscar registros de hoje
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const registros = await db
        .select()
        .from(diaDia)
        .where(eq(diaDia.ativo, true))
        .orderBy(desc(diaDia.data))
        .limit(10);

      return registros;
    }),

  /**
   * Obtém mensagens do chat
   */
  getMensagens: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const userEmail = ctx.user.email;
    if (!userEmail) return [];

    const msgs = await db
      .select()
      .from(mensagens)
      .where(or(
        eq(mensagens.remetente, userEmail),
        eq(mensagens.destinatario, userEmail)
      ))
      .orderBy(desc(mensagens.createdAt))
      .limit(50);

    return msgs;
  }),

  /**
   * Envia uma nova mensagem
   */
  sendMensagem: protectedProcedure
    .input(z.object({
      destinatario: z.string(),
      destinatarioSetor: z.enum(['professor', 'coordenacao', 'direcao', 'transporte', 'cantina', 'financeiro', 'secretaria']).optional(),
      texto: z.string().min(1),
      alunoMatricula: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userEmail = ctx.user.email;
      if (!userEmail) throw new Error("User email not found");

      // Determinar tipo do remetente
      const equipeMembro = await db
        .select()
        .from(equipe)
        .where(eq(equipe.email, userEmail))
        .limit(1);

      const remetenteTipo = equipeMembro.length > 0 ? 'equipe' : 'responsavel';
      const remetenteNome = equipeMembro.length > 0 
        ? equipeMembro[0].nome 
        : ctx.user.name || 'Usuário';

      await db.insert(mensagens).values({
        remetente: userEmail,
        remetenteNome,
        remetenteTipo,
        destinatario: input.destinatario,
        destinatarioSetor: input.destinatarioSetor,
        texto: input.texto,
        alunoMatricula: input.alunoMatricula,
        lido: false,
      });

      return { success: true };
    }),

  /**
   * Marca mensagem como lida
   */
  marcarLida: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(mensagens)
        .set({ lido: true, lidoEm: new Date() })
        .where(eq(mensagens.id, input.id));

      return { success: true };
    }),

  // ============================================
  // PROCEDURES ADMINISTRATIVAS (EQUIPE)
  // ============================================

  /**
   * Lista todos os alunos (apenas para equipe)
   */
  listAllAlunos: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    // Verificar se é equipe
    const userEmail = ctx.user.email;
    if (!userEmail) return [];

    const equipeMembro = await db
      .select()
      .from(equipe)
      .where(eq(equipe.email, userEmail))
      .limit(1);

    if (equipeMembro.length === 0) return [];

    const alunosList = await db
      .select()
      .from(alunos)
      .where(eq(alunos.ativo, true))
      .orderBy(alunos.nome);

    return alunosList;
  }),

  /**
   * Lista todas as turmas
   */
  listTurmas: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const turmasList = await db
      .select()
      .from(turmas)
      .where(eq(turmas.ativo, true))
      .orderBy(turmas.nivel, turmas.serie);

    return turmasList;
  }),

  /**
   * Lista membros da equipe
   */
  listEquipe: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const equipeList = await db
      .select()
      .from(equipe)
      .where(eq(equipe.ativo, true))
      .orderBy(equipe.cargo, equipe.nome);

    return equipeList;
  }),

  /**
   * Cria um post no mural
   */
  createMuralPost: protectedProcedure
    .input(z.object({
      tipo: z.enum(['noticia', 'evento', 'foto', 'video', 'depoimento']),
      titulo: z.string().min(1),
      conteudo: z.string().optional(),
      urlMidia: z.string().optional(),
      dataEvento: z.date().optional(),
      visibilidade: z.enum(['todos', 'turma']).default('todos'),
      turmasCodigo: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userEmail = ctx.user.email;
      if (!userEmail) throw new Error("User email not found");

      await db.insert(mural).values({
        tipo: input.tipo,
        titulo: input.titulo,
        conteudo: input.conteudo,
        urlMidia: input.urlMidia,
        dataEvento: input.dataEvento,
        postadoPor: userEmail,
        visibilidade: input.visibilidade,
        turmasCodigo: input.turmasCodigo,
      });

      return { success: true };
    }),

  /**
   * Registra bem-estar de um aluno
   */
  registrarBemEstar: protectedProcedure
    .input(z.object({
      alunoId: z.number(),
      turmaId: z.number().optional(),
      bemEstar: z.object({
        humor: z.string(),
        alimentacao: z.string(),
        interacaoSocial: z.string(),
        observacoes: z.string().optional(),
        statusConvivencia: z.enum(['normal', 'atencao', 'intervencao']).optional(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userEmail = ctx.user.email;
      if (!userEmail) throw new Error("User email not found");

      await db.insert(diaDia).values({
        data: new Date(),
        tipo: 'bem_estar',
        alunoId: input.alunoId,
        turmaId: input.turmaId,
        bemEstar: input.bemEstar,
        postadoPor: userEmail,
      });

      return { success: true };
    }),

  /**
   * Registra cardápio do dia
   */
  registrarCardapio: protectedProcedure
    .input(z.object({
      data: z.date(),
      cardapio: z.object({
        principal: z.string(),
        vegetariano: z.string().optional(),
        alergenicos: z.array(z.string()).optional(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const userEmail = ctx.user.email;
      if (!userEmail) throw new Error("User email not found");

      await db.insert(diaDia).values({
        data: input.data,
        tipo: 'cardapio',
        cardapio: input.cardapio,
        postadoPor: userEmail,
      });

      return { success: true };
    }),
});
