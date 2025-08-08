import prisma from "../src/lib/prismaClient";

async function main() {
  console.log("Seed categorias");
  const categorias = [
    "Bolos e tortas doces",
    "Carnes",
    "Aves",
    "Peixes e frutos do mar",
    "Saladas, molhos e acompanhamentos",
    "Sopas",
    "Massas",
    "Bebidas",
    "Doces e sobremesas",
    "Lanches",
    "Prato Único",
    "Light",
    "Alimentação Saudável",
  ];

  const categoriasUpsert = categorias.map((categoria) =>
    prisma.categoria.upsert({
      where: { nome: categoria },
      update: {},
      create: { nome: categoria },
    })
  );

  try {
    const resultados = await Promise.all(categoriasUpsert);
    console.log(`${resultados.length} categorias criadas com sucesso.`);
  } catch (error) {
    console.error("Erro ao popular categorias:", error);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
