import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AppLoggerMiddleware } from './logger/logger.middleware';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      logging: false,
      keepConnectionAlive: true,
      synchronize: true,
      migrationsTableName: 'migrations',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 3000,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_BASE_NAME,
    } as PostgresConnectionOptions),
    TopicModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
