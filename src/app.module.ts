/*
 * @Date: 2025-01-25 04:13:40
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-08 01:02:01
 * @FilePath: /nestjs-manager-demo/src/app.module.ts
 * @name: filename
 * @description: description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { webcrypto } from 'webcrypto';
import  UserModule  from './user/user.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { RateLimiterConfigModule } from './rate-limiter/rate-limiter.module';
dotenv.config()
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as unknown as Crypto;
}
@Module({
  imports: [
    // 配置模块：加载环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '../.env'),
    }),

    // TypeORM 模块：异步加载数据库配置
    TypeOrmModule.forRootAsync({
      // 依赖 ConfigModule，以便在工厂函数中使用 ConfigService
      imports: [ConfigModule],
      // 使用工厂函数动态生成 TypeORM 配置
      useFactory: (configService: ConfigService) => {
  //       console.log('DATABASE_HOST:', configService.get<string>('DATABASE_HOST'));
  // console.log('DATABASE_PORT:', configService.get<number>('DATABASE_PORT'));
  // console.log('DATABASE_USERNAME:', configService.get<string>('DATABASE_USERNAME'));
  // console.log('DATABASE_PASSWORD:', configService.get<string>('DATABASE_PASSWORD'));
  // console.log('DATABASE_NAME:', configService.get<string>('DATABASE_NAME'));
        return {
        type: 'postgres', // 数据库类型，这里使用 PostgreSQL
        host: configService.get<string>('DATABASE_HOST'), // 数据库主机地址
        port: configService.get<number>('DATABASE_PORT'), // 数据库端口
        username: configService.get<string>('DATABASE_USERNAME'), // 数据库用户名
        password: configService.get<string>('DATABASE_PASSWORD'), // 数据库密码
        database: configService.get<string>('DATABASE_NAME'), // 数据库名称
        entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],// 实体文件路径，用于映射数据库表
        synchronize: true, // 自动同步数据库结构（仅在开发环境中使用，生产环境中应设置为 false）
        logging: true, // 开启日志方便调试
      }
    
    },
      // 注入 ConfigService，以便在工厂函数中访问环境变量
      inject: [ConfigService],
      
    },),
    UserModule,
    AuthModule,
    RateLimiterConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}