import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Artist } from 'src/artists/artist.entity';

export class UpdateSongDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsOptional()
  readonly artists: Artist[];

  @IsDateString()
  @IsOptional()
  readonly releasedDate: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;

  @IsMilitaryTime()
  @IsOptional()
  readonly duration: Date;
}
