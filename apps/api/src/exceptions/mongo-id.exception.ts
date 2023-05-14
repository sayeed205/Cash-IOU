import { BadRequestException } from '@nestjs/common';

export class MongoIdException extends BadRequestException {
    constructor() {
        super('Invalid MongoId');
    }
}
