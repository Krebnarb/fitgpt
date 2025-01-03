import { IsDate, IsEnum, IsArray, IsOptional } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateWorkoutSetInstanceDto {
  id?: number;
  scheduledDate!: Date;
  status: Status = Status.SCHEDULED
}
