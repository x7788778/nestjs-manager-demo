/*
 * @Date: 2025-01-25 05:11:12
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-01 01:53:03
 * @FilePath: /nestjs-manager-demo/src/config/typeorm.config.ts
 * @name: filename
 * @description: description
 */
import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as dotenv from 'dotenv';
dotenv.config()

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // 生产环境中应设置为false
    logging: true // 开启日志方便调试
  };