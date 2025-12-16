import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

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
  ],
})
export class SongsModule {}
