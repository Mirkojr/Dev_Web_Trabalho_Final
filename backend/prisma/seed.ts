import { PrismaClient, Difficulty, ModerationStatus, InteractionType } from "../src/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed completo iniciando...");

  await prisma.recipeInteraction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipeDietPreference.deleteMany();
  await prisma.recipeCategory.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.category.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.allergen.deleteMany();
  await prisma.dietPreference.deleteMany();
  await prisma.user.deleteMany();

  // =========================
  // USERS
  // =========================
  const password = await bcrypt.hash("123456", 10);

  const [user, admin] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Arthur User",
        username: "user1",
        email: "user@test.com",
        passwordHash: password,
      },
    }),

    prisma.user.create({
      data: {
        name: "Admin User",
        username: "admin",
        email: "admin@test.com",
        passwordHash: password,
        role: "ADMIN",
      },
    }),
  ]);

  // =========================
  // ALLERGENS
  // =========================
  const allergens = await prisma.allergen.createMany({
    data: [
      { name: "Glúten" },
      { name: "Leite" },
      { name: "Ovo" },
      { name: "Soja" },
      { name: "Amendoim" },
    ],
    skipDuplicates: true,
  });

  // =========================
  // DIET PREFERENCES
  // =========================
  await prisma.dietPreference.createMany({
    data: [
      { name: "Vegano" },
      { name: "Vegetariano" },
      { name: "Sem Lactose" },
      { name: "Low Carb" },
    ],
    skipDuplicates: true,
  });

  // =========================
  // CATEGORIES
  // =========================
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Sobremesa", createdById: user.id, status: "APPROVED" },
    }),
    prisma.category.create({
      data: { name: "Fitness", createdById: user.id, status: "APPROVED" },
    }),
  ]);

  // =========================
  // INGREDIENTS
  // =========================
  const ingredients = await Promise.all([
    prisma.ingredient.create({
      data: { name: "Ovo", createdById: user.id, status: "APPROVED" },
    }),
    prisma.ingredient.create({
      data: { name: "Farinha", createdById: user.id, status: "APPROVED" },
    }),
    prisma.ingredient.create({
      data: { name: "Leite", createdById: user.id, status: "APPROVED" },
    }),
  ]);

  // =========================
  // RECIPES APPROVED
  // =========================
  const recipe1 = await prisma.recipe.create({
    data: {
      title: "Bolo Simples",
      description: "Bolo fácil e rápido",
      preparationMethod: "Misturar tudo e assar",
      preparationTimeMinutes: 40,
      difficulty: Difficulty.EASY,
      status: ModerationStatus.APPROVED,
      authorId: user.id,

      categories: {
        create: [
          { categoryId: categories[0].id },
        ],
      },

      dietPreferences: {
        create: [],
      },

      ingredients: {
        create: [
          {
            ingredientId: ingredients[0].id,
            quantity: 2,
            unit: "un",
          },
          {
            ingredientId: ingredients[1].id,
            quantity: 500,
            unit: "g",
          },
        ],
      },
    },
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      title: "Shake Proteico",
      description: "Shake para treino",
      preparationMethod: "Bater tudo no liquidificador",
      preparationTimeMinutes: 5,
      difficulty: Difficulty.EASY,
      status: ModerationStatus.APPROVED,
      authorId: user.id,

      categories: {
        create: [
          { categoryId: categories[1].id },
        ],
      },

      ingredients: {
        create: [
          {
            ingredientId: ingredients[2].id,
            quantity: 300,
            unit: "ml",
          },
        ],
      },
    },
  });

  // =========================
  // PENDING RECIPE (moderation test)
  // =========================
  await prisma.recipe.create({
    data: {
      title: "Receita Pendente",
      description: "Aguardando aprovação",
      preparationMethod: "Misturar",
      preparationTimeMinutes: 10,
      difficulty: Difficulty.MEDIUM,
      status: ModerationStatus.PENDING,
      authorId: user.id,
    },
  });

  // =========================
  // INTERACTIONS (SWIPE TEST)
  // =========================
  await prisma.recipeInteraction.create({
    data: {
      userId: user.id,
      recipeId: recipe1.id,
      type: InteractionType.SMASH,
    },
  });

  await prisma.recipeInteraction.create({
    data: {
      userId: user.id,
      recipeId: recipe2.id,
      type: InteractionType.PASS,
    },
  });

  // =========================
  // COMMENTS
  // =========================
  await prisma.comment.create({
    data: {
      content: "Muito boa essa receita!",
      recipeId: recipe1.id,
      userId: user.id,
    },
  });

  console.log("✅ Seed completo finalizado");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });