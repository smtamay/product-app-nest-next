import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Routa POST /users
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.userService.create(dto);
    return plainToInstance(User, user, { excludeExtraneousValues: false });
  }

  // Routea GET /users
  @Get()
  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userService.findAll();
    return plainToInstance(User, users, { excludeExtraneousValues: false });
  }
}
