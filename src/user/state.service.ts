import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserState } from './entity/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserStateService {
  constructor(
    @InjectRepository(UserState)
    private userStateRepository: Repository<UserState>,
  ) {}

  async get(key: string) {
    return await this.userStateRepository.findOneBy({
      key: key,
    });
  }
  async set(key: string, value: string) {
    const state = await this.userStateRepository.findOneBy({
      key: key,
    });
    if (state == null) {
      const new_state = this.userStateRepository.create();
      new_state.key = key;
      new_state.value = value;
      return await this.userStateRepository.save(new_state);
    } else {
      state.value = value;
      return await this.userStateRepository.save(state);
    }
  }
  async delete(key: string) {
    return await this.userStateRepository.delete({
      key: key,
    });
  }
}
