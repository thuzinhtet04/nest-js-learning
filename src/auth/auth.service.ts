import { User } from 'src/users/users.entity';
import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { retry } from 'rxjs';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly userService: UsersService,
  ) {}
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(@Body() loginUserDto: LoginUserDTO) {
    const user = await this.validateUser(loginUserDto);
    const token = 'token';
    return { user, token };
  }

  async validateUser(loginUserDto: LoginUserDTO) {
    const user = await this.userService.findOneByEmail(loginUserDto.email);
    if (!user)
      throw new BadRequestException('The user with this email is not found!');
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const { password: _pwd, ...safeUser } = user;
    return safeUser;
  }
}
