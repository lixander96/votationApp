import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { WsJwtStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [],
      useFactory() {
        return {
          secret: 'lhdsfukshgfiuhlsdfnlgunsdfubnsdfinbiu',
          signOptions: {
            expiresIn: 36000,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, WsJwtStrategy],
  exports: [
    JwtStrategy,
    WsJwtStrategy,
    PassportModule,
    AuthModule,
    AuthService,
  ],
})
export class AuthModule {}
