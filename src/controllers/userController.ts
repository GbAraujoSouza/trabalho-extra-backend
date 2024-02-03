import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response, response } from 'express';
import auth from '../config/auth';
import { validationResult } from 'express-validator';

import { transport, readRenderHtml } from '../config/mailer';
import handlebars from 'handlebars';
import path from 'path';

const prisma = new PrismaClient();

class UserController {
  async create(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const { cpf, email, address, password, firstName, lastName } =
        request.body;

      const { hash, salt } = auth.generatePassword(password);

      const userInput: Prisma.UserCreateInput = {
        cpf,
        email,
        address,
        hash,
        salt,
        firstName,
        lastName,
      };

      const user = await prisma.user.create({
        data: userInput,
      });

      const pathTemplate = path.resolve(
        __dirname,
        '..',
        '..',
        'templates',
        'messageTemplate.html',
      );
      readRenderHtml(pathTemplate, (htmlTemplate: any) => {
        //Pegando o template para mensagens de boas vindas
        const template = handlebars.compile(htmlTemplate);
        const replacements = {
          name: request.body.name,
          message: 'Seja Bem Vindo!!',
        };
        const htmlToSend = template(replacements);
        const message = {
          from: process.env.MAIL_SENDER,
          to: request.body.email,
          subject: 'Bem vindo',
          html: htmlToSend,
        };
        // Ao enviar email, ocorre erro de credenciais
        // transport.sendMail(message, (error) => {
        //   throw error;
        // });
      });

      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async readAll(request: Request, response: Response) {
    try {
      const user = await prisma.user.findMany({
        include: {
          pets: true,
        },
      });
      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async read(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          pets: true,
        },
      });
      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async update(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const { id } = request.params;
      const { cpf, email, address, firstName, lastName } = request.body;
      let userInput: Prisma.UserUpdateInput = {
        cpf,
        email,
        address,
        firstName,
        lastName,
      };
      const user = await prisma.user.update({
        data: userInput,
        where: {
          id: Number(id),
        },
      });
      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const { id } = request.params;
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      return response.status(201).json(user);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }
}

export default new UserController();
