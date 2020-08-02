import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
  constructor(
    @InjectRepository(AuthRepository)
    readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      secretOrKey: 'lhdsfukshgfiuhlsdfnlgunsdfubnsdfinbiu',
    });
  }

  async validate(payload: IJwtPayload) {
    const { id } = payload;

    const user = await this._authRepository.findOne(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
