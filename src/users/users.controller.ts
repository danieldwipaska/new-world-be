import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //GET ALL USERS
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  //DELETE A USER
  @Delete(':userId')
  removeById(@Param('userId') userId: string) {
    return this.usersService.deleteById(userId);
  }
}
