// src/product/product.module.ts
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.providers';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../user/user.providers';

@Module({
  imports: [DatabaseModule], // ⬅️ Agregado aquí
  controllers: [ProductController],
  providers: [...productProviders, ...userProviders, ProductService],
})
export class ProductModule {}
