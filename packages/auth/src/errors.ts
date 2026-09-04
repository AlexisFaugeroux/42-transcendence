export class ApiErrorReponse extends Error {
  public readonly status: number;

  constructor(message = 'Api error', status = 500) {
    super(message);
    this.name = 'ApiErrorReponse';
    this.status = status;
  }
}
