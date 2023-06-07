import { inject, injectable } from 'inversify';
import { TYPES } from '../app.types';
import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../middlewares/isLoggedIn';
import { httpCodes } from '../errors/httpStatusCodes';
import { AuthService } from '../services/auth.service';
import { AuthenticationError } from '../errors/authenticationError';
import { z } from 'zod';

export const logInInputSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const tokenDataSchema = z.object({
  email: z.string().nonempty(),
  userId: z.string().nonempty(),
});

@injectable()
export class AuthController {
  constructor(@inject(TYPES.authService) private authService: AuthService) {}

  logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = logInInputSchema.safeParse(req.body);

      if (!input.success) {
        // TODO: validation
        throw new AuthenticationError('Authentication failed!');
      }

      const user = await this.authService.logIn(input.data);

      if (!user) {
        throw new AuthenticationError('Authentication failed!');
      }

      this.authService
        .setJWTCookie(res, user)
        .status(httpCodes.OK)
        .send({ id: user._id, firtName: user.firstName, lastName: user.lastName, email: user.email });
    } catch (e) {
      next(e);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestWithUser = req as RequestWithUser;
      if (requestWithUser.user) {
        const user = requestWithUser.user;
        this.authService
          .setJWTCookie(res, user)
          .send({ id: user._id, firstname: user.firstName, lastName: user.lastName, email: user.email });
      } else {
        throw new AuthenticationError('Invalid Token!');
      }
    } catch (e) {
      next(e);
    }
  };

  logOut = async (req: Request, res: Response) => {
    res
      .cookie('access_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .status(httpCodes.OK)
      .send('Logged out');
  };
}
