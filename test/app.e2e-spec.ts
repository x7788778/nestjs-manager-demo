/*
 * @Date: 2025-01-25 04:13:40
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-01 00:33:48
 * @FilePath: /nestjs-manager-demo/test/app.e2e-spec.ts
 * @name: filename
 * @description: description
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
