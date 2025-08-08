import express, { Express, Request, Response } from "express";
import rotas from "../routes/rotas";
import dotenv from "dotenv";

dotenv.config();
class Servidor {
  private servidor: Express;
  private porta: number | string;

  constructor() {
    this.servidor = express();
    this.porta = process.env.PORTA || 3003;
    this.middlewares();
    this.rotas();
    this.tratarRotaInexistente();
  }

  private middlewares(): void {
    this.servidor.use(express.json());
  }

  private rotas(): void {
    this.servidor.use("/api", rotas);
  }

  private tratarRotaInexistente(): void {
    this.servidor.use((req: Request, res: Response) => {
      res.status(404).json({
        error: "erro",
        mensagem: "Rota não encontrada. Verifique o caminho e tente novamente.",
      });
      return;
    });
  }

  public iniciaServidor(): void {
    this.servidor.listen(this.porta, () => {
      console.log("Servidor on na porta:", this.porta);
    });
  }
}

const servidor = new Servidor();
servidor.iniciaServidor();
