import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  getProfile(@Request() req) {
    return req.user;
  }
}
