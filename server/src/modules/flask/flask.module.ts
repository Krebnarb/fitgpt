import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FlaskService } from './flask.service';
import { FlaskController } from './flask.controller';

@Module({
  imports: [HttpModule],
  controllers: [FlaskController],
  providers: [FlaskService],
})
export class FlaskModule {}
