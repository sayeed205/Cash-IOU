import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoIdException } from './mongo-id.exception';

@Catch(MongoIdException)
export class MongoIdExceptionFilter implements ExceptionFilter {
    catch(exception: MongoIdException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        console.log(exception);
        response.status(400).json({
            statusCode: 400,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Invalid MongoId',
        });
    }
}
