/*
 * @Date: 2025-01-30 23:46:27
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-06 22:45:30
 * @FilePath: /nestjs-manager-demo/src/user/dto/login-user.dto.ts
 * @name: filename
 * @description: description
 */
import {IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: '用户名，长度至少为 3 个字符' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '密码，长度至少为 6 个字符' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}