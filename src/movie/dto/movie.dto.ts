import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Genre } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @ApiProperty({
    description: "Film's title",
    example: 'Fight Club',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiPropertyOptional({
    description: "Film's description",
    example: 'An insomniac office worker forms an underground fight club.',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Year of release',
    example: 1999,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear!: number;

  @ApiPropertyOptional({
    description: 'Movie rating from 0 to 10',
    example: 8.8,
    type: Number,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating?: number;

  @ApiPropertyOptional({
    description: 'Whether the movie is available to watch',
    example: true,
    type: Boolean,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'Movie genre',
    enum: Genre,
    example: Genre.DRAMA,
    default: Genre.DRAMA,
  })
  @IsOptional()
  @IsEnum(Genre)
  genre?: Genre;

  @ApiPropertyOptional({
    description: 'URL of the movie poster image',
    example: 'https://example.com/poster.jpg',
    type: String,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'IDs of actors featured in the movie',
    example: ['550e8400-e29b-41d4-a716-446655440000'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds!: string[];
}

export class PosterResponse {
  @ApiProperty({
    description: 'Poster ID',
    example: 'd52f55bf-e9b4-40bb-b594-68a981ac4d40',
    type: String,
  })
  id!: string;

  @ApiProperty({
    description: 'URL of the poster image',
    example: 'https://example.com/poster.jpg',
    type: String,
  })
  url!: string;
}

export class ActorResponse {
  @ApiProperty({
    description: 'Actor ID',
    example: 'd52f55bf-e9b4-40bb-b594-68a981ac4d40',
    type: String,
  })
  id!: string;

  @ApiProperty({
    description: "Actor's name",
    example: 'Brad Pitt',
    type: String,
  })
  name!: string;
}

export class ReviewResponse {
  @ApiProperty({
    description: 'Review ID',
    example: 'd52f55bf-e9b4-40bb-b594-68a981ac4d40',
    type: String,
  })
  id!: string;

  @ApiProperty({
    description: 'Review text',
    example: 'A masterpiece of modern cinema.',
    type: String,
  })
  text!: string;

  @ApiProperty({
    description: 'Review rating',
    example: 9.5,
    type: Number,
  })
  rating!: number;
}

export class MovieResponse {
  @ApiProperty({
    description: 'Movie ID',
    example: 'd52f55bf-e9b4-40bb-b594-68a981ac4d40',
    type: String,
  })
  id!: string;

  @ApiProperty({
    description: "Film's title",
    example: 'Fight Club',
    type: String,
  })
  title!: string;

  @ApiPropertyOptional({
    description: "Film's description",
    example: 'An insomniac office worker forms an underground fight club.',
    type: String,
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    description: 'Year of release',
    example: 1999,
    type: Number,
  })
  releaseYear!: number;

  @ApiProperty({
    description: 'Movie rating from 0 to 10',
    example: 8.8,
    type: Number,
  })
  rating!: number;

  @ApiProperty({
    description: 'Whether the movie is available to watch',
    example: true,
    type: Boolean,
  })
  isAvailable!: boolean;

  @ApiProperty({
    description: 'Movie genre',
    enum: Genre,
    example: Genre.DRAMA,
  })
  genre!: Genre;

  @ApiPropertyOptional({
    description: 'Movie poster',
    type: () => PosterResponse,
    nullable: true,
  })
  poster?: PosterResponse | null;

  @ApiProperty({
    description: 'Actors featured in the movie',
    type: () => [ActorResponse],
  })
  actors!: ActorResponse[];

  @ApiProperty({
    description: 'Reviews of the movie',
    type: () => [ReviewResponse],
  })
  reviews!: ReviewResponse[];

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2026-06-01T12:34:56.789Z',
    type: String,
    format: 'date-time',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2026-06-01T12:34:56.789Z',
    type: String,
    format: 'date-time',
  })
  updatedAt!: Date;
}
