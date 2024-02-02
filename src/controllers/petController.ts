import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class PetController {
  async create(request: Request, response: Response) {
    try {
      const { type, breed, name, ownerName } = request.body;
      const age = Number(request.body.age);

      let petInput: Prisma.PetCreateInput = {
        type,
        breed,
        name,
        ownerName,
        age,
      };
      const pet = await prisma.pet.create({
        data: petInput,
      });
      return response.status(201).json(pet);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async read(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const pet = await prisma.pet.findUnique({
        where: { id: Number(id) },
        include: {
          vaccines: true,
        },
      });
      return response.status(200).json(pet);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
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
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { type, breed, name, ownerName, age } = request.body;

      let petInput: Prisma.PetCreateInput = {
        type,
        breed,
        name,
        ownerName,
        age,
      };

      const updatedPet = await prisma.pet.update({
        where: {
          id: Number(id),
        },
        data: petInput,
      });

      if (updatedPet) {
        const pet = await prisma.pet.findUnique({
          where: {
            id: Number(id),
          },
        });
        return response.status(201).json(pet);
      }
      return response.status(404).json({ error: 'Pet not found' });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deletedPet = await prisma.pet.delete({
        where: {
          id: Number(id),
        },
      });

      if (deletedPet) {
        return response.status(200).json(deletedPet);
      }
      return response.status(404).json({ error: 'Pet not found' });
    } catch (error: any) {
      console.log(error);
      return response.status(500).json({ error: error.message });
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
      return response.status(500).json({ error: error.message });
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
      return response.status(500).json({ error: error.message });
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
      return response.status(404).json({error: "Vacine record not found."})
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export default new PetController();
