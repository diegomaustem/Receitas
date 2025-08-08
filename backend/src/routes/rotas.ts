import { Router } from "express";
import { usuarioController } from "../controllers/UsuarioController";
import { receitaController } from "../controllers/ReceitaController";
import { validate } from "../middlewares/middlewareValidacao";
import {
  schemaAtualizacaoUsuario,
  schemaCriacaoUsuario,
} from "../validations/ValidacaoUsuario";
import {
  schemaAtualizacaoReceita,
  schemaCriacaoReceita,
} from "../validations/ValidacaoReceita";
import { categoriaController } from "../controllers/CategoriaController";
const rotas = Router();

// Usuários
rotas.get("/usuarios", usuarioController.listarUsuarios);
rotas.get("/usuario/:id", usuarioController.listarUsuario);
rotas.post(
  "/usuario",
  validate(schemaCriacaoUsuario, "body"),
  usuarioController.criarUsuario
);
rotas.patch(
  "/usuario/:id",
  validate(schemaAtualizacaoUsuario, "body"),
  usuarioController.atualizarUsuario
);
rotas.delete("/usuario/:id", usuarioController.excluirUsuario);

// Receitas
rotas.get("/receitas", receitaController.listarReceitas);
rotas.get("/receita/:id", receitaController.listarReceita);
rotas.post(
  "/receita",
  validate(schemaCriacaoReceita, "body"),
  receitaController.criarReceita
);
rotas.patch(
  "/receita/:id",
  validate(schemaAtualizacaoReceita, "body"),
  receitaController.atualizarReceita
);
rotas.delete("/receita/:id", receitaController.excluirReceita);

// Categorias
rotas.get("/categorias", categoriaController.listarCategorias);
rotas.get("/categoria/:id", categoriaController.listarCategoria);

export default rotas;
