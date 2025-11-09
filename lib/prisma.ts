import { PrismaClient } from "@prisma/client";

// Deteksi environment (dev vs production)
const isProduction = process.env.NODE_ENV === "production";

// Pilih URL database sesuai environment
const databaseUrl = isProduction
  ? process.env.POSTGRES_PRISMA_URL        // ✅ Accelerate (production)
  : process.env.POSTGRES_URL_NON_POOLING;  // ✅ Local PostgreSQL (dev)

// Pastikan variabel env tersedia
if (!databaseUrl) {
  throw new Error("❌ Database URL tidak ditemukan! Pastikan .env berisi POSTGRES_PRISMA_URL dan POSTGRES_URL_NON_POOLING");
}

// Inisialisasi Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: { url: databaseUrl },
    },
    log: isProduction ? ["error"] : ["query", "info", "warn"], // Logging detail di dev
  });
};

// Gunakan instance tunggal (singleton pattern)
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma;
