import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { Prisma, WorkoutSetInstance, Status } from '@prisma/client';

@Injectable()
export class WorkoutSetInstanceService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.WorkoutSetInstanceCreateInput): Promise<WorkoutSetInstance> {
    return this.prisma.workoutSetInstance.create({ data });
  }

  async findAll(): Promise<WorkoutSetInstance[]> {
    return this.prisma.workoutSetInstance.findMany();
  }

  async findOne(id: number): Promise<Prisma.WorkoutSetInstanceGetPayload<{
    include: { workoutSetItemInstances: { include: { reps: true, workoutListItem: true } } }
  }> | null> {
    return this.prisma.workoutSetInstance.findUnique({ 
      where: { id },
      include: { 
        workoutSetItemInstances: {
          include: { 
            reps: true,
            workoutListItem: true 
          }
        },
      } 
    });
  }

  // Add a function findNextScheduled to find the next scheduled workout set instance by userId
  // Look for the first workout set instance that has a status of 'SCHEDULED' and is scheduled for a date in the future
  async findNextScheduled(userId: number): Promise<Prisma.WorkoutSetInstanceGetPayload<{
    include: { workoutSetItemInstances: { include: { reps: true, workoutListItem: true } } }
  }> | null> {
    return this.prisma.workoutSetInstance.findFirst({ 
      where: { 
        status: 'SCHEDULED',
        scheduledDate: { gt: new Date() },
        userId: userId
      },
      include: { 
        workoutSetItemInstances: {
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

  // Create a copy function by taking an id as an input, and cloning the workoutSetInstance and itemInstances
  async copy(id: number): Promise<WorkoutSetInstance> {
    const workoutSetInstance = await this.findOne(id);
     if (workoutSetInstance === null) {
      throw new Error('Workout Set Instance not found');
    }
    
    const itemInstances = workoutSetInstance.workoutSetItemInstances.map(itemInstance => {
      return {
        status: "NOT_STARTED" as Status,
        order: itemInstance.order,
        workoutListItem: { connect: { id: itemInstance.workoutListItem.id } },
        reps: {
          create: itemInstance.reps.map(reps => {
            return {
              repNumber: reps.repNumber,
              count: reps.count,
              weight: reps.weight,
            }
          })
        }
      };
    });

    return this.create({
      user: { connect: { id: workoutSetInstance.userId } },
      status: workoutSetInstance.status,
      description: workoutSetInstance.description,
      scheduledDate: new Date(),
      workoutSetItemInstances: { create: itemInstances },
      actualDate: null,
      workoutPlanSetSchedule: { connect: { id: workoutSetInstance.workoutPlanSetScheduleId } }
    });
  }
}
