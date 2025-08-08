import jwt from "jsonwebtoken";
import { Request } from "express";

export interface IRequisicaoAutenticacao extends Request {
  user?: string | jwt.JwtPayload;
}
