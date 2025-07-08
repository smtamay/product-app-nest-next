import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepo: Repository<Log>,
  ) {}

  async create(action: string, product?: Product): Promise<Log> {
    const log = this.logRepo.create({ action, product });
    return this.logRepo.save(log);
  }
}
