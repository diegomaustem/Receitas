import { repositorioGenerico } from "../repositories/RepositorioGenerico";
import RepositorioReceita from "../repositories/RepositorioReceita";
import { IReceita } from "../Interfaces/IReceita";
import HttpErro from "../errors/HttpErros";
import { IPaginacao } from "../Interfaces/IPaginacao";
import { IResultadoPaginado } from "../Interfaces/IResultadoPaginado";

class ServicoReceita {
  async listarReceitas(
    paginacao: IPaginacao
  ): Promise<IResultadoPaginado<IReceita>> {
    try {
      return await RepositorioReceita.listarReceitas(paginacao);
    } catch (error) {
      console.error(":S - Falha ao recuperar receitas.", error);
      throw error;
    }
  }

  async listarReceita(idReceita: number): Promise<IReceita | null> {
    try {
      return await RepositorioReceita.listarReceita(idReceita);
    } catch (error) {
      console.error(":S - Falha ao recuperar receita.", error);
      throw error;
    }
  }

  async criarReceita(receita: IReceita): Promise<IReceita> {
    try {
      return await RepositorioReceita.criarReceita(receita);
    } catch (error) {
      console.error(":S - Falha ao criar receita.", error);
      throw error;
    }
  }

  async atualizarReceita(
    idReceita: number,
    dadosReceita: IReceita
  ): Promise<IReceita> {
    try {
      return await RepositorioReceita.atualizarReceita(idReceita, dadosReceita);
    } catch (error) {
      console.error(":S - Falha ao atualizar receita.", error);
      throw error;
    }
  }

  async excluirReceita(idReceita: number): Promise<IReceita> {
    try {
      return await RepositorioReceita.excluirReceita(idReceita);
    } catch (error) {
      console.error(":S - Falha ao excluir receita.", error);
      throw error;
    }
  }

  async validarRegrasReceita(dadosReceita: IReceita): Promise<void> {
    const { idUsuarios, idCategorias } = dadosReceita;
    try {
      if (idUsuarios) {
        const usuarioExiste = await repositorioGenerico.queryGenerica(
          "usuario",
          "id",
          idUsuarios
        );
        if (!usuarioExiste) {
          throw new HttpErro(
            "ID de usuário inválido. Nenhum usuário foi encontrado com o ID fornecido.",
            404
          );
        }
      }
      if (idCategorias) {
        const categoriaExiste = await repositorioGenerico.queryGenerica(
          "categoria",
          "id",
          idCategorias
        );
        if (!categoriaExiste) {
          throw new HttpErro(
            "ID de categoria inválido. Nenhuma categoria foi encontrada com o ID fornecido.",
            404
          );
        }
      }
    } catch (error) {
      console.error(":S - Falha ao validar regras de receita.", error);
      throw error;
    }
  }
}
export const servicoReceita = new ServicoReceita();
