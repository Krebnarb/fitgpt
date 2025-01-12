import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepService } from '../services/rep.service';
import { CreateRepDto } from '../dtos/create-rep.dto';
import { UpdateRepDto } from '../dtos/update-rep.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('reps')
@Controller('reps')
export class RepController {
    constructor(private readonly repService: RepService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.', type: CreateRepDto })
    create(@Body() createRepDto: CreateRepDto) {
        return this.repService.create(createRepDto);
    }

    @Post('copy/:workoutSetItemInstanceId')
    @ApiResponse({ status: 201, description: 'The rep has been successfully copied.', type: CreateRepDto })
    copy(@Param('workoutSetItemInstanceId') workoutSetItemInstanceId: number, @Body() createRepDto: CreateRepDto) {
        return this.repService.copy(Number(workoutSetItemInstanceId));
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Return all reps.', type: [CreateRepDto] })
    findAll() {
        return this.repService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Return a single rep.', type: CreateRepDto })
    findOne(@Param('id') id: number) {
        return this.repService.findOne(Number(id));
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.', type: UpdateRepDto })
    update(@Param('id') id: number, @Body() updateRepDto: UpdateRepDto) {
        return this.repService.update(Number(id), updateRepDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.' })
    remove(@Param('id') id: number) {
        return this.repService.remove(Number(id));
    }
}
