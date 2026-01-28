import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock do getDb com retorno de array vazio
const mockDbResult: any[] = [];

vi.mock("./db", () => ({
  getDb: vi.fn().mockImplementation(async () => ({
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue(mockDbResult),
    orderBy: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockResolvedValue({}),
  })),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(email: string = "test@example.com"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "sample-user",
    email: email,
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUnauthContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("painelFamilia router", () => {
  describe("getProfile", () => {
    it("should return null when user email is not found", async () => {
      const ctx = createAuthContext("unknown@example.com");
      const caller = appRouter.createCaller(ctx);

      // O mock retorna array vazio, então deve retornar null
      const result = await caller.painelFamilia.getProfile();
      
      // Como o mock não está configurado para retornar dados específicos,
      // o resultado será null (nenhum perfil encontrado)
      expect(result).toBeNull();
    });
  });
});

describe("painelFamilia router - authentication", () => {
  it("should require authentication for protected procedures", async () => {
    const ctx = createUnauthContext();
    const caller = appRouter.createCaller(ctx);

    // getProfile é protectedProcedure, deve falhar sem autenticação
    await expect(caller.painelFamilia.getProfile()).rejects.toThrow();
  });
});

describe("painelFamilia router - input validation", () => {
  it("should validate sendMensagem input", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Deve rejeitar mensagem vazia
    await expect(
      caller.painelFamilia.sendMensagem({
        destinatario: "test@example.com",
        texto: "", // texto vazio deve falhar
      })
    ).rejects.toThrow();
  });

  it("should validate destinatarioSetor enum", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Deve rejeitar setor inválido
    await expect(
      caller.painelFamilia.sendMensagem({
        destinatario: "test@example.com",
        texto: "Mensagem de teste",
        destinatarioSetor: "invalido" as any,
      })
    ).rejects.toThrow();
  });

  it("should accept valid destinatarioSetor values", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Valores válidos para destinatarioSetor
    const validSetores = ['professor', 'coordenacao', 'direcao', 'transporte', 'cantina', 'financeiro', 'secretaria'];
    
    for (const setor of validSetores) {
      // A validação de input deve passar (mesmo que o banco falhe depois)
      try {
        await caller.painelFamilia.sendMensagem({
          destinatario: "test@example.com",
          texto: "Mensagem de teste",
          destinatarioSetor: setor as any,
        });
      } catch (error: any) {
        // Se falhar, não deve ser por validação de input
        expect(error.message).not.toContain("Invalid enum value");
      }
    }
  });
});

describe("painelFamilia router - createMuralPost validation", () => {
  it("should validate tipo enum", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Deve rejeitar tipo inválido
    await expect(
      caller.painelFamilia.createMuralPost({
        tipo: "invalido" as any,
        titulo: "Teste",
      })
    ).rejects.toThrow();
  });

  it("should require titulo", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Deve rejeitar título vazio
    await expect(
      caller.painelFamilia.createMuralPost({
        tipo: "noticia",
        titulo: "", // título vazio deve falhar
      })
    ).rejects.toThrow();
  });
});
