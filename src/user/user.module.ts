/*
 * @Date: 2025-01-26 20:05:40
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-06 02:04:24
 * @FilePath: /nestjs-manager-demo/src/user/user.module.ts
 * @name: filename
 * @description: description
 */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module'; // 导入 AuthModule
// TypeOrmModule.forFeature([User])：将 User 实体注册到当前模块中。
@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule)], // 注册 User 实体
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export default class UserModule {}