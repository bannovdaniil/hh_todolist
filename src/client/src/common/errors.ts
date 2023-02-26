class BadRequestError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

class NotFoundError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

class UnexpectedError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }
}

export { BadRequestError, NotFoundError, UnexpectedError };
