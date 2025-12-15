import { Controller, Get, Post } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAll() {
    return 'all songs';
  }
  @Post()
  create() {
    return 'all create';
  }
}
