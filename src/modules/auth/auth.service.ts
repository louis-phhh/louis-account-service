import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async validateUser(phone: string, password: string): Promise<Account | null> {
    const acc = await this.accountService.findOneByPhone(phone);
    this.logger.verbose(acc);
    if (acc && acc.password === password) {
      return acc;
    }
    return null;
  }

  async login(acc: Account) {
    const payload = { phone: acc.phone, account_id: acc.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
