import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SingupDto, SinginDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('singup')
  @UsePipes(ValidationPipe)
  async singup(@Body() singUpDto: SingupDto) {
    return this._authService.singup(singUpDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() singinDto: SinginDto) {
    return this._authService.singin(singinDto);
  }
}
