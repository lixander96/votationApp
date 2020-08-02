import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class WsJwtGuard extends AuthGuard('ws-jwt') implements CanActivate {
  constructor(private readonly _authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const token = client.handshake.query.token;

    const jwtPayload: IJwtPayload = <IJwtPayload>(
      jwt.verify(token, 'lhdsfukshgfiuhlsdfnlgunsdfubnsdfinbiu')
    );
    const user: User = await this._authService.validateUser(jwtPayload);

    context.switchToWs().getData().user = user;

    return Boolean(user);
  }

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
}
