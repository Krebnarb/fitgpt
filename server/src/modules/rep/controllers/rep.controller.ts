import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepService } from '../services/rep.service';
import { CreateRepDto } from '../dtos/create-rep.dto';
import { UpdateRepDto } from '../dtos/update-rep.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reps')
@Controller('reps')
export class RepController {
  constructor(private readonly repService: RepService) {}

  @Post()
  create(@Body() createRepDto: CreateRepDto) {
    return this.repService.create(createRepDto);
  }

  @Get()
  findAll() {
    return this.repService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.repService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRepDto: UpdateRepDto) {
    return this.repService.update(Number(id), updateRepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.repService.remove(Number(id));
  }
}
