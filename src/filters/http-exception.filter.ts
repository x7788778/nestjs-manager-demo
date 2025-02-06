/*
 * @Date: 2025-02-06 23:41:31
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-06 23:53:35
 * @FilePath: /nestjs-manager-demo/src/filter.ts
 * @name: filename
 * @description: description
 */
// 全局异常过滤器

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message
      });
  }
}

// 这个过滤器会捕获所有 HttpException 类型的异常，并以统一的 JSON 格式返回错误信息，包含状态码、时间戳、请求路径和错误消息。