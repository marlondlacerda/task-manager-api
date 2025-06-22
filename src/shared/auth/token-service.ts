import jwt from 'jsonwebtoken';
import { User } from '@domain/entities/user';

export class TokenService {
  static generate(user: User): string {
    const payload = { sub: user.id, email: user.email };
    const secret = process.env.JWT_SECRET || 'default_secret';
    const expiresIn = '1d';

    return jwt.sign(payload, secret, { expiresIn });
  }
}
