import { User } from '../user/user.entity';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { SingupDto } from './dto';

import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDto: SingupDto) {
    const { username, password } = signupDto;
    const user = new User();
    user.username = username;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}
