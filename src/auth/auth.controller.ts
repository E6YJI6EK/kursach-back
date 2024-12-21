import {Body, Controller, Put} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserJwtResponse} from "./interfaces/jwt.interface";
import {LoginUserDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Put('login')
  async login(@Body() loginDto: LoginUserDto): Promise<UserJwtResponse> {
    return this.authService.login(loginDto);
  }
}
