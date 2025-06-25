import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Market } from './entities/market.entity';

@Injectable()
export class MarketsService {
  constructor(
    @InjectModel(Market) private readonly marketRepo: typeof Market,
  ) {}

  create(createMarketDto: CreateMarketDto) {
    return this.marketRepo.create(createMarketDto);
  }

  async findAll() {
    const allData = await this.marketRepo.findAll({
      include: { all: true },
    });
    return allData;
  }

  async findOne(id: number) {
    const oneData = await this.marketRepo.findByPk(id, {
      include: { all: true },
    });
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return oneData;
  }

  async update(id: number, updateMarketDto: UpdateMarketDto) {
    const oneData = await this.marketRepo.findByPk(id);
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return this.marketRepo.update(updateMarketDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const oneData = await this.marketRepo.findByPk(id);
    if (!oneData) {
      throw new NotFoundException('Bunday data mavjud emas');
    }
    return this.marketRepo.destroy({ where: { id } });
  }
}
