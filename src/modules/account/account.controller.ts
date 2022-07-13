import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { RegisterAccountDTO } from './types/dto/register-account.dto';
import { constants } from '@louis-phhh/louis-shared';
import { AccountUtil } from './account.util';
import { RegisterAccountResponse } from './types/type/register-account-response.type';

const { ACCOUNT_MESSAGE_PATTERN } = constants;

@Controller()
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountUtil: AccountUtil,
  ) {}

  @MessagePattern(ACCOUNT_MESSAGE_PATTERN.REGISTER_ACCOUNT)
  async registerAccount(
    data: RegisterAccountDTO,
  ): Promise<RegisterAccountResponse> {
    const account = await this.accountService.registerAccount(data);
    return this.accountUtil.transformToResponseItem(account);
  }
}
