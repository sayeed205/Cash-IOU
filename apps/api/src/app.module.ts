import {
    MiddlewareConsumer,
    Module,
    NestModule,
    ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { MorganMiddleware } from '@nest-middlewares/morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransactionRoomModule } from './transaction-room/transaction-room.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../', 'client/dist'),
            exclude: ['/api/(.*)'],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        TransactionRoomModule,
        TransactionModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        MorganMiddleware.configure('dev');
        consumer.apply(MorganMiddleware).forRoutes('*');
    }
}
