import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  const allergens = [
    "Glúten",
    "Leite",
    "Ovo",
    "Soja",
    "Amendoim",
    "Castanhas",
  ];

  await prisma.allergen.createMany({
    data: allergens.map((name) => ({ name })),
    skipDuplicates: true,
  });

  const dietPreferences = [
    "Vegano",
    "Vegetariano",
    "Sem Lactose",
    "Sem Glúten",
    "Low Carb",
  ];

  await prisma.dietPreference.createMany({
    data: dietPreferences.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log("✅ Seed concluído.");
}

main()
  .catch((error) => {
    console.error("❌ Erro no seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });