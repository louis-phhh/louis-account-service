import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AccountUtil } from './account.util';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), ConfigModule],
  controllers: [AccountController],
  providers: [AccountService, AccountUtil],
  exports: [AccountService, AccountUtil],
})
export class AccountModule implements OnApplicationBootstrap {
  constructor(private readonly accountService: AccountService) {}

  onApplicationBootstrap() {
    // this.accountService
    //   .insertAccounts([
    //     {
    //       phone: '0972701948',
    //       password: 'haupd',
    //     },
    //     {
    //       phone: '0972701944',
    //       password: 'haupd',
    //     },
    //   ])
    //   .then(console.log);
    // this.accountService
    //   .updateAccountById(1276832615, { password: 'fucked' })
    //   .then(console.log);
  }
}
