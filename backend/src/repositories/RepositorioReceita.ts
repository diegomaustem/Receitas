import { IPaginacao } from "../Interfaces/IPaginacao";
import { IReceita } from "../Interfaces/IReceita";
import { IResultadoPaginado } from "../Interfaces/IResultadoPaginado";
import prisma from "../lib/prismaClient";

class RepositorioReceita {
  async listarReceitas(
    paginacao: IPaginacao
  ): Promise<IResultadoPaginado<IReceita>> {
    const { pagina, limite } = paginacao;
    try {
      const skip = (pagina - 1) * limite;

      const [dados, total] = await Promise.all([
        prisma.receita.findMany({
          skip,
          take: limite,
        }),
        prisma.receita.count(),
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
      console.error(":R - Erro ao buscar receitas.", error);
      throw error;
    }
  }

  async listarReceita(idReceita: number): Promise<IReceita | null> {
    try {
      return await prisma.receita.findUnique({
        where: { id: idReceita },
      });
    } catch (error) {
      console.error(":R - Erro ao buscar receita.", error);
      throw error;
    }
  }

  async criarReceita(receita: IReceita): Promise<IReceita> {
    try {
      return await prisma.receita.create({
        data: receita,
      });
    } catch (error) {
      console.error(":R - Erro ao criar receita.", error);
      throw error;
    }
  }

  async atualizarReceita(
    idReceita: number,
    dadosReceita: IReceita
  ): Promise<IReceita> {
    try {
      return await prisma.receita.update({
        where: { id: idReceita },
        data: dadosReceita,
      });
    } catch (error) {
      console.error(":R - Erro ao atualizar receita.", error);
      throw error;
    }
  }

  async excluirReceita(idReceita: number): Promise<IReceita> {
    try {
      return await prisma.receita.delete({
        where: { id: idReceita },
      });
    } catch (error) {
      console.error(":R - Erro ao excluir receita.", error);
      throw error;
    }
  }
}

export default new RepositorioReceita();
