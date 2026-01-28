/**
 * Script de Seed - Painel Família
 * Popula o banco de dados com dados fictícios realistas para testes
 */

import { drizzle } from "drizzle-orm/mysql2";
import { turmas, equipe, alunos, responsaveis, mural, diaDia, mensagens, InsertAluno, InsertEquipe, InsertResponsavel, InsertMural, InsertDiaDia, InsertMensagem, InsertTurma } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

// ============================================
// DADOS FICTÍCIOS REALISTAS
// ============================================

const TURMAS_DATA: Omit<InsertTurma, 'id' | 'createdAt' | 'updatedAt' | 'ativo'>[] = [
  { codigo: "BER1", serie: "Berçário I", nivel: "creche" as const },
  { codigo: "BER2", serie: "Berçário II", nivel: "creche" as const },
  { codigo: "MAT1", serie: "Maternal I", nivel: "creche" as const },
  { codigo: "MAT2", serie: "Maternal II", nivel: "educacao_infantil" as const },
  { codigo: "PRE1", serie: "Pré I", nivel: "educacao_infantil" as const },
  { codigo: "PRE2", serie: "Pré II", nivel: "educacao_infantil" as const },
  { codigo: "1A", serie: "1º Ano", nivel: "fundamental" as const },
  { codigo: "2A", serie: "2º Ano", nivel: "fundamental" as const },
  { codigo: "3B", serie: "3º Ano", nivel: "fundamental" as const },
  { codigo: "4A", serie: "4º Ano", nivel: "fundamental" as const },
  { codigo: "5A", serie: "5º Ano", nivel: "fundamental" as const },
  { codigo: "1M", serie: "1º Ano EM", nivel: "medio" as const },
];

const EQUIPE_DATA: Omit<InsertEquipe, 'id' | 'createdAt' | 'updatedAt' | 'ativo'>[] = [
  {
    email: "diretora.rosa@escolaobjetivo-iwata.com",
    nome: "Rosa Kayoko Tinen",
    cargo: "diretor" as const,
    turmas: null,
    telefone: "0538-36-3225",
    foto: "/avatars/diretora-rosa.jpg",
  },
  {
    email: "coord.carlos@escolaobjetivo-iwata.com",
    nome: "Carlos Tanaka",
    cargo: "coordenador" as const,
    turmas: null,
    telefone: "0538-36-3226",
    foto: "/avatars/coord-carlos.jpg",
  },
  {
    email: "prof.maria@escolaobjetivo-iwata.com",
    nome: "Maria Fernanda Silva",
    cargo: "professor" as const,
    turmas: ["3B", "4A"],
    telefone: "090-1234-5678",
    foto: "/avatars/prof-maria.jpg",
  },
  {
    email: "prof.yuki@escolaobjetivo-iwata.com",
    nome: "Yuki Yamamoto",
    cargo: "professor" as const,
    turmas: ["PRE1", "PRE2"],
    telefone: "090-2345-6789",
    foto: "/avatars/prof-yuki.jpg",
  },
  {
    email: "prof.ana@escolaobjetivo-iwata.com",
    nome: "Ana Paula Oliveira",
    cargo: "professor" as const,
    turmas: ["BER1", "BER2", "MAT1"],
    telefone: "090-3456-7890",
    foto: "/avatars/prof-ana.jpg",
  },
  {
    email: "cantina@escolaobjetivo-iwata.com",
    nome: "Keiko Sato",
    cargo: "cantina" as const,
    turmas: null,
    telefone: "0538-36-3227",
    foto: "/avatars/cantina-keiko.jpg",
  },
  {
    email: "transporte@escolaobjetivo-iwata.com",
    nome: "Takeshi Tanaka",
    cargo: "transporte" as const,
    turmas: null,
    telefone: "090-4567-8901",
    foto: "/avatars/motorista-takeshi.jpg",
  },
  {
    email: "secretaria@escolaobjetivo-iwata.com",
    nome: "Mariana Costa",
    cargo: "secretaria" as const,
    turmas: null,
    telefone: "0538-36-3228",
    foto: "/avatars/secretaria-mariana.jpg",
  },
  {
    email: "financeiro@escolaobjetivo-iwata.com",
    nome: "Roberto Nakamura",
    cargo: "financeiro" as const,
    turmas: null,
    telefone: "0538-36-3229",
    foto: "/avatars/financeiro-roberto.jpg",
  },
];

