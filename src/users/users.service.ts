import { User } from './users.entity';
import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDto) {
    const existingUser = await this.userRepo.findOneBy({
      email: createUserDTO.email,
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const salt = await bcrypt.genSalt();
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, salt);
    const user = await this.userRepo.save(createUserDTO);
    // delete user.password;
    return plainToInstance(User, user);
  }

  async findOneByEmail(@Body() email: string) {
    const user = await this.userRepo.findOne({
      where: { email: email },
    });
    return user;
  }
}
