import { Request, Response } from 'express';
import Auth from '../config/auth';

import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
const prisma = new PrismaClient();

class AuthController {
  async login(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const user = await prisma.user.findUnique({
        where: { email: request.body.email },
      });
      if (!user) {
        return response
          .status(404)
          .json({ message: 'Usuário não encontrado.' });
      }

      const { password } = request.body;
      if (Auth.checkPassword(password, user.hash, user.salt)) {
        // gerar um token
        const token = Auth.generateJWT(user);
        return response.status(200).json({ token: token });
      }
      return response.status(401).json({ message: 'Senha inválida!' });
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async getDetails(request: Request, response: Response) {
    try {
      const token = Auth.getToken(request);
      const payload = Auth.decodeJWT(token);
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        return response
          .status(404)
          .json({ message: 'Usuário não encontrado!' });
      }
      return response.status(200).json({user: user})
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController;