export default class customError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    statusCode = statusCode;
  }
}
