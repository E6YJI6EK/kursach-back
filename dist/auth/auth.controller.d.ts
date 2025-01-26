import { AuthService } from './auth.service';
import { UserJwtResponse } from "./interfaces/jwt.interface";
import { LoginUserDto } from "./dto/login.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginUserDto): Promise<UserJwtResponse>;
}
