/*
 * @Date: 2025-01-27 07:40:43
 * @LastEditors: zhaogang 156606672@qq.com
 * @LastEditTime: 2025-01-27 07:42:02
 * @FilePath: /nestjs-manager-demo/src/common/utils/string.utils.ts
 * @name: filename
 * @description: description
 */
import { v4 as uuidv4 } from 'uuid';

export const generateString = (): string => uuidv4();
