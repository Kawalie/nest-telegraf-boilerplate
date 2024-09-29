import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MiddlewareService } from './middleware.service';

@Module({
  imports: [UserModule],
  providers: [MiddlewareService],
  exports: [MiddlewareService],
})
export class MiddlewareModule {}
