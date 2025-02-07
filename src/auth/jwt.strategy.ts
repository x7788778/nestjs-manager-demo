/*
 * @Date: 2025-02-01 16:20:58
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-07 21:35:03
 * @FilePath: /nestjs-manager-demo/src/auth/jwt.strategy.ts
 * @name: filename
 * @description: description
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });

    // console.log('JwtStrategy++++++',this.usersService);
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}