/*
 * @Date: 2025-01-26 20:10:59
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-01-31 00:06:19
 * @FilePath: /nestjs-manager-demo/src/user/user.controller.spec.ts
 * @name: filename
 * @description: description
 */
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
