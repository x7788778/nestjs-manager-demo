/*
 * @Date: 2025-02-07 22:20:43
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-07 23:35:41
 * @FilePath: /nestjs-manager-demo/src/user/dto/paginate-users.dto.ts
 * @name: filename
 * @description: description
 */
// 在用户管理系统中，当用户数量较多时，一次性返回所有用户信息会影响系统性能和响应速度。
// 因此，我们需要实现用户列表的分页查询功能，
// 让客户端可以根据需求获取指定页码和每页数量的用户信息。
// 创建分页查询 DTO：

import { IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateUsersDto {
  // 使用 @ApiProperty 为 Swagger 文档提供字段描述
  @ApiProperty({ description: '页码，默认为 1', required: false, default: 1 })
  // @IsOptional 表示该字段是可选的，不是必须提供的
  @IsOptional()
  // @IsNumber 验证该字段是否为数字类型
  @IsNumber()
  // @Min(1) 验证该字段的最小值为 1
  @Min(1)
  page: number = 1;

  @ApiProperty({ description: '每页数量，默认为 10', required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number = 10;
}