const ALUNOS_DATA: Omit<InsertAluno, 'id' | 'createdAt' | 'updatedAt' | 'ativo'>[] = [
  {
    matricula: "2024001",
    nome: "Lucas Silva Tanaka",
    dataNascimento: new Date("2018-03-15"),
    turmaId: 9, // 3B
    notas: { portugues: [8.5, 9.0, 8.0, 9.5], matematica: [7.5, 8.0, 8.5, 9.0], ciencias: [9.0, 8.5, 9.0, 9.5] },
    frequencia: 95,
    diasAusentes: 3,
    atividadesPendentes: [
      { titulo: "Trabalho de Ciências", entregue: true },
      { titulo: "Redação sobre a família", entregue: false, prazo: "2026-02-05" },
    ],
    documentos: { cartaoVacina: true, autorizacaoTransporte: true, termoUniforme: true },
    alergias: ["amendoim"],
    medicamentosAutorizados: [{ nome: "Dipirona", dose: "10mg", horario: "Se necessário" }],
    contatosMedicos: { clinica: "Clínica Iwata", pediatra: "Dr. Yamada", planoSaude: "Kokuho" },
    contatosEmergencia: ["+819012345678", "+819087654321"],
  },
  {
    matricula: "2024002",
    nome: "Sakura Oliveira",
    dataNascimento: new Date("2018-07-22"),
    turmaId: 9, // 3B
    notas: { portugues: [9.0, 9.5, 9.0, 10.0], matematica: [8.5, 9.0, 9.5, 9.0], ciencias: [9.5, 9.0, 9.5, 10.0] },
    frequencia: 98,
    diasAusentes: 1,
    atividadesPendentes: [],
    documentos: { cartaoVacina: true, autorizacaoTransporte: false, termoUniforme: true },
    alergias: [],
    medicamentosAutorizados: [],
    contatosMedicos: { pediatra: "Dra. Suzuki" },
    contatosEmergencia: ["+819098765432"],
  },
  {
    matricula: "2024003",
    nome: "Hiro Yamamoto Costa",
    dataNascimento: new Date("2021-01-10"),
    turmaId: 5, // PRE1
    notas: { geral: [] },
    frequencia: 92,
    diasAusentes: 5,
    atividadesPendentes: [{ titulo: "Levar caixa de leite vazia", entregue: false, prazo: "2026-01-30" }],
    documentos: { cartaoVacina: true, autorizacaoTransporte: true, termoUniforme: false, outros: [{ nome: "Autorização passeio", entregue: false, prazo: "2026-02-01" }] },
    alergias: ["látex", "leite"],
    medicamentosAutorizados: [{ nome: "Aerolin", dose: "1 puff", horario: "Em caso de falta de ar", prescricao: "Receita anexada" }],
    contatosMedicos: { clinica: "Hospital Iwata", pediatra: "Dr. Tanaka", planoSaude: "Shakai Hoken" },
    contatosEmergencia: ["+819011112222", "+819033334444"],
  },
  {
    matricula: "2024004",
    nome: "Emi Nakamura Santos",
    dataNascimento: new Date("2023-05-20"),
    turmaId: 1, // BER1
    notas: { geral: [] },
    frequencia: 88,
    diasAusentes: 8,
    atividadesPendentes: [],
    documentos: { cartaoVacina: true, autorizacaoTransporte: true, termoUniforme: true },
    alergias: [],
    medicamentosAutorizados: [],
    contatosMedicos: { pediatra: "Dra. Watanabe" },
    contatosEmergencia: ["+819055556666"],
  },
];

const RESPONSAVEIS_DATA: Omit<InsertResponsavel, 'id' | 'createdAt' | 'updatedAt' | 'ativo'>[] = [
  {
    email: "pai.luciano.silva@gmail.com",
    nome: "Luciano Motta Silva",
    telefone: "+819012345678",
    parentesco: "Pai",
    filhos: ["2024001"],
    contatosEmergencia: ["+819087654321", "+5511999999999"],
  },
  {
    email: "mae.yumi.tanaka@gmail.com",
    nome: "Yumi Tanaka Silva",
    telefone: "+819087654321",
    parentesco: "Mãe",
    filhos: ["2024001"],
    contatosEmergencia: ["+819012345678"],
  },
  {
    email: "mae.patricia.oliveira@gmail.com",
    nome: "Patrícia Oliveira",
    telefone: "+819098765432",
    parentesco: "Mãe",
    filhos: ["2024002"],
    contatosEmergencia: ["+819076543210"],
  },
  {
    email: "pai.marcos.costa@gmail.com",
    nome: "Marcos Yamamoto Costa",
    telefone: "+819011112222",
    parentesco: "Pai",
    filhos: ["2024003"],
    contatosEmergencia: ["+819033334444"],
  },
  {
    email: "mae.fernanda.santos@gmail.com",
    nome: "Fernanda Nakamura Santos",
    telefone: "+819055556666",
    parentesco: "Mãe",
    filhos: ["2024004"],
    contatosEmergencia: ["+819077778888"],
  },
];

