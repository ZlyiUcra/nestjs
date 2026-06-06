import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @ApiProperty({ example: 'Daft Punk' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Electronic' })
  @IsString()
  @IsNotEmpty()
  genre!: string;
}

export class UpdateArtistDto extends PartialType(ArtistDto) {}
