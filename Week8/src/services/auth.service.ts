import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { TYPES } from '../app.types';
import { z } from 'zod';
import { Response } from 'express';
import { PasswordError } from '../errors/passwordError';
import { JWTError } from '../errors/jwtError';
import { User } from '../models/User';
import { ObjectId } from 'mongodb';
import { env } from '../env';
import { UsersRepository } from '../repositories/users.repository';

// 2 days
const COOKIE_EXPIRATION = 1000 * 60 * 60 * 24 * 2;

export const priviledgeSchema = z.enum(['ADMIN', 'USER', 'NO_ACCOUNT']);
export type Priviledge = z.infer<typeof priviledgeSchema>;

export const createUserSchema = z.object({
  email: z.string().email().nonempty(),
  phone: z.string().min(7).max(200).nonempty(),
  name: z.string().min(2).max(200).nonempty(),
  password: z.string().min(2).max(200).nonempty(),
  priviledge: priviledgeSchema,
});

export const logInInputSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const tokenDataSchema = z.object({
  email: z.string().nonempty(),
  userId: z.string().nonempty(),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type LogInInput = z.infer<typeof logInInputSchema>;
export type tokenData = z.infer<typeof tokenDataSchema>;

@injectable()
export class AuthService {
  constructor(@inject(TYPES.userRepository) private userRepository: UsersRepository) {}

  async logIn({ email, password }: LogInInput) {
    const user = await this.userRepository.findByEmail(email);
    const error = new PasswordError('Wrong email or password, please try again!');

    if (!user) {
      throw error;
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw error;
    }
  }

  async isEmailAvailable(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) return false;
    return true;
  }

  getToken({ userId, email }: tokenData) {
    try {
      return jwt.sign({ userId, email }, env.JWT_SALT, { expiresIn: '24h' });
    } catch (e) {
      throw new JWTError('Error! Something went wrong when trying to create token. ' + e);
    }
  }

  async getUserFromToken(token: string) {
    console.log(token);
    try {
      const decoded = jwt.verify(token, env.JWT_SALT);

      const tokenData = tokenDataSchema.safeParse(decoded);
      if (!tokenData.success) {
        throw new JWTError('Error! Something went wrong when trying to verify token. ');
      }

      const user = await this.userRepository.findByEmail(tokenData.data.email);

      return user;
    } catch (e) {
      throw new JWTError('Error! Something went wrong when trying to verify token. ' + e);
    }
  }

  setJWTCookie(res: Response, user: User, expire: number = COOKIE_EXPIRATION) {
    return res.cookie('access_token', this.getToken({ userId: user._id.toString(), email: user.email }), {
      expires: new Date(Date.now() + expire),
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
  }
}
