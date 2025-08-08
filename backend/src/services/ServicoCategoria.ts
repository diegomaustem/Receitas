import { ICategoria } from "../Interfaces/ICategoria";
import { IPaginacao } from "../Interfaces/IPaginacao";
import { IResultadoPaginado } from "../Interfaces/IResultadoPaginado";
import RepositorioCategoria from "../repositories/RepositorioCategoria";

class ServicoCategoria {
  async listarCategorias(
    paginacao: IPaginacao
  ): Promise<IResultadoPaginado<ICategoria>> {
    try {
      return await RepositorioCategoria.listarCategorias(paginacao);
    } catch (error) {
      console.error(":S - Falha ao recuperar categorias.", error);
      throw error;
    }
  }

  async listarCategoria(idCategoria: number): Promise<ICategoria | null> {
    try {
      return await RepositorioCategoria.listarCategoria(idCategoria);
    } catch (error) {
      console.error(":S - Falha ao recuperar categoria.", error);
      throw error;
    }
  }
}
export const servicoCategoria = new ServicoCategoria();
