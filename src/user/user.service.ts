/*
 * @Date: 2025-01-26 20:10:38
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-08 00:15:31
 * @FilePath: /nestjs-manager-demo/src/user/user.service.ts
 * @name: filename
 * @description: description
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User }  from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PaginateUsersDto } from './dto/paginate-users.dto';
import { SearchUsersDto } from './dto/search-users.dto';
@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    
    // console.log('UserService constructor called');
    // console.log('userRepository:', this.userRepository);
  }

  async createUser(createUserDto) {
    console.log('即将保存的用户信息:', createUserDto);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
 
  // 更新用户信息的方法，接收用户 ID 和 UpdateUserDto 类型的参数
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    // 根据用户 ID 查找用户
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      // 如果未找到用户，抛出 404 异常
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // 如果更新信息中包含密码，对密码进行加密处理
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    // 将更新信息合并到用户对象中
    Object.assign(user, updateUserDto);
    // 保存更新后的用户信息到数据库
    return this.userRepository.save(user);
  }
  
  // 删除用户的方法，接收用户 ID 作为参数
  async deleteUser(id: number) {
    // 根据用户 ID 查找用户
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      // 如果未找到用户，抛出 404 异常
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // 从数据库中删除该用户
    return this.userRepository.remove(user);
  }

  // 分页查询用户的方法，接收 PaginateUsersDto 类型的参数
  async paginateUsers(paginateUsersDto: PaginateUsersDto) {
    const { page, limit } = paginateUsersDto;
    // 根据传入的 page 和 limit 计算出偏移量 skip  用于分页查询
    const skip = (page - 1) * limit;
    // 使用 TypeORM 的 findAndCount 方法进行分页查询
    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
    });
    return {
      users,
      total,
      page,
      limit,
    };
  }

  // 搜索用户的方法，接收 SearchUsersDto 类型的参数
  async searchUsers(searchUsersDto: SearchUsersDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (searchUsersDto.username) {
      // 根据用户名进行模糊搜索
      queryBuilder.andWhere('user.username LIKE :username', { username: `%${searchUsersDto.username}%` });
    }

    if (searchUsersDto.role) {
      // 根据用户角色进行精确搜索
      queryBuilder.andWhere('user.role = :role', { role: searchUsersDto.role });
    }

    const users = await queryBuilder.getMany();
    return users;
  }
}