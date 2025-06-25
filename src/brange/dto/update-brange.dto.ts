import { PartialType } from '@nestjs/mapped-types';
import { CreateBrangeDto } from './create-brange.dto';

export class UpdateBrangeDto extends PartialType(CreateBrangeDto) {}
