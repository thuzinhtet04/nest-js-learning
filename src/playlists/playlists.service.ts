import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entities';
import { User } from 'src/users/users.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songRepo: Repository<Song>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async create(createPlaylistDto: CreatePlaylistDto) {
    const playlist = new Playlist();
    playlist.name = createPlaylistDto.name;
    const songs = await this.songRepo.findByIds(createPlaylistDto.songs);
    console.log(songs, 'songns');
    playlist.songs = songs;
    const user = await this.userRepo.findOneBy({ id: createPlaylistDto.user });
    if (user) {
      playlist.user = user;
    }
    return this.playlistRepo.save(playlist);
  }

  findAll() {
    return `This action returns all playlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
