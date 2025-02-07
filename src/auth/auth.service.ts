/*
 * @Date: 2025-02-01 16:16:04
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-07 21:40:30
 * @FilePath: /nestjs-manager-demo/src/auth/auth.service.ts
 * @name: filename
 * @description: description
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
    // console.log('AuthService++++++',this.usersService);
    // console.log('AuthService++++++',this.jwtService);
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne(loginUserDto.username);
    // console.log('---------validateUser-user---------',user);
    if (user) {
      const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        // console.log('密码验证结果:', isPasswordValid,loginUserDto.password,'--vs--',user.password);
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    // console.log('++++++++++++++++++++++',loginUserDto);
    const user = await this.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    // console.log('---------------token:', access_token);
    return {
      access_token: access_token,
    };
  }

  async register(createUserDto) {
    // console.log('---------------register');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const newUser = { ...createUserDto, password: hashedPassword };
    // console.log('---------------newUser:', newUser,hashedPassword);
    return this.usersService.createUser(newUser);
  }
}