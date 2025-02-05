/*
 * @Date: 2025-02-06 01:07:11
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-06 01:12:28
 * @FilePath: /nestjs-manager-demo/src/auth/role.decorator.ts
 * @name: filename
 * @description: description
 */
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/entities/user.entity';

// 定义一个装饰器函数 Roles
// 接收一个或多个 UserRole 类型的参数
// 使用 SetMetadata 为处理程序（路由处理函数）设置 'roles' 元数据
// 元数据的值为传入的角色列表
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);