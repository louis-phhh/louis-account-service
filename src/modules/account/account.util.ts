import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { Account } from './account.entity';

@Injectable()
export class AccountUtil {
  transformToResponseItem(acc: Account) {
    const result = omit(acc, ['createdTime', 'updatedTime', 'password']);
    return result;
  }
}
