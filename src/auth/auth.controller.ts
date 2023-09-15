import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  logout(@Body() username: string) {
    this.authService.logout(username);
  }

  @Post('refresh')
  refreshTokens(@Body() username: string) {
    this.authService.refreshTokens(username);
  }
}
