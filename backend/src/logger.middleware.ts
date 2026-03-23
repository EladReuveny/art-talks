import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      console.log(
        `[${new Date().toDateString()}] ${method} ${url} - Status: ${statusCode} - Message: ${statusMessage}`,
      );
    });

    next();
  }
}
