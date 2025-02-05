/*
 * @Date: 2025-02-06 00:29:47
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-06 01:06:42
 * @FilePath: /nestjs-manager-demo/src/auth/role.gaurd.ts
 * @name: filename
 * @description: description
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../user/entities/user.entity';

// 使用 @Injectable 装饰器将该类标记为可注入的服务
// 该类实现了 CanActivate 接口，用于创建权限守卫
@Injectable()
export class RolesGuard implements CanActivate {
  // 注入 Reflector 服务，用于获取元数据
  constructor(private reflector: Reflector) {}

  // 实现 canActivate 方法，该方法决定请求是否可以继续执行
  canActivate(context: ExecutionContext): boolean {
    // 使用 reflector.get 方法从处理程序（路由处理函数）中获取 'roles' 元数据
    // 该元数据表示访问该接口所需的角色列表
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    // 如果没有设置所需角色，说明该接口不需要特定角色即可访问，直接返回 true
    if (!requiredRoles) {
      return true;
    }
    // 获取当前请求对象
    const request = context.switchToHttp().getRequest();
    // 从请求对象中获取用户信息
    const user = request.user;
    // 检查用户的角色是否在所需角色列表中
    // 如果有匹配的角色，则返回 true，允许访问；否则返回 false，拒绝访问
    return requiredRoles.some((role) => user.role === role);
  }
}