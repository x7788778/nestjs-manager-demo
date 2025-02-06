/*
 * @Date: 2025-01-30 23:49:07
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-07 00:40:23
 * @FilePath: /nestjs-manager-demo/src/user/dto/create-user.dto.ts
 * @name: filename
 * @description: description
 */
import { IsNotEmpty, MinLength, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名，长度至少为 3 个字符' })
  @IsString({ message: '用户名必须是字符串类型' })
  @MinLength(3, { message: '用户名长度不能少于 3 个字符' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '密码，长度至少为 6 个字符' })
  @IsString({ message: '密码必须是字符串类型' })
  @MinLength(6, { message: '密码长度不能少于 6 个字符' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: '用户角色，可选值为 user 或 admin', enum: UserRole })
  @IsEnum(UserRole, { message: '用户角色必须是 user 或 admin 之一' })
  role: UserRole;
}

// 通过添加全局异常过滤器、自定义验证管道和细化错误信息，我们解决了系统中异常处理不统一、
// 数据验证不够灵活和错误信息不明确的问题，使得系统在面对异常情况时能给出更清晰、友好的反馈，
// 同时提高了数据的准确性和安全性。