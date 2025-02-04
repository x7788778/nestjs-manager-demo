/*
 * @Date: 2025-01-30 23:49:07
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-01-30 23:49:15
 * @FilePath: /nestjs-manager-demo/src/user/dto/create-user.dto.ts
 * @name: filename
 * @description: description
 */
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}