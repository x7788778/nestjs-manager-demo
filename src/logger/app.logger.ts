/*
 * @Date: 2025-02-08 00:37:34
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-08 00:40:30
 * @FilePath: /nestjs-manager-demo/src/logger/app.logger.ts
 * @name: filename
 * @description: description
 */
// 配置日志记录器
// 在用户管理系统中，对用户的重要操作（如注册、登录、更新信息、删除账户等）
// 进行日志记录是非常有必要的。日志记录可以帮助管理员进行审计，
// 追踪系统的使用情况，同时在出现问题时也能方便排查故障。
// 我们将使用 NestJS 的日志系统，并结合 winston 库来实现详细的日志记录功能。

import { Logger, LoggerService } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export function createAppLogger(): LoggerService {
    return WinstonModule.createLogger({
        transports: [
            new winston.transports.Console({
                level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    nestWinstonModuleUtilities.format.nestLike('MyApp', {
                        prettyPrint: true,
                    }),
                ),
            }),
            new winston.transports.File({
                filename: 'combined.log',
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json(),
                ),
            }),
            new winston.transports.File({
                filename: 'error.log',
                level: 'error',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json(),
                ),
            }),
        ],
    });
}