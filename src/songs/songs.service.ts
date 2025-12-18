import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entities';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { Artist } from 'src/artists/artist.entity';
import { UpdateSongDto } from './dto/update-song-dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songRepo: Repository<Song>,
    @InjectRepository(Artist) private readonly artistRepo: Repository<Artist>,
  ) {}
  findAll() {
    return this.songRepo.find();
  }
  findOne(id: number) {
    return this.songRepo.findOneBy({ id });
  }
  update(id: number, recordToUpdate: UpdateSongDto) {
    return this.songRepo.update(id, recordToUpdate);
  }
  remove(id: number) {
    return this.songRepo.delete({ id });
  }

  async create(createSongDto: CreateSongDto) {
    const song = new Song();
    song.title = createSongDto.title;

    song.duration = createSongDto.duration;
    song.lyrics = createSongDto.lyrics;
    song.releasedDate = createSongDto.releasedDate;

    // Load artists from DB
    const artists = await this.artistRepo.findByIds(createSongDto.artists);
    song.artists = artists;
    return this.songRepo.save(song);
  }
  async paginate(options: IPaginationOptions) {
    const queryBuilder = this.songRepo.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'ASC');
    return paginate<Song>(queryBuilder, options);
  }
}
