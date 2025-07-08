// src/database/database.providers.ts
import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [User, Product],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
