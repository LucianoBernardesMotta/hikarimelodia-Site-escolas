import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock do banco de dados
vi.mock("./db", () => ({
  getDb: vi.fn(() => ({
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve([]))
        }))
      }))
    })),
    insert: vi.fn(() => ({
      values: vi.fn(() => Promise.resolve())
    }))
  }))
}));

function createPublicContext(): TrpcContext {
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

describe("painelFamilia.cadastrarResponsavel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve validar nome com menos de 2 caracteres", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.painelFamilia.cadastrarResponsavel({
        nome: "A",
        email: "test@example.com",
      })
    ).rejects.toThrow();
  });

  it("deve validar email inválido", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.painelFamilia.cadastrarResponsavel({
        nome: "João Silva",
        email: "invalid-email",
      })
    ).rejects.toThrow();
  });

  it("deve aceitar cadastro com dados válidos", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.painelFamilia.cadastrarResponsavel({
      nome: "João Silva",
      email: "joao.silva@example.com",
      telefone: "11999999999",
    });

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("message");
  });

  it("deve aceitar cadastro sem telefone (opcional)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.painelFamilia.cadastrarResponsavel({
      nome: "Maria Santos",
      email: "maria.santos@example.com",
    });

    expect(result).toHaveProperty("success", true);
  });
});

describe("painelFamilia.verificarEmail", () => {
  it("deve retornar exists: false para email não cadastrado", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.painelFamilia.verificarEmail({
      email: "nao.existe@example.com",
    });

    expect(result).toHaveProperty("exists", false);
    expect(result).toHaveProperty("tipo", null);
  });
});
