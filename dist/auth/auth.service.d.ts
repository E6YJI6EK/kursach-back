import { JwtService } from "@nestjs/jwt";
import { UserJwtResponse } from "./interfaces/jwt.interface";
import { LoginUserDto } from "./dto/login.dto";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private jwtService;
    private readonly userService;
    private configService;
    constructor(jwtService: JwtService, userService: UserService, configService: ConfigService);
    validateUserById(userId: number): Promise<import("../user/entities/user.entity").UserEntity>;
    register(registerDto: any): Promise<void>;
    login(loginDto: LoginUserDto): Promise<UserJwtResponse>;
}
