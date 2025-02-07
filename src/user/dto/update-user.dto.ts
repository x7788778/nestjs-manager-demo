/*
 * @Date: 2025-02-07 00:43:28
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-07 00:44:17
 * @FilePath: /nestjs-manager-demo/src/user/dto/update-user.dto.ts
 * @name: filename
 * @description: description
 */
import { IsOptional, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  // 使用 @ApiProperty 为 Swagger 文档提供字段描述
  @ApiProperty({ description: '用户名，长度至少为 3 个字符', required: false })
  // @IsOptional 表示该字段是可选的，不是必须提供的
  @IsOptional()
  @IsString({ message: '用户名必须是字符串类型' })
  @MinLength(3, { message: '用户名长度不能少于 3 个字符' })
  username: string;

  @ApiProperty({ description: '密码，长度至少为 6 个字符', required: false })
  @IsOptional()
  @IsString({ message: '密码必须是字符串类型' })
  @MinLength(6, { message: '密码长度不能少于 6 个字符' })
  password: string;

  @ApiProperty({ description: '用户角色，可选值为 user 或 admin', required: false, enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole, { message: '用户角色必须是 user 或 admin 之一' })
  role: UserRole;
}