import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  userId: number;
}
