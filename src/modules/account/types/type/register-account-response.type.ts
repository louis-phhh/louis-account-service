import { Account } from '../../account.entity';

export type RegisterAccountResponse = Omit<
  Account,
  'createdTime' | 'updatedTime' | 'password'
>;
