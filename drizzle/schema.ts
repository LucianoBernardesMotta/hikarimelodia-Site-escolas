import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// PAINEL FAMÍLIA - ESCOLA OBJETIVO DE IWATA
// ============================================

/**
 * Turmas da escola
 */
export const turmas = mysqlTable("turmas", {
  id: int("id").autoincrement().primaryKey(),
  codigo: varchar("codigo", { length: 10 }).notNull().unique(), // Ex: "3B", "4A"
  serie: varchar("serie", { length: 50 }).notNull(), // Ex: "3º ano", "Maternal II"
  nivel: mysqlEnum("nivel", ["creche", "educacao_infantil", "fundamental", "medio"]).notNull(),
  professorTitularId: int("professorTitularId"),
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Turma = typeof turmas.$inferSelect;
export type InsertTurma = typeof turmas.$inferInsert;

/**
 * Equipe escolar (diretora, coordenadores, professores, cantina, transporte, secretaria)
 */
export const equipe = mysqlTable("equipe", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  nome: varchar("nome", { length: 255 }).notNull(),
  cargo: mysqlEnum("cargo", ["diretor", "coordenador", "professor", "cantina", "transporte", "secretaria", "financeiro"]).notNull(),
  turmas: json("turmas").$type<string[]>(), // Array de códigos de turmas (ex: ["3B", "4A"])
  telefone: varchar("telefone", { length: 20 }),
  foto: text("foto"), // URL da foto
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Equipe = typeof equipe.$inferSelect;
export type InsertEquipe = typeof equipe.$inferInsert;

/**
 * Alunos matriculados
 */
export const alunos = mysqlTable("alunos", {
  id: int("id").autoincrement().primaryKey(),
  matricula: varchar("matricula", { length: 20 }).notNull().unique(), // Ex: "2024001"
  nome: varchar("nome", { length: 255 }).notNull(),
  dataNascimento: timestamp("dataNascimento"),
  turmaId: int("turmaId"),
  foto: text("foto"), // URL da foto
  // Dados acadêmicos
  notas: json("notas").$type<Record<string, number[]>>(), // Ex: { "portugues": [8.5, 9.0], "matematica": [7.0, 8.5] }
  frequencia: int("frequencia").default(100), // Porcentagem
  diasAusentes: int("diasAusentes").default(0),
  atividadesPendentes: json("atividadesPendentes").$type<{ titulo: string; entregue: boolean; prazo?: string }[]>(),
  // Documentos
  documentos: json("documentos").$type<{ cartaoVacina: boolean; autorizacaoTransporte: boolean; termoUniforme: boolean; outros?: { nome: string; entregue: boolean; prazo?: string }[] }>(),
  // Saúde e segurança
  alergias: json("alergias").$type<string[]>(),
  medicamentosAutorizados: json("medicamentosAutorizados").$type<{ nome: string; dose: string; horario: string; prescricao?: string }[]>(),
  contatosMedicos: json("contatosMedicos").$type<{ clinica?: string; pediatra?: string; planoSaude?: string }>(),
  contatosEmergencia: json("contatosEmergencia").$type<string[]>(),
  // Status
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Aluno = typeof alunos.$inferSelect;
export type InsertAluno = typeof alunos.$inferInsert;

/**
 * Responsáveis (pais/mães) vinculados aos alunos
 */
export const responsaveis = mysqlTable("responsaveis", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  nome: varchar("nome", { length: 255 }).notNull(),
  telefone: varchar("telefone", { length: 20 }),
  parentesco: varchar("parentesco", { length: 50 }), // Ex: "Pai", "Mãe", "Avó"
  filhos: json("filhos").$type<string[]>(), // Array de matrículas dos filhos
  contatosEmergencia: json("contatosEmergencia").$type<string[]>(),
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Responsavel = typeof responsaveis.$inferSelect;
export type InsertResponsavel = typeof responsaveis.$inferInsert;

/**
 * Mural da escola (notícias, eventos, fotos, vídeos)
 */
export const mural = mysqlTable("mural", {
  id: int("id").autoincrement().primaryKey(),
  tipo: mysqlEnum("tipo", ["noticia", "evento", "foto", "video", "depoimento"]).notNull(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  conteudo: text("conteudo"),
  urlMidia: text("urlMidia"), // URL da imagem/vídeo
  dataEvento: timestamp("dataEvento"), // Para eventos no calendário
  postadoPor: varchar("postadoPor", { length: 320 }).notNull(), // Email do autor
  visibilidade: mysqlEnum("visibilidade", ["todos", "turma"]).default("todos").notNull(),
  turmasCodigo: json("turmasCodigo").$type<string[]>(), // Se visibilidade = "turma"
  expiracaoEm: timestamp("expiracaoEm"), // Para avisos temporários
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Mural = typeof mural.$inferSelect;
export type InsertMural = typeof mural.$inferInsert;

/**
 * Dia a Dia (cardápio, transporte, atividades, bem-estar)
 */
export const diaDia = mysqlTable("dia_dia", {
  id: int("id").autoincrement().primaryKey(),
  data: timestamp("data").notNull(),
  tipo: mysqlEnum("tipo", ["cardapio", "transporte", "atividade", "material", "bem_estar"]).notNull(),
  turmaId: int("turmaId"),
  alunoId: int("alunoId"), // Para registros individuais (bem-estar)
  // Cardápio
  cardapio: json("cardapio").$type<{ principal: string; vegetariano?: string; alergenicos?: string[] }>(),
  // Transporte
  transporte: json("transporte").$type<{ horarioSaida: string; previsaoChegada: string; motorista: string; motoristaFoto?: string; motoristaTelefone?: string }>(),
  // Atividades/Materiais
  descricao: text("descricao"),
  itens: json("itens").$type<string[]>(),
  // Bem-estar (preenchido pela professora)
  bemEstar: json("bemEstar").$type<{ humor: string; alimentacao: string; interacaoSocial: string; observacoes?: string; statusConvivencia?: "normal" | "atencao" | "intervencao" }>(),
  postadoPor: varchar("postadoPor", { length: 320 }),
  ativo: boolean("ativo").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DiaDia = typeof diaDia.$inferSelect;
export type InsertDiaDia = typeof diaDia.$inferInsert;

/**
 * Mensagens do chat (comunicação privada entre responsáveis e equipe)
 */
export const mensagens = mysqlTable("mensagens", {
  id: int("id").autoincrement().primaryKey(),
  alunoMatricula: varchar("alunoMatricula", { length: 20 }), // Contexto da conversa
  remetente: varchar("remetente", { length: 320 }).notNull(), // Email do remetente
  remetenteNome: varchar("remetenteNome", { length: 255 }),
  remetenteTipo: mysqlEnum("remetenteTipo", ["responsavel", "equipe"]).notNull(),
  destinatario: varchar("destinatario", { length: 320 }).notNull(), // Email do destinatário
  destinatarioSetor: mysqlEnum("destinatarioSetor", ["professor", "coordenacao", "direcao", "transporte", "cantina", "financeiro", "secretaria"]),
  texto: text("texto").notNull(),
  anexoUrl: text("anexoUrl"), // URL do anexo (foto, PDF)
  anexoTipo: varchar("anexoTipo", { length: 50 }), // Ex: "image/jpeg", "application/pdf"
  lido: boolean("lido").default(false).notNull(),
  lidoEm: timestamp("lidoEm"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Mensagem = typeof mensagens.$inferSelect;
export type InsertMensagem = typeof mensagens.$inferInsert;

/**
 * Arquivos enviados (para upload local)
 */
export const arquivos = mysqlTable("arquivos", {
  id: int("id").autoincrement().primaryKey(),
  nomeOriginal: varchar("nomeOriginal", { length: 255 }).notNull(),
  nomeArmazenado: varchar("nomeArmazenado", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  tamanho: int("tamanho").notNull(), // Em bytes
  url: text("url").notNull(),
  enviadoPor: varchar("enviadoPor", { length: 320 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Arquivo = typeof arquivos.$inferSelect;
export type InsertArquivo = typeof arquivos.$inferInsert;
