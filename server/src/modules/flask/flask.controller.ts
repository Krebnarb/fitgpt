import { Controller, Get } from '@nestjs/common';
import { FlaskService } from './flask.service';

@Controller('hello')
export class FlaskController {
  constructor(private readonly flaskService: FlaskService) {}

  @Get()
  async getHello(): Promise<any> {
    return this.flaskService.getHelloMessage();
  }
}
