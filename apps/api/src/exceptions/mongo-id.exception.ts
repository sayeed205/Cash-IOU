import { BadRequestException } from '@nestjs/common';

export class MongoIdException extends BadRequestException {
    constructor(public readonly value: string) {
        super(`'${value}' is not a valid MongoId`);
    }
}
