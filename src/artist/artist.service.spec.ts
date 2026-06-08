import { Artist } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

const artistId = uuidv4();

const artists: Artist[] = [
  { id: artistId, name: 'Billie Eilish', genre: 'Pop' },
  { id: uuidv4(), name: 'The Weekend', genre: 'Pop' },
  { id: uuidv4(), name: 'Eminem', genre: 'Rap' },
];
const artist: Artist = artists[0];

const dto: ArtistDto = { name: artist.name, genre: artist.genre };

const db = {
  artist: {
    findMany: jest.fn().mockResolvedValue(artists),
    findUnique: jest.fn().mockResolvedValue(artist),
    create: jest.fn().mockResolvedValue(artist),
  },
};

describe('Artist Service', () => {
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return array of artists', async () => {
    const masters = await service.findAll();
    expect(masters).toEqual(artists);
  });

  it('should return a single artist', async () => {
    const result = await service.findOne(artistId);
    expect(result).toEqual(artist);
  });
  it('should create a new artist', async () => {
    const result = await service.create(dto);
    expect(result).toEqual(artist);
  });
});
