import { Logger, UseFilters } from '@nestjs/common';
import { Command, Ctx, Update } from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from './filters/telegraf.filter';
import { Context } from 'telegraf';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class AppUpdate {
  private logger = new Logger(AppUpdate.name);

  constructor() {}

  @Command('start')
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Hello World');
  }
}
