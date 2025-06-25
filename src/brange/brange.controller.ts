import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrangeService } from './brange.service';
import { CreateBrangeDto } from './dto/create-brange.dto';
import { UpdateBrangeDto } from './dto/update-brange.dto';

@Controller('brange')
export class BrangeController {
  constructor(private readonly brangeService: BrangeService) {}

  @Post()
  create(@Body() createBrangeDto: CreateBrangeDto) {
    return this.brangeService.create(createBrangeDto);
  }

  @Get()
  findAll() {
    return this.brangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brangeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrangeDto: UpdateBrangeDto) {
    return this.brangeService.update(+id, updateBrangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brangeService.remove(+id);
  }
}
