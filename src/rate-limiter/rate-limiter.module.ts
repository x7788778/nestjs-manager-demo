/*
 * @Date: 2025-02-08 00:56:08
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-08 01:04:21
 * @FilePath: /nestjs-manager-demo/src/rate-limiter/rate-limiter.module.ts
 * @name: filename
 * @description: description
 */
// 防止恶意攻击（如暴力破解、DDoS 攻击等）和滥用 API，需要对 API 请求进行限流，
// 确保系统在高并发情况下仍能稳定运行。
// 我们将使用 nestjs-rate-limiter 库来实现 API 限流功能。

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';

// 配置了一个全局的限流模块，在 60 秒内允许每个 IP 地址最多发起 10 次请求。
@Module({
  imports: [
    RateLimiterModule.register({
      points: 4, // 允许的请求次数
      duration: 60, // 时间窗口，单位为秒
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class RateLimiterConfigModule {}