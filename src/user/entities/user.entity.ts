/*
 * @Date: 2025-01-26 20:12:20
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-06 00:29:10
 * @FilePath: /nestjs-manager-demo/src/user/entities/user.entity.ts
 * @name: filename
 * @description: description
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 定义用户角色的枚举类型
// 包含两种角色：普通用户和管理员
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// 使用 @Entity 装饰器将该类标记为 TypeORM 的实体类
// 对应数据库中的 user 表
@Entity()
export class User {
  // 使用 @PrimaryGeneratedColumn 装饰器生成自增的主键
  @PrimaryGeneratedColumn()
  id: number;

  // 使用 @Column 装饰器定义一个列，设置该列的值唯一
  @Column({ unique: true })
  username: string;

  // 使用 @Column 装饰器定义一个列，用于存储用户密码
  @Column()
  password: string;

  // 使用 @Column 装饰器定义一个枚举类型的列
  // 枚举类型为 UserRole，默认值为普通用户角色
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  // 使用 @Column 装饰器定义一个时间戳列
  // 默认值为当前时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}