import { Injectable, Logger } from '@nestjs/common';
import { UserRole } from 'src/user/type/role.const';
import { UserService } from 'src/user/user.service';
import { Context } from 'telegraf';

@Injectable()
export class MiddlewareService {
  private _logger = new Logger(MiddlewareService.name);

  constructor(private readonly userService: UserService) {
    this.createUser = this.createUser.bind(this);
  }

  logger = async (ctx: Context, next: Function) => {
    if (ctx.updateType == 'callback_query') {
      // @ts-ignore
      const text = `[${ctx.from.id}] [@${ctx.from.username}] ${ctx.callbackQuery.data}`;
      this._logger.log(text);
    }
    if (ctx.updateType == 'message') {
      // @ts-ignore
      const text = `[${ctx.from.id}] [@${ctx.from.username}] ${ctx.message.text}`;
      this._logger.log(text);
    }
    await next();
  };

  checkBan = async (ctx: Context, next: Function) => {
    this._logger.debug(`check ban ${ctx.from.id}`);
    if (!ctx.from || ctx.from.is_bot) {
      return;
    }
    const userId = ctx.from.id;
    if (!userId) {
      return;
    }
    const user = await this.userService.findOneById(userId);
    if (user && user.banned) {
      this._logger.debug(`user ${ctx.from.id} banned`);
      return;
    }
    await next();
  };

  createUser = async (ctx: Context, next: Function) => {
    const user = await this.userService.findOneById(ctx.from.id);
    
    if (user && user.registrated == true) {
      this._logger.debug(`user ${ctx.from.id} already registrated`);
      await next();
      return;
    } else {
      this._logger.debug(`create user ${ctx.from.id}`);
      await this.userService.create({
        id: ctx.from.id,
        first_name: ctx.from.first_name,
        username: ctx.from.username,
        registrated: true,
        role: UserRole.USER,
      });
      await next();
    }
  };

  updateUser = async (ctx: Context, next: Function) => {
    this._logger.debug(`update user ${ctx.from.id}`);
    await this.userService.updateOneById({
      id: ctx.from.id,
      first_name: ctx.from.first_name,
      username: ctx.from.username,
    });
    await next();
  };
}
