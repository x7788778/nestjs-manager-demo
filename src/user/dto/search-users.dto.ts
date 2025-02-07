/*
 * @Date: 2025-02-08 00:11:57
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-08 00:12:43
 * @FilePath: /nestjs-manager-demo/src/user/dto/search-users.dto.ts
 * @name: filename
 * @description: description
 */
//创建搜索用户 DTO,定义搜索用户所需的参数

import { IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SearchUsersDto {
  // 使用 @ApiProperty 为 Swagger 文档提供字段描述
  @ApiProperty({ description: '用户名关键字，用于模糊搜索', required: false })
  // @IsOptional 表示该字段是可选的，不是必须提供的
  @IsOptional()
  // @IsString 验证该字段是否为字符串类型
  @IsString()
  username: string;

  @ApiProperty({ description: '用户角色，可选值为 user 或 admin', required: false, enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}