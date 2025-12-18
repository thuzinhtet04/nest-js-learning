import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber({}, { each: true })
  @IsArray()
  @IsNotEmpty()
  readonly songs: number[];

  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
