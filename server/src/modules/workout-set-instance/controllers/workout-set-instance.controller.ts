import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutSetInstanceService } from '../services/workout-set-instance.service';
import { CreateWorkoutSetInstanceDto, UpdateWorkoutSetInstanceDto } from '../dtos';
import { ApiTags } from '@nestjs/swagger';
import { Status } from '@prisma/client';

@ApiTags('workout-set-instances')
@Controller('workout-set-instances')
export class WorkoutSetInstanceController {
  constructor(private readonly workoutSetInstanceService: WorkoutSetInstanceService) {}

  @Get(':id')  // :id represents a dynamic parameter
  async findOne(@Param('id') id: number) {
    // if id is string, convert it to number
    id = Number(id);
    return this.workoutSetInstanceService.findOne(id);
  }
}
