import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { v4 as uuidv4 } from 'uuid';

const artist = {
  id: uuidv4(),
  name: 'The Weekend',
  genre: 'Pop',
};
const dto = {
  name: 'The Weekend',
  genre: 'Pop',
};

describe('Artist Controller', () => {
  let controller: ArtistController;
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([artist]),
            findOne: jest.fn().mockResolvedValue(artist),
            create: jest.fn().mockResolvedValue(artist),
          },
        },
      ],
    }).compile();

    controller = module.get<ArtistController>(ArtistController);
    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of artists', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([artist]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single artist', async () => {
      await expect(controller.findOne(artist.id)).resolves.toEqual(artist);
      expect(service.findOne).toHaveBeenCalledWith(artist.id);
    });

    it('should throw an exception if artist not found', async () => {
      //expect.assertions(1);

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('Artist not found'));

      try {
        await controller.findOne('123456');
      } catch (error: unknown) {
        if (error instanceof NotFoundException) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe('Artist not found');
        } else {
          throw error;
        }
      }
    });
  });

  describe('create', () => {
    it('should create and return an artist', async () => {
      const result = await controller.create(dto);

      expect(result).toEqual(artist);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});
