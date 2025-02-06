/*
 * @Date: 2025-02-07 00:26:03
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-02-07 00:34:23
 * @FilePath: /nestjs-manager-demo/src/filters/pipes/validation.pipe.ts
 * @name: filename
 * @description: description
 */
import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any,  metatype: any) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

//这个自定义验证管道会使用 class-validator 对传入的数据进行验证，如果验证失败会抛出 BadRequestException。