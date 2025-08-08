class HttpErro extends Error {
  constructor(public mensagem: string, public statusCode: number = 500) {
    super(mensagem);
    this.name = "AppError";
  }
}

export default HttpErro;
