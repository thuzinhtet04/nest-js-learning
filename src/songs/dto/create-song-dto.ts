import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly artists: string[];

  @IsDateString()
  readonly releaseDate: string;

  @IsMilitaryTime()
  readonly duration: string;
}
