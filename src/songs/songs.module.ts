import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

const mockSongService = {
  findAll() {
    return [{ id: 1, title: 'hello ' }];
  },
};
@Module({
  controllers: [SongsController],
  providers: [
    {
      provide: SongsService,
      useValue: mockSongService,
    },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