const MURAL_DATA = [
  {
    tipo: "noticia" as const,
    titulo: "Reunião de Pais - Fevereiro 2026",
    conteudo: "Convidamos todos os pais e responsáveis para a reunião de início de ano letivo. Será uma oportunidade para conhecer a equipe pedagógica e tirar dúvidas sobre o calendário escolar.",
    dataEvento: new Date("2026-02-15T18:00:00"),
    postadoPor: "diretora.rosa@escolaobjetivo-iwata.com",
    visibilidade: "todos" as const,
  },
  {
    tipo: "evento" as const,
    titulo: "Festival de Primavera - Hanami 2026",
    conteudo: "Venha celebrar a chegada da primavera conosco! Teremos apresentações das crianças, comidas típicas e muita diversão em família.",
    dataEvento: new Date("2026-04-05T10:00:00"),
    postadoPor: "coord.carlos@escolaobjetivo-iwata.com",
    visibilidade: "todos" as const,
  },
  {
    tipo: "foto" as const,
    titulo: "Atividade de Plantio - Turma 3B",
    conteudo: "As crianças do 3º ano plantaram mudas de sakura no jardim da escola. Foi uma manhã muito especial de aprendizado sobre a natureza!",
    urlMidia: "/uploads/plantio-3b.jpg",
    postadoPor: "prof.maria@escolaobjetivo-iwata.com",
    visibilidade: "turma" as const,
    turmasCodigo: ["3B"],
  },
  {
    tipo: "depoimento" as const,
    titulo: "Depoimento da Família Silva",
    conteudo: "Desde que entrou na Objetivo, meu filho se sente mais confiante para falar japonês. A dedicação das professoras é incrível!",
    postadoPor: "diretora.rosa@escolaobjetivo-iwata.com",
    visibilidade: "todos" as const,
  },
];

const DIA_DIA_DATA = [
  {
    data: new Date("2026-01-29"),
    tipo: "cardapio" as const,
    cardapio: {
      principal: "Arroz, feijão, frango grelhado, salada de legumes e suco de laranja",
      vegetariano: "Arroz, feijão, tofu grelhado, salada de legumes e suco de laranja",
      alergenicos: ["soja (tofu)", "laranja"],
    },
    postadoPor: "cantina@escolaobjetivo-iwata.com",
  },
  {
    data: new Date("2026-01-29"),
    tipo: "transporte" as const,
    transporte: {
      horarioSaida: "15:30",
      previsaoChegada: "16:10",
      motorista: "Sr. Takeshi Tanaka",
      motoristaFoto: "/avatars/motorista-takeshi.jpg",
      motoristaTelefone: "090-4567-8901",
    },
    postadoPor: "transporte@escolaobjetivo-iwata.com",
  },
  {
    data: new Date("2026-01-29"),
    tipo: "bem_estar" as const,
    turmaId: 9,
    alunoId: 1,
    bemEstar: {
      humor: "😊",
      alimentacao: "Completou o almoço",
      interacaoSocial: "Brincou com 3 colegas no recreio",
      observacoes: "Hoje mencionou sentir saudade da avó no Brasil",
      statusConvivencia: "normal" as const,
    },
    postadoPor: "prof.maria@escolaobjetivo-iwata.com",
  },
  {
    data: new Date("2026-01-30"),
    tipo: "material" as const,
    turmaId: 9,
    descricao: "Materiais necessários para a próxima semana",
    itens: ["Lápis de cor (12 cores)", "Cola bastão", "Caderno de desenho", "Avental para aula de culinária"],
    postadoPor: "prof.maria@escolaobjetivo-iwata.com",
  },
];

