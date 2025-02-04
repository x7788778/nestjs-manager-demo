/*
 * @Date: 2025-01-25 04:13:40
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-01-27 23:19:14
 * @FilePath: /nestjs-manager-demo/src/main.ts
 * @name: filename
 * @description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as crypto from 'crypto'; // 手动引入 crypto 模块
// global.crypto = crypto;
// const uuid = crypto.randomUUID();
// // console.log('Crypto module:', crypto);
// // 确保 crypto 模块已加载
// const globalObject = typeof global !== 'undefined' ? global : window;
// 打印全局对象


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
