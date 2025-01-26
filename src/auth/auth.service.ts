import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserJwtResponse} from "./interfaces/jwt.interface";
import {LoginUserDto} from "./dto/login.dto";
import {UserService} from "../user/user.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
      private jwtService: JwtService,
      private readonly userService: UserService,
      private configService: ConfigService,
  ) {}

  async validateUserById(userId: number) {
    return await this.userService.findById(userId);
  }

  async register(registerDto) {

  }

  async login(loginDto: LoginUserDto): Promise<UserJwtResponse> {
    const userResult = await this.userService.signIn(loginDto);

    if (!userResult) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const payload = { userResult };
    const accessToken = await this.jwtService.sign(payload, {secret: this.configService.get<string>('JWT_SECRET')});

    return {user: userResult, accessToken};
  }
}
