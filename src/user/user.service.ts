/*
 * @Date: 2025-01-26 20:10:38
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-01 00:24:03
 * @FilePath: /nestjs-manager-demo/src/user/user.service.ts
 * @name: filename
 * @description: description
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  User  from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }
 
}