/*
 * @Date: 2025-01-26 20:10:38
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-01-31 00:07:49
 * @FilePath: /nestjs-manager-demo/src/user/user.service.spec.ts
 * @name: filename
 * @description: description
 */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
