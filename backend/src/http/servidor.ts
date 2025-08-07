import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();
class Servidor {
  private servidor: Express;
  private porta: number | string;

  constructor() {
    this.servidor = express();
    this.porta = process.env.PORTA || 3003;
    this.middlewares();
  }

  private middlewares(): void {
    this.servidor.use(express.json());
  }

  public iniciaServidor(): void {
    this.servidor.listen(this.porta, () => {
      console.log("Servidor on na porta:", this.porta);
    });
  }
}

const servidor = new Servidor();
servidor.iniciaServidor();
