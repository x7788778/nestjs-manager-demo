/*
 * @Date: 2025-01-30 23:49:07
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-06 22:44:39
 * @FilePath: /nestjs-manager-demo/src/user/dto/create-user.dto.ts
 * @name: filename
 * @description: description
 */
import { IsNotEmpty, MinLength, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名，长度至少为 3 个字符' })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '密码，长度至少为 6 个字符' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '用户角色，可选值为 user 或 admin', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}