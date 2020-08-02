import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { SingupDto, SinginDto } from './dto';
import { User } from './../user/user.entity';
import { IJwtPayload } from './jwt-payload.interface';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async singup(singupDto: SingupDto): Promise<void> {
    const { username, password } = singupDto;
    const userExist = await this._authRepository.findOne({
      where: { username },
    });

    if (userExist) {
      throw new ConflictException('el usurio ya existe');
    }

    return this._authRepository.signup(singupDto);
  }

  async singin(singinDto: SinginDto): Promise<{ token: string }> {
    const { username, password } = singinDto;
    const user: User = await this._authRepository.findOne({
      where: { username },
    });

    if (!username) {
      throw new NotFoundException('El usuario no existe');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('contraseña invalida');
    }

    const payload: IJwtPayload = {
      id: user.id,
      username: user.username,
      connection: user.connection,
    };

    const token = await this._jwtService.sign(payload);
    return { token };
  }

  async validateUser(validate: IJwtPayload): Promise<User> {
    const { id, username } = validate;
    const user = await this._authRepository.findOne(id);
    if (!user || user.username != username) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
