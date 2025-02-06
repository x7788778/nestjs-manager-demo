/*
 * @Date: 2025-01-26 20:10:59
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-06 22:48:04
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
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { UserRole } from './entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({ status: 201, description: '用户注册成功' })
  async create(@Body() createUserDto: CreateUserDto) {
    // return this.userService.createUser(createUserDto);
    return this.authService.register(createUserDto);
  }


  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: 200, description: '用户登录成功，返回 JWT' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户个人资料' })
  @ApiResponse({ status: 200, description: '成功返回用户个人资料' })
  async getProfile() {
    // 这里可以根据实际需求返回用户的详细信息
    return { message: 'This is your user profile.' };
  }

   // 使用 @Get 装饰器定义一个 GET 请求的路由
  // 路由路径为 'users/admin'
  // 使用 @UseGuards 装饰器应用 JWT 认证守卫和角色权限守卫
  // 使用 @Roles 装饰器指定访问该接口所需的角色为管理员
  @Get('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取管理员专用数据' })
  @ApiResponse({ status: 200, description: '成功返回管理员专用数据' })
  async getAdminData() {
    // 返回只有管理员才能访问的数据
    return { message: 'This is admin-only data.' };
  }
}