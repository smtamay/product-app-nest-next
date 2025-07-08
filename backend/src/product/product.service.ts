import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../user/user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepo: Repository<Product>,

    @Inject('USER_REPOSITORY')
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new Error('User not found');

    const product = this.productRepo.create({
      ...dto,
      user,
    });

    return this.productRepo.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async findByUserPagination(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ products: Product[]; total: number }> {
    const [products, total] = await this.productRepo.findAndCount({
      where: { user: { id: userId } },
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { products, total };
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new Error('Product not found');

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepo.delete(id);
  }

  async partialUpdate(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);
    return this.productRepo.save(product);
  }
}
