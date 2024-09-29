import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Catch()
export class TelegrafExceptionFilter implements ExceptionFilter {
  private logger = new Logger(TelegrafExceptionFilter.name);
  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const telegrafHost = TelegrafArgumentsHost.create(host);
    const ctx = telegrafHost.getContext<Context>();
    // this.logger.error(exception.stack)
    // this.logger.error(exception.name)
    // await ctx.replyWithHTML(`<b>Error</b>: ${exception.message}`);
    this.logger.error(exception.message);
  }
}
