import { PartialType } from '@nestjs/swagger';
import { CreateWorkoutSetInstanceDto } from '.';

export class UpdateWorkoutSetInstanceDto extends PartialType(CreateWorkoutSetInstanceDto) {}
