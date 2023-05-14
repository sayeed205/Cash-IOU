import { Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { MongoIdException } from 'src/exceptions/mongo-id.exception';

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
    transform(value: string) {
        if (isValidObjectId(value)) return value;
        throw new MongoIdException(value);
    }
}
