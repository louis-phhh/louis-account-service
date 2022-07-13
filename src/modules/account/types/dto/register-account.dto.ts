import { IsNotEmpty } from 'class-validator';

export class RegisterAccountDTO {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}
