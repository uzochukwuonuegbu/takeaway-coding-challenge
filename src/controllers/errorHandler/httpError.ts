import { NextFunction, Request, Response } from "express-serve-static-core";

class HTTPError extends Error {
    constructor(public status: number, message?: string) {
      super(message);
      Object.setPrototypeOf(this, HTTPError.prototype);
    }
  }

export class InvalidRequestInputError extends HTTPError {
    constructor(message?: string) {
      super(412, message || 'Invalid Input');
      Object.setPrototypeOf(this, InvalidRequestInputError.prototype);
    }
  }

export class BadRequestError extends HTTPError {
    constructor(message?: string) {
      super(400, message || 'Bad Request');
      Object.setPrototypeOf(this, BadRequestError.prototype);
    }
  }

export class UnauthorizedError extends HTTPError {
    constructor(message?: string) {
      super(401, message || 'Unauthorized');
      Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
  }

export class ForbiddenError extends HTTPError {
    constructor(message?: string) {
      super(403, message || 'Forbidden');
      Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
  }

export class NotFoundError extends HTTPError {
    constructor(message?: string) {
      super(404, message || 'Not Found');
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  }

export class RecordExistsError extends HTTPError {
    constructor(message?: string) {
      super(409, message || 'Already Exists');
      Object.setPrototypeOf(this, RecordExistsError.prototype);
    }
  }
export class InternalServerError extends HTTPError {
    constructor(message?: string) {
      super(500, message || 'Internal Server Error');
      Object.setPrototypeOf(this, InternalServerError.prototype);
    }
  }

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HTTPError) {
        const { status, message } = err;
        res.status(status).json({ error: message });
    }
    else if (err instanceof Error) {
      const { message } = err;
      res.status(400).json({ error: message });
    }
    else {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}