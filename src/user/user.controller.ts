/*
 * @Date: 2025-01-26 20:10:59
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-01 16:26:34
 * @FilePath: /nestjs-manager-demo/src/user/user.controller.ts
 * @name: filename
 * @description: description
 */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}