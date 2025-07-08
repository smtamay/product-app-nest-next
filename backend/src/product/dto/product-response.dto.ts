import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../user/dto/user-response.dto';

@Exclude()
export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
