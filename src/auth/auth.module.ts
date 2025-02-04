/*
 * @Date: 2025-02-01 16:04:27
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-02 16:56:27
 * @FilePath: /nestjs-manager-demo/src/auth/auth.module.ts
 * @name: filename
 * @description: description
 */
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import  UserModule  from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config()
@Module({
  imports: [
    forwardRef(()=>UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}