import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, { nullable: true })
  product?: Product;
}
