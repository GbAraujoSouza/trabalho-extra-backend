import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

class PetController {
  async create(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const { type, breed, name } = request.body;
      const age = Number(request.body.age);

      let petInput: Prisma.PetCreateInput = {
        type,
        breed,
        name,
        age,
      };
      const pet = await prisma.pet.create({
        data: petInput,
      });
      return response.status(201).json(pet);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async read(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const { id } = request.params;
      const pet = await prisma.pet.findUnique({
        where: { id: Number(id) },
        include: {
          vaccines: true,
        },
      });
      return response.status(200).json(pet);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async readAll(request: Request, response: Response) {
    try {
      const pets = await prisma.pet.findMany({
        include: {
          vaccines: true,
        },
      });
      return response.status(200).json(pets);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async update(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const { id } = request.params;
      const { type, breed, name, age } = request.body;

      let petInput: Prisma.PetCreateInput = {
        type,
        breed,
        name,
        age,
      };

      const updatedPet = await prisma.pet.update({
        where: {
          id: Number(id),
        },
        data: petInput,
      });
      return response.status(201).json(updatedPet);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      validationResult(request).throw();
      const { id } = request.params;

      const deletedPet = await prisma.pet.delete({
        where: {
          id: Number(id),
        },
      });
      return response.status(200).json(deletedPet);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async takeVaccine(request: Request, response: Response) {
    try {
      const { name, date, nextDosageDate, lotNumber, manufacturer } =
        request.body;
      const dosage = Number(request.body.dosage);
      const idPet = Number(request.body.idPet);
      const tookVaccineInput: Prisma.VaccineCreateInput = {
        name,
        dosage,
        date,
        nextDosageDate,
        lotNumber,
        manufacturer,
        pet: { connect: { id: idPet } },
      };
      const vaccine = await prisma.vaccine.create({
        data: tookVaccineInput,
        include: {
          pet: true,
        },
      });
      return response.status(201).json(vaccine);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async readPetVaccine(request: Request, response: Response) {
    const { idPet } = request.params;
    try {
      const vaccines = await prisma.vaccine.findMany({
        where: { petId: Number(idPet) },
      });
      return response.status(200).json(vaccines);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }

  async removeVaccine(request: Request, response: Response) {
    const { idPet, idVaccine } = request.params;
    try {
      const removedVaccine = await prisma.vaccine.delete({
        where: {
          id: Number(idVaccine),
          petId: Number(idPet),
        },
      });
      if (removedVaccine) {
        return response.status(200).json(removedVaccine);
      }
      return response.status(404).json({ error: 'Vacine record not found.' });
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }
}

export default new PetController();
