import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(
    @Body() loginUserDto: LoginUserDTO,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUser(loginUserDto);
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
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
    const safeUser: Partial<User> = user;
    delete safeUser.password;

    return safeUser;
  }
}
