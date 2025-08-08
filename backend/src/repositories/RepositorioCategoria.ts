import { ICategoria } from "../Interfaces/ICategoria";
import prisma from "../lib/prismaClient";

class RepositorioCategoria {
  async listarCategorias(): Promise<ICategoria[]> {
    try {
      return await prisma.categoria.findMany();
    } catch (error) {
      console.error(":R - Erro ao buscar categorias.", error);
      throw error;
    }
  }

  async listarCategoria(idCategoria: number): Promise<ICategoria | null> {
    try {
      return await prisma.categoria.findUnique({
        where: { id: idCategoria },
      });
    } catch (error) {
      console.error(":R - Erro ao buscar categoria.", error);
      throw error;
    }
  }
}

export default new RepositorioCategoria();
