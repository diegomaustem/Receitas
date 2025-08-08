import { Request, Response } from "express";
import { servicoCategoria } from "../services/ServicoCategoria";
import { IPaginacao } from "../Interfaces/IPaginacao";

class CategoriaController {
  async listarCategorias(req: Request, res: Response): Promise<void> {
    try {
      const paginacao: IPaginacao = {
        pagina: parseInt(String(req.query.pagina)) || 1,
        limite: parseInt(String(req.query.limite)) || 10,
      };

      const categorias = await servicoCategoria.listarCategorias(paginacao);
      res.status(200).json({ status: "sucesso", ...categorias });
      return;
    } catch (error) {
      console.error(":C - Erro ao recuperar categorias.", error);
      res.status(500).json({
        status: "erro",
        mensagem: "Erro interno ao recuperar categorias. Tente mais tarde.",
      });
      return;
    }
  }

  async listarCategoria(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ status: "erro", mensagem: "ID da categoria não fornecido." });
      return;
    }
    const idCategoria = parseInt(id);

    try {
      const categoria = await servicoCategoria.listarCategoria(idCategoria);
      if (!categoria) {
        res.status(404).json({
          status: "erro",
          mensagem: "Categoria não encontrada.",
        });
        return;
      }

      res.status(200).json({
        status: "sucesso",
        dados: categoria,
      });
      return;
    } catch (error) {
      console.error(":C - Erro ao recuperar categoria.", error);
      res.status(500).json({
        status: "erro",
        message: "Erro interno ao recuperar categoria. Tente mais tarde.",
      });
      return;
    }
  }
}

export const categoriaController = new CategoriaController();
