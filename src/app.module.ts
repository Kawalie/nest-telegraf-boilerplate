import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { UserStateService } from './user/state.service';
import { MiddlewareService } from './middleware/middleware.service';
import configuration from './configuration/configuration';
import { MiddlewareModule } from './middleware/middleware.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUpdate } from './app.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
        userStateService: UserStateService,
        middlewareService: MiddlewareService,
      ) => ({
        token: configService.get('bot.token'),
        middlewares: [
          session({
            getSessionKey: ctx => {
              if (ctx.from) {
                if (ctx.chat.id == ctx.from.id) {
                  return `${ctx.from.id}:${ctx.from.id}`;
                } else {
                  return undefined;
                }
              } else {
                return undefined;
              }
            },
            store: {
              get: async key => {
                const state = await userStateService.get(key);
                return state == null ? undefined : JSON.parse(state.value);
              },
              set: async (key, value) => {
                try {
                  return await userStateService.set(key, JSON.stringify(value));
                } catch (e) {
                  console.log(e);
                }
              },
              delete: async key => {
                return await userStateService.delete(key);
              },
            },
          }),
          middlewareService.logger,
          middlewareService.createUser,
          middlewareService.checkBan,
          middlewareService.updateUser,
        ],
      }),
      imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        MiddlewareModule,
        UserModule,
      ],
      inject: [ConfigService, UserStateService, MiddlewareService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('db.postgres.host'),
          port: configService.get<number>('db.postgres.port'),
          username: configService.get<string>('db.postgres.username'),
          password: configService.get<string>('db.postgres.password'),
          database: configService.get<string>('db.postgres.database'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      inject: [ConfigService],
    }),
  ],
  providers: [AppUpdate],
})
export class AppModule {}
