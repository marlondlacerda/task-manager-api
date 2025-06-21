export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation error') {
    super(message, 422);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409);
  }
}
