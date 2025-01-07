import { Module } from '@nestjs/common';
import { RepService } from './services/rep.service';
import { RepController } from './controllers/rep.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [RepController],
  providers: [RepService, PrismaService],
})
export class RepModule {}
