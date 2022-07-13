import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    this.env = configService.get<string>('NODE_ENV');
    this.name = configService.get<string>('HELLO_NAME');
  }
  env: string;
  name: string;

  getHello(): string {
    return 'Hello World! ' + this.env + ' ' + this.name;
  }
}
