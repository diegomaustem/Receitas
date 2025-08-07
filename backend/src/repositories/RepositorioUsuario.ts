import { IUsuario } from "../Interfaces/IUsuario";
import prisma from "../lib/prismaClient";

class RepositorioUsuario {
  async listarUsuarios(): Promise<IUsuario[]> {
    try {
      return await prisma.usuario.findMany();
    } catch (error) {
      console.error(":R - Erro ao buscar usuários.", error);
      throw error;
    }
  }

  async listarUsuario(idUsuario: number): Promise<IUsuario | null> {
    try {
      return await prisma.usuario.findUnique({
        where: { id: idUsuario },
      });
    } catch (error) {
      console.error(":R - Erro ao buscar usuário.", error);
      throw error;
    }
  }

  async criarUsuario(usuario: IUsuario): Promise<IUsuario> {
    try {
      return await prisma.usuario.create({
        data: usuario,
      });
    } catch (error) {
      console.error(":R - Erro ao criar usuário.", error);
      throw error;
    }
  }

  async atualizarUsuario(
    idUsuario: number,
    dadosUsuario: IUsuario
  ): Promise<IUsuario> {
    try {
      return await prisma.usuario.update({
        where: { id: idUsuario },
        data: dadosUsuario,
      });
    } catch (error) {
      console.error(":R - Erro ao atualizar usuário.", error);
      throw error;
    }
  }

  async excluirUsuario(idUsuario: number): Promise<IUsuario> {
    try {
      return await prisma.usuario.delete({
        where: { id: idUsuario },
      });
    } catch (error) {
      console.error(":R - Erro ao excluir usuário.", error);
      throw error;
    }
  }
}

export default new RepositorioUsuario();
