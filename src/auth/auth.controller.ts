import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() userDTO: CreateUserDto) {
    return this.authService.signup(userDTO);
  }
  @Post('sign-in')
  singIn(@Body() loginUserDto: LoginUserDTO) {
    return this.authService.login(loginUserDto);
  }
}