const MENSAGENS_DATA = [
  {
    alunoMatricula: "2024001",
    remetente: "pai.luciano.silva@gmail.com",
    remetenteNome: "Luciano Motta Silva",
    remetenteTipo: "responsavel" as const,
    destinatario: "prof.maria@escolaobjetivo-iwata.com",
    destinatarioSetor: "professor" as const,
    texto: "Bom dia, professora Maria! Gostaria de saber sobre o dever de casa de português. O Lucas está com dúvidas na redação.",
    lido: true,
    lidoEm: new Date("2026-01-28T10:30:00"),
    createdAt: new Date("2026-01-28T09:15:00"),
  },
  {
    alunoMatricula: "2024001",
    remetente: "prof.maria@escolaobjetivo-iwata.com",
    remetenteNome: "Maria Fernanda Silva",
    remetenteTipo: "equipe" as const,
    destinatario: "pai.luciano.silva@gmail.com",
    destinatarioSetor: null,
    texto: "Bom dia, Sr. Luciano! A redação é sobre a família. O Lucas pode escrever sobre as tradições da família dele, tanto brasileiras quanto japonesas. Qualquer dúvida, estou à disposição!",
    lido: true,
    lidoEm: new Date("2026-01-28T12:00:00"),
    createdAt: new Date("2026-01-28T10:45:00"),
  },
  {
    alunoMatricula: "2024003",
    remetente: "pai.marcos.costa@gmail.com",
    remetenteNome: "Marcos Yamamoto Costa",
    remetenteTipo: "responsavel" as const,
    destinatario: "transporte@escolaobjetivo-iwata.com",
    destinatarioSetor: "transporte" as const,
    texto: "Boa tarde! O Hiro não vai precisar do transporte amanhã, pois vou buscá-lo mais cedo para uma consulta médica.",
    lido: false,
    createdAt: new Date("2026-01-29T14:00:00"),
  },
];

// ============================================
// FUNÇÃO DE SEED
// ============================================

export async function seedDatabase() {
  console.log("🌱 Iniciando seed do banco de dados...");

  try {
    // 1. Inserir Turmas
    console.log("📚 Inserindo turmas...");
    for (const turma of TURMAS_DATA) {
      await db.insert(turmas).values(turma).onDuplicateKeyUpdate({ set: { serie: turma.serie } });
    }

    // 2. Inserir Equipe
    console.log("👥 Inserindo equipe escolar...");
    for (const membro of EQUIPE_DATA) {
      await db.insert(equipe).values(membro).onDuplicateKeyUpdate({ set: { nome: membro.nome, cargo: membro.cargo } });
    }

    // 3. Inserir Alunos
    console.log("🎒 Inserindo alunos...");
    for (const aluno of ALUNOS_DATA) {
      await db.insert(alunos).values(aluno).onDuplicateKeyUpdate({ set: { nome: aluno.nome } });
    }

    // 4. Inserir Responsáveis
    console.log("👨‍👩‍👧 Inserindo responsáveis...");
    for (const resp of RESPONSAVEIS_DATA) {
      await db.insert(responsaveis).values(resp).onDuplicateKeyUpdate({ set: { nome: resp.nome } });
    }

    // 5. Inserir Mural
    console.log("📰 Inserindo posts do mural...");
    for (const post of MURAL_DATA) {
      await db.insert(mural).values(post);
    }

    // 6. Inserir Dia a Dia
    console.log("📅 Inserindo registros do dia a dia...");
    for (const registro of DIA_DIA_DATA) {
      await db.insert(diaDia).values(registro);
    }

    // 7. Inserir Mensagens
    console.log("💬 Inserindo mensagens de exemplo...");
    for (const msg of MENSAGENS_DATA) {
      await db.insert(mensagens).values(msg);
    }

    console.log("✅ Seed concluído com sucesso!");
    console.log("\n📋 Resumo:");
    console.log(`   - ${TURMAS_DATA.length} turmas`);
    console.log(`   - ${EQUIPE_DATA.length} membros da equipe`);
    console.log(`   - ${ALUNOS_DATA.length} alunos`);
    console.log(`   - ${RESPONSAVEIS_DATA.length} responsáveis`);
    console.log(`   - ${MURAL_DATA.length} posts no mural`);
    console.log(`   - ${DIA_DIA_DATA.length} registros do dia a dia`);
    console.log(`   - ${MENSAGENS_DATA.length} mensagens`);

    console.log("\n🔑 Credenciais de teste:");
    console.log("   DIRETORA: diretora.rosa@escolaobjetivo-iwata.com");
    console.log("   PROFESSOR: prof.maria@escolaobjetivo-iwata.com");
    console.log("   RESPONSÁVEL: pai.luciano.silva@gmail.com");
    console.log("   CANTINA: cantina@escolaobjetivo-iwata.com");
    console.log("   TRANSPORTE: transporte@escolaobjetivo-iwata.com");

  } catch (error) {
    console.error("❌ Erro durante o seed:", error);
    throw error;
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
