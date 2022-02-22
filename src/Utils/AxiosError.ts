class TokenError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);

    this.status = status;
    this.message = message;
  }
}

export class NotFoundError extends TokenError {}
export class ServerError extends TokenError {}

export default TokenError;
