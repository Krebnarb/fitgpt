import { Module } from '@nestjs/common';
import { WorkoutSetInstanceService } from './services/workout-set-instance.service';
import { WorkoutSetInstanceController } from './controllers/workout-set-instance.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [WorkoutSetInstanceController],
  providers: [WorkoutSetInstanceService, PrismaService],
})
export class WorkoutSetInstanceModule {}
