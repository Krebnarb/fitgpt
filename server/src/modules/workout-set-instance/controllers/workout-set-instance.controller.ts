import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutSetInstanceService } from '../services/workout-set-instance.service';
import { CreateWorkoutSetInstanceDto, UpdateWorkoutSetInstanceDto } from '../dtos';
import { ApiOperation, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Status } from '@prisma/client';

@ApiTags('workout-set-instances')
@Controller('workout-set-instances')
export class WorkoutSetInstanceController {
  constructor(private readonly workoutSetInstanceService: WorkoutSetInstanceService) {}

  @Get(':id')  // :id represents a dynamic parameter
  @ApiOperation({
    summary: 'Get a single workout set instance by id'
  })
  async findOne(@Param('id') id: number) {
    // if id is string, convert it to number
    id = Number(id);
    return this.workoutSetInstanceService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.workoutSetInstanceService.findAll();
  }

  @Post('copy/:id')
  @ApiOperation({
    summary: 'Copy a workout set instance, based on an existing id'
  })
  async copy(@Param('id') id: number) {
    id = Number(id);
    return this.workoutSetInstanceService.copy(id);
  }
}
