/*
 * @Date: 2025-01-25 04:13:40
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-07 17:58:29
 * @FilePath: /nestjs-manager-demo/src/app.controller.ts
 * @name: filename
 * @description: description
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('AppController constructor called',this.appService);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
