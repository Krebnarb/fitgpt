import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, WorkoutSetInstance } from '@prisma/client';

@Injectable()
export class WorkoutSetInstanceService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.WorkoutSetInstanceCreateInput): Promise<WorkoutSetInstance> {
    return this.prisma.workoutSetInstance.create({ data });
  }

  async findAll(): Promise<WorkoutSetInstance[]> {
    return this.prisma.workoutSetInstance.findMany();
  }

  async findOne(id: number): Promise<WorkoutSetInstance | null> {
    return this.prisma.workoutSetInstance.findUnique({ 
      where: { id },
      include: { 
        itemInstances: {
          include: { 
            reps: true,
            workoutListItem: true 
          }
        },
      } 
    });
  }

  async update(id: number, data: Prisma.WorkoutSetInstanceUpdateInput): Promise<WorkoutSetInstance> {
    return this.prisma.workoutSetInstance.update({ where: { id }, data });
  }

  async remove(id: number): Promise<WorkoutSetInstance> {
    return this.prisma.workoutSetInstance.delete({ where: { id } });
  }
}
