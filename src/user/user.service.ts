/*
 * @Date: 2025-01-26 20:10:38
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-05 01:29:24
 * @FilePath: /nestjs-manager-demo/src/user/user.service.ts
 * @name: filename
 * @description: description
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  User  from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto) {
    console.log('即将保存的用户信息:', createUserDto);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
 
}