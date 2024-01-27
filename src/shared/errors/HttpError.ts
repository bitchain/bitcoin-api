class HttpError {
  public readonly message: string
  public readonly statusCode: number

  constructor(message = 'Unknown error', statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

export { HttpError }
