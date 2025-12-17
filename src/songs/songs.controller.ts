import type { Connection } from 'src/common/constants/connection';
import { SongsService } from './songs.service';
import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Scope,
} from '@nestjs/common';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log('helo');
    console.log(
      `this is connection string ${this.connection.CONNECTION_STRING}`,
    );
  }
  @Get()
  findAll() {
    return this.songsService.findAll();
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return 'get One song';
  }
  @Post()
  create() {
    return 'all create';
  }
}
