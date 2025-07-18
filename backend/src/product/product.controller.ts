import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Route POST /products
  @Post()
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.productService.create(dto);
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  // Route GET /products
  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productService.findAll();
    return plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }

  // Route GET /products/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const product = this.productService.findOne(id);

    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  // Route GET /products/user/:userId
  @Get('user/:userId')
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const { products, total } = await this.productService.findByUserPagination(userId, page, limit);

    const transformed = plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true,
    });

    return {
      products: transformed,
      total,
    };
  }


  // Route PUT /products/:id
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  // Route DELETE /products/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  // Route PATCH /products/:id
  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.partialUpdate(id, dto);
  }
}
