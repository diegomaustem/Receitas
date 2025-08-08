import { ICategoria } from "../Interfaces/ICategoria";
import { IPaginacao } from "../Interfaces/IPaginacao";
import { IResultadoPaginado } from "../Interfaces/IResultadoPaginado";
import prisma from "../lib/prismaClient";

class RepositorioCategoria {
  async listarCategorias(
    paginacao: IPaginacao
  ): Promise<IResultadoPaginado<ICategoria>> {
    const { pagina, limite } = paginacao;
    try {
      const skip = (pagina - 1) * limite;

      const [dados, total] = await Promise.all([
        prisma.categoria.findMany({
          skip,
          take: limite,
        }),
        prisma.categoria.count(),
      ]);

      const totalPaginas = Math.ceil(total / limite);

      return {
        dados,
        paginacao: {
          total,
          pagina,
          limite,
          totalPaginas,
        },
      };
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
