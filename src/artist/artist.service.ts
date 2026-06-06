import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: ArtistDto): Promise<Artist> {
    return this.prismaService.artist.create({
      data: {
        name: dto.name,
        genre: dto.genre,
      },
    });
  }

  async findAll(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    await this.findOne(id);

    return this.prismaService.artist.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<Artist> {
    await this.findOne(id);

    return this.prismaService.artist.delete({
      where: { id },
    });
  }
}
