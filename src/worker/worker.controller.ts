import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { SelfGuard } from '../common/guards/self.guard';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @UseGuards(SelfGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(+id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerService.remove(+id);
  }
}
