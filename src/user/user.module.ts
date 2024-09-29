import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserStateService } from './state.service';
import { UserState } from './entity/state.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserState])],
  providers: [UserService, UserStateService],
  exports: [UserService, UserStateService, TypeOrmModule],
})
export class UserModule {}
