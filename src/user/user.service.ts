import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UserRole } from './type/role.const';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneById(user_id: number) {
    return await this.userRepository.findOneBy({
      id: user_id,
    });
  }

  async create(create_user: DeepPartial<User>) {
    return await this.userRepository.save(create_user);
  }

  async updateOneById(update_user: DeepPartial<User>) {
    return await this.userRepository.update(
      {
        id: update_user.id,
      },
      update_user,
    );
  }
}
