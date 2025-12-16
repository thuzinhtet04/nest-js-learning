import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  findAll() {
    return [{ id: 2222 }];
  }
}
