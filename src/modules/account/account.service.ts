import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import util from 'util';
import * as bcrypt from 'bcrypt';
import { Account } from './account.entity';
import {
  InsertAccountParams,
  RegisterAccountParams,
} from './types/params/insert-users.params';
import { utils } from '@louis-phhh/louis-shared';
import { ConfigService } from '@nestjs/config';
import { RegisterAccountResponse } from './types/type/register-account-response.type';

@Injectable()
export class AccountService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}
  private readonly entityManager: EntityManager = this.dataSource.manager;

  async findOneByPhone(phone: string): Promise<Account | undefined> {
    const acc = await this.entityManager.findOneBy(Account, { phone });
    return acc;
  }

  async insertAccounts(users: InsertAccountParams[]) {
    const listInsertUser = users.map((users) => ({
      ...users,
      id: utils.genEntityId(),
    }));

    const listCreatedAccount = await this.entityManager.create<Account>(
      Account,
      listInsertUser,
    );
    await this.entityManager.save(listCreatedAccount);
    return listCreatedAccount;
  }

  async updateAccountById(id: number, updateParams): Promise<Account> {
    const updateResponse = await this.entityManager
      .createQueryBuilder(Account, 'a')
      .update(updateParams)
      .where({
        id,
      })
      .returning('*')
      .execute();

    return updateResponse.raw[0];
  }

  async registerAccount(data: RegisterAccountParams): Promise<Account> {
    const saltRound = +this.configService.get<string>('BCRYPT_SALT_ROUND');
    console.log(
      '🚀 ~ file: account.service.ts ~ line 56 ~ AccountService ~ registerAccount ~ saltRound',
      saltRound,
    );
    const hasdPassword = await bcrypt.hash(data.password, saltRound);
    const insertAccountParams = {
      phone: data.phone,
      password: hasdPassword,
    };
    const [account] = await this.insertAccounts([insertAccountParams]);
    return account;
  }
}
