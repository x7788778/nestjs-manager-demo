/*
 * @Date: 2025-01-26 20:10:59
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-05 22:32:13
 * @FilePath: /nestjs-manager-demo/src/user/user.controller.ts
 * @name: filename
 * @description: description
 */
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // return this.userService.createUser(createUserDto);
    return this.authService.register(createUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile() {
    // 这里可以根据实际需求返回用户的详细信息
    return { message: 'This is your user profile.' };
  }
}