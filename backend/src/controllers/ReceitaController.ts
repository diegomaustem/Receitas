import { Request, Response } from "express";
import { servicoUsuario } from "../services/ServicoUsuario";
import { IUsuario } from "../Interfaces/IUsuario";
import HttpErro from "../errors/HttpErros";
import { servicoReceita } from "../services/ServicoReceita";
import { IReceita } from "../Interfaces/IReceita";

class ReceitaController {
  async listarReceitas(req: Request, res: Response): Promise<void> {
    try {
      const receitas = await servicoReceita.listarReceitas();
      res.status(200).json({ status: "sucesso", dados: receitas });
      return;
    } catch (error) {
      console.error(":C - Erro ao recuperar receitas.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno ao recuperar receitas. Tente mais tarde.",
      });
      return;
    }
  }

  async listarReceita(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ status: "erro", mensagem: "ID da receita não fornecido." });
      return;
    }
    const idReceita = parseInt(id);

    try {
      const receita = await servicoReceita.listarReceita(idReceita);
      if (!receita) {
        res.status(404).json({
          status: "erro",
          mensagem: "Receita não encontrada.",
        });
        return;
      }

      res.status(200).json({
        status: "sucesso",
        dados: receita,
      });
      return;
    } catch (error) {
      console.error(":C - Erro ao recuperar receita.", error);
      res.status(500).json({
        status: "erro",
        message: "Erro interno ao recuperar receita. Tente mais tarde.",
      });
      return;
    }
  }

  async criarReceita(req: Request, res: Response): Promise<void> {
    const dadosReceita: IReceita = req.body;
    try {
      await servicoReceita.validarRegrasReceita(dadosReceita);
      const novaReceita = await servicoReceita.criarReceita(dadosReceita);
      res.status(201).json({
        status: "sucesso",
        mensagem: "Receita criada com sucesso.",
        dados: novaReceita,
      });
      return;
    } catch (error) {
      if (error instanceof HttpErro) {
        res.status(error.statusCode).json({
          status: "erro",
          mensagem: error.mensagem,
        });
        return;
      }

      console.error(":C - Erro ao criar receita.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno ao criar receita. Tente mais tarde.",
      });
    }
  }

  async atualizarReceita(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ status: "erro", mensagem: "ID da receita não fornecido." });
      return;
    }
    const idReceita = parseInt(id);
    const dadosReceita: IReceita = req.body;

    try {
      const receita = await servicoReceita.listarReceita(idReceita);
      if (!receita) {
        res.status(404).json({
          status: "erro",
          mensagem: "Receita não encontrada para atualizar.",
        });
        return;
      }

      await servicoReceita.validarRegrasReceita(dadosReceita);

      const receitaAtualizada = await servicoReceita.atualizarReceita(
        idReceita,
        dadosReceita
      );
      res.status(200).json({
        status: "sucesso",
        mensagem: "Receita atualizada com sucesso.",
        dados: receitaAtualizada,
      });
    } catch (error) {
      if (error instanceof HttpErro) {
        res.status(error.statusCode).json({
          status: "erro",
          mensagem: error.mensagem,
        });
        return;
      }

      console.error(":C - Erro ao atualiza receita.", error);
      res.status(500).json({
        status: "erro",
        message: "Erro interno ao atualizar receita.",
      });
    }
  }

  async excluirReceita(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ status: "erro", mensagem: "ID da receita não fornecido." });
      return;
    }
    const idReceita = parseInt(id);
    try {
      const receita = await servicoReceita.listarReceita(idReceita);
      if (!receita) {
        res.status(404).json({
          status: "erro",
          mensagem: "Receita não encontrada para exclusão.",
        });
        return;
      }

      const receitaExcluida = await servicoReceita.excluirReceita(idReceita);
      res.status(200).json({
        status: "sucesso",
        mensagem: "Receita excluída com sucesso.",
        dados: receitaExcluida,
      });
    } catch (error) {
      console.error(":C - Erro ao excluir receita.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno ao excluir receita.",
      });
    }
  }
}

export const receitaController = new ReceitaController();
