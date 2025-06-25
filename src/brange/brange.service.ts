import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrangeDto } from './dto/create-brange.dto';
import { UpdateBrangeDto } from './dto/update-brange.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Brange } from './entities/brange.entity';

@Injectable()
export class BrangeService {
  constructor(
    @InjectModel(Brange) private readonly brangeRepo: typeof Brange,
  ) {}

  create(createBrangeDto: CreateBrangeDto) {
    return this.brangeRepo.create(createBrangeDto);
  }

  async findAll() {
    const allData = await this.brangeRepo.findAll({
      include: { all: true },
    });
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.brangeRepo.findByPk(id, {
      include: { all: true },
    });
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return oneData;
  }

  async update(id: number, updateBrangeDto: UpdateBrangeDto) {
    const oneData = await this.brangeRepo.findByPk(id);
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return this.brangeRepo.update(updateBrangeDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const oneData = await this.brangeRepo.findByPk(id);
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return this.brangeRepo.destroy({ where: { id } });
  }
}
