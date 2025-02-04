/*
 * @Date: 2025-01-26 20:12:20
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-01-31 22:49:53
 * @FilePath: /nestjs-manager-demo/src/user/entities/user.entity.ts
 * @name: filename
 * @description: description
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
// @Entity()：将类标记为 TypeORM 实体。

// @PrimaryGeneratedColumn()：自动生成的主键列。

// @Column()：普通列，可以指定唯一性、默认值等。

// @CreateDateColumn() 和 @UpdateDateColumn()：自动管理创建时间和更新时间。
@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' }) // 默认角色为 'user'
  role: string;

  @CreateDateColumn()
  createdAt: Date;

}