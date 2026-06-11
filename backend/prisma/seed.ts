import bcrypt from "bcrypt";

import {
  PrismaClient,
  Difficulty,
  InteractionType,
  ModerationStatus,
  RoleName,
} from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed completo...");

  // =====================================
  // LIMPEZA
  // =====================================

  await prisma.recipeInteraction.deleteMany();
  await prisma.comment.deleteMany();

  await prisma.recipeIngredient.deleteMany();
  await prisma.recipeCategory.deleteMany();
  await prisma.recipeDietPreference.deleteMany();

  await prisma.recipe.deleteMany();

  await prisma.userAllergen.deleteMany();
  await prisma.userDietPreference.deleteMany();

  await prisma.ingredientAllergen.deleteMany();

  await prisma.category.deleteMany();
  await prisma.ingredient.deleteMany();

  await prisma.allergen.deleteMany();
  await prisma.dietPreference.deleteMany();

  await prisma.user.deleteMany();

  // =====================================
  // SENHA PADRÃO
  // =====================================

  const passwordHash = await bcrypt.hash(
    "12345678",
    10
  );

  // =====================================
  // USERS
  // =====================================

  const admin = await prisma.user.create({
    data: {
      name: "Administrador",
      username: "admin",
      email: "admin@smash.com",
      passwordHash,
      role: RoleName.ADMIN,
      bio: "Administrador do sistema",
    },
  });

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Arthur",
        username: "arthur",
        email: "arthur@email.com",
        passwordHash,
      },
    }),

    prisma.user.create({
      data: {
        name: "Maria",
        username: "maria",
        email: "maria@email.com",
        passwordHash,
      },
    }),

    prisma.user.create({
      data: {
        name: "João",
        username: "joao",
        email: "joao@email.com",
        passwordHash,
      },
    }),

    prisma.user.create({
      data: {
        name: "Ana",
        username: "ana",
        email: "ana@email.com",
        passwordHash,
      },
    }),

    prisma.user.create({
      data: {
        name: "Pedro",
        username: "pedro",
        email: "pedro@email.com",
        passwordHash,
      },
    }),
  ]);

  const allUsers = [admin, ...users];

  // =====================================
  // ALERGÊNICOS
  // =====================================

  const allergens = await Promise.all(
    [
      "Glúten",
      "Leite",
      "Ovo",
      "Soja",
      "Amendoim",
      "Castanhas",
    ].map((name) =>
      prisma.allergen.create({
        data: { name },
      })
    )
  );

  // =====================================
  // DIET PREFERENCES
  // =====================================

  const dietPreferences =
    await Promise.all(
      [
        "Vegano",
        "Vegetariano",
        "Sem Lactose",
        "Sem Glúten",
        "Low Carb",
      ].map((name) =>
        prisma.dietPreference.create({
          data: { name },
        })
      )
    );

  // =====================================
  // CATEGORIAS
  // =====================================

  const categories =
    await Promise.all(
      [
        "Fitness",
        "Sobremesa",
        "Vegana",
        "Massas",
        "Carnes",
        "Bebidas",
        "Café da Manhã",
        "Lanches",
      ].map((name) =>
        prisma.category.create({
          data: {
            name,
            status:
              ModerationStatus.APPROVED,
            createdById: admin.id,
          },
        })
      )
    );

  // =====================================
  // INGREDIENTES
  // =====================================

  const ingredientNames = [
    "Farinha",
    "Leite",
    "Ovo",
    "Açúcar",
    "Sal",
    "Tomate",
    "Cebola",
    "Alho",
    "Frango",
    "Carne Moída",
    "Queijo",
    "Manteiga",
    "Chocolate",
    "Banana",
    "Maçã",
    "Aveia",
    "Arroz",
    "Feijão",
    "Macarrão",
    "Batata",
    "Cenoura",
    "Brócolis",
    "Tofu",
    "Amendoim",
    "Castanha",
  ];

  const ingredients =
    await Promise.all(
      ingredientNames.map((name) =>
        prisma.ingredient.create({
          data: {
            name,
            status:
              ModerationStatus.APPROVED,
            createdById: admin.id,
          },
        })
      )
    );

  // =====================================
  // INGREDIENTE -> ALERGÊNICO
  // =====================================

  const allergenByName = Object.fromEntries(
    allergens.map((a) => [a.name, a])
  );

  const ingredientByName = Object.fromEntries(
    ingredients.map((i) => [i.name, i])
  );

  await prisma.ingredientAllergen.createMany({
    data: [
      {
        ingredientId:
          ingredientByName["Farinha"].id,
        allergenId:
          allergenByName["Glúten"].id,
      },

      {
        ingredientId:
          ingredientByName["Leite"].id,
        allergenId:
          allergenByName["Leite"].id,
      },

      {
        ingredientId:
          ingredientByName["Ovo"].id,
        allergenId:
          allergenByName["Ovo"].id,
      },

      {
        ingredientId:
          ingredientByName["Amendoim"].id,
        allergenId:
          allergenByName["Amendoim"].id,
      },

      {
        ingredientId:
          ingredientByName["Castanha"].id,
        allergenId:
          allergenByName["Castanhas"].id,
      },
    ],
  });

  // =====================================
  // USER ALLERGENS
  // =====================================

  await prisma.userAllergen.createMany({
    data: [
      {
        userId: users[0].id,
        allergenId:
          allergenByName["Glúten"].id,
      },

      {
        userId: users[1].id,
        allergenId:
          allergenByName["Leite"].id,
      },

      {
        userId: users[2].id,
        allergenId:
          allergenByName["Amendoim"].id,
      },
    ],
  });

  // =====================================
  // USER DIET PREFERENCES
  // =====================================

  await prisma.userDietPreference.createMany({
    data: [
      {
        userId: users[0].id,
        dietPreferenceId:
          dietPreferences[4].id,
      },

      {
        userId: users[1].id,
        dietPreferenceId:
          dietPreferences[1].id,
      },

      {
        userId: users[2].id,
        dietPreferenceId:
          dietPreferences[2].id,
      },

      {
        userId: users[3].id,
        dietPreferenceId:
          dietPreferences[0].id,
      },
    ],
  });

  // =====================================
  // RECEITAS
  // =====================================

  const recipeTitles = [
    "Bolo de Chocolate",
    "Macarrão ao Molho Branco",
    "Frango Fitness",
    "Hambúrguer Artesanal",
    "Panqueca de Banana",
    "Arroz com Brócolis",
    "Tofu Grelhado",
    "Brownie Caseiro",
    "Café Proteico",
    "Batata Assada",
    "Carne Acebolada",
    "Lasanha",
    "Cookie de Aveia",
    "Vitamina de Banana",
    "Risoto Simples",
    "Wrap Fitness",
    "Torta de Maçã",
    "Frango ao Alho",
    "Macarrão Vegano",
    "Brigadeiro Fit",
  ];

  const recipes = [];

  for (let i = 0; i < recipeTitles.length; i++) {
    const author =
      allUsers[i % allUsers.length];

    const recipe =
      await prisma.recipe.create({
        data: {
          title: recipeTitles[i],

          description:
            `Descrição da receita ${i + 1}`,

          preparationMethod:
            "Misture os ingredientes e cozinhe até atingir o ponto ideal.",

          preparationTimeMinutes:
            15 + i,

          difficulty:
            i % 3 === 0
              ? Difficulty.EASY
              : i % 3 === 1
              ? Difficulty.MEDIUM
              : Difficulty.HARD,

          status:
            ModerationStatus.APPROVED,

          authorId: author.id,
        },
      });

    recipes.push(recipe);
  }

  // =====================================
  // RECEITA -> CATEGORIAS
  // =====================================

  for (let i = 0; i < recipes.length; i++) {
    await prisma.recipeCategory.createMany({
      data: [
        {
          recipeId: recipes[i].id,
          categoryId:
            categories[
              i % categories.length
            ].id,
        },

        {
          recipeId: recipes[i].id,
          categoryId:
            categories[
              (i + 1) %
                categories.length
            ].id,
        },
      ],
    });
  }

  // =====================================
  // RECEITA -> DIETAS
  // =====================================

  for (let i = 0; i < recipes.length; i++) {
    if (i % 2 === 0) {
      await prisma.recipeDietPreference.create(
        {
          data: {
            recipeId: recipes[i].id,

            dietPreferenceId:
              dietPreferences[
                i %
                  dietPreferences.length
              ].id,
          },
        }
      );
    }
  }

  // =====================================
  // RECEITA -> INGREDIENTES
  // =====================================

  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < 5; j++) {
      const ingredient =
        ingredients[
          (i + j) %
            ingredients.length
        ];

      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipes[i].id,

          ingredientId:
            ingredient.id,

          quantity: 100 + j * 50,

          unit: "g",
        },
      });
    }
  }

  // =====================================
  // COMENTÁRIOS
  // =====================================

  const commentsTexts = [
    "Receita excelente.",
    "Ficou muito saborosa.",
    "Vou fazer novamente.",
    "Minha família adorou.",
    "Muito fácil de preparar.",
    "Resultado incrível.",
    "Melhor receita que encontrei.",
    "Ficou perfeita.",
    "Ótima combinação de ingredientes.",
    "Super recomendo.",
  ];

  for (let i = 0; i < 60; i++) {
    const recipe =
      recipes[i % recipes.length];

    const user =
      allUsers[i % allUsers.length];

    await prisma.comment.create({
      data: {
        content:
          commentsTexts[
            i % commentsTexts.length
          ],

        recipeId: recipe.id,

        userId: user.id,
      },
    });
  }

  // =====================================
  // INTERAÇÕES
  // =====================================
  //
  // Regra do schema:
  // @@unique([userId, recipeId])
  //
  // Portanto não podemos gerar
  // combinações repetidas.
  //

  const usedPairs = new Set<string>();

  while (usedPairs.size < 100) {
    const user =
      allUsers[
        Math.floor(
          Math.random() *
            allUsers.length
        )
      ];

    const recipe =
      recipes[
        Math.floor(
          Math.random() *
            recipes.length
        )
      ];

    const key =
      `${user.id}-${recipe.id}`;

    if (usedPairs.has(key)) {
      continue;
    }

    usedPairs.add(key);

    await prisma.recipeInteraction.create({
      data: {
        userId: user.id,

        recipeId: recipe.id,

        type:
          Math.random() > 0.5
            ? InteractionType.SMASH
            : InteractionType.PASS,
      },
    });
  }

  // =====================================
  // RESUMO
  // =====================================

  console.log(
    "✅ Seed concluído com sucesso"
  );

  console.log(
    `👤 Usuários: ${allUsers.length}`
  );

  console.log(
    `📂 Categorias: ${categories.length}`
  );

  console.log(
    `🥕 Ingredientes: ${ingredients.length}`
  );

  console.log(
    `🍽️ Receitas: ${recipes.length}`
  );

  console.log(
    "💬 Comentários: 60"
  );

  console.log(
    "🔥 Interações: 100"
  );
}

main()
  .catch((error) => {
    console.error(
      "❌ Erro no seed:",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });