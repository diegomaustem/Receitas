import { IReceita } from "../Interfaces/IReceita";
import prisma from "../lib/prismaClient";

class RepositorioReceita {
  async listarReceitas(): Promise<IReceita[]> {
    try {
      return await prisma.receita.findMany();
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
