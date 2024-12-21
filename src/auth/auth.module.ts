import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }), TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService,UserService, JwtStrategy, JwtService],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
