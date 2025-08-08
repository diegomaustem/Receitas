import { IUsuario } from "../Interfaces/IUsuario";
import { utilsSenha } from "../utils/UtilsSenha";
import { repositorioGenerico } from "../repositories/RepositorioGenerico";
import RepositorioUsuario from "../repositories/RepositorioUsuario";
import HttpErro from "../errors/HttpErros";
import { IResultadoPaginado } from "../Interfaces/IResultadoPaginado";
import { IPaginacao } from "../Interfaces/IPaginacao";

class ServicoUsuario {
  async listarUsuarios(
    paginacao: IPaginacao
  ): Promise<IResultadoPaginado<IUsuario>> {
    try {
      return await RepositorioUsuario.listarUsuarios(paginacao);
    } catch (error) {
      console.error(":S - Falha ao recuperar usuários.", error);
      throw error;
    }
  }

  async listarUsuario(idUsuario: number): Promise<IUsuario | null> {
    try {
      return await RepositorioUsuario.listarUsuario(idUsuario);
    } catch (error) {
      console.error(":S - Falha ao recuperar usuário.", error);
      throw error;
    }
  }

  async criarUsuario(usuario: IUsuario): Promise<IUsuario> {
    try {
      const senhaComHash = await utilsSenha.hashSenha(usuario.senha);

      const novoUsuario: IUsuario = {
        ...usuario,
        senha: senhaComHash,
      };

      return await RepositorioUsuario.criarUsuario(novoUsuario);
    } catch (error) {
      console.error(":S - Falha ao criar usuário.", error);
      throw error;
    }
  }

  async atualizarUsuario(
    idUsuario: number,
    dadosUsuario: IUsuario
  ): Promise<IUsuario> {
    try {
      if (dadosUsuario.senha) {
        dadosUsuario.senha = await utilsSenha.hashSenha(dadosUsuario.senha);
      }

      return await RepositorioUsuario.atualizarUsuario(idUsuario, dadosUsuario);
    } catch (error) {
      console.error(":S - Falha ao atualizar usuário.", error);
      throw error;
    }
  }

  async excluirUsuario(idUsuario: number): Promise<IUsuario> {
    try {
      return await RepositorioUsuario.excluirUsuario(idUsuario);
    } catch (error) {
      console.error(":S - Falha ao excluir usuário.", error);
      throw error;
    }
  }

  async validarRegrasUsuario(
    dadosUsuario?: IUsuario,
    idUsuario?: number
  ): Promise<void> {
    try {
      if (idUsuario) {
        const usuarioTemReceita = await repositorioGenerico.queryGenerica(
          "receita",
          "idUsuarios",
          idUsuario
        );
        if (usuarioTemReceita) {
          throw new HttpErro(
            "O usuário possuí receitas e não pode ser excluído.",
            409
          );
        }
        return;
      }
      if (dadosUsuario?.login) {
        const { login } = dadosUsuario;
        const loginEmUso = await repositorioGenerico.queryGenerica(
          "usuario",
          "login",
          login
        );
        if (loginEmUso) {
          throw new HttpErro(
            "O login fornecido já está em uso. Por favor, escolha outro.",
            409
          );
        }
      }
    } catch (error) {
      console.error(":S - Falha ao validar regras do usuário.", error);
      throw error;
    }
  }
}
export const servicoUsuario = new ServicoUsuario();
