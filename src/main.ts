/*
 * @Date: 2025-01-25 04:13:40
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-12 01:35:03
 * @FilePath: /nestjs-manager-demo/src/main.ts
 * @name: filename
 * @description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { createAppLogger } from './logger/app.logger';
import cors from 'cors';
// import * as crypto from 'crypto'; // 手动引入 crypto 模块
// global.crypto = crypto;
// const uuid = crypto.randomUUID();
// // console.log('Crypto module:', crypto);
// // 确保 crypto 模块已加载
// const globalObject = typeof global !== 'undefined' ? global : window;
// 打印全局对象

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    // logger: ['error', 'warn', 'log', 'verbose', 'debug'], // 确保包含需要的日志级别
    logger: createAppLogger(), // 使用自定义的日志记录器
  });
  app.use(cors());

  // 应用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  console.log("new ValidationPipe()",JSON.stringify(new ValidationPipe()))
  // 应用全局验证管道
  // app.useGlobalPipes(new ValidationPipe());
  
  // 创建 Swagger 文档配置
  const config = new DocumentBuilder()
    .setTitle('用户管理 API')
    .setDescription('用户注册、登录及权限管理的 API 文档')
    .setVersion('1.0')
    .addBearerAuth() // 添加 Bearer 认证支持
    .build();

  // 根据配置生成 Swagger 文档
  const document = SwaggerModule.createDocument(app, config);

  // 将 Swagger 文档挂载到 /api 路径
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
