import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class VaccineController {
  async create(request: Request, response: Response) {
    try {
      const { name, date, nextDosageDate, lotNumber, manufacturer } =
        request.body;
      
      const dosage = Number(request.body.dosage);
      let vaccineInput: Prisma.VaccineCreateInput = {
        name,
        dosage,
        date,
        nextDosageDate,
        lotNumber,
        manufacturer,
      };
      const vaccine = await prisma.vaccine.create({
        data: vaccineInput,
      });
      return response.status(201).json(vaccine);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async read(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const vaccine = await prisma.vaccine.findUnique({
        where: { id: Number(id) },
      });
      return response.status(200).json(vaccine);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async readAll(request: Request, response: Response) {
    try {
      const vaccines = await prisma.vaccine.findMany({
        include: {
          pet: true,
        },
      });
      return response.status(200).json(vaccines);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, date, nextDosageDate, lotNumber, manufacturer } =
        request.body;

      const dosage = Number(request.body.dosage);
      let vaccineInput: Prisma.VaccineCreateInput = {
        name,
        dosage,
        date,
        nextDosageDate,
        lotNumber,
        manufacturer,
      };

      const updatedVaccine = await prisma.vaccine.update({
        where: {
          id: Number(id),
        },
        data: vaccineInput,
      });

      if (updatedVaccine) {
        const vaccine = await prisma.vaccine.findUnique({
          where: {
            id: Number(id),
          },
        });
        return response.status(201).json(vaccine);
      }
      return response.status(404).json({ error: 'Vaccine record not found' });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deletedVaccine = await prisma.vaccine.delete({
        where: {
          id: Number(id),
        },
      });

      if (deletedVaccine) {
        return response.status(200).json(deletedVaccine);
      }
      return response.status(404).json({ error: 'Vaccine record not found' });
    } catch (error: any) {
      console.log(error);
      return response.status(500).json({ error: error.message });
    }
  }
}

export default new VaccineController();
